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
var AwsLambda_node_exports = {};
__export(AwsLambda_node_exports, {
  AwsLambda: () => AwsLambda
});
module.exports = __toCommonJS(AwsLambda_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class AwsLambda {
  constructor() {
    this.description = {
      displayName: "AWS Lambda",
      name: "awsLambda",
      icon: "file:lambda.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["function"]}}',
      description: "Invoke functions on AWS Lambda",
      defaults: {
        name: "AWS Lambda"
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
              name: "Invoke",
              value: "invoke",
              description: "Invoke a function",
              action: "Invoke a function"
            }
          ],
          default: "invoke"
        },
        {
          displayName: "Function Name or ID",
          name: "function",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getFunctions"
          },
          displayOptions: {
            show: {
              operation: ["invoke"]
            }
          },
          options: [],
          default: "",
          required: true,
          description: 'The function you want to invoke. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Qualifier",
          name: "qualifier",
          type: "string",
          displayOptions: {
            show: {
              operation: ["invoke"]
            }
          },
          required: true,
          default: "$LATEST",
          description: "Specify a version or alias to invoke a published version of the function"
        },
        {
          displayName: "Invocation Type",
          name: "invocationType",
          type: "options",
          options: [
            {
              name: "Wait for Results",
              value: "RequestResponse",
              description: "Invoke the function synchronously and wait for the response"
            },
            {
              name: "Continue Workflow",
              value: "Event",
              description: "Invoke the function and immediately continue the workflow"
            }
          ],
          displayOptions: {
            show: {
              operation: ["invoke"]
            }
          },
          default: "RequestResponse",
          description: "Specify if the workflow should wait for the function to return the results"
        },
        {
          displayName: "JSON Input",
          name: "payload",
          type: "string",
          displayOptions: {
            show: {
              operation: ["invoke"]
            }
          },
          default: "",
          description: "The JSON that you want to provide to your Lambda function as input"
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getFunctions() {
          const returnData = [];
          const data = await import_GenericFunctions.awsApiRequestREST.call(this, "lambda", "GET", "/2015-03-31/functions/");
          for (const func of data.Functions) {
            returnData.push({
              name: func.FunctionName,
              value: func.FunctionArn
            });
          }
          if (data.NextMarker) {
            let marker = data.NextMarker;
            while (true) {
              const dataLoop = await import_GenericFunctions.awsApiRequestREST.call(
                this,
                "lambda",
                "GET",
                `/2015-03-31/functions/?MaxItems=50&Marker=${encodeURIComponent(marker)}`
              );
              for (const func of dataLoop.Functions) {
                returnData.push({
                  name: func.FunctionName,
                  value: func.FunctionArn
                });
              }
              if (dataLoop.NextMarker) {
                marker = dataLoop.NextMarker;
              } else {
                break;
              }
            }
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      try {
        const params = {
          FunctionName: this.getNodeParameter("function", i),
          InvocationType: this.getNodeParameter("invocationType", i),
          Payload: this.getNodeParameter("payload", i),
          Qualifier: this.getNodeParameter("qualifier", i)
        };
        const responseData = await import_GenericFunctions.awsApiRequestREST.call(
          this,
          "lambda",
          "POST",
          `/2015-03-31/functions/${params.FunctionName}/invocations?Qualifier=${params.Qualifier}`,
          params.Payload,
          {
            "X-Amz-Invocation-Type": params.InvocationType,
            "Content-Type": "application/x-amz-json-1.0"
          }
        );
        if (responseData?.errorMessage !== void 0) {
          let _errorMessage = responseData.errorMessage;
          if (responseData.stackTrace) {
            _errorMessage += `

Stack trace:
${responseData.stackTrace}`;
          }
          throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData);
        } else {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({
              result: responseData
            }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
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
  AwsLambda
});
//# sourceMappingURL=AwsLambda.node.js.map