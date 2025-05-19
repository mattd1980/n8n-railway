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
var CollectionFunctions_exports = {};
__export(CollectionFunctions_exports, {
  createCollectionEntry: () => createCollectionEntry,
  getAllCollectionEntries: () => getAllCollectionEntries,
  getAllCollectionNames: () => getAllCollectionNames
});
module.exports = __toCommonJS(CollectionFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
async function createCollectionEntry(resourceName, data, id) {
  const body = {
    data
  };
  if (id) {
    body.data = {
      _id: id,
      ...body.data
    };
  }
  return await import_GenericFunctions.cockpitApiRequest.call(this, "POST", `/collections/save/${resourceName}`, body);
}
async function getAllCollectionEntries(resourceName, options) {
  const body = {};
  if (options.fields) {
    const fields = options.fields.split(",").map((field) => field.trim());
    const bodyFields = {
      _id: false
    };
    for (const field of fields) {
      bodyFields[field] = true;
    }
    body.fields = bodyFields;
  }
  if (options.filter) {
    body.filter = (0, import_n8n_workflow.jsonParse)(options.filter.toString(), {
      errorMessage: "'Filter' option is not valid JSON"
    });
  }
  if (options.limit) {
    body.limit = options.limit;
  }
  if (options.skip) {
    body.skip = options.skip;
  }
  if (options.sort) {
    body.sort = (0, import_n8n_workflow.jsonParse)(options.sort.toString(), {
      errorMessage: "'Sort' option is not valid JSON"
    });
  }
  if (options.populate) {
    body.populate = options.populate;
  }
  body.simple = true;
  if (options.rawData) {
    body.simple = !options.rawData;
  }
  if (options.language) {
    body.lang = options.language;
  }
  return await import_GenericFunctions.cockpitApiRequest.call(this, "POST", `/collections/get/${resourceName}`, body);
}
async function getAllCollectionNames() {
  return await import_GenericFunctions.cockpitApiRequest.call(this, "GET", "/collections/listCollections", {});
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCollectionEntry,
  getAllCollectionEntries,
  getAllCollectionNames
});
//# sourceMappingURL=CollectionFunctions.js.map