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
var HackerNews_node_exports = {};
__export(HackerNews_node_exports, {
  HackerNews: () => HackerNews
});
module.exports = __toCommonJS(HackerNews_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class HackerNews {
  constructor() {
    this.description = {
      displayName: "Hacker News",
      name: "hackerNews",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:hackernews.png",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Hacker News API",
      defaults: {
        name: "Hacker News"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      properties: [
        // ----------------------------------
        //         Resources
        // ----------------------------------
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "All",
              value: "all"
            },
            {
              name: "Article",
              value: "article"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "article"
        },
        // ----------------------------------
        //         Operations
        // ----------------------------------
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["all"]
            }
          },
          options: [
            {
              name: "Get Many",
              value: "getAll",
              description: "Get many items",
              action: "Get many items"
            }
          ],
          default: "getAll"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["article"]
            }
          },
          options: [
            {
              name: "Get",
              value: "get",
              description: "Get a Hacker News article",
              action: "Get an article"
            }
          ],
          default: "get"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["user"]
            }
          },
          options: [
            {
              name: "Get",
              value: "get",
              description: "Get a Hacker News user",
              action: "Get a user"
            }
          ],
          default: "get"
        },
        // ----------------------------------
        //         Fields
        // ----------------------------------
        {
          displayName: "Article ID",
          name: "articleId",
          type: "string",
          required: true,
          default: "",
          description: "The ID of the Hacker News article to be returned",
          displayOptions: {
            show: {
              resource: ["article"],
              operation: ["get"]
            }
          }
        },
        {
          displayName: "Username",
          name: "username",
          type: "string",
          required: true,
          default: "",
          description: "The Hacker News user to be returned",
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["get"]
            }
          }
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          default: false,
          description: "Whether to return all results or only up to a given limit",
          displayOptions: {
            show: {
              resource: ["all"],
              operation: ["getAll"]
            }
          }
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 100,
          description: "Max number of results to return",
          displayOptions: {
            show: {
              resource: ["all"],
              operation: ["getAll"],
              returnAll: [false]
            }
          }
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          displayOptions: {
            show: {
              resource: ["article"],
              operation: ["get"]
            }
          },
          options: [
            {
              displayName: "Include Comments",
              name: "includeComments",
              type: "boolean",
              default: false,
              description: "Whether to include all the comments in a Hacker News article"
            }
          ]
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          displayOptions: {
            show: {
              resource: ["all"],
              operation: ["getAll"]
            }
          },
          options: [
            {
              displayName: "Keyword",
              name: "keyword",
              type: "string",
              default: "",
              description: "The keyword for filtering the results of the query"
            },
            {
              displayName: "Tags",
              name: "tags",
              type: "multiOptions",
              options: [
                {
                  name: "Ask HN",
                  value: "ask_hn",
                  // snake case per HN tags
                  description: "Returns query results filtered by Ask HN tag"
                },
                {
                  name: "Comment",
                  value: "comment",
                  description: "Returns query results filtered by comment tag"
                },
                {
                  name: "Front Page",
                  value: "front_page",
                  // snake case per HN tags
                  description: "Returns query results filtered by Front Page tag"
                },
                {
                  name: "Poll",
                  value: "poll",
                  description: "Returns query results filtered by poll tag"
                },
                {
                  name: "Show HN",
                  value: "show_hn",
                  // snake case per HN tags
                  description: "Returns query results filtered by Show HN tag"
                },
                {
                  name: "Story",
                  value: "story",
                  description: "Returns query results filtered by story tag"
                }
              ],
              default: [],
              description: "Tags for filtering the results of the query"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let returnAll = false;
    for (let i = 0; i < items.length; i++) {
      try {
        let qs = {};
        let endpoint = "";
        let includeComments = false;
        if (resource === "all") {
          if (operation === "getAll") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const keyword = additionalFields.keyword;
            const tags = additionalFields.tags;
            qs = {
              query: keyword,
              tags: tags ? tags.join() : ""
            };
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.hitsPerPage = this.getNodeParameter("limit", i);
            }
            endpoint = "search?";
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation '${operation}' is unknown!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "article") {
          if (operation === "get") {
            endpoint = `items/${this.getNodeParameter("articleId", i)}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            includeComments = additionalFields.includeComments;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation '${operation}' is unknown!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "user") {
          if (operation === "get") {
            endpoint = `users/${this.getNodeParameter("username", i)}`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation '${operation}' is unknown!`,
              { itemIndex: i }
            );
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource '${resource}' is unknown!`, {
            itemIndex: i
          });
        }
        let responseData;
        if (returnAll) {
          responseData = await import_GenericFunctions.hackerNewsApiRequestAllItems.call(this, "GET", endpoint, qs);
        } else {
          responseData = await import_GenericFunctions.hackerNewsApiRequest.call(this, "GET", endpoint, qs);
          if (resource === "all" && operation === "getAll") {
            responseData = responseData.hits;
          }
        }
        if (resource === "article" && operation === "get" && !includeComments) {
          delete responseData.children;
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
  HackerNews
});
//# sourceMappingURL=HackerNews.node.js.map