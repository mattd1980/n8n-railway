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
var MediaDescription_exports = {};
__export(MediaDescription_exports, {
  mediaFields: () => mediaFields,
  mediaOperations: () => mediaOperations
});
module.exports = __toCommonJS(MediaDescription_exports);
const mediaOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["media"]
      }
    },
    options: [
      {
        name: "Upload",
        value: "upload",
        description: "Send media to a chat room",
        action: "Upload media to a chatroom"
      }
    ],
    default: "upload"
  }
];
const mediaFields = [
  /* -------------------------------------------------------------------------- */
  /*                               media:upload                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Room Name or ID",
    name: "roomId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getChannels"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["media"],
        operation: ["upload"]
      }
    },
    description: 'Room ID to post. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    required: true
  },
  {
    displayName: "Input Binary Field",
    name: "binaryPropertyName",
    type: "string",
    default: "data",
    required: true,
    hint: "The name of the input binary field containing the file to be uploaded",
    displayOptions: {
      show: {
        resource: ["media"],
        operation: ["upload"]
      }
    }
  },
  {
    displayName: "Media Type",
    name: "mediaType",
    type: "options",
    default: "image",
    displayOptions: {
      show: {
        resource: ["media"],
        operation: ["upload"]
      }
    },
    options: [
      {
        name: "File",
        value: "file",
        description: "General file"
      },
      {
        name: "Image",
        value: "image",
        description: "Image media type"
      },
      {
        name: "Audio",
        value: "audio",
        description: "Audio media type"
      },
      {
        name: "Video",
        value: "video",
        description: "Video media type"
      }
    ],
    description: "Type of file being uploaded",
    placeholder: "mxc://matrix.org/uploaded-media-uri",
    required: true
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["media"],
        operation: ["upload"]
      }
    },
    options: [
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "",
        description: "Name of the file being uploaded"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mediaFields,
  mediaOperations
});
//# sourceMappingURL=MediaDescription.js.map