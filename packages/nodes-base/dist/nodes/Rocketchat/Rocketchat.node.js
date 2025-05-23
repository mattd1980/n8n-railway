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
var Rocketchat_node_exports = {};
__export(Rocketchat_node_exports, {
  Rocketchat: () => Rocketchat
});
module.exports = __toCommonJS(Rocketchat_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Rocketchat {
  constructor() {
    this.description = {
      displayName: "RocketChat",
      name: "rocketchat",
      icon: "file:rocketchat.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
      description: "Consume RocketChat API",
      defaults: {
        name: "RocketChat"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "rocketchatApi",
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
              name: "Chat",
              value: "chat"
            }
          ],
          default: "chat"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["chat"]
            }
          },
          options: [
            {
              name: "Post Message",
              value: "postMessage",
              description: "Post a message to a channel or a direct message",
              action: "Post a message"
            }
          ],
          default: "postMessage"
        },
        {
          displayName: "Channel",
          name: "channel",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              resource: ["chat"],
              operation: ["postMessage"]
            }
          },
          default: "",
          description: "The channel name with the prefix in front of it"
        },
        {
          displayName: "Text",
          name: "text",
          type: "string",
          displayOptions: {
            show: {
              resource: ["chat"],
              operation: ["postMessage"]
            }
          },
          default: "",
          description: "The text of the message to send, is optional because of attachments"
        },
        {
          displayName: "JSON Parameters",
          name: "jsonParameters",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              resource: ["chat"],
              operation: ["postMessage"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["chat"],
              operation: ["postMessage"]
            }
          },
          options: [
            {
              displayName: "Alias",
              name: "alias",
              type: "string",
              default: "",
              description: "This will cause the message\u2019s name to appear as the given alias, but your username will still display"
            },
            {
              displayName: "Avatar",
              name: "avatar",
              type: "string",
              default: "",
              description: "If provided, this will make the avatar use the provided image URL"
            },
            {
              displayName: "Emoji",
              name: "emoji",
              type: "string",
              default: "",
              description: "This will cause the message\u2019s name to appear as the given alias, but your username will still display"
            }
          ]
        },
        {
          displayName: "Attachments",
          name: "attachments",
          type: "collection",
          default: {},
          placeholder: "Add Attachment Item",
          typeOptions: {
            multipleValues: true,
            multipleValueButtonText: "Add Attachment"
          },
          displayOptions: {
            show: {
              resource: ["chat"],
              operation: ["postMessage"],
              jsonParameters: [false]
            }
          },
          options: [
            {
              displayName: "Color",
              name: "color",
              type: "color",
              default: "#ff0000",
              description: "The color you want the order on the left side to be, any value background-css supports"
            },
            {
              displayName: "Text",
              name: "text",
              type: "string",
              default: "",
              description: "The text to display for this attachment, it is different than the message\u2019s text"
            },
            {
              displayName: "Timestamp",
              name: "ts",
              type: "dateTime",
              default: "",
              description: "Displays the time next to the text portion"
            },
            {
              displayName: "Thumb URL",
              name: "thumbUrl",
              type: "string",
              default: "",
              description: "An image that displays to the left of the text, looks better when this is relatively small"
            },
            {
              displayName: "Message Link",
              name: "messageLink",
              type: "string",
              default: "",
              description: "Only applicable if the timestamp is provided, as it makes the time clickable to this link"
            },
            {
              displayName: "Collapsed",
              name: "collapsed",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "Causes the image, audio, and video sections to be hiding when collapsed is true"
            },
            {
              displayName: "Author Name",
              name: "authorName",
              type: "string",
              default: "",
              description: "Name of the author"
            },
            {
              displayName: "Author Link",
              name: "authorLink",
              type: "string",
              default: "",
              description: "Providing this makes the author name clickable and points to this link"
            },
            {
              displayName: "Author Icon",
              name: "authorIcon",
              type: "string",
              default: "",
              placeholder: "https://site.com/img.png",
              description: "Displays a tiny icon to the left of the Author\u2019s name"
            },
            {
              displayName: "Title",
              name: "title",
              type: "string",
              default: "",
              description: "Title to display for this attachment, displays under the author"
            },
            {
              displayName: "Title Link",
              name: "titleLink",
              type: "string",
              default: "",
              description: "Providing this makes the title clickable, pointing to this link"
            },
            {
              displayName: "Title Link Download",
              name: "titleLinkDownload",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "When this is true, a download icon appears and clicking this saves the link to file"
            },
            {
              displayName: "Image URL",
              name: "imageUrl",
              type: "string",
              default: "",
              description: "The image to display, will be \u201Cbig\u201D and easy to see"
            },
            {
              displayName: "Audio URL",
              name: "audioUrl",
              type: "string",
              default: "",
              placeholder: "https://site.com/aud.mp3",
              description: "Audio file to play, only supports what html audio does"
            },
            {
              displayName: "Video URL",
              name: "videoUrl",
              type: "string",
              default: "",
              placeholder: "https://site.com/vid.mp4",
              description: "Video file to play, only supports what html video does"
            },
            {
              displayName: "Fields",
              name: "fields",
              type: "fixedCollection",
              placeholder: "Add Field Item",
              typeOptions: {
                multipleValues: true
              },
              default: {},
              options: [
                {
                  name: "fieldsValues",
                  displayName: "Fields",
                  values: [
                    {
                      displayName: "Short",
                      name: "short",
                      type: "boolean",
                      default: false,
                      description: "Whether this field should be a short field"
                    },
                    {
                      displayName: "Title",
                      name: "title",
                      type: "string",
                      default: "",
                      description: "The title of this field"
                    },
                    {
                      displayName: "Value",
                      name: "value",
                      type: "string",
                      default: "",
                      description: "The value of this field, displayed underneath the title value"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          displayName: "Attachments",
          name: "attachmentsJson",
          type: "json",
          typeOptions: {
            alwaysOpenEditWindow: true
          },
          displayOptions: {
            show: {
              resource: ["chat"],
              operation: ["postMessage"],
              jsonParameters: [true]
            }
          },
          default: ""
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const length = items.length;
    let responseData;
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "chat") {
          if (operation === "postMessage") {
            const channel = this.getNodeParameter("channel", i);
            const text = this.getNodeParameter("text", i);
            const options = this.getNodeParameter("options", i);
            const jsonActive = this.getNodeParameter("jsonParameters", i);
            const body = {
              channel,
              text
            };
            if (options.alias) {
              body.alias = options.alias;
            }
            if (options.avatar) {
              body.avatar = options.avatar;
            }
            if (options.emoji) {
              body.emoji = options.emoji;
            }
            if (!jsonActive) {
              const optionsAttachments = this.getNodeParameter("attachments", i);
              if (optionsAttachments.length > 0) {
                const attachments = [];
                for (let index = 0; index < optionsAttachments.length; index++) {
                  const attachment = {};
                  for (const option of Object.keys(optionsAttachments[index])) {
                    if (option === "color") {
                      attachment.color = optionsAttachments[index][option];
                    } else if (option === "text") {
                      attachment.text = optionsAttachments[index][option];
                    } else if (option === "ts") {
                      attachment.ts = optionsAttachments[index][option];
                    } else if (option === "messageLinks") {
                      attachment.message_link = optionsAttachments[index][option];
                    } else if (option === "thumbUrl") {
                      attachment.thumb_url = optionsAttachments[index][option];
                    } else if (option === "collapsed") {
                      attachment.collapsed = optionsAttachments[index][option];
                    } else if (option === "authorName") {
                      attachment.author_name = optionsAttachments[index][option];
                    } else if (option === "authorLink") {
                      attachment.author_link = optionsAttachments[index][option];
                    } else if (option === "authorIcon") {
                      attachment.author_icon = optionsAttachments[index][option];
                    } else if (option === "title") {
                      attachment.title = optionsAttachments[index][option];
                    } else if (option === "titleLink") {
                      attachment.title_link = optionsAttachments[index][option];
                    } else if (option === "titleLinkDownload") {
                      attachment.title_link_download = optionsAttachments[index][option];
                    } else if (option === "imageUrl") {
                      attachment.image_url = optionsAttachments[index][option];
                    } else if (option === "audioUrl") {
                      attachment.audio_url = optionsAttachments[index][option];
                    } else if (option === "videoUrl") {
                      attachment.video_url = optionsAttachments[index][option];
                    } else if (option === "fields") {
                      const fieldsValues = optionsAttachments[index][option].fieldsValues;
                      if (fieldsValues.length > 0) {
                        const fields = [];
                        for (let j = 0; j < fieldsValues.length; j++) {
                          const field = {};
                          for (const key of Object.keys(fieldsValues[j])) {
                            if (key === "short") {
                              field.short = fieldsValues[j][key];
                            } else if (key === "title") {
                              field.title = fieldsValues[j][key];
                            } else if (key === "value") {
                              field.value = fieldsValues[j][key];
                            }
                          }
                          fields.push(field);
                          attachment.fields = fields;
                        }
                      }
                    }
                  }
                  attachments.push(attachment);
                }
                body.attachments = attachments;
              }
            } else {
              body.attachments = (0, import_GenericFunctions.validateJSON)(
                this.getNodeParameter("attachmentsJson", i)
              );
            }
            responseData = await import_GenericFunctions.rocketchatApiRequest.call(
              this,
              "/chat",
              "POST",
              "postMessage",
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
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
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
  Rocketchat
});
//# sourceMappingURL=Rocketchat.node.js.map