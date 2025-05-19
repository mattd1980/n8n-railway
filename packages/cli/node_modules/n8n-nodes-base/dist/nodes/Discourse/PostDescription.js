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
var PostDescription_exports = {};
__export(PostDescription_exports, {
  postFields: () => postFields,
  postOperations: () => postOperations
});
module.exports = __toCommonJS(PostDescription_exports);
const postOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    description: "Choose an operation",
    required: true,
    displayOptions: {
      show: {
        resource: ["post"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a post",
        action: "Create a post"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a post",
        action: "Get a post"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many posts",
        action: "Get many posts"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a post",
        action: "Update a post"
      }
    ],
    default: "create"
  }
];
const postFields = [
  /* -------------------------------------------------------------------------- */
  /*                                post:create                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Title",
    name: "title",
    type: "string",
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["create"]
      }
    },
    default: "",
    description: "Title of the post"
  },
  {
    displayName: "Content",
    name: "content",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["create"]
      }
    },
    default: "",
    description: "Content of the post"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["post"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Category Name or ID",
        name: "category",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getCategories"
        },
        default: "",
        description: 'ID of the category. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Reply To Post Number",
        name: "reply_to_post_number",
        type: "string",
        default: "",
        description: "The number of the post to reply to"
      },
      {
        displayName: "Topic ID",
        name: "topic_id",
        type: "string",
        default: "",
        description: "ID of the topic"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                post:get                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Post ID",
    name: "postId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["get"]
      }
    },
    default: "",
    description: "ID of the post"
  },
  /* -------------------------------------------------------------------------- */
  /*                                post:getAll                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["post"],
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
        resource: ["post"],
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
  /* -------------------------------------------------------------------------- */
  /*                                post:update                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Post ID",
    name: "postId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["update"]
      }
    },
    default: "",
    description: "ID of the post"
  },
  {
    displayName: "Content",
    name: "content",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["update"]
      }
    },
    default: "",
    description: "Content of the post. HTML is supported."
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Edit Reason",
        name: "edit_reason",
        type: "string",
        default: ""
      },
      {
        displayName: "Cooked",
        name: "cooked",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  postFields,
  postOperations
});
//# sourceMappingURL=PostDescription.js.map