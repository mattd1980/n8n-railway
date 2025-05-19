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
var LingvaNex_node_exports = {};
__export(LingvaNex_node_exports, {
  LingvaNex: () => LingvaNex
});
module.exports = __toCommonJS(LingvaNex_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class LingvaNex {
  constructor() {
    this.description = {
      displayName: "LingvaNex",
      name: "lingvaNex",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:lingvanex.png",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume LingvaNex API",
      defaults: {
        name: "LingvaNex"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "lingvaNexApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Translate",
              value: "translate",
              description: "Translate data",
              action: "Translate data"
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
        },
        {
          displayName: "Additional Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              operation: ["translate"]
            }
          },
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
              displayName: "From",
              name: "from",
              type: "options",
              typeOptions: {
                loadOptionsMethod: "getLanguages"
              },
              default: "",
              description: 'The language code in the format \u201Clanguage code_code of the country\u201D. If this parameter is not present, the auto-detect language mode is enabled. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            },
            {
              displayName: "Platform",
              name: "platform",
              type: "string",
              default: "api"
            },
            {
              displayName: "Translate Mode",
              name: "translateMode",
              type: "string",
              default: "",
              description: 'Describe the input text format. Possible value is "html" for translating and preserving html structure. If value is not specified or is other than "html" than plain text is translating.'
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getLanguages() {
          const returnData = [];
          const data = await import_GenericFunctions.lingvaNexApiRequest.call(
            this,
            "GET",
            "/getLanguages",
            {},
            { platform: "api" }
          );
          for (const language of data.result) {
            returnData.push({
              name: language.englishName,
              value: language.full_code
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
    const operation = this.getNodeParameter("operation", 0);
    const responseData = [];
    for (let i = 0; i < length; i++) {
      if (operation === "translate") {
        const text = this.getNodeParameter("text", i);
        const translateTo = this.getNodeParameter("translateTo", i);
        const options = this.getNodeParameter("options", i);
        const body = {
          data: text,
          to: translateTo,
          platform: "api"
        };
        Object.assign(body, options);
        const response = await import_GenericFunctions.lingvaNexApiRequest.call(this, "POST", "/translate", body);
        responseData.push(response);
      }
    }
    return [this.helpers.returnJsonArray(responseData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LingvaNex
});
//# sourceMappingURL=LingvaNex.node.js.map