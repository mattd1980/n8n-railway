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
var collaborator_operation_exports = {};
__export(collaborator_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(collaborator_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
const properties = [
  {
    displayName: "Name or email of the collaborator",
    name: "searchString",
    type: "string",
    placeholder: "Enter the name or the email or the collaborator",
    required: true,
    default: "",
    description: "SeaTable identifies users with a unique username like 244b43hr6fy54bb4afa2c2cb7369d244@auth.local. Get this username from an email or the name of a collaborator."
  }
];
const displayOptions = {
  show: {
    resource: ["base"],
    operation: ["collaborator"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const searchString = this.getNodeParameter("searchString", index);
  const collaboratorsResult = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "GET",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/related-users/"
  );
  const collaborators = collaboratorsResult.user_list || [];
  const data = collaborators.filter(
    (col) => col.contact_email.includes(searchString) || col.name.includes(searchString)
  );
  return this.helpers.returnJsonArray(data);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=collaborator.operation.js.map