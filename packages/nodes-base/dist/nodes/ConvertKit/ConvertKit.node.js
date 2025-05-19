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
var ConvertKit_node_exports = {};
__export(ConvertKit_node_exports, {
  ConvertKit: () => ConvertKit
});
module.exports = __toCommonJS(ConvertKit_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CustomFieldDescription = require("./CustomFieldDescription");
var import_FormDescription = require("./FormDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_SequenceDescription = require("./SequenceDescription");
var import_TagDescription = require("./TagDescription");
var import_TagSubscriberDescription = require("./TagSubscriberDescription");
class ConvertKit {
  constructor() {
    this.description = {
      displayName: "ConvertKit",
      name: "convertKit",
      icon: "file:convertKit.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume ConvertKit API",
      defaults: {
        name: "ConvertKit"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "convertKitApi",
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
              name: "Custom Field",
              value: "customField"
            },
            {
              name: "Form",
              value: "form"
            },
            {
              name: "Sequence",
              value: "sequence"
            },
            {
              name: "Tag",
              value: "tag"
            },
            {
              name: "Tag Subscriber",
              value: "tagSubscriber"
            }
          ],
          default: "form"
        },
        //--------------------
        // Field Description
        //--------------------
        ...import_CustomFieldDescription.customFieldOperations,
        ...import_CustomFieldDescription.customFieldFields,
        //--------------------
        // FormDescription
        //--------------------
        ...import_FormDescription.formOperations,
        ...import_FormDescription.formFields,
        //--------------------
        // Sequence Description
        //--------------------
        ...import_SequenceDescription.sequenceOperations,
        ...import_SequenceDescription.sequenceFields,
        //--------------------
        // Tag Description
        //--------------------
        ...import_TagDescription.tagOperations,
        ...import_TagDescription.tagFields,
        //--------------------
        // Tag Subscriber Description
        //--------------------
        ...import_TagSubscriberDescription.tagSubscriberOperations,
        ...import_TagSubscriberDescription.tagSubscriberFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the tags to display them to user so that they can
        // select them easily
        async getTags() {
          const returnData = [];
          const { tags } = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/tags");
          for (const tag of tags) {
            const tagName = tag.name;
            const tagId = tag.id;
            returnData.push({
              name: tagName,
              value: tagId
            });
          }
          return returnData;
        },
        // Get all the forms to display them to user so that they can
        // select them easily
        async getForms() {
          const returnData = [];
          const { forms } = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/forms");
          for (const form of forms) {
            const formName = form.name;
            const formId = form.id;
            returnData.push({
              name: formName,
              value: formId
            });
          }
          return returnData;
        },
        // Get all the sequences to display them to user so that they can
        // select them easily
        async getSequences() {
          const returnData = [];
          const { courses } = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/sequences");
          for (const course of courses) {
            const courseName = course.name;
            const courseId = course.id;
            returnData.push({
              name: courseName,
              value: courseId
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
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "customField") {
          if (operation === "create") {
            const label = this.getNodeParameter("label", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(
              this,
              "POST",
              "/custom_fields",
              { label },
              qs
            );
          }
          if (operation === "delete") {
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(this, "DELETE", `/custom_fields/${id}`);
          }
          if (operation === "get") {
            const id = this.getNodeParameter("id", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", `/custom_fields/${id}`);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/custom_fields");
            responseData = responseData.custom_fields;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
          if (operation === "update") {
            const id = this.getNodeParameter("id", i);
            const label = this.getNodeParameter("label", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(this, "PUT", `/custom_fields/${id}`, {
              label
            });
            responseData = { success: true };
          }
        }
        if (resource === "form") {
          if (operation === "addSubscriber") {
            const email = this.getNodeParameter("email", i);
            const formId = this.getNodeParameter("id", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              email
            };
            if (additionalFields.firstName) {
              body.first_name = additionalFields.firstName;
            }
            if (additionalFields.tags) {
              body.tags = additionalFields.tags;
            }
            if (additionalFields.fieldsUi) {
              const fieldValues = additionalFields.fieldsUi.fieldsValues;
              if (fieldValues) {
                body.fields = {};
                for (const fieldValue of fieldValues) {
                  body.fields[fieldValue.key] = fieldValue.value;
                }
              }
            }
            const { subscription } = await import_GenericFunctions.convertKitApiRequest.call(
              this,
              "POST",
              `/forms/${formId}/subscribe`,
              body
            );
            responseData = subscription;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/forms");
            responseData = responseData.forms;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
          if (operation === "getSubscriptions") {
            const formId = this.getNodeParameter("id", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.subscriberState) {
              qs.subscriber_state = additionalFields.subscriberState;
            }
            responseData = await import_GenericFunctions.convertKitApiRequest.call(
              this,
              "GET",
              `/forms/${formId}/subscriptions`,
              {},
              qs
            );
            responseData = responseData.subscriptions;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
        }
        if (resource === "sequence") {
          if (operation === "addSubscriber") {
            const email = this.getNodeParameter("email", i);
            const sequenceId = this.getNodeParameter("id", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              email
            };
            if (additionalFields.firstName) {
              body.first_name = additionalFields.firstName;
            }
            if (additionalFields.tags) {
              body.tags = additionalFields.tags;
            }
            if (additionalFields.fieldsUi) {
              const fieldValues = additionalFields.fieldsUi.fieldsValues;
              if (fieldValues) {
                body.fields = {};
                for (const fieldValue of fieldValues) {
                  body.fields[fieldValue.key] = fieldValue.value;
                }
              }
            }
            const { subscription } = await import_GenericFunctions.convertKitApiRequest.call(
              this,
              "POST",
              `/sequences/${sequenceId}/subscribe`,
              body
            );
            responseData = subscription;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/sequences");
            responseData = responseData.courses;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
          if (operation === "getSubscriptions") {
            const sequenceId = this.getNodeParameter("id", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.subscriberState) {
              qs.subscriber_state = additionalFields.subscriberState;
            }
            responseData = await import_GenericFunctions.convertKitApiRequest.call(
              this,
              "GET",
              `/sequences/${sequenceId}/subscriptions`,
              {},
              qs
            );
            responseData = responseData.subscriptions;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
        }
        if (resource === "tag") {
          if (operation === "create") {
            const names = this.getNodeParameter("name", i).split(",").map((e) => ({ name: e }));
            const body = {
              tag: names
            };
            responseData = await import_GenericFunctions.convertKitApiRequest.call(this, "POST", "/tags", body);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(this, "GET", "/tags");
            responseData = responseData.tags;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
        }
        if (resource === "tagSubscriber") {
          if (operation === "add") {
            const tagId = this.getNodeParameter("tagId", i);
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              email
            };
            if (additionalFields.firstName) {
              body.first_name = additionalFields.firstName;
            }
            if (additionalFields.fieldsUi) {
              const fieldValues = additionalFields.fieldsUi.fieldsValues;
              if (fieldValues) {
                body.fields = {};
                for (const fieldValue of fieldValues) {
                  body.fields[fieldValue.key] = fieldValue.value;
                }
              }
            }
            const { subscription } = await import_GenericFunctions.convertKitApiRequest.call(
              this,
              "POST",
              `/tags/${tagId}/subscribe`,
              body
            );
            responseData = subscription;
          }
          if (operation === "getAll") {
            const tagId = this.getNodeParameter("tagId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(
              this,
              "GET",
              `/tags/${tagId}/subscriptions`
            );
            responseData = responseData.subscriptions;
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
          if (operation === "delete") {
            const tagId = this.getNodeParameter("tagId", i);
            const email = this.getNodeParameter("email", i);
            responseData = await import_GenericFunctions.convertKitApiRequest.call(
              this,
              "POST",
              `/tags/${tagId}>/unsubscribe`,
              { email }
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message, json: {} });
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
  ConvertKit
});
//# sourceMappingURL=ConvertKit.node.js.map