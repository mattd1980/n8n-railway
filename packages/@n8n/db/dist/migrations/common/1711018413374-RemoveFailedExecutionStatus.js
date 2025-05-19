"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFailedExecutionStatus1711018413374 = void 0;
class RemoveFailedExecutionStatus1711018413374 {
    async up({ escape, runQuery }) {
        const executionEntity = escape.tableName('execution_entity');
        await runQuery(`UPDATE ${executionEntity} SET status = 'error' WHERE status = 'failed';`);
    }
}
exports.RemoveFailedExecutionStatus1711018413374 = RemoveFailedExecutionStatus1711018413374;
//# sourceMappingURL=1711018413374-RemoveFailedExecutionStatus.js.map