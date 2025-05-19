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
var ContactSegmentDescription_exports = {};
__export(ContactSegmentDescription_exports, {
  contactSegmentFields: () => contactSegmentFields,
  contactSegmentOperations: () => contactSegmentOperations
});
module.exports = __toCommonJS(ContactSegmentDescription_exports);
const contactSegmentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contactSegment"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add contact to a segment",
        action: "Add a contact to a segment"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove contact from a segment",
        action: "Remove a contact from a segment"
      }
    ],
    default: "add"
  }
];
const contactSegmentFields = [
  /* -------------------------------------------------------------------------- */
  /*                               contactSegment:add                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["contactSegment"],
        operation: ["add", "remove"]
      }
    },
    default: ""
  },
  {
    displayName: "Segment Name or ID",
    name: "segmentId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    displayOptions: {
      show: {
        resource: ["contactSegment"],
        operation: ["add", "remove"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getSegments"
    },
    default: ""
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactSegmentFields,
  contactSegmentOperations
});
//# sourceMappingURL=ContactSegmentDescription.js.map