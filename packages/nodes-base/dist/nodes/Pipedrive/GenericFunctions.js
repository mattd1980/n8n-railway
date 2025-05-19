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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  pipedriveApiRequest: () => pipedriveApiRequest,
  pipedriveApiRequestAllItems: () => pipedriveApiRequestAllItems,
  pipedriveEncodeCustomProperties: () => pipedriveEncodeCustomProperties,
  pipedriveGetCustomProperties: () => pipedriveGetCustomProperties,
  pipedriveResolveCustomProperties: () => pipedriveResolveCustomProperties,
  sortOptionParameters: () => sortOptionParameters
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function pipedriveApiRequest(method, endpoint, body, query = {}, formData, downloadFile) {
  const authenticationMethod = this.getNodeParameter("authentication", 0);
  const options = {
    headers: {
      Accept: "application/json"
    },
    method,
    qs: query,
    uri: `https://api.pipedrive.com/v1${endpoint}`
  };
  if (downloadFile === true) {
    options.encoding = null;
  } else {
    options.json = true;
  }
  if (Object.keys(body).length !== 0) {
    options.body = body;
  }
  if (formData !== void 0 && Object.keys(formData).length !== 0) {
    options.formData = formData;
  }
  if (query === void 0) {
    query = {};
  }
  try {
    const credentialType = authenticationMethod === "apiToken" ? "pipedriveApi" : "pipedriveOAuth2Api";
    const responseData = await this.helpers.requestWithAuthentication.call(
      this,
      credentialType,
      options
    );
    if (downloadFile === true) {
      return {
        data: responseData
      };
    }
    if (responseData.success === false) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData);
    }
    return {
      additionalData: responseData.additional_data,
      data: responseData.data === null ? [] : responseData.data
    };
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function pipedriveApiRequestAllItems(method, endpoint, body, query) {
  if (query === void 0) {
    query = {};
  }
  query.limit = 100;
  query.start = 0;
  const returnData = [];
  let responseData;
  do {
    responseData = await pipedriveApiRequest.call(this, method, endpoint, body, query);
    if (responseData.data.items) {
      returnData.push.apply(returnData, responseData.data.items);
    } else {
      returnData.push.apply(returnData, responseData.data);
    }
    query.start = responseData.additionalData.pagination.next_start;
  } while (responseData.additionalData?.pagination?.more_items_in_collection === true);
  return {
    data: returnData
  };
}
async function pipedriveGetCustomProperties(resource) {
  const endpoints = {
    activity: "/activityFields",
    deal: "/dealFields",
    organization: "/organizationFields",
    person: "/personFields",
    product: "/productFields"
  };
  if (endpoints[resource] === void 0) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `The resource "${resource}" is not supported for resolving custom values!`
    );
  }
  const requestMethod = "GET";
  const body = {};
  const qs = {};
  const responseData = await pipedriveApiRequest.call(
    this,
    requestMethod,
    endpoints[resource],
    body,
    qs
  );
  const customProperties = {};
  for (const customPropertyData of responseData.data) {
    customProperties[customPropertyData.key] = customPropertyData;
  }
  return customProperties;
}
function pipedriveEncodeCustomProperties(customProperties, item) {
  let customPropertyData;
  for (const key of Object.keys(item)) {
    customPropertyData = Object.values(customProperties).find(
      (propertyData) => propertyData.name === key
    );
    if (customPropertyData !== void 0) {
      if (item[key] !== null && item[key] !== void 0 && customPropertyData.options !== void 0 && Array.isArray(customPropertyData.options)) {
        const propertyOption = customPropertyData.options.find(
          (option) => option.label.toString() === item[key].toString()
        );
        if (propertyOption !== void 0) {
          item[customPropertyData.key] = propertyOption.id;
          delete item[key];
        }
      } else {
        item[customPropertyData.key] = item[key];
        delete item[key];
      }
    }
  }
}
function pipedriveResolveCustomProperties(customProperties, item) {
  let customPropertyData;
  const json = item.json;
  for (const [key, value] of Object.entries(json)) {
    if (customProperties[key] !== void 0) {
      customPropertyData = customProperties[key];
      if (value === null) {
        json[customPropertyData.name] = value;
        delete json[key];
        continue;
      }
      if ([
        "date",
        "address",
        "double",
        "monetary",
        "org",
        "people",
        "phone",
        "text",
        "time",
        "user",
        "varchar",
        "varchar_auto",
        "int",
        "time",
        "timerange"
      ].includes(customPropertyData.field_type)) {
        json[customPropertyData.name] = value;
        delete json[key];
      } else if (["enum", "visible_to"].includes(customPropertyData.field_type) && customPropertyData.options) {
        const propertyOption = customPropertyData.options.find(
          (option) => option.id.toString() === value?.toString()
        );
        if (propertyOption !== void 0) {
          json[customPropertyData.name] = propertyOption.label;
          delete json[key];
        }
      } else if (["set"].includes(customPropertyData.field_type) && customPropertyData.options && typeof value === "string") {
        const selectedIds = value.split(",");
        const selectedLabels = customPropertyData.options.filter((option) => selectedIds.includes(option.id.toString())).map((option) => option.label);
        json[customPropertyData.name] = selectedLabels;
        delete json[key];
      }
    }
  }
  item.json = json;
}
function sortOptionParameters(optionParameters) {
  optionParameters.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
  return optionParameters;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pipedriveApiRequest,
  pipedriveApiRequestAllItems,
  pipedriveEncodeCustomProperties,
  pipedriveGetCustomProperties,
  pipedriveResolveCustomProperties,
  sortOptionParameters
});
//# sourceMappingURL=GenericFunctions.js.map