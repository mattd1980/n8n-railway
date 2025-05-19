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
var VersionDescription_exports = {};
__export(VersionDescription_exports, {
  versionDescription: () => versionDescription
});
module.exports = __toCommonJS(VersionDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_BlockDescription = require("../shared/descriptions/BlockDescription");
var import_DatabaseDescription = require("../shared/descriptions/DatabaseDescription");
var import_DatabasePageDescription = require("../shared/descriptions/DatabasePageDescription");
var import_PageDescription = require("../shared/descriptions/PageDescription");
var import_UserDescription = require("../shared/descriptions/UserDescription");
const versionDescription = {
  displayName: "Notion",
  name: "notion",
  icon: { light: "file:notion.svg", dark: "file:notion.dark.svg" },
  group: ["output"],
  version: [2, 2.1, 2.2],
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: "Consume Notion API",
  defaults: {
    name: "Notion"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  usableAsTool: true,
  credentials: [
    {
      name: "notionApi",
      required: true
      // displayOptions: {
      // 	show: {
      // 		authentication: [
      // 			'apiKey',
      // 		],
      // 	},
      // },
    }
    // {
    // 	name: 'notionOAuth2Api',
    // 	required: true,
    // 	displayOptions: {
    // 		show: {
    // 			authentication: [
    // 				'oAuth2',
    // 			],
    // 		},
    // 	},
    // },
  ],
  properties: [
    // {
    // 	displayName: 'Authentication',
    // 	name: 'authentication',
    // 	type: 'options',
    // 	options: [
    // 		{
    // 			name: 'API Key',
    // 			value: 'apiKey',
    // 		},
    // 		{
    // 			name: 'OAuth2',
    // 			value: 'oAuth2',
    // 		},
    // 	],
    // 	default: 'apiKey',
    // 	description: 'The resource to operate on.',
    // },
    {
      displayName: 'In Notion, make sure to <a href="https://www.notion.so/help/add-and-manage-connections-with-the-api" target="_blank">add your connection</a> to the pages you want to access.',
      name: "notionNotice",
      type: "notice",
      default: ""
    },
    {
      displayName: "",
      name: "Credentials",
      type: "credentials",
      default: ""
    },
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Block",
          value: "block"
        },
        {
          name: "Database",
          value: "database"
        },
        {
          name: "Database Page",
          value: "databasePage"
        },
        {
          name: "Page",
          value: "page"
        },
        {
          name: "User",
          value: "user"
        }
      ],
      default: "page"
    },
    ...import_BlockDescription.blockOperations,
    ...import_BlockDescription.blockFields,
    ...import_DatabaseDescription.databaseOperations,
    ...import_DatabaseDescription.databaseFields,
    ...import_DatabasePageDescription.databasePageOperations,
    ...import_DatabasePageDescription.databasePageFields,
    ...import_PageDescription.pageOperations,
    ...import_PageDescription.pageFields,
    ...import_UserDescription.userOperations,
    ...import_UserDescription.userFields
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  versionDescription
});
//# sourceMappingURL=VersionDescription.js.map