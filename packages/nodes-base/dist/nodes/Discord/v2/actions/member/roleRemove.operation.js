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
var roleRemove_operation_exports = {};
__export(roleRemove_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(roleRemove_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.description");
const properties = [import_common.userRLC, import_common.roleMultiOptions];
const displayOptions = {
  show: {
    resource: ["member"],
    operation: ["roleRemove"]
  },
  hide: {
    authentication: ["webhook"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(guildId) {
  const returnData = [];
  const items = this.getInputData();
  for (let i = 0; i < items.length; i++) {
    try {
      const userId = this.getNodeParameter("userId", i, void 0, {
        extractValue: true
      });
      const roles = this.getNodeParameter("role", i, []);
      for (const roleId of roles) {
        await import_transport.discordApiRequest.call(
          this,
          "DELETE",
          `/guilds/${guildId}/members/${userId}/roles/${roleId}`
        );
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray({ success: true }),
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
//# sourceMappingURL=roleRemove.operation.js.map