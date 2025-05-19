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
var JavaScriptSandbox_exports = {};
__export(JavaScriptSandbox_exports, {
  JavaScriptSandbox: () => JavaScriptSandbox,
  vmResolver: () => vmResolver
});
module.exports = __toCommonJS(JavaScriptSandbox_exports);
var import_vm2 = require("@n8n/vm2");
var import_ExecutionError = require("./ExecutionError");
var import_JsCodeValidator = require("./JsCodeValidator");
var import_Sandbox = require("./Sandbox");
var import_ValidationError = require("./ValidationError");
const { NODE_FUNCTION_ALLOW_BUILTIN: builtIn, NODE_FUNCTION_ALLOW_EXTERNAL: external } = process.env;
const vmResolver = (0, import_vm2.makeResolverFromLegacyOptions)({
  external: external ? {
    modules: external.split(","),
    transitive: false
  } : false,
  builtin: builtIn?.split(",") ?? []
});
class JavaScriptSandbox extends import_Sandbox.Sandbox {
  constructor(context, jsCode, helpers, options) {
    super(
      {
        object: {
          singular: "object",
          plural: "objects"
        }
      },
      helpers
    );
    this.jsCode = jsCode;
    this.vm = new import_vm2.NodeVM({
      console: "redirect",
      sandbox: context,
      require: options?.resolver ?? vmResolver,
      wasm: false
    });
    this.vm.on("console.log", (...args) => this.emit("output", ...args));
  }
  async runCode() {
    const script = `module.exports = async function() {${this.jsCode}
}()`;
    try {
      const executionResult = await this.vm.run(script, __dirname);
      return executionResult;
    } catch (error) {
      throw new import_ExecutionError.ExecutionError(error);
    }
  }
  async runCodeAllItems(options) {
    const script = `module.exports = async function() {${this.jsCode}
}()`;
    let executionResult;
    try {
      executionResult = await this.vm.run(script, __dirname);
    } catch (error) {
      (0, import_JsCodeValidator.mapItemsNotDefinedErrorIfNeededForRunForAll)(this.jsCode, error);
      throw new import_ExecutionError.ExecutionError(error);
    }
    if (executionResult === null) return [];
    if (options?.multiOutput === true) {
      if (!Array.isArray(executionResult) || executionResult.some((item) => !Array.isArray(item))) {
        throw new import_ValidationError.ValidationError({
          message: "The code doesn't return an array of arrays",
          description: "Please return an array of arrays. One array for the different outputs and one for the different items that get returned."
        });
      }
      return executionResult.map((data) => {
        return this.validateRunCodeAllItems(data);
      });
    }
    return this.validateRunCodeAllItems(
      executionResult
    );
  }
  async runCodeEachItem(itemIndex) {
    const script = `module.exports = async function() {${this.jsCode}
}()`;
    (0, import_JsCodeValidator.validateNoDisallowedMethodsInRunForEach)(this.jsCode, itemIndex);
    let executionResult;
    try {
      executionResult = await this.vm.run(script, __dirname);
    } catch (error) {
      (0, import_JsCodeValidator.mapItemNotDefinedErrorIfNeededForRunForEach)(this.jsCode, error);
      throw new import_ExecutionError.ExecutionError(error, itemIndex);
    }
    if (executionResult === null) return void 0;
    return this.validateRunCodeEachItem(executionResult, itemIndex);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JavaScriptSandbox,
  vmResolver
});
//# sourceMappingURL=JavaScriptSandbox.js.map