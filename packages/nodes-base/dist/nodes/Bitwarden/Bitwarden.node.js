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
var Bitwarden_node_exports = {};
__export(Bitwarden_node_exports, {
  Bitwarden: () => Bitwarden
});
module.exports = __toCommonJS(Bitwarden_node_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_partialRight = __toESM(require("lodash/partialRight"));
var import_n8n_workflow = require("n8n-workflow");
var import_CollectionDescription = require("./descriptions/CollectionDescription");
var import_EventDescription = require("./descriptions/EventDescription");
var import_GroupDescription = require("./descriptions/GroupDescription");
var import_MemberDescription = require("./descriptions/MemberDescription");
var import_GenericFunctions = require("./GenericFunctions");
class Bitwarden {
  constructor() {
    this.description = {
      displayName: "Bitwarden",
      name: "bitwarden",
      icon: "file:bitwarden.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Bitwarden API",
      defaults: {
        name: "Bitwarden"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "bitwardenApi",
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
              name: "Collection",
              value: "collection"
            },
            {
              name: "Event",
              value: "event"
            },
            {
              name: "Group",
              value: "group"
            },
            {
              name: "Member",
              value: "member"
            }
          ],
          default: "collection"
        },
        ...import_CollectionDescription.collectionOperations,
        ...import_CollectionDescription.collectionFields,
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields,
        ...import_GroupDescription.groupOperations,
        ...import_GroupDescription.groupFields,
        ...import_MemberDescription.memberOperations,
        ...import_MemberDescription.memberFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getGroups() {
          return await import_GenericFunctions.loadResource.call(this, "groups");
        },
        async getCollections() {
          return await import_GenericFunctions.loadResource.call(this, "collections");
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    const token = await import_GenericFunctions.getAccessToken.call(this);
    const bitwardenApiRequest = (0, import_partialRight.default)(import_GenericFunctions.bitwardenApiRequest, token);
    const handleGetAll = (0, import_partialRight.default)(import_GenericFunctions.handleGetAll, token);
    for (let i = 0; i < items.length; i++) {
      if (resource === "collection") {
        if (operation === "delete") {
          const id = this.getNodeParameter("collectionId", i);
          const endpoint = `/public/collections/${id}`;
          responseData = await bitwardenApiRequest.call(this, "DELETE", endpoint, {}, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ success: true }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "get") {
          const id = this.getNodeParameter("collectionId", i);
          const endpoint = `/public/collections/${id}`;
          responseData = await bitwardenApiRequest.call(this, "GET", endpoint, {}, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "getAll") {
          const endpoint = "/public/collections";
          responseData = await handleGetAll.call(this, i, "GET", endpoint, {}, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "update") {
          const updateFields = this.getNodeParameter("updateFields", i);
          if ((0, import_isEmpty.default)(updateFields)) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `Please enter at least one field to update for the ${resource}.`,
              { itemIndex: i }
            );
          }
          const { groups, externalId } = updateFields;
          const body = {};
          if (groups) {
            body.groups = groups.map((groupId) => ({
              id: groupId,
              ReadOnly: false
            }));
          }
          if (externalId) {
            body.externalId = externalId;
          }
          const id = this.getNodeParameter("collectionId", i);
          const endpoint = `/public/collections/${id}`;
          responseData = await bitwardenApiRequest.call(this, "PUT", endpoint, {}, body);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      } else if (resource === "event") {
        if (operation === "getAll") {
          const filters = this.getNodeParameter("filters", i);
          const qs = (0, import_isEmpty.default)(filters) ? {} : filters;
          const endpoint = "/public/events";
          responseData = await handleGetAll.call(this, i, "GET", endpoint, qs, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      } else if (resource === "group") {
        if (operation === "create") {
          const body = {
            name: this.getNodeParameter("name", i),
            AccessAll: this.getNodeParameter("accessAll", i)
          };
          const { collections, externalId } = this.getNodeParameter(
            "additionalFields",
            i
          );
          if (collections) {
            body.collections = collections.map((collectionId) => ({
              id: collectionId,
              ReadOnly: false
            }));
          }
          if (externalId) {
            body.externalId = externalId;
          }
          const endpoint = "/public/groups";
          responseData = await bitwardenApiRequest.call(this, "POST", endpoint, {}, body);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "delete") {
          const id = this.getNodeParameter("groupId", i);
          const endpoint = `/public/groups/${id}`;
          responseData = await bitwardenApiRequest.call(this, "DELETE", endpoint, {}, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ success: true }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "get") {
          const id = this.getNodeParameter("groupId", i);
          const endpoint = `/public/groups/${id}`;
          responseData = await bitwardenApiRequest.call(this, "GET", endpoint, {}, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "getAll") {
          const endpoint = "/public/groups";
          responseData = await handleGetAll.call(this, i, "GET", endpoint, {}, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "getMembers") {
          const id = this.getNodeParameter("groupId", i);
          const endpoint = `/public/groups/${id}/member-ids`;
          responseData = await bitwardenApiRequest.call(this, "GET", endpoint, {}, {});
          responseData = responseData.map((memberId) => ({ memberId }));
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "update") {
          const groupId = this.getNodeParameter("groupId", i);
          const updateFields = this.getNodeParameter("updateFields", i);
          if ((0, import_isEmpty.default)(updateFields)) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `Please enter at least one field to update for the ${resource}.`,
              { itemIndex: i }
            );
          }
          let { name, accessAll } = updateFields;
          if (name === void 0) {
            responseData = await bitwardenApiRequest.call(
              this,
              "GET",
              `/public/groups/${groupId}`,
              {},
              {}
            );
            name = responseData.name;
          }
          if (accessAll === void 0) {
            accessAll = false;
          }
          const body = {
            name,
            AccessAll: accessAll
          };
          const { collections, externalId } = updateFields;
          if (collections) {
            body.collections = collections.map((collectionId) => ({
              id: collectionId,
              ReadOnly: false
            }));
          }
          if (externalId) {
            body.externalId = externalId;
          }
          const endpoint = `/public/groups/${groupId}`;
          responseData = await bitwardenApiRequest.call(this, "PUT", endpoint, {}, body);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "updateMembers") {
          const memberIds = this.getNodeParameter("memberIds", i);
          const body = {
            memberIds: memberIds.includes(",") ? memberIds.split(",") : [memberIds]
          };
          const groupId = this.getNodeParameter("groupId", i);
          const endpoint = `/public/groups/${groupId}/member-ids`;
          responseData = await bitwardenApiRequest.call(this, "PUT", endpoint, {}, body);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ success: true }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      } else if (resource === "member") {
        if (operation === "create") {
          const body = {
            email: this.getNodeParameter("email", i),
            type: this.getNodeParameter("type", i),
            AccessAll: this.getNodeParameter("accessAll", i)
          };
          const { collections, externalId } = this.getNodeParameter(
            "additionalFields",
            i
          );
          if (collections) {
            body.collections = collections.map((collectionId) => ({
              id: collectionId,
              ReadOnly: false
            }));
          }
          if (externalId) {
            body.externalId = externalId;
          }
          const endpoint = "/public/members/";
          responseData = await bitwardenApiRequest.call(this, "POST", endpoint, {}, body);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "delete") {
          const id = this.getNodeParameter("memberId", i);
          const endpoint = `/public/members/${id}`;
          responseData = await bitwardenApiRequest.call(this, "DELETE", endpoint, {}, {});
          responseData = { success: true };
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "get") {
          const id = this.getNodeParameter("memberId", i);
          const endpoint = `/public/members/${id}`;
          responseData = await bitwardenApiRequest.call(this, "GET", endpoint, {}, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "getAll") {
          const endpoint = "/public/members";
          responseData = await handleGetAll.call(this, i, "GET", endpoint, {}, {});
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "getGroups") {
          const id = this.getNodeParameter("memberId", i);
          const endpoint = `/public/members/${id}/group-ids`;
          responseData = await bitwardenApiRequest.call(this, "GET", endpoint, {}, {});
          responseData = responseData.map((groupId) => ({ groupId }));
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "update") {
          const body = {};
          const updateFields = this.getNodeParameter("updateFields", i);
          if ((0, import_isEmpty.default)(updateFields)) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `Please enter at least one field to update for the ${resource}.`,
              { itemIndex: i }
            );
          }
          const { accessAll, collections, externalId, type } = updateFields;
          if (accessAll !== void 0) {
            body.AccessAll = accessAll;
          }
          if (collections) {
            body.collections = collections.map((collectionId) => ({
              id: collectionId,
              ReadOnly: false
            }));
          }
          if (externalId) {
            body.externalId = externalId;
          }
          if (type !== void 0) {
            body.Type = type;
          }
          const id = this.getNodeParameter("memberId", i);
          const endpoint = `/public/members/${id}`;
          responseData = await bitwardenApiRequest.call(this, "PUT", endpoint, {}, body);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (operation === "updateGroups") {
          const groupIds = this.getNodeParameter("groupIds", i);
          const body = {
            groupIds: groupIds.includes(",") ? groupIds.split(",") : [groupIds]
          };
          const memberId = this.getNodeParameter("memberId", i);
          const endpoint = `/public/members/${memberId}/group-ids`;
          responseData = await bitwardenApiRequest.call(this, "PUT", endpoint, {}, body);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ success: true }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bitwarden
});
//# sourceMappingURL=Bitwarden.node.js.map