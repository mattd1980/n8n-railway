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
  cortexApiRequest: () => cortexApiRequest,
  getEntityLabel: () => getEntityLabel,
  prepareParameters: () => prepareParameters,
  splitTags: () => splitTags
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
async function cortexApiRequest(method, resource, body = {}, query = {}, uri, option = {}) {
  const credentials = await this.getCredentials("cortexApi");
  let options = {
    headers: {},
    method,
    qs: query,
    uri: uri || `${credentials.host}/api${resource}`,
    body,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    options = Object.assign({}, options, option);
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  if (Object.keys(query).length === 0) {
    delete options.qs;
  }
  return await this.helpers.requestWithAuthentication.call(this, "cortexApi", options);
}
function getEntityLabel(entity) {
  let label = "";
  switch (entity._type) {
    case "case":
      label = `#${entity.caseId} ${entity.title}`;
      break;
    case "case_artifact":
      label = `[${entity.dataType}] ${entity.data ? entity.data : entity.attachment.name}`;
      break;
    case "alert":
      label = `[${entity.source}:${entity.sourceRef}] ${entity.title}`;
      break;
    case "case_task_log":
      label = `${entity.message} from ${entity.createdBy}`;
      break;
    case "case_task":
      label = `${entity.title} (${entity.status})`;
      break;
    case "job":
      label = `${entity.analyzerName} (${entity.status})`;
      break;
    default:
      break;
  }
  return label;
}
function splitTags(tags) {
  return tags.split(",").filter((tag) => tag !== " " && tag);
}
function prepareParameters(values) {
  const response = {};
  for (const key in values) {
    if (values[key] !== void 0 && values[key] !== null && values[key] !== "") {
      if ((0, import_moment_timezone.default)(values[key], import_moment_timezone.default.ISO_8601).isValid()) {
        response[key] = Date.parse(values[key]);
      } else if (key === "tags") {
        response[key] = splitTags(values[key]);
      } else {
        response[key] = values[key];
      }
    }
  }
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cortexApiRequest,
  getEntityLabel,
  prepareParameters,
  splitTags
});
//# sourceMappingURL=GenericFunctions.js.map