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
var Mindee_node_exports = {};
__export(Mindee_node_exports, {
  Mindee: () => Mindee
});
module.exports = __toCommonJS(Mindee_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Mindee {
  constructor() {
    this.description = {
      displayName: "Mindee",
      name: "mindee",
      icon: "file:mindee.svg",
      group: ["input"],
      version: [1, 2, 3],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Mindee API",
      defaults: {
        name: "Mindee"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mindeeReceiptApi",
          required: true,
          displayOptions: {
            show: {
              resource: ["receipt"]
            }
          }
        },
        {
          name: "mindeeInvoiceApi",
          required: true,
          displayOptions: {
            show: {
              resource: ["invoice"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "API Version",
          name: "apiVersion",
          type: "options",
          isNodeSetting: true,
          displayOptions: {
            show: {
              "@version": [1]
            }
          },
          options: [
            {
              name: "1",
              value: 1
            },
            {
              name: "3",
              value: 3
            },
            {
              name: "4",
              value: 4
            }
          ],
          default: 1,
          description: "Which Mindee API Version to use"
        },
        {
          displayName: "API Version",
          name: "apiVersion",
          type: "options",
          isNodeSetting: true,
          displayOptions: {
            show: {
              "@version": [2]
            }
          },
          options: [
            {
              name: "1",
              value: 1
            },
            {
              name: "3",
              value: 3
            },
            {
              name: "4",
              value: 4
            }
          ],
          default: 3,
          description: "Which Mindee API Version to use"
        },
        {
          displayName: "API Version",
          name: "apiVersion",
          type: "options",
          isNodeSetting: true,
          displayOptions: {
            show: {
              "@version": [3]
            }
          },
          options: [
            {
              name: "1",
              value: 1
            },
            {
              name: "3",
              value: 3
            },
            {
              name: "4",
              value: 4
            }
          ],
          default: 4,
          description: "Which Mindee API Version to use"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Invoice",
              value: "invoice"
            },
            {
              name: "Receipt",
              value: "receipt"
            }
          ],
          default: "receipt"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Predict",
              value: "predict"
            }
          ],
          default: "predict"
        },
        {
          displayName: "Input Binary Field",
          name: "binaryPropertyName",
          type: "string",
          required: true,
          default: "data",
          displayOptions: {
            show: {
              operation: ["predict"],
              resource: ["receipt", "invoice"]
            }
          },
          hint: "The name of the input binary field containing the file to be uploaded"
        },
        {
          displayName: "RAW Data",
          name: "rawData",
          type: "boolean",
          default: false,
          description: "Whether to return the data exactly in the way it got received from the API"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const version = this.getNodeParameter("apiVersion", 0);
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let endpoint;
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "receipt") {
          if (operation === "predict") {
            const rawData = this.getNodeParameter("rawData", i);
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
            const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
            if (version === 1) {
              responseData = await import_GenericFunctions.mindeeApiRequest.call(
                this,
                "POST",
                "/expense_receipts/v2/predict",
                {},
                {},
                {
                  formData: {
                    file: {
                      value: dataBuffer,
                      options: {
                        filename: binaryData.fileName
                      }
                    }
                  }
                }
              );
            } else if (version === 3) {
              endpoint = "/expense_receipts/v3/predict";
              responseData = await import_GenericFunctions.mindeeApiRequest.call(
                this,
                "POST",
                endpoint,
                {},
                {},
                {
                  formData: {
                    document: {
                      value: dataBuffer,
                      options: {
                        filename: binaryData.fileName
                      }
                    }
                  }
                }
              );
            } else if (version === 4) {
              endpoint = "/expense_receipts/v4/predict";
              responseData = await import_GenericFunctions.mindeeApiRequest.call(
                this,
                "POST",
                endpoint,
                {},
                {},
                {
                  formData: {
                    document: {
                      value: dataBuffer,
                      options: {
                        filename: binaryData.fileName
                      }
                    }
                  }
                }
              );
            }
            if (!rawData) {
              if (version === 1) {
                responseData = (0, import_GenericFunctions.cleanDataPreviousApiVersions)(
                  responseData.predictions
                );
              } else if (version === 3 || version === 4) {
                responseData = (0, import_GenericFunctions.cleanData)(responseData.document);
              }
            }
          }
        }
        if (resource === "invoice") {
          if (operation === "predict") {
            const rawData = this.getNodeParameter("rawData", i);
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
            const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
            if (version === 1) {
              endpoint = "/invoices/v1/predict";
              responseData = await import_GenericFunctions.mindeeApiRequest.call(
                this,
                "POST",
                endpoint,
                {},
                {},
                {
                  formData: {
                    file: {
                      value: dataBuffer,
                      options: {
                        filename: binaryData.fileName
                      }
                    }
                  }
                }
              );
            } else if (version === 3) {
              endpoint = "/invoices/v3/predict";
              responseData = await import_GenericFunctions.mindeeApiRequest.call(
                this,
                "POST",
                endpoint,
                {},
                {},
                {
                  formData: {
                    document: {
                      value: dataBuffer,
                      options: {
                        filename: binaryData.fileName
                      }
                    }
                  }
                }
              );
            } else if (version === 4) {
              endpoint = "/invoices/v4/predict";
              responseData = await import_GenericFunctions.mindeeApiRequest.call(
                this,
                "POST",
                endpoint,
                {},
                {},
                {
                  formData: {
                    document: {
                      value: dataBuffer,
                      options: {
                        filename: binaryData.fileName
                      }
                    }
                  }
                }
              );
            } else {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid API version");
            }
            if (!rawData) {
              if (version === 1) {
                responseData = (0, import_GenericFunctions.cleanDataPreviousApiVersions)(
                  responseData.predictions
                );
              } else if (version === 3 || version === 4) {
                responseData = (0, import_GenericFunctions.cleanData)(responseData.document);
              }
            }
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else if (responseData !== void 0) {
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
  Mindee
});
//# sourceMappingURL=Mindee.node.js.map