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
var CoinGecko_node_exports = {};
__export(CoinGecko_node_exports, {
  CoinGecko: () => CoinGecko
});
module.exports = __toCommonJS(CoinGecko_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_CoinDescription = require("./CoinDescription");
var import_EventDescription = require("./EventDescription");
var import_GenericFunctions = require("./GenericFunctions");
class CoinGecko {
  constructor() {
    this.description = {
      displayName: "CoinGecko",
      name: "coinGecko",
      icon: "file:coinGecko.svg",
      group: ["output"],
      version: 1,
      description: "Consume CoinGecko API",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "CoinGecko"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Coin",
              value: "coin"
            },
            {
              name: "Event",
              value: "event"
            }
          ],
          default: "coin"
        },
        ...import_CoinDescription.coinOperations,
        ...import_CoinDescription.coinFields,
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getCurrencies() {
          const returnData = [];
          const currencies = await import_GenericFunctions.coinGeckoApiRequest.call(
            this,
            "GET",
            "/simple/supported_vs_currencies"
          );
          currencies.sort();
          for (const currency of currencies) {
            returnData.push({
              name: currency.toUpperCase(),
              value: currency
            });
          }
          return returnData;
        },
        async getCoins() {
          const returnData = [];
          const coins = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/coins/list");
          for (const coin of coins) {
            returnData.push({
              name: coin.symbol.toUpperCase(),
              value: coin.id
            });
          }
          returnData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          return returnData;
        },
        async getExchanges() {
          const returnData = [];
          const exchanges = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/exchanges/list");
          for (const exchange of exchanges) {
            returnData.push({
              name: exchange.name,
              value: exchange.id
            });
          }
          return returnData;
        },
        async getEventCountryCodes() {
          const returnData = [];
          const countryCodes = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/events/countries");
          for (const code of countryCodes.data) {
            if (!code.code) {
              continue;
            }
            returnData.push({
              name: code.country,
              value: code.code
            });
          }
          return returnData;
        },
        async getEventTypes() {
          const returnData = [];
          const eventTypes = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/events/types");
          for (const type of eventTypes.data) {
            returnData.push({
              name: type,
              value: type
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "coin") {
          if (operation === "get") {
            const options = this.getNodeParameter("options", i);
            qs.community_data = false;
            qs.developer_data = false;
            qs.localization = false;
            qs.market_data = false;
            qs.sparkline = false;
            qs.tickers = false;
            Object.assign(qs, options);
            const searchBy = this.getNodeParameter("searchBy", i);
            if (searchBy === "coinId") {
              const coinId = this.getNodeParameter("coinId", i);
              responseData = await import_GenericFunctions.coinGeckoApiRequest.call(
                this,
                "GET",
                `/coins/${coinId}`,
                {},
                qs
              );
            }
            if (searchBy === "contractAddress") {
              const platformId = this.getNodeParameter("platformId", i);
              const contractAddress = this.getNodeParameter("contractAddress", i);
              responseData = await import_GenericFunctions.coinGeckoApiRequest.call(
                this,
                "GET",
                `/coins/${platformId}/contract/${contractAddress}`,
                {},
                qs
              );
            }
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            let limit;
            responseData = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/coins/list", {}, qs);
            if (!returnAll) {
              limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "market") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const baseCurrency = this.getNodeParameter("baseCurrency", i);
            const options = this.getNodeParameter("options", i);
            qs.vs_currency = baseCurrency;
            Object.assign(qs, options);
            if (options.price_change_percentage) {
              qs.price_change_percentage = options.price_change_percentage.join(",");
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.coinGeckoRequestAllItems.call(
                this,
                "",
                "GET",
                "/coins/markets",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.per_page = limit;
              responseData = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/coins/markets", {}, qs);
            }
          }
          if (operation === "price") {
            const searchBy = this.getNodeParameter("searchBy", i);
            const quoteCurrencies = this.getNodeParameter("quoteCurrencies", i);
            const options = this.getNodeParameter("options", i);
            qs.vs_currencies = quoteCurrencies.join(",");
            Object.assign(qs, options);
            if (searchBy === "coinId") {
              const baseCurrencies = this.getNodeParameter("baseCurrencies", i);
              qs.ids = baseCurrencies.join(",");
              responseData = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/simple/price", {}, qs);
            }
            if (searchBy === "contractAddress") {
              const platformId = this.getNodeParameter("platformId", i);
              const contractAddresses = this.getNodeParameter("contractAddresses", i);
              qs.contract_addresses = contractAddresses;
              responseData = await import_GenericFunctions.coinGeckoApiRequest.call(
                this,
                "GET",
                `/simple/token_price/${platformId}`,
                {},
                qs
              );
            }
          }
          if (operation === "ticker") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const coinId = this.getNodeParameter("coinId", i);
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            if (options.exchange_ids) {
              qs.exchange_ids = options.exchange_ids.join(",");
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.coinGeckoRequestAllItems.call(
                this,
                "tickers",
                "GET",
                `/coins/${coinId}/tickers`,
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.coinGeckoApiRequest.call(
                this,
                "GET",
                `/coins/${coinId}/tickers`,
                {},
                qs
              );
              responseData = responseData.tickers;
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "history") {
            const coinId = this.getNodeParameter("coinId", i);
            const date = this.getNodeParameter("date", i);
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            qs.date = (0, import_moment_timezone.default)(date).format("DD-MM-YYYY");
            responseData = await import_GenericFunctions.coinGeckoApiRequest.call(
              this,
              "GET",
              `/coins/${coinId}/history`,
              {},
              qs
            );
          }
          if (operation === "marketChart") {
            let respData;
            const searchBy = this.getNodeParameter("searchBy", i);
            const quoteCurrency = this.getNodeParameter("quoteCurrency", i);
            const days = this.getNodeParameter("days", i);
            qs.vs_currency = quoteCurrency;
            qs.days = days;
            if (searchBy === "coinId") {
              const coinId = this.getNodeParameter("baseCurrency", i);
              respData = await import_GenericFunctions.coinGeckoApiRequest.call(
                this,
                "GET",
                `/coins/${coinId}/market_chart`,
                {},
                qs
              );
            }
            if (searchBy === "contractAddress") {
              const platformId = this.getNodeParameter("platformId", i);
              const contractAddress = this.getNodeParameter("contractAddress", i);
              respData = await import_GenericFunctions.coinGeckoApiRequest.call(
                this,
                "GET",
                `/coins/${platformId}/contract/${contractAddress}/market_chart`,
                {},
                qs
              );
            }
            responseData = [];
            for (let idx = 0; idx < respData.prices.length; idx++) {
              const [time, price] = respData.prices[idx];
              const marketCaps = respData.market_caps[idx][1];
              const totalVolume = respData.total_volumes[idx][1];
              responseData.push({
                time: (0, import_moment_timezone.default)(time).toISOString(),
                price,
                marketCaps,
                totalVolume
              });
            }
          }
          if (operation === "candlestick") {
            const baseCurrency = this.getNodeParameter("baseCurrency", i);
            const quoteCurrency = this.getNodeParameter("quoteCurrency", i);
            const days = this.getNodeParameter("days", i);
            qs.vs_currency = quoteCurrency;
            qs.days = days;
            responseData = await import_GenericFunctions.coinGeckoApiRequest.call(
              this,
              "GET",
              `/coins/${baseCurrency}/ohlc`,
              {},
              qs
            );
            for (let idx = 0; idx < responseData.length; idx++) {
              const [time, open, high, low, close] = responseData[idx];
              responseData[idx] = {
                time: (0, import_moment_timezone.default)(time).toISOString(),
                open,
                high,
                low,
                close
              };
            }
          }
        }
        if (resource === "event") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            if (returnAll) {
              responseData = await import_GenericFunctions.coinGeckoRequestAllItems.call(
                this,
                "data",
                "GET",
                "/events",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              qs.per_page = limit;
              responseData = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/events", {}, qs);
              responseData = responseData.data;
            }
          }
        }
        if (resource === "simple") {
          if (operation === "price") {
            const ids = this.getNodeParameter("ids", i);
            const currencies = this.getNodeParameter("currencies", i);
            const options = this.getNodeParameter("options", i);
            qs.ids = ids;
            qs.vs_currencies = currencies.join(",");
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.coinGeckoApiRequest.call(this, "GET", "/simple/price", {}, qs);
          }
          if (operation === "tokenPrice") {
            const id = this.getNodeParameter("id", i);
            const contractAddresses = this.getNodeParameter("contractAddresses", i);
            const currencies = this.getNodeParameter("currencies", i);
            const options = this.getNodeParameter("options", i);
            qs.contract_addresses = contractAddresses;
            qs.vs_currencies = currencies.join(",");
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.coinGeckoApiRequest.call(
              this,
              "GET",
              `/simple/token_price/${id}`,
              {},
              qs
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
          returnData.push({ error: error.message, json: {} });
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
  CoinGecko
});
//# sourceMappingURL=CoinGecko.node.js.map