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
var Reddit_node_exports = {};
__export(Reddit_node_exports, {
  Reddit: () => Reddit
});
module.exports = __toCommonJS(Reddit_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_PostCommentDescription = require("./PostCommentDescription");
var import_PostDescription = require("./PostDescription");
var import_ProfileDescription = require("./ProfileDescription");
var import_SubredditDescription = require("./SubredditDescription");
var import_UserDescription = require("./UserDescription");
class Reddit {
  constructor() {
    this.description = {
      displayName: "Reddit",
      name: "reddit",
      icon: "file:reddit.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Reddit API",
      defaults: {
        name: "Reddit"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "redditOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              resource: ["postComment", "post", "profile"]
            }
          }
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
              name: "Post Comment",
              value: "postComment"
            },
            {
              name: "Profile",
              value: "profile"
            },
            {
              name: "Subreddit",
              value: "subreddit"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "post"
        },
        ...import_PostCommentDescription.postCommentOperations,
        ...import_PostCommentDescription.postCommentFields,
        ...import_ProfileDescription.profileOperations,
        ...import_ProfileDescription.profileFields,
        ...import_SubredditDescription.subredditOperations,
        ...import_SubredditDescription.subredditFields,
        ...import_PostDescription.postOperations,
        ...import_PostDescription.postFields,
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "post") {
          if (operation === "create") {
            const qs = {
              title: this.getNodeParameter("title", i),
              sr: this.getNodeParameter("subreddit", i),
              kind: this.getNodeParameter("kind", i)
            };
            qs.kind === "self" ? qs.text = this.getNodeParameter("text", i) : qs.url = this.getNodeParameter("url", i);
            if (qs.url) {
              qs.resubmit = this.getNodeParameter("resubmit", i);
            }
            responseData = await import_GenericFunctions.redditApiRequest.call(this, "POST", "api/submit", qs);
            responseData = responseData.json.data;
          } else if (operation === "delete") {
            const postTypePrefix = "t3_";
            const qs = {
              id: postTypePrefix + this.getNodeParameter("postId", i)
            };
            await import_GenericFunctions.redditApiRequest.call(this, "POST", "api/del", qs);
            responseData = { success: true };
          } else if (operation === "get") {
            const subreddit = this.getNodeParameter("subreddit", i);
            const postId = this.getNodeParameter("postId", i);
            const endpoint = `r/${subreddit}/comments/${postId}.json`;
            responseData = await import_GenericFunctions.redditApiRequest.call(this, "GET", endpoint, {});
            responseData = responseData[0].data.children[0].data;
          } else if (operation === "getAll") {
            const subreddit = this.getNodeParameter("subreddit", i);
            let endpoint = `r/${subreddit}.json`;
            const { category } = this.getNodeParameter("filters", i);
            if (category) {
              endpoint = `r/${subreddit}/${category}.json`;
            }
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint);
          } else if (operation === "search") {
            const location = this.getNodeParameter("location", i);
            const qs = {
              q: this.getNodeParameter("keyword", i),
              restrict_sr: location === "subreddit"
            };
            const { sort } = this.getNodeParameter("additionalFields", i);
            if (sort) {
              qs.sort = sort;
            }
            let endpoint = "";
            if (location === "allReddit") {
              endpoint = "search.json";
            } else {
              const subreddit = this.getNodeParameter("subreddit", i);
              endpoint = `r/${subreddit}/search.json`;
            }
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint, qs);
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.splice(0, limit);
            }
          }
        } else if (resource === "postComment") {
          if (operation === "create") {
            const postTypePrefix = "t3_";
            const qs = {
              text: this.getNodeParameter("commentText", i),
              thing_id: postTypePrefix + this.getNodeParameter("postId", i)
            };
            responseData = await import_GenericFunctions.redditApiRequest.call(this, "POST", "api/comment", qs);
            responseData = responseData.json.data.things[0].data;
          } else if (operation === "getAll") {
            const subreddit = this.getNodeParameter("subreddit", i);
            const postId = this.getNodeParameter("postId", i);
            const endpoint = `r/${subreddit}/comments/${postId}.json`;
            responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint);
          } else if (operation === "delete") {
            const commentTypePrefix = "t1_";
            const qs = {
              id: commentTypePrefix + this.getNodeParameter("commentId", i)
            };
            await import_GenericFunctions.redditApiRequest.call(this, "POST", "api/del", qs);
            responseData = { success: true };
          } else if (operation === "reply") {
            const commentTypePrefix = "t1_";
            const qs = {
              text: this.getNodeParameter("replyText", i),
              thing_id: commentTypePrefix + this.getNodeParameter("commentId", i)
            };
            responseData = await import_GenericFunctions.redditApiRequest.call(this, "POST", "api/comment", qs);
            responseData = responseData.json.data.things[0].data;
          }
        } else if (resource === "profile") {
          if (operation === "get") {
            const endpoints = {
              identity: "me",
              blockedUsers: "me/blocked",
              friends: "me/friends",
              karma: "me/karma",
              prefs: "me/prefs",
              trophies: "me/trophies"
            };
            const details = this.getNodeParameter("details", i);
            const endpoint = `api/v1/${endpoints[details]}`;
            let username;
            if (details === "saved") {
              ({ name: username } = await import_GenericFunctions.redditApiRequest.call(this, "GET", "api/v1/me", {}));
            }
            responseData = details === "saved" ? await import_GenericFunctions.handleListing.call(this, i, `user/${username}/saved.json`) : await import_GenericFunctions.redditApiRequest.call(this, "GET", endpoint, {});
            if (details === "identity") {
              responseData = responseData.features;
            } else if (details === "friends") {
              responseData = responseData.data.children;
              if (!responseData.length) {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData);
              }
            } else if (details === "karma") {
              responseData = responseData.data;
              if (!responseData.length) {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData);
              }
            } else if (details === "trophies") {
              responseData = responseData.data.trophies.map((trophy) => trophy.data);
            }
          }
        } else if (resource === "subreddit") {
          if (operation === "get") {
            const subreddit = this.getNodeParameter("subreddit", i);
            const content = this.getNodeParameter("content", i);
            const endpoint = `r/${subreddit}/about/${content}.json`;
            responseData = await import_GenericFunctions.redditApiRequest.call(this, "GET", endpoint, {});
            if (content === "rules") {
              responseData = responseData.rules;
            } else if (content === "about") {
              responseData = responseData.data;
            }
          } else if (operation === "getAll") {
            const filters = this.getNodeParameter("filters", i);
            if (filters.trending) {
              const returnAll = this.getNodeParameter("returnAll", 0);
              const endpoint = "api/trending_subreddits.json";
              responseData = await import_GenericFunctions.redditApiRequest.call(this, "GET", endpoint, {});
              responseData = responseData.subreddit_names.map((name) => ({ name }));
              if (!returnAll) {
                const limit = this.getNodeParameter("limit", 0);
                responseData = responseData.splice(0, limit);
              }
            } else if (filters.keyword) {
              const qs = {};
              qs.query = filters.keyword;
              const endpoint = "api/search_subreddits.json";
              responseData = await import_GenericFunctions.redditApiRequest.call(this, "POST", endpoint, qs);
              const returnAll = this.getNodeParameter("returnAll", 0);
              if (!returnAll) {
                const limit = this.getNodeParameter("limit", 0);
                responseData = responseData.subreddits.splice(0, limit);
              }
            } else {
              const endpoint = "r/subreddits.json";
              responseData = await import_GenericFunctions.handleListing.call(this, i, endpoint);
            }
          }
        } else if (resource === "user") {
          if (operation === "get") {
            const username = this.getNodeParameter("username", i);
            const details = this.getNodeParameter("details", i);
            const endpoint = `user/${username}/${details}.json`;
            responseData = details === "about" ? await import_GenericFunctions.redditApiRequest.call(this, "GET", endpoint, {}) : await import_GenericFunctions.handleListing.call(this, i, endpoint);
            if (details === "about") {
              responseData = responseData.data;
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
  Reddit
});
//# sourceMappingURL=Reddit.node.js.map