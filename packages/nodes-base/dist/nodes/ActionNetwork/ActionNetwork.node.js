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
var ActionNetwork_node_exports = {};
__export(ActionNetwork_node_exports, {
  ActionNetwork: () => ActionNetwork
});
module.exports = __toCommonJS(ActionNetwork_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class ActionNetwork {
  constructor() {
    this.description = {
      displayName: "Action Network",
      name: "actionNetwork",
      icon: "file:actionNetwork.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
      description: "Consume the Action Network API",
      defaults: {
        name: "Action Network"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "actionNetworkApi",
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
              name: "Attendance",
              value: "attendance"
            },
            {
              name: "Event",
              value: "event"
            },
            {
              name: "Person",
              value: "person"
            },
            {
              name: "Person Tag",
              value: "personTag"
            },
            {
              name: "Petition",
              value: "petition"
            },
            {
              name: "Signature",
              value: "signature"
            },
            {
              name: "Tag",
              value: "tag"
            }
          ],
          default: "attendance"
        },
        ...import_descriptions.attendanceOperations,
        ...import_descriptions.attendanceFields,
        ...import_descriptions.eventOperations,
        ...import_descriptions.eventFields,
        ...import_descriptions.personOperations,
        ...import_descriptions.personFields,
        ...import_descriptions.petitionOperations,
        ...import_descriptions.petitionFields,
        ...import_descriptions.signatureOperations,
        ...import_descriptions.signatureFields,
        ...import_descriptions.tagOperations,
        ...import_descriptions.tagFields,
        ...import_descriptions.personTagOperations,
        ...import_descriptions.personTagFields
      ]
    };
    this.methods = {
      loadOptions: import_GenericFunctions.resourceLoaders
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let response;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "attendance") {
          if (operation === "create") {
            const personId = this.getNodeParameter("personId", i);
            const eventId = this.getNodeParameter("eventId", i);
            const body = (0, import_GenericFunctions.makeOsdiLink)(personId);
            const endpoint = `/events/${eventId}/attendances`;
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "POST", endpoint, body);
          } else if (operation === "get") {
            const eventId = this.getNodeParameter("eventId", i);
            const attendanceId = this.getNodeParameter("attendanceId", i);
            const endpoint = `/events/${eventId}/attendances/${attendanceId}`;
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const eventId = this.getNodeParameter("eventId", i);
            const endpoint = `/events/${eventId}/attendances`;
            response = await import_GenericFunctions.handleListing.call(this, "GET", endpoint);
          }
        } else if (resource === "event") {
          if (operation === "create") {
            const body = {
              origin_system: this.getNodeParameter("originSystem", i),
              title: this.getNodeParameter("title", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustEventPayload)(additionalFields));
            }
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "POST", "/events", body);
          } else if (operation === "get") {
            const eventId = this.getNodeParameter("eventId", i);
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "GET", `/events/${eventId}`);
          } else if (operation === "getAll") {
            response = await import_GenericFunctions.handleListing.call(this, "GET", "/events");
          }
        } else if (resource === "person") {
          if (operation === "create") {
            const emailAddresses = this.getNodeParameter("email_addresses", i);
            const body = {
              person: {
                email_addresses: [emailAddresses.email_addresses_fields]
                // only one accepted by API
              }
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length && body.person) {
              Object.assign(body.person, (0, import_GenericFunctions.adjustPersonPayload)(additionalFields));
            }
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "POST", "/people", body);
          } else if (operation === "get") {
            const personId = this.getNodeParameter("personId", i);
            response = await import_GenericFunctions.actionNetworkApiRequest.call(
              this,
              "GET",
              `/people/${personId}`
            );
          } else if (operation === "getAll") {
            response = await import_GenericFunctions.handleListing.call(this, "GET", "/people");
          } else if (operation === "update") {
            const personId = this.getNodeParameter("personId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustPersonPayload)(updateFields));
            } else {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "PUT", `/people/${personId}`, body);
          }
        } else if (resource === "petition") {
          if (operation === "create") {
            const body = {
              origin_system: this.getNodeParameter("originSystem", i),
              title: this.getNodeParameter("title", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustPetitionPayload)(additionalFields));
            }
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "POST", "/petitions", body);
          } else if (operation === "get") {
            const petitionId = this.getNodeParameter("petitionId", i);
            const endpoint = `/petitions/${petitionId}`;
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            response = await import_GenericFunctions.handleListing.call(this, "GET", "/petitions");
          } else if (operation === "update") {
            const petitionId = this.getNodeParameter("petitionId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, (0, import_GenericFunctions.adjustPetitionPayload)(updateFields));
            } else {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            response = await import_GenericFunctions.actionNetworkApiRequest.call(
              this,
              "PUT",
              `/petitions/${petitionId}`,
              body
            );
          }
        } else if (resource === "signature") {
          if (operation === "create") {
            const personId = this.getNodeParameter("personId", i);
            const petitionId = this.getNodeParameter("petitionId", i);
            const body = (0, import_GenericFunctions.makeOsdiLink)(personId);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields).length) {
              Object.assign(body, additionalFields);
            }
            const endpoint = `/petitions/${petitionId}/signatures`;
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "POST", endpoint, body);
          } else if (operation === "get") {
            const petitionId = this.getNodeParameter("petitionId", i);
            const signatureId = this.getNodeParameter("signatureId", i);
            const endpoint = `/petitions/${petitionId}/signatures/${signatureId}`;
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "GET", endpoint);
          } else if (operation === "getAll") {
            const petitionId = this.getNodeParameter("petitionId", i);
            const endpoint = `/petitions/${petitionId}/signatures`;
            response = await import_GenericFunctions.handleListing.call(this, "GET", endpoint);
          } else if (operation === "update") {
            const petitionId = this.getNodeParameter("petitionId", i);
            const signatureId = this.getNodeParameter("signatureId", i);
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            if (Object.keys(updateFields).length) {
              Object.assign(body, updateFields);
            } else {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            const endpoint = `/petitions/${petitionId}/signatures/${signatureId}`;
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "PUT", endpoint, body);
          }
        } else if (resource === "tag") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "POST", "/tags", body);
          } else if (operation === "get") {
            const tagId = this.getNodeParameter("tagId", i);
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "GET", `/tags/${tagId}`);
          } else if (operation === "getAll") {
            response = await import_GenericFunctions.handleListing.call(this, "GET", "/tags");
          }
        } else if (resource === "personTag") {
          if (operation === "add") {
            const personId = this.getNodeParameter("personId", i);
            const tagId = this.getNodeParameter("tagId", i);
            const body = (0, import_GenericFunctions.makeOsdiLink)(personId);
            const endpoint = `/tags/${tagId}/taggings`;
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "POST", endpoint, body);
          } else if (operation === "remove") {
            const tagId = this.getNodeParameter("tagId", i);
            const taggingId = this.getNodeParameter("taggingId", i);
            const endpoint = `/tags/${tagId}/taggings/${taggingId}`;
            response = await import_GenericFunctions.actionNetworkApiRequest.call(this, "DELETE", endpoint);
          }
        }
        const simplify = this.getNodeParameter("simple", i, false);
        if (simplify) {
          response = operation === "getAll" ? response.map((entry) => (0, import_GenericFunctions.simplifyResponse)(entry, resource)) : (0, import_GenericFunctions.simplifyResponse)(response, resource);
        }
        Array.isArray(response) ? returnData.push(...response) : returnData.push(response);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionNetwork
});
//# sourceMappingURL=ActionNetwork.node.js.map