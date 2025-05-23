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
var ChannelDescription_exports = {};
__export(ChannelDescription_exports, {
  channelFields: () => channelFields,
  channelOperations: () => channelOperations
});
module.exports = __toCommonJS(ChannelDescription_exports);
const channelOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["channel"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a channel",
        action: "Create a channel"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a channel",
        action: "Delete a channel"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a channel",
        action: "Get a channel"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many channels",
        action: "Get many channels"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a channel",
        action: "Update a channel"
      }
    ],
    default: "create"
  }
];
const channelFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 channel:create                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "teamId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channel"]
      }
    },
    default: ""
  },
  {
    displayName: "Name",
    name: "name",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channel"]
      }
    },
    default: "",
    description: "Channel name as it will appear to the user in Microsoft Teams"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["channel"]
      }
    },
    default: {},
    placeholder: "Add Field",
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "Channel's description"
      },
      {
        displayName: "Type",
        name: "type",
        type: "options",
        options: [
          {
            name: "Private",
            value: "private"
          },
          {
            name: "Standard",
            value: "standard"
          }
        ],
        default: "standard",
        description: "The type of the channel"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 channel:delete                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "teamId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["channel"]
      }
    },
    default: ""
  },
  {
    displayName: "Channel Name or ID",
    name: "channelId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getChannels",
      loadOptionsDependsOn: ["teamId"]
    },
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["channel"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 channel:get                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "teamId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["channel"]
      }
    },
    default: ""
  },
  {
    displayName: "Channel Name or ID",
    name: "channelId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getChannels",
      loadOptionsDependsOn: ["teamId"]
    },
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["channel"]
      }
    },
    default: ""
  },
  /* -------------------------------------------------------------------------- */
  /*                                 channel:getAll                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "teamId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["channel"]
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
        operation: ["getAll"],
        resource: ["channel"]
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
        resource: ["channel"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 50,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 channel:update                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "teamId",
    required: true,
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["channel"]
      }
    },
    default: ""
  },
  {
    displayName: "Channel Name or ID",
    name: "channelId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getChannels",
      loadOptionsDependsOn: ["teamId"]
    },
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["channel"]
      }
    },
    default: ""
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["channel"]
      }
    },
    default: {},
    placeholder: "Add Field",
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Channel name as it will appear to the user in Microsoft Teams"
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "Channel's description"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelFields,
  channelOperations
});
//# sourceMappingURL=ChannelDescription.js.map