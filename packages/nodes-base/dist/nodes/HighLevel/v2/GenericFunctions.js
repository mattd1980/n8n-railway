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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  addCustomFieldsPreSendAction: () => addCustomFieldsPreSendAction,
  addLocationIdPreSendAction: () => addLocationIdPreSendAction,
  addNotePostReceiveAction: () => addNotePostReceiveAction,
  contactIdentifierPreSendAction: () => contactIdentifierPreSendAction,
  dateTimeToEpochPreSendAction: () => dateTimeToEpochPreSendAction,
  dateToIsoSupressMillis: () => dateToIsoSupressMillis,
  dueDatePreSendAction: () => dueDatePreSendAction,
  getContacts: () => getContacts,
  getPipelineStages: () => getPipelineStages,
  getPipelines: () => getPipelines,
  getUsers: () => getUsers,
  highLevelApiPagination: () => highLevelApiPagination,
  highLevelApiRequest: () => highLevelApiRequest,
  isEmailValid: () => isEmailValid,
  isPhoneValid: () => isPhoneValid,
  splitTagsPreSendAction: () => splitTagsPreSendAction,
  taskPostReceiceAction: () => taskPostReceiceAction,
  taskUpdatePreSendAction: () => taskUpdatePreSendAction,
  validEmailAndPhonePreSendAction: () => validEmailAndPhonePreSendAction
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_PHONE_REGEX = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
function isEmailValid(email) {
  return VALID_EMAIL_REGEX.test(String(email).toLowerCase());
}
function isPhoneValid(phone) {
  return VALID_PHONE_REGEX.test(String(phone));
}
function dateToIsoSupressMillis(dateTime) {
  const options = { suppressMilliseconds: true };
  return import_luxon.DateTime.fromISO(dateTime).toISO(options);
}
async function taskPostReceiceAction(items, _response) {
  const contactId = this.getNodeParameter("contactId");
  items.forEach((item) => item.json.contactId = contactId);
  return items;
}
async function dueDatePreSendAction(requestOptions) {
  let dueDateParam = this.getNodeParameter("dueDate", null);
  if (!dueDateParam) {
    const fields = this.getNodeParameter("updateFields");
    dueDateParam = fields.dueDate;
  }
  if (!dueDateParam) {
    throw new import_n8n_workflow.NodeApiError(
      this.getNode(),
      {},
      { message: "dueDate is required", description: "dueDate is required" }
    );
  }
  const dueDate = dateToIsoSupressMillis(dueDateParam);
  requestOptions.body = requestOptions.body ?? {};
  Object.assign(requestOptions.body, { dueDate });
  return requestOptions;
}
async function contactIdentifierPreSendAction(requestOptions) {
  requestOptions.body = requestOptions.body ?? {};
  let identifier = this.getNodeParameter("contactIdentifier", null);
  if (!identifier) {
    const fields = this.getNodeParameter("updateFields");
    identifier = fields.contactIdentifier;
  }
  if (isEmailValid(identifier)) {
    Object.assign(requestOptions.body, { email: identifier });
  } else if (isPhoneValid(identifier)) {
    Object.assign(requestOptions.body, { phone: identifier });
  } else {
    Object.assign(requestOptions.body, { contactId: identifier });
  }
  return requestOptions;
}
async function validEmailAndPhonePreSendAction(requestOptions) {
  const body = requestOptions.body ?? {};
  if (body.email && !isEmailValid(body.email)) {
    const message = `email "${body.email}" has invalid format`;
    throw new import_n8n_workflow.NodeApiError(this.getNode(), {}, { message, description: message });
  }
  if (body.phone && !isPhoneValid(body.phone)) {
    const message = `phone "${body.phone}" has invalid format`;
    throw new import_n8n_workflow.NodeApiError(this.getNode(), {}, { message, description: message });
  }
  return requestOptions;
}
async function dateTimeToEpochPreSendAction(requestOptions) {
  const qs = requestOptions.qs ?? {};
  const toEpoch = (dt) => new Date(dt).getTime();
  if (qs.startDate) qs.startDate = toEpoch(qs.startDate);
  if (qs.endDate) qs.endDate = toEpoch(qs.endDate);
  return requestOptions;
}
async function addLocationIdPreSendAction(requestOptions) {
  const { locationId } = (await this.getCredentials("highLevelOAuth2Api"))?.oauthTokenData ?? {};
  const resource = this.getNodeParameter("resource");
  const operation = this.getNodeParameter("operation");
  if (resource === "contact") {
    if (operation === "getAll") {
      requestOptions.qs = requestOptions.qs ?? {};
      Object.assign(requestOptions.qs, { locationId });
    }
    if (operation === "create") {
      requestOptions.body = requestOptions.body ?? {};
      Object.assign(requestOptions.body, { locationId });
    }
  }
  if (resource === "opportunity") {
    if (operation === "create") {
      requestOptions.body = requestOptions.body ?? {};
      Object.assign(requestOptions.body, { locationId });
    }
    if (operation === "getAll") {
      requestOptions.qs = requestOptions.qs ?? {};
      Object.assign(requestOptions.qs, { location_id: locationId });
    }
  }
  return requestOptions;
}
async function highLevelApiRequest(method, resource, body = {}, qs = {}, url, option = {}) {
  let options = {
    headers: {
      "Content-Type": "application/json",
      Version: "2021-07-28"
    },
    method,
    body,
    qs,
    url: url ?? `https://services.leadconnectorhq.com${resource}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  options = Object.assign({}, options, option);
  return await this.helpers.httpRequestWithAuthentication.call(this, "highLevelOAuth2Api", options);
}
const addNotePostReceiveAction = async function(items, response) {
  const note = this.getNodeParameter("additionalFields.notes", 0);
  if (!note) {
    return items;
  }
  const contact = response.body.contact;
  if (!response || !response.body || !contact) {
    throw new import_n8n_workflow.ApplicationError("No response data available to extract contact ID and user ID.");
  }
  const contactId = contact.id;
  const userId = contact.locationId;
  const requestBody = {
    userId,
    body: note
  };
  await highLevelApiRequest.call(this, "POST", `/contacts/${contactId}/notes`, requestBody, {});
  return items;
};
async function taskUpdatePreSendAction(requestOptions) {
  const body = requestOptions.body ?? {};
  if (!body.title || !body.dueDate) {
    const contactId = this.getNodeParameter("contactId");
    const taskId = this.getNodeParameter("taskId");
    const resource = `/contacts/${contactId}/tasks/${taskId}`;
    const responseData = await highLevelApiRequest.call(this, "GET", resource);
    body.title = body.title || responseData.title;
    body.dueDate = body.dueDate || dateToIsoSupressMillis(responseData.dueDate);
    requestOptions.body = body;
  }
  return requestOptions;
}
async function splitTagsPreSendAction(requestOptions) {
  const body = requestOptions.body ?? {};
  if (body.tags) {
    if (Array.isArray(body.tags)) return requestOptions;
    body.tags = body.tags.split(",").map((tag) => tag.trim());
  }
  return requestOptions;
}
async function highLevelApiPagination(requestData) {
  const responseData = [];
  const resource = this.getNodeParameter("resource");
  const returnAll = this.getNodeParameter("returnAll", false);
  const resourceMapping = {
    contact: "contacts",
    opportunity: "opportunities"
  };
  const rootProperty = resourceMapping[resource];
  requestData.options.qs = requestData.options.qs ?? {};
  if (returnAll) requestData.options.qs.limit = 100;
  let responseTotal = 0;
  do {
    const pageResponseData = await this.makeRoutingRequest(requestData);
    const items = pageResponseData[0].json[rootProperty];
    items.forEach((item) => responseData.push({ json: item }));
    const meta = pageResponseData[0].json.meta;
    const startAfterId = meta.startAfterId;
    const startAfter = meta.startAfter;
    requestData.options.qs = { startAfterId, startAfter };
    responseTotal = meta.total || 0;
  } while (returnAll && responseTotal > responseData.length);
  return responseData;
}
async function getPipelineStages() {
  const operation = this.getNodeParameter("operation");
  let pipelineId = "";
  if (operation === "create") {
    pipelineId = this.getCurrentNodeParameter("pipelineId");
  }
  if (operation === "update") {
    pipelineId = this.getNodeParameter("updateFields.pipelineId");
  }
  if (operation === "getAll") {
    pipelineId = this.getNodeParameter("filters.pipelineId");
  }
  const { locationId } = (await this.getCredentials("highLevelOAuth2Api"))?.oauthTokenData ?? {};
  const pipelines = (await highLevelApiRequest.call(this, "GET", "/opportunities/pipelines", void 0, {
    locationId
  })).pipelines;
  const pipeline = pipelines.find((p) => p.id === pipelineId);
  if (pipeline) {
    const options = pipeline.stages.map((stage) => {
      const name = stage.name;
      const value = stage.id;
      return { name, value };
    });
    return options;
  }
  return [];
}
async function getPipelines() {
  const { locationId } = (await this.getCredentials("highLevelOAuth2Api"))?.oauthTokenData ?? {};
  const responseData = await highLevelApiRequest.call(
    this,
    "GET",
    "/opportunities/pipelines",
    void 0,
    { locationId }
  );
  const pipelines = responseData.pipelines;
  const options = pipelines.map((pipeline) => {
    const name = pipeline.name;
    const value = pipeline.id;
    return { name, value };
  });
  return options;
}
async function getContacts() {
  const { locationId } = (await this.getCredentials("highLevelOAuth2Api"))?.oauthTokenData ?? {};
  const responseData = await highLevelApiRequest.call(this, "GET", "/contacts/", void 0, {
    locationId
  });
  const contacts = responseData.contacts;
  const options = contacts.map((contact) => {
    const name = contact.email;
    const value = contact.id;
    return { name, value };
  });
  return options;
}
async function getUsers() {
  const { locationId } = (await this.getCredentials("highLevelOAuth2Api"))?.oauthTokenData ?? {};
  const responseData = await highLevelApiRequest.call(this, "GET", "/users/", void 0, {
    locationId
  });
  const users = responseData.users;
  const options = users.map((user) => {
    const name = user.name;
    const value = user.id;
    return { name, value };
  });
  return options;
}
async function addCustomFieldsPreSendAction(requestOptions) {
  const requestBody = requestOptions.body;
  if (requestBody && requestBody.customFields) {
    const rawCustomFields = requestBody.customFields;
    if (rawCustomFields && Array.isArray(rawCustomFields.values)) {
      const formattedCustomFields = rawCustomFields.values.map((field) => {
        const typedField = field;
        const fieldId = typedField.fieldId;
        if (typeof fieldId === "object" && fieldId !== null && "value" in fieldId) {
          return {
            id: fieldId.value,
            key: fieldId.cachedResultName ?? "default_key",
            field_value: typedField.fieldValue
          };
        } else {
          throw new import_n8n_workflow.ApplicationError("Error processing custom fields.");
        }
      });
      requestBody.customFields = formattedCustomFields;
    }
  }
  return requestOptions;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addCustomFieldsPreSendAction,
  addLocationIdPreSendAction,
  addNotePostReceiveAction,
  contactIdentifierPreSendAction,
  dateTimeToEpochPreSendAction,
  dateToIsoSupressMillis,
  dueDatePreSendAction,
  getContacts,
  getPipelineStages,
  getPipelines,
  getUsers,
  highLevelApiPagination,
  highLevelApiRequest,
  isEmailValid,
  isPhoneValid,
  splitTagsPreSendAction,
  taskPostReceiceAction,
  taskUpdatePreSendAction,
  validEmailAndPhonePreSendAction
});
//# sourceMappingURL=GenericFunctions.js.map