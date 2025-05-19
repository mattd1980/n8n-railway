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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(create_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
const description = [
  {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["spreadsheet"],
        operation: ["create"]
      }
    },
    description: "The title of the spreadsheet"
  },
  {
    displayName: "Sheets",
    name: "sheetsUi",
    placeholder: "Add Sheet",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        name: "sheetValues",
        displayName: "Sheet",
        values: [
          {
            displayName: "Title",
            name: "title",
            type: "string",
            default: "",
            description: "Title of the property to create"
          },
          {
            displayName: "Hidden",
            name: "hidden",
            type: "boolean",
            default: false,
            description: "Whether the Sheet should be hidden in the UI"
          }
        ]
      }
    ],
    displayOptions: {
      show: {
        resource: ["spreadsheet"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["spreadsheet"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Locale",
        name: "locale",
        type: "string",
        default: "",
        placeholder: "en_US",
        description: `The locale of the spreadsheet in one of the following formats:
				<ul>
					<li>en (639-1)</li>
					<li>fil (639-2 if no 639-1 format exists)</li>
					<li>en_US (combination of ISO language an country)</li>
				<ul>`
      },
      {
        displayName: "Recalculation Interval",
        name: "autoRecalc",
        type: "options",
        options: [
          {
            name: "Default",
            value: "",
            description: "Default value"
          },
          {
            name: "On Change",
            value: "ON_CHANGE",
            description: "Volatile functions are updated on every change"
          },
          {
            name: "Minute",
            value: "MINUTE",
            description: "Volatile functions are updated on every change and every minute"
          },
          {
            name: "Hour",
            value: "HOUR",
            description: "Volatile functions are updated on every change and hourly"
          }
        ],
        default: "",
        description: "Cell recalculation interval options"
      }
    ]
  }
];
async function execute() {
  const items = this.getInputData();
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    const title = this.getNodeParameter("title", i);
    const sheetsUi = this.getNodeParameter("sheetsUi", i, {});
    const body = {
      properties: {
        title,
        autoRecalc: void 0,
        locale: void 0
      },
      sheets: []
    };
    const options = this.getNodeParameter("options", i, {});
    if (Object.keys(sheetsUi).length) {
      const data = [];
      const sheets = sheetsUi.sheetValues;
      for (const properties of sheets) {
        data.push({ properties });
      }
      body.sheets = data;
    }
    body.properties.autoRecalc = options.autoRecalc ? options.autoRecalc : void 0;
    body.properties.locale = options.locale ? options.locale : void 0;
    const response = await import_transport.apiRequest.call(this, "POST", "/v4/spreadsheets", body);
    const executionData = this.helpers.constructExecutionMetaData(
      (0, import_utilities.wrapData)(response),
      { itemData: { item: i } }
    );
    returnData.push(...executionData);
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map