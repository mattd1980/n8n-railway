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
var Discourse_node_exports = {};
__export(Discourse_node_exports, {
  Discourse: () => Discourse
});
module.exports = __toCommonJS(Discourse_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CategoryDescription = require("./CategoryDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_GroupDescription = require("./GroupDescription");
var import_PostDescription = require("./PostDescription");
var import_UserDescription = require("./UserDescription");
var import_UserGroupDescription = require("./UserGroupDescription");
class Discourse {
  constructor() {
    this.description = {
      displayName: "Discourse",
      name: "discourse",
      icon: "file:discourse.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Discourse API",
      defaults: {
        name: "Discourse"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "discourseApi",
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
              name: "Category",
              value: "category"
            },
            {
              name: "Group",
              value: "group"
            },
            {
              name: "Post",
              value: "post"
            },
            // {
            // 	name: 'Search',
            // 	value: 'search',
            // },
            {
              name: "User",
              value: "user"
            },
            {
              name: "User Group",
              value: "userGroup"
            }
          ],
          default: "post"
        },
        ...import_CategoryDescription.categoryOperations,
        ...import_CategoryDescription.categoryFields,
        ...import_GroupDescription.groupOperations,
        ...import_GroupDescription.groupFields,
        ...import_PostDescription.postOperations,
        ...import_PostDescription.postFields,
        // ...searchOperations,
        // ...searchFields,
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields,
        ...import_UserGroupDescription.userGroupOperations,
        ...import_UserGroupDescription.userGroupFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the calendars to display them to user so that they can
        // select them easily
        async getCategories() {
          const returnData = [];
          const { category_list } = await import_GenericFunctions.discourseApiRequest.call(this, "GET", "/categories.json");
          for (const category of category_list.categories) {
            returnData.push({
              name: category.name,
              value: category.id
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
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "category") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const color = this.getNodeParameter("color", i);
            const textColor = this.getNodeParameter("textColor", i);
            const body = {
              name,
              color,
              text_color: textColor
            };
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "POST", "/categories.json", body);
            responseData = responseData.category;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "GET", "/categories.json", {}, qs);
            responseData = responseData.category_list.categories;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "update") {
            const categoryId = this.getNodeParameter("categoryId", i);
            const name = this.getNodeParameter("name", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              name
            };
            Object.assign(body, updateFields);
            responseData = await import_GenericFunctions.discourseApiRequest.call(
              this,
              "PUT",
              `/categories/${categoryId}.json`,
              body
            );
            responseData = responseData.category;
          }
        }
        if (resource === "group") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const body = {
              name
            };
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "POST", "/admin/groups.json", {
              group: body
            });
            responseData = responseData.basic_group;
          }
          if (operation === "get") {
            const name = this.getNodeParameter("name", i);
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "GET", `/groups/${name}`, {}, qs);
            responseData = responseData.group;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "GET", "/groups.json", {}, qs);
            responseData = responseData.groups;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "update") {
            const groupId = this.getNodeParameter("groupId", i);
            const name = this.getNodeParameter("name", i);
            const body = {
              name
            };
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "PUT", `/groups/${groupId}.json`, {
              group: body
            });
          }
        }
        if (resource === "post") {
          if (operation === "create") {
            const content = this.getNodeParameter("content", i);
            const title = this.getNodeParameter("title", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              title,
              raw: content
            };
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "POST", "/posts.json", body);
          }
          if (operation === "get") {
            const postId = this.getNodeParameter("postId", i);
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "GET", `/posts/${postId}`, {}, qs);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const limit = this.getNodeParameter("limit", i, 0);
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "GET", "/posts.json", {}, qs);
            responseData = responseData.latest_posts;
            let lastPost = responseData.pop();
            let previousLastPostID;
            while (lastPost.id !== previousLastPostID) {
              if (limit && responseData.length > limit) {
                break;
              }
              const chunk = await import_GenericFunctions.discourseApiRequest.call(
                this,
                "GET",
                `/posts.json?before=${lastPost.id}`,
                {},
                qs
              );
              responseData = responseData.concat(chunk.latest_posts);
              previousLastPostID = lastPost.id;
              lastPost = responseData.pop();
            }
            responseData.push(lastPost);
            if (!returnAll) {
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "update") {
            const postId = this.getNodeParameter("postId", i);
            const content = this.getNodeParameter("content", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              raw: content
            };
            Object.assign(body, updateFields);
            responseData = await import_GenericFunctions.discourseApiRequest.call(
              this,
              "PUT",
              `/posts/${postId}.json`,
              body
            );
            responseData = responseData.post;
          }
        }
        if (resource === "user") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const email = this.getNodeParameter("email", i);
            const password = this.getNodeParameter("password", i);
            const username = this.getNodeParameter("username", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name,
              password,
              email,
              username
            };
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "POST", "/users.json", body);
          }
          if (operation === "get") {
            const by = this.getNodeParameter("by", i);
            let endpoint = "";
            if (by === "username") {
              const username = this.getNodeParameter("username", i);
              endpoint = `/users/${username}`;
            } else if (by === "externalId") {
              const externalId = this.getNodeParameter("externalId", i);
              endpoint = `/u/by-external/${externalId}.json`;
            }
            responseData = await import_GenericFunctions.discourseApiRequest.call(this, "GET", endpoint);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const flag = this.getNodeParameter("flag", i);
            const options = this.getNodeParameter("options", i);
            if (options.stats) {
              qs.stats = options.stats;
            }
            if (options.asc) {
              qs.asc = options.asc;
            }
            if (options.showEmails) {
              qs.show_emails = options.showEmails;
            }
            if (options.order) {
              qs.order = options.order;
            }
            responseData = await import_GenericFunctions.discourseApiRequest.call(
              this,
              "GET",
              `/admin/users/list/${flag}.json`,
              {},
              qs
            );
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
        }
        if (resource === "userGroup") {
          if (operation === "add") {
            const usernames = this.getNodeParameter("usernames", i);
            const groupId = this.getNodeParameter("groupId", i);
            const body = {
              usernames
            };
            responseData = await import_GenericFunctions.discourseApiRequest.call(
              this,
              "PUT",
              `/groups/${groupId}/members.json`,
              body
            );
          }
          if (operation === "remove") {
            const usernames = this.getNodeParameter("usernames", i);
            const groupId = this.getNodeParameter("groupId", i);
            const body = {
              usernames
            };
            responseData = await import_GenericFunctions.discourseApiRequest.call(
              this,
              "DELETE",
              `/groups/${groupId}/members.json`,
              body
            );
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
  Discourse
});
//# sourceMappingURL=Discourse.node.js.map