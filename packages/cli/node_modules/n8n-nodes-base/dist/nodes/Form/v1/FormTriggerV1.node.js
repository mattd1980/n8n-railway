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
var FormTriggerV1_node_exports = {};
__export(FormTriggerV1_node_exports, {
  FormTriggerV1: () => FormTriggerV1
});
module.exports = __toCommonJS(FormTriggerV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_common = require("../common.descriptions");
var import_utils = require("../utils");
const descriptionV1 = {
  displayName: "n8n Form Trigger",
  name: "formTrigger",
  icon: "file:form.svg",
  group: ["trigger"],
  version: 1,
  description: "Generate webforms in n8n and pass their responses to the workflow",
  defaults: {
    name: "n8n Form Trigger"
  },
  inputs: [],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  webhooks: [
    {
      name: "setup",
      httpMethod: "GET",
      responseMode: "onReceived",
      isFullPath: true,
      path: `={{$parameter["path"]}}/${import_n8n_workflow.FORM_TRIGGER_PATH_IDENTIFIER}`,
      ndvHideUrl: true
    },
    {
      name: "default",
      httpMethod: "POST",
      responseMode: '={{$parameter["responseMode"]}}',
      responseData: '={{$parameter["responseMode"] === "lastNode" ? "noData" : undefined}}',
      isFullPath: true,
      path: `={{$parameter["path"]}}/${import_n8n_workflow.FORM_TRIGGER_PATH_IDENTIFIER}`,
      ndvHideMethod: true
    }
  ],
  eventTriggerDescription: "Waiting for you to submit the form",
  activationMessage: "You can now make calls to your production Form URL.",
  triggerPanel: import_common.formTriggerPanel,
  properties: [
    import_common.webhookPath,
    import_common.formTitle,
    import_common.formDescription,
    import_common.formFields,
    import_common.formRespondMode,
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      displayOptions: {
        hide: {
          responseMode: ["responseNode"]
        }
      },
      options: [
        {
          displayName: "Form Submitted Text",
          name: "formSubmittedText",
          description: "The text displayed to users after they filled the form",
          type: "string",
          default: "Your response has been recorded"
        }
      ]
    }
  ]
};
class FormTriggerV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      ...descriptionV1
    };
  }
  async webhook() {
    return await (0, import_utils.formWebhook)(this);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormTriggerV1
});
//# sourceMappingURL=FormTriggerV1.node.js.map