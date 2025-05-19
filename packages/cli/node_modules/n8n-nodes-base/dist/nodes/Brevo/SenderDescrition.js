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
var SenderDescrition_exports = {};
__export(SenderDescrition_exports, {
  senderFields: () => senderFields,
  senderOperations: () => senderOperations
});
module.exports = __toCommonJS(SenderDescrition_exports);
const senderOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["sender"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a sender"
      },
      {
        name: "Delete",
        value: "delete",
        routing: {
          request: {
            method: "DELETE",
            url: "=/v3/senders/{{$parameter.id}}"
          },
          output: {
            postReceive: [
              {
                type: "set",
                properties: {
                  value: '={{ { "success": true } }}'
                }
              }
            ]
          }
        },
        action: "Delete a sender"
      },
      {
        name: "Get Many",
        value: "getAll",
        routing: {
          request: {
            method: "GET",
            url: "/v3/senders"
          },
          send: {
            paginate: false
          },
          output: {
            postReceive: [
              {
                type: "rootProperty",
                properties: {
                  property: "senders"
                }
              }
            ]
          }
        },
        action: "Get many senders"
      }
    ],
    default: "create"
  }
];
const senderCreateOperation = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["sender"],
        operation: ["create"]
      }
    },
    routing: {
      request: {
        method: "POST",
        url: "/v3/senders"
      },
      send: {
        property: "name",
        type: "body"
      }
    },
    required: true,
    description: "Name of the sender"
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    default: "",
    displayOptions: {
      show: {
        resource: ["sender"],
        operation: ["create"]
      }
    },
    routing: {
      send: {
        property: "email",
        type: "body"
      }
    },
    required: true,
    description: "Email of the sender"
  }
];
const senderDeleteOperation = [
  {
    displayName: "Sender ID",
    name: "id",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["sender"],
        operation: ["delete"]
      }
    },
    description: "ID of the sender to delete"
  }
];
const senderGetAllOperation = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["sender"],
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
        resource: ["sender"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    routing: {
      output: {
        postReceive: [
          {
            type: "limit",
            properties: {
              maxResults: "={{$value}}"
            }
          }
        ]
      }
    },
    default: 10,
    description: "Max number of results to return"
  }
];
const senderFields = [
  /* -------------------------------------------------------------------------- */
  /*                                sender:create                               */
  /* -------------------------------------------------------------------------- */
  ...senderCreateOperation,
  /* -------------------------------------------------------------------------- */
  /*                                sender:delete                               */
  /* -------------------------------------------------------------------------- */
  ...senderDeleteOperation,
  /* -------------------------------------------------------------------------- */
  /*                                sender:getAll                               */
  /* -------------------------------------------------------------------------- */
  ...senderGetAllOperation
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  senderFields,
  senderOperations
});
//# sourceMappingURL=SenderDescrition.js.map