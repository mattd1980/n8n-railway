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
var executeQuery_operation_exports = {};
__export(executeQuery_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(executeQuery_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Query",
    name: "query",
    type: "string",
    default: "",
    placeholder: "e.g. SELECT id, name FROM product WHERE id < 40",
    required: true,
    description: "The SQL query to execute. You can use n8n expressions and $1, $2, $3, etc to refer to the 'Query Parameters' set in options below.",
    noDataExpression: true,
    typeOptions: {
      editor: "sqlEditor",
      sqlDialect: "MySQL"
    },
    hint: "Consider using query parameters to prevent SQL injection attacks. Add them in the options below"
  },
  import_common.optionsCollection
];
const displayOptions = {
  show: {
    resource: ["database"],
    operation: ["executeQuery"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(inputItems, runQueries, nodeOptions) {
  let returnData = [];
  const items = (0, import_utils.replaceEmptyStringsByNulls)(inputItems, nodeOptions.replaceEmptyStrings);
  const queries = [];
  for (let i = 0; i < items.length; i++) {
    let rawQuery = this.getNodeParameter("query", i);
    for (const resolvable of (0, import_utilities.getResolvables)(rawQuery)) {
      rawQuery = rawQuery.replace(resolvable, this.evaluateExpression(resolvable, i));
    }
    const options = this.getNodeParameter("options", i, {});
    let values;
    let queryReplacement = options.queryReplacement || [];
    if (typeof queryReplacement === "string") {
      queryReplacement = queryReplacement.split(",").map((entry) => entry.trim());
    }
    if (Array.isArray(queryReplacement)) {
      values = queryReplacement;
    } else {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Query Replacement must be a string of comma-separated values, or an array of values",
        { itemIndex: i }
      );
    }
    const preparedQuery = (0, import_utils.prepareQueryAndReplacements)(rawQuery, values);
    if (nodeOptions.nodeVersion >= 2.3) {
      const parsedNumbers = preparedQuery.values.map((value) => {
        return Number(value) ? Number(value) : value;
      });
      preparedQuery.values = parsedNumbers;
    }
    queries.push(preparedQuery);
  }
  returnData = await runQueries(queries);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=executeQuery.operation.js.map