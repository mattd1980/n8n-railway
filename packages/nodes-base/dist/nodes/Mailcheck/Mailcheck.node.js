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
var Mailcheck_node_exports = {};
__export(Mailcheck_node_exports, {
  Mailcheck: () => Mailcheck
});
module.exports = __toCommonJS(Mailcheck_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Mailcheck {
  constructor() {
    this.description = {
      displayName: "Mailcheck",
      name: "mailcheck",
      icon: "file:mailcheck.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Mailcheck API",
      defaults: {
        name: "Mailcheck"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mailcheckApi",
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
              name: "Email",
              value: "email"
            }
          ],
          default: "email"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["email"]
            }
          },
          options: [
            {
              name: "Check",
              value: "check",
              action: "Check an email"
            }
          ],
          default: "check"
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          displayOptions: {
            show: {
              resource: ["email"],
              operation: ["check"]
            }
          },
          default: "",
          description: "Email address to check"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "email") {
          if (operation === "check") {
            const email = this.getNodeParameter("email", i);
            responseData = await import_GenericFunctions.mailCheckApiRequest.call(this, "POST", "/singleEmail:check", {
              email
            });
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
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
  Mailcheck
});
//# sourceMappingURL=Mailcheck.node.js.map