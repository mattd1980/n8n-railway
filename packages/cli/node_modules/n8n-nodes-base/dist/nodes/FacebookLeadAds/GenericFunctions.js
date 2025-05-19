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
  appAccessTokenRead: () => appAccessTokenRead,
  appWebhookSubscriptionCreate: () => appWebhookSubscriptionCreate,
  appWebhookSubscriptionDelete: () => appWebhookSubscriptionDelete,
  appWebhookSubscriptionList: () => appWebhookSubscriptionList,
  facebookApiRequest: () => facebookApiRequest,
  facebookAppApiRequest: () => facebookAppApiRequest,
  facebookEntityDetail: () => facebookEntityDetail,
  facebookFormList: () => facebookFormList,
  facebookPageApiRequest: () => facebookPageApiRequest,
  facebookPageList: () => facebookPageList,
  installAppOnPage: () => installAppOnPage
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function facebookApiRequest(method, resource, body = {}, qs = {}) {
  const options = {
    headers: {
      accept: "application/json"
    },
    method,
    qs,
    body,
    gzip: true,
    uri: `https://graph.facebook.com/v21.0${resource}`,
    json: true
  };
  try {
    return await this.helpers.requestOAuth2.call(this, "facebookLeadAdsOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
      message: error?.error?.error?.message
    });
  }
}
async function appAccessTokenRead() {
  const credentials = await this.getCredentials("facebookLeadAdsOAuth2Api");
  const options = {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    form: {
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      grant_type: "client_credentials"
    },
    uri: credentials.accessTokenUrl,
    json: true
  };
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function facebookAppApiRequest(method, resource, body, qs = {}) {
  const tokenResponse = await appAccessTokenRead.call(this);
  const appAccessToken = tokenResponse.access_token;
  const options = {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${appAccessToken}`
    },
    method,
    qs,
    gzip: true,
    uri: `https://graph.facebook.com/v21.0${resource}`,
    json: true
  };
  if (body?.type === "json") {
    options.body = body.payload;
  } else if (body?.type === "form") {
    options.form = body.payload;
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function appWebhookSubscriptionList(appId) {
  const response = await facebookAppApiRequest.call(
    this,
    "GET",
    `/${appId}/subscriptions`
  );
  return response.data;
}
async function appWebhookSubscriptionCreate(appId, subscription) {
  return await facebookAppApiRequest.call(this, "POST", `/${appId}/subscriptions`, {
    type: "form",
    payload: { ...subscription }
  });
}
async function appWebhookSubscriptionDelete(appId, object) {
  return await facebookAppApiRequest.call(this, "DELETE", `/${appId}/subscriptions`, {
    type: "form",
    payload: { object }
  });
}
async function facebookPageList(cursor) {
  const response = await facebookApiRequest.call(
    this,
    "GET",
    "/me/accounts",
    {},
    { cursor, fields: "id,name" }
  );
  return response;
}
async function facebookEntityDetail(entityId, fields = "id,name,access_token") {
  return await facebookApiRequest.call(this, "GET", `/${entityId}`, {}, { fields });
}
async function facebookPageApiRequest(method, resource, body = {}, qs = {}) {
  const pageId = this.getNodeParameter("page", "", { extractValue: true });
  const page = await facebookEntityDetail.call(this, pageId);
  const pageAccessToken = page.access_token;
  const options = {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${pageAccessToken}`
    },
    method,
    qs,
    body,
    gzip: true,
    uri: `https://graph.facebook.com/v21.0${resource}`,
    json: true
  };
  try {
    return await this.helpers.request.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function installAppOnPage(pageId, fields) {
  return await facebookPageApiRequest.call(
    this,
    "POST",
    `/${pageId}/subscribed_apps`,
    {},
    { subscribed_fields: fields }
  );
}
async function facebookFormList(pageId, cursor) {
  const response = await facebookPageApiRequest.call(
    this,
    "GET",
    `/${pageId}/leadgen_forms`,
    {},
    { cursor, fields: "id,name" }
  );
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appAccessTokenRead,
  appWebhookSubscriptionCreate,
  appWebhookSubscriptionDelete,
  appWebhookSubscriptionList,
  facebookApiRequest,
  facebookAppApiRequest,
  facebookEntityDetail,
  facebookFormList,
  facebookPageApiRequest,
  facebookPageList,
  installAppOnPage
});
//# sourceMappingURL=GenericFunctions.js.map