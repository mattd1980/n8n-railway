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
var AwsIam_node_exports = {};
__export(AwsIam_node_exports, {
  AwsIam: () => AwsIam
});
module.exports = __toCommonJS(AwsIam_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_constants = require("./helpers/constants");
var import_utils = require("./helpers/utils");
var import_listSearch = require("./methods/listSearch");
class AwsIam {
  constructor() {
    this.description = {
      displayName: "AWS IAM",
      name: "awsIam",
      icon: "file:AwsIam.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Interacts with Amazon IAM",
      defaults: { name: "AWS IAM" },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
          required: true
        }
      ],
      requestDefaults: {
        baseURL: import_constants.BASE_URL,
        json: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          default: "user",
          options: [
            {
              name: "User",
              value: "user"
            },
            {
              name: "Group",
              value: "group"
            }
          ],
          routing: {
            send: {
              preSend: [import_utils.encodeBodyAsFormUrlEncoded]
            }
          }
        },
        ...import_descriptions.user.description,
        ...import_descriptions.group.description
      ]
    };
    this.methods = {
      listSearch: {
        searchGroups: import_listSearch.searchGroups,
        searchUsers: import_listSearch.searchUsers,
        searchGroupsForUser: import_listSearch.searchGroupsForUser
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AwsIam
});
//# sourceMappingURL=AwsIam.node.js.map