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
var AwsTextract_node_exports = {};
__export(AwsTextract_node_exports, {
  AwsTextract: () => AwsTextract
});
module.exports = __toCommonJS(AwsTextract_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class AwsTextract {
  constructor() {
    this.description = {
      displayName: "AWS Textract",
      name: "awsTextract",
      icon: "file:textract.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"]}}',
      description: "Sends data to Amazon Textract",
      defaults: {
        name: "AWS Textract"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Analyze Receipt or Invoice",
              value: "analyzeExpense"
            }
          ],
          default: "analyzeExpense"
        },
        {
          displayName: "Input Data Field Name",
          name: "binaryPropertyName",
          type: "string",
          default: "data",
          displayOptions: {
            show: {
              operation: ["analyzeExpense"]
            }
          },
          required: true,
          description: "The name of the input field containing the binary file data to be uploaded. Supported file types: PNG, JPEG."
        },
        {
          displayName: "Simplify",
          name: "simple",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["analyzeExpense"]
            }
          },
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data"
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async awsTextractApiCredentialTest(credential) {
          try {
            await import_GenericFunctions.validateCredentials.call(
              this,
              credential.data,
              "sts"
            );
          } catch (error) {
            return {
              status: "Error",
              message: "The security token included in the request is invalid"
            };
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
    let responseData;
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === "analyzeExpense") {
          const simple = this.getNodeParameter("simple", i);
          const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
          const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
          const body = {
            Document: {
              Bytes: binaryData.data
            }
          };
          const action = "Textract.AnalyzeExpense";
          responseData = await import_GenericFunctions.awsApiRequestREST.call(
            this,
            "textract",
            "POST",
            "",
            JSON.stringify(body),
            { "x-amz-target": action, "Content-Type": "application/x-amz-json-1.1" }
          );
          if (simple) {
            responseData = (0, import_GenericFunctions.simplify)(responseData);
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else {
          returnData.push(responseData);
        }
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
  AwsTextract
});
//# sourceMappingURL=AwsTextract.node.js.map