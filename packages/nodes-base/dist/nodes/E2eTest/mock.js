"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
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
var mock_exports = {};
__export(mock_exports, {
  remoteOptions: () => remoteOptions,
  resourceMapperFields: () => resourceMapperFields,
  returnData: () => returnData,
  searchOptions: () => searchOptions
});
module.exports = __toCommonJS(mock_exports);
var import_minifaker = require("minifaker");
var import_en = require("minifaker/locales/en");
const returnData = [
  {
    json: {
      id: "23423532",
      name: "Hello World"
    }
  }
];
const remoteOptions = [
  {
    name: "Resource 1",
    value: "resource1"
  },
  {
    name: "Resource 2",
    value: "resource2"
  },
  {
    name: "Resource 3",
    value: "resource3"
  }
];
const resourceMapperFields = {
  fields: [
    {
      id: "id",
      displayName: "ID",
      defaultMatch: true,
      canBeUsedToMatch: true,
      required: true,
      display: true,
      type: "string"
    },
    {
      id: "name",
      displayName: "Name",
      defaultMatch: false,
      canBeUsedToMatch: false,
      required: false,
      display: true,
      type: "string"
    },
    {
      id: "age",
      displayName: "Age",
      defaultMatch: false,
      canBeUsedToMatch: false,
      required: false,
      display: true,
      type: "number"
    }
  ]
};
const searchOptions = (0, import_minifaker.array)(100, () => {
  const value = import_minifaker.uuid.v4();
  return {
    name: (0, import_minifaker.name)(),
    value,
    url: "https://example.com/user/" + value
  };
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  remoteOptions,
  resourceMapperFields,
  returnData,
  searchOptions
});
//# sourceMappingURL=mock.js.map