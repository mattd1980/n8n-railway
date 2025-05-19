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
var Spontit_node_exports = {};
__export(Spontit_node_exports, {
  Spontit: () => Spontit
});
module.exports = __toCommonJS(Spontit_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_PushDescription = require("./PushDescription");
class Spontit {
  constructor() {
    this.description = {
      displayName: "Spontit",
      name: "spontit",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:spontit.png",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Spontit API",
      defaults: {
        name: "Spontit"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "spontitApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Push",
              value: "push"
            }
          ],
          default: "push"
        },
        ...import_PushDescription.pushOperations,
        ...import_PushDescription.pushFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const timezone = this.getTimezone();
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "push") {
          if (operation === "create") {
            const content = this.getNodeParameter("content", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              content
            };
            Object.assign(body, additionalFields);
            if (body.pushToFollowers) {
              body.pushToFollowers = body.pushToFollowers.split(",");
            }
            if (body.pushToPhoneNumbers) {
              body.pushToPhoneNumbers = body.pushToPhoneNumbers.split(",");
            }
            if (body.pushToEmails) {
              body.pushToEmails = body.pushToEmails.split(",");
            }
            if (body.schedule) {
              body.scheduled = import_moment_timezone.default.tz(body.schedule, timezone).unix();
            }
            if (body.expirationStamp) {
              body.expirationStamp = import_moment_timezone.default.tz(body.expirationStamp, timezone).unix();
            }
            responseData = await import_GenericFunctions.spontitApiRequest.call(this, "POST", "/push", body);
            responseData = responseData.data;
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else if (responseData !== void 0) {
          returnData.push(responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Spontit
});
//# sourceMappingURL=Spontit.node.js.map