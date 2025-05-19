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
var Bitly_node_exports = {};
__export(Bitly_node_exports, {
  Bitly: () => Bitly
});
module.exports = __toCommonJS(Bitly_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_LinkDescription = require("./LinkDescription");
class Bitly {
  constructor() {
    this.description = {
      displayName: "Bitly",
      name: "bitly",
      icon: "file:bitly.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Bitly API",
      defaults: {
        name: "Bitly"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "bitlyApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "bitlyOAuth2Api",
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
              name: "Link",
              value: "link"
            }
          ],
          default: "link"
        },
        ...import_LinkDescription.linkOperations,
        ...import_LinkDescription.linkFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available groups to display them to user so that they can
        // select them easily
        async getGroups() {
          const returnData = [];
          const groups = await import_GenericFunctions.bitlyApiRequestAllItems.call(this, "groups", "GET", "/groups");
          for (const group of groups) {
            const groupName = group.name;
            const groupId = group.guid;
            returnData.push({
              name: groupName,
              value: groupId
            });
          }
          return returnData;
        },
        // Get all the available tags to display them to user so that they can
        // select them easily
        async getTags() {
          const groupId = this.getCurrentNodeParameter("group");
          const returnData = [];
          const tags = await import_GenericFunctions.bitlyApiRequestAllItems.call(
            this,
            "tags",
            "GET",
            `groups/${groupId}/tags`
          );
          for (const tag of tags) {
            const tagName = tag;
            const tagId = tag;
            returnData.push({
              name: tagName,
              value: tagId
            });
          }
          return returnData;
        }
      }
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
        if (resource === "link") {
          if (operation === "create") {
            const longUrl = this.getNodeParameter("longUrl", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              long_url: longUrl
            };
            if (additionalFields.title) {
              body.title = additionalFields.title;
            }
            if (additionalFields.domain) {
              body.domain = additionalFields.domain;
            }
            if (additionalFields.group) {
              body.group = additionalFields.group;
            }
            if (additionalFields.tags) {
              body.tags = additionalFields.tags;
            }
            const deeplinks = this.getNodeParameter("deeplink", i).deeplinkUi;
            if (deeplinks) {
              for (const deeplink of deeplinks) {
                body.deeplinks.push({
                  app_uri_path: deeplink.appUriPath,
                  install_type: deeplink.installType,
                  install_url: deeplink.installUrl,
                  app_id: deeplink.appId
                });
              }
            }
            responseData = await import_GenericFunctions.bitlyApiRequest.call(this, "POST", "/bitlinks", body);
          }
          if (operation === "update") {
            const linkId = this.getNodeParameter("id", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.longUrl) {
              body.long_url = updateFields.longUrl;
            }
            if (updateFields.title) {
              body.title = updateFields.title;
            }
            if (updateFields.archived !== void 0) {
              body.archived = updateFields.archived;
            }
            if (updateFields.group) {
              body.group = updateFields.group;
            }
            if (updateFields.tags) {
              body.tags = updateFields.tags;
            }
            const deeplinks = this.getNodeParameter("deeplink", i).deeplinkUi;
            if (deeplinks) {
              for (const deeplink of deeplinks) {
                body.deeplinks.push({
                  app_uri_path: deeplink.appUriPath,
                  install_type: deeplink.installType,
                  install_url: deeplink.installUrl,
                  app_id: deeplink.appId
                });
              }
            }
            responseData = await import_GenericFunctions.bitlyApiRequest.call(this, "PATCH", `/bitlinks/${linkId}`, body);
          }
          if (operation === "get") {
            const linkId = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.bitlyApiRequest.call(this, "GET", `/bitlinks/${linkId}`);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {}, itemIndex: i });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bitly
});
//# sourceMappingURL=Bitly.node.js.map