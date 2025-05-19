"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStatsColumnsToTestRun1736172058779 = void 0;
const columns = ['totalCases', 'passedCases', 'failedCases'];
class AddStatsColumnsToTestRun1736172058779 {
    async up({ escape, runQuery }) {
        const tableName = escape.tableName('test_run');
        const columnNames = columns.map((name) => escape.columnName(name));
        for (const name of columnNames) {
            await runQuery(`ALTER TABLE ${tableName} ADD COLUMN ${name} INT CHECK(
				CASE
					WHEN status = 'new' THEN ${name} IS NULL
					WHEN status in ('cancelled', 'error') THEN ${name} IS NULL OR ${name} >= 0
					ELSE ${name} >= 0
				END
			)`);
        }
    }
    async down({ escape, runQuery }) {
        const tableName = escape.tableName('test_run');
        const columnNames = columns.map((name) => escape.columnName(name));
        for (const name of columnNames) {
            await runQuery(`ALTER TABLE ${tableName} DROP COLUMN ${name}`);
        }
    }
}
exports.AddStatsColumnsToTestRun1736172058779 = AddStatsColumnsToTestRun1736172058779;
//# sourceMappingURL=1736172058779-AddStatsColumnsToTestRun.js.map