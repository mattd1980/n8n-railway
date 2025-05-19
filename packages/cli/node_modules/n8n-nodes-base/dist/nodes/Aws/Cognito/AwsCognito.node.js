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
var AwsCognito_node_exports = {};
__export(AwsCognito_node_exports, {
  AwsCognito: () => AwsCognito
});
module.exports = __toCommonJS(AwsCognito_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_utils = require("./helpers/utils");
var import_methods = require("./methods");
class AwsCognito {
  constructor() {
    this.description = {
      displayName: "AWS Cognito",
      name: "awsCognito",
      icon: {
        light: "file:cognito.svg",
        dark: "file:cognito.svg"
      },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Sends data to AWS Cognito",
      defaults: {
        name: "AWS Cognito"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
          required: true
        }
      ],
      requestDefaults: {
        headers: {
          "Content-Type": "application/x-amz-json-1.1"
        },
        qs: {
          service: "cognito-idp",
          _region: "={{$credentials.region}}"
        }
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          default: "user",
          routing: {
            send: {
              preSend: [import_utils.preSendStringifyBody]
            }
          },
          options: [
            {
              name: "Group",
              value: "group"
            },
            {
              name: "User",
              value: "user"
            },
            {
              name: "User Pool",
              value: "userPool"
            }
          ]
        },
        ...import_descriptions.group.description,
        ...import_descriptions.user.description,
        ...import_descriptions.userPool.description
      ]
    };
    this.methods = {
      listSearch: import_methods.listSearch
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AwsCognito
});
//# sourceMappingURL=AwsCognito.node.js.map