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
var filter_description_exports = {};
__export(filter_description_exports, {
  genericFiltersCollection: () => genericFiltersCollection,
  sortCollection: () => sortCollection
});
module.exports = __toCommonJS(filter_description_exports);
const field = [
  {
    displayName: "Field",
    name: "field",
    type: "string",
    default: "",
    requiresDataPath: "single",
    description: "Dot notation is also supported, e.g. customFields.field1",
    displayOptions: {
      hide: {
        "/resource": ["alert", "case", "comment", "task", "observable", "log", "page"]
      }
    }
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Field",
    name: "field",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "loadAlertFields"
    },
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    displayOptions: {
      show: {
        "/resource": ["alert"]
      }
    }
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Field",
    name: "field",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "loadCaseFields"
    },
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    displayOptions: {
      show: {
        "/resource": ["case"]
      }
    }
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Field",
    name: "field",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "loadTaskFields"
    },
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    displayOptions: {
      show: {
        "/resource": ["task"]
      }
    }
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Field",
    name: "field",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "loadObservableFields"
    },
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    displayOptions: {
      show: {
        "/resource": ["observable"]
      }
    }
  },
  {
    displayName: "Field",
    name: "field",
    type: "options",
    default: "",
    options: [
      {
        name: "Message",
        value: "message"
      },
      {
        name: "Date",
        value: "date"
      }
    ],
    displayOptions: {
      show: {
        "/resource": ["log"]
      }
    }
  },
  {
    displayName: "Field",
    name: "field",
    type: "options",
    default: "",
    options: [
      {
        name: "Message",
        value: "message"
      }
    ],
    displayOptions: {
      show: {
        "/resource": ["comment"]
      }
    }
  },
  {
    displayName: "Field",
    name: "field",
    type: "options",
    default: "",
    options: [
      {
        name: "Category",
        value: "category"
      },
      {
        name: "Content",
        value: "content"
      },
      {
        name: "Title",
        value: "title"
      }
    ],
    displayOptions: {
      show: {
        "/resource": ["page"]
      }
    }
  }
];
const genericFiltersCollection = {
  displayName: "Filters",
  name: "filters",
  type: "fixedCollection",
  placeholder: "Add Filter",
  default: {},
  typeOptions: {
    multipleValues: true
  },
  options: [
    {
      displayName: "Values",
      name: "values",
      values: [
        ...field,
        {
          displayName: "Operator",
          name: "operator",
          type: "options",
          options: [
            {
              name: "Between",
              value: "_between",
              description: "Field is between two values ('From' is inclusive, 'To' is exclusive)"
            },
            {
              name: "Contains",
              value: "_like",
              description: "Field contains the substring from value"
            },
            {
              name: "Ends With",
              value: "_endsWith",
              description: "Field ends with value"
            },
            {
              name: "Equal",
              value: "_eq",
              description: "Field is equal to value"
            },
            {
              name: "Greater Than",
              value: "_gt",
              description: "Field is greater than value"
            },
            {
              name: "Greater Than Or Equal To",
              value: "_gte",
              description: "Field is greater than or equal to value"
            },
            {
              name: "In",
              value: "_in",
              description: "Field is one of the values"
            },
            {
              name: "Less Than",
              value: "_lt",
              description: "Field is less than value"
            },
            {
              name: "Less Than Or Equal To",
              value: "_lte",
              description: "Field is less than or equal to value"
            },
            {
              name: "Match Word",
              value: "_match",
              description: "Field contains the value as a word"
            },
            {
              name: "Not Equal",
              value: "_ne",
              description: "Field is not equal to value"
            },
            {
              name: "Starts With",
              value: "_startsWith",
              description: "Field starts with value"
            }
          ],
          default: "_eq"
        },
        {
          displayName: "Value",
          name: "value",
          type: "string",
          default: "",
          displayOptions: {
            hide: {
              operator: ["_between", "_in"]
            }
          }
        },
        {
          displayName: "Values",
          name: "values",
          type: "string",
          default: "",
          description: "Comma-separated list of values",
          placeholder: "e.g. value1,value2",
          displayOptions: {
            show: {
              operator: ["_in"]
            }
          }
        },
        {
          displayName: "From",
          name: "from",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              operator: ["_between"]
            }
          }
        },
        {
          displayName: "To",
          name: "to",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              operator: ["_between"]
            }
          }
        }
      ]
    }
  ]
};
const sortCollection = {
  displayName: "Sort",
  name: "sort",
  type: "fixedCollection",
  placeholder: "Add Sort Rule",
  default: {},
  typeOptions: {
    multipleValues: true
  },
  options: [
    {
      displayName: "Fields",
      name: "fields",
      values: [
        ...field,
        {
          displayName: "Direction",
          name: "direction",
          type: "options",
          options: [
            {
              name: "Ascending",
              value: "asc"
            },
            {
              name: "Descending",
              value: "desc"
            }
          ],
          default: "asc"
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  genericFiltersCollection,
  sortCollection
});
//# sourceMappingURL=filter.description.js.map