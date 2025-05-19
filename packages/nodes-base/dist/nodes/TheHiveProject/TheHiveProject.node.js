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
var TheHiveProject_node_exports = {};
__export(TheHiveProject_node_exports, {
  TheHiveProject: () => TheHiveProject
});
module.exports = __toCommonJS(TheHiveProject_node_exports);
var import_node = require("./actions/node.description");
var import_router = require("./actions/router");
var import_methods = require("./methods");
class TheHiveProject {
  constructor() {
    this.description = import_node.description;
    this.methods = { loadOptions: import_methods.loadOptions, listSearch: import_methods.listSearch, resourceMapping: import_methods.resourceMapping };
  }
  async execute() {
    return await import_router.router.call(this);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TheHiveProject
});
//# sourceMappingURL=TheHiveProject.node.js.map