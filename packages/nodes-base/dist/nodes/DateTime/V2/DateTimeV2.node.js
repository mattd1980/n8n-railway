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
var DateTimeV2_node_exports = {};
__export(DateTimeV2_node_exports, {
  DateTimeV2: () => DateTimeV2
});
module.exports = __toCommonJS(DateTimeV2_node_exports);
var import_luxon = require("luxon");
var import_n8n_workflow = require("n8n-workflow");
var import_AddToDateDescription = require("./AddToDateDescription");
var import_CurrentDateDescription = require("./CurrentDateDescription");
var import_ExtractDateDescription = require("./ExtractDateDescription");
var import_FormatDateDescription = require("./FormatDateDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_GetTimeBetweenDates = require("./GetTimeBetweenDates");
var import_RoundDateDescription = require("./RoundDateDescription");
var import_SubtractFromDateDescription = require("./SubtractFromDateDescription");
class DateTimeV2 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      version: 2,
      defaults: {
        name: "Date & Time",
        color: "#408000"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      description: "Manipulate date and time values",
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Add to a Date",
              value: "addToDate"
            },
            {
              name: "Extract Part of a Date",
              value: "extractDate"
            },
            {
              name: "Format a Date",
              value: "formatDate"
            },
            {
              name: "Get Current Date",
              value: "getCurrentDate"
            },
            {
              name: "Get Time Between Dates",
              value: "getTimeBetweenDates"
            },
            {
              name: "Round a Date",
              value: "roundDate"
            },
            {
              name: "Subtract From a Date",
              value: "subtractFromDate"
            }
          ],
          default: "getCurrentDate"
        },
        ...import_CurrentDateDescription.CurrentDateDescription,
        ...import_AddToDateDescription.AddToDateDescription,
        ...import_SubtractFromDateDescription.SubtractFromDateDescription,
        ...import_FormatDateDescription.FormatDateDescription,
        ...import_RoundDateDescription.RoundDateDescription,
        ...import_GetTimeBetweenDates.GetTimeBetweenDatesDescription,
        ...import_ExtractDateDescription.ExtractDateDescription
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const operation = this.getNodeParameter("operation", 0);
    const workflowTimezone = this.getTimezone();
    const includeInputFields = this.getNodeParameter(
      "options.includeInputFields",
      0,
      false
    );
    const copyShallow = (item) => ({
      json: { ...item.json },
      binary: item.binary
    });
    for (let i = 0; i < items.length; i++) {
      try {
        const item = includeInputFields ? copyShallow(items[i]) : { json: {} };
        item.pairedItem = {
          item: i
        };
        if (operation === "getCurrentDate") {
          const includeTime = this.getNodeParameter("includeTime", i);
          const outputFieldName = this.getNodeParameter("outputFieldName", i);
          const { timezone } = this.getNodeParameter("options", i);
          const newLocal = timezone ? timezone : workflowTimezone;
          if (import_luxon.DateTime.now().setZone(newLocal).invalidReason === "unsupported zone") {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The timezone ${newLocal} is not valid. Please check the timezone.`
            );
          }
          if (includeTime) {
            item.json[outputFieldName] = import_luxon.DateTime.now().setZone(newLocal).toString();
          } else {
            item.json[outputFieldName] = import_luxon.DateTime.now().setZone(newLocal).startOf("day").toString();
          }
          returnData.push(item);
        } else if (operation === "addToDate") {
          const addToDate = this.getNodeParameter("magnitude", i);
          const timeUnit = this.getNodeParameter("timeUnit", i);
          const duration = this.getNodeParameter("duration", i);
          const outputFieldName = this.getNodeParameter("outputFieldName", i);
          const dateToAdd = import_GenericFunctions.parseDate.call(this, addToDate, { timezone: workflowTimezone });
          const returnedDate = dateToAdd.plus({ [timeUnit]: duration });
          item.json[outputFieldName] = returnedDate.toString();
          returnData.push(item);
        } else if (operation === "subtractFromDate") {
          const subtractFromDate = this.getNodeParameter("magnitude", i);
          const timeUnit = this.getNodeParameter("timeUnit", i);
          const duration = this.getNodeParameter("duration", i);
          const outputFieldName = this.getNodeParameter("outputFieldName", i);
          const dateToAdd = import_GenericFunctions.parseDate.call(this, subtractFromDate, { timezone: workflowTimezone });
          const returnedDate = dateToAdd.minus({ [timeUnit]: duration });
          item.json[outputFieldName] = returnedDate.toString();
          returnData.push(item);
        } else if (operation === "formatDate") {
          const date = this.getNodeParameter("date", i);
          const format = this.getNodeParameter("format", i);
          const outputFieldName = this.getNodeParameter("outputFieldName", i);
          const { timezone, fromFormat } = this.getNodeParameter("options", i);
          if (date === null || date === void 0) {
            item.json[outputFieldName] = date;
          } else {
            const dateLuxon = import_GenericFunctions.parseDate.call(this, date, {
              timezone: timezone ? workflowTimezone : void 0,
              fromFormat
            });
            if (format === "custom") {
              const customFormat = this.getNodeParameter("customFormat", i);
              item.json[outputFieldName] = dateLuxon.toFormat(customFormat);
            } else {
              item.json[outputFieldName] = dateLuxon.toFormat(format);
            }
          }
          returnData.push(item);
        } else if (operation === "roundDate") {
          const date = this.getNodeParameter("date", i);
          const mode = this.getNodeParameter("mode", i);
          const outputFieldName = this.getNodeParameter("outputFieldName", i);
          const dateLuxon = import_GenericFunctions.parseDate.call(this, date, { timezone: workflowTimezone });
          if (mode === "roundDown") {
            const toNearest = this.getNodeParameter("toNearest", i);
            item.json[outputFieldName] = dateLuxon.startOf(toNearest).toString();
          } else if (mode === "roundUp") {
            const to = this.getNodeParameter("to", i);
            item.json[outputFieldName] = dateLuxon.plus({ [to]: 1 }).startOf(to).toString();
          }
          returnData.push(item);
        } else if (operation === "getTimeBetweenDates") {
          const startDate = this.getNodeParameter("startDate", i);
          const endDate = this.getNodeParameter("endDate", i);
          const unit = this.getNodeParameter("units", i);
          const outputFieldName = this.getNodeParameter("outputFieldName", i);
          const { isoString } = this.getNodeParameter("options", i);
          const luxonStartDate = import_GenericFunctions.parseDate.call(this, startDate, { timezone: workflowTimezone });
          const luxonEndDate = import_GenericFunctions.parseDate.call(this, endDate, { timezone: workflowTimezone });
          const duration = luxonEndDate.diff(luxonStartDate, unit);
          if (isoString) {
            item.json[outputFieldName] = duration.toString();
          } else {
            item.json[outputFieldName] = duration.toObject();
          }
          returnData.push(item);
        } else if (operation === "extractDate") {
          const date = this.getNodeParameter("date", i);
          const outputFieldName = this.getNodeParameter("outputFieldName", i);
          const part = this.getNodeParameter("part", i);
          const parsedDate = import_GenericFunctions.parseDate.call(this, date, { timezone: workflowTimezone });
          const selectedPart = part === "week" ? parsedDate.weekNumber : parsedDate.get(part);
          item.json[outputFieldName] = selectedPart;
          returnData.push(item);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, { itemIndex: i });
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateTimeV2
});
//# sourceMappingURL=DateTimeV2.node.js.map