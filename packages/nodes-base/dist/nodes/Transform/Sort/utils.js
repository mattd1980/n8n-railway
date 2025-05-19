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
  sortByCode: () => sortByCode
});
module.exports = __toCommonJS(utils_exports);
var import_vm2 = require("@n8n/vm2");
var import_n8n_workflow = require("n8n-workflow");
const returnRegExp = /\breturn\b/g;
function sortByCode(items) {
  const code = this.getNodeParameter("code", 0);
  if (!returnRegExp.test(code)) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Sort code doesn't return. Please add a 'return' statement to your code"
    );
  }
  const mode = this.getMode();
  const vm = new import_vm2.NodeVM({
    console: mode === "manual" ? "redirect" : "inherit",
    sandbox: { items }
  });
  return vm.run(`module.exports = items.sort((a, b) => { ${code} })`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sortByCode
});
//# sourceMappingURL=utils.js.map