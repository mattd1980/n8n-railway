"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLiteral = isLiteral;
exports.isIdentifier = isIdentifier;
exports.isMemberExpression = isMemberExpression;
exports.isVariableDeclarator = isVariableDeclarator;
exports.isAssignmentExpression = isAssignmentExpression;
function isLiteral(node) {
    return node?.type === 'Literal';
}
function isIdentifier(node) {
    return node?.type === 'Identifier';
}
function isMemberExpression(node) {
    return node?.type === 'MemberExpression';
}
function isVariableDeclarator(node) {
    return node?.type === 'VariableDeclarator';
}
function isAssignmentExpression(node) {
    return node?.type === 'AssignmentExpression';
}
//# sourceMappingURL=acorn-helpers.js.map