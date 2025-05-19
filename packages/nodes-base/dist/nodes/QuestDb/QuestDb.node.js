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
var QuestDb_node_exports = {};
__export(QuestDb_node_exports, {
  QuestDb: () => QuestDb
});
module.exports = __toCommonJS(QuestDb_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_pg_promise = __toESM(require("pg-promise"));
var import_genericFunctions = require("../Postgres/v1/genericFunctions");
class QuestDb {
  constructor() {
    this.description = {
      displayName: "QuestDB",
      name: "questDb",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:questdb.png",
      group: ["input"],
      version: 1,
      description: "Get, add and update data in QuestDB",
      defaults: {
        name: "QuestDB"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      parameterPane: "wide",
      credentials: [
        {
          name: "questDb",
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
              description: "Executes a SQL query",
              action: "Execute a SQL query"
            },
            {
              name: "Insert",
              value: "insert",
              description: "Insert rows in database",
              action: "Insert rows in database"
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
          type: "hidden",
          // Schema is used by pgInsert
          displayOptions: {
            show: {
              operation: ["insert"]
            }
          },
          default: "",
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
        {
          displayName: "Return Fields",
          name: "returnFields",
          type: "string",
          displayOptions: {
            show: {
              operation: ["insert"]
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
          displayOptions: {
            show: {
              operation: ["executeQuery"]
            }
          },
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
                  name: "Transaction",
                  value: "transaction",
                  description: "Executes all queries in a single transaction"
                }
              ],
              default: "independently",
              description: 'The way queries should be sent to database. Can be used in conjunction with <b>Continue on Fail</b>. See <a href="https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.questdb/">the docs</a> for more examples.'
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
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "hidden",
          default: {},
          displayOptions: {
            show: {
              operation: ["insert"]
            }
          }
        }
      ]
    };
  }
  async execute() {
    const credentials = await this.getCredentials("questDb");
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
      const additionalFields = this.getNodeParameter("additionalFields", 0);
      const mode = additionalFields.mode || "independently";
      const queryResult = await import_genericFunctions.pgQueryV2.call(this, pgp, db, items, this.continueOnFail(), {
        overrideMode: mode,
        resolveExpression: true
      });
      returnItems = this.helpers.returnJsonArray(queryResult);
    } else if (operation === "insert") {
      await (0, import_genericFunctions.pgInsert)(this.getNodeParameter, pgp, db, items, this.continueOnFail(), "independently");
      const returnFields = this.getNodeParameter("returnFields", 0);
      const table = this.getNodeParameter("table", 0);
      const insertData = await db.any("SELECT ${columns:name} from ${table:name}", {
        columns: returnFields.split(",").map((value) => value.trim()).filter((value) => !!value),
        table
      });
      returnItems = this.helpers.returnJsonArray(insertData);
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
  QuestDb
});
//# sourceMappingURL=QuestDb.node.js.map