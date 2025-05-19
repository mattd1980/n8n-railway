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
var IfV2_node_exports = {};
__export(IfV2_node_exports, {
  IfV2: () => IfV2
});
module.exports = __toCommonJS(IfV2_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./utils");
var import_constants = require("../../../utils/constants");
var import_descriptions = require("../../../utils/descriptions");
class IfV2 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      version: [2, 2.1, 2.2],
      defaults: {
        name: "If",
        color: "#408000"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main, import_n8n_workflow.NodeConnectionTypes.Main],
      outputNames: ["true", "false"],
      parameterPane: "wide",
      properties: [
        {
          displayName: "Conditions",
          name: "conditions",
          placeholder: "Add Condition",
          type: "filter",
          default: {},
          typeOptions: {
            filter: {
              caseSensitive: "={{!$parameter.options.ignoreCase}}",
              typeValidation: (0, import_utils.getTypeValidationStrictness)(2.1),
              version: "={{ $nodeVersion >= 2.2 ? 2 : 1 }}"
            }
          }
        },
        {
          ...import_descriptions.looseTypeValidationProperty,
          default: false,
          displayOptions: {
            show: {
              "@version": [{ _cnd: { gte: 2.1 } }]
            }
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
              displayName: "Ignore Case",
              description: "Whether to ignore letter case when evaluating conditions",
              name: "ignoreCase",
              type: "boolean",
              default: true
            },
            {
              ...import_descriptions.looseTypeValidationProperty,
              displayOptions: {
                show: {
                  "@version": [{ _cnd: { lt: 2.1 } }]
                }
              }
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const trueItems = [];
    const falseItems = [];
    this.getInputData().forEach((item, itemIndex) => {
      try {
        const options = this.getNodeParameter("options", itemIndex);
        let pass = false;
        try {
          pass = this.getNodeParameter("conditions", itemIndex, false, {
            extractValue: true
          });
        } catch (error) {
          if (!(0, import_utils.getTypeValidationParameter)(2.1)(this, itemIndex, options.looseTypeValidation) && !error.description) {
            (0, import_set.default)(error, "description", import_constants.ENABLE_LESS_STRICT_TYPE_VALIDATION);
          }
          (0, import_set.default)(error, "context.itemIndex", itemIndex);
          (0, import_set.default)(error, "node", this.getNode());
          throw error;
        }
        if (item.pairedItem === void 0) {
          item.pairedItem = { item: itemIndex };
        }
        if (pass) {
          trueItems.push(item);
        } else {
          falseItems.push(item);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          falseItems.push(item);
        } else {
          if (error instanceof import_n8n_workflow.NodeOperationError) {
            throw error;
          }
          if (error instanceof import_n8n_workflow.ApplicationError) {
            (0, import_set.default)(error, "context.itemIndex", itemIndex);
            throw error;
          }
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
            itemIndex
          });
        }
      }
    });
    return [trueItems, falseItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IfV2
});
//# sourceMappingURL=IfV2.node.js.map