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
var FilterV1_node_exports = {};
__export(FilterV1_node_exports, {
  FilterV1: () => FilterV1
});
module.exports = __toCommonJS(FilterV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class FilterV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      version: 1,
      defaults: {
        name: "Filter",
        color: "#229eff"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputNames: ["Kept", "Discarded"],
      properties: [
        {
          displayName: "Conditions",
          name: "conditions",
          placeholder: "Add Condition",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true,
            sortable: true
          },
          description: "The type of values to compare",
          default: {},
          options: [
            {
              name: "boolean",
              displayName: "Boolean",
              values: [
                {
                  displayName: "Value 1",
                  name: "value1",
                  type: "boolean",
                  default: false,
                  // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
                  description: "The value to compare with the second one"
                },
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
                  options: [
                    {
                      name: "Equal",
                      value: "equal"
                    },
                    {
                      name: "Not Equal",
                      value: "notEqual"
                    }
                  ],
                  default: "equal",
                  description: "Operation to decide where the data should be mapped to"
                },
                {
                  displayName: "Value 2",
                  name: "value2",
                  type: "boolean",
                  default: false,
                  // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
                  description: "The value to compare with the first one"
                }
              ]
            },
            {
              name: "dateTime",
              displayName: "Date & Time",
              values: [
                {
                  displayName: "Value 1",
                  name: "value1",
                  type: "dateTime",
                  default: "",
                  description: "The value to compare with the second one"
                },
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
                  options: [
                    {
                      name: "Occurred After",
                      value: "after"
                    },
                    {
                      name: "Occurred Before",
                      value: "before"
                    }
                  ],
                  default: "after",
                  description: "Operation to decide where the data should be mapped to"
                },
                {
                  displayName: "Value 2",
                  name: "value2",
                  type: "dateTime",
                  default: "",
                  description: "The value to compare with the first one"
                }
              ]
            },
            {
              name: "number",
              displayName: "Number",
              values: [
                {
                  displayName: "Value 1",
                  name: "value1",
                  type: "number",
                  default: 0,
                  description: "The value to compare with the second one"
                },
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
                  noDataExpression: true,
                  // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
                  options: [
                    {
                      name: "Smaller",
                      value: "smaller"
                    },
                    {
                      name: "Smaller or Equal",
                      value: "smallerEqual"
                    },
                    {
                      name: "Equal",
                      value: "equal"
                    },
                    {
                      name: "Not Equal",
                      value: "notEqual"
                    },
                    {
                      name: "Larger",
                      value: "larger"
                    },
                    {
                      name: "Larger or Equal",
                      value: "largerEqual"
                    },
                    {
                      name: "Is Empty",
                      value: "isEmpty"
                    },
                    {
                      name: "Is Not Empty",
                      value: "isNotEmpty"
                    }
                  ],
                  default: "smaller",
                  description: "Operation to decide where the data should be mapped to"
                },
                {
                  displayName: "Value 2",
                  name: "value2",
                  type: "number",
                  displayOptions: {
                    hide: {
                      operation: ["isEmpty", "isNotEmpty"]
                    }
                  },
                  default: 0,
                  description: "The value to compare with the first one"
                }
              ]
            },
            {
              name: "string",
              displayName: "String",
              values: [
                {
                  displayName: "Value 1",
                  name: "value1",
                  type: "string",
                  default: "",
                  description: "The value to compare with the second one"
                },
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
                  noDataExpression: true,
                  // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
                  options: [
                    {
                      name: "Contains",
                      value: "contains"
                    },
                    {
                      name: "Not Contains",
                      value: "notContains"
                    },
                    {
                      name: "Ends With",
                      value: "endsWith"
                    },
                    {
                      name: "Not Ends With",
                      value: "notEndsWith"
                    },
                    {
                      name: "Equal",
                      value: "equal"
                    },
                    {
                      name: "Not Equal",
                      value: "notEqual"
                    },
                    {
                      name: "Regex Match",
                      value: "regex"
                    },
                    {
                      name: "Regex Not Match",
                      value: "notRegex"
                    },
                    {
                      name: "Starts With",
                      value: "startsWith"
                    },
                    {
                      name: "Not Starts With",
                      value: "notStartsWith"
                    },
                    {
                      name: "Is Empty",
                      value: "isEmpty"
                    },
                    {
                      name: "Is Not Empty",
                      value: "isNotEmpty"
                    }
                  ],
                  default: "equal",
                  description: "Operation to decide where the data should be mapped to"
                },
                {
                  displayName: "Value 2",
                  name: "value2",
                  type: "string",
                  displayOptions: {
                    hide: {
                      operation: ["isEmpty", "isNotEmpty", "regex", "notRegex"]
                    }
                  },
                  default: "",
                  description: "The value to compare with the first one"
                },
                {
                  displayName: "Regex",
                  name: "value2",
                  type: "string",
                  displayOptions: {
                    show: {
                      operation: ["regex", "notRegex"]
                    }
                  },
                  default: "",
                  placeholder: "/text/i",
                  description: "The regex which has to match"
                }
              ]
            }
          ]
        },
        {
          displayName: "Combine Conditions",
          name: "combineConditions",
          type: "options",
          options: [
            {
              name: "AND",
              description: "Items are passed to the next node only if they meet all the conditions",
              value: "AND"
            },
            {
              name: "OR",
              description: "Items are passed to the next node if they meet at least one condition",
              value: "OR"
            }
          ],
          default: "AND",
          description: "How to combine the conditions: AND requires all conditions to be true, OR requires at least one condition to be true"
        }
      ]
    };
  }
  async execute() {
    const returnDataTrue = [];
    const returnDataFalse = [];
    const items = this.getInputData();
    const dataTypes = ["boolean", "dateTime", "number", "string"];
    itemLoop: for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const item = items[itemIndex];
      const combineConditions = this.getNodeParameter("combineConditions", itemIndex);
      for (const dataType of dataTypes) {
        const typeConditions = this.getNodeParameter(
          `conditions.${dataType}`,
          itemIndex,
          []
        );
        for (const condition of typeConditions) {
          let value1 = condition.value1;
          let value2 = condition.value2;
          if (dataType === "dateTime") {
            const node = this.getNode();
            value1 = (0, import_GenericFunctions.convertDateTime)(node, value1);
            value2 = (0, import_GenericFunctions.convertDateTime)(node, value2);
          }
          const compareResult = import_GenericFunctions.compareOperationFunctions[condition.operation](
            value1,
            value2
          );
          if (item.pairedItem === void 0) {
            item.pairedItem = [{ item: itemIndex }];
          }
          if (compareResult && combineConditions === "OR") {
            returnDataTrue.push(item);
            continue itemLoop;
          }
          if (!compareResult && combineConditions === "AND") {
            returnDataFalse.push(item);
            continue itemLoop;
          }
        }
      }
      if (combineConditions === "AND") {
        returnDataTrue.push(item);
      } else {
        returnDataFalse.push(item);
      }
    }
    return [returnDataTrue, returnDataFalse];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FilterV1
});
//# sourceMappingURL=FilterV1.node.js.map