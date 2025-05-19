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
var N8nTrainingCustomerDatastore_node_exports = {};
__export(N8nTrainingCustomerDatastore_node_exports, {
  N8nTrainingCustomerDatastore: () => N8nTrainingCustomerDatastore
});
module.exports = __toCommonJS(N8nTrainingCustomerDatastore_node_exports);
var import_n8n_workflow = require("n8n-workflow");
const data = [
  {
    id: "23423532",
    name: "Jay Gatsby",
    email: "gatsby@west-egg.com",
    notes: "Keeps asking about a green light??",
    country: "US",
    created: "1925-04-10"
  },
  {
    id: "23423533",
    name: "Jos\xE9 Arcadio Buend\xEDa",
    email: "jab@macondo.co",
    notes: "Lots of people named after him. Very confusing",
    country: "CO",
    created: "1967-05-05"
  },
  {
    id: "23423534",
    name: "Max Sendak",
    email: "info@in-and-out-of-weeks.org",
    notes: "Keeps rolling his terrible eyes",
    country: "US",
    created: "1963-04-09"
  },
  {
    id: "23423535",
    name: "Zaphod Beeblebrox",
    email: "captain@heartofgold.com",
    notes: "Felt like I was talking to more than one person",
    country: null,
    created: "1979-10-12"
  },
  {
    id: "23423536",
    name: "Edmund Pevensie",
    email: "edmund@narnia.gov",
    notes: "Passionate sailor",
    country: "UK",
    created: "1950-10-16"
  }
];
class N8nTrainingCustomerDatastore {
  constructor() {
    this.description = {
      displayName: "Customer Datastore (n8n training)",
      name: "n8nTrainingCustomerDatastore",
      icon: {
        light: "file:n8nTrainingCustomerDatastore.svg",
        dark: "file:n8nTrainingCustomerDatastore.dark.svg"
      },
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"]}}',
      description: "Dummy node used for n8n training",
      defaults: {
        name: "Customer Datastore (n8n training)"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Get One Person",
              value: "getOnePerson"
            },
            {
              name: "Get All People",
              value: "getAllPeople"
            }
          ],
          default: "getOnePerson"
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["getAllPeople"]
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
              operation: ["getAllPeople"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 10
          },
          default: 5,
          description: "Max number of results to return"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < length; i++) {
      if (operation === "getOnePerson") {
        responseData = data[0];
      }
      if (operation === "getAllPeople") {
        const returnAll = this.getNodeParameter("returnAll", i);
        if (returnAll) {
          responseData = data;
        } else {
          const limit = this.getNodeParameter("limit", i);
          responseData = data.slice(0, limit);
        }
      }
      if (Array.isArray(responseData)) {
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push.apply(returnData, executionData);
      } else if (responseData !== void 0) {
        returnData.push({ json: responseData });
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  N8nTrainingCustomerDatastore
});
//# sourceMappingURL=N8nTrainingCustomerDatastore.node.js.map