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
  extractErrorDescription: () => extractErrorDescription,
  formatFeed: () => formatFeed,
  formatResults: () => formatResults,
  formatSearch: () => formatSearch,
  getId: () => getId,
  parseXml: () => parseXml,
  populate: () => populate,
  setCount: () => setCount,
  splunkApiRequest: () => splunkApiRequest,
  toUnixEpoch: () => toUnixEpoch
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_xml2js = require("xml2js");
var import_types = require("./types");
function compactEntryContent(splunkObject) {
  if (typeof splunkObject !== "object") {
    return {};
  }
  if (Array.isArray(splunkObject)) {
    return splunkObject.reduce((acc, cur) => {
      acc = { ...acc, ...compactEntryContent(cur) };
      return acc;
    }, {});
  }
  if (splunkObject[import_types.SPLUNK.DICT]) {
    const obj = splunkObject[import_types.SPLUNK.DICT][import_types.SPLUNK.KEY];
    return { [splunkObject.$.name]: compactEntryContent(obj) };
  }
  if (splunkObject[import_types.SPLUNK.LIST]) {
    const items = splunkObject[import_types.SPLUNK.LIST][import_types.SPLUNK.ITEM];
    return { [splunkObject.$.name]: items };
  }
  if (splunkObject._) {
    return {
      [splunkObject.$.name]: splunkObject._
    };
  }
  return {
    [splunkObject.$.name]: ""
  };
}
function formatEntryContent(content) {
  return content[import_types.SPLUNK.DICT][import_types.SPLUNK.KEY].reduce((acc, cur) => {
    acc = { ...acc, ...compactEntryContent(cur) };
    return acc;
  }, {});
}
function formatEntry(entry) {
  const { content, link, ...rest } = entry;
  const formattedEntry = { ...rest, ...formatEntryContent(content) };
  if (formattedEntry.id) {
    formattedEntry.entryUrl = formattedEntry.id;
    formattedEntry.id = formattedEntry.id.split("/").pop();
  }
  return formattedEntry;
}
function formatSearch(responseData) {
  const { entry: entries } = responseData;
  if (!entries) return [];
  return Array.isArray(entries) ? entries.map(formatEntry) : [formatEntry(entries)];
}
async function parseXml(xml) {
  return await new Promise((resolve, reject) => {
    (0, import_xml2js.parseString)(xml, { explicitArray: false }, (error, result) => {
      error ? reject(error) : resolve(result);
    });
  });
}
function extractErrorDescription(rawError) {
  const messages = rawError.response?.messages;
  return messages ? { [messages.msg.$.type.toLowerCase()]: messages.msg._ } : rawError;
}
function toUnixEpoch(timestamp) {
  return Date.parse(timestamp) / 1e3;
}
async function splunkApiRequest(method, endpoint, body = {}, qs = {}) {
  const { baseUrl, allowUnauthorizedCerts } = await this.getCredentials("splunkApi");
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method,
    form: body,
    qs,
    uri: `${baseUrl}${endpoint}`,
    json: true,
    rejectUnauthorized: !allowUnauthorizedCerts,
    useQuerystring: true
    // serialize roles array as `roles=A&roles=B`
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  let result;
  try {
    let attempts = 0;
    do {
      try {
        const response = await this.helpers.requestWithAuthentication.call(
          this,
          "splunkApi",
          options
        );
        result = await parseXml(response);
        return result;
      } catch (error) {
        if (attempts >= 5) {
          throw error;
        }
        await (0, import_n8n_workflow.sleep)(1e3);
        attempts++;
      }
    } while (true);
  } catch (error) {
    if (result === void 0) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No response from API call", {
        description: "Try to use 'Retry On Fail' option from node's settings"
      });
    }
    if (error?.cause?.code === "ECONNREFUSED") {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), { ...error, code: 401 });
    }
    const rawError = await parseXml(error.error);
    error = extractErrorDescription(rawError);
    if ("fatal" in error) {
      error = { error: error.fatal };
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
function formatFeed(responseData) {
  const { entry: entries } = responseData.feed;
  if (!entries) return [];
  return Array.isArray(entries) ? entries.map(formatEntry) : [formatEntry(entries)];
}
function compactResult(splunkObject) {
  if (typeof splunkObject !== "object") {
    return {};
  }
  if (Array.isArray(splunkObject?.value) && splunkObject?.value[0]?.text) {
    return {
      [splunkObject.$.k]: splunkObject.value.map((v) => v.text).join(",")
    };
  }
  if (!splunkObject?.$?.k || !splunkObject?.value?.text) {
    return {};
  }
  return {
    [splunkObject.$.k]: splunkObject.value.text
  };
}
function formatResult(field) {
  return field.reduce((acc, cur) => {
    acc = { ...acc, ...compactResult(cur) };
    return acc;
  }, {});
}
function formatResults(responseData) {
  const results = responseData.results.result;
  if (!results) return [];
  return Array.isArray(results) ? results.map((r) => formatResult(r.field)) : [formatResult(results.field)];
}
function setCount(qs) {
  qs.count = this.getNodeParameter("returnAll", 0) ? 0 : this.getNodeParameter("limit", 0);
}
function populate(source, destination) {
  if (Object.keys(source).length) {
    Object.assign(destination, source);
  }
}
function getId(i, idType, endpoint) {
  const id = this.getNodeParameter(idType, i);
  return id.includes(endpoint) ? id.split(endpoint).pop() : id;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractErrorDescription,
  formatFeed,
  formatResults,
  formatSearch,
  getId,
  parseXml,
  populate,
  setCount,
  splunkApiRequest,
  toUnixEpoch
});
//# sourceMappingURL=GenericFunctions.js.map