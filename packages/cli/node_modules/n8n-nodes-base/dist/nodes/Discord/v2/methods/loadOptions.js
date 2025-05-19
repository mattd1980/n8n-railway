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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  getRoles: () => getRoles
});
module.exports = __toCommonJS(loadOptions_exports);
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function getRoles() {
  const guildId = this.getNodeParameter("guildId", void 0, {
    extractValue: true
  });
  const isOAuth2 = this.getNodeParameter("authentication", "") === "oAuth2";
  if (isOAuth2) {
    const userGuilds = await import_transport.discordApiRequest.call(
      this,
      "GET",
      "/users/@me/guilds"
    );
    (0, import_utils.checkAccessToGuild)(this.getNode(), guildId, userGuilds);
  }
  let response = await import_transport.discordApiRequest.call(this, "GET", `/guilds/${guildId}/roles`);
  const operations = this.getNodeParameter("operation");
  if (operations === "roleRemove") {
    const userId = this.getNodeParameter("userId", void 0, {
      extractValue: true
    });
    const userRoles = (await import_transport.discordApiRequest.call(this, "GET", `/guilds/${guildId}/members/${userId}`)).roles || [];
    response = response.filter((role) => {
      return userRoles.includes(role.id);
    });
  }
  return response.filter((role) => role.name !== "@everyone" && !role.managed).map((role) => ({
    name: role.name,
    value: role.id
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRoles
});
//# sourceMappingURL=loadOptions.js.map