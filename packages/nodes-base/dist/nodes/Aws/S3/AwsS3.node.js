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
var AwsS3_node_exports = {};
__export(AwsS3_node_exports, {
  AwsS3: () => AwsS3
});
module.exports = __toCommonJS(AwsS3_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AwsS3V1 = require("./V1/AwsS3V1.node");
var import_AwsS3V2 = require("./V2/AwsS3V2.node");
class AwsS3 extends import_n8n_workflow.VersionedNodeType {
  constructor() {
    const baseDescription = {
      displayName: "AwsS3",
      name: "awsS3",
      icon: "file:s3.svg",
      group: ["output"],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Sends data to AWS S3",
      defaultVersion: 2
    };
    const nodeVersions = {
      1: new import_AwsS3V1.AwsS3V1(baseDescription),
      2: new import_AwsS3V2.AwsS3V2(baseDescription)
    };
    super(nodeVersions, baseDescription);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AwsS3
});
//# sourceMappingURL=AwsS3.node.js.map