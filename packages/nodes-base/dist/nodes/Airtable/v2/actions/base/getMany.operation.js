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
var getMany_operation_exports = {};
__export(getMany_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getMany_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: true,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Permission Level",
        name: "permissionLevel",
        type: "multiOptions",
        options: [
          {
            name: "Comment",
            value: "comment"
          },
          {
            name: "Create",
            value: "create"
          },
          {
            name: "Edit",
            value: "edit"
          },
          {
            name: "None",
            value: "none"
          },
          {
            name: "Read",
            value: "read"
          }
        ],
        default: [],
        description: "Filter the returned bases by one or more permission levels"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["base"],
    operation: ["getMany"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute() {
  const returnAll = this.getNodeParameter("returnAll", 0);
  const endpoint = "meta/bases";
  let bases = [];
  if (returnAll) {
    let offset = void 0;
    do {
      const responseData = await import_transport.apiRequest.call(this, "GET", endpoint);
      bases.push(...responseData.bases);
      offset = responseData.offset;
    } while (offset);
  } else {
    const responseData = await import_transport.apiRequest.call(this, "GET", endpoint);
    const limit = this.getNodeParameter("limit", 0);
    if (limit && responseData.bases?.length) {
      bases = responseData.bases.slice(0, limit);
    }
  }
  const permissionLevel = this.getNodeParameter("options.permissionLevel", 0, []);
  if (permissionLevel.length) {
    bases = bases.filter((base) => permissionLevel.includes(base.permissionLevel));
  }
  const itemData = (0, import_utilities.generatePairedItemData)(this.getInputData().length);
  const returnData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(bases), {
    itemData
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getMany.operation.js.map