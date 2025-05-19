"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Ghost_node_exports = {};
__export(Ghost_node_exports, {
  Ghost: () => Ghost
});
module.exports = __toCommonJS(Ghost_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_PostDescription = require("./PostDescription");
class Ghost {
  constructor() {
    this.description = {
      displayName: "Ghost",
      name: "ghost",
      icon: "file:ghost.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Ghost API",
      defaults: {
        name: "Ghost"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "ghostAdminApi",
          required: true,
          displayOptions: {
            show: {
              source: ["adminApi"]
            }
          }
        },
        {
          name: "ghostContentApi",
          required: true,
          displayOptions: {
            show: {
              source: ["contentApi"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Source",
          name: "source",
          type: "options",
          description: "Pick where your data comes from, Content or Admin API",
          options: [
            {
              name: "Admin API",
              value: "adminApi"
            },
            {
              name: "Content API",
              value: "contentApi"
            }
          ],
          default: "contentApi"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          options: [
            {
              name: "Post",
              value: "post"
            }
          ],
          noDataExpression: true,
          default: "post"
        },
        ...import_PostDescription.postOperations,
        ...import_PostDescription.postFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the authors to display them to user so that they can
        // select them easily
        async getAuthors() {
          const returnData = [];
          const users = await import_GenericFunctions.ghostApiRequestAllItems.call(this, "users", "GET", "/admin/users");
          for (const user of users) {
            returnData.push({
              name: user.name,
              value: user.id
            });
          }
          return returnData;
        },
        // Get all the tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.ghostApiRequestAllItems.call(this, "tags", "GET", "/admin/tags");
          for (const tag of tags) {
            returnData.push({
              name: tag.name,
              value: tag.name
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
    const timezone = this.getTimezone();
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const source = this.getNodeParameter("source", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (source === "contentApi") {
          if (resource === "post") {
            if (operation === "get") {
              const by = this.getNodeParameter("by", i);
              const identifier = this.getNodeParameter("identifier", i);
              const options = this.getNodeParameter("options", i);
              Object.assign(qs, options);
              let endpoint;
              if (by === "slug") {
                endpoint = `/content/posts/slug/${identifier}`;
              } else {
                endpoint = `/content/posts/${identifier}`;
              }
              responseData = await import_GenericFunctions.ghostApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.posts;
            }
            if (operation === "getAll") {
              const returnAll = this.getNodeParameter("returnAll", 0);
              const options = this.getNodeParameter("options", i);
              Object.assign(qs, options);
              if (returnAll) {
                responseData = await import_GenericFunctions.ghostApiRequestAllItems.call(
                  this,
                  "posts",
                  "GET",
                  "/content/posts",
                  {},
                  qs
                );
              } else {
                qs.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.ghostApiRequest.call(this, "GET", "/content/posts", {}, qs);
                responseData = responseData.posts;
              }
            }
          }
        }
        if (source === "adminApi") {
          if (resource === "post") {
            if (operation === "create") {
              const title = this.getNodeParameter("title", i);
              const contentFormat = this.getNodeParameter("contentFormat", i);
              const content = this.getNodeParameter("content", i);
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const post = {
                title
              };
              if (contentFormat === "html") {
                post.html = content;
                qs.source = "html";
              } else if (contentFormat === "lexical") {
                const lexical = (0, import_GenericFunctions.validateJSON)(content);
                if (lexical === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Content must be a valid JSON", {
                    itemIndex: i
                  });
                }
                post.lexical = content;
              } else {
                const mobileDoc = (0, import_GenericFunctions.validateJSON)(content);
                if (mobileDoc === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Content must be a valid JSON", {
                    itemIndex: i
                  });
                }
                post.mobiledoc = content;
              }
              delete post.content;
              Object.assign(post, additionalFields);
              if (post.published_at) {
                post.published_at = import_moment_timezone.default.tz(post.published_at, timezone).utc().format();
              }
              if (post.status === "scheduled" && post.published_at === void 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Published at must be define when status is scheduled",
                  { itemIndex: i }
                );
              }
              responseData = await import_GenericFunctions.ghostApiRequest.call(
                this,
                "POST",
                "/admin/posts",
                { posts: [post] },
                qs
              );
              responseData = responseData.posts;
            }
            if (operation === "delete") {
              const postId = this.getNodeParameter("postId", i);
              responseData = await import_GenericFunctions.ghostApiRequest.call(this, "DELETE", `/admin/posts/${postId}`);
            }
            if (operation === "get") {
              const by = this.getNodeParameter("by", i);
              const identifier = this.getNodeParameter("identifier", i);
              const options = this.getNodeParameter("options", i);
              Object.assign(qs, options);
              let endpoint;
              if (by === "slug") {
                endpoint = `/admin/posts/slug/${identifier}`;
              } else {
                endpoint = `/admin/posts/${identifier}`;
              }
              responseData = await import_GenericFunctions.ghostApiRequest.call(this, "GET", endpoint, {}, qs);
              responseData = responseData.posts;
            }
            if (operation === "getAll") {
              const returnAll = this.getNodeParameter("returnAll", 0);
              const options = this.getNodeParameter("options", i);
              Object.assign(qs, options);
              if (returnAll) {
                responseData = await import_GenericFunctions.ghostApiRequestAllItems.call(
                  this,
                  "posts",
                  "GET",
                  "/admin/posts",
                  {},
                  qs
                );
              } else {
                qs.limit = this.getNodeParameter("limit", 0);
                responseData = await import_GenericFunctions.ghostApiRequest.call(this, "GET", "/admin/posts", {}, qs);
                responseData = responseData.posts;
              }
            }
            if (operation === "update") {
              const postId = this.getNodeParameter("postId", i);
              const contentFormat = this.getNodeParameter("contentFormat", i);
              const updateFields = this.getNodeParameter("updateFields", i);
              const post = {};
              if (contentFormat === "html") {
                post.html = updateFields.content || "";
                qs.source = "html";
                delete updateFields.content;
              } else if (contentFormat === "lexical") {
                const lexical = (0, import_GenericFunctions.validateJSON)(updateFields.contentJson || void 0);
                if (lexical === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Content must be a valid JSON", {
                    itemIndex: i
                  });
                }
                post.lexical = updateFields.contentJson;
                delete updateFields.contentJson;
              } else {
                const mobileDoc = (0, import_GenericFunctions.validateJSON)(updateFields.contentJson || void 0);
                if (mobileDoc === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Content must be a valid JSON", {
                    itemIndex: i
                  });
                }
                post.mobiledoc = updateFields.contentJson;
                delete updateFields.contentJson;
              }
              Object.assign(post, updateFields);
              const { posts } = await import_GenericFunctions.ghostApiRequest.call(
                this,
                "GET",
                `/admin/posts/${postId}`,
                {},
                { fields: "id, updated_at" }
              );
              if (post.published_at) {
                post.published_at = import_moment_timezone.default.tz(post.published_at, timezone).utc().format();
              }
              if (post.status === "scheduled" && post.published_at === void 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Published at must be define when status is scheduled",
                  { itemIndex: i }
                );
              }
              post.updated_at = posts[0].updated_at;
              responseData = await import_GenericFunctions.ghostApiRequest.call(
                this,
                "PUT",
                `/admin/posts/${postId}`,
                { posts: [post] },
                qs
              );
              responseData = responseData.posts;
            }
          }
        }
        responseData = this.helpers.returnJsonArray(responseData);
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
  Ghost
});
//# sourceMappingURL=Ghost.node.js.map