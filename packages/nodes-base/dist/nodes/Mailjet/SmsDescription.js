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
var SmsDescription_exports = {};
__export(SmsDescription_exports, {
  smsFields: () => smsFields,
  smsOperations: () => smsOperations
});
module.exports = __toCommonJS(SmsDescription_exports);
const smsOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["sms"]
      }
    },
    options: [
      {
        name: "Send",
        value: "send",
        description: "Send a sms",
        action: "Send an SMS"
      }
    ],
    default: "send"
  }
];
const smsFields = [
  /* -------------------------------------------------------------------------- */
  /*                                sms:send                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "From",
    name: "from",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["sms"],
        operation: ["send"]
      }
    },
    description: "Customizable sender name. Should be between 3 and 11 characters in length, only alphanumeric characters are allowed."
  },
  {
    displayName: "To",
    name: "to",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["sms"],
        operation: ["send"]
      }
    },
    description: "Message recipient. Should be between 3 and 15 characters in length. The number always starts with a plus sign followed by a country code, followed by the number. Phone numbers are expected to comply with the E.164 format."
  },
  {
    displayName: "Text",
    name: "text",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["sms"],
        operation: ["send"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  smsFields,
  smsOperations
});
//# sourceMappingURL=SmsDescription.js.map