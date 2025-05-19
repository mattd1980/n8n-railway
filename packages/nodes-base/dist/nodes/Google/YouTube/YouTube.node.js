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
var YouTube_node_exports = {};
__export(YouTube_node_exports, {
  YouTube: () => YouTube
});
module.exports = __toCommonJS(YouTube_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_stream = require("stream");
var import_ISOCountryCodes = require("../../../utils/ISOCountryCodes");
var import_ChannelDescription = require("./ChannelDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_PlaylistDescription = require("./PlaylistDescription");
var import_PlaylistItemDescription = require("./PlaylistItemDescription");
var import_VideoCategoryDescription = require("./VideoCategoryDescription");
var import_VideoDescription = require("./VideoDescription");
var import_GenericFunctions2 = require("../GenericFunctions");
const UPLOAD_CHUNK_SIZE = 1024 * 1024;
class YouTube {
  constructor() {
    this.description = {
      displayName: "YouTube",
      name: "youTube",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:youTube.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume YouTube API",
      defaults: {
        name: "YouTube"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "youTubeOAuth2Api",
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
              name: "Channel",
              value: "channel"
            },
            {
              name: "Playlist",
              value: "playlist"
            },
            {
              name: "Playlist Item",
              value: "playlistItem"
            },
            {
              name: "Video",
              value: "video"
            },
            {
              name: "Video Category",
              value: "videoCategory"
            }
          ],
          default: "channel"
        },
        ...import_ChannelDescription.channelOperations,
        ...import_ChannelDescription.channelFields,
        ...import_PlaylistDescription.playlistOperations,
        ...import_PlaylistDescription.playlistFields,
        ...import_PlaylistItemDescription.playlistItemOperations,
        ...import_PlaylistItemDescription.playlistItemFields,
        ...import_VideoDescription.videoOperations,
        ...import_VideoDescription.videoFields,
        ...import_VideoCategoryDescription.videoCategoryOperations,
        ...import_VideoCategoryDescription.videoCategoryFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the languages to display them to user so that they can
        // select them easily
        async getLanguages() {
          const returnData = [];
          const languages = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "items",
            "GET",
            "/youtube/v3/i18nLanguages"
          );
          for (const language of languages) {
            const languageName = language.id.toUpperCase();
            const languageId = language.id;
            returnData.push({
              name: languageName,
              value: languageId
            });
          }
          return returnData;
        },
        // Get all the countries codes to display them to user so that they can
        // select them easily
        async getCountriesCodes() {
          const returnData = [];
          for (const countryCode of import_ISOCountryCodes.isoCountryCodes) {
            const countryCodeName = `${countryCode.name} - ${countryCode.alpha2}`;
            const countryCodeId = countryCode.alpha2;
            returnData.push({
              name: countryCodeName,
              value: countryCodeId
            });
          }
          return returnData;
        },
        // Get all the video categories to display them to user so that they can
        // select them easily
        async getVideoCategories() {
          const countryCode = this.getCurrentNodeParameter("regionCode");
          const returnData = [];
          const qs = {};
          qs.regionCode = countryCode;
          qs.part = "snippet";
          const categories = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "items",
            "GET",
            "/youtube/v3/videoCategories",
            {},
            qs
          );
          for (const category of categories) {
            const categoryName = category.snippet.title;
            const categoryId = category.id;
            returnData.push({
              name: categoryName,
              value: categoryId
            });
          }
          return returnData;
        },
        // Get all the playlists to display them to user so that they can
        // select them easily
        async getPlaylists() {
          const returnData = [];
          const qs = {};
          qs.part = "snippet";
          qs.mine = true;
          const playlists = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "items",
            "GET",
            "/youtube/v3/playlists",
            {},
            qs
          );
          for (const playlist of playlists) {
            const playlistName = playlist.snippet.title;
            const playlistId = playlist.id;
            returnData.push({
              name: playlistName,
              value: playlistId
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
        if (resource === "channel") {
          if (operation === "get") {
            let part = this.getNodeParameter("part", i);
            const channelId = this.getNodeParameter("channelId", i);
            if (part.includes("*")) {
              part = [
                "brandingSettings",
                "contentDetails",
                "contentOwnerDetails",
                "id",
                "localizations",
                "snippet",
                "statistics",
                "status",
                "topicDetails"
              ];
            }
            qs.part = part.join(",");
            qs.id = channelId;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/youtube/v3/channels", {}, qs);
            responseData = responseData.items;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            let part = this.getNodeParameter("part", i);
            const options = this.getNodeParameter("options", i);
            const filters = this.getNodeParameter("filters", i);
            if (part.includes("*")) {
              part = [
                "brandingSettings",
                "contentDetails",
                "contentOwnerDetails",
                "id",
                "localizations",
                "snippet",
                "statistics",
                "status",
                "topicDetails"
              ];
            }
            qs.part = part.join(",");
            Object.assign(qs, options, filters);
            qs.mine = true;
            if (qs.categoryId || qs.forUsername || qs.id || qs.managedByMe) {
              delete qs.mine;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/youtube/v3/channels",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/youtube/v3/channels",
                {},
                qs
              );
              responseData = responseData.items;
            }
          }
          if (operation === "update") {
            const channelId = this.getNodeParameter("channelId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: channelId,
              brandingSettings: {
                channel: {},
                image: {}
              }
            };
            qs.part = "brandingSettings";
            if (updateFields.onBehalfOfContentOwner) {
              qs.onBehalfOfContentOwner = updateFields.onBehalfOfContentOwner;
            }
            if (updateFields.brandingSettingsUi) {
              const channelSettingsValues = updateFields.brandingSettingsUi.channelSettingsValues;
              const channelSettings = {};
              if (channelSettingsValues?.channel) {
                const channelSettingsOptions = channelSettingsValues.channel;
                if (channelSettingsOptions.country) {
                  channelSettings.country = channelSettingsOptions.country;
                }
                if (channelSettingsOptions.description) {
                  channelSettings.description = channelSettingsOptions.description;
                }
                if (channelSettingsOptions.defaultLanguage) {
                  channelSettings.defaultLanguage = channelSettingsOptions.defaultLanguage;
                }
                if (channelSettingsOptions.defaultTab) {
                  channelSettings.defaultTab = channelSettingsOptions.defaultTab;
                }
                if (channelSettingsOptions.featuredChannelsTitle) {
                  channelSettings.featuredChannelsTitle = channelSettingsOptions.featuredChannelsTitle;
                }
                if (channelSettingsOptions.featuredChannelsUrls) {
                  channelSettings.featuredChannelsUrls = channelSettingsOptions.featuredChannelsUrls;
                }
                if (channelSettingsOptions.keywords) {
                  channelSettings.keywords = channelSettingsOptions.keywords;
                }
                if (channelSettingsOptions.moderateComments) {
                  channelSettings.moderateComments = channelSettingsOptions.moderateComments;
                }
                if (channelSettingsOptions.profileColor) {
                  channelSettings.profileColor = channelSettingsOptions.profileColor;
                }
                if (channelSettingsOptions.profileColor) {
                  channelSettings.profileColor = channelSettingsOptions.profileColor;
                }
                if (channelSettingsOptions.showRelatedChannels) {
                  channelSettings.showRelatedChannels = channelSettingsOptions.showRelatedChannels;
                }
                if (channelSettingsOptions.showBrowseView) {
                  channelSettings.showBrowseView = channelSettingsOptions.showBrowseView;
                }
                if (channelSettingsOptions.trackingAnalyticsAccountId) {
                  channelSettings.trackingAnalyticsAccountId = channelSettingsOptions.trackingAnalyticsAccountId;
                }
                if (channelSettingsOptions.unsubscribedTrailer) {
                  channelSettings.unsubscribedTrailer = channelSettingsOptions.unsubscribedTrailer;
                }
              }
              const imageSettingsValues = updateFields.brandingSettingsUi.imageSettingsValues;
              const imageSettings = {};
              if (imageSettingsValues?.image) {
                const imageSettingsOptions = imageSettings.image;
                if (imageSettingsOptions.bannerExternalUrl) {
                  imageSettings.bannerExternalUrl = imageSettingsOptions.bannerExternalUrl;
                }
                if (imageSettingsOptions.trackingImageUrl) {
                  imageSettings.trackingImageUrl = imageSettingsOptions.trackingImageUrl;
                }
                if (imageSettingsOptions.watchIconImageUrl) {
                  imageSettings.watchIconImageUrl = imageSettingsOptions.watchIconImageUrl;
                }
              }
              body.brandingSettings.channel = channelSettings;
              body.brandingSettings.image = imageSettings;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PUT",
              "/youtube/v3/channels",
              body,
              qs
            );
          }
          if (operation === "uploadBanner") {
            const channelId = this.getNodeParameter("channelId", i);
            const binaryProperty = this.getNodeParameter("binaryProperty", i);
            const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
            const body = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
            const requestOptions = {
              headers: {
                ...binaryData.mimeType ? { "Content-Type": binaryData.mimeType } : {}
              },
              json: false
            };
            const response = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/upload/youtube/v3/channelBanners/insert",
              body,
              qs,
              void 0,
              requestOptions
            );
            const { url } = JSON.parse(response);
            qs.part = "brandingSettings";
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PUT",
              "/youtube/v3/channels",
              {
                id: channelId,
                brandingSettings: {
                  image: {
                    bannerExternalUrl: url
                  }
                }
              },
              qs
            );
          }
        }
        if (resource === "playlist") {
          if (operation === "get") {
            let part = this.getNodeParameter("part", i);
            const playlistId = this.getNodeParameter("playlistId", i);
            const options = this.getNodeParameter("options", i);
            if (part.includes("*")) {
              part = ["contentDetails", "id", "localizations", "player", "snippet", "status"];
            }
            qs.part = part.join(",");
            qs.id = playlistId;
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              "/youtube/v3/playlists",
              {},
              qs
            );
            responseData = responseData.items;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            let part = this.getNodeParameter("part", i);
            const options = this.getNodeParameter("options", i);
            const filters = this.getNodeParameter("filters", i);
            if (part.includes("*")) {
              part = ["contentDetails", "id", "localizations", "player", "snippet", "status"];
            }
            qs.part = part.join(",");
            Object.assign(qs, options, filters);
            qs.mine = true;
            if (qs.channelId || qs.id) {
              delete qs.mine;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/youtube/v3/playlists",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/youtube/v3/playlists",
                {},
                qs
              );
              responseData = responseData.items;
            }
          }
          if (operation === "create") {
            const title = this.getNodeParameter("title", i);
            const options = this.getNodeParameter("options", i);
            qs.part = "snippet";
            const body = {
              snippet: {
                title
              }
            };
            if (options.tags) {
              body.snippet.tags = options.tags.split(",");
            }
            if (options.description) {
              body.snippet.privacyStatus = options.privacyStatus;
            }
            if (options.defaultLanguage) {
              body.snippet.defaultLanguage = options.defaultLanguage;
            }
            if (options.onBehalfOfContentOwner) {
              qs.onBehalfOfContentOwner = options.onBehalfOfContentOwner;
            }
            if (options.onBehalfOfContentOwnerChannel) {
              qs.onBehalfOfContentOwnerChannel = options.onBehalfOfContentOwnerChannel;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/youtube/v3/playlists",
              body,
              qs
            );
          }
          if (operation === "update") {
            const playlistId = this.getNodeParameter("playlistId", i);
            const title = this.getNodeParameter("title", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            qs.part = "snippet, status";
            const body = {
              id: playlistId,
              snippet: {
                title
              },
              status: {}
            };
            if (updateFields.tags) {
              body.snippet.tags = updateFields.tags.split(",");
            }
            if (updateFields.privacyStatus) {
              body.status.privacyStatus = updateFields.privacyStatus;
            }
            if (updateFields.description) {
              body.snippet.description = updateFields.description;
            }
            if (updateFields.defaultLanguage) {
              body.snippet.defaultLanguage = updateFields.defaultLanguage;
            }
            if (updateFields.onBehalfOfContentOwner) {
              qs.onBehalfOfContentOwner = updateFields.onBehalfOfContentOwner;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PUT",
              "/youtube/v3/playlists",
              body,
              qs
            );
          }
          if (operation === "delete") {
            const playlistId = this.getNodeParameter("playlistId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              id: playlistId
            };
            if (options.onBehalfOfContentOwner) {
              qs.onBehalfOfContentOwner = options.onBehalfOfContentOwner;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "DELETE",
              "/youtube/v3/playlists",
              body
            );
            responseData = { success: true };
          }
        }
        if (resource === "playlistItem") {
          if (operation === "get") {
            let part = this.getNodeParameter("part", i);
            const playlistItemId = this.getNodeParameter("playlistItemId", i);
            const options = this.getNodeParameter("options", i);
            if (part.includes("*")) {
              part = ["contentDetails", "id", "snippet", "status"];
            }
            qs.part = part.join(",");
            qs.id = playlistItemId;
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              "/youtube/v3/playlistItems",
              {},
              qs
            );
            responseData = responseData.items;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            let part = this.getNodeParameter("part", i);
            const options = this.getNodeParameter("options", i);
            const playlistId = this.getNodeParameter("playlistId", i);
            if (part.includes("*")) {
              part = ["contentDetails", "id", "snippet", "status"];
            }
            qs.playlistId = playlistId;
            qs.part = part.join(",");
            Object.assign(qs, options);
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/youtube/v3/playlistItems",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                "/youtube/v3/playlistItems",
                {},
                qs
              );
              responseData = responseData.items;
            }
          }
          if (operation === "add") {
            const playlistId = this.getNodeParameter("playlistId", i);
            const videoId = this.getNodeParameter("videoId", i);
            const options = this.getNodeParameter("options", i);
            qs.part = "snippet, contentDetails";
            const body = {
              snippet: {
                playlistId,
                resourceId: {
                  kind: "youtube#video",
                  videoId
                }
              },
              contentDetails: {}
            };
            if (options.position) {
              body.snippet.position = options.position;
            }
            if (options.note) {
              body.contentDetails.note = options.note;
            }
            if (options.startAt) {
              body.contentDetails.startAt = options.startAt;
            }
            if (options.endAt) {
              body.contentDetails.endAt = options.endAt;
            }
            if (options.onBehalfOfContentOwner) {
              qs.onBehalfOfContentOwner = options.onBehalfOfContentOwner;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/youtube/v3/playlistItems",
              body,
              qs
            );
          }
          if (operation === "delete") {
            const playlistItemId = this.getNodeParameter("playlistItemId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              id: playlistItemId
            };
            if (options.onBehalfOfContentOwner) {
              qs.onBehalfOfContentOwner = options.onBehalfOfContentOwner;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "DELETE",
              "/youtube/v3/playlistItems",
              body
            );
            responseData = { success: true };
          }
        }
        if (resource === "video") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            const filters = this.getNodeParameter("filters", i);
            qs.part = "snippet";
            qs.type = "video";
            qs.forMine = true;
            if (filters.publishedAfter) {
              (0, import_GenericFunctions2.validateAndSetDate)(filters, "publishedAfter", this.getTimezone(), this);
            }
            if (filters.publishedBefore) {
              (0, import_GenericFunctions2.validateAndSetDate)(filters, "publishedBefore", this.getTimezone(), this);
            }
            Object.assign(qs, options, filters);
            if (Object.keys(filters).length > 0) {
              delete qs.forMine;
            }
            if (qs.relatedToVideoId && qs.forDeveloper !== void 0) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "When using the parameter 'related to video' the parameter 'for developer' cannot be set",
                { itemIndex: i }
              );
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/youtube/v3/search",
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/youtube/v3/search", {}, qs);
              responseData = responseData.items;
            }
          }
          if (operation === "get") {
            let part = this.getNodeParameter("part", i);
            const videoId = this.getNodeParameter("videoId", i);
            const options = this.getNodeParameter("options", i);
            if (part.includes("*")) {
              part = [
                "contentDetails",
                "id",
                "liveStreamingDetails",
                "localizations",
                "player",
                "recordingDetails",
                "snippet",
                "statistics",
                "status",
                "topicDetails"
              ];
            }
            qs.part = part.join(",");
            qs.id = videoId;
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/youtube/v3/videos", {}, qs);
            responseData = responseData.items;
          }
          if (operation === "upload") {
            const title = this.getNodeParameter("title", i);
            const categoryId = this.getNodeParameter("categoryId", i);
            const options = this.getNodeParameter("options", i);
            const binaryProperty = this.getNodeParameter("binaryProperty", i);
            const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
            let mimeType;
            let contentLength;
            let fileContent;
            if (binaryData.id) {
              fileContent = await this.helpers.getBinaryStream(binaryData.id, UPLOAD_CHUNK_SIZE);
              const metadata = await this.helpers.getBinaryMetadata(binaryData.id);
              contentLength = metadata.fileSize;
              mimeType = metadata.mimeType ?? binaryData.mimeType;
            } else {
              const buffer = Buffer.from(binaryData.data, import_n8n_workflow.BINARY_ENCODING);
              fileContent = import_stream.Readable.from(buffer);
              contentLength = buffer.length;
              mimeType = binaryData.mimeType;
            }
            const payload = {
              snippet: {
                title,
                categoryId,
                description: options.description,
                tags: options.tags?.split(","),
                defaultLanguage: options.defaultLanguage
              },
              status: {
                privacyStatus: options.privacyStatus,
                embeddable: options.embeddable,
                publicStatsViewable: options.publicStatsViewable,
                publishAt: options.publishAt,
                selfDeclaredMadeForKids: options.selfDeclaredMadeForKids,
                license: options.license
              },
              recordingDetails: {
                recordingDate: options.recordingDate
              }
            };
            const resumableUpload = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/upload/youtube/v3/videos",
              payload,
              {
                uploadType: "resumable",
                part: "snippet,status,recordingDetails",
                notifySubscribers: options.notifySubscribers ?? false
              },
              void 0,
              {
                headers: {
                  "X-Upload-Content-Length": contentLength,
                  "X-Upload-Content-Type": mimeType
                },
                json: true,
                resolveWithFullResponse: true
              }
            );
            const uploadUrl = resumableUpload.headers.location;
            let uploadId;
            let offset = 0;
            for await (const chunk of fileContent) {
              const nextOffset = offset + Number(chunk.length);
              try {
                const response = await this.helpers.httpRequest({
                  method: "PUT",
                  url: uploadUrl,
                  headers: {
                    "Content-Length": chunk.length,
                    "Content-Range": `bytes ${offset}-${nextOffset - 1}/${contentLength}`
                  },
                  body: chunk
                });
                uploadId = response.id;
              } catch (error) {
                if (error.response?.status !== 308) throw error;
              }
              offset = nextOffset;
            }
            responseData = { uploadId, ...resumableUpload.body };
          }
          if (operation === "update") {
            const id = this.getNodeParameter("videoId", i);
            const title = this.getNodeParameter("title", i);
            const categoryId = this.getNodeParameter("categoryId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            qs.part = "snippet, status, recordingDetails";
            const body = {
              id,
              snippet: {
                title,
                categoryId
              },
              status: {},
              recordingDetails: {}
            };
            if (updateFields.description) {
              body.snippet.description = updateFields.description;
            }
            if (updateFields.privacyStatus) {
              body.status.privacyStatus = updateFields.privacyStatus;
            }
            if (updateFields.tags) {
              body.snippet.tags = updateFields.tags.split(",");
            }
            if (updateFields.embeddable) {
              body.status.embeddable = updateFields.embeddable;
            }
            if (updateFields.publicStatsViewable) {
              body.status.publicStatsViewable = updateFields.publicStatsViewable;
            }
            if (updateFields.publishAt) {
              body.status.publishAt = updateFields.publishAt;
            }
            if (updateFields.selfDeclaredMadeForKids) {
              body.status.selfDeclaredMadeForKids = updateFields.selfDeclaredMadeForKids;
            }
            if (updateFields.recordingDate) {
              body.recordingDetails.recordingDate = updateFields.recordingDate;
            }
            if (updateFields.license) {
              body.status.license = updateFields.license;
            }
            if (updateFields.defaultLanguage) {
              body.snippet.defaultLanguage = updateFields.defaultLanguage;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "PUT", "/youtube/v3/videos", body, qs);
          }
          if (operation === "delete") {
            const videoId = this.getNodeParameter("videoId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              id: videoId
            };
            if (options.onBehalfOfContentOwner) {
              qs.onBehalfOfContentOwner = options.onBehalfOfContentOwner;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "DELETE", "/youtube/v3/videos", body);
            responseData = { success: true };
          }
          if (operation === "rate") {
            const videoId = this.getNodeParameter("videoId", i);
            const rating = this.getNodeParameter("rating", i);
            const body = {
              id: videoId,
              rating
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/youtube/v3/videos/rate",
              body
            );
            responseData = { success: true };
          }
        }
        if (resource === "videoCategory") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const regionCode = this.getNodeParameter("regionCode", i);
            qs.regionCode = regionCode;
            qs.part = "snippet";
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              "/youtube/v3/videoCategories",
              {},
              qs
            );
            responseData = responseData.items;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
        }
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
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YouTube
});
//# sourceMappingURL=YouTube.node.js.map