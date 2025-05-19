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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEntity = void 0;
const typeorm_1 = require("@n8n/typeorm");
let WebhookEntity = class WebhookEntity {
    get uniquePath() {
        return this.webhookPath.includes(':')
            ? [this.webhookId, this.webhookPath].join('/')
            : this.webhookPath;
    }
    get cacheKey() {
        return `webhook:${this.method}-${this.uniquePath}`;
    }
    get staticSegments() {
        return this.webhookPath.split('/').filter((s) => !s.startsWith(':'));
    }
    get isDynamic() {
        return this.webhookPath.split('/').some((s) => s.startsWith(':'));
    }
    display() {
        return `${this.method} ${this.webhookPath}`;
    }
};
exports.WebhookEntity = WebhookEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WebhookEntity.prototype, "workflowId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], WebhookEntity.prototype, "webhookPath", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'text' }),
    __metadata("design:type", String)
], WebhookEntity.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WebhookEntity.prototype, "node", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WebhookEntity.prototype, "webhookId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], WebhookEntity.prototype, "pathLength", void 0);
exports.WebhookEntity = WebhookEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['webhookId', 'method', 'pathLength'])
], WebhookEntity);
//# sourceMappingURL=webhook-entity.js.map