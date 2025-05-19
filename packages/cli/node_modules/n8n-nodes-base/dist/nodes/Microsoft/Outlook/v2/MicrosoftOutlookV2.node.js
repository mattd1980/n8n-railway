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
var MicrosoftOutlookV2_node_exports = {};
__export(MicrosoftOutlookV2_node_exports, {
  MicrosoftOutlookV2: () => MicrosoftOutlookV2
});
module.exports = __toCommonJS(MicrosoftOutlookV2_node_exports);
var import_node = require("./actions/node.description");
var import_router = require("./actions/router");
var import_methods = require("./methods");
var import_utils = require("../../../../utils/sendAndWait/utils");
class MicrosoftOutlookV2 {
  constructor(baseDescription) {
    this.methods = { loadOptions: import_methods.loadOptions, listSearch: import_methods.listSearch };
    this.webhook = import_utils.sendAndWaitWebhook;
    this.description = {
      ...baseDescription,
      ...import_node.description
    };
  }
  async execute() {
    return await import_router.router.call(this);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftOutlookV2
});
//# sourceMappingURL=MicrosoftOutlookV2.node.js.map