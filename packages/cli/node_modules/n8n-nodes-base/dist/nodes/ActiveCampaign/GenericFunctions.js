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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  activeCampaignApiRequest: () => activeCampaignApiRequest,
  activeCampaignApiRequestAllItems: () => activeCampaignApiRequestAllItems,
  activeCampaignDefaultGetAllProperties: () => activeCampaignDefaultGetAllProperties
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function activeCampaignApiRequest(method, endpoint, body, query, dataKey) {
  const credentials = await this.getCredentials("activeCampaignApi");
  if (query === void 0) {
    query = {};
  }
  const options = {
    headers: {},
    method,
    qs: query,
    uri: `${credentials.apiUrl}${endpoint}`,
    json: true
  };
  if (Object.keys(body).length !== 0) {
    options.body = body;
  }
  try {
    const responseData = await this.helpers.requestWithAuthentication.call(
      this,
      "activeCampaignApi",
      options
    );
    if (responseData.success === false) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData);
    }
    if (dataKey === void 0) {
      return responseData;
    } else {
      return responseData[dataKey];
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function activeCampaignApiRequestAllItems(method, endpoint, body, query, dataKey) {
  if (query === void 0) {
    query = {};
  }
  query.limit = 100;
  query.offset = 0;
  const returnData = [];
  let responseData;
  let itemsReceived = 0;
  do {
    responseData = await activeCampaignApiRequest.call(this, method, endpoint, body, query);
    if (dataKey === void 0) {
      returnData.push.apply(returnData, responseData);
      if (returnData !== void 0) {
        itemsReceived += returnData.length;
      }
    } else {
      returnData.push.apply(returnData, responseData[dataKey]);
      if (responseData[dataKey] !== void 0) {
        itemsReceived += responseData[dataKey].length;
      }
    }
    query.offset = itemsReceived;
  } while (responseData.meta?.total !== void 0 && responseData.meta.total > itemsReceived);
  return returnData;
}
function activeCampaignDefaultGetAllProperties(resource, operation) {
  return [
    {
      displayName: "Return All",
      name: "returnAll",
      type: "boolean",
      displayOptions: {
        show: {
          operation: [operation],
          resource: [resource]
        }
      },
      default: false,
      description: "Whether to return all results or only up to a given limit"
    },
    {
      displayName: "Limit",
      name: "limit",
      type: "number",
      displayOptions: {
        show: {
          operation: [operation],
          resource: [resource],
          returnAll: [false]
        }
      },
      typeOptions: {
        minValue: 1,
        maxValue: 500
      },
      default: 100,
      description: "Max number of results to return"
    },
    {
      displayName: "Simplify",
      name: "simple",
      type: "boolean",
      displayOptions: {
        show: {
          operation: [operation],
          resource: [resource]
        }
      },
      default: true,
      description: "Whether to return a simplified version of the response instead of the raw data"
    }
  ];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activeCampaignApiRequest,
  activeCampaignApiRequestAllItems,
  activeCampaignDefaultGetAllProperties
});
//# sourceMappingURL=GenericFunctions.js.map