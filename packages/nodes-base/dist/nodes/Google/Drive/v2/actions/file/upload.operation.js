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
var upload_operation_exports = {};
__export(upload_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(upload_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Input Data Field Name",
    name: "inputDataFieldName",
    type: "string",
    placeholder: "\u201Ce.g. data",
    default: "data",
    required: true,
    hint: "The name of the input field containing the binary file data to update the file",
    description: "Find the name of input field containing the binary data to update the file in the Input panel on the left, in the Binary tab"
  },
  {
    displayName: "File Name",
    name: "name",
    type: "string",
    default: "",
    placeholder: "e.g. My New File",
    description: "If not specified, the original file name will be used"
  },
  {
    ...import_common.driveRLC,
    displayName: "Parent Drive",
    description: "The drive where to upload the file"
  },
  {
    ...import_common.folderRLC,
    displayName: "Parent Folder",
    description: "The folder where to upload the file"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      ...import_common.updateCommonOptions,
      {
        displayName: "Simplify Output",
        name: "simplifyOutput",
        type: "boolean",
        default: true,
        description: "Whether to return a simplified version of the response instead of all fields"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["upload"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const returnData = [];
  const inputDataFieldName = this.getNodeParameter("inputDataFieldName", i);
  const { contentLength, fileContent, originalFilename, mimeType } = await import_utils.getItemBinaryData.call(
    this,
    inputDataFieldName,
    i
  );
  const name = this.getNodeParameter("name", i) || originalFilename;
  const driveId = this.getNodeParameter("driveId", i, void 0, {
    extractValue: true
  });
  const folderId = this.getNodeParameter("folderId", i, void 0, {
    extractValue: true
  });
  let uploadId;
  if (Buffer.isBuffer(fileContent)) {
    const response2 = await import_transport.googleApiRequest.call(
      this,
      "POST",
      "/upload/drive/v3/files",
      fileContent,
      {
        uploadType: "media"
      },
      void 0,
      {
        headers: {
          "Content-Type": mimeType,
          "Content-Length": contentLength
        }
      }
    );
    uploadId = response2.id;
  } else {
    const resumableUpload = await import_transport.googleApiRequest.call(
      this,
      "POST",
      "/upload/drive/v3/files",
      void 0,
      { uploadType: "resumable" },
      void 0,
      {
        returnFullResponse: true
      }
    );
    const uploadUrl = resumableUpload.headers.location;
    const chunkSizeBytes = 2048 * 1024;
    await (0, import_utils.processInChunks)(fileContent, chunkSizeBytes, async (chunk, offset) => {
      try {
        const response2 = await this.helpers.httpRequest({
          method: "PUT",
          url: uploadUrl,
          headers: {
            "Content-Length": chunk.length,
            "Content-Range": `bytes ${offset}-${offset + chunk.byteLength - 1}/${contentLength}`
          },
          body: chunk
        });
        uploadId = response2?.id;
      } catch (error) {
        if (error.response?.status !== 308) throw error;
      }
    });
  }
  const options = this.getNodeParameter("options", i, {});
  const qs = (0, import_utils.setUpdateCommonParams)(
    {
      addParents: (0, import_utils.setParentFolder)(folderId, driveId),
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      spaces: "appDataFolder, drive",
      corpora: "allDrives"
    },
    options
  );
  if (!options.simplifyOutput) {
    qs.fields = "*";
  }
  const body = (0, import_utils.setFileProperties)(
    {
      mimeType,
      name,
      originalFilename
    },
    options
  );
  const response = await import_transport.googleApiRequest.call(
    this,
    "PATCH",
    `/drive/v3/files/${uploadId}`,
    body,
    qs
  );
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(response),
    { itemData: { item: i } }
  );
  returnData.push(...executionData);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=upload.operation.js.map