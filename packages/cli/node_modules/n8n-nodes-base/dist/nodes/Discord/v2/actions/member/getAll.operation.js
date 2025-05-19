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
var import_common = require("../common.description");
const properties = [
  ...import_descriptions.returnAllOrLimit,
  {
    displayName: "After",
    name: "after",
    type: "string",
    default: "",
    placeholder: "e.g. 786953432728469534",
    description: "The ID of the user after which to return the members"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [import_common.simplifyBoolean]
  }
];
const displayOptions = {
  show: {
    resource: ["member"],
    operation: ["getAll"]
  },
  hide: {
    authentication: ["webhook"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(guildId) {
  const returnData = [];
  const returnAll = this.getNodeParameter("returnAll", 0, false);
  const after = this.getNodeParameter("after", 0);
  const qs = {};
  if (!returnAll) {
    const limit = this.getNodeParameter("limit", 0);
    qs.limit = limit;
  }
  if (after) {
    qs.after = after;
  }
  let response = [];
  try {
    if (!returnAll) {
      const limit = this.getNodeParameter("limit", 0);
      qs.limit = limit;
      response = await import_transport.discordApiRequest.call(
        this,
        "GET",
        `/guilds/${guildId}/members`,
        void 0,
        qs
      );
    } else {
      let responseData;
      qs.limit = 100;
      do {
        responseData = await import_transport.discordApiRequest.call(
          this,
          "GET",
          `/guilds/${guildId}/members`,
          void 0,
          qs
        );
        if (!responseData?.length) break;
        qs.after = responseData[responseData.length - 1].user.id;
        response.push(...responseData);
      } while (responseData.length);
    }
    const simplify = this.getNodeParameter("options.simplify", 0, false);
    if (simplify) {
      const simplifyResponse = (0, import_utils.createSimplifyFunction)(["user", "roles", "permissions"]);
      response = response.map(simplifyResponse);
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