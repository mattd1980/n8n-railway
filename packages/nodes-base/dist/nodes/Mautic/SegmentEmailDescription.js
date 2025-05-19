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
var SegmentEmailDescription_exports = {};
__export(SegmentEmailDescription_exports, {
  segmentEmailFields: () => segmentEmailFields,
  segmentEmailOperations: () => segmentEmailOperations
});
module.exports = __toCommonJS(SegmentEmailDescription_exports);
const segmentEmailOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["segmentEmail"]
      }
    },
    options: [
      {
        name: "Send",
        value: "send",
        action: "Send an email to a segment"
      }
    ],
    default: "send"
  }
];
const segmentEmailFields = [
  /* -------------------------------------------------------------------------- */
  /*                               segmentEmail:send                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Segment Email Name or ID",
    name: "segmentEmailId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    displayOptions: {
      show: {
        resource: ["segmentEmail"],
        operation: ["send"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getSegmentEmails"
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  segmentEmailFields,
  segmentEmailOperations
});
//# sourceMappingURL=SegmentEmailDescription.js.map