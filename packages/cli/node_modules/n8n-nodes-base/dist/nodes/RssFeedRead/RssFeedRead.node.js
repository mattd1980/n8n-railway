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
var RssFeedRead_node_exports = {};
__export(RssFeedRead_node_exports, {
  RssFeedRead: () => RssFeedRead
});
module.exports = __toCommonJS(RssFeedRead_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_rss_parser = __toESM(require("rss-parser"));
var import_url = require("url");
var import_utilities = require("../../utils/utilities");
function validateURL(url) {
  try {
    new import_url.URL(url);
    return true;
  } catch (err) {
    return false;
  }
}
class RssFeedRead {
  constructor() {
    this.description = {
      displayName: "RSS Read",
      name: "rssFeedRead",
      icon: "fa:rss",
      iconColor: "orange-red",
      group: ["input"],
      version: [1, 1.1],
      description: "Reads data from an RSS Feed",
      defaults: {
        name: "RSS Read",
        color: "#b02020"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "URL",
          name: "url",
          type: "string",
          default: "",
          required: true,
          description: "URL of the RSS feed"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Ignore SSL Issues (Insecure)",
              name: "ignoreSSL",
              type: "boolean",
              default: false,
              description: "Whether to ignore SSL/TLS certificate issues or not"
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const returnData = [];
    const nodeVersion = this.getNode().typeVersion;
    const items = this.getInputData();
    let itemsLength = items.length ? 1 : 0;
    let fallbackPairedItems;
    if (nodeVersion >= 1.1) {
      itemsLength = items.length;
    } else {
      fallbackPairedItems = (0, import_utilities.generatePairedItemData)(items.length);
    }
    for (let i = 0; i < itemsLength; i++) {
      try {
        const url = this.getNodeParameter("url", i);
        const options = this.getNodeParameter("options", i);
        const ignoreSSL = Boolean(options.ignoreSSL);
        if (!url) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'The parameter "URL" has to be set!', {
            itemIndex: i
          });
        }
        if (!validateURL(url)) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), 'The provided "URL" is not valid!', {
            itemIndex: i
          });
        }
        const parser = new import_rss_parser.default({
          requestOptions: {
            rejectUnauthorized: !ignoreSSL
          }
        });
        let feed;
        try {
          feed = await parser.parseURL(url);
        } catch (error) {
          if (error.code === "ECONNREFUSED") {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `It was not possible to connect to the URL. Please make sure the URL "${url}" it is valid!`,
              {
                itemIndex: i
              }
            );
          }
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
            itemIndex: i
          });
        }
        if (feed.items) {
          const feedItems = feed.items.map((item) => ({
            json: item
          }));
          const itemData = fallbackPairedItems || [{ item: i }];
          const executionData = this.helpers.constructExecutionMetaData(feedItems, {
            itemData
          });
          returnData.push(...executionData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: error.message },
            pairedItem: fallbackPairedItems || [{ item: i }]
          });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RssFeedRead
});
//# sourceMappingURL=RssFeedRead.node.js.map