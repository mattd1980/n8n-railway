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
var Snowflake_node_exports = {};
__export(Snowflake_node_exports, {
  Snowflake: () => Snowflake
});
module.exports = __toCommonJS(Snowflake_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_snowflake_sdk = __toESM(require("snowflake-sdk"));
var import_utilities = require("../../utils/utilities");
var import_GenericFunctions = require("./GenericFunctions");
class Snowflake {
  constructor() {
    this.description = {
      displayName: "Snowflake",
      name: "snowflake",
      icon: "file:snowflake.svg",
      group: ["input"],
      version: 1,
      description: "Get, add and update data in Snowflake",
      defaults: {
        name: "Snowflake"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      parameterPane: "wide",
      credentials: [
        {
          name: "snowflake",
          required: true
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
            editor: "sqlEditor"
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
  }
  async execute() {
    const credentials = await this.getCredentials("snowflake");
    const connectionOptions = (0, import_GenericFunctions.getConnectionOptions)(credentials);
    const connection = import_snowflake_sdk.default.createConnection(connectionOptions);
    await (0, import_GenericFunctions.connect)(connection);
    const returnData = [];
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    if (operation === "executeQuery") {
      for (let i = 0; i < items.length; i++) {
        let query = this.getNodeParameter("query", i);
        for (const resolvable of (0, import_utilities.getResolvables)(query)) {
          query = query.replace(resolvable, this.evaluateExpression(resolvable, i));
        }
        const responseData = await (0, import_GenericFunctions.execute)(connection, query, []);
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      }
    }
    if (operation === "insert") {
      const table = this.getNodeParameter("table", 0);
      const columnString = this.getNodeParameter("columns", 0);
      const columns = columnString.split(",").map((column) => column.trim());
      const query = `INSERT INTO ${table}(${columns.join(",")}) VALUES (${columns.map((_column) => "?").join(",")})`;
      const data = this.helpers.copyInputItems(items, columns);
      const binds = data.map((element) => Object.values(element));
      await (0, import_GenericFunctions.execute)(connection, query, binds);
      data.forEach((d, i) => {
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(d),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      });
    }
    if (operation === "update") {
      const table = this.getNodeParameter("table", 0);
      const updateKey = this.getNodeParameter("updateKey", 0);
      const columnString = this.getNodeParameter("columns", 0);
      const columns = columnString.split(",").map((column) => column.trim());
      if (!columns.includes(updateKey)) {
        columns.unshift(updateKey);
      }
      const query = `UPDATE ${table} SET ${columns.map((column) => `${column} = ?`).join(",")} WHERE ${updateKey} = ?;`;
      const data = this.helpers.copyInputItems(items, columns);
      const binds = data.map((element) => Object.values(element).concat(element[updateKey]));
      for (let i = 0; i < binds.length; i++) {
        await (0, import_GenericFunctions.execute)(connection, query, binds[i]);
      }
      data.forEach((d, i) => {
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(d),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      });
    }
    await (0, import_GenericFunctions.destroy)(connection);
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Snowflake
});
//# sourceMappingURL=Snowflake.node.js.map