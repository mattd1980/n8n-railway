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
var Gong_node_exports = {};
__export(Gong_node_exports, {
  Gong: () => Gong
});
module.exports = __toCommonJS(Gong_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Gong {
  constructor() {
    this.description = {
      displayName: "Gong",
      name: "gong",
      icon: "file:gong.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Interact with Gong API",
      defaults: {
        name: "Gong"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "gongApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "gongOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      requestDefaults: {
        baseURL: '={{ $credentials.baseUrl.replace(new RegExp("/$"), "") }}'
      },
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Call",
              value: "call"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "call"
        },
        ...import_descriptions.callOperations,
        ...import_descriptions.callFields,
        ...import_descriptions.userOperations,
        ...import_descriptions.userFields
      ]
    };
    this.methods = {
      listSearch: {
        async getCalls(filter, paginationToken) {
          const query = {};
          if (paginationToken) {
            query.cursor = paginationToken;
          }
          const responseData = await import_GenericFunctions.gongApiRequest.call(this, "GET", "/v2/calls", {}, query);
          const calls = responseData.calls;
          const results = calls.map((c) => ({
            name: c.title,
            value: c.id
          })).filter(
            (c) => !filter || c.name.toLowerCase().includes(filter.toLowerCase()) || c.value?.toString() === filter
          ).sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
          });
          return { results, paginationToken: responseData.records.cursor };
        },
        async getUsers(filter, paginationToken) {
          const query = {};
          if (paginationToken) {
            query.cursor = paginationToken;
          }
          const responseData = await import_GenericFunctions.gongApiRequest.call(this, "GET", "/v2/users", {}, query);
          const users = responseData.users;
          const results = users.map((u) => ({
            name: `${u.firstName} ${u.lastName} (${u.emailAddress})`,
            value: u.id
          })).filter(
            (u) => !filter || u.name.toLowerCase().includes(filter.toLowerCase()) || u.value?.toString() === filter
          ).sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
          });
          return { results, paginationToken: responseData.records.cursor };
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Gong
});
//# sourceMappingURL=Gong.node.js.map