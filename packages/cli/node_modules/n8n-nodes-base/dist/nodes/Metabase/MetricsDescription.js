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
var MetricsDescription_exports = {};
__export(MetricsDescription_exports, {
  metricsFields: () => metricsFields,
  metricsOperations: () => metricsOperations
});
module.exports = __toCommonJS(MetricsDescription_exports);
const metricsOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["metrics"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a specific metric",
        routing: {
          request: {
            method: "GET",
            url: '={{"/api/metric/" + $parameter.metricId}}',
            returnFullResponse: true
          }
        },
        action: "Get a metric"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many metrics",
        routing: {
          request: {
            method: "GET",
            url: "/api/metric/"
          }
        },
        action: "Get many metrics"
      }
    ],
    default: "getAll"
  }
];
const metricsFields = [
  {
    displayName: "Metric ID",
    name: "metricId",
    type: "string",
    required: true,
    placeholder: "0",
    displayOptions: {
      show: {
        resource: ["metrics"],
        operation: ["get"]
      }
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  metricsFields,
  metricsOperations
});
//# sourceMappingURL=MetricsDescription.js.map