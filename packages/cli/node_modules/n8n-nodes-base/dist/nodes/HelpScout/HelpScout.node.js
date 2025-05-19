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
var HelpScout_node_exports = {};
__export(HelpScout_node_exports, {
  HelpScout: () => HelpScout
});
module.exports = __toCommonJS(HelpScout_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ISOCountryCodes = require("../../utils/ISOCountryCodes");
var import_ConversationDescription = require("./ConversationDescription");
var import_CustomerDescription = require("./CustomerDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_MailboxDescription = require("./MailboxDescription");
var import_ThreadDescription = require("./ThreadDescription");
class HelpScout {
  constructor() {
    this.description = {
      displayName: "Help Scout",
      name: "helpScout",
      icon: "file:helpScout.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Help Scout API",
      defaults: {
        name: "Help Scout"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "helpScoutOAuth2Api",
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
              name: "Conversation",
              value: "conversation"
            },
            {
              name: "Customer",
              value: "customer"
            },
            {
              name: "Mailbox",
              value: "mailbox"
            },
            {
              name: "Thread",
              value: "thread"
            }
          ],
          default: "conversation"
        },
        ...import_ConversationDescription.conversationOperations,
        ...import_ConversationDescription.conversationFields,
        ...import_CustomerDescription.customerOperations,
        ...import_CustomerDescription.customerFields,
        ...import_MailboxDescription.mailboxOperations,
        ...import_MailboxDescription.mailboxFields,
        ...import_ThreadDescription.threadOperations,
        ...import_ThreadDescription.threadFields
      ]
    };
    this.methods = {
      loadOptions: {
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
        // Get all the tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
            this,
            "_embedded.tags",
            "GET",
            "/v2/tags"
          );
          for (const tag of tags) {
            const tagName = tag.name;
            returnData.push({
              name: tagName,
              value: tagName
            });
          }
          return returnData;
        },
        // Get all the mailboxes to display them to user so that they can
        // select them easily
        async getMailboxes() {
          const returnData = [];
          const mailboxes = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
            this,
            "_embedded.mailboxes",
            "GET",
            "/v2/mailboxes"
          );
          for (const mailbox of mailboxes) {
            const mailboxName = mailbox.name;
            const mailboxId = mailbox.id;
            returnData.push({
              name: mailboxName,
              value: mailboxId
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
        if (resource === "conversation") {
          if (operation === "create") {
            const mailboxId = this.getNodeParameter("mailboxId", i);
            const status = this.getNodeParameter("status", i);
            const subject = this.getNodeParameter("subject", i);
            const type = this.getNodeParameter("type", i);
            const resolveData = this.getNodeParameter("resolveData", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const threads = this.getNodeParameter("threadsUi", i).threadsValues;
            const body = {
              mailboxId,
              status,
              subject,
              type
            };
            Object.assign(body, additionalFields);
            if (additionalFields.customerId) {
              body.customer = {
                id: additionalFields.customerId
              };
              delete body.customerId;
            }
            if (additionalFields.customerEmail) {
              body.customer = {
                email: additionalFields.customerEmail
              };
              delete body.customerEmail;
            }
            if (body.customer === void 0) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Either customer email or customer ID must be set",
                { itemIndex: i }
              );
            }
            if (threads) {
              for (let index = 0; index < threads.length; index++) {
                if (threads[index].type === "" || threads[index].text === "") {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Chat Threads cannot be empty");
                }
                if (threads[index].type !== "note") {
                  threads[index].customer = body.customer;
                }
              }
              body.threads = threads;
            }
            responseData = await import_GenericFunctions.helpscoutApiRequest.call(
              this,
              "POST",
              "/v2/conversations",
              body,
              qs,
              void 0,
              { resolveWithFullResponse: true }
            );
            const id = responseData.headers["resource-id"];
            const uri = responseData.headers.location;
            if (resolveData) {
              responseData = await import_GenericFunctions.helpscoutApiRequest.call(this, "GET", "", {}, {}, uri);
            } else {
              responseData = {
                id,
                uri
              };
            }
          }
          if (operation === "delete") {
            const conversationId = this.getNodeParameter("conversationId", i);
            responseData = await import_GenericFunctions.helpscoutApiRequest.call(
              this,
              "DELETE",
              `/v2/conversations/${conversationId}`
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const conversationId = this.getNodeParameter("conversationId", i);
            responseData = await import_GenericFunctions.helpscoutApiRequest.call(
              this,
              "GET",
              `/v2/conversations/${conversationId}`
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.tags) {
              qs.tag = options.tags.toString();
            }
            Object.assign(qs, options);
            delete qs.tags;
            if (returnAll) {
              responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
                this,
                "_embedded.conversations",
                "GET",
                "/v2/conversations",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
                this,
                "_embedded.conversations",
                "GET",
                "/v2/conversations",
                {},
                qs
              );
              responseData = responseData.splice(0, qs.limit);
            }
          }
        }
        if (resource === "customer") {
          if (operation === "create") {
            const resolveData = this.getNodeParameter("resolveData", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const chats = this.getNodeParameter("chatsUi", i).chatsValues;
            const address = this.getNodeParameter("addressUi", i).addressValue;
            const emails = this.getNodeParameter("emailsUi", i).emailsValues;
            const phones = this.getNodeParameter("phonesUi", i).phonesValues;
            const socialProfiles = this.getNodeParameter("socialProfilesUi", i).socialProfilesValues;
            const websites = this.getNodeParameter("websitesUi", i).websitesValues;
            let body = {};
            body = Object.assign({}, additionalFields);
            if (body.age) {
              body.age = body.age.toString();
            }
            if (chats) {
              body.chats = chats;
            }
            if (address) {
              body.address = address;
              body.address.lines = [address.line1, address.line2];
            }
            if (emails) {
              body.emails = emails;
            }
            if (phones) {
              body.phones = phones;
            }
            if (socialProfiles) {
              body.socialProfiles = socialProfiles;
            }
            if (websites) {
              body.websites = websites;
            }
            if (Object.keys(body).length === 0) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "You have to set at least one field", {
                itemIndex: i
              });
            }
            responseData = await import_GenericFunctions.helpscoutApiRequest.call(
              this,
              "POST",
              "/v2/customers",
              body,
              qs,
              void 0,
              { resolveWithFullResponse: true }
            );
            const id = responseData.headers["resource-id"];
            const uri = responseData.headers.location;
            if (resolveData) {
              responseData = await import_GenericFunctions.helpscoutApiRequest.call(this, "GET", "", {}, {}, uri);
            } else {
              responseData = {
                id,
                uri
              };
            }
          }
          if (operation === "properties") {
            responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
              this,
              "_embedded.customer-properties",
              "GET",
              "/v2/customer-properties",
              {},
              qs
            );
          }
          if (operation === "get") {
            const customerId = this.getNodeParameter("customerId", i);
            responseData = await import_GenericFunctions.helpscoutApiRequest.call(
              this,
              "GET",
              `/v2/customers/${customerId}`
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            if (returnAll) {
              responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
                this,
                "_embedded.customers",
                "GET",
                "/v2/customers",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
                this,
                "_embedded.customers",
                "GET",
                "/v2/customers",
                {},
                qs
              );
              responseData = responseData.splice(0, qs.limit);
            }
          }
          if (operation === "update") {
            const customerId = this.getNodeParameter("customerId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            let body = {};
            body = Object.assign({}, updateFields);
            if (body.age) {
              body.age = body.age.toString();
            }
            if (Object.keys(body).length === 0) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "You have to set at least one field", {
                itemIndex: i
              });
            }
            responseData = await import_GenericFunctions.helpscoutApiRequest.call(
              this,
              "PUT",
              `/v2/customers/${customerId}`,
              body,
              qs,
              void 0,
              { resolveWithFullResponse: true }
            );
            responseData = { success: true };
          }
        }
        if (resource === "mailbox") {
          if (operation === "get") {
            const mailboxId = this.getNodeParameter("mailboxId", i);
            responseData = await import_GenericFunctions.helpscoutApiRequest.call(
              this,
              "GET",
              `/v2/mailboxes/${mailboxId}`,
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
                this,
                "_embedded.mailboxes",
                "GET",
                "/v2/mailboxes",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
                this,
                "_embedded.mailboxes",
                "GET",
                "/v2/mailboxes",
                {},
                qs
              );
              responseData = responseData.splice(0, qs.limit);
            }
          }
        }
        if (resource === "thread") {
          if (operation === "create") {
            const conversationId = this.getNodeParameter("conversationId", i);
            const text = this.getNodeParameter("text", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const attachments = this.getNodeParameter("attachmentsUi", i);
            let threadType = this.getNodeParameter("type", i);
            const singular = ["reply", "customer"];
            if (!singular.includes(threadType)) {
              threadType = `${threadType}s`;
            }
            const body = {
              text,
              attachments: []
            };
            Object.assign(body, additionalFields);
            if (additionalFields.customerId) {
              body.customer = {
                id: additionalFields.customerId
              };
              delete body.customerId;
            }
            if (additionalFields.customerEmail) {
              body.customer = {
                email: additionalFields.customerEmail
              };
              delete body.customerEmail;
            }
            if (body.customer === void 0) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Either customer email or customer ID must be set",
                { itemIndex: i }
              );
            }
            if (attachments) {
              if (attachments.attachmentsValues && attachments.attachmentsValues.length !== 0) {
                body.attachments?.push.apply(
                  body.attachments,
                  attachments.attachmentsValues
                );
              }
              if (attachments.attachmentsBinary && attachments.attachmentsBinary.length !== 0 && items[i].binary) {
                const mapFunction = (value) => {
                  const binaryProperty = items[i].binary[value.property];
                  if (binaryProperty) {
                    return {
                      fileName: binaryProperty.fileName || "unknown",
                      data: binaryProperty.data,
                      mimeType: binaryProperty.mimeType
                    };
                  } else {
                    throw new import_n8n_workflow.NodeOperationError(
                      this.getNode(),
                      `Binary property ${value.property} does not exist on input`,
                      { itemIndex: i }
                    );
                  }
                };
                body.attachments?.push.apply(
                  body.attachments,
                  attachments.attachmentsBinary.map(mapFunction)
                );
              }
            }
            responseData = await import_GenericFunctions.helpscoutApiRequest.call(
              this,
              "POST",
              `/v2/conversations/${conversationId}/${threadType}`,
              body
            );
            responseData = { success: true };
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const conversationId = this.getNodeParameter("conversationId", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
                this,
                "_embedded.threads",
                "GET",
                `/v2/conversations/${conversationId}/threads`
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.helpscoutApiRequestAllItems.call(
                this,
                "_embedded.threads",
                "GET",
                `/v2/conversations/${conversationId}/threads`,
                {},
                qs
              );
              responseData = responseData.splice(0, qs.limit);
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
  HelpScout
});
//# sourceMappingURL=HelpScout.node.js.map