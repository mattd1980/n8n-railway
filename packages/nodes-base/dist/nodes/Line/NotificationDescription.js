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
var NotificationDescription_exports = {};
__export(NotificationDescription_exports, {
  notificationFields: () => notificationFields,
  notificationOperations: () => notificationOperations
});
module.exports = __toCommonJS(NotificationDescription_exports);
const notificationOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["notification"]
      }
    },
    options: [
      {
        name: "Send",
        value: "send",
        description: "Sends notifications to users or groups",
        action: "Send a notification"
      }
    ],
    default: "send"
  }
];
const notificationFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 notification:send                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Message",
    name: "message",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["send"],
        resource: ["notification"]
      }
    },
    default: ""
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["send"],
        resource: ["notification"]
      }
    },
    options: [
      {
        displayName: "Image",
        name: "imageUi",
        placeholder: "Add Image",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false
        },
        default: {},
        options: [
          {
            name: "imageValue",
            displayName: "Image",
            values: [
              {
                displayName: "Binary File",
                name: "binaryData",
                type: "boolean",
                default: false
              },
              {
                displayName: "Image Full Size",
                name: "imageFullsize",
                type: "string",
                default: "",
                displayOptions: {
                  show: {
                    binaryData: [false]
                  }
                },
                description: "HTTP/HTTPS URL. Maximum size of 2048\xD72048px JPEG."
              },
              {
                displayName: "Image Thumbnail",
                name: "imageThumbnail",
                type: "string",
                displayOptions: {
                  show: {
                    binaryData: [false]
                  }
                },
                default: "",
                description: "HTTP/HTTPS URL. Maximum size of 240\xD7240px JPEG."
              },
              {
                displayName: "Input Binary Field",
                name: "binaryProperty",
                type: "string",
                displayOptions: {
                  show: {
                    binaryData: [true]
                  }
                },
                default: "data",
                hint: "The name of the input binary field containing the file to be written"
              }
            ]
          }
        ]
      },
      {
        displayName: "Notification Disabled",
        name: "notificationDisabled",
        type: "boolean",
        default: false,
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "<p>true: The user doesn't receive a push notification when the message is sent.</p><p>false: The user receives a push notification when the message is sent</p>"
      },
      {
        displayName: "Sticker",
        name: "stickerUi",
        placeholder: "Add Sticker",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false
        },
        default: {},
        options: [
          {
            name: "stickerValue",
            displayName: "Sticker",
            values: [
              {
                displayName: "Sticker ID",
                name: "stickerId",
                type: "number",
                default: ""
              },
              {
                displayName: "Sticker Package ID",
                name: "stickerPackageId",
                type: "number",
                default: "",
                description: "Package ID"
              }
            ]
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  notificationFields,
  notificationOperations
});
//# sourceMappingURL=NotificationDescription.js.map