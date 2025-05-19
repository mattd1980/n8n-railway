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
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.teamRLC,
  {
    displayName: "New Channel Name",
    name: "name",
    required: true,
    type: "string",
    default: "",
    placeholder: "e.g. My New Channel",
    description: "The name of the new channel you want to create"
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
      },
      {
        displayName: "Type",
        name: "type",
        type: "options",
        options: [
          {
            name: "Private",
            value: "private"
          },
          {
            name: "Standard",
            value: "standard"
          }
        ],
        default: "standard",
        description: "Standard: Accessible to everyone on the team. Private: Accessible only to a specific group of people within the team."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["channel"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const teamId = this.getNodeParameter("teamId", i, "", { extractValue: true });
  const name = this.getNodeParameter("name", i);
  const options = this.getNodeParameter("options", i);
  const body = {
    displayName: name
  };
  if (options.description) {
    body.description = options.description;
  }
  if (options.type) {
    body.membershipType = options.type;
  }
  return await import_transport.microsoftApiRequest.call(this, "POST", `/v1.0/teams/${teamId}/channels`, body);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map