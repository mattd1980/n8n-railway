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
var ClockifyTrigger_node_exports = {};
__export(ClockifyTrigger_node_exports, {
  ClockifyTrigger: () => ClockifyTrigger
});
module.exports = __toCommonJS(ClockifyTrigger_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_EntryType = require("./EntryType");
var import_GenericFunctions = require("./GenericFunctions");
class ClockifyTrigger {
  constructor() {
    this.description = {
      displayName: "Clockify Trigger",
      icon: { light: "file:clockify.svg", dark: "file:clockify.dark.svg" },
      name: "clockifyTrigger",
      group: ["trigger"],
      version: 1,
      description: "Listens to Clockify events",
      defaults: {
        name: "Clockify Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "clockifyApi",
          required: true
        }
      ],
      polling: true,
      properties: [
        {
          displayName: "Workspace Name or ID",
          name: "workspaceId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "listWorkspaces"
          },
          required: true,
          default: ""
        },
        // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
        {
          displayName: "Trigger",
          name: "watchField",
          type: "options",
          options: [
            {
              name: "New Time Entry",
              value: import_EntryType.EntryTypes.NEW_TIME_ENTRY
            }
          ],
          required: true,
          default: import_EntryType.EntryTypes.NEW_TIME_ENTRY
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async listWorkspaces() {
          const rtv = [];
          const workspaces = await import_GenericFunctions.clockifyApiRequest.call(
            this,
            "GET",
            "workspaces"
          );
          if (void 0 !== workspaces) {
            workspaces.forEach((value) => {
              rtv.push({
                name: value.name,
                value: value.id
              });
            });
          }
          return rtv;
        }
      }
    };
  }
  async poll() {
    const webhookData = this.getWorkflowStaticData("node");
    const triggerField = this.getNodeParameter("watchField");
    const workspaceId = this.getNodeParameter("workspaceId");
    if (!webhookData.userId) {
      const userInfo = await import_GenericFunctions.clockifyApiRequest.call(this, "GET", "user");
      webhookData.userId = userInfo.id;
    }
    const qs = {};
    let resource;
    let result = null;
    switch (triggerField) {
      case import_EntryType.EntryTypes.NEW_TIME_ENTRY:
      default:
        const workflowTimezone = this.getTimezone();
        resource = `workspaces/${workspaceId}/user/${webhookData.userId}/time-entries`;
        qs.start = webhookData.lastTimeChecked;
        qs.end = (0, import_moment_timezone.default)().tz(workflowTimezone).format("YYYY-MM-DDTHH:mm:ss") + "Z";
        qs.hydrated = true;
        qs["in-progress"] = false;
        break;
    }
    result = await import_GenericFunctions.clockifyApiRequest.call(this, "GET", resource, {}, qs);
    webhookData.lastTimeChecked = qs.end;
    if (Array.isArray(result) && result.length !== 0) {
      return [this.helpers.returnJsonArray(result)];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClockifyTrigger
});
//# sourceMappingURL=ClockifyTrigger.node.js.map