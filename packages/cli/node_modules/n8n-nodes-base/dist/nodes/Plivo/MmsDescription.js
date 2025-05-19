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
var MmsDescription_exports = {};
__export(MmsDescription_exports, {
  mmsFields: () => mmsFields,
  mmsOperations: () => mmsOperations
});
module.exports = __toCommonJS(MmsDescription_exports);
const mmsOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["mms"]
      }
    },
    options: [
      {
        name: "Send",
        value: "send",
        description: "Send an MMS message (US/Canada only)",
        action: "Send an MMS"
      }
    ],
    default: "send"
  }
];
const mmsFields = [
  // ----------------------------------
  //           mms: send
  // ----------------------------------
  {
    displayName: "From",
    name: "from",
    type: "string",
    default: "",
    description: "Plivo Number to send the MMS from",
    placeholder: "+14156667777",
    required: true,
    displayOptions: {
      show: {
        resource: ["mms"],
        operation: ["send"]
      }
    }
  },
  {
    displayName: "To",
    name: "to",
    type: "string",
    default: "",
    description: "Phone number to send the MMS to",
    placeholder: "+14156667778",
    required: true,
    displayOptions: {
      show: {
        operation: ["send"],
        resource: ["mms"]
      }
    }
  },
  {
    displayName: "Message",
    name: "message",
    type: "string",
    default: "",
    description: "Message to send",
    displayOptions: {
      show: {
        resource: ["mms"],
        operation: ["send"]
      }
    }
  },
  {
    displayName: "Media URLs",
    name: "media_urls",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["mms"],
        operation: ["send"]
      }
    },
    description: "Comma-separated list of media URLs of the files from your file server"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mmsFields,
  mmsOperations
});
//# sourceMappingURL=MmsDescription.js.map