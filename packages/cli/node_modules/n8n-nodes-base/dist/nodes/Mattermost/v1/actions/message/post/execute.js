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
var execute_exports = {};
__export(execute_exports, {
  post: () => post
});
module.exports = __toCommonJS(execute_exports);
var import_transport = require("../../../transport");
async function post(index) {
  const body = {};
  const qs = {};
  const requestMethod = "POST";
  const endpoint = "posts";
  body.channel_id = this.getNodeParameter("channelId", index);
  body.message = this.getNodeParameter("message", index);
  const attachments = this.getNodeParameter("attachments", index, []);
  for (const attachment of attachments) {
    if (attachment.fields !== void 0) {
      if (attachment.fields.item !== void 0) {
        attachment.fields = attachment.fields.item;
      } else {
        delete attachment.fields;
      }
    }
  }
  for (const attachment of attachments) {
    if (attachment.actions !== void 0) {
      if (attachment.actions.item !== void 0) {
        attachment.actions = attachment.actions.item;
      } else {
        delete attachment.actions;
      }
    }
  }
  for (const attachment of attachments) {
    if (Array.isArray(attachment.actions)) {
      for (const attaction of attachment.actions) {
        if (attaction.type === "button") {
          delete attaction.type;
        }
        if (attaction.data_source === "custom") {
          delete attaction.data_source;
        }
        if (attaction.options) {
          attaction.options = attaction.options.option;
        }
        if (attaction.integration.item !== void 0) {
          attaction.integration = attaction.integration.item;
          if (Array.isArray(attaction.integration.context.property)) {
            const tmpcontex = {};
            for (const attactionintegprop of attaction.integration.context.property) {
              Object.assign(tmpcontex, { [attactionintegprop.name]: attactionintegprop.value });
            }
            delete attaction.integration.context;
            attaction.integration.context = tmpcontex;
          }
        }
      }
    }
  }
  body.props = {
    attachments
  };
  const otherOptions = this.getNodeParameter("otherOptions", index);
  Object.assign(body, otherOptions);
  const responseData = await import_transport.apiRequest.call(this, requestMethod, endpoint, body, qs);
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  post
});
//# sourceMappingURL=execute.js.map