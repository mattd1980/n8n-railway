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
var PackageDescription_exports = {};
__export(PackageDescription_exports, {
  packageFields: () => packageFields,
  packageOperations: () => packageOperations
});
module.exports = __toCommonJS(PackageDescription_exports);
var import_semver = require("semver");
const packageOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "getMetadata",
    displayOptions: {
      show: {
        resource: ["package"]
      }
    },
    options: [
      {
        name: "Get Metadata",
        value: "getMetadata",
        action: "Returns all the metadata for a package at a specific version",
        description: "Returns all the metadata for a package at a specific version",
        routing: {
          request: {
            method: "GET",
            url: "=/{{ encodeURIComponent($parameter.packageName) }}/{{ $parameter.packageVersion }}"
          }
        }
      },
      {
        name: "Get Versions",
        value: "getVersions",
        action: "Returns all the versions for a package",
        description: "Returns all the versions for a package",
        routing: {
          request: {
            method: "GET",
            url: "=/{{ encodeURIComponent($parameter.packageName) }}"
          },
          output: {
            postReceive: [
              async function(items) {
                const allVersions = [];
                for (const { json } of items) {
                  const itemVersions = json.time;
                  Object.keys(itemVersions).forEach((version) => {
                    if ((0, import_semver.valid)(version)) {
                      allVersions.push({
                        json: {
                          version,
                          published_at: itemVersions[version]
                        }
                      });
                    }
                  });
                }
                allVersions.sort(
                  (a, b) => new Date(b.json.published_at).getTime() - new Date(a.json.published_at).getTime()
                );
                return allVersions;
              }
            ]
          }
        }
      },
      {
        name: "Search",
        value: "search",
        action: "Search for packages",
        description: "Search for packages",
        routing: {
          request: {
            method: "GET",
            url: "/-/v1/search",
            qs: {
              text: "={{$parameter.query}}",
              size: "={{$parameter.limit}}",
              from: "={{$parameter.offset}}",
              popularity: 0.99
            }
          },
          output: {
            postReceive: [
              async function(items) {
                return items.flatMap(
                  ({ json }) => json.objects.map(
                    ({ package: { name, version, description } }) => ({ json: { name, version, description } })
                  )
                );
              }
            ]
          }
        }
      }
    ]
  }
];
const packageFields = [
  {
    displayName: "Package Name",
    name: "packageName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["package"],
        operation: ["getMetadata", "getVersions"]
      }
    }
  },
  {
    displayName: "Package Version",
    name: "packageVersion",
    type: "string",
    required: true,
    default: "latest",
    displayOptions: {
      show: {
        resource: ["package"],
        operation: ["getMetadata"]
      }
    }
  },
  {
    displayName: "Query",
    name: "query",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["package"],
        operation: ["search"]
      }
    },
    default: "",
    description: "The query text used to search for packages"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 10,
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        resource: ["package"],
        operation: ["search"]
      }
    },
    description: "Max number of results to return"
  },
  {
    displayName: "Offset",
    name: "offset",
    type: "number",
    default: 0,
    typeOptions: {
      minValue: 0
    },
    displayOptions: {
      show: {
        resource: ["package"],
        operation: ["search"]
      }
    },
    description: "Offset to return results from"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  packageFields,
  packageOperations
});
//# sourceMappingURL=PackageDescription.js.map