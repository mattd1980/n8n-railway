import { z, ZodType } from 'zod';
import { Page as Page$1, BrowserContext as BrowserContext$1, Browser as Browser$1 } from '@playwright/test';
import Browserbase from '@browserbasehq/sdk';
import { ClientOptions as ClientOptions$2 } from '@anthropic-ai/sdk';
import { ClientOptions as ClientOptions$1 } from 'openai';

type LogLine = {
    id?: string;
    category?: string;
    message: string;
    level?: 0 | 1 | 2;
    timestamp?: string;
    auxiliary?: {
        [key: string]: {
            value: string;
            type: "object" | "string" | "html" | "integer" | "float" | "boolean";
        };
    };
};

declare const AvailableModelSchema: z.ZodEnum<["gpt-4o", "gpt-4o-mini", "gpt-4o-2024-08-06", "claude-3-5-sonnet-latest", "claude-3-5-sonnet-20241022", "claude-3-5-sonnet-20240620", "o1-mini", "o1-preview"]>;
type AvailableModel = z.infer<typeof AvailableModelSchema>;
type ModelProvider = "openai" | "anthropic";
type ClientOptions = ClientOptions$1 | ClientOptions$2;
interface AnthropicJsonSchemaObject {
    definitions?: {
        MySchema?: {
            properties?: Record<string, unknown>;
            required?: string[];
        };
    };
    properties?: Record<string, unknown>;
    required?: string[];
}

interface LLMTool {
    type: "function";
    name: string;
    description: string;
    parameters: Record<string, unknown>;
}

interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: ChatMessageContent;
}
type ChatMessageContent = string | (ChatMessageImageContent | ChatMessageTextContent)[];
interface ChatMessageImageContent {
    type: "image_url";
    image_url: {
        url: string;
    };
    text?: string;
}
interface ChatMessageTextContent {
    type: string;
    text: string;
}
interface ChatCompletionOptions {
    messages: ChatMessage[];
    temperature?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    image?: {
        buffer: Buffer;
        description?: string;
    };
    response_model?: {
        name: string;
        schema: ZodType;
    };
    tools?: LLMTool[];
    tool_choice?: "auto" | "none" | "required";
    maxTokens?: number;
    requestId: string;
}
type LLMResponse = {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: {
            role: string;
            content: string | null;
            tool_calls: {
                id: string;
                type: string;
                function: {
                    name: string;
                    arguments: string;
                };
            }[];
        };
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
};
interface CreateChatCompletionOptions {
    options: ChatCompletionOptions;
    logger: (message: LogLine) => void;
    retries?: number;
}
declare abstract class LLMClient {
    type: "openai" | "anthropic" | string;
    modelName: AvailableModel;
    hasVision: boolean;
    clientOptions: ClientOptions;
    constructor(modelName: AvailableModel);
    abstract createChatCompletion<T = LLMResponse>(options: CreateChatCompletionOptions): Promise<T>;
}

declare class LLMProvider {
    private modelToProviderMap;
    private logger;
    private enableCaching;
    private cache;
    constructor(logger: (message: LogLine) => void, enableCaching: boolean);
    cleanRequestCache(requestId: string): void;
    getClient(modelName: AvailableModel, clientOptions?: ClientOptions): LLMClient;
}

interface ConstructorParams {
    env: "LOCAL" | "BROWSERBASE";
    apiKey?: string;
    projectId?: string;
    verbose?: 0 | 1 | 2;
    debugDom?: boolean;
    llmProvider?: LLMProvider;
    headless?: boolean;
    logger?: (message: LogLine) => void | Promise<void>;
    domSettleTimeoutMs?: number;
    browserbaseSessionCreateParams?: Browserbase.Sessions.SessionCreateParams;
    enableCaching?: boolean;
    browserbaseSessionID?: string;
    modelName?: AvailableModel;
    llmClient?: LLMClient;
    modelClientOptions?: ClientOptions;
}
interface InitOptions {
    /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
    modelName?: AvailableModel;
    /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
    modelClientOptions?: ClientOptions;
    /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
    domSettleTimeoutMs?: number;
}
interface InitResult {
    debugUrl: string;
    sessionUrl: string;
    sessionId: string;
}
interface InitFromPageOptions {
    page: Page;
    /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
    modelName?: AvailableModel;
    /** @deprecated Pass this into the Stagehand constructor instead. This will be removed in the next major version. */
    modelClientOptions?: ClientOptions;
}
interface InitFromPageResult {
    context: BrowserContext;
}
interface ActOptions {
    action: string;
    modelName?: AvailableModel;
    modelClientOptions?: ClientOptions;
    useVision?: "fallback" | boolean;
    variables?: Record<string, string>;
    domSettleTimeoutMs?: number;
}
interface ActResult {
    success: boolean;
    message: string;
    action: string;
}
interface ExtractOptions<T extends z.AnyZodObject> {
    instruction: string;
    schema: T;
    modelName?: AvailableModel;
    modelClientOptions?: ClientOptions;
    domSettleTimeoutMs?: number;
    useTextExtract?: boolean;
}
type ExtractResult<T extends z.AnyZodObject> = z.infer<T>;
interface ObserveOptions {
    instruction?: string;
    modelName?: AvailableModel;
    modelClientOptions?: ClientOptions;
    useVision?: boolean;
    domSettleTimeoutMs?: number;
}
interface ObserveResult {
    selector: string;
    description: string;
}

interface Page extends Omit<Page$1, "on"> {
    act: (options: ActOptions) => Promise<ActResult>;
    extract: <T extends z.AnyZodObject>(options: ExtractOptions<T>) => Promise<ExtractResult<T>>;
    observe: (options?: ObserveOptions) => Promise<ObserveResult[]>;
    on: {
        (event: "popup", listener: (page: Page) => unknown): Page;
    } & Page$1["on"];
}
type BrowserContext = BrowserContext$1;
type Browser = Browser$1;

interface BrowserResult {
    env: "LOCAL" | "BROWSERBASE";
    browser?: Browser;
    context: BrowserContext;
    debugUrl?: string;
    sessionUrl?: string;
    contextPath?: string;
    sessionId?: string;
}

declare class PlaywrightCommandException extends Error {
    constructor(message: string);
}
declare class PlaywrightCommandMethodNotSupportedException extends Error {
    constructor(message: string);
}
interface GotoOptions {
    timeout?: number;
    waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
    referer?: string;
}

declare class Stagehand {
    private stagehandPage;
    private stagehandContext;
    private intEnv;
    browserbaseSessionID?: string;
    readonly domSettleTimeoutMs: number;
    readonly debugDom: boolean;
    readonly headless: boolean;
    verbose: 0 | 1 | 2;
    llmProvider: LLMProvider;
    enableCaching: boolean;
    private apiKey;
    private projectId;
    private externalLogger?;
    private browserbaseSessionCreateParams?;
    variables: {
        [key: string]: unknown;
    };
    private contextPath?;
    private llmClient;
    constructor({ env, apiKey, projectId, verbose, debugDom, llmProvider, llmClient, headless, logger, browserbaseSessionCreateParams, domSettleTimeoutMs, enableCaching, browserbaseSessionID, modelName, modelClientOptions, }?: ConstructorParams);
    get logger(): (logLine: LogLine) => void;
    get page(): Page;
    get env(): "LOCAL" | "BROWSERBASE";
    get context(): BrowserContext;
    init(
    /** @deprecated Use constructor options instead */
    initOptions?: InitOptions): Promise<InitResult>;
    /** @deprecated initFromPage is deprecated and will be removed in the next major version. */
    initFromPage({ page, }: InitFromPageOptions): Promise<InitFromPageResult>;
    private pending_logs_to_send_to_browserbase;
    private is_processing_browserbase_logs;
    log(logObj: LogLine): void;
    private _run_browserbase_log_processing_cycle;
    private _log_to_browserbase;
    /** @deprecated Use stagehand.page.act() instead. This will be removed in the next major release. */
    act(options: ActOptions): Promise<ActResult>;
    /** @deprecated Use stagehand.page.extract() instead. This will be removed in the next major release. */
    extract<T extends z.AnyZodObject>(options: ExtractOptions<T>): Promise<ExtractResult<T>>;
    /** @deprecated Use stagehand.page.observe() instead. This will be removed in the next major release. */
    observe(options?: ObserveOptions): Promise<ObserveResult[]>;
    close(): Promise<void>;
}

export { type ActOptions, type ActResult, type AnthropicJsonSchemaObject, type AvailableModel, AvailableModelSchema, type Browser, type BrowserContext, type BrowserResult, type ClientOptions, type ConstructorParams, type ExtractOptions, type ExtractResult, type GotoOptions, type InitFromPageOptions, type InitFromPageResult, type InitOptions, type InitResult, LLMClient, type LogLine, type ModelProvider, type ObserveOptions, type ObserveResult, type Page, PlaywrightCommandException, PlaywrightCommandMethodNotSupportedException, Stagehand };
