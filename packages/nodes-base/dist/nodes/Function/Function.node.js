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
var Function_node_exports = {};
__export(Function_node_exports, {
  Function: () => Function
});
module.exports = __toCommonJS(Function_node_exports);
var import_vm2 = require("@n8n/vm2");
var import_n8n_workflow = require("n8n-workflow");
var import_JavaScriptSandbox = require("../Code/JavaScriptSandbox");
class Function {
  constructor() {
    this.description = {
      displayName: "Function",
      name: "function",
      hidden: true,
      icon: "fa:code",
      group: ["transform"],
      version: 1,
      description: "Run custom function code which gets executed once and allows you to add, remove, change and replace items",
      defaults: {
        name: "Function",
        color: "#FF9922"
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
            codeAutocomplete: "function",
            editor: "jsEditor",
            rows: 10
          },
          type: "string",
          default: `// Code here will run only once, no matter how many input items there are.
// More info and help:https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.function/
// Tip: You can use luxon for dates and $jmespath for querying JSON structures

// Loop over inputs and add a new field called 'myNewField' to the JSON of each one
for (item of items) {
  item.json.myNewField = 1;
}

// You can write logs to the browser console
console.log('Done!');

return items;`,
          description: "The JavaScript code to execute",
          noDataExpression: true
        }
      ]
    };
  }
  async execute() {
    let items = this.getInputData();
    items = (0, import_n8n_workflow.deepCopy)(items);
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      items[itemIndex].index = itemIndex;
    }
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
    const sandbox = {
      getNodeParameter: this.getNodeParameter.bind(this),
      getWorkflowStaticData: this.getWorkflowStaticData.bind(this),
      helpers: this.helpers,
      items,
      // To be able to access data of other items
      $item: (index) => this.getWorkflowDataProxy(index),
      getBinaryDataAsync: async (item) => {
        if (item?.binary && item?.index !== void 0 && item?.index !== null) {
          for (const binaryPropertyName of Object.keys(item.binary)) {
            item.binary[binaryPropertyName].data = (await this.helpers.getBinaryDataBuffer(item.index, binaryPropertyName))?.toString("base64");
          }
        }
        return item.binary;
      },
      setBinaryDataAsync: async (item, data) => {
        if (!item) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "No item was provided to setBinaryDataAsync (item: INodeExecutionData, data: IBinaryKeyData)."
          );
        }
        if (!data) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "No data was provided to setBinaryDataAsync (item: INodeExecutionData, data: IBinaryKeyData)."
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
    Object.assign(sandbox, sandbox.$item(0));
    const mode = this.getMode();
    const options = {
      console: mode === "manual" ? "redirect" : "inherit",
      sandbox,
      require: import_JavaScriptSandbox.vmResolver
    };
    const vm = new import_vm2.NodeVM(options);
    if (mode === "manual") {
      vm.on("console.log", this.sendMessageToUI.bind(this));
    }
    const functionCode = this.getNodeParameter("functionCode", 0);
    try {
      items = await vm.run(`module.exports = async function() {${functionCode}
}()`, __dirname);
      items = this.helpers.normalizeItems(items);
      if (items === void 0) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "No data got returned. Always return an Array of items!"
        );
      }
      if (!Array.isArray(items)) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "Always an Array of items has to be returned!"
        );
      }
      for (const item of items) {
        if (item.json === void 0) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            'All returned items have to contain a property named "json"!'
          );
        }
        if (typeof item.json !== "object") {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "The json-property has to be an object!");
        }
        item.json = cleanupData(item.json);
        if (item.binary !== void 0) {
          if (Array.isArray(item.binary) || typeof item.binary !== "object") {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "The binary-property has to be an object!"
            );
          }
        }
      }
    } catch (error) {
      if (this.continueOnFail()) {
        items = [{ json: { error: error.message } }];
      } else {
        const stackLines = error.stack.split("\n");
        if (stackLines.length > 0) {
          stackLines.shift();
          const lineParts = stackLines.find((line) => line.includes("Function")).split(":");
          if (lineParts.length > 2) {
            const lineNumber = lineParts.splice(-2, 1);
            if (!isNaN(lineNumber)) {
              error.message = `${error.message} [Line ${lineNumber}]`;
            }
          }
        }
        throw error;
      }
    }
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Function
});
//# sourceMappingURL=Function.node.js.map