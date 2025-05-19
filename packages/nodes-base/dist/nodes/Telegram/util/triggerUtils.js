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
var triggerUtils_exports = {};
__export(triggerUtils_exports, {
  downloadFile: () => downloadFile
});
module.exports = __toCommonJS(triggerUtils_exports);
var import_GenericFunctions = require("../GenericFunctions");
const downloadFile = async (webhookFunctions, credentials, bodyData, additionalFields) => {
  let imageSize = "large";
  let key = "message";
  if (bodyData.channel_post) {
    key = "channel_post";
  }
  if (bodyData[key]?.photo && Array.isArray(bodyData[key]?.photo) || bodyData[key]?.document || bodyData[key]?.video) {
    if (additionalFields.imageSize) {
      imageSize = additionalFields.imageSize;
    }
    let fileId;
    if (bodyData[key]?.photo) {
      let image = (0, import_GenericFunctions.getImageBySize)(bodyData[key]?.photo, imageSize);
      if (image === void 0) {
        image = bodyData[key].photo[0];
      }
      fileId = image.file_id;
    } else if (bodyData[key]?.video) {
      fileId = bodyData[key]?.video?.file_id;
    } else {
      fileId = bodyData[key]?.document?.file_id;
    }
    const {
      result: { file_path }
    } = await import_GenericFunctions.apiRequest.call(webhookFunctions, "GET", `getFile?file_id=${fileId}`, {});
    const file = await import_GenericFunctions.apiRequest.call(
      webhookFunctions,
      "GET",
      "",
      {},
      {},
      {
        json: false,
        encoding: null,
        uri: `${credentials.baseUrl}/file/bot${credentials.accessToken}/${file_path}`,
        resolveWithFullResponse: true
      }
    );
    const data = Buffer.from(file.body);
    const fileName = file_path.split("/").pop();
    const binaryData = await webhookFunctions.helpers.prepareBinaryData(
      data,
      fileName
    );
    return {
      workflowData: [
        [
          {
            json: bodyData,
            binary: {
              data: binaryData
            }
          }
        ]
      ]
    };
  }
  return {};
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadFile
});
//# sourceMappingURL=triggerUtils.js.map