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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(update_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.teamRLC,
  import_descriptions.channelRLC,
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    placeholder: "e.g. My New Channel name",
    description: "The name of the channel"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    default: {},
    placeholder: "Add option",
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "The description of the channel",
        typeOptions: {
          rows: 2
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["channel"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const teamId = this.getNodeParameter("teamId", i, "", { extractValue: true });
  const channelId = this.getNodeParameter("channelId", i, "", { extractValue: true });
  const newName = this.getNodeParameter("name", i);
  const newDescription = this.getNodeParameter("options.description", i, "");
  const body = {};
  if (newName) {
    body.displayName = newName;
  }
  if (newDescription) {
    body.description = newDescription;
  }
  await import_transport.microsoftApiRequest.call(
    this,
    "PATCH",
    `/v1.0/teams/${teamId}/channels/${channelId}`,
    body
  );
  return { success: true };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=update.operation.js.map