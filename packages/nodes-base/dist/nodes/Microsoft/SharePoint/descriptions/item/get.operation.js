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
var get_operation_exports = {};
__export(get_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(get_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.siteRLC,
    description: "Select the site to retrieve lists from"
  },
  {
    ...import_common.listRLC,
    description: "Select the list you want to retrieve an item from",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected
      }
    }
  },
  {
    ...import_common.itemRLC,
    description: "Select the item you want to get",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected,
        ...import_common.untilListSelected
      }
    }
  },
  {
    displayName: "Simplify",
    name: "simplify",
    default: true,
    routing: {
      send: {
        preSend: [
          async function(requestOptions) {
            const simplify = this.getNodeParameter("simplify", false);
            if (simplify) {
              requestOptions.qs ??= {};
              requestOptions.qs.$select = "id,createdDateTime,lastModifiedDateTime,webUrl";
              requestOptions.qs.$expand = "fields(select=Title)";
            }
            return requestOptions;
          }
        ]
      }
    },
    type: "boolean"
  }
];
const displayOptions = {
  show: {
    resource: ["item"],
    operation: ["get"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=get.operation.js.map