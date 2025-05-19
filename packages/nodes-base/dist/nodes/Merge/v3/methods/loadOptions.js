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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getInputs: () => getInputs,
  getResolveClashOptions: () => getResolveClashOptions
});
module.exports = __toCommonJS(loadOptions_exports);
async function getResolveClashOptions() {
  const numberOfInputs = this.getNodeParameter("numberInputs", 2);
  if (numberOfInputs <= 2) {
    return [
      {
        name: "Always Add Input Number to Field Names",
        value: "addSuffix"
      },
      {
        name: "Prefer Input 1 Version",
        value: "preferInput1"
      },
      {
        name: "Prefer Input 2 Version",
        value: "preferLast"
      }
    ];
  } else {
    return [
      {
        name: "Always Add Input Number to Field Names",
        value: "addSuffix"
      },
      {
        name: "Use Earliest Version",
        value: "preferInput1"
      }
    ];
  }
}
async function getInputs() {
  const numberOfInputs = this.getNodeParameter("numberInputs", 2);
  const returnData = [];
  for (let i = 0; i < numberOfInputs; i++) {
    returnData.push({
      name: `${i + 1}`,
      value: i + 1
    });
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInputs,
  getResolveClashOptions
});
//# sourceMappingURL=loadOptions.js.map