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
var Zammad_node_exports = {};
__export(Zammad_node_exports, {
  Zammad: () => Zammad
});
module.exports = __toCommonJS(Zammad_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Zammad {
  constructor() {
    this.description = {
      displayName: "Zammad",
      name: "zammad",
      icon: "file:zammad.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Zammad API",
      defaults: {
        name: "Zammad"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "zammadBasicAuthApi",
          required: true,
          testedBy: "zammadBasicAuthApiTest",
          displayOptions: {
            show: {
              authentication: ["basicAuth"]
            }
          }
        },
        {
          name: "zammadTokenAuthApi",
          required: true,
          testedBy: "zammadTokenAuthApiTest",
          displayOptions: {
            show: {
              authentication: ["tokenAuth"]
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
              name: "Basic Auth",
              value: "basicAuth"
            },
            {
              name: "Token Auth",
              value: "tokenAuth"
            }
          ],
          default: "tokenAuth"
        },
        {
          displayName: "Resource",
          name: "resource",
          noDataExpression: true,
          type: "options",
          options: [
            {
              name: "Group",
              value: "group"
            },
            {
              name: "Organization",
              value: "organization"
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
          default: "user"
        },
        ...import_descriptions.groupDescription,
        ...import_descriptions.organizationDescription,
        ...import_descriptions.ticketDescription,
        ...import_descriptions.userDescription
      ]
    };
    this.methods = {
      loadOptions: {
        // ----------------------------------
        //          custom fields
        // ----------------------------------
        async loadGroupCustomFields() {
          const allFields = await import_GenericFunctions.getAllFields.call(this);
          return (0, import_GenericFunctions.getGroupCustomFields)(allFields).map(import_GenericFunctions.fieldToLoadOption);
        },
        async loadOrganizationCustomFields() {
          const allFields = await import_GenericFunctions.getAllFields.call(this);
          return (0, import_GenericFunctions.getOrganizationCustomFields)(allFields).map(import_GenericFunctions.fieldToLoadOption);
        },
        async loadUserCustomFields() {
          const allFields = await import_GenericFunctions.getAllFields.call(this);
          return (0, import_GenericFunctions.getUserCustomFields)(allFields).map(import_GenericFunctions.fieldToLoadOption);
        },
        async loadTicketCustomFields() {
          const allFields = await import_GenericFunctions.getAllFields.call(this);
          return (0, import_GenericFunctions.getTicketCustomFields)(allFields).map((i) => ({ name: i.name, value: i.id }));
        },
        // ----------------------------------
        //          built-in fields
        // ----------------------------------
        async loadGroupFields() {
          const allFields = await import_GenericFunctions.getAllFields.call(this);
          return (0, import_GenericFunctions.getGroupFields)(allFields).map(import_GenericFunctions.fieldToLoadOption);
        },
        async loadOrganizationFields() {
          const allFields = await import_GenericFunctions.getAllFields.call(this);
          return (0, import_GenericFunctions.getOrganizationFields)(allFields).map(import_GenericFunctions.fieldToLoadOption);
        },
        async loadTicketFields() {
          const allFields = await import_GenericFunctions.getAllFields.call(this);
          return (0, import_GenericFunctions.getTicketFields)(allFields).map(import_GenericFunctions.fieldToLoadOption);
        },
        async loadUserFields() {
          const allFields = await import_GenericFunctions.getAllFields.call(this);
          return (0, import_GenericFunctions.getUserFields)(allFields).map(import_GenericFunctions.fieldToLoadOption);
        },
        // ----------------------------------
        //             resources
        // ----------------------------------
        // by non-ID attribute
        /**
         * POST /tickets requires group name instead of group ID.
         */
        async loadGroupNames() {
          const groups = await import_GenericFunctions.zammadApiRequest.call(this, "GET", "/groups");
          return groups.map((i) => ({ name: i.name, value: i.name }));
        },
        /**
         * PUT /users requires organization name instead of organization ID.
         */
        async loadOrganizationNames() {
          const orgs = await import_GenericFunctions.zammadApiRequest.call(
            this,
            "GET",
            "/organizations"
          );
          return orgs.filter(import_GenericFunctions.isNotZammadFoundation).map((i) => ({ name: i.name, value: i.name }));
        },
        /**
         * POST & PUT /tickets requires customer email instead of customer ID.
         */
        async loadCustomerEmails() {
          const users = await import_GenericFunctions.zammadApiRequest.call(this, "GET", "/users");
          return users.filter(import_GenericFunctions.isCustomer).map((i) => ({ name: i.email, value: i.email }));
        },
        // by ID
        async loadGroups() {
          const groups = await import_GenericFunctions.zammadApiRequest.call(this, "GET", "/groups");
          return groups.map((i) => ({ name: i.name, value: i.id }));
        },
        async loadOrganizations() {
          const orgs = await import_GenericFunctions.zammadApiRequest.call(
            this,
            "GET",
            "/organizations"
          );
          return orgs.filter(import_GenericFunctions.isNotZammadFoundation).map((i) => ({ name: i.name, value: i.id }));
        },
        async loadUsers() {
          const users = await import_GenericFunctions.zammadApiRequest.call(this, "GET", "/users");
          return users.filter(import_GenericFunctions.doesNotBelongToZammad).map((i) => ({ name: i.login, value: i.id }));
        }
      },
      credentialTest: {
        async zammadBasicAuthApiTest(credential) {
          const credentials = credential.data;
          const baseUrl = (0, import_GenericFunctions.tolerateTrailingSlash)(credentials.baseUrl);
          const options = {
            method: "GET",
            uri: `${baseUrl}/api/v1/users/me`,
            json: true,
            rejectUnauthorized: !credentials.allowUnauthorizedCerts,
            auth: {
              user: credentials.username,
              pass: credentials.password
            }
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
              message: error.message
            };
          }
        },
        async zammadTokenAuthApiTest(credential) {
          const credentials = credential.data;
          const baseUrl = (0, import_GenericFunctions.tolerateTrailingSlash)(credentials.baseUrl);
          const options = {
            method: "GET",
            uri: `${baseUrl}/api/v1/users/me`,
            json: true,
            rejectUnauthorized: !credentials.allowUnauthorizedCerts,
            headers: {
              Authorization: `Token token=${credentials.accessToken}`
            }
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
              message: error.message
            };
          }
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "user") {
          if (operation === "create") {
            const body = {
              firstname: this.getNodeParameter("firstname", i),
              lastname: this.getNodeParameter("lastname", i)
            };
            const { addressUi, customFieldsUi, ...rest } = this.getNodeParameter(
              "additionalFields",
              i
            );
            Object.assign(body, addressUi?.addressDetails);
            customFieldsUi?.customFieldPairs.forEach((pair) => {
              body[pair.name] = pair.value;
            });
            Object.assign(body, rest);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "POST", "/users", body);
          } else if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const body = {};
            const updateFields = this.getNodeParameter(
              "updateFields",
              i
            );
            if (!Object.keys(updateFields).length) {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const { addressUi, customFieldsUi, ...rest } = updateFields;
            Object.assign(body, addressUi?.addressDetails);
            customFieldsUi?.customFieldPairs.forEach((pair) => {
              body[pair.name] = pair.value;
            });
            Object.assign(body, rest);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "PUT", `/users/${id}`, body);
          } else if (operation === "delete") {
            const id = this.getNodeParameter("id", i);
            await import_GenericFunctions.zammadApiRequest.call(this, "DELETE", `/users/${id}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "GET", `/users/${id}`);
          } else if (operation === "getAll") {
            const qs = {};
            const { sortUi, ...rest } = this.getNodeParameter(
              "filters",
              i
            );
            Object.assign(qs, sortUi?.sortDetails);
            Object.assign(qs, rest);
            qs.query ||= "";
            const returnAll = this.getNodeParameter("returnAll", i);
            const limit = returnAll ? 0 : this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.zammadApiRequestAllItems.call(this, "GET", "/users/search", {}, qs, limit).then((response) => {
              return response.map((user) => {
                const { _preferences, ...data } = user;
                return data;
              });
            });
          } else if (operation === "getSelf") {
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "GET", "/users/me");
          }
        } else if (resource === "organization") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const { customFieldsUi, ...rest } = this.getNodeParameter(
              "additionalFields",
              i
            );
            customFieldsUi?.customFieldPairs.forEach((pair) => {
              body[pair.name] = pair.value;
            });
            Object.assign(body, rest);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "POST", "/organizations", body);
          } else if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const body = {};
            const updateFields = this.getNodeParameter(
              "updateFields",
              i
            );
            if (!Object.keys(updateFields).length) {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const { customFieldsUi, ...rest } = updateFields;
            customFieldsUi?.customFieldPairs.forEach((pair) => {
              body[pair.name] = pair.value;
            });
            Object.assign(body, rest);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "PUT", `/organizations/${id}`, body);
          } else if (operation === "delete") {
            const id = this.getNodeParameter("id", i);
            await import_GenericFunctions.zammadApiRequest.call(this, "DELETE", `/organizations/${id}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "GET", `/organizations/${id}`);
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const limit = returnAll ? 0 : this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.zammadApiRequestAllItems.call(
              this,
              "GET",
              "/organizations",
              {},
              {},
              limit
            );
          }
        } else if (resource === "group") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const { customFieldsUi, ...rest } = this.getNodeParameter(
              "additionalFields",
              i
            );
            customFieldsUi?.customFieldPairs.forEach((pair) => {
              body[pair.name] = pair.value;
            });
            Object.assign(body, rest);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "POST", "/groups", body);
          } else if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const body = {};
            const updateFields = this.getNodeParameter(
              "updateFields",
              i
            );
            if (!Object.keys(updateFields).length) {
              import_GenericFunctions.throwOnEmptyUpdate.call(this, resource);
            }
            const { customFieldsUi, ...rest } = updateFields;
            customFieldsUi?.customFieldPairs.forEach((pair) => {
              body[pair.name] = pair.value;
            });
            Object.assign(body, rest);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "PUT", `/groups/${id}`, body);
          } else if (operation === "delete") {
            const id = this.getNodeParameter("id", i);
            await import_GenericFunctions.zammadApiRequest.call(this, "DELETE", `/groups/${id}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "GET", `/groups/${id}`);
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const limit = returnAll ? 0 : this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.zammadApiRequestAllItems.call(
              this,
              "GET",
              "/groups",
              {},
              {},
              limit
            );
          }
        } else if (resource === "ticket") {
          if (operation === "create") {
            const body = {
              article: {},
              title: this.getNodeParameter("title", i),
              group: this.getNodeParameter("group", i),
              customer: this.getNodeParameter("customer", i)
            };
            const article = this.getNodeParameter("article", i);
            if (!Object.keys(article).length) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Article is required", { itemIndex: i });
            }
            const {
              articleDetails: { visibility, ...rest }
            } = article;
            body.article = {
              ...rest,
              internal: visibility === "internal"
            };
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "POST", "/tickets", body);
            const { id } = responseData;
            responseData.articles = await import_GenericFunctions.zammadApiRequest.call(
              this,
              "GET",
              `/ticket_articles/by_ticket/${id}`
            );
          } else if (operation === "delete") {
            const id = this.getNodeParameter("id", i);
            await import_GenericFunctions.zammadApiRequest.call(this, "DELETE", `/tickets/${id}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.zammadApiRequest.call(this, "GET", `/tickets/${id}`);
            responseData.articles = await import_GenericFunctions.zammadApiRequest.call(
              this,
              "GET",
              `/ticket_articles/by_ticket/${id}`
            );
          } else if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const limit = returnAll ? 0 : this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.zammadApiRequestAllItems.call(
              this,
              "GET",
              "/tickets",
              {},
              {},
              limit
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
          returnData.push({ json: { error: error.message } });
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
  Zammad
});
//# sourceMappingURL=Zammad.node.js.map