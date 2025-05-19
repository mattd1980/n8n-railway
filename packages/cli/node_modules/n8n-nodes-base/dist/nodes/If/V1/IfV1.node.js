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
var IfV1_node_exports = {};
__export(IfV1_node_exports, {
  IfV1: () => IfV1
});
module.exports = __toCommonJS(IfV1_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
class IfV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      version: 1,
      defaults: {
        name: "If",
        color: "#408000"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main, import_n8n_workflow.NodeConnectionTypes.Main],
      outputNames: ["true", "false"],
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
          displayName: "Combine",
          name: "combineOperation",
          type: "options",
          options: [
            {
              name: "ALL",
              description: 'Only if all conditions are met it goes into "true" branch',
              value: "all"
            },
            {
              name: "ANY",
              description: 'If any of the conditions is met it goes into "true" branch',
              value: "any"
            }
          ],
          default: "all",
          description: "If multiple rules got set this settings decides if it is true as soon as ANY condition matches or only if ALL get meet"
        }
      ]
    };
  }
  async execute() {
    const returnDataTrue = [];
    const returnDataFalse = [];
    const items = this.getInputData();
    let item;
    let combineOperation;
    const isDateObject = (value) => Object.prototype.toString.call(value) === "[object Date]";
    const isDateInvalid = (value) => value?.toString() === "Invalid Date";
    const compareOperationFunctions = {
      after: (value12, value22) => (value12 || 0) > (value22 || 0),
      before: (value12, value22) => (value12 || 0) < (value22 || 0),
      contains: (value12, value22) => (value12 || "").toString().includes((value22 || "").toString()),
      notContains: (value12, value22) => !(value12 || "").toString().includes((value22 || "").toString()),
      endsWith: (value12, value22) => value12.endsWith(value22),
      notEndsWith: (value12, value22) => !value12.endsWith(value22),
      equal: (value12, value22) => value12 === value22,
      notEqual: (value12, value22) => value12 !== value22,
      larger: (value12, value22) => (value12 || 0) > (value22 || 0),
      largerEqual: (value12, value22) => (value12 || 0) >= (value22 || 0),
      smaller: (value12, value22) => (value12 || 0) < (value22 || 0),
      smallerEqual: (value12, value22) => (value12 || 0) <= (value22 || 0),
      startsWith: (value12, value22) => value12.startsWith(value22),
      notStartsWith: (value12, value22) => !value12.startsWith(value22),
      isEmpty: (value12) => [void 0, null, "", NaN].includes(value12) || (typeof value12 === "object" && value12 !== null && !isDateObject(value12) ? Object.entries(value12).length === 0 : false) || isDateObject(value12) && isDateInvalid(value12),
      isNotEmpty: (value12) => !([void 0, null, "", NaN].includes(value12) || (typeof value12 === "object" && value12 !== null && !isDateObject(value12) ? Object.entries(value12).length === 0 : false) || isDateObject(value12) && isDateInvalid(value12)),
      regex: (value12, value22) => {
        const regexMatch = (value22 || "").toString().match(new RegExp("^/(.*?)/([gimusy]*)$"));
        let regex;
        if (!regexMatch) {
          regex = new RegExp((value22 || "").toString());
        } else if (regexMatch.length === 1) {
          regex = new RegExp(regexMatch[1]);
        } else {
          regex = new RegExp(regexMatch[1], regexMatch[2]);
        }
        return !!(value12 || "").toString().match(regex);
      },
      notRegex: (value12, value22) => {
        const regexMatch = (value22 || "").toString().match(new RegExp("^/(.*?)/([gimusy]*)$"));
        let regex;
        if (!regexMatch) {
          regex = new RegExp((value22 || "").toString());
        } else if (regexMatch.length === 1) {
          regex = new RegExp(regexMatch[1]);
        } else {
          regex = new RegExp(regexMatch[1], regexMatch[2]);
        }
        return !(value12 || "").toString().match(regex);
      }
    };
    const convertDateTime = (value) => {
      let returnValue = void 0;
      if (typeof value === "string") {
        returnValue = new Date(value).getTime();
      } else if (typeof value === "number") {
        returnValue = value;
      }
      if (import_moment_timezone.default.isMoment(value)) {
        returnValue = value.unix();
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
    const dataTypes = ["boolean", "dateTime", "number", "string"];
    let dataType;
    let compareOperationResult;
    let value1, value2;
    itemLoop: for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      item = items[itemIndex];
      let compareData;
      combineOperation = this.getNodeParameter("combineOperation", itemIndex);
      for (dataType of dataTypes) {
        for (compareData of this.getNodeParameter(
          `conditions.${dataType}`,
          itemIndex,
          []
        )) {
          value1 = compareData.value1;
          value2 = compareData.value2;
          if (dataType === "dateTime") {
            value1 = convertDateTime(value1);
            value2 = convertDateTime(value2);
          }
          compareOperationResult = compareOperationFunctions[compareData.operation](
            value1,
            value2
          );
          if (compareOperationResult && combineOperation === "any") {
            returnDataTrue.push(item);
            continue itemLoop;
          } else if (!compareOperationResult && combineOperation === "all") {
            returnDataFalse.push(item);
            continue itemLoop;
          }
        }
      }
      if (combineOperation === "all") {
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
  IfV1
});
//# sourceMappingURL=IfV1.node.js.map