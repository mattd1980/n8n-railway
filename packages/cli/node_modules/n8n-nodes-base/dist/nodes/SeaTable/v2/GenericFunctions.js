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
  dtableSchemaColumns: () => dtableSchemaColumns,
  dtableSchemaIsColumn: () => dtableSchemaIsColumn,
  enrichColumns: () => enrichColumns,
  getBaseAccessToken: () => getBaseAccessToken,
  getBaseCollaborators: () => getBaseCollaborators,
  getTableColumns: () => getTableColumns,
  nameOfPredicate: () => nameOfPredicate,
  resolveBaseUri: () => resolveBaseUri,
  rowExport: () => rowExport,
  seaTableApiRequest: () => seaTableApiRequest,
  simplify_new: () => simplify_new,
  split: () => split,
  splitStringColumnsToArrays: () => splitStringColumnsToArrays,
  updateAble: () => updateAble
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_Schema = require("./Schema");
const userBaseUri = (uri) => {
  if (uri === void 0) return uri;
  if (uri.endsWith("/")) return uri.slice(0, -1);
  return uri;
};
function resolveBaseUri(ctx) {
  return ctx?.credentials?.environment === "cloudHosted" ? "https://cloud.seatable.io" : userBaseUri(ctx?.credentials?.domain);
}
async function getBaseAccessToken(ctx) {
  if (ctx?.base?.access_token !== void 0) return;
  const options = {
    headers: {
      Authorization: `Token ${ctx?.credentials?.token}`
    },
    url: `${resolveBaseUri(ctx)}/api/v2.1/dtable/app-access-token/`,
    json: true
  };
  ctx.base = await this.helpers.httpRequest(options);
}
function endpointCtxExpr(ctx, endpoint) {
  const endpointVariables = {};
  endpointVariables.access_token = ctx?.base?.access_token;
  endpointVariables.dtable_uuid = ctx?.base?.dtable_uuid;
  return endpoint.replace(
    /{{ *(access_token|dtable_uuid|server) *}}/g,
    (match, name) => {
      return endpointVariables[name] || match;
    }
  );
}
async function seaTableApiRequest(ctx, method, endpoint, body = {}, qs = {}, url = "", option = {}) {
  const credentials = await this.getCredentials("seaTableApi");
  ctx.credentials = credentials;
  await getBaseAccessToken.call(this, ctx);
  const token = endpoint.indexOf("/api/v2.1/dtable/app-download-link/") === 0 || endpoint == "/api/v2.1/dtable/app-upload-link/" || endpoint.indexOf("/seafhttp/upload-api") === 0 ? `${ctx?.credentials?.token}` : `${ctx?.base?.access_token}`;
  let options = {
    uri: url || `${resolveBaseUri(ctx)}${endpointCtxExpr(ctx, endpoint)}`,
    headers: {
      Authorization: `Token ${token}`
    },
    method,
    qs,
    body,
    json: true
  };
  if (Object.keys(option).length !== 0) {
    options = Object.assign({}, options, option);
  }
  if (endpoint.indexOf("/seafhttp/files/") === 0) {
    delete options.headers;
  }
  if (endpoint.indexOf("/seafhttp/upload-api") === 0) {
    options.json = true;
    options.headers = {
      ...options.headers,
      "Content-Type": "multipart/form-data"
    };
  }
  if (Object.keys(body).length === 0) {
    delete options.body;
  }
  try {
    return await this.helpers.requestWithAuthentication.call(this, "seaTableApi", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function getBaseCollaborators() {
  const collaboratorsResult = await seaTableApiRequest.call(
    this,
    {},
    "GET",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/related-users/"
  );
  const collaborators = collaboratorsResult.user_list || [];
  return collaborators;
}
async function getTableColumns(tableName, ctx = {}) {
  const {
    metadata: { tables }
  } = await seaTableApiRequest.call(
    this,
    ctx,
    "GET",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/metadata"
  );
  for (const table of tables) {
    if (table.name === tableName) {
      return table.columns;
    }
  }
  return [];
}
function simplify_new(row) {
  for (const key of Object.keys(row)) {
    if (key.startsWith("_")) delete row[key];
  }
  return row;
}
const namePredicate = (name) => (named) => named.name === name;
const nameOfPredicate = (names) => (name) => names.find(namePredicate(name));
const normalize = (subject) => subject ? subject.normalize() : "";
const split = (subject) => normalize(subject).split(/\s*((?:[^\\,]*?(?:\\[\s\S])*)*?)\s*(?:,|$)/).filter((s) => s.length).map((s) => s.replace(/\\([\s\S])/gm, (_, $1) => $1));
function getCollaboratorInfo(authLocal, collaboratorList) {
  return collaboratorList.find((singleCollaborator) => singleCollaborator.email === authLocal) || {
    contact_email: "unknown",
    name: "unknown",
    email: "unknown"
  };
}
function getAssetPath(type, url) {
  const parts = url.split(`/${type}/`);
  if (parts[1]) {
    return "/" + type + "/" + parts[1];
  }
  return url;
}
function enrichColumns(row, metadata, collaboratorList) {
  Object.keys(row).forEach((key) => {
    const columnDef = metadata.find((obj) => obj.name === key || obj.key === key);
    if (columnDef?.type === "collaborator") {
      const collaborators = row[key] || [];
      if (collaborators.length > 0) {
        const newArray = collaborators.map((email) => {
          const collaboratorDetails = getCollaboratorInfo(email, collaboratorList);
          const newColl = {
            email,
            contact_email: collaboratorDetails.contact_email,
            name: collaboratorDetails.name
          };
          return newColl;
        });
        row[key] = newArray;
      }
    }
    if (columnDef?.type === "last-modifier" || columnDef?.type === "creator" || columnDef?.key === "_creator" || columnDef?.key === "_last_modifier") {
      const collaboratorDetails = getCollaboratorInfo(row[key], collaboratorList);
      row[key] = {
        email: row[key],
        contact_email: collaboratorDetails.contact_email,
        name: collaboratorDetails.name
      };
    }
    if (columnDef?.type === "image") {
      const pictures = row[key] || [];
      if (pictures.length > 0) {
        const newArray = pictures.map((url) => ({
          name: url.split("/").pop(),
          size: 0,
          type: "image",
          url,
          path: getAssetPath("images", url)
        }));
        row[key] = newArray;
      }
    }
    if (columnDef?.type === "file") {
      const files = row[key] || [];
      files.forEach((file) => {
        file.path = getAssetPath("files", file.url);
      });
    }
    if (columnDef?.type === "digital-sign") {
      const digitalSignature = row[key];
      const collaboratorDetails = getCollaboratorInfo(digitalSignature?.username, collaboratorList);
      if (digitalSignature?.username) {
        digitalSignature.contact_email = collaboratorDetails.contact_email;
        digitalSignature.name = collaboratorDetails.name;
      }
    }
    if (columnDef?.type === "button") {
      delete row[key];
    }
  });
  return row;
}
function splitStringColumnsToArrays(row, columns) {
  columns.map((column) => {
    if (column.type === "collaborator" || column.type === "multiple-select") {
      if (typeof row[column.name] === "string") {
        const input = row[column.name];
        row[column.name] = input.split(",").map((item) => item.trim());
      }
    }
    if (column.type === "number") {
      if (typeof row[column.name] === "string") {
        const input = row[column.name];
        row[column.name] = parseFloat(input);
      }
    }
    if (column.type === "rate" || column.type === "duration") {
      if (typeof row[column.name] === "string") {
        const input = row[column.name];
        row[column.name] = parseInt(input);
      }
    }
    if (column.type === "checkbox") {
      if (typeof row[column.name] === "string") {
        const input = row[column.name];
        row[column.name] = false;
        if (input === "true" || input === "on" || input === "1") {
          row[column.name] = true;
        }
      }
    }
  });
  return row;
}
function rowExport(row, columns) {
  const rowAllowed = {};
  columns.map((column) => {
    if (row[column.name]) {
      rowAllowed[column.name] = row[column.name];
    }
  });
  return rowAllowed;
}
const dtableSchemaIsColumn = (column) => !!import_Schema.schema.columnTypes[column.type];
const dtableSchemaIsUpdateAbleColumn = (column) => !!import_Schema.schema.columnTypes[column.type] && !import_Schema.schema.nonUpdateAbleColumnTypes[column.type];
const dtableSchemaColumns = (columns) => columns.filter(dtableSchemaIsColumn);
const updateAble = (columns) => columns.filter(dtableSchemaIsUpdateAbleColumn);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dtableSchemaColumns,
  dtableSchemaIsColumn,
  enrichColumns,
  getBaseAccessToken,
  getBaseCollaborators,
  getTableColumns,
  nameOfPredicate,
  resolveBaseUri,
  rowExport,
  seaTableApiRequest,
  simplify_new,
  split,
  splitStringColumnsToArrays,
  updateAble
});
//# sourceMappingURL=GenericFunctions.js.map