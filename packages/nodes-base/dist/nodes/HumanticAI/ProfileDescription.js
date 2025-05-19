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
var ProfileDescription_exports = {};
__export(ProfileDescription_exports, {
  profileFields: () => profileFields,
  profileOperations: () => profileOperations
});
module.exports = __toCommonJS(ProfileDescription_exports);
const profileOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["profile"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a profile",
        action: "Create a profile"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a profile",
        action: "Get a profile"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a profile",
        action: "Update a profile"
      }
    ],
    default: "create"
  }
];
const profileFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 profile:create                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["profile"]
      }
    },
    description: "The LinkedIn profile URL or email ID for creating a Humantic profile. If you are sending the resume, this should be a unique string."
  },
  {
    displayName: "Send Resume",
    name: "sendResume",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["profile"]
      }
    },
    description: "Whether to send a resume for a resume based analysis"
  },
  {
    displayName: "Input Binary Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["profile"],
        sendResume: [true]
      }
    },
    hint: "The name of the input binary field containing the resume in PDF or DOCX format"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 profile:get                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["profile"]
      }
    },
    description: "This value is the same as the User ID that was provided when the analysis was created. This could be a LinkedIn URL, email ID, or a unique string in case of resume based analysis."
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["profile"]
      }
    },
    options: [
      {
        displayName: "Persona",
        name: "persona",
        type: "multiOptions",
        options: [
          {
            name: "Sales",
            value: "sales"
          },
          {
            name: "Hiring",
            value: "hiring"
          }
        ],
        default: [],
        description: "Fetch the Humantic profile of the user for a particular persona type. Multiple persona values can be supported using comma as a delimiter."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 profile:update                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["profile"]
      }
    },
    description: "This value is the same as the User ID that was provided when the analysis was created. Currently only supported for profiles created using LinkedIn URL."
  },
  {
    displayName: "Send Resume",
    name: "sendResume",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["profile"]
      }
    },
    description: "Whether to send a resume for a resume of the user"
  },
  {
    displayName: "Text",
    name: "text",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["profile"],
        sendResume: [false]
      }
    },
    description: "Additional text written by the user"
  },
  {
    displayName: "Input Binary Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["profile"],
        sendResume: [true]
      }
    },
    hint: "The name of the input binary field containing the resume in PDF or DOCX format"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  profileFields,
  profileOperations
});
//# sourceMappingURL=ProfileDescription.js.map