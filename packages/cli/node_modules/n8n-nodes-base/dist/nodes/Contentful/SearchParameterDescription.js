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
var SearchParameterDescription_exports = {};
__export(SearchParameterDescription_exports, {
  fields: () => fields
});
module.exports = __toCommonJS(SearchParameterDescription_exports);
const fields = [
  {
    displayName: "Search Parameters",
    name: "search_parameters",
    description: "You can use a variety of query parameters to search and filter items",
    placeholder: "Add parameter",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        displayName: "Parameters",
        name: "parameters",
        values: [
          {
            displayName: "Parameter Name",
            name: "name",
            type: "string",
            default: "",
            description: "Name of the search parameter to set"
          },
          {
            displayName: "Parameter Value",
            name: "value",
            type: "string",
            default: "",
            description: "Value of the search parameter to set"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fields
});
//# sourceMappingURL=SearchParameterDescription.js.map