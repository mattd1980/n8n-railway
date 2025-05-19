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
var GooglePerspective_node_exports = {};
__export(GooglePerspective_node_exports, {
  GooglePerspective: () => GooglePerspective
});
module.exports = __toCommonJS(GooglePerspective_node_exports);
var import_iso_639_1 = __toESM(require("iso-639-1"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class GooglePerspective {
  constructor() {
    this.description = {
      displayName: "Google Perspective",
      name: "googlePerspective",
      icon: { light: "file:googlePerspective.svg", dark: "file:googlePerspective.dark.svg" },
      group: ["transform"],
      version: 1,
      description: "Consume Google Perspective API",
      subtitle: '={{$parameter["operation"]}}',
      defaults: {
        name: "Google Perspective"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googlePerspectiveOAuth2Api",
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
              name: "Analyze Comment",
              value: "analyzeComment"
            }
          ],
          default: "analyzeComment"
        },
        {
          displayName: "Text",
          name: "text",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["analyzeComment"]
            }
          }
        },
        {
          displayName: "Attributes to Analyze",
          name: "requestedAttributesUi",
          type: "fixedCollection",
          default: {},
          typeOptions: {
            multipleValues: true
          },
          placeholder: "Add Atrribute",
          required: true,
          displayOptions: {
            show: {
              operation: ["analyzeComment"]
            }
          },
          options: [
            {
              displayName: "Properties",
              name: "requestedAttributesValues",
              values: [
                {
                  displayName: "Attribute Name",
                  name: "attributeName",
                  type: "options",
                  options: [
                    {
                      name: "Flirtation",
                      value: "flirtation"
                    },
                    {
                      name: "Identity Attack",
                      value: "identity_attack"
                    },
                    {
                      name: "Insult",
                      value: "insult"
                    },
                    {
                      name: "Profanity",
                      value: "profanity"
                    },
                    {
                      name: "Severe Toxicity",
                      value: "severe_toxicity"
                    },
                    {
                      name: "Sexually Explicit",
                      value: "sexually_explicit"
                    },
                    {
                      name: "Threat",
                      value: "threat"
                    },
                    {
                      name: "Toxicity",
                      value: "toxicity"
                    }
                  ],
                  description: 'Attribute to analyze in the text. Details <a href="https://developers.perspectiveapi.com/s/about-the-api-attributes-and-languages">here</a>.',
                  default: "flirtation"
                },
                {
                  displayName: "Score Threshold",
                  name: "scoreThreshold",
                  type: "number",
                  typeOptions: {
                    numberPrecision: 2,
                    minValue: 0,
                    maxValue: 1
                  },
                  description: "Score above which to return results. At zero, all scores are returned.",
                  default: 0
                }
              ]
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          displayOptions: {
            show: {
              operation: ["analyzeComment"]
            }
          },
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Language Name or ID",
              name: "languages",
              type: "options",
              typeOptions: {
                loadOptionsMethod: "getLanguages"
              },
              default: "",
              description: 'Languages of the text input. If unspecified, the API will auto-detect the comment language. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available languages to display them to user so that they can
        // select them easily
        async getLanguages() {
          const returnData = [];
          const supportedLanguages = [
            "English",
            "Spanish",
            "French",
            "German",
            "Portuguese",
            "Italian",
            "Russian"
          ];
          const languages = import_iso_639_1.default.getAllNames().filter(
            (language) => supportedLanguages.includes(language)
          );
          for (const language of languages) {
            const languageName = language;
            const languageId = import_iso_639_1.default.getCode(language);
            returnData.push({
              name: languageName,
              value: languageId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    const returnData = [];
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === "analyzeComment") {
          const attributes = this.getNodeParameter(
            "requestedAttributesUi.requestedAttributesValues",
            i,
            []
          );
          if (!attributes.length) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "Please enter at least one attribute to analyze.",
              { itemIndex: i }
            );
          }
          const requestedAttributes = attributes.reduce((acc, cur) => {
            return Object.assign(acc, {
              [cur.attributeName.toUpperCase()]: {
                scoreType: "probability",
                scoreThreshold: cur.scoreThreshold
              }
            });
          }, {});
          const body = {
            comment: {
              type: "PLAIN_TEXT",
              text: this.getNodeParameter("text", i)
            },
            requestedAttributes
          };
          const { languages } = this.getNodeParameter("options", i);
          if (languages?.length) {
            body.languages = languages;
          }
          responseData = await import_GenericFunctions.googleApiRequest.call(
            this,
            "POST",
            "/v1alpha1/comments:analyze",
            body
          );
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
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
  GooglePerspective
});
//# sourceMappingURL=GooglePerspective.node.js.map