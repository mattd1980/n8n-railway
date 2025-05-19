import { GlobalConfig } from '@n8n/config';
import express from 'express';
import { Logger } from 'n8n-core';
import { TaskBrokerAuthController } from '../../task-runners/task-broker/auth/task-broker-auth.controller';
import { TaskBrokerWsServer } from '../../task-runners/task-broker/task-broker-ws-server';
export declare class TaskBrokerServer {
    private readonly logger;
    private readonly globalConfig;
    private readonly authController;
    private readonly taskBrokerWsServer;
    private server;
    private wsServer;
    readonly app: express.Application;
    get port(): number;
    private get upgradeEndpoint();
    constructor(logger: Logger, globalConfig: GlobalConfig, authController: TaskBrokerAuthController, taskBrokerWsServer: TaskBrokerWsServer);
    start(): Promise<void>;
    stop(): Promise<void>;
    private setupHttpServer;
    private setupWsServer;
    private setupErrorHandlers;
    private setupCommonMiddlewares;
    private configureRoutes;
    private handleUpgradeRequest;
    private getEndpointBasePath;
}
