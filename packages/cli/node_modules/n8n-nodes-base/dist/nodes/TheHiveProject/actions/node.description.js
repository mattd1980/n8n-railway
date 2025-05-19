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
var node_description_exports = {};
__export(node_description_exports, {
  description: () => description
});
module.exports = __toCommonJS(node_description_exports);
var import_n8n_workflow = require("n8n-workflow");
var alert = __toESM(require("./alert"));
var case_ = __toESM(require("./case"));
var comment = __toESM(require("./comment"));
var log = __toESM(require("./log"));
var observable = __toESM(require("./observable"));
var page = __toESM(require("./page"));
var query = __toESM(require("./query"));
var task = __toESM(require("./task"));
const description = {
  displayName: "TheHive 5",
  name: "theHiveProject",
  icon: "file:thehiveproject.svg",
  group: ["transform"],
  subtitle: '={{$parameter["operation"]}} : {{$parameter["resource"]}}',
  version: 1,
  description: "Consume TheHive 5 API",
  defaults: {
    name: "TheHive 5"
  },
  usableAsTool: true,
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "theHiveProjectApi",
      required: true
    }
  ],
  properties: [
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      required: true,
      options: [
        {
          name: "Alert",
          value: "alert"
        },
        {
          name: "Case",
          value: "case"
        },
        {
          name: "Comment",
          value: "comment"
        },
        {
          name: "Observable",
          value: "observable"
        },
        {
          name: "Page",
          value: "page"
        },
        {
          name: "Query",
          value: "query"
        },
        {
          name: "Task",
          value: "task"
        },
        {
          name: "Task Log",
          value: "log"
        }
      ],
      default: "alert"
    },
    ...alert.description,
    ...case_.description,
    ...comment.description,
    ...log.description,
    ...observable.description,
    ...page.description,
    ...query.description,
    ...task.description
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=node.description.js.map