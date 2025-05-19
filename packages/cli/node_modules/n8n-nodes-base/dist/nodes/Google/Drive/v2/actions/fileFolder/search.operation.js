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
var search_operation_exports = {};
__export(search_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(search_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_interfaces = require("../../helpers/interfaces");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
var import_common = require("../common.descriptions");
const properties = [
  {
    displayName: "Search Method",
    name: "searchMethod",
    type: "options",
    options: [
      {
        name: "Search File/Folder Name",
        value: "name"
      },
      {
        name: "Advanced Search",
        value: "query"
      }
    ],
    default: "name",
    description: "Whether to search for the file/folder name or use a query string"
  },
  {
    displayName: "Search Query",
    name: "queryString",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        searchMethod: ["name"]
      }
    },
    placeholder: "e.g. My File / My Folder",
    description: "The name of the file or folder to search for. Returns also files and folders whose names partially match this search term."
  },
  {
    displayName: "Query String",
    name: "queryString",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        searchMethod: ["query"]
      }
    },
    placeholder: "e.g. not name contains 'hello'",
    description: 'Use the Google query strings syntax to search for a specific set of files or folders. <a href="https://developers.google.com/drive/api/v3/search-files" target="_blank">Learn more</a>.'
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filter",
    name: "filter",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    options: [
      {
        ...import_common.driveRLC,
        description: 'The drive you want to search in. By default, the personal "My Drive" is used.',
        required: false
      },
      {
        ...import_common.folderRLC,
        description: "The folder you want to search in. By default, the root folder of the drive is used. If you select a folder other than the root folder, only the direct children will be included.",
        required: false
      },
      {
        displayName: "What to Search",
        name: "whatToSearch",
        type: "options",
        default: "all",
        options: [
          {
            name: "Files and Folders",
            value: "all"
          },
          {
            name: "Files",
            value: "files"
          },
          {
            name: "Folders",
            value: "folders"
          }
        ]
      },
      {
        displayName: "File Types",
        name: "fileTypes",
        type: "multiOptions",
        default: [],
        description: "Return only items corresponding to the selected MIME types",
        options: import_common.fileTypesOptions,
        displayOptions: {
          show: {
            whatToSearch: ["all"]
          }
        }
      },
      {
        displayName: "File Types",
        name: "fileTypes",
        type: "multiOptions",
        default: [],
        description: "Return only items corresponding to the selected MIME types",
        options: import_common.fileTypesOptions.filter((option) => option.name !== "Folder"),
        displayOptions: {
          show: {
            whatToSearch: ["files"]
          }
        }
      },
      {
        displayName: "Include Trashed Items",
        name: "includeTrashed",
        type: "boolean",
        default: false,
        description: "Whether to return also items in the Drive's bin"
      }
    ]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "multiOptions",
        options: [
          {
            name: "*",
            value: "*",
            description: "All fields"
          },
          {
            name: "explicitlyTrashed",
            value: "explicitlyTrashed"
          },
          {
            name: "exportLinks",
            value: "exportLinks"
          },
          {
            name: "hasThumbnail",
            value: "hasThumbnail"
          },
          {
            name: "iconLink",
            value: "iconLink"
          },
          {
            name: "ID",
            value: "id"
          },
          {
            name: "Kind",
            value: "kind"
          },
          {
            name: "mimeType",
            value: "mimeType"
          },
          {
            name: "Name",
            value: "name"
          },
          {
            name: "Permissions",
            value: "permissions"
          },
          {
            name: "Shared",
            value: "shared"
          },
          {
            name: "Spaces",
            value: "spaces"
          },
          {
            name: "Starred",
            value: "starred"
          },
          {
            name: "thumbnailLink",
            value: "thumbnailLink"
          },
          {
            name: "Trashed",
            value: "trashed"
          },
          {
            name: "Version",
            value: "version"
          },
          {
            name: "webViewLink",
            value: "webViewLink"
          }
        ],
        default: [],
        description: "The fields to return"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["fileFolder"],
    operation: ["search"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const searchMethod = this.getNodeParameter("searchMethod", i);
  const options = this.getNodeParameter("options", i, {});
  const query = [];
  const queryString = this.getNodeParameter("queryString", i);
  if (searchMethod === "name") {
    query.push(`name contains '${queryString}'`);
  } else {
    query.push(queryString);
  }
  const filter = this.getNodeParameter("filter", i, {});
  let driveId = "";
  let folderId = "";
  const returnedTypes = [];
  if (Object.keys(filter)?.length) {
    if (filter.folderId) {
      if (filter.folderId.mode === "url") {
        folderId = this.getNodeParameter("filter.folderId", i, void 0, {
          extractValue: true
        });
      } else {
        folderId = filter.folderId.value;
      }
    }
    if (folderId && folderId !== import_interfaces.RLC_FOLDER_DEFAULT) {
      query.push(`'${folderId}' in parents`);
    }
    if (filter.driveId) {
      let value;
      if (filter.driveId.mode === "url") {
        value = this.getNodeParameter("filter.driveId", i, void 0, {
          extractValue: true
        });
      } else {
        value = filter.driveId.value;
      }
      driveId = value;
    }
    const whatToSearch = filter.whatToSearch || "all";
    if (whatToSearch === "folders") {
      query.push(`mimeType = '${import_interfaces.DRIVE.FOLDER}'`);
    } else {
      if (whatToSearch === "files") {
        query.push(`mimeType != '${import_interfaces.DRIVE.FOLDER}'`);
      }
      if (filter?.fileTypes?.length && !filter.fileTypes.includes("*")) {
        filter.fileTypes.forEach((fileType) => {
          returnedTypes.push(`mimeType = '${fileType}'`);
        });
      }
    }
    if (!filter.includeTrashed) {
      query.push("trashed = false");
    }
  }
  if (returnedTypes.length) {
    query.push(`(${returnedTypes.join(" or ")})`);
  }
  const queryFields = (0, import_utils.prepareQueryString)(options.fields);
  const qs = {
    fields: `nextPageToken, files(${queryFields})`,
    q: query.filter((q) => q).join(" and "),
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    spaces: "appDataFolder, drive",
    corpora: "allDrives"
  };
  (0, import_utils.updateDriveScopes)(qs, driveId);
  if (!driveId && folderId === import_interfaces.RLC_FOLDER_DEFAULT) {
    qs.corpora = "user";
    qs.spaces = "drive";
    qs.includeItemsFromAllDrives = false;
    qs.supportsAllDrives = false;
  }
  const returnAll = this.getNodeParameter("returnAll", i, false);
  let response;
  if (returnAll) {
    response = await import_transport.googleApiRequestAllItems.call(this, "GET", "files", "/drive/v3/files", {}, qs);
  } else {
    qs.pageSize = this.getNodeParameter("limit", i);
    response = await import_transport.googleApiRequest.call(this, "GET", "/drive/v3/files", void 0, qs);
    response = response.files;
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(response),
    { itemData: { item: i } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=search.operation.js.map