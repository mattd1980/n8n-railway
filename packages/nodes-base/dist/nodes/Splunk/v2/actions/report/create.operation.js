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
var import_descriptions = require("../../helpers/descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.searchJobRLC,
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    description: "The name of the report"
  }
];
const displayOptions = {
  show: {
    resource: ["report"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const name = this.getNodeParameter("name", i);
  const searchJobId = this.getNodeParameter("searchJobId", i, "", { extractValue: true });
  const endpoint = `/services/search/jobs/${searchJobId}`;
  const searchJob = (await import_transport.splunkApiJsonRequest.call(this, "GET", endpoint) ?? [])[0];
  const body = {
    name,
    search: searchJob.search,
    alert_type: "always",
    "dispatch.earliest_time": searchJob.earliestTime,
    "dispatch.latest_time": searchJob.latestTime,
    is_scheduled: searchJob.isScheduled,
    cron_schedule: searchJob.cronSchedule
  };
  const returnData = await import_transport.splunkApiRequest.call(this, "POST", "/services/saved/searches", body).then(import_utils.formatFeed);
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map