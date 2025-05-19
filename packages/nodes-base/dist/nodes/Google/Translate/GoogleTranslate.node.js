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
var GoogleTranslate_node_exports = {};
__export(GoogleTranslate_node_exports, {
  GoogleTranslate: () => GoogleTranslate
});
module.exports = __toCommonJS(GoogleTranslate_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class GoogleTranslate {
  constructor() {
    this.description = {
      displayName: "Google Translate",
      name: "googleTranslate",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:googletranslate.png",
      group: ["input", "output"],
      version: [1, 2],
      description: "Translate data using Google Translate",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "Google Translate"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googleApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["serviceAccount"]
            }
          }
        },
        {
          name: "googleTranslateOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Service Account",
              value: "serviceAccount"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "serviceAccount",
          displayOptions: {
            show: {
              "@version": [1]
            }
          }
        },
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "OAuth2 (recommended)",
              value: "oAuth2"
            },
            {
              name: "Service Account",
              value: "serviceAccount"
            }
          ],
          default: "oAuth2",
          displayOptions: {
            show: {
              "@version": [2]
            }
          }
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Language",
              value: "language"
            }
          ],
          default: "language"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["language"]
            }
          },
          options: [
            {
              name: "Translate",
              value: "translate",
              description: "Translate data",
              action: "Translate a language"
            }
          ],
          default: "translate"
        },
        // ----------------------------------
        //         All
        // ----------------------------------
        {
          displayName: "Text",
          name: "text",
          type: "string",
          default: "",
          description: "The input text to translate",
          required: true,
          displayOptions: {
            show: {
              operation: ["translate"]
            }
          }
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "Translate To",
          name: "translateTo",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLanguages"
          },
          default: "",
          description: 'The language to use for translation of the input text, set to one of the language codes listed in <a href="https://cloud.google.com/translate/docs/languages">Language Support</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          required: true,
          displayOptions: {
            show: {
              operation: ["translate"]
            }
          }
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getLanguages() {
          const returnData = [];
          const {
            data: { languages }
          } = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/language/translate/v2/languages");
          for (const language of languages) {
            returnData.push({
              name: language.language.toUpperCase(),
              value: language.language
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const length = items.length;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const responseData = [];
    for (let i = 0; i < length; i++) {
      if (resource === "language") {
        if (operation === "translate") {
          const text = this.getNodeParameter("text", i);
          const translateTo = this.getNodeParameter("translateTo", i);
          const response = await import_GenericFunctions.googleApiRequest.call(this, "POST", "/language/translate/v2", {
            q: text,
            target: translateTo
          });
          const [translation] = response.data.translations;
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(translation),
            { itemData: { item: i } }
          );
          responseData.push(...executionData);
        }
      }
    }
    return [responseData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleTranslate
});
//# sourceMappingURL=GoogleTranslate.node.js.map