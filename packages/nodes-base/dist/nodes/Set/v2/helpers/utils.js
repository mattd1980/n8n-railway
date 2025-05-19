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
var utils_exports = {};
__export(utils_exports, {
  composeReturnItem: () => composeReturnItem,
  parseJsonParameter: () => parseJsonParameter,
  resolveRawData: () => resolveRawData,
  validateEntry: () => validateEntry
});
module.exports = __toCommonJS(utils_exports);
var import_get = __toESM(require("lodash/get"));
var import_set = __toESM(require("lodash/set"));
var import_unset = __toESM(require("lodash/unset"));
var import_n8n_workflow = require("n8n-workflow");
var import_interfaces = require("./interfaces");
var import_utilities = require("../../../../utils/utilities");
const configureFieldHelper = (dotNotation) => {
  if (dotNotation !== false) {
    return {
      set: (item, key, value) => {
        (0, import_set.default)(item, key, value);
      },
      get: (item, key) => {
        return (0, import_get.default)(item, key);
      },
      unset: (item, key) => {
        (0, import_unset.default)(item, key);
      }
    };
  } else {
    return {
      set: (item, key, value) => {
        item[(0, import_utilities.sanitizeDataPathKey)(item, key)] = value;
      },
      get: (item, key) => {
        return item[(0, import_utilities.sanitizeDataPathKey)(item, key)];
      },
      unset: (item, key) => {
        delete item[(0, import_utilities.sanitizeDataPathKey)(item, key)];
      }
    };
  }
};
function composeReturnItem(itemIndex, inputItem, newFields, options, nodeVersion) {
  const newItem = {
    json: {},
    pairedItem: { item: itemIndex }
  };
  const includeBinary = nodeVersion >= 3.4 && !options.stripBinary && options.include !== "none" || nodeVersion < 3.4 && !!options.includeBinary;
  if (includeBinary && inputItem.binary !== void 0) {
    newItem.binary = {};
    Object.assign(newItem.binary, inputItem.binary);
  }
  const fieldHelper = configureFieldHelper(options.dotNotation);
  switch (options.include) {
    case import_interfaces.INCLUDE.ALL:
      newItem.json = (0, import_n8n_workflow.deepCopy)(inputItem.json);
      break;
    case import_interfaces.INCLUDE.SELECTED:
      const includeFields = this.getNodeParameter("includeFields", itemIndex).split(",").map((item) => item.trim()).filter((item) => item);
      for (const key of includeFields) {
        const fieldValue = fieldHelper.get(inputItem.json, key);
        let keyToSet = key;
        if (options.dotNotation !== false && key.includes(".")) {
          keyToSet = key.split(".").pop();
        }
        fieldHelper.set(newItem.json, keyToSet, fieldValue);
      }
      break;
    case import_interfaces.INCLUDE.EXCEPT:
      const excludeFields = this.getNodeParameter("excludeFields", itemIndex).split(",").map((item) => item.trim()).filter((item) => item);
      const inputData = (0, import_n8n_workflow.deepCopy)(inputItem.json);
      for (const key of excludeFields) {
        fieldHelper.unset(inputData, key);
      }
      newItem.json = inputData;
      break;
    case import_interfaces.INCLUDE.NONE:
      break;
    default:
      throw new import_n8n_workflow.ApplicationError(`The include option "${options.include}" is not known!`, {
        level: "warning"
      });
  }
  for (const key of Object.keys(newFields)) {
    fieldHelper.set(newItem.json, key, newFields[key]);
  }
  return newItem;
}
const parseJsonParameter = (jsonData, node, i, entryName) => {
  let returnData;
  const location = entryName ? `entry "${entryName}" inside 'Fields to Set'` : "'JSON Output'";
  if (typeof jsonData === "string") {
    try {
      returnData = (0, import_n8n_workflow.jsonParse)(jsonData);
    } catch (error) {
      let recoveredData = "";
      try {
        recoveredData = jsonData.replace(/'/g, '"').replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":').replace(/,\s*([\]}])/g, "$1").replace(/,+$/, "");
        returnData = (0, import_n8n_workflow.jsonParse)(recoveredData);
      } catch (err) {
        const description = recoveredData === jsonData ? jsonData : `${recoveredData};
 Original input: ${jsonData}`;
        throw new import_n8n_workflow.NodeOperationError(node, `The ${location} in item ${i} contains invalid JSON`, {
          description
        });
      }
    }
  } else {
    returnData = jsonData;
  }
  if (returnData === void 0 || typeof returnData !== "object" || Array.isArray(returnData)) {
    throw new import_n8n_workflow.NodeOperationError(
      node,
      `The ${location} in item ${i} does not contain a valid JSON object`
    );
  }
  return returnData;
};
const validateEntry = (name, type, value, node, itemIndex, ignoreErrors = false, nodeVersion) => {
  if (nodeVersion && nodeVersion >= 3.2 && (value === void 0 || value === null)) {
    return { name, value: null };
  }
  const description = `To fix the error try to change the type for the field "${name}" or activate the option \u201CIgnore Type Conversion Errors\u201D to apply a less strict type validation`;
  if (type === "string") {
    if (nodeVersion && nodeVersion > 3 && (value === void 0 || value === null)) {
      if (ignoreErrors) {
        return { name, value: null };
      } else {
        throw new import_n8n_workflow.NodeOperationError(
          node,
          `'${name}' expects a ${type} but we got ${(0, import_n8n_workflow.getValueDescription)(value)} [item ${itemIndex}]`,
          { description }
        );
      }
    } else if (typeof value === "object") {
      value = JSON.stringify(value);
    } else {
      value = String(value);
    }
  }
  const validationResult = (0, import_n8n_workflow.validateFieldType)(name, value, type);
  if (!validationResult.valid) {
    if (ignoreErrors) {
      return { name, value: value ?? null };
    } else {
      const message = `${validationResult.errorMessage} [item ${itemIndex}]`;
      throw new import_n8n_workflow.NodeOperationError(node, message, {
        itemIndex,
        description
      });
    }
  }
  return {
    name,
    value: validationResult.newValue ?? null
  };
};
function resolveRawData(rawData, i) {
  const resolvables = (0, import_utilities.getResolvables)(rawData);
  let returnData = rawData;
  if (resolvables.length) {
    for (const resolvable of resolvables) {
      const resolvedValue = this.evaluateExpression(`${resolvable}`, i);
      if (typeof resolvedValue === "object" && resolvedValue !== null) {
        returnData = returnData.replace(resolvable, JSON.stringify(resolvedValue));
      } else {
        returnData = returnData.replace(resolvable, resolvedValue);
      }
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  composeReturnItem,
  parseJsonParameter,
  resolveRawData,
  validateEntry
});
//# sourceMappingURL=utils.js.map