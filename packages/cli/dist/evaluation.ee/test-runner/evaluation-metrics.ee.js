"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationMetrics = void 0;
const errors_ee_1 = require("../../evaluation.ee/test-runner/errors.ee");
class EvaluationMetrics {
    constructor(metricNames) {
        this.metricNames = metricNames;
        this.rawMetricsByName = new Map();
        for (const metricName of metricNames) {
            this.rawMetricsByName.set(metricName, []);
        }
    }
    addResults(result) {
        const addResultsInfo = {
            addedMetrics: {},
            missingMetrics: new Set(),
            unknownMetrics: new Set(),
            incorrectTypeMetrics: new Set(),
        };
        for (const [metricName, metricValue] of Object.entries(result)) {
            if (this.metricNames.has(metricName)) {
                if (typeof metricValue === 'number') {
                    addResultsInfo.addedMetrics[metricName] = metricValue;
                    this.rawMetricsByName.get(metricName).push(metricValue);
                }
                else {
                    throw new errors_ee_1.TestCaseExecutionError('INVALID_METRICS', {
                        metricName,
                        metricValue,
                    });
                }
            }
            else {
                addResultsInfo.unknownMetrics.add(metricName);
            }
        }
        return addResultsInfo;
    }
    getAggregatedMetrics() {
        const aggregatedMetrics = {};
        for (const [metricName, metricValues] of this.rawMetricsByName.entries()) {
            if (metricValues.length > 0) {
                const metricSum = metricValues.reduce((acc, val) => acc + val, 0);
                aggregatedMetrics[metricName] = metricSum / metricValues.length;
            }
        }
        return aggregatedMetrics;
    }
}
exports.EvaluationMetrics = EvaluationMetrics;
//# sourceMappingURL=evaluation-metrics.ee.js.map