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
var description_exports = {};
__export(description_exports, {
  userInviteDescription: () => userInviteDescription
});
module.exports = __toCommonJS(description_exports);
const userInviteDescription = [
  {
    displayName: "Team Name or ID",
    name: "teamId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["invite"]
      }
    },
    default: ""
  },
  {
    displayName: "Emails",
    name: "emails",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["user"],
        operation: ["invite"]
      }
    },
    default: "",
    description: "User's email. Multiple emails can be set separated by comma."
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userInviteDescription
});
//# sourceMappingURL=description.js.map