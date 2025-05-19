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
var ApiTemplateIo_node_exports = {};
__export(ApiTemplateIo_node_exports, {
  ApiTemplateIo: () => ApiTemplateIo
});
module.exports = __toCommonJS(ApiTemplateIo_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class ApiTemplateIo {
  constructor() {
    this.description = {
      displayName: "APITemplate.io",
      name: "apiTemplateIo",
      icon: "file:apiTemplateIo.svg",
      group: ["transform"],
      version: 1,
      description: "Consume the APITemplate.io API",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "APITemplate.io"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "apiTemplateIoApi",
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
              name: "Account",
              value: "account"
            },
            {
              name: "Image",
              value: "image"
            },
            {
              name: "PDF",
              value: "pdf"
            }
          ],
          default: "image"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          default: "create",
          required: true,
          options: [
            {
              name: "Create",
              value: "create",
              action: "Create an image"
            }
          ],
          displayOptions: {
            show: {
              resource: ["image"]
            }
          }
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          default: "create",
          required: true,
          options: [
            {
              name: "Create",
              value: "create",
              action: "Create a pdf"
            }
          ],
          displayOptions: {
            show: {
              resource: ["pdf"]
            }
          }
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          default: "get",
          required: true,
          options: [
            {
              name: "Get",
              value: "get",
              action: "Get an account"
            }
          ],
          displayOptions: {
            show: {
              resource: ["account"]
            }
          }
        },
        {
          displayName: "Template Name or ID",
          name: "imageTemplateId",
          type: "options",
          required: true,
          default: "",
          description: 'ID of the image template to use. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          typeOptions: {
            loadOptionsMethod: "getImageTemplates"
          },
          displayOptions: {
            show: {
              resource: ["image"],
              operation: ["create"]
            }
          }
        },
        {
          displayName: "Template Name or ID",
          name: "pdfTemplateId",
          type: "options",
          required: true,
          default: "",
          description: 'ID of the PDF template to use. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          typeOptions: {
            loadOptionsMethod: "getPdfTemplates"
          },
          displayOptions: {
            show: {
              resource: ["pdf"],
              operation: ["create"]
            }
          }
        },
        {
          displayName: "JSON Parameters",
          name: "jsonParameters",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              resource: ["pdf", "image"],
              operation: ["create"]
            }
          }
        },
        {
          displayName: "Download",
          name: "download",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              resource: ["pdf", "image"],
              operation: ["create"]
            }
          },
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: "Name of the binary property to which to write the data of the read file"
        },
        {
          displayName: "Put Output File in Field",
          name: "binaryProperty",
          type: "string",
          required: true,
          default: "data",
          hint: "The name of the output binary field to put the file in",
          displayOptions: {
            show: {
              resource: ["pdf", "image"],
              operation: ["create"],
              download: [true]
            }
          }
        },
        {
          displayName: "Overrides (JSON)",
          name: "overridesJson",
          type: "json",
          default: "",
          displayOptions: {
            show: {
              resource: ["image"],
              operation: ["create"],
              jsonParameters: [true]
            }
          },
          placeholder: '[ {"name": "text_1", "text": "hello world", "textBackgroundColor": "rgba(246, 243, 243, 0)" } ]'
        },
        {
          displayName: "Properties (JSON)",
          name: "propertiesJson",
          type: "json",
          default: "",
          displayOptions: {
            show: {
              resource: ["pdf"],
              operation: ["create"],
              jsonParameters: [true]
            }
          },
          placeholder: '{ "name": "text_1" }'
        },
        {
          displayName: "Overrides",
          name: "overridesUi",
          placeholder: "Add Override",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              resource: ["image"],
              operation: ["create"],
              jsonParameters: [false]
            }
          },
          default: {},
          options: [
            {
              name: "overrideValues",
              displayName: "Override",
              values: [
                {
                  displayName: "Properties",
                  name: "propertiesUi",
                  placeholder: "Add Property",
                  type: "fixedCollection",
                  typeOptions: {
                    multipleValues: true
                  },
                  default: {},
                  options: [
                    {
                      name: "propertyValues",
                      displayName: "Property",
                      values: [
                        {
                          displayName: "Key",
                          name: "key",
                          type: "string",
                          default: "",
                          description: "Name of the property"
                        },
                        {
                          displayName: "Value",
                          name: "value",
                          type: "string",
                          default: "",
                          description: "Value to the property"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          displayName: "Properties",
          name: "propertiesUi",
          placeholder: "Add Property",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          default: {},
          displayOptions: {
            show: {
              resource: ["pdf"],
              operation: ["create"],
              jsonParameters: [false]
            }
          },
          options: [
            {
              name: "propertyValues",
              displayName: "Property",
              values: [
                {
                  displayName: "Key",
                  name: "key",
                  type: "string",
                  default: "",
                  description: "Name of the property"
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "string",
                  default: "",
                  description: "Value to the property"
                }
              ]
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Field",
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["pdf", "image"],
              download: [true]
            }
          },
          default: {},
          options: [
            {
              displayName: "File Name",
              name: "fileName",
              type: "string",
              default: "",
              description: "The name of the downloaded image/pdf. It has to include the extension. For example: report.pdf"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getImageTemplates() {
          return await import_GenericFunctions.loadResource.call(this, "image");
        },
        async getPdfTemplates() {
          return await import_GenericFunctions.loadResource.call(this, "pdf");
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "account") {
      if (operation === "get") {
        for (let i = 0; i < length; i++) {
          try {
            responseData = await import_GenericFunctions.apiTemplateIoApiRequest.call(this, "GET", "/account-information");
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ json: { error: error.message } });
              continue;
            }
            throw error;
          }
        }
      }
    } else if (resource === "image") {
      if (operation === "create") {
        const download = this.getNodeParameter("download", 0);
        for (let i = 0; i < length; i++) {
          try {
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            let options = {};
            if (download) {
              options = this.getNodeParameter("options", i);
            }
            const qs = {
              template_id: this.getNodeParameter("imageTemplateId", i)
            };
            const body = { overrides: [] };
            if (!jsonParameters) {
              const overrides = this.getNodeParameter("overridesUi", i)?.overrideValues || [];
              if (overrides.length !== 0) {
                const data = [];
                for (const override of overrides) {
                  const properties = override.propertiesUi?.propertyValues || [];
                  data.push(
                    properties.reduce(
                      (obj, value) => Object.assign(obj, { [`${value.key}`]: value.value }),
                      {}
                    )
                  );
                }
                body.overrides = data;
              }
            } else {
              const overrideJson = this.getNodeParameter("overridesJson", i);
              if (overrideJson !== "") {
                const data = (0, import_GenericFunctions.validateJSON)(overrideJson);
                if (data === void 0) {
                  throw new import_n8n_workflow.NodeOperationError(this.getNode(), "A valid JSON must be provided.", {
                    itemIndex: i
                  });
                }
                body.overrides = data;
              }
            }
            responseData = await import_GenericFunctions.apiTemplateIoApiRequest.call(this, "POST", "/create", qs, body);
            if (download) {
              const binaryProperty = this.getNodeParameter("binaryProperty", i);
              const data = await import_GenericFunctions.downloadImage.call(this, responseData.download_url);
              const fileName = responseData.download_url.split("/").pop();
              const binaryData = await this.helpers.prepareBinaryData(
                data,
                options.fileName || fileName
              );
              responseData = {
                json: responseData,
                binary: {
                  [binaryProperty]: binaryData
                }
              };
            }
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ json: { error: error.message } });
              continue;
            }
            throw error;
          }
        }
        if (download) {
          return [returnData];
        }
      }
    } else if (resource === "pdf") {
      if (operation === "create") {
        const download = this.getNodeParameter("download", 0);
        for (let i = 0; i < length; i++) {
          try {
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            let options = {};
            if (download) {
              options = this.getNodeParameter("options", i);
            }
            const qs = {
              template_id: this.getNodeParameter("pdfTemplateId", i)
            };
            let data;
            if (!jsonParameters) {
              const properties = this.getNodeParameter("propertiesUi", i)?.propertyValues || [];
              if (properties.length === 0) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "The parameter properties cannot be empty",
                  { itemIndex: i }
                );
              }
              data = properties.reduce(
                (obj, value) => Object.assign(obj, { [`${value.key}`]: value.value }),
                {}
              );
            } else {
              const propertiesJson = this.getNodeParameter("propertiesJson", i);
              data = (0, import_GenericFunctions.validateJSON)(propertiesJson);
              if (data === void 0) {
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), "A valid JSON must be provided.", {
                  itemIndex: i
                });
              }
            }
            responseData = await import_GenericFunctions.apiTemplateIoApiRequest.call(
              this,
              "POST",
              "/create",
              qs,
              data
            );
            if (download) {
              const binaryProperty = this.getNodeParameter("binaryProperty", i);
              const imageData = await import_GenericFunctions.downloadImage.call(this, responseData.download_url);
              const fileName = responseData.download_url.split("/").pop();
              const binaryData = await this.helpers.prepareBinaryData(
                imageData,
                options.fileName || fileName
              );
              responseData = {
                json: responseData,
                binary: {
                  [binaryProperty]: binaryData
                }
              };
            }
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ json: { error: error.message } });
              continue;
            }
            throw error;
          }
        }
        if (download) {
          return [returnData];
        }
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiTemplateIo
});
//# sourceMappingURL=ApiTemplateIo.node.js.map