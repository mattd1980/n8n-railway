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
var import_transport = require("../../transport");
const description = [
  {
    displayName: "View Name or ID",
    name: "viewId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getViews"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["userActivity"],
        operation: ["search"]
      }
    },
    placeholder: "123456",
    description: 'The view from Google Analytics. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    hint: "If there's nothing here, try changing the 'Property type' field above"
  },
  {
    displayName: "User ID",
    name: "userId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["userActivity"],
        operation: ["search"]
      }
    },
    placeholder: "123456",
    description: "ID of a user"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["userActivity"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["userActivity"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["search"],
        resource: ["userActivity"]
      }
    },
    options: [
      {
        displayName: "Activity Types",
        name: "activityTypes",
        type: "multiOptions",
        options: [
          {
            name: "Ecommerce",
            value: "ECOMMERCE"
          },
          {
            name: "Event",
            value: "EVENT"
          },
          {
            name: "Goal",
            value: "GOAL"
          },
          {
            name: "Pageview",
            value: "PAGEVIEW"
          },
          {
            name: "Screenview",
            value: "SCREENVIEW"
          }
        ],
        description: "Type of activites requested",
        default: []
      }
    ]
  }
];
async function execute(index) {
  const viewId = this.getNodeParameter("viewId", index);
  const userId = this.getNodeParameter("userId", index);
  const returnAll = this.getNodeParameter("returnAll", 0);
  const additionalFields = this.getNodeParameter("additionalFields", index);
  let responseData;
  const body = {
    viewId,
    user: {
      userId
    }
  };
  if (additionalFields.activityTypes) {
    Object.assign(body, { activityTypes: additionalFields.activityTypes });
  }
  const method = "POST";
  const endpoint = "/v4/userActivity:search";
  if (returnAll) {
    responseData = await import_transport.googleApiRequestAllItems.call(this, "sessions", method, endpoint, body);
  } else {
    body.pageSize = this.getNodeParameter("limit", 0);
    responseData = await import_transport.googleApiRequest.call(this, method, endpoint, body);
    responseData = responseData.sessions;
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData),
    { itemData: { item: index } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=search.operation.js.map