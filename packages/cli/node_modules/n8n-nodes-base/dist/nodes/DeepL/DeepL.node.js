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
var DeepL_node_exports = {};
__export(DeepL_node_exports, {
  DeepL: () => DeepL
});
module.exports = __toCommonJS(DeepL_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_TextDescription = require("./TextDescription");
class DeepL {
  constructor() {
    this.description = {
      displayName: "DeepL",
      name: "deepL",
      icon: { light: "file:deepl.svg", dark: "file:deepL.dark.svg" },
      group: ["input", "output"],
      version: 1,
      description: "Translate data using DeepL",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "DeepL"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "deepLApi",
          required: true
        }
      ],
      properties: [
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
        ...import_TextDescription.textOperations
      ]
    };
    this.methods = {
      loadOptions: {
        async getLanguages() {
          const returnData = [];
          const languages = await import_GenericFunctions.deepLApiRequest.call(
            this,
            "GET",
            "/languages",
            {},
            { type: "target" }
          );
          for (const language of languages) {
            returnData.push({
              name: language.name,
              value: language.language
            });
          }
          returnData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const length = items.length;
    const responseData = [];
    for (let i = 0; i < length; i++) {
      try {
        const resource = this.getNodeParameter("resource", i);
        const operation = this.getNodeParameter("operation", i);
        const additionalFields = this.getNodeParameter("additionalFields", i);
        if (resource === "language") {
          if (operation === "translate") {
            let body = {};
            const text = this.getNodeParameter("text", i);
            const translateTo = this.getNodeParameter("translateTo", i);
            body = { target_lang: translateTo, text };
            if (additionalFields.sourceLang !== void 0) {
              body.source_lang = ["EN-GB", "EN-US"].includes(additionalFields.sourceLang) ? "EN" : additionalFields.sourceLang;
            }
            const { translations } = await import_GenericFunctions.deepLApiRequest.call(this, "GET", "/translate", body);
            const [translation] = translations;
            const translationJsonArray = this.helpers.returnJsonArray(translation);
            const executionData = this.helpers.constructExecutionMetaData(translationJsonArray, {
              itemData: { item: i }
            });
            responseData.push(...executionData);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = {
            json: {},
            error: error.message,
            itemIndex: i
          };
          responseData.push(executionErrorData);
          continue;
        }
        throw error;
      }
    }
    return [responseData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeepL
});
//# sourceMappingURL=DeepL.node.js.map