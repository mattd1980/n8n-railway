"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInsParser = void 0;
const acorn_1 = require("acorn");
const acorn_walk_1 = require("acorn-walk");
const n8n_workflow_1 = require("n8n-workflow");
const acorn_helpers_1 = require("./acorn-helpers");
const built_ins_parser_state_1 = require("./built-ins-parser-state");
class BuiltInsParser {
    constructor() {
        this.visitCallExpression = (node, state, ancestors) => {
            const isDollar = node.callee.type === 'Identifier' && node.callee.name === '$';
            const isItems = node.callee.type === 'Identifier' && node.callee.name === '$items';
            if (isDollar) {
                this.visitDollarCallExpression(node, state, ancestors);
            }
            else if (isItems) {
                this.visitDollarItemsCallExpression(node, state);
            }
        };
        this.visitIdentifier = (node, state) => {
            if (node.name === '$env') {
                state.markEnvAsNeeded();
            }
            else if (node.name === '$item') {
                state.markNeedsAllNodes();
            }
            else if (node.name === '$input' ||
                node.name === '$json' ||
                node.name === 'items' ||
                node.name === 'item') {
                state.markInputAsNeeded();
            }
            else if (node.name === '$node') {
                state.markNeedsAllNodes();
            }
            else if (node.name === '$execution') {
                state.markExecutionAsNeeded();
            }
            else if (node.name === '$prevNode') {
                state.markPrevNodeAsNeeded();
            }
        };
    }
    parseUsedBuiltIns(code) {
        return (0, n8n_workflow_1.toResult)(() => {
            const wrappedCode = `async function VmCodeWrapper() { ${code} }`;
            const ast = (0, acorn_1.parse)(wrappedCode, { ecmaVersion: 2025, sourceType: 'module' });
            return this.identifyBuiltInsByWalkingAst(ast);
        });
    }
    identifyBuiltInsByWalkingAst(ast) {
        const accessedBuiltIns = new built_ins_parser_state_1.BuiltInsParserState();
        (0, acorn_walk_1.ancestor)(ast, {
            CallExpression: this.visitCallExpression,
            Identifier: this.visitIdentifier,
        }, undefined, accessedBuiltIns);
        return accessedBuiltIns;
    }
    visitDollarCallExpression(node, state, ancestors) {
        if (node.arguments.length === 0) {
            return;
        }
        const firstArg = node.arguments[0];
        if (!(0, acorn_helpers_1.isLiteral)(firstArg)) {
            state.markNeedsAllNodes();
            return;
        }
        if (typeof firstArg.value !== 'string') {
            return;
        }
        state.markNodeAsNeeded(firstArg.value);
        this.handlePrevNodeCall(node, state, ancestors);
    }
    visitDollarItemsCallExpression(node, state) {
        if (node.arguments.length === 0) {
            state.markInputAsNeeded();
            return;
        }
        const firstArg = node.arguments[0];
        if (!(0, acorn_helpers_1.isLiteral)(firstArg)) {
            state.markNeedsAllNodes();
            return;
        }
        if (typeof firstArg.value !== 'string') {
            return;
        }
        state.markNodeAsNeeded(firstArg.value);
    }
    handlePrevNodeCall(_node, state, ancestors) {
        const directParent = ancestors[ancestors.length - 2];
        if ((0, acorn_helpers_1.isMemberExpression)(directParent)) {
            const accessedProperty = directParent.property;
            if (directParent.computed) {
                if ((0, acorn_helpers_1.isLiteral)(accessedProperty)) {
                    if (this.isPairedItemProperty(accessedProperty.value)) {
                        state.markNeedsAllNodes();
                    }
                }
                else if ((0, acorn_helpers_1.isIdentifier)(accessedProperty)) {
                    state.markNeedsAllNodes();
                }
            }
            else if ((0, acorn_helpers_1.isIdentifier)(accessedProperty) && this.isPairedItemProperty(accessedProperty.name)) {
                state.markNeedsAllNodes();
            }
        }
        else if ((0, acorn_helpers_1.isVariableDeclarator)(directParent) || (0, acorn_helpers_1.isAssignmentExpression)(directParent)) {
            state.markNeedsAllNodes();
        }
        else {
            state.markNeedsAllNodes();
        }
    }
    isPairedItemProperty(property) {
        return property === 'item' || property === 'pairedItem' || property === 'itemMatching';
    }
}
exports.BuiltInsParser = BuiltInsParser;
//# sourceMappingURL=built-ins-parser.js.map