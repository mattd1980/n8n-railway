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
var apiResponses_exports = {};
__export(apiResponses_exports, {
  createResponse: () => createResponse,
  fieldsResponse: () => fieldsResponse,
  getAllResponse: () => getAllResponse,
  getResponse: () => getResponse,
  updateResponse: () => updateResponse
});
module.exports = __toCommonJS(apiResponses_exports);
const fieldsResponse = [
  {
    id: 3799030,
    table_id: 482710,
    name: "Name",
    order: 0,
    type: "text",
    primary: true,
    read_only: false,
    immutable_type: false,
    immutable_properties: false,
    description: null,
    text_default: ""
  },
  {
    id: 3799031,
    table_id: 482710,
    name: "Notes",
    order: 1,
    type: "long_text",
    primary: false,
    read_only: false,
    immutable_type: false,
    immutable_properties: false,
    description: null,
    long_text_enable_rich_text: false
  },
  {
    id: 3799032,
    table_id: 482710,
    name: "Active",
    order: 2,
    type: "boolean",
    primary: false,
    read_only: false,
    immutable_type: false,
    immutable_properties: false,
    description: null
  }
];
const getResponse = {
  id: 1,
  order: "1.00000000000000000000",
  field_3799030: "Foo",
  field_3799031: "bar",
  field_3799032: false
};
const getAllResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      order: "1.00000000000000000000",
      field_3799030: "Foo",
      field_3799031: "bar",
      field_3799032: false
    },
    {
      id: 2,
      order: "2.00000000000000000000",
      field_3799030: "Bar",
      field_3799031: "foo",
      field_3799032: true
    }
  ]
};
const createResponse = {
  id: 3,
  order: "3.00000000000000000000",
  field_3799030: "Nathan",
  field_3799031: "testing",
  field_3799032: false
};
const updateResponse = {
  id: 3,
  order: "3.00000000000000000000",
  field_3799030: "Nathan",
  field_3799031: "testing",
  field_3799032: true
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createResponse,
  fieldsResponse,
  getAllResponse,
  getResponse,
  updateResponse
});
//# sourceMappingURL=apiResponses.js.map