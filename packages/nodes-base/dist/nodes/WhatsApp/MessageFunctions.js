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
var MessageFunctions_exports = {};
__export(MessageFunctions_exports, {
  addTemplateComponents: () => addTemplateComponents,
  cleanPhoneNumber: () => cleanPhoneNumber,
  componentsRequest: () => componentsRequest,
  mediaUploadFromItem: () => mediaUploadFromItem,
  sanitizePhoneNumber: () => sanitizePhoneNumber,
  sendErrorPostReceive: () => sendErrorPostReceive,
  setType: () => setType,
  templateInfo: () => templateInfo
});
module.exports = __toCommonJS(MessageFunctions_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_MediaFunctions = require("./MediaFunctions");
async function addTemplateComponents(requestOptions) {
  const params = this.getNodeParameter("templateParameters");
  if (!params?.parameter) {
    return requestOptions;
  }
  const components = [
    {
      type: "body",
      parameters: params.parameter
    }
  ];
  if (!requestOptions.body) {
    requestOptions.body = {};
  }
  (0, import_set.default)(requestOptions.body, "template.components", components);
  return requestOptions;
}
async function setType(requestOptions) {
  const operation = this.getNodeParameter("operation");
  const messageType = this.getNodeParameter("messageType", null);
  let actualType = messageType;
  if (operation === "sendTemplate") {
    actualType = "template";
  }
  if (requestOptions.body) {
    Object.assign(requestOptions.body, { type: actualType });
  }
  return requestOptions;
}
async function mediaUploadFromItem(requestOptions) {
  const uploadData = await import_MediaFunctions.getUploadFormData.call(this);
  const phoneNumberId = this.getNodeParameter("phoneNumberId");
  const result = await this.helpers.httpRequestWithAuthentication.call(this, "whatsAppApi", {
    url: `/${phoneNumberId}/media`,
    baseURL: requestOptions.baseURL,
    method: "POST",
    body: uploadData.formData
  });
  const operation = this.getNodeParameter("messageType");
  if (!requestOptions.body) {
    requestOptions.body = {};
  }
  (0, import_set.default)(requestOptions.body, [operation, "id"], result.id);
  if (operation === "document") {
    (0, import_set.default)(requestOptions.body, [operation, "filename"], uploadData.fileName);
  }
  return requestOptions;
}
async function templateInfo(requestOptions) {
  const template = this.getNodeParameter("template");
  const [name, language] = template.split("|");
  if (!requestOptions.body) {
    requestOptions.body = {};
  }
  (0, import_set.default)(requestOptions.body, "template.name", name);
  (0, import_set.default)(requestOptions.body, "template.language.code", language);
  return requestOptions;
}
async function componentsRequest(requestOptions) {
  const components = this.getNodeParameter("components");
  const componentsRet = [];
  if (!components?.component) {
    return requestOptions;
  }
  for (const component of components.component) {
    const comp = {
      type: component.type
    };
    if (component.type === "body") {
      comp.parameters = (component.bodyParameters.parameter || []).map((i) => {
        if (i.type === "text") {
          return i;
        } else if (i.type === "currency") {
          return {
            type: "currency",
            currency: {
              code: i.code,
              fallback_value: i.fallback_value,
              amount_1000: i.amount_1000 * 1e3
            }
          };
        } else if (i.type === "date_time") {
          return {
            type: "date_time",
            date_time: {
              fallback_value: i.date_time
            }
          };
        }
      });
    } else if (component.type === "button") {
      comp.index = component.index?.toString();
      comp.sub_type = component.sub_type;
      comp.parameters = [component.buttonParameters.parameter];
    } else if (component.type === "header") {
      comp.parameters = component.headerParameters.parameter.map((i) => {
        if (i.type === "image") {
          return {
            type: "image",
            image: {
              link: i.imageLink
            }
          };
        }
        return i;
      });
    }
    componentsRet.push(comp);
  }
  if (!requestOptions.body) {
    requestOptions.body = {};
  }
  (0, import_set.default)(requestOptions.body, "template.components", componentsRet);
  return requestOptions;
}
const sanitizePhoneNumber = (phoneNumber) => phoneNumber.replace(/[\-\(\)\+]/g, "");
async function cleanPhoneNumber(requestOptions) {
  const phoneNumber = sanitizePhoneNumber(this.getNodeParameter("recipientPhoneNumber"));
  if (!requestOptions.body) {
    requestOptions.body = {};
  }
  (0, import_set.default)(requestOptions.body, "to", phoneNumber);
  return requestOptions;
}
async function sendErrorPostReceive(data, response) {
  if (response.statusCode === 500) {
    throw new import_n8n_workflow.NodeApiError(
      this.getNode(),
      {},
      {
        message: "Sending failed",
        description: "If you\u2019re sending to a new test number, try sending a message to it from within the Meta developer portal first.",
        httpCode: "500"
      }
    );
  } else if (response.statusCode === 400) {
    const error = { ...response.body.error };
    error.message = error.message.replace(/^\(#\d+\) /, "");
    const messageType = this.getNodeParameter("messageType", "media");
    if (error.message.endsWith("is not a valid whatsapp business account media attachment ID")) {
      throw new import_n8n_workflow.NodeApiError(
        this.getNode(),
        { error },
        {
          message: `Invalid ${messageType} ID`,
          description: error.message,
          httpCode: "400"
        }
      );
    } else if (error.message.endsWith("is not a valid URI.")) {
      throw new import_n8n_workflow.NodeApiError(
        this.getNode(),
        { error },
        {
          message: `Invalid ${messageType} URL`,
          description: error.message,
          httpCode: "400"
        }
      );
    }
    throw new import_n8n_workflow.NodeApiError(
      this.getNode(),
      { ...response, body: { error } },
      {}
    );
  } else if (response.statusCode > 399) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response);
  }
  return data;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addTemplateComponents,
  cleanPhoneNumber,
  componentsRequest,
  mediaUploadFromItem,
  sanitizePhoneNumber,
  sendErrorPostReceive,
  setType,
  templateInfo
});
//# sourceMappingURL=MessageFunctions.js.map