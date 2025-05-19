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
var node_description_exports = {};
__export(node_description_exports, {
  description: () => description
});
module.exports = __toCommonJS(node_description_exports);
var import_n8n_workflow = require("n8n-workflow");
var calendar = __toESM(require("./calendar"));
var contact = __toESM(require("./contact"));
var draft = __toESM(require("./draft"));
var event = __toESM(require("./event"));
var folder = __toESM(require("./folder"));
var folderMessage = __toESM(require("./folderMessage"));
var message = __toESM(require("./message"));
var messageAttachment = __toESM(require("./messageAttachment"));
var import_descriptions = require("../../../../../utils/sendAndWait/descriptions");
const description = {
  displayName: "Microsoft Outlook",
  name: "microsoftOutlook",
  group: ["transform"],
  icon: "file:outlook.svg",
  version: 2,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume Microsoft Outlook API",
  defaults: {
    name: "Microsoft Outlook"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  usableAsTool: true,
  credentials: [
    {
      name: "microsoftOutlookOAuth2Api",
      required: true
    }
  ],
  webhooks: import_descriptions.sendAndWaitWebhooksDescription,
  properties: [
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      default: "message",
      options: [
        {
          name: "Calendar",
          value: "calendar"
        },
        {
          name: "Contact",
          value: "contact"
        },
        {
          name: "Draft",
          value: "draft"
        },
        {
          name: "Event",
          value: "event"
        },
        {
          name: "Folder",
          value: "folder"
        },
        {
          name: "Folder Message",
          value: "folderMessage"
        },
        {
          name: "Message",
          value: "message"
        },
        {
          name: "Message Attachment",
          value: "messageAttachment"
        }
      ]
    },
    ...calendar.description,
    ...contact.description,
    ...draft.description,
    ...event.description,
    ...folder.description,
    ...folderMessage.description,
    ...message.description,
    ...messageAttachment.description
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=node.description.js.map