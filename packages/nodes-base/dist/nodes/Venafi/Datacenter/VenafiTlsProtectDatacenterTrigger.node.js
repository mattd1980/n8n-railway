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
var VenafiTlsProtectDatacenterTrigger_node_exports = {};
__export(VenafiTlsProtectDatacenterTrigger_node_exports, {
  VenafiTlsProtectDatacenterTrigger: () => VenafiTlsProtectDatacenterTrigger
});
module.exports = __toCommonJS(VenafiTlsProtectDatacenterTrigger_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class VenafiTlsProtectDatacenterTrigger {
  constructor() {
    this.description = {
      displayName: "Venafi TLS Protect Datacenter Trigger",
      name: "venafiTlsProtectDatacenterTrigger",
      icon: "file:../venafi.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["triggerOn"]}}',
      description: "Starts the workflow when Venafi events occur",
      defaults: {
        name: "Venafi TLS Protect Datacenter\u200B"
      },
      credentials: [
        {
          name: "venafiTlsProtectDatacenterApi",
          required: true
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Trigger On",
          name: "triggerOn",
          type: "options",
          options: [
            {
              name: "Certificate Expired",
              value: "certificateExpired"
            }
          ],
          required: true,
          default: "certificateExpired"
        }
      ]
    };
  }
  async poll() {
    const webhookData = this.getWorkflowStaticData("node");
    const qs = {};
    const now = (0, import_moment_timezone.default)().format();
    qs.ValidToGreater = webhookData.lastTimeChecked || now;
    qs.ValidToLess = now;
    const { Certificates: certificates } = await import_GenericFunctions.venafiApiRequest.call(
      this,
      "GET",
      "/vedsdk/certificates",
      {},
      qs
    );
    webhookData.lastTimeChecked = qs.ValidToLess;
    if (Array.isArray(certificates) && certificates.length !== 0) {
      return [this.helpers.returnJsonArray(certificates)];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VenafiTlsProtectDatacenterTrigger
});
//# sourceMappingURL=VenafiTlsProtectDatacenterTrigger.node.js.map