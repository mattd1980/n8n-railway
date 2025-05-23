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
var SwitchV1_node_exports = {};
__export(SwitchV1_node_exports, {
  SwitchV1: () => SwitchV1
});
module.exports = __toCommonJS(SwitchV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class SwitchV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      version: [1],
      defaults: {
        name: "Switch",
        color: "#506000"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [
        import_n8n_workflow.NodeConnectionTypes.Main,
        import_n8n_workflow.NodeConnectionTypes.Main,
        import_n8n_workflow.NodeConnectionTypes.Main,
        import_n8n_workflow.NodeConnectionTypes.Main
      ],
      outputNames: ["0", "1", "2", "3"],
      properties: [
        {
          displayName: "Mode",
          name: "mode",
          type: "options",
          options: [
            {
              name: "Expression",
              value: "expression",
              description: "Expression decides how to route data"
            },
            {
              name: "Rules",
              value: "rules",
              description: "Rules decide how to route data"
            }
          ],
          default: "rules",
          description: "How data should be routed"
        },
        // ----------------------------------
        //         mode:expression
        // ----------------------------------
        {
          displayName: "Output",
          name: "output",
          type: "number",
          typeOptions: {
            minValue: 0,
            maxValue: 3
          },
          displayOptions: {
            show: {
              mode: ["expression"]
            }
          },
          default: 0,
          description: "The index of output to which to send data to"
        },
        // ----------------------------------
        //         mode:rules
        // ----------------------------------
        {
          displayName: "Data Type",
          name: "dataType",
          type: "options",
          displayOptions: {
            show: {
              mode: ["rules"]
            }
          },
          options: [
            {
              name: "Boolean",
              value: "boolean"
            },
            {
              name: "Date & Time",
              value: "dateTime"
            },
            {
              name: "Number",
              value: "number"
            },
            {
              name: "String",
              value: "string"
            }
          ],
          default: "number",
          description: "The type of data to route on"
        },
        // ----------------------------------
        //         dataType:boolean
        // ----------------------------------
        {
          displayName: "Value 1",
          name: "value1",
          type: "boolean",
          displayOptions: {
            show: {
              dataType: ["boolean"],
              mode: ["rules"]
            }
          },
          default: false,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: "The value to compare with the first one"
        },
        {
          displayName: "Routing Rules",
          name: "rules",
          placeholder: "Add Routing Rule",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              dataType: ["boolean"],
              mode: ["rules"]
            }
          },
          default: {},
          options: [
            {
              name: "rules",
              displayName: "Boolean",
              values: [
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
                },
                {
                  displayName: "Output",
                  name: "output",
                  type: "number",
                  typeOptions: {
                    minValue: 0,
                    maxValue: 3
                  },
                  default: 0,
                  description: "The index of output to which to send data to if rule matches"
                }
              ]
            }
          ]
        },
        // ----------------------------------
        //         dataType:dateTime
        // ----------------------------------
        {
          displayName: "Value 1",
          name: "value1",
          type: "dateTime",
          displayOptions: {
            show: {
              dataType: ["dateTime"],
              mode: ["rules"]
            }
          },
          default: "",
          description: "The value to compare with the second one"
        },
        {
          displayName: "Routing Rules",
          name: "rules",
          placeholder: "Add Routing Rule",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              dataType: ["dateTime"],
              mode: ["rules"]
            }
          },
          default: {},
          options: [
            {
              name: "rules",
              displayName: "Dates",
              values: [
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
                  default: 0,
                  description: "The value to compare with the first one"
                },
                {
                  displayName: "Output",
                  name: "output",
                  type: "number",
                  typeOptions: {
                    minValue: 0,
                    maxValue: 3
                  },
                  default: 0,
                  description: "The index of output to which to send data to if rule matches"
                }
              ]
            }
          ]
        },
        // ----------------------------------
        //         dataType:number
        // ----------------------------------
        {
          displayName: "Value 1",
          name: "value1",
          type: "number",
          displayOptions: {
            show: {
              dataType: ["number"],
              mode: ["rules"]
            }
          },
          default: 0,
          description: "The value to compare with the second one"
        },
        {
          displayName: "Routing Rules",
          name: "rules",
          placeholder: "Add Routing Rule",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              dataType: ["number"],
              mode: ["rules"]
            }
          },
          default: {},
          options: [
            {
              name: "rules",
              displayName: "Numbers",
              values: [
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
                  // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
                  options: [
                    {
                      name: "Smaller",
                      value: "smaller"
                    },
                    {
                      name: "Smaller Equal",
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
                      name: "Larger Equal",
                      value: "largerEqual"
                    }
                  ],
                  default: "smaller",
                  description: "Operation to decide where the data should be mapped to"
                },
                {
                  displayName: "Value 2",
                  name: "value2",
                  type: "number",
                  default: 0,
                  description: "The value to compare with the first one"
                },
                {
                  displayName: "Output",
                  name: "output",
                  type: "number",
                  typeOptions: {
                    minValue: 0,
                    maxValue: 3
                  },
                  default: 0,
                  description: "The index of output to which to send data to if rule matches"
                }
              ]
            }
          ]
        },
        // ----------------------------------
        //         dataType:string
        // ----------------------------------
        {
          displayName: "Value 1",
          name: "value1",
          type: "string",
          displayOptions: {
            show: {
              dataType: ["string"],
              mode: ["rules"]
            }
          },
          default: "",
          description: "The value to compare with the second one"
        },
        {
          displayName: "Routing Rules",
          name: "rules",
          placeholder: "Add Routing Rule",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              dataType: ["string"],
              mode: ["rules"]
            }
          },
          default: {},
          options: [
            {
              name: "rules",
              displayName: "Strings",
              values: [
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
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
                      operation: ["regex", "notRegex"]
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
                },
                {
                  displayName: "Output",
                  name: "output",
                  type: "number",
                  typeOptions: {
                    minValue: 0,
                    maxValue: 3
                  },
                  default: 0,
                  description: "The index of output to which to send data to if rule matches"
                }
              ]
            }
          ]
        },
        {
          displayName: "Fallback Output",
          name: "fallbackOutput",
          type: "options",
          displayOptions: {
            show: {
              mode: ["rules"]
            }
          },
          // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
          options: [
            {
              name: "None",
              value: -1
            },
            {
              name: "0",
              value: 0
            },
            {
              name: "1",
              value: 1
            },
            {
              name: "2",
              value: 2
            },
            {
              name: "3",
              value: 3
            }
          ],
          default: -1,
          description: "The output to which to route all items which do not match any of the rules"
        }
      ]
    };
  }
  async execute() {
    const returnData = [[], [], [], []];
    const items = this.getInputData();
    let compareOperationResult;
    let item;
    let mode;
    let outputIndex;
    let ruleData;
    const compareOperationFunctions = {
      after: (value1, value2) => (value1 || 0) > (value2 || 0),
      before: (value1, value2) => (value1 || 0) < (value2 || 0),
      contains: (value1, value2) => (value1 || "").toString().includes((value2 || "").toString()),
      notContains: (value1, value2) => !(value1 || "").toString().includes((value2 || "").toString()),
      endsWith: (value1, value2) => value1.endsWith(value2),
      notEndsWith: (value1, value2) => !value1.endsWith(value2),
      equal: (value1, value2) => value1 === value2,
      notEqual: (value1, value2) => value1 !== value2,
      larger: (value1, value2) => (value1 || 0) > (value2 || 0),
      largerEqual: (value1, value2) => (value1 || 0) >= (value2 || 0),
      smaller: (value1, value2) => (value1 || 0) < (value2 || 0),
      smallerEqual: (value1, value2) => (value1 || 0) <= (value2 || 0),
      startsWith: (value1, value2) => value1.startsWith(value2),
      notStartsWith: (value1, value2) => !value1.startsWith(value2),
      regex: (value1, value2) => {
        const regexMatch = (value2 || "").toString().match(new RegExp("^/(.*?)/([gimusy]*)$"));
        let regex;
        if (!regexMatch) {
          regex = new RegExp((value2 || "").toString());
        } else if (regexMatch.length === 1) {
          regex = new RegExp(regexMatch[1]);
        } else {
          regex = new RegExp(regexMatch[1], regexMatch[2]);
        }
        return !!(value1 || "").toString().match(regex);
      },
      notRegex: (value1, value2) => {
        const regexMatch = (value2 || "").toString().match(new RegExp("^/(.*?)/([gimusy]*)$"));
        let regex;
        if (!regexMatch) {
          regex = new RegExp((value2 || "").toString());
        } else if (regexMatch.length === 1) {
          regex = new RegExp(regexMatch[1]);
        } else {
          regex = new RegExp(regexMatch[1], regexMatch[2]);
        }
        return !(value1 || "").toString().match(regex);
      }
    };
    const convertDateTime = (value) => {
      let returnValue = void 0;
      if (typeof value === "string") {
        returnValue = new Date(value).getTime();
      } else if (typeof value === "number") {
        returnValue = value;
      }
      if (value instanceof Date) {
        returnValue = value.getTime();
      }
      if (returnValue === void 0 || isNaN(returnValue)) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The value "${value}" is not a valid DateTime.`
        );
      }
      return returnValue;
    };
    const checkIndexRange = (index) => {
      if (index < 0 || index >= returnData.length) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The ouput ${index} is not allowed. It has to be between 0 and ${returnData.length - 1}!`
        );
      }
    };
    itemLoop: for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        item = items[itemIndex];
        mode = this.getNodeParameter("mode", itemIndex);
        if (mode === "expression") {
          outputIndex = this.getNodeParameter("output", itemIndex);
          checkIndexRange(outputIndex);
          returnData[outputIndex].push(item);
        } else if (mode === "rules") {
          const dataType = this.getNodeParameter("dataType", 0);
          let value1 = this.getNodeParameter("value1", itemIndex);
          if (dataType === "dateTime") {
            value1 = convertDateTime(value1);
          }
          for (ruleData of this.getNodeParameter(
            "rules.rules",
            itemIndex,
            []
          )) {
            let value2 = ruleData.value2;
            if (dataType === "dateTime") {
              value2 = convertDateTime(value2);
            }
            compareOperationResult = compareOperationFunctions[ruleData.operation](
              value1,
              value2
            );
            if (compareOperationResult) {
              checkIndexRange(ruleData.output);
              returnData[ruleData.output].push(item);
              continue itemLoop;
            }
          }
          outputIndex = this.getNodeParameter("fallbackOutput", itemIndex);
          if (outputIndex !== -1) {
            checkIndexRange(outputIndex);
            returnData[outputIndex].push(item);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData[0].push({ json: { error: error.message } });
          continue;
        }
        throw error;
      }
    }
    return returnData;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SwitchV1
});
//# sourceMappingURL=SwitchV1.node.js.map