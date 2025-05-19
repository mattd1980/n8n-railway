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
var save_operation_exports = {};
__export(save_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(save_operation_exports);
var import_GenericFunctions = require("../../GenericFunctions");
var import_transport = require("../../transport");
var import_fields = require("../common/fields");
const description = [
  {
    displayName: "Note: This operation is not needed if you enabled 'Save Profile' in the 'Create Session' operation",
    name: "notice",
    type: "notice",
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["save"]
      }
    },
    default: "This operation will save the profile on session termination"
  },
  {
    ...import_fields.sessionIdField,
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["save"]
      }
    }
  },
  {
    ...import_fields.profileNameField,
    required: true,
    description: 'The name of the <a href="https://docs.airtop.ai/guides/how-to/saving-a-profile" target="_blank">Profile</a> to save',
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["save"]
      }
    },
    hint: 'Name of the profile you want to save. Must consist only of alphanumeric characters and hyphens "-"'
  }
];
async function execute(index) {
  const sessionId = import_GenericFunctions.validateSessionId.call(this, index);
  let profileName = import_GenericFunctions.validateRequiredStringField.call(this, index, "profileName", "Profile Name");
  profileName = import_GenericFunctions.validateProfileName.call(this, index);
  const response = await import_transport.apiRequest.call(
    this,
    "PUT",
    `/sessions/${sessionId}/save-profile-on-termination/${profileName}`
  );
  (0, import_GenericFunctions.validateAirtopApiResponse)(this.getNode(), response);
  return this.helpers.returnJsonArray({ sessionId, profileName, ...response });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=save.operation.js.map