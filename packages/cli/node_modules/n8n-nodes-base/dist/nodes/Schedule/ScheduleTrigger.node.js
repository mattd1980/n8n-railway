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
var ScheduleTrigger_node_exports = {};
__export(ScheduleTrigger_node_exports, {
  ScheduleTrigger: () => ScheduleTrigger
});
module.exports = __toCommonJS(ScheduleTrigger_node_exports);
var import_cron = require("cron");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class ScheduleTrigger {
  constructor() {
    this.description = {
      displayName: "Schedule Trigger",
      name: "scheduleTrigger",
      icon: "fa:clock",
      group: ["trigger", "schedule"],
      version: [1, 1.1, 1.2],
      description: "Triggers the workflow on a given schedule",
      eventTriggerDescription: "",
      activationMessage: "Your schedule trigger will now trigger executions on the schedule you have defined.",
      defaults: {
        name: "Schedule Trigger",
        color: "#31C49F"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: `This workflow will run on the schedule you define here once you <a data-key="activate">activate</a> it.<br><br>For testing, you can also trigger it manually: by going back to the canvas and clicking 'execute workflow'`,
          name: "notice",
          type: "notice",
          default: ""
        },
        {
          displayName: "Trigger Rules",
          name: "rule",
          placeholder: "Add Rule",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true
          },
          default: {
            interval: [
              {
                field: "days"
              }
            ]
          },
          options: [
            {
              name: "interval",
              displayName: "Trigger Interval",
              values: [
                {
                  displayName: "Trigger Interval",
                  name: "field",
                  type: "options",
                  default: "days",
                  // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
                  options: [
                    {
                      name: "Seconds",
                      value: "seconds"
                    },
                    {
                      name: "Minutes",
                      value: "minutes"
                    },
                    {
                      name: "Hours",
                      value: "hours"
                    },
                    {
                      name: "Days",
                      value: "days"
                    },
                    {
                      name: "Weeks",
                      value: "weeks"
                    },
                    {
                      name: "Months",
                      value: "months"
                    },
                    {
                      name: "Custom (Cron)",
                      value: "cronExpression"
                    }
                  ]
                },
                {
                  displayName: "Seconds Between Triggers",
                  name: "secondsInterval",
                  type: "number",
                  default: 30,
                  displayOptions: {
                    show: {
                      field: ["seconds"]
                    }
                  },
                  description: "Number of seconds between each workflow trigger"
                },
                {
                  displayName: "Minutes Between Triggers",
                  name: "minutesInterval",
                  type: "number",
                  default: 5,
                  displayOptions: {
                    show: {
                      field: ["minutes"]
                    }
                  },
                  description: "Number of minutes between each workflow trigger"
                },
                {
                  displayName: "Hours Between Triggers",
                  name: "hoursInterval",
                  type: "number",
                  displayOptions: {
                    show: {
                      field: ["hours"]
                    }
                  },
                  default: 1,
                  description: "Number of hours between each workflow trigger"
                },
                {
                  displayName: "Days Between Triggers",
                  name: "daysInterval",
                  type: "number",
                  displayOptions: {
                    show: {
                      field: ["days"]
                    }
                  },
                  default: 1,
                  description: "Number of days between each workflow trigger"
                },
                {
                  displayName: "Weeks Between Triggers",
                  name: "weeksInterval",
                  type: "number",
                  displayOptions: {
                    show: {
                      field: ["weeks"]
                    }
                  },
                  default: 1,
                  description: "Would run every week unless specified otherwise"
                },
                {
                  displayName: "Months Between Triggers",
                  name: "monthsInterval",
                  type: "number",
                  displayOptions: {
                    show: {
                      field: ["months"]
                    }
                  },
                  default: 1,
                  description: "Would run every month unless specified otherwise"
                },
                {
                  displayName: "Trigger at Day of Month",
                  name: "triggerAtDayOfMonth",
                  type: "number",
                  displayOptions: {
                    show: {
                      field: ["months"]
                    }
                  },
                  typeOptions: {
                    minValue: 1,
                    maxValue: 31
                  },
                  default: 1,
                  description: "The day of the month to trigger (1-31)",
                  hint: "If a month doesn\u2019t have this day, the node won\u2019t trigger"
                },
                {
                  displayName: "Trigger on Weekdays",
                  name: "triggerAtDay",
                  type: "multiOptions",
                  displayOptions: {
                    show: {
                      field: ["weeks"]
                    }
                  },
                  typeOptions: {
                    maxValue: 7
                  },
                  options: [
                    {
                      name: "Monday",
                      value: 1
                    },
                    {
                      name: "Tuesday",
                      value: 2
                    },
                    {
                      name: "Wednesday",
                      value: 3
                    },
                    {
                      name: "Thursday",
                      value: 4
                    },
                    {
                      name: "Friday",
                      value: 5
                    },
                    {
                      name: "Saturday",
                      value: 6
                    },
                    {
                      name: "Sunday",
                      value: 0
                    }
                  ],
                  default: [0]
                },
                {
                  displayName: "Trigger at Hour",
                  name: "triggerAtHour",
                  type: "options",
                  default: 0,
                  displayOptions: {
                    show: {
                      field: ["days", "weeks", "months"]
                    }
                  },
                  options: [
                    {
                      name: "Midnight",
                      displayName: "Midnight",
                      value: 0
                    },
                    {
                      name: "1am",
                      displayName: "1am",
                      value: 1
                    },
                    {
                      name: "2am",
                      displayName: "2am",
                      value: 2
                    },
                    {
                      name: "3am",
                      displayName: "3am",
                      value: 3
                    },
                    {
                      name: "4am",
                      displayName: "4am",
                      value: 4
                    },
                    {
                      name: "5am",
                      displayName: "5am",
                      value: 5
                    },
                    {
                      name: "6am",
                      displayName: "6am",
                      value: 6
                    },
                    {
                      name: "7am",
                      displayName: "7am",
                      value: 7
                    },
                    {
                      name: "8am",
                      displayName: "8am",
                      value: 8
                    },
                    {
                      name: "9am",
                      displayName: "9am",
                      value: 9
                    },
                    {
                      name: "10am",
                      displayName: "10am",
                      value: 10
                    },
                    {
                      name: "11am",
                      displayName: "11am",
                      value: 11
                    },
                    {
                      name: "Noon",
                      displayName: "Noon",
                      value: 12
                    },
                    {
                      name: "1pm",
                      displayName: "1pm",
                      value: 13
                    },
                    {
                      name: "2pm",
                      displayName: "2pm",
                      value: 14
                    },
                    {
                      name: "3pm",
                      displayName: "3pm",
                      value: 15
                    },
                    {
                      name: "4pm",
                      displayName: "4pm",
                      value: 16
                    },
                    {
                      name: "5pm",
                      displayName: "5pm",
                      value: 17
                    },
                    {
                      name: "6pm",
                      displayName: "6pm",
                      value: 18
                    },
                    {
                      name: "7pm",
                      displayName: "7pm",
                      value: 19
                    },
                    {
                      name: "8pm",
                      displayName: "8pm",
                      value: 20
                    },
                    {
                      name: "9pm",
                      displayName: "9pm",
                      value: 21
                    },
                    {
                      name: "10pm",
                      displayName: "10pm",
                      value: 22
                    },
                    {
                      name: "11pm",
                      displayName: "11pm",
                      value: 23
                    }
                  ],
                  description: "The hour of the day to trigger"
                },
                {
                  displayName: "Trigger at Minute",
                  name: "triggerAtMinute",
                  type: "number",
                  default: 0,
                  displayOptions: {
                    show: {
                      field: ["hours", "days", "weeks", "months"]
                    }
                  },
                  typeOptions: {
                    minValue: 0,
                    maxValue: 59
                  },
                  description: "The minute past the hour to trigger (0-59)"
                },
                {
                  displayName: 'You can find help generating your cron expression <a href="https://crontab.guru/examples.html" target="_blank">here</a>',
                  name: "notice",
                  type: "notice",
                  displayOptions: {
                    show: {
                      field: ["cronExpression"]
                    }
                  },
                  default: ""
                },
                {
                  displayName: "Expression",
                  name: "expression",
                  type: "string",
                  default: "",
                  placeholder: "eg. 0 15 * 1 sun",
                  displayOptions: {
                    show: {
                      field: ["cronExpression"]
                    }
                  },
                  hint: "Format: [Second] [Minute] [Hour] [Day of Month] [Month] [Day of Week]"
                }
              ]
            }
          ]
        }
      ]
    };
  }
  async trigger() {
    const { interval: intervals } = this.getNodeParameter("rule", []);
    const timezone = this.getTimezone();
    const staticData = this.getWorkflowStaticData("node");
    if (!staticData.recurrenceRules) {
      staticData.recurrenceRules = [];
    }
    const executeTrigger = (recurrence) => {
      const shouldTrigger = (0, import_GenericFunctions.recurrenceCheck)(recurrence, staticData.recurrenceRules, timezone);
      if (!shouldTrigger) return;
      const momentTz = import_moment_timezone.default.tz(timezone);
      const resultData = {
        timestamp: momentTz.toISOString(true),
        "Readable date": momentTz.format("MMMM Do YYYY, h:mm:ss a"),
        "Readable time": momentTz.format("h:mm:ss a"),
        "Day of week": momentTz.format("dddd"),
        Year: momentTz.format("YYYY"),
        Month: momentTz.format("MMMM"),
        "Day of month": momentTz.format("DD"),
        Hour: momentTz.format("HH"),
        Minute: momentTz.format("mm"),
        Second: momentTz.format("ss"),
        Timezone: `${timezone} (UTC${momentTz.format("Z")})`
      };
      this.emit([this.helpers.returnJsonArray([resultData])]);
    };
    const rules = intervals.map((interval, i) => ({
      interval,
      cronExpression: (0, import_GenericFunctions.toCronExpression)(interval),
      recurrence: (0, import_GenericFunctions.intervalToRecurrence)(interval, i)
    }));
    if (this.getMode() !== "manual") {
      for (const { interval, cronExpression, recurrence } of rules) {
        try {
          this.helpers.registerCron(cronExpression, () => executeTrigger(recurrence));
        } catch (error) {
          if (interval.field === "cronExpression") {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid cron expression", {
              description: "More information on how to build them at https://crontab.guru/"
            });
          } else {
            throw error;
          }
        }
      }
      return {};
    } else {
      const manualTriggerFunction = async () => {
        const { interval, cronExpression, recurrence } = rules[0];
        if (interval.field === "cronExpression") {
          try {
            (0, import_cron.sendAt)(cronExpression);
          } catch (error) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Invalid cron expression", {
              description: "More information on how to build them at https://crontab.guru/"
            });
          }
        }
        executeTrigger(recurrence);
      };
      return { manualTriggerFunction };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScheduleTrigger
});
//# sourceMappingURL=ScheduleTrigger.node.js.map