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
var ActiveCampaign_node_exports = {};
__export(ActiveCampaign_node_exports, {
  ActiveCampaign: () => ActiveCampaign
});
module.exports = __toCommonJS(ActiveCampaign_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AccountContactDescription = require("./AccountContactDescription");
var import_AccountDescription = require("./AccountDescription");
var import_ConnectionDescription = require("./ConnectionDescription");
var import_ContactDescription = require("./ContactDescription");
var import_ContactListDescription = require("./ContactListDescription");
var import_ContactTagDescription = require("./ContactTagDescription");
var import_DealDescription = require("./DealDescription");
var import_EcomCustomerDescription = require("./EcomCustomerDescription");
var import_EcomOrderDescription = require("./EcomOrderDescription");
var import_EcomOrderProductsDescription = require("./EcomOrderProductsDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_ListDescription = require("./ListDescription");
var import_TagDescription = require("./TagDescription");
function addAdditionalFields(body, additionalFields) {
  for (const key of Object.keys(additionalFields)) {
    if (key === "customProperties" && additionalFields.customProperties.property !== void 0) {
      for (const customProperty of additionalFields.customProperties.property) {
        body[customProperty.name] = customProperty.value;
      }
    } else if (key === "fieldValues" && additionalFields.fieldValues.property !== void 0) {
      body.fieldValues = additionalFields.fieldValues.property;
    } else if (key === "fields" && additionalFields.fields.property !== void 0) {
      body.fields = additionalFields.fields.property;
    } else {
      body[key] = additionalFields[key];
    }
  }
}
class ActiveCampaign {
  constructor() {
    this.description = {
      displayName: "ActiveCampaign",
      name: "activeCampaign",
      icon: { light: "file:activeCampaign.svg", dark: "file:activeCampaign.dark.svg" },
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Create and edit data in ActiveCampaign",
      defaults: {
        name: "ActiveCampaign"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "activeCampaignApi",
          required: true
        }
      ],
      properties: [
        // ----------------------------------
        //         resources
        // ----------------------------------
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
              name: "Account Contact",
              value: "accountContact"
            },
            {
              name: "Connection",
              value: "connection"
            },
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Contact List",
              value: "contactList"
            },
            {
              name: "Contact Tag",
              value: "contactTag"
            },
            {
              name: "Deal",
              value: "deal"
            },
            {
              name: "E-Commerce Customer",
              value: "ecommerceCustomer"
            },
            {
              name: "E-Commerce Order",
              value: "ecommerceOrder"
            },
            {
              name: "E-Commerce Order Product",
              value: "ecommerceOrderProducts"
            },
            {
              name: "List",
              value: "list"
            },
            {
              name: "Tag",
              value: "tag"
            }
          ],
          default: "contact"
        },
        // ----------------------------------
        //         operations
        // ----------------------------------
        ...import_AccountDescription.accountOperations,
        ...import_ContactDescription.contactOperations,
        ...import_AccountContactDescription.accountContactOperations,
        ...import_ContactListDescription.contactListOperations,
        ...import_ContactTagDescription.contactTagOperations,
        ...import_ListDescription.listOperations,
        ...import_TagDescription.tagOperations,
        ...import_DealDescription.dealOperations,
        ...import_ConnectionDescription.connectionOperations,
        ...import_EcomOrderDescription.ecomOrderOperations,
        ...import_EcomCustomerDescription.ecomCustomerOperations,
        ...import_EcomOrderProductsDescription.ecomOrderProductsOperations,
        // ----------------------------------
        //         fields
        // ----------------------------------
        // ----------------------------------
        //         tag
        // ----------------------------------
        ...import_TagDescription.tagFields,
        // ----------------------------------
        //         list
        // ----------------------------------
        ...import_ListDescription.listFields,
        // ----------------------------------
        // ----------------------------------
        //         tag
        // ----------------------------------
        ...import_ContactTagDescription.contactTagFields,
        // ----------------------------------
        //         Contact List
        // ----------------------------------
        ...import_ContactListDescription.contactListFields,
        // ----------------------------------
        //         account
        // ----------------------------------
        ...import_AccountDescription.accountFields,
        // ----------------------------------
        //         account
        // ----------------------------------
        ...import_AccountContactDescription.accountContactFields,
        // ----------------------------------
        //         contact
        // ----------------------------------
        ...import_ContactDescription.contactFields,
        // ----------------------------------
        //         deal
        // ----------------------------------
        ...import_DealDescription.dealFields,
        // ----------------------------------
        //         connection
        // ----------------------------------
        ...import_ConnectionDescription.connectionFields,
        // ----------------------------------
        //         ecommerceOrder
        // ----------------------------------
        ...import_EcomOrderDescription.ecomOrderFields,
        // ----------------------------------
        //         ecommerceCustomer
        // ----------------------------------
        ...import_EcomCustomerDescription.ecomCustomerFields,
        // ----------------------------------
        //         ecommerceOrderProducts
        // ----------------------------------
        ...import_EcomOrderProductsDescription.ecomOrderProductsFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available custom fields to display them to user so that they can
        // select them easily
        async getContactCustomFields() {
          const returnData = [];
          const { fields } = await import_GenericFunctions.activeCampaignApiRequest.call(
            this,
            "GET",
            "/api/3/fields",
            {},
            { limit: 100 }
          );
          for (const field of fields) {
            const fieldName = field.title;
            const fieldId = field.id;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          return returnData;
        },
        // Get all the available custom fields to display them to user so that they can
        // select them easily
        async getAccountCustomFields() {
          const returnData = [];
          const { accountCustomFieldMeta: fields } = await import_GenericFunctions.activeCampaignApiRequest.call(
            this,
            "GET",
            "/api/3/accountCustomFieldMeta",
            {},
            { limit: 100 }
          );
          for (const field of fields) {
            const fieldName = field.fieldLabel;
            const fieldId = field.id;
            returnData.push({
              name: fieldName,
              value: fieldId
            });
          }
          return returnData;
        },
        // Get all the available tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const tags = await import_GenericFunctions.activeCampaignApiRequestAllItems.call(
            this,
            "GET",
            "/api/3/tags",
            {},
            { limit: 100 },
            "tags"
          );
          for (const tag of tags) {
            returnData.push({
              name: tag.tag,
              value: tag.id
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
    let resource;
    let operation;
    let body;
    let qs;
    let requestMethod;
    let endpoint;
    let returnAll = false;
    let dataKey;
    for (let i = 0; i < items.length; i++) {
      try {
        dataKey = void 0;
        resource = this.getNodeParameter("resource", 0);
        operation = this.getNodeParameter("operation", 0);
        requestMethod = "GET";
        endpoint = "";
        body = {};
        qs = {};
        if (resource === "contact") {
          if (operation === "create") {
            requestMethod = "POST";
            const updateIfExists = this.getNodeParameter("updateIfExists", i);
            if (updateIfExists) {
              endpoint = "/api/3/contact/sync";
            } else {
              endpoint = "/api/3/contacts";
            }
            dataKey = "contact";
            body.contact = {
              email: this.getNodeParameter("email", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            addAdditionalFields(body.contact, additionalFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const contactId = this.getNodeParameter("contactId", i);
            endpoint = `/api/3/contacts/${contactId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const contactId = this.getNodeParameter("contactId", i);
            endpoint = `/api/3/contacts/${contactId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            returnAll = this.getNodeParameter("returnAll", i);
            const simple = this.getNodeParameter("simple", i, true);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            Object.assign(qs, additionalFields);
            if (qs.orderBy) {
              qs[qs.orderBy] = true;
              delete qs.orderBy;
            }
            if (simple) {
              dataKey = "contacts";
            }
            endpoint = "/api/3/contacts";
          } else if (operation === "update") {
            requestMethod = "PUT";
            const contactId = this.getNodeParameter("contactId", i);
            endpoint = `/api/3/contacts/${contactId}`;
            dataKey = "contact";
            body.contact = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            addAdditionalFields(body.contact, updateFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "account") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "/api/3/accounts";
            dataKey = "account";
            body.account = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            addAdditionalFields(body.account, additionalFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const accountId = this.getNodeParameter("accountId", i);
            endpoint = `/api/3/accounts/${accountId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const accountId = this.getNodeParameter("accountId", i);
            endpoint = `/api/3/accounts/${accountId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const simple = this.getNodeParameter("simple", i, true);
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (simple) {
              dataKey = "accounts";
            }
            endpoint = "/api/3/accounts";
            const filters = this.getNodeParameter("filters", i);
            Object.assign(qs, filters);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const accountId = this.getNodeParameter("accountId", i);
            endpoint = `/api/3/accounts/${accountId}`;
            dataKey = "account";
            body.account = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            addAdditionalFields(body.account, updateFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "accountContact") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "/api/3/accountContacts";
            dataKey = "accountContact";
            body.accountContact = {
              contact: this.getNodeParameter("contact", i),
              account: this.getNodeParameter("account", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            addAdditionalFields(body.accountContact, additionalFields);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const accountContactId = this.getNodeParameter("accountContactId", i);
            endpoint = `/api/3/accountContacts/${accountContactId}`;
            dataKey = "accountContact";
            body.accountContact = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            addAdditionalFields(body.accountContact, updateFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const accountContactId = this.getNodeParameter("accountContactId", i);
            endpoint = `/api/3/accountContacts/${accountContactId}`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "contactTag") {
          if (operation === "add") {
            requestMethod = "POST";
            endpoint = "/api/3/contactTags";
            dataKey = "contactTag";
            body.contactTag = {
              contact: this.getNodeParameter("contactId", i),
              tag: this.getNodeParameter("tagId", i)
            };
          } else if (operation === "remove") {
            requestMethod = "DELETE";
            const contactTagId = this.getNodeParameter("contactTagId", i);
            endpoint = `/api/3/contactTags/${contactTagId}`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "contactList") {
          if (operation === "add") {
            requestMethod = "POST";
            endpoint = "/api/3/contactLists";
            dataKey = "contactTag";
            body.contactList = {
              list: this.getNodeParameter("listId", i),
              contact: this.getNodeParameter("contactId", i),
              status: 1
            };
          } else if (operation === "remove") {
            requestMethod = "POST";
            endpoint = "/api/3/contactLists";
            body.contactList = {
              list: this.getNodeParameter("listId", i),
              contact: this.getNodeParameter("contactId", i),
              status: 2
            };
            dataKey = "contacts";
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "list") {
          if (operation === "getAll") {
            requestMethod = "GET";
            returnAll = this.getNodeParameter("returnAll", i);
            const simple = this.getNodeParameter("simple", i, true);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (simple) {
              dataKey = "lists";
            }
            endpoint = "/api/3/lists";
          }
        } else if (resource === "tag") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "/api/3/tags";
            dataKey = "tag";
            body.tag = {
              tag: this.getNodeParameter("name", i),
              tagType: this.getNodeParameter("tagType", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            addAdditionalFields(body.tag, additionalFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const tagId = this.getNodeParameter("tagId", i);
            endpoint = `/api/3/tags/${tagId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const tagId = this.getNodeParameter("tagId", i);
            endpoint = `/api/3/tags/${tagId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const simple = this.getNodeParameter("simple", i, true);
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (simple) {
              dataKey = "tags";
            }
            endpoint = "/api/3/tags";
          } else if (operation === "update") {
            requestMethod = "PUT";
            const tagId = this.getNodeParameter("tagId", i);
            endpoint = `/api/3/tags/${tagId}`;
            dataKey = "tag";
            body.tag = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            addAdditionalFields(body.tag, updateFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "deal") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "/api/3/deals";
            body.deal = {
              title: this.getNodeParameter("title", i),
              contact: this.getNodeParameter("contact", i),
              value: this.getNodeParameter("value", i),
              currency: this.getNodeParameter("currency", i)
            };
            const group = this.getNodeParameter("group", i);
            if (group !== "") {
              addAdditionalFields(body.deal, { group });
            }
            const owner = this.getNodeParameter("owner", i);
            if (owner !== "") {
              addAdditionalFields(body.deal, { owner });
            }
            const stage = this.getNodeParameter("stage", i);
            if (stage !== "") {
              addAdditionalFields(body.deal, { stage });
            }
            const additionalFields = this.getNodeParameter("additionalFields", i);
            addAdditionalFields(body.deal, additionalFields);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const dealId = this.getNodeParameter("dealId", i);
            endpoint = `/api/3/deals/${dealId}`;
            body.deal = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            addAdditionalFields(body.deal, updateFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const dealId = this.getNodeParameter("dealId", i);
            endpoint = `/api/3/deals/${dealId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const dealId = this.getNodeParameter("dealId", i);
            endpoint = `/api/3/deals/${dealId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const simple = this.getNodeParameter("simple", i, true);
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (simple) {
              dataKey = "deals";
            }
            endpoint = "/api/3/deals";
          } else if (operation === "createNote") {
            requestMethod = "POST";
            body.note = {
              note: this.getNodeParameter("dealNote", i)
            };
            const dealId = this.getNodeParameter("dealId", i);
            endpoint = `/api/3/deals/${dealId}/notes`;
          } else if (operation === "updateNote") {
            requestMethod = "PUT";
            body.note = {
              note: this.getNodeParameter("dealNote", i)
            };
            const dealId = this.getNodeParameter("dealId", i);
            const dealNoteId = this.getNodeParameter("dealNoteId", i);
            endpoint = `/api/3/deals/${dealId}/notes/${dealNoteId}`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "connection") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "/api/3/connections";
            body.connection = {
              service: this.getNodeParameter("service", i),
              externalid: this.getNodeParameter("externalid", i),
              name: this.getNodeParameter("name", i),
              logoUrl: this.getNodeParameter("logoUrl", i),
              linkUrl: this.getNodeParameter("linkUrl", i)
            };
          } else if (operation === "update") {
            requestMethod = "PUT";
            const connectionId = this.getNodeParameter("connectionId", i);
            endpoint = `/api/3/connections/${connectionId}`;
            body.connection = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            addAdditionalFields(body.connection, updateFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const connectionId = this.getNodeParameter("connectionId", i);
            endpoint = `/api/3/connections/${connectionId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const connectionId = this.getNodeParameter("connectionId", i);
            endpoint = `/api/3/connections/${connectionId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const simple = this.getNodeParameter("simple", i, true);
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (simple) {
              dataKey = "connections";
            }
            endpoint = "/api/3/connections";
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "ecommerceOrder") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "/api/3/ecomOrders";
            body.ecomOrder = {
              source: this.getNodeParameter("source", i),
              email: this.getNodeParameter("email", i),
              totalPrice: this.getNodeParameter("totalPrice", i),
              currency: this.getNodeParameter("currency", i).toString().toUpperCase(),
              externalCreatedDate: this.getNodeParameter("externalCreatedDate", i),
              connectionid: this.getNodeParameter("connectionid", i),
              customerid: this.getNodeParameter("customerid", i)
            };
            const externalid = this.getNodeParameter("externalid", i);
            if (externalid !== "") {
              addAdditionalFields(body.ecomOrder, { externalid });
            }
            const externalcheckoutid = this.getNodeParameter("externalcheckoutid", i);
            if (externalcheckoutid !== "") {
              addAdditionalFields(body.ecomOrder, { externalcheckoutid });
            }
            const abandonedDate = this.getNodeParameter("abandonedDate", i);
            if (abandonedDate !== "") {
              addAdditionalFields(body.ecomOrder, { abandonedDate });
            }
            const orderProducts = this.getNodeParameter(
              "orderProducts",
              i
            );
            addAdditionalFields(body.ecomOrder, { orderProducts });
            const additionalFields = this.getNodeParameter("additionalFields", i);
            addAdditionalFields(body.ecomOrder, additionalFields);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const orderId = this.getNodeParameter("orderId", i);
            endpoint = `/api/3/ecomOrders/${orderId}`;
            body.ecomOrder = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            addAdditionalFields(body.ecomOrder, updateFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const orderId = this.getNodeParameter("orderId", i);
            endpoint = `/api/3/ecomOrders/${orderId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const orderId = this.getNodeParameter("orderId", i);
            endpoint = `/api/3/ecomOrders/${orderId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const simple = this.getNodeParameter("simple", i, true);
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (simple) {
              dataKey = "ecomOrders";
            }
            endpoint = "/api/3/ecomOrders";
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "ecommerceCustomer") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "/api/3/ecomCustomers";
            body.ecomCustomer = {
              connectionid: this.getNodeParameter("connectionid", i),
              externalid: this.getNodeParameter("externalid", i),
              email: this.getNodeParameter("email", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.acceptsMarketing !== void 0) {
              if (additionalFields.acceptsMarketing === true) {
                additionalFields.acceptsMarketing = "1";
              } else {
                additionalFields.acceptsMarketing = "0";
              }
            }
            addAdditionalFields(body.ecomCustomer, additionalFields);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const ecommerceCustomerId = this.getNodeParameter("ecommerceCustomerId", i);
            endpoint = `/api/3/ecomCustomers/${ecommerceCustomerId}`;
            body.ecomCustomer = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (updateFields.acceptsMarketing !== void 0) {
              if (updateFields.acceptsMarketing === true) {
                updateFields.acceptsMarketing = "1";
              } else {
                updateFields.acceptsMarketing = "0";
              }
            }
            addAdditionalFields(body.ecomCustomer, updateFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const ecommerceCustomerId = this.getNodeParameter("ecommerceCustomerId", i);
            endpoint = `/api/3/ecomCustomers/${ecommerceCustomerId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const ecommerceCustomerId = this.getNodeParameter("ecommerceCustomerId", i);
            endpoint = `/api/3/ecomCustomers/${ecommerceCustomerId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const simple = this.getNodeParameter("simple", i, true);
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (simple) {
              dataKey = "ecomCustomers";
            }
            endpoint = "/api/3/ecomCustomers";
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else if (resource === "ecommerceOrderProducts") {
          if (operation === "getByProductId") {
            requestMethod = "GET";
            const procuctId = this.getNodeParameter("procuctId", i);
            endpoint = `/api/3/ecomOrderProducts/${procuctId}`;
          } else if (operation === "getByOrderId") {
            requestMethod = "GET";
            const orderId = this.getNodeParameter("orderId", i);
            endpoint = `/api/3/ecomOrders/${orderId}/orderProducts`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const simple = this.getNodeParameter("simple", i, true);
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            if (simple) {
              dataKey = "ecomOrderProducts";
            }
            endpoint = "/api/3/ecomOrderProducts";
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known`,
              { itemIndex: i }
            );
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: i
          });
        }
        let responseData;
        if (returnAll) {
          responseData = await import_GenericFunctions.activeCampaignApiRequestAllItems.call(
            this,
            requestMethod,
            endpoint,
            body,
            qs,
            dataKey
          );
        } else {
          responseData = await import_GenericFunctions.activeCampaignApiRequest.call(
            this,
            requestMethod,
            endpoint,
            body,
            qs,
            dataKey
          );
        }
        if (resource === "contactList" && operation === "add" && responseData === void 0) {
          responseData = { success: true };
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
  ActiveCampaign
});
//# sourceMappingURL=ActiveCampaign.node.js.map