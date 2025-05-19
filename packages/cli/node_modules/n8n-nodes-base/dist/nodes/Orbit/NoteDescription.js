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
var NoteDescription_exports = {};
__export(NoteDescription_exports, {
  noteFields: () => noteFields,
  noteOperations: () => noteOperations
});
module.exports = __toCommonJS(NoteDescription_exports);
const noteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["note"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a note",
        action: "Create a note"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many notes for a member",
        action: "Get many notes"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a note",
        action: "Update a note"
      }
    ],
    default: "create"
  }
];
const noteFields = [
  /* -------------------------------------------------------------------------- */
  /*                                note:create                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Workspace Name or ID",
    name: "workspaceId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getWorkspaces"
    },
    default: "Deprecated",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Member ID",
    name: "memberId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Note",
    name: "note",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["create"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                note:getAll                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Workspace Name or ID",
    name: "workspaceId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getWorkspaces"
    },
    default: "Deprecated",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Member ID",
    name: "memberId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["note"]
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
        resource: ["note"],
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
    displayName: "Resolve Member",
    name: "resolveMember",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["note"]
      }
    },
    default: false
  },
  /* -------------------------------------------------------------------------- */
  /*                                note:update                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Workspace Name or ID",
    name: "workspaceId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getWorkspaces"
    },
    default: "Deprecated",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Member ID",
    name: "memberId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Note ID",
    name: "noteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Note",
    name: "note",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["update"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  noteFields,
  noteOperations
});
//# sourceMappingURL=NoteDescription.js.map