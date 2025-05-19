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
  ticketGetDescription: () => ticketGetDescription
});
module.exports = __toCommonJS(description_exports);
const ticketGetDescription = [
  {
    displayName: "Ticket ID",
    name: "ticketId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["ticket"],
        operation: ["get"]
      }
    },
    default: "",
    description: "Get specific customer by ID"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ticketGetDescription
});
//# sourceMappingURL=description.js.map