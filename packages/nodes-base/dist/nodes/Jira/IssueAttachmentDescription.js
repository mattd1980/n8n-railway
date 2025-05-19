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
var IssueAttachmentDescription_exports = {};
__export(IssueAttachmentDescription_exports, {
  issueAttachmentFields: () => issueAttachmentFields,
  issueAttachmentOperations: () => issueAttachmentOperations
});
module.exports = __toCommonJS(IssueAttachmentDescription_exports);
const issueAttachmentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["issueAttachment"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add attachment to issue",
        action: "Add an attachment to an issue"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an attachment",
        action: "Get an attachment from an issue"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many attachments",
        action: "Get many issue attachments"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove an attachment",
        action: "Remove an attachment from an issue"
      }
    ],
    default: "add"
  }
];
const issueAttachmentFields = [
  /* -------------------------------------------------------------------------- */
  /*                                issueAttachment:add                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Issue Key",
    name: "issueKey",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["add"]
      }
    },
    default: ""
  },
  {
    displayName: "Input Binary Field",
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["add"]
      }
    },
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    hint: "The name of the input binary field containing the file to be written",
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                issueAttachment:get                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Attachment ID",
    name: "attachmentId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["get"]
      }
    },
    default: "",
    description: "The ID of the attachment"
  },
  {
    displayName: "Download",
    name: "download",
    type: "boolean",
    default: false,
    required: true,
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Put Output File in Field",
    name: "binaryProperty",
    type: "string",
    default: "data",
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["get"],
        download: [true]
      }
    },
    hint: "The name of the output binary field to put the file in",
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                issueAttachment:getAll                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Issue Key",
    name: "issueKey",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["getAll"]
      }
    },
    default: ""
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["getAll"]
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
        resource: ["issueAttachment"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  },
  {
    displayName: "Download",
    name: "download",
    type: "boolean",
    default: false,
    required: true,
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Put Output File in Field",
    name: "binaryProperty",
    type: "string",
    default: "data",
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["getAll"],
        download: [true]
      }
    },
    hint: "The name of the output binary field to put the file in",
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                issueAttachment:remove                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Attachment ID",
    name: "attachmentId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["issueAttachment"],
        operation: ["remove"]
      }
    },
    default: "",
    description: "The ID of the attachment"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  issueAttachmentFields,
  issueAttachmentOperations
});
//# sourceMappingURL=IssueAttachmentDescription.js.map