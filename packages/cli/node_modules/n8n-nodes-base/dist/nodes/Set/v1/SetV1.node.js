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
var SetV1_node_exports = {};
__export(SetV1_node_exports, {
  SetV1: () => SetV1
});
module.exports = __toCommonJS(SetV1_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
const versionDescription = {
  displayName: "Set",
  name: "set",
  icon: "fa:pen",
  group: ["input"],
  version: [1, 2],
  description: "Sets values on items and optionally remove other values",
  defaults: {
    name: "Set",
    color: "#0000FF"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  properties: [
    {
      displayName: "Keep Only Set",
      name: "keepOnlySet",
      type: "boolean",
      default: false,
      description: "Whether only the values set on this node should be kept and all others removed"
    },
    {
      displayName: "Values to Set",
      name: "values",
      placeholder: "Add Value",
      type: "fixedCollection",
      typeOptions: {
        multipleValues: true,
        sortable: true
      },
      description: "The value to set",
      default: {},
      options: [
        {
          name: "boolean",
          displayName: "Boolean",
          values: [
            {
              displayName: "Name",
              name: "name",
              type: "string",
              requiresDataPath: "single",
              default: "propertyName",
              description: 'Name of the property to write data to. Supports dot-notation. Example: "data.person[0].name"'
            },
            {
              displayName: "Value",
              name: "value",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "The boolean value to write in the property"
            }
          ]
        },
        {
          name: "number",
          displayName: "Number",
          values: [
            {
              displayName: "Name",
              name: "name",
              type: "string",
              default: "propertyName",
              requiresDataPath: "single",
              description: 'Name of the property to write data to. Supports dot-notation. Example: "data.person[0].name"'
            },
            {
              displayName: "Value",
              name: "value",
              type: "number",
              default: 0,
              description: "The number value to write in the property"
            }
          ]
        },
        {
          name: "string",
          displayName: "String",
          values: [
            {
              displayName: "Name",
              name: "name",
              type: "string",
              default: "propertyName",
              requiresDataPath: "single",
              description: 'Name of the property to write data to. Supports dot-notation. Example: "data.person[0].name"'
            },
            {
              displayName: "Value",
              name: "value",
              type: "string",
              default: "",
              description: "The string value to write in the property"
            }
          ]
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
          displayName: "Dot Notation",
          name: "dotNotation",
          type: "boolean",
          default: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: '<p>By default, dot-notation is used in property names. This means that "a.b" will set the property "b" underneath "a" so { "a": { "b": value} }.<p></p>If that is not intended this can be deactivated, it will then set { "a.b": value } instead.</p>.'
        }
      ]
    }
  ]
};
class SetV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const nodeVersion = this.getNode().typeVersion;
    if (items.length === 0) {
      items.push({ json: {}, pairedItem: { item: 0 } });
    }
    const returnData = [];
    let item;
    let keepOnlySet;
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      keepOnlySet = this.getNodeParameter("keepOnlySet", itemIndex, false);
      item = items[itemIndex];
      const options = this.getNodeParameter("options", itemIndex, {});
      const newItem = {
        json: {},
        pairedItem: { item: itemIndex }
      };
      if (!keepOnlySet) {
        if (item.binary !== void 0) {
          newItem.binary = {};
          Object.assign(newItem.binary, item.binary);
        }
        newItem.json = (0, import_n8n_workflow.deepCopy)(item.json);
      }
      this.getNodeParameter("values.boolean", itemIndex, []).forEach(
        (setItem) => {
          if (options.dotNotation === false) {
            newItem.json[setItem.name] = !!setItem.value;
          } else {
            (0, import_set.default)(newItem.json, setItem.name, !!setItem.value);
          }
        }
      );
      this.getNodeParameter("values.number", itemIndex, []).forEach(
        (setItem) => {
          if (nodeVersion >= 2 && typeof setItem.value === "string" && !Number.isNaN(Number(setItem.value))) {
            setItem.value = Number(setItem.value);
          }
          if (options.dotNotation === false) {
            newItem.json[setItem.name] = setItem.value;
          } else {
            (0, import_set.default)(newItem.json, setItem.name, setItem.value);
          }
        }
      );
      this.getNodeParameter("values.string", itemIndex, []).forEach(
        (setItem) => {
          if (options.dotNotation === false) {
            newItem.json[setItem.name] = setItem.value;
          } else {
            (0, import_set.default)(newItem.json, setItem.name, setItem.value);
          }
        }
      );
      returnData.push(newItem);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SetV1
});
//# sourceMappingURL=SetV1.node.js.map