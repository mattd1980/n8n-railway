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
var utils_exports = {};
__export(utils_exports, {
  getItemBinaryData: () => getItemBinaryData,
  prepareQueryString: () => prepareQueryString,
  processInChunks: () => processInChunks,
  setFileProperties: () => setFileProperties,
  setParentFolder: () => setParentFolder,
  setUpdateCommonParams: () => setUpdateCommonParams,
  updateDriveScopes: () => updateDriveScopes
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_interfaces = require("./interfaces");
function prepareQueryString(fields) {
  let queryFields = "id, name";
  if (fields) {
    if (fields.includes("*")) {
      queryFields = "*";
    } else {
      queryFields = fields.join(", ");
    }
  }
  return queryFields;
}
async function getItemBinaryData(inputDataFieldName, i, chunkSize = import_interfaces.UPLOAD_CHUNK_SIZE) {
  let contentLength;
  let fileContent;
  let originalFilename;
  let mimeType;
  if (!inputDataFieldName) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "The name of the input field containing the binary file data must be set",
      {
        itemIndex: i
      }
    );
  }
  const binaryData = this.helpers.assertBinaryData(i, inputDataFieldName);
  if (binaryData.id) {
    fileContent = await this.helpers.getBinaryStream(binaryData.id, chunkSize);
    const metadata = await this.helpers.getBinaryMetadata(binaryData.id);
    contentLength = metadata.fileSize;
    originalFilename = metadata.fileName;
    if (metadata.mimeType) mimeType = binaryData.mimeType;
  } else {
    fileContent = Buffer.from(binaryData.data, import_n8n_workflow.BINARY_ENCODING);
    contentLength = fileContent.length;
    originalFilename = binaryData.fileName;
    mimeType = binaryData.mimeType;
  }
  return {
    contentLength,
    fileContent,
    originalFilename,
    mimeType
  };
}
function setFileProperties(body, options) {
  if (options.propertiesUi) {
    const values = options.propertiesUi.propertyValues || [];
    body.properties = values.reduce(
      (acc, value) => Object.assign(acc, { [`${value.key}`]: value.value }),
      {}
    );
  }
  if (options.appPropertiesUi) {
    const values = options.appPropertiesUi.appPropertyValues || [];
    body.appProperties = values.reduce(
      (acc, value) => Object.assign(acc, { [`${value.key}`]: value.value }),
      {}
    );
  }
  return body;
}
function setUpdateCommonParams(qs, options) {
  if (options.keepRevisionForever) {
    qs.keepRevisionForever = options.keepRevisionForever;
  }
  if (options.ocrLanguage) {
    qs.ocrLanguage = options.ocrLanguage;
  }
  if (options.useContentAsIndexableText) {
    qs.useContentAsIndexableText = options.useContentAsIndexableText;
  }
  return qs;
}
function updateDriveScopes(qs, driveId, defaultDrive = import_interfaces.RLC_DRIVE_DEFAULT) {
  if (driveId) {
    if (driveId === defaultDrive) {
      qs.includeItemsFromAllDrives = false;
      qs.supportsAllDrives = false;
      qs.spaces = "appDataFolder, drive";
      qs.corpora = "user";
    } else {
      qs.driveId = driveId;
      qs.corpora = "drive";
    }
  }
}
function setParentFolder(folderId, driveId, folderIdDefault = import_interfaces.RLC_FOLDER_DEFAULT, driveIdDefault = import_interfaces.RLC_DRIVE_DEFAULT) {
  if (folderId !== folderIdDefault) {
    return folderId;
  } else if (driveId && driveId !== driveIdDefault) {
    return driveId;
  } else {
    return "root";
  }
}
async function processInChunks(stream, chunkSize, process) {
  let buffer = Buffer.alloc(0);
  let offset = 0;
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
    while (buffer.length >= chunkSize) {
      const chunkToProcess = buffer.subarray(0, chunkSize);
      await process(chunkToProcess, offset);
      buffer = buffer.subarray(chunkSize);
      offset += chunkSize;
    }
  }
  if (buffer.length > 0) {
    await process(buffer, offset);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getItemBinaryData,
  prepareQueryString,
  processInChunks,
  setFileProperties,
  setParentFolder,
  setUpdateCommonParams,
  updateDriveScopes
});
//# sourceMappingURL=utils.js.map