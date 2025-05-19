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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(update_operation_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Fields",
    name: "observableUpdateFields",
    type: "resourceMapper",
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    noDataExpression: true,
    required: true,
    typeOptions: {
      resourceMapper: {
        resourceMapperMethod: "getObservableUpdateFields",
        mode: "update",
        valuesLabel: "Fields",
        addAllFields: true,
        multiKeyMatch: true
      }
    }
  }
];
const displayOptions = {
  show: {
    resource: ["observable"],
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i, item) {
  let body = {};
  let updated = 1;
  const dataMode = this.getNodeParameter("observableUpdateFields.mappingMode", i);
  if (dataMode === "autoMapInputData") {
    const schema = this.getNodeParameter("observableUpdateFields.schema", i);
    body = (0, import_utils.prepareInputItem)(item.json, schema, i);
  }
  if (dataMode === "defineBelow") {
    const observableUpdateFields = this.getNodeParameter(
      "observableUpdateFields.value",
      i,
      []
    );
    body = observableUpdateFields;
  }
  body = (0, import_utils.fixFieldType)(body);
  const fieldsToMatchOn = this.getNodeParameter(
    "observableUpdateFields.matchingColumns",
    i
  );
  const updateBody = {};
  const matchFields = {};
  const { id } = body;
  for (const field of Object.keys(body)) {
    if (fieldsToMatchOn.includes(field)) {
      matchFields[field] = body[field];
    } else {
      (0, import_set.default)(updateBody, field, body[field]);
    }
  }
  if (fieldsToMatchOn.includes("id")) {
    await import_transport.theHiveApiRequest.call(this, "PATCH", `/v1/observable/${id}`, body);
  } else {
    const filter = {
      _name: "filter",
      _and: fieldsToMatchOn.map((field) => ({
        _eq: {
          _field: field,
          _value: matchFields[field]
        }
      }))
    };
    const queryBody = {
      query: [
        {
          _name: "listObservable"
        },
        filter
      ]
    };
    const matches = await import_transport.theHiveApiRequest.call(
      this,
      "POST",
      "/v1/query",
      queryBody
    );
    if (!matches.length) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No matching alerts found");
    }
    const ids = matches.map((match) => match._id);
    updated = ids.length;
    updateBody.ids = ids;
    await import_transport.theHiveApiRequest.call(this, "PATCH", "/v1/observable/_bulk", updateBody);
  }
  const executionData = this.helpers.constructExecutionMetaData(
    (0, import_utilities.wrapData)({ success: true, updated }),
    {
      itemData: { item: i }
    }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=update.operation.js.map