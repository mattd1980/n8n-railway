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
var CardCommentDescription_exports = {};
__export(CardCommentDescription_exports, {
  cardCommentFields: () => cardCommentFields,
  cardCommentOperations: () => cardCommentOperations
});
module.exports = __toCommonJS(CardCommentDescription_exports);
const cardCommentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["cardComment"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a comment on a card",
        action: "Create a card comment"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a comment from a card",
        action: "Delete a card comment"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a comment on a card",
        action: "Update a card comment"
      }
    ],
    default: "create"
  }
];
const cardCommentFields = [
  {
    displayName: "Card",
    name: "cardId",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    required: true,
    modes: [
      {
        displayName: "From List",
        name: "list",
        type: "list",
        placeholder: "Select a Card...",
        typeOptions: {
          searchListMethod: "searchCards",
          searchFilterRequired: true,
          searchable: true
        }
      },
      {
        displayName: "By URL",
        name: "url",
        type: "string",
        placeholder: "https://trello.com/c/e123456/card-name",
        validation: [
          {
            type: "regex",
            properties: {
              regex: "http(s)?://trello.com/c/([a-zA-Z0-9]{2,})/.*",
              errorMessage: "Not a valid Trello Card URL"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: "https://trello.com/c/([a-zA-Z0-9]{2,})"
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
              errorMessage: "Not a valid Trello Card ID"
            }
          }
        ],
        placeholder: "wiIaGwqE",
        url: "=https://trello.com/c/{{$value}}"
      }
    ],
    displayOptions: {
      show: {
        operation: ["update", "delete", "create"],
        resource: ["cardComment"]
      }
    },
    description: "The ID of the card"
  },
  // ----------------------------------
  //         cardComment:create
  // ----------------------------------
  {
    displayName: "Text",
    name: "text",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["cardComment"]
      }
    },
    description: "Text of the comment"
  },
  // ----------------------------------
  //         cardComment:remove
  // ----------------------------------
  {
    displayName: "Comment ID",
    name: "commentId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["cardComment"]
      }
    },
    description: "The ID of the comment to delete"
  },
  // ----------------------------------
  //         cardComment:update
  // ----------------------------------
  {
    displayName: "Comment ID",
    name: "commentId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["cardComment"]
      }
    },
    description: "The ID of the comment to delete"
  },
  {
    displayName: "Text",
    name: "text",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["cardComment"]
      }
    },
    description: "Text of the comment"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cardCommentFields,
  cardCommentOperations
});
//# sourceMappingURL=CardCommentDescription.js.map