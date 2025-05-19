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
var AwsCertificateManager_node_exports = {};
__export(AwsCertificateManager_node_exports, {
  AwsCertificateManager: () => AwsCertificateManager
});
module.exports = __toCommonJS(AwsCertificateManager_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CertificateDescription = require("./CertificateDescription");
var import_GenericFunctions = require("./GenericFunctions");
class AwsCertificateManager {
  constructor() {
    this.description = {
      displayName: "AWS Certificate Manager",
      name: "awsCertificateManager",
      icon: "file:acm.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Sends data to AWS Certificate Manager",
      defaults: {
        name: "AWS Certificate Manager"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
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
            }
          ],
          default: "certificate"
        },
        // Certificate
        ...import_CertificateDescription.certificateOperations,
        ...import_CertificateDescription.certificateFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "certificate") {
          if (operation === "delete") {
            const certificateArn = this.getNodeParameter("certificateArn", i);
            const body = {
              CertificateArn: certificateArn
            };
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              "acm",
              "POST",
              "",
              JSON.stringify(body),
              qs,
              {
                "X-Amz-Target": "CertificateManager.DeleteCertificate",
                "Content-Type": "application/x-amz-json-1.1"
              }
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const certificateArn = this.getNodeParameter("certificateArn", i);
            const body = {
              CertificateArn: certificateArn
            };
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              "acm",
              "POST",
              "",
              JSON.stringify(body),
              qs,
              {
                "X-Amz-Target": "CertificateManager.GetCertificate",
                "Content-Type": "application/x-amz-json-1.1"
              }
            );
          }
          if (operation === "getMany") {
            const returnAll = this.getNodeParameter("returnAll", 0);
            const options = this.getNodeParameter("options", i);
            const body = {
              CertificateStatuses: [],
              Includes: {},
              MaxItems: 0
            };
            if (options.certificateStatuses) {
              body.CertificateStatuses = options.certificateStatuses;
            }
            if (options.certificateStatuses) {
              body.Includes.extendedKeyUsage = options.extendedKeyUsage;
            }
            if (options.keyTypes) {
              body.Includes.keyTypes = options.keyTypes;
            }
            if (options.keyUsage) {
              body.Includes.keyUsage = options.keyUsage;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.awsApiRequestAllItems.call(
                this,
                "CertificateSummaryList",
                "acm",
                "POST",
                "",
                "{}",
                qs,
                {
                  "X-Amz-Target": "CertificateManager.ListCertificates",
                  "Content-Type": "application/x-amz-json-1.1"
                }
              );
            } else {
              body.MaxItems = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.awsApiRequestREST.call(
                this,
                "acm",
                "POST",
                "",
                JSON.stringify(body),
                qs,
                {
                  "X-Amz-Target": "CertificateManager.ListCertificates",
                  "Content-Type": "application/x-amz-json-1.1"
                }
              );
              responseData = responseData.CertificateSummaryList;
            }
          }
          if (operation === "getMetadata") {
            const certificateArn = this.getNodeParameter("certificateArn", i);
            const body = {
              CertificateArn: certificateArn
            };
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              "acm",
              "POST",
              "",
              JSON.stringify(body),
              qs,
              {
                "X-Amz-Target": "CertificateManager.DescribeCertificate",
                "Content-Type": "application/x-amz-json-1.1"
              }
            );
            responseData = responseData.Certificate;
          }
          if (operation === "renew") {
            const certificateArn = this.getNodeParameter("certificateArn", i);
            const body = {
              CertificateArn: certificateArn
            };
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              "acm",
              "POST",
              "",
              JSON.stringify(body),
              qs,
              {
                "X-Amz-Target": "CertificateManager.RenewCertificate",
                "Content-Type": "application/x-amz-json-1.1"
              }
            );
            responseData = { success: true };
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
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
  AwsCertificateManager
});
//# sourceMappingURL=AwsCertificateManager.node.js.map