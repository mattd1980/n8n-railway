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
var combineByFields_exports = {};
__export(combineByFields_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(combineByFields_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_descriptions = require("../../helpers/descriptions");
var import_utils = require("../../helpers/utils");
const multipleMatchesProperty = {
  displayName: "Multiple Matches",
  name: "multipleMatches",
  type: "options",
  default: "all",
  options: [
    {
      name: "Include All Matches",
      value: "all",
      description: "Output multiple items if there are multiple matches"
    },
    {
      name: "Include First Match Only",
      value: "first",
      description: "Only ever output a single item per match"
    }
  ]
};
const properties = [
  {
    displayName: "Fields To Match Have Different Names",
    name: "advanced",
    type: "boolean",
    default: false,
    description: "Whether name(s) of field to match are different in input 1 and input 2"
  },
  {
    displayName: "Fields to Match",
    name: "fieldsToMatchString",
    type: "string",
    // eslint-disable-next-line n8n-nodes-base/node-param-placeholder-miscased-id
    placeholder: "e.g. id, name",
    default: "",
    requiresDataPath: "multiple",
    description: "Specify the fields to use for matching input items",
    hint: "Drag or type the input field name",
    displayOptions: {
      show: {
        advanced: [false]
      }
    }
  },
  {
    displayName: "Fields to Match",
    name: "mergeByFields",
    type: "fixedCollection",
    placeholder: "Add Fields to Match",
    default: { values: [{ field1: "", field2: "" }] },
    typeOptions: {
      multipleValues: true
    },
    description: "Specify the fields to use for matching input items",
    displayOptions: {
      show: {
        advanced: [true]
      }
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
            hint: "Drag or type the input field name",
            requiresDataPath: "single"
          },
          {
            displayName: "Input 2 Field",
            name: "field2",
            type: "string",
            default: "",
            // eslint-disable-next-line n8n-nodes-base/node-param-placeholder-miscased-id
            placeholder: "e.g. id",
            hint: "Drag or type the input field name",
            requiresDataPath: "single"
          }
        ]
      }
    ]
  },
  {
    displayName: "Output Type",
    name: "joinMode",
    type: "options",
    description: "How to select the items to send to output",
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
    default: "keepMatches"
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
        joinMode: ["keepNonMatches"]
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
        ...import_descriptions.clashHandlingProperties,
        displayOptions: {
          hide: {
            "/joinMode": ["keepMatches", "keepNonMatches"]
          }
        }
      },
      {
        ...import_descriptions.clashHandlingProperties,
        displayOptions: {
          show: {
            "/joinMode": ["keepMatches"],
            "/outputDataFrom": ["both"]
          }
        }
      },
      {
        displayName: "Disable Dot Notation",
        name: "disableDotNotation",
        type: "boolean",
        default: false,
        description: "Whether to disallow referencing child fields using `parent.child` in the field name"
      },
      import_descriptions.fuzzyCompareProperty,
      {
        ...multipleMatchesProperty,
        displayOptions: {
          show: {
            "/joinMode": ["keepMatches"],
            "/outputDataFrom": ["both"]
          }
        }
      },
      {
        ...multipleMatchesProperty,
        displayOptions: {
          show: {
            "/joinMode": ["enrichInput1", "enrichInput2", "keepEverything"]
          }
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    mode: ["combine"],
    combineBy: ["combineByFields"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(inputsData) {
  const returnData = [];
  const advanced = this.getNodeParameter("advanced", 0);
  let matchFields;
  if (advanced) {
    matchFields = this.getNodeParameter("mergeByFields.values", 0, []);
  } else {
    matchFields = this.getNodeParameter("fieldsToMatchString", 0, "").split(",").map((f) => {
      const field = f.trim();
      return { field1: field, field2: field };
    });
  }
  matchFields = (0, import_utils.checkMatchFieldsInput)(matchFields);
  const joinMode = this.getNodeParameter("joinMode", 0);
  const outputDataFrom = this.getNodeParameter("outputDataFrom", 0, "both");
  const options = this.getNodeParameter("options", 0, {});
  options.joinMode = joinMode;
  options.outputDataFrom = outputDataFrom;
  const nodeVersion = this.getNode().typeVersion;
  let input1 = inputsData[0];
  let input2 = inputsData[1];
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
  if (input1.length === 0 || input2.length === 0) {
    if (!input1.length && joinMode === "keepNonMatches" && outputDataFrom === "input1")
      return [returnData];
    if (!input2.length && joinMode === "keepNonMatches" && outputDataFrom === "input2")
      return [returnData];
    if (joinMode === "keepMatches") {
      return [];
    } else if (joinMode === "enrichInput1" && input1.length === 0) {
      return [];
    } else if (joinMode === "enrichInput2" && input2.length === 0) {
      return [];
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
  return [returnData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=combineByFields.js.map