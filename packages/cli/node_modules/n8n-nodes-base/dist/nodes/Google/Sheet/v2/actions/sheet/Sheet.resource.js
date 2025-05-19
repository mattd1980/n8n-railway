"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Sheet_resource_exports = {};
__export(Sheet_resource_exports, {
  append: () => append,
  appendOrUpdate: () => appendOrUpdate,
  clear: () => clear,
  create: () => create,
  delete: () => del,
  descriptions: () => descriptions,
  read: () => read,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(Sheet_resource_exports);
var append = __toESM(require("./append.operation"));
var appendOrUpdate = __toESM(require("./appendOrUpdate.operation"));
var clear = __toESM(require("./clear.operation"));
var create = __toESM(require("./create.operation"));
var del = __toESM(require("./delete.operation"));
var read = __toESM(require("./read.operation"));
var remove = __toESM(require("./remove.operation"));
var update = __toESM(require("./update.operation"));
var import_constants = require("../../../../constants");
const descriptions = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["sheet"]
      }
    },
    options: [
      {
        name: "Append or Update Row",
        value: "appendOrUpdate",
        description: "Append a new row or update an existing one (upsert)",
        action: "Append or update row in sheet"
      },
      {
        name: "Append Row",
        value: "append",
        description: "Create a new row in a sheet",
        action: "Append row in sheet"
      },
      {
        name: "Clear",
        value: "clear",
        description: "Delete all the contents or a part of a sheet",
        action: "Clear sheet"
      },
      {
        name: "Create",
        value: "create",
        description: "Create a new sheet",
        action: "Create sheet"
      },
      {
        name: "Delete",
        value: "remove",
        description: "Permanently delete a sheet",
        action: "Delete sheet"
      },
      {
        name: "Delete Rows or Columns",
        value: "delete",
        description: "Delete columns or rows from a sheet",
        action: "Delete rows or columns from sheet"
      },
      {
        name: "Get Row(s)",
        value: "read",
        description: "Retrieve one or more rows from a sheet",
        action: "Get row(s) in sheet"
      },
      {
        name: "Update Row",
        value: "update",
        description: "Update an existing row in a sheet",
        action: "Update row in sheet"
      }
    ],
    default: "read"
  },
  {
    displayName: "Document",
    name: "documentId",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    required: true,
    modes: [
      {
        displayName: "From List",
        name: "list",
        type: "list",
        typeOptions: {
          searchListMethod: "spreadSheetsSearch",
          searchable: true
        }
      },
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        extractValue: {
          type: "regex",
          regex: import_constants.GOOGLE_DRIVE_FILE_URL_REGEX
        },
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.GOOGLE_DRIVE_FILE_URL_REGEX,
              errorMessage: "Not a valid Google Drive File URL"
            }
          }
        ]
      },
      {
        displayName: "By ID",
        name: "id",
        type: "string",
        validation: [
          {
            type: "regex",
            properties: {
              regex: "[a-zA-Z0-9\\-_]{2,}",
              errorMessage: "Not a valid Google Drive File ID"
            }
          }
        ],
        url: "=https://docs.google.com/spreadsheets/d/{{$value}}/edit"
      }
    ],
    displayOptions: {
      show: {
        resource: ["sheet"]
      }
    }
  },
  {
    displayName: "Sheet",
    name: "sheetName",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    // default: '', //empty string set to progresivly reveal fields
    required: true,
    typeOptions: {
      loadOptionsDependsOn: ["documentId.value"]
    },
    modes: [
      {
        displayName: "From List",
        name: "list",
        type: "list",
        typeOptions: {
          searchListMethod: "sheetsSearch",
          searchable: false
        }
      },
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        extractValue: {
          type: "regex",
          regex: import_constants.GOOGLE_SHEETS_SHEET_URL_REGEX
        },
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.GOOGLE_SHEETS_SHEET_URL_REGEX,
              errorMessage: "Not a valid Sheet URL"
            }
          }
        ]
      },
      {
        displayName: "By ID",
        name: "id",
        type: "string",
        validation: [
          {
            type: "regex",
            properties: {
              regex: "((gid=)?[0-9]{1,})",
              errorMessage: "Not a valid Sheet ID"
            }
          }
        ]
      },
      {
        displayName: "By Name",
        name: "name",
        type: "string",
        placeholder: "Sheet1"
      }
    ],
    displayOptions: {
      show: {
        resource: ["sheet"],
        operation: ["append", "appendOrUpdate", "clear", "delete", "read", "remove", "update"]
      }
    }
  },
  ...append.description,
  ...clear.description,
  ...create.description,
  ...del.description,
  ...read.description,
  ...update.description,
  ...appendOrUpdate.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  append,
  appendOrUpdate,
  clear,
  create,
  delete: null,
  descriptions,
  read,
  remove,
  update
});
//# sourceMappingURL=Sheet.resource.js.map