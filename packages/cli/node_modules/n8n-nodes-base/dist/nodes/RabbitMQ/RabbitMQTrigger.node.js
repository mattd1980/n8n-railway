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
var RabbitMQTrigger_node_exports = {};
__export(RabbitMQTrigger_node_exports, {
  RabbitMQTrigger: () => RabbitMQTrigger
});
module.exports = __toCommonJS(RabbitMQTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_DefaultOptions = require("./DefaultOptions");
var import_GenericFunctions = require("./GenericFunctions");
class RabbitMQTrigger {
  constructor() {
    this.description = {
      displayName: "RabbitMQ Trigger",
      name: "rabbitmqTrigger",
      icon: "file:rabbitmq.svg",
      group: ["trigger"],
      version: 1,
      description: "Listens to RabbitMQ messages",
      eventTriggerDescription: "",
      defaults: {
        name: "RabbitMQ Trigger"
      },
      triggerPanel: {
        header: "",
        executionsHelp: {
          inactive: "<b>While building your workflow</b>, click the 'execute step' button, then trigger a Rabbit MQ event. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Once you're happy with your workflow</b>, <a data-key='activate'>activate</a> it. Then every time a change is detected, the workflow will execute. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor.",
          active: "<b>While building your workflow</b>, click the 'execute step' button, then trigger a Rabbit MQ event. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Your workflow will also execute automatically</b>, since it's activated. Every time a change is detected, this node will trigger an execution. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor."
        },
        activationHint: "Once you\u2019ve finished building your workflow, <a data-key='activate'>activate</a> it to have it also listen continuously (you just won\u2019t see those executions here)."
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "rabbitmq",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Queue / Topic",
          name: "queue",
          type: "string",
          default: "",
          placeholder: "queue-name",
          description: "The name of the queue to read from"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Content Is Binary",
              name: "contentIsBinary",
              type: "boolean",
              default: false,
              description: "Whether to save the content as binary"
            },
            {
              displayName: "Delete From Queue When",
              name: "acknowledge",
              type: "options",
              options: [
                {
                  name: "Execution Finishes",
                  value: "executionFinishes",
                  description: "After the workflow execution finished. No matter if the execution was successful or not."
                },
                {
                  name: "Execution Finishes Successfully",
                  value: "executionFinishesSuccessfully",
                  description: "After the workflow execution finished successfully"
                },
                {
                  name: "Immediately",
                  value: "immediately",
                  description: "As soon as the message got received"
                },
                {
                  name: "Specified Later in Workflow",
                  value: "laterMessageNode",
                  description: "Using a RabbitMQ node to remove the item from the queue"
                }
              ],
              default: "immediately",
              description: "When to acknowledge the message"
            },
            {
              displayName: "JSON Parse Body",
              name: "jsonParseBody",
              type: "boolean",
              displayOptions: {
                hide: {
                  contentIsBinary: [true]
                }
              },
              default: false,
              description: "Whether to parse the body to an object"
            },
            {
              displayName: "Only Content",
              name: "onlyContent",
              type: "boolean",
              displayOptions: {
                hide: {
                  contentIsBinary: [true]
                }
              },
              default: false,
              description: "Whether to return only the content property"
            },
            {
              displayName: "Parallel Message Processing Limit",
              name: "parallelMessages",
              type: "number",
              default: -1,
              displayOptions: {
                hide: {
                  acknowledge: ["immediately"]
                }
              },
              description: "Max number of executions at a time. Use -1 for no limit."
            },
            {
              displayName: "Binding",
              name: "binding",
              placeholder: "Add Binding",
              description: "Add binding to queu",
              type: "fixedCollection",
              typeOptions: {
                multipleValues: true
              },
              default: {},
              options: [
                {
                  name: "bindings",
                  displayName: "Binding",
                  values: [
                    {
                      displayName: "Exchange",
                      name: "exchange",
                      type: "string",
                      default: "",
                      placeholder: "exchange"
                    },
                    {
                      displayName: "RoutingKey",
                      name: "routingKey",
                      type: "string",
                      default: "",
                      placeholder: "routing-key"
                    }
                  ]
                }
              ]
            },
            ...import_DefaultOptions.rabbitDefaultOptions
          ].sort((a, b) => {
            if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
              return -1;
            }
            if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        },
        {
          displayName: "To delete an item from the queue, insert a RabbitMQ node later in the workflow and use the 'Delete from queue' operation",
          name: "laterMessageNode",
          type: "notice",
          displayOptions: {
            show: {
              "/options.acknowledge": ["laterMessageNode"]
            }
          },
          default: ""
        }
      ]
    };
  }
  async trigger() {
    const queue = this.getNodeParameter("queue");
    const options = this.getNodeParameter("options", {});
    const channel = await import_GenericFunctions.rabbitmqConnectQueue.call(this, queue, options);
    if (this.getMode() === "manual") {
      const manualTriggerFunction = async () => {
        await channel.prefetch(1);
        const processMessage = async (message) => {
          if (message !== null) {
            const item = await (0, import_GenericFunctions.parseMessage)(message, options, this.helpers);
            channel.ack(message);
            this.emit([[item]]);
          } else {
            this.emitError(new Error("Connection got closed unexpectedly"));
          }
        };
        const existingMessage = await channel.get(queue);
        if (existingMessage) await processMessage(existingMessage);
        else await channel.consume(queue, processMessage);
      };
      const closeFunction2 = async () => {
        await channel.close();
        await channel.connection.close();
        return;
      };
      return {
        closeFunction: closeFunction2,
        manualTriggerFunction
      };
    }
    const parallelMessages = options.parallelMessages ?? -1;
    if (isNaN(parallelMessages) || parallelMessages === 0 || parallelMessages < -1) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "Parallel message processing limit must be a number greater than zero (or -1 for no limit)"
      );
    }
    let acknowledgeMode = options.acknowledge ?? "immediately";
    if (parallelMessages !== -1 && acknowledgeMode === "immediately") {
      acknowledgeMode = "executionFinishes";
    }
    const messageTracker = new import_GenericFunctions.MessageTracker();
    let closeGotCalled = false;
    if (parallelMessages !== -1) {
      await channel.prefetch(parallelMessages);
    }
    channel.on("close", () => {
      if (!closeGotCalled) {
        this.emitError(new Error("Connection got closed unexpectedly"));
      }
    });
    const consumerInfo = await channel.consume(queue, async (message) => {
      if (message !== null) {
        try {
          if (acknowledgeMode !== "immediately") {
            messageTracker.received(message);
          }
          const item = await (0, import_GenericFunctions.parseMessage)(message, options, this.helpers);
          let responsePromise = void 0;
          let responsePromiseHook = void 0;
          if (acknowledgeMode !== "immediately" && acknowledgeMode !== "laterMessageNode") {
            responsePromise = this.helpers.createDeferredPromise();
          } else if (acknowledgeMode === "laterMessageNode") {
            responsePromiseHook = this.helpers.createDeferredPromise();
          }
          if (responsePromiseHook) {
            this.emit([[item]], responsePromiseHook, void 0);
          } else {
            this.emit([[item]], void 0, responsePromise);
          }
          if (responsePromise && acknowledgeMode !== "laterMessageNode") {
            await responsePromise.promise.then(async (data) => {
              if (data.data.resultData.error) {
                if (acknowledgeMode === "executionFinishesSuccessfully") {
                  channel.nack(message);
                  messageTracker.answered(message);
                  return;
                }
              }
              channel.ack(message);
              messageTracker.answered(message);
            });
          } else if (responsePromiseHook && acknowledgeMode === "laterMessageNode") {
            await responsePromiseHook.promise.then(() => {
              channel.ack(message);
              messageTracker.answered(message);
            });
          } else {
            channel.ack(message);
          }
        } catch (error) {
          const workflow = this.getWorkflow();
          const node = this.getNode();
          if (acknowledgeMode !== "immediately") {
            messageTracker.answered(message);
          }
          this.logger.error(
            `There was a problem with the RabbitMQ Trigger node "${node.name}" in workflow "${workflow.id}": "${error.message}"`,
            {
              node: node.name,
              workflowId: workflow.id
            }
          );
        }
      }
    });
    const consumerTag = consumerInfo.consumerTag;
    const closeFunction = async () => {
      closeGotCalled = true;
      try {
        return await messageTracker.closeChannel(channel, consumerTag);
      } catch (error) {
        const workflow = this.getWorkflow();
        const node = this.getNode();
        this.logger.error(
          `There was a problem closing the RabbitMQ Trigger node connection "${node.name}" in workflow "${workflow.id}": "${error.message}"`,
          {
            node: node.name,
            workflowId: workflow.id
          }
        );
      }
    };
    return {
      closeFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RabbitMQTrigger
});
//# sourceMappingURL=RabbitMQTrigger.node.js.map