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
var Cortex_node_exports = {};
__export(Cortex_node_exports, {
  Cortex: () => Cortex
});
module.exports = __toCommonJS(Cortex_node_exports);
var changeCase = __toESM(require("change-case"));
var import_crypto = require("crypto");
var import_upperFirst = __toESM(require("lodash/upperFirst"));
var import_n8n_workflow = require("n8n-workflow");
var import_AnalyzerDescriptions = require("./AnalyzerDescriptions");
var import_GenericFunctions = require("./GenericFunctions");
var import_JobDescription = require("./JobDescription");
var import_ResponderDescription = require("./ResponderDescription");
class Cortex {
  constructor() {
    this.description = {
      displayName: "Cortex",
      name: "cortex",
      icon: "file:cortex.svg",
      group: ["transform"],
      subtitle: '={{$parameter["operation"]+ ": " + $parameter["resource"]}}',
      version: 1,
      description: "Apply the Cortex analyzer/responder on the given entity",
      defaults: {
        name: "Cortex"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "cortexApi",
          required: true
        }
      ],
      properties: [
        // Node properties which the user gets displayed and
        // can change on the node.
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Analyzer",
              value: "analyzer"
            },
            {
              name: "Job",
              value: "job"
            },
            {
              name: "Responder",
              value: "responder"
            }
          ],
          default: "analyzer",
          description: "Choose a resource",
          required: true
        },
        ...import_AnalyzerDescriptions.analyzersOperations,
        ...import_AnalyzerDescriptions.analyzerFields,
        ...import_ResponderDescription.respondersOperations,
        ...import_ResponderDescription.responderFields,
        ...import_JobDescription.jobOperations,
        ...import_JobDescription.jobFields
      ]
    };
    this.methods = {
      loadOptions: {
        async loadActiveAnalyzers() {
          const requestResult = await import_GenericFunctions.cortexApiRequest.call(
            this,
            "POST",
            "/analyzer/_search?range=all"
          );
          const returnData = [];
          for (const analyzer of requestResult) {
            returnData.push({
              name: analyzer.name,
              value: `${analyzer.id}::${analyzer.name}`,
              description: analyzer.description
            });
          }
          return returnData;
        },
        async loadActiveResponders() {
          const requestResult = await import_GenericFunctions.cortexApiRequest.call(this, "GET", "/responder");
          const returnData = [];
          for (const responder of requestResult) {
            returnData.push({
              name: responder.name,
              value: `${responder.id}::${responder.name}`,
              description: responder.description
            });
          }
          return returnData;
        },
        async loadObservableOptions() {
          const selectedAnalyzerId = this.getNodeParameter("analyzer").split("::")[0];
          const requestResult = await import_GenericFunctions.cortexApiRequest.call(
            this,
            "GET",
            `/analyzer/${selectedAnalyzerId}`
          );
          const returnData = [];
          for (const dataType of requestResult.dataTypeList) {
            returnData.push({
              name: (0, import_upperFirst.default)(dataType),
              value: dataType
            });
          }
          return returnData;
        },
        async loadDataTypeOptions() {
          const selectedResponderId = this.getNodeParameter("responder").split("::")[0];
          const requestResult = await import_GenericFunctions.cortexApiRequest.call(
            this,
            "GET",
            `/responder/${selectedResponderId}`
          );
          const returnData = [];
          for (const dataType of requestResult.dataTypeList) {
            returnData.push({
              value: dataType.split(":")[1],
              name: changeCase.capitalCase(dataType.split(":")[1])
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
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "analyzer") {
          if (operation === "execute") {
            let force = false;
            const analyzer = this.getNodeParameter("analyzer", i);
            const observableType = this.getNodeParameter("observableType", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const tlp = this.getNodeParameter("tlp", i);
            const body = {
              dataType: observableType,
              tlp
            };
            if (additionalFields.force === true) {
              force = true;
            }
            if (observableType === "file") {
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
              const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
              const fileBufferData = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
              const options = {
                formData: {
                  data: {
                    value: fileBufferData,
                    options: {
                      contentType: binaryData.mimeType,
                      filename: binaryData.fileName
                    }
                  },
                  _json: JSON.stringify({
                    dataType: observableType,
                    tlp
                  })
                }
              };
              responseData = await import_GenericFunctions.cortexApiRequest.call(
                this,
                "POST",
                `/analyzer/${analyzer.split("::")[0]}/run`,
                {},
                { force },
                "",
                options
              );
            } else {
              const observableValue = this.getNodeParameter("observableValue", i);
              body.data = observableValue;
              responseData = await import_GenericFunctions.cortexApiRequest.call(
                this,
                "POST",
                `/analyzer/${analyzer.split("::")[0]}/run`,
                body,
                { force }
              );
            }
            if (additionalFields.timeout) {
              responseData = await import_GenericFunctions.cortexApiRequest.call(
                this,
                "GET",
                `/job/${responseData.id}/waitreport`,
                {},
                { atMost: `${additionalFields.timeout}second` }
              );
            }
          }
        }
        if (resource === "job") {
          if (operation === "get") {
            const jobId = this.getNodeParameter("jobId", i);
            responseData = await import_GenericFunctions.cortexApiRequest.call(this, "GET", `/job/${jobId}`);
          }
          if (operation === "report") {
            const jobId = this.getNodeParameter("jobId", i);
            responseData = await import_GenericFunctions.cortexApiRequest.call(this, "GET", `/job/${jobId}/report`);
          }
        }
        if (resource === "responder") {
          if (operation === "execute") {
            const responderId = this.getNodeParameter("responder", i).split("::")[0];
            const entityType = this.getNodeParameter("entityType", i);
            const isJSON = this.getNodeParameter("jsonObject", i);
            let body;
            if (isJSON) {
              const entityJson = JSON.parse(this.getNodeParameter("objectData", i));
              body = {
                responderId,
                label: (0, import_GenericFunctions.getEntityLabel)(entityJson),
                dataType: `thehive:${entityType}`,
                data: entityJson,
                tlp: entityJson.tlp || 2,
                pap: entityJson.pap || 2,
                message: entityJson.message || "",
                parameters: []
              };
            } else {
              const values = this.getNodeParameter("parameters", i).values;
              body = {
                responderId,
                dataType: `thehive:${entityType}`,
                data: {
                  _type: entityType,
                  ...(0, import_GenericFunctions.prepareParameters)(values)
                }
              };
              if (entityType === "alert") {
                const artifacts = body.data.artifacts;
                if (artifacts) {
                  const artifactValues = artifacts.artifactValues;
                  if (artifactValues) {
                    const artifactData = [];
                    for (const artifactvalue of artifactValues) {
                      const element = {};
                      element.message = artifactvalue.message;
                      element.tags = (0, import_GenericFunctions.splitTags)(artifactvalue.tags);
                      element.dataType = artifactvalue.dataType;
                      element.data = artifactvalue.data;
                      if (artifactvalue.dataType === "file") {
                        const binaryPropertyName = artifactvalue.binaryProperty;
                        const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                        element.data = `${binaryData.fileName};${binaryData.mimeType};${binaryData.data}`;
                      }
                      artifactData.push(element);
                    }
                    body.data.artifacts = artifactData;
                  }
                }
              }
              if (entityType === "case_artifact") {
                if (body.data.dataType === "file") {
                  const binaryPropertyName = body.data.binaryPropertyName;
                  const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                  const fileBufferData = await this.helpers.getBinaryDataBuffer(
                    i,
                    binaryPropertyName
                  );
                  const sha256 = (0, import_crypto.createHash)("sha256").update(fileBufferData).digest("hex");
                  body.data.attachment = {
                    name: binaryData.fileName,
                    hashes: [
                      sha256,
                      (0, import_crypto.createHash)("sha1").update(fileBufferData).digest("hex"),
                      (0, import_crypto.createHash)("md5").update(fileBufferData).digest("hex")
                    ],
                    size: fileBufferData.byteLength,
                    contentType: binaryData.mimeType,
                    id: sha256
                  };
                  delete body.data.binaryPropertyName;
                }
              }
              body = {
                label: (0, import_GenericFunctions.getEntityLabel)(body.data),
                ...body
              };
            }
            responseData = await import_GenericFunctions.cortexApiRequest.call(
              this,
              "POST",
              `/responder/${responderId}/run`,
              body
            );
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
  Cortex
});
//# sourceMappingURL=Cortex.node.js.map