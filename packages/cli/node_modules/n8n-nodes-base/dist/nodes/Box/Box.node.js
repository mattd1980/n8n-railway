"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Box_node_exports = {};
__export(Box_node_exports, {
  Box: () => Box
});
module.exports = __toCommonJS(Box_node_exports);
var import_change_case = require("change-case");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_FileDescription = require("./FileDescription");
var import_FolderDescription = require("./FolderDescription");
var import_GenericFunctions = require("./GenericFunctions");
class Box {
  constructor() {
    this.description = {
      displayName: "Box",
      name: "box",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:box.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Box API",
      defaults: {
        name: "Box"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "boxOAuth2Api",
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
    const qs = {};
    let responseData;
    const timezone = this.getTimezone();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "file") {
          if (operation === "copy") {
            const fileId = this.getNodeParameter("fileId", i);
            const parentId = this.getNodeParameter("parentId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {};
            if (additionalFields.name) {
              body.name = additionalFields.name;
            }
            if (parentId) {
              body.parent = { id: parentId };
            } else {
              body.parent = { id: 0 };
            }
            if (additionalFields.fields) {
              qs.fields = additionalFields.fields;
            }
            if (additionalFields.version) {
              body.version = additionalFields.version;
            }
            responseData = await import_GenericFunctions.boxApiRequest.call(
              this,
              "POST",
              `/files/${fileId}/copy`,
              body,
              qs
            );
          }
          if (operation === "delete") {
            const fileId = this.getNodeParameter("fileId", i);
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "DELETE", `/files/${fileId}`);
            responseData = { success: true };
          }
          if (operation === "download") {
            const fileId = this.getNodeParameter("fileId", i);
            const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", i);
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "GET", `/files/${fileId}`);
            const fileName = responseData.name;
            let mimeType;
            responseData = await import_GenericFunctions.boxApiRequest.call(
              this,
              "GET",
              `/files/${fileId}/content`,
              {},
              {},
              void 0,
              { encoding: null, resolveWithFullResponse: true }
            );
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
            const data = Buffer.from(responseData.body);
            items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
              data,
              fileName,
              mimeType
            );
          }
          if (operation === "get") {
            const fileId = this.getNodeParameter("fileId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.fields) {
              qs.fields = additionalFields.fields;
            }
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "GET", `/files/${fileId}`, {}, qs);
          }
          if (operation === "search") {
            const query = this.getNodeParameter("query", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const tz = this.getTimezone();
            qs.type = "file";
            qs.query = query;
            Object.assign(qs, additionalFields);
            if (qs.content_types) {
              qs.content_types = qs.content_types.split(",");
            }
            if (additionalFields.createdRangeUi) {
              const createdRangeValues = additionalFields.createdRangeUi.createdRangeValuesUi;
              if (createdRangeValues) {
                const from = import_moment_timezone.default.tz(createdRangeValues.from, tz).format();
                const to = import_moment_timezone.default.tz(createdRangeValues.to, tz).format();
                qs.created_at_range = `${from},${to}`;
              }
              delete qs.createdRangeUi;
            }
            if (additionalFields.updatedRangeUi) {
              const updateRangeValues = additionalFields.updatedRangeUi.updatedRangeValuesUi;
              if (updateRangeValues) {
                qs.updated_at_range = `${import_moment_timezone.default.tz(updateRangeValues.from, tz).format()},${import_moment_timezone.default.tz(updateRangeValues.to, tz).format()}`;
              }
              delete qs.updatedRangeUi;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.boxApiRequestAllItems.call(
                this,
                "entries",
                "GET",
                "/search",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.boxApiRequest.call(this, "GET", "/search", {}, qs);
              responseData = responseData.entries;
            }
          }
          if (operation === "share") {
            const fileId = this.getNodeParameter("fileId", i);
            const role = this.getNodeParameter("role", i);
            const accessibleBy = this.getNodeParameter("accessibleBy", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              accessible_by: {},
              item: {
                id: fileId,
                type: "file"
              },
              role: role === "coOwner" ? "co-owner" : (0, import_change_case.noCase)(role),
              ...options
            };
            if (body.fields) {
              qs.fields = body.fields;
              delete body.fields;
            }
            if (body.expires_at) {
              body.expires_at = import_moment_timezone.default.tz(body.expires_at, timezone).format();
            }
            if (body.notify) {
              qs.notify = body.notify;
              delete body.notify;
            }
            if (accessibleBy === "user") {
              const useEmail = this.getNodeParameter("useEmail", i);
              if (useEmail) {
                body.accessible_by.login = this.getNodeParameter("email", i);
              } else {
                body.accessible_by.id = this.getNodeParameter("userId", i);
              }
            } else {
              body.accessible_by.id = this.getNodeParameter("groupId", i);
            }
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "POST", "/collaborations", body, qs);
          }
          if (operation === "upload") {
            const parentId = this.getNodeParameter("parentId", i);
            const isBinaryData = this.getNodeParameter("binaryData", i);
            const fileName = this.getNodeParameter("fileName", i);
            const attributes = {};
            if (parentId !== "") {
              attributes.parent = { id: parentId };
            } else {
              attributes.parent = { id: 0 };
            }
            if (isBinaryData) {
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
              const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
              const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
                i,
                binaryPropertyName
              );
              const body = {};
              attributes.name = fileName || binaryData.fileName;
              body.attributes = JSON.stringify(attributes);
              body.file = {
                value: binaryDataBuffer,
                options: {
                  filename: binaryData.fileName,
                  contentType: binaryData.mimeType
                }
              };
              responseData = await import_GenericFunctions.boxApiRequest.call(
                this,
                "POST",
                "",
                {},
                {},
                "https://upload.box.com/api/2.0/files/content",
                { formData: body }
              );
              responseData = responseData.entries;
            } else {
              const content = this.getNodeParameter("fileContent", i);
              if (fileName === "") {
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), "File name must be set!", {
                  itemIndex: i
                });
              }
              attributes.name = fileName;
              const body = {};
              body.attributes = JSON.stringify(attributes);
              body.file = {
                value: Buffer.from(content),
                options: {
                  filename: fileName,
                  contentType: "text/plain"
                }
              };
              responseData = await import_GenericFunctions.boxApiRequest.call(
                this,
                "POST",
                "",
                {},
                {},
                "https://upload.box.com/api/2.0/files/content",
                { formData: body }
              );
              responseData = responseData.entries;
            }
          }
        }
        if (resource === "folder") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const parentId = this.getNodeParameter("parentId", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              name
            };
            if (parentId) {
              body.parent = { id: parentId };
            } else {
              body.parent = { id: 0 };
            }
            if (options.access) {
              body.folder_upload_email = {
                access: options.access
              };
            }
            if (options.fields) {
              qs.fields = options.fields;
            }
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "POST", "/folders", body, qs);
          }
          if (operation === "delete") {
            const folderId = this.getNodeParameter("folderId", i);
            const recursive = this.getNodeParameter("recursive", i);
            qs.recursive = recursive;
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "DELETE", `/folders/${folderId}`, qs);
            responseData = { success: true };
          }
          if (operation === "get") {
            const folderId = this.getNodeParameter("folderId", i);
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "GET", `/folders/${folderId}`, qs);
          }
          if (operation === "search") {
            const query = this.getNodeParameter("query", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const tz = this.getTimezone();
            qs.type = "folder";
            qs.query = query;
            Object.assign(qs, additionalFields);
            if (qs.content_types) {
              qs.content_types = qs.content_types.split(",");
            }
            if (additionalFields.createdRangeUi) {
              const createdRangeValues = additionalFields.createdRangeUi.createdRangeValuesUi;
              if (createdRangeValues) {
                qs.created_at_range = `${import_moment_timezone.default.tz(createdRangeValues.from, tz).format()},${import_moment_timezone.default.tz(createdRangeValues.to, tz).format()}`;
              }
              delete qs.createdRangeUi;
            }
            if (additionalFields.updatedRangeUi) {
              const updateRangeValues = additionalFields.updatedRangeUi.updatedRangeValuesUi;
              if (updateRangeValues) {
                qs.updated_at_range = `${import_moment_timezone.default.tz(updateRangeValues.from, tz).format()},${import_moment_timezone.default.tz(updateRangeValues.to, tz).format()}`;
              }
              delete qs.updatedRangeUi;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.boxApiRequestAllItems.call(
                this,
                "entries",
                "GET",
                "/search",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.boxApiRequest.call(this, "GET", "/search", {}, qs);
              responseData = responseData.entries;
            }
          }
          if (operation === "share") {
            const folderId = this.getNodeParameter("folderId", i);
            const role = this.getNodeParameter("role", i);
            const accessibleBy = this.getNodeParameter("accessibleBy", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              accessible_by: {},
              item: {
                id: folderId,
                type: "folder"
              },
              role: role === "coOwner" ? "co-owner" : (0, import_change_case.noCase)(role),
              ...options
            };
            if (body.fields) {
              qs.fields = body.fields;
              delete body.fields;
            }
            if (body.expires_at) {
              body.expires_at = import_moment_timezone.default.tz(body.expires_at, timezone).format();
            }
            if (body.notify) {
              qs.notify = body.notify;
              delete body.notify;
            }
            if (accessibleBy === "user") {
              const useEmail = this.getNodeParameter("useEmail", i);
              if (useEmail) {
                body.accessible_by.login = this.getNodeParameter("email", i);
              } else {
                body.accessible_by.id = this.getNodeParameter("userId", i);
              }
            } else {
              body.accessible_by.id = this.getNodeParameter("groupId", i);
            }
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "POST", "/collaborations", body, qs);
          }
          if (operation === "update") {
            const folderId = this.getNodeParameter("folderId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            if (updateFields.fields) {
              qs.fields = updateFields.fields;
              delete updateFields.fields;
            }
            const body = {
              ...updateFields
            };
            if (body.parentId) {
              body.parent = {
                id: body.parentId
              };
              delete body.parentId;
            }
            if (body.tags) {
              body.tags = body.tags.split(",");
            }
            responseData = await import_GenericFunctions.boxApiRequest.call(this, "PUT", `/folders/${folderId}`, body, qs);
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
    if (resource === "file" && operation === "download") {
      return [items];
    } else {
      return [returnData];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Box
});
//# sourceMappingURL=Box.node.js.map