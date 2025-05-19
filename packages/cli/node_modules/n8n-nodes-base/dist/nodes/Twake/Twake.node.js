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
var Twake_node_exports = {};
__export(Twake_node_exports, {
  Twake: () => Twake
});
module.exports = __toCommonJS(Twake_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Twake {
  constructor() {
    this.description = {
      displayName: "Twake",
      name: "twake",
      group: ["transform"],
      version: 1,
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:twake.png",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Twake API",
      defaults: {
        name: "Twake"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "twakeCloudApi",
          required: true
          // displayOptions: {
          // 	show: {
          // 		twakeVersion: [
          // 			'cloud',
          // 		],
          // 	},
          // },
        }
        // {
        // 	name: 'twakeServerApi',
        // 	required: true,
        // 	displayOptions: {
        // 		show: {
        // 			twakeVersion: [
        // 				'server',
        // 			],
        // 		},
        // 	},
        // },
      ],
      properties: [
        // {
        // 	displayName: 'Twake Version',
        // 	name: 'twakeVersion',
        // 	type: 'options',
        // 	options: [
        // 		{
        // 			name: 'Cloud',
        // 			value: 'cloud',
        // 		},
        // 		{
        // 			name: 'Server (Self Hosted)',
        // 			value: 'server',
        // 		},
        // 	],
        // 	default: 'cloud',
        // },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Message",
              value: "message",
              description: "Send data to the message app"
            }
          ],
          default: "message"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["message"]
            }
          },
          options: [
            {
              name: "Send",
              value: "send",
              description: "Send a message",
              action: "Send a message"
            }
          ],
          default: "send"
        },
        {
          displayName: "Channel Name or ID",
          name: "channelId",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getChannels"
          },
          displayOptions: {
            show: {
              operation: ["send"]
            }
          },
          default: "",
          description: `Channel's ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.`
        },
        {
          displayName: "Content",
          name: "content",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"]
            }
          },
          default: "",
          description: "Message content"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          displayOptions: {
            show: {
              operation: ["send"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Sender Icon",
              name: "senderIcon",
              type: "string",
              default: "",
              description: "URL of the image/icon"
            },
            {
              displayName: "Sender Name",
              name: "senderName",
              type: "string",
              default: ""
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getChannels() {
          const responseData = await import_GenericFunctions.twakeApiRequest.call(this, "POST", "/channel", {});
          if (responseData === void 0) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
          }
          const returnData = [];
          for (const channel of responseData) {
            returnData.push({
              name: channel.name,
              value: channel.id
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
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "message") {
        if (operation === "send") {
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const message = {
            channel_id: this.getNodeParameter("channelId", i),
            content: {
              formatted: this.getNodeParameter("content", i)
            },
            hidden_data: {
              allow_delete: "everyone"
            }
          };
          if (additionalFields.senderName) {
            message.hidden_data.custom_title = additionalFields.senderName;
          }
          if (additionalFields.senderIcon) {
            message.hidden_data.custom_icon = additionalFields.senderIcon;
          }
          const body = {
            object: message
          };
          const endpoint = "/actions/message/save";
          responseData = await import_GenericFunctions.twakeApiRequest.call(this, "POST", endpoint, body);
          responseData = responseData.object;
        }
      }
    }
    if (Array.isArray(responseData)) {
      returnData.push.apply(returnData, responseData);
    } else if (responseData !== void 0) {
      returnData.push(responseData);
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Twake
});
//# sourceMappingURL=Twake.node.js.map