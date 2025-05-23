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
  HeaderConstants: () => HeaderConstants,
  XMsVersion: () => XMsVersion,
  azureStorageApiRequest: () => azureStorageApiRequest,
  getBlobs: () => getBlobs,
  getCanonicalizedHeadersString: () => getCanonicalizedHeadersString,
  getCanonicalizedResourceString: () => getCanonicalizedResourceString,
  getContainers: () => getContainers,
  handleErrorPostReceive: () => handleErrorPostReceive,
  parseBlobList: () => parseBlobList,
  parseContainerList: () => parseContainerList,
  parseHeaders: () => parseHeaders
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_xml2js = require("xml2js");
var import_processors = require("xml2js/lib/processors");
var import_compare_header = require("./compare-header");
const XMsVersion = "2021-12-02";
const HeaderConstants = {
  AUTHORIZATION: "authorization",
  CONTENT_ENCODING: "content-encoding",
  CONTENT_LANGUAGE: "content-language",
  CONTENT_LENGTH: "content-length",
  CONTENT_MD5: "content-md5",
  CONTENT_TYPE: "content-Type",
  DATE: "date",
  ETAG: "etag",
  IF_MATCH: "if-match",
  IF_MODIFIED_SINCE: "if-Modified-since",
  IF_NONE_MATCH: "if-none-match",
  IF_UNMODIFIED_SINCE: "if-unmodified-since",
  ORIGIN: "origin",
  RANGE: "range",
  X_MS_COPY_SOURCE: "x-ms-copy-source",
  X_MS_DATE: "x-ms-date",
  X_MS_VERSION: "x-ms-version",
  X_MS_BLOB_TYPE: "x-ms-blob-type",
  X_MS_BLOB_CONTENT_DISPOSITION: "x-ms-blob-content-disposition",
  X_MS_BLOB_PUBLIC_ACCESS: "x-ms-blob-public-access",
  X_MS_HAS_IMMUTABILITY_POLICY: "x-ms-has-immutability-policy",
  X_MS_HAS_LEGAL_HOLD: "x-ms-has-legal-hold",
  X_MS_CONTENT_CRC64: "x-ms-content-crc64",
  X_MS_REQUEST_SERVER_ENCRYPTED: "x-ms-request-server-encrypted",
  X_MS_ENCRYPTION_SCOPE: "x-ms-encryption-scope",
  X_MS_VERSION_ID: "x-ms-version-id",
  X_MS_TAG_COUNT: "x-ms-tag-count",
  X_MS_COPY_PROGRESS: "x-ms-copy-progress",
  X_MS_INCREMENTAL_COPY: "x-ms-incremental-copy",
  X_MS_BLOB_SEQUENCE_NUMBER: "x-ms-blob-sequence-number",
  X_MS_BLOB_COMMITTED_BLOCK_COUNT: "x-ms-blob-committed-block-count",
  X_MS_SERVER_ENCRYPTED: "x-ms-server-encrypted",
  X_MS_ENCRYPTION_CONTEXT: "x-ms-encryption-context",
  X_MS_BLOB_CONTENT_MD5: "x-ms-blob-content-md5",
  X_MS_BLOB_SEALED: "x-ms-blob-sealed",
  X_MS_IMMUTABILITY_POLICY_UNTIL_DATE: "x-ms-immutability-policy-until-date",
  X_MS_IMMUTABILITY_POLICY_MODE: "x-ms-immutability-policy-mode",
  X_MS_LEGAL_HOLD: "x-ms-legal-hold",
  X_MS_DELETE_TYPE_PERMANENT: "x-ms-delete-type-permanent",
  X_MS_ACCESS_TIER: "x-ms-access-tier",
  X_MS_BLOB_CACHE_CONTROL: "x-ms-blob-cache-control",
  X_MS_LEASE_ID: "x-ms-lease-id",
  X_MS_BLOB_CONTENT_ENCODING: "x-ms-blob-content-encoding",
  X_MS_BLOB_CONTENT_LANGUAGE: "x-ms-blob-content-language",
  X_MS_BLOB_CONTENT_TYPE: "x-ms-blob-content-type",
  X_MS_EXPIRY_OPTION: "x-ms-expiry-option",
  X_MS_EXPIRY_TIME: "x-ms-expiry-time",
  X_MS_TAGS: "x-ms-tags",
  X_MS_UPN: "x-ms-upn",
  PREFIX_X_MS: "x-ms-",
  PREFIX_X_MS_META: "x-ms-meta-"
};
async function azureStorageApiRequest(method, endpoint, body = {}, qs, headers, url) {
  const authentication = this.getNodeParameter("authentication", 0);
  const credentialsType = authentication === "oAuth2" ? "azureStorageOAuth2Api" : "azureStorageSharedKeyApi";
  const credentials = await this.getCredentials(credentialsType);
  const options = {
    method,
    url: url ?? `${credentials.baseUrl}${endpoint}`,
    headers,
    body,
    qs
  };
  options.headers ??= {};
  options.headers[HeaderConstants.X_MS_DATE] = (/* @__PURE__ */ new Date()).toUTCString();
  options.headers[HeaderConstants.X_MS_VERSION] = XMsVersion;
  const response = await this.helpers.requestWithAuthentication.call(
    this,
    credentialsType,
    options
  );
  return response;
}
async function handleErrorPostReceive(data, response) {
  if (String(response.statusCode).startsWith("4") || String(response.statusCode).startsWith("5")) {
    const resource = this.getNodeParameter("resource");
    const operation = this.getNodeParameter("operation");
    const parser = new import_xml2js.Parser({
      explicitArray: false,
      tagNameProcessors: [import_processors.firstCharLowerCase]
    });
    const { error } = await parser.parseStringPromise(data[0].json) ?? {};
    if (error?.code === "InvalidAuthenticationInfo" && error?.authenticationErrorDetail === "Lifetime validation failed. The token is expired.") {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
        message: "Lifetime validation failed. The token is expired.",
        description: "Please check your credentials and try again"
      });
    }
    if (resource === "blob") {
      if (error?.code === "ContainerNotFound") {
        throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
          message: "The required container doesn't match any existing one",
          description: "Double-check the value in the parameter 'Container Name' and try again"
        });
      }
      if (operation === "create") {
        if (this.getNodeParameter("from") === "url" && (error?.code === "InvalidHeaderValue" && error?.headerName === HeaderConstants.X_MS_COPY_SOURCE || error?.code === "CannotVerifyCopySource")) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "The provided URL is invalid",
            description: "Double-check the value in the parameter 'URL' and try again"
          });
        }
      } else if (operation === "delete") {
        if (error?.code === "BlobNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "The required blob doesn't match any existing one",
            description: "Double-check the value in the parameter 'Blob to Delete' and try again"
          });
        }
      } else if (operation === "get") {
        if (error?.code === "BlobNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "The required blob doesn't match any existing one",
            description: "Double-check the value in the parameter 'Blob to Get' and try again"
          });
        }
      } else if (operation === "getAll") {
        if (error?.code === "InvalidQueryParameterValue" && this.getNodeParameter("fields", []).includes("permissions")) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "Permissions field is only supported for accounts with a hierarchical namespace enabled",
            description: "Exclude 'Permissions' from 'Fields' and try again"
          });
        }
        if (error?.code === "UnsupportedQueryParameter" && this.getNodeParameter("fields", []).includes("deleted") && this.getNodeParameter("filter", []).includes("deleted")) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "Including 'Deleted' field and filter is not supported",
            description: "Exclude 'Deleted' from 'Fields' or 'Filter' and try again"
          });
        }
      }
    } else if (resource === "container") {
      if (operation === "create") {
        if (error?.code === "ContainerAlreadyExists") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "The specified container already exists",
            description: "Use a unique value for 'Container Name' and try again"
          });
        }
        if (error?.code === "PublicAccessNotPermitted") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "Public access is not permitted on this storage account",
            description: "Check the 'Access Level' and try again"
          });
        }
      } else if (operation === "delete") {
        if (error?.code === "ContainerNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "The required container doesn't match any existing one",
            description: "Double-check the value in the parameter 'Container to Delete' and try again"
          });
        }
      } else if (operation === "get") {
        if (error?.code === "ContainerNotFound") {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error, {
            message: "The required container doesn't match any existing one",
            description: "Double-check the value in the parameter 'Container to Get' and try again"
          });
        }
      } else if (operation === "getAll") {
      }
    }
    if (error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
        message: error.code,
        description: error.message
      });
    } else {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), response, {
        parseXml: true
      });
    }
  }
  return data;
}
function getCanonicalizedHeadersString(requestOptions) {
  let headersArray = [];
  for (const [name, value] of Object.entries(requestOptions.headers)) {
    if (name.toLowerCase().startsWith(HeaderConstants.PREFIX_X_MS)) {
      headersArray.push({ name, value });
    }
  }
  headersArray.sort((a, b) => {
    return (0, import_compare_header.compareHeader)(a.name.toLowerCase(), b.name.toLowerCase());
  });
  headersArray = headersArray.filter((value, index, array) => {
    if (index > 0 && value.name.toLowerCase() === array[index - 1].name.toLowerCase()) {
      return false;
    }
    return true;
  });
  let canonicalizedHeadersStringToSign = "";
  headersArray.forEach((header) => {
    canonicalizedHeadersStringToSign += `${header.name.toLowerCase().trimEnd()}:${header.value.trimStart()}
`;
  });
  return canonicalizedHeadersStringToSign;
}
function getCanonicalizedResourceString(requestOptions, credentials) {
  const path = new URL(requestOptions.baseURL + requestOptions.url).pathname || "/";
  let canonicalizedResourceString = `/${credentials.account}${path}`;
  if (requestOptions.qs && Object.keys(requestOptions.qs).length > 0) {
    canonicalizedResourceString += "\n" + Object.keys(requestOptions.qs).sort().map(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (key) => `${key.toLowerCase()}:${decodeURIComponent(requestOptions.qs[key])}`
    ).join("\n");
  }
  return canonicalizedResourceString;
}
function parseHeaders(headers) {
  const parseBooleanHeaders = [
    HeaderConstants.X_MS_DELETE_TYPE_PERMANENT,
    HeaderConstants.X_MS_INCREMENTAL_COPY,
    HeaderConstants.X_MS_SERVER_ENCRYPTED,
    HeaderConstants.X_MS_BLOB_SEALED,
    HeaderConstants.X_MS_REQUEST_SERVER_ENCRYPTED,
    HeaderConstants.X_MS_HAS_IMMUTABILITY_POLICY,
    HeaderConstants.X_MS_HAS_LEGAL_HOLD
  ];
  const parseNumberHeaders = [
    HeaderConstants.X_MS_TAG_COUNT,
    HeaderConstants.CONTENT_LENGTH,
    HeaderConstants.X_MS_BLOB_SEQUENCE_NUMBER,
    HeaderConstants.X_MS_COPY_PROGRESS,
    HeaderConstants.X_MS_BLOB_COMMITTED_BLOCK_COUNT
  ];
  const result = {};
  const metadataKeys = Object.keys(headers).filter(
    (x) => x.startsWith(HeaderConstants.PREFIX_X_MS_META)
  );
  for (const key in headers) {
    if (metadataKeys.includes(key)) {
      continue;
    }
    let newKey = key.startsWith(HeaderConstants.PREFIX_X_MS) ? (0, import_change_case.camelCase)(key.replace(HeaderConstants.PREFIX_X_MS, "")) : (0, import_change_case.camelCase)(key);
    newKey = newKey.replace("-", "");
    const newValue = parseBooleanHeaders.includes(key) ? (0, import_processors.parseBooleans)(headers[key]) : parseNumberHeaders.includes(key) ? (0, import_processors.parseNumbers)(headers[key]) : headers[key];
    result[newKey] = newValue;
  }
  if (metadataKeys.length > 0) {
    result.metadata = {};
    for (const key of metadataKeys) {
      result.metadata[key.replace(HeaderConstants.PREFIX_X_MS_META, "")] = headers[key];
    }
  }
  return result;
}
async function parseBlobList(xml) {
  const parser = new import_xml2js.Parser({
    explicitArray: false,
    tagNameProcessors: [import_processors.firstCharLowerCase, (name) => name.replace("-", "")],
    valueProcessors: [
      function(value, name) {
        if ([
          "deleted",
          "isCurrentVersion",
          "serverEncrypted",
          "incrementalCopy",
          "accessTierInferred",
          "isSealed",
          "legalHold"
        ].includes(name)) {
          return (0, import_processors.parseBooleans)(value);
        } else if ([
          "maxResults",
          "contentLength",
          "blobSequenceNumber",
          "remainingRetentionDays",
          "tagCount",
          "content-Length"
        ].includes(name)) {
          return (0, import_processors.parseNumbers)(value);
        }
        return value;
      }
    ]
  });
  const data = await parser.parseStringPromise(xml);
  if (typeof data.enumerationResults.blobs !== "object") {
    return { blobs: [] };
  }
  if (!Array.isArray(data.enumerationResults.blobs.blob)) {
    data.enumerationResults.blobs.blob = [data.enumerationResults.blobs.blob];
  }
  for (const blob of data.enumerationResults.blobs.blob) {
    if (blob.tags) {
      if (!Array.isArray(blob.tags.tagSet.tag)) {
        blob.tags.tagSet.tag = [
          blob.tags.tagSet.tag
        ];
      }
      blob.tags = blob.tags.tagSet.tag;
    }
  }
  for (const container of data.enumerationResults.blobs.blob) {
    if (container.metadata === "") {
      delete container.metadata;
    }
    if (container.orMetadata === "") {
      delete container.orMetadata;
    }
  }
  return {
    blobs: data.enumerationResults.blobs.blob,
    maxResults: data.enumerationResults.maxResults,
    nextMarker: data.enumerationResults.nextMarker
  };
}
async function parseContainerList(xml) {
  const parser = new import_xml2js.Parser({
    explicitArray: false,
    tagNameProcessors: [import_processors.firstCharLowerCase, (name) => name.replace("-", "")],
    valueProcessors: [
      function(value, name) {
        if ([
          "deleted",
          "hasImmutabilityPolicy",
          "hasLegalHold",
          "preventEncryptionScopeOverride",
          "isImmutableStorageWithVersioningEnabled"
        ].includes(name)) {
          return (0, import_processors.parseBooleans)(value);
        } else if (["maxResults", "remainingRetentionDays"].includes(name)) {
          return (0, import_processors.parseNumbers)(value);
        }
        return value;
      }
    ]
  });
  const data = await parser.parseStringPromise(xml);
  if (typeof data.enumerationResults.containers !== "object") {
    return { containers: [] };
  }
  if (!Array.isArray(data.enumerationResults.containers.container)) {
    data.enumerationResults.containers.container = [data.enumerationResults.containers.container];
  }
  for (const container of data.enumerationResults.containers.container) {
    if (container.metadata === "") {
      delete container.metadata;
    }
  }
  return {
    containers: data.enumerationResults.containers.container,
    maxResults: data.enumerationResults.maxResults,
    nextMarker: data.enumerationResults.nextMarker
  };
}
async function getBlobs(filter, paginationToken) {
  const container = this.getNodeParameter("container");
  let response;
  const qs = {
    restype: "container",
    comp: "list"
  };
  if (paginationToken) {
    qs.marker = paginationToken;
    response = await azureStorageApiRequest.call(this, "GET", `/${container.value}`, {}, qs);
  } else {
    qs.maxresults = 5e3;
    if (filter) {
      qs.prefix = filter;
    }
    response = await azureStorageApiRequest.call(this, "GET", `/${container.value}`, {}, qs);
  }
  const data = await parseBlobList(response);
  const results = data.blobs.map((c) => ({
    name: c.name,
    value: c.name
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return {
    results,
    paginationToken: data.nextMarker
  };
}
async function getContainers(filter, paginationToken) {
  let response;
  const qs = {
    comp: "list"
  };
  if (paginationToken) {
    qs.marker = paginationToken;
    response = await azureStorageApiRequest.call(this, "GET", "/", {}, qs);
  } else {
    qs.maxresults = 5e3;
    if (filter) {
      qs.prefix = filter;
    }
    response = await azureStorageApiRequest.call(this, "GET", "/", {}, qs);
  }
  const data = await parseContainerList(response);
  const results = data.containers.map((c) => ({
    name: c.name,
    value: c.name
  })).sort(
    (a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" })
  );
  return {
    results,
    paginationToken: data.nextMarker
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HeaderConstants,
  XMsVersion,
  azureStorageApiRequest,
  getBlobs,
  getCanonicalizedHeadersString,
  getCanonicalizedResourceString,
  getContainers,
  handleErrorPostReceive,
  parseBlobList,
  parseContainerList,
  parseHeaders
});
//# sourceMappingURL=GenericFunctions.js.map