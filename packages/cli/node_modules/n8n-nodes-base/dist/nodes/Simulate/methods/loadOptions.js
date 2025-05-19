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
  getNodeTypes: () => getNodeTypes
});
module.exports = __toCommonJS(loadOptions_exports);
async function getNodeTypes() {
  const types = this.getKnownNodeTypes();
  const returnData = [];
  let typeNames = Object.keys(types);
  if (this.getNode().type === "n8n-nodes-base.simulateTrigger") {
    typeNames = typeNames.filter((type) => type.toLowerCase().includes("trigger"));
  }
  for (const type of typeNames) {
    returnData.push({
      name: types[type].className,
      value: type
    });
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getNodeTypes
});
//# sourceMappingURL=loadOptions.js.map