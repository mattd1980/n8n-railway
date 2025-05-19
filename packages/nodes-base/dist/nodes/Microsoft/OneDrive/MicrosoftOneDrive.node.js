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
var MicrosoftOneDrive_node_exports = {};
__export(MicrosoftOneDrive_node_exports, {
  MicrosoftOneDrive: () => MicrosoftOneDrive
});
module.exports = __toCommonJS(MicrosoftOneDrive_node_exports);
var import_http = require("http");
var import_n8n_workflow = require("n8n-workflow");
var import_FileDescription = require("./FileDescription");
var import_FolderDescription = require("./FolderDescription");
var import_GenericFunctions = require("./GenericFunctions");
class MicrosoftOneDrive {
  constructor() {
    this.description = {
      displayName: "Microsoft OneDrive",
      name: "microsoftOneDrive",
      icon: "file:oneDrive.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Microsoft OneDrive API",
      defaults: {
        name: "Microsoft OneDrive"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "microsoftOneDriveOAuth2Api",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "File",
              value: "file"
            },
            {
              name: "Folder",
              value: "folder"
            }
          ],
          default: "file"
        },
        ...import_FileDescription.fileOperations,
        ...import_FileDescription.fileFields,
        ...import_FolderDescription.folderOperations,
        ...import_FolderDescription.folderFields
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
        if (resource === "file") {
          if (operation === "copy") {
            const fileId = this.getNodeParameter("fileId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const parentReference = this.getNodeParameter("parentReference", i);
            const body = {};
            if (parentReference) {
              body.parentReference = { ...parentReference };
            }
            if (additionalFields.name) {
              body.name = additionalFields.name;
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/drive/items/${fileId}/copy`,
              body,
              {},
              void 0,
              {},
              { json: true, resolveWithFullResponse: true }
            );
            responseData = { location: responseData.headers.location };
          }
          if (operation === "delete") {
            const fileId = this.getNodeParameter("fileId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "DELETE", `/drive/items/${fileId}`);
            responseData = { success: true };
          }
          if (operation === "download") {
            const fileId = this.getNodeParameter("fileId", i);
            const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "GET", `/drive/items/${fileId}`);
            const fileName = responseData.name;
            const downloadUrl = responseData["@microsoft.graph.downloadUrl"];
            if (responseData.file === void 0) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
                message: "The ID you provided does not belong to a file."
              });
            }
            let mimeType;
            if (responseData.file.mimeType) {
              mimeType = responseData.file.mimeType;
            }
            try {
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                `/drive/items/${fileId}/content`,
                {},
                {},
                void 0,
                {},
                { encoding: null, resolveWithFullResponse: true }
              );
            } catch (error) {
              if (downloadUrl) {
                responseData = await this.helpers.httpRequest({
                  method: "GET",
                  url: downloadUrl,
                  returnFullResponse: true,
                  encoding: "arraybuffer",
                  json: false
                });
              }
            }
            const newItem = {
              json: items[i].json,
              binary: {}
            };
            if (mimeType === void 0 && responseData.headers["content-type"]) {
              mimeType = responseData.headers["content-type"];
            }
            if (items[i].binary !== void 0) {
              Object.assign(newItem.binary, items[i].binary);
            }
            items[i] = newItem;
            let data;
            if (responseData?.body instanceof import_http.IncomingMessage) {
              data = responseData.body;
            } else {
              data = Buffer.from(responseData.body);
            }
            items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
              data,
              fileName,
              mimeType
            );
          }
          if (operation === "get") {
            const fileId = this.getNodeParameter("fileId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "GET", `/drive/items/${fileId}`);
          }
          if (operation === "search") {
            const query = this.getNodeParameter("query", i);
            responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
              this,
              "value",
              "GET",
              `/drive/root/search(q='${query}')`
            );
            responseData = responseData.filter((item) => item.file);
          }
          if (operation === "share") {
            const fileId = this.getNodeParameter("fileId", i);
            const type = this.getNodeParameter("type", i);
            const scope = this.getNodeParameter("scope", i);
            const body = {
              type,
              scope
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/drive/items/${fileId}/createLink`,
              body
            );
          }
          if (operation === "upload") {
            const parentId = this.getNodeParameter("parentId", i);
            const isBinaryData = this.getNodeParameter("binaryData", i);
            const fileName = this.getNodeParameter("fileName", i);
            if (isBinaryData) {
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", 0);
              const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
              const body = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
              let encodedFilename;
              if (fileName !== "") {
                encodedFilename = encodeURIComponent(fileName);
              }
              if (binaryData.fileName !== void 0) {
                encodedFilename = encodeURIComponent(binaryData.fileName);
              }
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "PUT",
                `/drive/items/${parentId}:/${encodedFilename}:/content`,
                body,
                {},
                void 0,
                { "Content-Type": binaryData.mimeType, "Content-length": body.length },
                {}
              );
              responseData = JSON.parse(responseData);
            } else {
              const body = this.getNodeParameter("fileContent", i);
              if (fileName === "") {
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), "File name must be set!", {
                  itemIndex: i
                });
              }
              const encodedFilename = encodeURIComponent(fileName);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "PUT",
                `/drive/items/${parentId}:/${encodedFilename}:/content`,
                body,
                {},
                void 0,
                { "Content-Type": "text/plain" }
              );
            }
          }
        }
        if (resource === "folder") {
          if (operation === "create") {
            const names = this.getNodeParameter("name", i).split("/").filter((s) => s.trim() !== "");
            const options = this.getNodeParameter("options", i);
            let parentFolderId = options.parentFolderId ? options.parentFolderId : null;
            for (const name of names) {
              const body = {
                name,
                folder: {}
              };
              let endpoint = "/drive/root/children";
              if (parentFolderId) {
                endpoint = `/drive/items/${parentFolderId}/children`;
              }
              responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "POST", endpoint, body);
              if (!responseData.id) {
                break;
              }
              parentFolderId = responseData.id;
            }
          }
          if (operation === "delete") {
            const folderId = this.getNodeParameter("folderId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "DELETE",
              `/drive/items/${folderId}`
            );
            responseData = { success: true };
          }
          if (operation === "getChildren") {
            const folderId = this.getNodeParameter("folderId", i);
            responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
              this,
              "value",
              "GET",
              `/drive/items/${folderId}/children`
            );
          }
          if (operation === "search") {
            const query = this.getNodeParameter("query", i);
            responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
              this,
              "value",
              "GET",
              `/drive/root/search(q='${query}')`
            );
            responseData = responseData.filter((item) => item.folder);
          }
          if (operation === "share") {
            const folderId = this.getNodeParameter("folderId", i);
            const type = this.getNodeParameter("type", i);
            const scope = this.getNodeParameter("scope", i);
            const body = {
              type,
              scope
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/drive/items/${folderId}/createLink`,
              body
            );
          }
        }
        if (resource === "file" || resource === "folder") {
          if (operation === "rename") {
            const itemId = this.getNodeParameter("itemId", i);
            const newName = this.getNodeParameter("newName", i);
            const body = { name: newName };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "PATCH",
              `/drive/items/${itemId}`,
              body
            );
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          if (resource === "file" && operation === "download") {
            items[i].json = { error: error.message };
          } else {
            const executionErrorData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData: { item: i } }
            );
            returnData.push(...executionErrorData);
          }
          continue;
        }
        throw error;
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    if (resource === "file" && operation === "download") {
      return [items];
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftOneDrive
});
//# sourceMappingURL=MicrosoftOneDrive.node.js.map