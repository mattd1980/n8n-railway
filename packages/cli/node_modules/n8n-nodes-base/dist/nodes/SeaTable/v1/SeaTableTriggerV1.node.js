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
var SeaTableTriggerV1_node_exports = {};
__export(SeaTableTriggerV1_node_exports, {
  SeaTableTriggerV1: () => SeaTableTriggerV1
});
module.exports = __toCommonJS(SeaTableTriggerV1_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class SeaTableTriggerV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        async getTableNames() {
          const returnData = [];
          const {
            metadata: { tables }
          } = await import_GenericFunctions.seaTableApiRequest.call(
            this,
            {},
            "GET",
            "/dtable-server/api/v1/dtables/{{dtable_uuid}}/metadata"
          );
          for (const table of tables) {
            returnData.push({
              name: table.name,
              value: table.name
            });
          }
          return returnData;
        }
      }
    };
    this.description = {
      ...baseDescription,
      version: 1,
      subtitle: '={{$parameter["event"]}}',
      defaults: {
        name: "SeaTable Trigger"
      },
      credentials: [
        {
          name: "seaTableApi",
          required: true
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Table Name or ID",
          name: "tableName",
          type: "options",
          required: true,
          typeOptions: {
            loadOptionsMethod: "getTableNames"
          },
          default: "",
          description: 'The name of SeaTable table to access. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          options: [
            {
              name: "Row Created",
              value: "rowCreated",
              description: "Trigger on newly created rows"
            }
            // {
            // 	name: 'Row Modified',
            // 	value: 'rowModified',
            // 	description: 'Trigger has recently modified rows',
            // },
          ],
          default: "rowCreated"
        },
        {
          displayName: "Simplify",
          name: "simple",
          type: "boolean",
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data"
        }
      ]
    };
  }
  async poll() {
    const webhookData = this.getWorkflowStaticData("node");
    const tableName = this.getNodeParameter("tableName");
    const simple = this.getNodeParameter("simple");
    const event = this.getNodeParameter("event");
    const ctx = {};
    const credentials = await this.getCredentials("seaTableApi");
    const timezone = credentials.timezone || "Europe/Berlin";
    const now = (0, import_moment_timezone.default)().utc().format();
    const startDate = webhookData.lastTimeChecked || now;
    const endDate = now;
    webhookData.lastTimeChecked = endDate;
    let rows;
    const filterField = event === "rowCreated" ? "_ctime" : "_mtime";
    const endpoint = "/dtable-db/api/v1/query/{{dtable_uuid}}/";
    if (this.getMode() === "manual") {
      rows = await import_GenericFunctions.seaTableApiRequest.call(this, ctx, "POST", endpoint, {
        sql: `SELECT * FROM ${tableName} LIMIT 1`
      });
    } else {
      rows = await import_GenericFunctions.seaTableApiRequest.call(this, ctx, "POST", endpoint, {
        sql: `SELECT * FROM ${tableName}
					WHERE ${filterField} BETWEEN "${(0, import_moment_timezone.default)(startDate).tz(timezone).format("YYYY-MM-D HH:mm:ss")}"
					AND "${(0, import_moment_timezone.default)(endDate).tz(timezone).format("YYYY-MM-D HH:mm:ss")}"`
      });
    }
    let response;
    if (rows.metadata && rows.results) {
      const columns = (0, import_GenericFunctions.getColumns)(rows);
      if (simple) {
        response = (0, import_GenericFunctions.simplify)(rows, columns);
      } else {
        response = rows.results;
      }
      const allColumns = rows.metadata.map((meta) => meta.name);
      response = response.map((row) => (0, import_GenericFunctions.rowFormatColumns)(row, allColumns)).map((row) => ({ json: row }));
    }
    if (Array.isArray(response) && response.length) {
      return [response];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeaTableTriggerV1
});
//# sourceMappingURL=SeaTableTriggerV1.node.js.map