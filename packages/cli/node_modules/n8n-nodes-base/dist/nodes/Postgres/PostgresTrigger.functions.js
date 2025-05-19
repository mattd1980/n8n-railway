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
var PostgresTrigger_functions_exports = {};
__export(PostgresTrigger_functions_exports, {
  initDB: () => initDB,
  pgTriggerFunction: () => pgTriggerFunction,
  prepareNames: () => prepareNames,
  searchSchema: () => searchSchema,
  searchTables: () => searchTables
});
module.exports = __toCommonJS(PostgresTrigger_functions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_transport = require("./transport");
function prepareNames(id, mode, additionalFields) {
  let suffix = id.replace(/-/g, "_");
  if (mode === "manual") {
    suffix = `${suffix}_manual`;
  }
  let functionName = additionalFields.functionName || `n8n_trigger_function_${suffix}()`;
  if (!(functionName.includes("(") && functionName.includes(")"))) {
    functionName = `${functionName}()`;
  }
  const triggerName = additionalFields.triggerName || `n8n_trigger_${suffix}`;
  const channelName = additionalFields.channelName || `n8n_channel_${suffix}`;
  if (channelName.includes("-")) {
    throw new import_n8n_workflow.ApplicationError("Channel name cannot contain hyphens (-)", { level: "warning" });
  }
  return { functionName, triggerName, channelName };
}
async function pgTriggerFunction(db, additionalFields, functionName, triggerName, channelName) {
  const schema = this.getNodeParameter("schema", "public", { extractValue: true });
  const tableName = this.getNodeParameter("tableName", void 0, {
    extractValue: true
  });
  const target = `${schema}."${tableName}"`;
  const firesOn = this.getNodeParameter("firesOn", 0);
  const functionReplace = "CREATE OR REPLACE FUNCTION $1:raw RETURNS trigger LANGUAGE 'plpgsql' COST 100 VOLATILE NOT LEAKPROOF AS $BODY$ begin perform pg_notify('$2:raw', row_to_json($3:raw)::text); return null; end; $BODY$;";
  const dropIfExist = "DROP TRIGGER IF EXISTS $1:raw ON $2:raw";
  const functionExists = "CREATE FUNCTION $1:raw RETURNS trigger LANGUAGE 'plpgsql' COST 100 VOLATILE NOT LEAKPROOF AS $BODY$ begin perform pg_notify('$2:raw', row_to_json($3:raw)::text); return null; end; $BODY$";
  const trigger = "CREATE TRIGGER $4:raw AFTER $3:raw ON $1:raw FOR EACH ROW EXECUTE FUNCTION $2:raw";
  const whichData = firesOn === "DELETE" ? "old" : "new";
  if (channelName.includes("-")) {
    throw new import_n8n_workflow.ApplicationError("Channel name cannot contain hyphens (-)", { level: "warning" });
  }
  const replaceIfExists = additionalFields.replaceIfExists ?? false;
  try {
    if (replaceIfExists || !(additionalFields.triggerName ?? additionalFields.functionName)) {
      await db.any(functionReplace, [functionName, channelName, whichData]);
      await db.any(dropIfExist, [triggerName, target, whichData]);
    } else {
      await db.any(functionExists, [functionName, channelName, whichData]);
    }
    await db.any(trigger, [target, functionName, firesOn, triggerName]);
  } catch (error) {
    if (error.message.includes('near "-"')) {
      throw new import_n8n_workflow.ApplicationError("Names cannot contain hyphens (-)", { level: "warning" });
    }
    throw error;
  }
}
async function initDB() {
  const credentials = await this.getCredentials("postgres");
  const options = this.getNodeParameter("options", {});
  return await import_transport.configurePostgres.call(this, credentials, options);
}
async function searchSchema() {
  const { db } = await initDB.call(this);
  const schemaList = await db.any("SELECT schema_name FROM information_schema.schemata");
  const results = schemaList.map((s) => ({
    name: s.schema_name,
    value: s.schema_name
  }));
  return { results };
}
async function searchTables() {
  const schema = this.getNodeParameter("schema", 0);
  const { db } = await initDB.call(this);
  let tableList = [];
  try {
    tableList = await db.any(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = $1",
      [schema.value]
    );
  } catch (error) {
    throw new import_n8n_workflow.ApplicationError(error);
  }
  const results = tableList.map((s) => ({
    name: s.table_name,
    value: s.table_name
  }));
  return { results };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initDB,
  pgTriggerFunction,
  prepareNames,
  searchSchema,
  searchTables
});
//# sourceMappingURL=PostgresTrigger.functions.js.map