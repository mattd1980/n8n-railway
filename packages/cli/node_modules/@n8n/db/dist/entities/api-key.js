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
exports.ApiKey = void 0;
const typeorm_1 = require("@n8n/typeorm");
const abstract_entity_1 = require("./abstract-entity");
const user_1 = require("./user");
let ApiKey = class ApiKey extends abstract_entity_1.WithTimestampsAndStringId {
};
exports.ApiKey = ApiKey;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_1.User)
], ApiKey.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], ApiKey.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], ApiKey.prototype, "label", void 0);
__decorate([
    (0, abstract_entity_1.JsonColumn)({ nullable: false }),
    __metadata("design:type", Array)
], ApiKey.prototype, "scopes", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], ApiKey.prototype, "apiKey", void 0);
exports.ApiKey = ApiKey = __decorate([
    (0, typeorm_1.Entity)('user_api_keys'),
    (0, typeorm_1.Unique)(['userId', 'label'])
], ApiKey);
//# sourceMappingURL=api-key.js.map