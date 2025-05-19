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
var Airtop_node_exports = {};
__export(Airtop_node_exports, {
  Airtop: () => Airtop
});
module.exports = __toCommonJS(Airtop_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var extraction = __toESM(require("./actions/extraction/Extraction.resource"));
var interaction = __toESM(require("./actions/interaction/Interaction.resource"));
var import_router = require("./actions/router");
var session = __toESM(require("./actions/session/Session.resource"));
var window = __toESM(require("./actions/window/Window.resource"));
class Airtop {
  constructor() {
    this.description = {
      displayName: "Airtop",
      name: "airtop",
      icon: "file:airtop.svg",
      group: ["transform"],
      defaultVersion: 1,
      version: [1],
      subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
      description: "Scrape and control any site with Airtop",
      usableAsTool: true,
      defaults: {
        name: "Airtop"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "airtopApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Session",
              value: "session"
            },
            {
              name: "Window",
              value: "window"
            },
            {
              name: "Extraction",
              value: "extraction"
            },
            {
              name: "Interaction",
              value: "interaction"
            }
          ],
          default: "session"
        },
        ...session.description,
        ...window.description,
        ...extraction.description,
        ...interaction.description
      ]
    };
  }
  async execute() {
    return await import_router.router.call(this);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Airtop
});
//# sourceMappingURL=Airtop.node.js.map