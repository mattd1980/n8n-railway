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
  versionDescription: () => versionDescription
});
module.exports = __toCommonJS(versionDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
var base = __toESM(require("./base/Base.resource"));
var record = __toESM(require("./record/Record.resource"));
const versionDescription = {
  displayName: "Airtable",
  name: "airtable",
  icon: "file:airtable.svg",
  group: ["input"],
  version: [2, 2.1],
  subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
  description: "Read, update, write and delete data from Airtable",
  defaults: {
    name: "Airtable"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "airtableTokenApi",
      required: true,
      displayOptions: {
        show: {
          authentication: ["airtableTokenApi"]
        }
      }
    },
    {
      name: "airtableOAuth2Api",
      required: true,
      displayOptions: {
        show: {
          authentication: ["airtableOAuth2Api"]
        }
      }
    }
  ],
  properties: [
    {
      displayName: "Authentication",
      name: "authentication",
      type: "options",
      options: [
        {
          name: "Access Token",
          value: "airtableTokenApi"
        },
        {
          name: "OAuth2",
          value: "airtableOAuth2Api"
        }
      ],
      default: "airtableTokenApi"
    },
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Base",
          value: "base"
        },
        {
          name: "Record",
          value: "record"
        }
        // {
        // 	name: 'Table',
        // 	value: 'table',
        // },
      ],
      default: "record"
    },
    ...record.description,
    ...base.description
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  versionDescription
});
//# sourceMappingURL=versionDescription.js.map