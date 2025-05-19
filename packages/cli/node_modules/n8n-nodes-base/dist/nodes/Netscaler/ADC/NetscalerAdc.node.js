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
var NetscalerAdc_node_exports = {};
__export(NetscalerAdc_node_exports, {
  NetscalerAdc: () => NetscalerAdc
});
module.exports = __toCommonJS(NetscalerAdc_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CertificateDescription = require("./CertificateDescription");
var import_FileDescription = require("./FileDescription");
var import_GenericFunctions = require("./GenericFunctions");
class NetscalerAdc {
  constructor() {
    this.description = {
      displayName: "Netscaler ADC",
      // This prevents a breaking change
      name: "citrixAdc",
      icon: { light: "file:netscaler.svg", dark: "file:netscaler.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Netscaler ADC API",
      defaults: {
        name: "Netscaler ADC"
      },
      credentials: [
        {
          name: "citrixAdcApi",
          required: true
        }
      ],
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
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
              name: "File",
              value: "file"
            }
          ],
          default: "file"
        },
        ...import_CertificateDescription.certificateDescription,
        ...import_FileDescription.fileDescription
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData = {};
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "file") {
          if (operation === "upload") {
            const fileLocation = this.getNodeParameter("fileLocation", i);
            const binaryProperty = this.getNodeParameter("binaryProperty", i);
            const options = this.getNodeParameter("options", i);
            const endpoint = "/config/systemfile";
            const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
            const buffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
            const body = {
              systemfile: {
                filename: binaryData.fileName,
                filecontent: Buffer.from(buffer).toString("base64"),
                filelocation: fileLocation,
                fileencoding: "BASE64"
              }
            };
            if (options.fileName) {
              body.systemfile.filename = options.fileName;
            }
            await import_GenericFunctions.netscalerADCApiRequest.call(this, "POST", endpoint, body);
            responseData = { success: true };
          }
          if (operation === "delete") {
            const fileName = this.getNodeParameter("fileName", i);
            const fileLocation = this.getNodeParameter("fileLocation", i);
            const endpoint = `/config/systemfile?args=filename:${fileName},filelocation:${encodeURIComponent(
              fileLocation
            )}`;
            await import_GenericFunctions.netscalerADCApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          }
          if (operation === "download") {
            const fileName = this.getNodeParameter("fileName", i);
            const fileLocation = this.getNodeParameter("fileLocation", i);
            const binaryProperty = this.getNodeParameter("binaryProperty", i);
            const endpoint = `/config/systemfile?args=filename:${fileName},filelocation:${encodeURIComponent(
              fileLocation
            )}`;
            const { systemfile } = await import_GenericFunctions.netscalerADCApiRequest.call(this, "GET", endpoint);
            const file = systemfile[0];
            const binaryData = await this.helpers.prepareBinaryData(
              Buffer.from(file.filecontent, "base64"),
              file.filename
            );
            responseData = {
              json: file,
              binary: {
                [binaryProperty]: binaryData
              }
            };
          }
        }
        if (resource === "certificate") {
          if (operation === "create") {
            const certificateFileName = this.getNodeParameter("certificateFileName", i);
            const certificateFormat = this.getNodeParameter("certificateFormat", i);
            const certificateType = this.getNodeParameter("certificateType", i);
            const certificateRequestFileName = this.getNodeParameter(
              "certificateRequestFileName",
              i
            );
            const additionalFields = this.getNodeParameter("additionalFields", i, {});
            let body = {
              reqfile: certificateRequestFileName,
              certfile: certificateFileName,
              certform: certificateFormat,
              certType: certificateType,
              ...additionalFields
            };
            if (certificateType === "ROOT_CERT") {
              const privateKeyFileName = this.getNodeParameter("privateKeyFileName", i);
              body = {
                ...body,
                keyfile: privateKeyFileName
              };
            } else {
              const caCertificateFileName = this.getNodeParameter(
                "caCertificateFileName",
                i
              );
              const caCertificateFileFormat = this.getNodeParameter(
                "caCertificateFileFormat",
                i
              );
              const caPrivateKeyFileFormat = this.getNodeParameter(
                "caPrivateKeyFileFormat",
                i
              );
              const caPrivateKeyFileName = this.getNodeParameter(
                "caPrivateKeyFileName",
                i
              );
              const caSerialFileNumber = this.getNodeParameter("caSerialFileNumber", i);
              body = {
                ...body,
                cacert: caCertificateFileName,
                cacertform: caCertificateFileFormat,
                cakey: caPrivateKeyFileName,
                cakeyform: caPrivateKeyFileFormat,
                caserial: caSerialFileNumber
              };
            }
            const endpoint = "/config/sslcert?action=create";
            await import_GenericFunctions.netscalerADCApiRequest.call(this, "POST", endpoint, { sslcert: body });
            responseData = { success: true };
          }
          if (operation === "install") {
            const certificateKeyPairName = this.getNodeParameter(
              "certificateKeyPairName",
              i
            );
            const certificateFileName = this.getNodeParameter("certificateFileName", i);
            const privateKeyFileName = this.getNodeParameter("privateKeyFileName", i);
            const certificateFormat = this.getNodeParameter("certificateFormat", i);
            const notifyExpiration = this.getNodeParameter("notifyExpiration", i);
            const body = {
              cert: certificateFileName,
              certkey: certificateKeyPairName,
              key: privateKeyFileName,
              inform: certificateFormat
            };
            if (certificateFormat === "PEM") {
              const password = this.getNodeParameter("password", i);
              const certificateBundle = this.getNodeParameter("certificateBundle", i);
              Object.assign(body, {
                passplain: password,
                bundle: certificateBundle ? "YES" : "NO"
              });
            }
            if (notifyExpiration) {
              const notificationPeriod = this.getNodeParameter("notificationPeriod", i);
              Object.assign(body, {
                expirymonitor: "ENABLED",
                notificationperiod: notificationPeriod
              });
            }
            const endpoint = "/config/sslcertkey";
            await import_GenericFunctions.netscalerADCApiRequest.call(this, "POST", endpoint, { sslcertkey: body });
            responseData = { success: true };
          }
        }
        returnData.push(
          ...this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), {
            itemData: { item: i }
          })
        );
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.toString() });
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
  NetscalerAdc
});
//# sourceMappingURL=NetscalerAdc.node.js.map