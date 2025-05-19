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
var AttachmentDescription_exports = {};
__export(AttachmentDescription_exports, {
  attachmentFields: () => attachmentFields,
  attachmentOperations: () => attachmentOperations
});
module.exports = __toCommonJS(AttachmentDescription_exports);
const attachmentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    noDataExpression: true,
    type: "options",
    displayOptions: {
      show: {
        resource: ["attachment"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Gets the metadata of a message attachment. The attachment data is fetched using the media API.",
        action: "Get an attachment"
      }
    ],
    default: "get"
  }
];
const attachmentFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 attachments:get                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Attachment Name",
    name: "attachmentName",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["attachment"],
        operation: ["get"]
      }
    },
    default: "",
    description: 'Resource name of the attachment, in the form "spaces/*/messages/*/attachments/*"'
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attachmentFields,
  attachmentOperations
});
//# sourceMappingURL=AttachmentDescription.js.map