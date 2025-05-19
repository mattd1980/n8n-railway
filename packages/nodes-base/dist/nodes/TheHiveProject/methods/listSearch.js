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
var listSearch_exports = {};
__export(listSearch_exports, {
  alertSearch: () => alertSearch,
  caseSearch: () => caseSearch,
  commentSearch: () => commentSearch,
  logSearch: () => logSearch,
  observableSearch: () => observableSearch,
  pageSearch: () => pageSearch,
  taskSearch: () => taskSearch
});
module.exports = __toCommonJS(listSearch_exports);
var import_transport = require("../transport");
async function listResource(resource, filterField, nameField, urlPlaceholder, filter, paginationToken) {
  const query = [
    {
      _name: resource
    }
  ];
  if (filter) {
    query.push({
      _name: "filter",
      _like: {
        _field: filterField,
        _value: filter
      }
    });
  }
  const from = paginationToken !== void 0 ? parseInt(paginationToken, 10) : 0;
  const to = from + 100;
  query.push({
    _name: "page",
    from,
    to
  });
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", { query });
  if (response.length === 0) {
    return {
      results: [],
      paginationToken: void 0
    };
  }
  const credentials = await this.getCredentials("theHiveProjectApi");
  const url = credentials?.url;
  return {
    results: response.map((entry) => ({
      name: entry[nameField],
      value: entry._id,
      url: urlPlaceholder !== void 0 ? `${url}/${urlPlaceholder}/${entry._id}/details` : void 0
    })),
    paginationToken: to
  };
}
async function caseSearch(filter, paginationToken) {
  return await listResource.call(
    this,
    "listCase",
    "title",
    "title",
    "cases",
    filter,
    paginationToken
  );
}
async function commentSearch(filter, paginationToken) {
  return await listResource.call(
    this,
    "listComment",
    "message",
    "message",
    void 0,
    filter,
    paginationToken
  );
}
async function alertSearch(filter, paginationToken) {
  return await listResource.call(
    this,
    "listAlert",
    "title",
    "title",
    "alerts",
    filter,
    paginationToken
  );
}
async function taskSearch(filter, paginationToken) {
  return await listResource.call(
    this,
    "listTask",
    "title",
    "title",
    void 0,
    filter,
    paginationToken
  );
}
async function pageSearch(filter, paginationToken) {
  let caseId;
  try {
    caseId = this.getNodeParameter("caseId", "", { extractValue: true });
  } catch (error) {
    caseId = void 0;
  }
  let query;
  if (caseId) {
    query = [
      {
        _name: "getCase",
        idOrName: caseId
      },
      {
        _name: "pages"
      }
    ];
  } else {
    query = [
      {
        _name: "listOrganisationPage"
      }
    ];
  }
  if (filter) {
    query.push({
      _name: "filter",
      _like: {
        _field: "title",
        _value: filter
      }
    });
  }
  const from = paginationToken !== void 0 ? parseInt(paginationToken, 10) : 0;
  const to = from + 100;
  query.push({
    _name: "page",
    from,
    to
  });
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", { query });
  if (response.length === 0) {
    return {
      results: [],
      paginationToken: void 0
    };
  }
  return {
    results: response.map((entry) => ({
      name: entry.title,
      value: entry._id
    })),
    paginationToken: to
  };
}
async function logSearch(filter, paginationToken) {
  return await listResource.call(
    this,
    "listLog",
    "message",
    "message",
    void 0,
    filter,
    paginationToken
  );
}
async function observableSearch(filter, paginationToken) {
  const query = [
    {
      _name: "listObservable"
    }
  ];
  if (filter) {
    query.push({
      _name: "filter",
      _or: [
        {
          _like: {
            _field: "data",
            _value: filter
          }
        },
        {
          _like: {
            _field: "message",
            _value: filter
          }
        },
        {
          _like: {
            _field: "attachment.name",
            _value: filter
          }
        }
      ]
    });
  }
  const from = paginationToken !== void 0 ? parseInt(paginationToken, 10) : 0;
  const to = from + 100;
  query.push({
    _name: "page",
    from,
    to
  });
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", { query });
  if (response.length === 0) {
    return {
      results: [],
      paginationToken: void 0
    };
  }
  return {
    results: response.map((entry) => ({
      name: entry.data || entry.attachment?.name || entry.message || entry._id,
      value: entry._id
    })),
    paginationToken: to
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alertSearch,
  caseSearch,
  commentSearch,
  logSearch,
  observableSearch,
  pageSearch,
  taskSearch
});
//# sourceMappingURL=listSearch.js.map