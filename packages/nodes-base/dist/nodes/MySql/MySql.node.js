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
var MySql_node_exports = {};
__export(MySql_node_exports, {
  MySql: () => MySql
});
module.exports = __toCommonJS(MySql_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_MySqlV1 = require("./v1/MySqlV1.node");
var import_MySqlV2 = require("./v2/MySqlV2.node");
class MySql extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "MySQL",
      name: "mySql",
      icon: { light: "file:mysql.svg", dark: "file:mysql.dark.svg" },
      group: ["input"],
      defaultVersion: 2.4,
      description: "Get, add and update data in MySQL",
      parameterPane: "wide"
    };
    const nodeVersions = {
      1: new import_MySqlV1.MySqlV1(baseDescription),
      2: new import_MySqlV2.MySqlV2(baseDescription),
      2.1: new import_MySqlV2.MySqlV2(baseDescription),
      2.2: new import_MySqlV2.MySqlV2(baseDescription),
      2.3: new import_MySqlV2.MySqlV2(baseDescription),
      2.4: new import_MySqlV2.MySqlV2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MySql
});
//# sourceMappingURL=MySql.node.js.map