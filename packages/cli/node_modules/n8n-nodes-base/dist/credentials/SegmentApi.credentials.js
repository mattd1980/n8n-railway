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
var SegmentApi_credentials_exports = {};
__export(SegmentApi_credentials_exports, {
  SegmentApi: () => SegmentApi
});
module.exports = __toCommonJS(SegmentApi_credentials_exports);
class SegmentApi {
  constructor() {
    this.name = "segmentApi";
    this.displayName = "Segment API";
    this.documentationUrl = "segment";
    this.properties = [
      {
        displayName: "Write Key",
        name: "writekey",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
  async authenticate(credentials, requestOptions) {
    const base64Key = Buffer.from(`${credentials.writekey}:`).toString("base64");
    requestOptions.headers.Authorization = `Basic ${base64Key}`;
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SegmentApi
});
//# sourceMappingURL=SegmentApi.credentials.js.map