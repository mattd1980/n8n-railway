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
var Options_exports = {};
__export(Options_exports, {
  options: () => options
});
module.exports = __toCommonJS(Options_exports);
const options = {
  displayName: "Options",
  placeholder: "Add option",
  name: "formatOptions",
  type: "collection",
  default: {},
  options: [
    {
      displayName: "Download Attachments",
      name: "download",
      type: "boolean",
      default: false,
      description: "Whether to download submitted attachments"
    },
    {
      displayName: "Attachments Naming Scheme",
      name: "binaryNamingScheme",
      type: "options",
      default: "sequence",
      displayOptions: {
        show: {
          download: [true]
        }
      },
      options: [
        {
          name: "Sequence (e.g. attachment_N)",
          value: "sequence"
        },
        {
          name: "Use Original Form Question ID",
          value: "question"
        }
      ]
    },
    {
      displayName: "Attachments Prefix",
      name: "dataPropertyAttachmentsPrefixName",
      type: "string",
      displayOptions: {
        show: {
          download: [true],
          binaryNamingScheme: ["sequence"]
        }
      },
      default: "attachment_",
      description: 'Prefix for name of the binary property to which to write the attachments. An index starting with 0 will be added. So if name is "attachment_" the first attachment is saved to "attachment_0"'
    },
    {
      displayName: "File Size",
      name: "version",
      type: "options",
      displayOptions: {
        show: {
          download: [true]
        }
      },
      default: "download_url",
      description: "Attachment size to retrieve, if multiple versions are available",
      options: [
        {
          name: "Original",
          value: "download_url"
        },
        {
          name: "Small",
          value: "download_small_url"
        },
        {
          name: "Medium",
          value: "download_medium_url"
        },
        {
          name: "Large",
          value: "download_large_url"
        }
      ]
    },
    {
      displayName: "Multiselect Mask",
      name: "selectMask",
      type: "string",
      default: "select_*",
      description: "Comma-separated list of wildcard-style selectors for fields that should be treated as multiselect fields, i.e. parsed as arrays."
    },
    {
      displayName: "Number Mask",
      name: "numberMask",
      type: "string",
      default: "n_*, f_*",
      description: "Comma-separated list of wildcard-style selectors for fields that should be treated as numbers"
    },
    {
      displayName: "Reformat",
      name: "reformat",
      type: "boolean",
      default: false,
      description: "Whether to apply some reformatting to the submission data, such as parsing GeoJSON coordinates"
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  options
});
//# sourceMappingURL=Options.js.map