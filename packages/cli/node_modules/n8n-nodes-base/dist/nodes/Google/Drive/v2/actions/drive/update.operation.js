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
  execute: () => execute
});
module.exports = __toCommonJS(update_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    ...import_common.sharedDriveRLC,
    description: "The shared drive to update"
  },
  {
    displayName: "Update Fields",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["drive"]
      }
    },
    options: [
      {
        displayName: "Color RGB",
        name: "colorRgb",
        type: "color",
        default: "",
        description: "The color of this shared drive as an RGB hex string"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The updated name of the shared drive"
      },
      {
        displayName: "Restrictions",
        name: "restrictions",
        type: "collection",
        placeholder: "Add Field",
        default: {},
        options: [
          {
            displayName: "Admin Managed Restrictions",
            name: "adminManagedRestrictions",
            type: "boolean",
            default: false,
            description: "Whether the options to copy, print, or download files inside this shared drive, should be disabled for readers and commenters. When this restriction is set to true, it will override the similarly named field to true for any file inside this shared drive."
          },
          {
            displayName: "Copy Requires Writer Permission",
            name: "copyRequiresWriterPermission",
            type: "boolean",
            default: false,
            description: "Whether the options to copy, print, or download files inside this shared drive, should be disabled for readers and commenters. When this restriction is set to true, it will override the similarly named field to true for any file inside this shared drive."
          },
          {
            displayName: "Domain Users Only",
            name: "domainUsersOnly",
            type: "boolean",
            default: false,
            description: "Whether access to this shared drive and items inside this shared drive is restricted to users of the domain to which this shared drive belongs. This restriction may be overridden by other sharing policies controlled outside of this shared drive."
          },
          {
            displayName: "Drive Members Only",
            name: "driveMembersOnly",
            type: "boolean",
            default: false,
            description: "Whether access to items inside this shared drive is restricted to its members"
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["drive"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const returnData = [];
  const options = this.getNodeParameter("options", i, {});
  const driveId = this.getNodeParameter("driveId", i, void 0, {
    extractValue: true
  });
  const body = {};
  Object.assign(body, options);
  const response = await import_transport.googleApiRequest.call(this, "PATCH", `/drive/v3/drives/${driveId}`, body);
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(response),
    { itemData: { item: i } }
  );
  returnData.push(...executionData);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=update.operation.js.map