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
var BoxTrigger_node_exports = {};
__export(BoxTrigger_node_exports, {
  BoxTrigger: () => BoxTrigger
});
module.exports = __toCommonJS(BoxTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class BoxTrigger {
  constructor() {
    this.description = {
      displayName: "Box Trigger",
      name: "boxTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:box.png",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Box events occur",
      defaults: {
        name: "Box Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "boxOAuth2Api",
          required: true
        }
      ],
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          options: [
            {
              name: "Collaboration Accepted",
              value: "COLLABORATION.ACCEPTED",
              description: "A collaboration has been accepted"
            },
            {
              name: "Collaboration Created",
              value: "COLLABORATION.CREATED",
              description: "A collaboration is created"
            },
            {
              name: "Collaboration Rejected",
              value: "COLLABORATION.REJECTED",
              description: "A collaboration has been rejected"
            },
            {
              name: "Collaboration Removed",
              value: "COLLABORATION.REMOVED",
              description: "A collaboration has been removed"
            },
            {
              name: "Collaboration Updated",
              value: "COLLABORATION.UPDATED",
              description: "A collaboration has been updated"
            },
            {
              name: "Comment Created",
              value: "COMMENT.CREATED",
              description: "A comment object is created"
            },
            {
              name: "Comment Deleted",
              value: "COMMENT.DELETED",
              description: "A comment object is removed"
            },
            {
              name: "Comment Updated",
              value: "COMMENT.UPDATED",
              description: "A comment object is edited"
            },
            {
              name: "File Copied",
              value: "FILE.COPIED",
              description: "A file is copied"
            },
            {
              name: "File Deleted",
              value: "FILE.DELETED",
              description: "A file is moved to the trash"
            },
            {
              name: "File Downloaded",
              value: "FILE.DOWNLOADED",
              description: "A file is downloaded"
            },
            {
              name: "File Locked",
              value: "FILE.LOCKED",
              description: "A file is locked"
            },
            {
              name: "File Moved",
              value: "FILE.MOVED",
              description: "A file is moved from one folder to another"
            },
            {
              name: "File Previewed",
              value: "FILE.PREVIEWED",
              description: "A file is previewed"
            },
            {
              name: "File Renamed",
              value: "FILE.RENAMED",
              description: "A file was renamed"
            },
            {
              name: "File Restored",
              value: "FILE.RESTORED",
              description: "A file is restored from the trash"
            },
            {
              name: "File Trashed",
              value: "FILE.TRASHED",
              description: "A file is moved to the trash"
            },
            {
              name: "File Unlocked",
              value: "FILE.UNLOCKED",
              description: "A file is unlocked"
            },
            {
              name: "File Uploaded",
              value: "FILE.UPLOADED",
              description: "A file is uploaded to or moved to this folder"
            },
            {
              name: "Folder Copied",
              value: "FOLDER.COPIED",
              description: "A copy of a folder is made"
            },
            {
              name: "Folder Created",
              value: "FOLDER.CREATED",
              description: "A folder is created"
            },
            {
              name: "Folder Deleted",
              value: "FOLDER.DELETED",
              description: "A folder is permanently removed"
            },
            {
              name: "Folder Downloaded",
              value: "FOLDER.DOWNLOADED",
              description: "A folder is downloaded"
            },
            {
              name: "Folder Moved",
              value: "FOLDER.MOVED",
              description: "A folder is moved to a different folder"
            },
            {
              name: "Folder Renamed",
              value: "FOLDER.RENAMED",
              description: "A folder was renamed"
            },
            {
              name: "Folder Restored",
              value: "FOLDER.RESTORED",
              description: "A folder is restored from the trash"
            },
            {
              name: "Folder Trashed",
              value: "FOLDER.TRASHED",
              description: "A folder is moved to the trash"
            },
            {
              name: "Metadata Instance Created",
              value: "METADATA_INSTANCE.CREATED",
              description: "A new metadata template instance is associated with a file or folder"
            },
            {
              name: "Metadata Instance Deleted",
              value: "METADATA_INSTANCE.DELETED",
              description: "An existing metadata template instance associated with a file or folder is deleted"
            },
            {
              name: "Metadata Instance Updated",
              value: "METADATA_INSTANCE.UPDATED",
              description: "An attribute (value) is updated/deleted for an existing metadata template instance associated with a file or folder"
            },
            {
              name: "Sharedlink Created",
              value: "SHARED_LINK.CREATED",
              description: "A shared link was created"
            },
            {
              name: "Sharedlink Deleted",
              value: "SHARED_LINK.DELETED",
              description: "A shared link was deleted"
            },
            {
              name: "Sharedlink Updated",
              value: "SHARED_LINK.UPDATED",
              description: "A shared link was updated"
            },
            {
              name: "Task Assignment Created",
              value: "TASK_ASSIGNMENT.CREATED",
              description: "A task is created"
            },
            {
              name: "Task Assignment Updated",
              value: "TASK_ASSIGNMENT.UPDATED",
              description: "A task is updated"
            },
            {
              name: "Webhook Deleted",
              value: "WEBHOOK.DELETED",
              description: "When a webhook is deleted"
            }
          ],
          required: true,
          default: [],
          description: "The events to listen to"
        },
        {
          displayName: "Target Type",
          name: "targetType",
          type: "options",
          options: [
            {
              name: "File",
              value: "file"
            },
            {
              name: "Folder",
              value: "folder"
            }
          ],
          default: "",
          description: "The type of item to trigger a webhook"
        },
        {
          displayName: "Target ID",
          name: "targetId",
          type: "string",
          default: "",
          description: "The ID of the item to trigger a webhook"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const events = this.getNodeParameter("events");
          const targetId = this.getNodeParameter("targetId");
          const targetType = this.getNodeParameter("targetType");
          const endpoint = "/webhooks";
          const webhooks = await import_GenericFunctions.boxApiRequestAllItems.call(this, "entries", "GET", endpoint, {});
          for (const webhook of webhooks) {
            if (webhook.address === webhookUrl && webhook.target.id === targetId && webhook.target.type === targetType) {
              for (const event of events) {
                if (!webhook.triggers.includes(event)) {
                  return false;
                }
              }
            }
            webhookData.webhookId = webhook.id;
            return true;
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const events = this.getNodeParameter("events");
          const targetId = this.getNodeParameter("targetId");
          const targetType = this.getNodeParameter("targetType");
          const endpoint = "/webhooks";
          const body = {
            address: webhookUrl,
            triggers: events,
            target: {
              id: targetId,
              type: targetType
            }
          };
          const responseData = await import_GenericFunctions.boxApiRequest.call(this, "POST", endpoint, body);
          if (responseData.id === void 0) {
            return false;
          }
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/webhooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.boxApiRequest.call(this, "DELETE", endpoint);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const bodyData = this.getBodyData();
    return {
      workflowData: [this.helpers.returnJsonArray(bodyData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BoxTrigger
});
//# sourceMappingURL=BoxTrigger.node.js.map