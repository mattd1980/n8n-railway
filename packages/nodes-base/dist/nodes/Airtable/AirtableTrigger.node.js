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
var AirtableTrigger_node_exports = {};
__export(AirtableTrigger_node_exports, {
  AirtableTrigger: () => AirtableTrigger
});
module.exports = __toCommonJS(AirtableTrigger_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./v1/GenericFunctions");
class AirtableTrigger {
  constructor() {
    this.description = {
      displayName: "Airtable Trigger",
      name: "airtableTrigger",
      icon: "file:airtable.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Airtable events occur",
      subtitle: '={{$parameter["event"]}}',
      defaults: {
        name: "Airtable Trigger"
      },
      credentials: [
        {
          name: "airtableApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["airtableApi"]
            }
          }
        },
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
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "API Key",
              value: "airtableApi"
            },
            {
              name: "Access Token",
              value: "airtableTokenApi"
            },
            {
              name: "OAuth2",
              value: "airtableOAuth2Api"
            }
          ],
          default: "airtableApi"
        },
        {
          displayName: "Base",
          name: "baseId",
          type: "resourceLocator",
          default: { mode: "url", value: "" },
          required: true,
          description: "The Airtable Base in which to operate on",
          modes: [
            {
              displayName: "By URL",
              name: "url",
              type: "string",
              placeholder: "https://airtable.com/app12DiScdfes/tblAAAAAAAAAAAAA/viwHdfasdfeieg5p",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "https://airtable.com/([a-zA-Z0-9]{2,})/.*",
                    errorMessage: "Not a valid Airtable Base URL"
                  }
                }
              ],
              extractValue: {
                type: "regex",
                regex: "https://airtable.com/([a-zA-Z0-9]{2,})"
              }
            },
            {
              displayName: "ID",
              name: "id",
              type: "string",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "[a-zA-Z0-9]{2,}",
                    errorMessage: "Not a valid Airtable Base ID"
                  }
                }
              ],
              placeholder: "appD3dfaeidke",
              url: "=https://airtable.com/{{$value}}"
            }
          ]
        },
        {
          displayName: "Table",
          name: "tableId",
          type: "resourceLocator",
          default: { mode: "url", value: "" },
          required: true,
          modes: [
            {
              displayName: "By URL",
              name: "url",
              type: "string",
              placeholder: "https://airtable.com/app12DiScdfes/tblAAAAAAAAAAAAA/viwHdfasdfeieg5p",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "https://airtable.com/[a-zA-Z0-9]{2,}/([a-zA-Z0-9]{2,})/.*",
                    errorMessage: "Not a valid Airtable Table URL"
                  }
                }
              ],
              extractValue: {
                type: "regex",
                regex: "https://airtable.com/[a-zA-Z0-9]{2,}/([a-zA-Z0-9]{2,})"
              }
            },
            {
              displayName: "ID",
              name: "id",
              type: "string",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "[a-zA-Z0-9]{2,}",
                    errorMessage: "Not a valid Airtable Table ID"
                  }
                }
              ],
              placeholder: "tbl3dirwqeidke"
            }
          ]
        },
        {
          displayName: "Trigger Field",
          name: "triggerField",
          type: "string",
          default: "",
          description: "A Created Time or Last Modified Time field that will be used to sort records. If you do not have a Created Time or Last Modified Time field in your schema, please create one, because without this field trigger will not work correctly.",
          required: true
        },
        {
          displayName: "Download Attachments",
          name: "downloadAttachments",
          type: "boolean",
          default: false,
          description: "Whether the attachment fields define in 'Download Fields' will be downloaded"
        },
        {
          displayName: "Download Fields",
          name: "downloadFieldNames",
          type: "string",
          required: true,
          displayOptions: {
            show: {
              downloadAttachments: [true]
            }
          },
          default: "",
          description: "Name of the fields of type 'attachment' that should be downloaded. Multiple ones can be defined separated by comma. Case sensitive."
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "Fields",
              name: "fields",
              type: "string",
              requiresDataPath: "multiple",
              default: "",
              // eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
              description: "Fields to be included in the response. Multiple ones can be set separated by comma. Example: <code>name, id</code>. By default just the trigger field will be included."
            },
            {
              displayName: "Formula",
              name: "formula",
              type: "string",
              default: "",
              description: 'Formulas may involve functions, numeric operations, logical operations, and text operations that operate on fields. More info <a href="https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference">here</a>.'
            },
            {
              displayName: "View ID",
              name: "viewId",
              type: "string",
              default: "",
              description: "The name or ID of a view in the table. If set, only the records in that view will be returned."
            }
          ]
        }
      ]
    };
  }
  async poll() {
    const downloadAttachments = this.getNodeParameter("downloadAttachments", 0);
    const webhookData = this.getWorkflowStaticData("node");
    const additionalFields = this.getNodeParameter("additionalFields");
    const base = this.getNodeParameter("baseId", "", { extractValue: true });
    const table = this.getNodeParameter("tableId", "", { extractValue: true });
    const triggerField = this.getNodeParameter("triggerField");
    const qs = {};
    const endpoint = `${base}/${table}`;
    const now = (0, import_moment_timezone.default)().utc().format();
    const startDate = webhookData.lastTimeChecked || now;
    const endDate = now;
    if (additionalFields.viewId) {
      qs.view = additionalFields.viewId;
    }
    if (additionalFields.fields) {
      qs["fields[]"] = additionalFields.fields.split(",");
    }
    qs.filterByFormula = `IS_AFTER({${triggerField}}, DATETIME_PARSE("${startDate}", "YYYY-MM-DD HH:mm:ss"))`;
    if (additionalFields.formula) {
      qs.filterByFormula = `AND(${qs.filterByFormula}, ${additionalFields.formula})`;
    }
    if (this.getMode() === "manual") {
      delete qs.filterByFormula;
      qs.maxRecords = 1;
    }
    const { records } = await import_GenericFunctions.apiRequestAllItems.call(this, "GET", endpoint, {}, qs);
    webhookData.lastTimeChecked = endDate;
    if (Array.isArray(records) && records.length) {
      if (this.getMode() === "manual" && records[0].fields[triggerField] === void 0) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The Field "${triggerField}" does not exist.`);
      }
      if (downloadAttachments) {
        const downloadFieldNames = this.getNodeParameter("downloadFieldNames", 0).split(
          ","
        );
        const data = await import_GenericFunctions.downloadRecordAttachments.call(
          this,
          records,
          downloadFieldNames
        );
        return [data];
      }
      return [this.helpers.returnJsonArray(records)];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AirtableTrigger
});
//# sourceMappingURL=AirtableTrigger.node.js.map