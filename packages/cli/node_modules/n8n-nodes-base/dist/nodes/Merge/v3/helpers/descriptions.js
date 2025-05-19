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
var descriptions_exports = {};
__export(descriptions_exports, {
  clashHandlingProperties: () => clashHandlingProperties,
  fuzzyCompareProperty: () => fuzzyCompareProperty,
  numberInputsProperty: () => numberInputsProperty
});
module.exports = __toCommonJS(descriptions_exports);
const fuzzyCompareProperty = {
  displayName: "Fuzzy Compare",
  name: "fuzzyCompare",
  type: "boolean",
  default: false,
  description: "Whether to tolerate small type differences when comparing fields. E.g. the number 3 and the string '3' are treated as the same."
};
const numberInputsProperty = {
  displayName: "Number of Inputs",
  name: "numberInputs",
  type: "options",
  noDataExpression: true,
  default: 2,
  options: [
    {
      name: "2",
      value: 2
    },
    {
      name: "3",
      value: 3
    },
    {
      name: "4",
      value: 4
    },
    {
      name: "5",
      value: 5
    },
    {
      name: "6",
      value: 6
    },
    {
      name: "7",
      value: 7
    },
    {
      name: "8",
      value: 8
    },
    {
      name: "9",
      value: 9
    },
    {
      name: "10",
      value: 10
    }
  ],
  validateType: "number",
  description: "The number of data inputs you want to merge. The node waits for all connected inputs to be executed."
};
const clashHandlingProperties = {
  displayName: "Clash Handling",
  name: "clashHandling",
  type: "fixedCollection",
  default: {
    values: { resolveClash: "preferLast", mergeMode: "deepMerge", overrideEmpty: false }
  },
  options: [
    {
      displayName: "Values",
      name: "values",
      values: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "When Field Values Clash",
          name: "resolveClash",
          // eslint-disable-next-line n8n-nodes-base/node-param-description-missing-from-dynamic-options
          type: "options",
          default: "",
          typeOptions: {
            loadOptionsMethod: "getResolveClashOptions",
            loadOptionsDependsOn: ["numberInputs"]
          }
        },
        {
          displayName: "Merging Nested Fields",
          name: "mergeMode",
          type: "options",
          default: "deepMerge",
          options: [
            {
              name: "Deep Merge",
              value: "deepMerge",
              description: "Merge at every level of nesting"
            },
            {
              name: "Shallow Merge",
              value: "shallowMerge",
              description: "Merge at the top level only (all nested fields will come from the same input)"
            }
          ],
          hint: "How to merge when there are sub-fields below the top-level ones",
          displayOptions: {
            show: {
              resolveClash: [{ _cnd: { not: "addSuffix" } }]
            }
          }
        },
        {
          displayName: "Minimize Empty Fields",
          name: "overrideEmpty",
          type: "boolean",
          default: false,
          description: "Whether to override the preferred input version for a field if it is empty and the other version isn't. Here 'empty' means undefined, null or an empty string.",
          displayOptions: {
            show: {
              resolveClash: [{ _cnd: { not: "addSuffix" } }]
            }
          }
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clashHandlingProperties,
  fuzzyCompareProperty,
  numberInputsProperty
});
//# sourceMappingURL=descriptions.js.map