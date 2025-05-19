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
var formCompletionUtils_exports = {};
__export(formCompletionUtils_exports, {
  binaryResponse: () => binaryResponse,
  renderFormCompletion: () => renderFormCompletion
});
module.exports = __toCommonJS(formCompletionUtils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./utils");
const getBinaryDataFromNode = (context, nodeName) => {
  return context.evaluateExpression(`{{ $('${nodeName}').first().binary }}`);
};
const binaryResponse = async (context) => {
  const inputDataFieldName = context.getNodeParameter("inputDataFieldName", "");
  const parentNodes = context.getParentNodes(context.getNode().name);
  const binaryNode = parentNodes.reverse().find((node) => getBinaryDataFromNode(context, node?.name)?.hasOwnProperty(inputDataFieldName));
  if (!binaryNode) {
    throw new import_n8n_workflow.OperationalError(`No binary data with field ${inputDataFieldName} found.`);
  }
  const binaryData = getBinaryDataFromNode(context, binaryNode?.name)[inputDataFieldName];
  return {
    // If a binaryData has an id, the following field is set:
    // N8N_DEFAULT_BINARY_DATA_MODE=filesystem
    data: binaryData.id ? await context.helpers.binaryToBuffer(await context.helpers.getBinaryStream(binaryData.id)) : atob(binaryData.data),
    fileName: binaryData.fileName ?? "file",
    type: binaryData.mimeType
  };
};
const renderFormCompletion = async (context, res, trigger) => {
  const completionTitle = context.getNodeParameter("completionTitle", "");
  const completionMessage = context.getNodeParameter("completionMessage", "");
  const redirectUrl = context.getNodeParameter("redirectUrl", "");
  const options = context.getNodeParameter("options", {});
  const responseText = context.getNodeParameter("responseText", "");
  const binary = context.getNodeParameter("respondWith", "") === "returnBinary" ? await binaryResponse(context) : "";
  let title = options.formTitle;
  if (!title) {
    title = context.evaluateExpression(`{{ $('${trigger?.name}').params.formTitle }}`);
  }
  const appendAttribution = context.evaluateExpression(
    `{{ $('${trigger?.name}').params.options?.appendAttribution === false ? false : true }}`
  );
  res.render("form-trigger-completion", {
    title: completionTitle,
    message: completionMessage,
    formTitle: title,
    appendAttribution,
    responseText: (0, import_utils.sanitizeHtml)(responseText),
    responseBinary: encodeURIComponent(JSON.stringify(binary)),
    dangerousCustomCss: (0, import_utils.sanitizeCustomCss)(options.customCss),
    redirectUrl
  });
  return { noWebhookResponse: true };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  binaryResponse,
  renderFormCompletion
});
//# sourceMappingURL=formCompletionUtils.js.map