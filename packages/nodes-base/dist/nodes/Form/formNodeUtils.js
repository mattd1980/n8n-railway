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
var formNodeUtils_exports = {};
__export(formNodeUtils_exports, {
  renderFormNode: () => renderFormNode
});
module.exports = __toCommonJS(formNodeUtils_exports);
var import_utils = require("./utils");
const renderFormNode = async (context, res, trigger, fields, mode) => {
  const options = context.getNodeParameter("options", {});
  let title = options.formTitle;
  if (!title) {
    title = context.evaluateExpression(`{{ $('${trigger?.name}').params.formTitle }}`);
  }
  let buttonLabel = options.buttonLabel;
  if (!buttonLabel) {
    buttonLabel = context.evaluateExpression(
      `{{ $('${trigger?.name}').params.options?.buttonLabel }}`
    ) || "Submit";
  }
  const appendAttribution = context.evaluateExpression(
    `{{ $('${trigger?.name}').params.options?.appendAttribution === false ? false : true }}`
  );
  (0, import_utils.renderForm)({
    context,
    res,
    formTitle: title,
    formDescription: options.formDescription,
    formFields: fields,
    responseMode: "responseNode",
    mode,
    redirectUrl: void 0,
    appendAttribution,
    buttonLabel,
    customCss: options.customCss
  });
  return {
    noWebhookResponse: true
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderFormNode
});
//# sourceMappingURL=formNodeUtils.js.map