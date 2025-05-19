"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropIndex = exports.CreateIndex = void 0;
const typeorm_1 = require("@n8n/typeorm");
const p_lazy_1 = __importDefault(require("p-lazy"));
class IndexOperation extends p_lazy_1.default {
    get fullTableName() {
        return [this.tablePrefix, this.tableName].join('');
    }
    get fullIndexName() {
        return ['IDX', `${this.tablePrefix}${this.tableName}`, ...this.columnNames].join('_');
    }
    constructor(tableName, columnNames, tablePrefix, queryRunner, customIndexName) {
        super((resolve) => {
            void this.execute(queryRunner).then(resolve);
        });
        this.tableName = tableName;
        this.columnNames = columnNames;
        this.tablePrefix = tablePrefix;
        this.customIndexName = customIndexName;
    }
}
class CreateIndex extends IndexOperation {
    constructor(tableName, columnNames, isUnique, tablePrefix, queryRunner, customIndexName) {
        super(tableName, columnNames, tablePrefix, queryRunner, customIndexName);
        this.isUnique = isUnique;
    }
    async execute(queryRunner) {
        const { columnNames, isUnique } = this;
        return await queryRunner.createIndex(this.fullTableName, new typeorm_1.TableIndex({ name: this.customIndexName ?? this.fullIndexName, columnNames, isUnique }));
    }
}
exports.CreateIndex = CreateIndex;
class DropIndex extends IndexOperation {
    constructor(tableName, columnNames, tablePrefix, queryRunner, customIndexName, skipIfMissing = false) {
        super(tableName, columnNames, tablePrefix, queryRunner, customIndexName);
        this.skipIfMissing = skipIfMissing;
    }
    async execute(queryRunner) {
        return await queryRunner
            .dropIndex(this.fullTableName, this.customIndexName ?? this.fullIndexName)
            .catch((error) => {
            if (error instanceof typeorm_1.TypeORMError &&
                error.message.includes('not found') &&
                this.skipIfMissing) {
                return;
            }
            throw error;
        });
    }
}
exports.DropIndex = DropIndex;
//# sourceMappingURL=indices.js.map