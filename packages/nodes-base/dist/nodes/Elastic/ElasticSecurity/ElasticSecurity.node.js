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
var ElasticSecurity_node_exports = {};
__export(ElasticSecurity_node_exports, {
  ElasticSecurity: () => ElasticSecurity
});
module.exports = __toCommonJS(ElasticSecurity_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class ElasticSecurity {
  constructor() {
    this.description = {
      displayName: "Elastic Security",
      name: "elasticSecurity",
      icon: "file:elasticSecurity.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Elastic Security API",
      defaults: {
        name: "Elastic Security"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "elasticSecurityApi",
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
              name: "Case",
              value: "case"
            },
            {
              name: "Case Comment",
              value: "caseComment"
            },
            {
              name: "Case Tag",
              value: "caseTag"
            },
            {
              name: "Connector",
              value: "connector"
            }
          ],
          default: "case"
        },
        ...import_descriptions.caseOperations,
        ...import_descriptions.caseFields,
        ...import_descriptions.caseCommentOperations,
        ...import_descriptions.caseCommentFields,
        ...import_descriptions.caseTagOperations,
        ...import_descriptions.caseTagFields,
        ...import_descriptions.connectorOperations,
        ...import_descriptions.connectorFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getTags() {
          const tags = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "GET", "/cases/tags");
          return tags.map((tag) => ({ name: tag, value: tag }));
        },
        async getConnectors() {
          const endpoint = "/cases/configure/connectors/_find";
          const connectors = await import_GenericFunctions.elasticSecurityApiRequest.call(
            this,
            "GET",
            endpoint
          );
          return connectors.map(({ name, id }) => ({ name, value: id }));
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
        if (resource === "case") {
          if (operation === "create") {
            const body = {
              title: this.getNodeParameter("title", i),
              connector: {},
              owner: "securitySolution",
              description: "",
              tags: [],
              // set via `caseTag: add` but must be present
              settings: {
                syncAlerts: this.getNodeParameter("additionalFields.syncAlerts", i, false)
              }
            };
            const connectorId = this.getNodeParameter("connectorId", i);
            const {
              id: fetchedId,
              name: fetchedName,
              type: fetchedType
            } = await import_GenericFunctions.getConnector.call(this, connectorId);
            const selectedConnectorType = this.getNodeParameter(
              "connectorType",
              i
            );
            if (fetchedType !== selectedConnectorType) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Connector Type does not match the type of the connector in Connector Name",
                { itemIndex: i }
              );
            }
            const connector = {
              id: fetchedId,
              name: fetchedName,
              type: fetchedType,
              fields: {}
            };
            if (selectedConnectorType === ".jira") {
              connector.fields = {
                issueType: this.getNodeParameter("issueType", i),
                priority: this.getNodeParameter("priority", i),
                parent: null
                // required but unimplemented
              };
            } else if (selectedConnectorType === ".servicenow") {
              connector.fields = {
                urgency: this.getNodeParameter("urgency", i),
                severity: this.getNodeParameter("severity", i),
                impact: this.getNodeParameter("impact", i),
                category: this.getNodeParameter("category", i),
                subcategory: null
                // required but unimplemented
              };
            } else if (selectedConnectorType === ".resilient") {
              const rawIssueTypes = this.getNodeParameter("issueTypes", i);
              connector.fields = {
                issueTypes: rawIssueTypes.split(",").map(Number),
                severityCode: this.getNodeParameter("severityCode", i),
                incidentTypes: null
                // required but undocumented
              };
            }
            body.connector = connector;
            const {
              syncAlerts,
              // ignored because already set
              ...rest
            } = this.getNodeParameter("additionalFields", i);
            if (Object.keys(rest).length) {
              Object.assign(body, rest);
            }
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "POST", "/cases", body);
          } else if (operation === "delete") {
            const caseId = this.getNodeParameter("caseId", i);
            await import_GenericFunctions.elasticSecurityApiRequest.call(this, "DELETE", `/cases?ids=["${caseId}"]`);
            responseData = { success: true };
          } else if (operation === "get") {
            const caseId = this.getNodeParameter("caseId", i);
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "GET", `/cases/${caseId}`);
          } else if (operation === "getAll") {
            const qs = {};
            const { tags, status } = this.getNodeParameter("filters", i);
            const sortOptions = this.getNodeParameter("sortOptions", i);
            qs.sortField = sortOptions.sortField ?? "createdAt";
            qs.sortOrder = sortOptions.sortOrder ?? "asc";
            if (status) {
              qs.status = status;
            }
            if (tags?.length) {
              qs.tags = tags.join(",");
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/cases/_find", {}, qs);
          } else if (operation === "getStatus") {
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "GET", "/cases/status");
          } else if (operation === "update") {
            const caseId = this.getNodeParameter("caseId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (!Object.keys(updateFields).length) {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const { syncAlerts, ...rest } = updateFields;
            Object.assign(body, {
              cases: [
                {
                  id: caseId,
                  version: await import_GenericFunctions.getVersion.call(this, `/cases/${caseId}`),
                  ...syncAlerts && { settings: { syncAlerts } },
                  ...rest
                }
              ]
            });
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "PATCH", "/cases", body);
          }
        } else if (resource === "caseTag") {
          if (operation === "add") {
            const caseId = this.getNodeParameter("caseId", i);
            const { title, connector, owner, description, settings, tags } = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "GET", `/cases/${caseId}`);
            const tagToAdd = this.getNodeParameter("tag", i);
            if (tags.includes(tagToAdd)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Cannot add tag "${tagToAdd}" to case ID ${caseId} because this case already has this tag.`,
                { itemIndex: i }
              );
            }
            const body = {};
            Object.assign(body, {
              cases: [
                {
                  id: caseId,
                  title,
                  connector,
                  owner,
                  description,
                  settings,
                  version: await import_GenericFunctions.getVersion.call(this, `/cases/${caseId}`),
                  tags: [...tags, tagToAdd]
                }
              ]
            });
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "PATCH", "/cases", body);
          } else if (operation === "remove") {
            const caseId = this.getNodeParameter("caseId", i);
            const tagToRemove = this.getNodeParameter("tag", i);
            const { title, connector, owner, description, settings, tags } = await import_GenericFunctions.elasticSecurityApiRequest.call(
              this,
              "GET",
              `/cases/${caseId}`
            );
            if (!tags.includes(tagToRemove)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Cannot remove tag "${tagToRemove}" from case ID ${caseId} because this case does not have this tag.`,
                { itemIndex: i }
              );
            }
            const body = {};
            Object.assign(body, {
              cases: [
                {
                  id: caseId,
                  title,
                  connector,
                  owner,
                  description,
                  settings,
                  version: await import_GenericFunctions.getVersion.call(this, `/cases/${caseId}`),
                  tags: tags.filter((tag) => tag !== tagToRemove)
                }
              ]
            });
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "PATCH", "/cases", body);
          }
        } else if (resource === "caseComment") {
          if (operation === "add") {
            const simple = this.getNodeParameter("simple", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              comment: this.getNodeParameter("comment", i),
              type: "user",
              owner: additionalFields.owner || "securitySolution"
            };
            const caseId = this.getNodeParameter("caseId", i);
            const endpoint = `/cases/${caseId}/comments`;
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "POST", endpoint, body);
            if (simple) {
              const { comments } = responseData;
              responseData = comments[comments.length - 1];
            }
          } else if (operation === "get") {
            const caseId = this.getNodeParameter("caseId", i);
            const commentId = this.getNodeParameter("commentId", i);
            const endpoint = `/cases/${caseId}/comments/${commentId}`;
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const caseId = this.getNodeParameter("caseId", i);
            const endpoint = `/cases/${caseId}/comments`;
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", endpoint);
          } else if (operation === "remove") {
            const caseId = this.getNodeParameter("caseId", i);
            const commentId = this.getNodeParameter("commentId", i);
            const endpoint = `/cases/${caseId}/comments/${commentId}`;
            await import_GenericFunctions.elasticSecurityApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "update") {
            const simple = this.getNodeParameter("simple", i);
            const caseId = this.getNodeParameter("caseId", i);
            const commentId = this.getNodeParameter("commentId", i);
            const body = {
              comment: this.getNodeParameter("comment", i),
              id: commentId,
              type: "user",
              owner: "securitySolution",
              version: await import_GenericFunctions.getVersion.call(this, `/cases/${caseId}/comments/${commentId}`)
            };
            const patchEndpoint = `/cases/${caseId}/comments`;
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(this, "PATCH", patchEndpoint, body);
            if (simple) {
              const { comments } = responseData;
              responseData = comments[comments.length - 1];
            }
          }
        } else if (resource === "connector") {
          if (operation === "create") {
            const connectorType = this.getNodeParameter("connectorType", i);
            const body = {
              connector_type_id: connectorType,
              name: this.getNodeParameter("name", i)
            };
            if (connectorType === ".jira") {
              body.config = {
                apiUrl: this.getNodeParameter("apiUrl", i),
                projectKey: this.getNodeParameter("projectKey", i)
              };
              body.secrets = {
                email: this.getNodeParameter("email", i),
                apiToken: this.getNodeParameter("apiToken", i)
              };
            } else if (connectorType === ".resilient") {
              body.config = {
                apiUrl: this.getNodeParameter("apiUrl", i),
                orgId: this.getNodeParameter("orgId", i)
              };
              body.secrets = {
                apiKeyId: this.getNodeParameter("apiKeyId", i),
                apiKeySecret: this.getNodeParameter("apiKeySecret", i)
              };
            } else if (connectorType === ".servicenow") {
              body.config = {
                apiUrl: this.getNodeParameter("apiUrl", i)
              };
              body.secrets = {
                username: this.getNodeParameter("username", i),
                password: this.getNodeParameter("password", i)
              };
            }
            responseData = await import_GenericFunctions.elasticSecurityApiRequest.call(
              this,
              "POST",
              "/actions/connector",
              body
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
  ElasticSecurity
});
//# sourceMappingURL=ElasticSecurity.node.js.map