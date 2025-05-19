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
var OpenAi_node_exports = {};
__export(OpenAi_node_exports, {
  OpenAi: () => OpenAi
});
module.exports = __toCommonJS(OpenAi_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ChatDescription = require("./ChatDescription");
var import_ImageDescription = require("./ImageDescription");
var import_TextDescription = require("./TextDescription");
var import_descriptions = require("../../utils/descriptions");
class OpenAi {
  constructor() {
    this.description = {
      displayName: "OpenAI",
      name: "openAi",
      hidden: true,
      icon: { light: "file:openAi.svg", dark: "file:openAi.dark.svg" },
      group: ["transform"],
      version: [1, 1.1],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Open AI",
      defaults: {
        name: "OpenAI"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "openAiApi",
          required: true
        }
      ],
      requestDefaults: {
        ignoreHttpStatusErrors: true,
        baseURL: '={{ $credentials.url?.split("/").slice(0,-1).join("/") ?? "https://api.openai.com" }}'
      },
      properties: [
        import_descriptions.oldVersionNotice,
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Chat",
              value: "chat"
            },
            {
              name: "Image",
              value: "image"
            },
            {
              name: "Text",
              value: "text"
            }
          ],
          default: "text"
        },
        ...import_ChatDescription.chatOperations,
        ...import_ChatDescription.chatFields,
        ...import_ImageDescription.imageOperations,
        ...import_ImageDescription.imageFields,
        ...import_TextDescription.textOperations,
        ...import_TextDescription.textFields
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OpenAi
});
//# sourceMappingURL=OpenAi.node.js.map