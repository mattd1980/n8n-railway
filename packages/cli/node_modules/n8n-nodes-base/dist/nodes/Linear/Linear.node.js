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
var Linear_node_exports = {};
__export(Linear_node_exports, {
  Linear: () => Linear
});
module.exports = __toCommonJS(Linear_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_IssueDescription = require("./IssueDescription");
var import_Queries = require("./Queries");
class Linear {
  constructor() {
    this.description = {
      displayName: "Linear",
      name: "linear",
      icon: "file:linear.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Linear API",
      defaults: {
        name: "Linear"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "linearApi",
          required: true,
          testedBy: "linearApiTest",
          displayOptions: {
            show: {
              authentication: ["apiToken"]
            }
          }
        },
        {
          name: "linearOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "API Token",
              value: "apiToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Issue",
              value: "issue"
            }
          ],
          default: "issue"
        },
        ...import_IssueDescription.issueOperations,
        ...import_IssueDescription.issueFields
      ]
    };
    this.methods = {
      credentialTest: {
        async linearApiTest(credential) {
          try {
            await import_GenericFunctions.validateCredentials.call(this, credential.data);
          } catch (error) {
            const { error: err } = error;
            const errors = err.errors;
            const authenticationError = Boolean(
              errors.filter((e) => e.extensions.code === "AUTHENTICATION_ERROR").length
            );
            if (authenticationError) {
              return {
                status: "Error",
                message: "The security token included in the request is invalid"
              };
            }
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      },
      loadOptions: {
        async getTeams() {
          const returnData = [];
          const body = {
            query: import_Queries.query.getTeams(),
            variables: {
              $first: 10
            }
          };
          const teams = await import_GenericFunctions.linearApiRequestAllItems.call(this, "data.teams", body);
          for (const team of teams) {
            returnData.push({
              name: team.name,
              value: team.id
            });
          }
          return returnData;
        },
        async getUsers() {
          const returnData = [];
          const body = {
            query: import_Queries.query.getUsers(),
            variables: {
              $first: 10
            }
          };
          const users = await import_GenericFunctions.linearApiRequestAllItems.call(this, "data.users", body);
          for (const user of users) {
            returnData.push({
              name: user.name,
              value: user.id
            });
          }
          return returnData;
        },
        async getStates() {
          let teamId = this.getNodeParameter("teamId", null);
          if (!teamId) {
            const updateFields = this.getNodeParameter("updateFields", null);
            if (!updateFields.teamId) {
              const issueId = this.getNodeParameter("issueId");
              const body2 = {
                query: import_Queries.query.getIssueTeam(),
                variables: {
                  issueId
                }
              };
              const responseData = await import_GenericFunctions.linearApiRequest.call(this, body2);
              teamId = responseData?.data?.issue?.team?.id;
            } else {
              teamId = updateFields.teamId;
            }
          }
          const returnData = [];
          const body = {
            query: import_Queries.query.getStates(),
            variables: {
              $first: 10,
              filter: {
                team: {
                  id: {
                    eq: teamId
                  }
                }
              }
            }
          };
          const states = await import_GenericFunctions.linearApiRequestAllItems.call(this, "data.workflowStates", body);
          for (const state of states) {
            returnData.push({
              name: state.name,
              value: state.id
            });
          }
          return returnData.sort(import_GenericFunctions.sort);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "issue") {
          if (operation === "create") {
            const teamId = this.getNodeParameter("teamId", i);
            const title = this.getNodeParameter("title", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              query: import_Queries.query.createIssue(),
              variables: {
                teamId,
                title,
                ...additionalFields
              }
            };
            responseData = await import_GenericFunctions.linearApiRequest.call(this, body);
            responseData = responseData.data.issueCreate?.issue;
          }
          if (operation === "delete") {
            const issueId = this.getNodeParameter("issueId", i);
            const body = {
              query: import_Queries.query.deleteIssue(),
              variables: {
                issueId
              }
            };
            responseData = await import_GenericFunctions.linearApiRequest.call(this, body);
            responseData = responseData?.data?.issueDelete;
          }
          if (operation === "get") {
            const issueId = this.getNodeParameter("issueId", i);
            const body = {
              query: import_Queries.query.getIssue(),
              variables: {
                issueId
              }
            };
            responseData = await import_GenericFunctions.linearApiRequest.call(this, body);
            responseData = responseData.data.issue;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const body = {
              query: import_Queries.query.getIssues(),
              variables: {
                first: 50
              }
            };
            if (returnAll) {
              responseData = await import_GenericFunctions.linearApiRequestAllItems.call(this, "data.issues", body);
            } else {
              const limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.linearApiRequestAllItems.call(this, "data.issues", body, limit);
            }
          }
          if (operation === "update") {
            const issueId = this.getNodeParameter("issueId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              query: import_Queries.query.updateIssue(),
              variables: {
                issueId,
                ...updateFields
              }
            };
            responseData = await import_GenericFunctions.linearApiRequest.call(this, body);
            responseData = responseData?.data?.issueUpdate?.issue;
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
  Linear
});
//# sourceMappingURL=Linear.node.js.map