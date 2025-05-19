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
    placeholder: "e.g. SELECT id, name FROM product WHERE quantity > $1 AND price <= $2",
    noDataExpression: true,
    required: true,
    description: "The SQL query to execute. You can use n8n expressions and $1, $2, $3, etc to refer to the 'Query Parameters' set in options below.",
    typeOptions: {
      editor: "sqlEditor",
      sqlDialect: "PostgreSQL"
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
async function execute(runQueries, items, nodeOptions, _db) {
  const queries = (0, import_utils.replaceEmptyStringsByNulls)(
    items,
    nodeOptions.replaceEmptyStrings
  ).map((_, index) => {
    let query = this.getNodeParameter("query", index);
    for (const resolvable of (0, import_utilities.getResolvables)(query)) {
      query = query.replace(resolvable, this.evaluateExpression(resolvable, index));
    }
    let values = [];
    let queryReplacement = this.getNodeParameter("options.queryReplacement", index, "");
    if (typeof queryReplacement === "number") {
      queryReplacement = String(queryReplacement);
    }
    if (typeof queryReplacement === "string") {
      const node = this.getNode();
      const rawReplacements = node.parameters.options?.queryReplacement;
      if (rawReplacements) {
        const nodeVersion = nodeOptions.nodeVersion;
        if (nodeVersion >= 2.5) {
          const rawValues = rawReplacements.replace(/^=+/, "");
          const resolvables = (0, import_utilities.getResolvables)(rawValues);
          if (resolvables.length) {
            for (const resolvable of resolvables) {
              const evaluatedExpression = (0, import_utils.evaluateExpression)(
                this.evaluateExpression(`${resolvable}`, index)
              );
              const evaluatedValues = (0, import_utils.isJSON)(evaluatedExpression) ? [evaluatedExpression] : (0, import_utils.stringToArray)(evaluatedExpression);
              if (evaluatedValues.length) values.push(...evaluatedValues);
            }
          } else {
            values.push(...(0, import_utils.stringToArray)(rawValues));
          }
        } else {
          const rawValues = rawReplacements.replace(/^=+/, "").split(",").filter((entry) => entry).map((entry) => entry.trim());
          for (const rawValue of rawValues) {
            const resolvables = (0, import_utilities.getResolvables)(rawValue);
            if (resolvables.length) {
              for (const resolvable of resolvables) {
                values.push(this.evaluateExpression(`${resolvable}`, index));
              }
            } else {
              values.push(rawValue);
            }
          }
        }
      }
    } else {
      if (Array.isArray(queryReplacement)) {
        values = queryReplacement;
      } else {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "Query Parameters must be a string of comma-separated values or an array of values",
          { itemIndex: index }
        );
      }
    }
    if (!queryReplacement || nodeOptions.treatQueryParametersInSingleQuotesAsText) {
      let nextValueIndex = values.length + 1;
      const literals = query.match(/'\$[0-9]+'/g) ?? [];
      for (const literal of literals) {
        query = query.replace(literal, `$${nextValueIndex}`);
        values.push(literal.replace(/'/g, ""));
        nextValueIndex++;
      }
    }
    return { query, values, options: { partial: true } };
  });
  return await runQueries(queries, items, nodeOptions);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=executeQuery.operation.js.map