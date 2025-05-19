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
var utilities_exports = {};
__export(utilities_exports, {
  capitalize: () => capitalize,
  chunk: () => chunk,
  compareItems: () => compareItems,
  createUtmCampaignLink: () => createUtmCampaignLink,
  escapeHtml: () => escapeHtml,
  flatten: () => flatten,
  flattenKeys: () => flattenKeys,
  flattenObject: () => flattenObject,
  formatPrivateKey: () => formatPrivateKey,
  fuzzyCompare: () => fuzzyCompare,
  generatePairedItemData: () => generatePairedItemData,
  getResolvables: () => getResolvables,
  keysToLowercase: () => keysToLowercase,
  preparePairedItemDataArray: () => preparePairedItemDataArray,
  processJsonInput: () => processJsonInput,
  sanitizeDataPathKey: () => sanitizeDataPathKey,
  shuffleArray: () => shuffleArray,
  sortItemKeysByPriorityList: () => sortItemKeysByPriorityList,
  updateDisplayOptions: () => updateDisplayOptions,
  wrapData: () => wrapData
});
module.exports = __toCommonJS(utilities_exports);
var import_lodash = require("lodash");
var import_n8n_workflow = require("n8n-workflow");
function chunk(array, size = 1) {
  const length = array === null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));
  while (index < length) {
    result[resIndex++] = array.slice(index, index += size);
  }
  return result;
}
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = (0, import_n8n_workflow.randomInt)(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
};
const flattenKeys = (obj, prefix = []) => {
  return !(0, import_lodash.isObject)(obj) ? { [prefix.join(".")]: obj } : (0, import_lodash.reduce)(
    obj,
    (cum, next, key) => (0, import_lodash.merge)(cum, flattenKeys(next, [...prefix, key])),
    {}
  );
};
function flatten(nestedArray) {
  const result = [];
  (function loop(array) {
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        loop(array[i]);
      } else {
        result.push(array[i]);
      }
    }
  })(nestedArray);
  return result;
}
const compareItems = (obj1, obj2, keys, disableDotNotation = false) => {
  let result = true;
  for (const key of keys) {
    if (!disableDotNotation) {
      if (!(0, import_lodash.isEqual)((0, import_lodash.get)(obj1.json, key), (0, import_lodash.get)(obj2.json, key))) {
        result = false;
        break;
      }
    } else {
      if (!(0, import_lodash.isEqual)(obj1.json[key], obj2.json[key])) {
        result = false;
        break;
      }
    }
  }
  return result;
};
function updateDisplayOptions(displayOptions, properties) {
  return properties.map((nodeProperty) => {
    return {
      ...nodeProperty,
      displayOptions: (0, import_lodash.merge)({}, nodeProperty.displayOptions, displayOptions)
    };
  });
}
function processJsonInput(jsonData, inputName) {
  let values;
  const input = inputName ? `'${inputName}' ` : "";
  if (typeof jsonData === "string") {
    try {
      values = (0, import_n8n_workflow.jsonParse)(jsonData);
    } catch (error) {
      throw new import_n8n_workflow.ApplicationError(`Input ${input} must contain a valid JSON`, { level: "warning" });
    }
  } else if (typeof jsonData === "object") {
    values = jsonData;
  } else {
    throw new import_n8n_workflow.ApplicationError(`Input ${input} must contain a valid JSON`, { level: "warning" });
  }
  return values;
}
function isFalsy(value) {
  if ((0, import_lodash.isNull)(value)) return true;
  if (typeof value === "string" && value === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}
const parseStringAndCompareToObject = (str, arr) => {
  try {
    const parsedArray = (0, import_n8n_workflow.jsonParse)(str);
    return (0, import_lodash.isEqual)(parsedArray, arr);
  } catch (error) {
    return false;
  }
};
const fuzzyCompare = (useFuzzyCompare, compareVersion = 1) => {
  if (!useFuzzyCompare) {
    return (item1, item2) => (0, import_lodash.isEqual)(item1, item2);
  }
  return (item1, item2) => {
    if (!(0, import_lodash.isNull)(item1) && !(0, import_lodash.isNull)(item2) && typeof item1 === typeof item2) {
      return (0, import_lodash.isEqual)(item1, item2);
    }
    if (compareVersion >= 2) {
      if ((0, import_lodash.isNull)(item1) && ((0, import_lodash.isNull)(item2) || item2 === 0 || item2 === "0")) {
        return true;
      }
      if ((0, import_lodash.isNull)(item2) && ((0, import_lodash.isNull)(item1) || item1 === 0 || item1 === "0")) {
        return true;
      }
    }
    if (isFalsy(item1) && isFalsy(item2)) return true;
    if (isFalsy(item1) && item2 === void 0) return true;
    if (item1 === void 0 && isFalsy(item2)) return true;
    if (typeof item1 === "number" && typeof item2 === "string") {
      return item1.toString() === item2;
    }
    if (typeof item1 === "string" && typeof item2 === "number") {
      return item1 === item2.toString();
    }
    if (!(0, import_lodash.isNull)(item1) && typeof item1 === "object" && typeof item2 === "string") {
      return parseStringAndCompareToObject(item2, item1);
    }
    if (!(0, import_lodash.isNull)(item2) && typeof item1 === "string" && typeof item2 === "object") {
      return parseStringAndCompareToObject(item1, item2);
    }
    if (typeof item1 === "boolean" && typeof item2 === "string") {
      if (item1 === true && item2.toLocaleLowerCase() === "true") return true;
      if (item1 === false && item2.toLocaleLowerCase() === "false") return true;
    }
    if (typeof item2 === "boolean" && typeof item1 === "string") {
      if (item2 === true && item1.toLocaleLowerCase() === "true") return true;
      if (item2 === false && item1.toLocaleLowerCase() === "false") return true;
    }
    if (typeof item1 === "boolean" && typeof item2 === "number") {
      if (item1 === true && item2 === 1) return true;
      if (item1 === false && item2 === 0) return true;
    }
    if (typeof item2 === "boolean" && typeof item1 === "number") {
      if (item2 === true && item1 === 1) return true;
      if (item2 === false && item1 === 0) return true;
    }
    if (typeof item1 === "boolean" && typeof item2 === "string") {
      if (item1 === true && item2 === "1") return true;
      if (item1 === false && item2 === "0") return true;
    }
    if (typeof item2 === "boolean" && typeof item1 === "string") {
      if (item2 === true && item1 === "1") return true;
      if (item2 === false && item1 === "0") return true;
    }
    return (0, import_lodash.isEqual)(item1, item2);
  };
};
function wrapData(data) {
  if (!Array.isArray(data)) {
    return [{ json: data }];
  }
  return data.map((item) => ({
    json: item
  }));
}
const keysToLowercase = (headers) => {
  if (typeof headers !== "object" || Array.isArray(headers) || headers === null) return headers;
  return Object.entries(headers).reduce((acc, [key, value]) => {
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
};
function formatPrivateKey(privateKey, keyIsPublic = false) {
  let regex = /(PRIVATE KEY|CERTIFICATE)/;
  if (keyIsPublic) {
    regex = /(PUBLIC KEY)/;
  }
  if (!privateKey || /\n/.test(privateKey)) {
    return privateKey;
  }
  let formattedPrivateKey = "";
  const parts = privateKey.split("-----").filter((item) => item !== "");
  parts.forEach((part) => {
    if (regex.test(part)) {
      formattedPrivateKey += `-----${part}-----`;
    } else {
      const passRegex = /Proc-Type|DEK-Info/;
      if (passRegex.test(part)) {
        part = part.replace(/:\s+/g, ":");
        formattedPrivateKey += part.replace(/\\n/g, "\n").replace(/\s+/g, "\n");
      } else {
        formattedPrivateKey += part.replace(/\\n/g, "\n").replace(/\s+/g, "\n");
      }
    }
  });
  return formattedPrivateKey;
}
function getResolvables(expression) {
  if (!expression) return [];
  const resolvables = [];
  const resolvableRegex = /({{[\s\S]*?}})/g;
  let match;
  while ((match = resolvableRegex.exec(expression)) !== null) {
    if (match[1]) {
      resolvables.push(match[1]);
    }
  }
  return resolvables;
}
function flattenObject(data) {
  const returnData = {};
  for (const key1 of Object.keys(data)) {
    if (data[key1] !== null && typeof data[key1] === "object") {
      if (data[key1] instanceof Date) {
        returnData[key1] = data[key1]?.toString();
        continue;
      }
      const flatObject = flattenObject(data[key1]);
      for (const key2 in flatObject) {
        if (flatObject[key2] === void 0) {
          continue;
        }
        returnData[`${key1}.${key2}`] = flatObject[key2];
      }
    } else {
      returnData[key1] = data[key1];
    }
  }
  return returnData;
}
function capitalize(str) {
  if (!str) return str;
  const chars = str.split("");
  chars[0] = chars[0].toUpperCase();
  return chars.join("");
}
function generatePairedItemData(length) {
  return Array.from({ length }, (_, item) => ({
    item
  }));
}
function preparePairedItemDataArray(pairedItem) {
  if (pairedItem === void 0) return [];
  if (typeof pairedItem === "number") return [{ item: pairedItem }];
  if (Array.isArray(pairedItem)) return pairedItem;
  return [pairedItem];
}
const sanitizeDataPathKey = (item, key) => {
  if (item[key] !== void 0) {
    return key;
  }
  if (key.startsWith("['") && key.endsWith("']") || key.startsWith('["') && key.endsWith('"]')) {
    key = key.slice(2, -2);
    if (item[key] !== void 0) {
      return key;
    }
  }
  return key;
};
function escapeHtml(text) {
  if (!text) return "";
  return text.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, (match) => {
    switch (match) {
      case "&amp;":
        return "&";
      case "&lt;":
        return "<";
      case "&gt;":
        return ">";
      case "&#39;":
        return "'";
      case "&quot;":
        return '"';
      default:
        return match;
    }
  });
}
function sortItemKeysByPriorityList(data, priorityList) {
  return data.map((item) => {
    const itemKeys = Object.keys(item.json);
    const updatedKeysOrder = itemKeys.sort((a, b) => {
      const indexA = priorityList.indexOf(a);
      const indexB = priorityList.indexOf(b);
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      } else if (indexA !== -1) {
        return -1;
      } else if (indexB !== -1) {
        return 1;
      }
      return a.localeCompare(b);
    });
    const updatedItem = {};
    for (const key of updatedKeysOrder) {
      updatedItem[key] = item.json[key];
    }
    item.json = updatedItem;
    return item;
  });
}
function createUtmCampaignLink(nodeType, instanceId) {
  return `https://n8n.io/?utm_source=n8n-internal&utm_medium=powered_by&utm_campaign=${encodeURIComponent(
    nodeType
  )}${instanceId ? "_" + instanceId : ""}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  capitalize,
  chunk,
  compareItems,
  createUtmCampaignLink,
  escapeHtml,
  flatten,
  flattenKeys,
  flattenObject,
  formatPrivateKey,
  fuzzyCompare,
  generatePairedItemData,
  getResolvables,
  keysToLowercase,
  preparePairedItemDataArray,
  processJsonInput,
  sanitizeDataPathKey,
  shuffleArray,
  sortItemKeysByPriorityList,
  updateDisplayOptions,
  wrapData
});
//# sourceMappingURL=utilities.js.map