"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMissingPrimaryKeyOnExecutionData1690787606731 = void 0;
class AddMissingPrimaryKeyOnExecutionData1690787606731 {
    async up({ queryRunner, tablePrefix }) {
        await queryRunner.query(`ALTER TABLE "${tablePrefix}execution_data" ADD PRIMARY KEY("executionId");`);
    }
}
exports.AddMissingPrimaryKeyOnExecutionData1690787606731 = AddMissingPrimaryKeyOnExecutionData1690787606731;
//# sourceMappingURL=1690787606731-AddMissingPrimaryKeyOnExecutionData.js.map