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
var Adalo_node_exports = {};
__export(Adalo_node_exports, {
  Adalo: () => Adalo
});
module.exports = __toCommonJS(Adalo_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CollectionDescription = require("./CollectionDescription");
class Adalo {
  constructor() {
    this.description = {
      displayName: "Adalo",
      name: "adalo",
      icon: "file:adalo.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["collectionId"]}}',
      description: "Consume Adalo API",
      defaults: {
        name: "Adalo"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "adaloApi",
          required: true
        }
      ],
      requestDefaults: {
        baseURL: "=https://api.adalo.com/v0/apps/{{$credentials.appId}}"
      },
      requestOperations: {
        pagination: {
          type: "offset",
          properties: {
            limitParameter: "limit",
            offsetParameter: "offset",
            pageSize: 100,
            type: "query"
          }
        }
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          default: "collection",
          options: [
            {
              name: "Collection",
              value: "collection"
            }
          ]
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Create",
              value: "create",
              description: "Create a row",
              routing: {
                send: {
                  preSend: [this.presendCreateUpdate]
                },
                request: {
                  method: "POST",
                  url: '=/collections/{{$parameter["collectionId"]}}'
                }
              },
              action: "Create a row"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a row",
              routing: {
                request: {
                  method: "DELETE",
                  url: '=/collections/{{$parameter["collectionId"]}}/{{$parameter["rowId"]}}'
                },
                output: {
                  postReceive: [
                    {
                      type: "set",
                      properties: {
                        value: '={{ { "success": true } }}'
                      }
                    }
                  ]
                }
              },
              action: "Delete a row"
            },
            {
              name: "Get",
              value: "get",
              description: "Retrieve a row",
              routing: {
                request: {
                  method: "GET",
                  url: '=/collections/{{$parameter["collectionId"]}}/{{$parameter["rowId"]}}'
                }
              },
              action: "Retrieve a row"
            },
            {
              name: "Get Many",
              value: "getAll",
              description: "Retrieve many rows",
              routing: {
                request: {
                  method: "GET",
                  url: '=/collections/{{$parameter["collectionId"]}}',
                  qs: {
                    limit: '={{$parameter["limit"]}}'
                  }
                },
                send: {
                  paginate: '={{$parameter["returnAll"]}}'
                },
                output: {
                  postReceive: [
                    {
                      type: "rootProperty",
                      properties: {
                        property: "records"
                      }
                    }
                  ]
                }
              },
              action: "Retrieve all rows"
            },
            {
              name: "Update",
              value: "update",
              description: "Update a row",
              routing: {
                send: {
                  preSend: [this.presendCreateUpdate]
                },
                request: {
                  method: "PUT",
                  url: '=/collections/{{$parameter["collectionId"]}}/{{$parameter["rowId"]}}'
                }
              },
              action: "Update a row"
            }
          ],
          default: "getAll"
        },
        {
          displayName: "Collection ID",
          name: "collectionId",
          type: "string",
          required: true,
          default: "",
          description: "Open your Adalo application and click on the three buttons beside the collection name, then select API Documentation",
          hint: "You can find information about app's collections on https://app.adalo.com/apps/<strong>your-app-id</strong>/api-docs",
          displayOptions: {
            show: {
              resource: ["collection"]
            }
          }
        },
        ...import_CollectionDescription.collectionFields
      ]
    };
  }
  async presendCreateUpdate(requestOptions) {
    const dataToSend = this.getNodeParameter("dataToSend", 0);
    requestOptions.body = {};
    if (dataToSend === "autoMapInputData") {
      const inputData = this.getInputData();
      const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore");
      const inputKeysToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
      const inputKeys = Object.keys(inputData.json).filter(
        (key) => !inputKeysToIgnore.includes(key)
      );
      for (const key of inputKeys) {
        requestOptions.body[key] = inputData.json[key];
      }
    } else {
      const fields = this.getNodeParameter("fieldsUi.fieldValues");
      for (const field of fields) {
        requestOptions.body[field.fieldId] = field.fieldValue;
      }
    }
    return requestOptions;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Adalo
});
//# sourceMappingURL=Adalo.node.js.map