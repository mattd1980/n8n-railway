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
var import_n8n_workflow = require("n8n-workflow");
var database = __toESM(require("./database/Database.resource"));
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function router() {
  let returnData = [];
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  const nodeOptions = this.getNodeParameter("options", 0);
  nodeOptions.nodeVersion = this.getNode().typeVersion;
  const credentials = await this.getCredentials("mySql");
  const pool = await import_transport.createPool.call(this, credentials, nodeOptions);
  const runQueries = import_utils.configureQueryRunner.call(this, nodeOptions, pool);
  const mysqlNodeData = {
    resource,
    operation
  };
  try {
    switch (mysqlNodeData.resource) {
      case "database":
        const items = this.getInputData();
        returnData = await database[mysqlNodeData.operation].execute.call(
          this,
          items,
          runQueries,
          nodeOptions
        );
        break;
      default:
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The operation "${operation}" is not supported!`
        );
    }
  } finally {
    await pool.end();
  }
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map