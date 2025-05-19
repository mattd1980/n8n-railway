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
  allFields: () => allFields,
  cleanData: () => cleanData,
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function googleApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://people.googleapis.com/v1${resource}`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestOAuth2.call(this, "googleContactsOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
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
const allFields = [
  "addresses",
  "biographies",
  "birthdays",
  "coverPhotos",
  "emailAddresses",
  "events",
  "genders",
  "imClients",
  "interests",
  "locales",
  "memberships",
  "metadata",
  "names",
  "nicknames",
  "occupations",
  "organizations",
  "phoneNumbers",
  "photos",
  "relations",
  "residences",
  "sipAddresses",
  "skills",
  "urls",
  "userDefined"
];
function cleanData(responseData) {
  const fields = ["emailAddresses", "phoneNumbers", "relations", "events", "addresses"];
  const newResponseData = [];
  if (!Array.isArray(responseData)) {
    responseData = [responseData];
  }
  for (let y = 0; y < responseData.length; y++) {
    const object = {};
    for (const key of Object.keys(responseData[y])) {
      if (key === "metadata") {
        continue;
      }
      if (key === "photos") {
        responseData[y][key] = responseData[y][key].map((photo) => photo.url);
      }
      if (key === "names") {
        delete responseData[y][key][0].metadata;
        responseData[y][key] = responseData[y][key][0];
      }
      if (key === "memberships") {
        for (let i = 0; i < responseData[y][key].length; i++) {
          responseData[y][key][i] = responseData[y][key][i].metadata.source.id;
        }
      }
      if (key === "birthdays") {
        for (let i = 0; i < responseData[y][key].length; i++) {
          const { year, month, day } = responseData[y][key][i].date;
          responseData[y][key][i] = `${month}/${day}/${year}`;
        }
        responseData[y][key] = responseData[y][key][0];
      }
      if (key === "userDefined" || key === "organizations" || key === "biographies") {
        for (let i = 0; i < responseData[y][key].length; i++) {
          delete responseData[y][key][i].metadata;
        }
      }
      if (fields.includes(key)) {
        const value = {};
        for (const data of responseData[y][key]) {
          let result;
          if (value[data.type] === void 0) {
            value[data.type] = [];
          }
          if (key === "relations") {
            result = data.person;
          } else if (key === "events") {
            const { year, month, day } = data.date;
            result = `${month}/${day}/${year}`;
          } else if (key === "addresses") {
            delete data.metadata;
            result = data;
          } else {
            result = data.value;
          }
          value[data.type].push(result);
          delete data.type;
        }
        if (Object.keys(value).length > 0) {
          object[key] = value;
        }
      } else {
        object[key] = responseData[y][key];
      }
    }
    newResponseData.push(object);
  }
  return newResponseData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  allFields,
  cleanData,
  googleApiRequest,
  googleApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map