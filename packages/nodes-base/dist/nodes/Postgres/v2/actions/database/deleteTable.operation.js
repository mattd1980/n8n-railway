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
var deleteTable_operation_exports = {};
__export(deleteTable_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(deleteTable_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Command",
    name: "deleteCommand",
    type: "options",
    default: "truncate",
    options: [
      {
        name: "Truncate",
        value: "truncate",
        description: "Only removes the table's data and preserves the table's structure"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete the rows that match the 'Select Rows' conditions below. If no selection is made, all rows in the table are deleted."
      },
      {
        name: "Drop",
        value: "drop",
        description: "Deletes the table's data and also the table's structure permanently"
      }
    ]
  },
  {
    displayName: "Restart Sequences",
    name: "restartSequences",
    type: "boolean",
    default: false,
    description: "Whether to reset identity (auto-increment) columns to their initial values",
    displayOptions: {
      show: {
        deleteCommand: ["truncate"]
      }
    }
  },
  {
    ...import_common.whereFixedCollection,
    displayOptions: {
      show: {
        deleteCommand: ["delete"]
      }
    }
  },
  {
    ...import_common.combineConditionsCollection,
    displayOptions: {
      show: {
        deleteCommand: ["delete"]
      }
    }
  },
  import_common.optionsCollection
];
const displayOptions = {
  show: {
    resource: ["database"],
    operation: ["deleteTable"]
  },
  hide: {
    table: [""]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(runQueries, items, nodeOptions, _db) {
  const queries = [];
  for (let i = 0; i < items.length; i++) {
    const options = this.getNodeParameter("options", i, {});
    const schema = this.getNodeParameter("schema", i, void 0, {
      extractValue: true
    });
    const table = this.getNodeParameter("table", i, void 0, {
      extractValue: true
    });
    const deleteCommand = this.getNodeParameter("deleteCommand", i);
    let query = "";
    let values = [schema, table];
    if (deleteCommand === "drop") {
      const cascade = options.cascade ? " CASCADE" : "";
      query = `DROP TABLE IF EXISTS $1:name.$2:name${cascade}`;
    }
    if (deleteCommand === "truncate") {
      const identity = this.getNodeParameter("restartSequences", i, false) ? " RESTART IDENTITY" : "";
      const cascade = options.cascade ? " CASCADE" : "";
      query = `TRUNCATE TABLE $1:name.$2:name${identity}${cascade}`;
    }
    if (deleteCommand === "delete") {
      const whereClauses = this.getNodeParameter("where", i, []).values || [];
      const combineConditions = this.getNodeParameter("combineConditions", i, "AND");
      [query, values] = (0, import_utils.addWhereClauses)(
        this.getNode(),
        i,
        "DELETE FROM $1:name.$2:name",
        whereClauses,
        values,
        combineConditions
      );
    }
    if (query === "") {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Invalid delete command, only drop, delete and truncate are supported ",
        { itemIndex: i }
      );
    }
    const queryWithValues = { query, values };
    queries.push(queryWithValues);
  }
  return await runQueries(queries, items, nodeOptions);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=deleteTable.operation.js.map