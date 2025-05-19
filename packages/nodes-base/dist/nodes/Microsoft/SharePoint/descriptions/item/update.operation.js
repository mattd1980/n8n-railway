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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(update_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.siteRLC,
    description: "Select the site to retrieve lists from"
  },
  {
    ...import_common.listRLC,
    description: "Select the list you want to update an item in",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected
      }
    }
  },
  {
    displayName: "Due to API restrictions, the following column types cannot be updated: Hyperlink, Location, Metadata",
    name: "noticeUnsupportedFields",
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected,
        ...import_common.untilListSelected
      }
    },
    type: "notice",
    default: ""
  },
  {
    displayName: "Columns",
    name: "columns",
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    displayOptions: {
      hide: {
        ...import_common.untilSiteSelected,
        ...import_common.untilListSelected
      }
    },
    noDataExpression: true,
    required: true,
    routing: {
      send: {
        preSend: [import_utils.itemColumnsPreSend]
      }
    },
    type: "resourceMapper",
    typeOptions: {
      loadOptionsDependsOn: ["site.value", "list.value"],
      resourceMapper: {
        resourceMapperMethod: "getMappingColumns",
        mode: "update",
        fieldWords: {
          singular: "column",
          plural: "columns"
        },
        addAllFields: true,
        multiKeyMatch: false
      }
    }
  }
];
const displayOptions = {
  show: {
    resource: ["item"],
    operation: ["update"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=update.operation.js.map