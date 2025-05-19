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
var read_operation_exports = {};
__export(read_operation_exports, {
  description: () => description,
  execute: () => execute,
  readFilter: () => readFilter
});
module.exports = __toCommonJS(read_operation_exports);
var import_commonDescription = require("./commonDescription");
var import_GoogleSheets = require("../../helpers/GoogleSheets.utils");
var import_readOperation = require("../utils/readOperation");
const combineFiltersOptions = {
  displayName: "Combine Filters",
  name: "combineFilters",
  type: "options",
  description: 'How to combine the conditions defined in "Filters": AND requires all conditions to be true, OR requires at least one condition to be true',
  options: [
    {
      name: "AND",
      value: "AND",
      description: "Only rows that meet all the conditions are selected"
    },
    {
      name: "OR",
      value: "OR",
      description: "Rows that meet at least one condition are selected"
    }
  ],
  default: "AND"
};
const readFilter = {
  displayName: "Filters",
  name: "filtersUI",
  placeholder: "Add Filter",
  type: "fixedCollection",
  typeOptions: {
    multipleValueButtonText: "Add Filter",
    multipleValues: true
  },
  default: {},
  options: [
    {
      displayName: "Filter",
      name: "values",
      values: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "Column",
          name: "lookupColumn",
          type: "options",
          typeOptions: {
            loadOptionsDependsOn: ["sheetName.value"],
            loadOptionsMethod: "getSheetHeaderRowWithGeneratedColumnNames"
          },
          default: "",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
        },
        {
          displayName: "Value",
          name: "lookupValue",
          type: "string",
          default: "",
          hint: "The column must have this value to be matched"
        }
      ]
    }
  ]
};
const description = [
  {
    ...readFilter,
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["read"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    ...combineFiltersOptions,
    default: "OR",
    displayOptions: {
      show: {
        "@version": [{ _cnd: { lt: 4.3 } }],
        resource: ["sheet"],
        operation: ["read"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    ...combineFiltersOptions,
    displayOptions: {
      show: {
        "@version": [{ _cnd: { gte: 4.3 } }],
        resource: ["sheet"],
        operation: ["read"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["read"]
      },
      hide: {
        ...import_GoogleSheets.untilSheetSelected
      }
    },
    options: [
      import_commonDescription.dataLocationOnSheet,
      import_commonDescription.outputFormatting,
      {
        displayName: "Return only First Matching Row",
        name: "returnFirstMatch",
        type: "boolean",
        default: false,
        description: "Whether to select the first row of the sheet or the first matching row (if filters are set)",
        displayOptions: {
          show: {
            "@version": [{ _cnd: { gte: 4.5 } }]
          }
        }
      },
      {
        displayName: "When Filter Has Multiple Matches",
        name: "returnAllMatches",
        type: "options",
        default: "returnFirstMatch",
        options: [
          {
            name: "Return First Match",
            value: "returnFirstMatch",
            description: "Return only the first match"
          },
          {
            name: "Return All Matches",
            value: "returnAllMatches",
            description: "Return all values that match"
          }
        ],
        description: 'By default only the first result gets returned, Set to "Return All Matches" to get multiple matches',
        displayOptions: {
          show: {
            "@version": [{ _cnd: { lt: 4.5 } }]
          }
        }
      }
    ]
  }
];
async function execute(sheet, sheetName) {
  const items = this.getInputData();
  const nodeVersion = this.getNode().typeVersion;
  let length = 1;
  if (nodeVersion > 4.1) {
    length = items.length;
  }
  let returnData = [];
  for (let itemIndex = 0; itemIndex < length; itemIndex++) {
    returnData = await import_readOperation.readSheet.call(
      this,
      sheet,
      sheetName,
      itemIndex,
      returnData,
      nodeVersion,
      items
    );
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  readFilter
});
//# sourceMappingURL=read.operation.js.map