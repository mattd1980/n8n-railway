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
var GitlabTrigger_node_exports = {};
__export(GitlabTrigger_node_exports, {
  GitlabTrigger: () => GitlabTrigger
});
module.exports = __toCommonJS(GitlabTrigger_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
const GITLAB_EVENTS = [
  {
    name: "Comment",
    value: "note",
    description: "Triggered when a new comment is made on commits, merge requests, issues, and code snippets"
  },
  {
    name: "Confidential Issues",
    value: "confidential_issues",
    description: "Triggered on confidential issues' events"
  },
  {
    name: "Confidential Comments",
    value: "confidential_note",
    description: "Triggered when a confidential comment is made"
  },
  {
    name: "Deployments",
    value: "deployment",
    description: "Triggered when a deployment starts/succeeds/fails/is cancelled"
  },
  {
    name: "Issue",
    value: "issues",
    description: "Triggered when a new issue is created or an existing issue was updated/closed/reopened"
  },
  {
    name: "Job",
    value: "job",
    description: "Triggered on status change of a job"
  },
  {
    name: "Merge Request",
    value: "merge_requests",
    description: "Triggered when a new merge request is created, an existing merge request was updated/merged/closed or a commit is added in the source branch"
  },
  {
    name: "Pipeline",
    value: "pipeline",
    description: "Triggered on status change of Pipeline"
  },
  {
    name: "Push",
    value: "push",
    description: "Triggered when you push to the repository except when pushing tags"
  },
  {
    name: "Release",
    value: "releases",
    description: "Release events are triggered when a release is created or updated"
  },
  {
    name: "Tag",
    value: "tag_push",
    description: "Triggered when you create (or delete) tags to the repository"
  },
  {
    name: "Wiki Page",
    value: "wiki_page",
    description: "Triggered when a wiki page is created, updated or deleted"
  }
];
class GitlabTrigger {
  constructor() {
    this.description = {
      displayName: "GitLab Trigger",
      name: "gitlabTrigger",
      icon: "file:gitlab.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["owner"] + "/" + $parameter["repository"] + ": " + $parameter["events"].join(", ")}}',
      description: "Starts the workflow when GitLab events occur",
      defaults: {
        name: "GitLab Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "gitlabApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "gitlabOAuth2Api",
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
          displayName: "Repository Owner",
          name: "owner",
          type: "string",
          default: "",
          required: true,
          placeholder: "n8n-io",
          description: "Owner of the repository"
        },
        {
          displayName: "Repository Name",
          name: "repository",
          type: "string",
          default: "",
          required: true,
          placeholder: "n8n",
          description: "The name of the repository"
        },
        {
          displayName: "Events",
          name: "events",
          type: "multiOptions",
          options: [
            ...GITLAB_EVENTS,
            {
              name: "*",
              value: "*",
              description: "Any time any event is triggered (Wildcard Event)"
            }
          ],
          required: true,
          default: [],
          description: "The events to listen to"
        }
      ]
    };
    this.webhookMethods = {
      default: {
        async checkExists() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId === void 0) {
            return false;
          }
          const owner = this.getNodeParameter("owner");
          const repository = this.getNodeParameter("repository");
          const path = `${owner}/${repository}`.replace(/\//g, "%2F");
          const endpoint = `/projects/${path}/hooks/${webhookData.webhookId}`;
          try {
            await import_GenericFunctions.gitlabApiRequest.call(this, "GET", endpoint, {});
          } catch (error) {
            if (error.cause.httpCode === "404" || error.description.includes("404")) {
              delete webhookData.webhookId;
              delete webhookData.webhookEvents;
              return false;
            }
            throw error;
          }
          return true;
        },
        /**
         * Gitlab API - Add project hook:
         * 	https://docs.gitlab.com/ee/api/projects.html#add-project-hook
         */
        async create() {
          const webhookUrl = this.getNodeWebhookUrl("default");
          const owner = this.getNodeParameter("owner");
          const repository = this.getNodeParameter("repository");
          let eventsArray = this.getNodeParameter("events", []);
          if (eventsArray.includes("*")) {
            eventsArray = GITLAB_EVENTS.map((e) => e.value);
          }
          const events = {};
          for (const e of eventsArray) {
            events[`${e}_events`] = true;
          }
          if (events.push_events === void 0) {
            events.push_events = false;
          }
          const path = `${owner}/${repository}`.replace(/\//g, "%2F");
          const endpoint = `/projects/${path}/hooks`;
          const body = {
            url: webhookUrl,
            ...events,
            enable_ssl_verification: false
          };
          let responseData;
          try {
            responseData = await import_GenericFunctions.gitlabApiRequest.call(this, "POST", endpoint, body);
          } catch (error) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
          }
          if (responseData.id === void 0) {
            throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
              message: "GitLab webhook creation response did not contain the expected data."
            });
          }
          const webhookData = this.getWorkflowStaticData("node");
          webhookData.webhookId = responseData.id;
          webhookData.webhookEvents = eventsArray;
          return true;
        },
        async delete() {
          const webhookData = this.getWorkflowStaticData("node");
          if (webhookData.webhookId !== void 0) {
            const owner = this.getNodeParameter("owner");
            const repository = this.getNodeParameter("repository");
            const path = `${owner}/${repository}`.replace(/\//g, "%2F");
            const endpoint = `/projects/${path}/hooks/${webhookData.webhookId}`;
            const body = {};
            try {
              await import_GenericFunctions.gitlabApiRequest.call(this, "DELETE", endpoint, body);
            } catch (error) {
              return false;
            }
            delete webhookData.webhookId;
            delete webhookData.webhookEvents;
          }
          return true;
        }
      }
    };
  }
  async webhook() {
    const bodyData = this.getBodyData();
    const returnData = [];
    returnData.push({
      body: bodyData,
      headers: this.getHeaderData(),
      query: this.getQueryData()
    });
    return {
      workflowData: [this.helpers.returnJsonArray(returnData)]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GitlabTrigger
});
//# sourceMappingURL=GitlabTrigger.node.js.map