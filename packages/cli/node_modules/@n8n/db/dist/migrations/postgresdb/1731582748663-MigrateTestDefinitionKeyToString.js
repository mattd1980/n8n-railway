"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrateTestDefinitionKeyToString1731582748663 = void 0;
class MigrateTestDefinitionKeyToString1731582748663 {
    async up(context) {
        const { queryRunner, tablePrefix } = context;
        await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition RENAME COLUMN id to tmp_id;`);
        await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition ADD COLUMN id varchar(36);`);
        await queryRunner.query(`UPDATE ${tablePrefix}test_definition SET id = tmp_id::text;`);
        await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition ALTER COLUMN id SET NOT NULL;`);
        await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition ALTER COLUMN tmp_id DROP DEFAULT;`);
        await queryRunner.query(`DROP SEQUENCE IF EXISTS ${tablePrefix}test_definition_id_seq;`);
        await queryRunner.query(`CREATE UNIQUE INDEX "pk_${tablePrefix}test_definition_id" ON ${tablePrefix}test_definition ("id");`);
        await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition DROP CONSTRAINT IF EXISTS "PK_${tablePrefix}245a0013672c8cdc7727afa9b99";`);
        await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition DROP COLUMN tmp_id;`);
        await queryRunner.query(`ALTER TABLE ${tablePrefix}test_definition ADD PRIMARY KEY (id);`);
    }
}
exports.MigrateTestDefinitionKeyToString1731582748663 = MigrateTestDefinitionKeyToString1731582748663;
//# sourceMappingURL=1731582748663-MigrateTestDefinitionKeyToString.js.map