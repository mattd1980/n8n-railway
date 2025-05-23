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
var AwsSnsTrigger_node_exports = {};
__export(AwsSnsTrigger_node_exports, {
  AwsSnsTrigger: () => AwsSnsTrigger
});
module.exports = __toCommonJS(AwsSnsTrigger_node_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class AwsSnsTrigger {
  constructor() {
    this.description = {
      displayName: "AWS SNS Trigger",
      subtitle: `={{$parameter["topic"].split(':')[5]}}`,
      name: "awsSnsTrigger",
      icon: "file:sns.svg",
      group: ["trigger"],
      version: 1,
      description: "Handle AWS SNS events via webhooks",
      defaults: {
        name: "AWS SNS Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
          required: true
        }
      ],
      webhooks: [
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "Topic",
          name: "topic",
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          required: true,
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              placeholder: "Select a topic...",
              typeOptions: {
                searchListMethod: "listTopics",
                searchable: true
              }
            },
            {
              displayName: "By URL",
              name: "url",
              type: "string",
              placeholder: "https://us-east-1.console.aws.amazon.com/sns/v3/home?region=us-east-1#/topic/arn:aws:sns:us-east-1:777777777777:your_topic",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "https:\\/\\/[0-9a-zA-Z\\-_]+\\.console\\.aws\\.amazon\\.com\\/sns\\/v3\\/home\\?region\\=[0-9a-zA-Z\\-_]+\\#\\/topic\\/arn:aws:sns:[0-9a-zA-Z\\-_]+:[0-9]+:[0-9a-zA-Z\\-_]+(?:\\/.*|)",
                    errorMessage: "Not a valid AWS SNS Topic URL"
                  }
                }
              ],
              extractValue: {
                type: "regex",
                regex: "https:\\/\\/[0-9a-zA-Z\\-_]+\\.console\\.aws\\.amazon\\.com\\/sns\\/v3\\/home\\?region\\=[0-9a-zA-Z\\-_]+\\#\\/topic\\/(arn:aws:sns:[0-9a-zA-Z\\-_]+:[0-9]+:[0-9a-zA-Z\\-_]+)(?:\\/.*|)"
              }
            },
            {
              displayName: "ID",
              name: "id",
              type: "string",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "arn:aws:sns:[0-9a-zA-Z\\-_]+:[0-9]+:[0-9a-zA-Z\\-_]+",
                    errorMessage: "Not a valid AWS SNS Topic ARN"
                  }
                }
              ],
              placeholder: "arn:aws:sns:your-aws-region:777777777777:your_topic"
            }
          ]
        }
      ]
    };
    this.methods = {
      listSearch: {
        async listTopics(filter, paginationToken) {
          const returnData = [];
          const params = paginationToken ? `NextToken=${encodeURIComponent(paginationToken)}` : "";
          const data = await import_GenericFunctions.awsApiRequestSOAP.call(
            this,
            "sns",
            "GET",
            "/?Action=ListTopics&" + params
          );
          let topics = data.ListTopicsResponse.ListTopicsResult.Topics.member;
          const nextToken = data.ListTopicsResponse.ListTopicsResult.NextToken;
          if (nextToken) {
            paginationToken = nextToken;
          } else {
            paginationToken = void 0;
          }
          if (!Array.isArray(topics)) {
            topics = [topics];
          }
          for (const topic of topics) {
            const topicArn = topic.TopicArn;
            const arnParsed = topicArn.split(":");
            const topicName = arnParsed[5];
            const awsRegion = arnParsed[3];
            if (filter && !topicName.includes(filter)) {
              continue;
            }
            returnData.push({
              name: topicName,
              value: topicArn,
              url: `https://${awsRegion}.console.aws.amazon.com/sns/v3/home?region=${awsRegion}#/topic/${topicArn}`
            });
          }
          return { results: returnData, paginationToken };
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          const topic = this.getNodeParameter("topic", void 0, {
            extractValue: true
          });
          if (webhookData.webhookId === void 0) {
            return false;
          }
          const params = [`TopicArn=${topic}`, "Version=2010-03-31"];
          const data = await import_GenericFunctions.awsApiRequestSOAP.call(
            this,
            "sns",
            "GET",
            "/?Action=ListSubscriptionsByTopic&" + params.join("&")
          );
          const subscriptions = (0, import_get.default)(
            data,
            "ListSubscriptionsByTopicResponse.ListSubscriptionsByTopicResult.Subscriptions"
          );
          if (!subscriptions?.member) {
            return false;
          }
          let subscriptionMembers = subscriptions.member;
          if (!Array.isArray(subscriptionMembers)) {
            subscriptionMembers = [subscriptionMembers];
          }
          for (const subscription of subscriptionMembers) {
            if (webhookData.webhookId === subscription.SubscriptionArn) {
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookData = this.getWorkflowStaticData("node");
          const webhookUrl = this.getNodeWebhookUrl("default");
          const topic = this.getNodeParameter("topic", void 0, {
            extractValue: true
          });
          if (webhookUrl.includes("%20")) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              "The name of the SNS Trigger Node is not allowed to contain any spaces!"
            );
          }
          const params = [
            `TopicArn=${topic}`,
            `Endpoint=${webhookUrl}`,
            `Protocol=${webhookUrl?.split(":")[0]}`,
            "ReturnSubscriptionArn=true",
            "Version=2010-03-31"
          ];
          const { SubscribeResponse } = await import_GenericFunctions.awsApiRequestSOAP.call(
            this,
            "sns",
            "GET",
            "/?Action=Subscribe&" + params.join("&")
          );
          webhookData.webhookId = SubscribeResponse.SubscribeResult.SubscriptionArn;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          const params = [`SubscriptionArn=${webhookData.webhookId}`, "Version=2010-03-31"];
          try {
            await import_GenericFunctions.awsApiRequestSOAP.call(
              this,
              "sns",
              "GET",
              "/?Action=Unsubscribe&" + params.join("&")
            );
          } catch (error) {
            return false;
          }
          delete webhookData.webhookId;
          return true;
        }
      }
    };
  }
  async webhook() {
    const req = this.getRequestObject();
    const topic = this.getNodeParameter("topic", void 0, {
      extractValue: true
    });
    const body = (0, import_n8n_workflow.jsonParse)(
      req.rawBody.toString()
    );
    if (body.Type === "SubscriptionConfirmation" && body.TopicArn === topic) {
      const { Token } = body;
      const params = [`TopicArn=${topic}`, `Token=${Token}`, "Version=2010-03-31"];
      await import_GenericFunctions.awsApiRequestSOAP.call(
        this,
        "sns",
        "GET",
        "/?Action=ConfirmSubscription&" + params.join("&")
      );
      return {
        noWebhookResponse: true
      };
    }
    if (body.Type === "UnsubscribeConfirmation") {
      return {};
    }
    return {
      workflowData: [this.helpers.returnJsonArray(body)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AwsSnsTrigger
});
//# sourceMappingURL=AwsSnsTrigger.node.js.map