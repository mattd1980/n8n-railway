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
var resourceMapping_exports = {};
__export(resourceMapping_exports, {
  getAlertFields: () => getAlertFields,
  getAlertUpdateFields: () => getAlertUpdateFields,
  getCaseFields: () => getCaseFields,
  getCaseUpdateFields: () => getCaseUpdateFields,
  getLogFields: () => getLogFields,
  getObservableFields: () => getObservableFields,
  getObservableUpdateFields: () => getObservableUpdateFields,
  getTaskFields: () => getTaskFields,
  getTaskUpdateFields: () => getTaskUpdateFields
});
module.exports = __toCommonJS(resourceMapping_exports);
var import_loadOptions = require("./loadOptions");
var import_constants = require("../helpers/constants");
var import_transport = require("../transport");
async function getCustomFields() {
  const customFields = await import_transport.theHiveApiRequest.call(this, "POST", "/v1/query", {
    query: [
      {
        _name: "listCustomField"
      }
    ]
  });
  return customFields.map((field) => ({
    displayName: `Custom Field: ${field.displayName || field.name}`,
    id: `customFields.${field.name}`,
    required: false,
    display: true,
    type: field.options?.length ? "options" : field.type,
    defaultMatch: false,
    options: field.options?.length ? field.options.map((option) => ({ name: option, value: option })) : void 0,
    removed: true
  }));
}
async function getAlertFields() {
  const alertStatus = await import_loadOptions.loadAlertStatus.call(this);
  const caseTemplates = await import_loadOptions.loadCaseTemplate.call(this);
  const requiredFields = ["title", "description", "type", "source", "sourceRef"];
  const excludeFields = ["addTags", "removeTags", "lastSyncDate"];
  const fields = import_constants.alertCommonFields.filter((entry) => !excludeFields.includes(entry.id)).map((entry) => {
    const type = entry.type;
    const field = {
      ...entry,
      type,
      required: false,
      display: true,
      defaultMatch: false
    };
    if (requiredFields.includes(entry.id)) {
      field.required = true;
    }
    if (field.id === "status") {
      field.options = alertStatus;
    }
    if (field.id === "caseTemplate") {
      field.options = caseTemplates;
    }
    return field;
  });
  const customFields = await getCustomFields.call(this) || [];
  fields.push(...customFields);
  const columnData = {
    fields
  };
  return columnData;
}
async function getAlertUpdateFields() {
  const alertStatus = await import_loadOptions.loadAlertStatus.call(this);
  const excludedFromMatching = ["addTags", "removeTags"];
  const excludeFields = ["flag", "caseTemplate"];
  const alertUpdateFields = import_constants.alertCommonFields.filter((entry) => !excludeFields.includes(entry.id)).map((entry) => {
    const type = entry.type;
    const field = {
      ...entry,
      type,
      required: false,
      display: true,
      defaultMatch: false,
      canBeUsedToMatch: true
    };
    if (excludedFromMatching.includes(field.id)) {
      field.canBeUsedToMatch = false;
    }
    if (field.id === "status") {
      field.options = alertStatus;
    }
    return field;
  });
  const fields = [
    {
      displayName: "ID",
      id: "id",
      required: false,
      display: true,
      type: "string",
      defaultMatch: true,
      canBeUsedToMatch: true
    },
    ...alertUpdateFields
  ];
  const customFields = await getCustomFields.call(this) || [];
  fields.push(...customFields);
  const columnData = {
    fields
  };
  return columnData;
}
async function getCaseFields() {
  const caseStatus = await import_loadOptions.loadCaseStatus.call(this);
  const caseTemplates = await import_loadOptions.loadCaseTemplate.call(this);
  const users = await import_loadOptions.loadUsers.call(this);
  const requiredFields = ["title", "description"];
  const excludeCreateFields = ["impactStatus", "taskRule", "addTags", "removeTags"];
  const fields = import_constants.caseCommonFields.filter((entry) => !excludeCreateFields.includes(entry.id)).map((entry) => {
    const type = entry.type;
    const field = {
      ...entry,
      type,
      required: false,
      display: true,
      defaultMatch: false
    };
    if (requiredFields.includes(entry.id)) {
      field.required = true;
    }
    if (field.id === "assignee") {
      field.options = users;
    }
    if (field.id === "status") {
      field.options = caseStatus;
    }
    if (field.id === "caseTemplate") {
      field.options = caseTemplates;
    }
    return field;
  });
  const customFields = await getCustomFields.call(this) || [];
  fields.push(...customFields);
  const columnData = {
    fields
  };
  return columnData;
}
async function getCaseUpdateFields() {
  const caseStatus = await import_loadOptions.loadCaseStatus.call(this);
  const users = await import_loadOptions.loadUsers.call(this);
  const excludedFromMatching = ["addTags", "removeTags", "taskRule", "observableRule"];
  const excludeUpdateFields = ["caseTemplate", "tasks", "sharingParameters"];
  const caseUpdateFields = import_constants.caseCommonFields.filter((entry) => !excludeUpdateFields.includes(entry.id)).map((entry) => {
    const type = entry.type;
    const field = {
      ...entry,
      type,
      required: false,
      display: true,
      defaultMatch: false,
      canBeUsedToMatch: true
    };
    if (excludedFromMatching.includes(field.id)) {
      field.canBeUsedToMatch = false;
    }
    if (field.id === "assignee") {
      field.options = users;
    }
    if (field.id === "status") {
      field.options = caseStatus;
    }
    return field;
  });
  const fields = [
    {
      displayName: "ID",
      id: "id",
      required: false,
      display: true,
      type: "string",
      defaultMatch: true,
      canBeUsedToMatch: true
    },
    ...caseUpdateFields
  ];
  const customFields = await getCustomFields.call(this) || [];
  fields.push(...customFields);
  const columnData = {
    fields
  };
  return columnData;
}
async function getTaskFields() {
  const users = await import_loadOptions.loadUsers.call(this);
  const requiredFields = ["title"];
  const fields = import_constants.taskCommonFields.map((entry) => {
    const type = entry.type;
    const field = {
      ...entry,
      type,
      required: false,
      display: true,
      defaultMatch: false
    };
    if (requiredFields.includes(entry.id)) {
      field.required = true;
    }
    if (field.id === "assignee") {
      field.options = users;
    }
    return field;
  });
  const columnData = {
    fields
  };
  return columnData;
}
async function getTaskUpdateFields() {
  const users = await import_loadOptions.loadUsers.call(this);
  const caseUpdateFields = import_constants.taskCommonFields.map((entry) => {
    const type = entry.type;
    const field = {
      ...entry,
      type,
      required: false,
      display: true,
      defaultMatch: false,
      canBeUsedToMatch: true
    };
    if (field.id === "assignee") {
      field.options = users;
    }
    return field;
  });
  const fields = [
    {
      displayName: "ID",
      id: "id",
      required: false,
      display: true,
      type: "string",
      defaultMatch: true,
      canBeUsedToMatch: true
    },
    ...caseUpdateFields
  ];
  const columnData = {
    fields
  };
  return columnData;
}
async function getLogFields() {
  const fields = [
    {
      displayName: "Message",
      id: "message",
      required: true,
      display: true,
      type: "string",
      defaultMatch: true
    },
    {
      displayName: "Start Date",
      id: "startDate",
      required: false,
      display: true,
      type: "dateTime",
      defaultMatch: false,
      removed: true
    },
    {
      displayName: "Include In Timeline",
      id: "includeInTimeline",
      required: false,
      display: true,
      type: "dateTime",
      defaultMatch: false,
      removed: true
    }
  ];
  const columnData = {
    fields
  };
  return columnData;
}
async function getObservableFields() {
  const excludeFields = ["addTags", "removeTags", "dataType"];
  const fields = import_constants.observableCommonFields.filter((entry) => !excludeFields.includes(entry.id)).map((entry) => {
    const type = entry.type;
    const field = {
      ...entry,
      type,
      required: false,
      display: true,
      defaultMatch: false
    };
    return field;
  });
  const columnData = {
    fields
  };
  return columnData;
}
async function getObservableUpdateFields() {
  const dataTypes = await import_loadOptions.loadObservableTypes.call(this);
  const excludedFromMatching = ["addTags", "removeTags"];
  const excludeFields = ["attachment", "data", "startDate", "zipPassword", "isZip"];
  const caseUpdateFields = import_constants.observableCommonFields.filter((entry) => !excludeFields.includes(entry.id)).map((entry) => {
    const type = entry.type;
    const field = {
      ...entry,
      type,
      required: false,
      display: true,
      defaultMatch: false,
      canBeUsedToMatch: true
    };
    if (excludedFromMatching.includes(field.id)) {
      field.canBeUsedToMatch = false;
    }
    if (field.id === "dataType") {
      field.options = dataTypes;
    }
    return field;
  });
  const fields = [
    {
      displayName: "ID",
      id: "id",
      required: false,
      display: true,
      type: "string",
      defaultMatch: true,
      canBeUsedToMatch: true
    },
    ...caseUpdateFields
  ];
  const columnData = {
    fields
  };
  return columnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAlertFields,
  getAlertUpdateFields,
  getCaseFields,
  getCaseUpdateFields,
  getLogFields,
  getObservableFields,
  getObservableUpdateFields,
  getTaskFields,
  getTaskUpdateFields
});
//# sourceMappingURL=resourceMapping.js.map