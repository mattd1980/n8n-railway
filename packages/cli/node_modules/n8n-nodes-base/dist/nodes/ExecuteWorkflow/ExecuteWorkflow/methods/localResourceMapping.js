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
var localResourceMapping_exports = {};
__export(localResourceMapping_exports, {
  loadSubWorkflowInputs: () => loadSubWorkflowInputs
});
module.exports = __toCommonJS(localResourceMapping_exports);
var import_GenericFunctions = require("../../../../utils/workflowInputsResourceMapping/GenericFunctions");
async function loadSubWorkflowInputs() {
  const { fields, dataMode, subworkflowInfo } = await import_GenericFunctions.loadWorkflowInputMappings.bind(this)();
  let emptyFieldsNotice;
  if (fields.length === 0) {
    const { triggerId, workflowId } = subworkflowInfo ?? {};
    const path = (workflowId ?? "") + (triggerId ? `/${triggerId.slice(0, 6)}` : "");
    const subworkflowLink = workflowId ? `<a href="/workflow/${path}" target="_blank">sub-workflow\u2019s trigger</a>` : "sub-workflow\u2019s trigger";
    switch (dataMode) {
      case "passthrough":
        emptyFieldsNotice = `This sub-workflow will consume all input data passed to it. You can define specific expected input in the ${subworkflowLink}.`;
        break;
      default:
        emptyFieldsNotice = `The sub-workflow isn't set up to accept any inputs. Change this in the ${subworkflowLink}.`;
        break;
    }
  }
  return { fields, emptyFieldsNotice };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadSubWorkflowInputs
});
//# sourceMappingURL=localResourceMapping.js.map