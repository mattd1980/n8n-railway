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
  agileCrmApiRequest: () => agileCrmApiRequest,
  agileCrmApiRequestAllItems: () => agileCrmApiRequestAllItems,
  agileCrmApiRequestUpdate: () => agileCrmApiRequestUpdate,
  getFilterRules: () => getFilterRules,
  simplifyResponse: () => simplifyResponse,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function agileCrmApiRequest(method, endpoint, body = {}, query = {}, uri, sendAsForm) {
  const credentials = await this.getCredentials("agileCrmApi");
  const options = {
    method,
    headers: {
      Accept: "application/json"
    },
    auth: {
      username: credentials.email,
      password: credentials.apiKey
    },
    qs: query,
    uri: uri || `https://${credentials.subdomain}.agilecrm.com/dev/${endpoint}`,
    json: true
  };
  if (sendAsForm) {
    options.form = body;
  } else if (method !== "GET" && method !== "DELETE") {
    options.body = body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function agileCrmApiRequestAllItems(method, resource, body = {}, query = {}, uri, sendAsForm) {
  const returnData = [];
  let responseData;
  do {
    responseData = await agileCrmApiRequest.call(
      this,
      method,
      resource,
      body,
      query,
      uri,
      sendAsForm
    );
    if (responseData.length !== 0) {
      returnData.push.apply(returnData, responseData);
      if (sendAsForm) {
        body.cursor = responseData[responseData.length - 1].cursor;
      } else {
        query.cursor = responseData[responseData.length - 1].cursor;
      }
    }
  } while (responseData.length !== 0 && responseData[responseData.length - 1].hasOwnProperty("cursor"));
  return returnData;
}
async function agileCrmApiRequestUpdate(method = "PUT", _endpoint, body = {}, _query = {}, uri) {
  const credentials = await this.getCredentials("agileCrmApi");
  const baseUri = `https://${credentials.subdomain}.agilecrm.com/dev/`;
  const options = {
    method,
    headers: {
      Accept: "application/json"
    },
    body: { id: body.id },
    auth: {
      username: credentials.email,
      password: credentials.apiKey
    },
    uri: uri || baseUri,
    json: true
  };
  const successfulUpdates = [];
  let lastSuccesfulUpdateReturn;
  const payload = body;
  try {
    if (payload.properties) {
      options.body.properties = payload.properties;
      options.uri = baseUri + "api/contacts/edit-properties";
      lastSuccesfulUpdateReturn = await this.helpers.request(options);
      payload.properties?.map((property) => {
        successfulUpdates.push(`${property.name}`);
      });
      delete options.body.properties;
    }
    if (payload.lead_score) {
      options.body.lead_score = payload.lead_score;
      options.uri = baseUri + "api/contacts/edit/lead-score";
      lastSuccesfulUpdateReturn = await this.helpers.request(options);
      successfulUpdates.push("lead_score");
      delete options.body.lead_score;
    }
    if (body.tags) {
      options.body.tags = payload.tags;
      options.uri = baseUri + "api/contacts/edit/tags";
      lastSuccesfulUpdateReturn = await this.helpers.request(options);
      payload.tags?.map((tag) => {
        successfulUpdates.push(`(Tag) ${tag}`);
      });
      delete options.body.tags;
    }
    if (body.star_value) {
      options.body.star_value = payload.star_value;
      options.uri = baseUri + "api/contacts/edit/add-star";
      lastSuccesfulUpdateReturn = await this.helpers.request(options);
      successfulUpdates.push("star_value");
      delete options.body.star_value;
    }
    return lastSuccesfulUpdateReturn;
  } catch (error) {
    if (successfulUpdates.length === 0) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
    } else {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
        message: `Not all properties updated. Updated properties: ${successfulUpdates.join(", ")}`,
        description: error.message,
        httpCode: error.statusCode
      });
    }
  }
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
function getFilterRules(conditions, matchType) {
  const rules = [];
  for (const key in conditions) {
    if (conditions.hasOwnProperty(key)) {
      const searchConditions = conditions[key];
      const rule = {
        LHS: searchConditions.field,
        CONDITION: searchConditions.condition_type,
        RHS: searchConditions.value,
        RHS_NEW: searchConditions.value2
      };
      rules.push(rule);
    }
  }
  if (matchType === "anyFilter") {
    return {
      or_rules: rules
    };
  } else {
    return {
      rules
    };
  }
}
function simplifyResponse(records) {
  const results = [];
  for (const record of records) {
    results.push(
      record.properties.reduce(
        (obj, value) => Object.assign(obj, { [`${value.name}`]: value.value }),
        { id: record.id }
      )
    );
  }
  return results;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  agileCrmApiRequest,
  agileCrmApiRequestAllItems,
  agileCrmApiRequestUpdate,
  getFilterRules,
  simplifyResponse,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map