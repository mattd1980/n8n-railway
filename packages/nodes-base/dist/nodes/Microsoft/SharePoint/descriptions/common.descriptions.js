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
var common_descriptions_exports = {};
__export(common_descriptions_exports, {
  fileRLC: () => fileRLC,
  folderRLC: () => folderRLC,
  itemRLC: () => itemRLC,
  listRLC: () => listRLC,
  siteRLC: () => siteRLC,
  untilFolderSelected: () => untilFolderSelected,
  untilItemSelected: () => untilItemSelected,
  untilListSelected: () => untilListSelected,
  untilSiteSelected: () => untilSiteSelected
});
module.exports = __toCommonJS(common_descriptions_exports);
const untilFolderSelected = { folder: [""] };
const untilItemSelected = { item: [""] };
const untilListSelected = { list: [""] };
const untilSiteSelected = { site: [""] };
const fileRLC = {
  displayName: "File",
  name: "file",
  default: {
    mode: "list",
    value: ""
  },
  description: "Select the file to download",
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "getFiles",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      placeholder: "e.g. mysite",
      type: "string"
    }
  ],
  placeholder: "eg. my-file.pdf",
  required: true,
  type: "resourceLocator"
};
const folderRLC = {
  displayName: "Parent Folder",
  name: "folder",
  default: {
    mode: "list",
    value: ""
  },
  description: "Select the folder to update the file in",
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "getFolders",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      placeholder: "e.g. myfolder",
      type: "string"
    }
  ],
  placeholder: "/ (Library root)",
  required: true,
  type: "resourceLocator"
};
const itemRLC = {
  displayName: "Item",
  name: "item",
  default: {
    mode: "list",
    value: ""
  },
  description: "Select the item you want to delete",
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "getItems",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      placeholder: "e.g. 1",
      type: "string"
    }
  ],
  required: true,
  type: "resourceLocator"
};
const listRLC = {
  displayName: "List",
  name: "list",
  default: {
    mode: "list",
    value: ""
  },
  description: "Select the list you want to retrieve",
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "getLists",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      placeholder: "e.g. mylist",
      type: "string"
    }
  ],
  required: true,
  type: "resourceLocator"
};
const siteRLC = {
  displayName: "Site",
  name: "site",
  default: {
    mode: "list",
    value: ""
  },
  description: "Select the site to retrieve folders from",
  modes: [
    {
      displayName: "From List",
      name: "list",
      type: "list",
      typeOptions: {
        searchListMethod: "getSites",
        searchable: true
      }
    },
    {
      displayName: "By ID",
      name: "id",
      placeholder: "e.g. mysite",
      type: "string"
    }
  ],
  required: true,
  type: "resourceLocator"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileRLC,
  folderRLC,
  itemRLC,
  listRLC,
  siteRLC,
  untilFolderSelected,
  untilItemSelected,
  untilListSelected,
  untilSiteSelected
});
//# sourceMappingURL=common.descriptions.js.map