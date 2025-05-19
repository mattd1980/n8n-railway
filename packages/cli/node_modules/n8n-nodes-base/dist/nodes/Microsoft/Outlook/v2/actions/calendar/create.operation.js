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
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(create_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    required: true,
    description: "The name of the calendar to create",
    placeholder: "e.g. My Calendar"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
        displayName: "Calendar Group",
        name: "calendarGroup",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getCalendarGroups"
        },
        default: [],
        description: 'If set, the calendar will be created in the specified calendar group. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
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
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["calendar"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const additionalFields = this.getNodeParameter("additionalFields", index);
  const name = this.getNodeParameter("name", index);
  let endpoint = "/calendars";
  if (additionalFields.calendarGroup) {
    endpoint = `/calendarGroups/${additionalFields.calendarGroup}/calendars`;
    delete additionalFields.calendarGroup;
  }
  const body = {
    name,
    ...additionalFields
  };
  const responseData = await import_transport.microsoftApiRequest.call(this, "POST", endpoint, body);
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
//# sourceMappingURL=create.operation.js.map