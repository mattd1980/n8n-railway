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
var EmailSendV2_node_exports = {};
__export(EmailSendV2_node_exports, {
  EmailSendV2: () => EmailSendV2,
  versionDescription: () => versionDescription
});
module.exports = __toCommonJS(EmailSendV2_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var send = __toESM(require("./send.operation"));
var sendAndWait = __toESM(require("./sendAndWait.operation"));
var import_utils = require("./utils");
var import_descriptions = require("../../../utils/sendAndWait/descriptions");
var import_utils2 = require("../../../utils/sendAndWait/utils");
const versionDescription = {
  displayName: "Send Email",
  name: "emailSend",
  icon: "fa:envelope",
  group: ["output"],
  version: [2, 2.1],
  description: "Sends an email using SMTP protocol",
  defaults: {
    name: "Send Email",
    color: "#00bb88"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  usableAsTool: true,
  credentials: [
    {
      name: "smtp",
      required: true,
      testedBy: "smtpConnectionTest"
    }
  ],
  webhooks: import_descriptions.sendAndWaitWebhooksDescription,
  properties: [
    {
      displayName: "Resource",
      name: "resource",
      type: "hidden",
      noDataExpression: true,
      default: "email",
      options: [
        {
          name: "Email",
          value: "email"
        }
      ]
    },
    {
      displayName: "Operation",
      name: "operation",
      type: "options",
      noDataExpression: true,
      default: "send",
      options: [
        {
          name: "Send",
          value: "send",
          action: "Send an Email"
        },
        {
          name: "Send and Wait for Response",
          value: import_n8n_workflow.SEND_AND_WAIT_OPERATION,
          action: "Send message and wait for response"
        }
      ]
    },
    ...send.description,
    ...sendAndWait.description
  ]
};
class EmailSendV2 {
  constructor(baseDescription) {
    this.methods = {
      credentialTest: { smtpConnectionTest: import_utils.smtpConnectionTest }
    };
    this.webhook = import_utils2.sendAndWaitWebhook;
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    let returnData = [];
    const operation = this.getNodeParameter("operation", 0);
    if (operation === import_n8n_workflow.SEND_AND_WAIT_OPERATION) {
      returnData = await sendAndWait.execute.call(this);
    }
    if (operation === "send") {
      returnData = await send.execute.call(this);
    }
    return returnData;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailSendV2,
  versionDescription
});
//# sourceMappingURL=EmailSendV2.node.js.map