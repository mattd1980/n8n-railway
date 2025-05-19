"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveResetPasswordColumns1690000000030 = void 0;
class RemoveResetPasswordColumns1690000000030 {
    async up({ schemaBuilder: { dropColumns } }) {
        await dropColumns('user', ['resetPasswordToken', 'resetPasswordTokenExpiration']);
    }
    async down({ schemaBuilder: { addColumns, column } }) {
        await addColumns('user', [
            column('resetPasswordToken').varchar(),
            column('resetPasswordTokenExpiration').int,
        ]);
    }
}
exports.RemoveResetPasswordColumns1690000000030 = RemoveResetPasswordColumns1690000000030;
//# sourceMappingURL=1690000000030-RemoveResetPasswordColumns.js.map