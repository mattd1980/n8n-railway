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
  campaignFieldsMetadata: () => campaignFieldsMetadata,
  mailchimpApiRequest: () => mailchimpApiRequest,
  mailchimpApiRequestAllItems: () => mailchimpApiRequestAllItems,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function getMetadata(oauthTokenData) {
  const credentials = await this.getCredentials("mailchimpOAuth2Api");
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `OAuth ${oauthTokenData.access_token}`
    },
    method: "GET",
    url: credentials.metadataUrl,
    json: true
  };
  return await this.helpers.request(options);
}
async function mailchimpApiRequest(endpoint, method, body = {}, qs = {}, _headers) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const host = "api.mailchimp.com/3.0";
  const options = {
    headers: {
      Accept: "application/json"
    },
    method,
    qs,
    body,
    url: "",
    json: true
  };
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  try {
    if (authenticationMethod === "apiKey") {
      const credentials = await this.getCredentials("mailchimpApi");
      if (!credentials.apiKey.includes("-")) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "The API key is not valid!");
      }
      const datacenter = credentials.apiKey.split("-").pop();
      options.url = `https://${datacenter}.${host}${endpoint}`;
      return await this.helpers.requestWithAuthentication.call(this, "mailchimpApi", options);
    } else {
      const credentials = await this.getCredentials("mailchimpOAuth2Api");
      const { api_endpoint } = await getMetadata.call(
        this,
        credentials.oauthTokenData
      );
      options.url = `${api_endpoint}/3.0${endpoint}`;
      return await this.helpers.requestOAuth2.call(this, "mailchimpOAuth2Api", options, {
        tokenType: "Bearer"
      });
    }
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function mailchimpApiRequestAllItems(endpoint, method, propertyName, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.offset = 0;
  query.count = 500;
  do {
    responseData = await mailchimpApiRequest.call(this, endpoint, method, body, query);
    returnData.push.apply(returnData, responseData[propertyName]);
    query.offset += query.count;
  } while (responseData[propertyName] && responseData[propertyName].length !== 0);
  return returnData;
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = "";
  }
  return result;
}
const campaignFieldsMetadata = [
  "*",
  "campaigns.id",
  "campaigns.web_id",
  "campaigns.type",
  "campaigns.create_time",
  "campaigns.archive_url",
  "campaigns.long_archive_url",
  "campaigns.status",
  "campaigns.emails_sent",
  "campaigns.send_time",
  "campaigns.content_type",
  "campaigns.needs_block_refresh",
  "campaigns.resendable",
  "campaigns.recipients",
  "campaigns.recipients.list_id",
  "campaigns.recipients.list_is_active",
  "campaigns.recipients.list_name",
  "campaigns.recipients.segment_text",
  "campaigns.recipients.recipient_count",
  "campaigns.settings",
  "campaigns.settings.subject_line",
  "campaigns.settings.preview_text",
  "campaigns.settings.title",
  "campaigns.settings.from_name",
  "campaigns.settings.reply_to",
  "campaigns.settings.use_conversation",
  "campaigns.settings.to_name",
  "campaigns.settings.folder_id",
  "campaigns.settings.authenticate",
  "campaigns.settings.auto_footer",
  "campaigns.settings.inline_css",
  "campaigns.settings.auto_tweet",
  "campaigns.settings.fb_comments",
  "campaigns.settings.timewarp",
  "campaigns.settings.template_id",
  "campaigns.settings.drag_and_drop",
  "campaigns.tracking",
  "campaigns.tracking.opens",
  "campaigns.tracking.html_clicks",
  "campaigns.tracking.text_clicks",
  "campaigns.tracking.goal_tracking",
  "campaigns.tracking.ecomm360",
  "campaigns.tracking.google_analytics",
  "campaigns.tracking.clicktale",
  "campaigns.report_summary",
  "campaigns.report_summary.opens",
  "campaigns.report_summary.unique_opens",
  "campaigns.report_summary.open_rate",
  "campaigns.report_summary.clicks",
  "campaigns.report_summary.subscriber_clicks",
  "campaigns.report_summary.click_rate",
  "campaigns.report_summary.click_rate.ecommerce",
  "campaigns.report_summary.click_rate.ecommerce.total_orders",
  "campaigns.report_summary.click_rate.ecommerce.total_spent",
  "campaigns.report_summary.click_rate.ecommerce.total_revenue",
  "campaigns.report_summary.delivery_status.enabled",
  "campaigns._links"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  campaignFieldsMetadata,
  mailchimpApiRequest,
  mailchimpApiRequestAllItems,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map