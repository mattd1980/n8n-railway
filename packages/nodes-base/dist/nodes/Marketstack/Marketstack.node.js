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
var Marketstack_node_exports = {};
__export(Marketstack_node_exports, {
  Marketstack: () => Marketstack
});
module.exports = __toCommonJS(Marketstack_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Marketstack {
  constructor() {
    this.description = {
      displayName: "Marketstack",
      name: "marketstack",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      icon: { light: "file:marketstack.svg", dark: "file:marketstack.dark.svg" },
      group: ["transform"],
      version: 1,
      description: "Consume Marketstack API",
      defaults: {
        name: "Marketstack"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "marketstackApi",
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
              name: "End-of-Day Data",
              value: "endOfDayData",
              description: "Stock market closing data"
            },
            {
              name: "Exchange",
              value: "exchange",
              description: "Stock market exchange"
            },
            {
              name: "Ticker",
              value: "ticker",
              description: "Stock market symbol"
            }
          ],
          default: "endOfDayData",
          required: true
        },
        ...import_descriptions.endOfDayDataOperations,
        ...import_descriptions.endOfDayDataFields,
        ...import_descriptions.exchangeOperations,
        ...import_descriptions.exchangeFields,
        ...import_descriptions.tickerOperations,
        ...import_descriptions.tickerFields
      ]
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
        if (resource === "endOfDayData") {
          if (operation === "getAll") {
            const qs = {
              symbols: this.getNodeParameter("symbols", i)
            };
            const { latest, specificDate, dateFrom, dateTo, ...rest } = this.getNodeParameter(
              "filters",
              i
            );
            import_GenericFunctions.validateTimeOptions.call(this, [
              latest !== void 0 && latest,
              specificDate !== void 0,
              dateFrom !== void 0 && dateTo !== void 0
            ]);
            if (Object.keys(rest).length) {
              Object.assign(qs, rest);
            }
            let endpoint;
            if (latest) {
              endpoint = "/eod/latest";
            } else if (specificDate) {
              endpoint = `/eod/${(0, import_GenericFunctions.format)(specificDate)}`;
            } else {
              if (!dateFrom || !dateTo) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "Please enter a start and end date to filter by timeframe.",
                  { itemIndex: i }
                );
              }
              endpoint = "/eod";
              qs.date_from = (0, import_GenericFunctions.format)(dateFrom);
              qs.date_to = (0, import_GenericFunctions.format)(dateTo);
            }
            responseData = await import_GenericFunctions.marketstackApiRequestAllItems.call(this, "GET", endpoint, {}, qs);
          }
        } else if (resource === "exchange") {
          if (operation === "get") {
            const exchange = this.getNodeParameter("exchange", i);
            const endpoint = `/exchanges/${exchange}`;
            responseData = await import_GenericFunctions.marketstackApiRequest.call(this, "GET", endpoint);
          }
        } else if (resource === "ticker") {
          if (operation === "get") {
            const symbol = this.getNodeParameter("symbol", i);
            const endpoint = `/tickers/${symbol}`;
            responseData = await import_GenericFunctions.marketstackApiRequest.call(this, "GET", endpoint);
          }
        }
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
  Marketstack
});
//# sourceMappingURL=Marketstack.node.js.map