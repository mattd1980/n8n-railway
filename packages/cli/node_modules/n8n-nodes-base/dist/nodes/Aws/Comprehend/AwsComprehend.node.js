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
var AwsComprehend_node_exports = {};
__export(AwsComprehend_node_exports, {
  AwsComprehend: () => AwsComprehend
});
module.exports = __toCommonJS(AwsComprehend_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class AwsComprehend {
  constructor() {
    this.description = {
      displayName: "AWS Comprehend",
      name: "awsComprehend",
      icon: "file:comprehend.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Sends data to Amazon Comprehend",
      defaults: {
        name: "AWS Comprehend"
      },
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
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Text",
              value: "text"
            }
          ],
          default: "text",
          description: "The resource to perform"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Detect Dominant Language",
              value: "detectDominantLanguage",
              description: "Identify the dominant language",
              action: "Identify the dominant language"
            },
            {
              name: "Detect Entities",
              value: "detectEntities",
              description: "Inspects text for named entities, and returns information about them",
              action: "Inspect text for named entities, and returns information about them"
            },
            {
              name: "Detect Sentiment",
              value: "detectSentiment",
              description: "Analyse the sentiment of the text",
              action: "Analyze the sentiment of the text"
            }
          ],
          default: "detectDominantLanguage"
        },
        {
          displayName: "Language Code",
          name: "languageCode",
          type: "options",
          options: [
            {
              name: "Arabic",
              value: "ar"
            },
            {
              name: "Chinese",
              value: "zh"
            },
            {
              name: "Chinese (T)",
              value: "zh-TW"
            },
            {
              name: "English",
              value: "en"
            },
            {
              name: "French",
              value: "fr"
            },
            {
              name: "German",
              value: "de"
            },
            {
              name: "Hindi",
              value: "hi"
            },
            {
              name: "Italian",
              value: "it"
            },
            {
              name: "Japanese",
              value: "ja"
            },
            {
              name: "Korean",
              value: "ko"
            },
            {
              name: "Portuguese",
              value: "pt"
            },
            {
              name: "Spanish",
              value: "es"
            }
          ],
          default: "en",
          displayOptions: {
            show: {
              resource: ["text"],
              operation: ["detectSentiment", "detectEntities"]
            }
          },
          description: "The language code for text"
        },
        {
          displayName: "Text",
          name: "text",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              resource: ["text"]
            }
          },
          description: "The text to send"
        },
        {
          displayName: "Simplify",
          name: "simple",
          type: "boolean",
          displayOptions: {
            show: {
              resource: ["text"],
              operation: ["detectDominantLanguage"]
            }
          },
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          displayOptions: {
            show: {
              resource: ["text"],
              operation: ["detectEntities"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Endpoint Arn",
              name: "endpointArn",
              type: "string",
              default: "",
              description: "The Amazon Resource Name of an endpoint that is associated with a custom entity recognition model"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "text") {
          if (operation === "detectDominantLanguage") {
            const text = this.getNodeParameter("text", i);
            const simple = this.getNodeParameter("simple", i);
            const body = {
              Text: text
            };
            const action = "Comprehend_20171127.DetectDominantLanguage";
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              "comprehend",
              "POST",
              "",
              JSON.stringify(body),
              { "x-amz-target": action, "Content-Type": "application/x-amz-json-1.1" }
            );
            if (simple) {
              responseData = responseData.Languages.reduce(
                (accumulator, currentValue) => {
                  accumulator[currentValue.LanguageCode] = currentValue.Score;
                  return accumulator;
                },
                {}
              );
            }
          }
          if (operation === "detectSentiment") {
            const action = "Comprehend_20171127.DetectSentiment";
            const text = this.getNodeParameter("text", i);
            const languageCode = this.getNodeParameter("languageCode", i);
            const body = {
              Text: text,
              LanguageCode: languageCode
            };
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              "comprehend",
              "POST",
              "",
              JSON.stringify(body),
              { "x-amz-target": action, "Content-Type": "application/x-amz-json-1.1" }
            );
          }
          if (operation === "detectEntities") {
            const action = "Comprehend_20171127.DetectEntities";
            const text = this.getNodeParameter("text", i);
            const languageCode = this.getNodeParameter("languageCode", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              Text: text,
              LanguageCode: languageCode
            };
            if (additionalFields.endpointArn) {
              body.EndpointArn = additionalFields.endpointArn;
            }
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              "comprehend",
              "POST",
              "",
              JSON.stringify(body),
              { "x-amz-target": action, "Content-Type": "application/x-amz-json-1.1" }
            );
            responseData = responseData.Entities;
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
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
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AwsComprehend
});
//# sourceMappingURL=AwsComprehend.node.js.map