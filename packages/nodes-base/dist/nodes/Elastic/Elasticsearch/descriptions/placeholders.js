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
var placeholders_exports = {};
__export(placeholders_exports, {
  aliases: () => aliases,
  document: () => document,
  indexSettings: () => indexSettings,
  mappings: () => mappings,
  query: () => query
});
module.exports = __toCommonJS(placeholders_exports);
const indexSettings = `{
  "settings": {
    "index": {
      "number_of_shards": 3,
      "number_of_replicas": 2
    }
  }
}`;
const mappings = `{
  "mappings": {
    "properties": {
      "field1": { "type": "text" }
    }
  }
}`;
const aliases = `{
  "aliases": {
    "alias_1": {},
    "alias_2": {
      "filter": {
        "term": { "user.id": "kimchy" }
      },
      "routing": "shard-1"
    }
  }
}`;
const query = `{
  "query": {
    "term": {
      "user.id": "john"
    }
  }
}`;
const document = `{
  "timestamp": "2099-05-06T16:21:15.000Z",
  "event": {
    "original": "192.0.2.42 - - [06/May/2099:16:21:15 +0000] "GET /images/bg.jpg HTTP/1.0" 200 24736"
  }
}`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aliases,
  document,
  indexSettings,
  mappings,
  query
});
//# sourceMappingURL=placeholders.js.map