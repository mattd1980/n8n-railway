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
var TogglTrigger_node_exports = {};
__export(TogglTrigger_node_exports, {
  TogglTrigger: () => TogglTrigger
});
module.exports = __toCommonJS(TogglTrigger_node_exports);
var import_luxon = require("luxon");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class TogglTrigger {
  constructor() {
    this.description = {
      displayName: "Toggl Trigger",
      name: "togglTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:toggl.png",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Toggl events occur",
      defaults: {
        name: "Toggl Trigger"
      },
      credentials: [
        {
          name: "togglApi",
          required: true
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Event",
          name: "event",
          type: "options",
          options: [
            {
              name: "New Time Entry",
              value: "newTimeEntry"
            }
          ],
          required: true,
          default: "newTimeEntry"
        }
      ]
    };
  }
  async poll() {
    const webhookData = this.getWorkflowStaticData("node");
    const event = this.getNodeParameter("event");
    let endpoint;
    if (event === "newTimeEntry") {
      endpoint = "/time_entries";
    } else {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The defined event "${event}" is not supported`);
    }
    const qs = {};
    let timeEntries = [];
    qs.start_date = webhookData.lastTimeChecked ?? import_luxon.DateTime.now().toISODate();
    qs.end_date = (0, import_moment_timezone.default)().format();
    try {
      timeEntries = await import_GenericFunctions.togglApiRequest.call(this, "GET", endpoint, {}, qs);
      webhookData.lastTimeChecked = qs.end_date;
    } catch (error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
    }
    if (Array.isArray(timeEntries) && timeEntries.length !== 0) {
      return [this.helpers.returnJsonArray(timeEntries)];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TogglTrigger
});
//# sourceMappingURL=TogglTrigger.node.js.map