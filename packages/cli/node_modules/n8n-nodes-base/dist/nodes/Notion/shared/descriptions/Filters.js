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
var Filters_exports = {};
__export(Filters_exports, {
  filters: () => filters
});
module.exports = __toCommonJS(Filters_exports);
const filters = (conditions) => [
  {
    displayName: "Property Name or ID",
    name: "key",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getFilterProperties",
      loadOptionsDependsOn: ["datatabaseId"]
    },
    default: "",
    description: 'The name of the property to filter by. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Type",
    name: "type",
    type: "hidden",
    default: '={{$parameter["&key"].split("|")[1]}}'
  },
  ...conditions,
  {
    displayName: "Title",
    name: "titleValue",
    type: "string",
    displayOptions: {
      show: {
        type: ["title"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: ""
  },
  {
    displayName: "Text",
    name: "richTextValue",
    type: "string",
    displayOptions: {
      show: {
        type: ["rich_text"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: ""
  },
  {
    displayName: "Phone Number",
    name: "phoneNumberValue",
    type: "string",
    displayOptions: {
      show: {
        type: ["phone_number"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: "",
    description: "Phone number. No structure is enforced."
  },
  {
    displayName: "Option Name or ID",
    name: "multiSelectValue",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getPropertySelectValues"
    },
    displayOptions: {
      show: {
        type: ["multi_select"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: []
  },
  {
    displayName: "Option Name or ID",
    name: "selectValue",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getPropertySelectValues"
    },
    displayOptions: {
      show: {
        type: ["select"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: ""
  },
  {
    displayName: "Status Name or ID",
    name: "statusValue",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getPropertySelectValues"
    },
    displayOptions: {
      show: {
        type: ["status"]
      }
    },
    default: "",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
  },
  {
    displayName: "Email",
    name: "emailValue",
    type: "string",
    displayOptions: {
      show: {
        type: ["email"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: ""
  },
  {
    displayName: "URL",
    name: "urlValue",
    type: "string",
    displayOptions: {
      show: {
        type: ["url"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: ""
  },
  {
    displayName: "User Name or ID",
    name: "peopleValue",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    displayOptions: {
      show: {
        type: ["people"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: "",
    description: 'List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "User Name or ID",
    name: "createdByValue",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    displayOptions: {
      show: {
        type: ["created_by"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: "",
    description: 'List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "User Name or ID",
    name: "lastEditedByValue",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    displayOptions: {
      show: {
        type: ["last_edited_by"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: "",
    description: 'List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Relation ID",
    name: "relationValue",
    type: "string",
    displayOptions: {
      show: {
        type: ["relation"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: ""
  },
  {
    displayName: "Checked",
    name: "checkboxValue",
    displayOptions: {
      show: {
        type: ["checkbox"]
      }
    },
    type: "boolean",
    default: false,
    description: "Whether or not the checkbox is checked. <code>true</code> represents checked. <code>false</code> represents unchecked"
  },
  {
    displayName: "Number",
    name: "numberValue",
    displayOptions: {
      show: {
        type: ["number"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    type: "number",
    default: 0,
    description: "Number value"
  },
  {
    displayName: "Date",
    name: "date",
    displayOptions: {
      show: {
        type: ["date"]
      },
      hide: {
        condition: [
          "is_empty",
          "is_not_empty",
          "past_week",
          "past_month",
          "past_year",
          "next_week",
          "next_month",
          "next_year"
        ]
      }
    },
    type: "dateTime",
    default: "",
    description: "An ISO 8601 format date, with optional time"
  },
  {
    displayName: "Created Time",
    name: "createdTimeValue",
    displayOptions: {
      show: {
        type: ["created_time"]
      },
      hide: {
        condition: [
          "is_empty",
          "is_not_empty",
          "past_week",
          "past_month",
          "past_year",
          "next_week",
          "next_month",
          "next_year"
        ]
      }
    },
    type: "dateTime",
    default: "",
    description: "An ISO 8601 format date, with optional time"
  },
  {
    displayName: "Last Edited Time",
    name: "lastEditedTime",
    displayOptions: {
      show: {
        type: ["last_edited_time"]
      },
      hide: {
        condition: [
          "is_empty",
          "is_not_empty",
          "past_week",
          "past_month",
          "past_year",
          "next_week",
          "next_month",
          "next_year"
        ]
      }
    },
    type: "dateTime",
    default: "",
    description: "An ISO 8601 format date, with optional time"
  },
  //formula types
  {
    displayName: "Number",
    name: "numberValue",
    displayOptions: {
      show: {
        type: ["formula"],
        returnType: ["number"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    type: "number",
    default: 0,
    description: "Number value"
  },
  {
    displayName: "Text",
    name: "textValue",
    type: "string",
    displayOptions: {
      show: {
        type: ["formula"],
        returnType: ["text"]
      },
      hide: {
        condition: ["is_empty", "is_not_empty"]
      }
    },
    default: ""
  },
  {
    displayName: "Boolean",
    name: "checkboxValue",
    displayOptions: {
      show: {
        type: ["formula"],
        returnType: ["checkbox"]
      }
    },
    type: "boolean",
    default: false,
    description: "Whether or not the checkbox is checked. <code>true</code> represents checked. <code>false</code> represents unchecked"
  },
  {
    displayName: "Date",
    name: "dateValue",
    displayOptions: {
      show: {
        type: ["formula"],
        returnType: ["date"]
      },
      hide: {
        condition: [
          "is_empty",
          "is_not_empty",
          "past_week",
          "past_month",
          "past_year",
          "next_week",
          "next_month",
          "next_year"
        ]
      }
    },
    type: "dateTime",
    default: "",
    description: "An ISO 8601 format date, with optional time"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filters
});
//# sourceMappingURL=Filters.js.map