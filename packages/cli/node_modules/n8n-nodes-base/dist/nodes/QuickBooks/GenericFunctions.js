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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  adjustTransactionDates: () => adjustTransactionDates,
  getRefAndSyncToken: () => getRefAndSyncToken,
  getSyncToken: () => getSyncToken,
  handleBinaryData: () => handleBinaryData,
  handleListing: () => handleListing,
  loadResource: () => loadResource,
  populateFields: () => populateFields,
  processLines: () => processLines,
  quickBooksApiRequest: () => quickBooksApiRequest,
  quickBooksApiRequestAllItems: () => quickBooksApiRequestAllItems,
  simplifyTransactionReport: () => simplifyTransactionReport,
  splitPascalCase: () => splitPascalCase,
  toDisplayName: () => toDisplayName,
  toOptions: () => toOptions
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
var import_omit = __toESM(require("lodash/omit"));
var import_pickBy = __toESM(require("lodash/pickBy"));
var import_n8n_workflow = require("n8n-workflow");
async function quickBooksApiRequest(method, endpoint, qs, body, option = {}) {
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  let isDownload = false;
  if (["estimate", "invoice", "payment"].includes(resource) && operation === "get") {
    isDownload = this.getNodeParameter("download", 0);
  }
  const productionUrl = "https://quickbooks.api.intuit.com";
  const sandboxUrl = "https://sandbox-quickbooks.api.intuit.com";
  const credentials = await this.getCredentials("quickBooksOAuth2Api");
  const options = {
    headers: {
      "user-agent": "n8n"
    },
    method,
    uri: `${credentials.environment === "sandbox" ? sandboxUrl : productionUrl}${endpoint}`,
    qs,
    body,
    json: !isDownload
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  if (Object.keys(option)) {
    Object.assign(options, option);
  }
  if (isDownload) {
    options.headers.Accept = "application/pdf";
  }
  if (resource === "invoice" && operation === "send") {
    options.headers["Content-Type"] = "application/octet-stream";
  }
  if (resource === "invoice" && (operation === "void" || operation === "delete") || resource === "payment" && (operation === "void" || operation === "delete")) {
    options.headers["Content-Type"] = "application/json";
  }
  try {
    return await this.helpers.requestOAuth2.call(this, "quickBooksOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getCount(method, endpoint, qs) {
  const responseData = await quickBooksApiRequest.call(this, method, endpoint, qs, {});
  return responseData.QueryResponse.totalCount;
}
async function quickBooksApiRequestAllItems(method, endpoint, qs, body, resource) {
  let responseData;
  let startPosition = 1;
  const maxResults = 1e3;
  const returnData = [];
  const maxCountQuery = {
    query: `SELECT COUNT(*) FROM ${resource}`
  };
  const maxCount = await getCount.call(this, method, endpoint, maxCountQuery);
  const originalQuery = qs.query;
  do {
    qs.query = `${originalQuery} MAXRESULTS ${maxResults} STARTPOSITION ${startPosition}`;
    responseData = await quickBooksApiRequest.call(this, method, endpoint, qs, body);
    try {
      const nonResource = originalQuery.split(" ")?.pop();
      if (nonResource === "CreditMemo" || nonResource === "Term" || nonResource === "TaxCode") {
        returnData.push(...responseData.QueryResponse[nonResource]);
      } else {
        returnData.push(...responseData.QueryResponse[(0, import_change_case.capitalCase)(resource)]);
      }
    } catch (error) {
      return [];
    }
    startPosition += maxResults;
  } while (maxCount > returnData.length);
  return returnData;
}
async function handleListing(i, endpoint, resource) {
  let responseData;
  const qs = {
    query: `SELECT * FROM ${resource}`
  };
  const returnAll = this.getNodeParameter("returnAll", i);
  const filters = this.getNodeParameter("filters", i);
  if (filters.query) {
    qs.query += ` ${filters.query}`;
  }
  if (returnAll) {
    return await quickBooksApiRequestAllItems.call(this, "GET", endpoint, qs, {}, resource);
  } else {
    const limit = this.getNodeParameter("limit", i);
    qs.query += ` MAXRESULTS ${limit}`;
    responseData = await quickBooksApiRequest.call(this, "GET", endpoint, qs, {});
    responseData = responseData.QueryResponse[(0, import_change_case.capitalCase)(resource)];
    return responseData;
  }
}
async function getSyncToken(i, companyId, resource) {
  const resourceId = this.getNodeParameter(`${resource}Id`, i);
  const getEndpoint = `/v3/company/${companyId}/${resource}/${resourceId}`;
  const propertyName = (0, import_change_case.capitalCase)(resource);
  const {
    [propertyName]: { SyncToken }
  } = await quickBooksApiRequest.call(this, "GET", getEndpoint, {}, {});
  return SyncToken;
}
async function getRefAndSyncToken(i, companyId, resource, ref) {
  const resourceId = this.getNodeParameter(`${resource}Id`, i);
  const endpoint = `/v3/company/${companyId}/${resource}/${resourceId}`;
  const responseData = await quickBooksApiRequest.call(this, "GET", endpoint, {}, {});
  return {
    ref: responseData[(0, import_change_case.capitalCase)(resource)][ref],
    syncToken: responseData[(0, import_change_case.capitalCase)(resource)].SyncToken
  };
}
async function handleBinaryData(items, i, companyId, resource, resourceId) {
  const binaryProperty = this.getNodeParameter("binaryProperty", i);
  const fileName = this.getNodeParameter("fileName", i);
  const endpoint = `/v3/company/${companyId}/${resource}/${resourceId}/pdf`;
  const data = await quickBooksApiRequest.call(this, "GET", endpoint, {}, {}, { encoding: null });
  items[i].binary = items[i].binary ?? {};
  items[i].binary[binaryProperty] = await this.helpers.prepareBinaryData(data);
  items[i].binary[binaryProperty].fileName = fileName;
  items[i].binary[binaryProperty].fileExtension = "pdf";
  return items;
}
async function loadResource(resource) {
  const returnData = [];
  const qs = {
    query: `SELECT * FROM ${resource}`
  };
  const {
    oauthTokenData: {
      callbackQueryString: { realmId }
    }
  } = await this.getCredentials("quickBooksOAuth2Api");
  const endpoint = `/v3/company/${realmId}/query`;
  const resourceItems = await quickBooksApiRequestAllItems.call(
    this,
    "GET",
    endpoint,
    qs,
    {},
    resource
  );
  if (resource === "preferences") {
    const {
      SalesFormsPrefs: { CustomField }
    } = resourceItems[0];
    const customFields = CustomField[1].CustomField;
    for (const customField of customFields) {
      const length = customField.Name.length;
      returnData.push({
        name: customField.StringValue,
        value: customField.Name.charAt(length - 1)
      });
    }
    return returnData;
  }
  resourceItems.forEach((resourceItem) => {
    returnData.push({
      name: resourceItem.DisplayName || resourceItem.Name || `Memo ${resourceItem.Id}`,
      value: resourceItem.Id
    });
  });
  return returnData;
}
function processLines(lines, resource) {
  lines.forEach((line) => {
    if (resource === "bill") {
      if (line.DetailType === "AccountBasedExpenseLineDetail") {
        line.AccountBasedExpenseLineDetail = {
          AccountRef: {
            value: line.accountId
          }
        };
        delete line.accountId;
      } else if (line.DetailType === "ItemBasedExpenseLineDetail") {
        line.ItemBasedExpenseLineDetail = {
          ItemRef: {
            value: line.itemId
          }
        };
        delete line.itemId;
      }
    } else if (resource === "estimate") {
      if (line.DetailType === "SalesItemLineDetail") {
        line.SalesItemLineDetail = {
          ItemRef: {
            value: line.itemId
          },
          TaxCodeRef: {
            value: line.TaxCodeRef
          }
        };
        delete line.itemId;
        delete line.TaxCodeRef;
      }
    } else if (resource === "invoice") {
      if (line.DetailType === "SalesItemLineDetail") {
        line.SalesItemLineDetail = {
          ItemRef: {
            value: line.itemId
          },
          TaxCodeRef: {
            value: line.TaxCodeRef
          },
          Qty: line.Qty
        };
        if (line.Qty === void 0) {
          delete line.SalesItemLineDetail.Qty;
        }
        delete line.itemId;
        delete line.TaxCodeRef;
        delete line.Qty;
      }
    }
  });
  return lines;
}
function populateFields(body, fields, resource) {
  Object.entries(fields).forEach(([key, value]) => {
    if (resource === "bill") {
      if (key.endsWith("Ref")) {
        const { details } = value;
        body[key] = {
          name: details.name,
          value: details.value
        };
      } else {
        body[key] = value;
      }
    } else if (["customer", "employee", "vendor"].includes(resource)) {
      if (key === "BillAddr") {
        const { details } = value;
        body.BillAddr = (0, import_pickBy.default)(details, (detail) => detail !== "");
      } else if (key === "PrimaryEmailAddr") {
        body.PrimaryEmailAddr = {
          Address: value
        };
      } else if (key === "PrimaryPhone") {
        body.PrimaryPhone = {
          FreeFormNumber: value
        };
      } else {
        body[key] = value;
      }
    } else if (resource === "estimate" || resource === "invoice") {
      if (key === "BillAddr" || key === "ShipAddr") {
        const { details } = value;
        body[key] = (0, import_pickBy.default)(details, (detail) => detail !== "");
      } else if (key === "BillEmail") {
        body.BillEmail = {
          Address: value
        };
      } else if (key === "CustomFields") {
        const { Field } = value;
        body.CustomField = Field;
        const length = body.CustomField.length;
        for (let i = 0; i < length; i++) {
          body.CustomField[i].Type = "StringType";
        }
      } else if (key === "CustomerMemo") {
        body.CustomerMemo = {
          value
        };
      } else if (key.endsWith("Ref")) {
        const { details } = value;
        body[key] = {
          name: details.name,
          value: details.value
        };
      } else if (key === "TotalTax") {
        body.TxnTaxDetail = {
          TotalTax: value
        };
      } else {
        body[key] = value;
      }
    } else if (resource === "payment") {
      body[key] = value;
    }
  });
  return body;
}
const toOptions = (option) => ({ name: option, value: option });
const splitPascalCase = (word) => {
  return word.match(/($[a-z])|[A-Z][^A-Z]+/g).join(" ");
};
const toDisplayName = ({ name, value }) => {
  return { name: splitPascalCase(name), value };
};
function adjustTransactionDates(transactionFields) {
  const dateFieldKeys = [
    "dateRangeCustom",
    "dateRangeDueCustom",
    "dateRangeModificationCustom",
    "dateRangeCreationCustom"
  ];
  if (dateFieldKeys.every((dateField) => !transactionFields[dateField])) {
    return transactionFields;
  }
  let adjusted = (0, import_omit.default)(transactionFields, dateFieldKeys);
  dateFieldKeys.forEach((dateFieldKey) => {
    const dateField = transactionFields[dateFieldKey];
    if (dateField) {
      Object.entries(dateField[`${dateFieldKey}Properties`]).map(
        ([key, value]) => dateField[`${dateFieldKey}Properties`][key] = value.split("T")[0]
      );
      adjusted = {
        ...adjusted,
        ...dateField[`${dateFieldKey}Properties`]
      };
    }
  });
  return adjusted;
}
function simplifyTransactionReport(transactionReport) {
  const columns = transactionReport.Columns.Column.map((column) => column.ColType);
  const rows = transactionReport.Rows.Row.map((row) => row.ColData.map((i) => i.value));
  const simplified = [];
  for (const row of rows) {
    const transaction = {};
    for (let i = 0; i < row.length; i++) {
      transaction[columns[i]] = row[i];
    }
    simplified.push(transaction);
  }
  return simplified;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustTransactionDates,
  getRefAndSyncToken,
  getSyncToken,
  handleBinaryData,
  handleListing,
  loadResource,
  populateFields,
  processLines,
  quickBooksApiRequest,
  quickBooksApiRequestAllItems,
  simplifyTransactionReport,
  splitPascalCase,
  toDisplayName,
  toOptions
});
//# sourceMappingURL=GenericFunctions.js.map