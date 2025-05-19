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
var Taiga_node_exports = {};
__export(Taiga_node_exports, {
  Taiga: () => Taiga
});
module.exports = __toCommonJS(Taiga_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Taiga {
  constructor() {
    this.description = {
      displayName: "Taiga",
      name: "taiga",
      icon: "file:taiga.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Taiga API",
      defaults: {
        name: "Taiga"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "taigaApi",
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
              name: "Epic",
              value: "epic"
            },
            {
              name: "Issue",
              value: "issue"
            },
            {
              name: "Task",
              value: "task"
            },
            {
              name: "User Story",
              value: "userStory"
            }
          ],
          default: "issue"
        },
        ...import_descriptions.epicOperations,
        ...import_descriptions.epicFields,
        ...import_descriptions.issueOperations,
        ...import_descriptions.issueFields,
        ...import_descriptions.taskOperations,
        ...import_descriptions.taskFields,
        ...import_descriptions.userStoryOperations,
        ...import_descriptions.userStoryFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getEpics() {
          const project = this.getCurrentNodeParameter("projectId");
          const epics = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/epics",
            {},
            { project }
          );
          return epics.map(({ subject, id }) => ({ name: subject, value: id }));
        },
        async getMilestones() {
          const project = this.getCurrentNodeParameter("projectId");
          const milestones = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/milestones",
            {},
            { project }
          );
          return (0, import_GenericFunctions.toOptions)(milestones);
        },
        async getPriorities() {
          const project = this.getCurrentNodeParameter("projectId");
          const priorities = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/priorities",
            {},
            { project }
          );
          return (0, import_GenericFunctions.toOptions)(priorities);
        },
        async getProjects() {
          const { id } = await import_GenericFunctions.taigaApiRequest.call(this, "GET", "/users/me");
          const projects = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/projects",
            {},
            { member: id }
          );
          return (0, import_GenericFunctions.toOptions)(projects);
        },
        async getRoles() {
          const project = this.getCurrentNodeParameter("projectId");
          const roles = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/roles",
            {},
            { project }
          );
          return (0, import_GenericFunctions.toOptions)(roles);
        },
        async getSeverities() {
          const project = this.getCurrentNodeParameter("projectId");
          const severities = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/severities",
            {},
            { project }
          );
          return (0, import_GenericFunctions.toOptions)(severities);
        },
        async getTags() {
          const project = this.getCurrentNodeParameter("projectId");
          const tags = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            `/projects/${project}/tags_colors`
          );
          return Object.keys(tags).map((tag) => ({ name: tag, value: tag }));
        },
        async getTypes() {
          const project = this.getCurrentNodeParameter("projectId");
          const types = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/issue-types",
            {},
            { project }
          );
          return (0, import_GenericFunctions.toOptions)(types);
        },
        async getUsers() {
          const project = this.getCurrentNodeParameter("projectId");
          const users = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/users",
            {},
            { project }
          );
          return users.map(({ full_name_display, id }) => ({ name: full_name_display, value: id }));
        },
        async getUserStories() {
          const project = this.getCurrentNodeParameter("projectId");
          const userStories = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/userstories",
            {},
            { project }
          );
          return userStories.map(({ subject, id }) => ({ name: subject, value: id }));
        },
        // statuses
        async getIssueStatuses() {
          const project = this.getCurrentNodeParameter("projectId");
          const statuses = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/issue-statuses",
            {},
            { project }
          );
          return (0, import_GenericFunctions.toOptions)(statuses);
        },
        async getTaskStatuses() {
          const project = this.getCurrentNodeParameter("projectId");
          const statuses = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/task-statuses",
            {},
            { project }
          );
          return (0, import_GenericFunctions.toOptions)(statuses);
        },
        async getUserStoryStatuses() {
          const project = this.getCurrentNodeParameter("projectId");
          const statuses = await import_GenericFunctions.taigaApiRequest.call(
            this,
            "GET",
            "/userstory-statuses",
            {},
            { project }
          );
          return (0, import_GenericFunctions.toOptions)(statuses);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "epic") {
          if (operation === "create") {
            const body = {
              project: this.getNodeParameter("projectId", i),
              subject: this.getNodeParameter("subject", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "POST", "/epics", body);
          } else if (operation === "delete") {
            const epicId = this.getNodeParameter("epicId", i);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "DELETE", `/epics/${epicId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const epicId = this.getNodeParameter("epicId", i);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "GET", `/epics/${epicId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, filters);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/epics", {}, qs, i);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const epicId = this.getNodeParameter("epicId", i);
            body.version = await import_GenericFunctions.getVersionForUpdate.call(this, `/epics/${epicId}`);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "PATCH", `/epics/${epicId}`, body);
          }
        } else if (resource === "issue") {
          if (operation === "create") {
            const body = {
              project: this.getNodeParameter("projectId", i),
              subject: this.getNodeParameter("subject", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "POST", "/issues", body);
          } else if (operation === "delete") {
            const issueId = this.getNodeParameter("issueId", i);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "DELETE", `/issues/${issueId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const issueId = this.getNodeParameter("issueId", i);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "GET", `/issues/${issueId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, filters);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/issues", {}, qs, i);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const issueId = this.getNodeParameter("issueId", i);
            body.version = await import_GenericFunctions.getVersionForUpdate.call(this, `/issues/${issueId}`);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "PATCH", `/issues/${issueId}`, body);
          }
        } else if (resource === "task") {
          if (operation === "create") {
            const body = {
              project: this.getNodeParameter("projectId", i),
              subject: this.getNodeParameter("subject", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "POST", "/tasks", body);
          } else if (operation === "delete") {
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "DELETE", `/tasks/${taskId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "GET", `/tasks/${taskId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, filters);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/tasks", {}, qs, i);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const taskId = this.getNodeParameter("taskId", i);
            body.version = await import_GenericFunctions.getVersionForUpdate.call(this, `/tasks/${taskId}`);
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "PATCH", `/tasks/${taskId}`, body);
          }
        } else if (resource === "userStory") {
          if (operation === "create") {
            const body = {
              project: this.getNodeParameter("projectId", i),
              subject: this.getNodeParameter("subject", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "POST", "/userstories", body);
          } else if (operation === "delete") {
            const userStoryId = this.getNodeParameter("userStoryId", i);
            const endpoint = `/userstories/${userStoryId}`;
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const userStoryId = this.getNodeParameter("userStoryId", i);
            const endpoint = `/userstories/${userStoryId}`;
            responseData = await import_GenericFunctions.taigaApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, filters);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/userstories", {}, qs, i);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            } else {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const userStoryId = this.getNodeParameter("userStoryId", i);
            body.version = await import_GenericFunctions.getVersionForUpdate.call(this, `/userstories/${userStoryId}`);
            responseData = await import_GenericFunctions.taigaApiRequest.call(
              this,
              "PATCH",
              `/userstories/${userStoryId}`,
              body
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
  Taiga
});
//# sourceMappingURL=Taiga.node.js.map