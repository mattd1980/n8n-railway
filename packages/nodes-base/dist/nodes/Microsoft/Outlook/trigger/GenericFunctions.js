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
  getPollResponse: () => getPollResponse
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../v2/helpers/utils");
var import_transport = require("../v2/transport");
async function getPollResponse(pollStartDate, pollEndDate) {
  let responseData;
  const qs = {};
  try {
    const filters = this.getNodeParameter("filters", {});
    const options = this.getNodeParameter("options", {});
    const output = this.getNodeParameter("output");
    if (output === "fields") {
      const fields = this.getNodeParameter("fields");
      if (options.downloadAttachments) {
        fields.push("hasAttachments");
      }
      qs.$select = fields.join(",");
    }
    if (output === "simple") {
      qs.$select = "id,conversationId,subject,bodyPreview,from,toRecipients,categories,hasAttachments";
    }
    const filterString = (0, import_utils.prepareFilterString)({ filters });
    if (filterString) {
      qs.$filter = filterString;
    }
    const endpoint = "/messages";
    if (this.getMode() !== "manual") {
      if (qs.$filter) {
        qs.$filter = `${qs.$filter} and receivedDateTime ge ${pollStartDate} and receivedDateTime lt ${pollEndDate}`;
      } else {
        qs.$filter = `receivedDateTime ge ${pollStartDate} and receivedDateTime lt ${pollEndDate}`;
      }
      responseData = await import_transport.microsoftApiRequestAllItems.call(
        this,
        "value",
        "GET",
        endpoint,
        void 0,
        qs
      );
    } else {
      qs.$top = 1;
      responseData = await import_transport.microsoftApiRequest.call(this, "GET", endpoint, void 0, qs);
      responseData = responseData.value;
    }
    if (output === "simple") {
      responseData = (0, import_utils.simplifyOutputMessages)(responseData);
    }
    let executionData = [];
    if (options.downloadAttachments) {
      const prefix = options.attachmentsPrefix || "attachment_";
      executionData = await import_transport.downloadAttachments.call(this, responseData, prefix);
    } else {
      executionData = this.helpers.returnJsonArray(responseData);
    }
    return executionData;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
      message: error.message,
      description: error.description
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPollResponse
});
//# sourceMappingURL=GenericFunctions.js.map