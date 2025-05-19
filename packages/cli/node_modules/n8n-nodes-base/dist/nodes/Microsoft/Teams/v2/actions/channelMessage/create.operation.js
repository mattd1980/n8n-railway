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
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.teamRLC,
  import_descriptions.channelRLC,
  {
    displayName: "Content Type",
    name: "contentType",
    required: true,
    type: "options",
    options: [
      {
        name: "Text",
        value: "text"
      },
      {
        name: "HTML",
        value: "html"
      }
    ],
    default: "text",
    description: "Whether the message is plain text or HTML"
  },
  {
    displayName: "Message",
    name: "message",
    required: true,
    type: "string",
    default: "",
    description: "The content of the message to be sent",
    typeOptions: {
      rows: 2
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Include Link to Workflow",
        name: "includeLinkToWorkflow",
        type: "boolean",
        default: true,
        description: "Whether to append a link to this workflow at the end of the message. This is helpful if you have many workflows sending messages."
      },
      {
        displayName: "Reply to ID",
        name: "makeReply",
        type: "string",
        default: "",
        placeholder: "e.g. 1673348720590",
        description: 'An optional ID of the message you want to reply to. The message ID is the number before "?tenantId" in the message URL.'
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["channelMessage"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i, nodeVersion, instanceId) {
  const teamId = this.getNodeParameter("teamId", i, "", { extractValue: true });
  const channelId = this.getNodeParameter("channelId", i, "", { extractValue: true });
  const contentType = this.getNodeParameter("contentType", i);
  const message = this.getNodeParameter("message", i);
  const options = this.getNodeParameter("options", i);
  let includeLinkToWorkflow = options.includeLinkToWorkflow;
  if (includeLinkToWorkflow === void 0) {
    includeLinkToWorkflow = nodeVersion >= 1.1;
  }
  const body = import_utils.prepareMessage.call(
    this,
    message,
    contentType,
    includeLinkToWorkflow,
    instanceId
  );
  if (options.makeReply) {
    const replyToId = options.makeReply;
    return await import_transport.microsoftApiRequest.call(
      this,
      "POST",
      `/beta/teams/${teamId}/channels/${channelId}/messages/${replyToId}/replies`,
      body
    );
  } else {
    return await import_transport.microsoftApiRequest.call(
      this,
      "POST",
      `/beta/teams/${teamId}/channels/${channelId}/messages`,
      body
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=create.operation.js.map