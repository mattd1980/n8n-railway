"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var File_resource_exports = {};
__export(File_resource_exports, {
  description: () => description
});
module.exports = __toCommonJS(File_resource_exports);
var download = __toESM(require("./download.operation"));
var update = __toESM(require("./update.operation"));
var upload = __toESM(require("./upload.operation"));
var import_utils = require("../../helpers/utils");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["file"]
      }
    },
    options: [
      {
        name: "Download",
        value: "download",
        description: "Download a file",
        routing: {
          request: {
            method: "GET",
            url: '=/sites/{{ $parameter["site"] }}/drive/items/{{ $parameter["file"] }}/content',
            json: false,
            encoding: "arraybuffer"
          },
          output: {
            postReceive: [import_utils.handleErrorPostReceive, import_utils.downloadFilePostReceive]
          }
        },
        action: "Download file"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a file",
        routing: {
          request: {
            method: "PATCH",
            url: '=/sites/{{ $parameter["site"] }}/drive/items/{{ $parameter["file"] }}'
          },
          output: {
            postReceive: [import_utils.handleErrorPostReceive]
          }
        },
        action: "Update file"
      },
      {
        name: "Upload",
        value: "upload",
        description: "Upload an existing file",
        routing: {
          request: {
            method: "PUT",
            url: '=/sites/{{ $parameter["site"] }}/drive/items/{{ $parameter["folder"] }}:/{{ $parameter["fileName"] }}:/content'
          },
          output: {
            postReceive: [import_utils.handleErrorPostReceive]
          }
        },
        action: "Upload file"
      }
    ],
    default: "download"
  },
  ...download.description,
  ...update.description,
  ...upload.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=File.resource.js.map