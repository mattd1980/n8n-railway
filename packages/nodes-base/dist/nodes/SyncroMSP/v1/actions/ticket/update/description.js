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
var description_exports = {};
__export(description_exports, {
  ticketUpdateDescription: () => ticketUpdateDescription
});
module.exports = __toCommonJS(description_exports);
const ticketUpdateDescription = [
  {
    displayName: "Ticket ID",
    name: "ticketId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["update"]
      }
    },
    default: ""
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["update"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Asset ID",
        name: "assetId",
        type: "string",
        default: ""
      },
      {
        displayName: "Assign to Contact",
        name: "contactId",
        type: "string",
        default: "",
        description: "The ID of the contact you want to assign the ticket to"
      },
      {
        displayName: "Customer ID",
        name: "customerId",
        type: "string",
        default: ""
      },
      {
        displayName: "Due Date",
        name: "dueDate",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Issue Type",
        name: "issueType",
        type: "options",
        options: [
          {
            name: "Contract Work",
            value: "Contract Work"
          },
          {
            name: "Network Project",
            value: "Network Project"
          },
          {
            name: "Other",
            value: "Other"
          },
          {
            name: "Regular Maintenance",
            value: "Regular Maintenance"
          },
          {
            name: "Remote Support",
            value: "Remote Support"
          }
        ],
        default: ""
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        options: [
          {
            name: "Customer Reply",
            value: "Customer Reply"
          },
          {
            name: "In Progress",
            value: "In Progress"
          },
          {
            name: "New",
            value: "New"
          },
          {
            name: "Resolved",
            value: "Resolved"
          },
          {
            name: "Scheduled",
            value: "Scheduled"
          },
          {
            name: "Waiting for Parts",
            value: "Waiting for Parts"
          },
          {
            name: "Waiting on Customer",
            value: "Waiting on Customer"
          }
        ],
        default: "New"
      },
      {
        displayName: "Subject",
        name: "subject",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ticketUpdateDescription
});
//# sourceMappingURL=description.js.map