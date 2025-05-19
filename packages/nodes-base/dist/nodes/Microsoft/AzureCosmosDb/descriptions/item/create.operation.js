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
  description: () => description
});
module.exports = __toCommonJS(create_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../helpers/utils");
var import_common = require("../common");
const properties = [
  { ...import_common.containerResourceLocator, description: "Select the container you want to use" },
  {
    displayName: "Item Contents",
    name: "customProperties",
    default: '{\n	"id": "replace_with_new_document_id"\n}',
    description: "The item contents as a JSON object",
    displayOptions: {
      hide: {
        ...import_utils.untilContainerSelected
      }
    },
    hint: "The item requires an ID and partition key value if a custom key is set",
    required: true,
    routing: {
      send: {
        preSend: [
          async function(requestOptions) {
            const rawCustomProperties = this.getNodeParameter("customProperties");
            const customProperties = (0, import_utils.processJsonInput)(
              rawCustomProperties,
              "Item Contents",
              void 0,
              ["id"]
            );
            requestOptions.body = customProperties;
            return requestOptions;
          }
        ]
      }
    },
    type: "json"
  }
];
const displayOptions = {
  show: {
    resource: ["item"],
    operation: ["create"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=create.operation.js.map