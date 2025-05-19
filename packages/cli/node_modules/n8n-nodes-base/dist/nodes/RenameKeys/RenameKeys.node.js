"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var RenameKeys_node_exports = {};
__export(RenameKeys_node_exports, {
  RenameKeys: () => RenameKeys
});
module.exports = __toCommonJS(RenameKeys_node_exports);
var import_get = __toESM(require("lodash/get"));
var import_set = __toESM(require("lodash/set"));
var import_unset = __toESM(require("lodash/unset"));
var import_n8n_workflow = require("n8n-workflow");
class RenameKeys {
  constructor() {
    this.description = {
      displayName: "Rename Keys",
      name: "renameKeys",
      icon: "fa:edit",
      iconColor: "crimson",
      group: ["transform"],
      version: 1,
      description: "Update item field names",
      defaults: {
        name: "Rename Keys",
        color: "#772244"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Keys",
          name: "keys",
          placeholder: "Add new key",
          description: "Adds a key which should be renamed",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true,
            sortable: true
          },
          default: {},
          options: [
            {
              displayName: "Key",
              name: "key",
              values: [
                {
                  displayName: "Current Key Name",
                  name: "currentKey",
                  type: "string",
                  default: "",
                  placeholder: "currentKey",
                  requiresDataPath: "single",
                  description: 'The current name of the key. It is also possible to define deep keys by using dot-notation like for example: "level1.level2.currentKey".'
                },
                {
                  displayName: "New Key Name",
                  name: "newKey",
                  type: "string",
                  default: "",
                  placeholder: "newKey",
                  description: 'The name the key should be renamed to. It is also possible to define deep keys by using dot-notation like for example: "level1.level2.newKey".'
                }
              ]
            }
          ]
        },
        {
          displayName: "Additional Options",
          name: "additionalOptions",
          type: "collection",
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Regex",
              name: "regexReplacement",
              placeholder: "Add new regular expression",
              description: "Adds a regular expressiond",
              type: "fixedCollection",
              typeOptions: {
                multipleValues: true,
                sortable: true
              },
              default: {},
              options: [
                {
                  displayName: "Replacement",
                  name: "replacements",
                  values: [
                    {
                      displayName: "Be aware that by using regular expression previously renamed keys can be affected",
                      name: "regExNotice",
                      type: "notice",
                      default: ""
                    },
                    {
                      displayName: "Regular Expression",
                      name: "searchRegex",
                      type: "string",
                      default: "",
                      placeholder: "e.g. [N-n]ame",
                      description: "Regex to match the key name",
                      hint: 'Learn more and test RegEx <a href="https://regex101.com/">here</a>'
                    },
                    {
                      displayName: "Replace With",
                      name: "replaceRegex",
                      type: "string",
                      default: "",
                      placeholder: "replacedName",
                      description: "The name the key/s should be renamed to. It's possible to use regex captures e.g. $1, $2, ..."
                    },
                    {
                      displayName: "Options",
                      name: "options",
                      type: "collection",
                      default: {},
                      placeholder: "Add Regex Option",
                      options: [
                        {
                          displayName: "Case Insensitive",
                          name: "caseInsensitive",
                          type: "boolean",
                          description: "Whether to use case insensitive match",
                          default: false
                        },
                        {
                          displayName: "Max Depth",
                          name: "depth",
                          type: "number",
                          default: -1,
                          description: "Maximum depth to replace keys",
                          hint: "Specify number for depth level (-1 for unlimited, 0 for top level only)"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let item;
    let newItem;
    let renameKeys;
    let value;
    const renameKey = (key) => {
      if (key.currentKey === "" || key.newKey === "" || key.currentKey === key.newKey) {
        return;
      }
      value = (0, import_get.default)(item.json, key.currentKey);
      if (value === void 0) {
        return;
      }
      (0, import_set.default)(newItem.json, key.newKey, value);
      (0, import_unset.default)(newItem.json, key.currentKey);
    };
    const regexReplaceKey = (replacement) => {
      const { searchRegex, replaceRegex, options } = replacement;
      const { depth, caseInsensitive } = options;
      const flags = caseInsensitive ? "i" : void 0;
      const regex = new RegExp(searchRegex, flags);
      const renameObjectKeys = (obj, objDepth) => {
        for (const key in obj) {
          if (Array.isArray(obj)) {
            if (objDepth !== 0) {
              renameObjectKeys(obj[key], objDepth - 1);
            }
          } else if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "object" && objDepth !== 0) {
              renameObjectKeys(obj[key], objDepth - 1);
            }
            if (key.match(regex)) {
              const newKey = key.replace(regex, replaceRegex);
              if (newKey !== key) {
                obj[newKey] = obj[key];
                delete obj[key];
              }
            }
          }
        }
        return obj;
      };
      newItem.json = renameObjectKeys(newItem.json, depth);
    };
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      renameKeys = this.getNodeParameter("keys.key", itemIndex, []);
      const regexReplacements = this.getNodeParameter(
        "additionalOptions.regexReplacement.replacements",
        itemIndex,
        []
      );
      item = items[itemIndex];
      newItem = {
        json: (0, import_n8n_workflow.deepCopy)(item.json),
        pairedItem: {
          item: itemIndex
        }
      };
      if (item.binary !== void 0) {
        newItem.binary = item.binary;
      }
      renameKeys.forEach(renameKey);
      regexReplacements.forEach(regexReplaceKey);
      returnData.push(newItem);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RenameKeys
});
//# sourceMappingURL=RenameKeys.node.js.map