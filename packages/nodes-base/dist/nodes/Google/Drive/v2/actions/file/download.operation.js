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
var download_operation_exports = {};
__export(download_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(download_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.fileRLC,
    description: "The file to download"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Put Output File in Field",
        name: "binaryPropertyName",
        type: "string",
        placeholder: "e.g. data",
        default: "data",
        description: "Use this field name in the following nodes, to use the binary file data",
        hint: "The name of the output binary field to put the file in"
      },
      {
        displayName: "Google File Conversion",
        name: "googleFileConversion",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: false
        },
        default: {},
        placeholder: "Add Conversion",
        options: [
          {
            displayName: "Conversion",
            name: "conversion",
            values: [
              {
                displayName: "Google Docs",
                name: "docsToFormat",
                type: "options",
                options: [
                  {
                    name: "HTML",
                    value: "text/html"
                  },
                  {
                    name: "MS Word Document",
                    value: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  },
                  {
                    name: "Open Office Document",
                    value: "application/vnd.oasis.opendocument.text"
                  },
                  {
                    name: "PDF",
                    value: "application/pdf"
                  },
                  {
                    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                    name: "Rich Text (rtf)",
                    value: "application/rtf"
                  },
                  {
                    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                    name: "Text (txt)",
                    value: "text/plain"
                  }
                ],
                default: "text/html",
                description: "Format used to export when downloading Google Docs files"
              },
              {
                displayName: "Google Drawings",
                name: "drawingsToFormat",
                type: "options",
                options: [
                  {
                    name: "JPEG",
                    value: "image/jpeg"
                  },
                  {
                    name: "PDF",
                    value: "application/pdf"
                  },
                  {
                    name: "PNG",
                    value: "image/png"
                  },
                  {
                    name: "SVG",
                    value: "image/svg+xml"
                  }
                ],
                default: "image/jpeg",
                description: "Format used to export when downloading Google Drawings files"
              },
              {
                displayName: "Google Slides",
                name: "slidesToFormat",
                type: "options",
                options: [
                  {
                    name: "MS PowerPoint",
                    value: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  },
                  {
                    name: "OpenOffice Presentation",
                    value: "application/vnd.oasis.opendocument.presentation"
                  },
                  {
                    name: "PDF",
                    value: "application/pdf"
                  }
                ],
                default: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                description: "Format used to export when downloading Google Slides files"
              },
              {
                displayName: "Google Sheets",
                name: "sheetsToFormat",
                type: "options",
                options: [
                  {
                    name: "CSV",
                    value: "text/csv"
                  },
                  {
                    name: "MS Excel",
                    value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  },
                  {
                    name: "Open Office Sheet",
                    value: "application/vnd.oasis.opendocument.spreadsheet"
                  },
                  {
                    name: "PDF",
                    value: "application/pdf"
                  }
                ],
                default: "text/csv",
                description: "Format used to export when downloading Google Sheets files"
              }
            ]
          }
        ]
      },
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "",
        description: "File name. Ex: data.pdf."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["file"],
    operation: ["download"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i, item) {
  const fileId = this.getNodeParameter("fileId", i, void 0, {
    extractValue: true
  });
  const downloadOptions = this.getNodeParameter("options", i);
  const requestOptions = {
    useStream: true,
    returnFullResponse: true,
    encoding: "arraybuffer",
    json: false
  };
  const file = await import_transport.googleApiRequest.call(
    this,
    "GET",
    `/drive/v3/files/${fileId}`,
    {},
    { fields: "mimeType,name", supportsTeamDrives: true, supportsAllDrives: true }
  );
  let response;
  if (file.mimeType?.includes("vnd.google-apps")) {
    const parameterKey = "options.googleFileConversion.conversion";
    const type = file.mimeType.split(".")[2];
    let mime;
    if (type === "document") {
      mime = this.getNodeParameter(
        `${parameterKey}.docsToFormat`,
        i,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    } else if (type === "presentation") {
      mime = this.getNodeParameter(
        `${parameterKey}.slidesToFormat`,
        i,
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      );
    } else if (type === "spreadsheet") {
      mime = this.getNodeParameter(
        `${parameterKey}.sheetsToFormat`,
        i,
        "application/x-vnd.oasis.opendocument.spreadsheet"
      );
    } else {
      mime = this.getNodeParameter(`${parameterKey}.drawingsToFormat`, i, "image/jpeg");
    }
    response = await import_transport.googleApiRequest.call(
      this,
      "GET",
      `/drive/v3/files/${fileId}/export`,
      {},
      { mimeType: mime, supportsAllDrives: true },
      void 0,
      requestOptions
    );
  } else {
    response = await import_transport.googleApiRequest.call(
      this,
      "GET",
      `/drive/v3/files/${fileId}`,
      {},
      { alt: "media", supportsAllDrives: true },
      void 0,
      requestOptions
    );
  }
  const mimeType = response.headers?.["content-type"] ?? file.mimeType ?? void 0;
  const fileName = downloadOptions.fileName ?? file.name ?? void 0;
  const newItem = {
    json: item.json,
    binary: {}
  };
  if (item.binary !== void 0) {
    Object.assign(newItem.binary, item.binary);
  }
  item = newItem;
  const dataPropertyNameDownload = downloadOptions.binaryPropertyName || "data";
  item.binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
    response.body,
    fileName,
    mimeType
  );
  const executionData = this.helpers.constructExecutionMetaData([item], { itemData: { item: i } });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=download.operation.js.map