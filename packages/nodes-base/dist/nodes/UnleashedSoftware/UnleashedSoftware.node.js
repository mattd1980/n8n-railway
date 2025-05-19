"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var UnleashedSoftware_node_exports = {};
__export(UnleashedSoftware_node_exports, {
  UnleashedSoftware: () => UnleashedSoftware
});
module.exports = __toCommonJS(UnleashedSoftware_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_SalesOrderDescription = require("./SalesOrderDescription");
var import_StockOnHandDescription = require("./StockOnHandDescription");
class UnleashedSoftware {
  constructor() {
    this.description = {
      displayName: "Unleashed Software",
      name: "unleashedSoftware",
      group: ["transform"],
      subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:unleashedSoftware.png",
      version: 1,
      description: "Consume Unleashed Software API",
      defaults: {
        name: "Unleashed Software"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "unleashedSoftwareApi",
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
              name: "Sales Order",
              value: "salesOrder"
            },
            {
              name: "Stock On Hand",
              value: "stockOnHand"
            }
          ],
          default: "salesOrder"
        },
        ...import_SalesOrderDescription.salesOrderOperations,
        ...import_SalesOrderDescription.salesOrderFields,
        ...import_StockOnHandDescription.stockOnHandOperations,
        ...import_StockOnHandDescription.stockOnHandFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData = [];
    for (let i = 0; i < length; i++) {
      const resource = this.getNodeParameter("resource", 0);
      const operation = this.getNodeParameter("operation", 0);
      if (resource === "salesOrder") {
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("filters", i);
          if (filters.startDate) {
            filters.startDate = (0, import_moment_timezone.default)(filters.startDate).format("YYYY-MM-DD");
          }
          if (filters.endDate) {
            filters.endDate = (0, import_moment_timezone.default)(filters.endDate).format("YYYY-MM-DD");
          }
          if (filters.modifiedSince) {
            filters.modifiedSince = (0, import_moment_timezone.default)(filters.modifiedSince).format("YYYY-MM-DD");
          }
          if (filters.orderStatus) {
            filters.orderStatus = filters.orderStatus.join(",");
          }
          Object.assign(qs, filters);
          if (returnAll) {
            responseData = await import_GenericFunctions.unleashedApiRequestAllItems.call(
              this,
              "Items",
              "GET",
              "/SalesOrders",
              {},
              qs
            );
          } else {
            const limit = this.getNodeParameter("limit", i);
            qs.pageSize = limit;
            responseData = await import_GenericFunctions.unleashedApiRequest.call(
              this,
              "GET",
              "/SalesOrders",
              {},
              qs,
              1
            );
            responseData = responseData.Items;
          }
          (0, import_GenericFunctions.convertNETDates)(responseData);
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
      }
      if (resource === "stockOnHand") {
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const filters = this.getNodeParameter("filters", i);
          if (filters.asAtDate) {
            filters.asAtDate = (0, import_moment_timezone.default)(filters.asAtDate).format("YYYY-MM-DD");
          }
          if (filters.modifiedSince) {
            filters.modifiedSince = (0, import_moment_timezone.default)(filters.modifiedSince).format("YYYY-MM-DD");
          }
          if (filters.orderBy) {
            filters.orderBy = filters.orderBy.trim();
          }
          Object.assign(qs, filters);
          if (returnAll) {
            responseData = await import_GenericFunctions.unleashedApiRequestAllItems.call(
              this,
              "Items",
              "GET",
              "/StockOnHand",
              {},
              qs
            );
          } else {
            const limit = this.getNodeParameter("limit", i);
            qs.pageSize = limit;
            responseData = await import_GenericFunctions.unleashedApiRequest.call(
              this,
              "GET",
              "/StockOnHand",
              {},
              qs,
              1
            );
            responseData = responseData.Items;
          }
          (0, import_GenericFunctions.convertNETDates)(responseData);
          responseData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
        }
        if (operation === "get") {
          const productId = this.getNodeParameter("productId", i);
          responseData = await import_GenericFunctions.unleashedApiRequest.call(this, "GET", `/StockOnHand/${productId}`);
          (0, import_GenericFunctions.convertNETDates)(responseData);
        }
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
  UnleashedSoftware
});
//# sourceMappingURL=UnleashedSoftware.node.js.map