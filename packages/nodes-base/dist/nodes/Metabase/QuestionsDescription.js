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
var QuestionsDescription_exports = {};
__export(QuestionsDescription_exports, {
  questionsFields: () => questionsFields,
  questionsOperations: () => questionsOperations
});
module.exports = __toCommonJS(QuestionsDescription_exports);
var import_n8n_workflow = require("n8n-workflow");
const questionsOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["questions"]
      }
    },
    options: [
      {
        name: "Get",
        value: "get",
        description: "Get a specific question",
        routing: {
          request: {
            method: "GET",
            url: '={{"/api/card/" + $parameter.questionId}}'
          }
        },
        action: "Get a questions"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many questions",
        routing: {
          request: {
            method: "GET",
            url: "/api/card/"
          }
        },
        action: "Get many questions"
      },
      {
        name: "Result Data",
        value: "resultData",
        description: "Return the result of the question to a specific file format",
        routing: {
          request: {
            method: "POST",
            url: '={{"/api/card/" + $parameter.questionId + "/query/" + $parameter.format}}',
            returnFullResponse: true,
            encoding: "arraybuffer"
          },
          output: {
            postReceive: [
              async function(items, responseData) {
                const datatype = this.getNodeParameter("format");
                if (datatype !== "json") {
                  const binaryData = await this.helpers.prepareBinaryData(
                    responseData.body,
                    "data",
                    responseData.headers["content-type"]
                  );
                  items = items.map((item) => {
                    item.json = {};
                    item.binary = { ["data"]: binaryData };
                    return item;
                  });
                } else {
                  const results = (0, import_n8n_workflow.jsonParse)(responseData.body);
                  items = results.map((result) => {
                    return {
                      json: {
                        ...result
                      }
                    };
                  });
                }
                return items;
              }
            ]
          }
        },
        action: "Get the results from a question"
      }
    ],
    default: "getAll"
  }
];
const questionsFields = [
  {
    displayName: "Question ID",
    name: "questionId",
    type: "string",
    required: true,
    placeholder: "0",
    displayOptions: {
      show: {
        resource: ["questions"],
        operation: ["get", "resultData"]
      }
    },
    default: ""
  },
  {
    displayName: "Format",
    name: "format",
    type: "options",
    required: true,
    options: [
      {
        name: "CSV",
        value: "csv"
      },
      {
        name: "JSON",
        value: "json"
      },
      {
        name: "XLSX",
        value: "xlsx"
      }
    ],
    default: "csv",
    displayOptions: {
      show: {
        resource: ["questions"],
        operation: ["resultData"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  questionsFields,
  questionsOperations
});
//# sourceMappingURL=QuestionsDescription.js.map