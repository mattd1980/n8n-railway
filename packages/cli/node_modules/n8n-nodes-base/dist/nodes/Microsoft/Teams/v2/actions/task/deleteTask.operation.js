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
var deleteTask_operation_exports = {};
__export(deleteTask_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(deleteTask_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Task ID",
    name: "taskId",
    required: true,
    type: "string",
    placeholder: "e.g. h3ufgLvXPkSRzYm-zO5cY5gANtBQ",
    description: "The ID of the task to delete",
    default: ""
  }
];
const displayOptions = {
  show: {
    resource: ["task"],
    operation: ["deleteTask"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const taskId = this.getNodeParameter("taskId", i);
  const task = await import_transport.microsoftApiRequest.call(this, "GET", `/v1.0/planner/tasks/${taskId}`);
  await import_transport.microsoftApiRequest.call(
    this,
    "DELETE",
    `/v1.0/planner/tasks/${taskId}`,
    {},
    {},
    void 0,
    { "If-Match": task["@odata.etag"] }
  );
  return { success: true };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=deleteTask.operation.js.map