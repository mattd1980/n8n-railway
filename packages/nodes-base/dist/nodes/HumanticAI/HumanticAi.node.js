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
var HumanticAi_node_exports = {};
__export(HumanticAi_node_exports, {
  HumanticAi: () => HumanticAi
});
module.exports = __toCommonJS(HumanticAi_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_ProfileDescription = require("./ProfileDescription");
class HumanticAi {
  constructor() {
    this.description = {
      displayName: "Humantic AI",
      name: "humanticAi",
      icon: "file:humanticai.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Humantic AI API",
      defaults: {
        name: "Humantic AI"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "humanticAiApi",
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
              name: "Profile",
              value: "profile"
            }
          ],
          default: "profile"
        },
        // PROFILE
        ...import_ProfileDescription.profileOperations,
        ...import_ProfileDescription.profileFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "profile") {
        if (operation === "create") {
          const userId = this.getNodeParameter("userId", i);
          const sendResume = this.getNodeParameter("sendResume", i);
          qs.userid = userId;
          if (sendResume) {
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
            const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
            responseData = await import_GenericFunctions.humanticAiApiRequest.call(
              this,
              "POST",
              "/user-profile/create",
              {},
              qs,
              {
                formData: {
                  resume: {
                    value: binaryDataBuffer,
                    options: {
                      filename: binaryData.fileName
                    }
                  }
                }
              }
            );
          } else {
            responseData = await import_GenericFunctions.humanticAiApiRequest.call(
              this,
              "GET",
              "/user-profile/create",
              {},
              qs
            );
          }
          if (responseData.data !== void 0) {
            responseData = responseData.data;
          } else {
            delete responseData.usage_stats;
          }
        }
        if (operation === "get") {
          const userId = this.getNodeParameter("userId", i);
          const options = this.getNodeParameter("options", i);
          qs.userid = userId;
          if (options.persona) {
            qs.persona = options.persona.join(",");
          }
          responseData = await import_GenericFunctions.humanticAiApiRequest.call(this, "GET", "/user-profile", {}, qs);
          responseData = responseData.results;
        }
        if (operation === "update") {
          const userId = this.getNodeParameter("userId", i);
          const sendResume = this.getNodeParameter("sendResume", i);
          qs.userid = userId;
          if (sendResume) {
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
            const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
            responseData = await import_GenericFunctions.humanticAiApiRequest.call(
              this,
              "POST",
              "/user-profile/create",
              {},
              qs,
              {
                formData: {
                  resume: {
                    value: binaryDataBuffer,
                    options: {
                      filename: binaryData.fileName
                    }
                  }
                }
              }
            );
            responseData = responseData.data;
          } else {
            const text = this.getNodeParameter("text", i);
            const body = {
              text
            };
            qs.userid = userId;
            responseData = await import_GenericFunctions.humanticAiApiRequest.call(
              this,
              "POST",
              "/user-profile/create",
              body,
              qs
            );
            responseData = responseData.data;
          }
        }
      }
      if (Array.isArray(responseData)) {
        returnData.push.apply(returnData, responseData);
      } else {
        returnData.push(responseData);
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HumanticAi
});
//# sourceMappingURL=HumanticAi.node.js.map