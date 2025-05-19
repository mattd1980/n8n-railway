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
  onfleetApiRequest: () => onfleetApiRequest,
  onfleetApiRequestAllItems: () => onfleetApiRequestAllItems,
  resourceLoaders: () => resourceLoaders
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
async function onfleetApiRequest(method, resource, body = {}, qs, uri) {
  const credentials = await this.getCredentials("onfleetApi");
  const options = {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "n8n-onfleet"
    },
    auth: {
      user: credentials.apiKey,
      pass: ""
    },
    method,
    body,
    qs,
    uri: uri || `https://onfleet.com/api/v2/${resource}`,
    json: true
  };
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function onfleetApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  do {
    responseData = await onfleetApiRequest.call(this, method, endpoint, body, query);
    query.lastId = responseData.lastId;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.lastId !== void 0);
  return returnData;
}
const resourceLoaders = {
  async getTeams() {
    try {
      const teams = await onfleetApiRequest.call(this, "GET", "teams");
      return teams.map(({ name = "", id: value = "" }) => ({
        name,
        value
      }));
    } catch (error) {
      return [];
    }
  },
  async getWorkers() {
    try {
      const workers = await onfleetApiRequest.call(this, "GET", "workers");
      return workers.map(({ name = "", id: value = "" }) => ({
        name,
        value
      }));
    } catch (error) {
      return [];
    }
  },
  async getAdmins() {
    try {
      const admins = await onfleetApiRequest.call(this, "GET", "admins");
      return admins.map(({ name = "", id: value = "" }) => ({
        name,
        value
      }));
    } catch (error) {
      return [];
    }
  },
  async getHubs() {
    try {
      const hubs = await onfleetApiRequest.call(this, "GET", "hubs");
      return hubs.map(({ name = "", id: value = "" }) => ({
        name,
        value
      }));
    } catch (error) {
      return [];
    }
  },
  async getTimezones() {
    const returnData = [];
    for (const timezone of import_moment_timezone.default.tz.names()) {
      returnData.push({
        name: timezone,
        value: timezone
      });
    }
    return returnData;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  onfleetApiRequest,
  onfleetApiRequestAllItems,
  resourceLoaders
});
//# sourceMappingURL=GenericFunctions.js.map