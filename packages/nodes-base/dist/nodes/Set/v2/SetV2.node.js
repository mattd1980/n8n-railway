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
var SetV2_node_exports = {};
__export(SetV2_node_exports, {
  SetV2: () => SetV2
});
module.exports = __toCommonJS(SetV2_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_interfaces = require("./helpers/interfaces");
var manual = __toESM(require("./manual.mode"));
var raw = __toESM(require("./raw.mode"));
const versionDescription = {
  displayName: "Edit Fields (Set)",
  name: "set",
  iconColor: "blue",
  group: ["input"],
  version: [3, 3.1, 3.2, 3.3, 3.4],
  description: "Modify, add, or remove item fields",
  subtitle: '={{$parameter["mode"]}}',
  defaults: {
    name: "Edit Fields"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  properties: [
    {
      displayName: "Mode",
      name: "mode",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Manual Mapping",
          value: "manual",
          description: "Edit item fields one by one",
          action: "Edit item fields one by one"
        },
        {
          name: "JSON",
          value: "raw",
          description: "Customize item output with JSON",
          action: "Customize item output with JSON"
        }
      ],
      default: "manual"
    },
    {
      displayName: "Duplicate Item",
      name: "duplicateItem",
      type: "boolean",
      default: false,
      isNodeSetting: true
    },
    {
      displayName: "Duplicate Item Count",
      name: "duplicateCount",
      type: "number",
      default: 0,
      typeOptions: {
        minValue: 0
      },
      description: "How many times the item should be duplicated, mainly used for testing and debugging",
      isNodeSetting: true,
      displayOptions: {
        show: {
          duplicateItem: [true]
        }
      }
    },
    {
      displayName: "Item duplication is set in the node settings. This option will be ignored when the workflow runs automatically.",
      name: "duplicateWarning",
      type: "notice",
      default: "",
      displayOptions: {
        show: {
          duplicateItem: [true]
        }
      }
    },
    ...raw.description,
    ...manual.description,
    {
      displayName: "Include in Output",
      name: "include",
      type: "options",
      description: "How to select the fields you want to include in your output items",
      default: "all",
      displayOptions: {
        show: {
          "@version": [3, 3.1, 3.2]
        }
      },
      options: [
        {
          name: "All Input Fields",
          value: import_interfaces.INCLUDE.ALL,
          description: "Also include all unchanged fields from the input"
        },
        {
          name: "No Input Fields",
          value: import_interfaces.INCLUDE.NONE,
          description: "Include only the fields specified above"
        },
        {
          name: "Selected Input Fields",
          value: import_interfaces.INCLUDE.SELECTED,
          description: "Also include the fields listed in the parameter \u201CFields to Include\u201D"
        },
        {
          name: "All Input Fields Except",
          value: import_interfaces.INCLUDE.EXCEPT,
          description: "Exclude the fields listed in the parameter \u201CFields to Exclude\u201D"
        }
      ]
    },
    {
      displayName: "Include Other Input Fields",
      name: "includeOtherFields",
      type: "boolean",
      default: false,
      description: "Whether to pass to the output all the input fields (along with the fields set in 'Fields to Set')",
      displayOptions: {
        hide: {
          "@version": [3, 3.1, 3.2]
        }
      }
    },
    {
      displayName: "Input Fields to Include",
      name: "include",
      type: "options",
      description: "How to select the fields you want to include in your output items",
      default: "all",
      displayOptions: {
        hide: {
          "@version": [3, 3.1, 3.2],
          "/includeOtherFields": [false]
        }
      },
      options: [
        {
          name: "All",
          value: import_interfaces.INCLUDE.ALL,
          description: "Also include all unchanged fields from the input"
        },
        {
          name: "Selected",
          value: import_interfaces.INCLUDE.SELECTED,
          description: "Also include the fields listed in the parameter \u201CFields to Include\u201D"
        },
        {
          name: "All Except",
          value: import_interfaces.INCLUDE.EXCEPT,
          description: "Exclude the fields listed in the parameter \u201CFields to Exclude\u201D"
        }
      ]
    },
    {
      displayName: "Fields to Include",
      name: "includeFields",
      type: "string",
      default: "",
      placeholder: "e.g. fieldToInclude1,fieldToInclude2",
      description: "Comma-separated list of the field names you want to include in the output. You can drag the selected fields from the input panel.",
      requiresDataPath: "multiple",
      displayOptions: {
        show: {
          include: ["selected"],
          "@version": [3, 3.1, 3.2]
        }
      }
    },
    {
      displayName: "Fields to Exclude",
      name: "excludeFields",
      type: "string",
      default: "",
      placeholder: "e.g. fieldToExclude1,fieldToExclude2",
      description: "Comma-separated list of the field names you want to exclude from the output. You can drag the selected fields from the input panel.",
      requiresDataPath: "multiple",
      displayOptions: {
        show: {
          include: ["except"],
          "@version": [3, 3.1, 3.2]
        }
      }
    },
    {
      displayName: "Fields to Include",
      name: "includeFields",
      type: "string",
      default: "",
      placeholder: "e.g. fieldToInclude1,fieldToInclude2",
      description: "Comma-separated list of the field names you want to include in the output. You can drag the selected fields from the input panel.",
      requiresDataPath: "multiple",
      displayOptions: {
        show: {
          include: ["selected"],
          "/includeOtherFields": [true]
        },
        hide: {
          "@version": [3, 3.1, 3.2]
        }
      }
    },
    {
      displayName: "Fields to Exclude",
      name: "excludeFields",
      type: "string",
      default: "",
      placeholder: "e.g. fieldToExclude1,fieldToExclude2",
      description: "Comma-separated list of the field names you want to exclude from the output. You can drag the selected fields from the input panel.",
      requiresDataPath: "multiple",
      displayOptions: {
        show: {
          include: ["except"],
          "/includeOtherFields": [true]
        },
        hide: {
          "@version": [3, 3.1, 3.2]
        }
      }
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        {
          displayName: "Include Binary File",
          name: "includeBinary",
          type: "boolean",
          default: true,
          displayOptions: {
            hide: {
              "@version": [{ _cnd: { gte: 3.4 } }]
            }
          },
          description: "Whether binary data should be included if present in the input item"
        },
        {
          displayName: "Strip Binary Data",
          name: "stripBinary",
          type: "boolean",
          default: true,
          description: 'Whether binary data should be stripped from the input item. Only applies when "Include Other Input Fields" is enabled.',
          displayOptions: {
            show: {
              "@version": [{ _cnd: { gte: 3.4 } }],
              "/includeOtherFields": [true]
            }
          }
        },
        {
          displayName: "Ignore Type Conversion Errors",
          name: "ignoreConversionErrors",
          type: "boolean",
          default: false,
          description: "Whether to ignore field type errors and apply a less strict type conversion",
          displayOptions: {
            show: {
              "/mode": ["manual"]
            }
          }
        },
        {
          displayName: "Support Dot Notation",
          name: "dotNotation",
          type: "boolean",
          default: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: 'By default, dot-notation is used in property names. This means that "a.b" will set the property "b" underneath "a" so { "a": { "b": value} }. If that is not intended this can be deactivated, it will then set { "a.b": value } instead.'
        }
      ]
    }
  ]
};
class SetV2 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const mode = this.getNodeParameter("mode", 0);
    const duplicateItem = this.getNodeParameter("duplicateItem", 0, false);
    const setNode = { raw, manual };
    const returnData = [];
    const rawData = {};
    if (mode === "raw") {
      const jsonOutput = this.getNodeParameter("jsonOutput", 0, "", {
        rawExpressions: true
      });
      if (jsonOutput?.startsWith("=")) {
        rawData.jsonOutput = jsonOutput.replace(/^=+/, "");
      }
    } else {
      const workflowFieldsJson = this.getNodeParameter("fields.values", 0, [], {
        rawExpressions: true
      });
      for (const entry of workflowFieldsJson) {
        if (entry.type === "objectValue" && entry.objectValue.startsWith("=")) {
          rawData[entry.name] = entry.objectValue.replace(/^=+/, "");
        }
      }
    }
    for (let i = 0; i < items.length; i++) {
      const includeOtherFields = this.getNodeParameter("includeOtherFields", i, false);
      const include = this.getNodeParameter("include", i, "all");
      const options = this.getNodeParameter("options", i, {});
      const node = this.getNode();
      if (node.typeVersion >= 3.3) {
        options.include = includeOtherFields ? include : "none";
      } else {
        options.include = include;
      }
      const newItem = await setNode[mode].execute.call(
        this,
        items[i],
        i,
        options,
        rawData,
        node
      );
      if (duplicateItem && this.getMode() === "manual") {
        const duplicateCount = this.getNodeParameter("duplicateCount", 0, 0);
        for (let j = 0; j <= duplicateCount; j++) {
          returnData.push(newItem);
        }
      } else {
        returnData.push(newItem);
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SetV2
});
//# sourceMappingURL=SetV2.node.js.map