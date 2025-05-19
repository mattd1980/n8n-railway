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
var CiscoWebexTrigger_node_exports = {};
__export(CiscoWebexTrigger_node_exports, {
  CiscoWebexTrigger: () => CiscoWebexTrigger
});
module.exports = __toCommonJS(CiscoWebexTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class CiscoWebexTrigger {
  constructor() {
    this.description = {
      displayName: "Webex by Cisco Trigger",
      name: "ciscoWebexTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:ciscoWebex.png",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["resource"] + ":" + $parameter["event"]}}',
      description: "Starts the workflow when Cisco Webex events occur.",
      defaults: {
        name: "Webex by Cisco Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "ciscoWebexOAuth2Api",
          required: true
        }
      ],
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
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
              name: "[All]",
              value: "all"
            },
            {
              name: "Attachment Action",
              value: "attachmentAction"
            },
            {
              name: "Meeting",
              value: "meeting"
            },
            {
              name: "Membership",
              value: "membership"
            },
            {
              name: "Message",
              value: "message"
            },
            // {
            // 	name: 'Telephony Call',
            // 	value: 'telephonyCall',
            // },
            {
              name: "Recording",
              value: "recording"
            },
            {
              name: "Room",
              value: "room"
            }
          ],
          default: "meeting",
          required: true
        },
        ...(0, import_GenericFunctions.getEvents)(),
        {
          displayName: "Resolve Data",
          name: "resolveData",
          type: "boolean",
          displayOptions: {
            show: {
              resource: ["attachmentAction"]
            }
          },
          default: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: "By default the response only contain a reference to the data the user inputed. If this option gets activated, it will resolve the data automatically."
        },
        {
          displayName: "Filters",
          name: "filters",
          type: "collection",
          placeholder: "Add Filter",
          default: {},
          options: [
            {
              displayName: "Has Files",
              name: "hasFiles",
              type: "boolean",
              displayOptions: {
                show: {
                  "/resource": ["message"],
                  "/event": ["created", "deleted"]
                }
              },
              default: false,
              description: "Whether to limit to messages which contain file content attachments"
            },
            {
              displayName: "Is Locked",
              name: "isLocked",
              type: "boolean",
              displayOptions: {
                show: {
                  "/resource": ["room"],
                  "/event": ["created", "updated"]
                }
              },
              default: false,
              description: "Whether to limit to rooms that are locked"
            },
            {
              displayName: "Is Moderator",
              name: "isModerator",
              type: "boolean",
              displayOptions: {
                show: {
                  "/resource": ["membership"],
                  "/event": ["created", "updated", "deleted"]
                }
              },
              default: false,
              description: "Whether to limit to moderators of a room"
            },
            {
              displayName: "Mentioned People",
              name: "mentionedPeople",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["message"],
                  "/event": ["created", "deleted"]
                }
              },
              default: "",
              description: "Limit to messages which contain these mentioned people, by person ID; accepts me as a shorthand for your own person ID; separate multiple values with commas"
            },
            {
              displayName: "Message ID",
              name: "messageId",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["attachmentAction"],
                  "/event": ["created"]
                }
              },
              default: "",
              description: "Limit to a particular message, by ID"
            },
            {
              displayName: "Owned By",
              name: "ownedBy",
              displayOptions: {
                show: {
                  "/resource": ["meeting"]
                }
              },
              type: "string",
              default: ""
            },
            {
              displayName: "Person Email",
              name: "personEmail",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["membership"],
                  "/event": ["created", "updated", "deleted"]
                }
              },
              default: "",
              description: "Limit to a particular person, by email"
            },
            {
              displayName: "Person Email",
              name: "personEmail",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["message"],
                  "/event": ["created", "deleted"]
                }
              },
              default: "",
              description: "Limit to a particular person, by email"
            },
            {
              displayName: "Person ID",
              name: "personId",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["attachmentAction"],
                  "/event": ["created"]
                }
              },
              default: "",
              description: "Limit to a particular person, by ID"
            },
            {
              displayName: "Person ID",
              name: "personId",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["membership"],
                  "/event": ["created", "updated", "deleted"]
                }
              },
              default: "",
              description: "Limit to a particular person, by ID"
            },
            {
              displayName: "Person ID",
              name: "personId",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["message"],
                  "/event": ["created", "deleted"]
                }
              },
              default: "",
              description: "Limit to a particular person, by ID"
            },
            {
              displayName: "Room ID",
              name: "roomId",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["attachmentAction"],
                  "/event": ["created"]
                }
              },
              default: "",
              description: "Limit to a particular room, by ID"
            },
            {
              displayName: "Room ID",
              name: "roomId",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["membership"],
                  "/event": ["created", "updated", "deleted"]
                }
              },
              default: "",
              description: "Limit to a particular room, by ID"
            },
            {
              displayName: "Room ID",
              name: "roomId",
              type: "string",
              displayOptions: {
                show: {
                  "/resource": ["message"],
                  "/event": ["created", "updated"]
                }
              },
              default: "",
              description: "Limit to a particular room, by ID"
            },
            {
              displayName: "Room Type",
              name: "roomType",
              type: "options",
              options: [
                {
                  name: "Direct",
                  value: "direct"
                },
                {
                  name: "Group",
                  value: "group"
                }
              ],
              displayOptions: {
                show: {
                  "/resource": ["message"],
                  "/event": ["created", "deleted"]
                }
              },
              default: "",
              description: "Limit to a particular room type"
            },
            {
              displayName: "Type",
              name: "type",
              type: "options",
              options: [
                {
                  name: "Direct",
                  value: "direct"
                },
                {
                  name: "Group",
                  value: "group"
                }
              ],
              displayOptions: {
                show: {
                  "/resource": ["room"],
                  "/event": ["created", "updated"]
                }
              },
              default: "",
              description: "Limit to a particular room type"
            }
            // {
            // 	displayName: 'Call Type',
            // 	name: 'callType',
            // 	type: 'options',
            // 	options: [
            // 		{
            // 			name: 'Emergency',
            // 			value: 'emergency',
            // 		},
            // 		{
            // 			name: 'External',
            // 			value: 'external',
            // 		},
            // 		{
            // 			name: 'Location',
            // 			value: 'location',
            // 		},
            // 		{
            // 			name: 'Disconnected',
            // 			value: 'disconnected',
            // 		},
            // 		{
            // 			name: 'Organization',
            // 			value: 'organization',
            // 		},
            // 		{
            // 			name: 'Other',
            // 			value: 'other',
            // 		},
            // 		{
            // 			name: 'Repair',
            // 			value: 'repair',
            // 		},
            // 	],
            // 	displayOptions: {
            // 		show: {
            // 			'/resource': [
            // 				'telephonyCall',
            // 			],
            // 			'/event': [
            // 				'created',
            // 				'deleted',
            // 				'updated',
            // 			],
            // 		},
            // 	},
            // 	default: '',
            // 	description: `Limit to a particular call type`,
            // },
            // {
            // 	displayName: 'Person ID',
            // 	name: 'personId',
            // 	type: 'string',
            // 	displayOptions: {
            // 		show: {
            // 			'/resource': [
            // 				'telephonyCall',
            // 			],
            // 			'/event': [
            // 				'created',
            // 				'deleted',
            // 				'updated',
            // 			],
            // 		},
            // 	},
            // 	default: '',
            // 	description: 'Limit to a particular person, by ID',
            // },
            // {
            // 	displayName: 'Personality',
            // 	name: 'personality',
            // 	type: 'options',
            // 	options: [
            // 		{
            // 			name: 'Click To Dial',
            // 			value: 'clickToDial',
            // 		},
            // 		{
            // 			name: 'Originator',
            // 			value: 'originator',
            // 		},
            // 		{
            // 			name: 'Terminator',
            // 			value: 'terminator',
            // 		},
            // 	],
            // 	displayOptions: {
            // 		show: {
            // 			'/resource': [
            // 				'telephonyCall',
            // 			],
            // 			'/event': [
            // 				'created',
            // 				'deleted',
            // 				'updated',
            // 			],
            // 		},
            // 	},
            // 	default: '',
            // 	description: `Limit to a particular call personality`,
            // },
            // {
            // 	displayName: 'State',
            // 	name: 'state',
            // 	type: 'options',
            // 	options: [
            // 		{
            // 			name: 'Alerting',
            // 			value: 'alerting',
            // 		},
            // 		{
            // 			name: 'Connected',
            // 			value: 'connected',
            // 		},
            // 		{
            // 			name: 'Connecting',
            // 			value: 'connecting',
            // 		},
            // 		{
            // 			name: 'Disconnected',
            // 			value: 'disconnected',
            // 		},
            // 		{
            // 			name: 'Held',
            // 			value: 'held',
            // 		},
            // 		{
            // 			name: 'Remote Held',
            // 			value: 'remoteHeld',
            // 		},
            // 	],
            // 	displayOptions: {
            // 		show: {
            // 			'/resource': [
            // 				'telephonyCall',
            // 			],
            // 			'/event': [
            // 				'created',
            // 				'deleted',
            // 				'updated',
            // 			],
            // 		},
            // 	},
            // 	default: '',
            // 	description: `Limit to a particular call state`,
            // },
          ]
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const resource = this.getNodeParameter("resource");
          const event = this.getNodeParameter("event");
          const data = await import_GenericFunctions.webexApiRequestAllItems.call(this, "items", "GET", "/webhooks");
          for (const webhook of data) {
            if (webhook.url === webhookUrl && webhook.resource === (0, import_GenericFunctions.mapResource)(resource) && webhook.event === event && webhook.status === "active") {
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const event = this.getNodeParameter("event");
          const resource = this.getNodeParameter("resource");
          const filters = this.getNodeParameter("filters", {});
          const credentials = await this.getCredentials("ciscoWebexOAuth2Api");
          const secret = (0, import_GenericFunctions.getAutomaticSecret)(credentials);
          const filter = [];
          for (const key of Object.keys(filters)) {
            if (key !== "ownedBy") {
              filter.push(`${key}=${filters[key]}`);
            }
          }
          const endpoint = "/webhooks";
          const body = {
            name: `n8n-webhook:${webhookUrl}`,
            targetUrl: webhookUrl,
            event,
            resource: (0, import_GenericFunctions.mapResource)(resource)
          };
          if (filters.ownedBy) {
            body.ownedBy = filters.ownedBy;
          }
          body.secret = secret;
          if (filter.length) {
            body.filter = filter.join("&");
          }
          const responseData = await import_GenericFunctions.webexApiRequest.call(this, "POST", endpoint, body);
          if (responseData.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          webhookData.secret = secret;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/webhooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.webexApiRequest.call(this, "DELETE", endpoint);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    let bodyData = this.getBodyData();
    const webhookData = this.getWorkflowStaticData("node");
    const headers = this.getHeaderData();
    const req = this.getRequestObject();
    const resolveData = this.getNodeParameter("resolveData", false);
    const computedSignature = (0, import_crypto.createHmac)("sha1", webhookData.secret).update(req.rawBody).digest("hex");
    if (headers["x-spark-signature"] !== computedSignature) {
      return {};
    }
    if (resolveData) {
      const {
        data: { id }
      } = bodyData;
      bodyData = await import_GenericFunctions.webexApiRequest.call(this, "GET", `/attachment/actions/${id}`);
    }
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CiscoWebexTrigger
});
//# sourceMappingURL=CiscoWebexTrigger.node.js.map