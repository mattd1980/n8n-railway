"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixExecutionDataType1690000000031 = void 0;
class FixExecutionDataType1690000000031 {
    async up({ queryRunner, tablePrefix }) {
        await queryRunner.query('ALTER TABLE `' + tablePrefix + 'execution_data` MODIFY COLUMN `data` MEDIUMTEXT');
    }
}
exports.FixExecutionDataType1690000000031 = FixExecutionDataType1690000000031;
//# sourceMappingURL=1690000000031-FixExecutionDataType.js.map