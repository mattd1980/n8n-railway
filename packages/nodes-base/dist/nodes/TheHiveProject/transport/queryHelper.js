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
var queryHelper_exports = {};
__export(queryHelper_exports, {
  theHiveApiQuery: () => theHiveApiQuery
});
module.exports = __toCommonJS(queryHelper_exports);
var import_requestApi = require("./requestApi");
var import_utils = require("../helpers/utils");
async function theHiveApiQuery(scope, filters, sortFields, limit, returnCount = false, extraData) {
  const query = [];
  if (scope.id) {
    query.push({
      _name: scope.query,
      idOrName: scope.id
    });
  } else {
    query.push({
      _name: scope.query
    });
  }
  if (scope.restrictTo) {
    query.push({
      _name: scope.restrictTo
    });
  }
  if (filters && Array.isArray(filters) && filters.length) {
    const filter = {
      _name: "filter",
      _and: filters.filter((f) => f.field).map(import_utils.constructFilter)
    };
    query.push(filter);
  }
  if (sortFields?.length && !returnCount) {
    const sort = {
      _name: "sort",
      _fields: sortFields.map((field) => {
        return {
          [`${field.field}`]: field.direction
        };
      })
    };
    query.push(sort);
  }
  let responseData = [];
  if (returnCount) {
    query.push({
      _name: "count"
    });
    const count = await import_requestApi.theHiveApiRequest.call(this, "POST", "/v1/query", { query });
    responseData.push({ count });
  } else if (limit) {
    const pagination = {
      _name: "page",
      from: 0,
      to: limit,
      extraData
    };
    query.push(pagination);
    responseData = await import_requestApi.theHiveApiRequest.call(this, "POST", "/v1/query", { query });
  } else {
    let to = 500;
    let from = 0;
    let response = [];
    do {
      const pagination = {
        _name: "page",
        from,
        to,
        extraData
      };
      response = await import_requestApi.theHiveApiRequest.call(this, "POST", "/v1/query", {
        query: [...query, pagination]
      });
      responseData = responseData.concat(response || []);
      from = to;
      to += 500;
    } while (response?.length);
  }
  return responseData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  theHiveApiQuery
});
//# sourceMappingURL=queryHelper.js.map