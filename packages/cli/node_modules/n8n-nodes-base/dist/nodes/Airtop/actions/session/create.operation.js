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
var import_constants = require("../../constants");
var import_GenericFunctions = require("../../GenericFunctions");
var import_transport = require("../../transport");
var import_fields = require("../common/fields");
const description = [
  {
    ...import_fields.profileNameField,
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Save Profile",
    name: "saveProfileOnTermination",
    type: "boolean",
    default: false,
    description: 'Whether to automatically save the <a href="https://docs.airtop.ai/guides/how-to/saving-a-profile" target="_blank">Airtop profile</a> for this session upon termination',
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Idle Timeout",
    name: "timeoutMinutes",
    type: "number",
    default: 10,
    validateType: "number",
    description: "Minutes to wait before the session is terminated due to inactivity",
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Proxy",
    name: "proxy",
    type: "options",
    default: "none",
    description: "Choose how to configure the proxy for this session",
    options: [
      {
        name: "None",
        value: "none",
        description: "No proxy will be used"
      },
      {
        name: "Integrated",
        value: "integrated",
        description: "Use Airtop-provided proxy"
      },
      {
        name: "Custom",
        value: "custom",
        description: "Configure a custom proxy"
      }
    ],
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Proxy URL",
    name: "proxyUrl",
    type: "string",
    default: "",
    description: "The URL of the proxy to use",
    displayOptions: {
      show: {
        proxy: ["custom"]
      }
    }
  }
];
async function execute(index) {
  const url = `${import_constants.INTEGRATION_URL}/create-session`;
  const profileName = import_GenericFunctions.validateProfileName.call(this, index);
  const timeoutMinutes = import_GenericFunctions.validateTimeoutMinutes.call(this, index);
  const saveProfileOnTermination = import_GenericFunctions.validateSaveProfileOnTermination.call(this, index, profileName);
  const proxyParam = this.getNodeParameter("proxy", index, "none");
  const proxyUrl = import_GenericFunctions.validateProxyUrl.call(this, index, proxyParam);
  const body = {
    configuration: {
      profileName,
      timeoutMinutes,
      proxy: proxyParam === "custom" ? proxyUrl : Boolean(proxyParam === "integrated")
    }
  };
  const response = await import_transport.apiRequest.call(this, "POST", url, body);
  const sessionId = response.sessionId;
  (0, import_GenericFunctions.validateAirtopApiResponse)(this.getNode(), response);
  if (saveProfileOnTermination) {
    await import_transport.apiRequest.call(
      this,
      "PUT",
      `/sessions/${sessionId}/save-profile-on-termination/${profileName}`
    );
  }
  return this.helpers.returnJsonArray({ sessionId });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map