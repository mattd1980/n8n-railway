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
var PostBin_node_exports = {};
__export(PostBin_node_exports, {
  PostBin: () => PostBin
});
module.exports = __toCommonJS(PostBin_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_BinDescription = require("./BinDescription");
var import_RequestDescription = require("./RequestDescription");
class PostBin {
  constructor() {
    this.description = {
      displayName: "PostBin",
      name: "postBin",
      icon: "file:postbin.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
      description: "Consume PostBin API",
      defaults: {
        name: "PostBin"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [],
      requestDefaults: {
        baseURL: "https://www.postb.in"
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Bin",
              value: "bin"
            },
            {
              name: "Request",
              value: "request"
            }
          ],
          default: "bin",
          required: true
        },
        ...import_BinDescription.binOperations,
        ...import_BinDescription.binFields,
        ...import_RequestDescription.requestOperations,
        ...import_RequestDescription.requestFields
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostBin
});
//# sourceMappingURL=PostBin.node.js.map