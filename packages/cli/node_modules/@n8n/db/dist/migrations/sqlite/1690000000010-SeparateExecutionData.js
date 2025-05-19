"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparateExecutionData1690000000010 = void 0;
class SeparateExecutionData1690000000010 {
    async up(context) {
        const { queryRunner, tablePrefix } = context;
        await queryRunner.query(`CREATE TABLE "${tablePrefix}execution_data" (
				"executionId" int PRIMARY KEY NOT NULL,
				"workflowData" text NOT NULL,
				"data" text NOT NULL,
				FOREIGN KEY("executionId") REFERENCES "${tablePrefix}execution_entity" ("id") ON DELETE CASCADE
			)`);
        await context.copyTable('execution_entity', 'execution_data', ['id', 'workflowData', 'data'], ['executionId', 'workflowData', 'data']);
        await queryRunner.query(`ALTER TABLE \`${tablePrefix}execution_entity\` DROP COLUMN "workflowData"`);
        await queryRunner.query(`ALTER TABLE \`${tablePrefix}execution_entity\` DROP COLUMN "data"`);
    }
    async down({ queryRunner, tablePrefix }) {
        await queryRunner.query(`ALTER TABLE \`${tablePrefix}execution_entity\` ADD COLUMN "workflowData" text NULL`);
        await queryRunner.query(`ALTER TABLE \`${tablePrefix}execution_entity\` ADD COLUMN "data" text NULL`);
        await queryRunner.query(`UPDATE "${tablePrefix}execution_entity" SET "workflowData" = (SELECT "workflowData" FROM "${tablePrefix}execution_data" WHERE "${tablePrefix}execution_data"."executionId" = "${tablePrefix}execution_entity"."id")`);
        await queryRunner.query(`UPDATE "${tablePrefix}execution_entity" SET "data" = (SELECT "data" FROM "${tablePrefix}execution_data" WHERE "${tablePrefix}execution_data"."executionId" = "${tablePrefix}execution_entity"."id")`);
        await queryRunner.query(`DROP TABLE "${tablePrefix}execution_data"`);
    }
}
exports.SeparateExecutionData1690000000010 = SeparateExecutionData1690000000010;
//# sourceMappingURL=1690000000010-SeparateExecutionData.js.map