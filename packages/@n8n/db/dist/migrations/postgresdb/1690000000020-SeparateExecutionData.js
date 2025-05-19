"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparateExecutionData1690000000020 = void 0;
class SeparateExecutionData1690000000020 {
    async up({ queryRunner, tablePrefix }) {
        await queryRunner.query(`CREATE TABLE "${tablePrefix}execution_data" (
				"executionId" integer NOT NULL,
				"workflowData" json NOT NULL,
				"data" text NOT NULL,
				CONSTRAINT "${tablePrefix}execution_data_fk" FOREIGN KEY ("executionId") REFERENCES ${tablePrefix}execution_entity(id) ON DELETE CASCADE
			)`);
        await queryRunner.query(`INSERT INTO "${tablePrefix}execution_data" (
				"executionId",
				"workflowData",
				"data")
				SELECT "id", "workflowData", "data" FROM "${tablePrefix}execution_entity"
			`);
        await queryRunner.query(`ALTER TABLE "${tablePrefix}execution_entity" DROP COLUMN "workflowData",  DROP COLUMN "data"`);
    }
    async down({ queryRunner, tablePrefix }) {
        await queryRunner.query(`ALTER TABLE "${tablePrefix}execution_entity"
			ADD "workflowData" json NULL,
			ADD "data" text NULL`);
        await queryRunner.query(`UPDATE "${tablePrefix}execution_entity" SET "workflowData" = "execution_data"."workflowData", "data" = "execution_data"."data"
			FROM "${tablePrefix}execution_data" WHERE "${tablePrefix}execution_data"."executionId" = "${tablePrefix}execution_entity"."id"`);
        await queryRunner.query(`DROP TABLE "${tablePrefix}execution_data"`);
    }
}
exports.SeparateExecutionData1690000000020 = SeparateExecutionData1690000000020;
//# sourceMappingURL=1690000000020-SeparateExecutionData.js.map