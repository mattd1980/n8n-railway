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
var Wait_node_exports = {};
__export(Wait_node_exports, {
  Wait: () => Wait
});
module.exports = __toCommonJS(Wait_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
var import_common = require("../Form/common.descriptions");
var import_utils = require("../Form/utils");
var import_description = require("../Webhook/description");
var import_Webhook = require("../Webhook/Webhook.node");
const toWaitAmount = {
  displayName: "Wait Amount",
  name: "amount",
  type: "number",
  typeOptions: {
    minValue: 0,
    numberPrecision: 2
  },
  default: 1,
  description: "The time to wait"
};
const unitSelector = {
  displayName: "Wait Unit",
  name: "unit",
  type: "options",
  options: [
    {
      name: "Seconds",
      value: "seconds"
    },
    {
      name: "Minutes",
      value: "minutes"
    },
    {
      name: "Hours",
      value: "hours"
    },
    {
      name: "Days",
      value: "days"
    }
  ],
  default: "hours",
  description: "The time unit of the Wait Amount value"
};
const waitTimeProperties = [
  {
    displayName: "Limit Wait Time",
    name: "limitWaitTime",
    type: "boolean",
    default: false,
    description: "Whether to limit the time this node should wait for a user response before execution resumes",
    displayOptions: {
      show: {
        resume: ["webhook", "form"]
      }
    }
  },
  {
    displayName: "Limit Type",
    name: "limitType",
    type: "options",
    default: "afterTimeInterval",
    description: "Sets the condition for the execution to resume. Can be a specified date or after some time.",
    displayOptions: {
      show: {
        limitWaitTime: [true],
        resume: ["webhook", "form"]
      }
    },
    options: [
      {
        name: "After Time Interval",
        description: "Waits for a certain amount of time",
        value: "afterTimeInterval"
      },
      {
        name: "At Specified Time",
        description: "Waits until the set date and time to continue",
        value: "atSpecifiedTime"
      }
    ]
  },
  {
    displayName: "Amount",
    name: "resumeAmount",
    type: "number",
    displayOptions: {
      show: {
        limitType: ["afterTimeInterval"],
        limitWaitTime: [true],
        resume: ["webhook", "form"]
      }
    },
    typeOptions: {
      minValue: 0,
      numberPrecision: 2
    },
    default: 1,
    description: "The time to wait"
  },
  {
    displayName: "Unit",
    name: "resumeUnit",
    type: "options",
    displayOptions: {
      show: {
        limitType: ["afterTimeInterval"],
        limitWaitTime: [true],
        resume: ["webhook", "form"]
      }
    },
    options: [
      {
        name: "Seconds",
        value: "seconds"
      },
      {
        name: "Minutes",
        value: "minutes"
      },
      {
        name: "Hours",
        value: "hours"
      },
      {
        name: "Days",
        value: "days"
      }
    ],
    default: "hours",
    description: "Unit of the interval value"
  },
  {
    displayName: "Max Date and Time",
    name: "maxDateAndTime",
    type: "dateTime",
    displayOptions: {
      show: {
        limitType: ["atSpecifiedTime"],
        limitWaitTime: [true],
        resume: ["webhook", "form"]
      }
    },
    default: "",
    description: "Continue execution after the specified date and time"
  }
];
const webhookSuffix = {
  displayName: "Webhook Suffix",
  name: "webhookSuffix",
  type: "string",
  default: "",
  placeholder: "webhook",
  noDataExpression: true,
  description: "This suffix path will be appended to the restart URL. Helpful when using multiple wait nodes."
};
const displayOnWebhook = {
  show: {
    resume: ["webhook"]
  }
};
const displayOnFormSubmission = {
  show: {
    resume: ["form"]
  }
};
const onFormSubmitProperties = (0, import_utilities.updateDisplayOptions)(displayOnFormSubmission, [
  import_common.formTitle,
  import_common.formDescription,
  import_common.formFields,
  import_common.formRespondMode
]);
const onWebhookCallProperties = (0, import_utilities.updateDisplayOptions)(displayOnWebhook, [
  {
    ...import_description.httpMethodsProperty,
    description: "The HTTP method of the Webhook call"
  },
  import_description.responseCodeProperty,
  import_description.responseModeProperty,
  import_description.responseDataProperty,
  import_description.responseBinaryPropertyNameProperty
]);
const webhookPath = '={{$parameter["options"]["webhookSuffix"] || ""}}';
class Wait extends import_Webhook.Webhook {
  constructor() {
    super(...arguments);
    this.authPropertyName = "incomingAuthentication";
    this.description = {
      displayName: "Wait",
      name: "wait",
      icon: "fa:pause-circle",
      iconColor: "crimson",
      group: ["organization"],
      version: [1, 1.1],
      description: "Wait before continue with execution",
      defaults: {
        name: "Wait",
        color: "#804050"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: (0, import_description.credentialsProperty)(this.authPropertyName),
      webhooks: [
        {
          ...import_description.defaultWebhookDescription,
          responseData: '={{$parameter["responseData"]}}',
          path: webhookPath,
          restartWebhook: true
        },
        {
          name: "default",
          httpMethod: "GET",
          responseMode: "onReceived",
          path: webhookPath,
          restartWebhook: true,
          isFullPath: true,
          nodeType: "form"
        },
        {
          name: "default",
          httpMethod: "POST",
          responseMode: '={{$parameter["responseMode"]}}',
          responseData: '={{$parameter["responseMode"] === "lastNode" ? "noData" : undefined}}',
          path: webhookPath,
          restartWebhook: true,
          isFullPath: true,
          nodeType: "form"
        }
      ],
      properties: [
        {
          displayName: "Resume",
          name: "resume",
          type: "options",
          options: [
            {
              name: "After Time Interval",
              value: "timeInterval",
              description: "Waits for a certain amount of time"
            },
            {
              name: "At Specified Time",
              value: "specificTime",
              description: "Waits until a specific date and time to continue"
            },
            {
              name: "On Webhook Call",
              value: "webhook",
              description: "Waits for a webhook call before continuing"
            },
            {
              name: "On Form Submitted",
              value: "form",
              description: "Waits for a form submission before continuing"
            }
          ],
          default: "timeInterval",
          description: "Determines the waiting mode to use before the workflow continues"
        },
        {
          displayName: "Authentication",
          name: "incomingAuthentication",
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
          default: "none",
          description: "If and how incoming resume-webhook-requests to $execution.resumeFormUrl should be authenticated for additional security",
          displayOptions: {
            show: {
              resume: ["form"]
            }
          }
        },
        {
          ...(0, import_description.authenticationProperty)(this.authPropertyName),
          description: "If and how incoming resume-webhook-requests to $execution.resumeUrl should be authenticated for additional security",
          displayOptions: displayOnWebhook
        },
        // ----------------------------------
        //         resume:specificTime
        // ----------------------------------
        {
          displayName: "Date and Time",
          name: "dateTime",
          type: "dateTime",
          displayOptions: {
            show: {
              resume: ["specificTime"]
            }
          },
          default: "",
          description: "The date and time to wait for before continuing",
          required: true
        },
        // ----------------------------------
        //         resume:timeInterval
        // ----------------------------------
        {
          ...toWaitAmount,
          displayOptions: {
            show: {
              resume: ["timeInterval"],
              "@version": [1]
            }
          }
        },
        {
          ...toWaitAmount,
          default: 5,
          displayOptions: {
            show: {
              resume: ["timeInterval"]
            },
            hide: {
              "@version": [1]
            }
          }
        },
        {
          ...unitSelector,
          displayOptions: {
            show: {
              resume: ["timeInterval"],
              "@version": [1]
            }
          }
        },
        {
          ...unitSelector,
          default: "seconds",
          displayOptions: {
            show: {
              resume: ["timeInterval"]
            },
            hide: {
              "@version": [1]
            }
          }
        },
        // ----------------------------------
        //         resume:webhook & form
        // ----------------------------------
        {
          displayName: 'The webhook URL will be generated at run time. It can be referenced with the <strong>$execution.resumeUrl</strong> variable. Send it somewhere before getting to this node. <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.wait" target="_blank">More info</a>',
          name: "webhookNotice",
          type: "notice",
          displayOptions: displayOnWebhook,
          default: ""
        },
        {
          displayName: 'The form url will be generated at run time. It can be referenced with the <strong>$execution.resumeFormUrl</strong> variable. Send it somewhere before getting to this node. <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.wait" target="_blank">More info</a>',
          name: "formNotice",
          type: "notice",
          displayOptions: displayOnFormSubmission,
          default: ""
        },
        ...onFormSubmitProperties,
        ...onWebhookCallProperties,
        ...waitTimeProperties,
        {
          ...import_description.optionsProperty,
          displayOptions: displayOnWebhook,
          options: [...import_description.optionsProperty.options, webhookSuffix]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resume: ["form"]
            },
            hide: {
              responseMode: ["responseNode"]
            }
          },
          options: [import_common.appendAttributionToForm, import_common.respondWithOptions, webhookSuffix]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resume: ["form"]
            },
            hide: {
              responseMode: ["onReceived", "lastNode"]
            }
          },
          options: [import_common.appendAttributionToForm, webhookSuffix]
        }
      ]
    };
  }
  async webhook(context) {
    const resume = context.getNodeParameter("resume", 0);
    if (resume === "form") return await (0, import_utils.formWebhook)(context, this.authPropertyName);
    return await super.webhook(context);
  }
  async execute(context) {
    const resume = context.getNodeParameter("resume", 0);
    if (["webhook", "form"].includes(resume)) {
      let hasFormTrigger = false;
      if (resume === "form") {
        const parentNodes = context.getParentNodes(context.getNode().name);
        hasFormTrigger = parentNodes.some((node) => node.type === import_n8n_workflow.FORM_TRIGGER_NODE_TYPE);
      }
      const returnData = await this.configureAndPutToWait(context);
      if (resume === "form" && hasFormTrigger) {
        context.sendResponse({
          headers: {
            location: context.evaluateExpression("{{ $execution.resumeFormUrl }}", 0)
          },
          statusCode: 307
        });
      }
      return returnData;
    }
    let waitTill;
    if (resume === "timeInterval") {
      const unit = context.getNodeParameter("unit", 0);
      let waitAmount = context.getNodeParameter("amount", 0);
      if (unit === "minutes") {
        waitAmount *= 60;
      }
      if (unit === "hours") {
        waitAmount *= 60 * 60;
      }
      if (unit === "days") {
        waitAmount *= 60 * 60 * 24;
      }
      waitAmount *= 1e3;
      waitTill = new Date((/* @__PURE__ */ new Date()).getTime() + waitAmount);
    } else {
      try {
        const dateTimeStrRaw = context.getNodeParameter("dateTime", 0);
        const parsedDateTime = (0, import_n8n_workflow.tryToParseDateTime)(dateTimeStrRaw, context.getTimezone());
        waitTill = parsedDateTime.toUTC().toJSDate();
      } catch (e) {
        throw new import_n8n_workflow.NodeOperationError(
          context.getNode(),
          "[Wait node] Cannot put execution to wait because `dateTime` parameter is not a valid date. Please pick a specific date and time to wait until."
        );
      }
    }
    const waitValue = Math.max(waitTill.getTime() - (/* @__PURE__ */ new Date()).getTime(), 0);
    if (waitValue < 65e3) {
      return await new Promise((resolve) => {
        const timer = setTimeout(() => resolve([context.getInputData()]), waitValue);
        context.onExecutionCancellation(() => clearTimeout(timer));
      });
    }
    return await this.putToWait(context, waitTill);
  }
  async configureAndPutToWait(context) {
    let waitTill = import_n8n_workflow.WAIT_INDEFINITELY;
    const limitWaitTime = context.getNodeParameter("limitWaitTime", 0);
    if (limitWaitTime === true) {
      const limitType = context.getNodeParameter("limitType", 0);
      if (limitType === "afterTimeInterval") {
        let waitAmount = context.getNodeParameter("resumeAmount", 0);
        const resumeUnit = context.getNodeParameter("resumeUnit", 0);
        if (resumeUnit === "minutes") {
          waitAmount *= 60;
        }
        if (resumeUnit === "hours") {
          waitAmount *= 60 * 60;
        }
        if (resumeUnit === "days") {
          waitAmount *= 60 * 60 * 24;
        }
        waitAmount *= 1e3;
        waitTill = new Date((/* @__PURE__ */ new Date()).getTime() + waitAmount);
      } else {
        waitTill = new Date(context.getNodeParameter("maxDateAndTime", 0));
      }
    }
    return await this.putToWait(context, waitTill);
  }
  async putToWait(context, waitTill) {
    await context.putExecutionToWait(waitTill);
    return [context.getInputData()];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Wait
});
//# sourceMappingURL=Wait.node.js.map