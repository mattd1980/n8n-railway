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
  awsApiRequest: () => awsApiRequest,
  awsApiRequestREST: () => awsApiRequestREST,
  awsApiRequestSOAP: () => awsApiRequestSOAP,
  simplify: () => simplify,
  validateCredentials: () => validateCredentials
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_aws4 = require("aws4");
var import_n8n_workflow = require("n8n-workflow");
var import_url = require("url");
var import_xml2js = require("xml2js");
function getEndpointForService(service, credentials) {
  let endpoint;
  if (service === "lambda" && credentials.lambdaEndpoint) {
    endpoint = credentials.lambdaEndpoint;
  } else if (service === "sns" && credentials.snsEndpoint) {
    endpoint = credentials.snsEndpoint;
  } else {
    endpoint = `https://${service}.${credentials.region}.amazonaws.com`;
  }
  return endpoint.replace("{region}", credentials.region);
}
async function awsApiRequest(service, method, path, body, headers) {
  const credentials = await this.getCredentials("aws");
  const requestOptions = {
    qs: {
      service,
      path
    },
    method,
    body,
    url: "",
    headers,
    region: credentials?.region
  };
  try {
    return await this.helpers.requestWithAuthentication.call(this, "aws", requestOptions);
  } catch (error) {
    if (error?.response?.data || error?.response?.body) {
      const errorMessage = error?.response?.data || error?.response?.body;
      if (errorMessage.includes("AccessDeniedException")) {
        const user = JSON.parse(errorMessage).Message.split(" ")[1];
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message: "Unauthorized \u2014 please check your AWS policy configuration",
          description: `Make sure an identity-based policy allows user ${user} to perform textract:AnalyzeExpense`
        });
      }
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function awsApiRequestREST(service, method, path, body, headers) {
  const response = await awsApiRequest.call(this, service, method, path, body, headers);
  try {
    return JSON.parse(response);
  } catch (error) {
    return response;
  }
}
async function awsApiRequestSOAP(service, method, path, body, headers) {
  const response = await awsApiRequest.call(this, service, method, path, body, headers);
  try {
    return await new Promise((resolve, reject) => {
      (0, import_xml2js.parseString)(response, { explicitArray: false }, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  } catch (error) {
    return response;
  }
}
function simplify(data) {
  const result = {};
  for (const document of data.ExpenseDocuments) {
    for (const field of document.SummaryFields) {
      result[field?.Type?.Text || field?.LabelDetection?.Text] = field.ValueDetection.Text;
    }
  }
  return result;
}
async function validateCredentials(decryptedCredentials, service) {
  const credentials = decryptedCredentials;
  const endpoint = new import_url.URL(
    getEndpointForService(service, credentials) + "?Action=GetCallerIdentity&Version=2011-06-15"
  );
  const signOpts = {
    host: endpoint.host,
    method: "POST",
    path: "?Action=GetCallerIdentity&Version=2011-06-15"
  };
  const securityHeaders = {
    accessKeyId: `${credentials.accessKeyId}`.trim(),
    secretAccessKey: `${credentials.secretAccessKey}`.trim(),
    sessionToken: credentials.temporaryCredentials ? `${credentials.sessionToken}`.trim() : void 0
  };
  (0, import_aws4.sign)(signOpts, securityHeaders);
  const options = {
    headers: signOpts.headers,
    method: "POST",
    uri: endpoint.href,
    body: signOpts.body
  };
  const response = await this.helpers.request(options);
  return await new Promise((resolve, reject) => {
    (0, import_xml2js.parseString)(response, { explicitArray: false }, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awsApiRequest,
  awsApiRequestREST,
  awsApiRequestSOAP,
  simplify,
  validateCredentials
});
//# sourceMappingURL=GenericFunctions.js.map