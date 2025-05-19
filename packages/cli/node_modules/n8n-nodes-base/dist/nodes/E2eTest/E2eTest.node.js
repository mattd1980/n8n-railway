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
var E2eTest_node_exports = {};
__export(E2eTest_node_exports, {
  E2eTest: () => E2eTest
});
module.exports = __toCommonJS(E2eTest_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_mock = require("./mock");
class E2eTest {
  constructor() {
    this.description = {
      displayName: "E2E Test",
      name: "e2eTest",
      icon: "fa:play",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"]}}',
      description: "Dummy node used for e2e testing",
      defaults: {
        name: "E2E Test"
      },
      usableAsTool: true,
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
              name: "Remote Options",
              value: "remoteOptions"
            },
            {
              name: "Resource Locator",
              value: "resourceLocator"
            },
            {
              name: "Resource Mapping Component",
              value: "resourceMapper"
            }
          ],
          default: "remoteOptions"
        },
        {
          displayName: "Field ID",
          name: "fieldId",
          type: "string",
          default: ""
        },
        {
          displayName: "Remote Options Name or ID",
          name: "remoteOptions",
          description: 'Remote options to load. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          type: "options",
          typeOptions: {
            loadOptionsDependsOn: ["fieldId"],
            loadOptionsMethod: "getOptions"
          },
          required: true,
          default: [],
          displayOptions: {
            show: {
              operation: ["remoteOptions"]
            }
          }
        },
        {
          displayName: "Resource Locator",
          name: "rlc",
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          required: true,
          displayOptions: {
            show: {
              operation: ["resourceLocator"]
            }
          },
          modes: [
            {
              displayName: "From List",
              name: "list",
              type: "list",
              typeOptions: {
                searchListMethod: "optionsSearch",
                searchable: true
              }
            },
            {
              displayName: "By URL",
              name: "url",
              type: "string",
              placeholder: "https://example.com/user/a4071e98-7d40-41fb-8911-ce3e7bf94fb2",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "https://example.com/user/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
                    errorMessage: "Not a valid example URL"
                  }
                }
              ],
              extractValue: {
                type: "regex",
                regex: "https://example.com/user/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})"
              }
            },
            {
              displayName: "ID",
              name: "id",
              type: "string",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
                    errorMessage: "Not a valid UUI"
                  }
                }
              ],
              placeholder: "a4071e98-7d40-41fb-8911-ce3e7bf94fb2"
            }
          ]
        },
        {
          displayName: "Resource Mapping Component",
          name: "resourceMapper",
          type: "resourceMapper",
          noDataExpression: true,
          default: {
            mappingMode: "defineBelow",
            value: null
          },
          required: true,
          typeOptions: {
            loadOptionsDependsOn: ["fieldId"],
            resourceMapper: {
              resourceMapperMethod: "getMappingColumns",
              mode: "upsert",
              fieldWords: {
                singular: "column",
                plural: "columns"
              },
              addAllFields: true,
              multiKeyMatch: false
            }
          },
          displayOptions: {
            show: {
              operation: ["resourceMapper"]
            }
          }
        },
        {
          displayName: "Other Non Important Field",
          name: "otherField",
          type: "string",
          default: ""
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getOptions() {
          return import_mock.remoteOptions;
        }
      },
      listSearch: {
        async optionsSearch(filter, paginationToken) {
          const pageSize = 5;
          let results = import_mock.searchOptions;
          if (filter) {
            results = results.filter((option) => option.name.includes(filter));
          }
          const offset = paginationToken ? parseInt(paginationToken, 10) : 0;
          results = results.slice(offset, offset + pageSize);
          return {
            results,
            paginationToken: offset + pageSize
          };
        }
      },
      resourceMapping: {
        async getMappingColumns() {
          return import_mock.resourceMapperFields;
        }
      }
    };
  }
  async execute() {
    const operation = this.getNodeParameter("operation", 0);
    if (operation === "resourceMapper") {
      const rmValue = this.getNodeParameter("resourceMapper.value", 0);
      if (rmValue) {
        return [[{ json: rmValue }]];
      }
    }
    return [import_mock.returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  E2eTest
});
//# sourceMappingURL=E2eTest.node.js.map