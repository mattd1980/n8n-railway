export declare const DIGITS = "0123456789";
export declare const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export declare const LOWERCASE_LETTERS: string;
export declare const ALPHABET: string;
export declare const BINARY_ENCODING = "base64";
export declare const WAIT_INDEFINITELY: Date;
export declare const LOG_LEVELS: readonly ["silent", "error", "warn", "info", "debug"];
export declare const CODE_LANGUAGES: readonly ["javaScript", "python"];
export declare const CODE_EXECUTION_MODES: readonly ["runOnceForAllItems", "runOnceForEachItem"];
export declare const CREDENTIAL_EMPTY_VALUE = "__n8n_EMPTY_VALUE_7b1af746-3729-4c60-9b9b-e08eb29e58da";
export declare const FORM_TRIGGER_PATH_IDENTIFIER = "n8n-form";
export declare const UNKNOWN_ERROR_MESSAGE = "There was an unknown issue while executing the node";
export declare const UNKNOWN_ERROR_DESCRIPTION = "Double-check the node configuration and the service it connects to. Check the error details below and refer to the <a href=\"https://docs.n8n.io\" target=\"_blank\">n8n documentation</a> to troubleshoot the issue.";
export declare const UNKNOWN_ERROR_MESSAGE_CRED = "UNKNOWN ERROR";
export declare const STICKY_NODE_TYPE = "n8n-nodes-base.stickyNote";
export declare const NO_OP_NODE_TYPE = "n8n-nodes-base.noOp";
export declare const HTTP_REQUEST_NODE_TYPE = "n8n-nodes-base.httpRequest";
export declare const WEBHOOK_NODE_TYPE = "n8n-nodes-base.webhook";
export declare const MANUAL_TRIGGER_NODE_TYPE = "n8n-nodes-base.manualTrigger";
export declare const EVALUATION_TRIGGER_NODE_TYPE = "n8n-nodes-base.evaluationTrigger";
export declare const EVALUATION_NODE_TYPE = "n8n-nodes-base.evaluation";
export declare const ERROR_TRIGGER_NODE_TYPE = "n8n-nodes-base.errorTrigger";
export declare const START_NODE_TYPE = "n8n-nodes-base.start";
export declare const EXECUTE_WORKFLOW_NODE_TYPE = "n8n-nodes-base.executeWorkflow";
export declare const EXECUTE_WORKFLOW_TRIGGER_NODE_TYPE = "n8n-nodes-base.executeWorkflowTrigger";
export declare const CODE_NODE_TYPE = "n8n-nodes-base.code";
export declare const FUNCTION_NODE_TYPE = "n8n-nodes-base.function";
export declare const FUNCTION_ITEM_NODE_TYPE = "n8n-nodes-base.functionItem";
export declare const MERGE_NODE_TYPE = "n8n-nodes-base.merge";
export declare const AI_TRANSFORM_NODE_TYPE = "n8n-nodes-base.aiTransform";
export declare const FORM_NODE_TYPE = "n8n-nodes-base.form";
export declare const FORM_TRIGGER_NODE_TYPE = "n8n-nodes-base.formTrigger";
export declare const CHAT_TRIGGER_NODE_TYPE = "@n8n/n8n-nodes-langchain.chatTrigger";
export declare const WAIT_NODE_TYPE = "n8n-nodes-base.wait";
export declare const STARTING_NODE_TYPES: string[];
export declare const SCRIPTING_NODE_TYPES: string[];
export declare const ADD_FORM_NOTICE = "addFormPage";
export declare const NODES_WITH_RENAMABLE_CONTENT: Set<string>;
export declare const MANUAL_CHAT_TRIGGER_LANGCHAIN_NODE_TYPE = "@n8n/n8n-nodes-langchain.manualChatTrigger";
export declare const AGENT_LANGCHAIN_NODE_TYPE = "@n8n/n8n-nodes-langchain.agent";
export declare const CHAIN_LLM_LANGCHAIN_NODE_TYPE = "@n8n/n8n-nodes-langchain.chainLlm";
export declare const OPENAI_LANGCHAIN_NODE_TYPE = "@n8n/n8n-nodes-langchain.openAi";
export declare const CHAIN_SUMMARIZATION_LANGCHAIN_NODE_TYPE = "@n8n/n8n-nodes-langchain.chainSummarization";
export declare const CODE_TOOL_LANGCHAIN_NODE_TYPE = "@n8n/n8n-nodes-langchain.toolCode";
export declare const WORKFLOW_TOOL_LANGCHAIN_NODE_TYPE = "@n8n/n8n-nodes-langchain.toolWorkflow";
export declare const HTTP_REQUEST_TOOL_LANGCHAIN_NODE_TYPE = "@n8n/n8n-nodes-langchain.toolHttpRequest";
export declare const LANGCHAIN_CUSTOM_TOOLS: string[];
export declare const SEND_AND_WAIT_OPERATION = "sendAndWait";
export declare const AI_TRANSFORM_CODE_GENERATED_FOR_PROMPT = "codeGeneratedForPrompt";
export declare const AI_TRANSFORM_JS_CODE = "jsCode";
export declare const TRIMMED_TASK_DATA_CONNECTIONS_KEY = "__isTrimmedManualExecutionDataItem";
export declare const OPEN_AI_API_CREDENTIAL_TYPE = "openAiApi";
export declare const FREE_AI_CREDITS_ERROR_TYPE = "free_ai_credits_request_error";
export declare const FREE_AI_CREDITS_USED_ALL_CREDITS_ERROR_CODE = 400;
export declare const FROM_AI_AUTO_GENERATED_MARKER = "/*n8n-auto-generated-fromAI-override*/";
export declare const PROJECT_ROOT = "0";
export declare const WAITING_FORMS_EXECUTION_STATUS = "n8n-execution-status";
