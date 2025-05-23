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
var MonicaCrm_node_exports = {};
__export(MonicaCrm_node_exports, {
  MonicaCrm: () => MonicaCrm
});
module.exports = __toCommonJS(MonicaCrm_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class MonicaCrm {
  constructor() {
    this.description = {
      displayName: "Monica CRM",
      name: "monicaCrm",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:monicaCrm.png",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Monica CRM API",
      defaults: {
        name: "Monica CRM"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "monicaCrmApi",
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
              name: "Activity",
              value: "activity"
            },
            {
              name: "Call",
              value: "call"
            },
            {
              name: "Contact",
              value: "contact"
            },
            {
              name: "Contact Field",
              value: "contactField"
            },
            {
              name: "Contact Tag",
              value: "contactTag"
            },
            {
              name: "Conversation",
              value: "conversation"
            },
            {
              name: "Conversation Message",
              value: "conversationMessage"
            },
            {
              name: "Journal Entry",
              value: "journalEntry"
            },
            {
              name: "Note",
              value: "note"
            },
            {
              name: "Reminder",
              value: "reminder"
            },
            {
              name: "Tag",
              value: "tag"
            },
            {
              name: "Task",
              value: "task"
            }
          ],
          default: "contact"
        },
        ...import_descriptions.activityOperations,
        ...import_descriptions.activityFields,
        ...import_descriptions.callOperations,
        ...import_descriptions.callFields,
        ...import_descriptions.contactOperations,
        ...import_descriptions.contactFields,
        ...import_descriptions.contactFieldOperations,
        ...import_descriptions.contactFieldFields,
        ...import_descriptions.contactTagOperations,
        ...import_descriptions.contactTagFields,
        ...import_descriptions.conversationOperations,
        ...import_descriptions.conversationFields,
        ...import_descriptions.conversationMessageOperations,
        ...import_descriptions.conversationMessageFields,
        ...import_descriptions.journalEntryOperations,
        ...import_descriptions.journalEntryFields,
        ...import_descriptions.noteOperations,
        ...import_descriptions.noteFields,
        ...import_descriptions.reminderOperations,
        ...import_descriptions.reminderFields,
        ...import_descriptions.tagOperations,
        ...import_descriptions.tagFields,
        ...import_descriptions.taskOperations,
        ...import_descriptions.taskFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getActivityTypes() {
          const responseData = await import_GenericFunctions.monicaCrmApiRequest.call(
            this,
            "GET",
            "/activitytypes"
          );
          return (0, import_GenericFunctions.toOptions)(responseData);
        },
        async getTagsToAdd() {
          const responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(
            this,
            "GET",
            "/tags",
            {},
            {},
            { forLoader: true }
          );
          return responseData.map(({ name }) => ({ value: name, name }));
        },
        async getTagsToRemove() {
          const responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(
            this,
            "GET",
            "/tags",
            {},
            {},
            { forLoader: true }
          );
          return responseData.map(({ id, name }) => ({ value: id, name }));
        },
        async getContactFieldTypes() {
          const responseData = await import_GenericFunctions.monicaCrmApiRequest.call(
            this,
            "GET",
            "/contactfieldtypes"
          );
          return (0, import_GenericFunctions.toOptions)(responseData);
        },
        async getGenders() {
          const responseData = await import_GenericFunctions.monicaCrmApiRequest.call(
            this,
            "GET",
            "/genders"
          );
          return (0, import_GenericFunctions.toOptions)(responseData);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "activity") {
          if (operation === "create") {
            const contacts = this.getNodeParameter("contacts", i);
            const happenedAt = this.getNodeParameter("happenedAt", i);
            const body = {
              activity_type_id: this.getNodeParameter("activityTypeId", i),
              contacts: contacts.split(","),
              happened_at: happenedAt.split("T")[0],
              summary: this.getNodeParameter("summary", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/activities", body);
          } else if (operation === "delete") {
            const activityId = this.getNodeParameter("activityId", i);
            const endpoint = `/activities/${activityId}`;
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const activityId = this.getNodeParameter("activityId", i);
            const endpoint = `/activities/${activityId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const endpoint = "/activities";
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", endpoint);
          } else if (operation === "update") {
            const activityId = this.getNodeParameter("activityId", i);
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(
              this,
              "GET",
              `/activities/${activityId}`
            );
            const body = {
              activity_type_id: data.activity_type.id,
              contacts: data.attendees.contacts.map((contact) => contact.id),
              happened_at: data.happened_at,
              summary: data.summary
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            body.happened_at = body.happened_at.split("T")[0];
            if (typeof body.contacts === "string") {
              body.contacts = body.contacts.split(",");
            }
            const endpoint = `/activities/${activityId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "call") {
          if (operation === "create") {
            const body = {
              called_at: this.getNodeParameter("calledAt", i),
              contact_id: this.getNodeParameter("contactId", i),
              content: this.getNodeParameter("content", i)
            };
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/calls", body);
          } else if (operation === "delete") {
            const callId = this.getNodeParameter("callId", i);
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", `/calls/${callId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const callId = this.getNodeParameter("callId", i);
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/calls/${callId}`);
          } else if (operation === "getAll") {
            const endpoint = "/calls";
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", endpoint);
          } else if (operation === "update") {
            const callId = this.getNodeParameter("callId", i);
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/calls/${callId}`);
            const body = {
              called_at: data.called_at
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", `/calls/${callId}`, body);
          }
        } else if (resource === "contact") {
          if (operation === "create") {
            const body = {
              first_name: this.getNodeParameter("firstName", i),
              gender_id: this.getNodeParameter("genderId", i)
            };
            const {
              isDeceased = false,
              deceasedDate,
              birthdate,
              ...rest
            } = this.getNodeParameter("additionalFields", i);
            body.is_birthdate_known = false;
            body.is_deceased = isDeceased;
            body.is_deceased_date_known = false;
            if (birthdate) {
              body.is_birthdate_known = true;
              const [day, month, year] = (0, import_GenericFunctions.getDateParts)(birthdate);
              body.birthdate_day = day;
              body.birthdate_month = month;
              body.birthdate_year = year;
            }
            if (deceasedDate) {
              body.is_deceased = true;
              body.is_deceased_date_known = true;
              const [day, month, year] = (0, import_GenericFunctions.getDateParts)(deceasedDate);
              body.deceased_date_day = day;
              body.deceased_date_month = month;
              body.deceased_date_year = year;
            }
            if (Object.keys(rest).length) {
              Object.assign(body, rest);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/contacts", body);
          } else if (operation === "delete") {
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}`;
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const qs = {};
            const filters = this.getNodeParameter("filters", i);
            if (Object.keys(filters).length) {
              Object.assign(qs, filters);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", "/contacts", {}, qs);
          } else if (operation === "update") {
            const contactId = this.getNodeParameter("contactId", i);
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/contacts/${contactId}`);
            const body = {
              first_name: data.first_name
            };
            const {
              is_deaceased = false,
              deceased_date,
              birthdate,
              ...rest
            } = this.getNodeParameter("updateFields", i);
            body.is_birthdate_known = false;
            body.is_deceased = is_deaceased;
            body.is_deceased_date_known = false;
            if (birthdate) {
              body.is_birthdate_known = true;
              const [day, month, year] = (0, import_GenericFunctions.getDateParts)(birthdate);
              body.birthdate_day = day;
              body.birthdate_month = month;
              body.birthdate_year = year;
            }
            if (deceased_date) {
              body.is_deceased = true;
              body.is_deceased_date_known = true;
              const [day, month, year] = (0, import_GenericFunctions.getDateParts)(deceased_date);
              body.deceased_date_day = day;
              body.deceased_date_month = month;
              body.deceased_date_year = year;
            }
            if (Object.keys(rest).length) {
              Object.assign(body, rest);
            }
            const endpoint = `/contacts/${contactId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "contactField") {
          if (operation === "create") {
            const body = {
              contact_field_type_id: this.getNodeParameter("contactFieldTypeId", i),
              contact_id: this.getNodeParameter("contactId", i),
              data: this.getNodeParameter("data", i)
            };
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/contactfields", body);
          } else if (operation === "delete") {
            const contactFieldId = this.getNodeParameter("contactFieldId", i);
            const endpoint = `/contactfields/${contactFieldId}`;
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const contactFieldId = this.getNodeParameter("contactFieldId", i);
            const endpoint = `/contactfields/${contactFieldId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contact/${contactId}/contactfields`;
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", endpoint);
          } else if (operation === "update") {
            const body = {
              contact_field_type_id: this.getNodeParameter("contactFieldTypeId", i),
              contact_id: this.getNodeParameter("contactId", i),
              data: this.getNodeParameter("data", i)
            };
            const contactFieldId = this.getNodeParameter("contactFieldId", i);
            const endpoint = `/contactfields/${contactFieldId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "contactTag") {
          if (operation === "add") {
            const body = {
              tags: this.getNodeParameter("tagsToAdd", i)
            };
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}/setTags`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", endpoint, body);
          } else if (operation === "remove") {
            const body = {
              tags: this.getNodeParameter("tagsToRemove", i)
            };
            const contactId = this.getNodeParameter("contactId", i);
            const endpoint = `/contacts/${contactId}/unsetTag`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", endpoint, body);
          }
        } else if (resource === "conversation") {
          if (operation === "create") {
            const body = {
              contact_field_type_id: this.getNodeParameter("contactFieldTypeId", i),
              contact_id: this.getNodeParameter("contactId", i),
              happened_at: this.getNodeParameter("happenedAt", i)
            };
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/conversations", body);
          } else if (operation === "delete") {
            const conversationId = this.getNodeParameter("conversationId", i);
            const endpoint = `/conversations/${conversationId}`;
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const conversationId = this.getNodeParameter("conversationId", i);
            const endpoint = `/conversations/${conversationId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", endpoint);
          } else if (operation === "update") {
            const body = {
              contact_field_type_id: this.getNodeParameter("contactFieldTypeId", i),
              happened_at: this.getNodeParameter("happenedAt", i)
            };
            const conversationId = this.getNodeParameter("conversationId", i);
            const endpoint = `/conversations/${conversationId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "conversationMessage") {
          if (operation === "add") {
            const conversationId = this.getNodeParameter("conversationId", i);
            const endpoint = `/conversations/${conversationId}/messages`;
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(
              this,
              "GET",
              `/conversations/${conversationId}`
            );
            const body = {
              contact_id: data.contact.id,
              content: this.getNodeParameter("content", i),
              written_at: this.getNodeParameter("writtenAt", i),
              written_by_me: this.getNodeParameter("writtenByMe", i)
            };
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", endpoint, body);
          } else if (operation === "update") {
            const conversationId = this.getNodeParameter("conversationId", i);
            const messageId = this.getNodeParameter("messageId", i);
            const endpoint = `/conversations/${conversationId}/messages/${messageId}`;
            const updateFields = this.getNodeParameter("updateFields", i, {});
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(
              this,
              "GET",
              `/conversations/${conversationId}`
            );
            const message = data.messages.filter(
              (entry) => entry.id === parseInt(messageId, 10)
            )[0];
            const body = {
              contact_id: data.contact.id,
              content: message.content,
              written_at: message.written_at,
              written_by_me: message.written_by_me
            };
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "journalEntry") {
          if (operation === "create") {
            const body = {
              title: this.getNodeParameter("title", i),
              post: this.getNodeParameter("post", i)
            };
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/journal", body);
          } else if (operation === "delete") {
            const journalId = this.getNodeParameter("journalId", i);
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", `/journal/${journalId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const journalId = this.getNodeParameter("journalId", i);
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/journal/${journalId}`);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", "/journal");
          } else if (operation === "update") {
            const journalId = this.getNodeParameter("journalId", i);
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/journal/${journalId}`);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              post: data.post,
              title: data.title
            };
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(
              this,
              "PUT",
              `/journal/${journalId}`,
              body
            );
          }
        } else if (resource === "note") {
          if (operation === "create") {
            const body = {
              body: this.getNodeParameter("body", i),
              contact_id: this.getNodeParameter("contactId", i)
            };
            body.is_favorited = this.getNodeParameter("additionalFields.isFavorited", i, false);
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/notes", body);
          } else if (operation === "delete") {
            const noteId = this.getNodeParameter("noteId", i);
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", `/notes/${noteId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const noteId = this.getNodeParameter("noteId", i);
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/notes/${noteId}`);
          } else if (operation === "getAll") {
            const endpoint = "/notes";
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", endpoint);
          } else if (operation === "update") {
            const noteId = this.getNodeParameter("noteId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/notes/${noteId}`);
            const body = {
              body: data.body,
              contact_id: data.contact.id
            };
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", `/notes/${noteId}`, body);
          }
        } else if (resource === "reminder") {
          if (operation === "create") {
            const initialDate = this.getNodeParameter("initialDate", i);
            const body = {
              contact_id: this.getNodeParameter("contactId", i),
              frequency_type: this.getNodeParameter("frequencyType", i),
              frequency_number: this.getNodeParameter("frequencyNumber", i, 1),
              initial_date: initialDate.split("T")[0],
              title: this.getNodeParameter("title", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/reminders", body);
          } else if (operation === "delete") {
            const reminderId = this.getNodeParameter("reminderId", i);
            const endpoint = `/reminders/${reminderId}`;
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", endpoint);
            responseData = { success: true };
          } else if (operation === "get") {
            const reminderId = this.getNodeParameter("reminderId", i);
            const endpoint = `/reminders/${reminderId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", "/reminders");
          } else if (operation === "update") {
            const reminderId = this.getNodeParameter("reminderId", i);
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(
              this,
              "GET",
              `/reminders/${reminderId}`
            );
            const body = {
              contact_id: data.contact.id,
              frequency_type: data.frequency_type,
              frequency_number: data.frequency_number,
              initial_date: data.initial_date,
              title: data.title
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            body.initial_date = body.initial_date.split("T")[0];
            const endpoint = `/reminders/${reminderId}`;
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "tag") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/tags", body);
          } else if (operation === "delete") {
            const tagId = this.getNodeParameter("tagId", i);
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", `/tags/${tagId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const tagId = this.getNodeParameter("tagId", i);
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/tags/${tagId}`);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", "/tags");
          } else if (operation === "update") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const tagId = this.getNodeParameter("tagId", i);
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", `/tags/${tagId}`, body);
          }
        } else if (resource === "task") {
          if (operation === "create") {
            const body = {
              contact_id: this.getNodeParameter("contactId", i),
              title: this.getNodeParameter("title", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "POST", "/tasks", body);
          } else if (operation === "delete") {
            const taskId = this.getNodeParameter("taskId", i);
            await import_GenericFunctions.monicaCrmApiRequest.call(this, "DELETE", `/tasks/${taskId}`);
            responseData = { success: true };
          } else if (operation === "get") {
            const taskId = this.getNodeParameter("taskId", i);
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/tasks/${taskId}`);
          } else if (operation === "getAll") {
            const endpoint = "/tasks";
            responseData = await import_GenericFunctions.monicaCrmApiRequestAllItems.call(this, "GET", endpoint);
          } else if (operation === "update") {
            const taskId = this.getNodeParameter("taskId", i);
            const { data } = await import_GenericFunctions.monicaCrmApiRequest.call(this, "GET", `/tasks/${taskId}`);
            const body = {
              contact_id: data.contact.id,
              title: data.title,
              completed: data.completed
            };
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            }
            responseData = await import_GenericFunctions.monicaCrmApiRequest.call(this, "PUT", `/tasks/${taskId}`, body);
          }
        }
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
      if (["create", "get", "update", "add"].includes(operation)) {
        responseData = responseData.data;
      }
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MonicaCrm
});
//# sourceMappingURL=MonicaCrm.node.js.map