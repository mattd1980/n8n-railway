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
var Iterable_node_exports = {};
__export(Iterable_node_exports, {
  Iterable: () => Iterable
});
module.exports = __toCommonJS(Iterable_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_EventDescription = require("./EventDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_UserDescription = require("./UserDescription");
var import_UserListDescription = require("./UserListDescription");
class Iterable {
  constructor() {
    this.description = {
      displayName: "Iterable",
      name: "iterable",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:iterable.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Iterable API",
      defaults: {
        name: "Iterable"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "iterableApi",
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
              name: "Event",
              value: "event"
            },
            {
              name: "User",
              value: "user"
            },
            {
              name: "User List",
              value: "userList"
            }
          ],
          default: "user"
        },
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields,
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields,
        ...import_UserListDescription.userListOperations,
        ...import_UserListDescription.userListFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the lists available channels
        async getLists() {
          const { lists } = await import_GenericFunctions.iterableApiRequest.call(this, "GET", "/lists");
          const returnData = [];
          for (const list of lists) {
            returnData.push({
              name: list.name,
              value: list.id
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const timezone = this.getTimezone();
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "event") {
      if (operation === "track") {
        const events = [];
        for (let i = 0; i < length; i++) {
          const name = this.getNodeParameter("name", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          if (!additionalFields.email && !additionalFields.id) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              'Either email or userId must be passed in to identify the user. Please add one of both via "Additional Fields". If both are passed in, email takes precedence.',
              { itemIndex: i }
            );
          }
          const body = {
            eventName: name
          };
          Object.assign(body, additionalFields);
          if (body.dataFieldsUi) {
            const dataFields = body.dataFieldsUi.dataFieldValues;
            const data = {};
            for (const dataField of dataFields) {
              data[dataField.key] = dataField.value;
            }
            body.dataFields = data;
            delete body.dataFieldsUi;
          }
          if (body.createdAt) {
            body.createdAt = import_moment_timezone.default.tz(body.createdAt, timezone).unix();
          }
          events.push(body);
        }
        responseData = await import_GenericFunctions.iterableApiRequest.call(this, "POST", "/events/trackBulk", { events });
        returnData.push(responseData);
      }
    }
    if (resource === "user") {
      if (operation === "upsert") {
        for (let i = 0; i < length; i++) {
          const identifier = this.getNodeParameter("identifier", i);
          const value = this.getNodeParameter("value", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {};
          if (identifier === "email") {
            body.email = value;
          } else {
            body.preferUserId = this.getNodeParameter("preferUserId", i);
            body.userId = value;
          }
          Object.assign(body, additionalFields);
          if (body.dataFieldsUi) {
            const dataFields = body.dataFieldsUi.dataFieldValues;
            const data = {};
            for (const dataField of dataFields) {
              data[dataField.key] = dataField.value;
            }
            body.dataFields = data;
            delete body.dataFieldsUi;
          }
          responseData = await import_GenericFunctions.iterableApiRequest.call(this, "POST", "/users/update", body);
          if (!this.continueOnFail()) {
            if (responseData.code !== "Success") {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Iterable error response [400]: ${responseData.msg}`,
                { itemIndex: i }
              );
            }
          }
          returnData.push(responseData);
        }
      }
      if (operation === "delete") {
        for (let i = 0; i < length; i++) {
          const by = this.getNodeParameter("by", i);
          let endpoint;
          if (by === "email") {
            const email = this.getNodeParameter("email", i);
            endpoint = `/users/${email}`;
          } else {
            const userId = this.getNodeParameter("userId", i);
            endpoint = `/users/byUserId/${userId}`;
          }
          responseData = await import_GenericFunctions.iterableApiRequest.call(this, "DELETE", endpoint);
          if (!this.continueOnFail()) {
            if (responseData.code !== "Success") {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData);
            }
          }
          returnData.push(responseData);
        }
      }
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          const by = this.getNodeParameter("by", i);
          let endpoint;
          if (by === "email") {
            const email = this.getNodeParameter("email", i);
            endpoint = "/users/getByEmail";
            qs.email = email;
          } else {
            const userId = this.getNodeParameter("userId", i);
            endpoint = `/users/byUserId/${userId}`;
          }
          responseData = await import_GenericFunctions.iterableApiRequest.call(this, "GET", endpoint, {}, qs);
          if (!this.continueOnFail()) {
            if (Object.keys(responseData).length === 0) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
                message: "User not found",
                httpCode: "404"
              });
            }
          }
          responseData = responseData.user || {};
          returnData.push(responseData);
        }
      }
    }
    if (resource === "userList") {
      if (operation === "add") {
        const listId = this.getNodeParameter("listId", 0);
        const identifier = this.getNodeParameter("identifier", 0);
        const body = {
          listId: parseInt(listId, 10),
          subscribers: []
        };
        const subscribers = [];
        for (let i = 0; i < length; i++) {
          const value = this.getNodeParameter("value", i);
          if (identifier === "email") {
            subscribers.push({ email: value });
          } else {
            subscribers.push({ userId: value });
          }
        }
        body.subscribers = subscribers;
        responseData = await import_GenericFunctions.iterableApiRequest.call(this, "POST", "/lists/subscribe", body);
        returnData.push(responseData);
      }
      if (operation === "remove") {
        const listId = this.getNodeParameter("listId", 0);
        const identifier = this.getNodeParameter("identifier", 0);
        const additionalFields = this.getNodeParameter("additionalFields", 0);
        const body = {
          listId: parseInt(listId, 10),
          subscribers: [],
          campaignId: additionalFields.campaignId,
          channelUnsubscribe: additionalFields.channelUnsubscribe
        };
        const subscribers = [];
        for (let i = 0; i < length; i++) {
          const value = this.getNodeParameter("value", i);
          if (identifier === "email") {
            subscribers.push({ email: value });
          } else {
            subscribers.push({ userId: value });
          }
        }
        body.subscribers = subscribers;
        responseData = await import_GenericFunctions.iterableApiRequest.call(this, "POST", "/lists/unsubscribe", body);
        returnData.push(responseData);
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Iterable
});
//# sourceMappingURL=Iterable.node.js.map