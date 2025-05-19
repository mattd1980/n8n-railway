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
var Form_node_exports = {};
__export(Form_node_exports, {
  Form: () => Form,
  formFieldsProperties: () => formFieldsProperties
});
module.exports = __toCommonJS(Form_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_cssVariables = require("./cssVariables");
var import_formCompletionUtils = require("./formCompletionUtils");
var import_formNodeUtils = require("./formNodeUtils");
var import_configureWaitTillDate = require("../../utils/sendAndWait/configureWaitTillDate.util");
var import_descriptions = require("../../utils/sendAndWait/descriptions");
var import_common = require("../Form/common.descriptions");
var import_utils = require("../Form/utils");
const waitTimeProperties = [
  {
    displayName: "Limit Wait Time",
    name: "limitWaitTime",
    type: "boolean",
    default: false,
    description: "Whether to limit the time this node should wait for a user response before execution resumes"
  },
  ...(0, import_n8n_workflow.updateDisplayOptions)(
    {
      show: {
        limitWaitTime: [true]
      }
    },
    import_descriptions.limitWaitTimeProperties
  )
];
const formFieldsProperties = [
  {
    displayName: "Define Form",
    name: "defineForm",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Using Fields Below",
        value: "fields"
      },
      {
        name: "Using JSON",
        value: "json"
      }
    ],
    default: "fields"
  },
  {
    displayName: "Form Fields",
    name: "jsonOutput",
    type: "json",
    typeOptions: {
      rows: 5
    },
    default: '[\n   {\n      "fieldLabel":"Name",\n      "placeholder":"enter you name",\n      "requiredField":true\n   },\n   {\n      "fieldLabel":"Age",\n      "fieldType":"number",\n      "placeholder":"enter your age"\n   },\n   {\n      "fieldLabel":"Email",\n      "fieldType":"email",\n      "requiredField":true\n   }\n]',
    validateType: "form-fields",
    ignoreValidationDuringExecution: true,
    hint: '<a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form/" target="_blank">See docs</a> for field syntax',
    displayOptions: {
      show: {
        defineForm: ["json"]
      }
    }
  },
  { ...import_common.formFields, displayOptions: { show: { defineForm: ["fields"] } } }
];
const pageProperties = (0, import_n8n_workflow.updateDisplayOptions)(
  {
    show: {
      operation: ["page"]
    }
  },
  [
    ...formFieldsProperties,
    ...waitTimeProperties,
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        { ...import_common.formTitle, required: false },
        import_common.formDescription,
        {
          displayName: "Button Label",
          name: "buttonLabel",
          type: "string",
          default: "Submit"
        },
        {
          displayName: "Custom Form Styling",
          name: "customCss",
          type: "string",
          typeOptions: {
            rows: 10,
            editor: "cssEditor"
          },
          default: import_cssVariables.cssVariables.trim(),
          description: "Override default styling of the public form interface with CSS"
        }
      ]
    }
  ]
);
const completionProperties = (0, import_n8n_workflow.updateDisplayOptions)(
  {
    show: {
      operation: ["completion"]
    }
  },
  [
    {
      // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
      displayName: "On n8n Form Submission",
      name: "respondWith",
      type: "options",
      default: "text",
      options: [
        {
          name: "Show Completion Screen",
          value: "text",
          description: "Show a response text to the user"
        },
        {
          name: "Redirect to URL",
          value: "redirect",
          description: "Redirect the user to a URL"
        },
        {
          name: "Show Text",
          value: "showText",
          description: "Display simple text or HTML"
        },
        {
          name: "Return Binary File",
          value: "returnBinary",
          description: "Return incoming binary file"
        }
      ]
    },
    {
      displayName: "URL",
      name: "redirectUrl",
      validateType: "url",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: {
          respondWith: ["redirect"]
        }
      }
    },
    {
      displayName: "Completion Title",
      name: "completionTitle",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: {
          respondWith: ["text", "returnBinary"]
        }
      }
    },
    {
      displayName: "Completion Message",
      name: "completionMessage",
      type: "string",
      default: "",
      typeOptions: {
        rows: 2
      },
      displayOptions: {
        show: {
          respondWith: ["text", "returnBinary"]
        }
      }
    },
    {
      displayName: "Text",
      name: "responseText",
      type: "string",
      displayOptions: {
        show: {
          respondWith: ["showText"]
        }
      },
      typeOptions: {
        rows: 2
      },
      default: "",
      placeholder: "e.g. Thanks for filling the form",
      description: "The text to display on the page. Use HTML to show a customized web page."
    },
    {
      displayName: "Input Data Field Name",
      name: "inputDataFieldName",
      type: "string",
      displayOptions: {
        show: {
          respondWith: ["returnBinary"]
        }
      },
      default: "data",
      placeholder: "e.g. data",
      description: "Find the name of input field containing the binary data to return in the Input panel on the left, in the Binary tab",
      hint: "The name of the input field containing the binary file data to be returned"
    },
    ...waitTimeProperties,
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        { ...import_common.formTitle, required: false, displayName: "Completion Page Title" },
        {
          displayName: "Custom Form Styling",
          name: "customCss",
          type: "string",
          typeOptions: {
            rows: 10,
            editor: "cssEditor"
          },
          default: import_cssVariables.cssVariables.trim(),
          description: "Override default styling of the public form interface with CSS"
        }
      ],
      displayOptions: {
        show: {
          respondWith: ["text", "returnBinary"]
        }
      }
    }
  ]
);
class Form extends import_n8n_workflow.Node {
  constructor() {
    super(...arguments);
    this.nodeInputData = [];
    this.description = {
      displayName: "n8n Form",
      name: "form",
      icon: "file:form.svg",
      group: ["input"],
      version: 1,
      description: "Generate webforms in n8n and pass their responses to the workflow",
      defaults: {
        name: "Form"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      webhooks: [
        {
          name: "default",
          httpMethod: "GET",
          responseMode: "onReceived",
          path: "",
          restartWebhook: true,
          isFullPath: true,
          nodeType: "form"
        },
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "responseNode",
          path: "",
          restartWebhook: true,
          isFullPath: true,
          nodeType: "form"
        }
      ],
      properties: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
          displayName: "An n8n Form Trigger node must be set up before this node",
          name: "triggerNotice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Page Type",
          name: "operation",
          type: "options",
          default: "page",
          noDataExpression: true,
          options: [
            {
              name: "Next Form Page",
              value: "page"
            },
            {
              name: "Form Ending",
              value: "completion"
            }
          ]
        },
        ...pageProperties,
        ...completionProperties
      ]
    };
  }
  async webhook(context) {
    const res = context.getResponseObject();
    const operation = context.getNodeParameter("operation", "");
    const parentNodes = context.getParentNodes(context.getNode().name);
    const trigger = parentNodes.find(
      (node) => node.type === "n8n-nodes-base.formTrigger"
    );
    const mode = context.evaluateExpression(`{{ $('${trigger?.name}').first().json.formMode }}`);
    const defineForm = context.getNodeParameter("defineForm", false);
    let fields = [];
    if (defineForm === "json") {
      try {
        const jsonOutput = context.getNodeParameter("jsonOutput", "", {
          rawExpressions: true
        });
        fields = (0, import_n8n_workflow.tryToParseJsonToFormFields)((0, import_utils.resolveRawData)(context, jsonOutput));
      } catch (error) {
        throw new import_n8n_workflow.NodeOperationError(context.getNode(), error.message, {
          description: error.message,
          type: mode === "test" ? "manual-form-test" : void 0
        });
      }
    } else {
      fields = context.getNodeParameter("formFields.values", []);
    }
    const method = context.getRequestObject().method;
    if (operation === "completion" && method === "GET") {
      return await (0, import_formCompletionUtils.renderFormCompletion)(context, res, trigger);
    }
    if (operation === "completion" && method === "POST") {
      return {
        workflowData: [context.evaluateExpression("{{ $input.all() }}")]
      };
    }
    if (method === "GET") {
      return await (0, import_formNodeUtils.renderFormNode)(context, res, trigger, fields, mode);
    }
    let useWorkflowTimezone = context.evaluateExpression(
      `{{ $('${trigger?.name}').params.options?.useWorkflowTimezone }}`
    );
    if (useWorkflowTimezone === void 0 && trigger?.typeVersion > 2) {
      useWorkflowTimezone = true;
    }
    const returnItem = await (0, import_utils.prepareFormReturnItem)(context, fields, mode, useWorkflowTimezone);
    return {
      webhookResponse: { status: 200 },
      workflowData: [[returnItem]]
    };
  }
  async execute(context) {
    const operation = context.getNodeParameter("operation", 0);
    if (operation === "completion") {
      this.nodeInputData = context.getInputData();
    }
    const parentNodes = context.getParentNodes(context.getNode().name);
    const hasFormTrigger = parentNodes.some((node) => node.type === import_n8n_workflow.FORM_TRIGGER_NODE_TYPE);
    if (!hasFormTrigger) {
      throw new import_n8n_workflow.NodeOperationError(
        context.getNode(),
        "Form Trigger node must be set before this node"
      );
    }
    const childNodes = context.getChildNodes(context.getNode().name);
    const hasNextPage = childNodes.some((node) => node.type === import_n8n_workflow.FORM_NODE_TYPE);
    if (operation === "completion" && hasNextPage) {
      throw new import_n8n_workflow.NodeOperationError(
        context.getNode(),
        "Completion has to be the last Form node in the workflow"
      );
    }
    const waitTill = (0, import_configureWaitTillDate.configureWaitTillDate)(context, "root");
    await context.putExecutionToWait(waitTill);
    context.sendResponse({
      headers: {
        location: context.evaluateExpression("{{ $execution.resumeFormUrl }}", 0)
      },
      statusCode: 307
    });
    return [context.getInputData()];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Form,
  formFieldsProperties
});
//# sourceMappingURL=Form.node.js.map