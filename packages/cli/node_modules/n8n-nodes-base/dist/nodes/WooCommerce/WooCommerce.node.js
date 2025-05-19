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
var WooCommerce_node_exports = {};
__export(WooCommerce_node_exports, {
  WooCommerce: () => WooCommerce
});
module.exports = __toCommonJS(WooCommerce_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
var import_OrderDescription = require("./OrderDescription");
var import_ProductDescription = require("./ProductDescription");
class WooCommerce {
  constructor() {
    this.description = {
      displayName: "WooCommerce",
      name: "wooCommerce",
      icon: "file:wooCommerce.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume WooCommerce API",
      defaults: {
        name: "WooCommerce"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "wooCommerceApi",
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
              name: "Order",
              value: "order"
            },
            {
              name: "Product",
              value: "product"
            }
          ],
          default: "product"
        },
        ...import_descriptions.customerOperations,
        ...import_descriptions.customerFields,
        ...import_ProductDescription.productOperations,
        ...import_ProductDescription.productFields,
        ...import_OrderDescription.orderOperations,
        ...import_OrderDescription.orderFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available categories to display them to user so that they can
        // select them easily
        async getCategories() {
          const returnData = [];
          const categories = await import_GenericFunctions.woocommerceApiRequestAllItems.call(
            this,
            "GET",
            "/products/categories",
            {}
          );
          for (const category of categories) {
            const categoryName = category.name;
            const categoryId = category.id;
            returnData.push({
              name: categoryName,
              value: categoryId
            });
          }
          return returnData;
        },
        // Get all the available tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.woocommerceApiRequestAllItems.call(this, "GET", "/products/tags", {});
          for (const tag of tags) {
            const tagName = tag.name;
            const tagId = tag.id;
            returnData.push({
              name: tagName,
              value: tagId
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
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "customer") {
        if (operation === "create") {
          const body = {
            email: this.getNodeParameter("email", i)
          };
          const additionalFields = this.getNodeParameter("additionalFields", i);
          if (Object.keys(additionalFields).length) {
            Object.assign(body, (0, import_GenericFunctions.adjustMetadata)(additionalFields));
          }
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "POST", "/customers", body);
        } else if (operation === "delete") {
          const customerId = this.getNodeParameter("customerId", i);
          qs.force = true;
          const endpoint = `/customers/${customerId}`;
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "DELETE", endpoint, {}, qs);
        } else if (operation === "get") {
          const customerId = this.getNodeParameter("customerId", i);
          const endpoint = `/customers/${customerId}`;
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "GET", endpoint);
        } else if (operation === "getAll") {
          const filters = this.getNodeParameter("filters", i);
          const returnAll = this.getNodeParameter("returnAll", i);
          if (Object.keys(filters).length) {
            Object.assign(qs, filters);
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.woocommerceApiRequestAllItems.call(
              this,
              "GET",
              "/customers",
              {},
              {}
            );
          } else {
            qs.per_page = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "GET", "/customers", {}, qs);
          }
        } else if (operation === "update") {
          const body = {};
          const updateFields = this.getNodeParameter("updateFields", i);
          if (Object.keys(updateFields).length) {
            Object.assign(body, (0, import_GenericFunctions.adjustMetadata)(updateFields));
          }
          const customerId = this.getNodeParameter("customerId", i);
          const endpoint = `/customers/${customerId}`;
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "PUT", endpoint, body);
        }
      } else if (resource === "product") {
        if (operation === "create") {
          const name = this.getNodeParameter("name", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            name
          };
          (0, import_GenericFunctions.setFields)(additionalFields, body);
          if (additionalFields.categories) {
            body.categories = additionalFields.categories.map((category) => ({
              id: parseInt(category, 10)
            }));
          }
          const images = this.getNodeParameter("imagesUi", i).imagesValues;
          if (images) {
            body.images = images;
          }
          const dimension = this.getNodeParameter("dimensionsUi", i).dimensionsValues;
          if (dimension) {
            body.dimensions = dimension;
          }
          const metadata = this.getNodeParameter("metadataUi", i).metadataValues;
          if (metadata) {
            body.meta_data = metadata;
          }
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "POST", "/products", body);
        }
        if (operation === "update") {
          const productId = this.getNodeParameter("productId", i);
          const updateFields = this.getNodeParameter("updateFields", i);
          const body = {};
          (0, import_GenericFunctions.setFields)(updateFields, body);
          const images = this.getNodeParameter("imagesUi", i).imagesValues;
          if (images) {
            body.images = images;
          }
          const dimension = this.getNodeParameter("dimensionsUi", i).dimensionsValues;
          if (dimension) {
            body.dimensions = dimension;
          }
          const metadata = this.getNodeParameter("metadataUi", i).metadataValues;
          if (metadata) {
            body.meta_data = metadata;
          }
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(
            this,
            "PUT",
            `/products/${productId}`,
            body
          );
        }
        if (operation === "get") {
          const productId = this.getNodeParameter("productId", i);
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(
            this,
            "GET",
            `/products/${productId}`,
            {},
            qs
          );
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const options = this.getNodeParameter("options", i);
          if (options.after) {
            qs.after = options.after;
          }
          if (options.before) {
            qs.before = options.before;
          }
          if (options.category) {
            qs.category = options.category;
          }
          if (options.context) {
            qs.context = options.context;
          }
          if (options.featured) {
            qs.featured = options.featured;
          }
          if (options.maxPrice) {
            qs.max_price = options.maxPrice;
          }
          if (options.minPrice) {
            qs.max_price = options.minPrice;
          }
          if (options.order) {
            qs.order = options.order;
          }
          if (options.orderBy) {
            qs.orderby = options.orderBy;
          }
          if (options.search) {
            qs.search = options.search;
          }
          if (options.sku) {
            qs.sku = options.sku;
          }
          if (options.slug) {
            qs.slug = options.slug;
          }
          if (options.status) {
            qs.status = options.status;
          }
          if (options.stockStatus) {
            qs.stock_status = options.stockStatus;
          }
          if (options.tag) {
            qs.tag = options.tag;
          }
          if (options.taxClass) {
            qs.tax_class = options.taxClass;
          }
          if (options.type) {
            qs.type = options.type;
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.woocommerceApiRequestAllItems.call(
              this,
              "GET",
              "/products",
              {},
              qs
            );
          } else {
            qs.per_page = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "GET", "/products", {}, qs);
          }
        }
        if (operation === "delete") {
          const productId = this.getNodeParameter("productId", i);
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(
            this,
            "DELETE",
            `/products/${productId}`,
            {},
            { force: true }
          );
        }
      }
      if (resource === "order") {
        if (operation === "create") {
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {};
          (0, import_GenericFunctions.setFields)(additionalFields, body);
          const billing = this.getNodeParameter("billingUi", i).billingValues;
          if (billing !== void 0) {
            body.billing = billing;
            (0, import_GenericFunctions.toSnakeCase)(billing);
          }
          const shipping = this.getNodeParameter("shippingUi", i).shippingValues;
          if (shipping !== void 0) {
            body.shipping = shipping;
            (0, import_GenericFunctions.toSnakeCase)(shipping);
          }
          const couponLines = this.getNodeParameter("couponLinesUi", i).couponLinesValues;
          if (couponLines) {
            body.coupon_lines = couponLines;
            (0, import_GenericFunctions.setMetadata)(couponLines);
            (0, import_GenericFunctions.toSnakeCase)(couponLines);
          }
          const feeLines = this.getNodeParameter("feeLinesUi", i).feeLinesValues;
          if (feeLines) {
            body.fee_lines = feeLines;
            (0, import_GenericFunctions.setMetadata)(feeLines);
            (0, import_GenericFunctions.toSnakeCase)(feeLines);
          }
          const lineItems = this.getNodeParameter("lineItemsUi", i).lineItemsValues;
          if (lineItems) {
            body.line_items = lineItems;
            (0, import_GenericFunctions.setMetadata)(lineItems);
            (0, import_GenericFunctions.toSnakeCase)(lineItems);
          }
          const metadata = this.getNodeParameter("metadataUi", i).metadataValues;
          if (metadata) {
            body.meta_data = metadata;
          }
          const shippingLines = this.getNodeParameter("shippingLinesUi", i).shippingLinesValues;
          if (shippingLines) {
            body.shipping_lines = shippingLines;
            (0, import_GenericFunctions.setMetadata)(shippingLines);
            (0, import_GenericFunctions.toSnakeCase)(shippingLines);
          }
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "POST", "/orders", body);
        }
        if (operation === "update") {
          const orderId = this.getNodeParameter("orderId", i);
          const updateFields = this.getNodeParameter("updateFields", i);
          const body = {};
          if (updateFields.currency) {
            body.currency = updateFields.currency;
          }
          if (updateFields.customerId) {
            body.customer_id = parseInt(updateFields.customerId, 10);
          }
          if (updateFields.customerNote) {
            body.customer_note = updateFields.customerNote;
          }
          if (updateFields.parentId) {
            body.parent_id = parseInt(updateFields.parentId, 10);
          }
          if (updateFields.paymentMethodId) {
            body.payment_method = updateFields.paymentMethodId;
          }
          if (updateFields.paymentMethodTitle) {
            body.payment_method_title = updateFields.paymentMethodTitle;
          }
          if (updateFields.status) {
            body.status = updateFields.status;
          }
          if (updateFields.transactionID) {
            body.transaction_id = updateFields.transactionID;
          }
          const billing = this.getNodeParameter("billingUi", i).billingValues;
          if (billing !== void 0) {
            body.billing = billing;
            (0, import_GenericFunctions.toSnakeCase)(billing);
          }
          const shipping = this.getNodeParameter("shippingUi", i).shippingValues;
          if (shipping !== void 0) {
            body.shipping = shipping;
            (0, import_GenericFunctions.toSnakeCase)(shipping);
          }
          const couponLines = this.getNodeParameter("couponLinesUi", i).couponLinesValues;
          if (couponLines) {
            body.coupon_lines = couponLines;
            (0, import_GenericFunctions.setMetadata)(couponLines);
            (0, import_GenericFunctions.toSnakeCase)(couponLines);
          }
          const feeLines = this.getNodeParameter("feeLinesUi", i).feeLinesValues;
          if (feeLines) {
            body.fee_lines = feeLines;
            (0, import_GenericFunctions.setMetadata)(feeLines);
            (0, import_GenericFunctions.toSnakeCase)(feeLines);
          }
          const lineItems = this.getNodeParameter("lineItemsUi", i).lineItemsValues;
          if (lineItems) {
            body.line_items = lineItems;
            (0, import_GenericFunctions.setMetadata)(lineItems);
            (0, import_GenericFunctions.toSnakeCase)(lineItems);
          }
          const metadata = this.getNodeParameter("metadataUi", i).metadataValues;
          if (metadata) {
            body.meta_data = metadata;
          }
          const shippingLines = this.getNodeParameter("shippingLinesUi", i).shippingLinesValues;
          if (shippingLines) {
            body.shipping_lines = shippingLines;
            (0, import_GenericFunctions.setMetadata)(shippingLines);
            (0, import_GenericFunctions.toSnakeCase)(shippingLines);
          }
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "PUT", `/orders/${orderId}`, body);
        }
        if (operation === "get") {
          const orderId = this.getNodeParameter("orderId", i);
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(
            this,
            "GET",
            `/orders/${orderId}`,
            {},
            qs
          );
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const options = this.getNodeParameter("options", i);
          if (options.after) {
            qs.after = options.after;
          }
          if (options.before) {
            qs.before = options.before;
          }
          if (options.category) {
            qs.category = options.category;
          }
          if (options.customer) {
            qs.customer = parseInt(options.customer, 10);
          }
          if (options.decimalPoints) {
            qs.dp = options.decimalPoints;
          }
          if (options.product) {
            qs.product = parseInt(options.product, 10);
          }
          if (options.order) {
            qs.order = options.order;
          }
          if (options.orderBy) {
            qs.orderby = options.orderBy;
          }
          if (options.search) {
            qs.search = options.search;
          }
          if (options.status) {
            qs.status = options.status;
          }
          if (returnAll) {
            responseData = await import_GenericFunctions.woocommerceApiRequestAllItems.call(this, "GET", "/orders", {}, qs);
          } else {
            qs.per_page = this.getNodeParameter("limit", i);
            responseData = await import_GenericFunctions.woocommerceApiRequest.call(this, "GET", "/orders", {}, qs);
          }
        }
        if (operation === "delete") {
          const orderId = this.getNodeParameter("orderId", i);
          responseData = await import_GenericFunctions.woocommerceApiRequest.call(
            this,
            "DELETE",
            `/orders/${orderId}`,
            {},
            { force: true }
          );
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
  WooCommerce
});
//# sourceMappingURL=WooCommerce.node.js.map