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
var Chargebee_node_exports = {};
__export(Chargebee_node_exports, {
  Chargebee: () => Chargebee
});
module.exports = __toCommonJS(Chargebee_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class Chargebee {
  constructor() {
    this.description = {
      displayName: "Chargebee",
      name: "chargebee",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:chargebee.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Retrieve data from Chargebee API",
      defaults: {
        name: "Chargebee"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "chargebeeApi",
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
              name: "Customer",
              value: "customer"
            },
            {
              name: "Invoice",
              value: "invoice"
            },
            {
              name: "Subscription",
              value: "subscription"
            }
          ],
          default: "invoice"
        },
        // ----------------------------------
        //         customer
        // ----------------------------------
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["customer"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              description: "Create a customer",
              action: "Create a customer"
            }
          ],
          default: "create"
        },
        // ----------------------------------
        //         customer:create
        // ----------------------------------
        {
          displayName: "Properties",
          name: "properties",
          type: "collection",
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["customer"]
            }
          },
          default: {},
          description: "Properties to set on the new user",
          placeholder: "Add Property",
          options: [
            {
              displayName: "User ID",
              name: "id",
              type: "string",
              default: "",
              description: "ID for the new customer. If not given, this will be auto-generated."
            },
            {
              displayName: "First Name",
              name: "first_name",
              type: "string",
              default: "",
              description: "The first name of the customer"
            },
            {
              displayName: "Last Name",
              name: "last_name",
              type: "string",
              default: "",
              description: "The last name of the customer"
            },
            {
              displayName: "Email",
              name: "email",
              type: "string",
              placeholder: "name@email.com",
              default: "",
              description: "The email address of the customer"
            },
            {
              displayName: "Phone",
              name: "phone",
              type: "string",
              default: "",
              description: "The phone number of the customer"
            },
            {
              displayName: "Company",
              name: "company",
              type: "string",
              default: "",
              description: "The company of the customer"
            },
            {
              displayName: "Custom Properties",
              name: "customProperties",
              placeholder: "Add Custom Property",
              description: "Adds a custom property to set also values which have not been predefined",
              type: "fixedCollection",
              typeOptions: {
                multipleValues: true
              },
              default: {},
              options: [
                {
                  name: "property",
                  displayName: "Property",
                  values: [
                    {
                      displayName: "Property Name",
                      name: "name",
                      type: "string",
                      default: "",
                      description: "Name of the property to set"
                    },
                    {
                      displayName: "Property Value",
                      name: "value",
                      type: "string",
                      default: "",
                      description: "Value of the property to set"
                    }
                  ]
                }
              ]
            }
          ]
        },
        // ----------------------------------
        //         invoice
        // ----------------------------------
        {
          displayName: "Operation",
          name: "operation",
          default: "list",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["invoice"]
            }
          },
          options: [
            {
              name: "List",
              value: "list",
              description: "Return the invoices",
              action: "List an invoice"
            },
            {
              name: "PDF Invoice URL",
              value: "pdfUrl",
              description: "Get URL for the invoice PDF",
              action: "Get URL for the invoice PDF"
            }
          ]
        },
        // ----------------------------------
        //         invoice:list
        // ----------------------------------
        {
          displayName: "Max Results",
          name: "maxResults",
          type: "number",
          typeOptions: {
            minValue: 1,
            maxValue: 100
          },
          default: 10,
          displayOptions: {
            show: {
              operation: ["list"],
              resource: ["invoice"]
            }
          },
          description: "Max. amount of results to return(< 100)."
        },
        {
          displayName: "Filters",
          name: "filters",
          placeholder: "Add Filter",
          description: "Filter for invoices",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          default: {},
          displayOptions: {
            show: {
              operation: ["list"],
              resource: ["invoice"]
            }
          },
          options: [
            {
              name: "date",
              displayName: "Invoice Date",
              values: [
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
                  noDataExpression: true,
                  options: [
                    {
                      name: "Is",
                      value: "is"
                    },
                    {
                      name: "Is Not",
                      value: "is_not"
                    },
                    {
                      name: "After",
                      value: "after"
                    },
                    {
                      name: "Before",
                      value: "before"
                    }
                  ],
                  default: "after",
                  description: "Operation to decide where the data should be mapped to"
                },
                {
                  displayName: "Date",
                  name: "value",
                  type: "dateTime",
                  default: "",
                  description: "Query date"
                }
              ]
            },
            {
              name: "total",
              displayName: "Invoice Amount",
              values: [
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
                  noDataExpression: true,
                  options: [
                    {
                      name: "Greater Equal Than",
                      value: "gte"
                    },
                    {
                      name: "Greater Than",
                      value: "gt"
                    },
                    {
                      name: "Is",
                      value: "is"
                    },
                    {
                      name: "Is Not",
                      value: "is_not"
                    },
                    {
                      name: "Less Equal Than",
                      value: "lte"
                    },
                    {
                      name: "Less Than",
                      value: "lt"
                    }
                  ],
                  default: "gt",
                  description: "Operation to decide where the data should be mapped to"
                },
                {
                  displayName: "Amount",
                  name: "value",
                  type: "number",
                  typeOptions: {
                    numberPrecision: 2
                  },
                  default: 0,
                  description: "Query amount"
                }
              ]
            }
          ]
        },
        // ----------------------------------
        //         invoice:pdfUrl
        // ----------------------------------
        {
          displayName: "Invoice ID",
          name: "invoiceId",
          description: "The ID of the invoice to get",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["pdfUrl"],
              resource: ["invoice"]
            }
          }
        },
        // ----------------------------------
        //         subscription
        // ----------------------------------
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["subscription"]
            }
          },
          options: [
            {
              name: "Cancel",
              value: "cancel",
              description: "Cancel a subscription",
              action: "Cancel a subscription"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a subscription",
              action: "Delete a subscription"
            }
          ],
          default: "delete"
        },
        // ----------------------------------
        //         subscription:cancel
        // ----------------------------------
        {
          displayName: "Subscription ID",
          name: "subscriptionId",
          description: "The ID of the subscription to cancel",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["cancel"],
              resource: ["subscription"]
            }
          }
        },
        {
          displayName: "Schedule End of Term",
          name: "endOfTerm",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              operation: ["cancel"],
              resource: ["subscription"]
            }
          },
          description: "Whether it will not cancel it directly in will instead schedule the cancelation for the end of the term"
        },
        // ----------------------------------
        //         subscription:delete
        // ----------------------------------
        {
          displayName: "Subscription ID",
          name: "subscriptionId",
          description: "The ID of the subscription to delete",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["delete"],
              resource: ["subscription"]
            }
          }
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const credentials = await this.getCredentials("chargebeeApi");
    const baseUrl = `https://${credentials.accountName}.chargebee.com/api/v2`;
    let body;
    let qs;
    for (let i = 0; i < items.length; i++) {
      try {
        const resource = this.getNodeParameter("resource", i);
        const operation = this.getNodeParameter("operation", i);
        let requestMethod = "GET";
        let endpoint = "";
        body = {};
        qs = {};
        if (resource === "customer") {
          if (operation === "create") {
            requestMethod = "POST";
            const properties = this.getNodeParameter("properties", i, {});
            for (const key of Object.keys(properties)) {
              if (key === "customProperties" && properties.customProperties.property !== void 0) {
                for (const customProperty of properties.customProperties.property) {
                  qs[customProperty.name] = customProperty.value;
                }
              } else {
                qs[key] = properties[key];
              }
            }
            endpoint = "customers";
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "invoice") {
          if (operation === "list") {
            endpoint = "invoices";
            qs["sort_by[desc]"] = "date";
            qs.limit = this.getNodeParameter("maxResults", i, {});
            const setFilters = this.getNodeParameter(
              "filters",
              i,
              {}
            );
            let filter;
            let value;
            for (const filterProperty of Object.keys(setFilters)) {
              for (filter of setFilters[filterProperty]) {
                value = filter.value;
                if (filterProperty === "date") {
                  value = Math.floor(new Date(value).getTime() / 1e3);
                }
                qs[`${filterProperty}[${filter.operation}]`] = value;
              }
            }
          } else if (operation === "pdfUrl") {
            requestMethod = "POST";
            const invoiceId = this.getNodeParameter("invoiceId", i);
            endpoint = `invoices/${invoiceId.trim()}/pdf`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "subscription") {
          if (operation === "cancel") {
            requestMethod = "POST";
            const subscriptionId = this.getNodeParameter("subscriptionId", i, "");
            body.end_of_term = this.getNodeParameter("endOfTerm", i, false);
            endpoint = `subscriptions/${subscriptionId.trim()}/cancel`;
          } else if (operation === "delete") {
            requestMethod = "POST";
            const subscriptionId = this.getNodeParameter("subscriptionId", i, "");
            endpoint = `subscriptions/${subscriptionId.trim()}/delete`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: i
          });
        }
        const options = {
          method: requestMethod,
          body,
          qs,
          uri: `${baseUrl}/${endpoint}`,
          auth: {
            user: credentials.apiKey,
            pass: ""
          },
          json: true
        };
        let responseData;
        try {
          responseData = await this.helpers.request(options);
        } catch (error) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
        }
        if (resource === "invoice" && operation === "list") {
          responseData.list.forEach((data) => {
            responseData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ ...data.invoice }),
              { itemData: { item: i } }
            );
            returnData.push(...responseData);
          });
        } else if (resource === "invoice" && operation === "pdfUrl") {
          const data = {};
          Object.assign(data, items[i].json);
          data.pdfUrl = responseData.download.download_url;
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ ...data }),
            { itemData: { item: i } }
          );
          returnData.push(...responseData);
        } else {
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {}, itemIndex: i });
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
  Chargebee
});
//# sourceMappingURL=Chargebee.node.js.map