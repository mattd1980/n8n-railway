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
var AiTransform_node_exports = {};
__export(AiTransform_node_exports, {
  AiTransform: () => AiTransform
});
module.exports = __toCommonJS(AiTransform_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_JavaScriptSandbox = require("../Code/JavaScriptSandbox");
var import_Sandbox = require("../Code/Sandbox");
var import_utils = require("../Code/utils");
const { CODE_ENABLE_STDOUT } = process.env;
class AiTransform {
  constructor() {
    this.description = {
      displayName: "AI Transform",
      name: "aiTransform",
      icon: "file:aitransform.svg",
      group: ["transform"],
      version: 1,
      description: "Modify data based on instructions written in plain english",
      defaults: {
        name: "AI Transform"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      parameterPane: "wide",
      hints: [
        {
          message: "This node doesn't have access to the contents of binary files. To use those contents here, use the 'Extract from File' node first.",
          displayCondition: "={{ $input.all().some(i => i.binary) }}",
          location: "outputPane"
        }
      ],
      properties: [
        {
          displayName: "Instructions",
          name: "instructions",
          type: "button",
          default: "",
          description: "Provide instructions on how you want to transform the data, then click 'Generate code'. Use dot notation to refer to nested fields (e.g. address.street).",
          placeholder: "Example: Merge 'firstname' and 'lastname' into a field 'details.name' and sort by 'email'",
          typeOptions: {
            buttonConfig: {
              label: "Generate code",
              hasInputField: true,
              inputFieldMaxLength: 500,
              action: {
                type: "askAiCodeGeneration",
                target: import_n8n_workflow.AI_TRANSFORM_JS_CODE
              }
            }
          }
        },
        {
          displayName: "Code Generated For Prompt",
          name: import_n8n_workflow.AI_TRANSFORM_CODE_GENERATED_FOR_PROMPT,
          type: "hidden",
          default: ""
        },
        {
          displayName: "Generated JavaScript",
          name: import_n8n_workflow.AI_TRANSFORM_JS_CODE,
          type: "string",
          typeOptions: {
            editor: "jsEditor",
            editorIsReadOnly: true
          },
          default: "",
          hint: "Read-only. To edit this code, adjust the instructions or copy and paste it into a Code node.",
          noDataExpression: true
        }
      ]
    };
  }
  async execute() {
    const workflowMode = this.getMode();
    const node = this.getNode();
    const codeParameterName = "jsCode";
    const getSandbox = (index = 0) => {
      let code = "";
      try {
        code = this.getNodeParameter(codeParameterName, index);
        if (!code) {
          const instructions = this.getNodeParameter("instructions", index);
          if (!instructions) {
            throw new import_n8n_workflow.NodeOperationError(node, "Missing instructions to generate code", {
              description: "Enter your prompt in the 'Instructions' parameter and click 'Generate code'"
            });
          }
          throw new import_n8n_workflow.NodeOperationError(node, "Missing code for data transformation", {
            description: "Click the 'Generate code' button to create the code"
          });
        }
      } catch (error) {
        if (error instanceof import_n8n_workflow.NodeOperationError) throw error;
        throw new import_n8n_workflow.NodeOperationError(node, error);
      }
      const context = import_Sandbox.getSandboxContext.call(this, index);
      context.items = context.$input.all();
      const Sandbox = import_JavaScriptSandbox.JavaScriptSandbox;
      const sandbox2 = new Sandbox(context, code, this.helpers);
      sandbox2.on(
        "output",
        workflowMode === "manual" ? this.sendMessageToUI.bind(this) : CODE_ENABLE_STDOUT === "true" ? (...args) => console.log(`[Workflow "${this.getWorkflow().id}"][Node "${node.name}"]`, ...args) : () => {
        }
      );
      return sandbox2;
    };
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
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AiTransform
});
//# sourceMappingURL=AiTransform.node.js.map