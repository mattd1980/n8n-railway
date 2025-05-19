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
var utils_exports = {};
__export(utils_exports, {
  getAdditionalOptions: () => getAdditionalOptions,
  getId: () => getId,
  mapWith: () => mapWith,
  showFor: () => showFor
});
module.exports = __toCommonJS(utils_exports);
const showFor = (resources) => (operations) => {
  return operations !== void 0 ? {
    displayOptions: {
      show: {
        resource: resources,
        operation: operations
      }
    }
  } : {
    displayOptions: {
      show: {
        resource: resources
      }
    }
  };
};
const mapWith = (...objects) => (item) => Object.assign({}, item, ...objects);
const getId = () => ({
  displayName: "ID",
  name: "id",
  type: "string",
  required: true,
  default: "",
  routing: {
    send: {
      type: "query",
      property: "ids[]"
    }
  }
});
const getAdditionalOptions = (fields) => {
  return {
    displayName: "Additional Options",
    name: "additionalOptions",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["getAll"]
      }
    },
    default: {},
    placeholder: "Add option",
    options: fields
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAdditionalOptions,
  getId,
  mapWith,
  showFor
});
//# sourceMappingURL=utils.js.map