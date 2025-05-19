"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTestReport = buildTestReport;
const nanoid_1 = require("nanoid");
function k6CheckToCheck(check) {
    return {
        name: check.name,
        passes: check.passes,
        fails: check.fails,
    };
}
function k6CounterToCounter(counter) {
    return {
        type: 'counter',
        count: counter.values.count,
        rate: counter.values.rate,
    };
}
function k6TrendToTrend(trend) {
    return {
        type: 'trend',
        'p(90)': trend.values['p(90)'],
        avg: trend.values.avg,
        min: trend.values.min,
        med: trend.values.med,
        max: trend.values.max,
        'p(95)': trend.values['p(95)'],
    };
}
function buildTestReport(scenario, endOfTestSummary, tags) {
    return {
        runId: (0, nanoid_1.nanoid)(),
        ts: new Date().toISOString(),
        scenarioName: scenario.name,
        tags,
        checks: endOfTestSummary.root_group.checks.map(k6CheckToCheck),
        metrics: {
            dataReceived: k6CounterToCounter(endOfTestSummary.metrics.data_received),
            dataSent: k6CounterToCounter(endOfTestSummary.metrics.data_sent),
            httpRequests: k6CounterToCounter(endOfTestSummary.metrics.http_reqs),
            httpRequestDuration: k6TrendToTrend(endOfTestSummary.metrics.http_req_duration),
            httpRequestSending: k6TrendToTrend(endOfTestSummary.metrics.http_req_sending),
            httpRequestReceiving: k6TrendToTrend(endOfTestSummary.metrics.http_req_receiving),
            httpRequestWaiting: k6TrendToTrend(endOfTestSummary.metrics.http_req_waiting),
            iterations: k6CounterToCounter(endOfTestSummary.metrics.iterations),
        },
    };
}
//# sourceMappingURL=test-report.js.map