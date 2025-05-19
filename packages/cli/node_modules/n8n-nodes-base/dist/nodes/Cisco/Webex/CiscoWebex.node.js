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
var CiscoWebex_node_exports = {};
__export(CiscoWebex_node_exports, {
  CiscoWebex: () => CiscoWebex
});
module.exports = __toCommonJS(CiscoWebex_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class CiscoWebex {
  constructor() {
    this.description = {
      displayName: "Webex by Cisco",
      name: "ciscoWebex",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:ciscoWebex.png",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Cisco Webex API",
      defaults: {
        name: "Webex by Cisco"
      },
      usableAsTool: true,
      credentials: [
        {
          name: "ciscoWebexOAuth2Api",
          required: true
        }
      ],
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Meeting",
              value: "meeting"
            },
            // {
            // 	name: 'Meeeting Transcript',
            // 	value: 'meetingTranscript',
            // },
            {
              name: "Message",
              value: "message"
            }
          ],
          default: "message"
        },
        ...import_descriptions.meetingOperations,
        ...import_descriptions.meetingFields,
        // ...meetingTranscriptOperations,
        // ...meetingTranscriptFields,
        ...import_descriptions.messageOperations,
        ...import_descriptions.messageFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getRooms() {
          const returnData = [];
          const rooms = await import_GenericFunctions.webexApiRequestAllItems.call(this, "items", "GET", "/rooms");
          for (const room of rooms) {
            returnData.push({
              name: room.title,
              value: room.id
            });
          }
          return returnData;
        },
        async getSites() {
          const returnData = [];
          const sites = await import_GenericFunctions.webexApiRequestAllItems.call(
            this,
            "sites",
            "GET",
            "/meetingPreferences/sites"
          );
          for (const site of sites) {
            returnData.push({
              name: site.siteUrl,
              value: site.siteUrl
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
    const timezone = this.getTimezone();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "message") {
          if (operation === "create") {
            const destination = this.getNodeParameter("destination", i);
            const file = this.getNodeParameter(
              "additionalFields.fileUi.fileValue",
              i,
              {}
            );
            const markdown = this.getNodeParameter("additionalFields.markdown", i, "");
            const body = {};
            if (destination === "room") {
              body.roomId = this.getNodeParameter("roomId", i);
            }
            if (destination === "person") {
              const specifyPersonBy = this.getNodeParameter("specifyPersonBy", 0);
              if (specifyPersonBy === "id") {
                body.toPersonId = this.getNodeParameter("toPersonId", i);
              } else {
                body.toPersonEmail = this.getNodeParameter("toPersonEmail", i);
              }
            }
            if (markdown) {
              body.markdown = markdown;
            }
            body.text = this.getNodeParameter("text", i);
            body.attachments = (0, import_GenericFunctions.getAttachments)(
              this.getNodeParameter(
                "additionalFields.attachmentsUi.attachmentValues",
                i,
                []
              )
            );
            if (Object.keys(file).length) {
              const isBinaryData = file.fileLocation === "binaryData" ? true : false;
              if (isBinaryData) {
                const binaryPropertyName = file.binaryPropertyName;
                const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
                  i,
                  binaryPropertyName
                );
                const formData = {
                  files: {
                    value: binaryDataBuffer,
                    options: {
                      filename: binaryData.fileName,
                      contentType: binaryData.mimeType
                    }
                  }
                };
                Object.assign(body, formData);
              } else {
                const url = file.url;
                Object.assign(body, { files: url });
              }
            }
            if (file.fileLocation === "binaryData") {
              responseData = await import_GenericFunctions.webexApiRequest.call(
                this,
                "POST",
                "/messages",
                {},
                {},
                void 0,
                { formData: body }
              );
            } else {
              responseData = await import_GenericFunctions.webexApiRequest.call(this, "POST", "/messages", body);
            }
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          } else if (operation === "delete") {
            const messageId = this.getNodeParameter("messageId", i);
            const endpoint = `/messages/${messageId}`;
            responseData = await import_GenericFunctions.webexApiRequest.call(this, "DELETE", endpoint);
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ success: true }),
              { itemData: { item: i } }
            );
          } else if (operation === "get") {
            const messageId = this.getNodeParameter("messageId", i);
            const endpoint = `/messages/${messageId}`;
            responseData = await import_GenericFunctions.webexApiRequest.call(this, "GET", endpoint);
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          } else if (operation === "getAll") {
            const qs = {
              roomId: this.getNodeParameter("roomId", i)
            };
            const filters = this.getNodeParameter("filters", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, filters);
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.webexApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/messages",
                {},
                qs
              );
            } else {
              qs.max = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.webexApiRequest.call(this, "GET", "/messages", {}, qs);
              responseData = responseData.items;
            }
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData.items),
              { itemData: { item: i } }
            );
          } else if (operation === "update") {
            const messageId = this.getNodeParameter("messageId", i);
            const markdown = this.getNodeParameter("markdown", i);
            const endpoint = `/messages/${messageId}`;
            responseData = await import_GenericFunctions.webexApiRequest.call(this, "GET", endpoint);
            const body = {
              roomId: responseData.roomId
            };
            if (markdown) {
              body.markdown = this.getNodeParameter("markdownText", i);
            } else {
              body.text = this.getNodeParameter("text", i);
            }
            responseData = await import_GenericFunctions.webexApiRequest.call(this, "PUT", endpoint, body);
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          }
        }
        if (resource === "meeting") {
          if (operation === "create") {
            const title = this.getNodeParameter("title", i);
            const start = this.getNodeParameter("start", i);
            const end = this.getNodeParameter("end", i);
            const invitees = this.getNodeParameter(
              "additionalFields.inviteesUi.inviteeValues",
              i,
              []
            );
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              title,
              start: import_moment_timezone.default.tz(start, timezone).format(),
              end: import_moment_timezone.default.tz(end, timezone).format(),
              ...additionalFields
            };
            if (body.requireRegistrationInfo) {
              body.registration = body.requireRegistrationInfo.reduce(
                (obj, value) => Object.assign(obj, { [`${value}`]: true }),
                {}
              );
              delete body.requireRegistrationInfo;
            }
            if (invitees) {
              body.invitees = invitees;
              delete body.inviteesUi;
            }
            responseData = await import_GenericFunctions.webexApiRequest.call(this, "POST", "/meetings", body);
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          }
          if (operation === "delete") {
            const meetingId = this.getNodeParameter("meetingId", i);
            const options = this.getNodeParameter("options", i);
            const qs = {
              ...options
            };
            responseData = await import_GenericFunctions.webexApiRequest.call(
              this,
              "DELETE",
              `/meetings/${meetingId}`,
              {},
              qs
            );
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ success: true }),
              { itemData: { item: i } }
            );
          }
          if (operation === "get") {
            const meetingId = this.getNodeParameter("meetingId", i);
            const options = this.getNodeParameter("options", i);
            let headers = {};
            const qs = {
              ...options
            };
            if (options.passsword) {
              headers = {
                passsword: options.passsword
              };
            }
            responseData = await import_GenericFunctions.webexApiRequest.call(
              this,
              "GET",
              `/meetings/${meetingId}`,
              {},
              qs,
              void 0,
              { headers }
            );
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          }
          if (operation === "getAll") {
            const filters = this.getNodeParameter("filters", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const qs = {
              ...filters
            };
            if (qs.from) {
              qs.from = (0, import_moment_timezone.default)(qs.from).utc(true).format();
            }
            if (qs.to) {
              qs.to = (0, import_moment_timezone.default)(qs.to).utc(true).format();
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.webexApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/meetings",
                {},
                qs
              );
            } else {
              qs.max = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.webexApiRequest.call(this, "GET", "/meetings", {}, qs);
              responseData = responseData.items;
            }
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          }
          if (operation === "update") {
            const meetingId = this.getNodeParameter("meetingId", i);
            const invitees = this.getNodeParameter(
              "updateFields.inviteesUi.inviteeValues",
              i,
              []
            );
            const updateFields = this.getNodeParameter("updateFields", i);
            const { title, password, start, end } = await import_GenericFunctions.webexApiRequest.call(
              this,
              "GET",
              `/meetings/${meetingId}`
            );
            const body = {
              ...updateFields
            };
            if (body.requireRegistrationInfo) {
              body.registration = body.requireRegistrationInfo.reduce(
                (obj, value) => Object.assign(obj, { [`${value}`]: true }),
                {}
              );
              delete body.requireRegistrationInfo;
            }
            if (invitees.length) {
              body.invitees = invitees;
            }
            if (body.start) {
              body.start = import_moment_timezone.default.tz(updateFields.start, timezone).format();
            } else {
              body.start = start;
            }
            if (body.end) {
              body.end = import_moment_timezone.default.tz(updateFields.end, timezone).format();
            } else {
              body.end = end;
            }
            if (!body.title) {
              body.title = title;
            }
            if (!body.password) {
              body.password = password;
            }
            responseData = await import_GenericFunctions.webexApiRequest.call(this, "PUT", `/meetings/${meetingId}`, body);
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
          }
        }
        returnData.push(...responseData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.toString(), json: {}, itemIndex: i });
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
  CiscoWebex
});
//# sourceMappingURL=CiscoWebex.node.js.map