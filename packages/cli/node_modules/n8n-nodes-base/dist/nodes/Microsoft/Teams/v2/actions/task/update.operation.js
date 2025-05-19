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
var import_luxon = require("luxon");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Task ID",
    name: "taskId",
    required: true,
    type: "string",
    default: "",
    placeholder: "e.g. h3ufgLvXPkSRzYm-zO5cY5gANtBQ",
    description: "The ID of the task to update"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    options: [
      {
        ...import_descriptions.memberRLC,
        displayName: "Assigned To",
        name: "assignedTo",
        description: "Who the task should be assigned to",
        hint: "Select 'Team' from options first",
        required: false,
        typeOptions: {
          loadOptionsDependsOn: ["updateFields.groupId.value"]
        }
      },
      {
        ...import_descriptions.bucketRLC,
        required: false,
        typeOptions: {
          loadOptionsDependsOn: ["updateFields.planId.value"]
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
        ...import_descriptions.groupRLC,
        required: false,
        typeOptions: {
          loadOptionsDependsOn: ["/groupSource"]
        }
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
      },
      {
        ...import_descriptions.planRLC,
        required: false,
        hint: "Select 'Team' from options first",
        typeOptions: {
          loadOptionsDependsOn: ["updateFields.groupId.value"]
        }
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        placeholder: "e.g. my task",
        description: "Title of the task"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["task"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const taskId = this.getNodeParameter("taskId", i, "", { extractValue: true });
  const updateFields = this.getNodeParameter("updateFields", i);
  for (const key of Object.keys(updateFields)) {
    if (key === "groupId") {
      delete updateFields.groupId;
      continue;
    }
    if (key === "assignedTo") {
      const assignedTo = this.getNodeParameter("updateFields.assignedTo", i, "", {
        extractValue: true
      });
      updateFields.assignments = {
        [assignedTo]: {
          "@odata.type": "microsoft.graph.plannerAssignment",
          orderHint: " !"
        }
      };
      delete updateFields.assignedTo;
      continue;
    }
    if (["bucketId", "planId"].includes(key)) {
      updateFields[key] = this.getNodeParameter(`updateFields.${key}`, i, "", {
        extractValue: true
      });
    }
    if (key === "dueDateTime" && updateFields.dueDateTime instanceof import_luxon.DateTime) {
      updateFields.dueDateTime = updateFields.dueDateTime.toISO();
    }
  }
  const body = {};
  Object.assign(body, updateFields);
  const task = await import_transport.microsoftApiRequest.call(this, "GET", `/v1.0/planner/tasks/${taskId}`);
  await import_transport.microsoftApiRequest.call(
    this,
    "PATCH",
    `/v1.0/planner/tasks/${taskId}`,
    body,
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
//# sourceMappingURL=update.operation.js.map