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
var Line_node_exports = {};
__export(Line_node_exports, {
  Line: () => Line
});
module.exports = __toCommonJS(Line_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_NotificationDescription = require("./NotificationDescription");
class Line {
  constructor() {
    this.description = {
      displayName: "Line",
      name: "line",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:line.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Line API",
      defaults: {
        name: "Line"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "lineNotifyOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              resource: ["notification"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: 'End of service: LINE Notify will be discontinued from April 1st 2025, You can find more information <a href="https://notify-bot.line.me/closing-announce" target="_blank">here</a>',
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Notification",
              value: "notification"
            }
          ],
          default: "notification"
        },
        ...import_NotificationDescription.notificationOperations,
        ...import_NotificationDescription.notificationFields
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
        if (resource === "notification") {
          if (operation === "send") {
            const message = this.getNodeParameter("message", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              message
            };
            Object.assign(body, additionalFields);
            if (body.hasOwnProperty("notificationDisabled")) {
              body.notificationDisabled = body.notificationDisabled ? "true" : "false";
            }
            if (body.stickerUi) {
              const sticker = body.stickerUi.stickerValue;
              if (sticker) {
                body.stickerId = sticker.stickerId;
                body.stickerPackageId = sticker.stickerPackageId;
              }
              delete body.stickerUi;
            }
            if (body.imageUi) {
              const image = body.imageUi.imageValue;
              if (image && image.binaryData === true) {
                const binaryProperty = image.binaryProperty;
                const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
                const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
                body.imageFile = {
                  value: binaryDataBuffer,
                  options: {
                    filename: binaryData.fileName
                  }
                };
              } else {
                body.imageFullsize = image.imageFullsize;
                body.imageThumbnail = image.imageThumbnail;
              }
              delete body.imageUi;
            }
            responseData = await import_GenericFunctions.lineApiRequest.call(
              this,
              "POST",
              "",
              {},
              {},
              "https://notify-api.line.me/api/notify",
              { formData: body }
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
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
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
  Line
});
//# sourceMappingURL=Line.node.js.map