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
  searchAttachments: () => searchAttachments,
  searchCalendars: () => searchCalendars,
  searchContacts: () => searchContacts,
  searchDrafts: () => searchDrafts,
  searchEvents: () => searchEvents,
  searchFolders: () => searchFolders,
  searchMessages: () => searchMessages
});
module.exports = __toCommonJS(listSearch_exports);
var import_utils = require("../helpers/utils");
var import_transport = require("../transport");
async function search(resource, nameProperty, filter, paginationToken) {
  let response = {};
  if (paginationToken) {
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      "",
      void 0,
      void 0,
      paginationToken
      // paginationToken contains the full URL
    );
  } else {
    const qs = {
      $select: `id,${nameProperty}`,
      $top: 100
    };
    if (filter) {
      const filterValue = encodeURI(filter);
      qs.$filter = `contains(${nameProperty}, '${filterValue}')`;
    }
    response = await import_transport.microsoftApiRequest.call(this, "GET", resource, void 0, qs);
  }
  return {
    results: response.value.map((entry) => {
      return {
        name: entry[nameProperty],
        value: entry.id
      };
    }),
    paginationToken: response["@odata.nextLink"]
  };
}
async function searchContacts(filter, paginationToken) {
  return await search.call(this, "/contacts", "displayName", filter, paginationToken);
}
async function searchCalendars(filter, paginationToken) {
  return await search.call(this, "/calendars", "name", filter, paginationToken);
}
async function searchDrafts(filter, paginationToken) {
  let response = {};
  if (paginationToken) {
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      "",
      void 0,
      void 0,
      paginationToken
      // paginationToken contains the full URL
    );
  } else {
    const qs = {
      $select: "id,subject,bodyPreview,webLink",
      $top: 100,
      $filter: "isDraft eq true"
    };
    if (filter) {
      const filterValue = encodeURI(filter);
      qs.$filter += ` AND contains(${"subject"}, '${filterValue}')`;
    }
    response = await import_transport.microsoftApiRequest.call(this, "GET", "/messages", void 0, qs);
  }
  return {
    results: response.value.map((entry) => {
      return {
        name: entry.subject || entry.bodyPreview,
        value: entry.id,
        url: entry.webLink
      };
    }),
    paginationToken: response["@odata.nextLink"]
  };
}
async function searchMessages(filter, paginationToken) {
  let response = {};
  if (paginationToken) {
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      "",
      void 0,
      void 0,
      paginationToken
      // paginationToken contains the full URL
    );
  } else {
    const qs = {
      $select: "id,subject,bodyPreview,webLink",
      $top: 100
    };
    if (filter) {
      const filterValue = encodeURI(filter);
      qs.$filter = `contains(${"subject"}, '${filterValue}')`;
    }
    response = await import_transport.microsoftApiRequest.call(this, "GET", "/messages", void 0, qs);
  }
  return {
    results: response.value.map((entry) => {
      return {
        name: entry.subject || entry.bodyPreview,
        value: entry.id,
        url: entry.webLink
      };
    }),
    paginationToken: response["@odata.nextLink"]
  };
}
async function searchEvents(filter, paginationToken) {
  let response = {};
  const calendarId = this.getNodeParameter("calendarId", void 0, {
    extractValue: true
  });
  if (paginationToken) {
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      "",
      void 0,
      void 0,
      paginationToken
      // paginationToken contains the full URL
    );
  } else {
    const qs = {
      $select: "id,subject,bodyPreview",
      $top: 100
    };
    if (filter) {
      const filterValue = encodeURI(filter);
      qs.$filter = `contains(${"subject"}, '${filterValue}')`;
    }
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      `/calendars/${calendarId}/events`,
      void 0,
      qs
    );
  }
  return {
    results: response.value.map((entry) => {
      return {
        name: entry.subject || entry.bodyPreview,
        value: entry.id,
        url: `https://outlook.office365.com/calendar/item/${(0, import_utils.encodeOutlookId)(entry.id)}`
      };
    }),
    paginationToken: response["@odata.nextLink"]
  };
}
async function searchFolders(filter, paginationToken) {
  let response = {};
  if (paginationToken) {
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      "",
      void 0,
      void 0,
      paginationToken
      // paginationToken contains the full URL
    );
  } else {
    const qs = {
      $top: 100
    };
    response = await import_transport.microsoftApiRequest.call(this, "GET", "/mailFolders", void 0, qs);
  }
  let folders = await import_transport.getSubfolders.call(this, response.value);
  if (filter) {
    filter = filter.toLowerCase();
    folders = folders.filter(
      (folder) => (folder.displayName || "").toLowerCase().includes(filter)
    );
  }
  return {
    results: folders.map((entry) => {
      return {
        name: entry.displayName,
        value: entry.id,
        url: `https://outlook.office365.com/mail/${(0, import_utils.encodeOutlookId)(entry.id)}`
      };
    }),
    paginationToken: response["@odata.nextLink"]
  };
}
async function searchAttachments(paginationToken) {
  let response = {};
  const messageId = this.getNodeParameter("messageId", void 0, {
    extractValue: true
  });
  if (paginationToken) {
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      "",
      void 0,
      void 0,
      paginationToken
      // paginationToken contains the full URL
    );
  } else {
    const qs = {
      $select: "id,name",
      $top: 100
    };
    response = await import_transport.microsoftApiRequest.call(
      this,
      "GET",
      `/messages/${messageId}/attachments`,
      void 0,
      qs
    );
  }
  return {
    results: response.value.map((entry) => {
      return {
        name: entry.name,
        value: entry.id
      };
    }),
    paginationToken: response["@odata.nextLink"]
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchAttachments,
  searchCalendars,
  searchContacts,
  searchDrafts,
  searchEvents,
  searchFolders,
  searchMessages
});
//# sourceMappingURL=listSearch.js.map