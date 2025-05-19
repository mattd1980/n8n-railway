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
var SwitchV3_node_exports = {};
__export(SwitchV3_node_exports, {
  SwitchV3: () => SwitchV3
});
module.exports = __toCommonJS(SwitchV3_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../utils/utilities");
var import_constants = require("../../../utils/constants");
var import_descriptions = require("../../../utils/descriptions");
var import_utils = require("../../If/V2/utils");
const configuredOutputs = (parameters) => {
  const mode = parameters.mode;
  if (mode === "expression") {
    return Array.from({ length: parameters.numberOutputs }, (_, i) => ({
      type: "main",
      displayName: i.toString()
    }));
  } else {
    const rules = parameters.rules?.values ?? [];
    const ruleOutputs = rules.map((rule, index) => {
      return {
        type: "main",
        displayName: rule.outputKey || index.toString()
      };
    });
    if (parameters.options?.fallbackOutput === "extra") {
      const renameFallbackOutput = parameters.options?.renameFallbackOutput;
      ruleOutputs.push({
        type: "main",
        displayName: renameFallbackOutput || "Fallback"
      });
    }
    return ruleOutputs;
  }
};
class SwitchV3 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        async getFallbackOutputOptions() {
          const rules = this.getCurrentNodeParameter("rules.values") ?? [];
          const outputOptions = [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "None (default)",
              value: "none",
              description: "Items will be ignored"
            },
            {
              name: "Extra Output",
              value: "extra",
              description: "Items will be sent to the extra, separate, output"
            }
          ];
          for (const [index, rule] of rules.entries()) {
            outputOptions.push({
              name: `Output ${rule.outputKey || index}`,
              value: index,
              description: `Items will be sent to the same output as when matched rule ${index + 1}`
            });
          }
          return outputOptions;
        }
      }
    };
    this.description = {
      ...baseDescription,
      subtitle: `=mode: {{(${import_utilities.capitalize})($parameter["mode"])}}`,
      version: [3, 3.1, 3.2],
      defaults: {
        name: "Switch",
        color: "#506000"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: `={{(${configuredOutputs})($parameter)}}`,
      properties: [
        {
          displayName: "Mode",
          name: "mode",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Rules",
              value: "rules",
              description: "Build a matching rule for each output"
            },
            {
              name: "Expression",
              value: "expression",
              description: "Write an expression to return the output index"
            }
          ],
          default: "rules",
          description: "How data should be routed"
        },
        {
          displayName: "Number of Outputs",
          name: "numberOutputs",
          type: "number",
          displayOptions: {
            show: {
              mode: ["expression"]
            }
          },
          default: 4,
          description: "How many outputs to create"
        },
        {
          displayName: "Output Index",
          name: "output",
          type: "number",
          validateType: "number",
          hint: "The index to route the item to, starts at 0",
          displayOptions: {
            show: {
              mode: ["expression"]
            }
          },
          // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-number
          default: "={{}}",
          description: "The output index to send the input item to. Use an expression to calculate which input item should be routed to which output. The expression must return a number."
        },
        {
          displayName: "Routing Rules",
          name: "rules",
          placeholder: "Add Routing Rule",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true,
            sortable: true
          },
          default: {
            values: [
              {
                conditions: {
                  options: {
                    caseSensitive: true,
                    leftValue: "",
                    typeValidation: "strict"
                  },
                  conditions: [
                    {
                      leftValue: "",
                      rightValue: "",
                      operator: {
                        type: "string",
                        operation: "equals"
                      }
                    }
                  ],
                  combinator: "and"
                }
              }
            ]
          },
          displayOptions: {
            show: {
              mode: ["rules"]
            }
          },
          options: [
            {
              name: "values",
              displayName: "Values",
              values: [
                {
                  displayName: "Conditions",
                  name: "conditions",
                  placeholder: "Add Condition",
                  type: "filter",
                  default: {},
                  typeOptions: {
                    multipleValues: false,
                    filter: {
                      caseSensitive: "={{!$parameter.options.ignoreCase}}",
                      typeValidation: (0, import_utils.getTypeValidationStrictness)(3.1),
                      version: "={{ $nodeVersion >= 3.2 ? 2 : 1 }}"
                    }
                  }
                },
                {
                  displayName: "Rename Output",
                  name: "renameOutput",
                  type: "boolean",
                  default: false
                },
                {
                  displayName: "Output Name",
                  name: "outputKey",
                  type: "string",
                  default: "",
                  description: "The label of output to which to send data to if rule matches",
                  displayOptions: {
                    show: {
                      renameOutput: [true]
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          ...import_descriptions.looseTypeValidationProperty,
          default: false,
          displayOptions: {
            show: {
              "@version": [{ _cnd: { gte: 3.1 } }]
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
              mode: ["rules"]
            }
          },
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
              displayName: "Fallback Output",
              name: "fallbackOutput",
              type: "options",
              typeOptions: {
                loadOptionsDependsOn: ["rules.values", "/rules", "/rules.values"],
                loadOptionsMethod: "getFallbackOutputOptions"
              },
              default: "none",
              // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
              description: "If no rule matches the item will be sent to this output, by default they will be ignored"
            },
            {
              displayName: "Ignore Case",
              description: "Whether to ignore letter case when evaluating conditions",
              name: "ignoreCase",
              type: "boolean",
              default: true
            },
            {
              ...import_descriptions.looseTypeValidationProperty,
              displayOptions: {
                show: {
                  "@version": [{ _cnd: { lt: 3.1 } }]
                }
              }
            },
            {
              displayName: "Rename Fallback Output",
              name: "renameFallbackOutput",
              type: "string",
              placeholder: "e.g. Fallback",
              default: "",
              displayOptions: {
                show: {
                  fallbackOutput: ["extra"]
                }
              }
            },
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              displayName: "Send data to all matching outputs",
              name: "allMatchingOutputs",
              type: "boolean",
              default: false,
              description: "Whether to send data to all outputs meeting conditions (and not just the first one)"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    let returnData = [];
    const items = this.getInputData();
    const mode = this.getNodeParameter("mode", 0);
    const checkIndexRange = (returnDataLength, index, itemIndex = 0) => {
      if (Number(index) === returnDataLength) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The ouput ${index} is not allowed. `, {
          itemIndex,
          description: `Output indexes are zero based, if you want to use the extra output use ${index - 1}`
        });
      }
      if (index < 0 || index > returnDataLength) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The ouput ${index} is not allowed`, {
          itemIndex,
          description: `It has to be between 0 and ${returnDataLength - 1}`
        });
      }
    };
    itemLoop: for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const item = items[itemIndex];
        item.pairedItem = { item: itemIndex };
        if (mode === "expression") {
          const numberOutputs = this.getNodeParameter("numberOutputs", itemIndex);
          if (itemIndex === 0) {
            returnData = new Array(numberOutputs).fill(0).map(() => []);
          }
          const outputIndex = this.getNodeParameter("output", itemIndex);
          checkIndexRange(returnData.length, outputIndex, itemIndex);
          returnData[outputIndex].push(item);
        } else if (mode === "rules") {
          const rules = this.getNodeParameter("rules.values", itemIndex, []);
          if (!rules.length) continue;
          const options = this.getNodeParameter("options", itemIndex, {});
          const fallbackOutput = options.fallbackOutput;
          if (itemIndex === 0) {
            returnData = new Array(rules.length).fill(0).map(() => []);
            if (fallbackOutput === "extra") {
              returnData.push([]);
            }
          }
          let matchFound = false;
          for (const [ruleIndex, rule] of rules.entries()) {
            let conditionPass;
            try {
              conditionPass = this.getNodeParameter(
                `rules.values[${ruleIndex}].conditions`,
                itemIndex,
                false,
                {
                  extractValue: true
                }
              );
            } catch (error) {
              if (!(0, import_utils.getTypeValidationParameter)(3.1)(
                this,
                itemIndex,
                options.looseTypeValidation
              ) && !error.description) {
                error.description = import_constants.ENABLE_LESS_STRICT_TYPE_VALIDATION;
              }
              (0, import_set.default)(error, "context.itemIndex", itemIndex);
              (0, import_set.default)(error, "node", this.getNode());
              throw error;
            }
            if (conditionPass) {
              matchFound = true;
              checkIndexRange(returnData.length, rule.output, itemIndex);
              returnData[ruleIndex].push(item);
              if (!options.allMatchingOutputs) {
                continue itemLoop;
              }
            }
          }
          if (fallbackOutput !== void 0 && fallbackOutput !== "none" && !matchFound) {
            if (fallbackOutput === "extra") {
              returnData[returnData.length - 1].push(item);
              continue;
            }
            checkIndexRange(returnData.length, fallbackOutput, itemIndex);
            returnData[fallbackOutput].push(item);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData[0].push({ json: { error: error.message } });
          continue;
        }
        if (error instanceof import_n8n_workflow.NodeOperationError) {
          throw error;
        }
        if (error instanceof import_n8n_workflow.ApplicationError) {
          (0, import_set.default)(error, "context.itemIndex", itemIndex);
          throw error;
        }
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
          itemIndex
        });
      }
    }
    if (!returnData.length) return [[]];
    return returnData;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SwitchV3
});
//# sourceMappingURL=SwitchV3.node.js.map