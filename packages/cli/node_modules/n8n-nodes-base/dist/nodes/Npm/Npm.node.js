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
var Npm_node_exports = {};
__export(Npm_node_exports, {
  Npm: () => Npm
});
module.exports = __toCommonJS(Npm_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_DistTagDescription = require("./DistTagDescription");
var import_PackageDescription = require("./PackageDescription");
class Npm {
  constructor() {
    this.description = {
      displayName: "Npm",
      name: "npm",
      icon: "file:npm.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
      description: "Consume NPM registry API",
      defaults: {
        name: "npm"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "npmApi",
          required: false
        }
      ],
      requestDefaults: {
        baseURL: "={{ $credentials.registryUrl }}"
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Package",
              value: "package"
            },
            {
              name: "Distribution Tag",
              value: "distTag"
            }
          ],
          default: "package"
        },
        ...import_PackageDescription.packageOperations,
        ...import_PackageDescription.packageFields,
        ...import_DistTagDescription.distTagOperations,
        ...import_DistTagDescription.distTagFields
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Npm
});
//# sourceMappingURL=Npm.node.js.map