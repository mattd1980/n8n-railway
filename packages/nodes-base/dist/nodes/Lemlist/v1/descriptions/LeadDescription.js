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
var LeadDescription_exports = {};
__export(LeadDescription_exports, {
  leadFields: () => leadFields,
  leadOperations: () => leadOperations
});
module.exports = __toCommonJS(LeadDescription_exports);
const leadOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "create",
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a lead"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a lead"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a lead"
      },
      {
        name: "Unsubscribe",
        value: "unsubscribe",
        action: "Unsubscribe a lead"
      }
    ],
    displayOptions: {
      show: {
        resource: ["lead"]
      }
    }
  }
];
const leadFields = [
  // ----------------------------------
  //        lead: create
  // ----------------------------------
  {
    displayName: "Campaign Name or ID",
    name: "campaignId",
    type: "options",
    required: true,
    default: [],
    typeOptions: {
      loadOptionsMethod: "getCampaigns"
    },
    description: 'ID of the campaign to create the lead under. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    description: "Email of the lead to create",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Company Name",
        name: "companyName",
        type: "string",
        default: "",
        description: "Company name of the lead to create"
      },
      {
        displayName: "Deduplicate",
        name: "deduplicate",
        type: "boolean",
        default: false,
        description: "Whether to do not insert if this email is already present in another campaign"
      },
      {
        displayName: "First Name",
        name: "firstName",
        type: "string",
        default: "",
        description: "First name of the lead to create"
      },
      {
        displayName: "Last Name",
        name: "lastName",
        type: "string",
        default: "",
        description: "Last name of the lead to create"
      },
      {
        displayName: "Icebreaker",
        name: "icebreaker",
        type: "string",
        default: "",
        description: "Icebreaker of the lead to create"
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        default: "",
        description: "Phone number of the lead to create"
      },
      {
        displayName: "Picture URL",
        name: "picture",
        type: "string",
        default: "",
        description: "Picture URL of the lead to create"
      },
      {
        displayName: "LinkedIn URL",
        name: "linkedinUrl",
        type: "string",
        default: "",
        description: "LinkedIn URL of the lead to create"
      }
    ]
  },
  // ----------------------------------
  //        lead: delete
  // ----------------------------------
  {
    displayName: "Campaign Name or ID",
    name: "campaignId",
    type: "options",
    required: true,
    default: [],
    typeOptions: {
      loadOptionsMethod: "getCampaigns"
    },
    description: 'ID of the campaign to remove the lead from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["delete"]
      }
    }
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    description: "Email of the lead to delete",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------
  //           lead: get
  // ----------------------------------
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    description: "Email of the lead to retrieve",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //        lead: unsubscribe
  // ----------------------------------
  {
    displayName: "Campaign Name or ID",
    name: "campaignId",
    type: "options",
    required: true,
    default: [],
    typeOptions: {
      loadOptionsMethod: "getCampaigns"
    },
    description: 'ID of the campaign to unsubscribe the lead from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["unsubscribe"]
      }
    }
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    description: "Email of the lead to unsubscribe",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["unsubscribe"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  leadFields,
  leadOperations
});
//# sourceMappingURL=LeadDescription.js.map