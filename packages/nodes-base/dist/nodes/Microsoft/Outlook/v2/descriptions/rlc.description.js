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
var rlc_description_exports = {};
__export(rlc_description_exports, {
  attachmentRLC: () => attachmentRLC,
  calendarRLC: () => calendarRLC,
  contactRLC: () => contactRLC,
  draftRLC: () => draftRLC,
  eventRLC: () => eventRLC,
  folderRLC: () => folderRLC,
  messageRLC: () => messageRLC
});
module.exports = __toCommonJS(rlc_description_exports);
const calendarRLC = {
  displayName: "Calendar",
  name: "calendarId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a calendar...",
      typeOptions: {
        searchListMethod: "searchCalendars",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. AAAkAAAhAAA0BBc5LLLwOOOtNNNkZS05Nz..."
    }
  ]
};
const contactRLC = {
  displayName: "Contact",
  name: "contactId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a contact...",
      typeOptions: {
        searchListMethod: "searchContacts",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. AAAkAAAhAAA0BBc5LLLwOOOtNNNkZS05Nz..."
    }
  ]
};
const draftRLC = {
  displayName: "Draft",
  name: "draftId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a draft...",
      typeOptions: {
        searchListMethod: "searchDrafts",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. AAAkAAAhAAA0BBc5LLLwOOOtNNNkZS05Nz..."
    }
  ]
};
const messageRLC = {
  displayName: "Message",
  name: "messageId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a message...",
      typeOptions: {
        searchListMethod: "searchMessages",
        searchable: true
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. AAAkAAAhAAA0BBc5LLLwOOOtNNNkZS05Nz..."
    }
  ]
};
const eventRLC = {
  displayName: "Event",
  name: "eventId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  typeOptions: {
    loadOptionsDependsOn: ["calendarId.value"]
  },
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a event...",
      typeOptions: {
        searchListMethod: "searchEvents",
        searchable: true
      }
    },
    {
      displayName: "Link",
      name: "url",
      type: "string",
      placeholder: "e.g. https://outlook.office365.com/calendar/item/AAMkADlhOTA0M...UAAA%3D",
      extractValue: {
        type: "regex",
        regex: "https:\\/\\/outlook\\.office365\\.com\\/calendar\\/item\\/([A-Za-z0-9%]+)(?:\\/.*|)"
      },
      validation: [
        {
          type: "regex",
          properties: {
            regex: "https:\\/\\/outlook\\.office365\\.com\\/calendar\\/item\\/([A-Za-z0-9%]+)(?:\\/.*|)",
            errorMessage: "Not a valid Outlook Event URL"
          }
        }
      ]
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. AAAkAAAhAAA0BBc5LLLwOOOtNNNkZS05Nz..."
    }
  ]
};
const folderRLC = {
  displayName: "Folder",
  name: "folderId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a folder...",
      typeOptions: {
        searchListMethod: "searchFolders",
        searchable: true
      }
    },
    {
      displayName: "Link",
      name: "url",
      type: "string",
      placeholder: "e.g. https://outlook.office365.com/mail/AAMkADlhOT...AAA%3D",
      extractValue: {
        type: "regex",
        regex: "https:\\/\\/outlook\\.office365\\.com\\/mail\\/([A-Za-z0-9%]+)(?:\\/.*|)"
      },
      validation: [
        {
          type: "regex",
          properties: {
            regex: "https:\\/\\/outlook\\.office365\\.com\\/mail\\/([A-Za-z0-9%]+)(?:\\/.*|)",
            errorMessage: "Not a valid Outlook Folder URL"
          }
        }
      ]
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. AAAkAAAhAAA0BBc5LLLwOOOtNNNkZS05Nz..."
    }
  ]
};
const attachmentRLC = {
  displayName: "Attachment",
  name: "attachmentId",
  type: "resourceLocator",
  default: { mode: "list", value: "" },
  required: true,
  typeOptions: {
    loadOptionsDependsOn: ["messageId.value"]
  },
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      placeholder: "Select a attachment...",
      typeOptions: {
        searchListMethod: "searchAttachments",
        searchable: false
      }
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. AAAkAAAhAAA0BBc5LLLwOOOtNNNkZS05Nz..."
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attachmentRLC,
  calendarRLC,
  contactRLC,
  draftRLC,
  eventRLC,
  folderRLC,
  messageRLC
});
//# sourceMappingURL=rlc.description.js.map