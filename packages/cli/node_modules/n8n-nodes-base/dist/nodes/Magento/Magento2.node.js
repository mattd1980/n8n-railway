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
var Magento2_node_exports = {};
__export(Magento2_node_exports, {
  Magento2: () => Magento2
});
module.exports = __toCommonJS(Magento2_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_CustomerDescription = require("./CustomerDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_InvoiceDescription = require("./InvoiceDescription");
var import_OrderDescription = require("./OrderDescription");
var import_ProductDescription = require("./ProductDescription");
class Magento2 {
  constructor() {
    this.description = {
      displayName: "Magento 2",
      name: "magento2",
      icon: "file:magento.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Magento API",
      defaults: {
        name: "Magento 2"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "magento2Api",
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
              name: "Invoice",
              value: "invoice"
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
          default: "customer"
        },
        ...import_CustomerDescription.customerOperations,
        ...import_CustomerDescription.customerFields,
        ...import_InvoiceDescription.invoiceOperations,
        ...import_InvoiceDescription.invoiceFields,
        ...import_OrderDescription.orderOperations,
        ...import_OrderDescription.orderFields,
        ...import_ProductDescription.productOperations,
        ...import_ProductDescription.productFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getCountries() {
          const countries = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            "/rest/default/V1/directory/countries"
          );
          const returnData = [];
          for (const country of countries) {
            returnData.push({
              name: country.full_name_english,
              value: country.id
            });
          }
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getGroups() {
          const group = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            "/rest/default/V1/customerGroups/default"
          );
          const returnData = [];
          returnData.push({
            name: group.code,
            value: group.id
          });
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getStores() {
          const stores = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            "/rest/default/V1/store/storeConfigs"
          );
          const returnData = [];
          for (const store of stores) {
            returnData.push({
              name: store.base_url,
              value: store.id
            });
          }
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getWebsites() {
          const websites = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            "/rest/default/V1/store/websites"
          );
          const returnData = [];
          for (const website of websites) {
            returnData.push({
              name: website.name,
              value: website.id
            });
          }
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getCustomAttributes() {
          const resource = this.getCurrentNodeParameter("resource");
          const attributes = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            `/rest/default/V1/attributeMetadata/${resource}`
          );
          const returnData = [];
          for (const attribute of attributes) {
            if (attribute.system === false && attribute.frontend_label !== "") {
              returnData.push({
                name: attribute.frontend_label,
                value: attribute.attribute_code
              });
            }
          }
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getSystemAttributes() {
          const resource = this.getCurrentNodeParameter("resource");
          const attributes = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            `/rest/default/V1/attributeMetadata/${resource}`
          );
          const returnData = [];
          for (const attribute of attributes) {
            if (attribute.system === true && attribute.frontend_label !== null) {
              returnData.push({
                name: attribute.frontend_label,
                value: attribute.attribute_code
              });
            }
          }
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getProductTypes() {
          const types = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            "/rest/default/V1/products/types"
          );
          const returnData = [];
          for (const type of types) {
            returnData.push({
              name: type.label,
              value: type.name
            });
          }
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getCategories() {
          const { items: categories } = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            "/rest/default/V1/categories/list",
            {},
            {
              search_criteria: {
                filter_groups: [
                  {
                    filters: [
                      {
                        field: "is_active",
                        condition_type: "eq",
                        value: 1
                      }
                    ]
                  }
                ]
              }
            }
          );
          const returnData = [];
          for (const category of categories) {
            returnData.push({
              name: category.name,
              value: category.id
            });
          }
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getAttributeSets() {
          const { items: attributeSets } = await import_GenericFunctions.magentoApiRequest.call(
            this,
            "GET",
            "/rest/default/V1/products/attribute-sets/sets/list",
            {},
            {
              search_criteria: 0
            }
          );
          const returnData = [];
          for (const attributeSet of attributeSets) {
            returnData.push({
              name: attributeSet.attribute_set_name,
              value: attributeSet.attribute_set_id
            });
          }
          returnData.sort(import_GenericFunctions.sort);
          return returnData;
        },
        async getFilterableCustomerAttributes() {
          return await import_GenericFunctions.getProductAttributes.call(this, (attribute) => attribute.is_filterable);
        },
        async getProductAttributes() {
          return await import_GenericFunctions.getProductAttributes.call(this);
        },
        // async getProductAttributesFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        // 	return getProductAttributes.call(this, undefined, { name: '*', value: '*', description: 'All properties' });
        // },
        async getFilterableProductAttributes() {
          return await import_GenericFunctions.getProductAttributes.call(
            this,
            (attribute) => attribute.is_searchable === "1"
          );
        },
        async getSortableProductAttributes() {
          return await import_GenericFunctions.getProductAttributes.call(this, (attribute) => attribute.used_for_sort_by);
        },
        async getOrderAttributes() {
          return (0, import_GenericFunctions.getOrderFields)().map((field) => ({ name: (0, import_change_case.capitalCase)(field), value: field })).sort(import_GenericFunctions.sort);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "customer") {
          if (operation === "create") {
            const email = this.getNodeParameter("email", i);
            const firstname = this.getNodeParameter("firstname", i);
            const lastname = this.getNodeParameter("lastname", i);
            const { addresses, customAttributes, password, ...rest } = this.getNodeParameter(
              "additionalFields",
              i
            );
            const body = {
              customer: {
                email,
                firstname,
                lastname
              }
            };
            body.customer.addresses = (0, import_GenericFunctions.adjustAddresses)(addresses?.address || []);
            body.customer.custom_attributes = customAttributes?.customAttribute || {};
            body.customer.extension_attributes = [
              "amazon_id",
              "is_subscribed",
              "vertex_customer_code",
              "vertex_customer_country"
            ].reduce((obj, value) => {
              if (rest.hasOwnProperty(value)) {
                const data = Object.assign(obj, { [value]: rest[value] });
                delete rest[value];
                return data;
              } else {
                return obj;
              }
            }, {});
            if (password) {
              body.password = password;
            }
            Object.assign(body.customer, rest);
            responseData = await import_GenericFunctions.magentoApiRequest.call(this, "POST", "/rest/V1/customers", body);
          }
          if (operation === "delete") {
            const customerId = this.getNodeParameter("customerId", i);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "DELETE",
              `/rest/default/V1/customers/${customerId}`
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const customerId = this.getNodeParameter("customerId", i);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "GET",
              `/rest/default/V1/customers/${customerId}`
            );
          }
          if (operation === "getAll") {
            const filterType = this.getNodeParameter("filterType", i);
            const sortOption = this.getNodeParameter("options.sort", i, {});
            const returnAll = this.getNodeParameter("returnAll", 0);
            let qs = {};
            if (filterType === "manual") {
              const filters = this.getNodeParameter("filters", i);
              const matchType = this.getNodeParameter("matchType", i);
              qs = (0, import_GenericFunctions.getFilterQuery)(Object.assign(filters, { matchType }, sortOption));
            } else if (filterType === "json") {
              const filterJson = this.getNodeParameter("filterJson", i);
              if ((0, import_GenericFunctions.validateJSON)(filterJson) !== void 0) {
                qs = JSON.parse(filterJson);
              } else {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), {
                  message: "Filter (JSON) must be a valid json"
                });
              }
            } else {
              qs = {
                search_criteria: {}
              };
              if (Object.keys(sortOption).length !== 0) {
                qs.search_criteria = {
                  sort_orders: sortOption.sort
                };
              }
            }
            if (returnAll) {
              qs.search_criteria.page_size = 100;
              responseData = await import_GenericFunctions.magentoApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/rest/default/V1/customers/search",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", 0);
              qs.search_criteria.page_size = limit;
              responseData = await import_GenericFunctions.magentoApiRequest.call(
                this,
                "GET",
                "/rest/default/V1/customers/search",
                {},
                qs
              );
              responseData = responseData.items;
            }
          }
          if (operation === "update") {
            const customerId = this.getNodeParameter("customerId", i);
            const firstName = this.getNodeParameter("firstName", i);
            const lastName = this.getNodeParameter("lastName", i);
            const email = this.getNodeParameter("email", i);
            const { addresses, customAttributes, password, ...rest } = this.getNodeParameter(
              "updateFields",
              i
            );
            const body = {
              customer: {
                email,
                firstname: firstName,
                lastname: lastName,
                id: parseInt(customerId, 10),
                website_id: 0
              }
            };
            body.customer.addresses = (0, import_GenericFunctions.adjustAddresses)(addresses?.address || []);
            body.customer.custom_attributes = customAttributes?.customAttribute || {};
            body.customer.extension_attributes = [
              "amazon_id",
              "is_subscribed",
              "vertex_customer_code",
              "vertex_customer_country"
            ].reduce((obj, value) => {
              if (rest.hasOwnProperty(value)) {
                const data = Object.assign(obj, { [value]: rest[value] });
                delete rest[value];
                return data;
              } else {
                return obj;
              }
            }, {});
            if (password) {
              body.password = password;
            }
            Object.assign(body.customer, rest);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "PUT",
              `/rest/V1/customers/${customerId}`,
              body
            );
          }
        }
        if (resource === "invoice") {
          if (operation === "create") {
            const orderId = this.getNodeParameter("orderId", i);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "POST",
              `/rest/default/V1/order/${orderId}/invoice`
            );
            responseData = { success: true };
          }
        }
        if (resource === "order") {
          if (operation === "cancel") {
            const orderId = this.getNodeParameter("orderId", i);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "POST",
              `/rest/default/V1/orders/${orderId}/cancel`
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const orderId = this.getNodeParameter("orderId", i);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "GET",
              `/rest/default/V1/orders/${orderId}`
            );
          }
          if (operation === "ship") {
            const orderId = this.getNodeParameter("orderId", i);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "POST",
              `/rest/default/V1/order/${orderId}/ship`
            );
            responseData = { success: true };
          }
          if (operation === "getAll") {
            const filterType = this.getNodeParameter("filterType", i);
            const sortOption = this.getNodeParameter("options.sort", i, {});
            const returnAll = this.getNodeParameter("returnAll", 0);
            let qs = {};
            if (filterType === "manual") {
              const filters = this.getNodeParameter("filters", i);
              const matchType = this.getNodeParameter("matchType", i);
              qs = (0, import_GenericFunctions.getFilterQuery)(Object.assign(filters, { matchType }, sortOption));
            } else if (filterType === "json") {
              const filterJson = this.getNodeParameter("filterJson", i);
              if ((0, import_GenericFunctions.validateJSON)(filterJson) !== void 0) {
                qs = JSON.parse(filterJson);
              } else {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), {
                  message: "Filter (JSON) must be a valid json"
                });
              }
            } else {
              qs = {
                search_criteria: {}
              };
              if (Object.keys(sortOption).length !== 0) {
                qs.search_criteria = {
                  sort_orders: sortOption.sort
                };
              }
            }
            if (returnAll) {
              qs.search_criteria.page_size = 100;
              responseData = await import_GenericFunctions.magentoApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/rest/default/V1/orders",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", 0);
              qs.search_criteria.page_size = limit;
              responseData = await import_GenericFunctions.magentoApiRequest.call(
                this,
                "GET",
                "/rest/default/V1/orders",
                {},
                qs
              );
              responseData = responseData.items;
            }
          }
        }
        if (resource === "product") {
          if (operation === "create") {
            const sku = this.getNodeParameter("sku", i);
            const name = this.getNodeParameter("name", i);
            const attributeSetId = this.getNodeParameter("attributeSetId", i);
            const price = this.getNodeParameter("price", i);
            const {
              customAttributes,
              category: _category,
              ...rest
            } = this.getNodeParameter("additionalFields", i);
            const body = {
              product: {
                sku,
                name,
                attribute_set_id: parseInt(attributeSetId, 10),
                price
              }
            };
            body.product.custom_attributes = customAttributes?.customAttribute || {};
            Object.assign(body.product, rest);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "POST",
              "/rest/default/V1/products",
              body
            );
          }
          if (operation === "delete") {
            const sku = this.getNodeParameter("sku", i);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "DELETE",
              `/rest/default/V1/products/${sku}`
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const sku = this.getNodeParameter("sku", i);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "GET",
              `/rest/default/V1/products/${sku}`
            );
          }
          if (operation === "getAll") {
            const filterType = this.getNodeParameter("filterType", i);
            const sortOption = this.getNodeParameter("options.sort", i, {});
            const returnAll = this.getNodeParameter("returnAll", 0);
            let qs = {};
            if (filterType === "manual") {
              const filters = this.getNodeParameter("filters", i);
              const matchType = this.getNodeParameter("matchType", i);
              qs = (0, import_GenericFunctions.getFilterQuery)(Object.assign(filters, { matchType }, sortOption));
            } else if (filterType === "json") {
              const filterJson = this.getNodeParameter("filterJson", i);
              if ((0, import_GenericFunctions.validateJSON)(filterJson) !== void 0) {
                qs = JSON.parse(filterJson);
              } else {
                throw new import_n8n_workflow.NodeApiError(this.getNode(), {
                  message: "Filter (JSON) must be a valid json"
                });
              }
            } else {
              qs = {
                search_criteria: {}
              };
              if (Object.keys(sortOption).length !== 0) {
                qs.search_criteria = {
                  sort_orders: sortOption.sort
                };
              }
            }
            if (returnAll) {
              qs.search_criteria.page_size = 100;
              responseData = await import_GenericFunctions.magentoApiRequestAllItems.call(
                this,
                "items",
                "GET",
                "/rest/default/V1/products",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", 0);
              qs.search_criteria.page_size = limit;
              responseData = await import_GenericFunctions.magentoApiRequest.call(
                this,
                "GET",
                "/rest/default/V1/products",
                {},
                qs
              );
              responseData = responseData.items;
            }
          }
          if (operation === "update") {
            const sku = this.getNodeParameter("sku", i);
            const { customAttributes, ...rest } = this.getNodeParameter("updateFields", i);
            if (!Object.keys(rest).length) {
              throw new import_n8n_workflow.NodeApiError(this.getNode(), {
                message: "At least one parameter has to be updated"
              });
            }
            const body = {
              product: {
                sku
              }
            };
            body.product.custom_attributes = customAttributes?.customAttribute || {};
            Object.assign(body.product, rest);
            responseData = await import_GenericFunctions.magentoApiRequest.call(
              this,
              "PUT",
              `/rest/default/V1/products/${sku}`,
              body
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
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Magento2
});
//# sourceMappingURL=Magento2.node.js.map