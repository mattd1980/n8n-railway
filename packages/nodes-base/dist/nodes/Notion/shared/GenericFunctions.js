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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  downloadFiles: () => downloadFiles,
  extractBlockId: () => extractBlockId,
  extractDatabaseId: () => extractDatabaseId,
  extractDatabaseMentionRLC: () => extractDatabaseMentionRLC,
  extractPageId: () => extractPageId,
  formatBlocks: () => formatBlocks,
  formatText: () => formatText,
  formatTitle: () => formatTitle,
  getBlockTypesOptions: () => getBlockTypesOptions,
  getConditions: () => getConditions,
  getFormattedChildren: () => getFormattedChildren,
  getPageId: () => getPageId,
  getPropertyTitle: () => getPropertyTitle,
  getSearchFilters: () => getSearchFilters,
  mapFilters: () => mapFilters,
  mapProperties: () => mapProperties,
  mapSorting: () => mapSorting,
  notionApiRequest: () => notionApiRequest,
  notionApiRequestAllItems: () => notionApiRequestAllItems,
  notionApiRequestGetBlockChildrens: () => notionApiRequestGetBlockChildrens,
  prepareNotionError: () => prepareNotionError,
  simplifyBlocksOutput: () => simplifyBlocksOutput,
  simplifyObjects: () => simplifyObjects,
  simplifyProperties: () => simplifyProperties,
  validateJSON: () => validateJSON
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_change_case = require("change-case");
var import_set = __toESM(require("lodash/set"));
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_uuid = require("uuid");
var import_constants = require("./constants");
var import_Filters = require("./descriptions/Filters");
function uuidValidateWithoutDashes(value) {
  if ((0, import_uuid.validate)(value)) return true;
  if (value.length == 32) {
    const strWithDashes = `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
    if ((0, import_uuid.validate)(strWithDashes)) return true;
  }
  throw new import_n8n_workflow.NodeOperationError(
    this.getNode(),
    `The relation id "${value}" is not a valid uuid with optional dashes.`
  );
}
const apiVersion = {
  1: "2021-05-13",
  2: "2021-08-16",
  2.1: "2021-08-16",
  2.2: "2021-08-16"
};
async function notionApiRequest(method, resource, body = {}, qs = {}, uri, option = {}) {
  try {
    let options = {
      headers: {
        "Notion-Version": apiVersion[this.getNode().typeVersion]
      },
      method,
      qs,
      body,
      uri: uri || `https://api.notion.com/v1${resource}`,
      json: true
    };
    options = Object.assign({}, options, option);
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    if (!uri) {
      return await this.helpers.requestWithAuthentication.call(this, "notionApi", options);
    }
    return await this.helpers.request(options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function notionApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const resource = this.getNodeParameter("resource", 0);
  const returnData = [];
  let responseData;
  do {
    responseData = await notionApiRequest.call(this, method, endpoint, body, query);
    const { next_cursor } = responseData;
    if (resource === "block" || resource === "user") {
      query.start_cursor = next_cursor;
    } else {
      body.start_cursor = next_cursor;
    }
    returnData.push.apply(returnData, responseData[propertyName]);
    const limit = query.limit;
    if (limit && limit <= returnData.length) {
      return returnData;
    }
  } while (responseData.has_more !== false);
  return returnData;
}
async function notionApiRequestGetBlockChildrens(blocks, responseData = [], limit) {
  if (blocks.length === 0) return responseData;
  for (const block of blocks) {
    responseData.push(block);
    if (block.type === "child_page") continue;
    if (block.has_children) {
      let childrens = await notionApiRequestAllItems.call(
        this,
        "results",
        "GET",
        `/blocks/${block.id}/children`
      );
      childrens = (childrens || []).map((entry) => ({
        object: entry.object,
        parent_id: block.id,
        ...entry
      }));
      await notionApiRequestGetBlockChildrens.call(this, childrens, responseData);
    }
    if (limit && responseData.length === limit) {
      return responseData;
    }
    if (limit && responseData.length > limit) {
      return responseData.slice(0, limit);
    }
  }
  return responseData;
}
function getBlockTypesOptions() {
  return [
    {
      name: "Paragraph",
      value: "paragraph"
    },
    {
      name: "Heading 1",
      value: "heading_1"
    },
    {
      name: "Heading 2",
      value: "heading_2"
    },
    {
      name: "Heading 3",
      value: "heading_3"
    },
    {
      name: "Toggle",
      value: "toggle"
    },
    {
      name: "To-Do",
      value: "to_do"
    },
    // {
    // 	name: 'Child Page',
    // 	value: 'child_page',
    // },
    {
      name: "Bulleted List Item",
      value: "bulleted_list_item"
    },
    {
      name: "Numbered List Item",
      value: "numbered_list_item"
    },
    {
      name: "Image",
      value: "image"
    }
  ];
}
function textContent(content) {
  return {
    text: {
      content
    }
  };
}
function formatTitle(content) {
  return {
    title: [textContent(content)]
  };
}
function formatText(content) {
  return {
    text: [textContent(content)]
  };
}
function getLink(text) {
  if (text.isLink && text.textLink !== "") {
    return {
      link: {
        url: text.textLink
      }
    };
  }
  return {};
}
function getTexts(texts) {
  const results = [];
  for (const text of texts) {
    if (text.textType === "text") {
      results.push({
        type: "text",
        text: {
          content: text.text,
          ...getLink(text)
        },
        annotations: text.annotationUi
      });
    } else if (text.textType === "mention") {
      if (text.mentionType === "date") {
        results.push({
          type: "mention",
          mention: {
            type: text.mentionType,
            [text.mentionType]: text.range ? { start: text.dateStart, end: text.dateEnd } : { start: text.date, end: null }
          },
          annotations: text.annotationUi
        });
      } else {
        results.push({
          type: "mention",
          mention: {
            type: text.mentionType,
            //@ts-expect-error any
            [text.mentionType]: { id: text[text.mentionType] }
          },
          annotations: text.annotationUi
        });
      }
    } else if (text.textType === "equation") {
      results.push({
        type: "equation",
        equation: {
          expression: text.expression
        },
        annotations: text.annotationUi
      });
    }
  }
  return results;
}
function getTextBlocks(block) {
  return {
    text: block.richText === false ? formatText(block.textContent).text : getTexts(block.text.text || [])
  };
}
function formatBlocks(blocks) {
  const results = [];
  for (const block of blocks) {
    results.push({
      object: "block",
      type: block.type,
      [block.type]: {
        ...block.type === "to_do" ? { checked: block.checked } : {},
        ...block.type === "image" ? { type: "external", external: { url: block.url } } : {},
        ...!["image"].includes(block.type) ? getTextBlocks(block) : {}
      }
    });
  }
  return results;
}
function getDateFormat(includeTime) {
  if (!includeTime) {
    return "yyyy-MM-DD";
  }
  return "";
}
function isEmpty(value) {
  return value === void 0 || value === null || value === "";
}
function getPropertyKeyValue(value, type, timezone, version = 1) {
  const ignoreIfEmpty = (v, cb) => !v && value.ignoreIfEmpty ? void 0 : cb(v);
  let result = {};
  switch (type) {
    case "rich_text":
      if (value.richText === false) {
        result = { rich_text: [{ text: { content: value.textContent } }] };
      } else {
        result = { rich_text: getTexts(value.text.text) };
      }
      break;
    case "title":
      result = { title: [{ text: { content: value.title } }] };
      break;
    case "number":
      result = { type: "number", number: value.numberValue };
      break;
    case "url":
      result = ignoreIfEmpty(value.urlValue, (url) => ({ type: "url", url }));
      break;
    case "checkbox":
      result = { type: "checkbox", checkbox: value.checkboxValue };
      break;
    case "relation":
      result = {
        type: "relation",
        relation: value.relationValue.filter((relation) => {
          return relation && typeof relation === "string";
        }).reduce((acc, cur) => {
          return acc.concat(cur.split(",").map((relation) => relation.trim()));
        }, []).filter((relation) => {
          return uuidValidateWithoutDashes.call(this, relation);
        }).map((relation) => ({ id: relation }))
      };
      break;
    case "multi_select":
      if (isEmpty(value.multiSelectValue)) {
        result = {
          type: "multi_select",
          multi_select: []
        };
        break;
      }
      const multiSelectValue = value.multiSelectValue;
      result = {
        type: "multi_select",
        multi_select: (Array.isArray(multiSelectValue) ? multiSelectValue : multiSelectValue.split(",").map((v) => v.trim())).filter((entry) => entry !== null).map((option) => !(0, import_uuid.validate)(option) ? { name: option } : { id: option })
      };
      break;
    case "email":
      result = {
        type: "email",
        email: value.emailValue
      };
      break;
    case "people":
      if (!Array.isArray(value.peopleValue)) {
        value.peopleValue = [value.peopleValue];
      }
      result = {
        type: "people",
        people: value.peopleValue.map((option) => ({ id: option }))
      };
      break;
    case "phone_number":
      result = {
        type: "phone_number",
        phone_number: value.phoneValue
      };
      break;
    case "select":
      if (isEmpty(value.selectValue)) {
        result = {
          type: "select",
          select: null
        };
        break;
      }
      result = {
        type: "select",
        select: version === 1 ? { id: value.selectValue } : { name: value.selectValue }
      };
      break;
    case "status":
      result = {
        type: "status",
        status: { name: value.statusValue }
      };
      break;
    case "date":
      const format = getDateFormat(value.includeTime);
      const timezoneValue = value.timezone === "default" ? timezone : value.timezone;
      if (value.range === true) {
        result = {
          type: "date",
          date: {
            start: import_moment_timezone.default.tz(value.dateStart, timezoneValue).format(format),
            end: import_moment_timezone.default.tz(value.dateEnd, timezoneValue).format(format)
          }
        };
      } else {
        result = {
          type: "date",
          date: {
            start: import_moment_timezone.default.tz(value.date, timezoneValue).format(format),
            end: null
          }
        };
      }
      if (value.date === "" || value.dateStart === "" && value.dateEnd === "") {
        result.date = null;
      }
      break;
    case "files":
      result = {
        type: "files",
        files: value.fileUrls.fileUrl.map((file) => ({
          name: file.name,
          type: "external",
          external: { url: file.url }
        }))
      };
      break;
    default:
  }
  return result;
}
function getNameAndType(key) {
  const [name, type] = key.split("|");
  return {
    name,
    type
  };
}
function mapProperties(properties, timezone, version = 1) {
  return properties.filter(
    (property) => typeof property.key === "string"
  ).map(
    (property) => [
      `${property.key.split("|")[0]}`,
      getPropertyKeyValue.call(
        this,
        property,
        property.key.split("|")[1],
        timezone,
        version
      )
    ]
  ).filter(([, value]) => value).reduce(
    (obj, [key, value]) => Object.assign(obj, {
      [key]: value
    }),
    {}
  );
}
function mapSorting(data) {
  return data.map((sort) => {
    return {
      direction: sort.direction,
      [sort.timestamp ? "timestamp" : "property"]: sort.key.split("|")[0]
    };
  });
}
function mapFilters(filtersList, timezone) {
  return filtersList.reduce((obj, value) => {
    let key = getNameAndType(value.key).type;
    let valuePropertyName = key === "last_edited_time" ? value[(0, import_change_case.camelCase)(key)] : value[`${(0, import_change_case.camelCase)(key)}Value`];
    if (["is_empty", "is_not_empty"].includes(value.condition)) {
      valuePropertyName = true;
    } else if (["past_week", "past_month", "past_year", "next_week", "next_month", "next_year"].includes(
      value.condition
    )) {
      valuePropertyName = {};
    }
    if (key === "rich_text" || key === "text") {
      key = "text";
    } else if (key === "phone_number") {
      key = "phone";
    } else if (key === "date" && !["is_empty", "is_not_empty"].includes(value.condition)) {
      valuePropertyName = value.date === "" ? {} : import_moment_timezone.default.tz(value.date, timezone).utc().format();
    } else if (key === "boolean") {
      key = "checkbox";
    }
    if (value.type === "formula") {
      if (["is_empty", "is_not_empty"].includes(value.condition)) {
        key = value.returnType;
      } else {
        const vpropertyName = value[`${(0, import_change_case.camelCase)(value.returnType)}Value`];
        return Object.assign(obj, {
          ["property"]: getNameAndType(value.key).name,
          [key]: { [value.returnType]: { [`${value.condition}`]: vpropertyName } }
        });
      }
    }
    return Object.assign(obj, {
      ["property"]: getNameAndType(value.key)?.name,
      [key]: { [`${value.condition}`]: valuePropertyName }
    });
  }, {});
}
function simplifyProperty(property) {
  let result;
  const type = property.type;
  if (["text"].includes(property.type)) {
    result = property.plain_text;
  } else if (["rich_text", "title"].includes(property.type)) {
    if (Array.isArray(property[type]) && property[type].length !== 0) {
      result = property[type].map((text) => simplifyProperty(text)).join("");
    } else {
      result = "";
    }
  } else if ([
    "url",
    "created_time",
    "checkbox",
    "number",
    "last_edited_time",
    "email",
    "phone_number",
    "date"
  ].includes(property.type)) {
    result = property[type];
  } else if (["created_by", "last_edited_by", "select"].includes(property.type)) {
    result = property[type] ? property[type]?.name : null;
  } else if (["people"].includes(property.type)) {
    if (Array.isArray(property[type])) {
      result = property[type].map((person) => person.person?.email || {});
    } else {
      result = property[type];
    }
  } else if (["multi_select"].includes(property.type)) {
    if (Array.isArray(property[type])) {
      result = property[type].map((e) => e?.name || {});
    } else {
      result = property[type].options.map((e) => e?.name || {});
    }
  } else if (["relation"].includes(property.type)) {
    if (Array.isArray(property[type])) {
      result = property[type].map((e) => e?.id || {});
    } else {
      result = property[type]?.database_id;
    }
  } else if (["formula"].includes(property.type)) {
    result = property[type]?.[property[type]?.type];
  } else if (["rollup"].includes(property.type)) {
    const rollupFunction = property[type]?.function;
    if (rollupFunction.startsWith("count") || rollupFunction.includes("empty")) {
      result = property[type]?.number;
      if (rollupFunction.includes("percent")) {
        result = result * 100;
      }
    } else if (rollupFunction.startsWith("show") && property[type]?.type === "array") {
      const elements = property[type].array.map(simplifyProperty).flat();
      result = rollupFunction === "show_unique" ? [...new Set(elements)] : elements;
    }
  } else if (["files"].includes(property.type)) {
    result = property[type].map(
      (file) => file[file.type]?.url
    );
  } else if (["status"].includes(property.type)) {
    result = property[type]?.name;
  }
  return result;
}
function simplifyProperties(properties) {
  const results = {};
  for (const key of Object.keys(properties)) {
    results[`${key}`] = simplifyProperty(properties[key]);
  }
  return results;
}
function getPropertyTitle(properties) {
  return Object.values(properties).filter((property) => property.type === "title")[0].title[0]?.plain_text || "";
}
function prepend(stringKey, properties) {
  for (const key of Object.keys(properties)) {
    properties[`${stringKey}_${(0, import_change_case.snakeCase)(key)}`] = properties[key];
    delete properties[key];
  }
  return properties;
}
function simplifyObjects(objects, download = false, version = 2) {
  if (!Array.isArray(objects)) {
    objects = [objects];
  }
  const results = [];
  for (const { object, id, properties, parent, title, json, binary, url } of objects) {
    if (object === "page" && (parent.type === "page_id" || parent.type === "workspace")) {
      results.push({
        id,
        name: properties.title.title[0].plain_text,
        ...version === 2 ? { url } : {}
      });
    } else if (object === "page" && parent.type === "database_id") {
      results.push({
        id,
        ...version === 2 ? { name: getPropertyTitle(properties) } : {},
        ...version === 2 ? { url } : {},
        ...version === 2 ? { ...prepend("property", simplifyProperties(properties)) } : { ...simplifyProperties(properties) }
      });
    } else if (download && json.object === "page" && json.parent.type === "database_id") {
      results.push({
        json: {
          id: json.id,
          ...version === 2 ? { name: getPropertyTitle(json.properties) } : {},
          ...version === 2 ? { url: json.url } : {},
          ...version === 2 ? { ...prepend("property", simplifyProperties(json.properties)) } : { ...simplifyProperties(json.properties) }
        },
        binary
      });
    } else if (object === "database") {
      results.push({
        id,
        ...version === 2 ? { name: title[0]?.plain_text || "" } : { title: title[0]?.plain_text || "" },
        ...version === 2 ? { url } : {}
      });
    }
  }
  return results;
}
function getFormattedChildren(children) {
  const results = [];
  for (const child of children) {
    const type = child.type;
    results.push({ [`${type}`]: child, object: "block", type });
  }
  return results;
}
function getConditions() {
  const elements = [];
  const types = {
    title: "rich_text",
    rich_text: "rich_text",
    number: "number",
    checkbox: "checkbox",
    select: "select",
    multi_select: "multi_select",
    status: "status",
    date: "date",
    people: "people",
    files: "files",
    url: "rich_text",
    email: "rich_text",
    phone_number: "rich_text",
    relation: "relation",
    //formula: 'formula',
    created_by: "people",
    created_time: "date",
    last_edited_by: "people",
    last_edited_time: "date"
  };
  const typeConditions = {
    rich_text: [
      "equals",
      "does_not_equal",
      "contains",
      "does_not_contain",
      "starts_with",
      "ends_with",
      "is_empty",
      "is_not_empty"
    ],
    number: [
      "equals",
      "does_not_equal",
      "grater_than",
      "less_than",
      "greater_than_or_equal_to",
      "less_than_or_equal_to",
      "is_empty",
      "is_not_empty"
    ],
    checkbox: ["equals", "does_not_equal"],
    select: ["equals", "does_not_equal", "is_empty", "is_not_empty"],
    multi_select: ["contains", "does_not_equal", "is_empty", "is_not_empty"],
    status: ["equals", "does_not_equal"],
    date: [
      "equals",
      "before",
      "after",
      "on_or_before",
      "is_empty",
      "is_not_empty",
      "on_or_after",
      "past_week",
      "past_month",
      "past_year",
      "next_week",
      "next_month",
      "next_year"
    ],
    people: ["contains", "does_not_contain", "is_empty", "is_not_empty"],
    files: ["is_empty", "is_not_empty"],
    relation: ["contains", "does_not_contain", "is_empty", "is_not_empty"]
  };
  const formula = {
    text: [...typeConditions.rich_text],
    checkbox: [...typeConditions.checkbox],
    number: [...typeConditions.number],
    date: [...typeConditions.date]
  };
  for (const type of Object.keys(types)) {
    elements.push({
      displayName: "Condition",
      name: "condition",
      type: "options",
      displayOptions: {
        show: {
          type: [type]
        }
      },
      options: typeConditions[types[type]].map((entry) => ({
        name: (0, import_change_case.capitalCase)(entry),
        value: entry
      })),
      default: "",
      description: "The value of the property to filter by"
    });
  }
  elements.push({
    displayName: "Return Type",
    name: "returnType",
    type: "options",
    displayOptions: {
      show: {
        type: ["formula"]
      }
    },
    options: Object.keys(formula).map((key) => ({ name: (0, import_change_case.capitalCase)(key), value: key })),
    default: "",
    description: "The formula return type"
  });
  for (const key of Object.keys(formula)) {
    elements.push({
      displayName: "Condition",
      name: "condition",
      type: "options",
      displayOptions: {
        show: {
          type: ["formula"],
          returnType: [key]
        }
      },
      options: formula[key].map((entry) => ({ name: (0, import_change_case.capitalCase)(entry), value: entry })),
      default: "",
      description: "The value of the property to filter by"
    });
  }
  return elements;
}
async function downloadFiles(records, pairedItem) {
  const elements = [];
  for (const record of records) {
    const element = { json: {}, binary: {} };
    element.json = record;
    if (pairedItem) {
      element.pairedItems = pairedItem;
    }
    for (const key of Object.keys(record.properties)) {
      if (record.properties[key].type === "files") {
        if (record.properties[key].files.length) {
          for (const [index, file] of record.properties[key].files.entries()) {
            const data = await notionApiRequest.call(
              this,
              "GET",
              "",
              {},
              {},
              file?.file?.url || file?.external?.url,
              { json: false, encoding: null }
            );
            element.binary[`${key}_${index}`] = await this.helpers.prepareBinaryData(
              data
            );
          }
        }
      }
    }
    if (Object.keys(element.binary).length === 0) {
      delete element.binary;
    }
    elements.push(element);
  }
  return elements;
}
function extractPageId(page = "") {
  if (page.includes("p=")) {
    return page.split("p=")[1];
  } else if (page.includes("-") && page.includes("https")) {
    return page.split("-")[page.split("-").length - 1];
  }
  return page;
}
function getPageId(i) {
  const page = this.getNodeParameter("pageId", i, {});
  let pageId = "";
  if (page.value && typeof page.value === "string") {
    if (page.mode === "id") {
      pageId = page.value;
    } else if (page.value.includes("p=")) {
      pageId = new URLSearchParams(page.value).get("p") || "";
    } else {
      pageId = page.value.match(import_constants.databasePageUrlValidationRegexp)?.[1] || "";
    }
  }
  if (!pageId) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      "Could not extract page ID from URL: " + page.value
    );
  }
  return pageId;
}
function extractDatabaseId(database) {
  if (database.includes("?v=")) {
    const data = database.split("?v=")[0].split("/");
    const index = data.length - 1;
    return data[index];
  } else if (database.includes("/")) {
    const index = database.split("/").length - 1;
    return database.split("/")[index];
  } else {
    return database;
  }
}
function getSearchFilters(resource) {
  return [
    {
      displayName: "Filter",
      name: "filterType",
      type: "options",
      options: [
        {
          name: "None",
          value: "none"
        },
        {
          name: "Build Manually",
          value: "manual"
        },
        {
          name: "JSON",
          value: "json"
        }
      ],
      displayOptions: {
        show: {
          resource: [resource],
          operation: ["getAll"]
        },
        hide: {
          "@version": [1]
        }
      },
      default: "none"
    },
    {
      displayName: "Must Match",
      name: "matchType",
      type: "options",
      options: [
        {
          name: "Any filter",
          value: "anyFilter"
        },
        {
          name: "All Filters",
          value: "allFilters"
        }
      ],
      displayOptions: {
        show: {
          resource: [resource],
          operation: ["getAll"],
          filterType: ["manual"]
        },
        hide: {
          "@version": [1]
        }
      },
      default: "anyFilter"
    },
    {
      displayName: "Filters",
      name: "filters",
      type: "fixedCollection",
      typeOptions: {
        multipleValues: true
      },
      displayOptions: {
        show: {
          resource: [resource],
          operation: ["getAll"],
          filterType: ["manual"]
        },
        hide: {
          "@version": [1]
        }
      },
      default: {},
      placeholder: "Add Condition",
      options: [
        {
          displayName: "Conditions",
          name: "conditions",
          values: [...(0, import_Filters.filters)(getConditions())]
        }
      ]
    },
    {
      displayName: 'See <a href="https://developers.notion.com/reference/post-database-query#post-database-query-filter" target="_blank">Notion guide</a> to creating filters',
      name: "jsonNotice",
      type: "notice",
      displayOptions: {
        show: {
          resource: [resource],
          operation: ["getAll"],
          filterType: ["json"]
        },
        hide: {
          "@version": [1]
        }
      },
      default: ""
    },
    {
      displayName: "Filters (JSON)",
      name: "filterJson",
      type: "string",
      displayOptions: {
        show: {
          resource: [resource],
          operation: ["getAll"],
          filterType: ["json"]
        },
        hide: {
          "@version": [1]
        }
      },
      default: ""
    }
  ];
}
function validateJSON(json) {
  let result;
  try {
    result = JSON.parse(json);
  } catch (exception) {
    result = void 0;
  }
  return result;
}
function extractDatabaseMentionRLC(blockValues) {
  blockValues.forEach((bv) => {
    if (bv.richText && bv.text) {
      const texts = bv.text.text;
      texts.forEach((txt) => {
        if (txt.textType === "mention" && txt.mentionType === "database") {
          if (typeof txt.database === "object" && txt.database.__rl) {
            if (txt.database.__regex) {
              const regex = new RegExp(txt.database.__regex);
              const extracted = regex.exec(txt.database.value);
              txt.database = extracted[1];
            } else {
              txt.database = txt.database.value;
            }
          }
        }
      });
    }
  });
}
function simplifyBlocksOutput(blocks, rootId) {
  for (const block of blocks) {
    const type = block.type;
    block.root_id = rootId;
    ["created_time", "last_edited_time", "created_by"].forEach((key) => {
      delete block[key];
    });
    try {
      if (["code"].includes(type)) {
        const text2 = block[type].text;
        if (text2 && Array.isArray(text2)) {
          const content = text2.map((entry) => entry.plain_text || "").join("");
          block.content = content;
          delete block[type];
        }
        continue;
      }
      if (["child_page", "child_database"].includes(type)) {
        const content = block[type].title;
        block.content = content;
        delete block[type];
        continue;
      }
      const text = block[type]?.text;
      if (text && Array.isArray(text)) {
        const content = text.map((entry) => entry.plain_text || "").join("");
        block.content = content;
        delete block[type];
      }
    } catch (e) {
      continue;
    }
  }
  return blocks;
}
function extractBlockId(nodeVersion, itemIndex) {
  let blockId;
  if (nodeVersion < 2.2) {
    blockId = extractPageId(
      this.getNodeParameter("blockId", itemIndex, "", { extractValue: true })
    );
  } else {
    const blockIdRLCData = this.getNodeParameter("blockId", itemIndex, {});
    if (blockIdRLCData.mode === "id") {
      blockId = blockIdRLCData.value;
    } else {
      const blockRegex = /https:\/\/www\.notion\.so\/.+\?pvs=[0-9]+#([a-f0-9]{2,})/;
      const match = blockIdRLCData.value.match(blockRegex);
      if (match === null) {
        const pageRegex = new RegExp(import_constants.blockUrlExtractionRegexp);
        const pageMatch = blockIdRLCData.value.match(pageRegex);
        if (pageMatch === null) {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            "Invalid URL, could not find block ID or page ID",
            {
              itemIndex
            }
          );
        } else {
          blockId = extractPageId(pageMatch[1]);
        }
      } else {
        blockId = match[1];
      }
    }
  }
  return blockId;
}
const prepareNotionError = (node, error, itemIndex) => {
  if (error instanceof import_n8n_workflow.NodeApiError) {
    (0, import_set.default)(error, "context.itemIndex", itemIndex);
    return error;
  }
  if (error instanceof import_n8n_workflow.NodeOperationError && error?.context?.itemIndex === void 0) {
    (0, import_set.default)(error, "context.itemIndex", itemIndex);
    return error;
  }
  return new import_n8n_workflow.NodeOperationError(node, error, { itemIndex });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadFiles,
  extractBlockId,
  extractDatabaseId,
  extractDatabaseMentionRLC,
  extractPageId,
  formatBlocks,
  formatText,
  formatTitle,
  getBlockTypesOptions,
  getConditions,
  getFormattedChildren,
  getPageId,
  getPropertyTitle,
  getSearchFilters,
  mapFilters,
  mapProperties,
  mapSorting,
  notionApiRequest,
  notionApiRequestAllItems,
  notionApiRequestGetBlockChildrens,
  prepareNotionError,
  simplifyBlocksOutput,
  simplifyObjects,
  simplifyProperties,
  validateJSON
});
//# sourceMappingURL=GenericFunctions.js.map