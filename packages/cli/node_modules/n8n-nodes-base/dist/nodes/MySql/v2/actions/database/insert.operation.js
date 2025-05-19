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
var insert_operation_exports = {};
__export(insert_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(insert_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_interfaces = require("../../helpers/interfaces");
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
        value: import_interfaces.DATA_MODE.AUTO_MAP,
        description: "Use when node input properties names exactly match the table column names"
      },
      {
        name: "Map Each Column Manually",
        value: import_interfaces.DATA_MODE.MANUAL,
        description: "Set the value for each destination column manually"
      }
    ],
    default: import_interfaces.AUTO_MAP,
    description: "Whether to map node input properties and the table data automatically or manually"
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
        dataMode: [import_interfaces.DATA_MODE.AUTO_MAP]
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
        dataMode: [import_interfaces.DATA_MODE.MANUAL]
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
              loadOptionsMethod: "getColumns",
              loadOptionsDependsOn: ["table.value"]
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
  import_common.optionsCollection
];
const displayOptions = {
  show: {
    resource: ["database"],
    operation: ["insert"]
  },
  hide: {
    table: [""]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(inputItems, runQueries, nodeOptions) {
  let returnData = [];
  const items = (0, import_utils.replaceEmptyStringsByNulls)(inputItems, nodeOptions.replaceEmptyStrings);
  const table = this.getNodeParameter("table", 0, "", { extractValue: true });
  const dataMode = this.getNodeParameter("dataMode", 0);
  const queryBatching = nodeOptions.queryBatching || import_interfaces.BATCH_MODE.SINGLE;
  const queries = [];
  if (queryBatching === import_interfaces.BATCH_MODE.SINGLE) {
    let columns = [];
    let insertItems = [];
    const priority = nodeOptions.priority || "";
    const ignore = nodeOptions.skipOnConflict ? "IGNORE" : "";
    if (dataMode === import_interfaces.DATA_MODE.AUTO_MAP) {
      columns = [
        ...new Set(
          items.reduce((acc, item) => {
            const itemColumns = Object.keys(item.json);
            return acc.concat(itemColumns);
          }, [])
        )
      ];
      insertItems = this.helpers.copyInputItems(items, columns);
    }
    if (dataMode === import_interfaces.DATA_MODE.MANUAL) {
      for (let i = 0; i < items.length; i++) {
        const valuesToSend = this.getNodeParameter("valuesToSend", i, []).values;
        const item = valuesToSend.reduce((acc, { column, value }) => {
          acc[column] = value;
          return acc;
        }, {});
        insertItems.push(item);
      }
      columns = [
        ...new Set(
          insertItems.reduce((acc, item) => {
            const itemColumns = Object.keys(item);
            return acc.concat(itemColumns);
          }, [])
        )
      ];
    }
    const escapedColumns = columns.map(import_utils.escapeSqlIdentifier).join(", ");
    const placeholder = `(${columns.map(() => "?").join(",")})`;
    const replacements = items.map(() => placeholder).join(",");
    const query = `INSERT ${priority} ${ignore} INTO ${(0, import_utils.escapeSqlIdentifier)(
      table
    )} (${escapedColumns}) VALUES ${replacements}`;
    const values = insertItems.reduce(
      (acc, item) => acc.concat(Object.values(item)),
      []
    );
    queries.push({ query, values });
  } else {
    for (let i = 0; i < items.length; i++) {
      let columns = [];
      let insertItem = {};
      const options = this.getNodeParameter("options", i);
      const priority = options.priority || "";
      const ignore = options.skipOnConflict ? "IGNORE" : "";
      if (dataMode === import_interfaces.DATA_MODE.AUTO_MAP) {
        columns = Object.keys(items[i].json);
        insertItem = columns.reduce((acc, key) => {
          if (columns.includes(key)) {
            acc[key] = items[i].json[key];
          }
          return acc;
        }, {});
      }
      if (dataMode === import_interfaces.DATA_MODE.MANUAL) {
        const valuesToSend = this.getNodeParameter("valuesToSend", i, []).values;
        insertItem = valuesToSend.reduce((acc, { column, value }) => {
          acc[column] = value;
          return acc;
        }, {});
        columns = Object.keys(insertItem);
      }
      const escapedColumns = columns.map(import_utils.escapeSqlIdentifier).join(", ");
      const placeholder = `(${columns.map(() => "?").join(",")})`;
      const query = `INSERT ${priority} ${ignore} INTO ${(0, import_utils.escapeSqlIdentifier)(
        table
      )} (${escapedColumns}) VALUES ${placeholder};`;
      const values = Object.values(insertItem);
      queries.push({ query, values });
    }
  }
  returnData = await runQueries(queries);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=insert.operation.js.map