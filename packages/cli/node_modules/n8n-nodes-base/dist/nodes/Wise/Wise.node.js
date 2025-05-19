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
var Wise_node_exports = {};
__export(Wise_node_exports, {
  Wise: () => Wise
});
module.exports = __toCommonJS(Wise_node_exports);
var import_omit = __toESM(require("lodash/omit"));
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_uuid = require("uuid");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Wise {
  constructor() {
    this.description = {
      displayName: "Wise",
      name: "wise",
      icon: "file:wise.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Wise API",
      defaults: {
        name: "Wise"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "wiseApi",
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
              name: "Account",
              value: "account"
            },
            {
              name: "Exchange Rate",
              value: "exchangeRate"
            },
            {
              name: "Profile",
              value: "profile"
            },
            {
              name: "Quote",
              value: "quote"
            },
            {
              name: "Recipient",
              value: "recipient"
            },
            {
              name: "Transfer",
              value: "transfer"
            }
          ],
          default: "account"
        },
        ...import_descriptions.accountOperations,
        ...import_descriptions.accountFields,
        ...import_descriptions.exchangeRateOperations,
        ...import_descriptions.exchangeRateFields,
        ...import_descriptions.profileOperations,
        ...import_descriptions.profileFields,
        ...import_descriptions.quoteOperations,
        ...import_descriptions.quoteFields,
        ...import_descriptions.recipientOperations,
        ...import_descriptions.recipientFields,
        ...import_descriptions.transferOperations,
        ...import_descriptions.transferFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getBorderlessAccounts() {
          const qs = {
            profileId: this.getNodeParameter("profileId", 0)
          };
          const accounts = await import_GenericFunctions.wiseApiRequest.call(this, "GET", "v1/borderless-accounts", {}, qs);
          return accounts.map(({ id, balances }) => ({
            name: balances.map(({ currency }) => currency).join(" - "),
            value: id
          }));
        },
        async getProfiles() {
          const profiles = await import_GenericFunctions.wiseApiRequest.call(this, "GET", "v1/profiles");
          return profiles.map(({ id, type }) => ({
            name: type.charAt(0).toUpperCase() + type.slice(1),
            value: id
          }));
        },
        async getRecipients() {
          const qs = {
            profileId: this.getNodeParameter("profileId", 0)
          };
          const recipients = await import_GenericFunctions.wiseApiRequest.call(
            this,
            "GET",
            "v1/accounts",
            {},
            qs
          );
          return recipients.reduce(
            (activeRecipients, { active, id, accountHolderName, currency, country, type }) => {
              if (active) {
                const recipient = {
                  name: `[${currency}] ${accountHolderName} - (${country !== null ? country + " - " : ""}${type})`,
                  value: id
                };
                activeRecipients.push(recipient);
              }
              return activeRecipients;
            },
            []
          );
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const timezone = this.getTimezone();
    let responseData;
    const returnData = [];
    let binaryOutput = false;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "account") {
          if (operation === "getBalances") {
            const qs = {
              profileId: this.getNodeParameter("profileId", i)
            };
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", "v1/borderless-accounts", {}, qs);
          } else if (operation === "getCurrencies") {
            responseData = await import_GenericFunctions.wiseApiRequest.call(
              this,
              "GET",
              "v1/borderless-accounts/balance-currencies"
            );
          } else if (operation === "getStatement") {
            const profileId = this.getNodeParameter("profileId", i);
            const borderlessAccountId = this.getNodeParameter("borderlessAccountId", i);
            const format = this.getNodeParameter("format", i);
            const endpoint = `v3/profiles/${profileId}/borderless-accounts/${borderlessAccountId}/statement.${format}`;
            const qs = {
              currency: this.getNodeParameter("currency", i)
            };
            const { lineStyle, range } = this.getNodeParameter(
              "additionalFields",
              i
            );
            if (lineStyle !== void 0) {
              qs.type = lineStyle;
            }
            if (range !== void 0) {
              qs.intervalStart = import_moment_timezone.default.tz(range.rangeProperties.intervalStart, timezone).utc().format();
              qs.intervalEnd = import_moment_timezone.default.tz(range.rangeProperties.intervalEnd, timezone).utc().format();
            } else {
              qs.intervalStart = (0, import_moment_timezone.default)().subtract(1, "months").utc().format();
              qs.intervalEnd = (0, import_moment_timezone.default)().utc().format();
            }
            if (format === "json") {
              responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", endpoint, {}, qs);
            } else {
              const data = await import_GenericFunctions.wiseApiRequest.call(this, "GET", endpoint, {}, qs, {
                encoding: "arraybuffer"
              });
              const binaryProperty = this.getNodeParameter("binaryProperty", i);
              items[i].binary = items[i].binary ?? {};
              items[i].binary[binaryProperty] = await this.helpers.prepareBinaryData(
                data,
                this.getNodeParameter("fileName", i)
              );
              responseData = items;
              binaryOutput = true;
            }
          }
        } else if (resource === "exchangeRate") {
          if (operation === "get") {
            const qs = {
              source: this.getNodeParameter("source", i),
              target: this.getNodeParameter("target", i)
            };
            const { interval, range, time } = this.getNodeParameter(
              "additionalFields",
              i
            );
            if (interval !== void 0) {
              qs.group = interval;
            }
            if (time !== void 0) {
              qs.time = time;
            }
            if (range !== void 0 && time === void 0) {
              qs.from = import_moment_timezone.default.tz(range.rangeProperties.from, timezone).utc().format();
              qs.to = import_moment_timezone.default.tz(range.rangeProperties.to, timezone).utc().format();
            } else if (time === void 0) {
              qs.from = (0, import_moment_timezone.default)().subtract(1, "months").utc().format();
              qs.to = (0, import_moment_timezone.default)().utc().format();
            }
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", "v1/rates", {}, qs);
          }
        } else if (resource === "profile") {
          if (operation === "get") {
            const profileId = this.getNodeParameter("profileId", i);
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", `v1/profiles/${profileId}`);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", "v1/profiles");
          }
        } else if (resource === "recipient") {
          if (operation === "getAll") {
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", "v1/accounts");
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
        } else if (resource === "quote") {
          if (operation === "create") {
            const body = {
              profile: this.getNodeParameter("profileId", i),
              sourceCurrency: this.getNodeParameter("sourceCurrency", i).toUpperCase(),
              targetCurrency: this.getNodeParameter("targetCurrency", i).toUpperCase()
            };
            const amountType = this.getNodeParameter("amountType", i);
            if (amountType === "source") {
              body.sourceAmount = this.getNodeParameter("amount", i);
            } else if (amountType === "target") {
              body.targetAmount = this.getNodeParameter("amount", i);
            }
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "POST", "v2/quotes", body, {});
          } else if (operation === "get") {
            const quoteId = this.getNodeParameter("quoteId", i);
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", `v2/quotes/${quoteId}`);
          }
        } else if (resource === "transfer") {
          if (operation === "create") {
            const body = {
              quoteUuid: this.getNodeParameter("quoteId", i),
              targetAccount: this.getNodeParameter("targetAccountId", i),
              customerTransactionId: (0, import_uuid.v4)()
            };
            const { reference } = this.getNodeParameter("additionalFields", i);
            if (reference !== void 0) {
              body.details = { reference };
            }
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "POST", "v1/transfers", body, {});
          } else if (operation === "delete") {
            const transferId = this.getNodeParameter("transferId", i);
            responseData = await import_GenericFunctions.wiseApiRequest.call(
              this,
              "PUT",
              `v1/transfers/${transferId}/cancel`
            );
          } else if (operation === "execute") {
            const profileId = this.getNodeParameter("profileId", i);
            const transferId = this.getNodeParameter("transferId", i);
            const endpoint = `v3/profiles/${profileId}/transfers/${transferId}/payments`;
            responseData = await import_GenericFunctions.wiseApiRequest.call(
              this,
              "POST",
              endpoint,
              { type: "BALANCE" },
              {}
            );
            const { environment } = await this.getCredentials("wiseApi");
            if (environment === "test") {
              for (const testEndpoint of [
                "processing",
                "funds_converted",
                "outgoing_payment_sent"
              ]) {
                await import_GenericFunctions.wiseApiRequest.call(
                  this,
                  "GET",
                  `v1/simulation/transfers/${transferId}/${testEndpoint}`
                );
              }
            }
          } else if (operation === "get") {
            const transferId = this.getNodeParameter("transferId", i);
            const downloadReceipt = this.getNodeParameter("downloadReceipt", i);
            if (downloadReceipt) {
              const data = await import_GenericFunctions.wiseApiRequest.call(
                this,
                "GET",
                `v1/transfers/${transferId}/receipt.pdf`,
                {},
                {},
                { encoding: "arraybuffer" }
              );
              const binaryProperty = this.getNodeParameter("binaryProperty", i);
              items[i].binary = items[i].binary ?? {};
              items[i].binary[binaryProperty] = await this.helpers.prepareBinaryData(
                data,
                this.getNodeParameter("fileName", i)
              );
              responseData = items;
              binaryOutput = true;
            } else {
              responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", `v1/transfers/${transferId}`);
            }
          } else if (operation === "getAll") {
            const qs = {
              profile: this.getNodeParameter("profileId", i)
            };
            const filters = this.getNodeParameter("filters", i);
            Object.keys((0, import_omit.default)(filters, "range")).forEach((key) => {
              qs[key] = filters[key];
            });
            if (filters.range !== void 0) {
              qs.createdDateStart = import_moment_timezone.default.tz(filters.range.rangeProperties.createdDateStart, timezone).utc().format();
              qs.createdDateEnd = import_moment_timezone.default.tz(filters.range.rangeProperties.createdDateEnd, timezone).utc().format();
            } else {
              qs.createdDateStart = (0, import_moment_timezone.default)().subtract(1, "months").utc().format();
              qs.createdDateEnd = (0, import_moment_timezone.default)().utc().format();
            }
            const returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            responseData = await import_GenericFunctions.wiseApiRequest.call(this, "GET", "v1/transfers", {}, qs);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
      Array.isArray(responseData) ? returnData.push(...responseData) : returnData.push(responseData);
    }
    if (binaryOutput && responseData !== void 0) {
      return [responseData];
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Wise
});
//# sourceMappingURL=Wise.node.js.map