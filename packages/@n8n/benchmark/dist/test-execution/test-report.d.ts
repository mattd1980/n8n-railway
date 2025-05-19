import type { Scenario } from '../types/scenario';
export type K6Tag = {
    name: string;
    value: string;
};
export type Check = {
    name: string;
    passes: number;
    fails: number;
};
export type CounterMetric = {
    type: 'counter';
    count: number;
    rate: number;
};
export type TrendMetric = {
    type: 'trend';
    'p(95)': number;
    avg: number;
    min: number;
    med: number;
    max: number;
    'p(90)': number;
};
export type TestReport = {
    runId: string;
    ts: string;
    scenarioName: string;
    tags: K6Tag[];
    metrics: {
        iterations: CounterMetric;
        dataReceived: CounterMetric;
        dataSent: CounterMetric;
        httpRequests: CounterMetric;
        httpRequestDuration: TrendMetric;
        httpRequestSending: TrendMetric;
        httpRequestReceiving: TrendMetric;
        httpRequestWaiting: TrendMetric;
    };
    checks: Check[];
};
export declare function buildTestReport(scenario: Scenario, endOfTestSummary: K6EndOfTestSummary, tags: K6Tag[]): TestReport;
