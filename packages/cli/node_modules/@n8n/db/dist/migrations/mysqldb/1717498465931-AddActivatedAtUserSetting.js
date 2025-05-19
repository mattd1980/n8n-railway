"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddActivatedAtUserSetting1717498465931 = void 0;
class AddActivatedAtUserSetting1717498465931 {
    async up({ queryRunner, escape }) {
        const now = Date.now();
        await queryRunner.query(`UPDATE ${escape.tableName('user')}
			SET settings = JSON_SET(COALESCE(settings, '{}'), '$.userActivatedAt', '${now}')
			WHERE settings IS NOT NULL AND JSON_EXTRACT(settings, '$.userActivated') = true`);
    }
    async down({ queryRunner, escape }) {
        await queryRunner.query(`UPDATE ${escape.tableName('user')}
			SET settings = JSON_REMOVE(settings, '$.userActivatedAt')
			WHERE settings IS NOT NULL`);
    }
}
exports.AddActivatedAtUserSetting1717498465931 = AddActivatedAtUserSetting1717498465931;
//# sourceMappingURL=1717498465931-AddActivatedAtUserSetting.js.map