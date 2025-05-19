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
var DebugHelper_node_exports = {};
__export(DebugHelper_node_exports, {
  DebugHelper: () => DebugHelper
});
module.exports = __toCommonJS(DebugHelper_node_exports);
var import_minifaker = require("minifaker");
var import_n8n_workflow = require("n8n-workflow");
var import_functions = require("./functions");
var import_randomData = require("./randomData");
class DebugHelper {
  constructor() {
    this.description = {
      displayName: "DebugHelper",
      name: "debugHelper",
      icon: { light: "file:DebugHelper.svg", dark: "file:DebugHelper.dark.svg" },
      group: ["output"],
      subtitle: '={{$parameter["category"]}}',
      description: "Causes problems intentionally and generates useful data for debugging",
      version: 1,
      defaults: {
        name: "DebugHelper"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [],
      properties: [
        {
          displayName: "Category",
          name: "category",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Do Nothing",
              value: "doNothing",
              description: "Does nothing"
            },
            {
              name: "Throw Error",
              value: "throwError",
              description: "Throws an error with the specified type and message"
            },
            {
              name: "Out Of Memory",
              value: "oom",
              description: "Generates a large amount of memory to cause an out of memory error"
            },
            {
              name: "Generate Random Data",
              value: "randomData",
              description: "Generates random data sets"
            }
          ],
          default: "throwError"
        },
        {
          displayName: "Error Type",
          name: "throwErrorType",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "NodeApiError",
              value: "NodeApiError"
            },
            {
              name: "NodeOperationError",
              value: "NodeOperationError"
            },
            {
              name: "Error",
              value: "Error"
            }
          ],
          default: "NodeApiError",
          displayOptions: {
            show: {
              category: ["throwError"]
            }
          }
        },
        {
          displayName: "Error Message",
          name: "throwErrorMessage",
          type: "string",
          default: "Node has thrown an error",
          description: "The message to send as part of the error",
          displayOptions: {
            show: {
              category: ["throwError"]
            }
          }
        },
        {
          displayName: "Memory Size to Generate",
          name: "memorySizeValue",
          type: "number",
          default: 10,
          description: "The approximate amount of memory to generate. Be generous...",
          displayOptions: {
            show: {
              category: ["oom"]
            }
          }
        },
        {
          displayName: "Data Type",
          name: "randomDataType",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Address",
              value: "address"
            },
            {
              name: "Coordinates",
              value: "latLong"
            },
            {
              name: "Credit Card",
              value: "creditCard"
            },
            {
              name: "Email",
              value: "email"
            },
            {
              name: "IPv4",
              value: "ipv4"
            },
            {
              name: "IPv6",
              value: "ipv6"
            },
            {
              name: "MAC",
              value: "macAddress"
            },
            {
              name: "NanoIds",
              value: "nanoid"
            },
            {
              name: "URL",
              value: "url"
            },
            {
              name: "User Data",
              value: "user"
            },
            {
              name: "UUID",
              value: "uuid"
            },
            {
              name: "Version",
              value: "semver"
            }
          ],
          default: "user",
          displayOptions: {
            show: {
              category: ["randomData"]
            }
          }
        },
        {
          displayName: "NanoId Alphabet",
          name: "nanoidAlphabet",
          type: "string",
          default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
          description: "The alphabet to use for generating the nanoIds",
          displayOptions: {
            show: {
              category: ["randomData"],
              randomDataType: ["nanoid"]
            }
          }
        },
        {
          displayName: "NanoId Length",
          name: "nanoidLength",
          type: "string",
          default: "16",
          description: "The length of each nanoIds",
          displayOptions: {
            show: {
              category: ["randomData"],
              randomDataType: ["nanoid"]
            }
          }
        },
        {
          displayName: "Seed",
          name: "randomDataSeed",
          type: "string",
          default: "",
          placeholder: "Leave empty for random seed",
          description: "If set, seed to use for generating the data (same seed will generate the same data)",
          displayOptions: {
            show: {
              category: ["randomData"]
            }
          }
        },
        {
          displayName: "Number of Items to Generate",
          name: "randomDataCount",
          type: "number",
          default: 10,
          description: "The number of random data items to generate into an array",
          displayOptions: {
            show: {
              category: ["randomData"]
            }
          }
        },
        {
          displayName: "Output as Single Array",
          name: "randomDataSingleArray",
          type: "boolean",
          default: false,
          description: "Whether to output a single array instead of multiple items",
          displayOptions: {
            show: {
              category: ["randomData"]
            }
          }
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const category = this.getNodeParameter("category", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        switch (category) {
          case "doNothing":
            break;
          case "throwError":
            const throwErrorType = this.getNodeParameter("throwErrorType", 0);
            const throwErrorMessage = this.getNodeParameter("throwErrorMessage", 0);
            switch (throwErrorType) {
              case "NodeApiError":
                throw new import_n8n_workflow.NodeApiError(
                  this.getNode(),
                  { message: throwErrorMessage },
                  { message: throwErrorMessage }
                );
              case "NodeOperationError":
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), throwErrorMessage, {
                  message: throwErrorMessage
                });
              case "Error":
                throw new import_n8n_workflow.ApplicationError(throwErrorMessage);
              default:
                break;
            }
          case "oom":
            const memorySizeValue = this.getNodeParameter("memorySizeValue", 0);
            (0, import_functions.runGarbageCollector)();
            const memUsed = (0, import_functions.generateGarbageMemory)(memorySizeValue);
            items[i].json = memUsed;
            returnData.push(items[i]);
            break;
          case "randomData":
            const randomDataType = this.getNodeParameter("randomDataType", 0);
            const randomDataCount = this.getNodeParameter("randomDataCount", 0);
            const randomDataSeed = this.getNodeParameter("randomDataSeed", 0);
            const randomDataSingleArray = this.getNodeParameter(
              "randomDataSingleArray",
              0
            );
            const newItem = {
              json: {},
              pairedItem: { item: i }
            };
            if (randomDataSeed !== "") {
              (0, import_minifaker.setSeed)(randomDataSeed);
            }
            let randomFn = import_randomData.generateRandomUser;
            switch (randomDataType) {
              case "user":
                randomFn = import_randomData.generateRandomUser;
                break;
              case "email":
                randomFn = import_randomData.generateRandomEmail;
                break;
              case "address":
                randomFn = import_randomData.generateRandomAddress;
                break;
              case "creditCard":
                randomFn = import_randomData.generateCreditCard;
                break;
              case "uuid":
                randomFn = import_randomData.generateUUID;
                break;
              case "macAddress":
                randomFn = import_randomData.generateMAC;
                break;
              case "ipv4":
                randomFn = import_randomData.generateIPv4;
                break;
              case "ipv6":
                randomFn = import_randomData.generateIPv6;
                break;
              case "latLong":
                randomFn = import_randomData.generateLocation;
                break;
              case "semver":
                randomFn = import_randomData.generateVersion;
                break;
              case "url":
                randomFn = import_randomData.generateURL;
                break;
              case "nanoid":
                const nanoidAlphabet = this.getNodeParameter("nanoidAlphabet", 0);
                const nanoidLength = this.getNodeParameter("nanoidLength", 0);
                randomFn = () => (0, import_randomData.generateNanoid)(nanoidAlphabet, nanoidLength);
                break;
            }
            const generatedItems = (0, import_minifaker.array)(randomDataCount, randomFn);
            if (randomDataSingleArray) {
              newItem.json = { generatedItems };
              returnData.push(newItem);
            } else {
              for (const generatedItem of generatedItems) {
                returnData.push({
                  json: generatedItem,
                  pairedItem: { item: i }
                });
              }
            }
            break;
          default:
            break;
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
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DebugHelper
});
//# sourceMappingURL=DebugHelper.node.js.map