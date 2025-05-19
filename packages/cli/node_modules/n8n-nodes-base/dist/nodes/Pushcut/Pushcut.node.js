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
var Pushcut_node_exports = {};
__export(Pushcut_node_exports, {
  Pushcut: () => Pushcut
});
module.exports = __toCommonJS(Pushcut_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Pushcut {
  constructor() {
    this.description = {
      displayName: "Pushcut",
      name: "pushcut",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:pushcut.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Pushcut API",
      defaults: {
        name: "Pushcut"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "pushcutApi",
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
              name: "Notification",
              value: "notification"
            }
          ],
          default: "notification"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["notification"]
            }
          },
          options: [
            {
              name: "Send",
              value: "send",
              description: "Send a notification",
              action: "Send a notification"
            }
          ],
          default: "send"
        },
        {
          displayName: "Notification Name or ID",
          name: "notificationName",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getNotifications"
          },
          displayOptions: {
            show: {
              resource: ["notification"],
              operation: ["send"]
            }
          },
          default: ""
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["notification"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Device Names or IDs",
              name: "devices",
              type: "multiOptions",
              typeOptions: {
                loadOptionsMethod: "getDevices"
              },
              default: [],
              description: 'List of devices this notification is sent to. (default is all devices). Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            },
            {
              displayName: "Input",
              name: "input",
              type: "string",
              default: "",
              description: "Value that is passed as input to the notification action"
            },
            {
              displayName: "Text",
              name: "text",
              type: "string",
              default: "",
              description: "Text that is used instead of the one defined in the app"
            },
            {
              displayName: "Title",
              name: "title",
              type: "string",
              default: "",
              description: "Title that is used instead of the one defined in the app"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available devices to display them to user so that they can
        // select them easily
        async getDevices() {
          const returnData = [];
          const devices = await import_GenericFunctions.pushcutApiRequest.call(this, "GET", "/devices");
          for (const device of devices) {
            returnData.push({
              name: device.id,
              value: device.id
            });
          }
          return returnData;
        },
        // Get all the available notifications to display them to user so that they can
        // select them easily
        async getNotifications() {
          const returnData = [];
          const notifications = await import_GenericFunctions.pushcutApiRequest.call(this, "GET", "/notifications");
          for (const notification of notifications) {
            returnData.push({
              name: notification.title,
              value: notification.id
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
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "notification") {
        if (operation === "send") {
          const notificationName = this.getNodeParameter("notificationName", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {};
          Object.assign(body, additionalFields);
          responseData = await import_GenericFunctions.pushcutApiRequest.call(
            this,
            "POST",
            `/notifications/${encodeURI(notificationName)}`,
            body
          );
        }
      }
    }
    if (Array.isArray(responseData)) {
      returnData.push.apply(returnData, responseData);
    } else if (responseData !== void 0) {
      returnData.push(responseData);
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pushcut
});
//# sourceMappingURL=Pushcut.node.js.map