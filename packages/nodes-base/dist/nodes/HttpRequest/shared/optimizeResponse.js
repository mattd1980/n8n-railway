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
var optimizeResponse_exports = {};
__export(optimizeResponse_exports, {
  configureResponseOptimizer: () => configureResponseOptimizer,
  optimizeResponseProperties: () => optimizeResponseProperties
});
module.exports = __toCommonJS(optimizeResponse_exports);
var import_readability = require("@mozilla/readability");
var cheerio = __toESM(require("cheerio"));
var import_html_to_text = require("html-to-text");
var import_jsdom = require("jsdom");
var import_lodash = require("lodash");
var import_n8n_workflow = require("n8n-workflow");
function htmlOptimizer(ctx, itemIndex, maxLength) {
  const cssSelector = ctx.getNodeParameter("cssSelector", itemIndex, "");
  const onlyContent = ctx.getNodeParameter("onlyContent", itemIndex, false);
  let elementsToOmit = [];
  if (onlyContent) {
    const elementsToOmitUi = ctx.getNodeParameter("elementsToOmit", itemIndex, "");
    if (typeof elementsToOmitUi === "string") {
      elementsToOmit = elementsToOmitUi.split(",").filter((s) => s).map((s) => s.trim());
    }
  }
  return (response) => {
    if (typeof response !== "string") {
      throw new import_n8n_workflow.NodeOperationError(
        ctx.getNode(),
        `The response type must be a string. Received: ${typeof response}`,
        { itemIndex }
      );
    }
    const returnData = [];
    const html = cheerio.load(response);
    const htmlElements = html(cssSelector);
    htmlElements.each((_, el) => {
      let value = html(el).html() || "";
      if (onlyContent) {
        let htmlToTextOptions;
        if (elementsToOmit?.length) {
          htmlToTextOptions = {
            selectors: elementsToOmit.map((selector) => ({
              selector,
              format: "skip"
            }))
          };
        }
        value = (0, import_html_to_text.convert)(value, htmlToTextOptions);
      }
      value = value.trim().replace(/^\s+|\s+$/g, "").replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ");
      returnData.push(value);
    });
    const text = JSON.stringify(returnData, null, 2);
    if (maxLength > 0 && text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  };
}
const textOptimizer = (ctx, itemIndex, maxLength) => {
  return (response) => {
    if (typeof response === "object") {
      try {
        response = JSON.stringify(response, null, 2);
      } catch (error) {
      }
    }
    if (typeof response !== "string") {
      throw new import_n8n_workflow.NodeOperationError(
        ctx.getNode(),
        `The response type must be a string. Received: ${typeof response}`,
        { itemIndex }
      );
    }
    const dom = new import_jsdom.JSDOM(response);
    const article = new import_readability.Readability(dom.window.document, {
      keepClasses: true
    }).parse();
    const text = article?.textContent || "";
    if (maxLength > 0 && text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  };
};
const jsonOptimizer = (ctx, itemIndex) => {
  return (response) => {
    let responseData = response;
    if (typeof response === "string") {
      try {
        responseData = (0, import_n8n_workflow.jsonParse)(response, { errorMessage: "Invalid JSON response" });
      } catch (error) {
        throw new import_n8n_workflow.NodeOperationError(
          ctx.getNode(),
          `Received invalid JSON from response '${response}'`,
          { itemIndex }
        );
      }
    }
    if (typeof responseData !== "object" || !responseData) {
      throw new import_n8n_workflow.NodeOperationError(
        ctx.getNode(),
        "The response type must be an object or an array of objects",
        { itemIndex }
      );
    }
    const dataField = ctx.getNodeParameter("dataField", itemIndex, "");
    let returnData = [];
    if (!Array.isArray(responseData)) {
      if (dataField) {
        if (!Object.prototype.hasOwnProperty.call(responseData, dataField)) {
          throw new import_n8n_workflow.NodeOperationError(
            ctx.getNode(),
            `Target field "${dataField}" not found in response.`,
            {
              itemIndex,
              description: `The response contained these fields: [${Object.keys(responseData).join(", ")}]`
            }
          );
        }
        const data = responseData[dataField];
        if (Array.isArray(data)) {
          responseData = data;
        } else {
          responseData = [data];
        }
      } else {
        responseData = [responseData];
      }
    } else {
      if (dataField) {
        responseData = responseData.map((data) => data[dataField]);
      }
    }
    const fieldsToInclude = ctx.getNodeParameter("fieldsToInclude", itemIndex, "all");
    let fields = [];
    if (fieldsToInclude !== "all") {
      fields = ctx.getNodeParameter("fields", itemIndex, []);
      if (typeof fields === "string") {
        fields = fields.split(",").map((field) => field.trim());
      }
    } else {
      returnData = responseData;
    }
    if (fieldsToInclude === "selected") {
      for (const item of responseData) {
        const newItem = {};
        for (const field of fields) {
          (0, import_lodash.set)(newItem, field, (0, import_lodash.get)(item, field));
        }
        returnData.push(newItem);
      }
    }
    if (fieldsToInclude === "except") {
      for (const item of responseData) {
        for (const field of fields) {
          (0, import_lodash.unset)(item, field);
        }
        returnData.push(item);
      }
    }
    return returnData;
  };
};
const configureResponseOptimizer = (ctx, itemIndex) => {
  const optimizeResponse = ctx.getNodeParameter("optimizeResponse", itemIndex, false);
  if (optimizeResponse) {
    const responseType = ctx.getNodeParameter("responseType", itemIndex);
    let maxLength = 0;
    const truncateResponse = ctx.getNodeParameter("truncateResponse", itemIndex, false);
    if (truncateResponse) {
      maxLength = ctx.getNodeParameter("maxLength", itemIndex, 0);
    }
    switch (responseType) {
      case "html":
        return htmlOptimizer(ctx, itemIndex, maxLength);
      case "text":
        return textOptimizer(ctx, itemIndex, maxLength);
      case "json":
        return jsonOptimizer(ctx, itemIndex);
    }
  }
  return (x) => x;
};
const optimizeResponseProperties = [
  {
    displayName: "Optimize Response",
    name: "optimizeResponse",
    type: "boolean",
    default: false,
    noDataExpression: true,
    description: "Whether the optimize the tool response to reduce amount of data passed to the LLM that could lead to better result and reduce cost"
  },
  {
    displayName: "Expected Response Type",
    name: "responseType",
    type: "options",
    displayOptions: {
      show: {
        optimizeResponse: [true]
      }
    },
    options: [
      {
        name: "JSON",
        value: "json"
      },
      {
        name: "HTML",
        value: "html"
      },
      {
        name: "Text",
        value: "text"
      }
    ],
    default: "json"
  },
  {
    displayName: "Field Containing Data",
    name: "dataField",
    type: "string",
    default: "",
    placeholder: "e.g. records",
    description: "Specify the name of the field in the response containing the data",
    hint: "leave blank to use whole response",
    requiresDataPath: "single",
    displayOptions: {
      show: {
        optimizeResponse: [true],
        responseType: ["json"]
      }
    }
  },
  {
    displayName: "Include Fields",
    name: "fieldsToInclude",
    type: "options",
    description: "What fields response object should include",
    default: "all",
    displayOptions: {
      show: {
        optimizeResponse: [true],
        responseType: ["json"]
      }
    },
    options: [
      {
        name: "All",
        value: "all",
        description: "Include all fields"
      },
      {
        name: "Selected",
        value: "selected",
        description: "Include only fields specified below"
      },
      {
        name: "Except",
        value: "except",
        description: "Exclude fields specified below"
      }
    ]
  },
  {
    displayName: "Fields",
    name: "fields",
    type: "string",
    default: "",
    placeholder: "e.g. field1,field2",
    description: "Comma-separated list of the field names. Supports dot notation. You can drag the selected fields from the input panel.",
    requiresDataPath: "multiple",
    displayOptions: {
      show: {
        optimizeResponse: [true],
        responseType: ["json"]
      },
      hide: {
        fieldsToInclude: ["all"]
      }
    }
  },
  {
    displayName: "Selector (CSS)",
    name: "cssSelector",
    type: "string",
    description: "Select specific element(e.g. body) or multiple elements(e.g. div) of chosen type in the response HTML.",
    placeholder: "e.g. body",
    default: "body",
    displayOptions: {
      show: {
        optimizeResponse: [true],
        responseType: ["html"]
      }
    }
  },
  {
    displayName: "Return Only Content",
    name: "onlyContent",
    type: "boolean",
    default: false,
    description: "Whether to return only content of html elements, stripping html tags and attributes",
    hint: "Uses less tokens and may be easier for model to understand",
    displayOptions: {
      show: {
        optimizeResponse: [true],
        responseType: ["html"]
      }
    }
  },
  {
    displayName: "Elements To Omit",
    name: "elementsToOmit",
    type: "string",
    displayOptions: {
      show: {
        optimizeResponse: [true],
        responseType: ["html"],
        onlyContent: [true]
      }
    },
    default: "",
    placeholder: "e.g. img, .className, #ItemId",
    description: "Comma-separated list of selectors that would be excluded when extracting content"
  },
  {
    displayName: "Truncate Response",
    name: "truncateResponse",
    type: "boolean",
    default: false,
    hint: "Helps save tokens",
    displayOptions: {
      show: {
        optimizeResponse: [true],
        responseType: ["text", "html"]
      }
    }
  },
  {
    displayName: "Max Response Characters",
    name: "maxLength",
    type: "number",
    default: 1e3,
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        optimizeResponse: [true],
        responseType: ["text", "html"],
        truncateResponse: [true]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configureResponseOptimizer,
  optimizeResponseProperties
});
//# sourceMappingURL=optimizeResponse.js.map