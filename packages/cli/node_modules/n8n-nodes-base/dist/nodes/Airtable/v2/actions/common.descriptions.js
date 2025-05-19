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
var common_descriptions_exports = {};
__export(common_descriptions_exports, {
  baseRLC: () => baseRLC,
  insertUpdateOptions: () => insertUpdateOptions,
  tableRLC: () => tableRLC,
  viewRLC: () => viewRLC
});
module.exports = __toCommonJS(common_descriptions_exports);
const baseRLC = {
  displayName: "Base",
  name: "base",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  // description: 'The Airtable Base in which to operate on',
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "baseSearch",
        searchable: true
      }
    },
    {
      displayName: "By URL",
      name: "url",
      type: "string",
      placeholder: "e.g. https://airtable.com/app12DiScdfes/tbl9WvGeEPa6lZyVq/viwHdfasdfeieg5p",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "https://airtable.com/([a-zA-Z0-9]{2,})/.*",
            errorMessage: "Not a valid Airtable Base URL"
          }
        }
      ],
      extractValue: {
        type: "regex",
        regex: "https://airtable.com/([a-zA-Z0-9]{2,})"
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[a-zA-Z0-9]{2,}",
            errorMessage: "Not a valid Airtable Base ID"
          }
        }
      ],
      placeholder: "e.g. appD3dfaeidke",
      url: "=https://airtable.com/{{$value}}"
    }
  ]
};
const tableRLC = {
  displayName: "Table",
  name: "table",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  typeOptions: {
    loadOptionsDependsOn: ["base.value"]
  },
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "tableSearch",
        searchable: true
      }
    },
    {
      displayName: "By URL",
      name: "url",
      type: "string",
      placeholder: "https://airtable.com/app12DiScdfes/tblAAAAAAAAAAAAA/viwHdfasdfeieg5p",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "https://airtable.com/[a-zA-Z0-9]{2,}/([a-zA-Z0-9]{2,})/.*",
            errorMessage: "Not a valid Airtable Table URL"
          }
        }
      ],
      extractValue: {
        type: "regex",
        regex: "https://airtable.com/[a-zA-Z0-9]{2,}/([a-zA-Z0-9]{2,})"
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[a-zA-Z0-9]{2,}",
            errorMessage: "Not a valid Airtable Table ID"
          }
        }
      ],
      placeholder: "tbl3dirwqeidke"
    }
  ]
};
const viewRLC = {
  displayName: "View",
  name: "view",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "viewSearch",
        searchable: true
      }
    },
    {
      displayName: "By URL",
      name: "url",
      type: "string",
      placeholder: "https://airtable.com/app12DiScdfes/tblAAAAAAAAAAAAA/viwHdfasdfeieg5p",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "https://airtable.com/[a-zA-Z0-9]{2,}/[a-zA-Z0-9]{2,}/([a-zA-Z0-9]{2,})/.*",
            errorMessage: "Not a valid Airtable View URL"
          }
        }
      ],
      extractValue: {
        type: "regex",
        regex: "https://airtable.com/[a-zA-Z0-9]{2,}/[a-zA-Z0-9]{2,}/([a-zA-Z0-9]{2,})"
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[a-zA-Z0-9]{2,}",
            errorMessage: "Not a valid Airtable View ID"
          }
        }
      ],
      placeholder: "viw3dirwqeidke"
    }
  ]
};
const insertUpdateOptions = [
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Typecast",
        name: "typecast",
        type: "boolean",
        default: false,
        description: "Whether the Airtable API should attempt mapping of string values for linked records & select options"
      },
      {
        displayName: "Ignore Fields From Input",
        name: "ignoreFields",
        type: "string",
        requiresDataPath: "multiple",
        displayOptions: {
          show: {
            "/columns.mappingMode": ["autoMapInputData"]
          }
        },
        default: "",
        description: "Comma-separated list of fields in input to ignore when updating"
      },
      {
        displayName: "Update All Matches",
        name: "updateAllMatches",
        type: "boolean",
        default: false,
        description: 'Whether to update all records matching the value in the "Column to Match On". If not set, only the first matching record will be updated.',
        displayOptions: {
          show: {
            "/operation": ["update", "upsert"]
          }
        }
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  baseRLC,
  insertUpdateOptions,
  tableRLC,
  viewRLC
});
//# sourceMappingURL=common.descriptions.js.map