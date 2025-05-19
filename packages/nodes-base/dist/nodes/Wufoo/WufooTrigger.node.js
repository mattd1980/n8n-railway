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
var WufooTrigger_node_exports = {};
__export(WufooTrigger_node_exports, {
  WufooTrigger: () => WufooTrigger
});
module.exports = __toCommonJS(WufooTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class WufooTrigger {
  constructor() {
    this.description = {
      displayName: "Wufoo Trigger",
      name: "wufooTrigger",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:wufoo.png",
      group: ["trigger"],
      version: 1,
      description: "Handle Wufoo events via webhooks",
      defaults: {
        name: "Wufoo Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "wufooApi",
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
          displayName: "Forms Name or ID",
          name: "form",
          type: "options",
          required: true,
          default: "",
          typeOptions: {
            loadOptionsMethod: "getForms"
          },
          description: 'The form upon which will trigger this node when a new entry is made. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Only Answers",
          name: "onlyAnswers",
          type: "boolean",
          default: true,
          description: "Whether to return only the answers of the form and not any of the other data"
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getForms() {
          const returnData = [];
          const formObject = await import_GenericFunctions.wufooApiRequest.call(this, "GET", "forms.json");
          for (const form of formObject.Forms) {
            const name = form.Name;
            const value = form.Hash;
            returnData.push({
              name,
              value
            });
          }
          if (formObject.EntryCountToday) {
            for (const form of formObject.EntryCountToday) {
              const name = form.Name;
              const value = form.Hash;
              returnData.push({
                name,
                value
              });
            }
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        // No API endpoint to allow checking of existing webhooks.
        // Creating new webhook will not overwrite existing one if parameters are the same.
        // Otherwise an update occurs.
        async checkExists() {
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const webhookData = this.getWorkflowStaticData("node");
          const formHash = this.getNodeParameter("form");
          const endpoint = `forms/${formHash}/webhooks.json`;
          webhookData.handshakeKey = (0, import_crypto.randomBytes)(20).toString("hex");
          const body = {
            url: webhookUrl,
            handshakeKey: webhookData.handshakeKey,
            metadata: true
          };
          const result = await import_GenericFunctions.wufooApiRequest.call(this, "PUT", endpoint, body);
          webhookData.webhookId = result.WebHookPutResult.Hash;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const formHash = this.getNodeParameter("form");
          const endpoint = `forms/${formHash}/webhooks/${webhookData.webhookId}.json`;
          try {
            await import_GenericFunctions.wufooApiRequest.call(this, "DELETE", endpoint);
          } catch (error) {
            return false;
          }
          delete webhookData.webhookId;
          delete webhookData.handshakeKey;
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const body = this.getBodyData();
    const webhookData = this.getWorkflowStaticData("node");
    const onlyAnswers = this.getNodeParameter("onlyAnswers");
    const entries = {};
    let returnObject = {};
    if (req.body.HandshakeKey !== webhookData.handshakeKey) {
      return {};
    }
    const fieldsObject = (0, import_n8n_workflow.jsonParse)(req.body.FieldStructure, {
      errorMessage: "Invalid JSON in request body field 'FieldStructure'"
    });
    fieldsObject.Fields.map((field) => {
      if (field.Type === "file") {
        entries[field.Title] = req.body[`${field.ID}-url`];
      } else if (field.Type === "address") {
        const address = {};
        for (const subfield of field.SubFields) {
          address[subfield.Label] = body[subfield.ID];
        }
        entries[field.Title] = address;
      } else if (field.Type === "checkbox") {
        const responses = [];
        for (const subfield of field.SubFields) {
          if (body[subfield.ID] !== "") {
            responses.push(body[subfield.ID]);
          }
        }
        entries[field.Title] = responses;
      } else if (field.Type === "likert") {
        const likert = {};
        for (const subfield of field.SubFields) {
          likert[subfield.Label] = body[subfield.ID];
        }
        entries[field.Title] = likert;
      } else if (field.Type === "shortname") {
        const shortname = {};
        for (const subfield of field.SubFields) {
          shortname[subfield.Label] = body[subfield.ID];
        }
        entries[field.Title] = shortname;
      } else {
        entries[field.Title] = req.body[field.ID];
      }
    });
    if (!onlyAnswers) {
      returnObject = {
        createdBy: req.body.CreatedBy,
        entryId: req.body.EntryId,
        dateCreated: req.body.DateCreated,
        formId: req.body.FormId,
        formStructure: (0, import_n8n_workflow.jsonParse)(req.body.FormStructure, {
          errorMessage: "Invalid JSON in request body field 'FormStructure'"
        }),
        fieldStructure: (0, import_n8n_workflow.jsonParse)(req.body.FieldStructure, {
          errorMessage: "Invalid JSON in request body field 'FieldStructure'"
        }),
        entries
      };
      return {
        workflowData: [this.helpers.returnJsonArray([returnObject])]
      };
    } else {
      return {
        workflowData: [this.helpers.returnJsonArray(entries)]
      };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WufooTrigger
});
//# sourceMappingURL=WufooTrigger.node.js.map