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
var FileMaker_node_exports = {};
__export(FileMaker_node_exports, {
  FileMaker: () => FileMaker
});
module.exports = __toCommonJS(FileMaker_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class FileMaker {
  constructor() {
    this.description = {
      displayName: "FileMaker",
      name: "filemaker",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:filemaker.png",
      group: ["input"],
      version: 1,
      description: "Retrieve data from the FileMaker data API",
      defaults: {
        name: "FileMaker"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "fileMaker",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Action",
          name: "action",
          type: "options",
          default: "record",
          options: [
            /*{
            	name: 'Login',
            	value: 'login',
            },
            {
            	name: 'Logout',
            	value: 'logout',
            },*/
            {
              name: "Create Record",
              value: "create"
            },
            {
              name: "Delete Record",
              value: "delete"
            },
            {
              name: "Duplicate Record",
              value: "duplicate"
            },
            {
              name: "Edit Record",
              value: "edit"
            },
            {
              name: "Find Records",
              value: "find"
            },
            {
              name: "Get Records",
              value: "records"
            },
            {
              name: "Get Records By ID",
              value: "record"
            },
            {
              name: "Perform Script",
              value: "performscript"
            }
          ]
        },
        // ----------------------------------
        //         shared
        // ----------------------------------
        {
          displayName: "Layout Name or ID",
          name: "layout",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLayouts"
          },
          options: [],
          default: "",
          required: true,
          displayOptions: {},
          placeholder: "Layout Name",
          description: 'FileMaker Layout Name. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Record ID",
          name: "recid",
          type: "number",
          default: "",
          required: true,
          displayOptions: {
            show: {
              action: ["record", "edit", "delete", "duplicate"]
            }
          },
          placeholder: "Record ID",
          description: "Internal Record ID returned by get (recordid)"
        },
        {
          displayName: "Offset",
          name: "offset",
          placeholder: "0",
          description: "The record number of the first record in the range of records",
          type: "number",
          default: 1,
          displayOptions: {
            show: {
              action: ["find", "records"]
            }
          }
        },
        {
          displayName: "Limit",
          name: "limit",
          placeholder: "100",
          description: "Max number of results to return",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          default: 100,
          displayOptions: {
            show: {
              action: ["find", "records"]
            }
          }
        },
        {
          displayName: "Get Portals",
          name: "getPortals",
          type: "boolean",
          default: false,
          description: "Whether to get portal data as well",
          displayOptions: {
            show: {
              action: ["record", "records", "find"]
            }
          }
        },
        {
          displayName: "Portals Name or ID",
          name: "portals",
          type: "options",
          typeOptions: {
            multipleValues: true,
            multipleValueButtonText: "Add portal",
            loadOptionsMethod: "getPortals"
          },
          options: [],
          default: [],
          displayOptions: {
            show: {
              action: ["record", "records", "find"],
              getPortals: [true]
            }
          },
          placeholder: "Portals",
          description: 'The portal result set to return. Use the portal object name or portal table name. If this parameter is omitted, the API will return all portal objects and records in the layout. For best performance, pass the portal object name or portal table name. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        // ----------------------------------
        //         find/records
        // ----------------------------------
        {
          displayName: "Response Layout Name or ID",
          name: "responseLayout",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getResponseLayouts"
          },
          options: [],
          default: "",
          displayOptions: {
            show: {
              action: ["find"]
            }
          }
        },
        {
          displayName: "Queries",
          name: "queries",
          placeholder: "Add query",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              action: ["find"]
            }
          },
          default: {},
          options: [
            {
              name: "query",
              displayName: "Query",
              values: [
                {
                  displayName: "Fields",
                  name: "fields",
                  placeholder: "Add field",
                  type: "fixedCollection",
                  default: {},
                  typeOptions: {
                    multipleValues: true
                  },
                  options: [
                    {
                      name: "field",
                      displayName: "Field",
                      values: [
                        {
                          displayName: "Field Name or ID",
                          name: "name",
                          type: "options",
                          default: "",
                          typeOptions: {
                            loadOptionsMethod: "getFields"
                          },
                          options: [],
                          description: 'Search Field. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
                        },
                        {
                          displayName: "Value",
                          name: "value",
                          type: "string",
                          default: "",
                          description: "Value to search"
                        }
                      ]
                    }
                  ],
                  description: "Field Name"
                },
                {
                  displayName: "Omit",
                  name: "omit",
                  type: "boolean",
                  default: false
                }
              ]
            }
          ]
        },
        {
          displayName: "Sort Data?",
          name: "setSort",
          type: "boolean",
          default: false,
          description: "Whether to sort data",
          displayOptions: {
            show: {
              action: ["find", "record", "records"]
            }
          }
        },
        {
          displayName: "Sort",
          name: "sortParametersUi",
          placeholder: "Add Sort Rules",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              setSort: [true],
              action: ["find", "records"]
            }
          },
          description: "Sort rules",
          default: {},
          options: [
            {
              name: "rules",
              displayName: "Rules",
              values: [
                {
                  displayName: "Field Name or ID",
                  name: "name",
                  type: "options",
                  default: "",
                  typeOptions: {
                    loadOptionsMethod: "getFields"
                  },
                  options: [],
                  description: 'Field Name. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
                },
                {
                  displayName: "Order",
                  name: "value",
                  type: "options",
                  default: "ascend",
                  options: [
                    {
                      name: "Ascend",
                      value: "ascend"
                    },
                    {
                      name: "Descend",
                      value: "descend"
                    }
                  ],
                  description: "Sort order"
                }
              ]
            }
          ]
        },
        {
          displayName: "Before Find Script",
          name: "setScriptBefore",
          type: "boolean",
          default: false,
          description: "Whether to define a script to be run before the action specified by the API call and after the subsequent sort",
          displayOptions: {
            show: {
              action: ["find", "record", "records"]
            }
          }
        },
        {
          displayName: "Script Name or ID",
          name: "scriptBefore",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getScripts"
          },
          options: [],
          default: "",
          required: true,
          displayOptions: {
            show: {
              action: ["find", "record", "records"],
              setScriptBefore: [true]
            }
          },
          placeholder: "Script Name",
          description: 'The name of the FileMaker script to be run after the action specified by the API call and after the subsequent sort. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Script Parameter",
          name: "scriptBeforeParam",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              action: ["find", "record", "records"],
              setScriptBefore: [true]
            }
          },
          placeholder: "Script Parameters",
          description: "A parameter for the FileMaker script"
        },
        {
          displayName: "Before Sort Script",
          name: "setScriptSort",
          type: "boolean",
          default: false,
          description: "Whether to define a script to be run after the action specified by the API call but before the subsequent sort",
          displayOptions: {
            show: {
              action: ["find", "record", "records"]
            }
          }
        },
        {
          displayName: "Script Name or ID",
          name: "scriptSort",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getScripts"
          },
          options: [],
          default: "",
          required: true,
          displayOptions: {
            show: {
              action: ["find", "record", "records"],
              setScriptSort: [true]
            }
          },
          placeholder: "Script Name",
          description: 'The name of the FileMaker script to be run after the action specified by the API call but before the subsequent sort. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Script Parameter",
          name: "scriptSortParam",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              action: ["find", "record", "records"],
              setScriptSort: [true]
            }
          },
          placeholder: "Script Parameters",
          description: "A parameter for the FileMaker script"
        },
        {
          displayName: "After Sort Script",
          name: "setScriptAfter",
          type: "boolean",
          default: false,
          description: "Whether to define a script to be run after the action specified by the API call but before the subsequent sort",
          displayOptions: {
            show: {
              action: ["find", "record", "records"]
            }
          }
        },
        {
          displayName: "Script Name or ID",
          name: "scriptAfter",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getScripts"
          },
          options: [],
          default: "",
          required: true,
          displayOptions: {
            show: {
              action: ["find", "record", "records"],
              setScriptAfter: [true]
            }
          },
          placeholder: "Script Name",
          description: 'The name of the FileMaker script to be run after the action specified by the API call and after the subsequent sort. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Script Parameter",
          name: "scriptAfterParam",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              action: ["find", "record", "records"],
              setScriptAfter: [true]
            }
          },
          placeholder: "Script Parameters",
          description: "A parameter for the FileMaker script"
        },
        // ----------------------------------
        //         create/edit
        // ----------------------------------
        /*{
        	displayName: 'fieldData',
        	name: 'fieldData',
        	placeholder: '{"field1": "value", "field2": "value", ...}',
        	description: 'Additional fields to add.',
        	type: 'string',
        	default: '{}',
        	displayOptions: {
        		show: {
        			action: [
        				'create',
        				'edit',
        			],
        		},
        	}
        },*/
        {
          displayName: "Mod ID",
          name: "modId",
          description: "The last modification ID. When you use modId, a record is edited only when the modId matches.",
          type: "number",
          default: "",
          displayOptions: {
            show: {
              action: ["edit"]
            }
          }
        },
        {
          displayName: "Fields",
          name: "fieldsParametersUi",
          placeholder: "Add field",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              action: ["create", "edit"]
            }
          },
          description: "Fields to define",
          default: {},
          options: [
            {
              name: "fields",
              displayName: "Fields",
              values: [
                {
                  displayName: "Field Name or ID",
                  name: "name",
                  type: "options",
                  default: "",
                  typeOptions: {
                    loadOptionsMethod: "getFields"
                  },
                  options: [],
                  description: 'Field Name. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "string",
                  default: ""
                }
              ]
            }
          ]
        },
        // ----------------------------------
        //         performscript
        // ----------------------------------
        {
          displayName: "Script Name or ID",
          name: "script",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getScripts"
          },
          options: [],
          default: "",
          required: true,
          displayOptions: {
            show: {
              action: ["performscript"]
            }
          },
          placeholder: "Script Name",
          description: 'The name of the FileMaker script to be run. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Script Parameter",
          name: "scriptParam",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              action: ["performscript"]
            }
          },
          placeholder: "Script Parameters",
          description: "A parameter for the FileMaker script"
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available topics to display them to user so that they can
        // select them easily
        async getLayouts() {
          return await import_GenericFunctions.layoutsApiRequest.call(this);
        },
        async getResponseLayouts() {
          const returnData = [];
          returnData.push({
            name: "Use main layout",
            value: ""
          });
          const layouts = await import_GenericFunctions.layoutsApiRequest.call(this);
          for (const layout of layouts) {
            returnData.push({
              name: layout.name,
              value: layout.name
            });
          }
          return returnData;
        },
        async getFields() {
          const returnData = [];
          const fields = await import_GenericFunctions.getFields.call(this);
          if (!Array.isArray(fields)) return [];
          for (const field of fields) {
            returnData.push({
              name: field.name,
              value: field.name
            });
          }
          return returnData;
        },
        async getScripts() {
          const returnData = [];
          const scripts = await import_GenericFunctions.getScripts.call(this);
          for (const script of scripts) {
            if (!script.isFolder) {
              returnData.push({
                name: script.name,
                value: script.name
              });
            }
          }
          return returnData;
        },
        async getPortals() {
          const returnData = [];
          const portals = await import_GenericFunctions.getPortals.call(this);
          Object.keys(portals).forEach((portal) => {
            returnData.push({
              name: portal,
              value: portal
            });
          });
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const credentials = await this.getCredentials("fileMaker");
    let token;
    try {
      token = await import_GenericFunctions.getToken.call(this);
    } catch (error) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), error);
    }
    let requestOptions;
    const host = credentials.host;
    const database = credentials.db;
    const url = `https://${host}/fmi/data/v1`;
    const action = this.getNodeParameter("action", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        requestOptions = {
          uri: "",
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "GET",
          json: true
        };
        const layout = this.getNodeParameter("layout", i);
        if (action === "record") {
          const recid = this.getNodeParameter("recid", i);
          requestOptions.uri = url + `/databases/${database}/layouts/${layout}/records/${recid}`;
          requestOptions.qs = {
            portal: JSON.stringify(import_GenericFunctions.parsePortals.call(this, i)),
            ...import_GenericFunctions.parseScripts.call(this, i)
          };
        } else if (action === "records") {
          requestOptions.uri = url + `/databases/${database}/layouts/${layout}/records`;
          requestOptions.qs = {
            _offset: this.getNodeParameter("offset", i),
            _limit: this.getNodeParameter("limit", i),
            portal: JSON.stringify(import_GenericFunctions.parsePortals.call(this, i)),
            ...import_GenericFunctions.parseScripts.call(this, i)
          };
          const sort = import_GenericFunctions.parseSort.call(this, i);
          if (sort) {
            requestOptions.body.sort = sort;
          }
        } else if (action === "find") {
          requestOptions.uri = url + `/databases/${database}/layouts/${layout}/_find`;
          requestOptions.method = "POST";
          requestOptions.body = {
            query: import_GenericFunctions.parseQuery.call(this, i),
            offset: this.getNodeParameter("offset", i),
            limit: this.getNodeParameter("limit", i),
            "layout.response": this.getNodeParameter("responseLayout", i),
            ...import_GenericFunctions.parseScripts.call(this, i)
          };
          const sort = import_GenericFunctions.parseSort.call(this, i);
          if (sort) {
            requestOptions.body.sort = sort;
          }
        } else if (action === "create") {
          requestOptions.uri = url + `/databases/${database}/layouts/${layout}/records`;
          requestOptions.method = "POST";
          requestOptions.headers["Content-Type"] = "application/json";
          requestOptions.body = {
            fieldData: { ...import_GenericFunctions.parseFields.call(this, i) },
            portalData: {},
            ...import_GenericFunctions.parseScripts.call(this, i)
          };
        } else if (action === "edit") {
          const recid = this.getNodeParameter("recid", i);
          requestOptions.uri = url + `/databases/${database}/layouts/${layout}/records/${recid}`;
          requestOptions.method = "PATCH";
          requestOptions.headers["Content-Type"] = "application/json";
          requestOptions.body = {
            fieldData: { ...import_GenericFunctions.parseFields.call(this, i) },
            portalData: {},
            ...import_GenericFunctions.parseScripts.call(this, i)
          };
        } else if (action === "performscript") {
          const scriptName = this.getNodeParameter("script", i);
          requestOptions.uri = url + `/databases/${database}/layouts/${layout}/script/${scriptName}`;
          requestOptions.qs = {
            "script.param": this.getNodeParameter("scriptParam", i)
          };
        } else if (action === "duplicate") {
          const recid = this.getNodeParameter("recid", i);
          requestOptions.uri = url + `/databases/${database}/layouts/${layout}/records/${recid}`;
          requestOptions.method = "POST";
          requestOptions.headers["Content-Type"] = "application/json";
          requestOptions.qs = {
            ...import_GenericFunctions.parseScripts.call(this, i)
          };
        } else if (action === "delete") {
          const recid = this.getNodeParameter("recid", i);
          requestOptions.uri = url + `/databases/${database}/layouts/${layout}/records/${recid}`;
          requestOptions.method = "DELETE";
          requestOptions.qs = {
            ...import_GenericFunctions.parseScripts.call(this, i)
          };
        } else {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The action "${action}" is not implemented yet!`,
            { itemIndex: i }
          );
        }
        let response;
        try {
          response = await this.helpers.request(requestOptions);
        } catch (error) {
          response = error.error;
        }
        if (typeof response === "string") {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "DataAPI response body is not valid JSON. Is the DataAPI enabled?",
            { itemIndex: i }
          );
        }
        returnData.push({ json: response, pairedItem: { item: i } });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: error.message },
            pairedItem: { item: i }
          });
        } else {
          if (error.node) {
            throw error;
          }
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The action "${error.message}" is not implemented yet!`
          );
        }
      }
    }
    await import_GenericFunctions.logout.call(this, token);
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileMaker
});
//# sourceMappingURL=FileMaker.node.js.map