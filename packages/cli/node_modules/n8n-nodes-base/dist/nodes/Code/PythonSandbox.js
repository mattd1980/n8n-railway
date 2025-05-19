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
var PythonSandbox_exports = {};
__export(PythonSandbox_exports, {
  PythonSandbox: () => PythonSandbox
});
module.exports = __toCommonJS(PythonSandbox_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_Pyodide = require("./Pyodide");
var import_Sandbox = require("./Sandbox");
const envAccessBlocked = process.env.N8N_BLOCK_ENV_ACCESS_IN_NODE === "true";
class PythonSandbox extends import_Sandbox.Sandbox {
  constructor(context, pythonCode, helpers) {
    super(
      {
        object: {
          singular: "dictionary",
          plural: "dictionaries"
        }
      },
      helpers
    );
    this.pythonCode = pythonCode;
    this.context = Object.keys(context).reduce((acc, key) => {
      acc[key.startsWith("$") ? key.replace(/^\$/, "_") : key] = context[key];
      return acc;
    }, {});
  }
  async runCode() {
    return await this.runCodeInPython();
  }
  async runCodeAllItems() {
    const executionResult = await this.runCodeInPython();
    return this.validateRunCodeAllItems(executionResult);
  }
  async runCodeEachItem(itemIndex) {
    const executionResult = await this.runCodeInPython();
    return this.validateRunCodeEachItem(executionResult, itemIndex);
  }
  async runCodeInPython() {
    const packageCacheDir = this.helpers.getStoragePath();
    const pyodide = await (0, import_Pyodide.LoadPyodide)(packageCacheDir);
    let executionResult;
    try {
      await pyodide.runPythonAsync("jsproxy_typedict[0] = type(Object.new().as_object_map())");
      await pyodide.loadPackagesFromImports(this.pythonCode);
      const dict = pyodide.globals.get("dict");
      const globalsDict = dict();
      for (const key of Object.keys(this.context)) {
        if (key === "_env" && envAccessBlocked || key === "_node") continue;
        const value = this.context[key];
        globalsDict.set(key, value);
      }
      pyodide.setStdout({ batched: (str) => this.emit("output", str) });
      const runCode = `
async def __main():
${this.pythonCode.split("\n").map((line) => "  " + line).join("\n")}
await __main()`;
      executionResult = await pyodide.runPythonAsync(runCode, { globals: globalsDict });
      globalsDict.destroy();
    } catch (error) {
      throw this.getPrettyError(error);
    }
    if (executionResult?.toJs) {
      return executionResult.toJs({
        dict_converter: Object.fromEntries,
        create_proxies: false
      });
    }
    return executionResult;
  }
  getPrettyError(error) {
    const errorTypeIndex = error.message.indexOf(error.type);
    if (errorTypeIndex !== -1) {
      return new import_n8n_workflow.ApplicationError(error.message.slice(errorTypeIndex), {
        level: ["TypeError", "AttributeError"].includes(error.type) ? "warning" : "error"
      });
    }
    return error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PythonSandbox
});
//# sourceMappingURL=PythonSandbox.js.map