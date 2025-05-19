import * as z from "zod";
import { AssistantMessage, AssistantMessage$Outbound } from "./assistantmessage.js";
import { SystemMessage, SystemMessage$Outbound } from "./systemmessage.js";
import { ToolMessage, ToolMessage$Outbound } from "./toolmessage.js";
import { UserMessage, UserMessage$Outbound } from "./usermessage.js";
export type Two = (SystemMessage & {
    role: "system";
}) | (UserMessage & {
    role: "user";
}) | (AssistantMessage & {
    role: "assistant";
}) | (ToolMessage & {
    role: "tool";
});
export type One = (SystemMessage & {
    role: "system";
}) | (UserMessage & {
    role: "user";
}) | (AssistantMessage & {
    role: "assistant";
}) | (ToolMessage & {
    role: "tool";
});
/**
 * Chat to classify
 */
export type ChatClassificationRequestInputs = Array<(SystemMessage & {
    role: "system";
}) | (UserMessage & {
    role: "user";
}) | (AssistantMessage & {
    role: "assistant";
}) | (ToolMessage & {
    role: "tool";
})> | Array<Array<(SystemMessage & {
    role: "system";
}) | (UserMessage & {
    role: "user";
}) | (AssistantMessage & {
    role: "assistant";
}) | (ToolMessage & {
    role: "tool";
})>>;
export type ChatClassificationRequest = {
    /**
     * Chat to classify
     */
    inputs: Array<(SystemMessage & {
        role: "system";
    }) | (UserMessage & {
        role: "user";
    }) | (AssistantMessage & {
        role: "assistant";
    }) | (ToolMessage & {
        role: "tool";
    })> | Array<Array<(SystemMessage & {
        role: "system";
    }) | (UserMessage & {
        role: "user";
    }) | (AssistantMessage & {
        role: "assistant";
    }) | (ToolMessage & {
        role: "tool";
    })>>;
    model: string | null;
};
/** @internal */
export declare const Two$inboundSchema: z.ZodType<Two, z.ZodTypeDef, unknown>;
/** @internal */
export type Two$Outbound = (SystemMessage$Outbound & {
    role: "system";
}) | (UserMessage$Outbound & {
    role: "user";
}) | (AssistantMessage$Outbound & {
    role: "assistant";
}) | (ToolMessage$Outbound & {
    role: "tool";
});
/** @internal */
export declare const Two$outboundSchema: z.ZodType<Two$Outbound, z.ZodTypeDef, Two>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace Two$ {
    /** @deprecated use `Two$inboundSchema` instead. */
    const inboundSchema: z.ZodType<Two, z.ZodTypeDef, unknown>;
    /** @deprecated use `Two$outboundSchema` instead. */
    const outboundSchema: z.ZodType<Two$Outbound, z.ZodTypeDef, Two>;
    /** @deprecated use `Two$Outbound` instead. */
    type Outbound = Two$Outbound;
}
/** @internal */
export declare const One$inboundSchema: z.ZodType<One, z.ZodTypeDef, unknown>;
/** @internal */
export type One$Outbound = (SystemMessage$Outbound & {
    role: "system";
}) | (UserMessage$Outbound & {
    role: "user";
}) | (AssistantMessage$Outbound & {
    role: "assistant";
}) | (ToolMessage$Outbound & {
    role: "tool";
});
/** @internal */
export declare const One$outboundSchema: z.ZodType<One$Outbound, z.ZodTypeDef, One>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace One$ {
    /** @deprecated use `One$inboundSchema` instead. */
    const inboundSchema: z.ZodType<One, z.ZodTypeDef, unknown>;
    /** @deprecated use `One$outboundSchema` instead. */
    const outboundSchema: z.ZodType<One$Outbound, z.ZodTypeDef, One>;
    /** @deprecated use `One$Outbound` instead. */
    type Outbound = One$Outbound;
}
/** @internal */
export declare const ChatClassificationRequestInputs$inboundSchema: z.ZodType<ChatClassificationRequestInputs, z.ZodTypeDef, unknown>;
/** @internal */
export type ChatClassificationRequestInputs$Outbound = Array<(SystemMessage$Outbound & {
    role: "system";
}) | (UserMessage$Outbound & {
    role: "user";
}) | (AssistantMessage$Outbound & {
    role: "assistant";
}) | (ToolMessage$Outbound & {
    role: "tool";
})> | Array<Array<(SystemMessage$Outbound & {
    role: "system";
}) | (UserMessage$Outbound & {
    role: "user";
}) | (AssistantMessage$Outbound & {
    role: "assistant";
}) | (ToolMessage$Outbound & {
    role: "tool";
})>>;
/** @internal */
export declare const ChatClassificationRequestInputs$outboundSchema: z.ZodType<ChatClassificationRequestInputs$Outbound, z.ZodTypeDef, ChatClassificationRequestInputs>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ChatClassificationRequestInputs$ {
    /** @deprecated use `ChatClassificationRequestInputs$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ChatClassificationRequestInputs, z.ZodTypeDef, unknown>;
    /** @deprecated use `ChatClassificationRequestInputs$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ChatClassificationRequestInputs$Outbound, z.ZodTypeDef, ChatClassificationRequestInputs>;
    /** @deprecated use `ChatClassificationRequestInputs$Outbound` instead. */
    type Outbound = ChatClassificationRequestInputs$Outbound;
}
/** @internal */
export declare const ChatClassificationRequest$inboundSchema: z.ZodType<ChatClassificationRequest, z.ZodTypeDef, unknown>;
/** @internal */
export type ChatClassificationRequest$Outbound = {
    input: Array<(SystemMessage$Outbound & {
        role: "system";
    }) | (UserMessage$Outbound & {
        role: "user";
    }) | (AssistantMessage$Outbound & {
        role: "assistant";
    }) | (ToolMessage$Outbound & {
        role: "tool";
    })> | Array<Array<(SystemMessage$Outbound & {
        role: "system";
    }) | (UserMessage$Outbound & {
        role: "user";
    }) | (AssistantMessage$Outbound & {
        role: "assistant";
    }) | (ToolMessage$Outbound & {
        role: "tool";
    })>>;
    model: string | null;
};
/** @internal */
export declare const ChatClassificationRequest$outboundSchema: z.ZodType<ChatClassificationRequest$Outbound, z.ZodTypeDef, ChatClassificationRequest>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ChatClassificationRequest$ {
    /** @deprecated use `ChatClassificationRequest$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ChatClassificationRequest, z.ZodTypeDef, unknown>;
    /** @deprecated use `ChatClassificationRequest$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ChatClassificationRequest$Outbound, z.ZodTypeDef, ChatClassificationRequest>;
    /** @deprecated use `ChatClassificationRequest$Outbound` instead. */
    type Outbound = ChatClassificationRequest$Outbound;
}
//# sourceMappingURL=chatclassificationrequest.d.ts.map