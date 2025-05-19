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
var PostgresTrigger_node_exports = {};
__export(PostgresTrigger_node_exports, {
  PostgresTrigger: () => PostgresTrigger
});
module.exports = __toCommonJS(PostgresTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_PostgresTrigger = require("./PostgresTrigger.functions");
class PostgresTrigger {
  constructor() {
    this.description = {
      displayName: "Postgres Trigger",
      name: "postgresTrigger",
      icon: "file:postgres.svg",
      group: ["trigger"],
      version: 1,
      description: "Listens to Postgres messages",
      eventTriggerDescription: "",
      defaults: {
        name: "Postgres Trigger"
      },
      triggerPanel: {
        header: "",
        executionsHelp: {
          inactive: "<b>While building your workflow</b>, click the 'execute step' button, then trigger a Postgres event. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Once you're happy with your workflow</b>, <a data-key='activate'>activate</a> it. Then every time a change is detected, the workflow will execute. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor.",
          active: "<b>While building your workflow</b>, click the 'execute step' button, then trigger a Postgres event. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Your workflow will also execute automatically</b>, since it's activated. Every time a change is detected, this node will trigger an execution. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor."
        },
        activationHint: "Once you've finished building your workflow, <a data-key='activate'>activate</a> it to have it also listen continuously (you just won't see those executions here)."
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "postgres",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Listen For",
          name: "triggerMode",
          type: "options",
          options: [
            {
              name: "Table Row Change Events",
              value: "createTrigger",
              description: "Insert, update or delete"
            },
            {
              name: "Advanced",
              value: "listenTrigger",
              description: "Listen to existing Postgres channel"
            }
          ],
          default: "createTrigger"
        },
        {
          displayName: "Schema Name",
          name: "schema",
          type: "resourceLocator",
          default: { mode: "list", value: "public" },
          required: true,
          displayOptions: {
            show: {
              triggerMode: ["createTrigger"]
            }
          },
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              placeholder: "Select a schema",
              typeOptions: {
                searchListMethod: "searchSchema",
                searchFilterRequired: false
              }
            },
            {
              displayName: "Name",
              name: "name",
              type: "string",
              placeholder: "e.g. public"
            }
          ]
        },
        {
          displayName: "Table Name",
          name: "tableName",
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          required: true,
          displayOptions: {
            show: {
              triggerMode: ["createTrigger"]
            }
          },
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              placeholder: "Select a table",
              typeOptions: {
                searchListMethod: "searchTables",
                searchFilterRequired: false
              }
            },
            {
              displayName: "Name",
              name: "name",
              type: "string",
              placeholder: "e.g. table_name"
            }
          ]
        },
        {
          displayName: "Channel Name",
          name: "channelName",
          type: "string",
          default: "",
          required: true,
          placeholder: "e.g. n8n_channel",
          description: "Name of the channel to listen to",
          displayOptions: {
            show: {
              triggerMode: ["listenTrigger"]
            }
          }
        },
        {
          displayName: "Event to listen for",
          name: "firesOn",
          type: "options",
          displayOptions: {
            show: {
              triggerMode: ["createTrigger"]
            }
          },
          options: [
            {
              name: "Insert",
              value: "INSERT"
            },
            {
              name: "Update",
              value: "UPDATE"
            },
            {
              name: "Delete",
              value: "DELETE"
            }
          ],
          default: "INSERT"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          displayOptions: {
            show: {
              triggerMode: ["createTrigger"]
            }
          },
          options: [
            {
              displayName: "Channel Name",
              name: "channelName",
              type: "string",
              placeholder: "e.g. n8n_channel",
              description: "Name of the channel to listen to",
              default: ""
            },
            {
              displayName: "Function Name",
              name: "functionName",
              type: "string",
              description: "Name of the function to create",
              placeholder: "e.g. n8n_trigger_function()",
              default: ""
            },
            {
              displayName: "Replace if Exists",
              name: "replaceIfExists",
              type: "boolean",
              description: "Whether to replace an existing function and trigger with the same name",
              default: false
            },
            {
              displayName: "Trigger Name",
              name: "triggerName",
              type: "string",
              description: "Name of the trigger to create",
              placeholder: "e.g. n8n_trigger",
              default: ""
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Connection Timeout",
              name: "connectionTimeout",
              type: "number",
              default: 30,
              description: "Number of seconds reserved for connecting to the database"
            },
            {
              displayName: "Delay Closing Idle Connection",
              name: "delayClosingIdleConnection",
              type: "number",
              default: 0,
              description: "Number of seconds to wait before idle connection would be eligible for closing",
              typeOptions: {
                minValue: 0
              }
            }
          ]
        }
      ]
    };
    this.methods = {
      listSearch: {
        searchSchema: import_PostgresTrigger.searchSchema,
        searchTables: import_PostgresTrigger.searchTables
      }
    };
  }
  async trigger() {
    const triggerMode = this.getNodeParameter("triggerMode", 0);
    const additionalFields = this.getNodeParameter("additionalFields", 0);
    const { db } = await import_PostgresTrigger.initDB.call(this);
    const connection = await db.connect({ direct: true });
    const onNotification = async (data) => {
      if (data.payload) {
        try {
          data.payload = JSON.parse(data.payload);
        } catch (error) {
        }
      }
      this.emit([this.helpers.returnJsonArray([data])]);
    };
    const pgNames = (0, import_PostgresTrigger.prepareNames)(this.getNode().id, this.getMode(), additionalFields);
    if (triggerMode === "createTrigger") {
      await import_PostgresTrigger.pgTriggerFunction.call(
        this,
        db,
        additionalFields,
        pgNames.functionName,
        pgNames.triggerName,
        pgNames.channelName
      );
    } else {
      pgNames.channelName = this.getNodeParameter("channelName", "");
    }
    await connection.none(`LISTEN ${pgNames.channelName}`);
    const cleanUpDb = async () => {
      try {
        try {
          await connection.query("SELECT 1");
        } catch {
          throw new import_n8n_workflow.TriggerCloseError(this.getNode(), { level: "warning" });
        }
        try {
          await connection.none("UNLISTEN $1:name", [pgNames.channelName]);
          if (triggerMode === "createTrigger") {
            const functionName = pgNames.functionName.includes("(") ? pgNames.functionName.split("(")[0] : pgNames.functionName;
            await connection.any("DROP FUNCTION IF EXISTS $1:name CASCADE", [functionName]);
            const schema = this.getNodeParameter("schema", void 0, {
              extractValue: true
            });
            const table = this.getNodeParameter("tableName", void 0, {
              extractValue: true
            });
            await connection.any("DROP TRIGGER IF EXISTS $1:name ON $2:name.$3:name CASCADE", [
              pgNames.triggerName,
              schema,
              table
            ]);
          }
        } catch (error) {
          throw new import_n8n_workflow.TriggerCloseError(this.getNode(), { cause: error, level: "error" });
        }
      } finally {
        connection.client.removeListener("notification", onNotification);
      }
    };
    connection.client.on("notification", onNotification);
    const closeFunction = async () => {
      await cleanUpDb();
    };
    const manualTriggerFunction = async () => {
      await new Promise(async (resolve, reject) => {
        const timeoutHandler = setTimeout(async () => {
          reject(
            new Error(
              await (async () => {
                await cleanUpDb();
                return 'Aborted, no data received within 30secs. This 30sec timeout is only set for "manually triggered execution". Active Workflows will listen indefinitely.';
              })()
            )
          );
        }, 6e4);
        connection.client.on("notification", async (data) => {
          if (data.payload) {
            try {
              data.payload = JSON.parse(data.payload);
            } catch (error) {
            }
          }
          this.emit([this.helpers.returnJsonArray([data])]);
          clearTimeout(timeoutHandler);
          resolve(true);
        });
      });
    };
    return {
      closeFunction,
      manualTriggerFunction: this.getMode() === "manual" ? manualTriggerFunction : void 0
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostgresTrigger
});
//# sourceMappingURL=PostgresTrigger.node.js.map