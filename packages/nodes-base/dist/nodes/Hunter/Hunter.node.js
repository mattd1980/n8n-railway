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
var Hunter_node_exports = {};
__export(Hunter_node_exports, {
  Hunter: () => Hunter
});
module.exports = __toCommonJS(Hunter_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Hunter {
  constructor() {
    this.description = {
      displayName: "Hunter",
      name: "hunter",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:hunter.png",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"]}}',
      description: "Consume Hunter API",
      defaults: {
        name: "Hunter"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "hunterApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Domain Search",
              value: "domainSearch",
              description: "Get every email address found on the internet using a given domain name, with sources",
              action: "Get every email address found on the internet using a given domain name, with sources"
            },
            {
              name: "Email Finder",
              value: "emailFinder",
              description: "Generate or retrieve the most likely email address from a domain name, a first name and a last name",
              action: "Generate or retrieve the most likely email address from a domain name, a first name and a last name"
            },
            {
              name: "Email Verifier",
              value: "emailVerifier",
              description: "Verify the deliverability of an email address",
              action: "Verify the deliverability of an email address"
            }
          ],
          default: "domainSearch",
          description: "Operation to consume"
        },
        {
          displayName: "Domain",
          name: "domain",
          type: "string",
          displayOptions: {
            show: {
              operation: ["domainSearch"]
            }
          },
          default: "",
          required: true,
          description: 'Domain name from which you want to find the email addresses. For example, "stripe.com".'
        },
        {
          displayName: "Only Emails",
          name: "onlyEmails",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["domainSearch"]
            }
          },
          default: true,
          description: "Whether to return only the found emails"
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["domainSearch"]
            }
          },
          default: false,
          description: "Whether to return all results or only up to a given limit"
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          displayOptions: {
            show: {
              operation: ["domainSearch"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 100
          },
          default: 100,
          description: "Max number of results to return"
        },
        {
          displayName: "Filters",
          name: "filters",
          type: "collection",
          placeholder: "Add Filter",
          default: {},
          displayOptions: {
            show: {
              operation: ["domainSearch"]
            }
          },
          options: [
            {
              displayName: "Type",
              name: "type",
              type: "options",
              default: "",
              options: [
                {
                  name: "Personal",
                  value: "personal"
                },
                {
                  name: "Generic",
                  value: "generic"
                }
              ]
            },
            {
              displayName: "Seniority",
              name: "seniority",
              type: "multiOptions",
              default: [],
              options: [
                {
                  name: "Junior",
                  value: "junior"
                },
                {
                  name: "Senior",
                  value: "senior"
                },
                {
                  name: "Executive",
                  value: "executive"
                }
              ]
            },
            {
              displayName: "Department",
              name: "department",
              type: "multiOptions",
              default: [],
              options: [
                {
                  name: "Communication",
                  value: "communication"
                },
                {
                  name: "Executive",
                  value: "executive"
                },
                {
                  name: "Finance",
                  value: "finance"
                },
                {
                  name: "HR",
                  value: "hr"
                },
                {
                  name: "IT",
                  value: "it"
                },
                {
                  name: "Legal",
                  value: "legal"
                },
                {
                  name: "Management",
                  value: "management"
                },
                {
                  name: "Marketing",
                  value: "marketing"
                },
                {
                  name: "Sales",
                  value: "sales"
                },
                {
                  name: "Support",
                  value: "support"
                }
              ]
            }
          ]
        },
        {
          displayName: "Domain",
          name: "domain",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              operation: ["emailFinder"]
            }
          },
          required: true,
          description: 'Domain name from which you want to find the email addresses. For example, "stripe.com".'
        },
        {
          displayName: "First Name",
          name: "firstname",
          type: "string",
          displayOptions: {
            show: {
              operation: ["emailFinder"]
            }
          },
          default: "",
          required: true,
          description: "The person's first name. It doesn't need to be in lowercase."
        },
        {
          displayName: "Last Name",
          name: "lastname",
          type: "string",
          displayOptions: {
            show: {
              operation: ["emailFinder"]
            }
          },
          default: "",
          required: true,
          description: "The person's last name. It doesn't need to be in lowercase."
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          displayOptions: {
            show: {
              operation: ["emailVerifier"]
            }
          },
          default: "",
          required: true,
          description: "The email address you want to verify"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    for (let i = 0; i < length; i++) {
      try {
        const operation = this.getNodeParameter("operation", 0);
        if (operation === "domainSearch") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("filters", i);
          const domain = this.getNodeParameter("domain", i);
          const onlyEmails = this.getNodeParameter("onlyEmails", i, false);
          qs.domain = domain;
          if (filters.type) {
            qs.type = filters.type;
          }
          if (filters.seniority) {
            qs.seniority = filters.seniority.join(",");
          }
          if (filters.department) {
            qs.department = filters.department.join(",");
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.hunterApiRequestAllItems.call(
              this,
              "data",
              "GET",
              "/domain-search",
              {},
              qs
            );
            if (!onlyEmails) {
              let tempReturnData = {};
              for (let index = 0; index < responseData.length; index++) {
                if (index === 0) {
                  tempReturnData = responseData[index];
                  continue;
                }
                tempReturnData.emails.push.apply(
                  tempReturnData.emails,
                  responseData[index].emails
                );
              }
              responseData = tempReturnData;
            }
          } else {
            const limit = this.getNodeParameter("limit", i);
            qs.limit = limit;
            responseData = await import_GenericFunctions.hunterApiRequest.call(this, "GET", "/domain-search", {}, qs);
            responseData = responseData.data;
          }
          if (onlyEmails) {
            let tempReturnData = [];
            if (Array.isArray(responseData)) {
              for (const data of responseData) {
                tempReturnData.push.apply(tempReturnData, data.emails);
              }
            } else {
              tempReturnData = responseData.emails;
            }
            responseData = tempReturnData;
          }
        }
        if (operation === "emailFinder") {
          const domain = this.getNodeParameter("domain", i);
          const firstname = this.getNodeParameter("firstname", i);
          const lastname = this.getNodeParameter("lastname", i);
          qs.first_name = firstname;
          qs.last_name = lastname;
          qs.domain = domain;
          responseData = await import_GenericFunctions.hunterApiRequest.call(this, "GET", "/email-finder", {}, qs);
          responseData = responseData.data;
        }
        if (operation === "emailVerifier") {
          const email = this.getNodeParameter("email", i);
          qs.email = email;
          responseData = await import_GenericFunctions.hunterApiRequest.call(this, "GET", "/email-verifier", {}, qs);
          responseData = responseData.data;
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
  Hunter
});
//# sourceMappingURL=Hunter.node.js.map