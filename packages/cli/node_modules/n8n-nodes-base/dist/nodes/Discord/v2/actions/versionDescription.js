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
var versionDescription_exports = {};
__export(versionDescription_exports, {
  versionDescription: () => versionDescription
});
module.exports = __toCommonJS(versionDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
var channel = __toESM(require("./channel"));
var member = __toESM(require("./member"));
var message = __toESM(require("./message"));
var webhook = __toESM(require("./webhook"));
var import_descriptions = require("../../../../utils/sendAndWait/descriptions");
const versionDescription = {
  displayName: "Discord",
  name: "discord",
  icon: "file:discord.svg",
  group: ["output"],
  version: 2,
  subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
  description: "Sends data to Discord",
  defaults: {
    name: "Discord"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  webhooks: import_descriptions.sendAndWaitWebhooksDescription,
  credentials: [
    {
      name: "discordBotApi",
      required: true,
      displayOptions: {
        show: {
          authentication: ["botToken"]
        }
      }
    },
    {
      name: "discordOAuth2Api",
      required: true,
      displayOptions: {
        show: {
          authentication: ["oAuth2"]
        }
      }
    },
    {
      name: "discordWebhookApi",
      displayOptions: {
        show: {
          authentication: ["webhook"]
        }
      }
    }
  ],
  properties: [
    {
      displayName: "Connection Type",
      name: "authentication",
      type: "options",
      options: [
        {
          name: "Bot Token",
          value: "botToken",
          description: "Manage messages, channels, and members on a server"
        },
        {
          name: "OAuth2",
          value: "oAuth2",
          description: "Same features as 'Bot Token' with easier Bot installation"
        },
        {
          name: "Webhook",
          value: "webhook",
          description: "Send messages to a specific channel"
        }
      ],
      default: "botToken"
    },
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Channel",
          value: "channel"
        },
        {
          name: "Message",
          value: "message"
        },
        {
          name: "Member",
          value: "member"
        }
      ],
      default: "channel",
      displayOptions: {
        hide: {
          authentication: ["webhook"]
        }
      }
    },
    ...message.description,
    ...channel.description,
    ...member.description,
    ...webhook.description
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  versionDescription
});
//# sourceMappingURL=versionDescription.js.map