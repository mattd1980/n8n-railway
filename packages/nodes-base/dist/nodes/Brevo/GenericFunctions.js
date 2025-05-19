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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  BrevoNode: () => BrevoNode,
  BrevoWebhookApi: () => BrevoWebhookApi
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_mail_composer = __toESM(require("nodemailer/lib/mail-composer"));
var BrevoNode;
((BrevoNode2) => {
  const OVERRIDE_MAP_VALUES = {
    CATEGORY: "category",
    NORMAL: "boolean",
    TRANSACTIONAL: "id"
  };
  const OVERRIDE_MAP_TYPE = {
    CATEGORY: "category",
    NORMAL: "normal",
    TRANSACTIONAL: "transactional"
  };
  BrevoNode2.INTERCEPTORS = /* @__PURE__ */ new Map([
    [
      OVERRIDE_MAP_TYPE.CATEGORY,
      (body) => {
        body.type = OVERRIDE_MAP_VALUES.CATEGORY;
      }
    ],
    [
      OVERRIDE_MAP_TYPE.NORMAL,
      (body) => {
        body.type = OVERRIDE_MAP_VALUES.NORMAL;
      }
    ],
    [
      OVERRIDE_MAP_TYPE.TRANSACTIONAL,
      (body) => {
        body.type = OVERRIDE_MAP_VALUES.TRANSACTIONAL;
      }
    ]
  ]);
  let Validators;
  ((Validators2) => {
    function getFileName(itemIndex, mimeType, fileExt, fileName) {
      let ext = fileExt;
      if (fileExt === void 0) {
        ext = mimeType.split("/")[1];
      }
      let name = `${fileName}.${ext}`;
      if (fileName === void 0) {
        name = `file-${itemIndex}.${ext}`;
      }
      return name;
    }
    async function validateAndCompileAttachmentsData(requestOptions) {
      const dataPropertyList = this.getNodeParameter(
        "additionalFields.emailAttachments.attachment"
      );
      const { body } = requestOptions;
      const { attachment = [] } = body;
      try {
        const { binaryPropertyName } = dataPropertyList;
        const dataMappingList = binaryPropertyName.split(",");
        for (const attachmentDataName of dataMappingList) {
          const binaryData = this.helpers.assertBinaryData(attachmentDataName);
          const bufferFromIncomingData = await this.helpers.getBinaryDataBuffer(attachmentDataName);
          const {
            data: content,
            mimeType,
            fileName,
            fileExtension
          } = await this.helpers.prepareBinaryData(bufferFromIncomingData);
          const itemIndex = this.getItemIndex();
          const name = getFileName(
            itemIndex,
            mimeType,
            fileExtension,
            fileName ?? binaryData.fileName
          );
          attachment.push({ content, name });
        }
        Object.assign(body, { attachment });
        return requestOptions;
      } catch (err) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), err);
      }
    }
    Validators2.validateAndCompileAttachmentsData = validateAndCompileAttachmentsData;
    async function validateAndCompileTags(requestOptions) {
      const { tag } = this.getNodeParameter("additionalFields.emailTags.tags");
      const tags = tag.split(",").map((entry) => entry.trim()).filter((entry) => {
        return entry !== "";
      });
      const { body } = requestOptions;
      Object.assign(body, { tags });
      return requestOptions;
    }
    Validators2.validateAndCompileTags = validateAndCompileTags;
    function formatToEmailName(data) {
      const { address: email, name } = data;
      const result = { email };
      if (name !== void 0 && name !== "") {
        Object.assign(result, { name });
      }
      return { ...result };
    }
    function validateEmailStrings(input) {
      const composer = new import_mail_composer.default({ ...input });
      const addressFields = composer.compile().getAddresses();
      const fieldFetcher = /* @__PURE__ */ new Map([
        [
          "bcc",
          () => {
            return addressFields.bcc?.map(formatToEmailName);
          }
        ],
        [
          "cc",
          () => {
            return addressFields.cc?.map(formatToEmailName);
          }
        ],
        [
          "from",
          () => {
            return addressFields.from?.map(formatToEmailName);
          }
        ],
        [
          "reply-to",
          () => {
            return addressFields["reply-to"]?.map(formatToEmailName);
          }
        ],
        [
          "sender",
          () => {
            return addressFields.sender?.map(formatToEmailName)[0];
          }
        ],
        [
          "to",
          () => {
            return addressFields.to?.map(formatToEmailName);
          }
        ]
      ]);
      const result = {};
      Object.keys(input).reduce((obj, key) => {
        const getter = fieldFetcher.get(key);
        const value = getter();
        obj[key] = value;
        return obj;
      }, result);
      return result;
    }
    async function validateAndCompileCCEmails(requestOptions) {
      const ccData = this.getNodeParameter(
        "additionalFields.receipientsCC.receipientCc"
      );
      const { cc } = ccData;
      const { body } = requestOptions;
      const data = validateEmailStrings({ cc });
      Object.assign(body, data);
      return requestOptions;
    }
    Validators2.validateAndCompileCCEmails = validateAndCompileCCEmails;
    async function validateAndCompileBCCEmails(requestOptions) {
      const bccData = this.getNodeParameter(
        "additionalFields.receipientsBCC.receipientBcc"
      );
      const { bcc } = bccData;
      const { body } = requestOptions;
      const data = validateEmailStrings({ bcc });
      Object.assign(body, data);
      return requestOptions;
    }
    Validators2.validateAndCompileBCCEmails = validateAndCompileBCCEmails;
    async function validateAndCompileReceipientEmails(requestOptions) {
      const to = this.getNodeParameter("receipients");
      const { body } = requestOptions;
      const data = validateEmailStrings({ to });
      Object.assign(body, data);
      return requestOptions;
    }
    Validators2.validateAndCompileReceipientEmails = validateAndCompileReceipientEmails;
    async function validateAndCompileSenderEmail(requestOptions) {
      const sender = this.getNodeParameter("sender");
      const { body } = requestOptions;
      const data = validateEmailStrings({ sender });
      Object.assign(body, data);
      return requestOptions;
    }
    Validators2.validateAndCompileSenderEmail = validateAndCompileSenderEmail;
    async function validateAndCompileTemplateParameters(requestOptions) {
      const parameterData = this.getNodeParameter(
        "additionalFields.templateParameters.parameterValues"
      );
      const { body } = requestOptions;
      const { parameters } = parameterData;
      const params = parameters.split(",").filter((parameter) => {
        return parameter.split("=").length === 2;
      }).map((parameter) => {
        const [key, value] = parameter.split("=");
        return {
          [key]: value
        };
      }).reduce((obj, cObj) => {
        Object.assign(obj, cObj);
        return obj;
      }, {});
      Object.assign(body, { params });
      return requestOptions;
    }
    Validators2.validateAndCompileTemplateParameters = validateAndCompileTemplateParameters;
  })(Validators = BrevoNode2.Validators || (BrevoNode2.Validators = {}));
})(BrevoNode || (BrevoNode = {}));
var BrevoWebhookApi;
((BrevoWebhookApi2) => {
  const credentialsName = "sendInBlueApi";
  const baseURL = "https://api.brevo.com/v3";
  BrevoWebhookApi2.supportedAuthMap = /* @__PURE__ */ new Map([
    [
      "apiKey",
      async (ref) => {
        const credentials = await ref.getCredentials(credentialsName);
        return credentials.sharedSecret;
      }
    ]
  ]);
  BrevoWebhookApi2.fetchWebhooks = async (ref, type) => {
    const endpoint = `${baseURL}/webhooks?type=${type}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      uri: endpoint
    };
    const webhooks = await ref.helpers.requestWithAuthentication.call(
      ref,
      credentialsName,
      options
    );
    return await (0, import_n8n_workflow.jsonParse)(webhooks);
  };
  BrevoWebhookApi2.createWebHook = async (ref, type, events, url) => {
    const endpoint = `${baseURL}/webhooks`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      uri: endpoint,
      body: {
        events,
        type,
        url
      }
    };
    const webhookId = await ref.helpers.requestWithAuthentication.call(
      ref,
      credentialsName,
      options
    );
    return await (0, import_n8n_workflow.jsonParse)(webhookId);
  };
  BrevoWebhookApi2.deleteWebhook = async (ref, webhookId) => {
    const endpoint = `${baseURL}/webhooks/${webhookId}`;
    const body = {};
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      },
      uri: endpoint,
      body
    };
    return await ref.helpers.requestWithAuthentication.call(ref, credentialsName, options);
  };
})(BrevoWebhookApi || (BrevoWebhookApi = {}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BrevoNode,
  BrevoWebhookApi
});
//# sourceMappingURL=GenericFunctions.js.map