"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Mailchimp_node_exports = {};
__export(Mailchimp_node_exports, {
  Mailchimp: () => Mailchimp
});
module.exports = __toCommonJS(Mailchimp_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
const Statuses = {
  subscribe: "subscribe",
  unsubscribed: "unsubscribe",
  cleaned: "cleaned",
  pending: "pending",
  transactional: "transactional"
};
class Mailchimp {
  constructor() {
    this.description = {
      displayName: "Mailchimp",
      name: "mailchimp",
      icon: { light: "file:mailchimp.svg", dark: "file:mailchimp.dark.svg" },
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Mailchimp API",
      defaults: {
        name: "Mailchimp"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mailchimpApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiKey"]
            }
          }
        },
        {
          name: "mailchimpOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "API Key",
              value: "apiKey"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiKey"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Campaign",
              value: "campaign"
            },
            {
              name: "List Group",
              value: "listGroup"
            },
            {
              name: "Member",
              value: "member"
            },
            {
              name: "Member Tag",
              value: "memberTag"
            }
          ],
          default: "member",
          required: true
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          required: true,
          displayOptions: {
            show: {
              resource: ["member"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              description: "Create a new member on list",
              action: "Create a member"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a member on list",
              action: "Delete a member"
            },
            {
              name: "Get",
              value: "get",
              description: "Get a member on list",
              action: "Get a member"
            },
            {
              name: "Get Many",
              value: "getAll",
              description: "Get many members on a list",
              action: "Get many members"
            },
            {
              name: "Update",
              value: "update",
              description: "Update a new member on list",
              action: "Update a member"
            }
          ],
          default: "create"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          required: true,
          displayOptions: {
            show: {
              resource: ["memberTag"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              description: "Add tags from a list member",
              action: "Create a member tag"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Remove tags from a list member",
              action: "Delete a member tag"
            }
          ],
          default: "create"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          required: true,
          displayOptions: {
            show: {
              resource: ["listGroup"]
            }
          },
          options: [
            {
              name: "Get Many",
              value: "getAll",
              description: "Get many groups",
              action: "Get many list groups"
            }
          ],
          default: "getAll"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          required: true,
          displayOptions: {
            show: {
              resource: ["campaign"]
            }
          },
          options: [
            {
              name: "Delete",
              value: "delete",
              description: "Delete a campaign",
              action: "Delete a campaign"
            },
            {
              name: "Get",
              value: "get",
              description: "Get a campaign",
              action: "Get a campaign"
            },
            {
              name: "Get Many",
              value: "getAll",
              description: "Get many campaigns",
              action: "Get many campaigns"
            },
            {
              name: "Replicate",
              value: "replicate",
              description: "Replicate a campaign",
              action: "Replicate a campaign"
            },
            {
              name: "Resend",
              value: "resend",
              description: "Creates a Resend to Non-Openers version of this campaign",
              action: "Resend a campaign"
            },
            {
              name: "Send",
              value: "send",
              description: "Send a campaign",
              action: "Send a campaign"
            }
          ],
          default: "getAll"
        },
        /* -------------------------------------------------------------------------- */
        /*                                 member:create                              */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "List Name or ID",
          name: "list",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"]
            }
          },
          default: "",
          options: [],
          required: true,
          description: 'List of lists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          required: true,
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"]
            }
          },
          default: "",
          description: "Email address for a subscriber"
        },
        {
          displayName: "Status",
          name: "status",
          type: "options",
          required: true,
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"]
            }
          },
          options: [
            {
              name: "Cleaned",
              value: "cleaned"
            },
            {
              name: "Pending",
              value: "pending"
            },
            {
              name: "Subscribed",
              value: "subscribed"
            },
            {
              name: "Transactional",
              value: "transactional"
            },
            {
              name: "Unsubscribed",
              value: "unsubscribed"
            }
          ],
          default: "",
          description: "Subscriber's current status"
        },
        {
          displayName: "JSON Parameters",
          name: "jsonParameters",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"]
            }
          },
          options: [
            {
              displayName: "Email Type",
              name: "emailType",
              type: "options",
              options: [
                {
                  name: "HTML",
                  value: "html"
                },
                {
                  name: "Text",
                  value: "text"
                }
              ],
              default: "",
              description: "Type of email this member asked to get"
            },
            {
              displayName: "Language",
              name: "language",
              type: "string",
              default: "",
              description: "If set/detected, the subscriber's language"
            },
            {
              displayName: "Opt-in IP",
              name: "ipOptIn",
              type: "string",
              default: "",
              description: "The IP address the subscriber used to confirm their opt-in status"
            },
            {
              displayName: "Signup IP",
              name: "ipSignup",
              type: "string",
              default: "",
              description: "IP address the subscriber signed up from"
            },
            {
              displayName: "Signup Timestamp",
              name: "timestampSignup",
              type: "dateTime",
              default: "",
              description: "The date and time the subscriber signed up for the list in ISO 8601 format"
            },
            {
              displayName: "Tags",
              name: "tags",
              type: "string",
              default: "",
              description: "The tags that are associated with a member separeted by ,"
            },
            {
              displayName: "Vip",
              name: "vip",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "Vip status for subscribers"
            },
            {
              displayName: "Opt-in Timestamp",
              name: "timestampOpt",
              type: "dateTime",
              default: "",
              description: "The date and time the subscribe confirmed their opt-in status in ISO 8601 format"
            }
          ]
        },
        {
          displayName: "Location",
          name: "locationFieldsUi",
          type: "fixedCollection",
          placeholder: "Add Location",
          default: {},
          description: "Subscriber location information.n",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"],
              jsonParameters: [false]
            }
          },
          options: [
            {
              name: "locationFieldsValues",
              displayName: "Location",
              values: [
                {
                  displayName: "Latitude",
                  name: "latitude",
                  type: "string",
                  required: true,
                  description: "The location latitude",
                  default: ""
                },
                {
                  displayName: "Longitude",
                  name: "longitude",
                  type: "string",
                  required: true,
                  description: "The location longitude",
                  default: ""
                }
              ]
            }
          ]
        },
        {
          displayName: "Merge Fields",
          name: "mergeFieldsUi",
          placeholder: "Add Merge Fields",
          type: "fixedCollection",
          default: {},
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"],
              jsonParameters: [false]
            }
          },
          description: "An individual merge var and value for a member",
          options: [
            {
              name: "mergeFieldsValues",
              displayName: "Field",
              typeOptions: {
                multipleValueButtonText: "Add Field"
              },
              values: [
                {
                  displayName: "Field Name or ID",
                  name: "name",
                  type: "options",
                  typeOptions: {
                    loadOptionsMethod: "getMergeFields",
                    loadOptionsDependsOn: ["list"]
                  },
                  required: true,
                  description: 'Merge Field name. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                  default: ""
                },
                {
                  displayName: "Field Value",
                  name: "value",
                  required: true,
                  type: "string",
                  default: "",
                  description: "Merge field value"
                }
              ]
            }
          ]
        },
        {
          displayName: "Merge Fields",
          name: "mergeFieldsJson",
          type: "json",
          typeOptions: {
            alwaysOpenEditWindow: true
          },
          default: "",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"],
              jsonParameters: [true]
            }
          }
        },
        {
          displayName: "Location",
          name: "locationJson",
          type: "json",
          typeOptions: {
            alwaysOpenEditWindow: true
          },
          default: "",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"],
              jsonParameters: [true]
            }
          }
        },
        {
          displayName: "Interest Groups",
          name: "groupsUi",
          placeholder: "Add Interest Group",
          type: "fixedCollection",
          default: {},
          typeOptions: {
            multipleValues: true
          },
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"],
              jsonParameters: [false]
            }
          },
          options: [
            {
              name: "groupsValues",
              displayName: "Group",
              typeOptions: {
                multipleValueButtonText: "Add Interest Group"
              },
              values: [
                {
                  displayName: "Category Name or ID",
                  name: "categoryId",
                  type: "options",
                  description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                  typeOptions: {
                    loadOptionsMethod: "getGroupCategories",
                    loadOptionsDependsOn: ["list"]
                  },
                  default: ""
                },
                {
                  displayName: "Category Field ID",
                  name: "categoryFieldId",
                  type: "string",
                  default: ""
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "boolean",
                  default: false
                }
              ]
            }
          ]
        },
        {
          displayName: "Interest Groups",
          name: "groupJson",
          type: "json",
          typeOptions: {
            alwaysOpenEditWindow: true
          },
          default: "",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["create"],
              jsonParameters: [true]
            }
          }
        },
        /* -------------------------------------------------------------------------- */
        /*                                 member:delete                              */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "List Name or ID",
          name: "list",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["delete"]
            }
          },
          default: "",
          options: [],
          required: true,
          description: 'List of lists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["delete"]
            }
          },
          default: "",
          required: true,
          description: "Member's email"
        },
        /* -------------------------------------------------------------------------- */
        /*                                 member:get                                 */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "List Name or ID",
          name: "list",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["get"]
            }
          },
          default: "",
          options: [],
          required: true,
          description: 'List of lists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["get"]
            }
          },
          default: "",
          required: true,
          description: "Member's email"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["get"]
            }
          },
          options: [
            {
              displayName: "Fields",
              name: "fields",
              type: "string",
              default: "",
              description: "A comma-separated list of fields to return"
            },
            {
              displayName: "Exclude Fields",
              name: "excludeFields",
              type: "string",
              default: "",
              description: "A comma-separated list of fields to exclude"
            }
          ]
        },
        /* -------------------------------------------------------------------------- */
        /*                                 member:getAll                              */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "List Name or ID",
          name: "list",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["getAll"]
            }
          },
          default: "",
          options: [],
          required: true,
          description: 'List of lists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["getAll"]
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
              resource: ["member"],
              operation: ["getAll"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 1e3
          },
          default: 500,
          description: "Max number of results to return"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["getAll"]
            }
          },
          options: [
            {
              displayName: "Before Last Changed",
              name: "beforeLastChanged",
              type: "dateTime",
              default: "",
              description: "Restrict results to subscribers whose information changed before the set timeframe"
            },
            {
              displayName: "Before Timestamp Opt",
              name: "beforeTimestampOpt",
              type: "dateTime",
              default: "",
              description: "Restrict results to subscribers who opted-in before the set timeframe"
            },
            // {
            // 	displayName: 'Fields',
            // 	name: 'fields',
            // 	type: 'string',
            // 	default: '',
            // 	description: 'A comma-separated list of fields to return.',
            // },
            // {
            // 	displayName: 'Exclude Fields',
            // 	name: 'excludeFields',
            // 	type: 'string',
            // 	default: '',
            // 	description: 'A comma-separated list of fields to exclude.',
            // },
            {
              displayName: "Email Type",
              name: "emailType",
              type: "options",
              options: [
                {
                  name: "HTML",
                  value: "html"
                },
                {
                  name: "Text",
                  value: "text"
                }
              ],
              default: "",
              description: "Type of email this member asked to get"
            },
            {
              displayName: "Status",
              name: "status",
              type: "options",
              options: [
                {
                  name: "Cleaned",
                  value: "cleaned"
                },
                {
                  name: "Pending",
                  value: "pending"
                },
                {
                  name: "Subscribed",
                  value: "subscribed"
                },
                {
                  name: "Transactional",
                  value: "transactional"
                },
                {
                  name: "Unsubscribed",
                  value: "unsubscribed"
                }
              ],
              default: "",
              description: "Subscriber's current status"
            },
            {
              displayName: "Since Last Changed",
              name: "sinceLastChanged",
              type: "dateTime",
              default: "",
              description: "Restrict results to subscribers whose information changed after the set timeframe"
            }
          ]
        },
        /* -------------------------------------------------------------------------- */
        /*                                 member:update                              */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "List Name or ID",
          name: "list",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["update"]
            }
          },
          default: "",
          options: [],
          required: true,
          description: 'List of lists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          required: true,
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["update"]
            }
          },
          default: "",
          description: "Email address of the subscriber"
        },
        {
          displayName: "JSON Parameters",
          name: "jsonParameters",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["update"]
            }
          }
        },
        {
          displayName: "Update Fields",
          name: "updateFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["update"]
            }
          },
          options: [
            {
              displayName: "Email Type",
              name: "emailType",
              type: "options",
              options: [
                {
                  name: "HTML",
                  value: "html"
                },
                {
                  name: "Text",
                  value: "text"
                }
              ],
              default: "",
              description: "Type of email this member asked to get"
            },
            {
              displayName: "Interest Groups",
              name: "groupsUi",
              placeholder: "Add Interest Group",
              type: "fixedCollection",
              default: {},
              typeOptions: {
                multipleValues: true
              },
              displayOptions: {
                show: {
                  "/resource": ["member"],
                  "/operation": ["update"],
                  "/jsonParameters": [false]
                }
              },
              options: [
                {
                  name: "groupsValues",
                  displayName: "Group",
                  typeOptions: {
                    multipleValueButtonText: "Add Interest Group"
                  },
                  values: [
                    {
                      displayName: "Category Name or ID",
                      name: "categoryId",
                      type: "options",
                      description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                      typeOptions: {
                        loadOptionsMethod: "getGroupCategories",
                        loadOptionsDependsOn: ["list"]
                      },
                      default: ""
                    },
                    {
                      displayName: "Category Field ID",
                      name: "categoryFieldId",
                      type: "string",
                      default: ""
                    },
                    {
                      displayName: "Value",
                      name: "value",
                      type: "boolean",
                      default: false
                    }
                  ]
                }
              ]
            },
            {
              displayName: "Language",
              name: "language",
              type: "string",
              default: "",
              description: "If set/detected, the subscriber's language"
            },
            {
              displayName: "Merge Fields",
              name: "mergeFieldsUi",
              placeholder: "Add Merge Fields",
              type: "fixedCollection",
              default: {},
              typeOptions: {
                multipleValues: true
              },
              displayOptions: {
                show: {
                  "/resource": ["member"],
                  "/operation": ["update"],
                  "/jsonParameters": [false]
                }
              },
              description: "An individual merge var and value for a member",
              options: [
                {
                  name: "mergeFieldsValues",
                  displayName: "Field",
                  typeOptions: {
                    multipleValueButtonText: "Add Field"
                  },
                  values: [
                    {
                      displayName: "Field Name or ID",
                      name: "name",
                      type: "options",
                      typeOptions: {
                        loadOptionsMethod: "getMergeFields",
                        loadOptionsDependsOn: ["list"]
                      },
                      required: true,
                      description: 'Merge Field name. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                      default: ""
                    },
                    {
                      displayName: "Field Value",
                      name: "value",
                      required: true,
                      type: "string",
                      default: "",
                      description: "Merge field value"
                    }
                  ]
                }
              ]
            },
            {
              displayName: "Opt-in IP",
              name: "ipOptIn",
              type: "string",
              default: "",
              description: "The IP address the subscriber used to confirm their opt-in status"
            },
            {
              displayName: "Signup IP",
              name: "ipSignup",
              type: "string",
              default: "",
              description: "IP address the subscriber signed up from"
            },
            {
              displayName: "Signup Timestamp",
              name: "timestampSignup",
              type: "dateTime",
              default: "",
              description: "The date and time the subscriber signed up for the list in ISO 8601 format"
            },
            {
              displayName: "Skip Merge Validation",
              name: "skipMergeValidation",
              type: "boolean",
              default: false,
              description: "Whether member data will be accepted without merge field values, even if the merge field is usually required"
            },
            {
              displayName: "Status",
              name: "status",
              type: "options",
              options: [
                {
                  name: "Cleaned",
                  value: "cleaned"
                },
                {
                  name: "Pending",
                  value: "pending"
                },
                {
                  name: "Subscribed",
                  value: "subscribed"
                },
                {
                  name: "Transactional",
                  value: "transactional"
                },
                {
                  name: "Unsubscribed",
                  value: "unsubscribed"
                }
              ],
              default: "",
              description: "Subscriber's current status"
            },
            {
              displayName: "Vip",
              name: "vip",
              type: "boolean",
              default: false,
              // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
              description: "Vip status for subscribers"
            },
            {
              displayName: "Location",
              name: "locationFieldsUi",
              type: "fixedCollection",
              placeholder: "Add Location",
              default: {},
              description: "Subscriber location information.n",
              displayOptions: {
                show: {
                  "/resource": ["member"],
                  "/operation": ["update"],
                  "/jsonParameters": [false]
                }
              },
              options: [
                {
                  name: "locationFieldsValues",
                  displayName: "Location",
                  values: [
                    {
                      displayName: "Latitude",
                      name: "latitude",
                      type: "string",
                      required: true,
                      description: "The location latitude",
                      default: ""
                    },
                    {
                      displayName: "Longitude",
                      name: "longitude",
                      type: "string",
                      required: true,
                      description: "The location longitude",
                      default: ""
                    }
                  ]
                }
              ]
            },
            {
              displayName: "Opt-in Timestamp",
              name: "timestampOpt",
              type: "dateTime",
              default: "",
              description: "The date and time the subscribe confirmed their opt-in status in ISO 8601 format"
            }
          ]
        },
        {
          displayName: "Merge Fields",
          name: "mergeFieldsJson",
          type: "json",
          typeOptions: {
            alwaysOpenEditWindow: true
          },
          default: "",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["update"],
              jsonParameters: [true]
            }
          }
        },
        {
          displayName: "Location",
          name: "locationJson",
          type: "json",
          typeOptions: {
            alwaysOpenEditWindow: true
          },
          default: "",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["update"],
              jsonParameters: [true]
            }
          }
        },
        {
          displayName: "Interest Groups",
          name: "groupJson",
          type: "json",
          typeOptions: {
            alwaysOpenEditWindow: true
          },
          default: "",
          displayOptions: {
            show: {
              resource: ["member"],
              operation: ["update"],
              jsonParameters: [true]
            }
          }
        },
        /* -------------------------------------------------------------------------- */
        /*                                 memberTag:create                           */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "List Name or ID",
          name: "list",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          displayOptions: {
            show: {
              resource: ["memberTag"],
              operation: ["create", "delete"]
            }
          },
          default: "",
          options: [],
          required: true,
          description: 'List of lists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          required: true,
          displayOptions: {
            show: {
              resource: ["memberTag"],
              operation: ["create", "delete"]
            }
          },
          default: "",
          description: "Email address of the subscriber"
        },
        {
          displayName: "Tags",
          name: "tags",
          type: "string",
          typeOptions: {
            multipleValues: true,
            multipleValueButtonText: "Add Tag"
          },
          displayOptions: {
            show: {
              resource: ["memberTag"],
              operation: ["create", "delete"]
            }
          },
          default: []
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["memberTag"],
              operation: ["create", "delete"]
            }
          },
          options: [
            {
              displayName: "Is Syncing",
              name: "isSyncing",
              type: "boolean",
              default: false,
              description: "Whether automations based on the tags in the request will not fire"
            }
          ]
        },
        /* -------------------------------------------------------------------------- */
        /*                                 member:getAll                              */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "List Name or ID",
          name: "list",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getLists"
          },
          displayOptions: {
            show: {
              resource: ["listGroup"],
              operation: ["getAll"]
            }
          },
          default: "",
          options: [],
          required: true,
          description: 'List of lists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Group Category Name or ID",
          name: "groupCategory",
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          typeOptions: {
            loadOptionsMethod: "getGroupCategories",
            loadOptionsDependsOn: ["list"]
          },
          displayOptions: {
            show: {
              resource: ["listGroup"],
              operation: ["getAll"]
            }
          },
          default: "",
          options: [],
          required: true
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              resource: ["listGroup"],
              operation: ["getAll"]
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
              resource: ["listGroup"],
              operation: ["getAll"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 1e3
          },
          default: 500,
          description: "Max number of results to return"
        },
        /* -------------------------------------------------------------------------- */
        /*                                 campaign:getAll                            */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              resource: ["campaign"],
              operation: ["getAll"]
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
              resource: ["campaign"],
              operation: ["getAll"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 1e3
          },
          default: 10,
          description: "Max number of results to return"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["campaign"],
              operation: ["getAll"]
            }
          },
          options: [
            {
              displayName: "Before Create Time",
              name: "beforeCreateTime",
              type: "dateTime",
              default: "",
              description: "Restrict the response to campaigns created before the set time"
            },
            {
              displayName: "Before Send Time",
              name: "beforeSendTime",
              type: "dateTime",
              default: "",
              description: "Restrict the response to campaigns sent before the set time"
            },
            {
              displayName: "Exclude Field Names or IDs",
              name: "excludeFields",
              type: "multiOptions",
              typeOptions: {
                loadOptionsMethod: "getCampaignsFields"
              },
              default: [],
              description: 'A comma-separated list of fields to exclude. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            },
            {
              displayName: "Field Names or IDs",
              name: "fields",
              type: "multiOptions",
              typeOptions: {
                loadOptionsMethod: "getCampaignsFields"
              },
              default: [
                "campaigns.id",
                "campaigns.status",
                "campaigns.tracking",
                "campaigns.settings.from_name",
                "campaigns.settings.reply_to",
                "campaigns.settings.title"
              ],
              description: 'A comma-separated list of fields to return. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            },
            {
              displayName: "List Name or ID",
              name: "listId",
              type: "options",
              typeOptions: {
                loadOptionsMethod: "getLists"
              },
              default: "",
              description: 'List of lists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            },
            {
              displayName: "Since Create Time",
              name: "sinceCreateTime",
              type: "dateTime",
              default: "",
              description: "Restrict the response to campaigns created after the set time"
            },
            {
              displayName: "Since Send Time",
              name: "sinceSendTime",
              type: "dateTime",
              default: "",
              description: "Restrict the response to campaigns sent after the set time"
            },
            {
              displayName: "Sort Direction",
              name: "sortDirection",
              type: "options",
              options: [
                {
                  name: "ASC",
                  value: "ASC"
                },
                {
                  name: "DESC",
                  value: "DESC"
                }
              ],
              default: "",
              description: "Determines the order direction for sorted results"
            },
            {
              displayName: "Sort Field",
              name: "sortField",
              type: "options",
              options: [
                {
                  name: "Create Time",
                  value: "create_time"
                },
                {
                  name: "Send Time",
                  value: "send_time"
                }
              ],
              default: "",
              description: "Returns files sorted by the specified field"
            },
            {
              displayName: "Status",
              name: "status",
              type: "options",
              options: [
                {
                  name: "Save",
                  value: "save"
                },
                {
                  name: "Sending",
                  value: "sending"
                },
                {
                  name: "Sent",
                  value: "sent"
                },
                {
                  name: "Schedule",
                  value: "schedule"
                }
              ],
              default: "",
              description: "The status of the campaign"
            }
          ]
        },
        /* -------------------------------------------------------------------------- */
        /*                                 campaign:send                              */
        /* -------------------------------------------------------------------------- */
        {
          displayName: "Campaign ID",
          name: "campaignId",
          type: "string",
          displayOptions: {
            show: {
              resource: ["campaign"],
              operation: ["send", "get", "delete", "replicate", "resend"]
            }
          },
          required: true,
          default: "",
          description: "List of Campaigns",
          options: []
        }
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available lists to display them to user so that they can
        // select them easily
        async getLists() {
          const returnData = [];
          const lists = await import_GenericFunctions.mailchimpApiRequestAllItems.call(this, "/lists", "GET", "lists");
          for (const list of lists) {
            const listName = list.name;
            const listId = list.id;
            returnData.push({
              name: listName,
              value: listId
            });
          }
          return returnData;
        },
        // Get all the available merge fields to display them to user so that they can
        // select them easily
        async getMergeFields() {
          const returnData = [];
          const listId = this.getCurrentNodeParameter("list");
          const { merge_fields } = await import_GenericFunctions.mailchimpApiRequest.call(
            this,
            `/lists/${listId}/merge-fields`,
            "GET"
          );
          for (const mergeField of merge_fields) {
            const mergeFieldName = mergeField.name;
            const mergeFieldId = mergeField.tag;
            returnData.push({
              name: mergeFieldName,
              value: mergeFieldId
            });
          }
          return returnData;
        },
        // Get all the interest fields to display them to user so that they can
        // select them easily
        async getGroupCategories() {
          const returnData = [];
          const listId = this.getCurrentNodeParameter("list");
          const { categories } = await import_GenericFunctions.mailchimpApiRequest.call(
            this,
            `/lists/${listId}/interest-categories`,
            "GET"
          );
          for (const category of categories) {
            const categoryName = category.title;
            const categoryId = category.id;
            returnData.push({
              name: categoryName,
              value: categoryId
            });
          }
          return returnData;
        },
        // Get all the available campaigns to display them to users so that they can select them easily
        async getCampaigns() {
          const returnData = [];
          const campaigns = await import_GenericFunctions.mailchimpApiRequestAllItems.call(
            this,
            "/campaigns",
            "GET",
            "campaigns"
          );
          for (const campaign of campaigns) {
            const campaignName = campaign.settings.title;
            const campaignId = campaign.id;
            returnData.push({
              name: campaignName,
              value: campaignId
            });
          }
          return returnData;
        },
        // Get all the available fields to display them to users so that they can select them easily
        async getCampaignsFields() {
          const returnData = [];
          for (const campaignFields of import_GenericFunctions.campaignFieldsMetadata) {
            returnData.push({
              name: campaignFields,
              value: campaignFields
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "listGroup") {
          if (operation === "getAll") {
            const listId = this.getNodeParameter("list", i);
            const categoryId = this.getNodeParameter("groupCategory", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.mailchimpApiRequestAllItems.call(
                this,
                `/lists/${listId}/interest-categories/${categoryId}/interests`,
                "GET",
                "interests",
                {},
                qs
              );
            } else {
              qs.count = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.mailchimpApiRequest.call(
                this,
                `/lists/${listId}/interest-categories/${categoryId}/interests`,
                "GET",
                {},
                qs
              );
              responseData = responseData.interests;
            }
          }
        }
        if (resource === "member") {
          if (operation === "create") {
            const listId = this.getNodeParameter("list", i);
            const email = this.getNodeParameter("email", i);
            const status = this.getNodeParameter("status", i);
            const options = this.getNodeParameter("options", i);
            const jsonActive = this.getNodeParameter("jsonParameters", i);
            const body = {
              listId,
              email_address: email,
              status
            };
            if (options.emailType) {
              body.email_type = options.emailType;
            }
            if (options.language) {
              body.language = options.language;
            }
            if (options.vip) {
              body.vip = options.vip;
            }
            if (options.ipSignup) {
              body.ip_signup = options.ipSignup;
            }
            if (options.ipOptIn) {
              body.ip_opt = options.ipOptIn;
            }
            if (options.timestampOpt) {
              body.timestamp_opt = (0, import_moment_timezone.default)(options.timestampOpt).format(
                "YYYY-MM-DD HH:MM:SS"
              );
            }
            if (options.timestampSignup) {
              body.timestamp_signup = (0, import_moment_timezone.default)(options.timestampSignup).format(
                "YYYY-MM-DD HH:MM:SS"
              );
            }
            if (options.tags) {
              body.tags = options.tags.split(",");
            }
            if (!jsonActive) {
              const locationValues = this.getNodeParameter("locationFieldsUi", i).locationFieldsValues;
              if (locationValues) {
                const location = {};
                for (const key of Object.keys(locationValues)) {
                  if (key === "latitude") {
                    location.latitude = parseFloat(locationValues[key]);
                  } else if (key === "longitude") {
                    location.longitude = parseFloat(locationValues[key]);
                  }
                }
                body.location = location;
              }
              const mergeFieldsValues = this.getNodeParameter("mergeFieldsUi", i).mergeFieldsValues;
              if (mergeFieldsValues) {
                const mergeFields = {};
                for (let index = 0; index < mergeFieldsValues.length; index++) {
                  mergeFields[mergeFieldsValues[index].name] = mergeFieldsValues[index].value;
                }
                body.merge_fields = mergeFields;
              }
              const groupsValues = this.getNodeParameter("groupsUi", i).groupsValues;
              if (groupsValues) {
                const groups = {};
                for (let index = 0; index < groupsValues.length; index++) {
                  groups[groupsValues[index].categoryFieldId] = groupsValues[index].value;
                }
                body.interests = groups;
              }
            } else {
              const locationJson = (0, import_GenericFunctions.validateJSON)(this.getNodeParameter("locationJson", i));
              const mergeFieldsJson = (0, import_GenericFunctions.validateJSON)(
                this.getNodeParameter("mergeFieldsJson", i)
              );
              const groupJson = (0, import_GenericFunctions.validateJSON)(this.getNodeParameter("groupJson", i));
              if (locationJson) {
                body.location = locationJson;
              }
              if (mergeFieldsJson) {
                body.merge_fields = mergeFieldsJson;
              }
              if (groupJson) {
                body.interests = groupJson;
              }
            }
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/lists/${listId}/members`,
              "POST",
              body
            );
          }
          if (operation === "delete") {
            const listId = this.getNodeParameter("list", i);
            const email = this.getNodeParameter("email", i);
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/lists/${listId}/members/${email}/actions/delete-permanent`,
              "POST"
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const listId = this.getNodeParameter("list", i);
            const email = this.getNodeParameter("email", i);
            const options = this.getNodeParameter("options", i);
            if (options.fields) {
              qs.fields = options.fields;
            }
            if (options.excludeFields) {
              qs.exclude_fields = options.excludeFields;
            }
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/lists/${listId}/members/${email}`,
              "GET",
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const listId = this.getNodeParameter("list", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.beforeLastChanged) {
              qs.before_last_changed = options.beforeLastChanged;
            }
            if (options.beforeTimestampOpt) {
              qs.before_timestamp_opt = options.beforeTimestampOpt;
            }
            if (options.emailType) {
              qs.email_type = options.emailType;
            }
            if (options.status) {
              qs.status = options.status;
            }
            if (options.sinceLastChanged) {
              qs.since_last_changed = options.sinceLastChanged;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.mailchimpApiRequestAllItems.call(
                this,
                `/lists/${listId}/members`,
                "GET",
                "members",
                {},
                qs
              );
            } else {
              qs.count = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.mailchimpApiRequest.call(
                this,
                `/lists/${listId}/members`,
                "GET",
                {},
                qs
              );
              responseData = responseData.members;
            }
          }
          if (operation === "update") {
            const listId = this.getNodeParameter("list", i);
            const email = this.getNodeParameter("email", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const jsonActive = this.getNodeParameter("jsonParameters", i);
            const body = {
              listId,
              email_address: email
            };
            if (updateFields.skipMergeValidation) {
              qs.skip_merge_validation = updateFields.skipMergeValidation;
            }
            if (updateFields.status) {
              body.status = updateFields.status;
            }
            if (updateFields.emailType) {
              body.email_type = updateFields.emailType;
            }
            if (updateFields.language) {
              body.language = updateFields.language;
            }
            if (updateFields.vip) {
              body.vip = updateFields.vip;
            }
            if (updateFields.ipSignup) {
              body.ip_signup = updateFields.ipSignup;
            }
            if (updateFields.ipOptIn) {
              body.ip_opt = updateFields.ipOptIn;
            }
            if (updateFields.timestampOpt) {
              body.timestamp_opt = (0, import_moment_timezone.default)(updateFields.timestampOpt).format(
                "YYYY-MM-DD HH:MM:SS"
              );
            }
            if (updateFields.timestampSignup) {
              body.timestamp_signup = (0, import_moment_timezone.default)(updateFields.timestampSignup).format(
                "YYYY-MM-DD HH:MM:SS"
              );
            }
            if (!jsonActive) {
              if (updateFields.locationFieldsUi) {
                const locationValues = updateFields.locationFieldsUi.locationFieldsValues;
                if (locationValues) {
                  const location = {};
                  for (const key of Object.keys(locationValues)) {
                    if (key === "latitude") {
                      location.latitude = parseFloat(locationValues[key]);
                    } else if (key === "longitude") {
                      location.longitude = parseFloat(locationValues[key]);
                    }
                  }
                  body.location = location;
                }
              }
              if (updateFields.mergeFieldsUi) {
                const mergeFieldsValues = updateFields.mergeFieldsUi.mergeFieldsValues;
                if (mergeFieldsValues) {
                  const mergeFields = {};
                  for (let index = 0; index < mergeFieldsValues.length; index++) {
                    mergeFields[mergeFieldsValues[index].name] = mergeFieldsValues[index].value;
                  }
                  body.merge_fields = mergeFields;
                }
              }
              if (updateFields.groupsUi) {
                const groupsValues = updateFields.groupsUi.groupsValues;
                if (groupsValues) {
                  const groups = {};
                  for (let index = 0; index < groupsValues.length; index++) {
                    groups[groupsValues[index].categoryFieldId] = groupsValues[index].value;
                  }
                  body.interests = groups;
                }
              }
            } else {
              const locationJson = (0, import_GenericFunctions.validateJSON)(this.getNodeParameter("locationJson", i));
              const mergeFieldsJson = (0, import_GenericFunctions.validateJSON)(
                this.getNodeParameter("mergeFieldsJson", i)
              );
              const groupJson = (0, import_GenericFunctions.validateJSON)(this.getNodeParameter("groupJson", i));
              if (locationJson) {
                body.location = locationJson;
              }
              if (mergeFieldsJson) {
                body.merge_fields = mergeFieldsJson;
              }
              if (groupJson) {
                body.interests = groupJson;
              }
            }
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/lists/${listId}/members/${email}`,
              "PUT",
              body
            );
          }
        }
        if (resource === "memberTag") {
          if (operation === "create") {
            const listId = this.getNodeParameter("list", i);
            const email = this.getNodeParameter("email", i);
            const tags = this.getNodeParameter("tags", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              tags: []
            };
            if (options.isSyncing) {
              body.is_syncing = options.isSyncing;
            }
            for (const tag of tags) {
              body.tags.push({
                name: tag,
                status: "active"
              });
            }
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/lists/${listId}/members/${email}/tags`,
              "POST",
              body
            );
            responseData = { success: true };
          }
          if (operation === "delete") {
            const listId = this.getNodeParameter("list", i);
            const email = this.getNodeParameter("email", i);
            const tags = this.getNodeParameter("tags", i);
            const options = this.getNodeParameter("options", i);
            const body = {
              tags: []
            };
            if (options.isSyncing) {
              body.is_syncing = options.isSyncing;
            }
            for (const tag of tags) {
              body.tags.push({
                name: tag,
                status: "inactive"
              });
            }
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/lists/${listId}/members/${email}/tags`,
              "POST",
              body
            );
            responseData = { success: true };
          }
        }
        if (resource === "campaign") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const options = this.getNodeParameter("options", i);
            if (options.status) {
              qs.status = options.status;
            }
            if (options.beforeCreateTime) {
              qs.before_create_time = options.beforeCreateTime;
            }
            if (options.beforeSendTime) {
              qs.before_send_time = options.beforeSendTime;
            }
            if (options.excludeFields) {
              qs.exclude_fields = options.exclude_fields.join(",");
            }
            if (options.fields) {
              qs.fields = options.fields.join(",");
              if (options.fields.includes("*")) {
                qs.fields = import_GenericFunctions.campaignFieldsMetadata.join(",");
              }
            } else {
              qs.fields = [
                "campaigns.id",
                "campaigns.status",
                "campaigns.tracking",
                "campaigns.settings.from_name",
                "campaigns.settings.title",
                "campaigns.settings.reply_to"
              ].join(",");
            }
            if (options.listId) {
              qs.list_id = options.listId;
            }
            if (options.sinceCreateTime) {
              qs.since_create_time = options.sinceCreateTime;
            }
            if (options.sinceSendTime) {
              qs.since_send_time = options.sinceSendTime;
            }
            if (options.sortDirection) {
              qs.sort_dir = options.sortDirection;
            }
            if (options.sortField) {
              qs.sort_field = options.sortField;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.mailchimpApiRequestAllItems.call(
                this,
                "/campaigns",
                "GET",
                "campaigns",
                {},
                qs
              );
            } else {
              qs.count = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.mailchimpApiRequest.call(this, "/campaigns", "GET", {}, qs);
              responseData = responseData.campaigns;
            }
          }
          if (operation === "send") {
            const campaignId = this.getNodeParameter("campaignId", i);
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/campaigns/${campaignId}/actions/send`,
              "POST",
              {}
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const campaignId = this.getNodeParameter("campaignId", i);
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/campaigns/${campaignId}`,
              "GET",
              {}
            );
          }
          if (operation === "delete") {
            const campaignId = this.getNodeParameter("campaignId", i);
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/campaigns/${campaignId}`,
              "DELETE",
              {}
            );
            responseData = { success: true };
          }
          if (operation === "replicate") {
            const campaignId = this.getNodeParameter("campaignId", i);
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/campaigns/${campaignId}/actions/replicate`,
              "POST",
              {}
            );
          }
          if (operation === "resend") {
            const campaignId = this.getNodeParameter("campaignId", i);
            responseData = await import_GenericFunctions.mailchimpApiRequest.call(
              this,
              `/campaigns/${campaignId}/actions/create-resend`,
              "POST",
              {}
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Mailchimp
});
//# sourceMappingURL=Mailchimp.node.js.map