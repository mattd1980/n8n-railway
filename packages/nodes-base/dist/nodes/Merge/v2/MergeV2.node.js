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
var MergeV2_node_exports = {};
__export(MergeV2_node_exports, {
  MergeV2: () => MergeV2
});
module.exports = __toCommonJS(MergeV2_node_exports);
var import_merge = __toESM(require("lodash/merge"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../utils/utilities");
var import_descriptions = require("./descriptions");
var import_utils = require("./utils");
class MergeV2 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      version: [2, 2.1],
      defaults: {
        name: "Merge"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main, import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      inputNames: ["Input 1", "Input 2"],
      // If mode is chooseBranch data from both branches is required
      // to continue, else data from any input suffices
      requiredInputs: '={{ $parameter["mode"] === "chooseBranch" ? [0, 1] : 1 }}',
      properties: [
        {
          displayName: "Mode",
          name: "mode",
          type: "options",
          options: [
            {
              name: "Append",
              value: "append",
              description: "All items of input 1, then all items of input 2"
            },
            {
              name: "Combine",
              value: "combine",
              description: "Merge matching items together"
            },
            {
              name: "Choose Branch",
              value: "chooseBranch",
              description: "Output input data, without modifying it"
            }
          ],
          default: "append",
          description: "How data of branches should be merged"
        },
        {
          displayName: "Combination Mode",
          name: "combinationMode",
          type: "options",
          options: [
            {
              name: "Merge By Fields",
              value: "mergeByFields",
              description: "Combine items with the same field values"
            },
            {
              name: "Merge By Position",
              value: "mergeByPosition",
              description: "Combine items based on their order"
            },
            {
              name: "Multiplex",
              value: "multiplex",
              description: "All possible item combinations (cross join)"
            }
          ],
          default: "mergeByFields",
          displayOptions: {
            show: {
              mode: ["combine"]
            }
          }
        },
        // mergeByFields ------------------------------------------------------------------
        {
          displayName: "Fields to Match",
          name: "mergeByFields",
          type: "fixedCollection",
          placeholder: "Add Fields to Match",
          default: { values: [{ field1: "", field2: "" }] },
          typeOptions: {
            multipleValues: true
          },
          options: [
            {
              displayName: "Values",
              name: "values",
              values: [
                {
                  displayName: "Input 1 Field",
                  name: "field1",
                  type: "string",
                  default: "",
                  // eslint-disable-next-line n8n-nodes-base/node-param-placeholder-miscased-id
                  placeholder: "e.g. id",
                  hint: " Enter the field name as text",
                  requiresDataPath: "single"
                },
                {
                  displayName: "Input 2 Field",
                  name: "field2",
                  type: "string",
                  default: "",
                  // eslint-disable-next-line n8n-nodes-base/node-param-placeholder-miscased-id
                  placeholder: "e.g. id",
                  hint: " Enter the field name as text",
                  requiresDataPath: "single"
                }
              ]
            }
          ],
          displayOptions: {
            show: {
              mode: ["combine"],
              combinationMode: ["mergeByFields"]
            }
          }
        },
        {
          displayName: "Output Type",
          name: "joinMode",
          type: "options",
          // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
          options: [
            {
              name: "Keep Matches",
              value: "keepMatches",
              description: "Items that match, merged together (inner join)"
            },
            {
              name: "Keep Non-Matches",
              value: "keepNonMatches",
              description: "Items that don't match"
            },
            {
              name: "Keep Everything",
              value: "keepEverything",
              description: "Items that match merged together, plus items that don't match (outer join)"
            },
            {
              name: "Enrich Input 1",
              value: "enrichInput1",
              description: "All of input 1, with data from input 2 added in (left join)"
            },
            {
              name: "Enrich Input 2",
              value: "enrichInput2",
              description: "All of input 2, with data from input 1 added in (right join)"
            }
          ],
          default: "keepMatches",
          displayOptions: {
            show: {
              mode: ["combine"],
              combinationMode: ["mergeByFields"]
            }
          }
        },
        {
          displayName: "Output Data From",
          name: "outputDataFrom",
          type: "options",
          options: [
            {
              name: "Both Inputs Merged Together",
              value: "both"
            },
            {
              name: "Input 1",
              value: "input1"
            },
            {
              name: "Input 2",
              value: "input2"
            }
          ],
          default: "both",
          displayOptions: {
            show: {
              mode: ["combine"],
              combinationMode: ["mergeByFields"],
              joinMode: ["keepMatches"]
            }
          }
        },
        {
          displayName: "Output Data From",
          name: "outputDataFrom",
          type: "options",
          options: [
            {
              name: "Both Inputs Appended Together",
              value: "both"
            },
            {
              name: "Input 1",
              value: "input1"
            },
            {
              name: "Input 2",
              value: "input2"
            }
          ],
          default: "both",
          displayOptions: {
            show: {
              mode: ["combine"],
              combinationMode: ["mergeByFields"],
              joinMode: ["keepNonMatches"]
            }
          }
        },
        // chooseBranch -----------------------------------------------------------------
        {
          displayName: "Output Type",
          name: "chooseBranchMode",
          type: "options",
          options: [
            {
              name: "Wait for Both Inputs to Arrive",
              value: "waitForBoth"
            }
          ],
          default: "waitForBoth",
          displayOptions: {
            show: {
              mode: ["chooseBranch"]
            }
          }
        },
        {
          displayName: "Output",
          name: "output",
          type: "options",
          options: [
            {
              name: "Input 1 Data",
              value: "input1"
            },
            {
              name: "Input 2 Data",
              value: "input2"
            },
            {
              name: "A Single, Empty Item",
              value: "empty"
            }
          ],
          default: "input1",
          displayOptions: {
            show: {
              mode: ["chooseBranch"],
              chooseBranchMode: ["waitForBoth"]
            }
          }
        },
        ...import_descriptions.optionsDescription
      ]
    };
  }
  async execute() {
    const returnData = [];
    const mode = this.getNodeParameter("mode", 0);
    if (mode === "append") {
      for (let i = 0; i < 2; i++) {
        returnData.push.apply(returnData, this.getInputData(i));
      }
    }
    if (mode === "combine") {
      const combinationMode = this.getNodeParameter("combinationMode", 0);
      if (combinationMode === "multiplex") {
        const clashHandling = this.getNodeParameter(
          "options.clashHandling.values",
          0,
          {}
        );
        let input1 = this.getInputData(0);
        let input2 = this.getInputData(1);
        if (clashHandling.resolveClash === "preferInput1") {
          [input1, input2] = [input2, input1];
        }
        if (clashHandling.resolveClash === "addSuffix") {
          input1 = (0, import_utils.addSuffixToEntriesKeys)(input1, "1");
          input2 = (0, import_utils.addSuffixToEntriesKeys)(input2, "2");
        }
        const mergeIntoSingleObject = (0, import_utils.selectMergeMethod)(clashHandling);
        if (!input1 || !input2) {
          return [returnData];
        }
        let entry1;
        let entry2;
        for (entry1 of input1) {
          for (entry2 of input2) {
            returnData.push({
              json: {
                ...mergeIntoSingleObject(entry1.json, entry2.json)
              },
              binary: {
                ...(0, import_merge.default)({}, entry1.binary, entry2.binary)
              },
              pairedItem: [
                entry1.pairedItem,
                entry2.pairedItem
              ]
            });
          }
        }
        return [returnData];
      }
      if (combinationMode === "mergeByPosition") {
        const clashHandling = this.getNodeParameter(
          "options.clashHandling.values",
          0,
          {}
        );
        const includeUnpaired = this.getNodeParameter(
          "options.includeUnpaired",
          0,
          false
        );
        let input1 = this.getInputData(0);
        let input2 = this.getInputData(1);
        if (input1?.length === 0 || input2?.length === 0) {
          return [[...input1, ...input2]];
        }
        if (clashHandling.resolveClash === "preferInput1") {
          [input1, input2] = [input2, input1];
        }
        if (clashHandling.resolveClash === "addSuffix") {
          input1 = (0, import_utils.addSuffixToEntriesKeys)(input1, "1");
          input2 = (0, import_utils.addSuffixToEntriesKeys)(input2, "2");
        }
        if (input1 === void 0 || input1.length === 0) {
          if (includeUnpaired) {
            return [input2];
          }
          return [returnData];
        }
        if (input2 === void 0 || input2.length === 0) {
          if (includeUnpaired) {
            return [input1];
          }
          return [returnData];
        }
        let numEntries;
        if (includeUnpaired) {
          numEntries = Math.max(input1.length, input2.length);
        } else {
          numEntries = Math.min(input1.length, input2.length);
        }
        const mergeIntoSingleObject = (0, import_utils.selectMergeMethod)(clashHandling);
        for (let i = 0; i < numEntries; i++) {
          if (i >= input1.length) {
            returnData.push(input2[i]);
            continue;
          }
          if (i >= input2.length) {
            returnData.push(input1[i]);
            continue;
          }
          const entry1 = input1[i];
          const entry2 = input2[i];
          returnData.push({
            json: {
              ...mergeIntoSingleObject(entry1.json, entry2.json)
            },
            binary: {
              ...(0, import_merge.default)({}, entry1.binary, entry2.binary)
            },
            pairedItem: [
              entry1.pairedItem,
              entry2.pairedItem
            ]
          });
        }
      }
      if (combinationMode === "mergeByFields") {
        const matchFields = (0, import_utils.checkMatchFieldsInput)(
          this.getNodeParameter("mergeByFields.values", 0, [])
        );
        const joinMode = this.getNodeParameter("joinMode", 0);
        const outputDataFrom = this.getNodeParameter(
          "outputDataFrom",
          0,
          "both"
        );
        const options = this.getNodeParameter("options", 0, {});
        options.joinMode = joinMode;
        options.outputDataFrom = outputDataFrom;
        const nodeVersion = this.getNode().typeVersion;
        let input1 = this.getInputData(0);
        let input2 = this.getInputData(1);
        if (nodeVersion < 2.1) {
          input1 = (0, import_utils.checkInput)(
            this.getInputData(0),
            matchFields.map((pair) => pair.field1),
            options.disableDotNotation || false,
            "Input 1"
          );
          if (!input1) return [returnData];
          input2 = (0, import_utils.checkInput)(
            this.getInputData(1),
            matchFields.map((pair) => pair.field2),
            options.disableDotNotation || false,
            "Input 2"
          );
        } else {
          if (!input1) return [returnData];
        }
        if (input1?.length === 0 || input2?.length === 0) {
          if (!input1?.length && joinMode === "keepNonMatches" && outputDataFrom === "input1")
            return [returnData];
          if (!input2?.length && joinMode === "keepNonMatches" && outputDataFrom === "input2")
            return [returnData];
          if (joinMode === "keepMatches") {
            return [[]];
          } else if (joinMode === "enrichInput1" && input1?.length === 0) {
            return [[]];
          } else if (joinMode === "enrichInput2" && input2?.length === 0) {
            return [[]];
          } else {
            return [[...input1, ...input2]];
          }
        }
        if (!input1) return [returnData];
        if (!input2 || !matchFields.length) {
          if (joinMode === "keepMatches" || joinMode === "keepEverything" || joinMode === "enrichInput2") {
            return [returnData];
          }
          return [input1];
        }
        const matches = (0, import_utils.findMatches)(input1, input2, matchFields, options);
        if (joinMode === "keepMatches" || joinMode === "keepEverything") {
          let output = [];
          const clashResolveOptions = this.getNodeParameter(
            "options.clashHandling.values",
            0,
            {}
          );
          if (outputDataFrom === "input1") {
            output = matches.matched.map((match) => match.entry);
          }
          if (outputDataFrom === "input2") {
            output = matches.matched2;
          }
          if (outputDataFrom === "both") {
            output = (0, import_utils.mergeMatched)(matches.matched, clashResolveOptions);
          }
          if (joinMode === "keepEverything") {
            let unmatched1 = matches.unmatched1;
            let unmatched2 = matches.unmatched2;
            if (clashResolveOptions.resolveClash === "addSuffix") {
              unmatched1 = (0, import_utils.addSuffixToEntriesKeys)(unmatched1, "1");
              unmatched2 = (0, import_utils.addSuffixToEntriesKeys)(unmatched2, "2");
            }
            output = [...output, ...unmatched1, ...unmatched2];
          }
          returnData.push(...output);
        }
        if (joinMode === "keepNonMatches") {
          if (outputDataFrom === "input1") {
            return [matches.unmatched1];
          }
          if (outputDataFrom === "input2") {
            return [matches.unmatched2];
          }
          if (outputDataFrom === "both") {
            let output = [];
            output = output.concat((0, import_utils.addSourceField)(matches.unmatched1, "input1"));
            output = output.concat((0, import_utils.addSourceField)(matches.unmatched2, "input2"));
            return [output];
          }
        }
        if (joinMode === "enrichInput1" || joinMode === "enrichInput2") {
          const clashResolveOptions = this.getNodeParameter(
            "options.clashHandling.values",
            0,
            {}
          );
          const mergedEntries = (0, import_utils.mergeMatched)(matches.matched, clashResolveOptions, joinMode);
          if (joinMode === "enrichInput1") {
            if (clashResolveOptions.resolveClash === "addSuffix") {
              returnData.push(...mergedEntries, ...(0, import_utils.addSuffixToEntriesKeys)(matches.unmatched1, "1"));
            } else {
              returnData.push(...mergedEntries, ...matches.unmatched1);
            }
          } else {
            if (clashResolveOptions.resolveClash === "addSuffix") {
              returnData.push(...mergedEntries, ...(0, import_utils.addSuffixToEntriesKeys)(matches.unmatched2, "2"));
            } else {
              returnData.push(...mergedEntries, ...matches.unmatched2);
            }
          }
        }
      }
    }
    if (mode === "chooseBranch") {
      const chooseBranchMode = this.getNodeParameter("chooseBranchMode", 0);
      if (chooseBranchMode === "waitForBoth") {
        const output = this.getNodeParameter("output", 0);
        if (output === "input1") {
          returnData.push.apply(returnData, this.getInputData(0));
        }
        if (output === "input2") {
          returnData.push.apply(returnData, this.getInputData(1));
        }
        if (output === "empty") {
          const pairedItem = [
            ...this.getInputData(0).map((inputData) => inputData.pairedItem),
            ...this.getInputData(1).map((inputData) => inputData.pairedItem)
          ].flatMap(import_utilities.preparePairedItemDataArray);
          returnData.push({
            json: {},
            pairedItem
          });
        }
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MergeV2
});
//# sourceMappingURL=MergeV2.node.js.map