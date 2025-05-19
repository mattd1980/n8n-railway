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
var utils_exports = {};
__export(utils_exports, {
  createButton: () => createButton,
  createEmail: () => createEmail,
  getSendAndWaitConfig: () => getSendAndWaitConfig,
  getSendAndWaitProperties: () => getSendAndWaitProperties,
  sendAndWaitWebhook: () => sendAndWaitWebhook
});
module.exports = __toCommonJS(utils_exports);
var import_isbot = __toESM(require("isbot"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_email_templates = require("./email-templates");
var import_Form = require("../../nodes/Form/Form.node");
var import_utils = require("../../nodes/Form/utils");
var import_utilities = require("../utilities");
const INPUT_FIELD_IDENTIFIER = "field-0";
const limitWaitTimeOption = {
  displayName: "Limit Wait Time",
  name: "limitWaitTime",
  type: "fixedCollection",
  description: "Whether the workflow will automatically resume execution after the specified limit type",
  default: { values: { limitType: "afterTimeInterval", resumeAmount: 45, resumeUnit: "minutes" } },
  options: [
    {
      displayName: "Values",
      name: "values",
      values: import_descriptions.limitWaitTimeProperties
    }
  ]
};
const appendAttributionOption = {
  displayName: "Append n8n Attribution",
  name: "appendAttribution",
  type: "boolean",
  default: true,
  description: 'Whether to include the phrase "This message was sent automatically with n8n" to the end of the message'
};
function getSendAndWaitProperties(targetProperties, resource = "message", additionalProperties = [], options) {
  const buttonStyle = {
    displayName: "Button Style",
    name: "buttonStyle",
    type: "options",
    default: "primary",
    options: [
      {
        name: "Primary",
        value: "primary"
      },
      {
        name: "Secondary",
        value: "secondary"
      }
    ]
  };
  const approvalOptionsValues = [
    {
      displayName: "Type of Approval",
      name: "approvalType",
      type: "options",
      placeholder: "Add option",
      default: "single",
      options: [
        {
          name: "Approve Only",
          value: "single"
        },
        {
          name: "Approve and Disapprove",
          value: "double"
        }
      ]
    },
    {
      displayName: "Approve Button Label",
      name: "approveLabel",
      type: "string",
      default: options?.defaultApproveLabel || "Approve",
      displayOptions: {
        show: {
          approvalType: ["single", "double"]
        }
      }
    },
    ...[
      options?.noButtonStyle ? {} : {
        ...buttonStyle,
        displayName: "Approve Button Style",
        name: "buttonApprovalStyle",
        displayOptions: {
          show: {
            approvalType: ["single", "double"]
          }
        }
      }
    ],
    {
      displayName: "Disapprove Button Label",
      name: "disapproveLabel",
      type: "string",
      default: options?.defaultDisapproveLabel || "Decline",
      displayOptions: {
        show: {
          approvalType: ["double"]
        }
      }
    },
    ...[
      options?.noButtonStyle ? {} : {
        ...buttonStyle,
        displayName: "Disapprove Button Style",
        name: "buttonDisapprovalStyle",
        default: "secondary",
        displayOptions: {
          show: {
            approvalType: ["double"]
          }
        }
      }
    ]
  ].filter((p) => Object.keys(p).length);
  const sendAndWait = [
    ...targetProperties,
    {
      displayName: "Subject",
      name: "subject",
      type: "string",
      default: "",
      required: true,
      placeholder: "e.g. Approval required"
    },
    {
      displayName: "Message",
      name: "message",
      type: "string",
      default: "",
      required: true,
      typeOptions: {
        rows: 4
      }
    },
    {
      displayName: "Response Type",
      name: "responseType",
      type: "options",
      default: "approval",
      options: [
        {
          name: "Approval",
          value: "approval",
          description: "User can approve/disapprove from within the message"
        },
        {
          name: "Free Text",
          value: "freeText",
          description: "User can submit a response via a form"
        },
        {
          name: "Custom Form",
          value: "customForm",
          description: "User can submit a response via a custom form"
        }
      ]
    },
    ...(0, import_n8n_workflow.updateDisplayOptions)(
      {
        show: {
          responseType: ["customForm"]
        }
      },
      import_Form.formFieldsProperties
    ),
    {
      displayName: "Approval Options",
      name: "approvalOptions",
      type: "fixedCollection",
      placeholder: "Add option",
      default: {},
      options: [
        {
          displayName: "Values",
          name: "values",
          values: approvalOptionsValues
        }
      ],
      displayOptions: {
        show: {
          responseType: ["approval"]
        }
      }
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [limitWaitTimeOption, appendAttributionOption],
      displayOptions: {
        show: {
          responseType: ["approval"]
        }
      }
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        {
          displayName: "Message Button Label",
          name: "messageButtonLabel",
          type: "string",
          default: "Respond"
        },
        {
          displayName: "Response Form Title",
          name: "responseFormTitle",
          description: "Title of the form that the user can access to provide their response",
          type: "string",
          default: ""
        },
        {
          displayName: "Response Form Description",
          name: "responseFormDescription",
          description: "Description of the form that the user can access to provide their response",
          type: "string",
          default: ""
        },
        {
          displayName: "Response Form Button Label",
          name: "responseFormButtonLabel",
          type: "string",
          default: "Submit"
        },
        limitWaitTimeOption,
        appendAttributionOption
      ],
      displayOptions: {
        show: {
          responseType: ["freeText", "customForm"]
        }
      }
    },
    ...additionalProperties
  ];
  return (0, import_n8n_workflow.updateDisplayOptions)(
    {
      show: {
        resource: [resource],
        operation: [import_n8n_workflow.SEND_AND_WAIT_OPERATION]
      }
    },
    sendAndWait
  );
}
const getFormResponseCustomizations = (context) => {
  const message = context.getNodeParameter("message", "");
  const options = context.getNodeParameter("options", {});
  let formTitle = "";
  if (options.responseFormTitle) {
    formTitle = options.responseFormTitle;
  }
  let formDescription = message;
  if (options.responseFormDescription) {
    formDescription = options.responseFormDescription;
  }
  formDescription = formDescription.replace(/\\n/g, "\n").replace(/<br>/g, "\n");
  let buttonLabel = "Submit";
  if (options.responseFormButtonLabel) {
    buttonLabel = options.responseFormButtonLabel;
  }
  return {
    formTitle,
    formDescription,
    buttonLabel
  };
};
async function sendAndWaitWebhook() {
  const method = this.getRequestObject().method;
  const res = this.getResponseObject();
  const req = this.getRequestObject();
  const responseType = this.getNodeParameter("responseType", "approval");
  if (responseType === "approval" && (0, import_isbot.default)(req.headers["user-agent"])) {
    res.send("");
    return { noWebhookResponse: true };
  }
  if (responseType === "freeText") {
    if (method === "GET") {
      const { formTitle, formDescription, buttonLabel } = getFormResponseCustomizations(this);
      const data = (0, import_utils.prepareFormData)({
        formTitle,
        formDescription,
        formSubmittedHeader: "Got it, thanks",
        formSubmittedText: "This page can be closed now",
        buttonLabel,
        redirectUrl: void 0,
        formFields: [
          {
            fieldLabel: "Response",
            fieldType: "textarea",
            requiredField: true
          }
        ],
        testRun: false,
        query: {}
      });
      res.render("form-trigger", data);
      return {
        noWebhookResponse: true
      };
    }
    if (method === "POST") {
      const data = this.getBodyData().data;
      return {
        webhookResponse: import_email_templates.ACTION_RECORDED_PAGE,
        workflowData: [[{ json: { data: { text: data[INPUT_FIELD_IDENTIFIER] } } }]]
      };
    }
  }
  if (responseType === "customForm") {
    const defineForm = this.getNodeParameter("defineForm", "fields");
    let fields = [];
    if (defineForm === "json") {
      try {
        const jsonOutput = this.getNodeParameter("jsonOutput", "", {
          rawExpressions: true
        });
        fields = (0, import_n8n_workflow.tryToParseJsonToFormFields)((0, import_utils.resolveRawData)(this, jsonOutput));
      } catch (error) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error.message, {
          description: error.message
        });
      }
    } else {
      fields = this.getNodeParameter("formFields.values", []);
    }
    if (method === "GET") {
      const { formTitle, formDescription, buttonLabel } = getFormResponseCustomizations(this);
      const data = (0, import_utils.prepareFormData)({
        formTitle,
        formDescription,
        formSubmittedHeader: "Got it, thanks",
        formSubmittedText: "This page can be closed now",
        buttonLabel,
        redirectUrl: void 0,
        formFields: fields,
        testRun: false,
        query: {}
      });
      res.render("form-trigger", data);
      return {
        noWebhookResponse: true
      };
    }
    if (method === "POST") {
      const returnItem = await (0, import_utils.prepareFormReturnItem)(this, fields, "production", true);
      const json = returnItem.json;
      delete json.submittedAt;
      delete json.formMode;
      returnItem.json = { data: json };
      return {
        webhookResponse: import_email_templates.ACTION_RECORDED_PAGE,
        workflowData: [[returnItem]]
      };
    }
  }
  const query = req.query;
  const approved = query.approved === "true";
  return {
    webhookResponse: import_email_templates.ACTION_RECORDED_PAGE,
    workflowData: [[{ json: { data: { approved } } }]]
  };
}
function getSendAndWaitConfig(context) {
  const message = (0, import_utilities.escapeHtml)(context.getNodeParameter("message", 0, "").trim()).replace(/\\n/g, "\n").replace(/<br>/g, "\n");
  const subject = (0, import_utilities.escapeHtml)(context.getNodeParameter("subject", 0, ""));
  const resumeUrl = context.evaluateExpression("{{ $execution?.resumeUrl }}", 0);
  const nodeId = context.evaluateExpression("{{ $nodeId }}", 0);
  const approvalOptions = context.getNodeParameter("approvalOptions.values", 0, {});
  const options = context.getNodeParameter("options", 0, {});
  const config = {
    title: subject,
    message,
    url: `${resumeUrl}/${nodeId}`,
    options: [],
    appendAttribution: options?.appendAttribution
  };
  const responseType = context.getNodeParameter("responseType", 0, "approval");
  if (responseType === "freeText" || responseType === "customForm") {
    const label = context.getNodeParameter("options.messageButtonLabel", 0, "Respond");
    config.options.push({
      label,
      value: "true",
      style: "primary"
    });
  } else if (approvalOptions.approvalType === "double") {
    const approveLabel = (0, import_utilities.escapeHtml)(approvalOptions.approveLabel || "Approve");
    const buttonApprovalStyle = approvalOptions.buttonApprovalStyle || "primary";
    const disapproveLabel = (0, import_utilities.escapeHtml)(approvalOptions.disapproveLabel || "Disapprove");
    const buttonDisapprovalStyle = approvalOptions.buttonDisapprovalStyle || "secondary";
    config.options.push({
      label: disapproveLabel,
      value: "false",
      style: buttonDisapprovalStyle
    });
    config.options.push({
      label: approveLabel,
      value: "true",
      style: buttonApprovalStyle
    });
  } else {
    const label = (0, import_utilities.escapeHtml)(approvalOptions.approveLabel || "Approve");
    const style = approvalOptions.buttonApprovalStyle || "primary";
    config.options.push({
      label,
      value: "true",
      style
    });
  }
  return config;
}
function createButton(url, label, approved, style) {
  let buttonStyle = import_email_templates.BUTTON_STYLE_PRIMARY;
  if (style === "secondary") {
    buttonStyle = import_email_templates.BUTTON_STYLE_SECONDARY;
  }
  return `<a href="${url}?approved=${approved}" target="_blank" style="${buttonStyle}">${label}</a>`;
}
function createEmail(context) {
  const to = context.getNodeParameter("sendTo", 0, "").trim();
  const config = getSendAndWaitConfig(context);
  if (to.indexOf("@") === -1 || (to.match(/@/g) || []).length > 1) {
    const description = `The email address '${to}' in the 'To' field isn't valid or contains multiple addresses. Please provide only a single email address.`;
    throw new import_n8n_workflow.NodeOperationError(context.getNode(), "Invalid email address", {
      description,
      itemIndex: 0
    });
  }
  const buttons = [];
  for (const option of config.options) {
    buttons.push(createButton(config.url, option.label, option.value, option.style));
  }
  let emailBody;
  if (config.appendAttribution !== false) {
    const instanceId = context.getInstanceId();
    emailBody = (0, import_email_templates.createEmailBodyWithN8nAttribution)(config.message, buttons.join("\n"), instanceId);
  } else {
    emailBody = (0, import_email_templates.createEmailBodyWithoutN8nAttribution)(config.message, buttons.join("\n"));
  }
  const email = {
    to,
    subject: config.title,
    body: "",
    htmlBody: emailBody
  };
  return email;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createButton,
  createEmail,
  getSendAndWaitConfig,
  getSendAndWaitProperties,
  sendAndWaitWebhook
});
//# sourceMappingURL=utils.js.map