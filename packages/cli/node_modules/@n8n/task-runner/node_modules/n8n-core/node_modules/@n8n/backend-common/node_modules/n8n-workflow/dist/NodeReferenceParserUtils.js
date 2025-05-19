"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDotNotationBannedChar = hasDotNotationBannedChar;
exports.backslashEscape = backslashEscape;
exports.dollarEscape = dollarEscape;
exports.applyAccessPatterns = applyAccessPatterns;
function hasDotNotationBannedChar(nodeName) {
    const DOT_NOTATION_BANNED_CHARS = /^(\d)|[\\ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/g;
    return DOT_NOTATION_BANNED_CHARS.test(nodeName);
}
function backslashEscape(nodeName) {
    const BACKSLASH_ESCAPABLE_CHARS = /[.*+?^${}()|[\]\\]/g;
    return nodeName.replace(BACKSLASH_ESCAPABLE_CHARS, (char) => `\\${char}`);
}
function dollarEscape(nodeName) {
    return nodeName.replace(new RegExp('\\$', 'g'), '$$$$');
}
const ACCESS_PATTERNS = [
    {
        checkPattern: '$(',
        replacePattern: (s) => String.raw `(\$\(['"])${s}(['"]\))`,
    },
    {
        checkPattern: '$node[',
        replacePattern: (s) => String.raw `(\$node\[['"])${s}(['"]\])`,
    },
    {
        checkPattern: '$node.',
        replacePattern: (s) => String.raw `(\$node\.)${s}(\.?)`,
        customCallback: (expression, newName, escapedNewName) => {
            if (hasDotNotationBannedChar(newName)) {
                const regex = new RegExp(`.${backslashEscape(newName)}( |\\.)`, 'g');
                return expression.replace(regex, `["${escapedNewName}"]$1`);
            }
            return expression;
        },
    },
    {
        checkPattern: '$items(',
        replacePattern: (s) => String.raw `(\$items\(['"])${s}(['"],|['"]\))`,
    },
];
function applyAccessPatterns(expression, previousName, newName) {
    if (!expression.includes(previousName))
        return expression;
    const escapedOldName = backslashEscape(previousName);
    const escapedNewName = dollarEscape(newName);
    for (const pattern of ACCESS_PATTERNS) {
        if (expression.includes(pattern.checkPattern)) {
            expression = expression.replace(new RegExp(pattern.replacePattern(escapedOldName), 'g'), `$1${escapedNewName}$2`);
            if (pattern.customCallback) {
                expression = pattern.customCallback(expression, newName, escapedNewName);
            }
        }
    }
    return expression;
}
//# sourceMappingURL=NodeReferenceParserUtils.js.map