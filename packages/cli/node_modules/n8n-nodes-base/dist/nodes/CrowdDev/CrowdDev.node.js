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
var CrowdDev_node_exports = {};
__export(CrowdDev_node_exports, {
  CrowdDev: () => CrowdDev
});
module.exports = __toCommonJS(CrowdDev_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
class CrowdDev {
  constructor() {
    this.description = {
      displayName: "crowd.dev",
      name: "crowdDev",
      icon: { light: "file:crowdDev.svg", dark: "file:crowdDev.dark.svg" },
      group: ["transform"],
      version: 1,
      subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
      description: "crowd.dev is an open-source suite of community and data tools built to unlock community-led growth for your organization.",
      defaults: {
        name: "crowd.dev"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "crowdDevApi",
          required: true
        }
      ],
      requestDefaults: {
        baseURL: "={{$credentials.url}}/api/tenant/{{$credentials.tenantId}}",
        json: true,
        skipSslCertificateValidation: "={{ $credentials.allowUnauthorizedCerts }}"
      },
      properties: import_descriptions.allProperties
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CrowdDev
});
//# sourceMappingURL=CrowdDev.node.js.map