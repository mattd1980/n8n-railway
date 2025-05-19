"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = sql;
function sql(strings, ...values) {
    let result = '';
    for (let i = 0; i < values.length; i++) {
        result += strings[i];
        result += values[i];
    }
    result += strings[strings.length - 1];
    return result;
}
//# sourceMappingURL=sql.js.map