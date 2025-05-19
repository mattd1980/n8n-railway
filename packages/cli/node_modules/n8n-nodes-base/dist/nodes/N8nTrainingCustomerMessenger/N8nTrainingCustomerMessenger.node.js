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
var N8nTrainingCustomerMessenger_node_exports = {};
__export(N8nTrainingCustomerMessenger_node_exports, {
  N8nTrainingCustomerMessenger: () => N8nTrainingCustomerMessenger
});
module.exports = __toCommonJS(N8nTrainingCustomerMessenger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class N8nTrainingCustomerMessenger {
  constructor() {
    this.description = {
      displayName: "Customer Messenger (n8n training)",
      name: "n8nTrainingCustomerMessenger",
      icon: {
        light: "file:n8nTrainingCustomerMessenger.svg",
        dark: "file:n8nTrainingCustomerMessenger.dark.svg"
      },
      group: ["transform"],
      version: 1,
      description: "Dummy node used for n8n training",
      defaults: {
        name: "Customer Messenger (n8n training)"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Customer ID",
          name: "customerId",
          type: "string",
          required: true,
          default: ""
        },
        {
          displayName: "Message",
          name: "message",
          type: "string",
          required: true,
          typeOptions: {
            rows: 4
          },
          default: ""
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    for (let i = 0; i < length; i++) {
      const customerId = this.getNodeParameter("customerId", i);
      const message = this.getNodeParameter("message", i);
      responseData = { output: `Sent message to customer ${customerId}:  ${message}` };
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  N8nTrainingCustomerMessenger
});
//# sourceMappingURL=N8nTrainingCustomerMessenger.node.js.map