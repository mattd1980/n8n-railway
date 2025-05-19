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
var DateTime_node_exports = {};
__export(DateTime_node_exports, {
  DateTime: () => DateTime
});
module.exports = __toCommonJS(DateTime_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_DateTimeV1 = require("./V1/DateTimeV1.node");
var import_DateTimeV2 = require("./V2/DateTimeV2.node");
class DateTime extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "Date & Time",
      name: "dateTime",
      icon: "fa:clock",
      iconColor: "green",
      group: ["transform"],
      defaultVersion: 2,
      description: "Allows you to manipulate date and time values",
      subtitle: '={{$parameter["action"]}}'
    };
    const nodeVersions = {
      1: new import_DateTimeV1.DateTimeV1(baseDescription),
      2: new import_DateTimeV2.DateTimeV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateTime
});
//# sourceMappingURL=DateTime.node.js.map