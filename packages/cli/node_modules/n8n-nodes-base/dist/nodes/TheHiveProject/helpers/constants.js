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
var constants_exports = {};
__export(constants_exports, {
  alertCommonFields: () => alertCommonFields,
  caseCommonFields: () => caseCommonFields,
  observableCommonFields: () => observableCommonFields,
  taskCommonFields: () => taskCommonFields
});
module.exports = __toCommonJS(constants_exports);
var import_interfaces = require("./interfaces");
const alertCommonFields = [
  {
    displayName: "Title",
    id: "title",
    type: "string",
    removed: false
  },
  {
    displayName: "Description",
    id: "description",
    type: "string",
    removed: false
  },
  {
    displayName: "Type",
    id: "type",
    type: "string",
    removed: false
  },
  {
    displayName: "Source",
    id: "source",
    type: "string",
    removed: false
  },
  {
    displayName: "Source Reference",
    id: "sourceRef",
    type: "string",
    removed: false
  },
  {
    displayName: "External Link",
    id: "externalLink",
    type: "string",
    removed: true
  },
  {
    displayName: "Severity (Severity of information)",
    id: "severity",
    type: "options",
    options: [
      {
        name: "Low",
        value: 1
      },
      {
        name: "Medium",
        value: 2
      },
      {
        name: "High",
        value: 3
      },
      {
        name: "Critical",
        value: 4
      }
    ],
    removed: true
  },
  {
    displayName: "Date",
    id: "date",
    type: "dateTime",
    removed: true
  },
  {
    displayName: "Last Sync Date",
    id: "lastSyncDate",
    type: "dateTime",
    removed: true
  },
  {
    displayName: "Tags",
    id: "tags",
    type: "string",
    removed: true
  },
  {
    displayName: "Follow",
    id: "follow",
    type: "boolean",
    removed: true
  },
  {
    displayName: "Flag",
    id: "flag",
    type: "boolean",
    removed: true
  },
  {
    displayName: "TLP (Confidentiality of information)",
    id: "tlp",
    type: "options",
    options: [
      {
        name: "White",
        value: import_interfaces.TLPs.white
      },
      {
        name: "Green",
        value: import_interfaces.TLPs.green
      },
      {
        name: "Amber",
        value: import_interfaces.TLPs.amber
      },
      {
        name: "Red",
        value: import_interfaces.TLPs.red
      }
    ],
    removed: true
  },
  {
    displayName: "PAP (Level of exposure of information)",
    id: "pap",
    type: "options",
    options: [
      {
        name: "White",
        value: import_interfaces.TLPs.white
      },
      {
        name: "Green",
        value: import_interfaces.TLPs.green
      },
      {
        name: "Amber",
        value: import_interfaces.TLPs.amber
      },
      {
        name: "Red",
        value: import_interfaces.TLPs.red
      }
    ],
    removed: true
  },
  {
    displayName: "Summary",
    id: "summary",
    type: "string",
    removed: true
  },
  {
    displayName: "Status",
    id: "status",
    type: "options",
    removed: true
  },
  {
    displayName: "Case Template",
    id: "caseTemplate",
    type: "options",
    removed: true
  },
  {
    displayName: "Add Tags",
    id: "addTags",
    type: "string",
    canBeUsedToMatch: false,
    removed: true
  },
  {
    displayName: "Remove Tags",
    id: "removeTags",
    type: "string",
    canBeUsedToMatch: false,
    removed: true
  }
];
const caseCommonFields = [
  {
    displayName: "Title",
    id: "title",
    type: "string",
    removed: false
  },
  {
    displayName: "Description",
    id: "description",
    type: "string",
    removed: false
  },
  {
    displayName: "Severity (Severity of information)",
    id: "severity",
    type: "options",
    options: [
      {
        name: "Low",
        value: 1
      },
      {
        name: "Medium",
        value: 2
      },
      {
        name: "High",
        value: 3
      },
      {
        name: "Critical",
        value: 4
      }
    ],
    removed: false
  },
  {
    displayName: "Start Date",
    id: "startDate",
    type: "dateTime",
    removed: false
  },
  {
    displayName: "End Date",
    id: "endDate",
    type: "dateTime",
    removed: true
  },
  {
    displayName: "Tags",
    id: "tags",
    type: "string",
    removed: false
  },
  {
    displayName: "Flag",
    id: "flag",
    type: "boolean",
    removed: true
  },
  {
    displayName: "TLP (Confidentiality of information)",
    id: "tlp",
    type: "options",
    options: [
      {
        name: "White",
        value: import_interfaces.TLPs.white
      },
      {
        name: "Green",
        value: import_interfaces.TLPs.green
      },
      {
        name: "Amber",
        value: import_interfaces.TLPs.amber
      },
      {
        name: "Red",
        value: import_interfaces.TLPs.red
      }
    ],
    removed: false
  },
  {
    displayName: "PAP (Level of exposure of information)",
    id: "pap",
    type: "options",
    options: [
      {
        name: "White",
        value: import_interfaces.TLPs.white
      },
      {
        name: "Green",
        value: import_interfaces.TLPs.green
      },
      {
        name: "Amber",
        value: import_interfaces.TLPs.amber
      },
      {
        name: "Red",
        value: import_interfaces.TLPs.red
      }
    ],
    removed: false
  },
  {
    displayName: "Summary",
    id: "summary",
    type: "string",
    removed: true
  },
  {
    displayName: "Status",
    id: "status",
    type: "options",
    removed: true
  },
  {
    displayName: "Assignee",
    id: "assignee",
    type: "options",
    removed: true
  },
  {
    displayName: "Case Template",
    id: "caseTemplate",
    type: "options",
    removed: true
  },
  {
    displayName: "Tasks",
    id: "tasks",
    type: "array",
    removed: true
  },
  {
    displayName: "Sharing Parameters",
    id: "sharingParameters",
    type: "array",
    removed: true
  },
  {
    displayName: "Impact Status",
    id: "impactStatus",
    type: "string",
    removed: true
  },
  {
    displayName: "Task Rule",
    id: "taskRule",
    type: "string",
    removed: true
  },
  {
    displayName: "Observable Rule",
    id: "observableRule",
    type: "string",
    removed: true
  },
  {
    displayName: "Add Tags",
    id: "addTags",
    type: "string",
    removed: true
  },
  {
    displayName: "Remove Tags",
    id: "removeTags",
    type: "string",
    removed: true
  }
];
const taskCommonFields = [
  {
    displayName: "Title",
    id: "title",
    type: "string",
    removed: false
  },
  {
    displayName: "Description",
    id: "description",
    type: "string",
    removed: false
  },
  {
    displayName: "Group",
    id: "group",
    type: "string",
    removed: false
  },
  {
    displayName: "Status",
    id: "status",
    type: "stirng",
    removed: true
  },
  {
    displayName: "Flag",
    id: "flag",
    type: "boolean",
    removed: false
  },
  {
    displayName: "Start Date",
    id: "startDate",
    type: "dateTime",
    removed: true
  },
  {
    displayName: "Due Date",
    id: "dueDate",
    type: "dateTime",
    removed: false
  },
  {
    displayName: "End Date",
    id: "endDate",
    type: "dateTime",
    removed: true
  },
  {
    displayName: "Assignee",
    id: "assignee",
    type: "options",
    removed: false
  },
  {
    displayName: "Mandatory",
    id: "mandatory",
    type: "boolean",
    removed: false
  },
  {
    displayName: "Order",
    id: "order",
    type: "number",
    removed: true
  }
];
const observableCommonFields = [
  {
    displayName: "Data Type",
    id: "dataType",
    type: "options",
    removed: false
  },
  {
    displayName: "Start Date",
    id: "startDate",
    type: "dateTime",
    removed: true
  },
  {
    displayName: "Description",
    id: "message",
    type: "string",
    removed: false
  },
  {
    displayName: "Tags",
    id: "tags",
    type: "string",
    removed: false
  },
  {
    displayName: "TLP (Confidentiality of information)",
    id: "tlp",
    type: "options",
    options: [
      {
        name: "White",
        value: import_interfaces.TLPs.white
      },
      {
        name: "Green",
        value: import_interfaces.TLPs.green
      },
      {
        name: "Amber",
        value: import_interfaces.TLPs.amber
      },
      {
        name: "Red",
        value: import_interfaces.TLPs.red
      }
    ],
    removed: false
  },
  {
    displayName: "PAP (Level of exposure of information)",
    id: "pap",
    type: "options",
    options: [
      {
        name: "White",
        value: import_interfaces.TLPs.white
      },
      {
        name: "Green",
        value: import_interfaces.TLPs.green
      },
      {
        name: "Amber",
        value: import_interfaces.TLPs.amber
      },
      {
        name: "Red",
        value: import_interfaces.TLPs.red
      }
    ],
    removed: false
  },
  {
    displayName: "IOC",
    id: "ioc",
    type: "boolean",
    removed: false
  },
  {
    displayName: "Sighted",
    id: "sighted",
    type: "boolean",
    removed: false
  },
  {
    displayName: "Sighted At",
    id: "sightedAt",
    type: "dateTime",
    removed: true
  },
  {
    displayName: "Ignore Similarity",
    id: "ignoreSimilarity",
    type: "boolean",
    removed: false
  },
  {
    displayName: "Is Zip",
    id: "isZip",
    type: "boolean",
    removed: true
  },
  {
    displayName: "Zip Password",
    id: "zipPassword",
    type: "string",
    removed: true
  },
  {
    displayName: "Add Tags",
    id: "addTags",
    type: "string",
    removed: true
  },
  {
    displayName: "Remove Tags",
    id: "removeTags",
    type: "string",
    removed: true
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alertCommonFields,
  caseCommonFields,
  observableCommonFields,
  taskCommonFields
});
//# sourceMappingURL=constants.js.map