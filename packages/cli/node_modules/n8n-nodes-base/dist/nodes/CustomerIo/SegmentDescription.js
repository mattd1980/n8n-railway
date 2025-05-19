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
var SegmentDescription_exports = {};
__export(SegmentDescription_exports, {
  segmentFields: () => segmentFields,
  segmentOperations: () => segmentOperations
});
module.exports = __toCommonJS(SegmentDescription_exports);
const segmentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["segment"]
      }
    },
    options: [
      {
        name: "Add Customer",
        value: "add",
        action: "Add a customer to a segment"
      },
      {
        name: "Remove Customer",
        value: "remove",
        action: "Remove a customer from a segment"
      }
    ],
    default: "add"
  }
];
const segmentFields = [
  /* -------------------------------------------------------------------------- */
  /*                                   segment:add                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Segment ID",
    name: "segmentId",
    type: "number",
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ["segment"],
        operation: ["add", "remove"]
      }
    },
    description: "The unique identifier of the segment"
  },
  {
    displayName: "Customer IDs",
    name: "customerIds",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["segment"],
        operation: ["add", "remove"]
      }
    },
    description: "A list of customer IDs to add to the segment"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  segmentFields,
  segmentOperations
});
//# sourceMappingURL=SegmentDescription.js.map