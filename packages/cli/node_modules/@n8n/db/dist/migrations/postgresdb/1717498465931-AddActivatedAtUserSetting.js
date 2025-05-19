"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddActivatedAtUserSetting1717498465931 = void 0;
class AddActivatedAtUserSetting1717498465931 {
    async up({ queryRunner, escape }) {
        const now = Date.now();
        await queryRunner.query(`UPDATE ${escape.tableName('user')}
			SET settings = jsonb_set(COALESCE(settings::jsonb, '{}'), '{userActivatedAt}', to_jsonb(${now}))
			WHERE settings IS NOT NULL AND (settings->>'userActivated')::boolean = true`);
    }
    async down({ queryRunner, escape }) {
        await queryRunner.query(`UPDATE ${escape.tableName('user')} SET settings = settings::jsonb - 'userActivatedAt' WHERE settings IS NOT NULL`);
    }
}
exports.AddActivatedAtUserSetting1717498465931 = AddActivatedAtUserSetting1717498465931;
//# sourceMappingURL=1717498465931-AddActivatedAtUserSetting.js.map