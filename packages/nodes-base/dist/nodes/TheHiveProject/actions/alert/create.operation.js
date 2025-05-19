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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(create_operation_exports);
var import_form_data = __toESM(require("form-data"));
var import_set = __toESM(require("lodash/set"));
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Fields",
    name: "alertFields",
    type: "resourceMapper",
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    noDataExpression: true,
    required: true,
    typeOptions: {
      resourceMapper: {
        resourceMapperMethod: "getAlertFields",
        mode: "add",
        valuesLabel: "Fields"
      }
    }
  },
  {
    displayName: "Observables",
    name: "observableUi",
    type: "fixedCollection",
    placeholder: "Add Observable",
    default: {},
    typeOptions: {
      multipleValues: true
    },
    options: [
      {
        displayName: "Values",
        name: "values",
        values: [
          import_descriptions.observableTypeOptions,
          {
            displayName: "Data",
            name: "data",
            type: "string",
            displayOptions: {
              hide: {
                dataType: ["file"]
              }
            },
            default: ""
          },
          {
            displayName: "Input Binary Field",
            name: "binaryProperty",
            type: "string",
            hint: "The name of the input binary field containing the file to be written",
            displayOptions: {
              show: {
                dataType: ["file"]
              }
            },
            default: "data"
          },
          {
            displayName: "Message",
            name: "message",
            type: "string",
            default: ""
          },
          {
            displayName: "Tags",
            name: "tags",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["alert"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i, item) {
  let responseData = [];
  let inputData = {};
  const dataMode = this.getNodeParameter("alertFields.mappingMode", i);
  if (dataMode === "autoMapInputData") {
    const schema = this.getNodeParameter("alertFields.schema", i);
    inputData = (0, import_utils.prepareInputItem)(item.json, schema, i);
  }
  if (dataMode === "defineBelow") {
    const alertFields = this.getNodeParameter("alertFields.value", i, []);
    inputData = alertFields;
  }
  inputData = (0, import_utils.fixFieldType)(inputData);
  const body = {};
  for (const field of Object.keys(inputData)) {
    (0, import_set.default)(body, field, inputData[field]);
  }
  let multiPartRequest = false;
  const formData = new import_form_data.default();
  const observableUi = this.getNodeParameter("observableUi", i);
  if (observableUi) {
    const values = observableUi.values;
    if (values) {
      const observables = [];
      for (const value of values) {
        const observable = {};
        observable.dataType = value.dataType;
        observable.message = value.message;
        observable.tags = (0, import_utils.splitAndTrim)(value.tags);
        if (value.dataType === "file") {
          multiPartRequest = true;
          const attachmentIndex = `attachment${i}`;
          observable.attachment = attachmentIndex;
          const binaryPropertyName = value.binaryProperty;
          const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
          const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
          formData.append(attachmentIndex, dataBuffer, {
            filename: binaryData.fileName,
            contentType: binaryData.mimeType
          });
        } else {
          observable.data = value.data;
        }
        observables.push(observable);
      }
      body.observables = observables;
    }
  }
  if (multiPartRequest) {
    formData.append("_json", JSON.stringify(body));
    responseData = await import_transport.theHiveApiRequest.call(
      this,
      "POST",
      "/v1/alert",
      void 0,
      void 0,
      void 0,
      {
        Headers: {
          "Content-Type": "multipart/form-data"
        },
        formData
      }
    );
  } else {
    responseData = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/alert", body);
  }
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map