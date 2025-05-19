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
var VenafiTlsProtectDatacenter_node_exports = {};
__export(VenafiTlsProtectDatacenter_node_exports, {
  VenafiTlsProtectDatacenter: () => VenafiTlsProtectDatacenter
});
module.exports = __toCommonJS(VenafiTlsProtectDatacenter_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CertificateDescription = require("./CertificateDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_PolicyDescription = require("./PolicyDescription");
class VenafiTlsProtectDatacenter {
  constructor() {
    this.description = {
      displayName: "Venafi TLS Protect Datacenter",
      name: "venafiTlsProtectDatacenter",
      icon: "file:../venafi.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Venafi TLS Protect Datacenter",
      defaults: {
        name: "Venafi TLS Protect Datacenter"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "venafiTlsProtectDatacenterApi",
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
              name: "Certificate",
              value: "certificate"
            },
            {
              name: "Policy",
              value: "policy"
            }
          ],
          default: "certificate"
        },
        ...import_CertificateDescription.certificateOperations,
        ...import_CertificateDescription.certificateFields,
        ...import_PolicyDescription.policyOperations,
        ...import_PolicyDescription.policyFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "certificate") {
          if (operation === "create") {
            const policyDN = this.getNodeParameter("PolicyDN", i);
            const subject = this.getNodeParameter("Subject", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              PolicyDN: policyDN,
              Subject: subject
            };
            Object.assign(body, additionalFields);
            if (body.SubjectAltNamesUi) {
              body.SubjectAltNames = body.SubjectAltNamesUi.SubjectAltNamesValues;
              delete body.SubjectAltNamesUi;
            }
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "POST",
              "/vedsdk/Certificates/Request",
              body,
              qs
            );
          }
          if (operation === "delete") {
            const certificateId = this.getNodeParameter("certificateId", i);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "DELETE",
              `/vedsdk/Certificates/${certificateId}`,
              {},
              qs
            );
          }
          if (operation === "download") {
            const certificateDn = this.getNodeParameter("certificateDn", i);
            const includePrivateKey = this.getNodeParameter("includePrivateKey", i);
            const binaryProperty = this.getNodeParameter("binaryProperty", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              CertificateDN: certificateDn,
              Format: "Base64",
              IncludeChain: true
            };
            if (includePrivateKey) {
              const password = this.getNodeParameter("password", i);
              body.IncludePrivateKey = true;
              body.Password = password;
            }
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "POST",
              "/vedsdk/Certificates/Retrieve",
              body
            );
            const binaryData = await this.helpers.prepareBinaryData(
              Buffer.from(responseData.CertificateData, "base64"),
              responseData.Filename
            );
            responseData = {
              json: {},
              binary: {
                [binaryProperty]: binaryData
              }
            };
          }
          if (operation === "get") {
            const certificateId = this.getNodeParameter("certificateId", i);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "GET",
              `/vedsdk/Certificates/${certificateId}`,
              {},
              qs
            );
          }
          if (operation === "getMany") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.fields) {
              qs.OptionalFields = options.fields.join(",");
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.venafiApiRequestAllItems.call(
                this,
                "Certificates",
                "GET",
                "/vedsdk/Certificates",
                {},
                qs
              );
            } else {
              qs.Limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.venafiApiRequest.call(
                this,
                "GET",
                "/vedsdk/Certificates",
                {},
                qs
              );
              responseData = responseData.Certificates;
            }
          }
          if (operation === "renew") {
            const certificateDN = this.getNodeParameter("certificateDN", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              CertificateDN: certificateDN
            };
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "POST",
              "/vedsdk/Certificates/Renew",
              {},
              qs
            );
          }
        }
        if (resource === "policy") {
          if (operation === "get") {
            const policy = this.getNodeParameter("policyDn", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              PolicyDN: policy
            };
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "POST",
              "/vedsdk/Certificates/CheckPolicy",
              body,
              qs
            );
          }
        }
        returnData.push(
          ...this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            {
              itemData: { item: i }
            }
          )
        );
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VenafiTlsProtectDatacenter
});
//# sourceMappingURL=VenafiTlsProtectDatacenter.node.js.map