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
  REDACTED: () => REDACTED,
  binaryContentTypes: () => binaryContentTypes,
  getOAuth2AdditionalParameters: () => getOAuth2AdditionalParameters,
  getSecrets: () => getSecrets,
  prepareRequestBody: () => prepareRequestBody,
  reduceAsync: () => reduceAsync,
  replaceNullValues: () => replaceNullValues,
  sanitizeUiMessage: () => sanitizeUiMessage,
  setAgentOptions: () => setAgentOptions
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_form_data = __toESM(require("form-data"));
var import_get = __toESM(require("lodash/get"));
var import_isPlainObject = __toESM(require("lodash/isPlainObject"));
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
const replaceNullValues = (item) => {
  if (item.json === null) {
    item.json = {};
  }
  return item;
};
const REDACTED = "**hidden**";
function isObject(obj) {
  return (0, import_isPlainObject.default)(obj);
}
function redact(obj, secrets) {
  if (typeof obj === "string") {
    return secrets.reduce((safe, secret) => safe.replace(secret, REDACTED), obj);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => redact(item, secrets));
  } else if (isObject(obj)) {
    for (const [key, value] of Object.entries(obj)) {
      obj[key] = redact(value, secrets);
    }
  }
  return obj;
}
function sanitizeUiMessage(request, authDataKeys, secrets) {
  const { body, ...rest } = request;
  let sendRequest = { body };
  for (const [key, value] of Object.entries(rest)) {
    sendRequest[key] = (0, import_n8n_workflow.deepCopy)(value);
  }
  if (Buffer.isBuffer(sendRequest.body) && sendRequest.body.length > 25e4) {
    sendRequest = {
      ...request,
      body: `Binary data got replaced with this text. Original was a Buffer with a size of ${request.body.length} bytes.`
    };
  }
  for (const requestProperty of Object.keys(authDataKeys)) {
    sendRequest = {
      ...sendRequest,
      [requestProperty]: Object.keys(sendRequest[requestProperty]).reduce(
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        (acc, curr) => {
          acc[curr] = authDataKeys[requestProperty].includes(curr) ? REDACTED : sendRequest[requestProperty][curr];
          return acc;
        },
        {}
      )
    };
  }
  const HEADER_BLOCKLIST = /* @__PURE__ */ new Set([
    "authorization",
    "x-api-key",
    "x-auth-token",
    "cookie",
    "proxy-authorization",
    "sslclientcert"
  ]);
  const headers = sendRequest.headers;
  if (headers) {
    for (const headerName of Object.keys(headers)) {
      if (HEADER_BLOCKLIST.has(headerName.toLowerCase())) {
        headers[headerName] = REDACTED;
      }
    }
  }
  if (secrets && secrets.length > 0) {
    return redact(sendRequest, secrets);
  }
  return sendRequest;
}
function getSecrets(properties, credentials) {
  const sensitivePropNames = new Set(
    properties.filter((prop) => prop.typeOptions?.password).map((prop) => prop.name)
  );
  const secrets = Object.entries(credentials).filter(([propName]) => sensitivePropNames.has(propName)).map(([_, value]) => value).filter((value) => typeof value === "string");
  const oauthAccessToken = (0, import_get.default)(credentials, "oauthTokenData.access_token");
  if (typeof oauthAccessToken === "string") {
    secrets.push(oauthAccessToken);
  }
  return secrets;
}
const getOAuth2AdditionalParameters = (nodeCredentialType) => {
  const oAuth2Options = {
    bitlyOAuth2Api: {
      tokenType: "Bearer"
    },
    boxOAuth2Api: {
      includeCredentialsOnRefreshOnBody: true
    },
    ciscoWebexOAuth2Api: {
      tokenType: "Bearer"
    },
    clickUpOAuth2Api: {
      keepBearer: false,
      tokenType: "Bearer"
    },
    goToWebinarOAuth2Api: {
      tokenExpiredStatusCode: 403
    },
    hubspotDeveloperApi: {
      tokenType: "Bearer",
      includeCredentialsOnRefreshOnBody: true
    },
    hubspotOAuth2Api: {
      tokenType: "Bearer",
      includeCredentialsOnRefreshOnBody: true
    },
    lineNotifyOAuth2Api: {
      tokenType: "Bearer"
    },
    linkedInOAuth2Api: {
      tokenType: "Bearer"
    },
    mailchimpOAuth2Api: {
      tokenType: "Bearer"
    },
    mauticOAuth2Api: {
      includeCredentialsOnRefreshOnBody: true
    },
    microsoftAzureMonitorOAuth2Api: {
      tokenExpiredStatusCode: 403
    },
    microsoftDynamicsOAuth2Api: {
      property: "id_token"
    },
    philipsHueOAuth2Api: {
      tokenType: "Bearer"
    },
    raindropOAuth2Api: {
      includeCredentialsOnRefreshOnBody: true
    },
    shopifyOAuth2Api: {
      tokenType: "Bearer",
      keyToIncludeInAccessTokenHeader: "X-Shopify-Access-Token"
    },
    slackOAuth2Api: {
      tokenType: "Bearer",
      property: "authed_user.access_token"
    },
    stravaOAuth2Api: {
      includeCredentialsOnRefreshOnBody: true
    }
  };
  return oAuth2Options[nodeCredentialType];
};
const binaryContentTypes = [
  "image/",
  "audio/",
  "video/",
  "application/octet-stream",
  "application/gzip",
  "application/zip",
  "application/vnd.rar",
  "application/epub+zip",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-cdf",
  "application/vnd.amazon.ebook",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-fontobject",
  "application/vnd.oasis.opendocument.presentation",
  "application/pdf",
  "application/x-tar",
  "application/vnd.visio",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/x-7z-compressed"
];
async function reduceAsync(arr, reducer, init = Promise.resolve({})) {
  return await arr.reduce(async (promiseAcc, item) => {
    return await reducer(await promiseAcc, item);
  }, init);
}
const prepareRequestBody = async (parameters, bodyType, version, defaultReducer) => {
  if (bodyType === "json" && version >= 4) {
    return await parameters.reduce(async (acc, entry) => {
      const result = await acc;
      (0, import_set.default)(result, entry.name, entry.value);
      return result;
    }, Promise.resolve({}));
  } else if (bodyType === "multipart-form-data" && version >= 4.2) {
    const formData = new import_form_data.default();
    for (const parameter of parameters) {
      if (parameter.parameterType === "formBinaryData") {
        const entry = await defaultReducer({}, parameter);
        const key = Object.keys(entry)[0];
        const data = entry[key];
        formData.append(key, data.value, data.options);
        continue;
      }
      formData.append(parameter.name, parameter.value);
    }
    return formData;
  } else {
    return await reduceAsync(parameters, defaultReducer);
  }
};
const setAgentOptions = (requestOptions, sslCertificates) => {
  if (sslCertificates) {
    const agentOptions = {};
    if (sslCertificates.ca) agentOptions.ca = (0, import_utilities.formatPrivateKey)(sslCertificates.ca);
    if (sslCertificates.cert) agentOptions.cert = (0, import_utilities.formatPrivateKey)(sslCertificates.cert);
    if (sslCertificates.key) agentOptions.key = (0, import_utilities.formatPrivateKey)(sslCertificates.key);
    if (sslCertificates.passphrase)
      agentOptions.passphrase = (0, import_utilities.formatPrivateKey)(sslCertificates.passphrase);
    requestOptions.agentOptions = agentOptions;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  REDACTED,
  binaryContentTypes,
  getOAuth2AdditionalParameters,
  getSecrets,
  prepareRequestBody,
  reduceAsync,
  replaceNullValues,
  sanitizeUiMessage,
  setAgentOptions
});
//# sourceMappingURL=GenericFunctions.js.map