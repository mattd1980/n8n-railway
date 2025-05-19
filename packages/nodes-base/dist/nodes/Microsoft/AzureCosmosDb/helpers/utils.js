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
var utils_exports = {};
__export(utils_exports, {
  getPartitionKey: () => getPartitionKey,
  processJsonInput: () => processJsonInput,
  simplifyData: () => simplifyData,
  untilContainerSelected: () => untilContainerSelected,
  untilItemSelected: () => untilItemSelected,
  validateCustomProperties: () => validateCustomProperties,
  validatePartitionKey: () => validatePartitionKey,
  validateQueryParameters: () => validateQueryParameters
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("./constants");
var import_errorHandler = require("./errorHandler");
var import_transport = require("../transport");
async function getPartitionKey() {
  const container = this.getNodeParameter("container", void 0, {
    extractValue: true
  });
  let partitionKeyField = void 0;
  try {
    const responseData = await import_transport.azureCosmosDbApiRequest.call(
      this,
      "GET",
      `/colls/${container}`
    );
    partitionKeyField = responseData.partitionKey?.paths[0]?.replace("/", "");
  } catch (error) {
    const err = error;
    if (err.httpCode === "404") {
      err.message = import_errorHandler.ErrorMap.Container.NotFound.getMessage(container);
      err.description = import_errorHandler.ErrorMap.Container.NotFound.description;
    }
    throw err;
  }
  if (!partitionKeyField) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Partition key not found", {
      description: "Failed to determine the partition key for this collection"
    });
  }
  return partitionKeyField;
}
async function simplifyData(items, _response) {
  const simple = this.getNodeParameter("simple");
  if (!simple) {
    return items;
  }
  const simplifyFields = (data) => {
    const simplifiedData = Object.keys(data).filter((key) => !key.startsWith("_")).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});
    return simplifiedData;
  };
  return items.map((item) => {
    const simplifiedData = simplifyFields(item.json);
    return { json: simplifiedData };
  });
}
async function validateQueryParameters(requestOptions) {
  const query = this.getNodeParameter("query", "");
  const queryOptions = this.getNodeParameter("options.queryOptions");
  const parameterNames = query.replace(/\$(\d+)/g, "@Param$1").match(/@\w+/g) ?? [];
  const queryParamsString = queryOptions?.queryParameters;
  const parameterValues = queryParamsString ? queryParamsString.split(",").map((param) => param.trim()) : [];
  if (parameterNames.length !== parameterValues.length) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Empty parameter value provided", {
      description: "Please provide non-empty values for the query parameters"
    });
  }
  requestOptions.body = {
    ...requestOptions.body,
    parameters: parameterNames.map((name, index) => ({
      name,
      value: parameterValues[index]
    }))
  };
  return requestOptions;
}
function processJsonInput(jsonData, inputName, fallbackValue = void 0, disallowSpacesIn) {
  let values = {};
  const input = inputName ? `'${inputName}' ` : "";
  if (typeof jsonData === "string") {
    try {
      values = (0, import_n8n_workflow.jsonParse)(jsonData, { fallbackValue });
    } catch (error) {
      throw new import_n8n_workflow.OperationalError(`Input ${input}must contain a valid JSON`, { level: "warning" });
    }
  } else if (jsonData && typeof jsonData === "object") {
    values = jsonData;
  } else {
    throw new import_n8n_workflow.OperationalError(`Input ${input}must contain a valid JSON`, { level: "warning" });
  }
  disallowSpacesIn?.forEach((key) => {
    const value = values[key];
    if (typeof value === "string" && value.includes(" ")) {
      throw new import_n8n_workflow.OperationalError(
        `${inputName ? `'${inputName}'` : ""} property '${key}' should not contain spaces (received "${value}")`,
        { level: "warning" }
      );
    }
  });
  return values;
}
async function validatePartitionKey(requestOptions) {
  const operation = this.getNodeParameter("operation");
  let customProperties = this.getNodeParameter("customProperties", {});
  const partitionKey = await getPartitionKey.call(this);
  if (typeof customProperties === "string") {
    try {
      customProperties = (0, import_n8n_workflow.jsonParse)(customProperties);
    } catch (error) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'Invalid JSON format in "Item Contents"', {
        description: 'Ensure the "Item Contents" field contains a valid JSON object'
      });
    }
  }
  let partitionKeyValue = "";
  const needsPartitionKey = ["update", "delete", "get"].includes(operation);
  if (operation === "create") {
    if (!(partitionKey in customProperties) || !customProperties[partitionKey]) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Partition key not found in 'Item Contents'", {
        description: `Partition key '${partitionKey}' must be present and have a valid, non-empty value in 'Item Contents'.`
      });
    }
    partitionKeyValue = customProperties[partitionKey];
  } else if (needsPartitionKey) {
    try {
      partitionKeyValue = partitionKey === "id" ? String(this.getNodeParameter("item", void 0, { extractValue: true }) ?? "") : String(this.getNodeParameter("additionalFields.partitionKey", void 0) ?? "");
      if (!partitionKeyValue) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Partition key is empty", {
          description: 'Ensure the "Partition Key" field has a valid, non-empty value.'
        });
      }
    } catch (error) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Partition key is missing or empty", {
        description: 'Ensure the "Partition Key" field exists and has a valid, non-empty value.'
      });
    }
    if (operation === "update") {
      const idValue = String(
        this.getNodeParameter("item", void 0, { extractValue: true }) ?? ""
      );
      requestOptions.body.id = idValue;
      requestOptions.body[partitionKey] = partitionKeyValue;
    }
  }
  requestOptions.headers = {
    ...requestOptions.headers,
    [import_constants.HeaderConstants.X_MS_DOCUMENTDB_PARTITIONKEY]: `["${partitionKeyValue}"]`
  };
  return requestOptions;
}
async function validateCustomProperties(requestOptions) {
  const rawCustomProperties = this.getNodeParameter("customProperties");
  const customProperties = processJsonInput(rawCustomProperties, "Item Contents");
  if (Object.keys(customProperties).length === 0 || Object.values(customProperties).every((val) => val === void 0 || val === null || val === "")) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Item contents are empty", {
      description: 'Ensure the "Item Contents" field contains at least one valid property.'
    });
  }
  requestOptions.body = {
    ...requestOptions.body,
    ...customProperties
  };
  return requestOptions;
}
const untilContainerSelected = { container: [""] };
const untilItemSelected = { item: [""] };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPartitionKey,
  processJsonInput,
  simplifyData,
  untilContainerSelected,
  untilItemSelected,
  validateCustomProperties,
  validatePartitionKey,
  validateQueryParameters
});
//# sourceMappingURL=utils.js.map