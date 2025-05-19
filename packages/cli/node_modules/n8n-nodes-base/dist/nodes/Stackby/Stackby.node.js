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
var Stackby_node_exports = {};
__export(Stackby_node_exports, {
  Stackby: () => Stackby
});
module.exports = __toCommonJS(Stackby_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunction = require("./GenericFunction");
var import_utilities = require("../../utils/utilities");
class Stackby {
  constructor() {
    this.description = {
      displayName: "Stackby",
      name: "stackby",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:stackby.png",
      group: ["transform"],
      version: 1,
      description: "Read, write, and delete data in Stackby",
      defaults: {
        name: "Stackby"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "stackbyApi",
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
              name: "Append",
              value: "append"
            },
            {
              name: "Delete",
              value: "delete"
            },
            {
              name: "List",
              value: "list"
            },
            {
              name: "Read",
              value: "read"
            }
          ],
          default: "append",
          placeholder: "Action to perform"
        },
        // ----------------------------------
        //         All
        // ----------------------------------
        {
          displayName: "Stack ID",
          name: "stackId",
          type: "string",
          default: "",
          required: true,
          description: "The ID of the stack to access"
        },
        {
          displayName: "Table",
          name: "table",
          type: "string",
          default: "",
          placeholder: "Stories",
          required: true,
          description: "Enter Table Name"
        },
        // ----------------------------------
        //         read
        // ----------------------------------
        {
          displayName: "ID",
          name: "id",
          type: "string",
          displayOptions: {
            show: {
              operation: ["read", "delete"]
            }
          },
          default: "",
          required: true,
          description: "ID of the record to return"
        },
        // ----------------------------------
        //         list
        // ----------------------------------
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["list"]
            }
          },
          default: true,
          description: "Whether to return all results or only up to a given limit"
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          displayOptions: {
            show: {
              operation: ["list"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 1e3
          },
          default: 1e3,
          description: "Max number of results to return"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          displayOptions: {
            show: {
              operation: ["list"]
            }
          },
          default: {},
          placeholder: "Add Field",
          options: [
            {
              displayName: "View",
              name: "view",
              type: "string",
              default: "",
              placeholder: "All Stories",
              description: "The name or ID of a view in the Stories table. If set, only the records in that view will be returned. The records will be sorted according to the order of the view."
            }
          ]
        },
        // ----------------------------------
        //         append
        // ----------------------------------
        {
          displayName: "Columns",
          name: "columns",
          type: "string",
          displayOptions: {
            show: {
              operation: ["append"]
            }
          },
          default: "",
          required: true,
          placeholder: "id,name,description",
          description: "Comma-separated list of the properties which should used as columns for the new rows"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const qs = {};
    const operation = this.getNodeParameter("operation", 0);
    if (operation === "read") {
      for (let i = 0; i < length; i++) {
        try {
          const stackId = this.getNodeParameter("stackId", i);
          const table = encodeURI(this.getNodeParameter("table", i));
          const rowIds = this.getNodeParameter("id", i);
          qs.rowIds = [rowIds];
          responseData = await import_GenericFunction.apiRequest.call(this, "GET", `/rowlist/${stackId}/${table}`, {}, qs);
          returnData.push.apply(
            returnData,
            responseData.map((data) => data.field)
          );
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
    }
    if (operation === "delete") {
      for (let i = 0; i < length; i++) {
        try {
          const stackId = this.getNodeParameter("stackId", i);
          const table = encodeURI(this.getNodeParameter("table", i));
          const rowIds = this.getNodeParameter("id", i);
          qs.rowIds = [rowIds];
          responseData = await import_GenericFunction.apiRequest.call(
            this,
            "DELETE",
            `/rowdelete/${stackId}/${table}`,
            {},
            qs
          );
          responseData = responseData.records;
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
    }
    if (operation === "append") {
      try {
        const records = {};
        let key = "";
        for (let i = 0; i < length; i++) {
          const stackId = this.getNodeParameter("stackId", i);
          const table = encodeURI(this.getNodeParameter("table", i));
          const columns = this.getNodeParameter("columns", i);
          const columnList = columns.split(",").map((column) => column.trim());
          const record = {};
          for (const column of columnList) {
            if (items[i].json[column] === void 0) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Column ${column} does not exist on input`,
                { itemIndex: i }
              );
            } else {
              record[column] = items[i].json[column];
            }
          }
          key = `${stackId}/${table}`;
          if (records[key] === void 0) {
            records[key] = [];
          }
          records[key].push({ field: record });
        }
        for (const recordKey of Object.keys(records)) {
          responseData = await import_GenericFunction.apiRequest.call(this, "POST", `/rowcreate/${recordKey}`, {
            records: records[recordKey]
          });
        }
        returnData.push.apply(
          returnData,
          responseData.map((data) => data.field)
        );
      } catch (error) {
        if (this.continueOnFail()) {
          const itemData = (0, import_utilities.generatePairedItemData)(items.length);
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData }
          );
          returnData.push(...executionErrorData);
        } else {
          throw error;
        }
      }
    }
    if (operation === "list") {
      for (let i = 0; i < length; i++) {
        try {
          const stackId = this.getNodeParameter("stackId", i);
          const table = encodeURI(this.getNodeParameter("table", i));
          const returnAll = this.getNodeParameter("returnAll", 0);
          const additionalFields = this.getNodeParameter("additionalFields", i, {});
          if (additionalFields.view) {
            qs.view = additionalFields.view;
          }
          if (returnAll) {
            responseData = await import_GenericFunction.apiRequestAllItems.call(
              this,
              "GET",
              `/rowlist/${stackId}/${table}`,
              {},
              qs
            );
          } else {
            qs.maxrecord = this.getNodeParameter("limit", 0);
            responseData = await import_GenericFunction.apiRequest.call(
              this,
              "GET",
              `/rowlist/${stackId}/${table}`,
              {},
              qs
            );
          }
          returnData.push.apply(
            returnData,
            responseData.map((data) => data.field)
          );
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
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Stackby
});
//# sourceMappingURL=Stackby.node.js.map