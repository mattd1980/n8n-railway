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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(create_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
var import_transport = require("../../transport");
var import_fields = require("../common/fields");
const description = [
  {
    ...import_fields.urlField,
    description: "Initial URL to load in the window. Defaults to https://www.google.com.",
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["create"]
      }
    }
  },
  // Live View Options
  {
    displayName: "Get Live View",
    name: "getLiveView",
    type: "boolean",
    default: false,
    description: `Whether to get the URL of the window's <a href="https://docs.airtop.ai/guides/how-to/creating-a-live-view" target="_blank">Live View</a>`,
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Include Navigation Bar",
    name: "includeNavigationBar",
    type: "boolean",
    default: false,
    description: "Whether to include the navigation bar in the Live View. When enabled, the navigation bar will be visible allowing you to navigate between pages.",
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["create"],
        getLiveView: [true]
      }
    }
  },
  {
    displayName: "Screen Resolution",
    name: "screenResolution",
    type: "string",
    default: "",
    description: "The screen resolution of the Live View. Setting a resolution will force the window to open at that specific size.",
    placeholder: "e.g. 1280x720",
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["create"],
        getLiveView: [true]
      }
    }
  },
  {
    displayName: "Disable Resize",
    name: "disableResize",
    type: "boolean",
    default: false,
    description: "Whether to disable the window from being resized in the Live View",
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["create"],
        getLiveView: [true]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["window"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Wait Until",
        name: "waitUntil",
        type: "options",
        description: "Wait until the specified loading event occurs",
        default: "load",
        options: [
          {
            name: "Load",
            value: "load",
            description: "Wait until the page dom and it's assets have loaded"
          },
          {
            name: "DOM Content Loaded",
            value: "domContentLoaded",
            description: "Wait until the page DOM has loaded"
          },
          {
            name: "Complete",
            value: "complete",
            description: "Wait until all iframes in the page have loaded"
          },
          {
            name: "No Wait",
            value: "noWait",
            description: "Do not wait for any loading event and it will return immediately"
          }
        ]
      }
    ]
  }
];
async function execute(index) {
  const sessionId = import_GenericFunctions.validateSessionId.call(this, index);
  const url = import_GenericFunctions.validateUrl.call(this, index);
  const additionalFields = this.getNodeParameter("additionalFields", index);
  const getLiveView = this.getNodeParameter("getLiveView", index, false);
  const includeNavigationBar = this.getNodeParameter("includeNavigationBar", index, false);
  const screenResolution = import_GenericFunctions.validateScreenResolution.call(this, index);
  const disableResize = this.getNodeParameter("disableResize", index, false);
  let response;
  const body = {
    url,
    ...additionalFields
  };
  response = await import_transport.apiRequest.call(this, "POST", `/sessions/${sessionId}/windows`, body);
  if (!response?.data?.windowId) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), {
      message: "Failed to create window",
      code: 500
    });
  }
  const windowId = String(response.data.windowId);
  if (getLiveView) {
    response = await import_transport.apiRequest.call(
      this,
      "GET",
      `/sessions/${sessionId}/windows/${windowId}`,
      void 0,
      {
        ...includeNavigationBar && { includeNavigationBar: true },
        ...screenResolution && { screenResolution },
        ...disableResize && { disableResize: true }
      }
    );
  }
  (0, import_GenericFunctions.validateAirtopApiResponse)(this.getNode(), response);
  return this.helpers.returnJsonArray({ sessionId, windowId, ...response });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map