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
var TagSubscriberDescription_exports = {};
__export(TagSubscriberDescription_exports, {
  tagSubscriberFields: () => tagSubscriberFields,
  tagSubscriberOperations: () => tagSubscriberOperations
});
module.exports = __toCommonJS(TagSubscriberDescription_exports);
const tagSubscriberOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["tagSubscriber"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a tag to a subscriber",
        action: "Add a tag to a subscriber"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "List subscriptions to a tag including subscriber data",
        action: "Get many tag subscriptions"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a tag from a subscriber",
        action: "Delete a tag from a subscriber"
      }
    ],
    default: "create"
  }
];
const tagSubscriberFields = [
  {
    displayName: "Tag Name or ID",
    name: "tagId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTags"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["tagSubscriber"],
        operation: ["add", "getAll", "delete"]
      }
    },
    default: ""
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    displayOptions: {
      show: {
        resource: ["tagSubscriber"],
        operation: ["add", "delete"]
      }
    },
    default: "",
    description: "Subscriber email address"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["tagSubscriber"],
        operation: ["add"]
      }
    },
    options: [
      {
        displayName: "Custom Fields",
        name: "fields",
        placeholder: "Add Custom Field",
        description: "Object of key/value pairs for custom fields (the custom field must exist before you can use it here)",
        type: "fixedCollection",
        typeOptions: {
          multipleValues: true
        },
        default: {},
        options: [
          {
            name: "field",
            displayName: "Custom Field",
            values: [
              {
                displayName: "Field Key",
                name: "key",
                type: "string",
                default: "",
                placeholder: "last_name",
                description: "The field's key"
              },
              {
                displayName: "Field Value",
                name: "value",
                type: "string",
                default: "",
                placeholder: "Doe",
                description: "Value of the field"
              }
            ]
          }
        ]
      },
      {
        displayName: "First Name",
        name: "firstName",
        type: "string",
        default: "",
        description: "Subscriber first name"
      }
    ]
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["tagSubscriber"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["tagSubscriber"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["tagSubscriber"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Subscriber State",
        name: "subscriberState",
        type: "options",
        options: [
          {
            name: "Active",
            value: "active"
          },
          {
            name: "Cancelled",
            value: "cancelled"
          }
        ],
        default: "active"
      }
    ],
    description: "Receive only active subscribers or cancelled subscribers"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tagSubscriberFields,
  tagSubscriberOperations
});
//# sourceMappingURL=TagSubscriberDescription.js.map