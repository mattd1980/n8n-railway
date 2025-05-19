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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(update_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.calendarRLC,
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Color",
        name: "color",
        type: "options",
        default: "lightBlue",
        options: [
          {
            name: "Light Blue",
            value: "lightBlue"
          },
          {
            name: "Light Brown",
            value: "lightBrown"
          },
          {
            name: "Light Gray",
            value: "lightGray"
          },
          {
            name: "Light Green",
            value: "lightGreen"
          },
          {
            name: "Light Orange",
            value: "lightOrange"
          },
          {
            name: "Light Pink",
            value: "lightPink"
          },
          {
            name: "Light Red",
            value: "lightRed"
          },
          {
            name: "Light Teal",
            value: "lightTeal"
          },
          {
            name: "Light Yellow",
            value: "lightYellow"
          }
        ],
        description: "Specify the color to distinguish the calendar from the others"
      },
      {
        displayName: "Default Calendar",
        name: "isDefaultCalendar",
        type: "boolean",
        default: false
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        placeholder: "e.g. My Calendar",
        description: "The name of the calendar"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["calendar"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const updateFields = this.getNodeParameter("updateFields", index);
  const calendarId = this.getNodeParameter("calendarId", index, void 0, {
    extractValue: true
  });
  const endpoint = `/calendars/${calendarId}`;
  const body = {
    ...updateFields
  };
  const responseData = await import_transport.microsoftApiRequest.call(this, "PATCH", endpoint, body);
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData),
    { itemData: { item: index } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=update.operation.js.map