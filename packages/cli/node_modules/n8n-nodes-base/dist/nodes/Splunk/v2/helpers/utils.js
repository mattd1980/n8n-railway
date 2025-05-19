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
var utils_exports = {};
__export(utils_exports, {
  extractErrorDescription: () => extractErrorDescription,
  formatEntry: () => formatEntry,
  formatFeed: () => formatFeed,
  getId: () => getId,
  parseXml: () => parseXml,
  populate: () => populate,
  setReturnAllOrLimit: () => setReturnAllOrLimit,
  toUnixEpoch: () => toUnixEpoch
});
module.exports = __toCommonJS(utils_exports);
var import_xml2js = require("xml2js");
var import_types = require("../../v1/types");
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
function formatEntry(entry, doNotFormatContent = false) {
  const { content, link, ...rest } = entry;
  const formattedContent = doNotFormatContent ? content : formatEntryContent(content);
  const formattedEntry = { ...rest, ...formattedContent };
  if (formattedEntry.id) {
    formattedEntry.entryUrl = formattedEntry.id;
    formattedEntry.id = formattedEntry.id.split("/").pop();
  }
  return formattedEntry;
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
function formatFeed(responseData) {
  const { entry: entries } = responseData.feed;
  if (!entries) return [];
  return Array.isArray(entries) ? entries.map((entry) => formatEntry(entry)) : [formatEntry(entries)];
}
function setReturnAllOrLimit(qs) {
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
  formatEntry,
  formatFeed,
  getId,
  parseXml,
  populate,
  setReturnAllOrLimit,
  toUnixEpoch
});
//# sourceMappingURL=utils.js.map