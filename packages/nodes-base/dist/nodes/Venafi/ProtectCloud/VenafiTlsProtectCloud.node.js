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
var VenafiTlsProtectCloud_node_exports = {};
__export(VenafiTlsProtectCloud_node_exports, {
  VenafiTlsProtectCloud: () => VenafiTlsProtectCloud
});
module.exports = __toCommonJS(VenafiTlsProtectCloud_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CertificateDescription = require("./CertificateDescription");
var import_CertificateRequestDescription = require("./CertificateRequestDescription");
var import_GenericFunctions = require("./GenericFunctions");
class VenafiTlsProtectCloud {
  constructor() {
    this.description = {
      displayName: "Venafi TLS Protect Cloud",
      name: "venafiTlsProtectCloud",
      icon: "file:../venafi.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Venafi TLS Protect Cloud API",
      defaults: {
        name: "Venafi TLS Protect Cloud"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "venafiTlsProtectCloudApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          noDataExpression: true,
          type: "options",
          options: [
            {
              name: "Certificate",
              value: "certificate"
            },
            {
              name: "Certificate Request",
              value: "certificateRequest"
            }
          ],
          default: "certificateRequest"
        },
        ...import_CertificateDescription.certificateOperations,
        ...import_CertificateDescription.certificateFields,
        ...import_CertificateRequestDescription.certificateRequestOperations,
        ...import_CertificateRequestDescription.certificateRequestFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getApplications() {
          const returnData = [];
          const { applications } = await import_GenericFunctions.venafiApiRequest.call(
            this,
            "GET",
            "/outagedetection/v1/applications"
          );
          for (const application of applications) {
            returnData.push({
              name: application.name,
              value: application.id
            });
          }
          return returnData;
        },
        async getCertificateIssuingTemplates() {
          const returnData = [];
          const currentApplication = this.getCurrentNodeParameter("applicationId");
          const { certificateIssuingTemplateAliasIdMap } = await import_GenericFunctions.venafiApiRequest.call(
            this,
            "GET",
            `/outagedetection/v1/applications/${currentApplication}`
          );
          for (const [templateName, templateId] of Object.entries(
            certificateIssuingTemplateAliasIdMap
          )) {
            returnData.push({
              name: templateName,
              value: templateId
            });
          }
          return returnData;
        }
      }
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
        if (resource === "certificateRequest") {
          if (operation === "create") {
            const applicationId = this.getNodeParameter("applicationId", i);
            const certificateIssuingTemplateId = this.getNodeParameter(
              "certificateIssuingTemplateId",
              i
            );
            const options = this.getNodeParameter("options", i);
            const generateCsr = this.getNodeParameter("generateCsr", i);
            const body = {
              applicationId,
              certificateIssuingTemplateId
            };
            if (generateCsr) {
              const commonName = this.getNodeParameter("commonName", i);
              const additionalFields = this.getNodeParameter("additionalFields", i);
              const keyTypeDetails = {};
              const csrAttributes = {};
              const subjectAltNamesByType = {};
              body.isVaaSGenerated = true;
              csrAttributes.commonName = commonName;
              if (additionalFields.organization) {
                csrAttributes.organization = additionalFields.organization;
              }
              if (additionalFields.organizationalUnits) {
                csrAttributes.organizationalUnits = additionalFields.organizationalUnits;
              }
              if (additionalFields.locality) {
                csrAttributes.locality = additionalFields.locality;
              }
              if (additionalFields.state) {
                csrAttributes.state = additionalFields.state;
              }
              if (additionalFields.country) {
                csrAttributes.country = additionalFields.country;
              }
              body.csrAttributes = csrAttributes;
              if (additionalFields.keyType) {
                keyTypeDetails.keyType = additionalFields.keyType;
              }
              if (additionalFields.keyCurve) {
                keyTypeDetails.keyCurve = additionalFields.keyCurve;
              }
              if (additionalFields.keyLength) {
                keyTypeDetails.keyLength = additionalFields.keyLength;
              }
              if (Object.keys(keyTypeDetails).length !== 0) {
                body.csrAttributes.keyTypeParameters = keyTypeDetails;
              }
              if (additionalFields.SubjectAltNamesUi) {
                for (const key of additionalFields.SubjectAltNamesUi.SubjectAltNamesValues) {
                  if (key.Typename === "dnsNames") {
                    subjectAltNamesByType.dnsNames ? subjectAltNamesByType.dnsNames.push(key.name) : subjectAltNamesByType.dnsNames = [key.name];
                  }
                }
              }
              if (Object.keys(subjectAltNamesByType).length !== 0) {
                body.csrAttributes.subjectAlternativeNamesByType = subjectAltNamesByType;
              }
            } else {
              const certificateSigningRequest = this.getNodeParameter(
                "certificateSigningRequest",
                i
              );
              body.isVaaSGenerated = false;
              body.certificateSigningRequest = certificateSigningRequest;
            }
            Object.assign(body, options);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "POST",
              "/outagedetection/v1/certificaterequests",
              body,
              qs
            );
            responseData = responseData.certificateRequests;
          }
          if (operation === "get") {
            const certificateId = this.getNodeParameter("certificateRequestId", i);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "GET",
              `/outagedetection/v1/certificaterequests/${certificateId}`,
              {},
              qs
            );
          }
          if (operation === "getMany") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.venafiApiRequestAllItems.call(
                this,
                "certificateRequests",
                "GET",
                "/outagedetection/v1/certificaterequests",
                {},
                qs
              );
            } else {
              const limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.venafiApiRequest.call(
                this,
                "GET",
                "/outagedetection/v1/certificaterequests",
                {},
                qs
              );
              responseData = responseData.certificateRequests.splice(0, limit);
            }
          }
        }
        if (resource === "certificate") {
          if (operation === "delete") {
            const certificateId = this.getNodeParameter("certificateId", i);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "POST",
              "/outagedetection/v1/certificates/deletion",
              { certificateIds: [certificateId] }
            );
            responseData = responseData.certificates;
          }
          if (operation === "download") {
            const certificateId = this.getNodeParameter("certificateId", i);
            const binaryProperty = this.getNodeParameter("binaryProperty", i);
            const downloadItem = this.getNodeParameter("downloadItem", i);
            const options = this.getNodeParameter("options", i);
            if (downloadItem === "certificate") {
              Object.assign(qs, options);
              responseData = await import_GenericFunctions.venafiApiRequest.call(
                this,
                "GET",
                `/outagedetection/v1/certificates/${certificateId}/contents`,
                {},
                qs,
                { encoding: null, json: false, resolveWithFullResponse: true, cert: true }
              );
            } else {
              const exportFormat = this.getNodeParameter("keystoreType", i);
              const body = {
                exportFormat
              };
              const privateKeyPassphrase = this.getNodeParameter(
                "privateKeyPassphrase",
                i
              );
              const certificateLabel = this.getNodeParameter("certificateLabel", i);
              body.certificateLabel = certificateLabel;
              let keystorePassphrase = "";
              if (exportFormat === "JKS") {
                keystorePassphrase = this.getNodeParameter("keystorePassphrase", i);
              }
              const encryptedValues = await import_GenericFunctions.encryptPassphrase.call(
                this,
                certificateId,
                privateKeyPassphrase,
                keystorePassphrase
              );
              body.encryptedPrivateKeyPassphrase = encryptedValues[0];
              if (exportFormat === "JKS") {
                body.encryptedKeystorePassphrase = encryptedValues[1];
              }
              responseData = await import_GenericFunctions.venafiApiRequest.call(
                this,
                "POST",
                `/outagedetection/v1/certificates/${certificateId}/keystore`,
                body,
                {},
                { encoding: null, json: false, resolveWithFullResponse: true }
              );
            }
            const contentDisposition = responseData.headers["content-disposition"];
            const fileNameRegex = /(?<=filename=").*\b/;
            const match = fileNameRegex.exec(contentDisposition);
            let fileName = "";
            if (match !== null) {
              fileName = match[0];
            }
            const binaryData = await this.helpers.prepareBinaryData(
              Buffer.from(responseData.body),
              fileName
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
              `/outagedetection/v1/certificates/${certificateId}`,
              {},
              qs
            );
          }
          if (operation === "getMany") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            Object.assign(qs, filters);
            if (returnAll) {
              responseData = await import_GenericFunctions.venafiApiRequestAllItems.call(
                this,
                "certificates",
                "GET",
                "/outagedetection/v1/certificates",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.venafiApiRequest.call(
                this,
                "GET",
                "/outagedetection/v1/certificates",
                {},
                qs
              );
              responseData = responseData.certificates;
            }
          }
          if (operation === "renew") {
            const applicationId = this.getNodeParameter("applicationId", i);
            const certificateIssuingTemplateId = this.getNodeParameter(
              "certificateIssuingTemplateId",
              i
            );
            const certificateSigningRequest = this.getNodeParameter(
              "certificateSigningRequest",
              i
            );
            const existingCertificateId = this.getNodeParameter(
              "existingCertificateId",
              i
            );
            const options = this.getNodeParameter("options", i);
            const body = {
              certificateSigningRequest,
              certificateIssuingTemplateId,
              applicationId,
              existingCertificateId
            };
            Object.assign(body, options);
            responseData = await import_GenericFunctions.venafiApiRequest.call(
              this,
              "POST",
              "/outagedetection/v1/certificaterequests",
              body,
              qs
            );
            responseData = responseData.certificateRequests;
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
  VenafiTlsProtectCloud
});
//# sourceMappingURL=VenafiTlsProtectCloud.node.js.map