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
var getAll_operation_exports = {};
__export(getAll_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getAll_operation_exports);
var import_descriptions = require("../../../../../utils/descriptions");
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  ...import_descriptions.returnAllOrLimit,
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Filter by Type",
        name: "filter",
        type: "multiOptions",
        default: [],
        options: [
          {
            name: "Guild Text",
            value: 0
          },
          {
            name: "Guild Voice",
            value: 2
          },
          {
            name: "Guild Category",
            value: 4
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["channel"],
    operation: ["getAll"]
  },
  hide: {
    authentication: ["webhook"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(guildId) {
  const returnData = [];
  try {
    const returnAll = this.getNodeParameter("returnAll", 0, false);
    let response = await import_transport.discordApiRequest.call(this, "GET", `/guilds/${guildId}/channels`);
    if (!returnAll) {
      const limit = this.getNodeParameter("limit", 0);
      response = response.slice(0, limit);
    }
    const options = this.getNodeParameter("options", 0, {});
    if (options.filter) {
      const filter = options.filter;
      response = response.filter((item) => filter.includes(item.type));
    }
    const executionData = this.helpers.constructExecutionMetaData(
      this.helpers.returnJsonArray(response),
      { itemData: { item: 0 } }
    );
    returnData.push(...executionData);
  } catch (error) {
    const err = import_utils.parseDiscordError.call(this, error);
    if (this.continueOnFail()) {
      returnData.push(...import_utils.prepareErrorData.call(this, err, 0));
    }
    throw err;
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getAll.operation.js.map