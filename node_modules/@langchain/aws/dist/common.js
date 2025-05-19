import { AIMessage, AIMessageChunk, } from "@langchain/core/messages";
import { isOpenAITool } from "@langchain/core/language_models/base";
import { isLangChainTool } from "@langchain/core/utils/function_calling";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatGenerationChunk } from "@langchain/core/outputs";
export function extractImageInfo(base64) {
    // Extract the format from the base64 string
    const formatMatch = base64.match(/^data:image\/(\w+);base64,/);
    let format;
    if (formatMatch) {
        const extractedFormat = formatMatch[1].toLowerCase();
        if (["gif", "jpeg", "png", "webp"].includes(extractedFormat)) {
            format = extractedFormat;
        }
    }
    // Remove the data URL prefix if present
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    // Convert base64 to Uint8Array
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i += 1) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return {
        image: {
            format,
            source: {
                bytes,
            },
        },
    };
}
export function convertToConverseMessages(messages) {
    const converseSystem = messages
        .filter((msg) => msg._getType() === "system")
        .map((msg) => {
        if (typeof msg.content === "string") {
            return { text: msg.content };
        }
        else if (msg.content.length === 1 && msg.content[0].type === "text") {
            return { text: msg.content[0].text };
        }
        throw new Error("System message content must be either a string, or a content array containing a single text object.");
    });
    const converseMessages = messages
        .filter((msg) => msg._getType() !== "system")
        .map((msg) => {
        if (msg._getType() === "ai") {
            const castMsg = msg;
            const assistantMsg = {
                role: "assistant",
                content: [],
            };
            if (castMsg.tool_calls && castMsg.tool_calls.length) {
                assistantMsg.content = castMsg.tool_calls.map((tc) => ({
                    toolUse: {
                        toolUseId: tc.id,
                        name: tc.name,
                        input: tc.args,
                    },
                }));
            }
            if (typeof castMsg.content === "string" && castMsg.content !== "") {
                assistantMsg.content?.push({
                    text: castMsg.content,
                });
            }
            else if (Array.isArray(castMsg.content)) {
                const contentBlocks = castMsg.content.map((block) => {
                    if (block.type === "text" && block.text !== "") {
                        return {
                            text: block.text,
                        };
                    }
                    else {
                        const blockValues = Object.fromEntries(Object.entries(block).filter(([key]) => key !== "type"));
                        throw new Error(`Unsupported content block type: ${block.type} with content of ${JSON.stringify(blockValues, null, 2)}`);
                    }
                });
                assistantMsg.content = [
                    ...(assistantMsg.content ? assistantMsg.content : []),
                    ...contentBlocks,
                ];
            }
            return assistantMsg;
        }
        else if (msg._getType() === "human" || msg._getType() === "generic") {
            if (typeof msg.content === "string" && msg.content !== "") {
                return {
                    role: "user",
                    content: [
                        {
                            text: msg.content,
                        },
                    ],
                };
            }
            else if (Array.isArray(msg.content)) {
                const contentBlocks = msg.content.flatMap((block) => {
                    if (block.type === "image_url") {
                        const base64 = typeof block.image_url === "string"
                            ? block.image_url
                            : block.image_url.url;
                        return extractImageInfo(base64);
                    }
                    else if (block.type === "text") {
                        return {
                            text: block.text,
                        };
                    }
                    else if (block.type === "document" &&
                        block.document !== undefined) {
                        return {
                            document: block.document,
                        };
                    }
                    else if (block.type === "image" && block.image !== undefined) {
                        return {
                            image: block.image,
                        };
                    }
                    else {
                        throw new Error(`Unsupported content block type: ${block.type}`);
                    }
                });
                return {
                    role: "user",
                    content: contentBlocks,
                };
            }
            else {
                throw new Error(`Invalid message content: empty string. '${msg._getType()}' must contain non-empty content.`);
            }
        }
        else if (msg._getType() === "tool") {
            const castMsg = msg;
            if (typeof castMsg.content === "string") {
                return {
                    // Tool use messages are always from the user
                    role: "user",
                    content: [
                        {
                            toolResult: {
                                toolUseId: castMsg.tool_call_id,
                                content: [
                                    {
                                        text: castMsg.content,
                                    },
                                ],
                            },
                        },
                    ],
                };
            }
            else {
                return {
                    // Tool use messages are always from the user
                    role: "user",
                    content: [
                        {
                            toolResult: {
                                toolUseId: castMsg.tool_call_id,
                                content: [
                                    {
                                        json: castMsg.content,
                                    },
                                ],
                            },
                        },
                    ],
                };
            }
        }
        else {
            throw new Error(`Unsupported message type: ${msg._getType()}`);
        }
    });
    // Combine consecutive user tool result messages into a single message
    const combinedConverseMessages = converseMessages.reduce((acc, curr) => {
        const lastMessage = acc[acc.length - 1];
        if (lastMessage &&
            lastMessage.role === "user" &&
            lastMessage.content?.some((c) => "toolResult" in c) &&
            curr.role === "user" &&
            curr.content?.some((c) => "toolResult" in c)) {
            lastMessage.content = lastMessage.content.concat(curr.content);
        }
        else {
            acc.push(curr);
        }
        return acc;
    }, []);
    return { converseMessages: combinedConverseMessages, converseSystem };
}
export function isBedrockTool(tool) {
    if (typeof tool === "object" && tool && "toolSpec" in tool) {
        return true;
    }
    return false;
}
export function convertToConverseTools(tools) {
    if (tools.every(isOpenAITool)) {
        return tools.map((tool) => ({
            toolSpec: {
                name: tool.function.name,
                description: tool.function.description,
                inputSchema: {
                    json: tool.function.parameters,
                },
            },
        }));
    }
    else if (tools.every(isLangChainTool)) {
        return tools.map((tool) => ({
            toolSpec: {
                name: tool.name,
                description: tool.description,
                inputSchema: {
                    json: zodToJsonSchema(tool.schema),
                },
            },
        }));
    }
    else if (tools.every(isBedrockTool)) {
        return tools;
    }
    throw new Error("Invalid tools passed. Must be an array of StructuredToolInterface, ToolDefinition, or BedrockTool.");
}
export function convertToBedrockToolChoice(toolChoice, tools, fields) {
    const supportsToolChoiceValues = fields.supportsToolChoiceValues ?? [];
    let bedrockToolChoice;
    if (typeof toolChoice === "string") {
        switch (toolChoice) {
            case "any":
                bedrockToolChoice = {
                    any: {},
                };
                break;
            case "auto":
                bedrockToolChoice = {
                    auto: {},
                };
                break;
            default: {
                const foundTool = tools.find((tool) => tool.toolSpec?.name === toolChoice);
                if (!foundTool) {
                    throw new Error(`Tool with name ${toolChoice} not found in tools list.`);
                }
                bedrockToolChoice = {
                    tool: {
                        name: toolChoice,
                    },
                };
            }
        }
    }
    else {
        bedrockToolChoice = toolChoice;
    }
    const toolChoiceType = Object.keys(bedrockToolChoice)[0];
    if (!supportsToolChoiceValues.includes(toolChoiceType)) {
        let supportedTxt = "";
        if (supportsToolChoiceValues.length) {
            supportedTxt =
                `Model ${fields.model} does not currently support 'tool_choice' ` +
                    `of type ${toolChoiceType}. The following 'tool_choice' types ` +
                    `are supported: ${supportsToolChoiceValues.join(", ")}.`;
        }
        else {
            supportedTxt = `Model ${fields.model} does not currently support 'tool_choice'.`;
        }
        throw new Error(`${supportedTxt} Please see` +
            "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ToolChoice.html" +
            "for the latest documentation on models that support tool choice.");
    }
    return bedrockToolChoice;
}
export function convertConverseMessageToLangChainMessage(message, responseMetadata) {
    if (!message.content) {
        throw new Error("No message content found in response.");
    }
    if (message.role !== "assistant") {
        throw new Error(`Unsupported message role received in ChatBedrockConverse response: ${message.role}`);
    }
    let requestId;
    if ("$metadata" in responseMetadata &&
        responseMetadata.$metadata &&
        typeof responseMetadata.$metadata === "object" &&
        "requestId" in responseMetadata.$metadata) {
        requestId = responseMetadata.$metadata.requestId;
    }
    let tokenUsage;
    if (responseMetadata.usage) {
        const input_tokens = responseMetadata.usage.inputTokens ?? 0;
        const output_tokens = responseMetadata.usage.outputTokens ?? 0;
        tokenUsage = {
            input_tokens,
            output_tokens,
            total_tokens: responseMetadata.usage.totalTokens ?? input_tokens + output_tokens,
        };
    }
    if (message.content?.length === 1 &&
        "text" in message.content[0] &&
        typeof message.content[0].text === "string") {
        return new AIMessage({
            content: message.content[0].text,
            response_metadata: responseMetadata,
            usage_metadata: tokenUsage,
            id: requestId,
        });
    }
    else {
        const toolCalls = [];
        const content = [];
        message.content.forEach((c) => {
            if ("toolUse" in c &&
                c.toolUse &&
                c.toolUse.name &&
                c.toolUse.input &&
                typeof c.toolUse.input === "object") {
                toolCalls.push({
                    id: c.toolUse.toolUseId,
                    name: c.toolUse.name,
                    args: c.toolUse.input,
                    type: "tool_call",
                });
            }
            else if ("text" in c && typeof c.text === "string") {
                content.push({ type: "text", text: c.text });
            }
            else {
                content.push(c);
            }
        });
        return new AIMessage({
            content: content.length ? content : "",
            tool_calls: toolCalls.length ? toolCalls : undefined,
            response_metadata: responseMetadata,
            usage_metadata: tokenUsage,
            id: requestId,
        });
    }
}
export function handleConverseStreamContentBlockDelta(contentBlockDelta) {
    if (!contentBlockDelta.delta) {
        throw new Error("No delta found in content block.");
    }
    if (typeof contentBlockDelta.delta.text === "string") {
        return new ChatGenerationChunk({
            text: contentBlockDelta.delta.text,
            message: new AIMessageChunk({
                content: contentBlockDelta.delta.text,
            }),
        });
    }
    else if (contentBlockDelta.delta.toolUse) {
        const index = contentBlockDelta.contentBlockIndex;
        return new ChatGenerationChunk({
            text: "",
            message: new AIMessageChunk({
                content: "",
                tool_call_chunks: [
                    {
                        args: contentBlockDelta.delta.toolUse.input,
                        index,
                        type: "tool_call_chunk",
                    },
                ],
            }),
        });
    }
    else {
        throw new Error(`Unsupported content block type(s): ${JSON.stringify(contentBlockDelta.delta, null, 2)}`);
    }
}
export function handleConverseStreamContentBlockStart(contentBlockStart) {
    const index = contentBlockStart.contentBlockIndex;
    if (contentBlockStart.start?.toolUse) {
        return new ChatGenerationChunk({
            text: "",
            message: new AIMessageChunk({
                content: "",
                tool_call_chunks: [
                    {
                        name: contentBlockStart.start.toolUse.name,
                        id: contentBlockStart.start.toolUse.toolUseId,
                        index,
                        type: "tool_call_chunk",
                    },
                ],
            }),
        });
    }
    throw new Error("Unsupported content block start event.");
}
export function handleConverseStreamMetadata(metadata, extra) {
    const inputTokens = metadata.usage?.inputTokens ?? 0;
    const outputTokens = metadata.usage?.outputTokens ?? 0;
    const usage_metadata = {
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_tokens: metadata.usage?.totalTokens ?? inputTokens + outputTokens,
    };
    return new ChatGenerationChunk({
        text: "",
        message: new AIMessageChunk({
            content: "",
            usage_metadata: extra.streamUsage ? usage_metadata : undefined,
            response_metadata: {
                // Use the same key as returned from the Converse API
                metadata,
            },
        }),
    });
}
