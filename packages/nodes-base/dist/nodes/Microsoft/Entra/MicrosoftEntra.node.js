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
var MicrosoftEntra_node_exports = {};
__export(MicrosoftEntra_node_exports, {
  MicrosoftEntra: () => MicrosoftEntra
});
module.exports = __toCommonJS(MicrosoftEntra_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class MicrosoftEntra {
  constructor() {
    this.description = {
      displayName: "Microsoft Entra ID",
      name: "microsoftEntra",
      icon: {
        light: "file:microsoftEntra.svg",
        dark: "file:microsoftEntra.dark.svg"
      },
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Interact with Microsoft Entra ID API",
      defaults: {
        name: "Microsoft Entra ID"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "microsoftEntraOAuth2Api",
          required: true
        }
      ],
      requestDefaults: {
        baseURL: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json"
        }
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Group",
              value: "group"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "user"
        },
        ...import_descriptions.groupOperations,
        ...import_descriptions.groupFields,
        ...import_descriptions.userOperations,
        ...import_descriptions.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        getGroupProperties: import_GenericFunctions.getGroupProperties,
        async getGroupPropertiesGetAll() {
          return (await import_GenericFunctions.getGroupProperties.call(this)).filter(
            (x) => ![
              "allowExternalSenders",
              "autoSubscribeNewMembers",
              "hideFromAddressLists",
              "hideFromOutlookClients",
              "isSubscribedByMail",
              "unseenCount"
            ].includes(x.value)
          );
        },
        getUserProperties: import_GenericFunctions.getUserProperties,
        async getUserPropertiesGetAll() {
          return (await import_GenericFunctions.getUserProperties.call(this)).filter(
            (x) => ![
              "aboutMe",
              "birthday",
              "hireDate",
              "interests",
              "mySite",
              "pastProjects",
              "preferredName",
              "responsibilities",
              "schools",
              "skills",
              "mailboxSettings"
            ].includes(x.value)
          );
        }
      },
      listSearch: {
        getGroups: import_GenericFunctions.getGroups,
        getUsers: import_GenericFunctions.getUsers
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftEntra
});
//# sourceMappingURL=MicrosoftEntra.node.js.map