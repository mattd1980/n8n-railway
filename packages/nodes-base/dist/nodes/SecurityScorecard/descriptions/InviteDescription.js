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
var InviteDescription_exports = {};
__export(InviteDescription_exports, {
  inviteFields: () => inviteFields,
  inviteOperations: () => inviteOperations
});
module.exports = __toCommonJS(InviteDescription_exports);
const inviteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    required: true,
    displayOptions: {
      show: {
        resource: ["invite"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an invite for a company/user",
        action: "Create an invite"
      }
    ],
    default: "create"
  }
];
const inviteFields = [
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["invite"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "First Name",
    name: "firstName",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["invite"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Last Name",
    name: "lastName",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["invite"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Message",
    name: "message",
    description: "Message for the invitee",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["invite"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["invite"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Days to Resolve Issue",
        description: "Minimum days to resolve a scorecard issue",
        name: "days_to_resolve_issue",
        type: "number",
        default: 0
      },
      {
        displayName: "Domain",
        description: "Invitee company domain",
        name: "domain",
        type: "string",
        default: ""
      },
      {
        displayName: "Grade to Maintain",
        description: "Request the invitee's organisation to maintain a minimum grade",
        name: "grade_to_maintain",
        type: "string",
        default: ""
      },
      {
        displayName: "Is Organisation Point of Contact",
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "Is the invitee organisation's point of contact",
        name: "is_organization_point_of_contact",
        type: "boolean",
        default: false
      },
      {
        displayName: "Issue Description",
        name: "issue_desc",
        type: "string",
        default: ""
      },
      {
        displayName: "Issue Title",
        name: "issue_title",
        type: "string",
        default: ""
      },
      {
        displayName: "Issue Type",
        name: "issue_type",
        type: "string",
        default: ""
      },
      {
        displayName: "Send Me a Copy",
        name: "sendme_copy",
        description: "Whether to send a copy of the invite to the requesting user",
        type: "boolean",
        default: false
      },
      {
        displayName: "Target URL",
        name: "target_url",
        type: "string",
        description: "Optional URL to take the invitee to when arriving to the platform",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  inviteFields,
  inviteOperations
});
//# sourceMappingURL=InviteDescription.js.map