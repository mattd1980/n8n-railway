"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var MicrosoftToDo_node_exports = {};
__export(MicrosoftToDo_node_exports, {
  MicrosoftToDo: () => MicrosoftToDo
});
module.exports = __toCommonJS(MicrosoftToDo_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_LinkedResourceDescription = require("./LinkedResourceDescription");
var import_ListDescription = require("./ListDescription");
var import_TaskDescription = require("./TaskDescription");
class MicrosoftToDo {
  constructor() {
    this.description = {
      displayName: "Microsoft To Do",
      name: "microsoftToDo",
      icon: "file:todo.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Microsoft To Do API.",
      defaults: {
        name: "Microsoft To Do"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "microsoftToDoOAuth2Api",
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
              name: "Linked Resource",
              value: "linkedResource"
            },
            {
              name: "List",
              value: "list"
            },
            {
              name: "Task",
              value: "task"
            }
          ],
          default: "task"
        },
        ...import_LinkedResourceDescription.linkedResourceOperations,
        ...import_LinkedResourceDescription.linkedResourceFields,
        ...import_TaskDescription.taskOperations,
        ...import_TaskDescription.taskFields,
        ...import_ListDescription.listOperations,
        ...import_ListDescription.listFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the team's channels to display them to user so that they can
        // select them easily
        async getTaskLists() {
          const returnData = [];
          const lists = await import_GenericFunctions.microsoftApiRequestAllItems.call(this, "value", "GET", "/todo/lists");
          for (const list of lists) {
            returnData.push({
              name: list.displayName,
              value: list.id
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
    const timezone = this.getTimezone();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "linkedResource") {
          if (operation === "create") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const taskId = this.getNodeParameter("taskId", i);
            const body = {
              applicationName: this.getNodeParameter("applicationName", i),
              displayName: this.getNodeParameter("displayName", i),
              ...this.getNodeParameter("additionalFields", i)
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/todo/lists/${taskListId}/tasks/${taskId}/linkedResources`,
              body,
              qs
            );
          } else if (operation === "delete") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const taskId = this.getNodeParameter("taskId", i);
            const linkedResourceId = this.getNodeParameter("linkedResourceId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "DELETE",
              `/todo/lists/${taskListId}/tasks/${taskId}/linkedResources/${linkedResourceId}`,
              void 0,
              qs
            );
            responseData = { success: true };
          } else if (operation === "get") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const taskId = this.getNodeParameter("taskId", i);
            const linkedResourceId = this.getNodeParameter("linkedResourceId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/todo/lists/${taskListId}/tasks/${taskId}/linkedResources/${linkedResourceId}`,
              void 0,
              qs
            );
          } else if (operation === "getAll") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const taskId = this.getNodeParameter("taskId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                `/todo/lists/${taskListId}/tasks/${taskId}/linkedResources`,
                void 0,
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                `/todo/lists/${taskListId}/tasks/${taskId}/linkedResources`,
                void 0,
                qs
              );
              responseData = responseData.value;
            }
          } else if (operation === "update") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const taskId = this.getNodeParameter("taskId", i);
            const linkedResourceId = this.getNodeParameter("linkedResourceId", i);
            const body = {
              ...this.getNodeParameter("updateFields", i)
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "PATCH",
              `/todo/lists/${taskListId}/tasks/${taskId}/linkedResources/${linkedResourceId}`,
              body,
              qs
            );
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not supported!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "task") {
          if (operation === "create") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const body = {
              title: this.getNodeParameter("title", i),
              ...this.getNodeParameter("additionalFields", i)
            };
            if (body.content) {
              body.body = {
                content: body.content,
                contentType: "html"
              };
            }
            if (body.dueDateTime) {
              body.dueDateTime = {
                dateTime: import_moment_timezone.default.tz(body.dueDateTime, timezone).format(),
                timeZone: timezone
              };
            }
            if (body.reminderDateTime) {
              body.reminderDateTime = {
                dateTime: import_moment_timezone.default.tz(body.reminderDateTime, timezone).format(),
                timeZone: timezone
              };
              body.isReminderOn = true;
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "POST",
              `/todo/lists/${taskListId}/tasks`,
              body,
              qs
            );
          } else if (operation === "delete") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "DELETE",
              `/todo/lists/${taskListId}/tasks/${taskId}`,
              void 0,
              qs
            );
            responseData = { success: true };
          } else if (operation === "get") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/todo/lists/${taskListId}/tasks/${taskId}`,
              void 0,
              qs
            );
          } else if (operation === "getAll") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                `/todo/lists/${taskListId}/tasks/`,
                void 0,
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                `/todo/lists/${taskListId}/tasks/`,
                void 0,
                qs
              );
              responseData = responseData.value;
            }
          } else if (operation === "update") {
            const taskListId = this.getNodeParameter("taskListId", i);
            const taskId = this.getNodeParameter("taskId", i);
            const body = {
              ...this.getNodeParameter("updateFields", i)
            };
            if (body.content) {
              body.body = {
                content: body.content,
                contentType: "html"
              };
            }
            if (body.dueDateTime) {
              body.dueDateTime = {
                dateTime: import_moment_timezone.default.tz(body.dueDateTime, timezone).format(),
                timeZone: timezone
              };
            }
            if (body.reminderDateTime) {
              body.reminderDateTime = {
                dateTime: import_moment_timezone.default.tz(body.reminderDateTime, timezone).format(),
                timeZone: timezone
              };
              body.isReminderOn = true;
            } else {
              body.isReminderOn = false;
            }
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "PATCH",
              `/todo/lists/${taskListId}/tasks/${taskId}`,
              body,
              qs
            );
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not supported!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "list") {
          if (operation === "create") {
            const body = {
              displayName: this.getNodeParameter("displayName", i)
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(this, "POST", "/todo/lists/", body, qs);
          } else if (operation === "delete") {
            const listId = this.getNodeParameter("listId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "DELETE",
              `/todo/lists/${listId}`,
              void 0,
              qs
            );
            responseData = { success: true };
          } else if (operation === "get") {
            const listId = this.getNodeParameter("listId", i);
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "GET",
              `/todo/lists/${listId}`,
              void 0,
              qs
            );
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.microsoftApiRequestAllItems.call(
                this,
                "value",
                "GET",
                "/todo/lists",
                void 0,
                qs
              );
            } else {
              qs.$top = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.microsoftApiRequest.call(
                this,
                "GET",
                "/todo/lists",
                void 0,
                qs
              );
              responseData = responseData.value;
            }
          } else if (operation === "update") {
            const listId = this.getNodeParameter("listId", i);
            const body = {
              displayName: this.getNodeParameter("displayName", i)
            };
            responseData = await import_GenericFunctions.microsoftApiRequest.call(
              this,
              "PATCH",
              `/todo/lists/${listId}`,
              body,
              qs
            );
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not supported!`,
              { itemIndex: i }
            );
          }
        }
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
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftToDo
});
//# sourceMappingURL=MicrosoftToDo.node.js.map