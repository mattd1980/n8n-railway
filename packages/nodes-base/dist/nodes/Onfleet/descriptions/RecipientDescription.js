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
var RecipientDescription_exports = {};
__export(RecipientDescription_exports, {
  recipientExternalField: () => recipientExternalField,
  recipientFields: () => recipientFields,
  recipientOperations: () => recipientOperations
});
module.exports = __toCommonJS(RecipientDescription_exports);
const recipientOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["recipient"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new Onfleet recipient",
        action: "Create a recipient"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a specific Onfleet recipient",
        action: "Get a recipient"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an Onfleet recipient",
        action: "Update a recipient"
      }
    ],
    default: "get"
  }
];
const additionalRecipientFields = [
  {
    displayName: "Recipient Notes",
    name: "recipientNotes",
    type: "string",
    default: "",
    description: "Notes for this recipient: these are global notes that should not be task- or destination-specific"
  },
  {
    displayName: "Skip Recipient SMS Notifications",
    name: "recipientSkipSMSNotifications",
    type: "boolean",
    default: false,
    description: "Whether this recipient has requested to skip SMS notifications"
  }
];
const recipientName = {
  displayName: "Recipient Name",
  name: "recipientName",
  type: "string",
  description: "The recipient's complete name",
  default: ""
};
const recipientPhone = {
  displayName: "Recipient Phone",
  name: "recipientPhone",
  type: "string",
  description: "A unique, valid phone number as per the organization's country if there's no leading + sign. If a phone number has a leading + sign, it will disregard the organization's country setting.",
  default: ""
};
const updateFields = [
  {
    ...recipientName,
    required: false
  },
  {
    displayName: "Recipient Notes",
    name: "notes",
    type: "string",
    default: "",
    description: "Notes for this recipient: these are global notes that should not be task- or destination-specific"
  },
  {
    ...recipientPhone,
    required: false
  },
  {
    displayName: "Skip Recipient SMS Notifications",
    name: "skipSMSNotifications",
    type: "boolean",
    default: false,
    description: "Whether this recipient has requested to skip SMS notifications"
  }
];
const recipientExternalField = {
  displayName: "Recipient",
  name: "recipient",
  type: "fixedCollection",
  placeholder: "Add Recipient",
  default: {},
  options: [
    {
      displayName: "Recipient Properties",
      name: "recipientProperties",
      default: {},
      values: [
        {
          ...recipientName,
          required: true
        },
        {
          ...recipientPhone,
          required: true
        },
        ...additionalRecipientFields
      ]
    }
  ]
};
const recipientFields = [
  {
    displayName: "Get By",
    name: "getBy",
    type: "options",
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["get"]
      }
    },
    options: [
      {
        name: "ID",
        value: "id"
      },
      {
        name: "Phone",
        value: "phone"
      },
      {
        name: "Name",
        value: "name"
      }
    ],
    description: "The variable that is used for looking up a recipient",
    required: true,
    default: "id"
  },
  {
    displayName: "Recipient ID",
    name: "id",
    type: "string",
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["get"],
        getBy: ["id"]
      }
    },
    default: "",
    required: true,
    description: "The ID of the recipient object for lookup"
  },
  {
    displayName: "Recipient ID",
    name: "id",
    type: "string",
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["update"]
      }
    },
    default: "",
    required: true,
    description: "The ID of the recipient object for lookup"
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["get"],
        getBy: ["name"]
      }
    },
    default: "",
    required: true,
    description: "The name of the recipient for lookup"
  },
  {
    displayName: "Phone",
    name: "phone",
    type: "string",
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["get"],
        getBy: ["phone"]
      }
    },
    default: "",
    required: true,
    description: "The phone of the recipient for lookup"
  },
  {
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["create"]
      }
    },
    ...recipientName,
    required: true
  },
  {
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["create"]
      }
    },
    ...recipientPhone,
    required: true
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["create"]
      }
    },
    options: additionalRecipientFields
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Update Fields",
    default: {},
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["update"]
      }
    },
    options: updateFields
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["recipient"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Skip Recipient Phone Number Validation",
        name: "recipientSkipPhoneNumberValidation",
        type: "boolean",
        default: false,
        description: "Whether to skip validation for this recipient's phone number"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  recipientExternalField,
  recipientFields,
  recipientOperations
});
//# sourceMappingURL=RecipientDescription.js.map