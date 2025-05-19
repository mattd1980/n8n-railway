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
var GmailTrigger_node_exports = {};
__export(GmailTrigger_node_exports, {
  GmailTrigger: () => GmailTrigger
});
module.exports = __toCommonJS(GmailTrigger_node_exports);
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class GmailTrigger {
  constructor() {
    this.description = {
      displayName: "Gmail Trigger",
      name: "gmailTrigger",
      icon: "file:gmail.svg",
      group: ["trigger"],
      version: [1, 1.1, 1.2],
      description: "Fetches emails from Gmail and starts the workflow on specified polling intervals.",
      subtitle: '={{"Gmail Trigger"}}',
      defaults: {
        name: "Gmail Trigger"
      },
      credentials: [
        {
          name: "googleApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["serviceAccount"]
            }
          }
        },
        {
          name: "gmailOAuth2",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "OAuth2 (recommended)",
              value: "oAuth2"
            },
            {
              name: "Service Account",
              value: "serviceAccount"
            }
          ],
          default: "oAuth2"
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          default: "messageReceived",
          options: [
            {
              name: "Message Received",
              value: "messageReceived"
            }
          ]
        },
        {
          displayName: "Simplify",
          name: "simple",
          type: "boolean",
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data"
        },
        {
          displayName: "Filters",
          name: "filters",
          type: "collection",
          placeholder: "Add Filter",
          default: {},
          options: [
            {
              displayName: "Include Spam and Trash",
              name: "includeSpamTrash",
              type: "boolean",
              default: false,
              description: "Whether to include messages from SPAM and TRASH in the results"
            },
            {
              displayName: "Include Drafts",
              name: "includeDrafts",
              type: "boolean",
              default: false,
              description: "Whether to include email drafts in the results"
            },
            {
              displayName: "Label Names or IDs",
              name: "labelIds",
              type: "multiOptions",
              typeOptions: {
                loadOptionsMethod: "getLabels"
              },
              default: [],
              description: 'Only return messages with labels that match all of the specified label IDs. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            },
            {
              displayName: "Search",
              name: "q",
              type: "string",
              default: "",
              placeholder: "has:attachment",
              hint: 'Use the same format as in the Gmail search box. <a href="https://support.google.com/mail/answer/7190?hl=en">More info</a>.',
              description: "Only return messages matching the specified query"
            },
            {
              displayName: "Read Status",
              name: "readStatus",
              type: "options",
              default: "unread",
              hint: "Filter emails by whether they have been read or not",
              options: [
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Unread and read emails",
                  value: "both"
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Unread emails only",
                  value: "unread"
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Read emails only",
                  value: "read"
                }
              ]
            },
            {
              displayName: "Sender",
              name: "sender",
              type: "string",
              default: "",
              description: "Sender name or email to filter by",
              hint: "Enter an email or part of a sender name"
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            hide: {
              simple: [true]
            }
          },
          options: [
            {
              displayName: "Attachment Prefix",
              name: "dataPropertyAttachmentsPrefixName",
              type: "string",
              default: "attachment_",
              description: "Prefix for name of the binary property to which to write the attachment. An index starting with 0 will be added. So if name is 'attachment_' the first attachment is saved to 'attachment_0'."
            },
            {
              displayName: "Download Attachments",
              name: "downloadAttachments",
              type: "boolean",
              default: false,
              description: "Whether the email's attachments will be downloaded"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the labels to display them to user so that they can
        // select them easily
        async getLabels() {
          const returnData = [];
          const labels = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "labels",
            "GET",
            "/gmail/v1/users/me/labels"
          );
          for (const label of labels) {
            returnData.push({
              name: label.name,
              value: label.id
            });
          }
          return returnData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
      }
    };
  }
  async poll() {
    const workflowStaticData = this.getWorkflowStaticData("node");
    const node = this.getNode();
    let nodeStaticData = workflowStaticData ?? {};
    if (node.typeVersion > 1) {
      const nodeName = node.name;
      const dictionary = workflowStaticData;
      if (!(nodeName in workflowStaticData)) {
        dictionary[nodeName] = {};
      }
      nodeStaticData = dictionary[nodeName];
    }
    const now = Math.floor(import_luxon.DateTime.now().toSeconds()).toString();
    const startDate = nodeStaticData.lastTimeChecked ?? +now;
    const endDate = +now;
    const options = this.getNodeParameter("options", {});
    const filters = this.getNodeParameter("filters", {});
    let responseData = [];
    try {
      const qs = {};
      const allFilters = { ...filters, receivedAfter: startDate };
      if (this.getMode() === "manual") {
        qs.maxResults = 1;
        delete allFilters.receivedAfter;
      }
      Object.assign(qs, import_GenericFunctions.prepareQuery.call(this, allFilters, 0), options);
      const messagesResponse = await import_GenericFunctions.googleApiRequest.call(
        this,
        "GET",
        "/gmail/v1/users/me/messages",
        {},
        qs
      );
      const messages = messagesResponse.messages ?? [];
      if (!messages.length) {
        nodeStaticData.lastTimeChecked = endDate;
        return null;
      }
      const simple = this.getNodeParameter("simple");
      if (simple) {
        qs.format = "metadata";
        qs.metadataHeaders = ["From", "To", "Cc", "Bcc", "Subject"];
      } else {
        qs.format = "raw";
      }
      let includeDrafts = false;
      if (node.typeVersion > 1.1) {
        includeDrafts = filters.includeDrafts ?? false;
      } else {
        includeDrafts = filters.includeDrafts ?? true;
      }
      delete qs.includeDrafts;
      for (const message of messages) {
        const fullMessage = await import_GenericFunctions.googleApiRequest.call(
          this,
          "GET",
          `/gmail/v1/users/me/messages/${message.id}`,
          {},
          qs
        );
        if (!includeDrafts) {
          if (fullMessage.labelIds?.includes("DRAFT")) {
            continue;
          }
        }
        if (!simple) {
          const dataPropertyNameDownload = options.dataPropertyAttachmentsPrefixName || "attachment_";
          const parsed = await import_GenericFunctions.parseRawEmail.call(this, fullMessage, dataPropertyNameDownload);
          responseData.push(parsed);
        } else {
          responseData.push({ json: fullMessage });
        }
      }
      if (simple) {
        responseData = this.helpers.returnJsonArray(
          await import_GenericFunctions.simplifyOutput.call(
            this,
            responseData.map((item) => item.json)
          )
        );
      }
    } catch (error) {
      if (this.getMode() === "manual" || !nodeStaticData.lastTimeChecked) {
        throw error;
      }
      const workflow = this.getWorkflow();
      this.logger.error(
        `There was a problem in '${node.name}' node in workflow '${workflow.id}': '${error.description}'`,
        {
          node: node.name,
          workflowId: workflow.id,
          error
        }
      );
    }
    if (!responseData.length) {
      nodeStaticData.lastTimeChecked = endDate;
      return null;
    }
    const emailsWithInvalidDate = /* @__PURE__ */ new Set();
    const getEmailDateAsSeconds = (email) => {
      let date;
      if (email.internalDate) {
        date = +email.internalDate / 1e3;
      } else if (email.date) {
        date = +import_luxon.DateTime.fromJSDate(new Date(email.date)).toSeconds();
      } else if (email.headers?.date) {
        date = +import_luxon.DateTime.fromJSDate(new Date(email.headers.date)).toSeconds();
      }
      if (!date || isNaN(date)) {
        emailsWithInvalidDate.add(email.id);
        return +startDate;
      }
      return date;
    };
    const lastEmailDate = responseData.reduce((lastDate, { json }) => {
      const emailDate = getEmailDateAsSeconds(json);
      return emailDate > lastDate ? emailDate : lastDate;
    }, 0);
    const nextPollPossibleDuplicates = responseData.filter((item) => item.json).reduce((duplicates, { json }) => {
      const emailDate = getEmailDateAsSeconds(json);
      return emailDate <= lastEmailDate ? duplicates.concat(json.id) : duplicates;
    }, Array.from(emailsWithInvalidDate));
    const possibleDuplicates = new Set(nodeStaticData.possibleDuplicates ?? []);
    if (possibleDuplicates.size > 0) {
      responseData = responseData.filter(({ json }) => {
        if (!json || typeof json.id !== "string") return false;
        return !possibleDuplicates.has(json.id);
      });
    }
    nodeStaticData.possibleDuplicates = nextPollPossibleDuplicates;
    nodeStaticData.lastTimeChecked = lastEmailDate || endDate;
    if (Array.isArray(responseData) && responseData.length) {
      return [responseData];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GmailTrigger
});
//# sourceMappingURL=GmailTrigger.node.js.map