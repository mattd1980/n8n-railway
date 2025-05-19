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
var GoogleCloudStorage_node_exports = {};
__export(GoogleCloudStorage_node_exports, {
  GoogleCloudStorage: () => GoogleCloudStorage
});
module.exports = __toCommonJS(GoogleCloudStorage_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_BucketDescription = require("./BucketDescription");
var import_ObjectDescription = require("./ObjectDescription");
class GoogleCloudStorage {
  constructor() {
    this.description = {
      displayName: "Google Cloud Storage",
      name: "googleCloudStorage",
      icon: "file:googleCloudStorage.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Use the Google Cloud Storage API",
      defaults: {
        name: "Google Cloud Storage"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googleCloudStorageOAuth2Api",
          required: true,
          testedBy: {
            request: {
              method: "GET",
              url: "/b/"
            }
          }
        }
      ],
      requestDefaults: {
        returnFullResponse: true,
        baseURL: "https://storage.googleapis.com/storage/v1"
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Bucket",
              value: "bucket"
            },
            {
              name: "Object",
              value: "object"
            }
          ],
          default: "bucket"
        },
        // BUCKET
        ...import_BucketDescription.bucketOperations,
        ...import_BucketDescription.bucketFields,
        // OBJECT
        ...import_ObjectDescription.objectOperations,
        ...import_ObjectDescription.objectFields
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleCloudStorage
});
//# sourceMappingURL=GoogleCloudStorage.node.js.map