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
var manual_mode_exports = {};
__export(manual_mode_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(manual_mode_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./helpers/utils");
var import_utilities = require("../../../utils/utilities");
const properties = [
  {
    displayName: "Fields to Set",
    name: "fields",
    placeholder: "Add Field",
    type: "fixedCollection",
    description: "Edit existing fields or add new ones to modify the output data",
    displayOptions: {
      show: {
        "@version": [3, 3.1, 3.2]
      }
    },
    typeOptions: {
      multipleValues: true,
      sortable: true
    },
    default: {},
    options: [
      {
        name: "values",
        displayName: "Values",
        values: [
          {
            displayName: "Name",
            name: "name",
            type: "string",
            default: "",
            placeholder: "e.g. fieldName",
            description: "Name of the field to set the value of. Supports dot-notation. Example: data.person[0].name.",
            requiresDataPath: "single"
          },
          {
            displayName: "Type",
            name: "type",
            type: "options",
            description: "The field value type",
            // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
            options: [
              {
                name: "String",
                value: "stringValue"
              },
              {
                name: "Number",
                value: "numberValue"
              },
              {
                name: "Boolean",
                value: "booleanValue"
              },
              {
                name: "Array",
                value: "arrayValue"
              },
              {
                name: "Object",
                value: "objectValue"
              }
            ],
            default: "stringValue"
          },
          {
            displayName: "Value",
            name: "stringValue",
            type: "string",
            default: "",
            displayOptions: {
              show: {
                type: ["stringValue"]
              }
            },
            validateType: "string",
            ignoreValidationDuringExecution: true
          },
          {
            displayName: "Value",
            name: "numberValue",
            type: "string",
            default: "",
            displayOptions: {
              show: {
                type: ["numberValue"]
              }
            },
            validateType: "number",
            ignoreValidationDuringExecution: true
          },
          {
            displayName: "Value",
            name: "booleanValue",
            type: "options",
            default: "true",
            options: [
              {
                name: "True",
                value: "true"
              },
              {
                name: "False",
                value: "false"
              }
            ],
            displayOptions: {
              show: {
                type: ["booleanValue"]
              }
            },
            validateType: "boolean",
            ignoreValidationDuringExecution: true
          },
          {
            displayName: "Value",
            name: "arrayValue",
            type: "string",
            default: "",
            placeholder: "e.g. [ arrayItem1, arrayItem2, arrayItem3 ]",
            displayOptions: {
              show: {
                type: ["arrayValue"]
              }
            },
            validateType: "array",
            ignoreValidationDuringExecution: true
          },
          {
            displayName: "Value",
            name: "objectValue",
            type: "json",
            default: "={}",
            typeOptions: {
              rows: 2
            },
            displayOptions: {
              show: {
                type: ["objectValue"]
              }
            },
            validateType: "object",
            ignoreValidationDuringExecution: true
          }
        ]
      }
    ]
  },
  {
    displayName: "Fields to Set",
    name: "assignments",
    type: "assignmentCollection",
    displayOptions: {
      hide: {
        "@version": [3, 3.1, 3.2]
      }
    },
    default: {}
  }
];
const displayOptions = {
  show: {
    mode: ["manual"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(item, i, options, rawFieldsData, node) {
  try {
    if (node.typeVersion < 3.3) {
      const fields = this.getNodeParameter("fields.values", i, []);
      const newData2 = {};
      for (const entry of fields) {
        if (entry.type === "objectValue" && rawFieldsData[entry.name] !== void 0 && entry.objectValue !== void 0 && entry.objectValue !== null) {
          entry.objectValue = (0, import_utils.parseJsonParameter)(
            import_utils.resolveRawData.call(this, rawFieldsData[entry.name], i),
            node,
            i,
            entry.name
          );
        }
        const { name, value } = (0, import_utils.validateEntry)(
          entry.name,
          entry.type.replace("Value", ""),
          entry[entry.type],
          node,
          i,
          options.ignoreConversionErrors,
          node.typeVersion
        );
        newData2[name] = value;
      }
      return import_utils.composeReturnItem.call(this, i, item, newData2, options, node.typeVersion);
    }
    const assignmentCollection = this.getNodeParameter(
      "assignments",
      i
    );
    const newData = Object.fromEntries(
      (assignmentCollection?.assignments ?? []).map((assignment) => {
        const { name, value } = (0, import_utils.validateEntry)(
          assignment.name,
          assignment.type,
          assignment.value,
          node,
          i,
          options.ignoreConversionErrors,
          node.typeVersion
        );
        return [name, value];
      })
    );
    return import_utils.composeReturnItem.call(this, i, item, newData, options, node.typeVersion);
  } catch (error) {
    if (this.continueOnFail()) {
      return { json: { error: error.message, pairedItem: { item: i } } };
    }
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
      itemIndex: i,
      description: error.description
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=manual.mode.js.map