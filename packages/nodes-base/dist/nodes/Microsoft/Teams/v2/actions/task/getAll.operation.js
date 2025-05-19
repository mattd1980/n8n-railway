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
var getAll_operation_exports = {};
__export(getAll_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getAll_operation_exports);
var import_descriptions = require("../../../../../../utils/descriptions");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions2 = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Tasks For",
    name: "tasksFor",
    default: "member",
    required: true,
    type: "options",
    description: "Whether to retrieve the tasks for a user or for a plan",
    options: [
      {
        name: "Group Member",
        value: "member",
        description: "Tasks assigned to group member"
      },
      {
        name: "Plan",
        value: "plan",
        description: "Tasks in group plan"
      }
    ]
  },
  import_descriptions2.groupRLC,
  {
    ...import_descriptions2.planRLC,
    displayOptions: {
      show: {
        tasksFor: ["plan"]
      }
    }
  },
  ...import_descriptions.returnAllOrLimit
];
const displayOptions = {
  show: {
    resource: ["task"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const tasksFor = this.getNodeParameter("tasksFor", i);
  const returnAll = this.getNodeParameter("returnAll", i);
  if (tasksFor === "member") {
    const memberId = (await import_transport.microsoftApiRequest.call(this, "GET", "/v1.0/me")).id;
    if (returnAll) {
      return await import_transport.microsoftApiRequestAllItems.call(
        this,
        "value",
        "GET",
        `/v1.0/users/${memberId}/planner/tasks`
      );
    } else {
      const limit = this.getNodeParameter("limit", i);
      const responseData = await import_transport.microsoftApiRequestAllItems.call(
        this,
        "value",
        "GET",
        `/v1.0/users/${memberId}/planner/tasks`,
        {}
      );
      return responseData.splice(0, limit);
    }
  } else {
    const planId = this.getNodeParameter("planId", i, "", { extractValue: true });
    if (returnAll) {
      return await import_transport.microsoftApiRequestAllItems.call(
        this,
        "value",
        "GET",
        `/v1.0/planner/plans/${planId}/tasks`
      );
    } else {
      const limit = this.getNodeParameter("limit", i);
      const responseData = await import_transport.microsoftApiRequestAllItems.call(
        this,
        "value",
        "GET",
        `/v1.0/planner/plans/${planId}/tasks`,
        {}
      );
      return responseData.splice(0, limit);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getAll.operation.js.map