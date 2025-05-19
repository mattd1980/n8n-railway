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
var GoogleTasks_node_exports = {};
__export(GoogleTasks_node_exports, {
  GoogleTasks: () => GoogleTasks
});
module.exports = __toCommonJS(GoogleTasks_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_TaskDescription = require("./TaskDescription");
class GoogleTasks {
  constructor() {
    this.description = {
      displayName: "Google Tasks",
      name: "googleTasks",
      icon: "file:googleTasks.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Google Tasks API",
      defaults: {
        name: "Google Tasks"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googleTasksOAuth2Api",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Task",
              value: "task"
            }
          ],
          default: "task"
        },
        ...import_TaskDescription.taskOperations,
        ...import_TaskDescription.taskFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the tasklists to display them to user so that they can select them easily
        async getTasks() {
          const returnData = [];
          const tasks = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "items",
            "GET",
            "/tasks/v1/users/@me/lists"
          );
          for (const task of tasks) {
            const taskName = task.title;
            const taskId = task.id;
            returnData.push({
              name: taskName,
              value: taskId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let body = {};
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "task") {
          if (operation === "create") {
            body = {};
            const taskId = this.getNodeParameter("task", i);
            body.title = this.getNodeParameter("title", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.parent) {
              qs.parent = additionalFields.parent;
            }
            if (additionalFields.previous) {
              qs.previous = additionalFields.previous;
            }
            if (additionalFields.status) {
              body.status = additionalFields.status;
            }
            if (additionalFields.notes) {
              body.notes = additionalFields.notes;
            }
            if (additionalFields.dueDate) {
              body.due = additionalFields.dueDate;
            }
            if (additionalFields.completed) {
              body.completed = additionalFields.completed;
            }
            if (additionalFields.deleted) {
              body.deleted = additionalFields.deleted;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              `/tasks/v1/lists/${taskId}/tasks`,
              body,
              qs
            );
          }
          if (operation === "delete") {
            const taskListId = this.getNodeParameter("task", i);
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "DELETE",
              `/tasks/v1/lists/${taskListId}/tasks/${taskId}`,
              {}
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const taskListId = this.getNodeParameter("task", i);
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              `/tasks/v1/lists/${taskListId}/tasks/${taskId}`,
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const taskListId = this.getNodeParameter("task", i);
            const {
              showCompleted = true,
              showDeleted = false,
              showHidden = false,
              ...options
            } = this.getNodeParameter("additionalFields", i);
            if (options.completedMax) {
              qs.completedMax = options.completedMax;
            }
            if (options.completedMin) {
              qs.completedMin = options.completedMin;
            }
            if (options.dueMin) {
              qs.dueMin = options.dueMin;
            }
            if (options.dueMax) {
              qs.dueMax = options.dueMax;
            }
            qs.showCompleted = showCompleted;
            qs.showDeleted = showDeleted;
            qs.showHidden = showHidden;
            if (options.updatedMin) {
              qs.updatedMin = options.updatedMin;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "items",
                "GET",
                `/tasks/v1/lists/${taskListId}/tasks`,
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                `/tasks/v1/lists/${taskListId}/tasks`,
                {},
                qs
              );
              responseData = responseData.items;
            }
          }
          if (operation === "update") {
            body = {};
            const taskListId = this.getNodeParameter("task", i);
            const taskId = this.getNodeParameter("taskId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            if (updateFields.previous) {
              qs.previous = updateFields.previous;
            }
            if (updateFields.status) {
              body.status = updateFields.status;
            }
            if (updateFields.notes) {
              body.notes = updateFields.notes;
            }
            if (updateFields.title) {
              body.title = updateFields.title;
            }
            if (updateFields.dueDate) {
              body.due = updateFields.dueDate;
            }
            if (updateFields.completed) {
              body.completed = updateFields.completed;
            }
            if (updateFields.deleted) {
              body.deleted = updateFields.deleted;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PATCH",
              `/tasks/v1/lists/${taskListId}/tasks/${taskId}`,
              body,
              qs
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleTasks
});
//# sourceMappingURL=GoogleTasks.node.js.map