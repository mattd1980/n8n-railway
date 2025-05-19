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
var deletePage_operation_exports = {};
__export(deletePage_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(deletePage_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Delete From ...",
    name: "location",
    type: "options",
    options: [
      {
        name: "Case",
        value: "case"
      },
      {
        name: "Knowledge Base",
        value: "knowledgeBase"
      }
    ],
    default: "knowledgeBase"
  },
  {
    ...import_descriptions.caseRLC,
    displayOptions: {
      show: {
        location: ["case"]
      }
    }
  },
  import_descriptions.pageRLC
];
const displayOptions = {
  show: {
    resource: ["page"],
    operation: ["deletePage"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const location = this.getNodeParameter("location", i);
  const pageId = this.getNodeParameter("pageId", i, "", { extractValue: true });
  let endpoint;
  if (location === "case") {
    const caseId = this.getNodeParameter("caseId", i, "", { extractValue: true });
    endpoint = `/v1/case/${caseId}/page/${pageId}`;
  } else {
    endpoint = `/v1/page/${pageId}`;
  }
  await import_transport.theHiveApiRequest.call(this, "DELETE", endpoint);
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)({ success: true }), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=deletePage.operation.js.map