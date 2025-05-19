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
var Onfleet_node_exports = {};
__export(Onfleet_node_exports, {
  Onfleet: () => Onfleet
});
module.exports = __toCommonJS(Onfleet_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AdministratorDescription = require("./descriptions/AdministratorDescription");
var import_ContainerDescription = require("./descriptions/ContainerDescription");
var import_DestinationDescription = require("./descriptions/DestinationDescription");
var import_HubDescription = require("./descriptions/HubDescription");
var import_OrganizationDescription = require("./descriptions/OrganizationDescription");
var import_RecipientDescription = require("./descriptions/RecipientDescription");
var import_TaskDescription = require("./descriptions/TaskDescription");
var import_TeamDescription = require("./descriptions/TeamDescription");
var import_WorkerDescription = require("./descriptions/WorkerDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_Onfleet = require("./Onfleet");
class Onfleet {
  constructor() {
    this.description = {
      displayName: "Onfleet",
      name: "onfleet",
      icon: "file:Onfleet.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Onfleet API",
      defaults: {
        name: "Onfleet"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "onfleetApi",
          required: true,
          testedBy: "onfleetApiTest"
        }
      ],
      properties: [
        // List of option resources
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Admin",
              value: "admin"
            },
            {
              name: "Container",
              value: "container"
            },
            {
              name: "Destination",
              value: "destination"
            },
            {
              name: "Hub",
              value: "hub"
            },
            {
              name: "Organization",
              value: "organization"
            },
            {
              name: "Recipient",
              value: "recipient"
            },
            {
              name: "Task",
              value: "task"
            },
            {
              name: "Team",
              value: "team"
            },
            // {
            // 	name: 'Webhook',
            // 	value: 'webhook',
            // },
            {
              name: "Worker",
              value: "worker"
            }
          ],
          default: "task",
          description: "The resource to perform operations on"
        },
        // Operations & fields
        ...import_AdministratorDescription.adminOperations,
        ...import_AdministratorDescription.adminFields,
        ...import_ContainerDescription.containerOperations,
        ...import_ContainerDescription.containerFields,
        ...import_DestinationDescription.destinationOperations,
        ...import_DestinationDescription.destinationFields,
        ...import_HubDescription.hubOperations,
        ...import_HubDescription.hubFields,
        ...import_OrganizationDescription.organizationOperations,
        ...import_OrganizationDescription.organizationFields,
        ...import_RecipientDescription.recipientOperations,
        ...import_RecipientDescription.recipientFields,
        ...import_TaskDescription.taskOperations,
        ...import_TaskDescription.taskFields,
        ...import_TeamDescription.teamOperations,
        ...import_TeamDescription.teamFields,
        // ...webhookOperations,
        // ...webhookFields,
        ...import_WorkerDescription.workerOperations,
        ...import_WorkerDescription.workerFields
      ]
    };
    this.methods = {
      credentialTest: {
        async onfleetApiTest(credential) {
          const credentials = credential.data;
          const options = {
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "n8n-onfleet"
            },
            auth: {
              user: credentials.apiKey,
              pass: ""
            },
            method: "GET",
            uri: "https://onfleet.com/api/v2/auth/test",
            json: true
          };
          try {
            await this.helpers.request(options);
            return {
              status: "OK",
              message: "Authentication successful"
            };
          } catch (error) {
            return {
              status: "Error",
              message: `Auth settings are not valid: ${error}`
            };
          }
        }
      },
      loadOptions: import_GenericFunctions.resourceLoaders
    };
  }
  async execute() {
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const items = this.getInputData();
    const operations = {
      task: import_Onfleet.Onfleet.executeTaskOperations,
      destination: import_Onfleet.Onfleet.executeDestinationOperations,
      organization: import_Onfleet.Onfleet.executeOrganizationOperations,
      admin: import_Onfleet.Onfleet.executeAdministratorOperations,
      recipient: import_Onfleet.Onfleet.executeRecipientOperations,
      hub: import_Onfleet.Onfleet.executeHubOperations,
      worker: import_Onfleet.Onfleet.executeWorkerOperations,
      webhook: import_Onfleet.Onfleet.executeWebhookOperations,
      container: import_Onfleet.Onfleet.executeContainerOperations,
      team: import_Onfleet.Onfleet.executeTeamOperations
    };
    const responseData = await operations[resource].call(this, `${resource}s`, operation, items);
    return [this.helpers.returnJsonArray(responseData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Onfleet
});
//# sourceMappingURL=Onfleet.node.js.map