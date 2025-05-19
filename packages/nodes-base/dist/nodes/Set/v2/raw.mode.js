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
var raw_mode_exports = {};
__export(raw_mode_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(raw_mode_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./helpers/utils");
var import_utilities = require("../../../utils/utilities");
const properties = [
  {
    displayName: "JSON",
    name: "jsonOutput",
    type: "json",
    typeOptions: {
      rows: 5
    },
    default: '{\n  "my_field_1": "value",\n  "my_field_2": 1\n}\n',
    validateType: "object",
    ignoreValidationDuringExecution: true
  }
];
const displayOptions = {
  show: {
    mode: ["raw"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(item, i, options, rawData, node) {
  try {
    let newData;
    if (rawData.jsonOutput === void 0) {
      const json = this.getNodeParameter("jsonOutput", i);
      newData = (0, import_utils.parseJsonParameter)(json, node, i);
    } else {
      newData = (0, import_utils.parseJsonParameter)(
        import_utils.resolveRawData.call(this, rawData.jsonOutput, i),
        node,
        i
      );
    }
    return import_utils.composeReturnItem.call(this, i, item, newData, options, node.typeVersion);
  } catch (error) {
    if (this.continueOnFail()) {
      return { json: { error: error.message }, pairedItem: { item: i } };
    }
    throw new import_n8n_workflow.NodeOperationError(node, error, {
      itemIndex: i,
      description: error.description
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=raw.mode.js.map