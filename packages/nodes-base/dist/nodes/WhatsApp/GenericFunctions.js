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
  WHATSAPP_BASE_URL: () => WHATSAPP_BASE_URL,
  appWebhookSubscriptionCreate: () => appWebhookSubscriptionCreate,
  appWebhookSubscriptionDelete: () => appWebhookSubscriptionDelete,
  appWebhookSubscriptionList: () => appWebhookSubscriptionList,
  createMessage: () => createMessage
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
const WHATSAPP_BASE_URL = "https://graph.facebook.com/v13.0/";
async function appAccessTokenRead() {
  const credentials = await this.getCredentials("whatsAppTriggerApi");
  const options = {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: {
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      grant_type: "client_credentials"
    },
    url: "https://graph.facebook.com/v19.0/oauth/access_token",
    json: true
  };
  try {
    return await this.helpers.httpRequest.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function whatsappApiRequest(method, resource, body, qs = {}) {
  const tokenResponse = await appAccessTokenRead.call(this);
  const appAccessToken = tokenResponse.access_token;
  const options = {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${appAccessToken}`
    },
    method,
    qs,
    body: body?.payload,
    url: `https://graph.facebook.com/v19.0${resource}`,
    json: true
  };
  try {
    return await this.helpers.httpRequest.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function appWebhookSubscriptionList(appId) {
  const response = await whatsappApiRequest.call(
    this,
    "GET",
    `/${appId}/subscriptions`
  );
  return response.data;
}
async function appWebhookSubscriptionCreate(appId, subscription) {
  return await whatsappApiRequest.call(this, "POST", `/${appId}/subscriptions`, {
    type: "form",
    payload: { ...subscription }
  });
}
async function appWebhookSubscriptionDelete(appId, object) {
  return await whatsappApiRequest.call(this, "DELETE", `/${appId}/subscriptions`, {
    type: "form",
    payload: { object }
  });
}
const createMessage = (sendAndWaitConfig, phoneNumberId, recipientPhoneNumber, instanceId) => {
  const buttons = sendAndWaitConfig.options.map((option) => {
    return `*${option.label}:*
_${sendAndWaitConfig.url}?approved=${option.value}_

`;
  });
  let n8nAttribution = "";
  if (sendAndWaitConfig.appendAttribution) {
    const attributionText = "This message was sent automatically with ";
    const link = (0, import_utilities.createUtmCampaignLink)("n8n-nodes-base.whatsapp", instanceId);
    n8nAttribution = `

${attributionText}${link}`;
  }
  return {
    baseURL: WHATSAPP_BASE_URL,
    method: "POST",
    url: `${phoneNumberId}/messages`,
    body: {
      messaging_product: "whatsapp",
      text: {
        body: `${sendAndWaitConfig.message}

${buttons.join("")}${n8nAttribution}`
      },
      type: "text",
      to: recipientPhoneNumber
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WHATSAPP_BASE_URL,
  appWebhookSubscriptionCreate,
  appWebhookSubscriptionDelete,
  appWebhookSubscriptionList,
  createMessage
});
//# sourceMappingURL=GenericFunctions.js.map