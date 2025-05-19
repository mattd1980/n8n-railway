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
var RssFeedReadTrigger_node_exports = {};
__export(RssFeedReadTrigger_node_exports, {
  RssFeedReadTrigger: () => RssFeedReadTrigger
});
module.exports = __toCommonJS(RssFeedReadTrigger_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_rss_parser = __toESM(require("rss-parser"));
class RssFeedReadTrigger {
  constructor() {
    this.description = {
      displayName: "RSS Feed Trigger",
      name: "rssFeedReadTrigger",
      icon: "fa:rss",
      iconColor: "orange-red",
      group: ["trigger"],
      version: 1,
      description: "Starts a workflow when an RSS feed is updated",
      subtitle: '={{$parameter["event"]}}',
      defaults: {
        name: "RSS Feed Trigger",
        color: "#b02020"
      },
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Feed URL",
          name: "feedUrl",
          type: "string",
          default: "https://blog.n8n.io/rss/",
          required: true,
          description: "URL of the RSS feed to poll"
        }
      ]
    };
  }
  async poll() {
    const pollData = this.getWorkflowStaticData("node");
    const feedUrl = this.getNodeParameter("feedUrl");
    const dateToCheck = Date.parse(
      pollData.lastItemDate ?? pollData.lastTimeChecked ?? (0, import_moment_timezone.default)().utc().format()
    );
    if (!feedUrl) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'The parameter "URL" has to be set!');
    }
    const parser = new import_rss_parser.default();
    let feed;
    try {
      feed = await parser.parseURL(feedUrl);
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          `It was not possible to connect to the URL. Please make sure the URL "${feedUrl}" it is valid!`
        );
      }
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
    }
    const returnData = [];
    if (feed.items) {
      if (this.getMode() === "manual") {
        return [this.helpers.returnJsonArray(feed.items[0])];
      }
      feed.items.forEach((item) => {
        if (item.isoDate && Date.parse(item.isoDate) > dateToCheck) {
          returnData.push(item);
        }
      });
      if (feed.items.length) {
        pollData.lastItemDate = feed.items.reduce(
          (a, b) => new Date(a.isoDate) > new Date(b.isoDate) ? a : b
        ).isoDate;
      }
    }
    if (Array.isArray(returnData) && returnData.length !== 0) {
      return [this.helpers.returnJsonArray(returnData)];
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RssFeedReadTrigger
});
//# sourceMappingURL=RssFeedReadTrigger.node.js.map