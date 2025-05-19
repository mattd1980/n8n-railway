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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(update_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.fileRLC,
    displayName: "File to Update",
    description: "The file to update"
  },
  {
    displayName: "Change File Content",
    name: "changeFileContent",
    type: "boolean",
    default: false,
    description: "Whether to send a new binary data to update the file"
  },
  {
    displayName: "Input Data Field Name",
    name: "inputDataFieldName",
    type: "string",
    placeholder: "e.g. data",
    default: "data",
    hint: "The name of the input field containing the binary file data to update the file",
    description: "Find the name of input field containing the binary data to update the file in the Input panel on the left, in the Binary tab",
    displayOptions: {
      show: {
        changeFileContent: [true]
      }
    }
  },
  {
    displayName: "New Updated File Name",
    name: "newUpdatedFileName",
    type: "string",
    default: "",
    placeholder: "e.g. My New File",
    description: "If not specified, the file name will not be changed"
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
        displayName: "Move to Trash",
        name: "trashed",
        type: "boolean",
        default: false,
        description: "Whether to move a file to the trash. Only the owner may trash a file."
      },
      {
        displayName: "Return Fields",
        name: "fields",
        type: "multiOptions",
        options: [
          {
            name: "[All]",
            value: "*",
            description: "All fields"
          },
          {
            name: "explicitlyTrashed",
            value: "explicitlyTrashed"
          },
          {
            name: "exportLinks",
            value: "exportLinks"
          },
          {
            name: "hasThumbnail",
            value: "hasThumbnail"
          },
          {
            name: "iconLink",
            value: "iconLink"
          },
          {
            name: "ID",
            value: "id"
          },
          {
            name: "Kind",
            value: "kind"
          },
          {
            name: "mimeType",
            value: "mimeType"
          },
          {
            name: "Name",
            value: "name"
          },
          {
            name: "Permissions",
            value: "permissions"
          },
          {
            name: "Shared",
            value: "shared"
          },
          {
            name: "Spaces",
            value: "spaces"
          },
          {
            name: "Starred",
            value: "starred"
          },
          {
            name: "thumbnailLink",
            value: "thumbnailLink"
          },
          {
            name: "Trashed",
            value: "trashed"
          },
          {
            name: "Version",
            value: "version"
          },
          {
            name: "webViewLink",
            value: "webViewLink"
          }
        ],
        default: [],
        description: "The fields to return"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const fileId = this.getNodeParameter("fileId", i, void 0, {
    extractValue: true
  });
  const changeFileContent = this.getNodeParameter("changeFileContent", i, false);
  let mimeType;
  if (changeFileContent) {
    const inputDataFieldName = this.getNodeParameter("inputDataFieldName", i);
    const binaryData = await import_utils.getItemBinaryData.call(this, inputDataFieldName, i);
    const { contentLength, fileContent } = binaryData;
    mimeType = binaryData.mimeType;
    if (Buffer.isBuffer(fileContent)) {
      await import_transport.googleApiRequest.call(
        this,
        "PATCH",
        `/upload/drive/v3/files/${fileId}`,
        fileContent,
        {
          uploadType: "media",
          supportsAllDrives: true
        },
        void 0,
        {
          headers: {
            "Content-Type": mimeType,
            "Content-Length": contentLength
          }
        }
      );
    } else {
      const resumableUpload = await import_transport.googleApiRequest.call(
        this,
        "PATCH",
        `/upload/drive/v3/files/${fileId}`,
        void 0,
        { uploadType: "resumable", supportsAllDrives: true },
        void 0,
        {
          returnFullResponse: true
        }
      );
      const uploadUrl = resumableUpload.headers.location;
      let offset = 0;
      for await (const chunk of fileContent) {
        const nextOffset = offset + Number(chunk.length);
        try {
          await this.helpers.httpRequest({
            method: "PUT",
            url: uploadUrl,
            headers: {
              "Content-Length": chunk.length,
              "Content-Range": `bytes ${offset}-${nextOffset - 1}/${contentLength}`
            },
            body: chunk
          });
        } catch (error) {
          if (error.response?.status !== 308) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex: i });
          }
        }
        offset = nextOffset;
      }
    }
  }
  const options = this.getNodeParameter("options", i, {});
  const qs = (0, import_utils.setUpdateCommonParams)(
    {
      supportsAllDrives: true
    },
    options
  );
  if (options.fields) {
    const queryFields = (0, import_utils.prepareQueryString)(options.fields);
    qs.fields = queryFields;
  }
  if (options.trashed) {
    qs.trashed = options.trashed;
  }
  const body = (0, import_utils.setFileProperties)({}, options);
  const newUpdatedFileName = this.getNodeParameter("newUpdatedFileName", i, "");
  if (newUpdatedFileName) {
    body.name = newUpdatedFileName;
  }
  if (mimeType) {
    body.mimeType = mimeType;
  }
  const responseData = await import_transport.googleApiRequest.call(
    this,
    "PATCH",
    `/drive/v3/files/${fileId}`,
    body,
    qs
  );
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData),
    { itemData: { item: i } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=update.operation.js.map