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
var GoogleContacts_node_exports = {};
__export(GoogleContacts_node_exports, {
  GoogleContacts: () => GoogleContacts
});
module.exports = __toCommonJS(GoogleContacts_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_ContactDescription = require("./ContactDescription");
var import_GenericFunctions = require("./GenericFunctions");
class GoogleContacts {
  constructor() {
    this.description = {
      displayName: "Google Contacts",
      name: "googleContacts",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:googleContacts.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Google Contacts API",
      defaults: {
        name: "Google Contacts"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googleContactsOAuth2Api",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Contact",
              value: "contact"
            }
          ],
          default: "contact"
        },
        ...import_ContactDescription.contactOperations,
        ...import_ContactDescription.contactFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the calendars to display them to user so that they can
        // select them easily
        async getGroups() {
          const returnData = [];
          const groups = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "contactGroups",
            "GET",
            "/contactGroups"
          );
          for (const group of groups) {
            const groupName = group.name;
            const groupId = group.resourceName;
            returnData.push({
              name: groupName,
              value: groupId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "contact" && operation === "getAll") {
      await import_GenericFunctions.googleApiRequest.call(this, "GET", "/people:searchContacts", void 0, {
        query: "",
        readMask: "names"
      });
      await import_GenericFunctions.googleApiRequest.call(this, "GET", "/people/me/connections", void 0, {
        personFields: "names"
      });
    }
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "contact") {
          if (operation === "create") {
            const familyName = this.getNodeParameter("familyName", i);
            const givenName = this.getNodeParameter("givenName", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              names: [
                {
                  familyName,
                  givenName,
                  middleName: ""
                }
              ]
            };
            if (additionalFields.middleName) {
              body.names[0].middleName = additionalFields.middleName;
            }
            if (additionalFields.honorificPrefix) {
              body.names[0].honorificPrefix = additionalFields.honorificPrefix;
            }
            if (additionalFields.honorificSuffix) {
              body.names[0].honorificSuffix = additionalFields.honorificSuffix;
            }
            if (additionalFields.companyUi) {
              const companyValues = additionalFields.companyUi.companyValues;
              body.organizations = companyValues;
            }
            if (additionalFields.phoneUi) {
              const phoneValues = additionalFields.phoneUi.phoneValues;
              body.phoneNumbers = phoneValues;
            }
            if (additionalFields.addressesUi) {
              const addressesValues = additionalFields.addressesUi.addressesValues;
              body.addresses = addressesValues;
            }
            if (additionalFields.relationsUi) {
              const relationsValues = additionalFields.relationsUi.relationsValues;
              body.relations = relationsValues;
            }
            if (additionalFields.eventsUi) {
              const eventsValues = additionalFields.eventsUi.eventsValues;
              for (let index = 0; index < eventsValues.length; index++) {
                const [month, day, year] = (0, import_moment_timezone.default)(eventsValues[index].date).format("MM/DD/YYYY").split("/");
                eventsValues[index] = {
                  date: {
                    day,
                    month,
                    year
                  },
                  type: eventsValues[index].type
                };
              }
              body.events = eventsValues;
            }
            if (additionalFields.birthday) {
              const [month, day, year] = (0, import_moment_timezone.default)(additionalFields.birthday).format("MM/DD/YYYY").split("/");
              body.birthdays = [
                {
                  date: {
                    day,
                    month,
                    year
                  }
                }
              ];
            }
            if (additionalFields.emailsUi) {
              const emailsValues = additionalFields.emailsUi.emailsValues;
              body.emailAddresses = emailsValues;
            }
            if (additionalFields.biographies) {
              body.biographies = [
                {
                  value: additionalFields.biographies,
                  contentType: "TEXT_PLAIN"
                }
              ];
            }
            if (additionalFields.customFieldsUi) {
              const customFieldsValues = additionalFields.customFieldsUi.customFieldsValues;
              body.userDefined = customFieldsValues;
            }
            if (additionalFields.group) {
              const memberships = additionalFields.group.map((groupId) => {
                return {
                  contactGroupMembership: {
                    contactGroupResourceName: groupId
                  }
                };
              });
              body.memberships = memberships;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/people:createContact",
              body,
              qs
            );
            responseData.contactId = responseData.resourceName.split("/")[1];
          }
          if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "DELETE",
              `/people/${contactId}:deleteContact`,
              {}
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            const fields = this.getNodeParameter("fields", i);
            const rawData = this.getNodeParameter("rawData", i);
            if (fields.includes("*")) {
              qs.personFields = import_GenericFunctions.allFields.join(",");
            } else {
              qs.personFields = fields.join(",");
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", `/people/${contactId}`, {}, qs);
            if (!rawData) {
              responseData = (0, import_GenericFunctions.cleanData)(responseData)[0];
            }
            responseData.contactId = responseData.resourceName.split("/")[1];
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const fields = this.getNodeParameter("fields", i);
            const options = this.getNodeParameter("options", i, {});
            const rawData = this.getNodeParameter("rawData", i);
            const useQuery = this.getNodeParameter("useQuery", i);
            const endpoint = useQuery ? ":searchContacts" : "/me/connections";
            if (useQuery) {
              qs.query = this.getNodeParameter("query", i);
            }
            if (options.sortOrder) {
              qs.sortOrder = options.sortOrder;
            }
            if (fields.includes("*")) {
              qs.personFields = import_GenericFunctions.allFields.join(",");
            } else {
              qs.personFields = fields.join(",");
            }
            if (useQuery) {
              qs.readMask = qs.personFields;
              delete qs.personFields;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                useQuery ? "results" : "connections",
                "GET",
                `/people${endpoint}`,
                {},
                qs
              );
              if (useQuery) {
                responseData = responseData.map((result) => result.person);
              }
            } else {
              qs.pageSize = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(this, "GET", `/people${endpoint}`, {}, qs);
              responseData = responseData.connections || responseData.results?.map((result) => result.person) || [];
            }
            if (!rawData) {
              responseData = (0, import_GenericFunctions.cleanData)(responseData);
            }
            for (let index = 0; index < responseData.length; index++) {
              responseData[index].contactId = responseData[index].resourceName.split("/")[1];
            }
          }
          if (operation === "update") {
            const updatePersonFields = [];
            const contactId = this.getNodeParameter("contactId", i);
            const fields = this.getNodeParameter("fields", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            let etag;
            if (updateFields.etag) {
              etag = updateFields.etag;
            } else {
              const data = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                `/people/${contactId}`,
                {},
                { personFields: "Names" }
              );
              etag = data.etag;
            }
            if (fields.includes("*")) {
              qs.personFields = import_GenericFunctions.allFields.join(",");
            } else {
              qs.personFields = fields.join(",");
            }
            const body = {
              etag,
              names: [{}]
            };
            if (updateFields.givenName) {
              body.names[0].givenName = updateFields.givenName;
            }
            if (updateFields.familyName) {
              body.names[0].familyName = updateFields.familyName;
            }
            if (updateFields.middleName) {
              body.names[0].middleName = updateFields.middleName;
            }
            if (updateFields.honorificPrefix) {
              body.names[0].honorificPrefix = updateFields.honorificPrefix;
            }
            if (updateFields.honorificSuffix) {
              body.names[0].honorificSuffix = updateFields.honorificSuffix;
            }
            if (updateFields.companyUi) {
              const companyValues = updateFields.companyUi.companyValues;
              body.organizations = companyValues;
              updatePersonFields.push("organizations");
            }
            if (updateFields.phoneUi) {
              const phoneValues = updateFields.phoneUi.phoneValues;
              body.phoneNumbers = phoneValues;
              updatePersonFields.push("phoneNumbers");
            }
            if (updateFields.addressesUi) {
              const addressesValues = updateFields.addressesUi.addressesValues;
              body.addresses = addressesValues;
              updatePersonFields.push("addresses");
            }
            if (updateFields.relationsUi) {
              const relationsValues = updateFields.relationsUi.relationsValues;
              body.relations = relationsValues;
              updatePersonFields.push("relations");
            }
            if (updateFields.eventsUi) {
              const eventsValues = updateFields.eventsUi.eventsValues;
              for (let index = 0; index < eventsValues.length; index++) {
                const [month, day, year] = (0, import_moment_timezone.default)(eventsValues[index].date).format("MM/DD/YYYY").split("/");
                eventsValues[index] = {
                  date: {
                    day,
                    month,
                    year
                  },
                  type: eventsValues[index].type
                };
              }
              body.events = eventsValues;
              updatePersonFields.push("events");
            }
            if (updateFields.birthday) {
              const [month, day, year] = (0, import_moment_timezone.default)(updateFields.birthday).format("MM/DD/YYYY").split("/");
              body.birthdays = [
                {
                  date: {
                    day,
                    month,
                    year
                  }
                }
              ];
              updatePersonFields.push("birthdays");
            }
            if (updateFields.emailsUi) {
              const emailsValues = updateFields.emailsUi.emailsValues;
              body.emailAddresses = emailsValues;
              updatePersonFields.push("emailAddresses");
            }
            if (updateFields.biographies) {
              body.biographies = [
                {
                  value: updateFields.biographies,
                  contentType: "TEXT_PLAIN"
                }
              ];
              updatePersonFields.push("biographies");
            }
            if (updateFields.customFieldsUi) {
              const customFieldsValues = updateFields.customFieldsUi.customFieldsValues;
              body.userDefined = customFieldsValues;
              updatePersonFields.push("userDefined");
            }
            if (updateFields.group) {
              const memberships = updateFields.group.map((groupId) => {
                return {
                  contactGroupMembership: {
                    contactGroupResourceName: groupId
                  }
                };
              });
              body.memberships = memberships;
              updatePersonFields.push("memberships");
            }
            if (body.names.length > 0) {
              updatePersonFields.push("names");
            }
            qs.updatePersonFields = updatePersonFields.join(",");
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PATCH",
              `/people/${contactId}:updateContact`,
              body,
              qs
            );
            responseData.contactId = responseData.resourceName.split("/")[1];
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleContacts
});
//# sourceMappingURL=GoogleContacts.node.js.map