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
var asset_exports = {};
__export(asset_exports, {
  descriptions: () => descriptions,
  getPublicURL: () => getPublicURL,
  upload: () => upload
});
module.exports = __toCommonJS(asset_exports);
var getPublicURL = __toESM(require("./getPublicURL.operation"));
var upload = __toESM(require("./upload.operation"));
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["asset"]
      }
    },
    options: [
      {
        name: "Public URL",
        value: "getPublicURL",
        description: "Get the public URL from asset path",
        action: "Get the public URL from asset path"
      },
      {
        name: "Upload",
        value: "upload",
        description: "Add a file/image to an existing row",
        action: "Upload a file or image"
      }
    ],
    default: "upload"
  },
  ...upload.description,
  ...getPublicURL.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  descriptions,
  getPublicURL,
  upload
});
//# sourceMappingURL=index.js.map