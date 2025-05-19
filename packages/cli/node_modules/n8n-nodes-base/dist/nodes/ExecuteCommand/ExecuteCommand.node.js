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
var ExecuteCommand_node_exports = {};
__export(ExecuteCommand_node_exports, {
  ExecuteCommand: () => ExecuteCommand
});
module.exports = __toCommonJS(ExecuteCommand_node_exports);
var import_child_process = require("child_process");
var import_n8n_workflow = require("n8n-workflow");
async function execPromise(command) {
  const returnData = {
    error: void 0,
    exitCode: 0,
    stderr: "",
    stdout: ""
  };
  return await new Promise((resolve, _reject) => {
    (0, import_child_process.exec)(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
      returnData.stdout = stdout.trim();
      returnData.stderr = stderr.trim();
      if (error) {
        returnData.error = error;
      }
      resolve(returnData);
    }).on("exit", (code) => {
      returnData.exitCode = code || 0;
    });
  });
}
class ExecuteCommand {
  constructor() {
    this.description = {
      displayName: "Execute Command",
      name: "executeCommand",
      icon: "fa:terminal",
      iconColor: "crimson",
      group: ["transform"],
      version: 1,
      description: "Executes a command on the host",
      defaults: {
        name: "Execute Command",
        color: "#886644"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Execute Once",
          name: "executeOnce",
          type: "boolean",
          default: true,
          description: "Whether to execute only once instead of once for each entry"
        },
        {
          displayName: "Command",
          name: "command",
          typeOptions: {
            rows: 5
          },
          type: "string",
          default: "",
          placeholder: 'echo "test"',
          description: "The command to execute",
          required: true
        }
      ]
    };
  }
  async execute() {
    let items = this.getInputData();
    let command;
    const executeOnce = this.getNodeParameter("executeOnce", 0);
    if (executeOnce) {
      items = [items[0]];
    }
    const returnItems = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        command = this.getNodeParameter("command", itemIndex);
        const { error, exitCode, stdout, stderr } = await execPromise(command);
        if (error !== void 0) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error.message, { itemIndex });
        }
        returnItems.push({
          json: {
            exitCode,
            stderr,
            stdout
          },
          pairedItem: {
            item: itemIndex
          }
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnItems.push({
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
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExecuteCommand
});
//# sourceMappingURL=ExecuteCommand.node.js.map