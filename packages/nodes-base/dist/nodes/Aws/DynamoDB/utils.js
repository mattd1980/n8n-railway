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
  adjustExpressionAttributeName: () => adjustExpressionAttributeName,
  adjustExpressionAttributeValues: () => adjustExpressionAttributeValues,
  adjustPutItem: () => adjustPutItem,
  copyInputItem: () => copyInputItem,
  decodeItem: () => decodeItem,
  mapToAttributeValues: () => mapToAttributeValues,
  simplify: () => simplify,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
const addColon = (attribute) => attribute = attribute.charAt(0) === ":" ? attribute : `:${attribute}`;
const addPound = (key) => key = key.charAt(0) === "#" ? key : `#${key}`;
function adjustExpressionAttributeValues(eavUi) {
  const eav = {};
  eavUi.forEach(({ attribute, type, value }) => {
    eav[addColon(attribute)] = { [type]: value };
  });
  return eav;
}
function adjustExpressionAttributeName(eanUi) {
  const ean = {};
  eanUi.forEach(({ key, value }) => {
    ean[addPound(key)] = value;
  });
  return ean;
}
function adjustPutItem(putItemUi) {
  const adjustedPutItem = {};
  Object.entries(putItemUi).forEach(([attribute, value]) => {
    let type;
    if (typeof value === "boolean") {
      type = "BOOL";
    } else if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      type = "M";
    } else if (isNaN(Number(value))) {
      type = "S";
    } else {
      type = "N";
    }
    adjustedPutItem[attribute] = { [type]: value.toString() };
  });
  return adjustedPutItem;
}
function simplify(item) {
  const output = {};
  for (const [attribute, value] of Object.entries(item)) {
    const [type, content] = Object.entries(value)[0];
    output[attribute] = decodeAttribute(type, content);
  }
  return output;
}
function decodeAttribute(type, attribute) {
  switch (type) {
    case "BOOL":
      return Boolean(attribute);
    case "N":
      return Number(attribute);
    case "S":
      return String(attribute);
    case "SS":
    case "NS":
      return attribute;
    case "M":
      (0, import_n8n_workflow.assert)(
        typeof attribute === "object" && !Array.isArray(attribute) && attribute !== null,
        "Attribute must be an object"
      );
      return simplify(attribute);
    default:
      return null;
  }
}
function validateJSON(input) {
  try {
    return JSON.parse(input);
  } catch (error) {
    throw new import_n8n_workflow.ApplicationError("Items must be a valid JSON", { level: "warning" });
  }
}
function copyInputItem(item, properties) {
  const newItem = {};
  for (const property of properties) {
    if (item.json[property] === void 0) {
      newItem[property] = null;
    } else {
      newItem[property] = (0, import_n8n_workflow.deepCopy)(item.json[property]);
    }
  }
  return newItem;
}
function mapToAttributeValues(item) {
  for (const key of Object.keys(item)) {
    if (!key.startsWith(":")) {
      item[`:${key}`] = item[key];
      delete item[key];
    }
  }
}
function decodeItem(item) {
  const _item = {};
  for (const entry of Object.entries(item)) {
    const [attribute, value] = entry;
    const [type, content] = Object.entries(value)[0];
    _item[attribute] = decodeAttribute(type, content);
  }
  return _item;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustExpressionAttributeName,
  adjustExpressionAttributeValues,
  adjustPutItem,
  copyInputItem,
  decodeItem,
  mapToAttributeValues,
  simplify,
  validateJSON
});
//# sourceMappingURL=utils.js.map