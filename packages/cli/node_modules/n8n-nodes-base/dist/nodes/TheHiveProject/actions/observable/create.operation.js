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
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
    displayName: "Create in",
    name: "createIn",
    type: "options",
    options: [
      {
        name: "Case",
        value: "case"
      },
      {
        name: "Alert",
        value: "alert"
      }
    ],
    default: "case"
  },
  {
    ...import_descriptions.caseRLC,
    name: "id",
    displayOptions: {
      show: {
        createIn: ["case"]
      }
    }
  },
  {
    ...import_descriptions.alertRLC,
    name: "id",
    displayOptions: {
      show: {
        createIn: ["alert"]
      }
    }
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Data Type",
    name: "dataType",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    default: "file",
    typeOptions: {
      loadOptionsMethod: "loadObservableTypes"
    }
  },
  {
    displayName: "Data",
    name: "data",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      hide: {
        dataType: ["file"]
      }
    }
  },
  { ...import_descriptions.attachmentsUi, required: true, displayOptions: { show: { dataType: ["file"] } } },
  {
    displayName: "Fields",
    name: "observableFields",
    type: "resourceMapper",
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    noDataExpression: true,
    required: true,
    typeOptions: {
      resourceMapper: {
        resourceMapperMethod: "getObservableFields",
        mode: "add",
        valuesLabel: "Fields"
      }
    }
  }
];
const displayOptions = {
  show: {
    resource: ["observable"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i, item) {
  let responseData = {};
  let body = {};
  const createIn = this.getNodeParameter("createIn", i);
  const id = this.getNodeParameter("id", i, "", { extractValue: true });
  const endpoint = `/v1/${createIn}/${id}/observable`;
  const dataMode = this.getNodeParameter("observableFields.mappingMode", i);
  if (dataMode === "autoMapInputData") {
    const schema = this.getNodeParameter("observableFields.schema", i);
    body = (0, import_utils.prepareInputItem)(item.json, schema, i);
  }
  if (dataMode === "defineBelow") {
    const observableFields = this.getNodeParameter("observableFields.value", i, []);
    body = observableFields;
  }
  body = (0, import_utils.fixFieldType)(body);
  const dataType = this.getNodeParameter("dataType", i);
  body.dataType = dataType;
  if (dataType === "file") {
    const inputDataFields = this.getNodeParameter("attachmentsUi.values", i, []).map((entry) => entry.field.trim());
    const formData = new import_form_data.default();
    for (const inputDataField of inputDataFields) {
      const binaryData = this.helpers.assertBinaryData(i, inputDataField);
      const dataBuffer = await this.helpers.getBinaryDataBuffer(i, inputDataField);
      formData.append("attachment", dataBuffer, {
        filename: binaryData.fileName,
        contentType: binaryData.mimeType
      });
    }
    formData.append("_json", JSON.stringify(body));
    responseData = await import_transport.theHiveApiRequest.call(
      this,
      "POST",
      endpoint,
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
    const data = this.getNodeParameter("data", i);
    body.data = data;
    responseData = await import_transport.theHiveApiRequest.call(this, "POST", endpoint, body);
  }
  if (responseData.failure) {
    const message = responseData.failure.map((error) => error.message).join(", ");
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), message, { itemIndex: i });
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