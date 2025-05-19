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
var TeamMemberDescription_exports = {};
__export(TeamMemberDescription_exports, {
  teamMemberFields: () => teamMemberFields,
  teamMemberOperations: () => teamMemberOperations
});
module.exports = __toCommonJS(TeamMemberDescription_exports);
const teamMemberOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["teamMember"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add a member to a team",
        action: "Add a team member"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many team members",
        action: "Get many team members"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove a member from a team",
        action: "Remove a team member"
      }
    ],
    default: "add"
  }
];
const teamMemberFields = [
  // ----------------------------------------
  //            teamMember: add
  // ----------------------------------------
  {
    displayName: "User Name or ID",
    name: "userId",
    description: 'User to add to a team. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "options",
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    displayOptions: {
      show: {
        resource: ["teamMember"],
        operation: ["add"]
      }
    }
  },
  {
    displayName: "Team Name or ID",
    name: "teamId",
    description: 'Team to add the user to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "options",
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        resource: ["teamMember"],
        operation: ["add"]
      }
    }
  },
  // ----------------------------------------
  //            teamMember: remove
  // ----------------------------------------
  {
    displayName: "User Name or ID",
    name: "memberId",
    description: 'User to remove from the team. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "options",
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    displayOptions: {
      show: {
        resource: ["teamMember"],
        operation: ["remove"]
      }
    }
  },
  {
    displayName: "Team Name or ID",
    name: "teamId",
    description: 'Team to remove the user from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    type: "options",
    required: true,
    default: "",
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        resource: ["teamMember"],
        operation: ["remove"]
      }
    }
  },
  // ----------------------------------------
  //            teamMember: getAll
  // ----------------------------------------
  {
    displayName: "Team Name or ID",
    name: "teamId",
    description: 'Team to retrieve all members from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    type: "options",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["teamMember"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["teamMember"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["teamMember"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  teamMemberFields,
  teamMemberOperations
});
//# sourceMappingURL=TeamMemberDescription.js.map