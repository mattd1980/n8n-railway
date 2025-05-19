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
  TableFieldMapper: () => TableFieldMapper,
  baserowApiRequest: () => baserowApiRequest,
  baserowApiRequestAllItems: () => baserowApiRequestAllItems,
  getFieldNamesAndIds: () => getFieldNamesAndIds,
  getJwtToken: () => getJwtToken,
  toOptions: () => toOptions
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function baserowApiRequest(method, endpoint, jwtToken, body = {}, qs = {}) {
  const credentials = await this.getCredentials("baserowApi");
  const options = {
    headers: {
      Authorization: `JWT ${jwtToken}`
    },
    method,
    body,
    qs,
    uri: `${credentials.host}${endpoint}`,
    json: true
  };
  if (Object.keys(qs).length === 0) {
    delete options.qs;
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function baserowApiRequestAllItems(method, endpoint, jwtToken, body, qs = {}) {
  const returnData = [];
  let responseData;
  qs.page = 1;
  qs.size = 100;
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  const limit = this.getNodeParameter("limit", 0, 0);
  do {
    responseData = await baserowApiRequest.call(this, method, endpoint, jwtToken, body, qs);
    returnData.push(...responseData.results);
    if (!returnAll && returnData.length > limit) {
      return returnData.slice(0, limit);
    }
    qs.page += 1;
  } while (responseData.next !== null);
  return returnData;
}
async function getJwtToken({ username, password, host }) {
  const options = {
    method: "POST",
    body: {
      username,
      password
    },
    uri: `${host}/api/user/token-auth/`,
    json: true
  };
  try {
    const { token } = await this.helpers.request(options);
    return token;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getFieldNamesAndIds(tableId, jwtToken) {
  const endpoint = `/api/database/fields/table/${tableId}/`;
  const response = await baserowApiRequest.call(
    this,
    "GET",
    endpoint,
    jwtToken
  );
  return {
    names: response.map((field) => field.name),
    ids: response.map((field) => `field_${field.id}`)
  };
}
const toOptions = (items) => items.map(({ name, id }) => ({ name, value: id }));
class TableFieldMapper {
  constructor() {
    this.nameToIdMapping = {};
    this.idToNameMapping = {};
    this.mapIds = true;
  }
  async getTableFields(table, jwtToken) {
    const endpoint = `/api/database/fields/table/${table}/`;
    return await baserowApiRequest.call(this, "GET", endpoint, jwtToken);
  }
  createMappings(tableFields) {
    this.nameToIdMapping = this.createNameToIdMapping(tableFields);
    this.idToNameMapping = this.createIdToNameMapping(tableFields);
  }
  createIdToNameMapping(responseData) {
    return responseData.reduce((acc, cur) => {
      acc[`field_${cur.id}`] = cur.name;
      return acc;
    }, {});
  }
  createNameToIdMapping(responseData) {
    return responseData.reduce((acc, cur) => {
      acc[cur.name] = `field_${cur.id}`;
      return acc;
    }, {});
  }
  setField(field) {
    return this.mapIds ? field : this.nameToIdMapping[field] ?? field;
  }
  idsToNames(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      if (this.idToNameMapping[key] !== void 0) {
        delete obj[key];
        obj[this.idToNameMapping[key]] = value;
      }
    });
  }
  namesToIds(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      if (this.nameToIdMapping[key] !== void 0) {
        delete obj[key];
        obj[this.nameToIdMapping[key]] = value;
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TableFieldMapper,
  baserowApiRequest,
  baserowApiRequestAllItems,
  getFieldNamesAndIds,
  getJwtToken,
  toOptions
});
//# sourceMappingURL=GenericFunctions.js.map