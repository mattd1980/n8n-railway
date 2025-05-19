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
var TwitterV2_node_exports = {};
__export(TwitterV2_node_exports, {
  TwitterV2: () => TwitterV2
});
module.exports = __toCommonJS(TwitterV2_node_exports);
var import_iso_639_1 = __toESM(require("iso-639-1"));
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
var import_DirectMessageDescription = require("./DirectMessageDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_ListDescription = require("./ListDescription");
var import_TweetDescription = require("./TweetDescription");
var import_UserDescription = require("./UserDescription");
class TwitterV2 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        // Get all the available languages to display them to user so that they can
        // select them easily
        async getLanguages() {
          const returnData = [];
          const languages = import_iso_639_1.default.getAllNames();
          for (const language of languages) {
            const languageName = language;
            const languageId = import_iso_639_1.default.getCode(language);
            returnData.push({
              name: languageName,
              value: languageId
            });
          }
          return returnData;
        }
      }
    };
    this.description = {
      ...baseDescription,
      version: 2,
      description: "Post, like, and search tweets, send messages, search users, and add users to lists",
      subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
      defaults: {
        name: "X"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "twitterOAuth2Api",
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
              name: "Direct Message",
              value: "directMessage",
              description: "Send a direct message to a user"
            },
            {
              name: "List",
              value: "list",
              description: "Add a user to a list"
            },
            {
              name: "Tweet",
              value: "tweet",
              description: "Create, like, search, or delete a tweet"
            },
            {
              name: "User",
              value: "user",
              description: "Search users by username"
            }
          ],
          default: "tweet"
        },
        // DIRECT MESSAGE
        ...import_DirectMessageDescription.directMessageOperations,
        ...import_DirectMessageDescription.directMessageFields,
        // LIST
        ...import_ListDescription.listOperations,
        ...import_ListDescription.listFields,
        // TWEET
        ...import_TweetDescription.tweetOperations,
        ...import_TweetDescription.tweetFields,
        // USER
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields
      ]
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
        if (resource === "user") {
          if (operation === "searchUser") {
            const me = this.getNodeParameter("me", i, false);
            if (me) {
              responseData = await import_GenericFunctions.twitterApiRequest.call(this, "GET", "/users/me", {});
            } else {
              const userRlc = this.getNodeParameter(
                "user",
                i,
                void 0,
                {}
              );
              if (userRlc.mode === "username") {
                userRlc.value = userRlc.value.includes("@") ? userRlc.value.replace("@", "") : userRlc.value;
                responseData = await import_GenericFunctions.twitterApiRequest.call(
                  this,
                  "GET",
                  `/users/by/username/${userRlc.value}`,
                  {}
                );
              } else if (userRlc.mode === "id") {
                responseData = await import_GenericFunctions.twitterApiRequest.call(
                  this,
                  "GET",
                  `/users/${userRlc.value}`,
                  {}
                );
              }
            }
          }
        }
        if (resource === "tweet") {
          if (operation === "search") {
            const searchText = this.getNodeParameter("searchText", i, "", {});
            const returnAll = this.getNodeParameter("returnAll", i);
            const { sortOrder, startTime, endTime, tweetFieldsObject } = this.getNodeParameter(
              "additionalFields",
              i,
              {}
            );
            const qs = {
              query: searchText
            };
            if (endTime) {
              const endTimeISO = import_luxon.DateTime.fromISO(endTime).toISO();
              qs.end_time = endTimeISO;
            }
            if (sortOrder) {
              qs.sort_order = sortOrder;
            }
            if (startTime) {
              const startTimeISO8601 = import_luxon.DateTime.fromISO(startTime).toISO();
              qs.start_time = startTimeISO8601;
            }
            if (tweetFieldsObject) {
              if (tweetFieldsObject.length > 0) {
                qs["tweet.fields"] = tweetFieldsObject.join(",");
              }
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.twitterApiRequestAllItems.call(
                this,
                "data",
                "GET",
                "/tweets/search/recent",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.max_results = limit;
              responseData = await import_GenericFunctions.twitterApiRequest.call(
                this,
                "GET",
                "/tweets/search/recent",
                {},
                qs
              );
            }
          }
          if (operation === "create") {
            const text = this.getNodeParameter("text", i, "", {});
            const { location, attachments, inQuoteToStatusId, inReplyToStatusId } = this.getNodeParameter("additionalFields", i, {});
            const body = {
              text
            };
            if (location) {
              body.geo = { place_id: location };
            }
            if (attachments) {
              body.media = { media_ids: [attachments] };
            }
            if (inQuoteToStatusId) {
              body.quote_tweet_id = (0, import_GenericFunctions.returnId)(inQuoteToStatusId);
            }
            if (inReplyToStatusId) {
              const inReplyToStatusIdValue = { in_reply_to_tweet_id: (0, import_GenericFunctions.returnId)(inReplyToStatusId) };
              body.reply = inReplyToStatusIdValue;
            }
            responseData = await import_GenericFunctions.twitterApiRequest.call(this, "POST", "/tweets", body);
          }
          if (operation === "delete") {
            const tweetRLC = this.getNodeParameter(
              "tweetDeleteId",
              i,
              "",
              {}
            );
            const tweetId = (0, import_GenericFunctions.returnId)(tweetRLC);
            responseData = await import_GenericFunctions.twitterApiRequest.call(this, "DELETE", `/tweets/${tweetId}`, {});
          }
          if (operation === "like") {
            const tweetRLC = this.getNodeParameter(
              "tweetId",
              i,
              "",
              {}
            );
            const tweetId = (0, import_GenericFunctions.returnId)(tweetRLC);
            const body = {
              tweet_id: tweetId
            };
            const user = await import_GenericFunctions.twitterApiRequest.call(this, "GET", "/users/me", {});
            responseData = await import_GenericFunctions.twitterApiRequest.call(
              this,
              "POST",
              `/users/${user.id}/likes`,
              body
            );
          }
          if (operation === "retweet") {
            const tweetRLC = this.getNodeParameter(
              "tweetId",
              i,
              "",
              {}
            );
            const tweetId = (0, import_GenericFunctions.returnId)(tweetRLC);
            const body = {
              tweet_id: tweetId
            };
            const user = await import_GenericFunctions.twitterApiRequest.call(this, "GET", "/users/me", {});
            responseData = await import_GenericFunctions.twitterApiRequest.call(
              this,
              "POST",
              `/users/${user.id}/retweets`,
              body
            );
          }
        }
        if (resource === "list") {
          if (operation === "add") {
            const userRlc = this.getNodeParameter(
              "user",
              i,
              "",
              {}
            );
            const userId = userRlc.mode !== "username" ? (0, import_GenericFunctions.returnId)(userRlc) : await import_GenericFunctions.returnIdFromUsername.call(this, userRlc);
            const listRlc = this.getNodeParameter(
              "list",
              i,
              "",
              {}
            );
            const listId = (0, import_GenericFunctions.returnId)(listRlc);
            responseData = await import_GenericFunctions.twitterApiRequest.call(this, "POST", `/lists/${listId}/members`, {
              user_id: userId
            });
          }
        }
        if (resource === "directMessage") {
          if (operation === "create") {
            const userRlc = this.getNodeParameter(
              "user",
              i,
              "",
              {}
            );
            const user = await import_GenericFunctions.returnIdFromUsername.call(this, userRlc);
            const text = this.getNodeParameter("text", i, "", {});
            const { attachments } = this.getNodeParameter("additionalFields", i, {}, {});
            const body = {
              text
            };
            if (attachments) {
              body.attachments = [{ media_id: attachments }];
            }
            responseData = await import_GenericFunctions.twitterApiRequest.call(
              this,
              "POST",
              `/dm_conversations/with/${user}/messages`,
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
          const executionErrorData = {
            json: {
              error: error.message
            }
          };
          returnData.push(executionErrorData);
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
  TwitterV2
});
//# sourceMappingURL=TwitterV2.node.js.map