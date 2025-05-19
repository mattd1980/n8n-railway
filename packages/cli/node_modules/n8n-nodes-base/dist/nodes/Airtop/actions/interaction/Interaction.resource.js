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
var Interaction_resource_exports = {};
__export(Interaction_resource_exports, {
  click: () => click,
  description: () => description,
  hover: () => hover,
  type: () => type
});
module.exports = __toCommonJS(Interaction_resource_exports);
var click = __toESM(require("./click.operation"));
var hover = __toESM(require("./hover.operation"));
var type = __toESM(require("./type.operation"));
var import_fields = require("../common/fields");
const description = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["interaction"]
      }
    },
    options: [
      {
        name: "Click an Element",
        value: "click",
        description: "Execute a click on an element given a description",
        action: "Click an element"
      },
      {
        name: "Hover on an Element",
        value: "hover",
        description: "Execute a hover action on an element given a description",
        action: "Hover on an element"
      },
      {
        name: "Type",
        value: "type",
        description: "Execute a Type action on an element given a description",
        action: "Type text"
      }
    ],
    default: "click"
  },
  {
    ...import_fields.sessionIdField,
    displayOptions: {
      show: {
        resource: ["interaction"]
      }
    }
  },
  {
    ...import_fields.windowIdField,
    displayOptions: {
      show: {
        resource: ["interaction"]
      }
    }
  },
  ...click.description,
  ...hover.description,
  ...type.description,
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["interaction"]
      }
    },
    options: [
      {
        displayName: "Visual Scope",
        name: "visualScope",
        type: "options",
        default: "auto",
        description: "Defines the strategy for visual analysis of the current window",
        options: [
          {
            name: "Auto",
            description: "Provides the simplest out-of-the-box experience for most web pages",
            value: "auto"
          },
          {
            name: "Viewport",
            description: "For analysis of the current browser view only",
            value: "viewport"
          },
          {
            name: "Page",
            description: "For analysis of the entire page",
            value: "page"
          },
          {
            name: "Scan",
            description: "For a full page analysis on sites that have compatibility issues with 'Page' mode",
            value: "scan"
          }
        ]
      },
      {
        displayName: "Wait Until Event After Navigation",
        name: "waitForNavigation",
        type: "options",
        default: "load",
        description: "The condition to wait for the navigation to complete after an interaction (click, type or hover). Defaults to 'Fully Loaded'.",
        options: [
          {
            name: "Fully Loaded (Slower)",
            value: "load"
          },
          {
            name: "DOM Only Loaded (Faster)",
            value: "domcontentloaded"
          },
          {
            name: "All Network Activity Has Stopped",
            value: "networkidle0"
          },
          {
            name: "Most Network Activity Has Stopped",
            value: "networkidle2"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  click,
  description,
  hover,
  type
});
//# sourceMappingURL=Interaction.resource.js.map