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
var RoomMemberDescription_exports = {};
__export(RoomMemberDescription_exports, {
  roomMemberFields: () => roomMemberFields,
  roomMemberOperations: () => roomMemberOperations
});
module.exports = __toCommonJS(RoomMemberDescription_exports);
const roomMemberOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["roomMember"]
      }
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many members",
        action: "Get many room members"
      }
    ],
    default: "getAll"
  }
];
const roomMemberFields = [
  /* -------------------------------------------------------------------------- */
  /*                             roomMember:getAll                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Room Name or ID",
    name: "roomId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getChannels"
    },
    displayOptions: {
      show: {
        resource: ["roomMember"],
        operation: ["getAll"]
      }
    },
    default: "",
    required: true
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    displayOptions: {
      show: {
        resource: ["roomMember"],
        operation: ["getAll"]
      }
    },
    default: {},
    description: "Filtering options",
    placeholder: "Add filter",
    options: [
      {
        displayName: "Exclude Membership",
        name: "notMembership",
        type: "options",
        default: "",
        description: "Excludes members whose membership is other than selected (uses OR filter with membership)",
        options: [
          {
            name: "Any",
            value: "",
            description: "Any user membership"
          },
          {
            name: "Ban",
            value: "ban",
            description: "Users removed from the room"
          },
          {
            name: "Invite",
            value: "invite",
            description: "Users invited to join"
          },
          {
            name: "Join",
            value: "join",
            description: "Users currently in the room"
          },
          {
            name: "Leave",
            value: "leave",
            description: "Users who left"
          }
        ]
      },
      {
        displayName: "Membership",
        name: "membership",
        type: "options",
        default: "",
        description: "Only fetch users with selected membership status (uses OR filter with exclude membership)",
        options: [
          {
            name: "Any",
            value: "",
            description: "Any user membership"
          },
          {
            name: "Ban",
            value: "ban",
            description: "Users removed from the room"
          },
          {
            name: "Invite",
            value: "invite",
            description: "Users invited to join"
          },
          {
            name: "Join",
            value: "join",
            description: "Users currently in the room"
          },
          {
            name: "Leave",
            value: "leave",
            description: "Users who left"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  roomMemberFields,
  roomMemberOperations
});
//# sourceMappingURL=RoomMemberDescription.js.map