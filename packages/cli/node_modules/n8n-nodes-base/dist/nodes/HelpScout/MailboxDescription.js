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
var MailboxDescription_exports = {};
__export(MailboxDescription_exports, {
  mailboxFields: () => mailboxFields,
  mailboxOperations: () => mailboxOperations
});
module.exports = __toCommonJS(MailboxDescription_exports);
const mailboxOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["mailbox"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get data of a mailbox",
        action: "Get a mailbox"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many mailboxes",
        action: "Get many mailboxes"
      }
    ],
    default: "get"
  }
];
const mailboxFields = [
  /* -------------------------------------------------------------------------- */
  /*                                mailbox:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Mailbox ID",
    name: "mailboxId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["mailbox"],
        operation: ["get"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                mailbox:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["mailbox"]
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
        resource: ["mailbox"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1
    },
    default: 50,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mailboxFields,
  mailboxOperations
});
//# sourceMappingURL=MailboxDescription.js.map