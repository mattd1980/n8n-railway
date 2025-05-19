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
var Storyblok_node_exports = {};
__export(Storyblok_node_exports, {
  Storyblok: () => Storyblok
});
module.exports = __toCommonJS(Storyblok_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_StoryContentDescription = require("./StoryContentDescription");
var import_StoryManagementDescription = require("./StoryManagementDescription");
class Storyblok {
  constructor() {
    this.description = {
      displayName: "Storyblok",
      name: "storyblok",
      icon: "file:storyblok.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Storyblok API",
      defaults: {
        name: "Storyblok"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "storyblokContentApi",
          required: true,
          displayOptions: {
            show: {
              source: ["contentApi"]
            }
          }
        },
        {
          name: "storyblokManagementApi",
          required: true,
          displayOptions: {
            show: {
              source: ["managementApi"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Source",
          name: "source",
          type: "options",
          default: "contentApi",
          description: "Pick where your data comes from, Content or Management API",
          options: [
            {
              name: "Content API",
              value: "contentApi"
            },
            {
              name: "Management API",
              value: "managementApi"
            }
          ]
        },
        // Resources: Content API
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Story",
              value: "story"
            }
          ],
          default: "story",
          displayOptions: {
            show: {
              source: ["contentApi"]
            }
          }
        },
        // Resources: Management API
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Story",
              value: "story"
            }
          ],
          default: "story",
          displayOptions: {
            show: {
              source: ["managementApi"]
            }
          }
        },
        // Content API - Story
        ...import_StoryContentDescription.storyContentOperations,
        ...import_StoryContentDescription.storyContentFields,
        // Management API - Story
        ...import_StoryManagementDescription.storyManagementOperations,
        ...import_StoryManagementDescription.storyManagementFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getSpaces() {
          const returnData = [];
          const { spaces } = await import_GenericFunctions.storyblokApiRequest.call(this, "GET", "/v1/spaces");
          for (const space of spaces) {
            returnData.push({
              name: space.name,
              value: space.id
            });
          }
          return returnData;
        },
        async getComponents() {
          const returnData = [];
          const space = this.getCurrentNodeParameter("space");
          const { components } = await import_GenericFunctions.storyblokApiRequest.call(
            this,
            "GET",
            `/v1/spaces/${space}/components`
          );
          for (const component of components) {
            returnData.push({
              name: `${component.name} ${component.is_root ? "(root)" : ""}`,
              value: component.name
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
    const qs = {};
    let responseData;
    const source = this.getNodeParameter("source", 0);
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (source === "contentApi") {
          if (resource === "story") {
            if (operation === "get") {
              const identifier = this.getNodeParameter("identifier", i);
              responseData = await import_GenericFunctions.storyblokApiRequest.call(
                this,
                "GET",
                `/v1/cdn/stories/${identifier}`
              );
              responseData = responseData.story;
            }
            if (operation === "getAll") {
              const filters = this.getNodeParameter("filters", i);
              const returnAll = this.getNodeParameter("returnAll", i);
              Object.assign(qs, filters);
              if (returnAll) {
                responseData = await import_GenericFunctions.storyblokApiRequestAllItems.call(
                  this,
                  "stories",
                  "GET",
                  "/v1/cdn/stories",
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.per_page = limit;
                responseData = await import_GenericFunctions.storyblokApiRequest.call(
                  this,
                  "GET",
                  "/v1/cdn/stories",
                  {},
                  qs
                );
                responseData = responseData.stories;
              }
            }
          }
        }
        if (source === "managementApi") {
          if (resource === "story") {
            if (operation === "delete") {
              const space = this.getNodeParameter("space", i);
              const storyId = this.getNodeParameter("storyId", i);
              responseData = await import_GenericFunctions.storyblokApiRequest.call(
                this,
                "DELETE",
                `/v1/spaces/${space}/stories/${storyId}`
              );
              responseData = responseData.story;
            }
            if (operation === "get") {
              const space = this.getNodeParameter("space", i);
              const storyId = this.getNodeParameter("storyId", i);
              responseData = await import_GenericFunctions.storyblokApiRequest.call(
                this,
                "GET",
                `/v1/spaces/${space}/stories/${storyId}`
              );
              responseData = responseData.story;
            }
            if (operation === "getAll") {
              const space = this.getNodeParameter("space", i);
              const filters = this.getNodeParameter("filters", i);
              const returnAll = this.getNodeParameter("returnAll", i);
              Object.assign(qs, filters);
              if (returnAll) {
                responseData = await import_GenericFunctions.storyblokApiRequestAllItems.call(
                  this,
                  "stories",
                  "GET",
                  `/v1/spaces/${space}/stories`,
                  {},
                  qs
                );
              } else {
                const limit = this.getNodeParameter("limit", i);
                qs.per_page = limit;
                responseData = await import_GenericFunctions.storyblokApiRequest.call(
                  this,
                  "GET",
                  `/v1/spaces/${space}/stories`,
                  {},
                  qs
                );
                responseData = responseData.stories;
              }
            }
            if (operation === "publish") {
              const space = this.getNodeParameter("space", i);
              const storyId = this.getNodeParameter("storyId", i);
              const options = this.getNodeParameter("options", i);
              const query = {};
              if (options.releaseId) {
                query.release_id = options.releaseId;
              }
              if (options.language) {
                query.lang = options.language;
              }
              responseData = await import_GenericFunctions.storyblokApiRequest.call(
                this,
                "GET",
                `/v1/spaces/${space}/stories/${storyId}/publish`,
                {},
                query
              );
              responseData = responseData.story;
            }
            if (operation === "unpublish") {
              const space = this.getNodeParameter("space", i);
              const storyId = this.getNodeParameter("storyId", i);
              responseData = await import_GenericFunctions.storyblokApiRequest.call(
                this,
                "GET",
                `/v1/spaces/${space}/stories/${storyId}/unpublish`
              );
              responseData = responseData.story;
            }
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
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
  Storyblok
});
//# sourceMappingURL=Storyblok.node.js.map