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
var BoardDescription_exports = {};
__export(BoardDescription_exports, {
  boardFields: () => boardFields,
  boardOperations: () => boardOperations
});
module.exports = __toCommonJS(BoardDescription_exports);
const boardOperations = [
  // ----------------------------------
  //         board
  // ----------------------------------
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["board"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new board",
        action: "Create a board"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a board",
        action: "Delete a board"
      },
      {
        name: "Get",
        value: "get",
        description: "Get the data of a board",
        action: "Get a board"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a board",
        action: "Update a board"
      }
    ],
    default: "create"
  }
];
const boardFields = [
  // ----------------------------------
  //         board:create
  // ----------------------------------
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    placeholder: "My board",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["board"]
      }
    },
    description: "The name of the board"
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["board"]
      }
    },
    description: "The description of the board"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["board"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Aging",
        name: "prefs_cardAging",
        type: "options",
        options: [
          {
            name: "Pirate",
            value: "pirate"
          },
          {
            name: "Regular",
            value: "regular"
          }
        ],
        default: "regular",
        description: "Determines the type of card aging that should take place on the board if card aging is enabled"
      },
      {
        displayName: "Background",
        name: "prefs_background",
        type: "string",
        default: "blue",
        description: "The ID of a custom background or one of: blue, orange, green, red, purple, pink, lime, sky, grey"
      },
      {
        displayName: "Comments",
        name: "prefs_comments",
        type: "options",
        options: [
          {
            name: "Disabled",
            value: "disabled"
          },
          {
            name: "Members",
            value: "members"
          },
          {
            name: "Observers",
            value: "observers"
          },
          {
            name: "Organization",
            value: "org"
          },
          {
            name: "Public",
            value: "public"
          }
        ],
        default: "members",
        description: "Who can comment on cards on this board"
      },
      {
        displayName: "Covers",
        name: "prefs_cardCovers",
        type: "boolean",
        default: true,
        description: "Whether card covers are enabled"
      },
      {
        displayName: "Invitations",
        name: "prefs_invitations",
        type: "options",
        options: [
          {
            name: "Admins",
            value: "admins"
          },
          {
            name: "Members",
            value: "members"
          }
        ],
        default: "members",
        description: "Determines what types of members can invite users to join"
      },
      {
        displayName: "Keep From Source",
        name: "keepFromSource",
        type: "string",
        default: "none",
        description: "To keep cards from the original board pass in the value cards"
      },
      {
        displayName: "Labels",
        name: "defaultLabels",
        type: "boolean",
        default: true,
        description: "Whether to use the default set of labels"
      },
      {
        displayName: "Lists",
        name: "defaultLists",
        type: "boolean",
        default: true,
        description: "Whether to add the default set of lists to a board(To Do, Doing, Done).It is ignored if idBoardSource is provided"
      },
      {
        displayName: "Organization ID",
        name: "idOrganization",
        type: "string",
        default: "",
        description: "The ID or name of the team the board should belong to"
      },
      {
        displayName: "Permission Level",
        name: "prefs_permissionLevel",
        type: "options",
        options: [
          {
            name: "Organization",
            value: "org"
          },
          {
            name: "Private",
            value: "private"
          },
          {
            name: "Public",
            value: "public"
          }
        ],
        default: "private",
        description: "The permissions level of the board"
      },
      {
        displayName: "Power Ups",
        name: "powerUps",
        type: "options",
        options: [
          {
            name: "All",
            value: "all"
          },
          {
            name: "Calendar",
            value: "calendar"
          },
          {
            name: "Card Aging",
            value: "cardAging"
          },
          {
            name: "Recap",
            value: "recap"
          },
          {
            name: "Voting",
            value: "voting"
          }
        ],
        default: "all",
        description: "The Power-Ups that should be enabled on the new board"
      },
      {
        displayName: "Self Join",
        name: "prefs_selfJoin",
        type: "boolean",
        default: true,
        description: "Whether users can join the boards themselves or whether they have to be invited"
      },
      {
        displayName: "Source IDs",
        name: "idBoardSource",
        type: "string",
        default: "",
        description: "The ID of a board to copy into the new board"
      },
      {
        displayName: "Voting",
        name: "prefs_voting",
        type: "options",
        options: [
          {
            name: "Disabled",
            value: "disabled"
          },
          {
            name: "Members",
            value: "members"
          },
          {
            name: "Observers",
            value: "observers"
          },
          {
            name: "Organization",
            value: "org"
          },
          {
            name: "Public",
            value: "public"
          }
        ],
        default: "disabled",
        description: "Who can vote on this board"
      }
    ]
  },
  {
    displayName: "Board",
    name: "id",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    required: true,
    displayOptions: {
      show: {
        operation: ["get", "delete", "update"],
        resource: ["board"]
      }
    },
    description: "The ID of the board",
    modes: [
      {
        displayName: "From List",
        name: "list",
        type: "list",
        placeholder: "Select a Board...",
        initType: "board",
        typeOptions: {
          searchListMethod: "searchBoards",
          searchFilterRequired: true,
          searchable: true
        }
      },
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        placeholder: "https://trello.com/b/e123456/board-name",
        validation: [
          {
            type: "regex",
            properties: {
              regex: "http(s)?://trello.com/b/([a-zA-Z0-9]{2,})/.*",
              errorMessage: "Not a valid Trello Board URL"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: "https://trello.com/b/([a-zA-Z0-9]{2,})"
        }
      },
      {
        displayName: "ID",
        name: "id",
        type: "string",
        validation: [
          {
            type: "regex",
            properties: {
              regex: "[a-zA-Z0-9]{2,}",
              errorMessage: "Not a valid Trello Board ID"
            }
          }
        ],
        placeholder: "KdEAAdde",
        url: "=https://trello.com/b/{{$value}}"
      }
    ]
  },
  // ----------------------------------
  //         board:get
  // ----------------------------------
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["board"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "all",
        description: 'Fields to return. Either "all" or a comma-separated list: closed, dateLastActivity, dateLastView, desc, descData, idOrganization, invitations, invited, labelNames, memberships, name, pinned, powerUps, prefs, shortLink, shortUrl, starred, subscribed, URL.'
      },
      {
        displayName: "Plugin Data",
        name: "pluginData",
        type: "boolean",
        default: false,
        description: "Whether to include pluginData on the card with the response"
      }
    ]
  },
  // ----------------------------------
  //         board:update
  // ----------------------------------
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["board"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Closed",
        name: "closed",
        type: "boolean",
        default: false,
        description: "Whether the board is closed"
      },
      {
        displayName: "Description",
        name: "desc",
        type: "string",
        default: "",
        description: "New description of the board"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "New name of the board"
      },
      {
        displayName: "Organization ID",
        name: "idOrganization",
        type: "string",
        default: "",
        description: "The ID of the team the board should be moved to"
      },
      {
        displayName: "Subscribed",
        name: "subscribed",
        type: "boolean",
        default: false,
        description: "Whether the acting user is subscribed to the board"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  boardFields,
  boardOperations
});
//# sourceMappingURL=BoardDescription.js.map