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
var Twilio_node_exports = {};
__export(Twilio_node_exports, {
  Twilio: () => Twilio
});
module.exports = __toCommonJS(Twilio_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Twilio {
  constructor() {
    this.description = {
      displayName: "Twilio",
      name: "twilio",
      icon: "file:twilio.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Send SMS and WhatsApp messages or make phone calls",
      defaults: {
        name: "Twilio"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "twilioApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Call",
              value: "call"
            },
            {
              name: "SMS",
              value: "sms"
            }
          ],
          default: "sms"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["sms"]
            }
          },
          options: [
            {
              name: "Send",
              value: "send",
              description: "Send SMS/MMS/WhatsApp message",
              action: "Send an SMS/MMS/WhatsApp message"
            }
          ],
          default: "send"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["call"]
            }
          },
          options: [
            {
              name: "Make",
              value: "make",
              action: "Make a call"
            }
          ],
          default: "make"
        },
        // ----------------------------------
        //         sms / call
        // ----------------------------------
        // ----------------------------------
        //         sms:send / call:make
        // ----------------------------------
        {
          displayName: "From",
          name: "from",
          type: "string",
          default: "",
          placeholder: "+14155238886",
          required: true,
          displayOptions: {
            show: {
              operation: ["send", "make"],
              resource: ["sms", "call"]
            }
          },
          description: "The number from which to send the message"
        },
        {
          displayName: "To",
          name: "to",
          type: "string",
          default: "",
          placeholder: "+14155238886",
          required: true,
          displayOptions: {
            show: {
              operation: ["send", "make"],
              resource: ["sms", "call"]
            }
          },
          description: "The number to which to send the message"
        },
        {
          displayName: "To Whatsapp",
          name: "toWhatsapp",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms"]
            }
          },
          description: "Whether the message should be sent to WhatsApp"
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["send"],
              resource: ["sms"]
            }
          },
          description: "The message to send"
        },
        {
          displayName: "Use TwiML",
          name: "twiml",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              operation: ["make"],
              resource: ["call"]
            }
          },
          description: 'Whether to use the <a href="https://www.twilio.com/docs/voice/twiml">Twilio Markup Language</a> in the message'
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["make"],
              resource: ["call"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "Status Callback",
              name: "statusCallback",
              type: "string",
              default: "",
              description: "Status Callbacks allow you to receive events related to the REST resources managed by Twilio: Rooms, Recordings and Compositions"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let operation;
    let resource;
    let body;
    let qs;
    let requestMethod;
    let endpoint;
    for (let i = 0; i < items.length; i++) {
      try {
        requestMethod = "GET";
        endpoint = "";
        body = {};
        qs = {};
        resource = this.getNodeParameter("resource", i);
        operation = this.getNodeParameter("operation", i);
        if (resource === "sms") {
          if (operation === "send") {
            requestMethod = "POST";
            endpoint = "/Messages.json";
            body.From = this.getNodeParameter("from", i);
            body.To = this.getNodeParameter("to", i);
            body.Body = this.getNodeParameter("message", i);
            body.StatusCallback = this.getNodeParameter("options.statusCallback", i, "");
            const toWhatsapp = this.getNodeParameter("toWhatsapp", i);
            if (toWhatsapp) {
              body.From = `whatsapp:${body.From}`;
              body.To = `whatsapp:${body.To}`;
            }
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "call") {
          if (operation === "make") {
            requestMethod = "POST";
            endpoint = "/Calls.json";
            const message = this.getNodeParameter("message", i);
            const useTwiml = this.getNodeParameter("twiml", i);
            body.From = this.getNodeParameter("from", i);
            body.To = this.getNodeParameter("to", i);
            if (useTwiml) {
              body.Twiml = message;
            } else {
              body.Twiml = `<Response><Say>${(0, import_GenericFunctions.escapeXml)(message)}</Say></Response>`;
            }
            body.StatusCallback = this.getNodeParameter("options.statusCallback", i, "");
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: i
          });
        }
        const responseData = await import_GenericFunctions.twilioApiRequest.call(this, requestMethod, endpoint, body, qs);
        returnData.push(responseData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Twilio
});
//# sourceMappingURL=Twilio.node.js.map