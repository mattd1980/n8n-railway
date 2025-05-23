"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const api_types_1 = require("@n8n/api-types");
const decorators_1 = require("@n8n/decorators");
const n8n_workflow_1 = require("n8n-workflow");
const node_assert_1 = require("node:assert");
const web_1 = require("node:stream/web");
const constants_1 = require("../constants");
const credentials_service_1 = require("../credentials/credentials.service");
const internal_server_error_1 = require("../errors/response-errors/internal-server.error");
const ai_workflow_builder_service_1 = require("../services/ai-workflow-builder.service");
const ai_service_1 = require("../services/ai.service");
const user_service_1 = require("../services/user.service");
let AiController = class AiController {
    constructor(aiService, workflowBuilderService, credentialsService, userService) {
        this.aiService = aiService;
        this.workflowBuilderService = workflowBuilderService;
        this.credentialsService = credentialsService;
        this.userService = userService;
    }
    async build(req, res, payload) {
        try {
            const aiResponse = this.workflowBuilderService.chat({
                question: payload.payload.question ?? '',
            }, req.user);
            res.header('Content-type', 'application/json-lines').flush();
            for await (const chunk of aiResponse) {
                res.flush();
                res.write(JSON.stringify(chunk) + '⧉⇋⇋➽⌑⧉§§\n');
            }
            res.end();
        }
        catch (e) {
            (0, node_assert_1.strict)(e instanceof Error);
            throw new internal_server_error_1.InternalServerError(e.message, e);
        }
    }
    async chat(req, res, payload) {
        try {
            const aiResponse = await this.aiService.chat(payload, req.user);
            if (aiResponse.body) {
                res.header('Content-type', 'application/json-lines').flush();
                await aiResponse.body.pipeTo(new web_1.WritableStream({
                    write(chunk) {
                        res.write(chunk);
                        res.flush();
                    },
                }));
                res.end();
            }
        }
        catch (e) {
            (0, node_assert_1.strict)(e instanceof Error);
            throw new internal_server_error_1.InternalServerError(e.message, e);
        }
    }
    async applySuggestion(req, _, payload) {
        try {
            return await this.aiService.applySuggestion(payload, req.user);
        }
        catch (e) {
            (0, node_assert_1.strict)(e instanceof Error);
            throw new internal_server_error_1.InternalServerError(e.message, e);
        }
    }
    async askAi(req, _, payload) {
        try {
            return await this.aiService.askAi(payload, req.user);
        }
        catch (e) {
            (0, node_assert_1.strict)(e instanceof Error);
            throw new internal_server_error_1.InternalServerError(e.message, e);
        }
    }
    async aiCredits(req, _, payload) {
        try {
            const aiCredits = await this.aiService.createFreeAiCredits(req.user);
            const credentialProperties = {
                name: constants_1.FREE_AI_CREDITS_CREDENTIAL_NAME,
                type: n8n_workflow_1.OPEN_AI_API_CREDENTIAL_TYPE,
                data: {
                    apiKey: aiCredits.apiKey,
                    url: aiCredits.url,
                },
                projectId: payload?.projectId,
            };
            const newCredential = await this.credentialsService.createManagedCredential(credentialProperties, req.user);
            await this.userService.updateSettings(req.user.id, {
                userClaimedAiCredits: true,
            });
            return newCredential;
        }
        catch (e) {
            (0, node_assert_1.strict)(e instanceof Error);
            throw new internal_server_error_1.InternalServerError(e.message, e);
        }
    }
};
exports.AiController = AiController;
__decorate([
    (0, decorators_1.Post)('/build', { rateLimit: { limit: 100 } }),
    __param(2, decorators_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, api_types_1.AiBuilderChatRequestDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "build", null);
__decorate([
    (0, decorators_1.Post)('/chat', { rateLimit: { limit: 100 } }),
    __param(2, decorators_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, api_types_1.AiChatRequestDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "chat", null);
__decorate([
    (0, decorators_1.Post)('/chat/apply-suggestion'),
    __param(2, decorators_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, api_types_1.AiApplySuggestionRequestDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "applySuggestion", null);
__decorate([
    (0, decorators_1.Post)('/ask-ai'),
    __param(2, decorators_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, api_types_1.AiAskRequestDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "askAi", null);
__decorate([
    (0, decorators_1.Post)('/free-credits'),
    __param(2, decorators_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, api_types_1.AiFreeCreditsRequestDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "aiCredits", null);
exports.AiController = AiController = __decorate([
    (0, decorators_1.RestController)('/ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService,
        ai_workflow_builder_service_1.WorkflowBuilderService,
        credentials_service_1.CredentialsService,
        user_service_1.UserService])
], AiController);
//# sourceMappingURL=ai.controller.js.map