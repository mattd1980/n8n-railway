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
var MicrosoftOneDriveTrigger_node_exports = {};
__export(MicrosoftOneDriveTrigger_node_exports, {
  MicrosoftOneDriveTrigger: () => MicrosoftOneDriveTrigger
});
module.exports = __toCommonJS(MicrosoftOneDriveTrigger_node_exports);
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_TriggerDescription = require("./TriggerDescription");
class MicrosoftOneDriveTrigger {
  constructor() {
    this.description = {
      displayName: "Microsoft OneDrive Trigger",
      name: "microsoftOneDriveTrigger",
      icon: "file:oneDrive.svg",
      group: ["trigger"],
      version: 1,
      description: "Trigger for Microsoft OneDrive API.",
      subtitle: '={{($parameter["event"])}}',
      defaults: {
        name: "Microsoft OneDrive Trigger"
      },
      credentials: [
        {
          name: "microsoftOneDriveOAuth2Api",
          required: true
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [...import_TriggerDescription.triggerDescription]
    };
    this.methods = {
      loadOptions: {}
    };
  }
  async poll() {
    const workflowData = this.getWorkflowStaticData("node");
    let responseData;
    const lastLink = workflowData.LastLink || "https://graph.microsoft.com/v1.0/me/drive/root/delta?token=latest";
    const now = import_luxon.DateTime.now().toUTC();
    const start = import_luxon.DateTime.fromISO(workflowData.lastTimeChecked) || now;
    const end = now;
    const event = this.getNodeParameter("event", "fileCreated");
    const watch = this.getNodeParameter("watch", "anyFile");
    const watchFolder = this.getNodeParameter("watchFolder", false) || false;
    const folderChild = this.getNodeParameter("options.folderChild", false) || false;
    let eventType = "created";
    let eventResource = "file";
    if (event.includes("Updated")) {
      eventType = "updated";
    }
    if (event.includes("folder")) {
      eventResource = "folder";
    }
    try {
      if (this.getMode() === "manual") {
        responseData = (await import_GenericFunctions.microsoftApiRequest.call(
          this,
          "GET",
          "",
          {},
          {},
          "https://graph.microsoft.com/v1.0/me/drive/root/delta"
        )).value;
      } else {
        const response = await import_GenericFunctions.microsoftApiRequestAllItemsDelta.call(
          this,
          lastLink,
          start,
          eventType
        );
        responseData = response.returnData;
        workflowData.LastLink = response.deltaLink;
      }
      workflowData.lastTimeChecked = end.toISO();
      if (watch === "selectedFile") {
        const fileId = this.getNodeParameter("fileId", "", {
          extractValue: true
        }).replace("%21", "!");
        if (fileId) {
          responseData = responseData.filter((item) => item.id === fileId);
        }
      }
      if (!folderChild && (watch === "oneSelectedFolder" || watch === "selectedFolder" || watchFolder)) {
        const folderId = this.getNodeParameter("folderId", "", {
          extractValue: true
        }).replace("%21", "!");
        if (folderId) {
          if (watch === "oneSelectedFolder") {
            responseData = responseData.filter((item) => item.id === folderId);
          } else {
            responseData = responseData.filter(
              (item) => item.parentReference.id === folderId
            );
          }
        }
      }
      if (folderChild && (watch === "selectedFolder" || watchFolder)) {
        const folderId = this.getNodeParameter("folderId", "", {
          extractValue: true
        }).replace("%21", "!");
        const folderPath = await import_GenericFunctions.getPath.call(this, folderId);
        responseData = responseData.filter((item) => {
          const path = item.parentReference?.path;
          return typeof path === "string" && path.startsWith(folderPath);
        });
      }
      responseData = responseData.filter((item) => item[eventResource]);
      if (!responseData?.length) {
        return null;
      }
      const simplify = this.getNodeParameter("simple");
      if (simplify) {
        responseData = responseData.map((x) => ({
          id: x.id,
          createdDateTime: x.fileSystemInfo?.createdDateTime,
          lastModifiedDateTime: x.fileSystemInfo?.lastModifiedDateTime,
          name: x.name,
          webUrl: x.webUrl,
          size: x.size,
          path: x.parentReference?.path || "",
          mimeType: x.file?.mimeType || ""
        }));
      }
      return [this.helpers.returnJsonArray(responseData)];
    } catch (error) {
      if (this.getMode() === "manual" || !workflowData.lastTimeChecked) {
        throw error;
      }
      const workflow = this.getWorkflow();
      const node = this.getNode();
      this.logger.error(
        `There was a problem in '${node.name}' node in workflow '${workflow.id}': '${error.description}'`,
        {
          node: node.name,
          workflowId: workflow.id,
          error
        }
      );
      throw error;
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftOneDriveTrigger
});
//# sourceMappingURL=MicrosoftOneDriveTrigger.node.js.map