"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.n8nLanguage = exports.parserWithMetaData = void 0;
exports.n8nExpression = n8nExpression;
const language_1 = require("@codemirror/language");
const highlight_1 = require("@lezer/highlight");
const grammar_1 = require("./grammar");
exports.parserWithMetaData = grammar_1.parser.configure({
    props: [
        language_1.foldNodeProp.add({
            Application: language_1.foldInside,
        }),
        (0, highlight_1.styleTags)({
            OpenMarker: highlight_1.tags.brace,
            CloseMarker: highlight_1.tags.brace,
            Plaintext: highlight_1.tags.content,
            Resolvable: highlight_1.tags.string,
        }),
    ],
});
exports.n8nLanguage = language_1.LRLanguage.define({
    parser: exports.parserWithMetaData,
    languageData: {
        commentTokens: { line: ';' },
    },
});
function n8nExpression() {
    return new language_1.LanguageSupport(exports.n8nLanguage);
}
//# sourceMappingURL=index.js.map