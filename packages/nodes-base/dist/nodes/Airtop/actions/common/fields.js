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
var fields_exports = {};
__export(fields_exports, {
  SESSION_MODE: () => SESSION_MODE,
  elementDescriptionField: () => elementDescriptionField,
  getSessionModeFields: () => getSessionModeFields,
  outputSchemaField: () => outputSchemaField,
  profileNameField: () => profileNameField,
  sessionIdField: () => sessionIdField,
  urlField: () => urlField,
  windowIdField: () => windowIdField
});
module.exports = __toCommonJS(fields_exports);
const SESSION_MODE = {
  NEW: "new",
  EXISTING: "existing"
};
const sessionIdField = {
  displayName: "Session ID",
  name: "sessionId",
  type: "string",
  required: true,
  default: '={{ $json["sessionId"] }}',
  description: 'The ID of the <a href="https://docs.airtop.ai/guides/how-to/creating-a-session" target="_blank">Session</a> to use'
};
const windowIdField = {
  displayName: "Window ID",
  name: "windowId",
  type: "string",
  required: true,
  default: '={{ $json["windowId"] }}',
  description: 'The ID of the <a href="https://docs.airtop.ai/guides/how-to/creating-a-session#windows" target="_blank">Window</a> to use'
};
const profileNameField = {
  displayName: "Profile Name",
  name: "profileName",
  type: "string",
  default: "",
  description: "The name of the Airtop profile to load or create",
  hint: '<a href="https://docs.airtop.ai/guides/how-to/saving-a-profile" target="_blank">Learn more</a> about Airtop profiles',
  placeholder: "e.g. my-x-profile"
};
const urlField = {
  displayName: "URL",
  name: "url",
  type: "string",
  default: "",
  placeholder: "e.g. https://google.com",
  description: "URL to load in the window"
};
const outputSchemaField = {
  displayName: "JSON Output Schema",
  name: "outputSchema",
  description: "JSON schema defining the structure of the output",
  hint: 'If you want to force your output to be JSON, provide a valid JSON schema describing the output. You can generate one automatically in the <a href="https://portal.airtop.ai/" target="_blank">Airtop API Playground</a>.',
  type: "json",
  default: ""
};
const elementDescriptionField = {
  displayName: "Element Description",
  name: "elementDescription",
  type: "string",
  default: "",
  description: "A specific description of the element to execute the interaction on",
  placeholder: "e.g. the search box at the top of the page"
};
function getSessionModeFields(resource, operations) {
  return [
    {
      displayName: "Session Mode",
      name: "sessionMode",
      type: "options",
      default: "existing",
      description: "Choose between creating a new session or using an existing one",
      options: [
        {
          name: "Automatically Create Session",
          description: "Automatically create a new session and window for this operation",
          value: SESSION_MODE.NEW
        },
        {
          name: "Use Existing Session",
          description: "Use an existing session and window for this operation",
          value: SESSION_MODE.EXISTING
        }
      ],
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations
        }
      }
    },
    {
      ...sessionIdField,
      displayOptions: {
        show: {
          resource: [resource],
          sessionMode: [SESSION_MODE.EXISTING]
        }
      }
    },
    {
      ...windowIdField,
      displayOptions: {
        show: {
          resource: [resource],
          sessionMode: [SESSION_MODE.EXISTING]
        }
      }
    },
    {
      ...urlField,
      required: true,
      displayOptions: {
        show: {
          resource: [resource],
          sessionMode: [SESSION_MODE.NEW]
        }
      }
    },
    {
      ...profileNameField,
      displayOptions: {
        show: {
          resource: [resource],
          sessionMode: [SESSION_MODE.NEW]
        }
      }
    },
    {
      displayName: "Auto-Terminate Session",
      name: "autoTerminateSession",
      type: "boolean",
      default: true,
      description: "Whether to terminate the session after the operation is complete. When disabled, you must manually terminate the session. By default, idle sessions timeout after 10 minutes",
      displayOptions: {
        show: {
          resource: [resource],
          sessionMode: [SESSION_MODE.NEW]
        }
      }
    }
  ];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SESSION_MODE,
  elementDescriptionField,
  getSessionModeFields,
  outputSchemaField,
  profileNameField,
  sessionIdField,
  urlField,
  windowIdField
});
//# sourceMappingURL=fields.js.map