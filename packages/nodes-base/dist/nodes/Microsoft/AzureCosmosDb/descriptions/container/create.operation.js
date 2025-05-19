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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(create_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("../../helpers/constants");
var import_utils = require("../../helpers/utils");
const properties = [
  {
    displayName: "ID",
    name: "containerCreate",
    default: "",
    description: "Unique identifier for the new container",
    placeholder: "e.g. Container1",
    required: true,
    routing: {
      send: {
        preSend: [
          async function(requestOptions) {
            const id = this.getNodeParameter("containerCreate");
            if (/\s/.test(id)) {
              throw new import_n8n_workflow.OperationalError("The container ID must not contain spaces.");
            }
            if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
              throw new import_n8n_workflow.OperationalError(
                "The container ID may only contain letters, numbers, hyphens, and underscores."
              );
            }
            requestOptions.body.id = id;
            return requestOptions;
          }
        ]
      }
    },
    type: "string"
  },
  {
    displayName: "Partition Key",
    name: "partitionKey",
    default: '{\n	"paths": [\n		"/id"\n	],\n	"kind": "Hash",\n	"version": 2\n}',
    description: "The partition key is used to automatically distribute data across partitions for scalability. Choose a property in your JSON document that has a wide range of values and evenly distributes request volume.",
    required: true,
    routing: {
      send: {
        preSend: [
          async function(requestOptions) {
            const rawPartitionKey = this.getNodeParameter("partitionKey");
            const partitionKey = (0, import_utils.processJsonInput)(rawPartitionKey, "Partition Key", {
              paths: ["/id"],
              kind: "Hash",
              version: 2
            });
            requestOptions.body.partitionKey = partitionKey;
            return requestOptions;
          }
        ]
      }
    },
    type: "json"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    default: {},
    options: [
      {
        displayName: "Indexing Policy",
        name: "indexingPolicy",
        default: '{\n	"indexingMode": "consistent",\n	"automatic": true,\n	"includedPaths": [\n		{\n			"path": "/*"\n		}\n	],\n	"excludedPaths": []\n}',
        description: "This value is used to configure indexing policy",
        routing: {
          send: {
            preSend: [
              async function(requestOptions) {
                const rawIndexingPolicy = this.getNodeParameter(
                  "additionalFields.indexingPolicy"
                );
                const indexPolicy = (0, import_utils.processJsonInput)(rawIndexingPolicy, "Indexing Policy");
                requestOptions.body.indexingPolicy = indexPolicy;
                return requestOptions;
              }
            ]
          }
        },
        type: "json"
      },
      {
        displayName: "Max RU/s (for Autoscale)",
        name: "maxThroughput",
        default: 1e3,
        description: "The user specified autoscale max RU/s",
        displayOptions: {
          hide: {
            "/additionalFields.offerThroughput": [{ _cnd: { exists: true } }]
          }
        },
        routing: {
          request: {
            headers: {
              [import_constants.HeaderConstants.X_MS_COSMOS_OFFER_AUTOPILOT_SETTING]: "={{ $value }}"
            }
          }
        },
        type: "number",
        typeOptions: {
          minValue: 1e3
        }
      },
      {
        displayName: "Manual Throughput RU/s",
        name: "offerThroughput",
        default: 400,
        description: "The user specified manual throughput (RU/s) for the collection expressed in units of 100 request units per second",
        displayOptions: {
          hide: {
            "/additionalFields.maxThroughput": [{ _cnd: { exists: true } }]
          }
        },
        routing: {
          request: {
            headers: {
              [import_constants.HeaderConstants.X_MS_OFFER_THROUGHPUT]: "={{ $value }}"
            }
          }
        },
        type: "number",
        typeOptions: {
          minValue: 400
        }
      }
    ],
    placeholder: "Add Option",
    type: "collection"
  }
];
const displayOptions = {
  show: {
    resource: ["container"],
    operation: ["create"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=create.operation.js.map