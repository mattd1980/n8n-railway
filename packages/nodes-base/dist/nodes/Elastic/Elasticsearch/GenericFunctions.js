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
  elasticsearchApiRequest: () => elasticsearchApiRequest,
  elasticsearchApiRequestAllItems: () => elasticsearchApiRequestAllItems,
  elasticsearchBulkApiRequest: () => elasticsearchBulkApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function elasticsearchBulkApiRequest(body) {
  const { baseUrl, ignoreSSLIssues } = await this.getCredentials("elasticsearchApi");
  const bulkBody = Object.values(body).flat().join("\n") + "\n";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-ndjson" },
    body: bulkBody,
    url: `${baseUrl.replace(/\/$/, "")}/_bulk`,
    skipSslCertificateValidation: ignoreSSLIssues,
    returnFullResponse: true,
    ignoreHttpStatusErrors: true
  };
  const response = await this.helpers.httpRequestWithAuthentication.call(
    this,
    "elasticsearchApi",
    options
  );
  if (response.statusCode > 299) {
    if (this.continueOnFail()) {
      return Object.values(body).map((_) => ({ error: response.body.error }));
    } else {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), { error: response.body.error });
    }
  }
  return response.body.items.map((item) => {
    return {
      ...item.index,
      ...item.update,
      ...item.create,
      ...item.delete,
      ...item.error
    };
  });
}
async function elasticsearchApiRequest(method, endpoint, body = {}, qs = {}) {
  const { baseUrl, ignoreSSLIssues } = await this.getCredentials("elasticsearchApi");
  const options = {
    method,
    body,
    qs,
    url: `${baseUrl.replace(/\/$/, "")}${endpoint}`,
    json: true,
    skipSslCertificateValidation: ignoreSSLIssues
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  try {
    return await this.helpers.httpRequestWithAuthentication.call(this, "elasticsearchApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function elasticsearchApiRequestAllItems(indexId, body = {}, qs = {}) {
  try {
    let pit = (await elasticsearchApiRequest.call(this, "POST", `/${indexId}/_pit`, {}, { keep_alive: "1m" }))?.id;
    let returnData = [];
    let responseData;
    let searchAfter = [];
    const requestBody = {
      ...body,
      size: 1e4,
      pit: {
        id: pit,
        keep_alive: "1m"
      },
      track_total_hits: false
      //Disable the tracking of total hits to speed up pagination
    };
    responseData = await elasticsearchApiRequest.call(this, "POST", "/_search", requestBody, qs);
    if (responseData?.hits?.hits) {
      returnData = returnData.concat(responseData.hits.hits);
      const lastHitIndex = responseData.hits.hits.length - 1;
      searchAfter = responseData.hits.hits[lastHitIndex].sort;
      pit = responseData.pit_id;
    } else {
      return [];
    }
    while (true) {
      requestBody.search_after = searchAfter;
      requestBody.pit = { id: pit, keep_alive: "1m" };
      responseData = await elasticsearchApiRequest.call(this, "POST", "/_search", requestBody, qs);
      if (responseData?.hits?.hits?.length) {
        returnData = returnData.concat(responseData.hits.hits);
        const lastHitIndex = responseData.hits.hits.length - 1;
        searchAfter = responseData.hits.hits[lastHitIndex].sort;
        pit = responseData.pit_id;
      } else {
        break;
      }
    }
    await elasticsearchApiRequest.call(this, "DELETE", "/_pit", { id: pit });
    return returnData;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  elasticsearchApiRequest,
  elasticsearchApiRequestAllItems,
  elasticsearchBulkApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map