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
var TwitterV1_node_exports = {};
__export(TwitterV1_node_exports, {
  TwitterV1: () => TwitterV1
});
module.exports = __toCommonJS(TwitterV1_node_exports);
var import_iso_639_1 = __toESM(require("iso-639-1"));
var import_n8n_workflow = require("n8n-workflow");
var import_DirectMessageDescription = require("./DirectMessageDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_TweetDescription = require("./TweetDescription");
class TwitterV1 {
  constructor(baseDecription) {
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
      ...baseDecription,
      version: 1,
      description: "Consume Twitter API",
      subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
      defaults: {
        name: "Twitter"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "twitterOAuth1Api",
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
              value: "directMessage"
            },
            {
              name: "Tweet",
              value: "tweet"
            }
          ],
          default: "tweet"
        },
        // DIRECT MESSAGE
        ...import_DirectMessageDescription.directMessageOperations,
        ...import_DirectMessageDescription.directMessageFields,
        // TWEET
        ...import_TweetDescription.tweetOperations,
        ...import_TweetDescription.tweetFields
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
        if (resource === "directMessage") {
          if (operation === "create") {
            const userId = this.getNodeParameter("userId", i);
            const text = this.getNodeParameter("text", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              type: "message_create",
              message_create: {
                target: {
                  recipient_id: userId
                },
                message_data: {
                  text,
                  attachment: {}
                }
              }
            };
            if (additionalFields.attachment) {
              const attachment = additionalFields.attachment;
              const attachmentProperties = attachment.split(",").map((propertyName) => {
                return propertyName.trim();
              });
              const medias = await import_GenericFunctions.uploadAttachments.call(this, attachmentProperties, i);
              body.message_create.message_data.attachment = {
                type: "media",
                //@ts-ignore
                media: { id: medias[0].media_id_string }
              };
            } else {
              delete body.message_create.message_data.attachment;
            }
            responseData = await import_GenericFunctions.twitterApiRequest.call(
              this,
              "POST",
              "/direct_messages/events/new.json",
              { event: body }
            );
            responseData = responseData.event;
          }
        }
        if (resource === "tweet") {
          if (operation === "create") {
            const text = this.getNodeParameter("text", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              status: text
            };
            if (additionalFields.inReplyToStatusId) {
              body.in_reply_to_status_id = additionalFields.inReplyToStatusId;
              body.auto_populate_reply_metadata = true;
            }
            if (additionalFields.attachments) {
              const attachments = additionalFields.attachments;
              const attachmentProperties = attachments.split(",").map((propertyName) => {
                return propertyName.trim();
              });
              const medias = await import_GenericFunctions.uploadAttachments.call(this, attachmentProperties, i);
              body.media_ids = medias.map((media) => media.media_id_string).join(",");
            }
            if (additionalFields.possiblySensitive) {
              body.possibly_sensitive = additionalFields.possiblySensitive;
            }
            if (additionalFields.displayCoordinates) {
              body.display_coordinates = additionalFields.displayCoordinates;
            }
            if (additionalFields.locationFieldsUi) {
              const locationUi = additionalFields.locationFieldsUi;
              if (locationUi.locationFieldsValues) {
                const values = locationUi.locationFieldsValues;
                body.lat = parseFloat(values.latitude);
                body.long = parseFloat(values.longitude);
              }
            }
            responseData = await import_GenericFunctions.twitterApiRequest.call(
              this,
              "POST",
              "/statuses/update.json",
              {},
              body
            );
          }
          if (operation === "delete") {
            const tweetId = this.getNodeParameter("tweetId", i);
            responseData = await import_GenericFunctions.twitterApiRequest.call(
              this,
              "POST",
              `/statuses/destroy/${tweetId}.json`,
              {},
              {}
            );
          }
          if (operation === "search") {
            const q = this.getNodeParameter("searchText", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const qs = {
              q
            };
            if (additionalFields.includeEntities) {
              qs.include_entities = additionalFields.includeEntities;
            }
            if (additionalFields.resultType) {
              qs.response_type = additionalFields.resultType;
            }
            if (additionalFields.until) {
              qs.until = additionalFields.until;
            }
            if (additionalFields.lang) {
              qs.lang = additionalFields.lang;
            }
            if (additionalFields.locationFieldsUi) {
              const locationUi = additionalFields.locationFieldsUi;
              if (locationUi.locationFieldsValues) {
                const values = locationUi.locationFieldsValues;
                qs.geocode = `${values.latitude},${values.longitude},${values.distance}${values.radius}`;
              }
            }
            qs.tweet_mode = additionalFields.tweetMode || "compat";
            if (returnAll) {
              responseData = await import_GenericFunctions.twitterApiRequestAllItems.call(
                this,
                "statuses",
                "GET",
                "/search/tweets.json",
                {},
                qs
              );
            } else {
              qs.count = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.twitterApiRequest.call(
                this,
                "GET",
                "/search/tweets.json",
                {},
                qs
              );
              responseData = responseData.statuses;
            }
          }
          if (operation === "like") {
            const tweetId = this.getNodeParameter("tweetId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const qs = {
              id: tweetId
            };
            if (additionalFields.includeEntities) {
              qs.include_entities = additionalFields.includeEntities;
            }
            responseData = await import_GenericFunctions.twitterApiRequest.call(
              this,
              "POST",
              "/favorites/create.json",
              {},
              qs
            );
          }
          if (operation === "retweet") {
            const tweetId = this.getNodeParameter("tweetId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const qs = {
              id: tweetId
            };
            if (additionalFields.trimUser) {
              qs.trim_user = additionalFields.trimUser;
            }
            responseData = await import_GenericFunctions.twitterApiRequest.call(
              this,
              "POST",
              `/statuses/retweet/${tweetId}.json`,
              {},
              qs
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
  TwitterV1
});
//# sourceMappingURL=TwitterV1.node.js.map