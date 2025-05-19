"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueWorkflowNames1620821879465 = void 0;
class UniqueWorkflowNames1620821879465 {
    constructor() {
        this.indexSuffix = '943d8f922be094eb507cb9a7f9';
    }
    async up({ isMysql, escape, runQuery }) {
        const tableName = escape.tableName('workflow_entity');
        const workflowNames = await runQuery(`SELECT name FROM ${tableName}`);
        for (const { name } of workflowNames) {
            const duplicates = await runQuery(`SELECT id, name FROM ${tableName} WHERE name = :name ORDER BY createdAt ASC`, { name });
            if (duplicates.length > 1) {
                await Promise.all(duplicates.map(async (workflow, index) => {
                    if (index === 0)
                        return;
                    return await runQuery(`UPDATE ${tableName} SET name = :name WHERE id = :id`, {
                        name: `${workflow.name} ${index + 1}`,
                        id: workflow.id,
                    });
                }));
            }
        }
        const indexName = escape.indexName(this.indexSuffix);
        await runQuery(isMysql
            ? `ALTER TABLE ${tableName} ADD UNIQUE INDEX ${indexName} (${escape.columnName('name')})`
            : `CREATE UNIQUE INDEX ${indexName} ON ${tableName} ("name")`);
    }
    async down({ isMysql, escape, runQuery }) {
        const tableName = escape.tableName('workflow_entity');
        const indexName = escape.indexName(this.indexSuffix);
        await runQuery(isMysql ? `ALTER TABLE ${tableName} DROP INDEX ${indexName}` : `DROP INDEX ${indexName}`);
    }
}
exports.UniqueWorkflowNames1620821879465 = UniqueWorkflowNames1620821879465;
//# sourceMappingURL=1620821879465-UniqueWorkflowNames.js.map