"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMfaColumns1690000000030 = void 0;
class AddMfaColumns1690000000030 {
    async up({ schemaBuilder: { addColumns, column } }) {
        await addColumns('user', [
            column('mfaEnabled').bool.notNull.default(false),
            column('mfaSecret').text,
            column('mfaRecoveryCodes').text,
        ]);
    }
    async down({ schemaBuilder: { dropColumns } }) {
        await dropColumns('user', ['mfaEnabled', 'mfaSecret', 'mfaRecoveryCodes']);
    }
}
exports.AddMfaColumns1690000000030 = AddMfaColumns1690000000030;
//# sourceMappingURL=1690000000040-AddMfaColumns.js.map