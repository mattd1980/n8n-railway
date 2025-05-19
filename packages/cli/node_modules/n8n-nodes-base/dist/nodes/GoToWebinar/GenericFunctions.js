"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  goToWebinarApiRequest: () => goToWebinarApiRequest,
  goToWebinarApiRequestAllItems: () => goToWebinarApiRequestAllItems,
  handleGetAll: () => handleGetAll,
  loadAnswers: () => loadAnswers,
  loadRegistranMultiChoiceQuestions: () => loadRegistranMultiChoiceQuestions,
  loadRegistranSimpleQuestions: () => loadRegistranSimpleQuestions,
  loadWebinarSessions: () => loadWebinarSessions,
  loadWebinars: () => loadWebinars
});
module.exports = __toCommonJS(GenericFunctions_exports);
var losslessJSON = __toESM(require("lossless-json"));
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
function convertLosslessNumber(_, value) {
  if (value?.isLosslessNumber) {
    return value.toString();
  } else {
    return value;
  }
}
async function goToWebinarApiRequest(method, endpoint, qs, body, option = {}) {
  const operation = this.getNodeParameter("operation", 0);
  const resource = this.getNodeParameter("resource", 0);
  const options = {
    headers: {
      "user-agent": "n8n",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method,
    uri: `https://api.getgo.com/G2W/rest/v2/${endpoint}`,
    qs,
    body: JSON.stringify(body),
    json: false
  };
  if (resource === "session" && operation === "getAll") {
    options.headers.Accept = "application/vnd.citrix.g2wapi-v1.1+json";
  }
  if (["GET", "DELETE"].includes(method)) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  if (Object.keys(option)) {
    Object.assign(options, option);
  }
  try {
    const response = await this.helpers.requestOAuth2.call(this, "goToWebinarOAuth2Api", options, {
      tokenExpiredStatusCode: 403
    });
    if (response === "") {
      return {};
    }
    return losslessJSON.parse(response, convertLosslessNumber);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function goToWebinarApiRequestAllItems(method, endpoint, query, body, resource) {
  const resourceToResponseKey = {
    session: "sessionInfoResources",
    webinar: "webinars"
  };
  const key = resourceToResponseKey[resource];
  let returnData = [];
  let responseData;
  do {
    responseData = await goToWebinarApiRequest.call(this, method, endpoint, query, body);
    if (responseData.page && parseInt(responseData.page.totalElements, 10) === 0) {
      return [];
    } else if (responseData._embedded?.[key]) {
      returnData.push(...responseData._embedded[key]);
    } else {
      returnData.push(...responseData);
    }
    const limit = query.limit;
    if (limit && returnData.length >= limit) {
      returnData = returnData.splice(0, limit);
      return returnData;
    }
  } while (responseData.totalElements && parseInt(responseData.totalElements, 10) > returnData.length);
  return returnData;
}
async function handleGetAll(endpoint, qs, body, resource) {
  const returnAll = this.getNodeParameter("returnAll", 0);
  if (!returnAll) {
    qs.limit = this.getNodeParameter("limit", 0);
  }
  return await goToWebinarApiRequestAllItems.call(this, "GET", endpoint, qs, body, resource);
}
async function loadWebinars() {
  const { oauthTokenData } = await this.getCredentials("goToWebinarOAuth2Api");
  const endpoint = `accounts/${oauthTokenData.account_key}/webinars`;
  const qs = {
    fromTime: (0, import_moment_timezone.default)().subtract(1, "years").format(),
    toTime: (0, import_moment_timezone.default)().add(1, "years").format()
  };
  const resourceItems = await goToWebinarApiRequestAllItems.call(
    this,
    "GET",
    endpoint,
    qs,
    {},
    "webinar"
  );
  const returnData = [];
  resourceItems.forEach((item) => {
    returnData.push({
      name: item.subject,
      value: item.webinarKey
    });
  });
  return returnData;
}
async function loadWebinarSessions() {
  const { oauthTokenData } = await this.getCredentials("goToWebinarOAuth2Api");
  const webinarKey = this.getCurrentNodeParameter("webinarKey");
  const endpoint = `organizers/${oauthTokenData.organizer_key}/webinars/${webinarKey}/sessions`;
  const resourceItems = await goToWebinarApiRequestAllItems.call(
    this,
    "GET",
    endpoint,
    {},
    {},
    "session"
  );
  const returnData = [];
  resourceItems.forEach((item) => {
    returnData.push({
      name: `Date: ${(0, import_moment_timezone.default)(item.startTime).format("MM-DD-YYYY")} | From: ${(0, import_moment_timezone.default)(
        item.startTime
      ).format("LT")} - To: ${(0, import_moment_timezone.default)(item.endTime).format("LT")}`,
      value: item.sessionKey
    });
  });
  return returnData;
}
async function loadRegistranSimpleQuestions() {
  const { oauthTokenData } = await this.getCredentials("goToWebinarOAuth2Api");
  const webinarkey = this.getNodeParameter("webinarKey");
  const endpoint = `organizers/${oauthTokenData.organizer_key}/webinars/${webinarkey}/registrants/fields`;
  const { questions } = await goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
  const returnData = [];
  questions.forEach((item) => {
    if (item.type === "shortAnswer") {
      returnData.push({
        name: item.question,
        value: item.questionKey
      });
    }
  });
  return returnData;
}
async function loadAnswers() {
  const { oauthTokenData } = await this.getCredentials("goToWebinarOAuth2Api");
  const webinarKey = this.getCurrentNodeParameter("webinarKey");
  const questionKey = this.getCurrentNodeParameter("questionKey");
  const endpoint = `organizers/${oauthTokenData.organizer_key}/webinars/${webinarKey}/registrants/fields`;
  const { questions } = await goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
  const returnData = [];
  questions.forEach((item) => {
    if (item.type === "multiChoice" && item.questionKey === questionKey) {
      for (const answer of item.answers) {
        returnData.push({
          name: answer.answer,
          value: answer.answerKey
        });
      }
    }
  });
  return returnData;
}
async function loadRegistranMultiChoiceQuestions() {
  const { oauthTokenData } = await this.getCredentials("goToWebinarOAuth2Api");
  const webinarkey = this.getNodeParameter("webinarKey");
  const endpoint = `organizers/${oauthTokenData.organizer_key}/webinars/${webinarkey}/registrants/fields`;
  const { questions } = await goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
  const returnData = [];
  questions.forEach((item) => {
    if (item.type === "multipleChoice") {
      returnData.push({
        name: item.question,
        value: item.questionKey
      });
    }
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  goToWebinarApiRequest,
  goToWebinarApiRequestAllItems,
  handleGetAll,
  loadAnswers,
  loadRegistranMultiChoiceQuestions,
  loadRegistranSimpleQuestions,
  loadWebinarSessions,
  loadWebinars
});
//# sourceMappingURL=GenericFunctions.js.map