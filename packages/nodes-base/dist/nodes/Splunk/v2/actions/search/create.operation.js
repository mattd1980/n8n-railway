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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(create_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Query",
    name: "search",
    description: `Search language string to execute, in Splunk's <a href="https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/WhatsInThisManual">Search Processing Language</a>`,
    placeholder: "e.g. search index=_internal | stats count by source",
    type: "string",
    required: true,
    default: "",
    typeOptions: {
      rows: 2
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Ad Hoc Search Level",
        name: "adhoc_search_level",
        type: "options",
        default: "verbose",
        options: [
          {
            name: "Fast",
            value: "fast"
          },
          {
            name: "Smart",
            value: "smart"
          },
          {
            name: "Verbose",
            value: "verbose"
          }
        ]
      },
      {
        displayName: "Auto-Cancel After (Seconds)",
        name: "auto_cancel",
        type: "number",
        default: 0,
        description: "Seconds after which the search job automatically cancels"
      },
      {
        displayName: "Auto-Finalize After (Num Events)",
        name: "auto_finalize_ec",
        type: "number",
        default: 0,
        description: "Auto-finalize the search after at least this many events are processed"
      },
      {
        displayName: "Auto Pause After (Seconds)",
        name: "auto_pause",
        type: "number",
        default: 0,
        description: "Seconds of inactivity after which the search job automatically pauses"
      },
      {
        displayName: "Earliest Index",
        name: "index_earliest",
        type: "dateTime",
        default: "",
        description: "The earliest index time for the search (inclusive)"
      },
      {
        displayName: "Earliest Time",
        name: "earliest_time",
        type: "dateTime",
        default: "",
        description: "The earliest cut-off for the search (inclusive)"
      },
      {
        displayName: "Exec Mode",
        name: "exec_mode",
        type: "options",
        default: "blocking",
        options: [
          {
            name: "Blocking",
            value: "blocking"
          },
          {
            name: "Normal",
            value: "normal"
          },
          {
            name: "One Shot",
            value: "oneshot"
          }
        ]
      },
      {
        displayName: "Indexed Real Time Offset",
        name: "indexedRealtimeOffset",
        type: "number",
        default: 0,
        description: "Seconds of disk sync delay for indexed real-time search"
      },
      {
        displayName: "Latest Index",
        name: "index_latest",
        type: "dateTime",
        default: "",
        description: "The latest index time for the search (inclusive)"
      },
      {
        displayName: "Latest Time",
        name: "latest_time",
        type: "dateTime",
        default: "",
        description: "The latest cut-off for the search (inclusive)"
      },
      {
        displayName: "Max Time",
        name: "max_time",
        type: "number",
        default: 0,
        description: "Number of seconds to run this search before finalizing. Enter <code>0</code> to never finalize."
      },
      {
        displayName: "Namespace",
        name: "namespace",
        type: "string",
        default: "",
        description: "Application namespace in which to restrict searches"
      },
      {
        displayName: "Reduce Frequency",
        name: "reduce_freq",
        type: "number",
        default: 0,
        description: "How frequently to run the MapReduce reduce phase on accumulated map values"
      },
      {
        displayName: "Remote Server List",
        name: "remote_server_list",
        type: "string",
        default: "",
        description: "Comma-separated list of (possibly wildcarded) servers from which raw events should be pulled. This same server list is to be used in subsearches."
      },
      {
        displayName: "Reuse Limit (Seconds)",
        name: "reuse_max_seconds_ago",
        type: "number",
        default: 0,
        description: "Number of seconds ago to check when an identical search is started and return the job\u2019s search ID instead of starting a new job"
      },
      {
        displayName: "Required Field",
        name: "rf",
        type: "string",
        default: "",
        description: "Name of a required field to add to the search. Even if not referenced or used directly by the search, a required field is still included in events and summary endpoints."
      },
      {
        displayName: "Search Mode",
        name: "search_mode",
        type: "options",
        default: "normal",
        options: [
          {
            name: "Normal",
            value: "normal"
          },
          {
            name: "Real Time",
            value: "realtime"
          }
        ]
      },
      {
        displayName: "Status Buckets",
        name: "status_buckets",
        type: "number",
        default: 0,
        description: "The most status buckets to generate. Set <code>0</code> generate no timeline information."
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "number",
        default: 86400,
        description: "Number of seconds to keep this search after processing has stopped"
      },
      {
        displayName: "Workload Pool",
        name: "workload_pool",
        type: "string",
        default: "",
        description: "New workload pool where the existing running search should be placed"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["search"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const body = {
    search: this.getNodeParameter("search", i)
  };
  const { earliest_time, latest_time, index_earliest, index_latest, ...rest } = this.getNodeParameter("additionalFields", i);
  (0, import_utils.populate)(
    {
      ...earliest_time && { earliest_time: (0, import_utils.toUnixEpoch)(earliest_time) },
      ...latest_time && { latest_time: (0, import_utils.toUnixEpoch)(latest_time) },
      ...index_earliest && { index_earliest: (0, import_utils.toUnixEpoch)(index_earliest) },
      ...index_latest && { index_latest: (0, import_utils.toUnixEpoch)(index_latest) },
      ...rest
    },
    body
  );
  const endpoint = "/services/search/jobs";
  const responseData = await import_transport.splunkApiRequest.call(this, "POST", endpoint, body);
  const getEndpoint = `/services/search/jobs/${responseData.response.sid}`;
  const returnData = await import_transport.splunkApiJsonRequest.call(this, "GET", getEndpoint);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map