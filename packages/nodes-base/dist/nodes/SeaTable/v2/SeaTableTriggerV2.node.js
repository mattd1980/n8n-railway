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
var SeaTableTriggerV2_node_exports = {};
__export(SeaTableTriggerV2_node_exports, {
  SeaTableTriggerV2: () => SeaTableTriggerV2
});
module.exports = __toCommonJS(SeaTableTriggerV2_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_methods = require("./methods");
class SeaTableTriggerV2 {
  constructor(baseDescription) {
    this.methods = { loadOptions: import_methods.loadOptions };
    this.description = {
      ...baseDescription,
      version: 2,
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
          displayName: "Event",
          name: "event",
          type: "options",
          options: [
            {
              name: "New Row",
              value: "newRow",
              description: "Trigger on newly created rows"
            },
            {
              name: "New or Updated Row",
              value: "updatedRow",
              description: "Trigger has recently created or modified rows"
            },
            {
              name: "New Signature",
              value: "newAsset",
              description: "Trigger on new signatures"
            }
          ],
          default: "newRow"
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "Table Name",
          name: "tableName",
          type: "options",
          required: true,
          typeOptions: {
            loadOptionsMethod: "getTableNames"
          },
          default: "",
          // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
          description: 'The name of SeaTable table to access. Choose from the list, or specify the name using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.'
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "View Name",
          name: "viewName",
          type: "options",
          displayOptions: {
            show: {
              event: ["newRow", "updatedRow"]
            }
          },
          typeOptions: {
            loadOptionsDependsOn: ["tableName"],
            loadOptionsMethod: "getTableViews"
          },
          default: "",
          // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
          description: 'The name of SeaTable view to access. Choose from the list, or specify the name using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.'
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "Signature Column",
          name: "assetColumn",
          type: "options",
          required: true,
          displayOptions: {
            show: {
              event: ["newAsset"]
            }
          },
          typeOptions: {
            loadOptionsDependsOn: ["tableName"],
            loadOptionsMethod: "getSignatureColumns"
          },
          default: "",
          // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
          description: 'Select the digital-signature column that should be tracked. Choose from the list, or specify the name using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.'
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Option",
          default: {},
          options: [
            {
              displayName: "Simplify",
              name: "simple",
              type: "boolean",
              default: true,
              description: "Whether to return a simplified version of the response instead of the raw data"
            },
            {
              displayName: "Return Column Names",
              name: "convert",
              type: "boolean",
              default: true,
              description: "Whether to return the column keys (false) or the column names (true)",
              displayOptions: {
                show: {
                  "/event": ["newRow", "updatedRow"]
                }
              }
            }
          ]
        },
        {
          displayName: '"Fetch Test Event" returns max. three items of the last hour.',
          name: "notice",
          type: "notice",
          default: ""
        }
      ]
    };
  }
  async poll() {
    const webhookData = this.getWorkflowStaticData("node");
    const event = this.getNodeParameter("event");
    const tableName = this.getNodeParameter("tableName");
    const viewName = event !== "newAsset" ? this.getNodeParameter("viewName") : "";
    const assetColumn = event === "newAsset" ? this.getNodeParameter("assetColumn") : "";
    const options = this.getNodeParameter("options");
    const ctx = {};
    const startDate = this.getMode() === "manual" ? (0, import_moment_timezone.default)().utc().subtract(1, "h").format() : webhookData.lastTimeChecked;
    const endDate = webhookData.lastTimeChecked = (0, import_moment_timezone.default)().utc().format();
    const filterField = event === "newRow" ? "_ctime" : "_mtime";
    let requestMeta;
    let requestRows;
    let metadata = [];
    let rows;
    let sqlResult;
    const limit = this.getMode() === "manual" ? 3 : 1e3;
    if (event === "newAsset") {
      const endpoint = "/api-gateway/api/v2/dtables/{{dtable_uuid}}/sql";
      sqlResult = await import_GenericFunctions.seaTableApiRequest.call(this, ctx, "POST", endpoint, {
        sql: `SELECT _id, _ctime, _mtime, \`${assetColumn}\` FROM ${tableName} WHERE \`${assetColumn}\` IS NOT NULL ORDER BY _mtime DESC LIMIT ${limit}`,
        convert_keys: options.convert ?? true
      });
      metadata = sqlResult.metadata;
      const columnType = metadata.find((obj) => obj.name == assetColumn);
      const assetColumnType = columnType?.type || null;
      rows = sqlResult.results.filter((obj) => new Date(obj._mtime) > new Date(startDate));
      const newRows = [];
      for (const row of rows) {
        if (assetColumnType === "digital-sign") {
          const signature = row[assetColumn] || [];
          if (signature.sign_time) {
            if (new Date(signature.sign_time) > new Date(startDate)) {
              newRows.push(signature);
            }
          }
        }
      }
    } else if (viewName || viewName === "") {
      requestMeta = await import_GenericFunctions.seaTableApiRequest.call(
        this,
        ctx,
        "GET",
        "/api-gateway/api/v2/dtables/{{dtable_uuid}}/metadata/"
      );
      requestRows = await import_GenericFunctions.seaTableApiRequest.call(
        this,
        ctx,
        "GET",
        "/api-gateway/api/v2/dtables/{{dtable_uuid}}/rows/",
        {},
        {
          table_name: tableName,
          view_name: viewName,
          limit,
          convert_keys: options.convert ?? true
        }
      );
      metadata = requestMeta.metadata.tables.find((table) => table.name === tableName)?.columns ?? [];
      if (this.getMode() === "manual") {
        rows = requestRows.rows;
      } else {
        rows = requestRows.rows.filter((obj) => new Date(obj[filterField]) > new Date(startDate));
      }
    } else {
      const endpoint = "/api-gateway/api/v2/dtables/{{dtable_uuid}}/sql";
      const sqlQuery = `SELECT * FROM \`${tableName}\` WHERE ${filterField} BETWEEN "${(0, import_moment_timezone.default)(
        startDate
      ).format("YYYY-MM-D HH:mm:ss")}" AND "${(0, import_moment_timezone.default)(endDate).format(
        "YYYY-MM-D HH:mm:ss"
      )}" ORDER BY ${filterField} DESC LIMIT ${limit}`;
      sqlResult = await import_GenericFunctions.seaTableApiRequest.call(this, ctx, "POST", endpoint, {
        sql: sqlQuery,
        convert_keys: options.convert ?? true
      });
      metadata = sqlResult.metadata;
      rows = sqlResult.results;
    }
    const collaboratorsResult = await import_GenericFunctions.seaTableApiRequest.call(
      this,
      ctx,
      "GET",
      "/api-gateway/api/v2/dtables/{{dtable_uuid}}/related-users/"
    );
    const collaborators = collaboratorsResult.user_list || [];
    if (Array.isArray(rows) && rows.length > 0) {
      const simple = options.simple ?? true;
      if (simple) {
        rows = rows.map((row) => (0, import_GenericFunctions.simplify_new)(row));
      }
      rows = rows.map((row) => (0, import_GenericFunctions.enrichColumns)(row, metadata, collaborators));
      return [this.helpers.returnJsonArray(rows)];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeaTableTriggerV2
});
//# sourceMappingURL=SeaTableTriggerV2.node.js.map