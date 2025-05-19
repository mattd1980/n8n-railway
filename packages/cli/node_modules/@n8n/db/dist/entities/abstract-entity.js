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
exports.WithTimestampsAndStringId = exports.WithTimestamps = exports.WithStringId = exports.datetimeColumnType = exports.jsonColumnType = exports.dbType = void 0;
exports.JsonColumn = JsonColumn;
exports.DateTimeColumn = DateTimeColumn;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const generators_1 = require("../utils/generators");
exports.dbType = di_1.Container.get(config_1.GlobalConfig).database.type;
const timestampSyntax = {
    sqlite: "STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')",
    postgresdb: 'CURRENT_TIMESTAMP(3)',
    mysqldb: 'CURRENT_TIMESTAMP(3)',
    mariadb: 'CURRENT_TIMESTAMP(3)',
}[exports.dbType];
exports.jsonColumnType = exports.dbType === 'sqlite' ? 'simple-json' : 'json';
exports.datetimeColumnType = exports.dbType === 'postgresdb' ? 'timestamptz' : 'datetime';
function JsonColumn(options) {
    return (0, typeorm_1.Column)({
        ...options,
        type: exports.jsonColumnType,
    });
}
function DateTimeColumn(options) {
    return (0, typeorm_1.Column)({
        ...options,
        type: exports.datetimeColumnType,
    });
}
const tsColumnOptions = {
    precision: 3,
    default: () => timestampSyntax,
    type: exports.datetimeColumnType,
};
function mixinStringId(base) {
    class Derived extends base {
        generateId() {
            if (!this.id) {
                this.id = (0, generators_1.generateNanoId)();
            }
        }
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)('varchar'),
        __metadata("design:type", String)
    ], Derived.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Derived.prototype, "generateId", null);
    return Derived;
}
function mixinTimestamps(base) {
    class Derived extends base {
        setUpdateDate() {
            this.updatedAt = new Date();
        }
    }
    __decorate([
        (0, typeorm_1.CreateDateColumn)(tsColumnOptions),
        __metadata("design:type", Date)
    ], Derived.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(tsColumnOptions),
        __metadata("design:type", Date)
    ], Derived.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.BeforeUpdate)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Derived.prototype, "setUpdateDate", null);
    return Derived;
}
class BaseEntity {
}
exports.WithStringId = mixinStringId(BaseEntity);
exports.WithTimestamps = mixinTimestamps(BaseEntity);
exports.WithTimestampsAndStringId = mixinStringId(exports.WithTimestamps);
//# sourceMappingURL=abstract-entity.js.map