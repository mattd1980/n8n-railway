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
var Dhl_node_exports = {};
__export(Dhl_node_exports, {
  Dhl: () => Dhl
});
module.exports = __toCommonJS(Dhl_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Dhl {
  constructor() {
    this.description = {
      displayName: "DHL",
      name: "dhl",
      icon: "file:dhl.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume DHL API",
      defaults: {
        name: "DHL"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "dhlApi",
          required: true,
          testedBy: "dhlApiCredentialTest"
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          noDataExpression: true,
          type: "hidden",
          options: [
            {
              name: "Shipment",
              value: "shipment"
            }
          ],
          default: "shipment"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["shipment"]
            }
          },
          options: [
            {
              name: "Get Tracking Details",
              value: "get",
              action: "Get tracking details for a shipment"
            }
          ],
          default: "get"
        },
        {
          displayName: "Tracking Number",
          name: "trackingNumber",
          type: "string",
          required: true,
          default: ""
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Recipient's Postal Code",
              name: "recipientPostalCode",
              type: "string",
              default: "",
              description: "DHL will return more detailed information on the shipment when you provide the Recipient's Postal Code - it acts as a verification step"
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async dhlApiCredentialTest(credential) {
          try {
            await import_GenericFunctions.validateCredentials.call(this, credential.data);
          } catch (error) {
            if (error.statusCode === 401) {
              return {
                status: "Error",
                message: "The API Key included in the request is invalid"
              };
            }
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "shipment") {
          if (operation === "get") {
            const trackingNumber = this.getNodeParameter("trackingNumber", i);
            const options = this.getNodeParameter("options", i);
            qs = {
              trackingNumber
            };
            Object.assign(qs, options);
            responseData = await import_GenericFunctions.dhlApiRequest.call(this, "GET", "/track/shipments", {}, qs);
            returnData.push(...responseData.shipments);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.description });
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
  Dhl
});
//# sourceMappingURL=Dhl.node.js.map