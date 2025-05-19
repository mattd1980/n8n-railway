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
  getFields: () => getFields,
  getPortals: () => getPortals,
  getScripts: () => getScripts,
  getToken: () => getToken,
  layoutsApiRequest: () => layoutsApiRequest,
  logout: () => logout,
  parseFields: () => parseFields,
  parsePortals: () => parsePortals,
  parseQuery: () => parseQuery,
  parseScripts: () => parseScripts,
  parseSort: () => parseSort
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
async function getToken() {
  const credentials = await this.getCredentials("fileMaker");
  const host = credentials.host;
  const db = credentials.db;
  const login = credentials.login;
  const password = credentials.password;
  const url = `https://${host}/fmi/data/v1/databases/${db}/sessions`;
  const requestOptions = {
    uri: url,
    headers: {},
    method: "POST",
    json: true
    //rejectUnauthorized: !this.getNodeParameter('allowUnauthorizedCerts', itemIndex, false) as boolean,
  };
  requestOptions.auth = {
    user: login,
    pass: password
  };
  requestOptions.body = {
    fmDataSource: [
      {
        database: host,
        username: login,
        password
      }
    ]
  };
  try {
    const response = await this.helpers.request(requestOptions);
    if (typeof response === "string") {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        "DataAPI response body is not valid JSON. Is the DataAPI enabled?"
      );
    }
    return response.response.token;
  } catch (error) {
    let message;
    if (error.statusCode === 502) {
      message = "The server is not responding. Is the DataAPI enabled?";
    } else if (error.error) {
      message = error.error.messages[0].code + " - " + error.error.messages[0].message;
    } else {
      message = error.message;
    }
    throw new import_n8n_workflow.ApplicationError(message, { level: "warning" });
  }
}
function parseLayouts(layouts) {
  const returnData = [];
  for (const layout of layouts) {
    if (layout.isFolder) {
      returnData.push(...parseLayouts(layout.folderLayoutNames));
    } else {
      returnData.push({
        name: layout.name,
        value: layout.name
      });
    }
  }
  return returnData;
}
async function layoutsApiRequest() {
  const token = await getToken.call(this);
  const credentials = await this.getCredentials("fileMaker");
  const host = credentials.host;
  const db = credentials.db;
  const url = `https://${host}/fmi/data/v1/databases/${db}/layouts`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: "GET",
    uri: url,
    json: true
  };
  try {
    const responseData = await this.helpers.request(options);
    const items = parseLayouts(responseData.response.layouts);
    items.sort((a, b) => a.name > b.name ? 0 : 1);
    return items;
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getFields() {
  const token = await getToken.call(this);
  const credentials = await this.getCredentials("fileMaker");
  const layout = this.getCurrentNodeParameter("layout");
  const host = credentials.host;
  const db = credentials.db;
  const url = `https://${host}/fmi/data/v1/databases/${db}/layouts/${layout}`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: "GET",
    uri: url,
    json: true
  };
  const responseData = await this.helpers.request(options);
  return responseData.response.fieldMetaData;
}
async function getPortals() {
  const token = await getToken.call(this);
  const credentials = await this.getCredentials("fileMaker");
  const layout = this.getCurrentNodeParameter("layout");
  const host = credentials.host;
  const db = credentials.db;
  const url = `https://${host}/fmi/data/v1/databases/${db}/layouts/${layout}`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: "GET",
    uri: url,
    json: true
  };
  const responseData = await this.helpers.request(options);
  return responseData.response.portalMetaData;
}
function parseScriptsList(scripts) {
  const returnData = [];
  for (const script of scripts) {
    if (script.isFolder) {
      returnData.push(...parseScriptsList(script.folderScriptNames));
    } else if (script.name !== "-") {
      returnData.push({
        name: script.name,
        value: script.name
      });
    }
  }
  return returnData;
}
async function getScripts() {
  const token = await getToken.call(this);
  const credentials = await this.getCredentials("fileMaker");
  const host = credentials.host;
  const db = credentials.db;
  const url = `https://${host}/fmi/data/v1/databases/${db}/scripts`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: "GET",
    uri: url,
    json: true
  };
  const responseData = await this.helpers.request(options);
  const items = parseScriptsList(responseData.response.scripts);
  items.sort((a, b) => a.name > b.name ? 0 : 1);
  return items;
}
async function logout(token) {
  const credentials = await this.getCredentials("fileMaker");
  const host = credentials.host;
  const db = credentials.db;
  const url = `https://${host}/fmi/data/v1/databases/${db}/sessions/${token}`;
  const requestOptions = {
    uri: url,
    headers: {},
    method: "DELETE",
    json: true
    //rejectUnauthorized: !this.getNodeParameter('allowUnauthorizedCerts', itemIndex, false) as boolean,
  };
  const response = await this.helpers.request(requestOptions);
  return response;
}
function parseSort(i) {
  let sort;
  const setSort = this.getNodeParameter("setSort", i, false);
  if (!setSort) {
    sort = null;
  } else {
    sort = [];
    const sortParametersUi = this.getNodeParameter("sortParametersUi", i, {});
    if (sortParametersUi.rules !== void 0) {
      for (const parameterData of sortParametersUi.rules) {
        sort.push({
          fieldName: parameterData.name,
          sortOrder: parameterData.value
        });
      }
    }
  }
  return sort;
}
function parseScripts(i) {
  const setScriptAfter = this.getNodeParameter("setScriptAfter", i, false);
  const setScriptBefore = this.getNodeParameter("setScriptBefore", i, false);
  const setScriptSort = this.getNodeParameter("setScriptSort", i, false);
  if (!setScriptAfter && setScriptBefore && setScriptSort) {
    return {};
  } else {
    const scripts = {};
    if (setScriptAfter) {
      scripts.script = this.getNodeParameter("scriptAfter", i);
      scripts["script.param"] = this.getNodeParameter("scriptAfter", i);
    }
    if (setScriptBefore) {
      scripts["script.prerequest"] = this.getNodeParameter("scriptBefore", i);
      scripts["script.prerequest.param"] = this.getNodeParameter("scriptBeforeParam", i);
    }
    if (setScriptSort) {
      scripts["script.presort"] = this.getNodeParameter("scriptSort", i);
      scripts["script.presort.param"] = this.getNodeParameter("scriptSortParam", i);
    }
    return scripts;
  }
}
function parsePortals(i) {
  let portals;
  const getPortalsData = this.getNodeParameter("getPortals", i);
  if (!getPortalsData) {
    portals = [];
  } else {
    portals = this.getNodeParameter("portals", i);
  }
  return portals;
}
function parseQuery(i) {
  let queries;
  const queriesParamUi = this.getNodeParameter("queries", i, {});
  if (queriesParamUi.query !== void 0) {
    queries = [];
    for (const queryParam of queriesParamUi.query) {
      const query = {
        omit: queryParam.omit ? "true" : "false"
      };
      for (const field of queryParam.fields.field) {
        query[field.name] = field.value;
      }
      queries.push(query);
    }
  } else {
    queries = null;
  }
  return queries;
}
function parseFields(i) {
  let fieldData;
  const fieldsParametersUi = this.getNodeParameter("fieldsParametersUi", i, {});
  if (fieldsParametersUi.fields !== void 0) {
    fieldData = {};
    for (const field of fieldsParametersUi.fields) {
      fieldData[field.name] = field.value;
    }
  } else {
    fieldData = null;
  }
  return fieldData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFields,
  getPortals,
  getScripts,
  getToken,
  layoutsApiRequest,
  logout,
  parseFields,
  parsePortals,
  parseQuery,
  parseScripts,
  parseSort
});
//# sourceMappingURL=GenericFunctions.js.map