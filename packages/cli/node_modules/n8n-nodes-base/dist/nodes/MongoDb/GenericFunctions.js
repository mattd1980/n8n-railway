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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  buildMongoConnectionParams: () => buildMongoConnectionParams,
  buildParameterizedConnString: () => buildParameterizedConnString,
  connectMongoClient: () => connectMongoClient,
  prepareFields: () => prepareFields,
  prepareItems: () => prepareItems,
  stringifyObjectIDs: () => stringifyObjectIDs,
  validateAndResolveMongoCredentials: () => validateAndResolveMongoCredentials
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_get = __toESM(require("lodash/get"));
var import_set = __toESM(require("lodash/set"));
var import_mongodb = require("mongodb");
var import_n8n_workflow = require("n8n-workflow");
var import_tls = require("tls");
var import_utilities = require("../../utils/utilities");
function buildParameterizedConnString(credentials) {
  if (credentials.port) {
    return `mongodb://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}`;
  } else {
    return `mongodb+srv://${credentials.user}:${credentials.password}@${credentials.host}`;
  }
}
function buildMongoConnectionParams(self, credentials) {
  const sanitizedDbName = credentials.database && credentials.database.trim().length > 0 ? credentials.database.trim() : "";
  if (credentials.configurationType === "connectionString") {
    if (credentials.connectionString && credentials.connectionString.trim().length > 0) {
      return {
        connectionString: credentials.connectionString.trim(),
        database: sanitizedDbName
      };
    } else {
      throw new import_n8n_workflow.NodeOperationError(
        self.getNode(),
        "Cannot override credentials: valid MongoDB connection string not provided "
      );
    }
  } else {
    return {
      connectionString: buildParameterizedConnString(credentials),
      database: sanitizedDbName
    };
  }
}
function validateAndResolveMongoCredentials(self, credentials) {
  if (credentials === void 0) {
    throw new import_n8n_workflow.NodeOperationError(self.getNode(), "No credentials got returned!");
  } else {
    return buildMongoConnectionParams(self, credentials);
  }
}
function prepareItems(items, fields, updateKey = "", useDotNotation = false, dateFields = []) {
  let data = items;
  if (updateKey) {
    if (!fields.includes(updateKey)) {
      fields.push(updateKey);
    }
    data = items.filter((item) => item.json[updateKey] !== void 0);
  }
  const preparedItems = data.map(({ json }) => {
    const updateItem = {};
    for (const field of fields) {
      let fieldData;
      if (useDotNotation) {
        fieldData = (0, import_get.default)(json, field, null);
      } else {
        fieldData = json[field] !== void 0 ? json[field] : null;
      }
      if (fieldData && dateFields.includes(field)) {
        fieldData = new Date(fieldData);
      }
      if (useDotNotation) {
        (0, import_set.default)(updateItem, field, fieldData);
      } else {
        updateItem[field] = fieldData;
      }
    }
    return updateItem;
  });
  return preparedItems;
}
function prepareFields(fields) {
  return fields.split(",").map((field) => field.trim()).filter((field) => !!field);
}
function stringifyObjectIDs(items) {
  items.forEach((item) => {
    if (item._id instanceof import_mongodb.ObjectId) {
      item.json._id = item._id.toString();
    }
    if (item.id instanceof import_mongodb.ObjectId) {
      item.json.id = item.id.toString();
    }
  });
  return items;
}
async function connectMongoClient(connectionString, credentials = {}) {
  let client;
  if (credentials.tls) {
    const ca = credentials.ca ? (0, import_utilities.formatPrivateKey)(credentials.ca) : void 0;
    const cert = credentials.cert ? (0, import_utilities.formatPrivateKey)(credentials.cert) : void 0;
    const key = credentials.key ? (0, import_utilities.formatPrivateKey)(credentials.key) : void 0;
    const passphrase = credentials.passphrase || void 0;
    const secureContext = (0, import_tls.createSecureContext)({
      ca,
      cert,
      key,
      passphrase
    });
    client = await import_mongodb.MongoClient.connect(connectionString, {
      tls: true,
      secureContext
    });
  } else {
    client = await import_mongodb.MongoClient.connect(connectionString);
  }
  return client;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildMongoConnectionParams,
  buildParameterizedConnString,
  connectMongoClient,
  prepareFields,
  prepareItems,
  stringifyObjectIDs,
  validateAndResolveMongoCredentials
});
//# sourceMappingURL=GenericFunctions.js.map