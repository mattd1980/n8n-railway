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
var LinearTrigger_node_exports = {};
__export(LinearTrigger_node_exports, {
  LinearTrigger: () => LinearTrigger
});
module.exports = __toCommonJS(LinearTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class LinearTrigger {
  constructor() {
    this.description = {
      displayName: "Linear Trigger",
      name: "linearTrigger",
      icon: "file:linear.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["triggerOn"]}}',
      description: "Starts the workflow when Linear events occur",
      defaults: {
        name: "Linear Trigger"
      },
      inputs: [],
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
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
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
          displayName: 'Make sure your credential has the "Admin" scope to create webhooks.',
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Team Name or ID",
          name: "teamId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getTeams"
          },
          default: ""
        },
        {
          displayName: "Listen to Resources",
          name: "resources",
          type: "multiOptions",
          options: [
            {
              name: "Comment Reaction",
              value: "reaction"
            },
            {
              name: "Cycle",
              value: "cycle"
            },
            /* It's still on Alpha stage
            {
            	name: 'Issue Attachment',
            	value: 'attachment',
            },*/
            {
              name: "Issue",
              value: "issue"
            },
            {
              name: "Issue Comment",
              value: "comment"
            },
            {
              name: "Issue Label",
              value: "issueLabel"
            },
            {
              name: "Project",
              value: "project"
            }
          ],
          default: [],
          required: true
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getTeams() {
          const returnData = [];
          const body = {
            query: `query Teams {
							 teams {
								nodes {
									id
									name
								}
							}
						}`
          };
          const {
            data: {
              teams: { nodes }
            }
          } = await import_GenericFunctions.linearApiRequest.call(this, body);
          for (const node of nodes) {
            returnData.push({
              name: node.name,
              value: node.id
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const teamId = this.getNodeParameter("teamId");
          const body = {
            query: `query {
							 webhooks {
									nodes {
										id
										url
										enabled
										team {
											id
											name
										}
									}
							}
						}`
          };
          const {
            data: {
              webhooks: { nodes }
            }
          } = await import_GenericFunctions.linearApiRequest.call(this, body);
          for (const node of nodes) {
            if (node.url === webhookUrl && node.team.id === teamId && node.enabled === true) {
              webhookData.webhookId = node.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const teamId = this.getNodeParameter("teamId");
          const resources = this.getNodeParameter("resources");
          const body = {
            query: `
						mutation webhookCreate($url: String!, $teamId: String!, $resources: [String!]!) {
							webhookCreate(
								input: {
									url: $url
									teamId: $teamId
									resourceTypes: $resources
								}
							) {
								success
								webhook {
									id
									enabled
								}
							}
						}`,
            variables: {
              url: webhookUrl,
              teamId,
              resources: resources.map(import_GenericFunctions.capitalizeFirstLetter)
            }
          };
          const {
            data: {
              webhookCreate: {
                success,
                webhook: { id }
              }
            }
          } = await import_GenericFunctions.linearApiRequest.call(this, body);
          if (!success) {
            return false;
          }
          webhookData.webhookId = id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const body = {
              query: `
							mutation webhookDelete($id: String!){
								webhookDelete(
									id: $id
								) {
									success
								}
							}`,
              variables: {
                id: webhookData.webhookId
              }
            };
            try {
              await import_GenericFunctions.linearApiRequest.call(this, body);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const bodyData = this.getBodyData();
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LinearTrigger
});
//# sourceMappingURL=LinearTrigger.node.js.map