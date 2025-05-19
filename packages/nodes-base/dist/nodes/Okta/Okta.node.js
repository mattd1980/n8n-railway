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
var Okta_node_exports = {};
__export(Okta_node_exports, {
  Okta: () => Okta
});
module.exports = __toCommonJS(Okta_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_UserDescription = require("./UserDescription");
var import_UserFunctions = require("./UserFunctions");
class Okta {
  constructor() {
    this.description = {
      displayName: "Okta",
      name: "okta",
      icon: { light: "file:Okta.svg", dark: "file:Okta.dark.svg" },
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Use the Okta API",
      defaults: {
        name: "Okta"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "oktaApi",
          required: true
        }
      ],
      requestDefaults: {
        returnFullResponse: true,
        baseURL: '={{$credentials.url.replace(new RegExp("/$"), "")}}',
        headers: {}
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "User",
              value: "user"
            }
          ],
          default: "user"
        },
        // USER
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields
      ]
    };
    this.methods = {
      listSearch: {
        getUsers: import_UserFunctions.getUsers
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Okta
});
//# sourceMappingURL=Okta.node.js.map