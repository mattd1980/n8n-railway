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
var DateTimeV1_node_exports = {};
__export(DateTimeV1_node_exports, {
  DateTimeV1: () => DateTimeV1
});
module.exports = __toCommonJS(DateTimeV1_node_exports);
var import_set = __toESM(require("lodash/set"));
var import_luxon = require("luxon");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
function parseDateByFormat(value, fromFormat) {
  const date = (0, import_moment_timezone.default)(value, fromFormat, true);
  if ((0, import_moment_timezone.default)(date).isValid()) return date;
  throw new import_n8n_workflow.NodeOperationError(
    this.getNode(),
    'Date input cannot be parsed. Please recheck the value and the "From Format" field.'
  );
}
function getIsoValue(value) {
  try {
    return new Date(value).toISOString();
  } catch (error) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      'Unrecognized date input. Please specify a format in the "From Format" field.'
    );
  }
}
function parseDateByDefault(value) {
  const isoValue = getIsoValue.call(this, value);
  if ((0, import_moment_timezone.default)(isoValue).isValid()) return (0, import_moment_timezone.default)(isoValue);
  throw new import_n8n_workflow.NodeOperationError(
    this.getNode(),
    'Unrecognized date input. Please specify a format in the "From Format" field.'
  );
}
const versionDescription = {
  displayName: "Date & Time",
  name: "dateTime",
  icon: "fa:clock",
  group: ["transform"],
  version: 1,
  description: "Allows you to manipulate date and time values",
  subtitle: '={{$parameter["action"]}}',
  defaults: {
    name: "Date & Time",
    color: "#408000"
  },
  inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  properties: [
    {
      displayName: "More powerful date functionality is available in <a href='https://docs.n8n.io/code/cookbook/luxon/' target='_blank'>expressions</a>,</br> e.g. <code>{{ $now.plus(1, 'week') }}</code>",
      name: "noticeDateTime",
      type: "notice",
      default: ""
    },
    {
      displayName: "Action",
      name: "action",
      type: "options",
      options: [
        {
          name: "Calculate a Date",
          description: "Add or subtract time from a date",
          value: "calculate",
          action: "Add or subtract time from a date"
        },
        {
          name: "Format a Date",
          description: "Convert a date to a different format",
          value: "format",
          action: "Convert a date to a different format"
        }
      ],
      default: "format"
    },
    {
      displayName: "Value",
      name: "value",
      displayOptions: {
        show: {
          action: ["format"]
        }
      },
      type: "string",
      default: "",
      description: "The value that should be converted",
      required: true
    },
    {
      displayName: "Property Name",
      name: "dataPropertyName",
      type: "string",
      default: "data",
      required: true,
      displayOptions: {
        show: {
          action: ["format"]
        }
      },
      description: "Name of the property to which to write the converted date"
    },
    {
      displayName: "Custom Format",
      name: "custom",
      displayOptions: {
        show: {
          action: ["format"]
        }
      },
      type: "boolean",
      default: false,
      description: "Whether a predefined format should be selected or custom format entered"
    },
    {
      displayName: "To Format",
      name: "toFormat",
      displayOptions: {
        show: {
          action: ["format"],
          custom: [true]
        }
      },
      type: "string",
      default: "",
      placeholder: "YYYY-MM-DD",
      description: "The format to convert the date to"
    },
    {
      displayName: "To Format",
      name: "toFormat",
      type: "options",
      displayOptions: {
        show: {
          action: ["format"],
          custom: [false]
        }
      },
      // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
      options: [
        {
          name: "MM/DD/YYYY",
          value: "MM/DD/YYYY",
          description: "Example: 09/04/1986"
        },
        {
          name: "YYYY/MM/DD",
          value: "YYYY/MM/DD",
          description: "Example: 1986/04/09"
        },
        {
          name: "MMMM DD YYYY",
          value: "MMMM DD YYYY",
          description: "Example: April 09 1986"
        },
        {
          name: "MM-DD-YYYY",
          value: "MM-DD-YYYY",
          description: "Example: 09-04-1986"
        },
        {
          name: "YYYY-MM-DD",
          value: "YYYY-MM-DD",
          description: "Example: 1986-04-09"
        },
        {
          name: "Unix Timestamp",
          value: "X",
          description: "Example: 513388800.879"
        },
        {
          name: "Unix Ms Timestamp",
          value: "x",
          description: "Example: 513388800"
        }
      ],
      default: "MM/DD/YYYY",
      description: "The format to convert the date to"
    },
    {
      displayName: "Options",
      name: "options",
      displayOptions: {
        show: {
          action: ["format"]
        }
      },
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        {
          displayName: "From Format",
          name: "fromFormat",
          type: "string",
          default: "",
          description: "In case the input format is not recognized you can provide the format"
        },
        {
          displayName: "From Timezone Name or ID",
          name: "fromTimezone",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getTimezones"
          },
          default: "UTC",
          description: 'The timezone to convert from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "To Timezone Name or ID",
          name: "toTimezone",
          type: "options",
          typeOptions: {
            loadOptionsMethod: "getTimezones"
          },
          default: "UTC",
          description: 'The timezone to convert to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        }
      ]
    },
    {
      displayName: "Date Value",
      name: "value",
      displayOptions: {
        show: {
          action: ["calculate"]
        }
      },
      type: "string",
      default: "",
      description: "The date string or timestamp from which you want to add/subtract time",
      required: true
    },
    {
      displayName: "Operation",
      name: "operation",
      displayOptions: {
        show: {
          action: ["calculate"]
        }
      },
      type: "options",
      noDataExpression: true,
      options: [
        {
          name: "Add",
          value: "add",
          description: "Add time to Date Value",
          action: "Add time to Date Value"
        },
        {
          name: "Subtract",
          value: "subtract",
          description: "Subtract time from Date Value",
          action: "Subtract time from Date Value"
        }
      ],
      default: "add",
      required: true
    },
    {
      displayName: "Duration",
      name: "duration",
      displayOptions: {
        show: {
          action: ["calculate"]
        }
      },
      type: "number",
      typeOptions: {
        minValue: 0
      },
      default: 0,
      required: true,
      description: "E.g. enter \u201C10\u201D then select \u201CDays\u201D if you want to add 10 days to Date Value."
    },
    {
      displayName: "Time Unit",
      name: "timeUnit",
      description: "Time unit for Duration parameter above",
      displayOptions: {
        show: {
          action: ["calculate"]
        }
      },
      type: "options",
      // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
      options: [
        {
          name: "Quarters",
          value: "quarters"
        },
        {
          name: "Years",
          value: "years"
        },
        {
          name: "Months",
          value: "months"
        },
        {
          name: "Weeks",
          value: "weeks"
        },
        {
          name: "Days",
          value: "days"
        },
        {
          name: "Hours",
          value: "hours"
        },
        {
          name: "Minutes",
          value: "minutes"
        },
        {
          name: "Seconds",
          value: "seconds"
        },
        {
          name: "Milliseconds",
          value: "milliseconds"
        }
      ],
      default: "days",
      required: true
    },
    {
      displayName: "Property Name",
      name: "dataPropertyName",
      type: "string",
      default: "data",
      required: true,
      displayOptions: {
        show: {
          action: ["calculate"]
        }
      },
      description: "Name of the output property to which to write the converted date"
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      displayOptions: {
        show: {
          action: ["calculate"]
        }
      },
      options: [
        {
          displayName: "From Format",
          name: "fromFormat",
          type: "string",
          default: "",
          description: 'Format for parsing the value as a date. If unrecognized, specify the <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datetime/#faqs">format</a> for the value.'
        }
      ]
    }
  ]
};
class DateTimeV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        // Get all the timezones to display them to user so that they can
        // select them easily
        async getTimezones() {
          const returnData = [];
          for (const timezone of import_moment_timezone.default.tz.names()) {
            const timezoneName = timezone;
            const timezoneId = timezone;
            returnData.push({
              name: timezoneName,
              value: timezoneId
            });
          }
          return returnData;
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async execute() {
    const items = this.getInputData();
    const length = items.length;
    const returnData = [];
    const workflowTimezone = this.getTimezone();
    let item;
    for (let i = 0; i < length; i++) {
      try {
        const action = this.getNodeParameter("action", 0);
        item = items[i];
        if (action === "format") {
          let currentDate = this.getNodeParameter(
            "value",
            i
          );
          const dataPropertyName = this.getNodeParameter("dataPropertyName", i);
          const toFormat = this.getNodeParameter("toFormat", i);
          const options = this.getNodeParameter("options", i);
          let newDate;
          if (currentDate instanceof import_luxon.DateTime) {
            currentDate = currentDate.toISO();
          }
          if (!Number.isNaN(Number(currentDate))) {
            currentDate = Number(currentDate);
            if (!Number.isInteger(currentDate)) {
              currentDate = currentDate * 1e3;
            }
          }
          if (currentDate === void 0) {
            continue;
          }
          if (options.fromFormat === void 0 && !(0, import_moment_timezone.default)(currentDate).isValid()) {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              'The date input format could not be recognized. Please set the "From Format" field',
              { itemIndex: i }
            );
          }
          if (Number.isInteger(currentDate)) {
            const timestampLengthInMilliseconds1990 = 12;
            if (currentDate.toString().length < timestampLengthInMilliseconds1990) {
              newDate = import_moment_timezone.default.unix(currentDate);
            } else {
              newDate = (0, import_moment_timezone.default)(currentDate);
            }
          } else {
            if (options.fromTimezone || options.toTimezone) {
              const fromTimezone = options.fromTimezone || workflowTimezone;
              if (options.fromFormat) {
                newDate = import_moment_timezone.default.tz(
                  currentDate,
                  options.fromFormat,
                  fromTimezone
                );
              } else {
                newDate = import_moment_timezone.default.tz(currentDate, fromTimezone);
              }
            } else {
              if (options.fromFormat) {
                newDate = (0, import_moment_timezone.default)(currentDate, options.fromFormat);
              } else {
                newDate = (0, import_moment_timezone.default)(currentDate);
              }
            }
          }
          if (options.toTimezone || options.fromTimezone) {
            newDate = newDate.tz(options.toTimezone || workflowTimezone);
          }
          newDate = newDate.format(toFormat);
          let newItem;
          if (dataPropertyName.includes(".")) {
            newItem = {
              json: (0, import_n8n_workflow.deepCopy)(item.json),
              pairedItem: {
                item: i
              }
            };
          } else {
            newItem = {
              json: { ...item.json },
              pairedItem: {
                item: i
              }
            };
          }
          if (item.binary !== void 0) {
            newItem.binary = item.binary;
          }
          (0, import_set.default)(newItem, ["json", dataPropertyName], newDate);
          returnData.push(newItem);
        }
        if (action === "calculate") {
          const dateValue = this.getNodeParameter("value", i);
          const operation = this.getNodeParameter("operation", i);
          const duration = this.getNodeParameter("duration", i);
          const timeUnit = this.getNodeParameter("timeUnit", i);
          const { fromFormat } = this.getNodeParameter("options", i);
          const dataPropertyName = this.getNodeParameter("dataPropertyName", i);
          const newDate = fromFormat ? parseDateByFormat.call(this, dateValue, fromFormat) : parseDateByDefault.call(this, dateValue);
          operation === "add" ? newDate.add(duration, timeUnit).utc().format() : newDate.subtract(duration, timeUnit).utc().format();
          let newItem;
          if (dataPropertyName.includes(".")) {
            newItem = {
              json: (0, import_n8n_workflow.deepCopy)(item.json),
              pairedItem: {
                item: i
              }
            };
          } else {
            newItem = {
              json: { ...item.json },
              pairedItem: {
                item: i
              }
            };
          }
          if (item.binary !== void 0) {
            newItem.binary = item.binary;
          }
          (0, import_set.default)(newItem, ["json", dataPropertyName], newDate.toISOString());
          returnData.push(newItem);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message
            },
            pairedItem: {
              item: i
            }
          });
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
  DateTimeV1
});
//# sourceMappingURL=DateTimeV1.node.js.map