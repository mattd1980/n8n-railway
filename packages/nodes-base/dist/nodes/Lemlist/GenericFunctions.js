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
  getEvents: () => getEvents,
  lemlistApiRequest: () => lemlistApiRequest,
  lemlistApiRequestAllItems: () => lemlistApiRequestAllItems
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
async function lemlistApiRequest(method, endpoint, body = {}, qs = {}, option = {}) {
  const options = {
    headers: {},
    method,
    uri: `https://api.lemlist.com/api${endpoint}`,
    qs,
    body,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  if (Object.keys(option)) {
    Object.assign(options, option);
  }
  return await this.helpers.requestWithAuthentication.call(this, "lemlistApi", options);
}
async function lemlistApiRequestAllItems(method, endpoint, qs = {}) {
  const returnData = [];
  let responseData;
  qs.limit = 100;
  qs.offset = 0;
  if (qs.version && qs.version === "v2") {
    qs.page = 1;
    do {
      responseData = await lemlistApiRequest.call(this, method, endpoint, {}, qs);
      returnData.push(...responseData);
      qs.page++;
    } while (responseData.totalPage && qs.page < responseData.totalPage);
    return returnData;
  } else {
    do {
      responseData = await lemlistApiRequest.call(this, method, endpoint, {}, qs);
      returnData.push(...responseData);
      qs.offset += qs.limit;
    } while (responseData.length !== 0);
    return returnData;
  }
}
function getEvents() {
  const events = [
    "*",
    "contacted",
    "hooked",
    "attracted",
    "warmed",
    "interested",
    "skipped",
    "notInterested",
    "emailsSent",
    "emailsOpened",
    "emailsClicked",
    "emailsReplied",
    "emailsBounced",
    "emailsSendFailed",
    "emailsFailed",
    "emailsUnsubscribed",
    "emailsInterested",
    "emailsNotInterested",
    "opportunitiesDone",
    "aircallCreated",
    "aircallEnded",
    "aircallDone",
    "aircallInterested",
    "aircallNotInterested",
    "apiDone",
    "apiInterested",
    "apiNotInterested",
    "apiFailed",
    "linkedinVisitDone",
    "linkedinVisitFailed",
    "linkedinInviteDone",
    "linkedinInviteFailed",
    "linkedinInviteAccepted",
    "linkedinReplied",
    "linkedinSent",
    "linkedinVoiceNoteDone",
    "linkedinVoiceNoteFailed",
    "linkedinInterested",
    "linkedinNotInterested",
    "linkedinSendFailed",
    "manualInterested",
    "manualNotInterested",
    "paused",
    "resumed",
    "customDomainErrors",
    "connectionIssue",
    "sendLimitReached",
    "lemwarmPaused"
  ];
  return events.map((event) => ({
    name: event === "*" ? "*" : (0, import_change_case.capitalCase)(event).replace("Linkedin", "LinkedIn"),
    value: event
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEvents,
  lemlistApiRequest,
  lemlistApiRequestAllItems
});
//# sourceMappingURL=GenericFunctions.js.map