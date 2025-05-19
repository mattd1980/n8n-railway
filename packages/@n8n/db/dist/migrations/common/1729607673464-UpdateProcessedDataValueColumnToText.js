"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProcessedDataValueColumnToText1729607673464 = void 0;
const processedDataTableName = 'processed_data';
class UpdateProcessedDataValueColumnToText1729607673464 {
    async up({ schemaBuilder: { addNotNull }, isMysql, runQuery, tablePrefix }) {
        const prefixedTableName = `${tablePrefix}${processedDataTableName}`;
        await runQuery(`ALTER TABLE ${prefixedTableName} ADD COLUMN value_temp TEXT;`);
        await runQuery(`UPDATE ${prefixedTableName} SET value_temp = value;`);
        await runQuery(`ALTER TABLE ${prefixedTableName} DROP COLUMN value;`);
        if (isMysql) {
            await runQuery(`ALTER TABLE ${prefixedTableName} CHANGE value_temp value TEXT NOT NULL;`);
        }
        else {
            await runQuery(`ALTER TABLE ${prefixedTableName} RENAME COLUMN value_temp TO value`);
            await addNotNull(processedDataTableName, 'value');
        }
    }
    async down({ schemaBuilder: { addNotNull }, isMysql, runQuery, tablePrefix }) {
        const prefixedTableName = `${tablePrefix}${processedDataTableName}`;
        await runQuery(`ALTER TABLE ${prefixedTableName} ADD COLUMN value_temp VARCHAR(255);`);
        await runQuery(`UPDATE ${prefixedTableName} SET value_temp = value;`);
        await runQuery(`ALTER TABLE ${prefixedTableName} DROP COLUMN value;`);
        if (isMysql) {
            await runQuery(`ALTER TABLE ${prefixedTableName} CHANGE value_temp value VARCHAR(255) NOT NULL;`);
        }
        else {
            await runQuery(`ALTER TABLE ${prefixedTableName} RENAME COLUMN value_temp TO value`);
            await addNotNull(processedDataTableName, 'value');
        }
    }
}
exports.UpdateProcessedDataValueColumnToText1729607673464 = UpdateProcessedDataValueColumnToText1729607673464;
//# sourceMappingURL=1729607673464-UpdateProcessedDataValueColumnToText.js.map