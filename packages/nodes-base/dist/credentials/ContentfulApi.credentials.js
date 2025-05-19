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
var ContentfulApi_credentials_exports = {};
__export(ContentfulApi_credentials_exports, {
  ContentfulApi: () => ContentfulApi
});
module.exports = __toCommonJS(ContentfulApi_credentials_exports);
class ContentfulApi {
  constructor() {
    this.name = "contentfulApi";
    this.displayName = "Contentful API";
    this.documentationUrl = "contentful";
    this.properties = [
      {
        displayName: "Space ID",
        name: "spaceId",
        type: "string",
        default: "",
        required: true,
        description: "The ID for the Contentful space"
      },
      {
        displayName: "Content Delivery API Access Token",
        name: "ContentDeliveryaccessToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "Access token that has access to the space. Can be left empty if only Delivery API should be used."
      },
      {
        displayName: "Content Preview API Access Token",
        name: "ContentPreviewaccessToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: "Access token that has access to the space. Can be left empty if only Preview API should be used."
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContentfulApi
});
//# sourceMappingURL=ContentfulApi.credentials.js.map