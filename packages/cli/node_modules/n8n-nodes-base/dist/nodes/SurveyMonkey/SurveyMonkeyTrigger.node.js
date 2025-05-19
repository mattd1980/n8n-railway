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
var SurveyMonkeyTrigger_node_exports = {};
__export(SurveyMonkeyTrigger_node_exports, {
  SurveyMonkeyTrigger: () => SurveyMonkeyTrigger
});
module.exports = __toCommonJS(SurveyMonkeyTrigger_node_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class SurveyMonkeyTrigger {
  constructor() {
    this.description = {
      displayName: "SurveyMonkey Trigger",
      name: "surveyMonkeyTrigger",
      icon: "file:surveyMonkey.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Survey Monkey events occur",
      defaults: {
        name: "SurveyMonkey Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "surveyMonkeyApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "surveyMonkeyOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      webhooks: [
        {
          name: "setup",
          httpMethod: "HEAD",
          responseMode: "onReceived",
          path: "webhook"
        },
        {
          name: "default",
          httpMethod: "POST",
          responseMode: "onReceived",
          path: "webhook"
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Type",
          name: "objectType",
          type: "options",
          options: [
            {
              name: "Collector",
              value: "collector"
            },
            {
              name: "Survey",
              value: "survey"
            }
          ],
          default: "",
          required: true
        },
        {
          displayName: "Event",
          name: "event",
          displayOptions: {
            show: {
              objectType: ["survey"]
            }
          },
          type: "options",
          options: [
            {
              name: "Collector Created",
              value: "collector_created",
              description: "A collector is created"
            },
            {
              name: "Collector Deleted",
              value: "collector_deleted",
              description: "A collector is deleted"
            },
            {
              name: "Collector Updated",
              value: "collector_updated",
              description: "A collector is updated"
            },
            {
              name: "Response Completed",
              value: "response_completed",
              description: "A survey response is completed"
            },
            {
              name: "Response Created",
              value: "response_created",
              description: "A respondent begins a survey"
            },
            {
              name: "Response Deleted",
              value: "response_deleted",
              description: "A response is deleted"
            },
            {
              name: "Response Disqualified",
              value: "response_disqualified",
              description: "A survey response is disqualified"
            },
            {
              name: "Response Overquota",
              value: "response_overquota",
              description: "A response is over a survey\u2019s quota"
            },
            {
              name: "Response Updated",
              value: "response_updated",
              description: "A survey response is updated"
            },
            {
              name: "Survey Created",
              value: "survey_created",
              description: "A survey is created"
            },
            {
              name: "Survey Deleted",
              value: "survey_deleted",
              description: "A survey is deleted"
            },
            {
              name: "Survey Updated",
              value: "survey_updated",
              description: "A survey is updated"
            }
          ],
          default: "",
          required: true
        },
        {
          displayName: "Event",
          name: "event",
          type: "options",
          displayOptions: {
            show: {
              objectType: ["collector"]
            }
          },
          options: [
            {
              name: "Collector Deleted",
              value: "collector_deleted",
              description: "A collector is deleted"
            },
            {
              name: "Collector Updated",
              value: "collector_updated",
              description: "A collector is updated"
            },
            {
              name: "Response Completed",
              value: "response_completed",
              description: "A survey response is completed"
            },
            {
              name: "Response Created",
              value: "response_created",
              description: "A respondent begins a survey"
            },
            {
              name: "Response Deleted",
              value: "response_deleted",
              description: "A response is deleted"
            },
            {
              name: "Response Disqualified",
              value: "response_disqualified",
              description: "A survey response is disqualified"
            },
            {
              name: "Response Overquota",
              value: "response_overquota",
              description: "A response is over a survey\u2019s quota"
            },
            {
              name: "Response Updated",
              value: "response_updated",
              description: "A survey response is updated"
            }
          ],
          default: "",
          required: true
        },
        {
          displayName: "Survey Names or IDs",
          name: "surveyIds",
          type: "multiOptions",
          description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          displayOptions: {
            show: {
              objectType: ["survey"]
            },
            hide: {
              event: ["survey_created"]
            }
          },
          typeOptions: {
            loadOptionsMethod: "getSurveys"
          },
          options: [],
          default: [],
          required: true
        },
        {
          displayName: "Survey Name or ID",
          name: "surveyId",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          displayOptions: {
            show: {
              objectType: ["collector"]
            }
          },
          typeOptions: {
            loadOptionsMethod: "getSurveys"
          },
          default: [],
          required: true
        },
        {
          displayName: "Collector Names or IDs",
          name: "collectorIds",
          type: "multiOptions",
          description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          displayOptions: {
            show: {
              objectType: ["collector"]
            }
          },
          typeOptions: {
            loadOptionsMethod: "getCollectors",
            loadOptionsDependsOn: ["surveyId"]
          },
          options: [],
          default: [],
          required: true
        },
        {
          displayName: "Resolve Data",
          name: "resolveData",
          type: "boolean",
          displayOptions: {
            show: {
              event: ["response_completed"]
            }
          },
          default: true,
          // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
          description: "By default the webhook-data only contain the IDs. If this option gets activated, it will resolve the data automatically."
        },
        {
          displayName: "Only Answers",
          name: "onlyAnswers",
          displayOptions: {
            show: {
              resolveData: [true],
              event: ["response_completed"]
            }
          },
          type: "boolean",
          default: true,
          description: "Whether to return only the answers of the form and not any of the other data"
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the survey's collectors to display them to user so that they can
        // select them easily
        async getCollectors() {
          const surveyId = this.getCurrentNodeParameter("surveyId");
          const returnData = [];
          const collectors = await import_GenericFunctions.surveyMonkeyRequestAllItems.call(
            this,
            "data",
            "GET",
            `/surveys/${surveyId}/collectors`
          );
          for (const collector of collectors) {
            const collectorName = collector.name;
            const collectorId = collector.id;
            returnData.push({
              name: collectorName,
              value: collectorId
            });
          }
          return returnData;
        },
        // Get all the surveys to display them to user so that they can
        // select them easily
        async getSurveys() {
          const returnData = [];
          const surveys = await import_GenericFunctions.surveyMonkeyRequestAllItems.call(this, "data", "GET", "/surveys");
          for (const survey of surveys) {
            const surveyName = survey.title;
            const surveyId = survey.id;
            returnData.push({
              name: surveyName,
              value: surveyId
            });
          }
          return returnData;
        }
      }
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const objectType = this.getNodeParameter("objectType");
          const event = this.getNodeParameter("event");
          const endpoint = "/webhooks";
          const responseData = await import_GenericFunctions.surveyMonkeyRequestAllItems.call(
            this,
            "data",
            "GET",
            endpoint,
            {}
          );
          const webhookUrl = this.getNodeWebhookUrl("default");
          const ids = [];
          if (objectType === "survey" && event !== "survey_created") {
            const surveyIds = this.getNodeParameter("surveyIds");
            ids.push.apply(ids, surveyIds);
          } else if (objectType === "collector") {
            const collectorIds = this.getNodeParameter("collectorIds");
            ids.push.apply(ids, collectorIds);
          }
          for (const webhook of responseData) {
            const webhookDetails = await import_GenericFunctions.surveyMonkeyApiRequest.call(
              this,
              "GET",
              `/webhooks/${webhook.id}`
            );
            if (webhookDetails.subscription_url === webhookUrl && (0, import_GenericFunctions.idsExist)(webhookDetails.object_ids, ids) && webhookDetails.event_type === event) {
              const webhookData = this.getWorkflowStaticData("node");
              webhookData.webhookId = webhook.id;
              return true;
            }
          }
          return false;
        },
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const event = this.getNodeParameter("event");
          const objectType = this.getNodeParameter("objectType");
          const endpoint = "/webhooks";
          const ids = [];
          if (objectType === "survey" && event !== "survey_created") {
            const surveyIds = this.getNodeParameter("surveyIds");
            ids.push.apply(ids, surveyIds);
          } else if (objectType === "collector") {
            const collectorIds = this.getNodeParameter("collectorIds");
            ids.push.apply(ids, collectorIds);
          }
          const body = {
            name: `n8n - Webhook [${event}]`,
            object_type: objectType,
            object_ids: ids,
            subscription_url: webhookUrl,
            event_type: event
          };
          if (objectType === "survey" && event === "survey_created") {
            delete body.object_type;
            delete body.object_ids;
          }
          let responseData = {};
          responseData = await import_GenericFunctions.surveyMonkeyApiRequest.call(this, "POST", endpoint, body);
          if (responseData.id === void 0) {
            return false;
          }
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = responseData.id;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const endpoint = `/webhooks/${webhookData.webhookId}`;
            try {
              await import_GenericFunctions.surveyMonkeyApiRequest.call(this, "DELETE", endpoint);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const event = this.getNodeParameter("event");
    const objectType = this.getNodeParameter("objectType");
    const authenticationMethod = this.getNodeParameter("authentication");
    let credentials;
    const headerData = this.getHeaderData();
    const req = this.getRequestObject();
    const webhookName = this.getWebhookName();
    if (authenticationMethod === "accessToken") {
      credentials = await this.getCredentials("surveyMonkeyApi");
    } else {
      credentials = await this.getCredentials("surveyMonkeyOAuth2Api");
    }
    if (webhookName === "setup") {
      return {};
    }
    if (headerData["sm-signature"] === void 0) {
      return {};
    }
    return await new Promise((resolve, _reject) => {
      const data = [];
      req.on("data", (chunk) => {
        data.push(chunk);
      });
      req.on("end", async () => {
        const computedSignature = (0, import_crypto.createHmac)(
          "sha1",
          `${credentials.clientId}&${credentials.clientSecret}`
        ).update(data.join("")).digest("base64");
        if (headerData["sm-signature"] !== computedSignature) {
          return {};
        }
        let responseData = (0, import_n8n_workflow.jsonParse)(data.join(""));
        let endpoint = "";
        let returnItem = [
          {
            json: responseData
          }
        ];
        if (event === "response_completed") {
          const resolveData = this.getNodeParameter("resolveData");
          if (resolveData) {
            if (objectType === "survey") {
              endpoint = `/surveys/${responseData.resources.survey_id}/responses/${responseData.object_id}/details`;
            } else {
              endpoint = `/collectors/${responseData.resources.collector_id}/responses/${responseData.object_id}/details`;
            }
            responseData = await import_GenericFunctions.surveyMonkeyApiRequest.call(this, "GET", endpoint);
            const surveyId = responseData.survey_id;
            const questions = [];
            const answers = /* @__PURE__ */ new Map();
            const { pages } = await import_GenericFunctions.surveyMonkeyApiRequest.call(
              this,
              "GET",
              `/surveys/${surveyId}/details`
            );
            for (const page of pages) {
              questions.push.apply(questions, page.questions);
            }
            for (const page of responseData.pages) {
              for (const question of page.questions) {
                answers.set(question.id, question.answers);
              }
            }
            const responseQuestions = /* @__PURE__ */ new Map();
            for (const question of questions) {
              if (!answers.get(question.id)) {
                continue;
              }
              const heading = question.headings[0].heading;
              if (question.family === "open_ended" || question.family === "datetime") {
                if (question.subtype !== "multi") {
                  responseQuestions.set(heading, answers.get(question.id)[0].text);
                } else {
                  const results = {};
                  const keys = question.answers.rows.map((e) => e.text);
                  const values = answers.get(question.id)?.map((e) => e.text);
                  for (let i = 0; i < keys.length; i++) {
                    if (results[keys[i]] !== void 0) {
                      results[`${keys[i]}(${i})`] = values[i] || "";
                    } else {
                      results[keys[i]] = values[i] || "";
                    }
                  }
                  responseQuestions.set(heading, results);
                }
              }
              if (question.family === "single_choice") {
                const other = question.answers.other;
                if (other?.visible && other.is_answer_choice && answers.get(question.id)[0].other_id) {
                  responseQuestions.set(heading, answers.get(question.id)[0].text);
                } else if (other?.visible && !other.is_answer_choice) {
                  const choiceId = answers.get(question.id)[0].choice_id;
                  const choice = question.answers.choices.filter(
                    (e) => e.id === choiceId
                  )[0];
                  const comment = answers.get(question.id)?.find((e) => e.other_id === other.id)?.text;
                  responseQuestions.set(heading, { value: choice.text, comment });
                } else {
                  const choiceId = answers.get(question.id)[0].choice_id;
                  const choice = question.answers.choices.filter(
                    (e) => e.id === choiceId
                  )[0];
                  responseQuestions.set(heading, choice.text);
                }
              }
              if (question.family === "multiple_choice") {
                const other = question.answers.other;
                const choiceIds = answers.get(question.id)?.map((e) => e.choice_id);
                const value = question.answers.choices.filter((e) => choiceIds?.includes(e.id)).map((e) => e.text);
                if (other?.is_answer_choice && other.visible) {
                  const text = answers.get(question.id)?.find((e) => e.other_id === other.id)?.text;
                  value.push(text);
                }
                responseQuestions.set(heading, value);
              }
              if (question.family === "matrix") {
                const rows = question.answers.rows;
                if (rows.length > 1) {
                  const results = {};
                  const choiceIds = answers.get(question.id)?.map((e) => e.choice_id);
                  const rowIds = answers.get(question.id)?.map((e) => e.row_id);
                  const rowsValues = question.answers.rows.filter((e) => rowIds.includes(e.id)).map((e) => e.text);
                  const choicesValues = question.answers.choices.filter((e) => choiceIds.includes(e.id)).map((e) => e.text);
                  for (let i = 0; i < rowsValues.length; i++) {
                    results[rowsValues[i]] = choicesValues[i] || "";
                  }
                  for (const row of question.answers.rows) {
                    if (!rowIds.includes(row.id)) {
                      results[row.text] = "";
                    }
                  }
                  const other = question.answers.other;
                  if (other?.visible) {
                    results.comment = answers.get(question.id)?.filter((e) => e.other_id)[0].text;
                  }
                  responseQuestions.set(heading, results);
                } else {
                  const choiceIds = answers.get(question.id)?.map((e) => e.choice_id);
                  const value = question.answers.choices.filter((e) => choiceIds.includes(e.id)).map((e) => e.text === "" ? e.weight : e.text)[0];
                  responseQuestions.set(heading, value);
                  const other = question.answers.other;
                  if (other?.visible) {
                    const response = {};
                    const text = answers.get(question.id)?.filter((e) => e.other_id)[0].text;
                    response.value = value;
                    response.comment = text;
                    responseQuestions.set(heading, response);
                  }
                }
              }
              if (question.family === "demographic") {
                const rows = {};
                for (const row of answers.get(question.id)) {
                  rows[row.row_id] = row.text;
                }
                const addressInfo = {};
                for (const answer of question.answers.rows) {
                  addressInfo[answer.type] = rows[answer.id] || "";
                }
                responseQuestions.set(heading, addressInfo);
              }
              if (question.family === "presentation") {
                if (question.subtype === "image") {
                  const { url } = question.headings[0].image;
                  responseQuestions.set(heading, url);
                }
              }
            }
            delete responseData.pages;
            responseData.questions = {};
            const tuples = (0, import_n8n_workflow.deepCopy)([...responseQuestions]);
            for (const [key, value] of tuples) {
              responseData.questions[key] = value;
            }
            const onlyAnswers = this.getNodeParameter("onlyAnswers");
            if (onlyAnswers) {
              responseData = responseData.questions;
            }
            returnItem = [
              {
                json: responseData
              }
            ];
          }
        }
        return resolve({
          workflowData: [returnItem]
        });
      });
      req.on("error", (error) => {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
      });
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SurveyMonkeyTrigger
});
//# sourceMappingURL=SurveyMonkeyTrigger.node.js.map