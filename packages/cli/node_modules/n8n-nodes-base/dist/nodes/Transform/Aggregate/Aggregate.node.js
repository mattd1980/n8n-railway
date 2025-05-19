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
var Aggregate_node_exports = {};
__export(Aggregate_node_exports, {
  Aggregate: () => Aggregate
});
module.exports = __toCommonJS(Aggregate_node_exports);
var import_get = __toESM(require("lodash/get"));
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("./utils");
var import_utils2 = require("../utils/utils");
class Aggregate {
  constructor() {
    this.description = {
      displayName: "Aggregate",
      name: "aggregate",
      icon: "file:aggregate.svg",
      group: ["transform"],
      subtitle: "",
      version: 1,
      description: "Combine a field from many items into a list in a single item",
      defaults: {
        name: "Aggregate"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Aggregate",
          name: "aggregate",
          type: "options",
          default: "aggregateIndividualFields",
          options: [
            {
              name: "Individual Fields",
              value: "aggregateIndividualFields"
            },
            {
              name: "All Item Data (Into a Single List)",
              value: "aggregateAllItemData"
            }
          ]
        },
        {
          displayName: "Fields To Aggregate",
          name: "fieldsToAggregate",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          placeholder: "Add Field To Aggregate",
          default: { fieldToAggregate: [{ fieldToAggregate: "", renameField: false }] },
          displayOptions: {
            show: {
              aggregate: ["aggregateIndividualFields"]
            }
          },
          options: [
            {
              displayName: "",
              name: "fieldToAggregate",
              values: [
                {
                  displayName: "Input Field Name",
                  name: "fieldToAggregate",
                  type: "string",
                  default: "",
                  description: "The name of a field in the input items to aggregate together",
                  // eslint-disable-next-line n8n-nodes-base/node-param-placeholder-miscased-id
                  placeholder: "e.g. id",
                  hint: " Enter the field name as text",
                  requiresDataPath: "single"
                },
                {
                  displayName: "Rename Field",
                  name: "renameField",
                  type: "boolean",
                  default: false,
                  description: "Whether to give the field a different name in the output"
                },
                {
                  displayName: "Output Field Name",
                  name: "outputFieldName",
                  displayOptions: {
                    show: {
                      renameField: [true]
                    }
                  },
                  type: "string",
                  default: "",
                  description: "The name of the field to put the aggregated data in. Leave blank to use the input field name.",
                  requiresDataPath: "single"
                }
              ]
            }
          ]
        },
        {
          displayName: "Put Output in Field",
          name: "destinationFieldName",
          type: "string",
          displayOptions: {
            show: {
              aggregate: ["aggregateAllItemData"]
            }
          },
          default: "data",
          description: "The name of the output field to put the data in"
        },
        {
          displayName: "Include",
          name: "include",
          type: "options",
          default: "allFields",
          options: [
            {
              name: "All Fields",
              value: "allFields"
            },
            {
              name: "Specified Fields",
              value: "specifiedFields"
            },
            {
              name: "All Fields Except",
              value: "allFieldsExcept"
            }
          ],
          displayOptions: {
            show: {
              aggregate: ["aggregateAllItemData"]
            }
          }
        },
        {
          displayName: "Fields To Exclude",
          name: "fieldsToExclude",
          type: "string",
          placeholder: "e.g. email, name",
          default: "",
          requiresDataPath: "multiple",
          displayOptions: {
            show: {
              aggregate: ["aggregateAllItemData"],
              include: ["allFieldsExcept"]
            }
          }
        },
        {
          displayName: "Fields To Include",
          name: "fieldsToInclude",
          type: "string",
          placeholder: "e.g. email, name",
          default: "",
          requiresDataPath: "multiple",
          displayOptions: {
            show: {
              aggregate: ["aggregateAllItemData"],
              include: ["specifiedFields"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          options: [
            {
              displayName: "Disable Dot Notation",
              name: "disableDotNotation",
              type: "boolean",
              default: false,
              description: "Whether to disallow referencing child fields using `parent.child` in the field name",
              displayOptions: {
                hide: {
                  "/aggregate": ["aggregateAllItemData"]
                }
              }
            },
            {
              displayName: "Merge Lists",
              name: "mergeLists",
              type: "boolean",
              default: false,
              description: "Whether to merge the output into a single flat list (rather than a list of lists), if the field to aggregate is a list",
              displayOptions: {
                hide: {
                  "/aggregate": ["aggregateAllItemData"]
                }
              }
            },
            {
              displayName: "Include Binaries",
              name: "includeBinaries",
              type: "boolean",
              default: false,
              description: "Whether to include the binary data in the new item"
            },
            {
              displayName: "Keep Only Unique Binaries",
              name: "keepOnlyUnique",
              type: "boolean",
              default: false,
              description: "Whether to keep only unique binaries by comparing mime types, file types, file sizes and file extensions",
              displayOptions: {
                show: {
                  includeBinaries: [true]
                }
              }
            },
            {
              displayName: "Keep Missing And Null Values",
              name: "keepMissing",
              type: "boolean",
              default: false,
              description: "Whether to add a null entry to the aggregated list when there is a missing or null value",
              displayOptions: {
                hide: {
                  "/aggregate": ["aggregateAllItemData"]
                }
              }
            }
          ]
        }
      ]
    };
  }
  async execute() {
    let returnData = { json: {}, pairedItem: [] };
    const items = this.getInputData();
    const notFoundedFields = {};
    const aggregate = this.getNodeParameter("aggregate", 0, "");
    if (aggregate === "aggregateIndividualFields") {
      const disableDotNotation = this.getNodeParameter(
        "options.disableDotNotation",
        0,
        false
      );
      const mergeLists = this.getNodeParameter("options.mergeLists", 0, false);
      const fieldsToAggregate = this.getNodeParameter(
        "fieldsToAggregate.fieldToAggregate",
        0,
        []
      );
      const keepMissing = this.getNodeParameter("options.keepMissing", 0, false);
      if (!fieldsToAggregate.length) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No fields specified", {
          description: "Please add a field to aggregate"
        });
      }
      const newItem = {
        json: {},
        pairedItem: Array.from({ length: items.length }, (_, i) => i).map((index) => {
          return {
            item: index
          };
        })
      };
      const values = {};
      const outputFields = [];
      for (const { fieldToAggregate, outputFieldName, renameField } of fieldsToAggregate) {
        const field = renameField ? outputFieldName : fieldToAggregate;
        if (outputFields.includes(field)) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The '${field}' output field is used more than once`,
            { description: "Please make sure each output field name is unique" }
          );
        } else {
          outputFields.push(field);
        }
        const getFieldToAggregate = () => !disableDotNotation && fieldToAggregate.includes(".") ? fieldToAggregate.split(".").pop() : fieldToAggregate;
        const _outputFieldName = outputFieldName ? outputFieldName : getFieldToAggregate();
        if (fieldToAggregate !== "") {
          values[_outputFieldName] = [];
          for (let i = 0; i < items.length; i++) {
            if (notFoundedFields[fieldToAggregate] === void 0) {
              notFoundedFields[fieldToAggregate] = [];
            }
            if (!disableDotNotation) {
              let value = (0, import_get.default)(items[i].json, fieldToAggregate);
              notFoundedFields[fieldToAggregate].push(value === void 0 ? false : true);
              if (!keepMissing) {
                if (Array.isArray(value)) {
                  value = value.filter((entry) => entry !== null);
                } else if (value === null || value === void 0) {
                  continue;
                }
              }
              if (Array.isArray(value) && mergeLists) {
                values[_outputFieldName].push(...value);
              } else {
                values[_outputFieldName].push(value);
              }
            } else {
              let value = items[i].json[fieldToAggregate];
              notFoundedFields[fieldToAggregate].push(value === void 0 ? false : true);
              if (!keepMissing) {
                if (Array.isArray(value)) {
                  value = value.filter((entry) => entry !== null);
                } else if (value === null || value === void 0) {
                  continue;
                }
              }
              if (Array.isArray(value) && mergeLists) {
                values[_outputFieldName].push(...value);
              } else {
                values[_outputFieldName].push(value);
              }
            }
          }
        }
      }
      for (const key of Object.keys(values)) {
        if (!disableDotNotation) {
          (0, import_set.default)(newItem.json, key, values[key]);
        } else {
          newItem.json[key] = values[key];
        }
      }
      returnData = newItem;
    } else {
      let newItems = items.map((item) => item.json);
      let pairedItem = [];
      const destinationFieldName = this.getNodeParameter("destinationFieldName", 0);
      const fieldsToExclude = (0, import_utils2.prepareFieldsArray)(
        this.getNodeParameter("fieldsToExclude", 0, ""),
        "Fields To Exclude"
      );
      const fieldsToInclude = (0, import_utils2.prepareFieldsArray)(
        this.getNodeParameter("fieldsToInclude", 0, ""),
        "Fields To Include"
      );
      if (fieldsToExclude.length || fieldsToInclude.length) {
        newItems = newItems.reduce((acc, item, index) => {
          const newItem = {};
          let outputFields = Object.keys(item);
          if (fieldsToExclude.length) {
            outputFields = outputFields.filter((key) => !fieldsToExclude.includes(key));
          }
          if (fieldsToInclude.length) {
            outputFields = outputFields.filter(
              (key) => fieldsToInclude.length ? fieldsToInclude.includes(key) : true
            );
          }
          outputFields.forEach((key) => {
            newItem[key] = item[key];
          });
          if ((0, import_isEmpty.default)(newItem)) {
            return acc;
          }
          pairedItem.push({ item: index });
          return acc.concat([newItem]);
        }, []);
      } else {
        pairedItem = Array.from({ length: newItems.length }, (_, item) => ({
          item
        }));
      }
      const output = { json: { [destinationFieldName]: newItems }, pairedItem };
      returnData = output;
    }
    const includeBinaries = this.getNodeParameter("options.includeBinaries", 0, false);
    if (includeBinaries) {
      const pairedItems = returnData.pairedItem || [];
      const aggregatedItems = pairedItems.map((item) => {
        return items[item.item];
      });
      const keepOnlyUnique = this.getNodeParameter("options.keepOnlyUnique", 0, false);
      (0, import_utils.addBinariesToItem)(returnData, aggregatedItems, keepOnlyUnique);
    }
    if (Object.keys(notFoundedFields).length) {
      const hints = [];
      for (const [field, values] of Object.entries(notFoundedFields)) {
        if (values.every((value) => !value)) {
          hints.push({
            message: `The field '${field}' wasn't found in any input item`,
            location: "outputPane"
          });
        }
      }
      if (hints.length) {
        this.addExecutionHints(...hints);
      }
    }
    return [[returnData]];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Aggregate
});
//# sourceMappingURL=Aggregate.node.js.map