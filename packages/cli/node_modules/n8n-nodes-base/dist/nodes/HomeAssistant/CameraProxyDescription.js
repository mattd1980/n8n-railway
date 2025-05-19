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
var CameraProxyDescription_exports = {};
__export(CameraProxyDescription_exports, {
  cameraProxyFields: () => cameraProxyFields,
  cameraProxyOperations: () => cameraProxyOperations
});
module.exports = __toCommonJS(CameraProxyDescription_exports);
const cameraProxyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["cameraProxy"]
      }
    },
    options: [
      {
        name: "Get Screenshot",
        value: "getScreenshot",
        description: "Get the camera screenshot",
        action: "Get a screenshot"
      }
    ],
    default: "getScreenshot"
  }
];
const cameraProxyFields = [
  /* -------------------------------------------------------------------------- */
  /*                       cameraProxy:getScreenshot                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Camera Entity Name or ID",
    name: "cameraEntityId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getCameraEntities"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["getScreenshot"],
        resource: ["cameraProxy"]
      }
    }
  },
  {
    displayName: "Put Output File in Field",
    name: "binaryPropertyName",
    type: "string",
    required: true,
    default: "data",
    displayOptions: {
      show: {
        operation: ["getScreenshot"],
        resource: ["cameraProxy"]
      }
    },
    hint: "The name of the output binary field to put the file in"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cameraProxyFields,
  cameraProxyOperations
});
//# sourceMappingURL=CameraProxyDescription.js.map