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
var CallDescription_exports = {};
__export(CallDescription_exports, {
  callFields: () => callFields,
  callOperations: () => callOperations
});
module.exports = __toCommonJS(CallDescription_exports);
const callOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["call"]
      }
    },
    options: [
      {
        name: "Make",
        value: "make",
        description: "Make a voice call",
        action: "Make a call"
      }
    ],
    default: "make"
  }
];
const callFields = [
  // ----------------------------------
  //           call: make
  // ----------------------------------
  {
    displayName: "From",
    name: "from",
    type: "string",
    default: "",
    placeholder: "+14156667777",
    description: "Caller ID for the call to make",
    required: true,
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["make"]
      }
    }
  },
  {
    displayName: "To",
    name: "to",
    type: "string",
    default: "",
    placeholder: "+14156667778",
    required: true,
    description: "Phone number to make the call to",
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["make"]
      }
    }
  },
  {
    displayName: "Answer Method",
    name: "answer_method",
    type: "options",
    required: true,
    description: "HTTP verb to be used when invoking the Answer URL",
    default: "POST",
    options: [
      {
        name: "GET",
        value: "GET"
      },
      {
        name: "POST",
        value: "POST"
      }
    ],
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["make"]
      }
    }
  },
  {
    displayName: "Answer URL",
    name: "answer_url",
    type: "string",
    default: "",
    description: "URL to be invoked by Plivo once the call is answered. It should return the XML to handle the call once answered.",
    required: true,
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["make"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  callFields,
  callOperations
});
//# sourceMappingURL=CallDescription.js.map