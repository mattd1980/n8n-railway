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
var BubbleApi_credentials_exports = {};
__export(BubbleApi_credentials_exports, {
  BubbleApi: () => BubbleApi
});
module.exports = __toCommonJS(BubbleApi_credentials_exports);
class BubbleApi {
  constructor() {
    this.name = "bubbleApi";
    this.displayName = "Bubble API";
    this.documentationUrl = "bubble";
    this.properties = [
      {
        displayName: "API Token",
        name: "apiToken",
        type: "string",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "App Name",
        name: "appName",
        type: "string",
        default: ""
      },
      {
        displayName: "Environment",
        name: "environment",
        type: "options",
        default: "live",
        options: [
          {
            name: "Development",
            value: "development"
          },
          {
            name: "Live",
            value: "live"
          }
        ]
      },
      {
        displayName: "Hosting",
        name: "hosting",
        type: "options",
        default: "bubbleHosted",
        options: [
          {
            name: "Bubble-Hosted",
            value: "bubbleHosted"
          },
          {
            name: "Self-Hosted",
            value: "selfHosted"
          }
        ]
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        placeholder: "mydomain.com",
        default: "",
        displayOptions: {
          show: {
            hosting: ["selfHosted"]
          }
        }
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BubbleApi
});
//# sourceMappingURL=BubbleApi.credentials.js.map