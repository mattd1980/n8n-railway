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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(update_operation_exports);
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
        name: "Map Each Column Below",
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
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Column to Match On",
    name: "columnToMatchOn",
    type: "options",
    required: true,
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/" target="_blank">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getColumns",
      loadOptionsDependsOn: ["schema.value", "table.value"]
    },
    default: "",
    hint: "Used to find the correct row to update. Doesn't get changed."
  },
  {
    displayName: "Value of Column to Match On",
    name: "valueToMatchOn",
    type: "string",
    default: "",
    description: 'Rows with a value in the specified "Column to Match On" that corresponds to the value in this field will be updated',
    displayOptions: {
      show: {
        dataMode: [import_interfaces.DATA_MODE.MANUAL]
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
  import_common.optionsCollection
];
const displayOptions = {
  show: {
    resource: ["database"],
    operation: ["update"]
  },
  hide: {
    table: [""]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(inputItems, runQueries, nodeOptions) {
  let returnData = [];
  const items = (0, import_utils.replaceEmptyStringsByNulls)(inputItems, nodeOptions.replaceEmptyStrings);
  const queries = [];
  for (let i = 0; i < items.length; i++) {
    const table = this.getNodeParameter("table", i, void 0, {
      extractValue: true
    });
    const columnToMatchOn = this.getNodeParameter("columnToMatchOn", i);
    const dataMode = this.getNodeParameter("dataMode", i);
    let item = {};
    let valueToMatchOn = "";
    if (dataMode === import_interfaces.DATA_MODE.AUTO_MAP) {
      item = items[i].json;
      valueToMatchOn = item[columnToMatchOn];
    }
    if (dataMode === import_interfaces.DATA_MODE.MANUAL) {
      const valuesToSend = this.getNodeParameter("valuesToSend", i, []).values;
      item = valuesToSend.reduce((acc, { column, value }) => {
        acc[column] = value;
        return acc;
      }, {});
      valueToMatchOn = this.getNodeParameter("valueToMatchOn", i);
    }
    const values = [];
    const updateColumns = Object.keys(item).filter((column) => column !== columnToMatchOn);
    const updates = [];
    for (const column of updateColumns) {
      updates.push(`${(0, import_utils.escapeSqlIdentifier)(column)} = ?`);
      values.push(item[column]);
    }
    const condition = `${(0, import_utils.escapeSqlIdentifier)(columnToMatchOn)} = ?`;
    values.push(valueToMatchOn);
    const query = `UPDATE ${(0, import_utils.escapeSqlIdentifier)(table)} SET ${updates.join(
      ", "
    )} WHERE ${condition}`;
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
//# sourceMappingURL=update.operation.js.map