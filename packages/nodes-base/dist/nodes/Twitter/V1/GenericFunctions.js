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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  chunks: () => chunks,
  twitterApiRequest: () => twitterApiRequest,
  twitterApiRequestAllItems: () => twitterApiRequestAllItems,
  uploadAttachments: () => uploadAttachments
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function twitterApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  let options = {
    method,
    body,
    qs,
    url: uri || `https://api.twitter.com/1.1${resource}`,
    json: true
  };
  try {
    if (Object.keys(option).length !== 0) {
      options = Object.assign({}, options, option);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (Object.keys(qs).length === 0) {
      delete options.qs;
    }
    return await this.helpers.requestOAuth1.call(this, "twitterOAuth1Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function twitterApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.count = 100;
  do {
    responseData = await twitterApiRequest.call(this, method, endpoint, body, query);
    query.since_id = responseData.search_metadata.max_id;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.search_metadata?.next_results);
  return returnData;
}
function chunks(buffer, chunkSize) {
  const result = [];
  const len = buffer.length;
  let i = 0;
  while (i < len) {
    result.push(buffer.slice(i, i += chunkSize));
  }
  return result;
}
async function uploadAttachments(binaryProperties, i) {
  const uploadUri = "https://upload.twitter.com/1.1/media/upload.json";
  const media = [];
  for (const binaryPropertyName of binaryProperties) {
    let attachmentBody = {};
    let response = {};
    const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
    const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
    const isAnimatedWebp = dataBuffer.toString().indexOf("ANMF") !== -1;
    const isImage = binaryData.mimeType.includes("image");
    if (isImage && isAnimatedWebp) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Animated .webp images are not supported use .gif instead",
        { itemIndex: i }
      );
    }
    if (isImage) {
      const form = {
        media_data: binaryData.data
      };
      response = await twitterApiRequest.call(this, "POST", "", {}, {}, uploadUri, {
        form
      });
      media.push(response);
    } else {
      attachmentBody = {
        command: "INIT",
        total_bytes: dataBuffer.byteLength,
        media_type: binaryData.mimeType
      };
      response = await twitterApiRequest.call(this, "POST", "", {}, {}, uploadUri, {
        form: attachmentBody
      });
      const mediaId = response.media_id_string;
      const binaryParts = chunks(dataBuffer, 5242880);
      let index = 0;
      for (const binaryPart of binaryParts) {
        attachmentBody = {
          name: binaryData.fileName,
          command: "APPEND",
          media_id: mediaId,
          media_data: Buffer.from(binaryPart).toString("base64"),
          segment_index: index
        };
        response = await twitterApiRequest.call(this, "POST", "", {}, {}, uploadUri, {
          form: attachmentBody
        });
        index++;
      }
      attachmentBody = {
        command: "FINALIZE",
        media_id: mediaId
      };
      response = await twitterApiRequest.call(this, "POST", "", {}, {}, uploadUri, {
        form: attachmentBody
      });
      if (response.processing_info) {
        const { check_after_secs } = response.processing_info;
        await (0, import_n8n_workflow.sleep)(check_after_secs * 1e3);
      }
      media.push(response);
    }
    return media;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  chunks,
  twitterApiRequest,
  twitterApiRequestAllItems,
  uploadAttachments
});
//# sourceMappingURL=GenericFunctions.js.map