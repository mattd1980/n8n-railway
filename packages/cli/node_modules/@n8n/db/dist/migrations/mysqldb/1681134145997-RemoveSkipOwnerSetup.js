"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveSkipOwnerSetup1681134145997 = void 0;
class RemoveSkipOwnerSetup1681134145997 {
    async up({ queryRunner, tablePrefix }) {
        await queryRunner.query(`DELETE FROM ${tablePrefix}settings WHERE \`key\` = 'userManagement.skipInstanceOwnerSetup';`);
    }
}
exports.RemoveSkipOwnerSetup1681134145997 = RemoveSkipOwnerSetup1681134145997;
//# sourceMappingURL=1681134145997-RemoveSkipOwnerSetup.js.map