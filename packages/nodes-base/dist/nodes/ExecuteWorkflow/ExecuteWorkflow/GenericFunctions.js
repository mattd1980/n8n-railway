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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  getWorkflowInfo: () => getWorkflowInfo
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_promises = require("fs/promises");
var import_n8n_workflow = require("n8n-workflow");
async function getWorkflowInfo(source, itemIndex = 0) {
  const workflowInfo = {};
  const nodeVersion = this.getNode().typeVersion;
  if (source === "database") {
    if (nodeVersion === 1) {
      workflowInfo.id = this.getNodeParameter("workflowId", itemIndex);
    } else {
      const { value } = this.getNodeParameter(
        "workflowId",
        itemIndex,
        {}
      );
      workflowInfo.id = value;
    }
  } else if (source === "localFile") {
    const workflowPath = this.getNodeParameter("workflowPath", itemIndex);
    let workflowJson;
    try {
      workflowJson = await (0, import_promises.readFile)(workflowPath, { encoding: "utf8" });
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The file "${workflowPath}" could not be found, [item ${itemIndex}]`
        );
      }
      throw error;
    }
    workflowInfo.code = (0, import_n8n_workflow.jsonParse)(workflowJson);
  } else if (source === "parameter") {
    const workflowJson = this.getNodeParameter("workflowJson", itemIndex);
    workflowInfo.code = (0, import_n8n_workflow.jsonParse)(workflowJson);
  } else if (source === "url") {
    const workflowUrl = this.getNodeParameter("workflowUrl", itemIndex);
    const requestOptions = {
      headers: {
        accept: "application/json,text/*;q=0.99"
      },
      method: "GET",
      uri: workflowUrl,
      json: true,
      gzip: true
    };
    const response = await this.helpers.request(requestOptions);
    workflowInfo.code = response;
  }
  return workflowInfo;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWorkflowInfo
});
//# sourceMappingURL=GenericFunctions.js.map