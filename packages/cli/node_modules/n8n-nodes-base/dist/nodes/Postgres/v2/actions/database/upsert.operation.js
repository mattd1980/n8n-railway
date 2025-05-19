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
var upsert_operation_exports = {};
__export(upsert_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(upsert_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Data Mode",
    name: "dataMode",
    type: "options",
    options: [
      {
        name: "Auto-Map Input Data to Columns",
        value: "autoMapInputData",
        description: "Use when node input properties names exactly match the table column names"
      },
      {
        name: "Map Each Column Manually",
        value: "defineBelow",
        description: "Set the value for each destination column manually"
      }
    ],
    default: "autoMapInputData",
    description: "Whether to map node input properties and the table data automatically or manually",
    displayOptions: {
      show: {
        "@version": [2, 2.1]
      }
    }
  },
  {
    displayName: `
		In this mode, make sure incoming data fields are named the same as the columns in your table. If needed, use an 'Edit Fields' node before this node to change the field names.
		`,
    name: "notice",
    type: "notice",
    default: "",
    displayOptions: {
      show: {
        dataMode: ["autoMapInputData"],
        "@version": [2, 2.1]
      }
    }
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Unique Column",
    name: "columnToMatchOn",
    type: "options",
    required: true,
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: 'The column to compare when finding the rows to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/" target="_blank">expression</a>.',
    typeOptions: {
      loadOptionsMethod: "getColumns",
      loadOptionsDependsOn: ["schema.value", "table.value"]
    },
    default: "",
    hint: "Used to find the correct row(s) to update. Doesn't get changed. Has to be unique.",
    displayOptions: {
      show: {
        "@version": [2, 2.1]
      }
    }
  },
  {
    displayName: "Value of Unique Column",
    name: "valueToMatchOn",
    type: "string",
    default: "",
    description: 'Rows with a value in the specified "Column to Match On" that corresponds to the value in this field will be updated. New rows will be created for non-matching items.',
    displayOptions: {
      show: {
        dataMode: ["defineBelow"],
        "@version": [2, 2.1]
      }
    }
  },
  {
    displayName: "Values to Send",
    name: "valuesToSend",
    placeholder: "Add Value",
    type: "fixedCollection",
    typeOptions: {
      multipleValueButtonText: "Add Value",
      multipleValues: true
    },
    displayOptions: {
      show: {
        dataMode: ["defineBelow"],
        "@version": [2, 2.1]
      }
    },
    default: {},
    options: [
      {
        displayName: "Values",
        name: "values",
        values: [
          {
            // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
            displayName: "Column",
            name: "column",
            type: "options",
            // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/" target="_blank">expression</a>',
            typeOptions: {
              loadOptionsMethod: "getColumnsWithoutColumnToMatchOn",
              loadOptionsDependsOn: ["schema.value", "table.value"]
            },
            default: []
          },
          {
            displayName: "Value",
            name: "value",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Columns",
    name: "columns",
    type: "resourceMapper",
    noDataExpression: true,
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    required: true,
    typeOptions: {
      loadOptionsDependsOn: ["table.value", "operation"],
      resourceMapper: {
        resourceMapperMethod: "getMappingColumns",
        mode: "upsert",
        fieldWords: {
          singular: "column",
          plural: "columns"
        },
        addAllFields: true,
        multiKeyMatch: true
      }
    },
    displayOptions: {
      show: {
        "@version": [{ _cnd: { gte: 2.2 } }]
      }
    }
  },
  import_common.optionsCollection
];
const displayOptions = {
  show: {
    resource: ["database"],
    operation: ["upsert"]
  },
  hide: {
    table: [""]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(runQueries, items, nodeOptions, db) {
  items = (0, import_utils.replaceEmptyStringsByNulls)(items, nodeOptions.replaceEmptyStrings);
  const nodeVersion = nodeOptions.nodeVersion;
  let schema = this.getNodeParameter("schema", 0, void 0, {
    extractValue: true
  });
  let table = this.getNodeParameter("table", 0, void 0, {
    extractValue: true
  });
  const updateTableSchema = (0, import_utils.configureTableSchemaUpdater)(schema, table);
  let tableSchema = await (0, import_utils.getTableSchema)(db, schema, table);
  const queries = [];
  for (let i = 0; i < items.length; i++) {
    schema = this.getNodeParameter("schema", i, void 0, {
      extractValue: true
    });
    table = this.getNodeParameter("table", i, void 0, {
      extractValue: true
    });
    const columnsToMatchOn = nodeVersion < 2.2 ? [this.getNodeParameter("columnToMatchOn", i)] : this.getNodeParameter("columns.matchingColumns", i);
    const dataMode = nodeVersion < 2.2 ? this.getNodeParameter("dataMode", i) : this.getNodeParameter("columns.mappingMode", i);
    let item = {};
    if (dataMode === "autoMapInputData") {
      item = items[i].json;
    }
    if (dataMode === "defineBelow") {
      const valuesToSend = nodeVersion < 2.2 ? this.getNodeParameter("valuesToSend", i, []).values : this.getNodeParameter("columns.values", i, []).values;
      if (nodeVersion < 2.2) {
        item = (0, import_utils.prepareItem)(valuesToSend);
        item[columnsToMatchOn[0]] = this.getNodeParameter("valueToMatchOn", i);
      } else {
        item = this.getNodeParameter("columns.value", i);
      }
    }
    if (!item[columnsToMatchOn[0]]) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Column to match on not found in input item. Add a column to match on or set the 'Data Mode' to 'Define Below' to define the value to match on."
      );
    }
    if (item[columnsToMatchOn[0]] && Object.keys(item).length === 1) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Add values to update or insert to the input item or set the 'Data Mode' to 'Define Below' to define the values to insert or update."
      );
    }
    tableSchema = await updateTableSchema(db, tableSchema, schema, table);
    if (nodeVersion >= 2.4) {
      (0, import_utils.convertArraysToPostgresFormat)(item, tableSchema, this.getNode(), i);
    }
    item = (0, import_utils.checkItemAgainstSchema)(this.getNode(), item, tableSchema, i);
    let values = [schema, table];
    let valuesLength = values.length + 1;
    const conflictColumns = [];
    columnsToMatchOn.forEach((column) => {
      conflictColumns.push(`$${valuesLength}:name`);
      valuesLength = valuesLength + 1;
      values.push(column);
    });
    const onConflict = ` ON CONFLICT (${conflictColumns.join(",")})`;
    const insertQuery = `INSERT INTO $1:name.$2:name($${valuesLength}:name) VALUES($${valuesLength}:csv)${onConflict}`;
    valuesLength = valuesLength + 1;
    values.push(item);
    const updateColumns = Object.keys(item).filter((column) => !columnsToMatchOn.includes(column));
    const updates = [];
    for (const column of updateColumns) {
      updates.push(`$${valuesLength}:name = $${valuesLength + 1}`);
      valuesLength = valuesLength + 2;
      values.push(column, item[column]);
    }
    const updateQuery = updates?.length > 0 ? ` DO UPDATE  SET ${updates.join(", ")}` : " DO NOTHING ";
    let query = `${insertQuery}${updateQuery}`;
    const outputColumns = this.getNodeParameter("options.outputColumns", i, ["*"]);
    [query, values] = (0, import_utils.addReturning)(query, outputColumns, values);
    queries.push({ query, values });
  }
  return await runQueries(queries, items, nodeOptions);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=upsert.operation.js.map