"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddJsonKeyPinData1659888469333 = void 0;
const backend_common_1 = require("@n8n/backend-common");
function isJsonKeyObject(item) {
    if (!(0, backend_common_1.isObjectLiteral)(item))
        return false;
    return Object.keys(item).includes('json');
}
class AddJsonKeyPinData1659888469333 {
    async up({ escape, runQuery, runInBatches }) {
        const tableName = escape.tableName('workflow_entity');
        const columnName = escape.columnName('pinData');
        const selectQuery = `SELECT id, ${columnName} FROM ${tableName} WHERE ${columnName} IS NOT NULL`;
        await runInBatches(selectQuery, async (workflows) => {
            await Promise.all(this.makeUpdateParams(workflows).map(async (workflow) => await runQuery(`UPDATE ${tableName} SET ${columnName} = :pinData WHERE id = :id;`, {
                pinData: workflow.pinData,
                id: workflow.id,
            })));
        });
    }
    makeUpdateParams(fetchedWorkflows) {
        return fetchedWorkflows.reduce((updateParams, { id, pinData: rawPinData }) => {
            let pinDataPerWorkflow;
            if (typeof rawPinData === 'string') {
                try {
                    pinDataPerWorkflow = JSON.parse(rawPinData);
                }
                catch {
                    pinDataPerWorkflow = {};
                }
            }
            else {
                pinDataPerWorkflow = rawPinData;
            }
            const newPinDataPerWorkflow = Object.keys(pinDataPerWorkflow).reduce((newPinDataPerWorkflow, nodeName) => {
                let pinDataPerNode = pinDataPerWorkflow[nodeName];
                if (!Array.isArray(pinDataPerNode)) {
                    pinDataPerNode = [pinDataPerNode];
                }
                if (pinDataPerNode.every((item) => item.json))
                    return newPinDataPerWorkflow;
                newPinDataPerWorkflow[nodeName] = pinDataPerNode.map((item) => isJsonKeyObject(item) ? item : { json: item });
                return newPinDataPerWorkflow;
            }, {});
            if (Object.keys(newPinDataPerWorkflow).length > 0) {
                updateParams.push({ id, pinData: JSON.stringify(newPinDataPerWorkflow) });
            }
            return updateParams;
        }, []);
    }
}
exports.AddJsonKeyPinData1659888469333 = AddJsonKeyPinData1659888469333;
//# sourceMappingURL=1659888469333-AddJsonKeyPinData.js.map