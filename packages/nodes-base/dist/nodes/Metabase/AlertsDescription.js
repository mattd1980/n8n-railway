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
var AlertsDescription_exports = {};
__export(AlertsDescription_exports, {
  alertsFields: () => alertsFields,
  alertsOperations: () => alertsOperations
});
module.exports = __toCommonJS(AlertsDescription_exports);
const alertsOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["alerts"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get specific alert",
        routing: {
          request: {
            method: "GET",
            url: '={{"/api/alert/" + $parameter.alertId}}'
          }
        },
        action: "Get an alert"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many alerts",
        routing: {
          request: {
            method: "GET",
            url: "/api/alert/"
          }
        },
        action: "Get many alerts"
      }
    ],
    default: "getAll"
  }
];
const alertsFields = [
  {
    displayName: "Alert ID",
    name: "alertId",
    type: "string",
    required: true,
    placeholder: "0",
    displayOptions: {
      show: {
        resource: ["alerts"],
        operation: ["get"]
      }
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alertsFields,
  alertsOperations
});
//# sourceMappingURL=AlertsDescription.js.map