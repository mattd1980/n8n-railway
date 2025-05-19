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
var GoogleSheetsTrigger_node_exports = {};
__export(GoogleSheetsTrigger_node_exports, {
  GoogleSheetsTrigger: () => GoogleSheetsTrigger,
  document: () => document,
  sheet: () => sheet
});
module.exports = __toCommonJS(GoogleSheetsTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GoogleSheetsTrigger = require("./GoogleSheetsTrigger.utils");
var import_GoogleSheet = require("./v2/helpers/GoogleSheet");
var import_listSearch = require("./v2/methods/listSearch");
var import_loadOptions = require("./v2/methods/loadOptions");
var import_transport = require("./v2/transport");
var import_constants = require("../constants");
const document = {
  displayName: "Document",
  name: "documentId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "spreadSheetsSearch",
        searchable: true
      }
    },
    {
      displayName: "By URL",
      name: "url",
      type: "string",
      extractValue: {
        type: "regex",
        regex: import_constants.GOOGLE_DRIVE_FILE_URL_REGEX
      },
      validation: [
        {
          type: "regex",
          properties: {
            regex: import_constants.GOOGLE_DRIVE_FILE_URL_REGEX,
            errorMessage: "Not a valid Google Drive File URL"
          }
        }
      ]
    },
    {
      displayName: "By ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[a-zA-Z0-9\\-_]{2,}",
            errorMessage: "Not a valid Google Drive File ID"
          }
        }
      ],
      url: "=https://docs.google.com/spreadsheets/d/{{$value}}/edit"
    }
  ]
};
const sheet = {
  displayName: "Sheet",
  name: "sheetName",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  // default: '', //empty string set to progresivly reveal fields
  required: true,
  typeOptions: {
    loadOptionsDependsOn: ["documentId.value"]
  },
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "sheetsSearch",
        searchable: false
      }
    },
    {
      displayName: "By URL",
      name: "url",
      type: "string",
      extractValue: {
        type: "regex",
        regex: import_constants.GOOGLE_SHEETS_SHEET_URL_REGEX
      },
      validation: [
        {
          type: "regex",
          properties: {
            regex: import_constants.GOOGLE_SHEETS_SHEET_URL_REGEX,
            errorMessage: "Not a valid Sheet URL"
          }
        }
      ]
    },
    {
      displayName: "By ID",
      name: "id",
      type: "string",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "((gid=)?[0-9]{1,})",
            errorMessage: "Not a valid Sheet ID"
          }
        }
      ]
    }
  ]
};
class GoogleSheetsTrigger {
  constructor() {
    this.description = {
      displayName: "Google Sheets Trigger",
      name: "googleSheetsTrigger",
      icon: "file:googleSheets.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{($parameter["event"])}}',
      description: "Starts the workflow when Google Sheets events occur",
      defaults: {
        name: "Google Sheets Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googleSheetsTriggerOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["triggerOAuth2"]
            }
          }
        }
      ],
      polling: true,
      properties: [
        // trigger shared logic with GoogleSheets node, leaving this here for compatibility
        {
          displayName: "Authentication",
          name: "authentication",
          type: "hidden",
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "OAuth2 (recommended)",
              value: "triggerOAuth2"
            }
          ],
          default: "triggerOAuth2"
        },
        document,
        sheet,
        {
          displayName: "Trigger On",
          name: "event",
          type: "options",
          description: "It will be triggered also by newly created columns (if the 'Columns to Watch' option is not set)",
          options: [
            {
              name: "Row Added",
              value: "rowAdded"
            },
            {
              name: "Row Updated",
              value: "rowUpdate"
            },
            {
              name: "Row Added or Updated",
              value: "anyUpdate"
            }
          ],
          default: "anyUpdate",
          required: true
        },
        {
          displayName: "Include in Output",
          name: "includeInOutput",
          type: "options",
          default: "new",
          description: "This option will be effective only when automatically executing the workflow",
          options: [
            {
              name: "New Version",
              value: "new"
            },
            {
              name: "Old Version",
              value: "old"
            },
            {
              name: "Both Versions",
              value: "both"
            }
          ],
          displayOptions: {
            hide: {
              event: ["rowAdded"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Columns to Watch",
              name: "columnsToWatch",
              type: "multiOptions",
              description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
              typeOptions: {
                loadOptionsDependsOn: ["sheetName.value"],
                loadOptionsMethod: "getSheetHeaderRowAndSkipEmpty"
              },
              default: [],
              displayOptions: {
                show: {
                  "/event": ["anyUpdate", "rowUpdate"]
                }
              }
            },
            {
              displayName: "Data Location on Sheet",
              name: "dataLocationOnSheet",
              type: "fixedCollection",
              placeholder: "Select Range",
              default: { values: { rangeDefinition: "specifyRangeA1" } },
              options: [
                {
                  displayName: "Values",
                  name: "values",
                  values: [
                    {
                      displayName: "Range Definition",
                      name: "rangeDefinition",
                      type: "options",
                      options: [
                        {
                          name: "Specify Range (A1 Notation)",
                          value: "specifyRangeA1",
                          description: "Manually specify the data range"
                        },
                        {
                          name: "Specify Range (Rows)",
                          value: "specifyRange",
                          description: "Manually specify the data range"
                        }
                      ],
                      default: ""
                    },
                    {
                      displayName: "Header Row",
                      name: "headerRow",
                      type: "number",
                      typeOptions: {
                        minValue: 1
                      },
                      default: 1,
                      description: "Index of the row which contains the keys. Starts at 1. The incoming node data is matched to the keys for assignment. The matching is case sensitive.",
                      hint: "First row is row 1",
                      displayOptions: {
                        show: {
                          rangeDefinition: ["specifyRange"]
                        }
                      }
                    },
                    {
                      displayName: "First Data Row",
                      name: "firstDataRow",
                      type: "number",
                      typeOptions: {
                        minValue: 1
                      },
                      default: 2,
                      description: "Index of the first row which contains the actual data and not the keys. Starts with 1.",
                      hint: "First row is row 1",
                      displayOptions: {
                        show: {
                          rangeDefinition: ["specifyRange"]
                        }
                      }
                    },
                    {
                      displayName: "Range",
                      name: "range",
                      type: "string",
                      default: "",
                      placeholder: "A:Z",
                      description: 'The table range to read from or to append data to. See the Google <a href="https://developers.google.com/sheets/api/guides/values#writing">documentation</a> for the details.',
                      hint: "You can specify both the rows and the columns, e.g. C4:E7",
                      displayOptions: {
                        show: {
                          rangeDefinition: ["specifyRangeA1"]
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              displayName: "Value Render",
              name: "valueRender",
              type: "options",
              options: [
                {
                  name: "Unformatted",
                  value: "UNFORMATTED_VALUE",
                  description: "Values will be calculated, but not formatted in the reply"
                },
                {
                  name: "Formatted",
                  value: "FORMATTED_VALUE",
                  description: "Values will be formatted and calculated according to the cell's formatting (based on the spreadsheet's locale)"
                },
                {
                  name: "Formula",
                  value: "FORMULA",
                  description: "Values will not be calculated. The reply will include the formulas."
                }
              ],
              default: "UNFORMATTED_VALUE",
              description: 'Determines how values will be rendered in the output. <a href="https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption" target="_blank">More info</a>.',
              displayOptions: {
                hide: {
                  "/event": ["anyUpdate", "rowUpdate"]
                }
              }
            },
            {
              displayName: "DateTime Render",
              name: "dateTimeRenderOption",
              type: "options",
              options: [
                {
                  name: "Serial Number",
                  value: "SERIAL_NUMBER",
                  description: 'Fields will be returned as doubles in "serial number" format (as popularized by Lotus 1-2-3)'
                },
                {
                  name: "Formatted String",
                  value: "FORMATTED_STRING",
                  description: "Fields will be rendered as strings in their given number format (which depends on the spreadsheet locale)"
                }
              ],
              default: "SERIAL_NUMBER",
              description: 'Determines how dates should be rendered in the output.  <a href="https://developers.google.com/sheets/api/reference/rest/v4/DateTimeRenderOption" target="_blank">More info</a>.',
              displayOptions: {
                hide: {
                  "/event": ["anyUpdate", "rowUpdate"]
                }
              }
            }
          ]
        }
      ]
    };
    this.methods = {
      listSearch: { spreadSheetsSearch: import_listSearch.spreadSheetsSearch, sheetsSearch: import_listSearch.sheetsSearch },
      loadOptions: { getSheetHeaderRowAndSkipEmpty: import_loadOptions.getSheetHeaderRowAndSkipEmpty }
    };
  }
  async poll() {
    try {
      const workflowStaticData = this.getWorkflowStaticData("node");
      const event = this.getNodeParameter("event", 0);
      const documentId = this.getNodeParameter("documentId", void 0, {
        extractValue: true
      });
      const sheetWithinDocument = this.getNodeParameter("sheetName", void 0, {
        extractValue: true
      });
      const { mode: sheetMode } = this.getNodeParameter("sheetName", 0);
      const googleSheet = new import_GoogleSheet.GoogleSheet(documentId, this);
      const { sheetId, title: sheetName } = await googleSheet.spreadsheetGetSheet(
        this.getNode(),
        sheetMode,
        sheetWithinDocument
      );
      const options = this.getNodeParameter("options");
      if (this.getMode() !== "manual" && (workflowStaticData.documentId !== documentId || workflowStaticData.sheetId !== sheetId)) {
        workflowStaticData.documentId = documentId;
        workflowStaticData.sheetId = sheetId;
        workflowStaticData.lastRevision = void 0;
        workflowStaticData.lastRevisionLink = void 0;
        workflowStaticData.lastIndexChecked = void 0;
      }
      const previousRevision = workflowStaticData.lastRevision;
      const previousRevisionLink = workflowStaticData.lastRevisionLink;
      if (event !== "rowAdded") {
        let pageToken;
        do {
          const { revisions, nextPageToken } = await import_transport.apiRequest.call(
            this,
            "GET",
            "",
            void 0,
            {
              fields: "revisions(id, exportLinks), nextPageToken",
              pageToken,
              pageSize: 1e3
            },
            `https://www.googleapis.com/drive/v3/files/${documentId}/revisions`
          );
          if (nextPageToken) {
            pageToken = nextPageToken;
          } else {
            pageToken = void 0;
            const lastRevision = +revisions[revisions.length - 1].id;
            if (lastRevision <= previousRevision) {
              return null;
            } else {
              if (this.getMode() !== "manual") {
                workflowStaticData.lastRevision = lastRevision;
                workflowStaticData.lastRevisionLink = revisions[revisions.length - 1].exportLinks[import_GoogleSheetsTrigger.BINARY_MIME_TYPE];
              }
            }
          }
        } while (pageToken);
      }
      let range = "A:ZZZ";
      let keyRow = 1;
      let startIndex = 2;
      let rangeDefinition = "";
      const [from, to] = range.split(":");
      let keyRange = `${from}${keyRow}:${to}${keyRow}`;
      let rangeToCheck = `${from}${keyRow}:${to}`;
      if (options.dataLocationOnSheet) {
        const locationDefine = options.dataLocationOnSheet.values;
        rangeDefinition = locationDefine.rangeDefinition;
        if (rangeDefinition === "specifyRangeA1") {
          if (locationDefine.range === "") {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "The field 'Range' is empty, please provide a range"
            );
          }
          range = locationDefine.range;
        }
        if (rangeDefinition === "specifyRange") {
          keyRow = parseInt(locationDefine.headerRow, 10);
          startIndex = parseInt(locationDefine.firstDataRow, 10);
        }
        const [rangeFrom, rangeTo] = range.split(":");
        const cellDataFrom = rangeFrom.match(/([a-zA-Z]{1,10})([0-9]{0,10})/) || [];
        const cellDataTo = rangeTo.match(/([a-zA-Z]{1,10})([0-9]{0,10})/) || [];
        if (rangeDefinition === "specifyRangeA1" && cellDataFrom[2] !== void 0) {
          keyRange = `${cellDataFrom[1]}${+cellDataFrom[2]}:${cellDataTo[1]}${+cellDataFrom[2]}`;
          rangeToCheck = `${cellDataFrom[1]}${+cellDataFrom[2] + 1}:${rangeTo}`;
        } else {
          keyRange = `${cellDataFrom[1]}${keyRow}:${cellDataTo[1]}${keyRow}`;
          rangeToCheck = `${cellDataFrom[1]}${keyRow}:${rangeTo}`;
        }
      }
      const qs = {};
      Object.assign(qs, options);
      if (event === "rowAdded") {
        const [columns] = (await import_transport.apiRequest.call(
          this,
          "GET",
          `/v4/spreadsheets/${documentId}/values/${encodeURIComponent(sheetName)}!${keyRange}`
        )).values || [[]];
        if (!columns?.length) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "Could not retrieve the columns from key row"
          );
        }
        const sheetData = await googleSheet.getData(
          `${sheetName}!${rangeToCheck}`,
          options.valueRender || "UNFORMATTED_VALUE",
          options.dateTimeRenderOption || "FORMATTED_STRING"
        );
        if (Array.isArray(sheetData) && sheetData.length !== 0) {
          sheetData.splice(0, 1);
        }
        let dataStartIndex = 0;
        if (rangeDefinition === "specifyRange" && keyRow < startIndex) {
          dataStartIndex = startIndex - keyRow - 1;
        }
        if (this.getMode() === "manual") {
          if (Array.isArray(sheetData)) {
            const sheetDataFromStartIndex = sheetData.slice(dataStartIndex);
            const returnData = (0, import_GoogleSheetsTrigger.arrayOfArraysToJson)(sheetDataFromStartIndex, columns);
            if (Array.isArray(returnData) && returnData.length !== 0) {
              return [this.helpers.returnJsonArray(returnData)];
            }
          }
        }
        if (Array.isArray(sheetData) && this.getMode() !== "manual") {
          if (workflowStaticData.lastIndexChecked === void 0) {
            workflowStaticData.lastIndexChecked = sheetData.length;
            return null;
          }
          const rowsStartIndex = Math.max(
            workflowStaticData.lastIndexChecked,
            dataStartIndex
          );
          const addedRows = sheetData?.slice(rowsStartIndex) || [];
          const returnData = (0, import_GoogleSheetsTrigger.arrayOfArraysToJson)(addedRows, columns);
          workflowStaticData.lastIndexChecked = sheetData.length;
          if (Array.isArray(returnData) && returnData.length !== 0) {
            return [this.helpers.returnJsonArray(returnData)];
          }
        }
      }
      if (event === "anyUpdate" || event === "rowUpdate") {
        if (sheetName.length > 31) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "Sheet name is too long choose a name with 31 characters or less"
          );
        }
        const sheetRange = `${sheetName}!${range}`;
        let dataStartIndex = startIndex - 1;
        if (rangeDefinition !== "specifyRangeA1") {
          dataStartIndex = keyRow < startIndex ? startIndex - 2 : startIndex - 1;
        }
        const currentData = await googleSheet.getData(
          sheetRange,
          "UNFORMATTED_VALUE",
          "SERIAL_NUMBER"
        ) || [];
        if (previousRevision === void 0) {
          if (currentData.length === 0) {
            return [[]];
          }
          const zeroBasedKeyRow = keyRow - 1;
          const columns = currentData[zeroBasedKeyRow];
          currentData.splice(zeroBasedKeyRow, 1);
          let returnData2;
          if (rangeDefinition !== "specifyRangeA1") {
            returnData2 = (0, import_GoogleSheetsTrigger.arrayOfArraysToJson)(currentData.slice(dataStartIndex), columns);
          } else {
            returnData2 = (0, import_GoogleSheetsTrigger.arrayOfArraysToJson)(currentData, columns);
          }
          if (Array.isArray(returnData2) && returnData2.length !== 0 && this.getMode() === "manual") {
            return [this.helpers.returnJsonArray(returnData2)];
          } else {
            return null;
          }
        }
        const previousRevisionBinaryData = await import_GoogleSheetsTrigger.getRevisionFile.call(this, previousRevisionLink);
        const previousRevisionSheetData = (0, import_GoogleSheetsTrigger.sheetBinaryToArrayOfArrays)(
          previousRevisionBinaryData,
          sheetName,
          rangeDefinition === "specifyRangeA1" ? range : void 0
        ) || [];
        const includeInOutput = this.getNodeParameter("includeInOutput", "new");
        let returnData;
        if (options.columnsToWatch) {
          returnData = (0, import_GoogleSheetsTrigger.compareRevisions)(
            previousRevisionSheetData,
            currentData,
            keyRow,
            includeInOutput,
            options.columnsToWatch,
            dataStartIndex,
            event
          );
        } else {
          returnData = (0, import_GoogleSheetsTrigger.compareRevisions)(
            previousRevisionSheetData,
            currentData,
            keyRow,
            includeInOutput,
            [],
            dataStartIndex,
            event
          );
        }
        if (Array.isArray(returnData) && returnData.length !== 0) {
          return [this.helpers.returnJsonArray(returnData)];
        }
      }
    } catch (error) {
      if (error?.description?.toLowerCase().includes("user does not have sufficient permissions for file")) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "Edit access to the document is required for the 'Row Update' and 'Row Added or Updated' triggers. Request edit access to the document's owner or select the 'Row Added' trigger in the 'Trigger On' dropdown."
        );
      }
      if (error?.error?.error?.message !== void 0 && !error.error.error.message.toLocaleLowerCase().includes("unknown error") && !error.error.error.message.toLocaleLowerCase().includes("bad request")) {
        let [message, ...description] = error.error.error.message.split(". ");
        if (message.toLowerCase() === "access not configured") {
          message = "Missing Google Drive API";
        }
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), message, {
          description: description.join(".\n ")
        });
      }
      throw error;
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleSheetsTrigger,
  document,
  sheet
});
//# sourceMappingURL=GoogleSheetsTrigger.node.js.map