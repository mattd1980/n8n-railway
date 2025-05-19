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
var NotionTrigger_node_exports = {};
__export(NotionTrigger_node_exports, {
  NotionTrigger: () => NotionTrigger
});
module.exports = __toCommonJS(NotionTrigger_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("./shared/constants");
var import_GenericFunctions = require("./shared/GenericFunctions");
var import_methods = require("./shared/methods");
class NotionTrigger {
  constructor() {
    this.description = {
      displayName: "Notion Trigger",
      name: "notionTrigger",
      icon: { light: "file:notion.svg", dark: "file:notion.dark.svg" },
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Notion events occur",
      subtitle: '={{$parameter["event"]}}',
      defaults: {
        name: "Notion Trigger"
      },
      credentials: [
        {
          name: "notionApi",
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
              name: "Page Added to Database",
              value: "pageAddedToDatabase"
            },
            {
              name: "Page Updated in Database",
              value: "pagedUpdatedInDatabase"
            }
          ],
          required: true,
          default: "pageAddedToDatabase"
        },
        {
          displayName: 'In Notion, make sure to <a href="https://www.notion.so/help/add-and-manage-connections-with-the-api" target="_blank">add your connection</a> to the pages you want to access.',
          name: "notionNotice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Database",
          name: "databaseId",
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          required: true,
          modes: [
            {
              displayName: "Database",
              name: "list",
              type: "list",
              placeholder: "Select a Database...",
              typeOptions: {
                searchListMethod: "getDatabases",
                searchable: true
              }
            },
            {
              displayName: "Link",
              name: "url",
              type: "string",
              placeholder: "https://www.notion.so/0fe2f7de558b471eab07e9d871cdf4a9?v=f2d424ba0c404733a3f500c78c881610",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: import_constants.databaseUrlValidationRegexp,
                    errorMessage: "Not a valid Notion Database URL"
                  }
                }
              ],
              extractValue: {
                type: "regex",
                regex: import_constants.databaseUrlExtractionRegexp
              }
            },
            {
              displayName: "ID",
              name: "id",
              type: "string",
              placeholder: "ab1545b247fb49fa92d6f4b49f4d8116",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: import_constants.idValidationRegexp,
                    errorMessage: "Not a valid Notion Database ID"
                  }
                }
              ],
              extractValue: {
                type: "regex",
                regex: import_constants.idExtractionRegexp
              },
              url: '=https://www.notion.so/{{$value.replace(/-/g, "")}}'
            }
          ],
          displayOptions: {
            show: {
              event: ["pageAddedToDatabase", "pagedUpdatedInDatabase"]
            }
          },
          description: "The Notion Database to operate on"
        },
        {
          displayName: "Simplify",
          name: "simple",
          type: "boolean",
          displayOptions: {
            show: {
              event: ["pageAddedToDatabase", "pagedUpdatedInDatabase"]
            }
          },
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data"
        }
      ]
    };
    this.methods = {
      listSearch: import_methods.listSearch
    };
  }
  async poll() {
    const webhookData = this.getWorkflowStaticData("node");
    const databaseId = this.getNodeParameter("databaseId", "", { extractValue: true });
    const event = this.getNodeParameter("event");
    const simple = this.getNodeParameter("simple");
    const lastTimeChecked = webhookData.lastTimeChecked ? (0, import_moment_timezone.default)(webhookData.lastTimeChecked) : (0, import_moment_timezone.default)().set({ second: 0, millisecond: 0 });
    webhookData.lastTimeChecked = (0, import_moment_timezone.default)().set({ second: 0, millisecond: 0 });
    const possibleDuplicates = webhookData.possibleDuplicates ?? [];
    const sortProperty = event === "pageAddedToDatabase" ? "created_time" : "last_edited_time";
    const option = {
      headers: {
        "Notion-Version": "2022-02-22"
      }
    };
    const body = {
      page_size: 1,
      sorts: [
        {
          timestamp: sortProperty,
          direction: "descending"
        }
      ],
      ...this.getMode() !== "manual" && {
        filter: {
          timestamp: sortProperty,
          [sortProperty]: {
            on_or_after: lastTimeChecked.utc().format()
          }
        }
      }
    };
    let records = [];
    let hasMore = true;
    let { results: data } = await import_GenericFunctions.notionApiRequest.call(
      this,
      "POST",
      `/databases/${databaseId}/query`,
      body,
      {},
      "",
      option
    );
    if (this.getMode() === "manual") {
      if (simple) {
        data = (0, import_GenericFunctions.simplifyObjects)(data, false, 1);
      }
      if (Array.isArray(data) && data.length) {
        return [this.helpers.returnJsonArray(data)];
      }
    }
    if (Array.isArray(data) && data.length && Object.keys(data[0]).length !== 0) {
      do {
        body.page_size = 10;
        const { results, has_more, next_cursor } = await import_GenericFunctions.notionApiRequest.call(
          this,
          "POST",
          `/databases/${databaseId}/query`,
          body,
          {},
          "",
          option
        );
        records.push(...results);
        hasMore = has_more;
        if (next_cursor !== null) {
          body.start_cursor = next_cursor;
        }
      } while (!(0, import_moment_timezone.default)(records[records.length - 1][sortProperty]).isBefore(lastTimeChecked) && hasMore);
      records = records.filter(
        (record) => !possibleDuplicates.includes(record.id)
      );
      if (records[0]) {
        const latestTimestamp = (0, import_moment_timezone.default)(records[0][sortProperty]);
        webhookData.possibleDuplicates = records.filter(
          (record) => (0, import_moment_timezone.default)(record[sortProperty]).isSame(latestTimestamp)
        ).map((record) => record.id);
      } else {
        webhookData.possibleDuplicates = void 0;
      }
      if (simple) {
        records = (0, import_GenericFunctions.simplifyObjects)(records, false, 1);
      }
      if (Array.isArray(records) && records.length) {
        return [this.helpers.returnJsonArray(records)];
      }
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NotionTrigger
});
//# sourceMappingURL=NotionTrigger.node.js.map