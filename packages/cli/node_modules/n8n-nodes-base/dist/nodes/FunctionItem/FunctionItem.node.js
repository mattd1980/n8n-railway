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
var FunctionItem_node_exports = {};
__export(FunctionItem_node_exports, {
  FunctionItem: () => FunctionItem
});
module.exports = __toCommonJS(FunctionItem_node_exports);
var import_vm2 = require("@n8n/vm2");
var import_n8n_workflow = require("n8n-workflow");
var import_JavaScriptSandbox = require("../Code/JavaScriptSandbox");
class FunctionItem {
  constructor() {
    this.description = {
      displayName: "Function Item",
      name: "functionItem",
      hidden: true,
      icon: "fa:code",
      group: ["transform"],
      version: 1,
      description: "Run custom function code which gets executed once per item",
      defaults: {
        name: "Function Item",
        color: "#ddbb33"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "A newer version of this node type is available, called the \u2018Code\u2019 node",
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "JavaScript Code",
          name: "functionCode",
          typeOptions: {
            alwaysOpenEditWindow: true,
            codeAutocomplete: "functionItem",
            editor: "jsEditor",
            rows: 10
          },
          type: "string",
          default: `// Code here will run once per input item.
// More info and help: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.functionitem/
// Tip: You can use luxon for dates and $jmespath for querying JSON structures

// Add a new field called 'myNewField' to the JSON of the item
item.myNewField = 1;

// You can write logs to the browser console
console.log('Done!');

return item;`,
          description: "The JavaScript code to execute for each item",
          noDataExpression: true
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let item;
    const cleanupData = (inputData) => {
      Object.keys(inputData).map((key) => {
        if (inputData[key] !== null && typeof inputData[key] === "object") {
          if (inputData[key].constructor.name === "Object") {
            inputData[key] = cleanupData(inputData[key]);
          } else {
            inputData[key] = (0, import_n8n_workflow.deepCopy)(inputData[key]);
          }
        }
      });
      return inputData;
    };
    for (let itemIndex = 0; itemIndex < length; itemIndex++) {
      const mode = this.getMode();
      try {
        item = items[itemIndex];
        item.index = itemIndex;
        item = (0, import_n8n_workflow.deepCopy)(item);
        const sandbox = {
          /** @deprecated for removal - replaced by getBinaryDataAsync() */
          getBinaryData: () => {
            if (mode === "manual") {
              this.sendMessageToUI(
                "getBinaryData(...) is deprecated and will be removed in a future version. Please consider switching to getBinaryDataAsync(...) instead."
              );
            }
            return item.binary;
          },
          /** @deprecated for removal - replaced by setBinaryDataAsync() */
          setBinaryData: async (data) => {
            if (mode === "manual") {
              this.sendMessageToUI(
                "setBinaryData(...) is deprecated and will be removed in a future version. Please consider switching to setBinaryDataAsync(...) instead."
              );
            }
            item.binary = data;
          },
          getNodeParameter: this.getNodeParameter.bind(this),
          getWorkflowStaticData: this.getWorkflowStaticData.bind(this),
          helpers: this.helpers,
          item: item.json,
          getBinaryDataAsync: async () => {
            if (item?.binary && item?.index !== void 0 && item?.index !== null) {
              for (const binaryPropertyName of Object.keys(item.binary)) {
                item.binary[binaryPropertyName].data = (await this.helpers.getBinaryDataBuffer(item.index, binaryPropertyName))?.toString("base64");
              }
            }
            return item.binary;
          },
          setBinaryDataAsync: async (data) => {
            if (!data) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "No data was provided to setBinaryDataAsync (data: IBinaryKeyData)."
              );
            }
            for (const binaryPropertyName of Object.keys(data)) {
              const binaryItem = data[binaryPropertyName];
              data[binaryPropertyName] = await this.helpers.setBinaryDataBuffer(
                binaryItem,
                Buffer.from(binaryItem.data, "base64")
              );
            }
            item.binary = data;
          }
        };
        const dataProxy = this.getWorkflowDataProxy(itemIndex);
        Object.assign(sandbox, dataProxy);
        const options = {
          console: mode === "manual" ? "redirect" : "inherit",
          sandbox,
          require: import_JavaScriptSandbox.vmResolver
        };
        const vm = new import_vm2.NodeVM(options);
        if (mode === "manual") {
          vm.on("console.log", this.sendMessageToUI.bind(this));
        }
        const functionCode = this.getNodeParameter("functionCode", itemIndex);
        let jsonData;
        try {
          jsonData = await vm.run(
            `module.exports = async function() {${functionCode}
}()`,
            __dirname
          );
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ json: { error: error.message } });
            continue;
          } else {
            const stackLines = error.stack.split("\n");
            if (stackLines.length > 0) {
              stackLines.shift();
              const lineParts = stackLines.find((line) => line.includes("FunctionItem")).split(":");
              if (lineParts.length > 2) {
                const lineNumber = lineParts.splice(-2, 1);
                if (!isNaN(lineNumber)) {
                  error.message = `${error.message} [Line ${lineNumber} | Item Index: ${itemIndex}]`;
                  throw error;
                }
              }
            }
            error.message = `${error.message} [Item Index: ${itemIndex}]`;
            throw error;
          }
        }
        if (jsonData === void 0) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "No data got returned. Always an object has to be returned!"
          );
        }
        const returnItem = {
          json: cleanupData(jsonData),
          pairedItem: {
            item: itemIndex
          }
        };
        if (item.binary) {
          returnItem.binary = item.binary;
        }
        returnData.push(returnItem);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message
            },
            pairedItem: {
              item: itemIndex
            }
          });
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
  FunctionItem
});
//# sourceMappingURL=FunctionItem.node.js.map