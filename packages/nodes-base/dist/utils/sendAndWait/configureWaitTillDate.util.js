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
var configureWaitTillDate_util_exports = {};
__export(configureWaitTillDate_util_exports, {
  configureWaitTillDate: () => configureWaitTillDate
});
module.exports = __toCommonJS(configureWaitTillDate_util_exports);
var import_n8n_workflow = require("n8n-workflow");
function configureWaitTillDate(context, location = "options") {
  let waitTill = import_n8n_workflow.WAIT_INDEFINITELY;
  let limitOptions = {};
  if (location === "options") {
    limitOptions = context.getNodeParameter("options.limitWaitTime.values", 0, {});
  } else {
    const limitWaitTime = context.getNodeParameter("limitWaitTime", 0, false);
    if (limitWaitTime) {
      limitOptions.limitType = context.getNodeParameter("limitType", 0, "afterTimeInterval");
      if (limitOptions.limitType === "afterTimeInterval") {
        limitOptions.resumeAmount = context.getNodeParameter("resumeAmount", 0, 1);
        limitOptions.resumeUnit = context.getNodeParameter("resumeUnit", 0, "hours");
      } else {
        limitOptions.maxDateAndTime = context.getNodeParameter("maxDateAndTime", 0, "");
      }
    }
  }
  if (Object.keys(limitOptions).length) {
    try {
      if (limitOptions.limitType === "afterTimeInterval") {
        let waitAmount = limitOptions.resumeAmount;
        if (limitOptions.resumeUnit === "minutes") {
          waitAmount *= 60;
        }
        if (limitOptions.resumeUnit === "hours") {
          waitAmount *= 60 * 60;
        }
        if (limitOptions.resumeUnit === "days") {
          waitAmount *= 60 * 60 * 24;
        }
        waitAmount *= 1e3;
        waitTill = new Date((/* @__PURE__ */ new Date()).getTime() + waitAmount);
      } else {
        waitTill = new Date(limitOptions.maxDateAndTime);
      }
      if (isNaN(waitTill.getTime())) {
        throw new import_n8n_workflow.ApplicationError("Invalid date format");
      }
    } catch (error) {
      throw new import_n8n_workflow.NodeOperationError(context.getNode(), "Could not configure Limit Wait Time", {
        description: error.message
      });
    }
  }
  return waitTill;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configureWaitTillDate
});
//# sourceMappingURL=configureWaitTillDate.util.js.map