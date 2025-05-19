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
var WhatsApp_node_exports = {};
__export(WhatsApp_node_exports, {
  WhatsApp: () => WhatsApp
});
module.exports = __toCommonJS(WhatsApp_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_MediaDescription = require("./MediaDescription");
var import_MessageFunctions = require("./MessageFunctions");
var import_MessagesDescription = require("./MessagesDescription");
var import_configureWaitTillDate = require("../../utils/sendAndWait/configureWaitTillDate.util");
var import_descriptions = require("../../utils/sendAndWait/descriptions");
var import_utils = require("../../utils/sendAndWait/utils");
const WHATSAPP_CREDENTIALS_TYPE = "whatsAppApi";
class WhatsApp {
  constructor() {
    this.description = {
      displayName: "WhatsApp Business Cloud",
      name: "whatsApp",
      icon: "file:whatsapp.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{ $parameter["resource"] + ": " + $parameter["operation"] }}',
      description: "Access WhatsApp API",
      defaults: {
        name: "WhatsApp Business Cloud"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      webhooks: import_descriptions.sendAndWaitWebhooksDescription,
      credentials: [
        {
          name: WHATSAPP_CREDENTIALS_TYPE,
          required: true
        }
      ],
      requestDefaults: {
        baseURL: import_GenericFunctions.WHATSAPP_BASE_URL
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Message",
              value: "message"
            },
            {
              name: "Media",
              value: "media"
            }
          ],
          default: "message"
        },
        ...import_MessagesDescription.messageFields,
        ...import_MediaDescription.mediaFields,
        ...import_MessagesDescription.messageTypeFields,
        ...import_MediaDescription.mediaTypeFields,
        ...(0, import_utils.getSendAndWaitProperties)([], "message", void 0, {
          noButtonStyle: true,
          defaultApproveLabel: "\u2713 Approve",
          defaultDisapproveLabel: "\u2717 Decline"
        }).filter((p) => p.name !== "subject")
      ]
    };
    this.webhook = import_utils.sendAndWaitWebhook;
    this.customOperations = {
      message: {
        async [import_n8n_workflow.SEND_AND_WAIT_OPERATION]() {
          try {
            const phoneNumberId = this.getNodeParameter("phoneNumberId", 0);
            const recipientPhoneNumber = (0, import_MessageFunctions.sanitizePhoneNumber)(
              this.getNodeParameter("recipientPhoneNumber", 0)
            );
            const config = (0, import_utils.getSendAndWaitConfig)(this);
            const instanceId = this.getInstanceId();
            await this.helpers.httpRequestWithAuthentication.call(
              this,
              WHATSAPP_CREDENTIALS_TYPE,
              (0, import_GenericFunctions.createMessage)(config, phoneNumberId, recipientPhoneNumber, instanceId)
            );
            const waitTill = (0, import_configureWaitTillDate.configureWaitTillDate)(this);
            await this.putExecutionToWait(waitTill);
            return [this.getInputData()];
          } catch (error) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
          }
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhatsApp
});
//# sourceMappingURL=WhatsApp.node.js.map