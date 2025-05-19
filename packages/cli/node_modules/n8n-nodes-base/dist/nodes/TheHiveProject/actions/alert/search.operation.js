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
var search_operation_exports = {};
__export(search_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(search_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  ...import_descriptions.returnAllAndLimit,
  import_descriptions.genericFiltersCollection,
  import_descriptions.sortCollection,
  import_descriptions.searchOptions
];
const displayOptions = {
  show: {
    resource: ["alert"],
    operation: ["search"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData = [];
  const filtersValues = this.getNodeParameter("filters.values", i, []);
  const sortFields = this.getNodeParameter("sort.fields", i, []);
  const returnAll = this.getNodeParameter("returnAll", i);
  const { returnCount, extraData } = this.getNodeParameter("options", i);
  let limit;
  if (!returnAll) {
    limit = this.getNodeParameter("limit", i);
  }
  responseData = await import_transport.theHiveApiQuery.call(
    this,
    { query: "listAlert" },
    filtersValues,
    sortFields,
    limit,
    returnCount,
    extraData
  );
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=search.operation.js.map