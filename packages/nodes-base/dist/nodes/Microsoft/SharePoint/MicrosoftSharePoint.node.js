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
var MicrosoftSharePoint_node_exports = {};
__export(MicrosoftSharePoint_node_exports, {
  MicrosoftSharePoint: () => MicrosoftSharePoint
});
module.exports = __toCommonJS(MicrosoftSharePoint_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_methods = require("./methods");
class MicrosoftSharePoint {
  constructor() {
    this.description = {
      displayName: "Microsoft SharePoint",
      name: "microsoftSharePoint",
      icon: {
        light: "file:microsoftSharePoint.svg",
        dark: "file:microsoftSharePoint.svg"
      },
      group: ["transform"],
      version: 1,
      subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
      description: "Interact with Microsoft SharePoint API",
      defaults: {
        name: "Microsoft SharePoint"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "microsoftSharePointOAuth2Api",
          required: true
        }
      ],
      requestDefaults: {
        baseURL: "=https://{{ $credentials.subdomain }}.sharepoint.com/_api/v2.0/",
        ignoreHttpStatusErrors: true
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "File",
              value: "file"
            },
            {
              name: "Item",
              value: "item"
            },
            {
              name: "List",
              value: "list"
            }
          ],
          default: "file"
        },
        ...import_descriptions.file.description,
        ...import_descriptions.item.description,
        ...import_descriptions.list.description
      ]
    };
    this.methods = {
      listSearch: import_methods.listSearch,
      resourceMapping: import_methods.resourceMapping
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftSharePoint
});
//# sourceMappingURL=MicrosoftSharePoint.node.js.map