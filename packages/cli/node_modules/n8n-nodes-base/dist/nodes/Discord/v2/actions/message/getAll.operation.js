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
  import_common.channelRLC,
  ...import_descriptions.returnAllOrLimit,
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
    resource: ["message"],
    operation: ["getAll"]
  },
  hide: {
    authentication: ["webhook"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(_guildId, userGuilds) {
  const returnData = [];
  const items = this.getInputData();
  const simplifyResponse = (0, import_utils.createSimplifyFunction)([
    "id",
    "channel_id",
    "author",
    "content",
    "timestamp",
    "type"
  ]);
  const getChannelId = await import_utils.setupChannelGetter.call(this, userGuilds);
  for (let i = 0; i < items.length; i++) {
    try {
      const channelId = await getChannelId(i);
      const returnAll = this.getNodeParameter("returnAll", i, false);
      const qs = {};
      let response = [];
      if (!returnAll) {
        const limit = this.getNodeParameter("limit", 0);
        qs.limit = limit;
        response = await import_transport.discordApiRequest.call(
          this,
          "GET",
          `/channels/${channelId}/messages`,
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
            `/channels/${channelId}/messages`,
            void 0,
            qs
          );
          if (!responseData?.length) break;
          qs.before = responseData[responseData.length - 1].id;
          response.push(...responseData);
        } while (responseData.length);
      }
      const simplify = this.getNodeParameter("options.simplify", i, false);
      if (simplify) {
        response = response.map(simplifyResponse);
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(response),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    } catch (error) {
      const err = import_utils.parseDiscordError.call(this, error, i);
      if (this.continueOnFail()) {
        returnData.push(...import_utils.prepareErrorData.call(this, err, i));
        continue;
      }
      throw err;
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getAll.operation.js.map