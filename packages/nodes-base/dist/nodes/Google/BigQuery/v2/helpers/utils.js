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
  checkSchema: () => checkSchema,
  prepareOutput: () => prepareOutput,
  simplify: () => simplify,
  wrapData: () => wrapData
});
module.exports = __toCommonJS(utils_exports);
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
function getFieldValue(schemaField, field, parseTimestamps = false) {
  if (schemaField.type === "RECORD") {
    return simplify([field.v], schemaField.fields);
  } else {
    let value = field.v;
    if (schemaField.type === "JSON") {
      try {
        value = (0, import_n8n_workflow.jsonParse)(value);
      } catch (error) {
      }
    } else if (schemaField.type === "TIMESTAMP" && parseTimestamps) {
      const dt = import_luxon.DateTime.fromSeconds(Number(value));
      value = dt.isValid ? dt.toISO() : value;
    }
    return value;
  }
}
function wrapData(data) {
  if (!Array.isArray(data)) {
    return [{ json: data }];
  }
  return data.map((item) => ({
    json: item
  }));
}
function simplify(data, schema, includeSchema = false, parseTimestamps = false) {
  const returnData = [];
  for (const entry of data) {
    const record = {};
    for (const [index, field] of entry.f.entries()) {
      if (schema[index].mode !== "REPEATED") {
        record[schema[index].name] = getFieldValue(schema[index], field, parseTimestamps);
      } else {
        record[schema[index].name] = field.v.flatMap(
          (repeatedField) => {
            return getFieldValue(
              schema[index],
              repeatedField,
              parseTimestamps
            );
          }
        );
      }
    }
    if (includeSchema) {
      record._schema = schema;
    }
    returnData.push(record);
  }
  return returnData;
}
function prepareOutput(response, itemIndex, rawOutput, includeSchema = false) {
  let responseData;
  if (response === void 0) return [];
  if (rawOutput) {
    responseData = response;
  } else {
    const { rows, schema } = response;
    const parseTimestamps = this.getNode().typeVersion >= 2.1;
    if (rows !== void 0 && schema !== void 0) {
      const fields = schema.fields;
      responseData = rows;
      responseData = simplify(
        responseData,
        fields,
        includeSchema,
        parseTimestamps
      );
    } else if (schema && includeSchema) {
      responseData = { success: true, _schema: schema };
    } else {
      responseData = { success: true };
    }
  }
  const executionData = this.helpers.constructExecutionMetaData(
    wrapData(responseData),
    {
      itemData: { item: itemIndex }
    }
  );
  return executionData;
}
function checkSchema(schema, record, i) {
  const returnData = { ...record };
  schema.fields.forEach(({ name, mode, type, fields }) => {
    if (mode === "REQUIRED" && returnData[name] === void 0) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `The property '${name}' is required, please define it in the 'Fields to Send'`,
        { itemIndex: i }
      );
    }
    if (type !== "STRING" && returnData[name] === "") {
      returnData[name] = null;
    }
    if (type === "JSON") {
      let value = returnData[name];
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      returnData[name] = value;
    }
    if (type === "RECORD" && typeof returnData[name] !== "object") {
      let parsedField;
      try {
        parsedField = (0, import_n8n_workflow.jsonParse)(returnData[name]);
      } catch (error) {
        const recordField = fields ? `Field Schema:
 ${JSON.stringify(fields)}` : "";
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The property '${name}' is a RECORD type, but the value is nor an object nor a valid JSON string`,
          { itemIndex: i, description: recordField }
        );
      }
      returnData[name] = parsedField;
    }
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkSchema,
  prepareOutput,
  simplify,
  wrapData
});
//# sourceMappingURL=utils.js.map