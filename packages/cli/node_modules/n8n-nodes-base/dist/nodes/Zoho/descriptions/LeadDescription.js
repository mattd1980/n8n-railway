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
var import_SharedFields = require("./SharedFields");
const leadOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["lead"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a lead",
        action: "Create a lead"
      },
      {
        name: "Create or Update",
        value: "upsert",
        description: "Create a new record, or update the current one if it already exists (upsert)",
        action: "Create or update a lead"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a lead",
        action: "Delete a lead"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a lead",
        action: "Get a lead"
      },
      {
        name: "Get Fields",
        value: "getFields",
        description: "Get lead fields",
        action: "Get lead fields"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many leads",
        action: "Get many leads"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a lead",
        action: "Update a lead"
      }
    ],
    default: "create"
  }
];
const leadFields = [
  // ----------------------------------------
  //             lead: create
  // ----------------------------------------
  {
    displayName: "Company",
    name: "Company",
    description: "Company at which the lead works",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Last Name",
    name: "lastName",
    type: "string",
    required: true,
    default: "",
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
      import_SharedFields.address,
      {
        displayName: "Annual Revenue",
        name: "Annual_Revenue",
        type: "number",
        default: "",
        description: "Annual revenue of the lead\u2019s company"
      },
      {
        displayName: "Currency",
        name: "Currency",
        type: "options",
        default: "USD",
        description: "Symbol of the currency in which revenue is generated",
        options: import_SharedFields.currencies
      },
      (0, import_SharedFields.makeCustomFieldsFixedCollection)("lead"),
      {
        displayName: "Description",
        name: "Description",
        type: "string",
        default: ""
      },
      {
        displayName: "Designation",
        name: "Designation",
        type: "string",
        default: "",
        description: "Position of the lead at their company"
      },
      {
        displayName: "Email",
        name: "Email",
        type: "string",
        default: ""
      },
      {
        displayName: "Email Opt Out",
        name: "Email_Opt_Out",
        type: "boolean",
        default: false
      },
      {
        displayName: "Fax",
        name: "Fax",
        type: "string",
        default: ""
      },
      {
        displayName: "First Name",
        name: "First_Name",
        type: "string",
        default: ""
      },
      {
        displayName: "Full Name",
        name: "Full_Name",
        type: "string",
        default: ""
      },
      {
        displayName: "Industry",
        name: "Industry",
        type: "string",
        default: "",
        description: "Industry to which the lead belongs"
      },
      {
        displayName: "Industry Type",
        name: "Industry_Type",
        type: "string",
        default: "",
        description: "Type of industry to which the lead belongs"
      },
      {
        displayName: "Lead Source",
        name: "Lead_Source",
        type: "string",
        default: "",
        description: "Source from which the lead was created"
      },
      {
        displayName: "Lead Status",
        name: "Lead_Status",
        type: "string",
        default: ""
      },
      {
        displayName: "Mobile",
        name: "Mobile",
        type: "string",
        default: ""
      },
      {
        displayName: "Number of Employees",
        name: "No_of_Employees",
        type: "number",
        default: "",
        description: "Number of employees in the lead\u2019s company"
      },
      {
        displayName: "Phone",
        name: "Phone",
        type: "string",
        default: ""
      },
      {
        displayName: "Salutation",
        name: "Salutation",
        type: "string",
        default: ""
      },
      {
        displayName: "Secondary Email",
        name: "Secondary_Email",
        type: "string",
        default: ""
      },
      {
        displayName: "Skype ID",
        name: "Skype_ID",
        type: "string",
        default: ""
      },
      {
        displayName: "Twitter",
        name: "Twitter",
        type: "string",
        default: ""
      },
      {
        displayName: "Website",
        name: "Website",
        type: "string",
        default: ""
      }
    ]
  },
  // ----------------------------------------
  //             lead: upsert
  // ----------------------------------------
  {
    displayName: "Company",
    name: "Company",
    description: "Company at which the lead works",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["upsert"]
      }
    }
  },
  {
    displayName: "Last Name",
    name: "lastName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["upsert"]
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
        operation: ["upsert"]
      }
    },
    options: [
      import_SharedFields.address,
      {
        displayName: "Annual Revenue",
        name: "Annual_Revenue",
        type: "number",
        default: "",
        description: "Annual revenue of the lead\u2019s company"
      },
      {
        displayName: "Currency",
        name: "Currency",
        type: "options",
        default: "USD",
        description: "Symbol of the currency in which revenue is generated",
        options: import_SharedFields.currencies
      },
      (0, import_SharedFields.makeCustomFieldsFixedCollection)("lead"),
      {
        displayName: "Description",
        name: "Description",
        type: "string",
        default: ""
      },
      {
        displayName: "Designation",
        name: "Designation",
        type: "string",
        default: "",
        description: "Position of the lead at their company"
      },
      {
        displayName: "Email",
        name: "Email",
        type: "string",
        default: "",
        description: "Email of the lead. If a record with this email exists it will be updated, otherwise a new one will be created."
      },
      {
        displayName: "Email Opt Out",
        name: "Email_Opt_Out",
        type: "boolean",
        default: false
      },
      {
        displayName: "Fax",
        name: "Fax",
        type: "string",
        default: ""
      },
      {
        displayName: "First Name",
        name: "First_Name",
        type: "string",
        default: ""
      },
      {
        displayName: "Full Name",
        name: "Full_Name",
        type: "string",
        default: ""
      },
      {
        displayName: "Industry",
        name: "Industry",
        type: "string",
        default: "",
        description: "Industry to which the lead belongs"
      },
      {
        displayName: "Industry Type",
        name: "Industry_Type",
        type: "string",
        default: "",
        description: "Type of industry to which the lead belongs"
      },
      {
        displayName: "Lead Source",
        name: "Lead_Source",
        type: "string",
        default: "",
        description: "Source from which the lead was created"
      },
      {
        displayName: "Lead Status",
        name: "Lead_Status",
        type: "string",
        default: ""
      },
      {
        displayName: "Mobile",
        name: "Mobile",
        type: "string",
        default: ""
      },
      {
        displayName: "Number of Employees",
        name: "No_of_Employees",
        type: "number",
        default: "",
        description: "Number of employees in the lead\u2019s company"
      },
      {
        displayName: "Phone",
        name: "Phone",
        type: "string",
        default: ""
      },
      {
        displayName: "Salutation",
        name: "Salutation",
        type: "string",
        default: ""
      },
      {
        displayName: "Secondary Email",
        name: "Secondary_Email",
        type: "string",
        default: ""
      },
      {
        displayName: "Skype ID",
        name: "Skype_ID",
        type: "string",
        default: ""
      },
      {
        displayName: "Twitter",
        name: "Twitter",
        type: "string",
        default: ""
      },
      {
        displayName: "Website",
        name: "Website",
        type: "string",
        default: ""
      }
    ]
  },
  // ----------------------------------------
  //               lead: delete
  // ----------------------------------------
  {
    displayName: "Lead ID",
    name: "leadId",
    description: "ID of the lead to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                lead: get
  // ----------------------------------------
  {
    displayName: "Lead ID",
    name: "leadId",
    description: "ID of the lead to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //               lead: getAll
  // ----------------------------------------
  ...(0, import_SharedFields.makeGetAllFields)("lead"),
  // ----------------------------------------
  //               lead: update
  // ----------------------------------------
  {
    displayName: "Lead ID",
    name: "leadId",
    description: "ID of the lead to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["update"]
      }
    },
    options: [
      import_SharedFields.address,
      {
        displayName: "Annual Revenue",
        name: "Annual_Revenue",
        type: "number",
        default: "",
        description: "Annual revenue of the lead\u2019s company"
      },
      {
        displayName: "Company",
        name: "Company",
        type: "string",
        default: "",
        description: "Company at which the lead works"
      },
      {
        displayName: "Currency",
        name: "Currency",
        type: "options",
        default: "USD",
        description: "Symbol of the currency in which revenue is generated",
        options: import_SharedFields.currencies
      },
      (0, import_SharedFields.makeCustomFieldsFixedCollection)("lead"),
      {
        displayName: "Description",
        name: "Description",
        type: "string",
        default: ""
      },
      {
        displayName: "Designation",
        name: "Designation",
        type: "string",
        default: "",
        description: "Position of the lead at their company"
      },
      {
        displayName: "Email",
        name: "Email",
        type: "string",
        default: ""
      },
      {
        displayName: "Email Opt Out",
        name: "Email_Opt_Out",
        type: "boolean",
        default: false
      },
      {
        displayName: "Fax",
        name: "Fax",
        type: "string",
        default: ""
      },
      {
        displayName: "First Name",
        name: "First_Name",
        type: "string",
        default: ""
      },
      {
        displayName: "Full Name",
        name: "Full_Name",
        type: "string",
        default: ""
      },
      {
        displayName: "Industry",
        name: "Industry",
        type: "string",
        default: "",
        description: "Industry to which the lead belongs"
      },
      {
        displayName: "Industry Type",
        name: "Industry_Type",
        type: "string",
        default: "",
        description: "Type of industry to which the lead belongs"
      },
      {
        displayName: "Last Name",
        name: "Last_Name",
        type: "string",
        default: ""
      },
      {
        displayName: "Lead Source",
        name: "Lead_Source",
        type: "string",
        default: "",
        description: "Source from which the lead was created"
      },
      {
        displayName: "Lead Status",
        name: "Lead_Status",
        type: "string",
        default: ""
      },
      {
        displayName: "Mobile",
        name: "Mobile",
        type: "string",
        default: ""
      },
      {
        displayName: "Number of Employees",
        name: "No_of_Employees",
        type: "number",
        default: "",
        description: "Number of employees in the lead\u2019s company"
      },
      {
        displayName: "Phone",
        name: "Phone",
        type: "string",
        default: ""
      },
      {
        displayName: "Salutation",
        name: "Salutation",
        type: "string",
        default: ""
      },
      {
        displayName: "Secondary Email",
        name: "Secondary_Email",
        type: "string",
        default: ""
      },
      {
        displayName: "Skype ID",
        name: "Skype_ID",
        type: "string",
        default: ""
      },
      {
        displayName: "Twitter",
        name: "Twitter",
        type: "string",
        default: ""
      },
      {
        displayName: "Website",
        name: "Website",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  leadFields,
  leadOperations
});
//# sourceMappingURL=LeadDescription.js.map