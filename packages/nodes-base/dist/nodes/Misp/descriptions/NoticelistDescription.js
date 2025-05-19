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
var NoticelistDescription_exports = {};
__export(NoticelistDescription_exports, {
  noticelistFields: () => noticelistFields,
  noticelistOperations: () => noticelistOperations
});
module.exports = __toCommonJS(NoticelistDescription_exports);
const noticelistOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    displayOptions: {
      show: {
        resource: ["noticelist"]
      }
    },
    noDataExpression: true,
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a noticelist"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many noticelists"
      }
    ],
    default: "get"
  }
];
const noticelistFields = [
  // ----------------------------------------
  //             noticelist: get
  // ----------------------------------------
  {
    displayName: "Noticelist ID",
    name: "noticelistId",
    description: "Numeric ID of the noticelist",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["noticelist"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["noticelist"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["noticelist"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  noticelistFields,
  noticelistOperations
});
//# sourceMappingURL=NoticelistDescription.js.map