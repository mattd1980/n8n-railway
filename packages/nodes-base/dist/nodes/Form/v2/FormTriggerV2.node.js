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
var FormTriggerV2_node_exports = {};
__export(FormTriggerV2_node_exports, {
  FormTriggerV2: () => FormTriggerV2
});
module.exports = __toCommonJS(FormTriggerV2_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_common = require("../common.descriptions");
var import_cssVariables = require("../cssVariables");
var import_interfaces = require("../interfaces");
var import_utils = require("../utils");
const useWorkflowTimezone = {
  displayName: "Use Workflow Timezone",
  name: "useWorkflowTimezone",
  type: "boolean",
  default: false,
  description: "Whether to use the workflow timezone set in node's settings rather than UTC"
};
const descriptionV2 = {
  displayName: "n8n Form Trigger",
  name: "formTrigger",
  icon: "file:form.svg",
  group: ["trigger"],
  version: [2, 2.1, 2.2],
  description: "Generate webforms in n8n and pass their responses to the workflow",
  defaults: {
    name: "On form submission"
  },
  inputs: [],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  webhooks: [
    {
      name: "setup",
      httpMethod: "GET",
      responseMode: "onReceived",
      isFullPath: true,
      path: '={{ $parameter["path"] || $parameter["options"]?.path || $webhookId }}',
      ndvHideUrl: true,
      nodeType: "form"
    },
    {
      name: "default",
      httpMethod: "POST",
      responseMode: '={{$parameter["responseMode"]}}',
      responseData: '={{$parameter["responseMode"] === "lastNode" ? "noData" : undefined}}',
      isFullPath: true,
      path: '={{ $parameter["path"] || $parameter["options"]?.path || $webhookId }}',
      ndvHideMethod: true,
      nodeType: "form"
    }
  ],
  eventTriggerDescription: "Waiting for you to submit the form",
  activationMessage: "You can now make calls to your production Form URL.",
  triggerPanel: import_common.formTriggerPanel,
  credentials: [
    {
      // eslint-disable-next-line n8n-nodes-base/node-class-description-credentials-name-unsuffixed
      name: "httpBasicAuth",
      required: true,
      displayOptions: {
        show: {
          [import_interfaces.FORM_TRIGGER_AUTHENTICATION_PROPERTY]: ["basicAuth"]
        }
      }
    }
  ],
  properties: [
    {
      displayName: "Authentication",
      name: import_interfaces.FORM_TRIGGER_AUTHENTICATION_PROPERTY,
      type: "options",
      options: [
        {
          name: "Basic Auth",
          value: "basicAuth"
        },
        {
          name: "None",
          value: "none"
        }
      ],
      default: "none"
    },
    { ...import_common.webhookPath, displayOptions: { show: { "@version": [{ _cnd: { lte: 2.1 } }] } } },
    import_common.formTitle,
    import_common.formDescription,
    import_common.formFields,
    { ...import_common.formRespondMode, displayOptions: { show: { "@version": [{ _cnd: { lte: 2.1 } }] } } },
    {
      ...import_common.formRespondMode,
      options: import_common.formRespondMode.options?.filter(
        (option) => option.value !== "responseNode"
      ),
      displayOptions: { show: { "@version": [{ _cnd: { gte: 2.2 } }] } }
    },
    {
      displayName: "In the 'Respond to Webhook' node, select 'Respond With JSON' and set the <strong>formSubmittedText</strong> key to display a custom response in the form, or the <strong>redirectURL</strong> key to redirect users to a URL",
      name: "formNotice",
      type: "notice",
      displayOptions: {
        show: { responseMode: ["responseNode"] }
      },
      default: ""
    },
    // notice would be shown if no Form node was connected to trigger
    {
      displayName: "Build multi-step forms by adding a form page later in your workflow",
      name: import_n8n_workflow.ADD_FORM_NOTICE,
      type: "notice",
      default: ""
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        import_common.appendAttributionToForm,
        {
          displayName: "Button Label",
          description: "The label of the submit button in the form",
          name: "buttonLabel",
          type: "string",
          default: "Submit"
        },
        {
          ...import_common.webhookPath,
          required: false,
          displayOptions: { show: { "@version": [{ _cnd: { gte: 2.2 } }] } }
        },
        {
          ...import_common.respondWithOptions,
          displayOptions: {
            hide: {
              "/responseMode": ["responseNode"]
            }
          }
        },
        {
          displayName: "Ignore Bots",
          name: "ignoreBots",
          type: "boolean",
          default: false,
          description: "Whether to ignore requests from bots like link previewers and web crawlers"
        },
        {
          ...useWorkflowTimezone,
          default: false,
          description: "Whether to use the workflow timezone in 'submittedAt' field or UTC",
          displayOptions: {
            show: {
              "@version": [2]
            }
          }
        },
        {
          ...useWorkflowTimezone,
          default: true,
          description: "Whether to use the workflow timezone in 'submittedAt' field or UTC",
          displayOptions: {
            show: {
              "@version": [{ _cnd: { gt: 2 } }]
            }
          }
        },
        {
          displayName: "Custom Form Styling",
          name: "customCss",
          type: "string",
          typeOptions: {
            rows: 10,
            editor: "cssEditor"
          },
          displayOptions: {
            show: {
              "@version": [{ _cnd: { gt: 2 } }]
            }
          },
          default: import_cssVariables.cssVariables.trim(),
          description: "Override default styling of the public form interface with CSS"
        }
      ]
    }
  ]
};
class FormTriggerV2 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      ...descriptionV2
    };
  }
  async webhook() {
    return await (0, import_utils.formWebhook)(this);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormTriggerV2
});
//# sourceMappingURL=FormTriggerV2.node.js.map