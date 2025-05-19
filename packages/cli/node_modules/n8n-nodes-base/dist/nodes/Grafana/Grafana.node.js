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
var Grafana_node_exports = {};
__export(Grafana_node_exports, {
  Grafana: () => Grafana
});
module.exports = __toCommonJS(Grafana_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Grafana {
  constructor() {
    this.description = {
      displayName: "Grafana",
      name: "grafana",
      icon: "file:grafana.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Grafana API",
      defaults: {
        name: "Grafana"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "grafanaApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          noDataExpression: true,
          type: "options",
          options: [
            {
              name: "Dashboard",
              value: "dashboard"
            },
            {
              name: "Team",
              value: "team"
            },
            {
              name: "Team Member",
              value: "teamMember"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "dashboard"
        },
        ...import_descriptions.dashboardOperations,
        ...import_descriptions.dashboardFields,
        ...import_descriptions.teamOperations,
        ...import_descriptions.teamFields,
        ...import_descriptions.teamMemberOperations,
        ...import_descriptions.teamMemberFields,
        ...import_descriptions.userOperations,
        ...import_descriptions.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getDashboards() {
          const dashboards = await import_GenericFunctions.grafanaApiRequest.call(
            this,
            "GET",
            "/search",
            {},
            { qs: "dash-db" }
          );
          return dashboards.map(({ id, title }) => ({ value: id, name: title }));
        },
        async getFolders() {
          const folders = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", "/folders");
          return folders.map(({ id, title }) => ({ value: id, name: title }));
        },
        async getTeams() {
          const res = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", "/teams/search");
          return res.teams.map(({ id, name }) => ({ value: id, name }));
        },
        async getUsers() {
          const users = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", "/org/users");
          return users.map(({ userId, email }) => ({ value: userId, name: email }));
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
        if (resource === "dashboard") {
          if (operation === "create") {
            const body = {
              dashboard: {
                id: null,
                title: this.getNodeParameter("title", i)
              }
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              if (additionalFields.folderId === "") delete additionalFields.folderId;
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "POST", "/dashboards/db", body);
          } else if (operation === "delete") {
            const uidOrUrl = this.getNodeParameter("dashboardUidOrUrl", i);
            const uid = import_GenericFunctions.deriveUid.call(this, uidOrUrl);
            const endpoint = `/dashboards/uid/${uid}`;
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const uidOrUrl = this.getNodeParameter("dashboardUidOrUrl", i);
            const uid = import_GenericFunctions.deriveUid.call(this, uidOrUrl);
            const endpoint = `/dashboards/uid/${uid}`;
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const qs = {
              type: "dash-db"
            };
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, filters);
            }
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              Object.assign(qs, { limit });
            }
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", "/search", {}, qs);
          } else if (operation === "update") {
            const uidOrUrl = this.getNodeParameter("dashboardUidOrUrl", i);
            const uid = import_GenericFunctions.deriveUid.call(this, uidOrUrl);
            await import_GenericFunctions.grafanaApiRequest.call(this, "GET", `/dashboards/uid/${uid}`);
            const body = {
              overwrite: true,
              dashboard: { uid }
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            const { title, ...rest } = updateFields;
            if (!title) {
              const { dashboard } = await import_GenericFunctions.grafanaApiRequest.call(
                this,
                "GET",
                `/dashboards/uid/${uid}`
              );
              body.dashboard.title = dashboard.title;
            } else {
              const dashboards = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", "/search");
              const titles = dashboards.map(({ title: entry }) => entry);
              if (titles.includes(title)) {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), {
                  message: "A dashboard with the same name already exists in the selected folder"
                });
              }
              body.dashboard.title = title;
            }
            if (title) {
              body.dashboard.title = title;
            }
            if (Object.keys(rest).length) {
              if (rest.folderId === "") delete rest.folderId;
              Object.assign(body, rest);
            }
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "POST", "/dashboards/db", body);
          }
        } else if (resource === "team") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "POST", "/teams", body);
          } else if (operation === "delete") {
            const teamId = this.getNodeParameter("teamId", i);
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "DELETE", `/teams/${teamId}`);
          } else if (operation === "get") {
            const teamId = this.getNodeParameter("teamId", i);
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", `/teams/${teamId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, filters);
            }
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", "/teams/search", {}, qs);
            responseData = responseData.teams;
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          } else if (operation === "update") {
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            const body = {};
            const teamId = this.getNodeParameter("teamId", i);
            await import_GenericFunctions.grafanaApiRequest.call(this, "GET", `/teams/${teamId}`);
            if (!updateFields.email) {
              const { email } = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", `/teams/${teamId}`);
              body.email = email;
            }
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "PUT", `/teams/${teamId}`, body);
          }
        } else if (resource === "teamMember") {
          if (operation === "add") {
            const userId = this.getNodeParameter("userId", i);
            const body = {
              userId: parseInt(userId, 10)
            };
            const teamId = this.getNodeParameter("teamId", i);
            const endpoint = `/teams/${teamId}/members`;
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "POST", endpoint, body);
          } else if (operation === "remove") {
            const teamId = this.getNodeParameter("teamId", i);
            const memberId = this.getNodeParameter("memberId", i);
            const endpoint = `/teams/${teamId}/members/${memberId}`;
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "getAll") {
            const teamId = this.getNodeParameter("teamId", i);
            await import_GenericFunctions.grafanaApiRequest.call(this, "GET", `/teams/${teamId}`);
            const endpoint = `/teams/${teamId}/members`;
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", endpoint);
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
        } else if (resource === "user") {
          if (operation === "create") {
            const body = {
              role: this.getNodeParameter("role", i),
              loginOrEmail: this.getNodeParameter("loginOrEmail", i)
            };
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "POST", "/org/users", body);
          } else if (operation === "delete") {
            const userId = this.getNodeParameter("userId", i);
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "DELETE", `/org/users/${userId}`);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.grafanaApiRequest.call(this, "GET", "/org/users");
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            const userId = this.getNodeParameter("userId", i);
            responseData = await import_GenericFunctions.grafanaApiRequest.call(
              this,
              "PATCH",
              `/org/users/${userId}`,
              body
            );
          }
        }
        Array.isArray(responseData) ? returnData.push(...responseData) : returnData.push(responseData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Grafana
});
//# sourceMappingURL=Grafana.node.js.map