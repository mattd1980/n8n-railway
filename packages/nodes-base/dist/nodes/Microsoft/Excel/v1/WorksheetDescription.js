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
var WorksheetDescription_exports = {};
__export(WorksheetDescription_exports, {
  worksheetFields: () => worksheetFields,
  worksheetOperations: () => worksheetOperations
});
module.exports = __toCommonJS(WorksheetDescription_exports);
const worksheetOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["worksheet"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many worksheets",
        action: "Get many worksheets"
      },
      {
        name: "Get Content",
        value: "getContent",
        description: "Get worksheet content",
        action: "Get a worksheet"
      }
    ],
    default: "create"
  }
];
const worksheetFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 worksheet:getAll                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Workbook Name or ID",
    name: "workbook",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getWorkbooks"
    },
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["worksheet"]
      }
    },
    default: ""
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["worksheet"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["worksheet"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["worksheet"]
      }
    },
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "Fields the response will containt. Multiple can be added separated by ,."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 worksheet:getContent                       */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Workbook Name or ID",
    name: "workbook",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    typeOptions: {
      loadOptionsMethod: "getWorkbooks"
    },
    displayOptions: {
      show: {
        operation: ["getContent"],
        resource: ["worksheet"]
      }
    },
    default: ""
  },
  {
    displayName: "Worksheet Name or ID",
    name: "worksheet",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    typeOptions: {
      loadOptionsMethod: "getworksheets",
      loadOptionsDependsOn: ["workbook"]
    },
    displayOptions: {
      show: {
        operation: ["getContent"],
        resource: ["worksheet"]
      }
    },
    default: ""
  },
  {
    displayName: "Range",
    name: "range",
    type: "string",
    displayOptions: {
      show: {
        operation: ["getContent"],
        resource: ["worksheet"]
      }
    },
    default: "A1:C3",
    required: true,
    description: "The address or the name of the range. If not specified, the entire worksheet range is returned."
  },
  {
    displayName: "RAW Data",
    name: "rawData",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getContent"],
        resource: ["worksheet"]
      }
    },
    default: false,
    description: "Whether the data should be returned RAW instead of parsed into keys according to their header"
  },
  {
    displayName: "Data Property",
    name: "dataProperty",
    type: "string",
    default: "data",
    displayOptions: {
      show: {
        operation: ["getContent"],
        resource: ["worksheet"],
        rawData: [true]
      }
    },
    description: "The name of the property into which to write the RAW data"
  },
  {
    displayName: "Data Start Row",
    name: "dataStartRow",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 1,
    displayOptions: {
      show: {
        operation: ["getContent"],
        resource: ["worksheet"]
      },
      hide: {
        rawData: [true]
      }
    },
    description: "Index of the first row which contains the actual data and not the keys. Starts with 0."
  },
  {
    displayName: "Key Row",
    name: "keyRow",
    type: "number",
    typeOptions: {
      minValue: 0
    },
    displayOptions: {
      show: {
        operation: ["getContent"],
        resource: ["worksheet"]
      },
      hide: {
        rawData: [true]
      }
    },
    default: 0,
    description: "Index of the row which contains the keys. Starts at 0. The incoming node data is matched to the keys for assignment. The matching is case sensitve."
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        operation: ["getContent"],
        resource: ["worksheet"],
        rawData: [true]
      }
    },
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "Fields the response will containt. Multiple can be added separated by ,."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  worksheetFields,
  worksheetOperations
});
//# sourceMappingURL=WorksheetDescription.js.map