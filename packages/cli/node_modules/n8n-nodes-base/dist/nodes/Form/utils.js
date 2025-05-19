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
  addFormResponseDataToReturnItem: () => addFormResponseDataToReturnItem,
  createDescriptionMetadata: () => createDescriptionMetadata,
  formWebhook: () => formWebhook,
  isFormConnected: () => isFormConnected,
  prepareFormData: () => prepareFormData,
  prepareFormFields: () => prepareFormFields,
  prepareFormReturnItem: () => prepareFormReturnItem,
  renderForm: () => renderForm,
  resolveRawData: () => resolveRawData,
  sanitizeCustomCss: () => sanitizeCustomCss,
  sanitizeHtml: () => sanitizeHtml,
  validateResponseModeConfiguration: () => validateResponseModeConfiguration
});
module.exports = __toCommonJS(utils_exports);
var import_isbot = __toESM(require("isbot"));
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
var import_sanitize_html = __toESM(require("sanitize-html"));
var import_interfaces = require("./interfaces");
var import_utilities = require("../../utils/utilities");
var import_error = require("../Webhook/error");
var import_utils = require("../Webhook/utils");
function sanitizeHtml(text) {
  return (0, import_sanitize_html.default)(text, {
    allowedTags: [
      "b",
      "div",
      "i",
      "iframe",
      "img",
      "video",
      "source",
      "em",
      "strong",
      "a",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "u",
      "sub",
      "sup",
      "code",
      "pre",
      "span",
      "br",
      "ul",
      "ol",
      "li",
      "p"
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      video: ["*"],
      iframe: ["*"],
      source: ["*"]
    },
    transformTags: {
      iframe: import_sanitize_html.default.simpleTransform("iframe", {
        sandbox: "",
        referrerpolicy: "strict-origin-when-cross-origin",
        allow: "fullscreen; autoplay; encrypted-media"
      })
    }
  });
}
const prepareFormFields = (context, fields) => {
  return fields.map((field) => {
    if (field.fieldType === "html") {
      let { html } = field;
      if (!html) return field;
      for (const resolvable of (0, import_utilities.getResolvables)(html)) {
        html = html.replace(resolvable, context.evaluateExpression(resolvable));
      }
      field.html = sanitizeHtml(html);
    }
    if (field.fieldType === "hiddenField") {
      field.fieldLabel = field.fieldName;
    }
    return field;
  });
};
function sanitizeCustomCss(css) {
  if (!css) return void 0;
  return (0, import_sanitize_html.default)(css, {
    allowedTags: [],
    // No HTML tags allowed
    allowedAttributes: {}
    // No attributes allowed
    // This ensures we're only keeping the text content
    // which should be the CSS, while removing any HTML/script tags
  });
}
function createDescriptionMetadata(description) {
  return description === "" ? "n8n form" : description.replace(/^\s*\n+|<\/?[^>]+(>|$)/g, "").slice(0, 150);
}
function prepareFormData({
  formTitle,
  formDescription,
  formSubmittedHeader,
  formSubmittedText,
  redirectUrl,
  formFields,
  testRun,
  query,
  instanceId,
  useResponseData,
  appendAttribution = true,
  buttonLabel,
  customCss
}) {
  const utm_campaign = instanceId ? `&utm_campaign=${instanceId}` : "";
  const n8nWebsiteLink = `https://n8n.io/?utm_source=n8n-internal&utm_medium=form-trigger${utm_campaign}`;
  if (formSubmittedText === void 0) {
    formSubmittedText = "Your response has been recorded";
  }
  const formData = {
    testRun,
    formTitle,
    formDescription,
    formDescriptionMetadata: createDescriptionMetadata(formDescription),
    formSubmittedHeader,
    formSubmittedText,
    n8nWebsiteLink,
    formFields: [],
    useResponseData,
    appendAttribution,
    buttonLabel,
    dangerousCustomCss: sanitizeCustomCss(customCss)
  };
  if (redirectUrl) {
    if (!redirectUrl.includes("://")) {
      redirectUrl = `http://${redirectUrl}`;
    }
    formData.redirectUrl = redirectUrl;
  }
  for (const [index, field] of formFields.entries()) {
    const { fieldType, requiredField, multiselect, placeholder } = field;
    const input = {
      id: `field-${index}`,
      errorId: `error-field-${index}`,
      label: field.fieldLabel,
      inputRequired: requiredField ? "form-required" : "",
      defaultValue: query[field.fieldLabel] ?? "",
      placeholder
    };
    if (multiselect) {
      input.isMultiSelect = true;
      input.multiSelectOptions = field.fieldOptions?.values.map((e, i) => ({
        id: `option${i}_${input.id}`,
        label: e.option
      })) ?? [];
    } else if (fieldType === "file") {
      input.isFileInput = true;
      input.acceptFileTypes = field.acceptFileTypes;
      input.multipleFiles = field.multipleFiles ? "multiple" : "";
    } else if (fieldType === "dropdown") {
      input.isSelect = true;
      const fieldOptions = field.fieldOptions?.values ?? [];
      input.selectOptions = fieldOptions.map((e) => e.option);
    } else if (fieldType === "textarea") {
      input.isTextarea = true;
    } else if (fieldType === "html") {
      input.isHtml = true;
      input.html = field.html;
    } else if (fieldType === "hiddenField") {
      input.isHidden = true;
      input.hiddenName = field.fieldName;
      input.hiddenValue = input.defaultValue === "" ? field.fieldValue : input.defaultValue;
    } else {
      input.isInput = true;
      input.type = fieldType;
    }
    formData.formFields.push(input);
  }
  return formData;
}
const validateResponseModeConfiguration = (context) => {
  const responseMode = context.getNodeParameter("responseMode", "onReceived");
  const connectedNodes = context.getChildNodes(context.getNode().name);
  const nodeVersion = context.getNode().typeVersion;
  const isRespondToWebhookConnected = connectedNodes.some(
    (node) => node.type === "n8n-nodes-base.respondToWebhook"
  );
  if (!isRespondToWebhookConnected && responseMode === "responseNode") {
    throw new import_n8n_workflow.NodeOperationError(
      context.getNode(),
      new Error("No Respond to Webhook node found in the workflow"),
      {
        description: "Insert a Respond to Webhook node to your workflow to respond to the form submission or choose another option for the \u201CRespond When\u201D parameter"
      }
    );
  }
  if (isRespondToWebhookConnected && responseMode !== "responseNode" && nodeVersion <= 2.1) {
    throw new import_n8n_workflow.NodeOperationError(
      context.getNode(),
      new Error(`${context.getNode().name} node not correctly configured`),
      {
        description: "Set the \u201CRespond When\u201D parameter to \u201CUsing Respond to Webhook Node\u201D or remove the Respond to Webhook node"
      }
    );
  }
  if (isRespondToWebhookConnected && nodeVersion > 2.1) {
    throw new import_n8n_workflow.NodeOperationError(
      context.getNode(),
      new Error(
        'The "Respond to Webhook" node is not supported in workflows initiated by the "n8n Form Trigger"'
      ),
      {
        description: 'To configure your response, add an "n8n Form" node and set the "Page Type" to "Form Ending"'
      }
    );
  }
};
function addFormResponseDataToReturnItem(returnItem, formFields, bodyData) {
  for (const [index, field] of formFields.entries()) {
    const key = `field-${index}`;
    const name = field.fieldLabel ?? field.fieldName;
    let value = bodyData[key] ?? null;
    if (value === null) {
      returnItem.json[name] = null;
      continue;
    }
    if (field.fieldType === "html") {
      if (field.elementName) {
        returnItem.json[field.elementName] = value;
      }
      continue;
    }
    if (field.fieldType === "number") {
      value = Number(value);
    }
    if (field.fieldType === "text") {
      value = String(value).trim();
    }
    if (field.multiselect && typeof value === "string") {
      value = (0, import_n8n_workflow.jsonParse)(value);
    }
    if (field.fieldType === "date" && value && field.formatDate !== "") {
      value = import_luxon.DateTime.fromFormat(String(value), "yyyy-mm-dd").toFormat(field.formatDate);
    }
    if (field.fieldType === "file" && field.multipleFiles && !Array.isArray(value)) {
      value = [value];
    }
    returnItem.json[name] = value;
  }
}
async function prepareFormReturnItem(context, formFields, mode, useWorkflowTimezone = false) {
  const bodyData = context.getBodyData().data ?? {};
  const files = context.getBodyData().files ?? {};
  const returnItem = {
    json: {}
  };
  if (files && Object.keys(files).length) {
    returnItem.binary = {};
  }
  for (const key of Object.keys(files)) {
    const processFiles = [];
    let multiFile = false;
    const filesInput = files[key];
    if (Array.isArray(filesInput)) {
      bodyData[key] = filesInput.map((file) => ({
        filename: file.originalFilename,
        mimetype: file.mimetype,
        size: file.size
      }));
      processFiles.push(...filesInput);
      multiFile = true;
    } else {
      bodyData[key] = {
        filename: filesInput.originalFilename,
        mimetype: filesInput.mimetype,
        size: filesInput.size
      };
      processFiles.push(filesInput);
    }
    const entryIndex = Number(key.replace(/field-/g, ""));
    const fieldLabel = isNaN(entryIndex) ? key : formFields[entryIndex].fieldLabel;
    let fileCount = 0;
    for (const file of processFiles) {
      let binaryPropertyName = fieldLabel.replace(/\W/g, "_");
      if (multiFile) {
        binaryPropertyName += `_${fileCount++}`;
      }
      returnItem.binary[binaryPropertyName] = await context.nodeHelpers.copyBinaryFile(
        file.filepath,
        file.originalFilename ?? file.newFilename,
        file.mimetype
      );
    }
  }
  addFormResponseDataToReturnItem(returnItem, formFields, bodyData);
  const timezone = useWorkflowTimezone ? context.getTimezone() : "UTC";
  returnItem.json.submittedAt = import_luxon.DateTime.now().setZone(timezone).toISO();
  returnItem.json.formMode = mode;
  if (context.getNode().type === import_n8n_workflow.FORM_TRIGGER_NODE_TYPE && Object.keys(context.getRequestObject().query || {}).length) {
    returnItem.json.formQueryParameters = context.getRequestObject().query;
  }
  return returnItem;
}
function renderForm({
  context,
  res,
  formTitle,
  formDescription,
  formFields,
  responseMode,
  mode,
  formSubmittedText,
  redirectUrl,
  appendAttribution,
  buttonLabel,
  customCss
}) {
  formDescription = (formDescription || "").replace(/\\n/g, "\n").replace(/<br>/g, "\n");
  const instanceId = context.getInstanceId();
  const useResponseData = responseMode === "responseNode";
  let query = {};
  if (context.getNode().type === import_n8n_workflow.FORM_TRIGGER_NODE_TYPE) {
    query = context.getRequestObject().query;
  } else if (context.getNode().type === import_n8n_workflow.FORM_NODE_TYPE) {
    const parentNodes = context.getParentNodes(context.getNode().name);
    const trigger = parentNodes.find(
      (node) => node.type === import_n8n_workflow.FORM_TRIGGER_NODE_TYPE
    );
    try {
      const triggerQueryParameters = context.evaluateExpression(
        `{{ $('${trigger?.name}').first().json.formQueryParameters }}`
      );
      if (triggerQueryParameters) {
        query = triggerQueryParameters;
      }
    } catch (error) {
    }
  }
  formFields = prepareFormFields(context, formFields);
  const data = prepareFormData({
    formTitle,
    formDescription,
    formSubmittedText,
    redirectUrl,
    formFields,
    testRun: mode === "test",
    query,
    instanceId,
    useResponseData,
    appendAttribution,
    buttonLabel,
    customCss
  });
  res.render("form-trigger", data);
}
const isFormConnected = (nodes) => {
  return nodes.some(
    (n) => n.type === import_n8n_workflow.FORM_NODE_TYPE || n.type === import_n8n_workflow.WAIT_NODE_TYPE && n.parameters?.resume === "form"
  );
};
async function formWebhook(context, authProperty = import_interfaces.FORM_TRIGGER_AUTHENTICATION_PROPERTY) {
  const node = context.getNode();
  const options = context.getNodeParameter("options", {});
  const res = context.getResponseObject();
  const req = context.getRequestObject();
  try {
    if (options.ignoreBots && (0, import_isbot.default)(req.headers["user-agent"])) {
      throw new import_error.WebhookAuthorizationError(403);
    }
    if (node.typeVersion > 1) {
      await (0, import_utils.validateWebhookAuthentication)(context, authProperty);
    }
  } catch (error) {
    if (error instanceof import_error.WebhookAuthorizationError) {
      res.setHeader("WWW-Authenticate", 'Basic realm="Enter credentials"');
      res.status(401).send();
      return { noWebhookResponse: true };
    }
    throw error;
  }
  const mode = context.getMode() === "manual" ? "test" : "production";
  const formFields = context.getNodeParameter("formFields.values", []);
  const method = context.getRequestObject().method;
  validateResponseModeConfiguration(context);
  if (method === "GET") {
    const formTitle = context.getNodeParameter("formTitle", "");
    const formDescription = sanitizeHtml(context.getNodeParameter("formDescription", ""));
    let responseMode = context.getNodeParameter("responseMode", "");
    let formSubmittedText;
    let redirectUrl;
    let appendAttribution = true;
    if (options.respondWithOptions) {
      const values = options.respondWithOptions.values;
      if (values.respondWith === "text") {
        formSubmittedText = values.formSubmittedText;
      }
      if (values.respondWith === "redirect") {
        redirectUrl = values.redirectUrl;
      }
    } else {
      formSubmittedText = options.formSubmittedText;
    }
    if (options.appendAttribution === false) {
      appendAttribution = false;
    }
    let buttonLabel = "Submit";
    if (options.buttonLabel) {
      buttonLabel = options.buttonLabel;
    }
    const connectedNodes = context.getChildNodes(context.getNode().name, {
      includeNodeParameters: true
    });
    const hasNextPage = isFormConnected(connectedNodes);
    if (hasNextPage) {
      redirectUrl = void 0;
      responseMode = "responseNode";
    }
    renderForm({
      context,
      res,
      formTitle,
      formDescription,
      formFields,
      responseMode,
      mode,
      formSubmittedText,
      redirectUrl,
      appendAttribution,
      buttonLabel,
      customCss: options.customCss
    });
    return {
      noWebhookResponse: true
    };
  }
  let { useWorkflowTimezone } = options;
  if (useWorkflowTimezone === void 0 && node.typeVersion > 2) {
    useWorkflowTimezone = true;
  }
  const returnItem = await prepareFormReturnItem(context, formFields, mode, useWorkflowTimezone);
  return {
    webhookResponse: { status: 200 },
    workflowData: [[returnItem]]
  };
}
function resolveRawData(context, rawData) {
  const resolvables = (0, import_utilities.getResolvables)(rawData);
  let returnData = rawData;
  if (returnData.startsWith("=")) {
    returnData = returnData.replace(/^=+/, "");
  } else {
    return returnData;
  }
  if (resolvables.length) {
    for (const resolvable of resolvables) {
      const resolvedValue = context.evaluateExpression(`${resolvable}`);
      if (typeof resolvedValue === "object" && resolvedValue !== null) {
        returnData = returnData.replace(resolvable, JSON.stringify(resolvedValue));
      } else {
        returnData = returnData.replace(resolvable, resolvedValue);
      }
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFormResponseDataToReturnItem,
  createDescriptionMetadata,
  formWebhook,
  isFormConnected,
  prepareFormData,
  prepareFormFields,
  prepareFormReturnItem,
  renderForm,
  resolveRawData,
  sanitizeCustomCss,
  sanitizeHtml,
  validateResponseModeConfiguration
});
//# sourceMappingURL=utils.js.map