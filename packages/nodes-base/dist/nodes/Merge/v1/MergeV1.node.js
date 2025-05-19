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
var MergeV1_node_exports = {};
__export(MergeV1_node_exports, {
  MergeV1: () => MergeV1
});
module.exports = __toCommonJS(MergeV1_node_exports);
var import_get = __toESM(require("lodash/get"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("../../../utils/descriptions");
var import_utilities = require("../../../utils/utilities");
class MergeV1 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      icon: "fa:code-branch",
      version: 1,
      defaults: {
        name: "Merge",
        color: "#00bbcc"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main, import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      inputNames: ["Input 1", "Input 2"],
      properties: [
        import_descriptions.oldVersionNotice,
        {
          displayName: "Mode",
          name: "mode",
          type: "options",
          options: [
            {
              name: "Append",
              value: "append",
              description: "Combines data of both inputs. The output will contain items of input 1 and input 2."
            },
            {
              name: "Keep Key Matches",
              value: "keepKeyMatches",
              description: "Keeps data of input 1 if it does find a match with data of input 2"
            },
            {
              name: "Merge By Index",
              value: "mergeByIndex",
              description: "Merges data of both inputs. The output will contain items of input 1 merged with data of input 2. Merge happens depending on the index of the items. So first item of input 1 will be merged with first item of input 2 and so on."
            },
            {
              name: "Merge By Key",
              value: "mergeByKey",
              description: "Merges data of both inputs. The output will contain items of input 1 merged with data of input 2. Merge happens depending on a defined key."
            },
            {
              name: "Multiplex",
              value: "multiplex",
              description: "Merges each value of one input with each value of the other input. The output will contain (m * n) items where (m) and (n) are lengths of the inputs."
            },
            {
              name: "Pass-Through",
              value: "passThrough",
              description: "Passes through data of one input. The output will contain only items of the defined input."
            },
            {
              name: "Remove Key Matches",
              value: "removeKeyMatches",
              description: "Keeps data of input 1 if it does NOT find match with data of input 2"
            },
            {
              name: "Wait",
              value: "wait",
              description: "Waits till data of both inputs is available and will then output a single empty item. Source Nodes must connect to both Input 1 and 2. This node only supports 2 Sources, if you need more Sources, connect multiple Merge nodes in series. This node will not output any data."
            }
          ],
          default: "append",
          description: "How data of branches should be merged"
        },
        {
          displayName: "Join",
          name: "join",
          type: "options",
          displayOptions: {
            show: {
              mode: ["mergeByIndex"]
            }
          },
          options: [
            {
              name: "Inner Join",
              value: "inner",
              description: "Merges as many items as both inputs contain. (Example: Input1 = 5 items, Input2 = 3 items | Output will contain 3 items)."
            },
            {
              name: "Left Join",
              value: "left",
              description: "Merges as many items as first input contains. (Example: Input1 = 3 items, Input2 = 5 items | Output will contain 3 items)."
            },
            {
              name: "Outer Join",
              value: "outer",
              description: "Merges as many items as input contains with most items. (Example: Input1 = 3 items, Input2 = 5 items | Output will contain 5 items)."
            }
          ],
          default: "left",
          description: "How many items the output will contain if inputs contain different amount of items"
        },
        {
          displayName: "Property Input 1",
          name: "propertyName1",
          type: "string",
          default: "",
          hint: "The name of the field as text (e.g. \u201Cid\u201D)",
          required: true,
          displayOptions: {
            show: {
              mode: ["keepKeyMatches", "mergeByKey", "removeKeyMatches"]
            }
          },
          description: "Name of property which decides which items to merge of input 1"
        },
        {
          displayName: "Property Input 2",
          name: "propertyName2",
          type: "string",
          default: "",
          hint: "The name of the field as text (e.g. \u201Cid\u201D)",
          required: true,
          displayOptions: {
            show: {
              mode: ["keepKeyMatches", "mergeByKey", "removeKeyMatches"]
            }
          },
          description: "Name of property which decides which items to merge of input 2"
        },
        {
          displayName: "Output Data",
          name: "output",
          type: "options",
          displayOptions: {
            show: {
              mode: ["passThrough"]
            }
          },
          options: [
            {
              name: "Input 1",
              value: "input1"
            },
            {
              name: "Input 2",
              value: "input2"
            }
          ],
          default: "input1",
          description: "Defines of which input the data should be used as output of node"
        },
        {
          displayName: "Overwrite",
          name: "overwrite",
          type: "options",
          displayOptions: {
            show: {
              mode: ["mergeByKey"]
            }
          },
          options: [
            {
              name: "Always",
              value: "always",
              description: "Always overwrites everything"
            },
            {
              name: "If Blank",
              value: "blank",
              description: 'Overwrites only values of "null", "undefined" or empty string'
            },
            {
              name: "If Missing",
              value: "undefined",
              description: "Only adds values which do not exist yet"
            }
          ],
          default: "always",
          description: "Select when to overwrite the values from Input1 with values from Input 2"
        }
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
    } else if (mode === "mergeByIndex") {
      const join = this.getNodeParameter("join", 0);
      const dataInput1 = this.getInputData(0);
      const dataInput2 = this.getInputData(1);
      if (dataInput1 === void 0 || dataInput1.length === 0) {
        if (["inner", "left"].includes(join)) {
          return [returnData];
        }
        return [dataInput2];
      }
      if (dataInput2 === void 0 || dataInput2.length === 0) {
        if (["left", "outer"].includes(join)) {
          return [dataInput1];
        }
        return [returnData];
      }
      let numEntries = dataInput1.length;
      if (join === "inner") {
        numEntries = Math.min(dataInput1.length, dataInput2.length);
      } else if (join === "outer") {
        numEntries = Math.max(dataInput1.length, dataInput2.length);
      }
      let newItem;
      for (let i = 0; i < numEntries; i++) {
        if (i >= dataInput1.length) {
          returnData.push(dataInput2[i]);
          continue;
        }
        if (i >= dataInput2.length) {
          returnData.push(dataInput1[i]);
          continue;
        }
        newItem = {
          json: {},
          pairedItem: [
            dataInput1[i].pairedItem,
            dataInput2[i].pairedItem
          ]
        };
        if (dataInput1[i].binary !== void 0) {
          newItem.binary = {};
          Object.assign(newItem.binary, dataInput1[i].binary);
        }
        Object.assign(newItem.json, dataInput1[i].json);
        for (const key of Object.keys(dataInput2[i].json)) {
          newItem.json[key] = dataInput2[i].json[key];
        }
        if (dataInput2[i].binary !== void 0) {
          if (newItem.binary === void 0) {
            newItem.binary = {};
          }
          for (const key of Object.keys(dataInput2[i].binary)) {
            newItem.binary[key] = dataInput2[i].binary[key] ?? newItem.binary[key];
          }
        }
        returnData.push(newItem);
      }
    } else if (mode === "multiplex") {
      const dataInput1 = this.getInputData(0);
      const dataInput2 = this.getInputData(1);
      if (!dataInput1 || !dataInput2) {
        return [returnData];
      }
      let entry1;
      let entry2;
      for (entry1 of dataInput1) {
        for (entry2 of dataInput2) {
          returnData.push({
            json: {
              ...entry1.json,
              ...entry2.json
            },
            pairedItem: [
              entry1.pairedItem,
              entry2.pairedItem
            ]
          });
        }
      }
      return [returnData];
    } else if (["keepKeyMatches", "mergeByKey", "removeKeyMatches"].includes(mode)) {
      const dataInput1 = this.getInputData(0);
      if (!dataInput1) {
        return [returnData];
      }
      const propertyName1 = this.getNodeParameter("propertyName1", 0);
      const propertyName2 = this.getNodeParameter("propertyName2", 0);
      const overwrite = this.getNodeParameter("overwrite", 0, "always");
      const dataInput2 = this.getInputData(1);
      if (!dataInput2 || !propertyName1 || !propertyName2) {
        if (mode === "keepKeyMatches") {
          return [returnData];
        }
        return [dataInput1];
      }
      const copyData = {};
      let entry;
      for (entry of dataInput2) {
        const key2 = (0, import_get.default)(entry.json, propertyName2);
        if (!entry.json || !key2) {
          continue;
        }
        copyData[key2] = entry;
      }
      let referenceValue;
      let key;
      for (entry of dataInput1) {
        referenceValue = (0, import_get.default)(entry.json, propertyName1);
        if (referenceValue === void 0) {
          if (mode === "removeKeyMatches") {
            returnData.push(entry);
          }
          continue;
        }
        if (!["string", "number"].includes(typeof referenceValue)) {
          if (referenceValue !== null && referenceValue.constructor.name !== "Data") {
            if (mode === "removeKeyMatches") {
              returnData.push(entry);
            }
            continue;
          }
        }
        if (typeof referenceValue === "number") {
          referenceValue = referenceValue.toString();
        } else if (referenceValue !== null && referenceValue.constructor.name === "Date") {
          referenceValue = referenceValue.toISOString();
        }
        if (copyData.hasOwnProperty(referenceValue)) {
          if (["null", "undefined"].includes(typeof referenceValue)) {
            if (mode === "removeKeyMatches") {
              returnData.push(entry);
            }
            continue;
          }
          if (mode === "removeKeyMatches") {
            continue;
          } else if (mode === "mergeByKey") {
            entry = (0, import_n8n_workflow.deepCopy)(entry);
            for (key of Object.keys(copyData[referenceValue].json)) {
              if (key === propertyName2) {
                continue;
              }
              const value = copyData[referenceValue].json[key];
              if (overwrite === "always" || overwrite === "undefined" && !entry.json.hasOwnProperty(key) || overwrite === "blank" && [null, void 0, ""].includes(entry.json[key])) {
                entry.json[key] = value;
              }
            }
          } else {
            returnData.push(entry);
            continue;
          }
        } else {
          if (mode === "removeKeyMatches") {
            returnData.push(entry);
            continue;
          }
        }
        if (mode === "mergeByKey") {
          returnData.push(entry);
        }
      }
      return [returnData];
    } else if (mode === "passThrough") {
      const output = this.getNodeParameter("output", 0);
      if (output === "input1") {
        returnData.push.apply(returnData, this.getInputData(0));
      } else {
        returnData.push.apply(returnData, this.getInputData(1));
      }
    } else if (mode === "wait") {
      const pairedItem = (0, import_utilities.generatePairedItemData)(this.getInputData(0).length);
      returnData.push({ json: {}, pairedItem });
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MergeV1
});
//# sourceMappingURL=MergeV1.node.js.map