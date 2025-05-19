"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyWorkflowHistoryNodesAndConnections1695829275184 = void 0;
const tableName = 'workflow_history';
class ModifyWorkflowHistoryNodesAndConnections1695829275184 {
    async up({ schemaBuilder: { addColumns, dropColumns, column } }) {
        await dropColumns(tableName, ['nodes', 'connections']);
        await addColumns(tableName, [column('nodes').json.notNull, column('connections').json.notNull]);
    }
    async down({ schemaBuilder: { dropColumns, addColumns, column } }) {
        await dropColumns(tableName, ['nodes', 'connections']);
        await addColumns(tableName, [column('nodes').text.notNull, column('connections').text.notNull]);
    }
}
exports.ModifyWorkflowHistoryNodesAndConnections1695829275184 = ModifyWorkflowHistoryNodesAndConnections1695829275184;
//# sourceMappingURL=1695829275184-ModifyWorkflowHistoryNodesAndConnections.js.map