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
var ToolDescription_exports = {};
__export(ToolDescription_exports, {
  toolOperations: () => toolOperations,
  toolParameters: () => toolParameters
});
module.exports = __toCommonJS(ToolDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_Groups = require("./Json/Groups");
var import_Tools = require("./Json/Tools");
function capitalize(str) {
  if (!str) {
    return "";
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
const operations = [];
for (const group of import_Groups.groups.groups) {
  const item = {
    displayName: "Operation",
    name: "tool",
    type: "options",
    description: "The Operation to consume",
    displayOptions: {
      show: {
        group: [group.name]
      }
    },
    default: "",
    options: []
  };
  const options = [];
  for (const tool of import_Tools.tools.processors) {
    if (tool.g === group.name) {
      const link = "https://app.uproc.io/#/tools/processor/" + tool.k.replace(/([A-Z]+)/g, "-$1").toLowerCase().replace("-", "/").replace("-", "/");
      const option = {
        name: tool.d,
        value: tool.k,
        description: tool.ed + ` <a href="${link}" target='_blank'>Info</a>`
      };
      options.push(option);
    }
  }
  item.options = options.sort((a, b) => a.name > b.name ? 1 : -1);
  item.default = options[0].value;
  operations.push(item);
}
const toolOperations = operations;
let parameters = [];
for (const tool of import_Tools.tools.processors) {
  for (const param of tool.p) {
    const displayName = param.n;
    const capitalizedDisplayName = capitalize(displayName.replace(/_/g, " "));
    const description = `The "${capitalizedDisplayName}" value to use as a parameter for this Operation`;
    const parameter = {
      displayName: capitalizedDisplayName,
      name: param.n,
      type: param.t,
      default: "",
      placeholder: param.p,
      required: param.r,
      options: param.o,
      displayOptions: {
        show: {
          group: [tool.g],
          tool: [tool.k]
        }
      },
      description: (0, import_n8n_workflow.deepCopy)(description)
    };
    let modifiedParam = null;
    for (const currentParam of parameters) {
      if (currentParam.name === param.n) {
        modifiedParam = currentParam;
      }
    }
    if (modifiedParam) {
      modifiedParam.displayOptions.show.group.push(tool.g);
      modifiedParam.displayOptions.show.tool.push(tool.k);
      const newParameters = [];
      for (const currentParam of parameters) {
        if (currentParam.name === modifiedParam.name) {
          newParameters.push(modifiedParam);
        } else {
          newParameters.push(currentParam);
        }
      }
      parameters = JSON.parse(JSON.stringify(newParameters));
    } else {
      parameters.push(parameter);
    }
  }
}
const toolParameters = parameters;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toolOperations,
  toolParameters
});
//# sourceMappingURL=ToolDescription.js.map