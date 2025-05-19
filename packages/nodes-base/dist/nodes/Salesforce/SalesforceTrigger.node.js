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
var SalesforceTrigger_node_exports = {};
__export(SalesforceTrigger_node_exports, {
  SalesforceTrigger: () => SalesforceTrigger
});
module.exports = __toCommonJS(SalesforceTrigger_node_exports);
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class SalesforceTrigger {
  constructor() {
    this.description = {
      displayName: "Salesforce Trigger",
      name: "salesforceTrigger",
      icon: "file:salesforce.svg",
      group: ["trigger"],
      version: 1,
      description: "Fetches data from Salesforce and starts the workflow on specified polling intervals.",
      subtitle: '={{($parameter["triggerOn"])}}',
      defaults: {
        name: "Salesforce Trigger"
      },
      credentials: [
        {
          name: "salesforceOAuth2Api",
          required: true
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Trigger On",
          name: "triggerOn",
          description: "Which Salesforce event should trigger the node",
          type: "options",
          default: "",
          options: [
            {
              name: "Account Created",
              value: "accountCreated",
              description: "When a new account is created"
            },
            {
              name: "Account Updated",
              value: "accountUpdated",
              description: "When an existing account is modified"
            },
            {
              name: "Attachment Created",
              value: "attachmentCreated",
              description: "When a file is uploaded and attached to an object"
            },
            {
              name: "Attachment Updated",
              value: "attachmentUpdated",
              description: "When an existing file is modified"
            },
            {
              name: "Case Created",
              value: "caseCreated",
              description: "When a new case is created"
            },
            {
              name: "Case Updated",
              value: "caseUpdated",
              description: "When an existing case is modified"
            },
            {
              name: "Contact Created",
              value: "contactCreated",
              description: "When a new contact is created"
            },
            {
              name: "Contact Updated",
              value: "contactUpdated",
              description: "When an existing contact is modified"
            },
            {
              name: "Custom Object Created",
              value: "customObjectCreated",
              description: "When a new object of a given type is created"
            },
            {
              name: "Custom Object Updated",
              value: "customObjectUpdated",
              description: "When an object of a given type is modified"
            },
            {
              name: "Lead Created",
              value: "leadCreated",
              description: "When a new lead is created"
            },
            {
              name: "Lead Updated",
              value: "leadUpdated",
              description: "When an existing lead is modified"
            },
            {
              name: "Opportunity Created",
              value: "opportunityCreated",
              description: "When a new opportunity is created"
            },
            {
              name: "Opportunity Updated",
              value: "opportunityUpdated",
              description: "When an existing opportunity is created"
            },
            {
              name: "Task Created",
              value: "taskCreated",
              description: "When a new task is created"
            },
            {
              name: "Task Updated",
              value: "taskUpdated",
              description: "When an existing task is modified"
            },
            {
              name: "User Created",
              value: "userCreated",
              description: "When a new user is created"
            },
            {
              name: "User Updated",
              value: "userUpdated",
              description: "When an existing user is modified"
            }
          ]
        },
        {
          displayName: "Custom Object Name or ID",
          name: "customObject",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getCustomObjects"
          },
          required: true,
          default: "",
          displayOptions: {
            show: {
              triggerOn: ["customObjectUpdated", "customObjectCreated"]
            }
          },
          description: 'Name of the custom object. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the custom objects recurrence instances to display them to user so that they can
        // select them easily
        async getCustomObjects() {
          const returnData = [];
          const { sobjects: objects } = await import_GenericFunctions.salesforceApiRequest.call(this, "GET", "/sobjects");
          for (const object of objects) {
            if (object.custom === true) {
              const objectName = object.label;
              const objectId = object.name;
              returnData.push({
                name: objectName,
                value: objectId
              });
            }
          }
          (0, import_GenericFunctions.sortOptions)(returnData);
          return returnData;
        }
      }
    };
  }
  async poll() {
    const workflowData = this.getWorkflowStaticData("node");
    let responseData;
    const qs = {};
    const triggerOn = this.getNodeParameter("triggerOn");
    let triggerResource = triggerOn.slice(0, 1).toUpperCase() + triggerOn.slice(1, -7);
    const changeType = triggerOn.slice(-7);
    if (triggerResource === "CustomObject") {
      triggerResource = this.getNodeParameter("customObject");
    }
    const now = import_luxon.DateTime.now().toISO();
    const startDate = workflowData.lastTimeChecked || now;
    const endDate = now;
    try {
      const pollStartDate = startDate;
      const pollEndDate = endDate;
      const options = {
        conditionsUi: {
          conditionValues: []
        }
      };
      if (this.getMode() !== "manual") {
        if (changeType === "Created") {
          options.conditionsUi.conditionValues.push({
            field: "CreatedDate",
            operation: ">=",
            value: pollStartDate
          });
          options.conditionsUi.conditionValues.push({
            field: "CreatedDate",
            operation: "<",
            value: pollEndDate
          });
        } else {
          options.conditionsUi.conditionValues.push({
            field: "LastModifiedDate",
            operation: ">=",
            value: pollStartDate
          });
          options.conditionsUi.conditionValues.push({
            field: "LastModifiedDate",
            operation: "<",
            value: pollEndDate
          });
          options.conditionsUi.conditionValues.push({
            field: "CreatedDate",
            operation: "<",
            value: pollStartDate
          });
        }
      }
      try {
        if (this.getMode() === "manual") {
          qs.q = (0, import_GenericFunctions.getQuery)(options, triggerResource, false, 1);
        } else {
          qs.q = (0, import_GenericFunctions.getQuery)(options, triggerResource, true);
        }
        responseData = await import_GenericFunctions.salesforceApiRequestAllItems.call(
          this,
          "records",
          "GET",
          "/query",
          {},
          qs
        );
      } catch (error) {
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
      }
      if (!responseData?.length) {
        workflowData.lastTimeChecked = endDate;
        return null;
      }
    } catch (error) {
      if (this.getMode() === "manual" || !workflowData.lastTimeChecked) {
        throw error;
      }
      const workflow = this.getWorkflow();
      const node = this.getNode();
      this.logger.error(
        `There was a problem in '${node.name}' node in workflow '${workflow.id}': '${error.description}'`,
        {
          node: node.name,
          workflowId: workflow.id,
          error
        }
      );
      throw error;
    }
    workflowData.lastTimeChecked = endDate;
    if (Array.isArray(responseData) && responseData.length) {
      return [this.helpers.returnJsonArray(responseData)];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SalesforceTrigger
});
//# sourceMappingURL=SalesforceTrigger.node.js.map