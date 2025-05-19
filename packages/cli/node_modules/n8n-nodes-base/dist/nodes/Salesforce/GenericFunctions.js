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
  getConditions: () => getConditions,
  getDefaultFields: () => getDefaultFields,
  getQuery: () => getQuery,
  getValue: () => getValue,
  salesforceApiRequest: () => salesforceApiRequest,
  salesforceApiRequestAllItems: () => salesforceApiRequestAllItems,
  sortOptions: () => sortOptions
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
function getOptions(method, endpoint, body, qs, instanceUrl) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: `${instanceUrl}/services/data/v59.0${endpoint}`,
    json: true
  };
  if (!Object.keys(options.body).length) {
    delete options.body;
  }
  return options;
}
async function getAccessToken(credentials) {
  const now = (0, import_moment_timezone.default)().unix();
  const authUrl = credentials.environment === "sandbox" ? "https://test.salesforce.com" : "https://login.salesforce.com";
  const signature = import_jsonwebtoken.default.sign(
    {
      iss: credentials.clientId,
      sub: credentials.username,
      aud: authUrl,
      exp: now + 3 * 60
    },
    credentials.privateKey,
    {
      algorithm: "RS256",
      header: {
        alg: "RS256"
      }
    }
  );
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    form: {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signature
    },
    uri: `${authUrl}/services/oauth2/token`,
    json: true
  };
  return await this.helpers.request(options);
}
async function salesforceApiRequest(method, endpoint, body = {}, qs = {}, uri, option = {}) {
  const authenticationMethod = this.getNodeParameter("authentication", 0, "oAuth2");
  try {
    if (authenticationMethod === "jwt") {
      const credentialsType = "salesforceJwtApi";
      const credentials = await this.getCredentials(credentialsType);
      const response = await getAccessToken.call(this, credentials);
      const { instance_url, access_token } = response;
      const options = getOptions.call(
        this,
        method,
        uri || endpoint,
        body,
        qs,
        instance_url
      );
      this.logger.debug(
        `Authentication for "Salesforce" node is using "jwt". Invoking URI ${options.uri}`
      );
      options.headers.Authorization = `Bearer ${access_token}`;
      Object.assign(options, option);
      return await this.helpers.request(options);
    } else {
      const credentialsType = "salesforceOAuth2Api";
      const credentials = await this.getCredentials(credentialsType);
      const options = getOptions.call(
        this,
        method,
        uri || endpoint,
        body,
        qs,
        credentials.oauthTokenData.instance_url
      );
      this.logger.debug(
        `Authentication for "Salesforce" node is using "OAuth2". Invoking URI ${options.uri}`
      );
      Object.assign(options, option);
      return await this.helpers.requestOAuth2.call(this, credentialsType, options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function salesforceApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  let uri;
  do {
    responseData = await salesforceApiRequest.call(this, method, endpoint, body, query, uri);
    uri = `${endpoint}/${responseData.nextRecordsUrl?.split("/")?.pop()}`;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextRecordsUrl !== void 0 && responseData.nextRecordsUrl !== null);
  return returnData;
}
function sortOptions(options) {
  options.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}
function getValue(value) {
  if ((0, import_moment_timezone.default)(value).isValid()) {
    return value;
  } else if (typeof value === "string") {
    return `'${value}'`;
  } else {
    return value;
  }
}
function getConditions(options) {
  const conditions = options.conditionsUi?.conditionValues;
  let data = void 0;
  if (Array.isArray(conditions) && conditions.length !== 0) {
    data = conditions.map(
      (condition) => `${condition.field} ${condition.operation === "equal" ? "=" : condition.operation} ${getValue(condition.value)}`
    );
    data = `WHERE ${data.join(" AND ")}`;
  }
  return data;
}
function getDefaultFields(sobject) {
  return {
    Account: "id,name,type",
    Lead: "id,company,firstname,lastname,street,postalCode,city,email,status",
    Contact: "id,firstname,lastname,email",
    Opportunity: "id,accountId,amount,probability,type",
    Case: "id,accountId,contactId,priority,status,subject,type",
    Task: "id,subject,status,priority",
    Attachment: "id,name",
    User: "id,name,email"
  }[sobject];
}
function getQuery(options, sobject, returnAll, limit = 0) {
  const fields = [];
  if (options.fields) {
    if (typeof options.fields === "string") {
      fields.push.apply(fields, options.fields.split(","));
    } else {
      fields.push.apply(fields, options.fields);
    }
  } else {
    fields.push.apply(fields, (getDefaultFields(sobject) || "id").split(","));
  }
  const conditions = getConditions(options);
  let query = `SELECT ${fields.join(",")} FROM ${sobject} ${conditions ? conditions : ""}`;
  if (!returnAll) {
    query = `SELECT ${fields.join(",")} FROM ${sobject} ${conditions ? conditions : ""} LIMIT ${limit}`;
  }
  return query;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConditions,
  getDefaultFields,
  getQuery,
  getValue,
  salesforceApiRequest,
  salesforceApiRequestAllItems,
  sortOptions
});
//# sourceMappingURL=GenericFunctions.js.map