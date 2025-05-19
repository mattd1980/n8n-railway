"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveNodesAccess1712044305787 = void 0;
class RemoveNodesAccess1712044305787 {
    async up({ schemaBuilder: { dropColumns } }) {
        await dropColumns('credentials_entity', ['nodesAccess']);
    }
}
exports.RemoveNodesAccess1712044305787 = RemoveNodesAccess1712044305787;
//# sourceMappingURL=1712044305787-RemoveNodesAccess.js.map