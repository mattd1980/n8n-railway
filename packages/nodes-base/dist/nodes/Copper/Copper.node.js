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
var Copper_node_exports = {};
__export(Copper_node_exports, {
  Copper: () => Copper
});
module.exports = __toCommonJS(Copper_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Copper {
  constructor() {
    this.description = {
      displayName: "Copper",
      name: "copper",
      icon: "file:copper.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Copper API",
      defaults: {
        name: "Copper"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "copperApi",
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
              name: "Company",
              value: "company"
            },
            {
              name: "Customer Source",
              value: "customerSource"
            },
            {
              name: "Lead",
              value: "lead"
            },
            {
              name: "Opportunity",
              value: "opportunity"
            },
            {
              name: "Person",
              value: "person"
            },
            {
              name: "Project",
              value: "project"
            },
            {
              name: "Task",
              value: "task"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "company"
        },
        ...import_descriptions.companyOperations,
        ...import_descriptions.companyFields,
        ...import_descriptions.customerSourceOperations,
        ...import_descriptions.customerSourceFields,
        ...import_descriptions.leadOperations,
        ...import_descriptions.leadFields,
        ...import_descriptions.opportunityOperations,
        ...import_descriptions.opportunityFields,
        ...import_descriptions.personOperations,
        ...import_descriptions.personFields,
        ...import_descriptions.projectOperations,
        ...import_descriptions.projectFields,
        ...import_descriptions.taskOperations,
        ...import_descriptions.taskFields,
        ...import_descriptions.userOperations,
        ...import_descriptions.userFields
      ]
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
        if (resource === "company") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustCompanyFields)(additionalFields));
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "POST", "/companies", body);
          } else if (operation === "delete") {
            const companyId = this.getNodeParameter("companyId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "DELETE", `/companies/${companyId}`);
          } else if (operation === "get") {
            const companyId = this.getNodeParameter("companyId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "GET", `/companies/${companyId}`);
          } else if (operation === "getAll") {
            const body = {};
            const filterFields = this.getNodeParameter("filterFields", i);
            if (Object.keys(filterFields).length) {
              Object.assign(body, filterFields);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "POST", "/companies/search", body);
          } else if (operation === "update") {
            const companyId = this.getNodeParameter("companyId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustCompanyFields)(updateFields));
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(
              this,
              "PUT",
              `/companies/${companyId}`,
              body
            );
          }
        } else if (resource === "customerSource") {
          if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "GET", "/customer_sources");
          }
        } else if (resource === "lead") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustLeadFields)(additionalFields));
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "POST", "/leads", body);
          } else if (operation === "delete") {
            const leadId = this.getNodeParameter("leadId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "DELETE", `/leads/${leadId}`);
          } else if (operation === "get") {
            const leadId = this.getNodeParameter("leadId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "GET", `/leads/${leadId}`);
          } else if (operation === "getAll") {
            const body = {};
            const filterFields = this.getNodeParameter("filterFields", i);
            if (Object.keys(filterFields).length) {
              Object.assign(body, filterFields);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "POST", "/leads/search", body);
          } else if (operation === "update") {
            const leadId = this.getNodeParameter("leadId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustLeadFields)(updateFields));
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "PUT", `/leads/${leadId}`, body);
          }
        } else if (resource === "opportunity") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i),
              customer_source_id: this.getNodeParameter("customerSourceId", i),
              primary_contact_id: this.getNodeParameter("primaryContactId", i)
            };
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "POST", "/opportunities", body);
          } else if (operation === "delete") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(
              this,
              "DELETE",
              `/opportunities/${opportunityId}`
            );
          } else if (operation === "get") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(
              this,
              "GET",
              `/opportunities/${opportunityId}`
            );
          } else if (operation === "getAll") {
            const body = {};
            const filterFields = this.getNodeParameter("filterFields", i);
            if (Object.keys(filterFields).length) {
              Object.assign(body, filterFields);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "POST", "/opportunities/search", body);
          } else if (operation === "update") {
            const opportunityId = this.getNodeParameter("opportunityId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(
              this,
              "PUT",
              `/opportunities/${opportunityId}`,
              body
            );
          }
        } else if (resource === "person") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustPersonFields)(additionalFields));
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "POST", "/people", body);
          } else if (operation === "delete") {
            const personId = this.getNodeParameter("personId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "DELETE", `/people/${personId}`);
          } else if (operation === "get") {
            const personId = this.getNodeParameter("personId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "GET", `/people/${personId}`);
          } else if (operation === "getAll") {
            const body = {};
            const filterFields = this.getNodeParameter("filterFields", i);
            if (Object.keys(filterFields).length) {
              Object.assign(body, filterFields);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "POST", "/people/search", body);
          } else if (operation === "update") {
            const personId = this.getNodeParameter("personId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustPersonFields)(updateFields));
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "PUT", `/people/${personId}`, body);
          }
        } else if (resource === "project") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "POST", "/projects", body);
          } else if (operation === "delete") {
            const projectId = this.getNodeParameter("projectId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "DELETE", `/projects/${projectId}`);
          } else if (operation === "get") {
            const projectId = this.getNodeParameter("projectId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "GET", `/projects/${projectId}`);
          } else if (operation === "getAll") {
            const body = {};
            const filterFields = this.getNodeParameter("filterFields", i);
            if (Object.keys(filterFields).length) {
              Object.assign(body, filterFields);
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "POST", "/projects/search", body);
          } else if (operation === "update") {
            const projectId = this.getNodeParameter("projectId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "PUT", `/projects/${projectId}`, body);
          }
        } else if (resource === "task") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "POST", "/tasks", body);
          } else if (operation === "delete") {
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "DELETE", `/tasks/${taskId}`);
          } else if (operation === "get") {
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "GET", `/tasks/${taskId}`);
          } else if (operation === "getAll") {
            const body = {};
            const filterFields = this.getNodeParameter("filterFields", i);
            if (Object.keys(filterFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustTaskFields)(filterFields));
            }
            responseData = await import_GenericFunctions.handleListing.call(this, "POST", "/tasks/search", body);
          } else if (operation === "update") {
            const taskId = this.getNodeParameter("taskId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.copperApiRequest.call(this, "PUT", `/tasks/${taskId}`, body);
          }
        } else if (resource === "user") {
          if (operation === "getAll") {
            responseData = await import_GenericFunctions.handleListing.call(this, "POST", "/users/search");
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.toString(), json: {} });
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
  Copper
});
//# sourceMappingURL=Copper.node.js.map