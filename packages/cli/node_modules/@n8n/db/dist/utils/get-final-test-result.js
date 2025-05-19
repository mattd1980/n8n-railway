"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestRunFinalResult = getTestRunFinalResult;
function getTestRunFinalResult(testCaseExecutions) {
    const severityMap = {
        error: 3,
        warning: 2,
        success: 1,
    };
    let finalResult = 'success';
    for (const testCaseExecution of testCaseExecutions) {
        if (['error', 'warning'].includes(testCaseExecution.status)) {
            if (testCaseExecution.status in severityMap &&
                severityMap[testCaseExecution.status] > severityMap[finalResult]) {
                finalResult = testCaseExecution.status;
            }
        }
    }
    return finalResult;
}
//# sourceMappingURL=get-final-test-result.js.map