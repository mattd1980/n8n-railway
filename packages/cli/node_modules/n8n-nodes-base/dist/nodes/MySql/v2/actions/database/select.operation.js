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
var select_operation_exports = {};
__export(select_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(select_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        returnAll: [false]
      }
    }
  },
  import_common.selectRowsFixedCollection,
  import_common.combineConditionsCollection,
  import_common.sortFixedCollection,
  import_common.optionsCollection
];
const displayOptions = {
  show: {
    resource: ["database"],
    operation: ["select"]
  },
  hide: {
    table: [""]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(inputItems, runQueries) {
  let returnData = [];
  const queries = [];
  for (let i = 0; i < inputItems.length; i++) {
    const table = this.getNodeParameter("table", i, void 0, {
      extractValue: true
    });
    const outputColumns = this.getNodeParameter("options.outputColumns", i, ["*"]);
    const selectDistinct = this.getNodeParameter("options.selectDistinct", i, false);
    let query = "";
    const SELECT = selectDistinct ? "SELECT DISTINCT" : "SELECT";
    if (outputColumns.includes("*")) {
      query = `${SELECT} * FROM ${(0, import_utils.escapeSqlIdentifier)(table)}`;
    } else {
      const escapedColumns = outputColumns.map(import_utils.escapeSqlIdentifier).join(", ");
      query = `${SELECT} ${escapedColumns} FROM ${(0, import_utils.escapeSqlIdentifier)(table)}`;
    }
    let values = [];
    const whereClauses = this.getNodeParameter("where", i, []).values || [];
    const combineConditions = this.getNodeParameter("combineConditions", i, "AND");
    [query, values] = (0, import_utils.addWhereClauses)(
      this.getNode(),
      i,
      query,
      whereClauses,
      values,
      combineConditions
    );
    const sortRules = this.getNodeParameter("sort", i, []).values || [];
    [query, values] = (0, import_utils.addSortRules)(query, sortRules, values);
    const returnAll = this.getNodeParameter("returnAll", i, false);
    if (!returnAll) {
      const limit = this.getNodeParameter("limit", i, 50);
      query += " LIMIT ?";
      values.push(limit);
    }
    queries.push({ query, values });
  }
  returnData = await runQueries(queries);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=select.operation.js.map