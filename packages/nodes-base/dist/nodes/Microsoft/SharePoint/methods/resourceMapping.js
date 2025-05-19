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
var resourceMapping_exports = {};
__export(resourceMapping_exports, {
  getMappingColumns: () => getMappingColumns
});
module.exports = __toCommonJS(resourceMapping_exports);
var import_transport = require("../transport");
const unsupportedFields = ["geoLocation", "location", "term", "url"];
const fieldTypeMapping = {
  string: ["text", "user", "lookup"],
  // unknownFutureValue: rating
  number: ["number", "currency", "unknownFutureValue"],
  boolean: ["boolean"],
  dateTime: ["dateTime"],
  object: ["thumbnail"],
  options: ["choice"]
};
function mapType(column) {
  if (unsupportedFields.includes(column.type)) {
    return void 0;
  }
  let mappedType = "string";
  for (const t of Object.keys(fieldTypeMapping)) {
    const postgresTypes = fieldTypeMapping[t];
    if (postgresTypes?.includes(column.type)) {
      mappedType = t;
    }
  }
  return mappedType;
}
async function getMappingColumns() {
  const site = this.getNodeParameter("site", void 0, { extractValue: true });
  const list = this.getNodeParameter("list", void 0, { extractValue: true });
  const operation = this.getNodeParameter("operation");
  const response = await import_transport.microsoftSharePointApiRequest.call(
    this,
    "GET",
    `/sites/${site}/lists/${list}/contentTypes`,
    {},
    { expand: "columns" }
  );
  const columns = response.value[0].columns;
  const fields = [];
  for (const column of columns.filter((x) => !x.hidden && !x.readOnly)) {
    const fieldType = mapType(column);
    const field = {
      id: column.name,
      canBeUsedToMatch: column.enforceUniqueValues && column.required,
      defaultMatch: false,
      display: true,
      displayName: column.displayName,
      readOnly: column.readOnly || !fieldType,
      required: column.required,
      type: fieldType
    };
    if (field.type === "options") {
      field.options = [];
      if (Array.isArray(column.choice?.choices)) {
        for (const choice of column.choice.choices) {
          field.options.push({
            name: choice,
            value: choice
          });
        }
      }
    }
    fields.push(field);
  }
  if (operation === "update") {
    fields.push({
      id: "id",
      canBeUsedToMatch: true,
      defaultMatch: false,
      display: true,
      displayName: "ID",
      readOnly: true,
      required: true,
      type: "string"
    });
  }
  return { fields };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMappingColumns
});
//# sourceMappingURL=resourceMapping.js.map