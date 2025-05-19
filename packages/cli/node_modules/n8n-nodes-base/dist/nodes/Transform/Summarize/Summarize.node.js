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
var Summarize_node_exports = {};
__export(Summarize_node_exports, {
  Summarize: () => Summarize
});
module.exports = __toCommonJS(Summarize_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./utils");
class Summarize {
  constructor() {
    this.description = {
      displayName: "Summarize",
      name: "summarize",
      icon: "file:summarize.svg",
      group: ["transform"],
      subtitle: "",
      version: [1, 1.1],
      description: "Sum, count, max, etc. across items",
      defaults: {
        name: "Summarize"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Fields to Summarize",
          name: "fieldsToSummarize",
          type: "fixedCollection",
          placeholder: "Add Field",
          default: { values: [{ aggregation: "count", field: "" }] },
          typeOptions: {
            multipleValues: true
          },
          options: [
            {
              displayName: "",
              name: "values",
              values: [
                {
                  displayName: "Aggregation",
                  name: "aggregation",
                  type: "options",
                  options: [
                    {
                      name: "Append",
                      value: "append"
                    },
                    {
                      name: "Average",
                      value: "average"
                    },
                    {
                      name: "Concatenate",
                      value: "concatenate"
                    },
                    {
                      name: "Count",
                      value: "count"
                    },
                    {
                      name: "Count Unique",
                      value: "countUnique"
                    },
                    {
                      name: "Max",
                      value: "max"
                    },
                    {
                      name: "Min",
                      value: "min"
                    },
                    {
                      name: "Sum",
                      value: "sum"
                    }
                  ],
                  default: "count",
                  description: "How to combine the values of the field you want to summarize"
                },
                //field repeated to have different descriptions for different aggregations --------------------------------
                {
                  displayName: "Field",
                  name: "field",
                  type: "string",
                  default: "",
                  description: "The name of an input field that you want to summarize",
                  placeholder: "e.g. cost",
                  hint: " Enter the field name as text",
                  displayOptions: {
                    hide: {
                      aggregation: [...import_utils.NUMERICAL_AGGREGATIONS, "countUnique", "count", "max", "min"]
                    }
                  },
                  requiresDataPath: "single"
                },
                {
                  displayName: "Field",
                  name: "field",
                  type: "string",
                  default: "",
                  description: "The name of an input field that you want to summarize. The field should contain numerical values; null, undefined, empty strings would be ignored.",
                  placeholder: "e.g. cost",
                  hint: " Enter the field name as text",
                  displayOptions: {
                    show: {
                      aggregation: import_utils.NUMERICAL_AGGREGATIONS
                    }
                  },
                  requiresDataPath: "single"
                },
                {
                  displayName: "Field",
                  name: "field",
                  type: "string",
                  default: "",
                  description: "The name of an input field that you want to summarize; null, undefined, empty strings would be ignored",
                  placeholder: "e.g. cost",
                  hint: " Enter the field name as text",
                  displayOptions: {
                    show: {
                      aggregation: ["countUnique", "count", "max", "min"]
                    }
                  },
                  requiresDataPath: "single"
                },
                // ----------------------------------------------------------------------------------------------------------
                {
                  displayName: "Include Empty Values",
                  name: "includeEmpty",
                  type: "boolean",
                  default: false,
                  displayOptions: {
                    show: {
                      aggregation: ["append", "concatenate", "count", "countUnique"]
                    }
                  }
                },
                {
                  displayName: "Separator",
                  name: "separateBy",
                  type: "options",
                  default: ",",
                  // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
                  options: [
                    {
                      name: "Comma",
                      value: ","
                    },
                    {
                      name: "Comma and Space",
                      value: ", "
                    },
                    {
                      name: "New Line",
                      value: "\n"
                    },
                    {
                      name: "None",
                      value: ""
                    },
                    {
                      name: "Space",
                      value: " "
                    },
                    {
                      name: "Other",
                      value: "other"
                    }
                  ],
                  hint: "What to insert between values",
                  displayOptions: {
                    show: {
                      aggregation: ["concatenate"]
                    }
                  }
                },
                {
                  displayName: "Custom Separator",
                  name: "customSeparator",
                  type: "string",
                  default: "",
                  displayOptions: {
                    show: {
                      aggregation: ["concatenate"],
                      separateBy: ["other"]
                    }
                  }
                }
              ]
            }
          ]
        },
        // fieldsToSplitBy repeated to have different displayName for singleItem and separateItems -----------------------------
        {
          displayName: "Fields to Split By",
          name: "fieldsToSplitBy",
          type: "string",
          placeholder: "e.g. country, city",
          default: "",
          description: "The name of the input fields that you want to split the summary by",
          hint: "Enter the name of the fields as text (separated by commas)",
          displayOptions: {
            hide: {
              "/options.outputFormat": ["singleItem"]
            }
          },
          requiresDataPath: "multiple"
        },
        {
          displayName: "Fields to Group By",
          name: "fieldsToSplitBy",
          type: "string",
          placeholder: "e.g. country, city",
          default: "",
          description: "The name of the input fields that you want to split the summary by",
          hint: "Enter the name of the fields as text (separated by commas)",
          displayOptions: {
            show: {
              "/options.outputFormat": ["singleItem"]
            }
          },
          requiresDataPath: "multiple"
        },
        // ----------------------------------------------------------------------------------------------------------
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Continue if Field Not Found",
              name: "continueIfFieldNotFound",
              type: "boolean",
              default: false,
              description: "Whether to continue if field to summarize can't be found in any items and return single empty item, otherwise an error would be thrown",
              displayOptions: {
                hide: {
                  "@version": [{ _cnd: { gte: 1.1 } }]
                }
              }
            },
            {
              displayName: "Disable Dot Notation",
              name: "disableDotNotation",
              type: "boolean",
              default: false,
              description: "Whether to disallow referencing child fields using `parent.child` in the field name"
            },
            {
              displayName: "Output Format",
              name: "outputFormat",
              type: "options",
              default: "separateItems",
              options: [
                {
                  name: "Each Split in a Separate Item",
                  value: "separateItems"
                },
                {
                  name: "All Splits in a Single Item",
                  value: "singleItem"
                }
              ]
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              displayName: "Ignore items without valid fields to group by",
              name: "skipEmptySplitFields",
              type: "boolean",
              default: false
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const newItems = items.map(({ json }, i) => ({ ...json, _itemIndex: i }));
    const options = this.getNodeParameter("options", 0, {});
    const fieldsToSplitBy = this.getNodeParameter("fieldsToSplitBy", 0, "").split(",").map((field) => field.trim()).filter((field) => field);
    const fieldsToSummarize = this.getNodeParameter(
      "fieldsToSummarize.values",
      0,
      []
    );
    if (fieldsToSummarize.filter((aggregation) => aggregation.field !== "").length === 0) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "You need to add at least one aggregation to 'Fields to Summarize' with non empty 'Field'"
      );
    }
    const getValue = (0, import_utils.fieldValueGetter)(options.disableDotNotation);
    const nodeVersion = this.getNode().typeVersion;
    const aggregationResult = (0, import_utils.aggregateAndSplitData)({
      splitKeys: fieldsToSplitBy,
      inputItems: newItems,
      fieldsToSummarize,
      options,
      getValue,
      convertKeysToString: nodeVersion === 1
    });
    const fieldsNotFound = [];
    try {
      import_utils.checkIfFieldExists.call(this, newItems, fieldsToSummarize, getValue);
    } catch (error) {
      if (nodeVersion > 1 || options.continueIfFieldNotFound) {
        const fieldNotFoundHint = {
          message: error instanceof Error ? error.message : String(error),
          location: "outputPane"
        };
        fieldsNotFound.push(fieldNotFoundHint);
      } else {
        throw error;
      }
    }
    if (fieldsNotFound.length) {
      this.addExecutionHints(...fieldsNotFound);
    }
    if (options.outputFormat === "singleItem") {
      const executionData = {
        json: (0, import_utils.flattenAggregationResultToObject)(aggregationResult),
        pairedItem: newItems.map((_v, index) => ({
          item: index
        }))
      };
      return [[executionData]];
    } else {
      if (!fieldsToSplitBy.length && "pairedItems" in aggregationResult) {
        const { pairedItems, returnData } = aggregationResult;
        const executionData2 = {
          json: returnData,
          pairedItem: (pairedItems ?? []).map((index) => ({ item: index }))
        };
        return [[executionData2]];
      }
      const flatAggregationResults = (0, import_utils.flattenAggregationResultToArray)(aggregationResult);
      const executionData = flatAggregationResults.map((item) => {
        const { pairedItems, returnData } = item;
        return {
          json: returnData,
          pairedItem: (pairedItems ?? []).map((index) => ({ item: index }))
        };
      });
      return [executionData];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Summarize
});
//# sourceMappingURL=Summarize.node.js.map