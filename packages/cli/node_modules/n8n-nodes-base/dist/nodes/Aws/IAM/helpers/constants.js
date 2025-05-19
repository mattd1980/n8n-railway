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
var constants_exports = {};
__export(constants_exports, {
  BASE_URL: () => BASE_URL,
  CURRENT_VERSION: () => CURRENT_VERSION,
  ERROR_DESCRIPTIONS: () => ERROR_DESCRIPTIONS
});
module.exports = __toCommonJS(constants_exports);
const CURRENT_VERSION = "2010-05-08";
const BASE_URL = "https://iam.amazonaws.com";
const ERROR_DESCRIPTIONS = {
  EntityAlreadyExists: {
    User: "The given user name already exists - try entering a unique name for the user.",
    Group: "The given group name already exists - try entering a unique name for the group."
  },
  NoSuchEntity: {
    User: "The given user was not found - try entering a different user.",
    Group: "The given group was not found - try entering a different group."
  },
  DeleteConflict: {
    Default: "Cannot delete entity, please remove users from group first."
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BASE_URL,
  CURRENT_VERSION,
  ERROR_DESCRIPTIONS
});
//# sourceMappingURL=constants.js.map