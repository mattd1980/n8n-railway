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
var Orbit_node_exports = {};
__export(Orbit_node_exports, {
  Orbit: () => Orbit
});
module.exports = __toCommonJS(Orbit_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_ActivityDescription = require("./ActivityDescription");
var import_MemberDescription = require("./MemberDescription");
var import_NoteDescription = require("./NoteDescription");
var import_PostDescription = require("./PostDescription");
class Orbit {
  constructor() {
    this.description = {
      displayName: "Orbit",
      name: "orbit",
      icon: { light: "file:orbit.svg", dark: "file:orbit.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Orbit API",
      hidden: true,
      defaults: {
        name: "Orbit"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "orbitApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: 'Orbit has been shutdown and will no longer function from July 11th, You can read more <a target="_blank" href="https://orbit.love/blog/orbit-is-joining-postman">here</a>.',
          name: "deprecated",
          type: "notice",
          default: ""
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Activity",
              value: "activity"
            },
            {
              name: "Member",
              value: "member"
            },
            {
              name: "Note",
              value: "note"
            },
            {
              name: "Post",
              value: "post"
            }
          ],
          default: "member"
        },
        // ACTIVITY
        ...import_ActivityDescription.activityOperations,
        ...import_ActivityDescription.activityFields,
        // MEMBER
        ...import_MemberDescription.memberOperations,
        ...import_MemberDescription.memberFields,
        // NOTE
        ...import_NoteDescription.noteOperations,
        ...import_NoteDescription.noteFields,
        // POST
        ...import_PostDescription.postOperations,
        ...import_PostDescription.postFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getWorkspaces() {
          return [{ name: "Deprecated", value: "Deprecated" }];
        },
        async getActivityTypes() {
          return [{ name: "Deprecated", value: "Deprecated" }];
        }
      }
    };
  }
  async execute() {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), {
      message: "Service is deprecated, From July 11th Orbit will no longer function.",
      level: "warning"
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Orbit
});
//# sourceMappingURL=Orbit.node.js.map