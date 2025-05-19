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
var HighLevelV2_node_exports = {};
__export(HighLevelV2_node_exports, {
  HighLevelV2: () => HighLevelV2
});
module.exports = __toCommonJS(HighLevelV2_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CalendarDescription = require("./description/CalendarDescription");
var import_ContactDescription = require("./description/ContactDescription");
var import_OpportunityDescription = require("./description/OpportunityDescription");
var import_TaskDescription = require("./description/TaskDescription");
var import_GenericFunctions = require("./GenericFunctions");
const resources = [
  {
    displayName: "Resource",
    name: "resource",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Contact",
        value: "contact"
      },
      {
        name: "Opportunity",
        value: "opportunity"
      },
      {
        name: "Task",
        value: "task"
      },
      {
        name: "Calendar",
        value: "calendar"
      }
    ],
    default: "contact",
    required: true
  }
];
const versionDescription = {
  displayName: "HighLevel",
  name: "highLevel",
  icon: "file:highLevel.svg",
  group: ["transform"],
  version: 2,
  description: "Consume HighLevel API v2",
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  defaults: {
    name: "HighLevel"
  },
  usableAsTool: true,
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "highLevelOAuth2Api",
      required: true
    }
  ],
  requestDefaults: {
    baseURL: "https://services.leadconnectorhq.com",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Version: "2021-07-28"
    }
  },
  requestOperations: {
    pagination: import_GenericFunctions.highLevelApiPagination
  },
  properties: [
    ...resources,
    ...import_ContactDescription.contactOperations,
    ...import_ContactDescription.contactNotes,
    ...import_ContactDescription.contactFields,
    ...import_OpportunityDescription.opportunityOperations,
    ...import_OpportunityDescription.opportunityFields,
    ...import_TaskDescription.taskOperations,
    ...import_TaskDescription.taskFields,
    ...import_CalendarDescription.calendarOperations,
    ...import_CalendarDescription.calendarFields
  ]
};
class HighLevelV2 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        getPipelines: import_GenericFunctions.getPipelines,
        getContacts: import_GenericFunctions.getContacts,
        getPipelineStages: import_GenericFunctions.getPipelineStages,
        getUsers: import_GenericFunctions.getUsers
      },
      listSearch: {
        async searchCustomFields(filter) {
          const { locationId } = (await this.getCredentials("highLevelOAuth2Api"))?.oauthTokenData ?? {};
          const responseData = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "highLevelOAuth2Api",
            {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              url: `https://services.leadconnectorhq.com/locations/${locationId}/customFields?model=contact`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Version: "2021-07-28"
              }
            }
          );
          const customFields = responseData.customFields;
          const results = customFields.map((a) => ({
            name: a.name,
            value: a.id
          })).filter((a) => !filter || a.name.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
          });
          return { results };
        },
        async searchTimezones(filter) {
          const { locationId } = (await this.getCredentials("highLevelOAuth2Api"))?.oauthTokenData ?? {};
          const responseData = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "highLevelOAuth2Api",
            {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              url: `https://services.leadconnectorhq.com/locations/${locationId}/timezones`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Version: "2021-07-28"
              }
            }
          );
          const timezones = responseData.timeZones;
          const results = timezones.map((zone) => ({
            name: zone.trim(),
            value: zone.trim()
          })).filter((zone) => !filter || zone.name.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
          });
          return { results };
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HighLevelV2
});
//# sourceMappingURL=HighLevelV2.node.js.map