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
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
    displayName: "Search in",
    name: "searchIn",
    type: "options",
    default: "all",
    description: "Whether to search for observables in all alerts and cases or in a specific case or alert",
    options: [
      {
        name: "Alerts and Cases",
        value: "all"
      },
      {
        name: "Alert",
        value: "alert"
      },
      {
        name: "Case",
        value: "case"
      }
    ]
  },
  {
    ...import_descriptions.caseRLC,
    displayOptions: {
      show: {
        searchIn: ["case"]
      }
    }
  },
  {
    ...import_descriptions.alertRLC,
    displayOptions: {
      show: {
        searchIn: ["alert"]
      }
    }
  },
  ...import_descriptions.returnAllAndLimit,
  import_descriptions.genericFiltersCollection,
  import_descriptions.sortCollection,
  import_descriptions.searchOptions
];
const displayOptions = {
  show: {
    resource: ["observable"],
    operation: ["search"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData = [];
  const searchIn = this.getNodeParameter("searchIn", i);
  const filtersValues = this.getNodeParameter("filters.values", i, []);
  const sortFields = this.getNodeParameter("sort.fields", i, []);
  const returnAll = this.getNodeParameter("returnAll", i);
  const { returnCount, extraData } = this.getNodeParameter("options", i);
  let limit;
  let scope;
  if (searchIn === "all") {
    scope = { query: "listObservable" };
  } else if (searchIn === "alert") {
    const alertId = this.getNodeParameter("alertId", i, "", { extractValue: true });
    scope = { query: "getAlert", id: alertId, restrictTo: "observables" };
  } else if (searchIn === "case") {
    const caseId = this.getNodeParameter("caseId", i, "", { extractValue: true });
    scope = { query: "getCase", id: caseId, restrictTo: "observables" };
  } else {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), `Invalid 'Search In ...' value: ${searchIn}`);
  }
  if (!returnAll) {
    limit = this.getNodeParameter("limit", i);
  }
  responseData = await import_transport.theHiveApiQuery.call(
    this,
    scope,
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