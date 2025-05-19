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
var Amqp_node_exports = {};
__export(Amqp_node_exports, {
  Amqp: () => Amqp
});
module.exports = __toCommonJS(Amqp_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_rhea = require("rhea");
async function checkIfCredentialsValid(credentials) {
  const connectOptions = {
    reconnect: false,
    host: credentials.hostname,
    hostname: credentials.hostname,
    port: credentials.port,
    username: credentials.username ? credentials.username : void 0,
    password: credentials.password ? credentials.password : void 0,
    transport: credentials.transportType ? credentials.transportType : void 0
  };
  let conn = void 0;
  try {
    const container = (0, import_rhea.create_container)();
    await new Promise((resolve, reject) => {
      container.on("connection_open", function(_context) {
        resolve();
      });
      container.on("disconnected", function(context) {
        reject(context.error ?? new Error("unknown error"));
      });
      conn = container.connect(connectOptions);
    });
  } catch (error) {
    return {
      status: "Error",
      message: error.message
    };
  } finally {
    if (conn) conn.close();
  }
  return {
    status: "OK",
    message: "Connection successful!"
  };
}
class Amqp {
  constructor() {
    this.description = {
      displayName: "AMQP Sender",
      name: "amqp",
      icon: "file:amqp.svg",
      group: ["transform"],
      version: 1,
      description: "Sends a raw-message via AMQP 1.0, executed once per item",
      defaults: {
        name: "AMQP Sender"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "amqp",
          required: true,
          testedBy: "amqpConnectionTest"
        }
      ],
      properties: [
        {
          displayName: "Queue / Topic",
          name: "sink",
          type: "string",
          default: "",
          placeholder: "e.g. topic://sourcename.something",
          description: "Name of the queue of topic to publish to"
        },
        // Header Parameters
        {
          displayName: "Headers",
          name: "headerParametersJson",
          type: "json",
          default: "",
          description: "Header parameters as JSON (flat object). Sent as application_properties in amqp-message meta info."
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Container ID",
              name: "containerId",
              type: "string",
              default: "",
              description: "Will be used to pass to the RHEA Backend as container_id"
            },
            {
              displayName: "Data as Object",
              name: "dataAsObject",
              type: "boolean",
              default: false,
              description: "Whether to send the data as an object"
            },
            {
              displayName: "Reconnect",
              name: "reconnect",
              type: "boolean",
              default: true,
              description: "Whether to automatically reconnect if disconnected"
            },
            {
              displayName: "Reconnect Limit",
              name: "reconnectLimit",
              type: "number",
              default: 50,
              description: "Maximum number of reconnect attempts"
            },
            {
              displayName: "Send Property",
              name: "sendOnlyProperty",
              type: "string",
              default: "",
              description: "The only property to send. If empty the whole item will be sent."
            }
          ]
        }
      ]
    };
    this.methods = {
      credentialTest: {
        async amqpConnectionTest(credential) {
          const credentials = credential.data;
          return await checkIfCredentialsValid(credentials);
        }
      }
    };
  }
  async execute() {
    const container = (0, import_rhea.create_container)();
    let connection = void 0;
    let sender = void 0;
    try {
      const credentials = await this.getCredentials("amqp");
      const credentialsTestResult = await checkIfCredentialsValid(credentials);
      if (credentialsTestResult.status === "Error") {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), credentialsTestResult.message, {
          description: "Check your credentials and try again"
        });
      }
      const sink = this.getNodeParameter("sink", 0, "");
      const applicationProperties = this.getNodeParameter("headerParametersJson", 0, {});
      const options = this.getNodeParameter("options", 0, {});
      const containerId = options.containerId;
      const containerReconnect = options.reconnect || true;
      const containerReconnectLimit = options.reconnectLimit || 50;
      let headerProperties;
      if (typeof applicationProperties === "string" && applicationProperties !== "") {
        headerProperties = JSON.parse(applicationProperties);
      } else {
        headerProperties = applicationProperties;
      }
      if (sink === "") {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Queue or Topic required!");
      }
      const connectOptions = {
        host: credentials.hostname,
        hostname: credentials.hostname,
        port: credentials.port,
        username: credentials.username ? credentials.username : void 0,
        password: credentials.password ? credentials.password : void 0,
        transport: credentials.transportType ? credentials.transportType : void 0,
        container_id: containerId ? containerId : void 0,
        id: containerId ? containerId : void 0,
        reconnect: containerReconnect,
        reconnect_limit: containerReconnectLimit
      };
      const node = this.getNode();
      const responseData = await new Promise((resolve, reject) => {
        connection = container.connect(connectOptions);
        sender = connection.open_sender(sink);
        let limit = containerReconnectLimit;
        container.on("disconnected", function(context) {
          if (limit <= 0) {
            connection.options.reconnect = false;
            const error = new import_n8n_workflow.NodeOperationError(
              node,
              (context.error ?? {}).message ?? "Disconnected",
              {
                description: `Check your credentials${options.reconnect ? "" : ", and consider enabling reconnect in the options"}`,
                itemIndex: 0
              }
            );
            reject(error);
          }
          limit--;
        });
        container.once("sendable", (context) => {
          const returnData = [];
          const items = this.getInputData();
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let body = item.json;
            const sendOnlyProperty = options.sendOnlyProperty;
            if (sendOnlyProperty) {
              body = body[sendOnlyProperty];
            }
            if (options.dataAsObject !== true) {
              body = JSON.stringify(body);
            }
            const result = context.sender?.send({
              application_properties: headerProperties,
              body
            });
            returnData.push({ json: { id: result?.id }, pairedItems: { item: i } });
          }
          resolve(returnData);
        });
      });
      return [responseData];
    } catch (error) {
      if (this.continueOnFail()) {
        return [[{ json: { error: error.message }, pairedItems: { item: 0 } }]];
      } else {
        throw error;
      }
    } finally {
      if (sender) sender.close();
      if (connection) connection.close();
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Amqp
});
//# sourceMappingURL=Amqp.node.js.map