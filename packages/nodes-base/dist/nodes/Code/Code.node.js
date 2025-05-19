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
var Code_node_exports = {};
__export(Code_node_exports, {
  Code: () => Code
});
module.exports = __toCommonJS(Code_node_exports);
var import_config = require("@n8n/config");
var import_di = require("@n8n/di");
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_JavascriptCodeDescription = require("./descriptions/JavascriptCodeDescription");
var import_PythonCodeDescription = require("./descriptions/PythonCodeDescription");
var import_JavaScriptSandbox = require("./JavaScriptSandbox");
var import_JsTaskRunnerSandbox = require("./JsTaskRunnerSandbox");
var import_PythonSandbox = require("./PythonSandbox");
var import_Sandbox = require("./Sandbox");
var import_utils = require("./utils");
const { CODE_ENABLE_STDOUT } = process.env;
class Code {
  constructor() {
    this.description = {
      displayName: "Code",
      name: "code",
      icon: "file:code.svg",
      group: ["transform"],
      version: [1, 2],
      defaultVersion: 2,
      description: "Run custom JavaScript or Python code",
      defaults: {
        name: "Code"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      parameterPane: "wide",
      properties: [
        {
          displayName: "Mode",
          name: "mode",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Run Once for All Items",
              value: "runOnceForAllItems",
              description: "Run this code only once, no matter how many input items there are"
            },
            {
              name: "Run Once for Each Item",
              value: "runOnceForEachItem",
              description: "Run this code as many times as there are input items"
            }
          ],
          default: "runOnceForAllItems"
        },
        {
          displayName: "Language",
          name: "language",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              "@version": [2]
            }
          },
          options: [
            {
              name: "JavaScript",
              value: "javaScript"
            },
            {
              name: "Python (Beta)",
              value: "python"
            }
          ],
          default: "javaScript"
        },
        {
          displayName: "Language",
          name: "language",
          type: "hidden",
          displayOptions: {
            show: {
              "@version": [1]
            }
          },
          default: "javaScript"
        },
        ...import_JavascriptCodeDescription.javascriptCodeDescription,
        ...import_PythonCodeDescription.pythonCodeDescription
      ]
    };
  }
  async execute() {
    const runnersConfig = import_di.Container.get(import_config.TaskRunnersConfig);
    const nodeMode = this.getNodeParameter("mode", 0);
    const workflowMode = this.getMode();
    const node = this.getNode();
    const language = node.typeVersion === 2 ? this.getNodeParameter("language", 0) : "javaScript";
    const codeParameterName = language === "python" ? "pythonCode" : "jsCode";
    if (runnersConfig.enabled && language === "javaScript") {
      const code = this.getNodeParameter(codeParameterName, 0);
      const sandbox = new import_JsTaskRunnerSandbox.JsTaskRunnerSandbox(code, nodeMode, workflowMode, this);
      const numInputItems = this.getInputData().length;
      return nodeMode === "runOnceForAllItems" ? [await sandbox.runCodeAllItems()] : [await sandbox.runCodeForEachItem(numInputItems)];
    }
    const getSandbox = (index = 0) => {
      const code = this.getNodeParameter(codeParameterName, index);
      const context = import_Sandbox.getSandboxContext.call(this, index);
      if (nodeMode === "runOnceForAllItems") {
        context.items = context.$input.all();
      } else {
        context.item = context.$input.item;
      }
      const Sandbox = language === "python" ? import_PythonSandbox.PythonSandbox : import_JavaScriptSandbox.JavaScriptSandbox;
      const sandbox = new Sandbox(context, code, this.helpers);
      sandbox.on(
        "output",
        workflowMode === "manual" ? this.sendMessageToUI.bind(this) : CODE_ENABLE_STDOUT === "true" ? (...args) => console.log(`[Workflow "${this.getWorkflow().id}"][Node "${node.name}"]`, ...args) : () => {
        }
      );
      return sandbox;
    };
    const inputDataItems = this.getInputData();
    if (nodeMode === "runOnceForAllItems") {
      const sandbox = getSandbox();
      let items;
      try {
        items = await sandbox.runCodeAllItems();
      } catch (error) {
        if (!this.continueOnFail()) {
          (0, import_set.default)(error, "node", node);
          throw error;
        }
        items = [{ json: { error: error.message } }];
      }
      for (const item of items) {
        (0, import_utils.standardizeOutput)(item.json);
      }
      (0, import_utils.addPostExecutionWarning)(this, items, inputDataItems?.length);
      return [items];
    }
    const returnData = [];
    for (let index = 0; index < inputDataItems.length; index++) {
      const sandbox = getSandbox(index);
      let result;
      try {
        result = await sandbox.runCodeEachItem(index);
      } catch (error) {
        if (!this.continueOnFail()) {
          (0, import_set.default)(error, "node", node);
          throw error;
        }
        returnData.push({
          json: { error: error.message },
          pairedItem: {
            item: index
          }
        });
      }
      if (result) {
        returnData.push({
          json: (0, import_utils.standardizeOutput)(result.json),
          pairedItem: { item: index },
          ...result.binary && { binary: result.binary }
        });
      }
    }
    (0, import_utils.addPostExecutionWarning)(this, returnData, inputDataItems?.length);
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Code
});
//# sourceMappingURL=Code.node.js.map