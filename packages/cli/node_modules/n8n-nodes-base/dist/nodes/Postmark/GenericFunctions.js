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
  convertTriggerObjectToStringArray: () => convertTriggerObjectToStringArray,
  eventExists: () => eventExists,
  postmarkApiRequest: () => postmarkApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function postmarkApiRequest(method, endpoint, body = {}, option = {}) {
  let options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    method,
    body,
    uri: "https://api.postmarkapp.com" + endpoint,
    json: true
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  options = Object.assign({}, options, option);
  try {
    return await this.helpers.requestWithAuthentication.call(this, "postmarkApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function convertTriggerObjectToStringArray(webhookObject) {
  const triggers = webhookObject.Triggers;
  const webhookEvents = [];
  if (triggers.Open.Enabled) {
    webhookEvents.push("open");
  }
  if (triggers.Open.PostFirstOpenOnly) {
    webhookEvents.push("firstOpen");
  }
  if (triggers.Click.Enabled) {
    webhookEvents.push("click");
  }
  if (triggers.Delivery.Enabled) {
    webhookEvents.push("delivery");
  }
  if (triggers.Bounce.Enabled) {
    webhookEvents.push("bounce");
  }
  if (triggers.Bounce.IncludeContent) {
    webhookEvents.push("includeContent");
  }
  if (triggers.SpamComplaint.Enabled) {
    webhookEvents.push("spamComplaint");
  }
  if (triggers.SpamComplaint.IncludeContent) {
    if (!webhookEvents.includes("IncludeContent")) {
      webhookEvents.push("includeContent");
    }
  }
  if (triggers.SubscriptionChange.Enabled) {
    webhookEvents.push("subscriptionChange");
  }
  return webhookEvents;
}
function eventExists(currentEvents, webhookEvents) {
  for (const currentEvent of currentEvents) {
    if (!webhookEvents.includes(currentEvent)) {
      return false;
    }
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertTriggerObjectToStringArray,
  eventExists,
  postmarkApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map