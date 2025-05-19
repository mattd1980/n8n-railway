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
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Name",
    name: "name",
    description: "Login name of the user",
    type: "string",
    required: true,
    default: ""
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
    displayName: "Roles",
    name: "roles",
    type: "multiOptions",
    description: 'Comma-separated list of roles to assign to the user. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    required: true,
    default: ["user"],
    typeOptions: {
      loadOptionsMethod: "getRoles"
    }
  },
  {
    displayName: "Password",
    name: "password",
    type: "string",
    typeOptions: { password: true },
    required: true,
    default: ""
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
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
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["user"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const roles = this.getNodeParameter("roles", i);
  const body = {
    name: this.getNodeParameter("name", i),
    roles,
    password: this.getNodeParameter("password", i)
  };
  const additionalFields = this.getNodeParameter("additionalFields", i);
  (0, import_utils.populate)(additionalFields, body);
  const endpoint = "/services/authentication/users";
  const responseData = await import_transport.splunkApiRequest.call(
    this,
    "POST",
    endpoint,
    body
  );
  const returnData = (0, import_utils.formatFeed)(responseData);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map