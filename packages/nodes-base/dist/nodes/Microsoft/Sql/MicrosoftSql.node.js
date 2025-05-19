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
var MicrosoftSql_node_exports = {};
__export(MicrosoftSql_node_exports, {
  MicrosoftSql: () => MicrosoftSql
});
module.exports = __toCommonJS(MicrosoftSql_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../utils/utilities");
var import_GenericFunctions = require("./GenericFunctions");
class MicrosoftSql {
  constructor() {
    this.description = {
      displayName: "Microsoft SQL",
      name: "microsoftSql",
      icon: "file:mssql.svg",
      group: ["input"],
      version: [1, 1.1],
      description: "Get, add and update data in Microsoft SQL",
      defaults: {
        name: "Microsoft SQL"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      parameterPane: "wide",
      credentials: [
        {
          name: "microsoftSql",
          required: true,
          testedBy: "microsoftSqlConnectionTest"
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Execute Query",
              value: "executeQuery",
              description: "Execute an SQL query",
              action: "Execute a SQL query"
            },
            {
              name: "Insert",
              value: "insert",
              description: "Insert rows in database",
              action: "Insert rows in database"
            },
            {
              name: "Update",
              value: "update",
              description: "Update rows in database",
              action: "Update rows in database"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete rows in database",
              action: "Delete rows in database"
            }
          ],
          default: "insert"
        },
        // ----------------------------------
        //         executeQuery
        // ----------------------------------
        {
          displayName: "Query",
          name: "query",
          type: "string",
          noDataExpression: true,
          typeOptions: {
            editor: "sqlEditor",
            sqlDialect: "MSSQL"
          },
          displayOptions: {
            show: {
              operation: ["executeQuery"]
            }
          },
          default: "",
          placeholder: "SELECT id, name FROM product WHERE id < 40",
          required: true,
          description: "The SQL query to execute"
        },
        // ----------------------------------
        //         insert
        // ----------------------------------
        {
          displayName: "Table",
          name: "table",
          type: "string",
          displayOptions: {
            show: {
              operation: ["insert"]
            }
          },
          default: "",
          required: true,
          description: "Name of the table in which to insert data to"
        },
        {
          displayName: "Columns",
          name: "columns",
          type: "string",
          requiresDataPath: "multiple",
          displayOptions: {
            show: {
              operation: ["insert"]
            }
          },
          default: "",
          placeholder: "id,name,description",
          description: "Comma-separated list of the properties which should used as columns for the new rows"
        },
        // ----------------------------------
        //         update
        // ----------------------------------
        {
          displayName: "Table",
          name: "table",
          type: "string",
          displayOptions: {
            show: {
              operation: ["update"]
            }
          },
          default: "",
          required: true,
          description: "Name of the table in which to update data in"
        },
        {
          displayName: "Update Key",
          name: "updateKey",
          type: "string",
          requiresDataPath: "single",
          displayOptions: {
            show: {
              operation: ["update"]
            }
          },
          default: "id",
          required: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
          description: 'Name of the property which decides which rows in the database should be updated. Normally that would be "id".'
        },
        {
          displayName: "Columns",
          name: "columns",
          type: "string",
          requiresDataPath: "multiple",
          displayOptions: {
            show: {
              operation: ["update"]
            }
          },
          default: "",
          placeholder: "name,description",
          description: "Comma-separated list of the properties which should used as columns for rows to update"
        },
        // ----------------------------------
        //         delete
        // ----------------------------------
        {
          displayName: "Table",
          name: "table",
          type: "string",
          displayOptions: {
            show: {
              operation: ["delete"]
            }
          },
          default: "",
          required: true,
          description: "Name of the table in which to delete data"
        },
        {
          displayName: "Delete Key",
          name: "deleteKey",
          type: "string",
          requiresDataPath: "single",
          displayOptions: {
            show: {
              operation: ["delete"]
            }
          },
          default: "id",
          required: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
          description: 'Name of the property which decides which rows in the database should be deleted. Normally that would be "id".'
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async microsoftSqlConnectionTest(credential) {
          const credentials = credential.data;
          try {
            const pool = (0, import_GenericFunctions.configurePool)(credentials);
            await pool.connect();
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
    const credentials = await this.getCredentials("microsoftSql");
    const pool = (0, import_GenericFunctions.configurePool)(credentials);
    await pool.connect();
    let responseData = [];
    let returnData = [];
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    const nodeVersion = this.getNode().typeVersion;
    if (operation === "executeQuery" && nodeVersion >= 1.1) {
      for (let i = 0; i < items.length; i++) {
        try {
          let rawQuery = this.getNodeParameter("query", i);
          for (const resolvable of (0, import_utilities.getResolvables)(rawQuery)) {
            rawQuery = rawQuery.replace(
              resolvable,
              this.evaluateExpression(resolvable, i)
            );
          }
          const results = await (0, import_GenericFunctions.executeSqlQueryAndPrepareResults)(pool, rawQuery, i);
          returnData = returnData.concat(results);
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({
              json: { error: error.message },
              pairedItem: [{ item: i }]
            });
            continue;
          }
          await pool.close();
          throw error;
        }
      }
      await pool.close();
      return [returnData];
    }
    try {
      if (operation === "executeQuery") {
        let rawQuery = this.getNodeParameter("query", 0);
        for (const resolvable of (0, import_utilities.getResolvables)(rawQuery)) {
          rawQuery = rawQuery.replace(resolvable, this.evaluateExpression(resolvable, 0));
        }
        const { recordsets } = await pool.request().query(rawQuery);
        const result = recordsets.length > 1 ? (0, import_utilities.flatten)(recordsets) : recordsets[0];
        responseData = result;
      }
      if (operation === "insert") {
        const tables = (0, import_GenericFunctions.createTableStruct)(this.getNodeParameter, items);
        await (0, import_GenericFunctions.insertOperation)(tables, pool);
        responseData = items;
      }
      if (operation === "update") {
        const updateKeys = items.map(
          (_, index) => this.getNodeParameter("updateKey", index)
        );
        const tables = (0, import_GenericFunctions.createTableStruct)(
          this.getNodeParameter,
          items,
          ["updateKey"].concat(updateKeys),
          "updateKey"
        );
        await (0, import_GenericFunctions.updateOperation)(tables, pool);
        responseData = items;
      }
      if (operation === "delete") {
        const tables = items.reduce((acc, item, index) => {
          const table = this.getNodeParameter("table", index);
          const deleteKey = this.getNodeParameter("deleteKey", index);
          if (acc[table] === void 0) {
            acc[table] = {};
          }
          if (acc[table][deleteKey] === void 0) {
            acc[table][deleteKey] = [];
          }
          acc[table][deleteKey].push(item);
          return acc;
        }, {});
        responseData = await (0, import_GenericFunctions.deleteOperation)(tables, pool);
      }
      const itemData = (0, import_utilities.generatePairedItemData)(items.length);
      returnData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData }
      );
    } catch (error) {
      if (this.continueOnFail()) {
        responseData = items;
      } else {
        await pool.close();
        throw error;
      }
    }
    await pool.close();
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicrosoftSql
});
//# sourceMappingURL=MicrosoftSql.node.js.map