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
var WorkerDescription_exports = {};
__export(WorkerDescription_exports, {
  workerFields: () => workerFields,
  workerOperations: () => workerOperations
});
module.exports = __toCommonJS(WorkerDescription_exports);
const workerOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["worker"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new Onfleet worker",
        action: "Create a worker"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an Onfleet worker",
        action: "Delete a worker"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a specific Onfleet worker",
        action: "Get a worker"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many Onfleet workers",
        action: "Get many workers"
      },
      {
        name: "Get Schedule",
        value: "getSchedule",
        description: "Get a specific Onfleet worker schedule",
        action: "Get the schedule for a worker"
      },
      // {
      // 	name: 'Set Worker\'s Schedule',
      // 	value: 'setSchedule',
      // 	description: 'Set the worker\'s schedule',
      // },
      {
        name: "Update",
        value: "update",
        description: "Update an Onfleet worker",
        action: "Update a worker"
      }
    ],
    default: "get"
  }
];
const byLocationField = {
  displayName: "Search by Location",
  name: "byLocation",
  type: "boolean",
  default: false,
  description: "Whether to search for only those workers who are currently within a certain target area"
};
const nameField = {
  displayName: "Name",
  name: "name",
  type: "string",
  default: "",
  description: "The worker's name"
};
const phoneField = {
  displayName: "Phone",
  name: "phone",
  type: "string",
  default: "",
  description: "A list of worker\u2019s phone numbers"
};
const capacityField = {
  displayName: "Capacity",
  name: "capacity",
  type: "number",
  default: 0,
  description: "The maximum number of units this worker can carry, for route optimization purposes"
};
const displayNameField = {
  displayName: "Display Name",
  name: "displayName",
  type: "string",
  default: "",
  description: "This value is used in place of the worker's actual name within sms notifications, delivery tracking pages, and across organization boundaries"
};
const vehicleTypeField = {
  displayName: "Type",
  name: "type",
  type: "options",
  options: [
    {
      name: "Bicycle",
      value: "BICYCLE"
    },
    {
      name: "Car",
      value: "CAR"
    },
    {
      name: "Motorcycle",
      value: "MOTORCYCLE"
    },
    {
      name: "Truck",
      value: "TRUCK"
    }
  ],
  default: "",
  description: "Whether the worker has vehicle or not. If it's not provided, this worker will be treated as if on foot."
};
const vehicleDescriptionField = {
  displayName: "Description",
  name: "description",
  type: "string",
  default: "",
  description: "The vehicle's make, model, year, or any other relevant identifying details"
};
const vehicleLicensePlateField = {
  displayName: "License Plate",
  name: "licensePlate",
  type: "string",
  default: "",
  description: "The vehicle's license plate number"
};
const vehicleColorField = {
  displayName: "Color",
  name: "color",
  // eslint-disable-next-line n8n-nodes-base/node-param-color-type-unused
  type: "string",
  default: "",
  description: "The vehicle's color"
};
const teamsField = {
  displayName: "Team Names or IDs",
  name: "teams",
  type: "multiOptions",
  typeOptions: {
    loadOptionsMethod: "getTeams"
  },
  default: [],
  description: 'One or more teams of which the worker is a member. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
};
const teamsFilterField = {
  displayName: "Team Names or IDs",
  name: "teams",
  type: "multiOptions",
  typeOptions: {
    loadOptionsMethod: "getTeams"
  },
  default: [],
  description: 'A list of the teams that workers must be part of. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
};
const statesFilterField = {
  displayName: "States",
  name: "states",
  type: "multiOptions",
  options: [
    {
      name: "Active (On-Duty, Active Task)",
      value: 2
    },
    {
      name: "Idle (On-Duty, No Active Task)",
      value: 1
    },
    {
      name: "Off-Duty",
      value: 0
    }
  ],
  default: [],
  description: "List of worker states"
};
const phonesFilterField = {
  displayName: "Phones",
  name: "phones",
  type: "string",
  typeOptions: {
    multipleValues: true,
    multipleValueButtonText: "Add Phone"
  },
  default: [],
  description: "A list of workers' phone numbers"
};
const filterField = {
  displayName: "Fields to Return",
  name: "filter",
  type: "multiOptions",
  options: [
    {
      name: "Account Status",
      value: "accountStatus"
    },
    {
      name: "Active Task",
      value: "activeTask"
    },
    {
      name: "Capacity",
      value: "capacity"
    },
    {
      name: "Delay Time",
      value: "delayTime"
    },
    {
      name: "Display Name",
      value: "displayName"
    },
    {
      name: "Image Url",
      value: "imageUrl"
    },
    {
      name: "Location",
      value: "location"
    },
    {
      name: "Metadata",
      value: "metadata"
    },
    {
      name: "Name",
      value: "name"
    },
    {
      name: "On Duty",
      value: "onDuty"
    },
    {
      name: "Organization",
      value: "organization"
    },
    {
      name: "Phone",
      value: "phone"
    },
    {
      name: "Tasks",
      value: "tasks"
    },
    {
      name: "Teams",
      value: "teams"
    },
    {
      name: "Time Created",
      value: "timeCreated"
    },
    {
      name: "Time Last Modified",
      value: "timeLastModified"
    },
    {
      name: "Time Last Seen",
      value: "timeLastSeen"
    },
    {
      name: "User Data",
      value: "userData"
    },
    {
      name: "Vehicle",
      value: "vehicle"
    },
    {
      name: "Worker ID",
      value: "id"
    }
  ],
  default: [],
  description: "A list of fields to show in the response, if all are not desired"
};
const longitudeFilterField = {
  displayName: "Longitude",
  name: "longitude",
  type: "number",
  typeOptions: {
    numberPrecision: 14
  },
  default: 0,
  description: "The longitude component of the coordinate pair"
};
const latitudeFilterField = {
  displayName: "Latitude",
  name: "latitude",
  type: "number",
  typeOptions: {
    numberPrecision: 14
  },
  default: 0,
  description: "The latitude component of the coordinate pair"
};
const radiusFilterField = {
  displayName: "Radius",
  name: "radius",
  type: "number",
  typeOptions: {
    maxValue: 1e4,
    minValue: 0
  },
  default: 1e3,
  description: "The length in meters of the radius of the spherical area in which to look for workers. Defaults to 1000 if missing. Maximum value is 10000."
};
const scheduleDateField = {
  displayName: "Date",
  name: "date",
  type: "dateTime",
  default: "",
  description: "Schedule's date"
};
const scheduleTimezoneField = {
  displayName: "Timezone Name or ID",
  name: "timezone",
  type: "options",
  typeOptions: {
    loadOptionsMethod: "getTimezones"
  },
  default: "",
  description: 'A valid timezone. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
};
const scheduleStartField = {
  displayName: "Start",
  name: "start",
  type: "dateTime",
  default: "",
  description: "Start time"
};
const scheduleEndField = {
  displayName: "End",
  name: "end",
  type: "dateTime",
  default: "",
  description: "End time"
};
const workerFields = [
  {
    ...byLocationField,
    required: true,
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Worker ID",
    name: "id",
    type: "string",
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["get", "getSchedule", "setSchedule", "update", "delete"]
      }
    },
    default: "",
    required: true,
    description: "The ID of the worker object for lookup"
  },
  {
    ...nameField,
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    ...phoneField,
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    ...teamsField,
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    ...longitudeFilterField,
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["getAll"],
        byLocation: [true]
      }
    },
    required: true
  },
  {
    ...latitudeFilterField,
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["getAll"],
        byLocation: [true]
      }
    },
    required: true
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["worker"],
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
        resource: ["worker"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 64
    },
    default: 64,
    description: "Max number of results to return"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["create"]
      }
    },
    options: [
      capacityField,
      displayNameField,
      {
        displayName: "Vehicle",
        name: "vehicle",
        type: "fixedCollection",
        placeholder: "Add Vehicle",
        default: {},
        options: [
          {
            displayName: "Vehicle Properties",
            name: "vehicleProperties",
            values: [
              {
                ...vehicleTypeField,
                required: true
              },
              {
                ...vehicleDescriptionField,
                required: false
              },
              {
                ...vehicleLicensePlateField,
                required: false
              },
              {
                ...vehicleColorField,
                required: false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["update"]
      }
    },
    options: [capacityField, displayNameField, nameField, teamsField]
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["getAll"],
        byLocation: [true]
      }
    },
    options: [radiusFilterField]
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["getAll"],
        byLocation: [false]
      }
    },
    options: [statesFilterField, teamsFilterField, phonesFilterField]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["getAll"]
      }
    },
    options: [filterField]
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["get"]
      }
    },
    options: [
      {
        displayName: "Analytics",
        name: "analytics",
        type: "boolean",
        default: true,
        description: "Whether a more detailed response is needed, includes basic worker duty event, traveled distance (meters) and time analytics"
      },
      {
        ...filterField,
        required: false
      }
    ]
  },
  {
    displayName: "Schedule",
    name: "schedule",
    type: "fixedCollection",
    placeholder: "Add Schedule",
    displayOptions: {
      show: {
        resource: ["worker"],
        operation: ["setSchedule"]
      }
    },
    default: {},
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: "Add Schedule"
    },
    options: [
      {
        displayName: "Schedule Properties",
        name: "scheduleProperties",
        default: {},
        values: [
          {
            ...scheduleDateField,
            required: true
          },
          {
            ...scheduleTimezoneField,
            required: true
          },
          {
            displayName: "Shifts",
            name: "shifts",
            type: "fixedCollection",
            default: {},
            placeholder: "Add Shift",
            typeOptions: {
              multipleValues: true
            },
            options: [
              {
                displayName: "Shifts Properties",
                name: "shiftsProperties",
                default: {},
                values: [
                  {
                    ...scheduleStartField,
                    required: true
                  },
                  {
                    ...scheduleEndField,
                    required: true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  workerFields,
  workerOperations
});
//# sourceMappingURL=WorkerDescription.js.map