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
var SplunkV1_node_exports = {};
__export(SplunkV1_node_exports, {
  SplunkV1: () => SplunkV1
});
module.exports = __toCommonJS(SplunkV1_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
var import_descriptions2 = require("../../../utils/descriptions");
const versionDescription = {
  displayName: "Splunk",
  name: "splunk",
  icon: "file:splunk.svg",
  group: ["transform"],
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume the Splunk Enterprise API",
  defaults: {
    name: "Splunk"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "splunkApi",
      required: true
    }
  ],
  properties: [
    import_descriptions2.oldVersionNotice,
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Fired Alert",
          value: "firedAlert"
        },
        {
          name: "Search Configuration",
          value: "searchConfiguration"
        },
        {
          name: "Search Job",
          value: "searchJob"
        },
        {
          name: "Search Result",
          value: "searchResult"
        },
        {
          name: "User",
          value: "user"
        }
      ],
      default: "searchJob"
    },
    ...import_descriptions.firedAlertOperations,
    ...import_descriptions.searchConfigurationOperations,
    ...import_descriptions.searchConfigurationFields,
    ...import_descriptions.searchJobOperations,
    ...import_descriptions.searchJobFields,
    ...import_descriptions.searchResultOperations,
    ...import_descriptions.searchResultFields,
    ...import_descriptions.userOperations,
    ...import_descriptions.userFields
  ]
};
class SplunkV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        async getRoles() {
          const endpoint = "/services/authorization/roles";
          const responseData = await import_GenericFunctions.splunkApiRequest.call(
            this,
            "GET",
            endpoint
          );
          const { entry: entries } = responseData.feed;
          return Array.isArray(entries) ? entries.map((entry) => ({ name: entry.title, value: entry.title })) : [{ name: entries.title, value: entries.title }];
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "firedAlert") {
          if (operation === "getReport") {
            const endpoint = "/services/alerts/fired_alerts";
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "GET", endpoint).then(import_GenericFunctions.formatFeed);
          }
        } else if (resource === "searchConfiguration") {
          if (operation === "delete") {
            const partialEndpoint = "/services/saved/searches/";
            const searchConfigurationId = import_GenericFunctions.getId.call(
              this,
              i,
              "searchConfigurationId",
              "/search/saved/searches/"
            );
            const endpoint = `${partialEndpoint}/${searchConfigurationId}`;
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const partialEndpoint = "/services/saved/searches/";
            const searchConfigurationId = import_GenericFunctions.getId.call(
              this,
              i,
              "searchConfigurationId",
              "/search/saved/searches/"
            );
            const endpoint = `${partialEndpoint}/${searchConfigurationId}`;
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "GET", endpoint).then(import_GenericFunctions.formatFeed);
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.populate)(options, qs);
            import_GenericFunctions.setCount.call(this, qs);
            const endpoint = "/services/saved/searches";
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "GET", endpoint, {}, qs).then(import_GenericFunctions.formatFeed);
          }
        } else if (resource === "searchJob") {
          if (operation === "create") {
            const body = {
              search: this.getNodeParameter("search", i)
            };
            const { earliest_time, latest_time, index_earliest, index_latest, ...rest } = this.getNodeParameter("additionalFields", i);
            (0, import_GenericFunctions.populate)(
              {
                ...earliest_time && { earliest_time: (0, import_GenericFunctions.toUnixEpoch)(earliest_time) },
                ...latest_time && { latest_time: (0, import_GenericFunctions.toUnixEpoch)(latest_time) },
                ...index_earliest && { index_earliest: (0, import_GenericFunctions.toUnixEpoch)(index_earliest) },
                ...index_latest && { index_latest: (0, import_GenericFunctions.toUnixEpoch)(index_latest) },
                ...rest
              },
              body
            );
            const endpoint = "/services/search/jobs";
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "POST", endpoint, body);
            const getEndpoint = `/services/search/jobs/${responseData.response.sid}`;
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "GET", getEndpoint).then(import_GenericFunctions.formatSearch);
          } else if (operation === "delete") {
            const partialEndpoint = "/services/search/jobs/";
            const searchJobId = import_GenericFunctions.getId.call(this, i, "searchJobId", partialEndpoint);
            const endpoint = `${partialEndpoint}/${searchJobId}`;
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const partialEndpoint = "/services/search/jobs/";
            const searchJobId = import_GenericFunctions.getId.call(this, i, "searchJobId", partialEndpoint);
            const endpoint = `${partialEndpoint}/${searchJobId}`;
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "GET", endpoint).then(import_GenericFunctions.formatSearch);
          } else if (operation === "getAll") {
            const qs = {};
            const options = this.getNodeParameter("options", i);
            (0, import_GenericFunctions.populate)(options, qs);
            import_GenericFunctions.setCount.call(this, qs);
            const endpoint = "/services/search/jobs";
            responseData = await import_GenericFunctions.splunkApiRequest.call(
              this,
              "GET",
              endpoint,
              {},
              qs
            );
            responseData = (0, import_GenericFunctions.formatFeed)(responseData);
          }
        } else if (resource === "searchResult") {
          if (operation === "getAll") {
            const searchJobId = this.getNodeParameter("searchJobId", i);
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            const options = this.getNodeParameter("options", i);
            const keyValuePair = filters?.keyValueMatch?.keyValuePair;
            if (keyValuePair?.key && keyValuePair?.value) {
              qs.search = `search ${keyValuePair.key}=${keyValuePair.value}`;
            }
            (0, import_GenericFunctions.populate)(options, qs);
            import_GenericFunctions.setCount.call(this, qs);
            const endpoint = `/services/search/jobs/${searchJobId}/results`;
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "GET", endpoint, {}, qs).then(import_GenericFunctions.formatResults);
          }
        } else if (resource === "user") {
          if (operation === "create") {
            const roles = this.getNodeParameter("roles", i);
            const body = {
              name: this.getNodeParameter("name", i),
              roles,
              password: this.getNodeParameter("password", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            (0, import_GenericFunctions.populate)(additionalFields, body);
            const endpoint = "/services/authentication/users";
            responseData = await import_GenericFunctions.splunkApiRequest.call(
              this,
              "POST",
              endpoint,
              body
            );
            responseData = (0, import_GenericFunctions.formatFeed)(responseData);
          } else if (operation === "delete") {
            const partialEndpoint = "/services/authentication/users";
            const userId = import_GenericFunctions.getId.call(this, i, "userId", partialEndpoint);
            const endpoint = `${partialEndpoint}/${userId}`;
            await import_GenericFunctions.splunkApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const partialEndpoint = "/services/authentication/users/";
            const userId = import_GenericFunctions.getId.call(this, i, "userId", "/services/authentication/users/");
            const endpoint = `${partialEndpoint}/${userId}`;
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "GET", endpoint).then(import_GenericFunctions.formatFeed);
          } else if (operation === "getAll") {
            const qs = {};
            import_GenericFunctions.setCount.call(this, qs);
            const endpoint = "/services/authentication/users";
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "GET", endpoint, {}, qs).then(import_GenericFunctions.formatFeed);
          } else if (operation === "update") {
            const body = {};
            const { roles, ...rest } = this.getNodeParameter("updateFields", i);
            (0, import_GenericFunctions.populate)(
              {
                ...roles && { roles },
                ...rest
              },
              body
            );
            const partialEndpoint = "/services/authentication/users/";
            const userId = import_GenericFunctions.getId.call(this, i, "userId", partialEndpoint);
            const endpoint = `${partialEndpoint}/${userId}`;
            responseData = await import_GenericFunctions.splunkApiRequest.call(this, "POST", endpoint, body).then(import_GenericFunctions.formatFeed);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.cause.error }, pairedItem: { item: i } });
          continue;
        }
        if (error instanceof import_n8n_workflow.NodeApiError) {
          (0, import_set.default)(error, "context.itemIndex", i);
        }
        if (error instanceof import_n8n_workflow.NodeOperationError && error?.context?.itemIndex === void 0) {
          (0, import_set.default)(error, "context.itemIndex", i);
        }
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex: i });
      }
      if (Array.isArray(responseData)) {
        for (const item of responseData) {
          returnData.push({ json: item, pairedItem: { item: i } });
        }
      } else {
        returnData.push({ json: responseData, pairedItem: { item: i } });
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SplunkV1
});
//# sourceMappingURL=SplunkV1.node.js.map