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
var PlaylistItemDescription_exports = {};
__export(PlaylistItemDescription_exports, {
  playlistItemFields: () => playlistItemFields,
  playlistItemOperations: () => playlistItemOperations
});
module.exports = __toCommonJS(PlaylistItemDescription_exports);
const playlistItemOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["playlistItem"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add an item to a playlist",
        action: "Add a playlist item"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a item from a playlist",
        action: "Delete a playlist item"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a playlist's item",
        action: "Get a playlist item"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many playlist items",
        action: "Get many playlist items"
      }
    ],
    default: "add"
  }
];
const playlistItemFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 playlistItem:add                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Playlist Name or ID",
    name: "playlistId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getPlaylists"
    },
    required: true,
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["playlistItem"]
      }
    },
    default: ""
  },
  {
    displayName: "Video ID",
    name: "videoId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["playlistItem"]
      }
    },
    default: ""
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        operation: ["add"],
        resource: ["playlistItem"]
      }
    },
    options: [
      {
        displayName: "End At",
        name: "endAt",
        type: "dateTime",
        default: "",
        description: "The time, measured in seconds from the start of the video, when the video should stop playing"
      },
      {
        displayName: "Note",
        name: "note",
        type: "string",
        default: "",
        description: "A user-generated note for this item. The property value has a maximum length of 280 characters."
      },
      {
        displayName: "On Behalf Of Content Owner",
        name: "onBehalfOfContentOwner",
        type: "string",
        default: "",
        description: "The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value"
      },
      {
        displayName: "Position",
        name: "position",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: "",
        description: "The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth."
      },
      {
        displayName: "Start At",
        name: "startAt",
        type: "dateTime",
        default: "",
        description: "The time, measured in seconds from the start of the video, when the video should start playing"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 playlistItem:get                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Playlist Item ID",
    name: "playlistItemId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["playlistItem"]
      }
    },
    default: ""
  },
  {
    displayName: "Fields",
    name: "part",
    type: "multiOptions",
    options: [
      {
        name: "*",
        value: "*"
      },
      {
        name: "Content Details",
        value: "contentDetails"
      },
      {
        name: "ID",
        value: "id"
      },
      {
        name: "Snippet",
        value: "snippet"
      },
      {
        name: "Status",
        value: "status"
      }
    ],
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["playlistItem"]
      }
    },
    description: "The fields parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include",
    default: ["*"]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["playlistItem"]
      }
    },
    options: [
      {
        displayName: "On Behalf Of Content Owner",
        name: "onBehalfOfContentOwner",
        type: "string",
        default: "",
        description: "The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 playlistItem:delete                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Playlist Item ID",
    name: "playlistItemId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["playlistItem"]
      }
    },
    default: ""
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["playlistItem"]
      }
    },
    options: [
      {
        displayName: "On Behalf Of Content Owner",
        name: "onBehalfOfContentOwner",
        type: "string",
        default: "",
        description: "The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 playlistItem:getAll                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Playlist Name or ID",
    name: "playlistId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getPlaylists"
    },
    required: true,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["playlistItem"]
      }
    },
    default: ""
  },
  {
    displayName: "Fields",
    name: "part",
    type: "multiOptions",
    options: [
      {
        name: "*",
        value: "*"
      },
      {
        name: "Content Details",
        value: "contentDetails"
      },
      {
        name: "ID",
        value: "id"
      },
      {
        name: "Snippet",
        value: "snippet"
      },
      {
        name: "Status",
        value: "status"
      }
    ],
    required: true,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["playlistItem"]
      }
    },
    description: "The fields parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include",
    default: ["*"]
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["playlistItem"]
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
        resource: ["playlistItem"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 50
    },
    default: 25,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["playlistItem"]
      }
    },
    options: [
      {
        displayName: "On Behalf Of Content Owner",
        name: "onBehalfOfContentOwner",
        type: "string",
        default: "",
        description: "The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  playlistItemFields,
  playlistItemOperations
});
//# sourceMappingURL=PlaylistItemDescription.js.map