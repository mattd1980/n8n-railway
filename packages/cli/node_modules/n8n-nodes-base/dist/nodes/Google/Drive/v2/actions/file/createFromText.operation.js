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
var createFromText_operation_exports = {};
__export(createFromText_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(createFromText_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_interfaces = require("../../helpers/interfaces");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "File Content",
    name: "content",
    type: "string",
    default: "",
    typeOptions: {
      rows: 2
    },
    description: "The text to create the file with"
  },
  {
    displayName: "File Name",
    name: "name",
    type: "string",
    default: "",
    placeholder: "e.g. My New File",
    description: "The name of the file you want to create. If not specified, 'Untitled' will be used."
  },
  {
    ...import_common.driveRLC,
    displayName: "Parent Drive",
    required: false,
    description: "The drive where to create the new file"
  },
  {
    ...import_common.folderRLC,
    displayName: "Parent Folder",
    required: false,
    description: "The folder where to create the new file"
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
        displayName: "Convert to Google Document",
        name: "convertToGoogleDocument",
        type: "boolean",
        default: false,
        description: "Whether to create a Google Document (instead of the .txt default format)",
        hint: 'Google Docs API has to be enabled in the <a href="https://console.developers.google.com/apis/library/docs.googleapis.com" target="_blank">Google API Console</a>.'
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["createFromText"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const name = this.getNodeParameter("name", i) || "Untitled";
  const options = this.getNodeParameter("options", i, {});
  const convertToGoogleDocument = options.convertToGoogleDocument || false;
  const mimeType = convertToGoogleDocument ? import_interfaces.DRIVE.DOCUMENT : "text/plain";
  const driveId = this.getNodeParameter("driveId", i, void 0, {
    extractValue: true
  });
  const folderId = this.getNodeParameter("folderId", i, void 0, {
    extractValue: true
  });
  const bodyParameters = (0, import_utils.setFileProperties)(
    {
      name,
      parents: [(0, import_utils.setParentFolder)(folderId, driveId)],
      mimeType
    },
    options
  );
  const qs = (0, import_utils.setUpdateCommonParams)(
    {
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      spaces: "appDataFolder, drive",
      corpora: "allDrives"
    },
    options
  );
  let response;
  if (convertToGoogleDocument) {
    const document = await import_transport.googleApiRequest.call(
      this,
      "POST",
      "/drive/v3/files",
      bodyParameters,
      qs
    );
    const text = this.getNodeParameter("content", i, "");
    const body = {
      requests: [
        {
          insertText: {
            text,
            endOfSegmentLocation: {
              segmentId: ""
              //empty segment ID signifies the document's body
            }
          }
        }
      ]
    };
    const updateResponse = await import_transport.googleApiRequest.call(
      this,
      "POST",
      "",
      body,
      void 0,
      `https://docs.googleapis.com/v1/documents/${document.id}:batchUpdate`
    );
    response = { id: updateResponse.documentId };
  } else {
    const content = Buffer.from(this.getNodeParameter("content", i, ""), "utf8");
    const contentLength = content.byteLength;
    const uploadData = await import_transport.googleApiRequest.call(
      this,
      "POST",
      "/upload/drive/v3/files",
      content,
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
    const uploadId = uploadData.id;
    qs.addParents = (0, import_utils.setParentFolder)(folderId, driveId);
    delete bodyParameters.parents;
    const responseData = await import_transport.googleApiRequest.call(
      this,
      "PATCH",
      `/drive/v3/files/${uploadId}`,
      bodyParameters,
      qs
    );
    response = { id: responseData.id };
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(response),
    { itemData: { item: i } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=createFromText.operation.js.map