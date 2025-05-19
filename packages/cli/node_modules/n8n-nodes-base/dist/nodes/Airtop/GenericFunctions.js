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
  convertScreenshotToBinary: () => convertScreenshotToBinary,
  createSessionAndWindow: () => createSessionAndWindow,
  shouldCreateNewSession: () => shouldCreateNewSession,
  validateAirtopApiResponse: () => validateAirtopApiResponse,
  validateProfileName: () => validateProfileName,
  validateProxyUrl: () => validateProxyUrl,
  validateRequiredStringField: () => validateRequiredStringField,
  validateSaveProfileOnTermination: () => validateSaveProfileOnTermination,
  validateScreenResolution: () => validateScreenResolution,
  validateSessionAndWindowId: () => validateSessionAndWindowId,
  validateSessionId: () => validateSessionId,
  validateTimeoutMinutes: () => validateTimeoutMinutes,
  validateUrl: () => validateUrl
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_n8n_workflow2 = require("n8n-workflow");
var import_fields = require("./actions/common/fields");
var import_constants = require("./constants");
var import_transport = require("./transport");
function validateRequiredStringField(index, field, fieldName) {
  let value = this.getNodeParameter(field, index);
  value = (value || "").trim();
  const errorMessage = import_constants.ERROR_MESSAGES.REQUIRED_PARAMETER.replace("{{field}}", fieldName);
  if (!value) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), errorMessage, {
      itemIndex: index
    });
  }
  return value;
}
function validateSessionId(index) {
  let sessionId = this.getNodeParameter("sessionId", index, "");
  sessionId = (sessionId || "").trim();
  if (!sessionId) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.SESSION_ID_REQUIRED, {
      itemIndex: index
    });
  }
  return sessionId;
}
function validateSessionAndWindowId(index) {
  let sessionId = this.getNodeParameter("sessionId", index, "");
  let windowId = this.getNodeParameter("windowId", index, "");
  sessionId = (sessionId || "").trim();
  windowId = (windowId || "").trim();
  if (!sessionId) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.SESSION_ID_REQUIRED, {
      itemIndex: index
    });
  }
  if (!windowId) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.WINDOW_ID_REQUIRED, {
      itemIndex: index
    });
  }
  return {
    sessionId,
    windowId
  };
}
function validateProfileName(index) {
  let profileName = this.getNodeParameter("profileName", index);
  profileName = (profileName || "").trim();
  if (!profileName) {
    return profileName;
  }
  if (!/^[a-zA-Z0-9-]+$/.test(profileName)) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.PROFILE_NAME_INVALID, {
      itemIndex: index
    });
  }
  return profileName;
}
function validateTimeoutMinutes(index) {
  const timeoutMinutes = this.getNodeParameter(
    "timeoutMinutes",
    index,
    import_constants.DEFAULT_TIMEOUT_MINUTES
  );
  if (timeoutMinutes < import_constants.MIN_TIMEOUT_MINUTES || timeoutMinutes > import_constants.MAX_TIMEOUT_MINUTES) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.TIMEOUT_MINUTES_INVALID, {
      itemIndex: index
    });
  }
  return timeoutMinutes;
}
function validateUrl(index) {
  let url = this.getNodeParameter("url", index);
  url = (url || "").trim();
  if (!url) {
    return "";
  }
  if (!url.startsWith("http")) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.URL_INVALID, {
      itemIndex: index
    });
  }
  return url;
}
function validateProxyUrl(index, proxy) {
  let proxyUrl = this.getNodeParameter("proxyUrl", index, "");
  proxyUrl = (proxyUrl || "").trim();
  if (proxy !== "custom") {
    return "";
  }
  if (!proxyUrl) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.PROXY_URL_REQUIRED, {
      itemIndex: index
    });
  }
  if (!proxyUrl.startsWith("http")) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.PROXY_URL_INVALID, {
      itemIndex: index
    });
  }
  return proxyUrl;
}
function validateScreenResolution(index) {
  let screenResolution = this.getNodeParameter("screenResolution", index, "");
  screenResolution = (screenResolution || "").trim().toLowerCase();
  const regex = /^\d{3,4}x\d{3,4}$/;
  if (!screenResolution) {
    return "";
  }
  if (!regex.test(screenResolution)) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.SCREEN_RESOLUTION_INVALID, {
      itemIndex: index
    });
  }
  return screenResolution;
}
function validateSaveProfileOnTermination(index, profileName) {
  const saveProfileOnTermination = this.getNodeParameter(
    "saveProfileOnTermination",
    index,
    false
  );
  if (saveProfileOnTermination && !profileName) {
    throw new import_n8n_workflow2.NodeOperationError(this.getNode(), import_constants.ERROR_MESSAGES.PROFILE_NAME_REQUIRED, {
      itemIndex: index
    });
  }
  return saveProfileOnTermination;
}
function validateAirtopApiResponse(node, response) {
  if (response?.errors?.length) {
    const errorMessage = response.errors.map((error) => error.message).join("\n");
    throw new import_n8n_workflow.NodeApiError(node, {
      message: errorMessage
    });
  }
}
function convertScreenshotToBinary(screenshot) {
  const base64Data = screenshot.dataUrl.replace("data:image/jpeg;base64,", "");
  const buffer = Buffer.from(base64Data, "base64");
  return buffer;
}
function shouldCreateNewSession(index) {
  const sessionMode = this.getNodeParameter("sessionMode", index);
  return Boolean(sessionMode && sessionMode === import_fields.SESSION_MODE.NEW);
}
async function createSessionAndWindow(index) {
  const node = this.getNode();
  const noCodeEndpoint = `${import_constants.INTEGRATION_URL}/create-session`;
  const profileName = validateProfileName.call(this, index);
  const url = validateRequiredStringField.call(this, index, "url", "URL");
  const { sessionId } = await import_transport.apiRequest.call(this, "POST", noCodeEndpoint, {
    configuration: {
      profileName
    }
  });
  if (!sessionId) {
    throw new import_n8n_workflow.NodeApiError(node, {
      message: "Failed to create session",
      code: 500
    });
  }
  this.logger.info(`[${node.name}] Session successfully created.`);
  const windowResponse = await import_transport.apiRequest.call(this, "POST", `/sessions/${sessionId}/windows`, {
    url
  });
  const windowId = windowResponse?.data?.windowId;
  if (!windowId) {
    throw new import_n8n_workflow.NodeApiError(node, {
      message: "Failed to create window",
      code: 500
    });
  }
  this.logger.info(`[${node.name}] Window successfully created.`);
  return { sessionId, windowId };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertScreenshotToBinary,
  createSessionAndWindow,
  shouldCreateNewSession,
  validateAirtopApiResponse,
  validateProfileName,
  validateProxyUrl,
  validateRequiredStringField,
  validateSaveProfileOnTermination,
  validateScreenResolution,
  validateSessionAndWindowId,
  validateSessionId,
  validateTimeoutMinutes,
  validateUrl
});
//# sourceMappingURL=GenericFunctions.js.map