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
var import_luxon = require("luxon");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.groupRLC,
  import_descriptions.planRLC,
  import_descriptions.bucketRLC,
  {
    displayName: "Title",
    name: "title",
    required: true,
    type: "string",
    default: "",
    placeholder: "e.g. new task",
    description: "Title of the task"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    default: {},
    placeholder: "Add option",
    options: [
      {
        ...import_descriptions.memberRLC,
        displayName: "Assigned To",
        name: "assignedTo",
        description: "Who the task should be assigned to",
        typeOptions: {
          loadOptionsDependsOn: ["groupId.balue"]
        }
      },
      {
        displayName: "Due Date Time",
        name: "dueDateTime",
        type: "string",
        validateType: "dateTime",
        default: "",
        description: "Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time."
      },
      {
        displayName: "Percent Complete",
        name: "percentComplete",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 100
        },
        default: 0,
        placeholder: "e.g. 75",
        description: "Percentage of task completion. When set to 100, the task is considered completed."
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["task"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const planId = this.getNodeParameter("planId", i, "", { extractValue: true });
  const bucketId = this.getNodeParameter("bucketId", i, "", { extractValue: true });
  const title = this.getNodeParameter("title", i);
  const options = this.getNodeParameter("options", i);
  const body = {
    planId,
    bucketId,
    title
  };
  if (options.assignedTo) {
    options.assignedTo = this.getNodeParameter("options.assignedTo", i, "", {
      extractValue: true
    });
  }
  if (options.dueDateTime && options.dueDateTime instanceof import_luxon.DateTime) {
    options.dueDateTime = options.dueDateTime.toISO();
  }
  Object.assign(body, options);
  if (body.assignedTo) {
    body.assignments = {
      [body.assignedTo]: {
        "@odata.type": "microsoft.graph.plannerAssignment",
        orderHint: " !"
      }
    };
    delete body.assignedTo;
  }
  return await import_transport.microsoftApiRequest.call(this, "POST", "/v1.0/planner/tasks", body);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map