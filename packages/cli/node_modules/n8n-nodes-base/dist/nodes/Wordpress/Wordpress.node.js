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
var Wordpress_node_exports = {};
__export(Wordpress_node_exports, {
  Wordpress: () => Wordpress
});
module.exports = __toCommonJS(Wordpress_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_PageDescription = require("./PageDescription");
var import_PostDescription = require("./PostDescription");
var import_UserDescription = require("./UserDescription");
class Wordpress {
  constructor() {
    this.description = {
      displayName: "Wordpress",
      name: "wordpress",
      icon: "file:wordpress.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Wordpress API",
      defaults: {
        name: "Wordpress"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "wordpressApi",
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
              name: "Post",
              value: "post"
            },
            {
              name: "Page",
              value: "page"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "post"
        },
        ...import_PostDescription.postOperations,
        ...import_PostDescription.postFields,
        ...import_PageDescription.pageOperations,
        ...import_PageDescription.pageFields,
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available categories to display them to user so that they can
        // select them easily
        async getCategories() {
          const returnData = [];
          const categories = await import_GenericFunctions.wordpressApiRequestAllItems.call(this, "GET", "/categories", {});
          for (const category of categories) {
            const categoryName = category.name;
            const categoryId = category.id;
            returnData.push({
              name: categoryName,
              value: categoryId
            });
          }
          return returnData;
        },
        // Get all the available tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.wordpressApiRequestAllItems.call(this, "GET", "/tags", {});
          for (const tag of tags) {
            const tagName = tag.name;
            const tagId = tag.id;
            returnData.push({
              name: tagName,
              value: tagId
            });
          }
          return returnData;
        },
        // Get all the available authors to display them to user so that they can
        // select them easily
        async getAuthors() {
          const returnData = [];
          const authors = await import_GenericFunctions.wordpressApiRequestAllItems.call(
            this,
            "GET",
            "/users",
            {},
            { who: "authors" }
          );
          for (const author of authors) {
            const authorName = author.name;
            const authorId = author.id;
            returnData.push({
              name: authorName,
              value: authorId
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
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "post") {
          if (operation === "create") {
            const title = this.getNodeParameter("title", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              title
            };
            if (additionalFields.authorId) {
              body.author = additionalFields.authorId;
            }
            if (additionalFields.content) {
              body.content = additionalFields.content;
            }
            if (additionalFields.slug) {
              body.slug = additionalFields.slug;
            }
            if (additionalFields.password) {
              body.password = additionalFields.password;
            }
            if (additionalFields.status) {
              body.status = additionalFields.status;
            }
            if (additionalFields.commentStatus) {
              body.comment_status = additionalFields.commentStatus;
            }
            if (additionalFields.pingStatus) {
              body.ping_status = additionalFields.pingStatus;
            }
            if (additionalFields.sticky) {
              body.sticky = additionalFields.sticky;
            }
            if (additionalFields.postTemplate) {
              body.template = this.getNodeParameter(
                "additionalFields.postTemplate.values.template",
                i,
                ""
              );
            }
            if (additionalFields.categories) {
              body.categories = additionalFields.categories;
            }
            if (additionalFields.tags) {
              body.tags = additionalFields.tags;
            }
            if (additionalFields.format) {
              body.format = additionalFields.format;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "POST", "/posts", body);
          }
          if (operation === "update") {
            const postId = this.getNodeParameter("postId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: parseInt(postId, 10)
            };
            if (updateFields.authorId) {
              body.author = updateFields.authorId;
            }
            if (updateFields.title) {
              body.title = updateFields.title;
            }
            if (updateFields.content) {
              body.content = updateFields.content;
            }
            if (updateFields.slug) {
              body.slug = updateFields.slug;
            }
            if (updateFields.password) {
              body.password = updateFields.password;
            }
            if (updateFields.status) {
              body.status = updateFields.status;
            }
            if (updateFields.commentStatus) {
              body.comment_status = updateFields.commentStatus;
            }
            if (updateFields.pingStatus) {
              body.ping_status = updateFields.pingStatus;
            }
            if (updateFields.sticky) {
              body.sticky = updateFields.sticky;
            }
            if (updateFields.postTemplate) {
              body.template = this.getNodeParameter(
                "updateFields.postTemplate.values.template",
                i,
                ""
              );
            }
            if (updateFields.categories) {
              body.categories = updateFields.categories;
            }
            if (updateFields.tags) {
              body.tags = updateFields.tags;
            }
            if (updateFields.format) {
              body.format = updateFields.format;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "POST", `/posts/${postId}`, body);
          }
          if (operation === "get") {
            const postId = this.getNodeParameter("postId", i);
            const options = this.getNodeParameter("options", i);
            if (options.password) {
              qs.password = options.password;
            }
            if (options.context) {
              qs.context = options.context;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "GET", `/posts/${postId}`, {}, qs);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.context) {
              qs.context = options.context;
            }
            if (options.orderBy) {
              qs.orderby = options.orderBy;
            }
            if (options.order) {
              qs.order = options.order;
            }
            if (options.search) {
              qs.search = options.search;
            }
            if (options.after) {
              qs.after = options.after;
            }
            if (options.author) {
              qs.author = options.author;
            }
            if (options.categories) {
              qs.categories = options.categories;
            }
            if (options.excludedCategories) {
              qs.categories_exclude = options.excludedCategories;
            }
            if (options.tags) {
              qs.tags = options.tags;
            }
            if (options.excludedTags) {
              qs.tags_exclude = options.excludedTags;
            }
            if (options.sticky) {
              qs.sticky = options.sticky;
            }
            if (options.status) {
              qs.status = options.status;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.wordpressApiRequestAllItems.call(this, "GET", "/posts", {}, qs);
            } else {
              qs.per_page = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "GET", "/posts", {}, qs);
            }
          }
          if (operation === "delete") {
            const postId = this.getNodeParameter("postId", i);
            const options = this.getNodeParameter("options", i);
            if (options.force) {
              qs.force = options.force;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(
              this,
              "DELETE",
              `/posts/${postId}`,
              {},
              qs
            );
          }
        }
        if (resource === "page") {
          if (operation === "create") {
            const title = this.getNodeParameter("title", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              title
            };
            if (additionalFields.authorId) {
              body.author = additionalFields.authorId;
            }
            if (additionalFields.content) {
              body.content = additionalFields.content;
            }
            if (additionalFields.slug) {
              body.slug = additionalFields.slug;
            }
            if (additionalFields.password) {
              body.password = additionalFields.password;
            }
            if (additionalFields.status) {
              body.status = additionalFields.status;
            }
            if (additionalFields.commentStatus) {
              body.comment_status = additionalFields.commentStatus;
            }
            if (additionalFields.pingStatus) {
              body.ping_status = additionalFields.pingStatus;
            }
            if (additionalFields.pageTemplate) {
              body.template = this.getNodeParameter(
                "additionalFields.pageTemplate.values.template",
                i,
                ""
              );
            }
            if (additionalFields.menuOrder) {
              body.menu_order = additionalFields.menuOrder;
            }
            if (additionalFields.parent) {
              body.parent = additionalFields.parent;
            }
            if (additionalFields.featuredMediaId) {
              body.featured_media = additionalFields.featuredMediaId;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "POST", "/pages", body);
          }
          if (operation === "update") {
            const pageId = this.getNodeParameter("pageId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: parseInt(pageId, 10)
            };
            if (updateFields.authorId) {
              body.author = updateFields.authorId;
            }
            if (updateFields.title) {
              body.title = updateFields.title;
            }
            if (updateFields.content) {
              body.content = updateFields.content;
            }
            if (updateFields.slug) {
              body.slug = updateFields.slug;
            }
            if (updateFields.password) {
              body.password = updateFields.password;
            }
            if (updateFields.status) {
              body.status = updateFields.status;
            }
            if (updateFields.commentStatus) {
              body.comment_status = updateFields.commentStatus;
            }
            if (updateFields.pingStatus) {
              body.ping_status = updateFields.pingStatus;
            }
            if (updateFields.pageTemplate) {
              body.template = this.getNodeParameter(
                "updateFields.pageTemplate.values.template",
                i,
                ""
              );
            }
            if (updateFields.menuOrder) {
              body.menu_order = updateFields.menuOrder;
            }
            if (updateFields.parent) {
              body.parent = updateFields.parent;
            }
            if (updateFields.featuredMediaId) {
              body.featured_media = updateFields.featuredMediaId;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "POST", `/pages/${pageId}`, body);
          }
          if (operation === "get") {
            const pageId = this.getNodeParameter("pageId", i);
            const options = this.getNodeParameter("options", i);
            if (options.password) {
              qs.password = options.password;
            }
            if (options.context) {
              qs.context = options.context;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "GET", `/pages/${pageId}`, {}, qs);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.context) {
              qs.context = options.context;
            }
            if (options.orderBy) {
              qs.orderby = options.orderBy;
            }
            if (options.order) {
              qs.order = options.order;
            }
            if (options.search) {
              qs.search = options.search;
            }
            if (options.after) {
              qs.after = options.after;
            }
            if (options.author) {
              qs.author = options.author;
            }
            if (options.parent) {
              qs.parent = options.parent;
            }
            if (options.menuOrder) {
              qs.menu_order = options.menuOrder;
            }
            if (options.status) {
              qs.status = options.status;
            }
            if (options.page) {
              qs.page = options.page;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.wordpressApiRequestAllItems.call(this, "GET", "/pages", {}, qs);
            } else {
              qs.per_page = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "GET", "/pages", {}, qs);
            }
          }
          if (operation === "delete") {
            const pageId = this.getNodeParameter("pageId", i);
            const options = this.getNodeParameter("options", i);
            if (options.force) {
              qs.force = options.force;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(
              this,
              "DELETE",
              `/pages/${pageId}`,
              {},
              qs
            );
          }
        }
        if (resource === "user") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const username = this.getNodeParameter("username", i);
            const firstName = this.getNodeParameter("firstName", i);
            const lastName = this.getNodeParameter("lastName", i);
            const email = this.getNodeParameter("email", i);
            const password = this.getNodeParameter("password", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name,
              username,
              first_name: firstName,
              last_name: lastName,
              email,
              password
            };
            if (additionalFields.url) {
              body.url = additionalFields.url;
            }
            if (additionalFields.description) {
              body.description = additionalFields.description;
            }
            if (additionalFields.nickname) {
              body.nickname = additionalFields.nickname;
            }
            if (additionalFields.slug) {
              body.slug = additionalFields.slug;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "POST", "/users", body);
          }
          if (operation === "update") {
            const userId = this.getNodeParameter("userId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: userId
            };
            if (updateFields.name) {
              body.name = updateFields.name;
            }
            if (updateFields.firstName) {
              body.first_name = updateFields.firstName;
            }
            if (updateFields.lastName) {
              body.last_name = updateFields.lastName;
            }
            if (updateFields.email) {
              body.email = updateFields.email;
            }
            if (updateFields.password) {
              body.password = updateFields.password;
            }
            if (updateFields.username) {
              body.username = updateFields.username;
            }
            if (updateFields.url) {
              body.url = updateFields.url;
            }
            if (updateFields.description) {
              body.description = updateFields.description;
            }
            if (updateFields.nickname) {
              body.nickname = updateFields.nickname;
            }
            if (updateFields.slug) {
              body.slug = updateFields.slug;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "POST", `/users/${userId}`, body);
          }
          if (operation === "get") {
            const userId = this.getNodeParameter("userId", i);
            const options = this.getNodeParameter("options", i);
            if (options.context) {
              qs.context = options.context;
            }
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "GET", `/users/${userId}`, {}, qs);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.context) {
              qs.context = options.context;
            }
            if (options.orderBy) {
              qs.orderby = options.orderBy;
            }
            if (options.order) {
              qs.order = options.order;
            }
            if (options.search) {
              qs.search = options.search;
            }
            if (options.who) {
              qs.who = options.who;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.wordpressApiRequestAllItems.call(this, "GET", "/users", {}, qs);
            } else {
              qs.per_page = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "GET", "/users", {}, qs);
            }
          }
          if (operation === "delete") {
            const reassign = this.getNodeParameter("reassign", i);
            qs.reassign = reassign;
            qs.force = true;
            responseData = await import_GenericFunctions.wordpressApiRequest.call(this, "DELETE", "/users/me", {}, qs);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
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
  Wordpress
});
//# sourceMappingURL=Wordpress.node.js.map