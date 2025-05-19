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
var DistTagDescription_exports = {};
__export(DistTagDescription_exports, {
  distTagFields: () => distTagFields,
  distTagOperations: () => distTagOperations
});
module.exports = __toCommonJS(DistTagDescription_exports);
const distTagOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "getMany",
    displayOptions: {
      show: {
        resource: ["distTag"]
      }
    },
    options: [
      {
        name: "Get All",
        value: "getMany",
        action: "Returns all the dist-tags for a package",
        description: "Returns all the dist-tags for a package",
        routing: {
          request: {
            method: "GET",
            url: "=/-/package/{{ encodeURIComponent($parameter.packageName) }}/dist-tags"
          }
        }
      },
      {
        name: "Update",
        value: "update",
        action: "Update a the dist-tags for a package",
        description: "Update a the dist-tags for a package",
        routing: {
          request: {
            method: "PUT",
            url: "=/-/package/{{ encodeURIComponent($parameter.packageName) }}/dist-tags/{{ encodeURIComponent($parameter.distTagName) }}"
          },
          send: {
            preSend: [
              async function(requestOptions) {
                requestOptions.headers["content-type"] = "application/x-www-form-urlencoded";
                requestOptions.body = this.getNodeParameter("packageVersion");
                return requestOptions;
              }
            ]
          }
        }
      }
    ]
  }
];
const distTagFields = [
  {
    displayName: "Package Name",
    name: "packageName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["distTag"],
        operation: ["getMany", "update"]
      }
    }
  },
  {
    displayName: "Package Version",
    name: "packageVersion",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["distTag"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Distribution Tag Name",
    name: "distTagName",
    type: "string",
    required: true,
    default: "latest",
    displayOptions: {
      show: {
        resource: ["distTag"],
        operation: ["update"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  distTagFields,
  distTagOperations
});
//# sourceMappingURL=DistTagDescription.js.map