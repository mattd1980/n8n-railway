"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringExtensions = exports.SupportedHashAlgorithms = void 0;
exports.toJsonString = toJsonString;
exports.toDateTime = toDateTime;
const js_base64_1 = require("js-base64");
const jssha_1 = __importDefault(require("jssha"));
const luxon_1 = require("luxon");
const md5_1 = __importDefault(require("md5"));
const title_case_1 = require("title-case");
const transliteration_1 = require("transliteration");
const NumberExtensions_1 = require("./NumberExtensions");
const expression_extension_error_1 = require("../errors/expression-extension.error");
const TypeValidation_1 = require("../TypeValidation");
exports.SupportedHashAlgorithms = [
    'md5',
    'sha1',
    'sha224',
    'sha256',
    'sha384',
    'sha512',
    'sha3',
];
const CURRENCY_REGEXP = /(\u004c\u0065\u006b|\u060b|\u0024|\u0192|\u20bc|\u0042\u0072|\u0042\u005a\u0024|\u0024\u0062|\u004b\u004d|\u0050|\u043b\u0432|\u0052\u0024|\u17db|\u00a5|\u20a1|\u006b\u006e|\u20b1|\u004b\u010d|\u006b\u0072|\u0052\u0044\u0024|\u00a3|\u20ac|\u00a2|\u0051|\u004c|\u0046\u0074|\u20b9|\u0052\u0070|\ufdfc|\u20aa|\u004a\u0024|\u20a9|\u20ad|\u0434\u0435\u043d|\u0052\u004d|\u20a8|\u20ae|\u004d\u0054|\u0043\u0024|\u20a6|\u0042\u002f\u002e|\u0047\u0073|\u0053\u002f\u002e|\u007a\u0142|\u006c\u0065\u0069|\u20bd|\u0414\u0438\u043d\u002e|\u0053|\u0052|\u0043\u0048\u0046|\u004e\u0054\u0024|\u0e3f|\u0054\u0054\u0024|\u20ba|\u20b4|\u0024\u0055|\u0042\u0073|\u20ab|\u005a\u0024)/gu;
const DOMAIN_EXTRACT_REGEXP = /^(?:(?:https?|ftp):\/\/)?(?:mailto:)?(?:\/\/)?((?:www\.)?(?:(?:[-\w]+\.)+(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(?::\d+)?(?:\/[^\s?]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/i;
const DOMAIN_REGEXP = /^(?:www\.)?((?:(?:[-\w]+\.)+(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(?::\d+)?(?:\/[^\s?]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/i;
const EMAIL_REGEXP = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(?<domain>(\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
const URL_REGEXP_EXACT = /^(?:(?:https?|ftp):\/\/)(?:www\.)?((?:(?:[-\w]+\.)+(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(?::\d+)?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?=([^\s]+#.*)?)#?[^\s]*$/i;
const URL_REGEXP = /(?:(?:https?|ftp):\/\/)(?:www\.)?((?:(?:[-\w]+\.)+(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(?::\d+)?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?=([^\s]+#.*)?)#?[^\s]*/i;
const CHAR_TEST_REGEXP = /\p{L}/u;
const PUNC_TEST_REGEXP = /[!?.]/;
function hash(value, extraArgs) {
    const algorithm = extraArgs[0]?.toLowerCase() ?? 'md5';
    switch (algorithm) {
        case 'base64':
            return (0, js_base64_1.toBase64)(value);
        case 'md5':
            return (0, md5_1.default)(value);
        case 'sha1':
        case 'sha224':
        case 'sha256':
        case 'sha384':
        case 'sha512':
        case 'sha3':
            const variant = {
                sha1: 'SHA-1',
                sha224: 'SHA-224',
                sha256: 'SHA-256',
                sha384: 'SHA-384',
                sha512: 'SHA-512',
                sha3: 'SHA3-512',
            }[algorithm];
            return new jssha_1.default(variant, 'TEXT').update(value).getHash('HEX');
        default:
            throw new expression_extension_error_1.ExpressionExtensionError(`Unknown algorithm ${algorithm}. Available algorithms are: ${exports.SupportedHashAlgorithms.join()}, and Base64.`);
    }
}
function isEmpty(value) {
    return value === '';
}
function isNotEmpty(value) {
    return !isEmpty(value);
}
function length(value) {
    return value.length;
}
function toJsonString(value) {
    return JSON.stringify(value);
}
function removeMarkdown(value) {
    let output = value;
    try {
        output = output.replace(/^([\s\t]*)([*\-+]|\d\.)\s+/gm, '$1');
        output = output
            .replace(/\n={2,}/g, '\n')
            .replace(/~~/g, '')
            .replace(/`{3}.*\n/g, '');
        output = output
            .replace(/<[\w|\s|=|'|"|:|(|)|,|;|/|0-9|.|-]+[>|\\>]/g, '')
            .replace(/^[=-]{2,}\s*$/g, '')
            .replace(/\[\^.+?\](: .*?$)?/g, '')
            .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
            .replace(/!\[.*?\][[(].*?[\])]/g, '')
            .replace(/\[(.*?)\][[(].*?[\])]/g, '$1')
            .replace(/>/g, '')
            .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
            .replace(/^#{1,6}\s*([^#]*)\s*(#{1,6})?/gm, '$1')
            .replace(/([*_]{1,3})(\S.*?\S)\1/g, '$2')
            .replace(/(`{3,})(.*?)\1/gm, '$2')
            .replace(/^-{3,}\s*$/g, '')
            .replace(/`(.+?)`/g, '$1')
            .replace(/\n{2,}/g, '\n\n');
    }
    catch (e) {
        return value;
    }
    return output;
}
function removeTags(value) {
    return value.replace(/<[^>]*>?/gm, '');
}
function toDate(value) {
    const date = new Date(Date.parse(value));
    if (date.toString() === 'Invalid Date') {
        throw new expression_extension_error_1.ExpressionExtensionError('cannot convert to date');
    }
    if (!/:/.test(value)) {
        date.setHours(0, 0, 0);
    }
    return date;
}
function toDateTime(value, extraArgs = ['']) {
    try {
        const [valueFormat] = extraArgs;
        if (valueFormat) {
            if (valueFormat === 'ms' ||
                valueFormat === 's' ||
                valueFormat === 'us' ||
                valueFormat === 'excel') {
                return (0, NumberExtensions_1.toDateTime)(Number(value), [valueFormat]);
            }
            return luxon_1.DateTime.fromFormat(value, valueFormat);
        }
        return (0, TypeValidation_1.tryToParseDateTime)(value);
    }
    catch (error) {
        throw new expression_extension_error_1.ExpressionExtensionError('cannot convert to Luxon DateTime');
    }
}
function urlDecode(value, extraArgs) {
    const [entireString = false] = extraArgs;
    if (entireString) {
        return decodeURI(value.toString());
    }
    return decodeURIComponent(value.toString());
}
function urlEncode(value, extraArgs) {
    const [entireString = false] = extraArgs;
    if (entireString) {
        return encodeURI(value.toString());
    }
    return encodeURIComponent(value.toString());
}
function toInt(value, extraArgs) {
    const [radix] = extraArgs;
    const int = parseInt(value.replace(CURRENCY_REGEXP, ''), radix);
    if (isNaN(int)) {
        throw new expression_extension_error_1.ExpressionExtensionError('cannot convert to integer');
    }
    return int;
}
function toFloat(value) {
    if (value.includes(',')) {
        throw new expression_extension_error_1.ExpressionExtensionError('cannot convert to float, expected . as decimal separator');
    }
    const float = parseFloat(value.replace(CURRENCY_REGEXP, ''));
    if (isNaN(float)) {
        throw new expression_extension_error_1.ExpressionExtensionError('cannot convert to float');
    }
    return float;
}
function toNumber(value) {
    const num = Number(value.replace(CURRENCY_REGEXP, ''));
    if (isNaN(num)) {
        throw new expression_extension_error_1.ExpressionExtensionError('cannot convert to number');
    }
    return num;
}
function quote(value, extraArgs) {
    const [quoteChar = '"'] = extraArgs;
    return `${quoteChar}${value
        .replace(/\\/g, '\\\\')
        .replace(new RegExp(`\\${quoteChar}`, 'g'), `\\${quoteChar}`)}${quoteChar}`;
}
function isNumeric(value) {
    if (value.includes(' '))
        return false;
    return !isNaN(value) && !isNaN(parseFloat(value));
}
function isUrl(value) {
    return URL_REGEXP_EXACT.test(value);
}
function isDomain(value) {
    return DOMAIN_REGEXP.test(value);
}
function isEmail(value) {
    const result = EMAIL_REGEXP.test(value);
    if (result && value.includes(' ')) {
        return false;
    }
    return result;
}
function toTitleCase(value) {
    return (0, title_case_1.titleCase)(value);
}
function replaceSpecialChars(value) {
    return (0, transliteration_1.transliterate)(value, { unknown: '?' });
}
function toSentenceCase(value) {
    let current = value.slice();
    let buffer = '';
    while (CHAR_TEST_REGEXP.test(current)) {
        const charIndex = current.search(CHAR_TEST_REGEXP);
        current =
            current.slice(0, charIndex) +
                current[charIndex].toLocaleUpperCase() +
                current.slice(charIndex + 1).toLocaleLowerCase();
        const puncIndex = current.search(PUNC_TEST_REGEXP);
        if (puncIndex === -1) {
            buffer += current;
            current = '';
            break;
        }
        buffer += current.slice(0, puncIndex + 1);
        current = current.slice(puncIndex + 1);
    }
    return buffer;
}
function toSnakeCase(value) {
    return value
        .toLocaleLowerCase()
        .replace(/[ \-]/g, '_')
        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,.\/:;<=>?@\[\]^`{|}~]/g, '');
}
function extractEmail(value) {
    const matched = EMAIL_REGEXP.exec(value);
    if (!matched) {
        return undefined;
    }
    return matched[0];
}
function extractDomain(value) {
    if (isEmail(value)) {
        const matched = EMAIL_REGEXP.exec(value);
        if (!matched) {
            return undefined;
        }
        return matched.groups?.domain;
    }
    const domainMatch = value.match(DOMAIN_EXTRACT_REGEXP);
    if (domainMatch) {
        return domainMatch[1];
    }
    return undefined;
}
function extractUrl(value) {
    const matched = URL_REGEXP.exec(value);
    if (!matched) {
        return undefined;
    }
    return matched[0];
}
function extractUrlPath(value) {
    try {
        const url = new URL(value);
        return url.pathname;
    }
    catch (error) {
        return undefined;
    }
}
function parseJson(value) {
    try {
        return JSON.parse(value);
    }
    catch (error) {
        if (value.includes("'")) {
            throw new expression_extension_error_1.ExpressionExtensionError("Parsing failed. Check you're using double quotes");
        }
        throw new expression_extension_error_1.ExpressionExtensionError('Parsing failed');
    }
}
function toBoolean(value) {
    const normalized = value.toLowerCase();
    const FALSY = new Set(['false', 'no', '0']);
    return normalized.length > 0 && !FALSY.has(normalized);
}
function base64Encode(value) {
    return (0, js_base64_1.toBase64)(value);
}
function base64Decode(value) {
    return (0, js_base64_1.fromBase64)(value);
}
removeMarkdown.doc = {
    name: 'removeMarkdown',
    description: 'Removes any Markdown formatting from the string. Also removes HTML tags.',
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-removeMarkdown',
    examples: [{ example: '"*bold*, [link]()".removeMarkdown()', evaluated: '"bold, link"' }],
};
removeTags.doc = {
    name: 'removeTags',
    description: 'Removes tags, such as HTML or XML, from the string.',
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-removeTags',
    examples: [{ example: '"<b>bold</b>, <a>link</a>".removeTags()', evaluated: '"bold, link"' }],
};
toDate.doc = {
    name: 'toDate',
    description: 'Converts a string to a date.',
    section: 'cast',
    returnType: 'Date',
    hidden: true,
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toDate',
};
toDateTime.doc = {
    name: 'toDateTime',
    description: 'Converts the string to a <a target="_blank" href="https://moment.github.io/luxon/api-docs/">Luxon</a> DateTime. Useful for further transformation. Supported formats for the string are ISO 8601, HTTP, RFC2822, SQL and Unix timestamp in milliseconds. To parse other formats, use <a target="_blank" href=”https://moment.github.io/luxon/api-docs/index.html#datetimefromformat”> <code>DateTime.fromFormat()</code></a>.',
    section: 'cast',
    returnType: 'DateTime',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toDateTime',
    examples: [
        { example: '"2024-03-29T18:06:31.798+01:00".toDateTime()' },
        { example: '"Fri, 29 Mar 2024 18:08:01 +0100".toDateTime()' },
        { example: '"20240329".toDateTime()' },
        { example: '"1711732132990".toDateTime("ms")' },
        { example: '"31-01-2024".toDateTime("dd-MM-yyyy")' },
    ],
    args: [
        {
            name: 'format',
            optional: true,
            description: 'The format of the date string. Options are <code>ms</code> (for Unix timestamp in milliseconds), <code>s</code> (for Unix timestamp in seconds), <code>us</code> (for Unix timestamp in microseconds) or <code>excel</code> (for days since 1900). Custom formats can be specified using <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens">Luxon tokens</a>.',
            type: 'string',
        },
    ],
};
toBoolean.doc = {
    name: 'toBoolean',
    description: 'Converts the string to a boolean value. <code>0</code>, <code>false</code> and <code>no</code> resolve to <code>false</code>, everything else to <code>true</code>. Case-insensitive.',
    section: 'cast',
    returnType: 'boolean',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toBoolean',
    examples: [
        { example: '"true".toBoolean()', evaluated: 'true' },
        { example: '"false".toBoolean()', evaluated: 'false' },
        { example: '"0".toBoolean()', evaluated: 'false' },
        { example: '"hello".toBoolean()', evaluated: 'true' },
    ],
};
toFloat.doc = {
    name: 'toFloat',
    description: 'Converts a string to a decimal number.',
    section: 'cast',
    returnType: 'number',
    aliases: ['toDecimalNumber'],
    hidden: true,
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toDecimalNumber',
};
toInt.doc = {
    name: 'toInt',
    description: 'Converts a string to an integer.',
    section: 'cast',
    returnType: 'number',
    args: [{ name: 'radix?', type: 'number' }],
    aliases: ['toWholeNumber'],
    hidden: true,
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toInt',
};
toSentenceCase.doc = {
    name: 'toSentenceCase',
    description: 'Changes the capitalization of the string to sentence case. The first letter of each sentence is capitalized and all others are lowercased.',
    examples: [{ example: '"quick! brown FOX".toSentenceCase()', evaluated: '"Quick! Brown fox"' }],
    section: 'case',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toSentenceCase',
};
toSnakeCase.doc = {
    name: 'toSnakeCase',
    description: 'Changes the format of the string to snake case. Spaces and dashes are replaced by <code>_</code>, symbols are removed and all letters are lowercased.',
    examples: [{ example: '"quick brown $FOX".toSnakeCase()', evaluated: '"quick_brown_fox"' }],
    section: 'case',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toSnakeCase',
};
toTitleCase.doc = {
    name: 'toTitleCase',
    description: "Changes the capitalization of the string to title case. The first letter of each word is capitalized and the others left unchanged. Short prepositions and conjunctions aren't capitalized (e.g. 'a', 'the').",
    examples: [{ example: '"quick a brown FOX".toTitleCase()', evaluated: '"Quick a Brown Fox"' }],
    section: 'case',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toTitleCase',
};
urlEncode.doc = {
    name: 'urlEncode',
    description: 'Encodes the string so that it can be used in a URL. Spaces and special characters are replaced with codes of the form <code>%XX</code>.',
    section: 'edit',
    args: [
        {
            name: 'allChars',
            optional: true,
            description: 'Whether to encode characters that are part of the URI syntax (e.g. <code>=</code>, <code>?</code>)',
            default: 'false',
            type: 'boolean',
        },
    ],
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-urlEncode',
    examples: [
        { example: '"name=Nathan Automat".urlEncode()', evaluated: '"name%3DNathan%20Automat"' },
        { example: '"name=Nathan Automat".urlEncode(true)', evaluated: '"name=Nathan%20Automat"' },
    ],
};
urlDecode.doc = {
    name: 'urlDecode',
    description: 'Decodes a URL-encoded string. Replaces any character codes in the form of <code>%XX</code> with their corresponding characters.',
    args: [
        {
            name: 'allChars',
            optional: true,
            description: 'Whether to decode characters that are part of the URI syntax (e.g. <code>=</code>, <code>?</code>)',
            default: 'false',
            type: 'boolean',
        },
    ],
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-urlDecode',
    examples: [
        { example: '"name%3DNathan%20Automat".urlDecode()', evaluated: '"name=Nathan Automat"' },
        { example: '"name%3DNathan%20Automat".urlDecode(true)', evaluated: '"name%3DNathan Automat"' },
    ],
};
replaceSpecialChars.doc = {
    name: 'replaceSpecialChars',
    description: 'Replaces special characters in the string with the closest ASCII character',
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-replaceSpecialChars',
    examples: [{ example: '"déjà".replaceSpecialChars()', evaluated: '"deja"' }],
};
length.doc = {
    name: 'length',
    section: 'query',
    hidden: true,
    description: 'Returns the character count of a string.',
    returnType: 'number',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings',
};
isDomain.doc = {
    name: 'isDomain',
    description: 'Returns <code>true</code> if a string is a domain.',
    section: 'validation',
    returnType: 'boolean',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-isDomain',
    examples: [
        { example: '"n8n.io".isDomain()', evaluated: 'true' },
        { example: '"http://n8n.io".isDomain()', evaluated: 'false' },
        { example: '"hello".isDomain()', evaluated: 'false' },
    ],
};
isEmail.doc = {
    name: 'isEmail',
    description: 'Returns <code>true</code> if the string is an email.',
    section: 'validation',
    returnType: 'boolean',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-isEmail',
    examples: [
        { example: '"me@example.com".isEmail()', evaluated: 'true' },
        { example: '"It\'s me@example.com".isEmail()', evaluated: 'false' },
        { example: '"hello".isEmail()', evaluated: 'false' },
    ],
};
isNumeric.doc = {
    name: 'isNumeric',
    description: 'Returns <code>true</code> if the string represents a number.',
    section: 'validation',
    returnType: 'boolean',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-isNumeric',
    examples: [
        { example: '"1.2234".isNumeric()', evaluated: 'true' },
        { example: '"hello".isNumeric()', evaluated: 'false' },
        { example: '"123E23".isNumeric()', evaluated: 'true' },
    ],
};
isUrl.doc = {
    name: 'isUrl',
    description: 'Returns <code>true</code> if a string is a valid URL',
    section: 'validation',
    returnType: 'boolean',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-isUrl',
    examples: [
        { example: '"https://n8n.io".isUrl()', evaluated: 'true' },
        { example: '"n8n.io".isUrl()', evaluated: 'false' },
        { example: '"hello".isUrl()', evaluated: 'false' },
    ],
};
isEmpty.doc = {
    name: 'isEmpty',
    description: 'Returns <code>true</code> if the string has no characters or is <code>null</code>',
    section: 'validation',
    returnType: 'boolean',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-isEmpty',
    examples: [
        { example: '"".isEmpty()', evaluated: 'true' },
        { example: '"hello".isEmpty()', evaluated: 'false' },
    ],
};
isNotEmpty.doc = {
    name: 'isNotEmpty',
    description: 'Returns <code>true</code> if the string has at least one character.',
    section: 'validation',
    returnType: 'boolean',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-isNotEmpty',
    examples: [
        { example: '"hello".isNotEmpty()', evaluated: 'true' },
        { example: '"".isNotEmpty()', evaluated: 'false' },
    ],
};
toJsonString.doc = {
    name: 'toJsonString',
    description: 'Prepares the string to be inserted into a JSON object. Escapes any quotes and special characters (e.g. new lines), and wraps the string in quotes.The same as JavaScript’s JSON.stringify().',
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toJsonString',
    examples: [
        {
            example: 'The "best" colours: red\nbrown.toJsonString()',
            evaluated: '"The \\"best\\" colours: red\\nbrown"',
        },
        { example: 'foo.toJsonString()', evaluated: '"foo"' },
    ],
};
extractEmail.doc = {
    name: 'extractEmail',
    description: 'Extracts the first email found in the string. Returns <code>undefined</code> if none is found.',
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-extractEmail',
    examples: [
        { example: '"My email is me@example.com".extractEmail()', evaluated: "'me@example.com'" },
    ],
};
extractDomain.doc = {
    name: 'extractDomain',
    description: 'If the string is an email address or URL, returns its domain (or <code>undefined</code> if nothing found). If the string also contains other content, try using <code>extractEmail()</code> or <code>extractUrl()</code> first.',
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-extractDomain',
    examples: [
        { example: '"me@example.com".extractDomain()', evaluated: "'example.com'" },
        { example: '"http://n8n.io/workflows".extractDomain()', evaluated: "'n8n.io'" },
        {
            example: '"It\'s me@example.com".extractEmail().extractDomain()',
            evaluated: "'example.com'",
        },
    ],
};
extractUrl.doc = {
    name: 'extractUrl',
    description: 'Extracts the first URL found in the string. Returns <code>undefined</code> if none is found. Only recognizes full URLs, e.g. those starting with <code>http</code>.',
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-extractUrl',
    examples: [{ example: '"Check out http://n8n.io".extractUrl()', evaluated: "'http://n8n.io'" }],
};
extractUrlPath.doc = {
    name: 'extractUrlPath',
    description: 'Returns the part of a URL after the domain, or <code>undefined</code> if no URL found. If the string also contains other content, try using <code>extractUrl()</code> first.',
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-extractUrlPath',
    examples: [
        { example: '"http://n8n.io/workflows".extractUrlPath()', evaluated: "'/workflows'" },
        {
            example: '"Check out http://n8n.io/workflows".extractUrl().extractUrlPath()',
            evaluated: "'/workflows'",
        },
    ],
};
hash.doc = {
    name: 'hash',
    description: 'Returns the string hashed with the given algorithm. Defaults to md5 if not specified.',
    section: 'edit',
    returnType: 'string',
    args: [
        {
            name: 'algo',
            optional: true,
            description: 'The hashing algorithm to use. One of <code>md5</code>, <code>base64</code>, <code>sha1</code>, <code>sha224</code>, <code>sha256</code>, <code>sha384</code>, <code>sha512</code>, <code>sha3</code>, <code>ripemd160</code>\n        ',
            default: '"md5"',
            type: 'string',
        },
    ],
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-hash',
    examples: [{ example: '"hello".hash()', evaluated: "'5d41402abc4b2a76b9719d911017c592'" }],
};
quote.doc = {
    name: 'quote',
    description: 'Wraps a string in quotation marks, and escapes any quotation marks already in the string. Useful when constructing JSON, SQL, etc.',
    section: 'edit',
    returnType: 'string',
    args: [
        {
            name: 'mark',
            optional: true,
            description: 'The type of quotation mark to use',
            default: '"',
            type: 'string',
        },
    ],
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-quote',
    examples: [{ example: '\'Nathan says "hi"\'.quote()', evaluated: '\'"Nathan says \\"hi\\""\'' }],
};
parseJson.doc = {
    name: 'parseJson',
    description: "Returns the JavaScript value or object represented by the string, or <code>undefined</code> if the string isn't valid JSON. Single-quoted JSON is not supported.",
    section: 'cast',
    returnType: 'any',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-parseJson',
    examples: [
        { example: '\'{"name":"Nathan"}\'.parseJson()', evaluated: '\'{"name":"Nathan"}\'' },
        { example: "\"{'name':'Nathan'}\".parseJson()", evaluated: 'undefined' },
        { example: "'hello'.parseJson()", evaluated: 'undefined' },
    ],
};
base64Encode.doc = {
    name: 'base64Encode',
    description: 'Converts plain text to a base64-encoded string',
    examples: [{ example: '"hello".base64Encode()', evaluated: '"aGVsbG8="' }],
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-base64Encode',
};
base64Decode.doc = {
    name: 'base64Decode',
    description: 'Converts a base64-encoded string to plain text',
    examples: [{ example: '"aGVsbG8=".base64Decode()', evaluated: '"hello"' }],
    section: 'edit',
    returnType: 'string',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-base64Decode',
};
toNumber.doc = {
    name: 'toNumber',
    description: "Converts a string representing a number to a number. Errors if the string doesn't start with a valid number.",
    section: 'cast',
    returnType: 'number',
    docURL: 'https://docs.n8n.io/code/builtin/data-transformation-functions/strings/#string-toNumber',
    examples: [
        { example: '"123".toNumber()', evaluated: '123' },
        { example: '"1.23E10".toNumber()', evaluated: '12300000000' },
    ],
};
const toDecimalNumber = toFloat.bind({});
const toWholeNumber = toInt.bind({});
exports.stringExtensions = {
    typeName: 'String',
    functions: {
        hash,
        removeMarkdown,
        removeTags,
        toDate,
        toDateTime,
        toBoolean,
        toDecimalNumber,
        toNumber,
        toFloat,
        toInt,
        toWholeNumber,
        toSentenceCase,
        toSnakeCase,
        toTitleCase,
        urlDecode,
        urlEncode,
        quote,
        replaceSpecialChars,
        length,
        isDomain,
        isEmail,
        isNumeric,
        isUrl,
        isEmpty,
        isNotEmpty,
        toJsonString,
        extractEmail,
        extractDomain,
        extractUrl,
        extractUrlPath,
        parseJson,
        base64Encode,
        base64Decode,
    },
};
//# sourceMappingURL=StringExtensions.js.map