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
var PolicyDescription_exports = {};
__export(PolicyDescription_exports, {
  policyFields: () => policyFields,
  policyOperations: () => policyOperations
});
module.exports = __toCommonJS(PolicyDescription_exports);
const policyOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["policy"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a policy",
        action: "Get a policy"
      }
    ],
    default: "get"
  }
];
const policyFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 policy:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Policy DN",
    name: "policyDn",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["policy"]
      }
    },
    default: "",
    description: "The Distinguished Name (DN) of the policy folder"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["policy"]
      }
    },
    options: [
      {
        displayName: "PKCS10",
        name: "PKCS10",
        type: "string",
        default: "",
        description: "The PKCS#10 policy Signing Request (CSR). Omit escape characters such as or . If this value is provided, any Subject DN fields and the KeyBitSize in the request are ignored."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  policyFields,
  policyOperations
});
//# sourceMappingURL=PolicyDescription.js.map