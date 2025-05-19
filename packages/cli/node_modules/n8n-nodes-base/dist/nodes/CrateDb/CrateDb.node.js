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
var CrateDb_node_exports = {};
__export(CrateDb_node_exports, {
  CrateDb: () => CrateDb
});
module.exports = __toCommonJS(CrateDb_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_pg_promise = __toESM(require("pg-promise"));
var import_genericFunctions = require("../Postgres/v1/genericFunctions");
class CrateDb {
  constructor() {
    this.description = {
      displayName: "CrateDB",
      name: "crateDb",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:cratedb.png",
      group: ["input"],
      version: 1,
      description: "Add and update data in CrateDB",
      defaults: {
        name: "CrateDB"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "crateDb",
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
            editor: "sqlEditor",
            rows: 5,
            sqlDialect: "PostgreSQL"
          },
          displayOptions: {
            show: {
              operation: ["executeQuery"]
            }
          },
          default: "",
          placeholder: "SELECT id, name FROM product WHERE quantity > $1 AND price <= $2",
          required: true,
          description: "The SQL query to execute. You can use n8n expressions or $1 and $2 in conjunction with query parameters."
        },
        // ----------------------------------
        //         insert
        // ----------------------------------
        {
          displayName: "Schema",
          name: "schema",
          type: "string",
          displayOptions: {
            show: {
              operation: ["insert"]
            }
          },
          default: "doc",
          required: true,
          description: "Name of the schema the table belongs to"
        },
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
          displayName: "Schema",
          name: "schema",
          type: "string",
          displayOptions: {
            show: {
              operation: ["update"]
            }
          },
          default: "doc",
          required: true,
          description: "Name of the schema the table belongs to"
        },
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
          description: 'Comma-separated list of the properties which decides which rows in the database should be updated. Normally that would be "id".'
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
        },
        // ----------------------------------
        //         insert,update
        // ----------------------------------
        {
          displayName: "Return Fields",
          name: "returnFields",
          type: "string",
          displayOptions: {
            show: {
              operation: ["insert", "update"]
            }
          },
          default: "*",
          description: "Comma-separated list of the fields that the operation will return"
        },
        // ----------------------------------
        //         additional fields
        // ----------------------------------
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "Mode",
              name: "mode",
              type: "options",
              options: [
                {
                  name: "Independently",
                  value: "independently",
                  description: "Execute each query independently"
                },
                {
                  name: "Multiple Queries",
                  value: "multiple",
                  description: "<b>Default</b>. Sends multiple queries at once to database."
                }
              ],
              default: "multiple",
              description: 'The way queries should be sent to database. Can be used in conjunction with <b>Continue on Fail</b>. See <a href="https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.cratedb/">the docs</a> for more examples.'
            },
            {
              displayName: "Query Parameters",
              name: "queryParams",
              type: "string",
              displayOptions: {
                show: {
                  "/operation": ["executeQuery"]
                }
              },
              default: "",
              placeholder: "quantity,price",
              description: "Comma-separated list of properties which should be used as query parameters"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const credentials = await this.getCredentials("crateDb");
    const pgp = (0, import_pg_promise.default)();
    const config = {
      host: credentials.host,
      port: credentials.port,
      database: credentials.database,
      user: credentials.user,
      password: credentials.password,
      ssl: !["disable", void 0].includes(credentials.ssl),
      sslmode: credentials.ssl || "disable"
    };
    const db = pgp(config);
    let returnItems = [];
    const items = this.getInputData();
    const operation = this.getNodeParameter("operation", 0);
    if (operation === "executeQuery") {
      const queryResult = await import_genericFunctions.pgQueryV2.call(this, pgp, db, items, this.continueOnFail(), {
        resolveExpression: true
      });
      returnItems = this.helpers.returnJsonArray(queryResult);
    } else if (operation === "insert") {
      const insertData = await (0, import_genericFunctions.pgInsert)(
        this.getNodeParameter,
        pgp,
        db,
        items,
        this.continueOnFail()
      );
      for (let i = 0; i < insertData.length; i++) {
        returnItems.push({
          json: insertData[i]
        });
      }
    } else if (operation === "update") {
      const additionalFields = this.getNodeParameter("additionalFields", 0);
      const mode = additionalFields.mode ?? "multiple";
      if (mode === "independently") {
        const updateItems = await (0, import_genericFunctions.pgUpdate)(
          this.getNodeParameter,
          pgp,
          db,
          items,
          this.continueOnFail()
        );
        returnItems = this.helpers.returnJsonArray(updateItems);
      } else if (mode === "multiple") {
        const table = this.getNodeParameter("table", 0);
        const schema = this.getNodeParameter("schema", 0);
        const updateKeys = this.getNodeParameter("updateKey", 0).split(",").map((column) => column.trim());
        const columns = this.getNodeParameter("columns", 0).split(",").map((column) => column.trim());
        const queryColumns = columns.slice();
        updateKeys.forEach((updateKey) => {
          if (!queryColumns.includes(updateKey)) {
            columns.unshift(updateKey);
            queryColumns.unshift("?" + updateKey);
          }
        });
        const cs = new pgp.helpers.ColumnSet(queryColumns, { table: { table, schema } });
        const where = " WHERE " + updateKeys.map((updateKey) => pgp.as.name(updateKey) + " = ${" + updateKey + "}").join(" AND ");
        const returning = (0, import_genericFunctions.generateReturning)(
          pgp,
          this.getNodeParameter("returnFields", 0)
        );
        const queries = [];
        for (let i = 0; i < items.length; i++) {
          const itemCopy = (0, import_genericFunctions.getItemCopy)(items[i], columns);
          queries.push(
            pgp.helpers.update(itemCopy, cs) + pgp.as.format(where, itemCopy) + returning
          );
        }
        await db.multi(pgp.helpers.concat(queries));
        returnItems = this.helpers.returnJsonArray((0, import_genericFunctions.getItemsCopy)(items, columns));
      }
    } else {
      await db.$pool.end();
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        `The operation "${operation}" is not supported!`
      );
    }
    await db.$pool.end();
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CrateDb
});
//# sourceMappingURL=CrateDb.node.js.map