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
var description_exports = {};
__export(description_exports, {
  channelRestoreDescription: () => channelRestoreDescription
});
module.exports = __toCommonJS(description_exports);
const channelRestoreDescription = [
  {
    displayName: "Channel ID",
    name: "channelId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["restore"],
        resource: ["channel"]
      }
    },
    description: "The ID of the channel to restore"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelRestoreDescription
});
//# sourceMappingURL=description.js.map