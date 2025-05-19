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
  createSendAndWaitMessageBody: () => createSendAndWaitMessageBody,
  getPagingParameters: () => getPagingParameters,
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../../utils/sendAndWait/utils");
var import_utilities = require("../../../utils/utilities");
var import_GenericFunctions = require("../GenericFunctions");
async function googleServiceAccountApiRequest(options, noCredentials = false) {
  if (noCredentials) {
    return await this.helpers.request(options);
  }
  const credentials = await this.getCredentials("googleApi");
  const { access_token } = await import_GenericFunctions.getGoogleAccessToken.call(this, credentials, "chat");
  options.headers.Authorization = `Bearer ${access_token}`;
  return await this.helpers.request(options);
}
async function googleApiRequest(method, resource, body = {}, qs = {}, uri, noCredentials = false, encoding) {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://chat.googleapis.com${resource}`,
    qsStringifyOptions: {
      arrayFormat: "repeat"
    },
    json: true
  };
  if (encoding === null) {
    options.encoding = null;
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  let responseData;
  try {
    if (noCredentials || this.getNodeParameter("authentication", 0) === "serviceAccount") {
      responseData = await googleServiceAccountApiRequest.call(this, options, noCredentials);
    } else {
      responseData = await this.helpers.requestWithAuthentication.call(
        this,
        "googleChatOAuth2Api",
        options
      );
    }
  } catch (error) {
    if (error.code === "ERR_OSSL_PEM_NO_START_LINE") {
      error.statusCode = "401";
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
  if (Object.keys(responseData).length !== 0) {
    return responseData;
  } else {
    return { success: true };
  }
}
async function googleApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.pageSize = 100;
  do {
    responseData = await googleApiRequest.call(this, method, endpoint, body, query);
    query.pageToken = responseData.nextPageToken;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
function getPagingParameters(resource, operation = "getAll") {
  const pagingParameters = [
    {
      displayName: "Return All",
      name: "returnAll",
      type: "boolean",
      displayOptions: {
        show: {
          resource: [resource],
          operation: [operation]
        }
      },
      default: false,
      description: "Whether to return all results or only up to a given limit"
    },
    {
      displayName: "Limit",
      name: "limit",
      type: "number",
      typeOptions: {
        maxValue: 1e3
      },
      displayOptions: {
        show: {
          resource: [resource],
          operation: [operation],
          returnAll: [false]
        }
      },
      default: 100,
      description: "Max number of results to return"
    }
  ];
  return pagingParameters;
}
function createSendAndWaitMessageBody(context) {
  const config = (0, import_utils.getSendAndWaitConfig)(context);
  const buttons = config.options.map(
    (option) => `*<${`${config.url}?approved=${option.value}`}|${option.label}>*`
  );
  let text = `${config.message}


${buttons.join("   ")}`;
  if (config.appendAttribution !== false) {
    const instanceId = context.getInstanceId();
    const attributionText = "_This_ _message_ _was_ _sent_ _automatically_ _with_";
    const link = (0, import_utilities.createUtmCampaignLink)("n8n-nodes-base.googleChat", instanceId);
    const attribution = `${attributionText} _<${link}|n8n>_`;
    text += `

${attribution}`;
  }
  const body = {
    text
  };
  return body;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSendAndWaitMessageBody,
  getPagingParameters,
  googleApiRequest,
  googleApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map