"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixTestDefinitionPrimaryKey1739873751194 = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
class FixTestDefinitionPrimaryKey1739873751194 {
    async up({ queryRunner, tablePrefix }) {
        const table = await queryRunner.getTable(`${tablePrefix}test_definition`);
        (0, node_assert_1.default)(table, 'test_definition table not found');
        const brokenPrimaryColumn = table.primaryColumns.some((c) => c.name === 'tmp_id' && c.isPrimary);
        if (brokenPrimaryColumn) {
            await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition MODIFY COLUMN tmp_id INT NOT NULL;`);
            await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition DROP PRIMARY KEY, ADD PRIMARY KEY (\`id\`);`);
            await queryRunner.query(`DROP INDEX \`TMP_idx_${tablePrefix}test_definition_id\` ON ${tablePrefix}test_definition;`);
            await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition DROP COLUMN tmp_id;`);
        }
    }
}
exports.FixTestDefinitionPrimaryKey1739873751194 = FixTestDefinitionPrimaryKey1739873751194;
//# sourceMappingURL=1739873751194-FixTestDefinitionPrimaryKey.js.map