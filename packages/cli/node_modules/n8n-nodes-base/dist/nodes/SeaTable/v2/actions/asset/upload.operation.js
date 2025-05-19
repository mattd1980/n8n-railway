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
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
const properties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Table Name",
    name: "tableName",
    type: "options",
    placeholder: "Select a table",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getTableNames"
    },
    default: "",
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: 'Choose from the list, or specify a name using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>'
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Column Name",
    name: "uploadColumn",
    type: "options",
    typeOptions: {
      loadOptionsDependsOn: ["tableName"],
      loadOptionsMethod: "getAssetColumns"
    },
    required: true,
    default: "",
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: 'Choose from the list, or specify the name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Row ID",
    name: "rowId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    typeOptions: {
      loadOptionsDependsOn: ["tableName"],
      loadOptionsMethod: "getRowIds"
    },
    default: ""
  },
  {
    displayName: "Property Name",
    name: "dataPropertyName",
    type: "string",
    default: "data",
    required: true,
    description: "Name of the binary property which contains the data for the file to be written"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    options: [
      {
        displayName: "Replace Existing File",
        name: "replace",
        type: "boolean",
        default: true,
        description: "Whether to replace the existing asset with the same name (true). Otherwise, a new version with a different name (numeral in parentheses) will be uploaded (false)."
      },
      {
        displayName: "Append to Column",
        name: "append",
        type: "boolean",
        default: true,
        description: "Whether to keep existing files/images in the column and append the new asset (true). Otherwise, the existing files/images are removed from the column (false)."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["asset"],
    operation: ["upload"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const uploadColumn = this.getNodeParameter("uploadColumn", index);
  const uploadColumnType = uploadColumn.split(":::")[1];
  const uploadColumnName = uploadColumn.split(":::")[0];
  const dataPropertyName = this.getNodeParameter("dataPropertyName", index);
  const tableName = this.getNodeParameter("tableName", index);
  const rowId = this.getNodeParameter("rowId", index);
  const uploadLink = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "GET",
    "/api/v2.1/dtable/app-upload-link/"
  );
  const relativePath = uploadColumnType === "image" ? uploadLink.img_relative_path : uploadLink.file_relative_path;
  const options = this.getNodeParameter("options", index);
  const credentials = await this.getCredentials("seaTableApi");
  const serverURL = credentials.domain ? credentials.domain.replace(/\/$/, "") : "https://cloud.seatable.io";
  const workspaceId = (await this.helpers.httpRequest({
    headers: {
      Authorization: `Token ${credentials.token}`
    },
    url: `${serverURL}/api/v2.1/dtable/app-access-token/`,
    json: true
  })).workspace_id;
  let existingAssetArray = [];
  const append = options.append ?? true;
  if (append) {
    const rowToUpdate = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "GET",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/rows/" + rowId,
      {},
      {
        table_name: tableName,
        convert_keys: true
      }
    );
    existingAssetArray = rowToUpdate[uploadColumnName] ?? [];
  }
  const fileBufferData = await this.helpers.getBinaryDataBuffer(index, dataPropertyName);
  const binaryData = this.helpers.assertBinaryData(index, dataPropertyName);
  const requestOptions = {
    formData: {
      file: {
        value: fileBufferData,
        options: {
          filename: binaryData.fileName,
          contentType: binaryData.mimeType
        }
      },
      parent_dir: uploadLink.parent_path,
      replace: options.replace ? "1" : "0",
      relative_path: relativePath
    }
  };
  const uploadAsset = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "POST",
    `/seafhttp/upload-api/${uploadLink.upload_link.split("seafhttp/upload-api/")[1]}?ret-json=true`,
    {},
    {},
    "",
    requestOptions
  );
  for (let c = 0; c < uploadAsset.length; c++) {
    const rowInput = {};
    const filePath = `${serverURL}/workspace/${workspaceId}${uploadLink.parent_path}/${relativePath}/${uploadAsset[c].name}`;
    if (uploadColumnType === "image") {
      rowInput[uploadColumnName] = [filePath];
    } else if (uploadColumnType === "file") {
      rowInput[uploadColumnName] = uploadAsset;
      uploadAsset[c].type = "file";
      uploadAsset[c].url = filePath;
    }
    const mergedArray = existingAssetArray.concat(rowInput[uploadColumnName]);
    const uniqueAssets = Array.from(new Set(mergedArray));
    rowInput[uploadColumnName] = uniqueAssets;
    const body = {
      table_name: tableName,
      updates: [
        {
          row_id: rowId,
          row: rowInput
        }
      ]
    };
    const responseData = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      {},
      "PUT",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/rows/",
      body
    );
    uploadAsset[c].upload_successful = responseData.success;
  }
  return this.helpers.returnJsonArray(uploadAsset);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=upload.operation.js.map