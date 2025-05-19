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
var Flow_node_exports = {};
__export(Flow_node_exports, {
  Flow: () => Flow
});
module.exports = __toCommonJS(Flow_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_TaskDescription = require("./TaskDescription");
class Flow {
  constructor() {
    this.description = {
      displayName: "Flow",
      name: "flow",
      icon: "file:flow.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Flow API",
      defaults: {
        name: "Flow"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "flowApi",
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
              value: "task",
              description: "Tasks are units of work that can be private or assigned to a list. Through this endpoint, you can manipulate your tasks in Flow, including creating new ones."
            }
          ],
          default: "task"
        },
        ...import_TaskDescription.taskOperations,
        ...import_TaskDescription.taskFields
      ]
    };
  }
  async execute() {
    const credentials = await this.getCredentials("flowApi");
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "task") {
        if (operation === "create") {
          const workspaceId = this.getNodeParameter("workspaceId", i);
          const name = this.getNodeParameter("name", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            organization_id: credentials.organizationId
          };
          const task = {
            name,
            workspace_id: parseInt(workspaceId, 10)
          };
          if (additionalFields.ownerId) {
            task.owner_id = parseInt(additionalFields.ownerId, 10);
          }
          if (additionalFields.listId) {
            task.list_id = parseInt(additionalFields.listId, 10);
          }
          if (additionalFields.startsOn) {
            task.starts_on = additionalFields.startsOn;
          }
          if (additionalFields.dueOn) {
            task.due_on = additionalFields.dueOn;
          }
          if (additionalFields.mirrorParentSubscribers) {
            task.mirror_parent_subscribers = additionalFields.mirrorParentSubscribers;
          }
          if (additionalFields.mirrorParentTags) {
            task.mirror_parent_tags = additionalFields.mirrorParentTags;
          }
          if (additionalFields.noteContent) {
            task.note_content = additionalFields.noteContent;
          }
          if (additionalFields.noteMimeType) {
            task.note_mime_type = additionalFields.noteMimeType;
          }
          if (additionalFields.parentId) {
            task.parent_id = parseInt(additionalFields.parentId, 10);
          }
          if (additionalFields.positionList) {
            task.position_list = additionalFields.positionList;
          }
          if (additionalFields.positionUpcoming) {
            task.position_upcoming = additionalFields.positionUpcoming;
          }
          if (additionalFields.position) {
            task.position = additionalFields.position;
          }
          if (additionalFields.sectionId) {
            task.section_id = additionalFields.sectionId;
          }
          if (additionalFields.tags) {
            task.tags = additionalFields.tags.split(",");
          }
          body.task = task;
          try {
            responseData = await import_GenericFunctions.flowApiRequest.call(this, "POST", "/tasks", body);
            responseData = responseData.task;
          } catch (error) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
        }
        if (operation === "update") {
          const workspaceId = this.getNodeParameter("workspaceId", i);
          const taskId = this.getNodeParameter("taskId", i);
          const updateFields = this.getNodeParameter("updateFields", i);
          const body = {
            organization_id: credentials.organizationId
          };
          const task = {
            workspace_id: parseInt(workspaceId, 10),
            id: parseInt(taskId, 10)
          };
          if (updateFields.name) {
            task.name = updateFields.name;
          }
          if (updateFields.ownerId) {
            task.owner_id = parseInt(updateFields.ownerId, 10);
          }
          if (updateFields.listId) {
            task.list_id = parseInt(updateFields.listId, 10);
          }
          if (updateFields.startsOn) {
            task.starts_on = updateFields.startsOn;
          }
          if (updateFields.dueOn) {
            task.due_on = updateFields.dueOn;
          }
          if (updateFields.mirrorParentSubscribers) {
            task.mirror_parent_subscribers = updateFields.mirrorParentSubscribers;
          }
          if (updateFields.mirrorParentTags) {
            task.mirror_parent_tags = updateFields.mirrorParentTags;
          }
          if (updateFields.noteContent) {
            task.note_content = updateFields.noteContent;
          }
          if (updateFields.noteMimeType) {
            task.note_mime_type = updateFields.noteMimeType;
          }
          if (updateFields.parentId) {
            task.parent_id = parseInt(updateFields.parentId, 10);
          }
          if (updateFields.positionList) {
            task.position_list = updateFields.positionList;
          }
          if (updateFields.positionUpcoming) {
            task.position_upcoming = updateFields.positionUpcoming;
          }
          if (updateFields.position) {
            task.position = updateFields.position;
          }
          if (updateFields.sectionId) {
            task.section_id = updateFields.sectionId;
          }
          if (updateFields.tags) {
            task.tags = updateFields.tags.split(",");
          }
          if (updateFields.completed) {
            task.completed = updateFields.completed;
          }
          body.task = task;
          try {
            responseData = await import_GenericFunctions.flowApiRequest.call(this, "PUT", `/tasks/${taskId}`, body);
            responseData = responseData.task;
          } catch (error) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
        }
        if (operation === "get") {
          const taskId = this.getNodeParameter("taskId", i);
          const filters = this.getNodeParameter("filters", i);
          qs.organization_id = credentials.organizationId;
          if (filters.include) {
            qs.include = filters.include.join(",");
          }
          try {
            responseData = await import_GenericFunctions.flowApiRequest.call(this, "GET", `/tasks/${taskId}`, {}, qs);
          } catch (error) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("filters", i);
          qs.organization_id = credentials.organizationId;
          if (filters.include) {
            qs.include = filters.include.join(",");
          }
          if (filters.order) {
            qs.order = filters.order;
          }
          if (filters.workspaceId) {
            qs.workspace_id = filters.workspaceId;
          }
          if (filters.createdBefore) {
            qs.created_before = filters.createdBefore;
          }
          if (filters.createdAfter) {
            qs.created_after = filters.createdAfter;
          }
          if (filters.updateBefore) {
            qs.updated_before = filters.updateBefore;
          }
          if (filters.updateAfter) {
            qs.updated_after = filters.updateAfter;
          }
          if (filters.deleted) {
            qs.deleted = filters.deleted;
          }
          if (filters.cleared) {
            qs.cleared = filters.cleared;
          }
          try {
            if (returnAll) {
              responseData = await import_GenericFunctions.FlowApiRequestAllItems.call(
                this,
                "tasks",
                "GET",
                "/tasks",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.flowApiRequest.call(this, "GET", "/tasks", {}, qs);
              responseData = responseData.tasks;
            }
          } catch (error) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error, { itemIndex: i });
          }
        }
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
  Flow
});
//# sourceMappingURL=Flow.node.js.map