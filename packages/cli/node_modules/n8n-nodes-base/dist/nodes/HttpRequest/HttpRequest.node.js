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
var HttpRequest_node_exports = {};
__export(HttpRequest_node_exports, {
  HttpRequest: () => HttpRequest
});
module.exports = __toCommonJS(HttpRequest_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_HttpRequestV1 = require("./V1/HttpRequestV1.node");
var import_HttpRequestV2 = require("./V2/HttpRequestV2.node");
var import_HttpRequestV3 = require("./V3/HttpRequestV3.node");
class HttpRequest extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "HTTP Request",
      name: "httpRequest",
      icon: { light: "file:httprequest.svg", dark: "file:httprequest.dark.svg" },
      group: ["output"],
      subtitle: '={{$parameter["requestMethod"] + ": " + $parameter["url"]}}',
      description: "Makes an HTTP request and returns the response data",
      defaultVersion: 4.2
    };
    const nodeVersions = {
      1: new import_HttpRequestV1.HttpRequestV1(baseDescription),
      2: new import_HttpRequestV2.HttpRequestV2(baseDescription),
      3: new import_HttpRequestV3.HttpRequestV3(baseDescription),
      4: new import_HttpRequestV3.HttpRequestV3(baseDescription),
      4.1: new import_HttpRequestV3.HttpRequestV3(baseDescription),
      4.2: new import_HttpRequestV3.HttpRequestV3(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpRequest
});
//# sourceMappingURL=HttpRequest.node.js.map