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
var Stripe_node_exports = {};
__export(Stripe_node_exports, {
  Stripe: () => Stripe
});
module.exports = __toCommonJS(Stripe_node_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_helpers = require("./helpers");
class Stripe {
  constructor() {
    this.description = {
      displayName: "Stripe",
      name: "stripe",
      icon: "file:stripe.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Stripe API",
      defaults: {
        name: "Stripe"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "stripeApi",
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
              name: "Balance",
              value: "balance"
            },
            {
              name: "Charge",
              value: "charge"
            },
            {
              name: "Coupon",
              value: "coupon"
            },
            {
              name: "Customer",
              value: "customer"
            },
            {
              name: "Customer Card",
              value: "customerCard"
            },
            {
              name: "Source",
              value: "source"
            },
            {
              name: "Token",
              value: "token"
            }
          ],
          default: "balance"
        },
        ...import_descriptions.balanceOperations,
        ...import_descriptions.customerCardOperations,
        ...import_descriptions.customerCardFields,
        ...import_descriptions.chargeOperations,
        ...import_descriptions.chargeFields,
        ...import_descriptions.couponOperations,
        ...import_descriptions.couponFields,
        ...import_descriptions.customerOperations,
        ...import_descriptions.customerFields,
        ...import_descriptions.sourceOperations,
        ...import_descriptions.sourceFields,
        ...import_descriptions.tokenOperations,
        ...import_descriptions.tokenFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getCustomers() {
          return await import_helpers.loadResource.call(this, "customer");
        },
        async getCurrencies() {
          const returnData = [];
          const { data } = await import_helpers.stripeApiRequest.call(this, "GET", "/country_specs", {});
          for (const currency of data[0].supported_payment_currencies) {
            returnData.push({
              name: currency.toUpperCase(),
              value: currency
            });
          }
          return returnData;
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
        if (resource === "balance") {
          if (operation === "get") {
            responseData = await import_helpers.stripeApiRequest.call(this, "GET", "/balance", {}, {});
          }
        } else if (resource === "customerCard") {
          if (operation === "add") {
            const body = {
              source: this.getNodeParameter("token", i)
            };
            const customerId = this.getNodeParameter("customerId", i);
            const endpoint = `/customers/${customerId}/sources`;
            responseData = await import_helpers.stripeApiRequest.call(this, "POST", endpoint, body, {});
          } else if (operation === "remove") {
            const customerId = this.getNodeParameter("customerId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const endpoint = `/customers/${customerId}/sources/${cardId}`;
            responseData = await import_helpers.stripeApiRequest.call(this, "DELETE", endpoint, {}, {});
          } else if (operation === "get") {
            const customerId = this.getNodeParameter("customerId", i);
            const sourceId = this.getNodeParameter("sourceId", i);
            const endpoint = `/customers/${customerId}/sources/${sourceId}`;
            responseData = await import_helpers.stripeApiRequest.call(this, "GET", endpoint, {}, {});
          }
        } else if (resource === "charge") {
          if (operation === "create") {
            const body = {
              customer: this.getNodeParameter("customerId", i),
              currency: this.getNodeParameter("currency", i).toLowerCase(),
              amount: this.getNodeParameter("amount", i),
              source: this.getNodeParameter("source", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (!(0, import_isEmpty.default)(additionalFields)) {
              Object.assign(body, (0, import_helpers.adjustChargeFields)(additionalFields));
            }
            responseData = await import_helpers.stripeApiRequest.call(this, "POST", "/charges", body, {});
          } else if (operation === "get") {
            const chargeId = this.getNodeParameter("chargeId", i);
            responseData = await import_helpers.stripeApiRequest.call(this, "GET", `/charges/${chargeId}`, {}, {});
          } else if (operation === "getAll") {
            responseData = await import_helpers.handleListing.call(this, resource, i);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            Object.assign(body, (0, import_helpers.adjustChargeFields)(updateFields));
            const chargeId = this.getNodeParameter("chargeId", i);
            responseData = await import_helpers.stripeApiRequest.call(
              this,
              "POST",
              `/charges/${chargeId}`,
              body,
              {}
            );
          }
        } else if (resource === "coupon") {
          if (operation === "create") {
            const body = {
              duration: this.getNodeParameter("duration", i)
            };
            const type = this.getNodeParameter("type", i);
            if (type === "fixedAmount") {
              body.amount_off = this.getNodeParameter("amountOff", i);
              body.currency = this.getNodeParameter("currency", i);
            } else {
              body.percent_off = this.getNodeParameter("percentOff", i);
            }
            responseData = await import_helpers.stripeApiRequest.call(this, "POST", "/coupons", body, {});
          } else if (operation === "getAll") {
            responseData = await import_helpers.handleListing.call(this, resource, i);
          }
        } else if (resource === "customer") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (!(0, import_isEmpty.default)(additionalFields)) {
              Object.assign(body, (0, import_helpers.adjustCustomerFields)(additionalFields));
            }
            responseData = await import_helpers.stripeApiRequest.call(this, "POST", "/customers", body, {});
          } else if (operation === "delete") {
            const customerId = this.getNodeParameter("customerId", i);
            responseData = await import_helpers.stripeApiRequest.call(
              this,
              "DELETE",
              `/customers/${customerId}`,
              {},
              {}
            );
          } else if (operation === "get") {
            const customerId = this.getNodeParameter("customerId", i);
            responseData = await import_helpers.stripeApiRequest.call(
              this,
              "GET",
              `/customers/${customerId}`,
              {},
              {}
            );
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (!(0, import_isEmpty.default)(filters)) {
              qs.email = filters.email;
            }
            responseData = await import_helpers.handleListing.call(this, resource, i, qs);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            Object.assign(body, (0, import_helpers.adjustCustomerFields)(updateFields));
            const customerId = this.getNodeParameter("customerId", i);
            responseData = await import_helpers.stripeApiRequest.call(
              this,
              "POST",
              `/customers/${customerId}`,
              body,
              {}
            );
          }
        } else if (resource === "source") {
          if (operation === "create") {
            const customerId = this.getNodeParameter("customerId", i);
            const body = {
              type: this.getNodeParameter("type", i),
              amount: this.getNodeParameter("amount", i),
              currency: this.getNodeParameter("currency", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (!(0, import_isEmpty.default)(additionalFields)) {
              Object.assign(body, (0, import_helpers.adjustMetadata)(additionalFields));
            }
            responseData = await import_helpers.stripeApiRequest.call(this, "POST", "/sources", body, {});
            const endpoint = `/customers/${customerId}/sources`;
            await import_helpers.stripeApiRequest.call(this, "POST", endpoint, { source: responseData.id }, {});
          } else if (operation === "delete") {
            const sourceId = this.getNodeParameter("sourceId", i);
            const customerId = this.getNodeParameter("customerId", i);
            const endpoint = `/customers/${customerId}/sources/${sourceId}`;
            responseData = await import_helpers.stripeApiRequest.call(this, "DELETE", endpoint, {}, {});
          } else if (operation === "get") {
            const sourceId = this.getNodeParameter("sourceId", i);
            responseData = await import_helpers.stripeApiRequest.call(this, "GET", `/sources/${sourceId}`, {}, {});
          }
        } else if (resource === "token") {
          if (operation === "create") {
            const type = this.getNodeParameter("type", i);
            const body = {};
            if (type !== "cardToken") {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Only card token creation implemented.",
                { itemIndex: i }
              );
            }
            body.card = {
              number: this.getNodeParameter("number", i),
              exp_month: this.getNodeParameter("expirationMonth", i),
              exp_year: this.getNodeParameter("expirationYear", i),
              cvc: this.getNodeParameter("cvc", i)
            };
            responseData = await import_helpers.stripeApiRequest.call(this, "POST", "/tokens", body, {});
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
  Stripe
});
//# sourceMappingURL=Stripe.node.js.map