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
var RequestDescription_exports = {};
__export(RequestDescription_exports, {
  requestFields: () => requestFields,
  requestOperations: () => requestOperations
});
module.exports = __toCommonJS(RequestDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const requestOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["request"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a request",
        routing: {
          request: {
            method: "GET",
            url: '=/api/bin/{{$parameter["binId"]}}/req/{{$parameter["requestId"]}}'
          },
          send: {
            preSend: [
              // Parse binId before sending to make sure it's in the right format
              import_GenericFunctions.buildRequestURL
            ]
          }
        },
        action: "Get a request"
      },
      {
        name: "Remove First",
        value: "removeFirst",
        description: "Remove the first request from bin",
        routing: {
          request: {
            method: "GET",
            url: '=/api/bin/{{$parameter["binId"]}}/req/shift'
          },
          send: {
            preSend: [
              // Parse binId before sending to make sure it's in the right format
              import_GenericFunctions.buildRequestURL
            ]
          }
        },
        action: "Remove First a request"
      },
      {
        name: "Send",
        value: "send",
        description: "Send a test request to the bin",
        routing: {
          request: {
            method: "POST"
          },
          send: {
            preSend: [
              // Parse binId before sending to make sure it's in the right format
              import_GenericFunctions.buildBinTestURL
            ]
          },
          output: {
            postReceive: [
              {
                type: "set",
                properties: {
                  value: '={{ { "requestId": $response.body } }}'
                }
              }
            ]
          }
        },
        action: "Send a request"
      }
    ],
    default: "get"
  }
];
const requestFields = [
  {
    displayName: "Bin ID",
    name: "binId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["request"],
        operation: ["get", "removeFirst", "send"]
      }
    },
    description: "Unique identifier for each bin"
  },
  {
    displayName: "Bin Content",
    name: "binContent",
    type: "string",
    default: "",
    typeOptions: {
      rows: 5
    },
    displayOptions: {
      show: {
        resource: ["request"],
        operation: ["send"]
      }
    },
    // Content is sent in the body of POST requests
    routing: {
      send: {
        property: "content",
        type: "body"
      }
    }
  },
  {
    displayName: "Request ID",
    name: "requestId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["request"],
        operation: ["get"]
      }
    },
    description: "Unique identifier for each request"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  requestFields,
  requestOperations
});
//# sourceMappingURL=RequestDescription.js.map