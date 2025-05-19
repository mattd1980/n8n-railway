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
var AttendanceDescription_exports = {};
__export(AttendanceDescription_exports, {
  attendanceFields: () => attendanceFields,
  attendanceOperations: () => attendanceOperations
});
module.exports = __toCommonJS(AttendanceDescription_exports);
var import_SharedFields = require("./SharedFields");
const attendanceOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["attendance"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create an attendance"
      },
      {
        name: "Get",
        value: "get",
        action: "Get an attendance"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many attendances"
      }
    ],
    default: "create"
  }
];
const attendanceFields = [
  // ----------------------------------------
  //            attendance: create
  // ----------------------------------------
  {
    displayName: "Person ID",
    name: "personId",
    description: "ID of the person to create an attendance for",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["attendance"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Event ID",
    name: "eventId",
    description: "ID of the event to create an attendance for",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["attendance"],
        operation: ["create"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("attendance", "create"),
  // ----------------------------------------
  //             attendance: get
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "ID of the event whose attendance to retrieve",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["attendance"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Attendance ID",
    name: "attendanceId",
    description: "ID of the attendance to retrieve",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["attendance"],
        operation: ["get"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("attendance", "get"),
  // ----------------------------------------
  //            attendance: getAll
  // ----------------------------------------
  {
    displayName: "Event ID",
    name: "eventId",
    description: "ID of the event to create an attendance for",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["attendance"],
        operation: ["getAll"]
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
        resource: ["attendance"],
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
        resource: ["attendance"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("attendance", "getAll")
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attendanceFields,
  attendanceOperations
});
//# sourceMappingURL=AttendanceDescription.js.map