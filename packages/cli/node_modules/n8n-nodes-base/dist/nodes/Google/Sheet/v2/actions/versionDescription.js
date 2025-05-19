"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var versionDescription_exports = {};
__export(versionDescription_exports, {
  authentication: () => authentication,
  versionDescription: () => versionDescription
});
module.exports = __toCommonJS(versionDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
var sheet = __toESM(require("./sheet/Sheet.resource"));
var spreadsheet = __toESM(require("./spreadsheet/SpreadSheet.resource"));
const authentication = {
  displayName: "Authentication",
  name: "authentication",
  type: "options",
  options: [
    {
      name: "Service Account",
      value: "serviceAccount"
    },
    {
      // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
      name: "OAuth2 (recommended)",
      value: "oAuth2"
    }
  ],
  default: "oAuth2"
};
const versionDescription = {
  displayName: "Google Sheets",
  name: "googleSheets",
  icon: "file:googleSheets.svg",
  group: ["input", "output"],
  version: [3, 4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6],
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Read, update and write data to Google Sheets",
  defaults: {
    name: "Google Sheets"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  usableAsTool: true,
  hints: [
    {
      message: "Use the 'Minimise API Calls' option for greater efficiency if your sheet is uniformly formatted without gaps between columns or rows",
      displayCondition: '={{$parameter["operation"] === "append" && !$parameter["options"]["useAppend"]}}',
      whenToDisplay: "beforeExecution",
      location: "outputPane"
    },
    {
      message: "No columns found in Google Sheet. All rows will be appended",
      displayCondition: '={{ ["appendOrUpdate", "append"].includes($parameter["operation"]) && $parameter?.columns?.mappingMode === "defineBelow" && !$parameter?.columns?.schema?.length }}',
      whenToDisplay: "beforeExecution",
      location: "outputPane"
    }
  ],
  credentials: [
    {
      name: "googleApi",
      required: true,
      displayOptions: {
        show: {
          authentication: ["serviceAccount"]
        }
      },
      testedBy: "googleApiCredentialTest"
    },
    {
      name: "googleSheetsOAuth2Api",
      required: true,
      displayOptions: {
        show: {
          authentication: ["oAuth2"]
        }
      }
    }
  ],
  properties: [
    authentication,
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Document",
          value: "spreadsheet"
        },
        {
          name: "Sheet Within Document",
          value: "sheet"
        }
      ],
      default: "sheet"
    },
    ...sheet.descriptions,
    ...spreadsheet.descriptions
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authentication,
  versionDescription
});
//# sourceMappingURL=versionDescription.js.map