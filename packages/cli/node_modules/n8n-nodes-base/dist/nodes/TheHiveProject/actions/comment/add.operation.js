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
var add_operation_exports = {};
__export(add_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(add_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
    displayName: "Add to",
    name: "addTo",
    type: "options",
    options: [
      {
        name: "Alert",
        value: "alert"
      },
      {
        name: "Case",
        value: "case"
      }
    ],
    default: "alert"
  },
  {
    ...import_descriptions.caseRLC,
    name: "id",
    displayOptions: {
      show: {
        addTo: ["case"]
      }
    }
  },
  {
    ...import_descriptions.alertRLC,
    name: "id",
    displayOptions: {
      show: {
        addTo: ["alert"]
      }
    }
  },
  {
    displayName: "Message",
    name: "message",
    type: "string",
    default: "",
    required: true,
    typeOptions: {
      rows: 2
    }
  }
];
const displayOptions = {
  show: {
    resource: ["comment"],
    operation: ["add"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData = [];
  const addTo = this.getNodeParameter("addTo", i);
  const id = this.getNodeParameter("id", i, "", { extractValue: true });
  const message = this.getNodeParameter("message", i);
  const body = {
    message
  };
  responseData = await import_transport.theHiveApiRequest.call(this, "POST", `/v1/${addTo}/${id}/comment`, body);
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=add.operation.js.map