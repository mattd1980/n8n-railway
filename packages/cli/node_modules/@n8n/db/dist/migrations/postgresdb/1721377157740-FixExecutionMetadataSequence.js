"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixExecutionMetadataSequence1721377157740 = void 0;
class FixExecutionMetadataSequence1721377157740 {
    async up({ queryRunner, escape }) {
        const tableName = escape.tableName('execution_metadata');
        const sequenceName = escape.tableName('execution_metadata_temp_id_seq');
        await queryRunner.query(`SELECT setval('${sequenceName}', (SELECT MAX(id) FROM ${tableName}));`);
    }
}
exports.FixExecutionMetadataSequence1721377157740 = FixExecutionMetadataSequence1721377157740;
//# sourceMappingURL=1721377157740-FixExecutionMetadataSequence.js.map