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
var EventDescription_exports = {};
__export(EventDescription_exports, {
  eventFields: () => eventFields,
  eventOperations: () => eventOperations
});
module.exports = __toCommonJS(EventDescription_exports);
var import_common = require("./common.descriptions");
var import_utilities = require("../../../utils/utilities");
const searchDisplayOptions = {
  show: {
    resource: ["event"],
    operation: ["search"]
  }
};
const searchDescription = (0, import_utilities.updateDisplayOptions)(searchDisplayOptions, import_common.searchProperties);
const eventOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    displayOptions: {
      show: {
        resource: ["event"]
      }
    },
    noDataExpression: true,
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create an event"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete an event"
      },
      {
        name: "Get",
        value: "get",
        action: "Get an event"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many events"
      },
      {
        name: "Publish",
        value: "publish",
        action: "Publish an event"
      },
      {
        name: "Search",
        value: "search",
        action: "Get a filtered list of events"
      },
      {
        name: "Unpublish",
        value: "unpublish",
        action: "Unpublish an event"
      },
      {
        name: "Update",
        value: "update",
        action: "Update an event"
      }
    ],
    default: "create"
  }
];
const eventFields = [
  // ----------------------------------------
  //              event: create
  // ----------------------------------------
  {
    displayName: "Organization Name or ID",
    name: "org_id",
    type: "options",
    default: "",
    required: true,
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getOrgs"
    },
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Information",
    name: "information",
    type: "string",
    default: "",
    required: true,
    description: "Information on the event - max 65535 characters",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["create"]
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
        resource: ["event"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Analysis",
        name: "analysis",
        type: "options",
        default: 0,
        description: "Analysis maturity level of the event",
        options: [
          {
            name: "Initial",
            value: 0
          },
          {
            name: "Ongoing",
            value: 1
          },
          {
            name: "Complete",
            value: 2
          }
        ]
      },
      {
        displayName: "Distribution",
        name: "distribution",
        type: "options",
        default: 0,
        description: "Who will be able to see this event once published",
        options: [
          {
            name: "All Communities",
            value: 3
          },
          {
            name: "Connected Communities",
            value: 2
          },
          {
            name: "Inherit Event",
            value: 5
          },
          {
            name: "Sharing Group",
            value: 4
          },
          {
            name: "This Community Only",
            value: 1
          },
          {
            name: "Your Organization Only",
            value: 0
          }
        ]
      },
      {
        displayName: "Sharing Group Name or ID",
        name: "sharing_group_id",
        type: "options",
        default: "",
        description: 'Use only for when <code>Sharing Group</code> is selected in <code>Distribution</code>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: "getSharingGroups"
        }
      },
      {
        displayName: "Threat Level ID",
        name: "threat_level_id",
        type: "options",
        default: 1,
        options: [
          {
            name: "High",
            value: 1
          },
          {
            name: "Medium",
            value: 2
          },
          {
            name: "Low",
            value: 3
          },
          {
            name: "Undefined",
            value: 4
          }
        ]
      }
    ]
  },
  // ----------------------------------------
  //              event: delete
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "UUID or numeric ID of the event",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                event: get
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "UUID or numeric ID of the event",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //              event: publish
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "UUID or numeric ID of the event",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["publish"]
      }
    }
  },
  // ----------------------------------------
  //             event: unpublish
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "UUID or numeric ID of the event",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
        operation: ["unpublish"]
      }
    }
  },
  // ----------------------------------------
  //              event: search
  // ----------------------------------------
  ...searchDescription,
  // ----------------------------------------
  //              event: update
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "UUID or numeric ID of the event",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["event"],
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
        resource: ["event"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Analysis",
        name: "analysis",
        type: "options",
        default: 0,
        description: "Analysis maturity level of the event",
        options: [
          {
            name: "Initial",
            value: 0
          },
          {
            name: "Ongoing",
            value: 1
          },
          {
            name: "Complete",
            value: 2
          }
        ]
      },
      {
        displayName: "Distribution",
        name: "distribution",
        type: "options",
        default: 0,
        description: "Who will be able to see this event once published",
        options: [
          {
            name: "All Communities",
            value: 3
          },
          {
            name: "Connected Communities",
            value: 2
          },
          {
            name: "Inherit Event",
            value: 5
          },
          {
            name: "Sharing Group",
            value: 4
          },
          {
            name: "This Community Only",
            value: 1
          },
          {
            name: "Your Organization Only",
            value: 0
          }
        ]
      },
      {
        displayName: "Information",
        name: "information",
        type: "string",
        default: "",
        description: "Information on the event - max 65535 characters"
      },
      {
        displayName: "Sharing Group Name or ID",
        name: "sharing_group_id",
        type: "options",
        default: "",
        // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Use only for when <code>Sharing Group</code> is selected in <code>Distribution</code>.',
        typeOptions: {
          loadOptionsMethod: "getSharingGroups"
        }
      },
      {
        displayName: "Threat Level ID",
        name: "threat_level_id",
        type: "options",
        default: 1,
        options: [
          {
            name: "High",
            value: 1
          },
          {
            name: "Medium",
            value: 2
          },
          {
            name: "Low",
            value: 3
          },
          {
            name: "Undefined",
            value: 4
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eventFields,
  eventOperations
});
//# sourceMappingURL=EventDescription.js.map