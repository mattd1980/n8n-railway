"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddErrorColumnsToTestRuns1737715421462 = void 0;
class AddErrorColumnsToTestRuns1737715421462 {
    async up({ escape, runQuery }) {
        const tableName = escape.tableName('test_run');
        const errorCodeColumnName = escape.columnName('errorCode');
        const errorDetailsColumnName = escape.columnName('errorDetails');
        await runQuery(`ALTER TABLE ${tableName} ADD COLUMN ${errorCodeColumnName} VARCHAR(255);`);
        await runQuery(`ALTER TABLE ${tableName} ADD COLUMN ${errorDetailsColumnName} TEXT;`);
    }
    async down({ escape, runQuery }) {
        const tableName = escape.tableName('test_run');
        const errorCodeColumnName = escape.columnName('errorCode');
        const errorDetailsColumnName = escape.columnName('errorDetails');
        await runQuery(`ALTER TABLE ${tableName} DROP COLUMN ${errorCodeColumnName};`);
        await runQuery(`ALTER TABLE ${tableName} DROP COLUMN ${errorDetailsColumnName};`);
    }
}
exports.AddErrorColumnsToTestRuns1737715421462 = AddErrorColumnsToTestRuns1737715421462;
//# sourceMappingURL=1737715421462-AddErrorColumnsToTestRuns.js.map