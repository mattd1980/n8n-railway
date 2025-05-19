"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var TextDescription_exports = {};
__export(TextDescription_exports, {
  textOperations: () => textOperations
});
module.exports = __toCommonJS(TextDescription_exports);
const textOperations = [
  {
    displayName: "Text",
    name: "text",
    type: "string",
    default: "",
    description: "Input text to translate",
    required: true,
    displayOptions: {
      show: {
        operation: ["translate"]
      }
    }
  },
  {
    displayName: "Target Language Name or ID",
    name: "translateTo",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLanguages"
    },
    default: "",
    description: 'Language to translate to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    required: true,
    displayOptions: {
      show: {
        operation: ["translate"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Source Language Name or ID",
        name: "sourceLang",
        type: "options",
        default: "",
        description: 'Language to translate from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getLanguages"
        }
      },
      {
        displayName: "Split Sentences",
        name: "splitSentences",
        type: "options",
        default: "1",
        description: "How the translation engine should split sentences",
        options: [
          {
            name: "Interpunction Only",
            value: "nonewlines",
            description: "Split text on interpunction only, ignoring newlines"
          },
          {
            name: "No Splitting",
            value: "0",
            description: "Treat all text as a single sentence"
          },
          {
            name: "On Punctuation and Newlines",
            value: "1",
            description: "Split text on interpunction and newlines"
          }
        ]
      },
      {
        displayName: "Preserve Formatting",
        name: "preserveFormatting",
        type: "options",
        default: "0",
        description: "Whether the translation engine should respect the original formatting, even if it would usually correct some aspects",
        options: [
          {
            name: "Apply Corrections",
            value: "0",
            description: "Fix punctuation at the beginning and end of sentences and fixes lower/upper caseing at the beginning"
          },
          {
            name: "Do Not Correct",
            value: "1",
            description: "Keep text as similar as possible to the original"
          }
        ]
      },
      {
        displayName: "Formality",
        name: "formality",
        type: "options",
        default: "default",
        description: "How formal or informal the target text should be. May not be supported with all languages.",
        options: [
          {
            name: "Formal",
            value: "more"
          },
          {
            name: "Informal",
            value: "less"
          },
          {
            name: "Neutral",
            value: "default"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  textOperations
});
//# sourceMappingURL=TextDescription.js.map