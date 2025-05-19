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
var CurrentDateDescription_exports = {};
__export(CurrentDateDescription_exports, {
  CurrentDateDescription: () => CurrentDateDescription
});
module.exports = __toCommonJS(CurrentDateDescription_exports);
var import_common = require("./common.descriptions");
const CurrentDateDescription = [
  {
    displayName: 'You can also refer to the current date in n8n expressions by using <code>{{$now}}</code> or <code>{{$today}}</code>. <a target="_blank" href="https://docs.n8n.io/code/cookbook/luxon/">More info</a>',
    name: "notice",
    type: "notice",
    default: "",
    displayOptions: {
      show: {
        operation: ["getCurrentDate"]
      }
    }
  },
  {
    displayName: "Include Current Time",
    name: "includeTime",
    type: "boolean",
    default: true,
    // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
    description: "When deactivated, the time will be set to midnight",
    displayOptions: {
      show: {
        operation: ["getCurrentDate"]
      }
    }
  },
  {
    displayName: "Output Field Name",
    name: "outputFieldName",
    type: "string",
    default: "currentDate",
    description: "Name of the field to put the output in",
    displayOptions: {
      show: {
        operation: ["getCurrentDate"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    displayOptions: {
      show: {
        operation: ["getCurrentDate"]
      }
    },
    default: {},
    options: [
      import_common.includeInputFields,
      {
        displayName: "Timezone",
        name: "timezone",
        type: "string",
        placeholder: "America/New_York",
        default: "",
        description: "The timezone to use. If not set, the timezone of the n8n instance will be used. Use \u2018GMT\u2019 for +00:00 timezone."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CurrentDateDescription
});
//# sourceMappingURL=CurrentDateDescription.js.map