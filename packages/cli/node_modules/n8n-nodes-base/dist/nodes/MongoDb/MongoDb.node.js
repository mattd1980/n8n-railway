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
var MongoDb_node_exports = {};
__export(MongoDb_node_exports, {
  MongoDb: () => MongoDb
});
module.exports = __toCommonJS(MongoDb_node_exports);
var import_mongodb = require("mongodb");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_MongoDbProperties = require("./MongoDbProperties");
var import_utilities = require("../../utils/utilities");
class MongoDb {
  constructor() {
    this.description = {
      displayName: "MongoDB",
      name: "mongoDb",
      icon: "file:mongodb.svg",
      group: ["input"],
      version: [1, 1.1],
      description: "Find, insert and update documents in MongoDB",
      defaults: {
        name: "MongoDB"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "mongoDb",
          required: true,
          testedBy: "mongoDbCredentialTest"
        }
      ],
      properties: import_MongoDbProperties.nodeProperties
    };
    this.methods = {
      credentialTest: {
        async mongoDbCredentialTest(credential) {
          const credentials = credential.data;
          try {
            const database = (credentials.database || "").trim();
            let connectionString = "";
            if (credentials.configurationType === "connectionString") {
              connectionString = (credentials.connectionString || "").trim();
            } else {
              connectionString = (0, import_GenericFunctions.buildParameterizedConnString)(
                credentials
              );
            }
            const client = await (0, import_GenericFunctions.connectMongoClient)(connectionString, credentials);
            const { databases } = await client.db().admin().listDatabases();
            if (!databases.map((db) => db.name).includes(database)) {
              throw new import_n8n_workflow.ApplicationError(`Database "${database}" does not exist`, {
                level: "warning"
              });
            }
            await client.close();
          } catch (error) {
            return {
              status: "Error",
              message: error.message
            };
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      }
    };
  }
  async execute() {
    const credentials = await this.getCredentials("mongoDb");
    const { database, connectionString } = (0, import_GenericFunctions.validateAndResolveMongoCredentials)(this, credentials);
    const client = await (0, import_GenericFunctions.connectMongoClient)(connectionString, credentials);
    const mdb = client.db(database);
    let returnData = [];
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    const nodeVersion = this.getNode().typeVersion;
    let itemsLength = items.length ? 1 : 0;
    let fallbackPairedItems;
    if (nodeVersion >= 1.1) {
      itemsLength = items.length;
    } else {
      fallbackPairedItems = (0, import_utilities.generatePairedItemData)(items.length);
    }
    if (operation === "aggregate") {
      for (let i = 0; i < itemsLength; i++) {
        try {
          const queryParameter = JSON.parse(
            this.getNodeParameter("query", i)
          );
          if (queryParameter._id && typeof queryParameter._id === "string") {
            queryParameter._id = new import_mongodb.ObjectId(queryParameter._id);
          }
          const query = mdb.collection(this.getNodeParameter("collection", i)).aggregate(queryParameter);
          for (const entry of await query.toArray()) {
            returnData.push({ json: entry, pairedItem: fallbackPairedItems ?? [{ item: i }] });
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({
              json: { error: error.message },
              pairedItem: fallbackPairedItems ?? [{ item: i }]
            });
            continue;
          }
          throw error;
        }
      }
    }
    if (operation === "delete") {
      for (let i = 0; i < itemsLength; i++) {
        try {
          const { deletedCount } = await mdb.collection(this.getNodeParameter("collection", i)).deleteMany(JSON.parse(this.getNodeParameter("query", i)));
          returnData.push({
            json: { deletedCount },
            pairedItem: fallbackPairedItems ?? [{ item: i }]
          });
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({
              json: { error: error.message },
              pairedItem: fallbackPairedItems ?? [{ item: i }]
            });
            continue;
          }
          throw error;
        }
      }
    }
    if (operation === "find") {
      for (let i = 0; i < itemsLength; i++) {
        try {
          const queryParameter = JSON.parse(
            this.getNodeParameter("query", i)
          );
          if (queryParameter._id && typeof queryParameter._id === "string") {
            queryParameter._id = new import_mongodb.ObjectId(queryParameter._id);
          }
          let query = mdb.collection(this.getNodeParameter("collection", i)).find(queryParameter);
          const options = this.getNodeParameter("options", i);
          const limit = options.limit;
          const skip = options.skip;
          const projection = options.projection && JSON.parse(options.projection);
          const sort = options.sort && JSON.parse(options.sort);
          if (skip > 0) {
            query = query.skip(skip);
          }
          if (limit > 0) {
            query = query.limit(limit);
          }
          if (sort && Object.keys(sort).length !== 0 && sort.constructor === Object) {
            query = query.sort(sort);
          }
          if (projection && Object.keys(projection).length !== 0 && projection.constructor === Object) {
            query = query.project(projection);
          }
          const queryResult = await query.toArray();
          for (const entry of queryResult) {
            returnData.push({ json: entry, pairedItem: fallbackPairedItems ?? [{ item: i }] });
          }
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({
              json: { error: error.message },
              pairedItem: fallbackPairedItems ?? [{ item: i }]
            });
            continue;
          }
          throw error;
        }
      }
    }
    if (operation === "findOneAndReplace") {
      fallbackPairedItems = fallbackPairedItems ?? (0, import_utilities.generatePairedItemData)(items.length);
      const fields = (0, import_GenericFunctions.prepareFields)(this.getNodeParameter("fields", 0));
      const useDotNotation = this.getNodeParameter("options.useDotNotation", 0, false);
      const dateFields = (0, import_GenericFunctions.prepareFields)(
        this.getNodeParameter("options.dateFields", 0, "")
      );
      const updateKey = (this.getNodeParameter("updateKey", 0) || "").trim();
      const updateOptions = this.getNodeParameter("upsert", 0) ? { upsert: true } : void 0;
      const updateItems = (0, import_GenericFunctions.prepareItems)(items, fields, updateKey, useDotNotation, dateFields);
      for (const item of updateItems) {
        try {
          const filter = { [updateKey]: item[updateKey] };
          if (updateKey === "_id") {
            filter[updateKey] = new import_mongodb.ObjectId(item[updateKey]);
            delete item._id;
          }
          await mdb.collection(this.getNodeParameter("collection", 0)).findOneAndReplace(filter, item, updateOptions);
        } catch (error) {
          if (this.continueOnFail()) {
            item.json = { error: error.message };
            continue;
          }
          throw error;
        }
      }
      returnData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(updateItems),
        { itemData: fallbackPairedItems }
      );
    }
    if (operation === "findOneAndUpdate") {
      fallbackPairedItems = fallbackPairedItems ?? (0, import_utilities.generatePairedItemData)(items.length);
      const fields = (0, import_GenericFunctions.prepareFields)(this.getNodeParameter("fields", 0));
      const useDotNotation = this.getNodeParameter("options.useDotNotation", 0, false);
      const dateFields = (0, import_GenericFunctions.prepareFields)(
        this.getNodeParameter("options.dateFields", 0, "")
      );
      const updateKey = (this.getNodeParameter("updateKey", 0) || "").trim();
      const updateOptions = this.getNodeParameter("upsert", 0) ? { upsert: true } : void 0;
      const updateItems = (0, import_GenericFunctions.prepareItems)(items, fields, updateKey, useDotNotation, dateFields);
      for (const item of updateItems) {
        try {
          const filter = { [updateKey]: item[updateKey] };
          if (updateKey === "_id") {
            filter[updateKey] = new import_mongodb.ObjectId(item[updateKey]);
            delete item._id;
          }
          await mdb.collection(this.getNodeParameter("collection", 0)).findOneAndUpdate(filter, { $set: item }, updateOptions);
        } catch (error) {
          if (this.continueOnFail()) {
            item.json = { error: error.message };
            continue;
          }
          throw error;
        }
      }
      returnData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(updateItems),
        { itemData: fallbackPairedItems }
      );
    }
    if (operation === "insert") {
      fallbackPairedItems = fallbackPairedItems ?? (0, import_utilities.generatePairedItemData)(items.length);
      let responseData = [];
      try {
        const fields = (0, import_GenericFunctions.prepareFields)(this.getNodeParameter("fields", 0));
        const useDotNotation = this.getNodeParameter("options.useDotNotation", 0, false);
        const dateFields = (0, import_GenericFunctions.prepareFields)(
          this.getNodeParameter("options.dateFields", 0, "")
        );
        const insertItems = (0, import_GenericFunctions.prepareItems)(items, fields, "", useDotNotation, dateFields);
        const { insertedIds } = await mdb.collection(this.getNodeParameter("collection", 0)).insertMany(insertItems);
        for (const i of Object.keys(insertedIds)) {
          responseData.push({
            ...insertItems[parseInt(i, 10)],
            id: insertedIds[parseInt(i, 10)]
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData = [{ error: error.message }];
        } else {
          throw error;
        }
      }
      returnData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: fallbackPairedItems }
      );
    }
    if (operation === "update") {
      fallbackPairedItems = fallbackPairedItems ?? (0, import_utilities.generatePairedItemData)(items.length);
      const fields = (0, import_GenericFunctions.prepareFields)(this.getNodeParameter("fields", 0));
      const useDotNotation = this.getNodeParameter("options.useDotNotation", 0, false);
      const dateFields = (0, import_GenericFunctions.prepareFields)(
        this.getNodeParameter("options.dateFields", 0, "")
      );
      const updateKey = (this.getNodeParameter("updateKey", 0) || "").trim();
      const updateOptions = this.getNodeParameter("upsert", 0) ? { upsert: true } : void 0;
      const updateItems = (0, import_GenericFunctions.prepareItems)(items, fields, updateKey, useDotNotation, dateFields);
      for (const item of updateItems) {
        try {
          const filter = { [updateKey]: item[updateKey] };
          if (updateKey === "_id") {
            filter[updateKey] = new import_mongodb.ObjectId(item[updateKey]);
            delete item._id;
          }
          await mdb.collection(this.getNodeParameter("collection", 0)).updateOne(filter, { $set: item }, updateOptions);
        } catch (error) {
          if (this.continueOnFail()) {
            item.json = { error: error.message };
            continue;
          }
          throw error;
        }
      }
      returnData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(updateItems),
        { itemData: fallbackPairedItems }
      );
    }
    await client.close();
    return [(0, import_GenericFunctions.stringifyObjectIDs)(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MongoDb
});
//# sourceMappingURL=MongoDb.node.js.map