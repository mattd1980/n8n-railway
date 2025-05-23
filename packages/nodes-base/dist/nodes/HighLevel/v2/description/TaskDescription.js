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
var TaskDescription_exports = {};
__export(TaskDescription_exports, {
  taskFields: () => taskFields,
  taskOperations: () => taskOperations
});
module.exports = __toCommonJS(TaskDescription_exports);
var import_GenericFunctions = require("../GenericFunctions");
const taskOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["task"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        routing: {
          request: {
            method: "POST",
            url: "=/contacts/{{$parameter.contactId}}/tasks/"
          },
          output: {
            postReceive: [import_GenericFunctions.taskPostReceiceAction]
          }
        },
        action: "Create a task"
      },
      {
        name: "Delete",
        value: "delete",
        routing: {
          request: {
            method: "DELETE",
            url: "=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}/"
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
        action: "Delete a task"
      },
      {
        name: "Get",
        value: "get",
        routing: {
          request: {
            method: "GET",
            url: "=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}/"
          },
          output: {
            postReceive: [import_GenericFunctions.taskPostReceiceAction]
          }
        },
        action: "Get a task"
      },
      {
        name: "Get Many",
        value: "getAll",
        routing: {
          request: {
            method: "GET",
            url: "=/contacts/{{$parameter.contactId}}/tasks/"
          },
          output: {
            postReceive: [
              {
                type: "rootProperty",
                properties: {
                  property: "tasks"
                }
              },
              import_GenericFunctions.taskPostReceiceAction
            ]
          }
        },
        action: "Get many tasks"
      },
      {
        name: "Update",
        value: "update",
        routing: {
          request: {
            method: "PUT",
            url: "=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}/"
          },
          send: {
            preSend: [import_GenericFunctions.taskUpdatePreSendAction]
          },
          output: {
            postReceive: [import_GenericFunctions.taskPostReceiceAction]
          }
        },
        action: "Update a task"
      }
    ],
    default: "create"
  }
];
const createProperties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Contact Email or ID",
    name: "contactId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getContacts"
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"]
      }
    },
    default: "",
    required: true,
    description: 'Contact the task belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Title",
    name: "title",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"]
      }
    },
    routing: {
      send: {
        type: "body",
        property: "title"
      }
    }
  },
  {
    displayName: "Due Date",
    name: "dueDate",
    type: "dateTime",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"]
      }
    },
    routing: {
      send: {
        type: "body",
        property: "dueDate",
        preSend: [import_GenericFunctions.dueDatePreSendAction]
      }
    }
  },
  {
    displayName: "Completed",
    name: "completed",
    type: "boolean",
    required: true,
    default: false,
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"]
      }
    },
    routing: {
      send: {
        type: "body",
        property: "completed"
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["create"]
      }
    },
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
        displayName: "Assigned To",
        name: "assignedTo",
        type: "options",
        default: "",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getUsers"
        },
        routing: {
          send: {
            type: "body",
            property: "assignedTo"
          }
        }
      },
      {
        displayName: "Body",
        name: "body",
        type: "string",
        default: "",
        routing: {
          send: {
            type: "body",
            property: "body"
          }
        }
      }
    ]
  }
];
const deleteProperties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Contact Email or ID",
    name: "contactId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getContacts"
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["delete"]
      }
    },
    default: "",
    required: true,
    description: 'Contact the task belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["delete"]
      }
    },
    default: ""
  }
];
const getProperties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Contact Email or ID",
    name: "contactId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getContacts"
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["get"]
      }
    },
    default: "",
    required: true,
    description: 'Contact the task belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["get"]
      }
    },
    default: ""
  }
];
const getAllProperties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Contact Email or ID",
    name: "contactId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getContacts"
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["getAll"]
      }
    },
    default: "",
    required: true,
    description: 'Contact the task belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["task"],
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
        resource: ["task"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 20,
    routing: {
      send: {
        type: "query",
        property: "limit"
      }
    },
    description: "Max number of results to return"
  }
];
const updateProperties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Contact Email or ID",
    name: "contactId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getContacts"
    },
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["update"]
      }
    },
    default: "",
    required: true,
    description: 'Contact the task belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["update"]
      }
    },
    default: "",
    required: true
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["task"],
        operation: ["update"]
      }
    },
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
        displayName: "Assigned To",
        name: "assignedTo",
        type: "options",
        default: "",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getUsers"
        },
        routing: {
          send: {
            type: "body",
            property: "assignedTo"
          }
        }
      },
      {
        displayName: "Completed",
        name: "completed",
        type: "boolean",
        default: false,
        routing: {
          send: {
            type: "body",
            property: "completed"
          }
        }
      },
      {
        displayName: "Body",
        name: "body",
        type: "string",
        default: "",
        routing: {
          send: {
            type: "body",
            property: "body"
          }
        }
      },
      {
        displayName: "Due Date",
        name: "dueDate",
        type: "dateTime",
        default: "",
        routing: {
          send: {
            type: "body",
            property: "dueDate",
            preSend: [import_GenericFunctions.dueDatePreSendAction]
          }
        }
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        routing: {
          send: {
            type: "body",
            property: "title"
          }
        }
      }
    ]
  }
];
const taskFields = [
  ...createProperties,
  ...updateProperties,
  ...deleteProperties,
  ...getProperties,
  ...getAllProperties
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskFields,
  taskOperations
});
//# sourceMappingURL=TaskDescription.js.map