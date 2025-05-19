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
var Brevo_node_exports = {};
__export(Brevo_node_exports, {
  Brevo: () => Brevo
});
module.exports = __toCommonJS(Brevo_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AttributeDescription = require("./AttributeDescription");
var import_ContactDescription = require("./ContactDescription");
var import_EmailDescription = require("./EmailDescription");
var import_SenderDescrition = require("./SenderDescrition");
class Brevo {
  constructor() {
    this.description = {
      displayName: "Brevo",
      // keep sendinblue name for backward compatibility
      name: "sendInBlue",
      icon: "file:brevo.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Brevo API",
      defaults: {
        name: "Brevo"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "sendInBlueApi",
          required: true
        }
      ],
      requestDefaults: {
        baseURL: "https://api.brevo.com"
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Contact Attribute",
              value: "attribute"
            },
            {
              name: "Email",
              value: "email"
            },
            {
              name: "Sender",
              value: "sender"
            }
          ],
          default: "email"
        },
        ...import_AttributeDescription.attributeOperations,
        ...import_AttributeDescription.attributeFields,
        ...import_SenderDescrition.senderOperations,
        ...import_SenderDescrition.senderFields,
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields,
        ...import_EmailDescription.emailOperations,
        ...import_EmailDescription.emailFields
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Brevo
});
//# sourceMappingURL=Brevo.node.js.map