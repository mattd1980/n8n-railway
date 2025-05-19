type TrendStat = 'avg' | 'min' | 'med' | 'max' | 'p(90)' | 'p(95)';
type MetricType = 'trend' | 'rate' | 'counter';
type MetricContains = 'time' | 'default' | 'data';
interface TrendValues {
    avg: number;
    min: number;
    med: number;
    max: number;
    'p(90)': number;
    'p(95)': number;
}
interface RateValues {
    rate: number;
    passes: number;
    fails: number;
}
interface CounterValues {
    count: number;
    rate: number;
}
interface K6TrendMetric {
    type: 'trend';
    contains: 'time';
    values: TrendValues;
}
interface RateMetric {
    type: 'rate';
    contains: 'default';
    values: RateValues;
}
interface K6CounterMetric {
    type: 'counter';
    contains: MetricContains;
    values: CounterValues;
}
interface Options {
    summaryTrendStats: TrendStat[];
    summaryTimeUnit: string;
    noColor: boolean;
}
interface State {
    isStdOutTTY: boolean;
    isStdErrTTY: boolean;
    testRunDurationMs: number;
}
interface Metrics {
    http_req_tls_handshaking: K6TrendMetric;
    checks: RateMetric;
    http_req_sending: K6TrendMetric;
    http_reqs: K6CounterMetric;
    http_req_blocked: K6TrendMetric;
    data_received: K6CounterMetric;
    iterations: K6CounterMetric;
    http_req_waiting: K6TrendMetric;
    http_req_receiving: K6TrendMetric;
    'http_req_duration{expected_response:true}': K6TrendMetric;
    iteration_duration: K6TrendMetric;
    http_req_connecting: K6TrendMetric;
    http_req_failed: RateMetric;
    http_req_duration: K6TrendMetric;
    data_sent: K6CounterMetric;
}
interface K6Check {
    name: string;
    path: string;
    id: string;
    passes: number;
    fails: number;
}
interface RootGroup {
    name: string;
    path: string;
    id: string;
    groups: unknown[];
    checks: K6Check[];
}
interface K6EndOfTestSummary {
    options: Options;
    state: State;
    metrics: Metrics;
    root_group: RootGroup;
}
