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
  rmmMuteDescription: () => rmmMuteDescription
});
module.exports = __toCommonJS(description_exports);
const rmmMuteDescription = [
  {
    displayName: "RMM Alert ID",
    name: "alertId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["mute"]
      }
    },
    default: "",
    description: "Mute the RMM alert by ID"
  },
  {
    displayName: "Mute Period",
    name: "muteFor",
    type: "options",
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["mute"]
      }
    },
    // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
    options: [
      {
        name: "1 Hour",
        value: "1-hour"
      },
      {
        name: "1 Day",
        value: "1-day"
      },
      {
        name: "2 Days",
        value: "2-days"
      },
      {
        name: "1 Week",
        value: "1-week"
      },
      {
        name: "2 Weeks",
        value: "2-weeks"
      },
      {
        name: "1 Month",
        value: "1-month"
      },
      {
        name: "Forever",
        value: "forever"
      }
    ],
    default: "",
    description: "Length of time to mute alert for"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rmmMuteDescription
});
//# sourceMappingURL=description.js.map