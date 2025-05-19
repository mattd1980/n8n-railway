"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNodeIds1658930531669 = void 0;
const uuid_1 = require("uuid");
class AddNodeIds1658930531669 {
    async up({ escape, runQuery, runInBatches, parseJson }) {
        const tableName = escape.tableName('workflow_entity');
        const workflowsQuery = `SELECT id, nodes FROM ${tableName}`;
        await runInBatches(workflowsQuery, async (workflows) => {
            workflows.forEach(async (workflow) => {
                const nodes = parseJson(workflow.nodes);
                nodes.forEach((node) => {
                    if (!node.id) {
                        node.id = (0, uuid_1.v4)();
                    }
                });
                await runQuery(`UPDATE ${tableName} SET nodes = :nodes WHERE id = :id`, {
                    nodes: JSON.stringify(nodes),
                    id: workflow.id,
                });
            });
        });
    }
    async down({ escape, runQuery, runInBatches, parseJson }) {
        const tableName = escape.tableName('workflow_entity');
        const workflowsQuery = `SELECT id, nodes FROM ${tableName}`;
        await runInBatches(workflowsQuery, async (workflows) => {
            workflows.forEach(async (workflow) => {
                const nodes = parseJson(workflow.nodes).map(({ id, ...rest }) => rest);
                await runQuery(`UPDATE ${tableName} SET nodes = :nodes WHERE id = :id`, {
                    nodes: JSON.stringify(nodes),
                    id: workflow.id,
                });
            });
        });
    }
}
exports.AddNodeIds1658930531669 = AddNodeIds1658930531669;
//# sourceMappingURL=1658930531669-AddNodeIds.js.map