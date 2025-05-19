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
var loadOptions_exports = {};
__export(loadOptions_exports, {
  loadAlertFields: () => loadAlertFields,
  loadAlertStatus: () => loadAlertStatus,
  loadAnalyzers: () => loadAnalyzers,
  loadCaseAttachments: () => loadCaseAttachments,
  loadCaseFields: () => loadCaseFields,
  loadCaseStatus: () => loadCaseStatus,
  loadCaseTemplate: () => loadCaseTemplate,
  loadCustomFields: () => loadCustomFields,
  loadLogAttachments: () => loadLogAttachments,
  loadObservableFields: () => loadObservableFields,
  loadObservableTypes: () => loadObservableTypes,
  loadResponders: () => loadResponders,
  loadTaskFields: () => loadTaskFields,
  loadUsers: () => loadUsers
});
module.exports = __toCommonJS(loadOptions_exports);
var import_constants = require("../helpers/constants");
var import_transport = require("../transport");
async function loadResponders() {
  let resource = this.getNodeParameter("resource");
  let resourceId = "";
  if (["case", "alert", "observable", "log", "task"].includes(resource)) {
    resourceId = this.getNodeParameter("id", "", { extractValue: true });
  } else {
    resourceId = this.getNodeParameter("id");
  }
  switch (resource) {
    case "observable":
      resource = "case_artifact";
      break;
    case "task":
      resource = "case_task";
      break;
    case "log":
      resource = "case_task_log";
      break;
  }
  const responders = await import_transport.theHiveApiRequest.call(
    this,
    "GET",
    `/connector/cortex/responder/${resource}/${resourceId}`
  );
  const returnData = [];
  for (const responder of responders) {
    returnData.push({
      name: responder.name,
      value: responder.id,
      description: responder.description
    });
  }
  return returnData;
}
async function loadAnalyzers() {
  const returnData = [];
  const dataType = this.getNodeParameter("dataType");
  const requestResult = await import_transport.theHiveApiRequest.call(
    this,
    "GET",
    `/connector/cortex/analyzer/type/${dataType}`
  );
  for (const analyzer of requestResult) {
    for (const cortexId of analyzer.cortexIds) {
      returnData.push({
        name: `[${cortexId}] ${analyzer.name}`,
        value: `${analyzer.id}::${cortexId}`,
        description: analyzer.description
      });
    }
  }
  return returnData;
}
async function loadCustomFields() {
  const requestResult = await import_transport.theHiveApiRequest.call(this, "GET", "/customField");
  const returnData = [];
  for (const field of requestResult) {
    returnData.push({
      name: `Custom Field: ${field.displayName || field.name}`,
      value: `customFields.${field.name}`
      // description: `${field.type}: ${field.description}`,
    });
  }
  return returnData;
}
async function loadObservableTypes() {
  const returnData = [];
  const body = {
    query: [
      {
        _name: "listObservableType"
      }
    ]
  };
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body);
  for (const entry of response) {
    returnData.push({
      name: `${entry.name}${entry.isAttachment ? " (attachment)" : ""}`,
      value: entry.name
    });
  }
  return returnData;
}
async function loadCaseAttachments() {
  const returnData = [];
  const caseId = this.getNodeParameter("caseId", "", { extractValue: true });
  const body = {
    query: [
      {
        _name: "getCase",
        idOrName: caseId
      },
      {
        _name: "attachments"
      }
    ]
  };
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body);
  for (const entry of response) {
    returnData.push({
      name: entry.name,
      value: entry._id,
      description: `Content-Type: ${entry.contentType}`
    });
  }
  return returnData;
}
async function loadLogAttachments() {
  const returnData = [];
  const logId = this.getNodeParameter("logId", "", { extractValue: true });
  const body = {
    query: [
      {
        _name: "getLog",
        idOrName: logId
      }
    ]
  };
  const [response] = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body);
  for (const entry of response.attachments || []) {
    returnData.push({
      name: entry.name,
      value: entry._id,
      description: `Content-Type: ${entry.contentType}`
    });
  }
  return returnData;
}
async function loadAlertStatus() {
  const returnData = [];
  const body = {
    query: [
      {
        _name: "listAlertStatus"
      }
    ]
  };
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body);
  for (const entry of response) {
    returnData.push({
      name: entry.value,
      value: entry.value,
      description: `Stage: ${entry.stage}`
    });
  }
  return returnData.sort((a, b) => a.name.localeCompare(b.name));
}
async function loadCaseStatus() {
  const returnData = [];
  const body = {
    query: [
      {
        _name: "listCaseStatus"
      }
    ]
  };
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body);
  for (const entry of response) {
    returnData.push({
      name: entry.value,
      value: entry.value,
      description: `Stage: ${entry.stage}`
    });
  }
  return returnData.sort((a, b) => a.name.localeCompare(b.name));
}
async function loadCaseTemplate() {
  const returnData = [];
  const body = {
    query: [
      {
        _name: "listCaseTemplate"
      }
    ]
  };
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body);
  for (const entry of response) {
    returnData.push({
      name: entry.displayName || entry.name,
      value: entry.name
    });
  }
  return returnData;
}
async function loadUsers() {
  const returnData = [];
  const body = {
    query: [
      {
        _name: "listUser"
      }
    ]
  };
  const response = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", body);
  for (const entry of response) {
    returnData.push({
      name: entry.name,
      value: entry.login
    });
  }
  return returnData;
}
async function loadAlertFields() {
  const returnData = [];
  const excludeFields = ["addTags", "removeTags"];
  const fields = import_constants.alertCommonFields.filter((entry) => !excludeFields.includes(entry.id)).map((entry) => {
    const field = {
      name: entry.displayName || entry.id,
      value: entry.id
    };
    return field;
  });
  const customFields = await loadCustomFields.call(this);
  returnData.push(...fields, ...customFields);
  return returnData;
}
async function loadCaseFields() {
  const returnData = [];
  const excludeFields = ["addTags", "removeTags", "taskRule", "observableRule"];
  const fields = import_constants.caseCommonFields.filter((entry) => !excludeFields.includes(entry.id)).map((entry) => {
    const field = {
      name: entry.displayName || entry.id,
      value: entry.id
    };
    return field;
  });
  const customFields = await loadCustomFields.call(this);
  returnData.push(...fields, ...customFields);
  return returnData;
}
async function loadObservableFields() {
  const returnData = [];
  const excludeFields = ["addTags", "removeTags", "zipPassword"];
  const fields = import_constants.observableCommonFields.filter((entry) => !excludeFields.includes(entry.id)).map((entry) => {
    const field = {
      name: entry.displayName || entry.id,
      value: entry.id
    };
    return field;
  });
  returnData.push(...fields);
  return returnData;
}
async function loadTaskFields() {
  const fields = import_constants.taskCommonFields.map((entry) => {
    const field = {
      name: entry.displayName || entry.id,
      value: entry.id
    };
    return field;
  });
  return fields;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadAlertFields,
  loadAlertStatus,
  loadAnalyzers,
  loadCaseAttachments,
  loadCaseFields,
  loadCaseStatus,
  loadCaseTemplate,
  loadCustomFields,
  loadLogAttachments,
  loadObservableFields,
  loadObservableTypes,
  loadResponders,
  loadTaskFields,
  loadUsers
});
//# sourceMappingURL=loadOptions.js.map