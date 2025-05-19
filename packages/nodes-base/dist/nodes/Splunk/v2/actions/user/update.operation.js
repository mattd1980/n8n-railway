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
var import_utilities = require("../../../../../utils/utilities");
var import_descriptions = require("../../helpers/descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.userRLC,
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Email",
        name: "email",
        type: "string",
        placeholder: "name@email.com",
        default: ""
      },
      {
        displayName: "Full Name",
        name: "realname",
        type: "string",
        default: "",
        description: "Full name of the user"
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Role Names or IDs",
        name: "roles",
        type: "multiOptions",
        description: 'Comma-separated list of roles to assign to the user. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getRoles"
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["user"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const body = {};
  const { roles, ...rest } = this.getNodeParameter("updateFields", i);
  (0, import_utils.populate)(
    {
      ...roles && { roles },
      ...rest
    },
    body
  );
  const userId = this.getNodeParameter("userId", i, "", { extractValue: true });
  const endpoint = `/services/authentication/users/${userId}`;
  const returnData = await import_transport.splunkApiRequest.call(this, "POST", endpoint, body).then(import_utils.formatFeed);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=update.operation.js.map