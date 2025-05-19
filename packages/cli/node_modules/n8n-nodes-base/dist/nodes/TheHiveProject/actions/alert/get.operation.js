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
var get_operation_exports = {};
__export(get_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(get_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.alertRLC,
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Include Similar Alerts",
        name: "includeSimilarAlerts",
        type: "boolean",
        description: "Whether to include similar cases",
        default: false
      },
      {
        displayName: "Include Similar Cases",
        name: "includeSimilarCases",
        type: "boolean",
        description: "Whether to include similar cases",
        default: false
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["alert"],
    operation: ["get"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData;
  const alertId = this.getNodeParameter("alertId", i, "", { extractValue: true });
  const options = this.getNodeParameter("options", i, {});
  responseData = await import_transport.theHiveApiRequest.call(this, "GET", `/v1/alert/${alertId}`);
  if (responseData && options.includeSimilarAlerts) {
    const similarAlerts = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", {
      query: [
        {
          _name: "getAlert",
          idOrName: alertId
        },
        {
          _name: "similarAlerts"
        }
      ]
    });
    responseData = {
      ...responseData,
      similarAlerts
    };
  }
  if (responseData && options.includeSimilarCases) {
    const similarCases = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", {
      query: [
        {
          _name: "getAlert",
          idOrName: alertId
        },
        {
          _name: "similarCases"
        }
      ]
    });
    responseData = {
      ...responseData,
      similarCases
    };
  }
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=get.operation.js.map