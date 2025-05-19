import type { Page as PlaywrightPage, BrowserContext as PlaywrightContext } from "@playwright/test";
import { LLMClient } from "./llm/LLMClient";
import { ActOptions, ActResult, Stagehand } from "./index";
import { StagehandContext } from "./StagehandContext";
import { Page } from "../types/page";
import { ExtractOptions, ExtractResult, ObserveOptions, ObserveResult } from "../types/stagehand";
import { z } from "zod";
export declare class StagehandPage {
    private stagehand;
    private intPage;
    private intContext;
    private actHandler;
    private extractHandler;
    private observeHandler;
    private llmClient;
    constructor(page: PlaywrightPage, stagehand: Stagehand, context: StagehandContext, llmClient: LLMClient);
    init(): Promise<StagehandPage>;
    get page(): Page;
    get context(): PlaywrightContext;
    _waitForSettledDom(timeoutMs?: number): Promise<void>;
    startDomDebug(): Promise<void>;
    cleanupDomDebug(): Promise<void>;
    act({ action, modelName, modelClientOptions, useVision, variables, domSettleTimeoutMs, }: ActOptions): Promise<ActResult>;
    extract<T extends z.AnyZodObject>({ instruction, schema, modelName, modelClientOptions, domSettleTimeoutMs, useTextExtract, }: ExtractOptions<T>): Promise<ExtractResult<T>>;
    observe(options?: ObserveOptions): Promise<ObserveResult[]>;
}
