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
var RemoveDuplicatesV1_node_exports = {};
__export(RemoveDuplicatesV1_node_exports, {
  RemoveDuplicatesV1: () => RemoveDuplicatesV1
});
module.exports = __toCommonJS(RemoveDuplicatesV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../utils");
const versionDescription = {
  displayName: "Remove Duplicates",
  name: "removeDuplicates",
  icon: "file:removeDuplicates.svg",
  group: ["transform"],
  subtitle: "",
  version: [1, 1.1],
  description: "Delete items with matching field values",
  defaults: {
    name: "Remove Duplicates"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  properties: [
    {
      displayName: "Compare",
      name: "compare",
      type: "options",
      options: [
        {
          name: "All Fields",
          value: "allFields"
        },
        {
          name: "All Fields Except",
          value: "allFieldsExcept"
        },
        {
          name: "Selected Fields",
          value: "selectedFields"
        }
      ],
      default: "allFields",
      description: "The fields of the input items to compare to see if they are the same"
    },
    {
      displayName: "Fields To Exclude",
      name: "fieldsToExclude",
      type: "string",
      placeholder: "e.g. email, name",
      requiresDataPath: "multiple",
      description: "Fields in the input to exclude from the comparison",
      default: "",
      displayOptions: {
        show: {
          compare: ["allFieldsExcept"]
        }
      }
    },
    {
      displayName: "Fields To Compare",
      name: "fieldsToCompare",
      type: "string",
      placeholder: "e.g. email, name",
      requiresDataPath: "multiple",
      description: "Fields in the input to add to the comparison",
      default: "",
      displayOptions: {
        show: {
          compare: ["selectedFields"]
        }
      }
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add Field",
      default: {},
      displayOptions: {
        show: {
          compare: ["allFieldsExcept", "selectedFields"]
        }
      },
      options: [
        {
          displayName: "Disable Dot Notation",
          name: "disableDotNotation",
          type: "boolean",
          default: false,
          description: "Whether to disallow referencing child fields using `parent.child` in the field name"
        },
        {
          displayName: "Remove Other Fields",
          name: "removeOtherFields",
          type: "boolean",
          default: false,
          description: "Whether to remove any fields that are not being compared. If disabled, will keep the values from the first of the duplicates."
        }
      ]
    }
  ]
};
class RemoveDuplicatesV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    return (0, import_utils.removeDuplicateInputItems)(this, items);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveDuplicatesV1
});
//# sourceMappingURL=RemoveDuplicatesV1.node.js.map