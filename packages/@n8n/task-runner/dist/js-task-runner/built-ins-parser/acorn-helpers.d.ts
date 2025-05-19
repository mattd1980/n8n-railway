import type { AssignmentExpression, Identifier, Literal, MemberExpression, Node, VariableDeclarator } from 'acorn';
export declare function isLiteral(node?: Node): node is Literal;
export declare function isIdentifier(node?: Node): node is Identifier;
export declare function isMemberExpression(node?: Node): node is MemberExpression;
export declare function isVariableDeclarator(node?: Node): node is VariableDeclarator;
export declare function isAssignmentExpression(node?: Node): node is AssignmentExpression;
