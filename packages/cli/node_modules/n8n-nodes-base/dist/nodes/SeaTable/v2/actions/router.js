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
var router_exports = {};
__export(router_exports, {
  router: () => router
});
module.exports = __toCommonJS(router_exports);
var asset = __toESM(require("./asset"));
var base = __toESM(require("./base"));
var link = __toESM(require("./link"));
var row = __toESM(require("./row"));
async function router() {
  const items = this.getInputData();
  const operationResult = [];
  let responseData = [];
  for (let i = 0; i < items.length; i++) {
    const resource = this.getNodeParameter("resource", i);
    const operation = this.getNodeParameter("operation", i);
    const seatable = {
      resource,
      operation
    };
    try {
      if (seatable.resource === "row") {
        responseData = await row[seatable.operation].execute.call(this, i);
      } else if (seatable.resource === "base") {
        responseData = await base[seatable.operation].execute.call(this, i);
      } else if (seatable.resource === "link") {
        responseData = await link[seatable.operation].execute.call(this, i);
      } else if (seatable.resource === "asset") {
        responseData = await asset[seatable.operation].execute.call(this, i);
      }
      const executionData = this.helpers.constructExecutionMetaData(
        responseData,
        {
          itemData: { item: i }
        }
      );
      operationResult.push(...executionData);
    } catch (error) {
      if (this.continueOnFail()) {
        operationResult.push({ json: this.getInputData(i)[0].json, error });
      } else {
        if (error.context) error.context.itemIndex = i;
        throw error;
      }
    }
  }
  return [operationResult];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map