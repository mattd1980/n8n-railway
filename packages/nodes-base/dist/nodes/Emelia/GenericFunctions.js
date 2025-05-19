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
  emeliaApiRequest: () => emeliaApiRequest,
  emeliaApiTest: () => emeliaApiTest,
  emeliaGraphqlRequest: () => emeliaGraphqlRequest,
  loadResource: () => loadResource
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function emeliaApiRequest(method, endpoint, body = {}, qs = {}) {
  const { apiKey } = await this.getCredentials("emeliaApi");
  const options = {
    headers: {
      Authorization: apiKey
    },
    method,
    body,
    qs,
    uri: `https://graphql.emelia.io${endpoint}`,
    json: true
  };
  try {
    return await this.helpers.request.call(this, options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function emeliaGraphqlRequest(body = {}) {
  const response = await emeliaApiRequest.call(this, "POST", "/graphql", body);
  if (response.errors) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
  }
  return response;
}
async function loadResource(resource) {
  const mapping = {
    campaign: {
      query: `
				query GetCampaigns {
					campaigns {
						_id
						name
					}
				}`,
      key: "campaigns"
    },
    contactList: {
      query: `
			query GetContactLists {
				contact_lists {
					_id
					name
				}
			}`,
      key: "contact_lists"
    }
  };
  const responseData = await emeliaGraphqlRequest.call(this, { query: mapping[resource].query });
  return responseData.data[mapping[resource].key].map(
    (campaign) => ({
      name: campaign.name,
      value: campaign._id
    })
  );
}
async function emeliaApiTest(credential) {
  const credentials = credential.data;
  const body = {
    query: `
				query all_campaigns {
					all_campaigns {
						_id
						name
						status
						createdAt
						stats {
							mailsSent
						}
					}
				}`,
    operationName: "all_campaigns"
  };
  const options = {
    headers: {
      Authorization: credentials?.apiKey
    },
    method: "POST",
    body,
    uri: "https://graphql.emelia.io/graphql",
    json: true
  };
  try {
    await this.helpers.request(options);
  } catch (error) {
    return {
      status: "Error",
      message: `Connection details not valid: ${error.message}`
    };
  }
  return {
    status: "OK",
    message: "Authentication successful!"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  emeliaApiRequest,
  emeliaApiTest,
  emeliaGraphqlRequest,
  loadResource
});
//# sourceMappingURL=GenericFunctions.js.map