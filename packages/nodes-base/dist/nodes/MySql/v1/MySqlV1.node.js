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
var MySqlV1_node_exports = {};
__export(MySqlV1_node_exports, {
  MySqlV1: () => MySqlV1
});
module.exports = __toCommonJS(MySqlV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("../../../utils/descriptions");
var import_utilities = require("../../../utils/utilities");
var import_GenericFunctions = require("./GenericFunctions");
const versionDescription = {
  displayName: "MySQL",
  name: "mySql",
  icon: "file:mysql.svg",
  group: ["input"],
  version: 1,
  description: "Get, add and update data in MySQL",
  defaults: {
    name: "MySQL"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "mySql",
      required: true,
      testedBy: "mysqlConnectionTest"
    }
  ],
  properties: [
    import_descriptions.oldVersionNotice,
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
        sqlDialect: "MySQL"
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
      type: "resourceLocator",
      default: { mode: "list", value: "" },
      required: true,
      modes: [
        {
          displayName: "From List",
          name: "list",
          type: "list",
          placeholder: "Select a Table...",
          typeOptions: {
            searchListMethod: "searchTables",
            searchFilterRequired: false,
            searchable: true
          }
        },
        {
          displayName: "Name",
          name: "name",
          type: "string",
          placeholder: "table_name"
        }
      ],
      displayOptions: {
        show: {
          operation: ["insert"]
        }
      },
      description: "Name of the table in which to insert data to"
    },
    {
      displayName: "Columns",
      name: "columns",
      type: "string",
      displayOptions: {
        show: {
          operation: ["insert"]
        }
      },
      requiresDataPath: "multiple",
      default: "",
      placeholder: "id,name,description",
      description: "Comma-separated list of the properties which should used as columns for the new rows"
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      displayOptions: {
        show: {
          operation: ["insert"]
        }
      },
      default: {},
      placeholder: "Add modifiers",
      description: "Modifiers for INSERT statement",
      options: [
        {
          displayName: "Ignore",
          name: "ignore",
          type: "boolean",
          default: true,
          description: "Whether to ignore any ignorable errors that occur while executing the INSERT statement"
        },
        {
          displayName: "Priority",
          name: "priority",
          type: "options",
          options: [
            {
              name: "Low Prioirity",
              value: "LOW_PRIORITY",
              description: "Delays execution of the INSERT until no other clients are reading from the table"
            },
            {
              name: "High Priority",
              value: "HIGH_PRIORITY",
              description: "Overrides the effect of the --low-priority-updates option if the server was started with that option. It also causes concurrent inserts not to be used."
            }
          ],
          default: "LOW_PRIORITY",
          description: "Ignore any ignorable errors that occur while executing the INSERT statement"
        }
      ]
    },
    // ----------------------------------
    //         update
    // ----------------------------------
    {
      displayName: "Table",
      name: "table",
      type: "resourceLocator",
      default: { mode: "list", value: "" },
      required: true,
      modes: [
        {
          displayName: "From List",
          name: "list",
          type: "list",
          placeholder: "Select a Table...",
          typeOptions: {
            searchListMethod: "searchTables",
            searchFilterRequired: false,
            searchable: true
          }
        },
        {
          displayName: "Name",
          name: "name",
          type: "string",
          placeholder: "table_name"
        }
      ],
      displayOptions: {
        show: {
          operation: ["update"]
        }
      },
      description: "Name of the table in which to update data in"
    },
    {
      displayName: "Update Key",
      name: "updateKey",
      type: "string",
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
    }
  ]
};
class MySqlV1 {
  constructor(baseDescription) {
    this.methods = {
      credentialTest: {
        async mysqlConnectionTest(credential) {
          const credentials = credential.data;
          try {
            const connection = await (0, import_GenericFunctions.createConnection)(credentials);
            await connection.end();
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
      },
      listSearch: {
        searchTables: import_GenericFunctions.searchTables
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const credentials = await this.getCredentials("mySql");
    const connection = await (0, import_GenericFunctions.createConnection)(credentials);
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    let returnItems = [];
    if (operation === "executeQuery") {
      try {
        const queryQueue = items.map(async (_, index) => {
          let rawQuery = this.getNodeParameter("query", index).trim();
          for (const resolvable of (0, import_utilities.getResolvables)(rawQuery)) {
            rawQuery = rawQuery.replace(
              resolvable,
              this.evaluateExpression(resolvable, index)
            );
          }
          return await connection.query(rawQuery);
        });
        returnItems = (await Promise.all(queryQueue)).reduce(
          (collection, result, index) => {
            const [rows] = result;
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(rows),
              { itemData: { item: index } }
            );
            collection = collection.concat(executionData);
            return collection;
          },
          []
        );
      } catch (error) {
        if (this.continueOnFail()) {
          returnItems = this.helpers.returnJsonArray({ error: error.message });
        } else {
          await connection.end();
          throw error;
        }
      }
    } else if (operation === "insert") {
      try {
        const table = this.getNodeParameter("table", 0, "", { extractValue: true });
        const columnString = this.getNodeParameter("columns", 0);
        const columns = columnString.split(",").map((column) => column.trim());
        const insertItems = this.helpers.copyInputItems(items, columns);
        const insertPlaceholder = `(${columns.map((_column) => "?").join(",")})`;
        const options = this.getNodeParameter("options", 0);
        const insertIgnore = options.ignore;
        const insertPriority = options.priority;
        const insertSQL = `INSERT ${insertPriority || ""} ${insertIgnore ? "IGNORE" : ""} INTO ${table}(${columnString}) VALUES ${items.map((_item) => insertPlaceholder).join(",")};`;
        const queryItems = insertItems.reduce(
          (collection, item) => collection.concat(Object.values(item)),
          []
        );
        const queryResult = await connection.query(insertSQL, queryItems);
        returnItems = this.helpers.returnJsonArray(queryResult[0]);
      } catch (error) {
        if (this.continueOnFail()) {
          returnItems = this.helpers.returnJsonArray({ error: error.message });
        } else {
          await connection.end();
          throw error;
        }
      }
    } else if (operation === "update") {
      try {
        const table = this.getNodeParameter("table", 0, "", { extractValue: true });
        const updateKey = this.getNodeParameter("updateKey", 0);
        const columnString = this.getNodeParameter("columns", 0);
        const columns = columnString.split(",").map((column) => column.trim());
        if (!columns.includes(updateKey)) {
          columns.unshift(updateKey);
        }
        const updateItems = this.helpers.copyInputItems(items, columns);
        const updateSQL = `UPDATE ${table} SET ${columns.map((column) => `${column} = ?`).join(",")} WHERE ${updateKey} = ?;`;
        const queryQueue = updateItems.map(
          async (item) => await connection.query(updateSQL, Object.values(item).concat(item[updateKey]))
        );
        const queryResult = await Promise.all(queryQueue);
        returnItems = this.helpers.returnJsonArray(
          queryResult.map((result) => result[0])
        );
      } catch (error) {
        if (this.continueOnFail()) {
          returnItems = this.helpers.returnJsonArray({ error: error.message });
        } else {
          await connection.end();
          throw error;
        }
      }
    } else {
      if (this.continueOnFail()) {
        returnItems = this.helpers.returnJsonArray({
          error: `The operation "${operation}" is not supported!`
        });
      } else {
        await connection.end();
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `The operation "${operation}" is not supported!`
        );
      }
    }
    await connection.end();
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MySqlV1
});
//# sourceMappingURL=MySqlV1.node.js.map