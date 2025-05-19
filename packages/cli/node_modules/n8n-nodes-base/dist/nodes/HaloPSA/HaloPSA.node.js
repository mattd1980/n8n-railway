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
var HaloPSA_node_exports = {};
__export(HaloPSA_node_exports, {
  HaloPSA: () => HaloPSA
});
module.exports = __toCommonJS(HaloPSA_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class HaloPSA {
  constructor() {
    this.description = {
      displayName: "HaloPSA",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-name-miscased
      name: "haloPSA",
      icon: "file:halopsa.svg",
      group: ["input"],
      version: 1,
      description: "Consume HaloPSA API",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "HaloPSA"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "haloPSAApi",
          required: true,
          testedBy: "haloPSAApiCredentialTest"
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
              name: "Client",
              value: "client"
            },
            {
              name: "Site",
              value: "site"
            },
            {
              name: "Ticket",
              value: "ticket"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "client",
          required: true
        },
        ...import_descriptions.clientOperations,
        ...import_descriptions.clientFields,
        ...import_descriptions.ticketOperations,
        ...import_descriptions.ticketFields,
        ...import_descriptions.siteOperations,
        ...import_descriptions.siteFields,
        ...import_descriptions.userOperations,
        ...import_descriptions.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getHaloPSASites() {
          const tokens = await import_GenericFunctions.getAccessTokens.call(this);
          const response = await import_GenericFunctions.haloPSAApiRequestAllItems.call(
            this,
            "sites",
            "GET",
            "/site",
            tokens.access_token
          );
          const options = response.map((site) => {
            return {
              name: site.clientsite_name,
              value: site.id
            };
          });
          return options.sort((a, b) => a.name.localeCompare(b.name));
        },
        async getHaloPSAClients() {
          const tokens = await import_GenericFunctions.getAccessTokens.call(this);
          const response = await import_GenericFunctions.haloPSAApiRequestAllItems.call(
            this,
            "clients",
            "GET",
            "/Client",
            tokens.access_token
          );
          const options = response.map((client) => {
            return {
              name: client.name,
              value: client.id
            };
          });
          return options.sort((a, b) => a.name.localeCompare(b.name));
        },
        async getHaloPSATicketsTypes() {
          const tokens = await import_GenericFunctions.getAccessTokens.call(this);
          const response = await import_GenericFunctions.haloPSAApiRequest.call(
            this,
            "GET",
            "/TicketType",
            tokens.access_token,
            {}
          );
          const options = response.map((ticket) => {
            return {
              name: ticket.name,
              value: ticket.id
            };
          });
          return options.filter((ticket) => {
            if (
              // folowing types throws error 400 - "CODE:APP03/2 Please select the CAB members to approve"
              ticket.name.includes("Request") || ticket.name.includes("Offboarding") || ticket.name.includes("Onboarding") || ticket.name.includes("Other Hardware") || ticket.name.includes("Software Change")
            ) {
              return false;
            }
            return true;
          }).sort((a, b) => a.name.localeCompare(b.name));
        },
        async getHaloPSAAgents() {
          const tokens = await import_GenericFunctions.getAccessTokens.call(this);
          const response = await import_GenericFunctions.haloPSAApiRequest.call(
            this,
            "GET",
            "/agent",
            tokens.access_token,
            {}
          );
          const options = response.map((agent) => {
            return {
              name: agent.name,
              value: agent.id
            };
          });
          return options.sort((a, b) => a.name.localeCompare(b.name));
        }
      },
      credentialTest: {
        async haloPSAApiCredentialTest(credential) {
          try {
            await import_GenericFunctions.validateCredentials.call(this, credential.data);
          } catch (error) {
            return {
              status: "Error",
              message: error.message
            };
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const tokens = await import_GenericFunctions.getAccessTokens.call(this);
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "client") {
          const simplifiedOutput = ["id", "name", "notes", "is_vip", "website"];
          if (operation === "create") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const name = this.getNodeParameter("clientName", i);
            const body = {
              name,
              ...additionalFields
            };
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "POST",
              "/client",
              tokens.access_token,
              [body]
            );
          }
          if (operation === "delete") {
            const clientId = this.getNodeParameter("clientId", i);
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "DELETE",
              `/client/${clientId}`,
              tokens.access_token
            );
          }
          if (operation === "get") {
            const clientId = this.getNodeParameter("clientId", i);
            const simplify = this.getNodeParameter("simplify", i);
            const response = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "GET",
              `/client/${clientId}`,
              tokens.access_token
            );
            responseData = simplify ? (0, import_GenericFunctions.simplifyHaloPSAGetOutput)([response], simplifiedOutput) : response;
          }
          if (operation === "getAll") {
            const filters = this.getNodeParameter("filters", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const simplify = this.getNodeParameter("simplify", i);
            const qs = {};
            let response;
            Object.assign(qs, filters, (0, import_GenericFunctions.qsSetStatus)(filters.activeStatus));
            if (returnAll) {
              response = await import_GenericFunctions.haloPSAApiRequestAllItems.call(
                this,
                "clients",
                "GET",
                "/client",
                tokens.access_token,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.count = limit;
              const { clients } = await import_GenericFunctions.haloPSAApiRequest.call(
                this,
                "GET",
                "/client",
                tokens.access_token,
                {},
                qs
              );
              response = clients;
            }
            responseData = simplify ? (0, import_GenericFunctions.simplifyHaloPSAGetOutput)(response, simplifiedOutput) : response;
          }
          if (operation === "update") {
            const clientId = this.getNodeParameter("clientId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: clientId,
              ...updateFields
            };
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "POST",
              "/client",
              tokens.access_token,
              [body]
            );
          }
        }
        if (resource === "site") {
          const simplifiedOutput = [
            "id",
            "name",
            "client_id",
            "maincontact_name",
            "notes",
            "phonenumber"
          ];
          if (operation === "create") {
            const name = this.getNodeParameter("siteName", i);
            const clientId = this.getNodeParameter("clientId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name,
              client_id: clientId,
              ...additionalFields
            };
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "POST",
              "/site",
              tokens.access_token,
              [body]
            );
          }
          if (operation === "delete") {
            const siteId = this.getNodeParameter("siteId", i);
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "DELETE",
              `/site/${siteId}`,
              tokens.access_token
            );
          }
          if (operation === "get") {
            const siteId = this.getNodeParameter("siteId", i);
            const simplify = this.getNodeParameter("simplify", i);
            const response = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "GET",
              `/site/${siteId}`,
              tokens.access_token
            );
            responseData = simplify ? (0, import_GenericFunctions.simplifyHaloPSAGetOutput)([response], simplifiedOutput) : response;
          }
          if (operation === "getAll") {
            const filters = this.getNodeParameter("filters", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const simplify = this.getNodeParameter("simplify", i);
            const qs = {};
            let response;
            Object.assign(qs, filters, (0, import_GenericFunctions.qsSetStatus)(filters.activeStatus));
            if (returnAll) {
              response = await import_GenericFunctions.haloPSAApiRequestAllItems.call(
                this,
                "sites",
                "GET",
                "/site",
                tokens.access_token,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.count = limit;
              const { sites } = await import_GenericFunctions.haloPSAApiRequest.call(
                this,
                "GET",
                "/site",
                tokens.access_token,
                {},
                qs
              );
              response = sites;
            }
            responseData = simplify ? (0, import_GenericFunctions.simplifyHaloPSAGetOutput)(response, simplifiedOutput) : response;
          }
          if (operation === "update") {
            const siteId = this.getNodeParameter("siteId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: siteId,
              ...updateFields
            };
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "POST",
              "/site",
              tokens.access_token,
              [body]
            );
          }
        }
        if (resource === "ticket") {
          const simplifiedOutput = [
            "id",
            "summary",
            "details",
            "agent_id",
            "startdate",
            "targetdate"
          ];
          if (operation === "create") {
            const summary = this.getNodeParameter("summary", i);
            const details = this.getNodeParameter("details", i);
            const ticketType = this.getNodeParameter("ticketType", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              tickettype_id: ticketType,
              summary,
              details,
              ...additionalFields
            };
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "POST",
              "/tickets",
              tokens.access_token,
              [body]
            );
          }
          if (operation === "delete") {
            const ticketId = this.getNodeParameter("ticketId", i);
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "DELETE",
              `/tickets/${ticketId}`,
              tokens.access_token
            );
          }
          if (operation === "get") {
            const ticketId = this.getNodeParameter("ticketId", i);
            const simplify = this.getNodeParameter("simplify", i);
            const response = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "GET",
              `/tickets/${ticketId}`,
              tokens.access_token
            );
            responseData = simplify ? (0, import_GenericFunctions.simplifyHaloPSAGetOutput)([response], simplifiedOutput) : response;
          }
          if (operation === "getAll") {
            const filters = this.getNodeParameter("filters", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const simplify = this.getNodeParameter("simplify", i);
            const qs = {};
            let response;
            Object.assign(qs, filters, (0, import_GenericFunctions.qsSetStatus)(filters.activeStatus));
            if (returnAll) {
              response = await import_GenericFunctions.haloPSAApiRequestAllItems.call(
                this,
                "tickets",
                "GET",
                "/tickets",
                tokens.access_token,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.count = limit;
              const { tickets } = await import_GenericFunctions.haloPSAApiRequest.call(
                this,
                "GET",
                "/tickets",
                tokens.access_token,
                {},
                qs
              );
              response = tickets;
            }
            responseData = simplify ? (0, import_GenericFunctions.simplifyHaloPSAGetOutput)(response, simplifiedOutput) : response;
          }
          if (operation === "update") {
            const ticketId = this.getNodeParameter("ticketId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: ticketId,
              ...updateFields
            };
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "POST",
              "/tickets",
              tokens.access_token,
              [body]
            );
          }
        }
        if (resource === "user") {
          const simplifiedOutput = [
            "id",
            "name",
            "site_id",
            "emailaddress",
            "notes",
            "surname",
            "inactive"
          ];
          if (operation === "create") {
            const name = this.getNodeParameter("userName", i);
            const siteId = this.getNodeParameter("siteId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name,
              site_id: siteId,
              ...additionalFields
            };
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "POST",
              "/users",
              tokens.access_token,
              [body]
            );
          }
          if (operation === "delete") {
            const userId = this.getNodeParameter("userId", i);
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "DELETE",
              `/users/${userId}`,
              tokens.access_token
            );
          }
          if (operation === "get") {
            const userId = this.getNodeParameter("userId", i);
            const simplify = this.getNodeParameter("simplify", i);
            const response = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "GET",
              `/users/${userId}`,
              tokens.access_token
            );
            responseData = simplify ? (0, import_GenericFunctions.simplifyHaloPSAGetOutput)([response], simplifiedOutput) : response;
          }
          if (operation === "getAll") {
            const filters = this.getNodeParameter("filters", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const simplify = this.getNodeParameter("simplify", i);
            const qs = {};
            let response;
            Object.assign(qs, filters, (0, import_GenericFunctions.qsSetStatus)(filters.activeStatus));
            if (returnAll) {
              response = await import_GenericFunctions.haloPSAApiRequestAllItems.call(
                this,
                "users",
                "GET",
                "/users",
                tokens.access_token,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.count = limit;
              const { users } = await import_GenericFunctions.haloPSAApiRequest.call(
                this,
                "GET",
                "/users",
                tokens.access_token,
                {},
                qs
              );
              response = users;
            }
            responseData = simplify ? (0, import_GenericFunctions.simplifyHaloPSAGetOutput)(response, simplifiedOutput) : response;
          }
          if (operation === "update") {
            const userId = this.getNodeParameter("userId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              id: userId,
              ...updateFields
            };
            responseData = await import_GenericFunctions.haloPSAApiRequest.call(
              this,
              "POST",
              "/users",
              tokens.access_token,
              [body]
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
  HaloPSA
});
//# sourceMappingURL=HaloPSA.node.js.map