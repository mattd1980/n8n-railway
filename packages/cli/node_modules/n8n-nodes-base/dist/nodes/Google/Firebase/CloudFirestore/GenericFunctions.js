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
  documentToJson: () => documentToJson,
  fullDocumentToJson: () => fullDocumentToJson,
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems,
  jsonToDocument: () => jsonToDocument
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("../../GenericFunctions");
async function googleApiRequest(method, resource, body = {}, qs = {}, uri = null) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    qsStringifyOptions: {
      arrayFormat: "repeat"
    },
    uri: uri || `https://firestore.googleapis.com/v1/projects${resource}`,
    json: true
  };
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    let credentialType = "googleFirebaseCloudFirestoreOAuth2Api";
    const authentication = this.getNodeParameter("authentication", 0);
    if (authentication === "serviceAccount") {
      const credentials = await this.getCredentials("googleApi");
      credentialType = "googleApi";
      const { access_token } = await import_GenericFunctions.getGoogleAccessToken.call(this, credentials, "firestore");
      options.headers.Authorization = `Bearer ${access_token}`;
    }
    return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function googleApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}, uri = null) {
  const returnData = [];
  let responseData;
  query.pageSize = 100;
  do {
    responseData = await googleApiRequest.call(this, method, endpoint, body, query, uri);
    query.pageToken = responseData.nextPageToken;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
const isValidDate = (str) => (0, import_moment_timezone.default)(str, ["YYYY-MM-DD HH:mm:ss Z", import_moment_timezone.default.ISO_8601], true).isValid();
const protoKeys = ["__proto__", "prototype", "constructor"];
function jsonToDocument(value) {
  if (value === "true" || value === "false" || typeof value === "boolean") {
    return { booleanValue: value };
  } else if (value === null) {
    return { nullValue: null };
  } else if (value !== "" && !isNaN(value)) {
    if (value.toString().indexOf(".") !== -1) {
      return { doubleValue: value };
    } else {
      return { integerValue: value };
    }
  } else if (isValidDate(value)) {
    const date = new Date(Date.parse(value));
    return { timestampValue: date.toISOString() };
  } else if (typeof value === "string") {
    return { stringValue: value };
  } else if (value && value.constructor === Array) {
    return { arrayValue: { values: value.map((v) => jsonToDocument(v)) } };
  } else if (typeof value === "object") {
    const obj = {};
    for (const key of Object.keys(value)) {
      if (value.hasOwnProperty(key) && !protoKeys.includes(key)) {
        obj[key] = jsonToDocument(value[key]);
      }
    }
    return { mapValue: { fields: obj } };
  }
  return {};
}
function documentToJson(fields) {
  if (fields === void 0) return {};
  const result = {};
  for (const f of Object.keys(fields)) {
    const key = f, value = fields[f], isDocumentType = [
      "stringValue",
      "booleanValue",
      "doubleValue",
      "integerValue",
      "timestampValue",
      "mapValue",
      "arrayValue",
      "nullValue",
      "geoPointValue"
    ].find((t) => t === key);
    if (isDocumentType) {
      const item = [
        "stringValue",
        "booleanValue",
        "doubleValue",
        "integerValue",
        "timestampValue",
        "nullValue",
        "geoPointValue"
      ].find((t) => t === key);
      if (item) {
        return value;
      } else if ("mapValue" === key) {
        return documentToJson(value.fields || {});
      } else if ("arrayValue" === key) {
        const list = value.values;
        return !!list ? list.map((l) => documentToJson(l)) : [];
      }
    } else {
      result[key] = documentToJson(value);
    }
  }
  return result;
}
function fullDocumentToJson(data) {
  if (data === void 0) {
    return data;
  }
  return {
    _name: data.name,
    _id: data.id,
    _createTime: data.createTime,
    _updateTime: data.updateTime,
    ...documentToJson(data.fields)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  documentToJson,
  fullDocumentToJson,
  googleApiRequest,
  googleApiRequestAllItems,
  jsonToDocument
});
//# sourceMappingURL=GenericFunctions.js.map