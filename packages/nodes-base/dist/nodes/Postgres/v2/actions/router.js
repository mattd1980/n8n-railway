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
var import_transport = require("../../transport");
var import_utils = require("../helpers/utils");
async function router() {
  let returnData = [];
  const items = this.getInputData();
  const resource = this.getNodeParameter("resource", 0);
  const operation = this.getNodeParameter("operation", 0);
  const credentials = await this.getCredentials("postgres");
  const options = this.getNodeParameter("options", 0, {});
  const node = this.getNode();
  options.nodeVersion = node.typeVersion;
  options.operation = operation;
  const { db, pgp } = await import_transport.configurePostgres.call(this, credentials, options);
  const runQueries = import_utils.configureQueryRunner.call(
    this,
    this.getNode(),
    this.continueOnFail(),
    pgp,
    db
  );
  const postgresNodeData = {
    resource,
    operation
  };
  switch (postgresNodeData.resource) {
    case "database":
      returnData = await database[postgresNodeData.operation].execute.call(
        this,
        runQueries,
        items,
        options,
        db,
        pgp
      );
      break;
    default:
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `The operation "${operation}" is not supported!`
      );
  }
  (0, import_utils.addExecutionHints)(this, items, operation, node.executeOnce);
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=router.js.map