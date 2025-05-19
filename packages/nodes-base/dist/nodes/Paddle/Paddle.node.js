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
var Paddle_node_exports = {};
__export(Paddle_node_exports, {
  Paddle: () => Paddle
});
module.exports = __toCommonJS(Paddle_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_CouponDescription = require("./CouponDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_PaymentDescription = require("./PaymentDescription");
var import_PlanDescription = require("./PlanDescription");
var import_ProductDescription = require("./ProductDescription");
var import_UserDescription = require("./UserDescription");
class Paddle {
  constructor() {
    this.description = {
      displayName: "Paddle",
      name: "paddle",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:paddle.png",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Paddle API",
      defaults: {
        name: "Paddle"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "paddleApi",
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
              name: "Coupon",
              value: "coupon"
            },
            {
              name: "Payment",
              value: "payment"
            },
            {
              name: "Plan",
              value: "plan"
            },
            {
              name: "Product",
              value: "product"
            },
            // {
            // 	name: 'Order',
            // 	value: 'order',
            // },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "coupon"
        },
        // COUPON
        ...import_CouponDescription.couponOperations,
        ...import_CouponDescription.couponFields,
        // PAYMENT
        ...import_PaymentDescription.paymentOperations,
        ...import_PaymentDescription.paymentFields,
        // PLAN
        ...import_PlanDescription.planOperations,
        ...import_PlanDescription.planFields,
        // PRODUCT
        ...import_ProductDescription.productOperations,
        ...import_ProductDescription.productFields,
        // ORDER
        // ...orderOperations,
        // ...orderFields,
        // USER
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        /* -------------------------------------------------------------------------- */
        /*                                 PAYMENT                                    */
        /* -------------------------------------------------------------------------- */
        // Get all payment so they can be selected in payment rescheduling
        async getPayments() {
          const returnData = [];
          const endpoint = "/2.0/subscription/payments";
          const paymentResponse = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", {});
          if (paymentResponse.response === void 0 || paymentResponse.response.length === 0) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), paymentResponse, {
              message: "No payments on account."
            });
          }
          for (const payment of paymentResponse.response) {
            const id = payment.id;
            returnData.push({
              name: id,
              value: id
            });
          }
          return returnData;
        },
        /* -------------------------------------------------------------------------- */
        /*                                 PRODUCTS                                   */
        /* -------------------------------------------------------------------------- */
        // Get all Products so they can be selected in coupon creation when assigning products
        async getProducts() {
          const returnData = [];
          const endpoint = "/2.0/product/get_products";
          const products = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", {});
          if (products.length === 0) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No products on account.");
          }
          for (const product of products) {
            const name = product.name;
            const id = product.id;
            returnData.push({
              name,
              value: id
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
    let responseData;
    const body = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "coupon") {
          if (operation === "create") {
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const discountType = this.getNodeParameter("discountType", i);
              const couponType = this.getNodeParameter("couponType", i);
              const discountAmount = this.getNodeParameter("discountAmount", i);
              if (couponType === "product") {
                body.product_ids = this.getNodeParameter("productIds", i);
              }
              if (discountType === "flat") {
                body.currency = this.getNodeParameter("currency", i);
              }
              body.coupon_type = couponType;
              body.discount_type = discountType;
              body.discount_amount = discountAmount;
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.allowedUses) {
                body.allowed_uses = additionalFields.allowedUses;
              }
              if (additionalFields.couponCode) {
                body.coupon_code = additionalFields.couponCode;
              }
              if (additionalFields.couponPrefix) {
                body.coupon_prefix = additionalFields.couponPrefix;
              }
              if (additionalFields.expires) {
                body.expires = (0, import_moment_timezone.default)(additionalFields.expires).format("YYYY-MM-DD");
              }
              if (additionalFields.group) {
                body.group = additionalFields.group;
              }
              if (additionalFields.recurring) {
                body.recurring = 1;
              } else {
                body.recurring = 0;
              }
              if (additionalFields.numberOfCoupons) {
                body.num_coupons = additionalFields.numberOfCoupons;
              }
              if (additionalFields.description) {
                body.description = additionalFields.description;
              }
              const endpoint = "/2.1/product/create_coupon";
              responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
              responseData = responseData.response.coupon_codes.map((coupon) => ({
                coupon
              }));
            }
          }
          if (operation === "getAll") {
            const productId = this.getNodeParameter("productId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const endpoint = "/2.0/product/list_coupons";
            body.product_id = productId;
            responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
            if (returnAll) {
              responseData = responseData.response;
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.response.splice(0, limit);
            }
          }
          if (operation === "update") {
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const updateBy = this.getNodeParameter("updateBy", i);
              if (updateBy === "group") {
                body.group = this.getNodeParameter("group", i);
              } else {
                body.coupon_code = this.getNodeParameter("couponCode", i);
              }
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.allowedUses) {
                body.allowed_uses = additionalFields.allowedUses;
              }
              if (additionalFields.currency) {
                body.currency = additionalFields.currency;
              }
              if (additionalFields.newCouponCode) {
                body.new_coupon_code = additionalFields.newCouponCode;
              }
              if (additionalFields.expires) {
                body.expires = (0, import_moment_timezone.default)(additionalFields.expires).format("YYYY-MM-DD");
              }
              if (additionalFields.newGroup) {
                body.new_group = additionalFields.newGroup;
              }
              if (additionalFields.recurring === true) {
                body.recurring = 1;
              } else if (additionalFields.recurring === false) {
                body.recurring = 0;
              }
              if (additionalFields.productIds) {
                body.product_ids = additionalFields.productIds;
              }
              if (additionalFields.discountAmount) {
                body.discount_amount = additionalFields.discountAmount;
              }
              if (additionalFields.discount) {
                if (additionalFields.discount.discountProperties.discountType === "percentage") {
                  body.discount_amount = additionalFields.discount.discountProperties.discountAmount;
                } else {
                  body.currency = additionalFields.discount.discountProperties.currency;
                  body.discount_amount = additionalFields.discount.discountProperties.discountAmount;
                }
              }
            }
            const endpoint = "/2.1/product/update_coupon";
            responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
            responseData = responseData.response;
          }
        }
        if (resource === "payment") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.subscriptionId) {
                body.subscription_id = additionalFields.subscriptionId;
              }
              if (additionalFields.plan) {
                body.plan = additionalFields.plan;
              }
              if (additionalFields.state) {
                body.state = additionalFields.state;
              }
              if (additionalFields.isPaid) {
                body.is_paid = 1;
              } else {
                body.is_paid = 0;
              }
              if (additionalFields.from) {
                body.from = (0, import_moment_timezone.default)(additionalFields.from).format("YYYY-MM-DD");
              }
              if (additionalFields.to) {
                body.to = (0, import_moment_timezone.default)(additionalFields.to).format("YYYY-MM-DD");
              }
              if (additionalFields.isOneOffCharge) {
                body.is_one_off_charge = additionalFields.isOneOffCharge;
              }
            }
            const endpoint = "/2.0/subscription/payments";
            responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
            if (returnAll) {
              responseData = responseData.response;
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.response.splice(0, limit);
            }
          }
          if (operation === "reschedule") {
            const paymentId = this.getNodeParameter("paymentId", i);
            const date = this.getNodeParameter("date", i);
            body.payment_id = paymentId;
            body.date = body.to = (0, import_moment_timezone.default)(date).format("YYYY-MM-DD");
            const endpoint = "/2.0/subscription/payments_reschedule";
            responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
          }
        }
        if (resource === "plan") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const endpoint = "/2.0/subscription/plans";
            responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
            if (returnAll) {
              responseData = responseData.response;
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.response.splice(0, limit);
            }
          }
          if (operation === "get") {
            const planId = this.getNodeParameter("planId", i);
            body.plan = planId;
            const endpoint = "/2.0/subscription/plans";
            responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
            responseData = responseData.response;
          }
        }
        if (resource === "product") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const endpoint = "/2.0/product/get_products";
            responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
            if (returnAll) {
              responseData = responseData.response.products;
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.response.products.splice(0, limit);
            }
          }
        }
        if (resource === "order") {
          if (operation === "get") {
            const endpoint = "/1.0/order";
            const checkoutId = this.getNodeParameter("checkoutId", i);
            body.checkout_id = checkoutId;
            responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "GET", body);
          }
        }
        if (resource === "user") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            if (jsonParameters) {
              const additionalFieldsJson = this.getNodeParameter(
                "additionalFieldsJson",
                i
              );
              if (additionalFieldsJson !== "") {
                if ((0, import_GenericFunctions.validateJSON)(additionalFieldsJson) !== void 0) {
                  Object.assign(body, JSON.parse(additionalFieldsJson));
                } else {
                  throw new import_n8n_workflow.NodeOperationError(
                    this.getNode(),
                    "Additional fields must be a valid JSON",
                    { itemIndex: i }
                  );
                }
              }
            } else {
              const additionalFields = this.getNodeParameter("additionalFields", i);
              if (additionalFields.state) {
                body.state = additionalFields.state;
              }
              if (additionalFields.planId) {
                body.plan_id = additionalFields.planId;
              }
              if (additionalFields.subscriptionId) {
                body.subscription_id = additionalFields.subscriptionId;
              }
            }
            const endpoint = "/2.0/subscription/users";
            if (returnAll) {
              responseData = await import_GenericFunctions.paddleApiRequestAllItems.call(
                this,
                "response",
                endpoint,
                "POST",
                body
              );
            } else {
              body.results_per_page = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.paddleApiRequest.call(this, endpoint, "POST", body);
              responseData = responseData.response;
            }
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
  Paddle
});
//# sourceMappingURL=Paddle.node.js.map