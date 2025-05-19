import { LogLine } from "../../types/log";
import { LLMClient } from "../llm/LLMClient";
import { LLMProvider } from "../llm/LLMProvider";
import { StagehandContext } from "../StagehandContext";
import { StagehandPage } from "../StagehandPage";
export declare class StagehandActHandler {
    private readonly stagehandPage;
    private readonly verbose;
    private readonly llmProvider;
    private readonly enableCaching;
    private readonly logger;
    private readonly actionCache;
    private readonly actions;
    constructor({ verbose, llmProvider, enableCaching, logger, stagehandPage, }: {
        verbose: 0 | 1 | 2;
        llmProvider: LLMProvider;
        enableCaching: boolean;
        logger: (logLine: LogLine) => void;
        llmClient: LLMClient;
        stagehandPage: StagehandPage;
        stagehandContext: StagehandContext;
    });
    private _recordAction;
    private _verifyActionCompletion;
    private _performPlaywrightMethod;
    private _getComponentString;
    private getElement;
    private _checkIfCachedStepIsValid_oneXpath;
    private _getValidCachedStepXpath;
    private _runCachedActionIfAvailable;
    act({ action, steps, chunksSeen, llmClient, useVision, verifierUseVision, retries, requestId, variables, previousSelectors, skipActionCacheForThisStep, domSettleTimeoutMs, }: {
        action: string;
        steps?: string;
        chunksSeen: number[];
        llmClient: LLMClient;
        useVision: boolean | "fallback";
        verifierUseVision: boolean;
        retries?: number;
        requestId?: string;
        variables: Record<string, string>;
        previousSelectors: string[];
        skipActionCacheForThisStep: boolean;
        domSettleTimeoutMs?: number;
    }): Promise<{
        success: boolean;
        message: string;
        action: string;
    }>;
}
