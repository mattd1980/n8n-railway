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
var PostCommentDescription_exports = {};
__export(PostCommentDescription_exports, {
  postCommentFields: () => postCommentFields,
  postCommentOperations: () => postCommentOperations
});
module.exports = __toCommonJS(PostCommentDescription_exports);
const postCommentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "create",
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a top-level comment in a post",
        action: "Create a comment in a post"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many comments in a post",
        action: "Get many comments in a post"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Remove a comment from a post",
        action: "Delete a comment from a post"
      },
      {
        name: "Reply",
        value: "reply",
        description: "Write a reply to a comment in a post",
        action: "Reply to a comment in a post"
      }
    ],
    displayOptions: {
      show: {
        resource: ["postComment"]
      }
    }
  }
];
const postCommentFields = [
  // ----------------------------------
  //        postComment: create
  // ----------------------------------
  {
    displayName: "Post ID",
    name: "postId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the post to write the comment to. Found in the post URL: <code>/r/[subreddit_name]/comments/[post_id]/[post_title]</code>",
    placeholder: "l0me7x",
    displayOptions: {
      show: {
        resource: ["postComment"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Comment Text",
    name: "commentText",
    type: "string",
    required: true,
    default: "",
    description: "Text of the comment. Markdown supported.",
    displayOptions: {
      show: {
        resource: ["postComment"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------
  //        postComment: getAll
  // ----------------------------------
  {
    displayName: "Subreddit",
    name: "subreddit",
    type: "string",
    required: true,
    default: "",
    description: "The name of subreddit where the post is",
    displayOptions: {
      show: {
        resource: ["postComment"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Post ID",
    name: "postId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the post to get all comments from. Found in the post URL: <code>/r/[subreddit_name]/comments/[post_id]/[post_title]</code>",
    placeholder: "l0me7x",
    displayOptions: {
      show: {
        resource: ["postComment"],
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
        resource: ["postComment"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 100,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        resource: ["postComment"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------
  //        postComment: delete
  // ----------------------------------
  {
    displayName: "Comment ID",
    name: "commentId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the comment to remove. Found in the comment URL:<code>/r/[subreddit_name]/comments/[post_id]/[post_title]/[comment_id]</code>",
    placeholder: "gla7fmt",
    displayOptions: {
      show: {
        resource: ["postComment"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------
  //        postComment: reply
  // ----------------------------------
  {
    displayName: "Comment ID",
    name: "commentId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the comment to reply to. To be found in the comment URL: <code>www.reddit.com/r/[subreddit_name]/comments/[post_id]/[post_title]/[comment_id]</code>",
    placeholder: "gl9iroa",
    displayOptions: {
      show: {
        resource: ["postComment"],
        operation: ["reply"]
      }
    }
  },
  {
    displayName: "Reply Text",
    name: "replyText",
    type: "string",
    required: true,
    default: "",
    description: "Text of the reply. Markdown supported.",
    displayOptions: {
      show: {
        resource: ["postComment"],
        operation: ["reply"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  postCommentFields,
  postCommentOperations
});
//# sourceMappingURL=PostCommentDescription.js.map