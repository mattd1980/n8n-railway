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
  getHomeAssistantEntities: () => getHomeAssistantEntities,
  getHomeAssistantServices: () => getHomeAssistantServices,
  homeAssistantApiRequest: () => homeAssistantApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function homeAssistantApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  const credentials = await this.getCredentials("homeAssistantApi");
  let options = {
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`
    },
    method,
    qs,
    body,
    uri: uri ?? `${credentials.ssl === true ? "https" : "http"}://${credentials.host}:${credentials.port}/api${resource}`,
    json: true
  };
  options = Object.assign({}, options, option);
  if (Object.keys(options.body).length === 0) {
    delete options.body;
  }
  try {
    if (this.helpers.request) {
      return await this.helpers.request(options);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getHomeAssistantEntities(domain = "") {
  const returnData = [];
  const entities = await homeAssistantApiRequest.call(this, "GET", "/states");
  for (const entity of entities) {
    const entityId = entity.entity_id;
    if (domain === "" || domain && entityId.startsWith(domain)) {
      const entityName = entity.attributes.friendly_name || entityId;
      returnData.push({
        name: entityName,
        value: entityId
      });
    }
  }
  return returnData;
}
async function getHomeAssistantServices(domain = "") {
  const returnData = [];
  const services = await homeAssistantApiRequest.call(this, "GET", "/services");
  if (domain === "") {
    const domains = services.map(({ domain: service }) => service).sort();
    returnData.push(
      ...domains.map((service) => ({
        name: service,
        value: service
      }))
    );
    return returnData;
  } else {
    const domainServices = services.filter((service) => service.domain === domain);
    for (const domainService of domainServices) {
      for (const [serviceID, value] of Object.entries(domainService.services)) {
        const serviceProperties = value;
        const serviceName = serviceProperties.description || serviceID;
        returnData.push({
          name: serviceName,
          value: serviceID
        });
      }
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHomeAssistantEntities,
  getHomeAssistantServices,
  homeAssistantApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map