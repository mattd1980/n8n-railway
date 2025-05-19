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
        description: "Send an SMS message",
        action: "Send an SMS"
      }
    ],
    default: "send"
  }
];
const smsFields = [
  // ----------------------------------
  //           sms: send
  // ----------------------------------
  {
    displayName: "From",
    name: "from",
    type: "string",
    default: "",
    description: "Plivo Number to send the SMS from",
    placeholder: "+14156667777",
    required: true,
    displayOptions: {
      show: {
        resource: ["sms"],
        operation: ["send"]
      }
    }
  },
  {
    displayName: "To",
    name: "to",
    type: "string",
    default: "",
    description: "Phone number to send the message to",
    placeholder: "+14156667778",
    required: true,
    displayOptions: {
      show: {
        resource: ["sms"],
        operation: ["send"]
      }
    }
  },
  {
    displayName: "Message",
    name: "message",
    type: "string",
    default: "",
    description: "Message to send",
    required: true,
    displayOptions: {
      show: {
        operation: ["send"],
        resource: ["sms"]
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