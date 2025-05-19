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
var combineBySql_exports = {};
__export(combineBySql_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(combineBySql_exports);
var import_di = require("@n8n/di");
var import_alasql = __toESM(require("alasql"));
var import_n8n_core = require("n8n-core");
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
var import_descriptions = require("../../helpers/descriptions");
var import_utils = require("../../helpers/utils");
const properties = [
  import_descriptions.numberInputsProperty,
  {
    displayName: "Query",
    name: "query",
    type: "string",
    default: "SELECT * FROM input1 LEFT JOIN input2 ON input1.name = input2.id",
    noDataExpression: true,
    description: "Input data available as tables with corresponding number, e.g. input1, input2",
    hint: 'Supports <a href="https://github.com/alasql/alasql/wiki/Supported-SQL-statements" target="_blank">most</a> of the SQL-99 language',
    required: true,
    typeOptions: {
      rows: 5,
      editor: "sqlEditor"
    }
  }
];
const displayOptions = {
  show: {
    mode: ["combineBySql"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
const prepareError = (node, error) => {
  let message = "";
  if (typeof error === "string") {
    message = error;
  } else {
    message = error.message;
  }
  throw new import_n8n_workflow.NodeOperationError(node, error, {
    message: "Issue while executing query",
    description: message,
    itemIndex: 0
  });
};
async function executeSelectWithMappedPairedItems(node, inputsData, query) {
  const returnData = [];
  const db = new import_alasql.default.Database(node.id);
  try {
    for (let i = 0; i < inputsData.length; i++) {
      const inputData = inputsData[i];
      db.exec(`CREATE TABLE input${i + 1}`);
      db.tables[`input${i + 1}`].data = inputData.map((entry) => ({
        ...entry.json,
        pairedItem: entry.pairedItem
      }));
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeOperationError(node, error, {
      message: "Issue while creating table from",
      description: error.message,
      itemIndex: 0
    });
  }
  try {
    const result = db.exec((0, import_utils.modifySelectQuery)(query, inputsData.length));
    for (const item of result) {
      if (Array.isArray(item)) {
        returnData.push(...item.map((entry) => (0, import_utils.rowToExecutionData)(entry)));
      } else if (typeof item === "object") {
        returnData.push((0, import_utils.rowToExecutionData)(item));
      }
    }
    if (!returnData.length) {
      returnData.push({ json: { success: true } });
    }
  } catch (error) {
    prepareError(node, error);
  } finally {
    delete import_alasql.default.databases[node.id];
  }
  return [returnData];
}
async function execute(inputsData) {
  const node = this.getNode();
  const returnData = [];
  const pairedItem = [];
  let query = this.getNodeParameter("query", 0);
  for (const resolvable of (0, import_utilities.getResolvables)(query)) {
    query = query.replace(resolvable, this.evaluateExpression(resolvable, 0));
  }
  const isSelectQuery = node.typeVersion >= 3.1 ? query.toLowerCase().startsWith("select") : false;
  if (isSelectQuery) {
    try {
      return await executeSelectWithMappedPairedItems(node, inputsData, query);
    } catch (error) {
      import_di.Container.get(import_n8n_core.ErrorReporter).error(error, {
        extra: {
          nodeName: node.name,
          nodeType: node.type,
          nodeVersion: node.typeVersion,
          workflowId: this.getWorkflow().id
        }
      });
    }
  }
  const db = new import_alasql.default.Database(node.id);
  try {
    for (let i = 0; i < inputsData.length; i++) {
      const inputData = inputsData[i];
      inputData.forEach((item, index) => {
        if (item.pairedItem === void 0) {
          item.pairedItem = index;
        }
        if (typeof item.pairedItem === "number") {
          pairedItem.push({
            item: item.pairedItem,
            input: i
          });
          return;
        }
        if (Array.isArray(item.pairedItem)) {
          const pairedItems = item.pairedItem.filter((p) => p !== void 0).map((p) => typeof p === "number" ? { item: p } : p).map((p) => {
            return {
              item: p.item,
              input: i
            };
          });
          pairedItem.push(...pairedItems);
          return;
        }
        pairedItem.push({
          item: item.pairedItem.item,
          input: i
        });
      });
      db.exec(`CREATE TABLE input${i + 1}`);
      db.tables[`input${i + 1}`].data = inputData.map((entry) => entry.json);
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeOperationError(node, error, {
      message: "Issue while creating table from",
      description: error.message,
      itemIndex: 0
    });
  }
  try {
    const result = db.exec(query);
    for (const item of result) {
      if (Array.isArray(item)) {
        returnData.push(...item.map((json) => ({ json, pairedItem })));
      } else if (typeof item === "object") {
        returnData.push({ json: item, pairedItem });
      }
    }
    if (!returnData.length) {
      returnData.push({ json: { success: true }, pairedItem });
    }
  } catch (error) {
    prepareError(node, error);
  } finally {
    delete import_alasql.default.databases[node.id];
  }
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=combineBySql.js.map