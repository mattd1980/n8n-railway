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
var Misp_node_exports = {};
__export(Misp_node_exports, {
  Misp: () => Misp
});
module.exports = __toCommonJS(Misp_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class Misp {
  constructor() {
    this.description = {
      displayName: "MISP",
      name: "misp",
      icon: "file:misp.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the MISP API",
      defaults: {
        name: "MISP"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mispApi",
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
              name: "Attribute",
              value: "attribute"
            },
            {
              name: "Event",
              value: "event"
            },
            {
              name: "Event Tag",
              value: "eventTag"
            },
            {
              name: "Feed",
              value: "feed"
            },
            {
              name: "Galaxy",
              value: "galaxy"
            },
            {
              name: "Noticelist",
              value: "noticelist"
            },
            {
              name: "Object",
              value: "object"
            },
            {
              name: "Organisation",
              value: "organisation"
            },
            {
              name: "Tag",
              value: "tag"
            },
            {
              name: "User",
              value: "user"
            },
            {
              name: "Warninglist",
              value: "warninglist"
            }
          ],
          default: "attribute"
        },
        ...import_descriptions.attributeOperations,
        ...import_descriptions.attributeFields,
        ...import_descriptions.eventOperations,
        ...import_descriptions.eventFields,
        ...import_descriptions.eventTagOperations,
        ...import_descriptions.eventTagFields,
        ...import_descriptions.feedOperations,
        ...import_descriptions.feedFields,
        ...import_descriptions.galaxyOperations,
        ...import_descriptions.galaxyFields,
        ...import_descriptions.noticelistOperations,
        ...import_descriptions.noticelistFields,
        ...import_descriptions.objectOperations,
        ...import_descriptions.objectFields,
        ...import_descriptions.organisationOperations,
        ...import_descriptions.organisationFields,
        ...import_descriptions.tagOperations,
        ...import_descriptions.tagFields,
        ...import_descriptions.userOperations,
        ...import_descriptions.userFields,
        ...import_descriptions.warninglistOperations,
        ...import_descriptions.warninglistFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getOrgs() {
          const responseData = await import_GenericFunctions.mispApiRequest.call(
            this,
            "GET",
            "/organisations"
          );
          return responseData.map((i) => ({ name: i.Organisation.name, value: i.Organisation.id }));
        },
        async getSharingGroups() {
          const responseData = await import_GenericFunctions.mispApiRequest.call(
            this,
            "GET",
            "/sharing_groups"
          );
          return responseData.response.map((i) => ({
            name: i.SharingGroup.name,
            value: i.SharingGroup.id
          }));
        },
        async getTags() {
          const responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", "/tags");
          return responseData.Tag.map((i) => ({ name: i.name, value: i.id }));
        },
        async getUsers() {
          const responseData = await import_GenericFunctions.mispApiRequest.call(
            this,
            "GET",
            "/admin/users"
          );
          return responseData.map((i) => ({ name: i.User.email, value: i.User.id }));
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
        if (resource === "attribute") {
          if (operation === "create") {
            const body = {
              type: this.getNodeParameter("type", i),
              value: this.getNodeParameter("value", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            import_GenericFunctions.throwOnMissingSharingGroup.call(this, additionalFields);
            if (Object.keys(additionalFields)) {
              Object.assign(body, additionalFields);
            }
            const eventId = this.getNodeParameter("eventId", i);
            const endpoint = `/attributes/add/${eventId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", endpoint, body);
            responseData = responseData.Attribute;
          } else if (operation === "delete") {
            const attributeId = this.getNodeParameter("attributeId", i);
            const endpoint = `/attributes/delete/${attributeId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const attributeId = this.getNodeParameter("attributeId", i);
            const endpoint = `/attributes/view/${attributeId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", endpoint);
            responseData = responseData.Attribute;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequestAllItems.call(this, "/attributes");
          } else if (operation === "search") {
            responseData = await import_GenericFunctions.mispApiRestSearch.call(this, "attributes", i);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            import_GenericFunctions.throwOnMissingSharingGroup.call(this, updateFields);
            Object.assign(body, updateFields);
            const attributeId = this.getNodeParameter("attributeId", i);
            const endpoint = `/attributes/edit/${attributeId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.Attribute;
          }
        } else if (resource === "event") {
          if (operation === "create") {
            const body = {
              org_id: this.getNodeParameter("org_id", i),
              info: this.getNodeParameter("information", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            import_GenericFunctions.throwOnMissingSharingGroup.call(this, additionalFields);
            if (Object.keys(additionalFields)) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", "/events", body);
            responseData = responseData.Event;
          } else if (operation === "delete") {
            const eventId = this.getNodeParameter("eventId", i);
            const endpoint = `/events/delete/${eventId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const eventId = this.getNodeParameter("eventId", i);
            const endpoint = `/events/view/${eventId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", endpoint);
            responseData = responseData.Event;
            delete responseData.Attribute;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequestAllItems.call(this, "/events");
          } else if (operation === "search") {
            responseData = await import_GenericFunctions.mispApiRestSearch.call(this, "events", i);
          } else if (operation === "publish") {
            const eventId = this.getNodeParameter("eventId", i);
            const endpoint = `/events/publish/${eventId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", endpoint);
          } else if (operation === "unpublish") {
            const eventId = this.getNodeParameter("eventId", i);
            const endpoint = `/events/unpublish/${eventId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", endpoint);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            import_GenericFunctions.throwOnMissingSharingGroup.call(this, updateFields);
            Object.assign(body, updateFields);
            const eventId = this.getNodeParameter("eventId", i);
            const endpoint = `/events/edit/${eventId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.Event;
            delete responseData.Attribute;
          }
        } else if (resource === "eventTag") {
          if (operation === "add") {
            const body = {
              event: this.getNodeParameter("eventId", i),
              tag: this.getNodeParameter("tagId", i)
            };
            const endpoint = "/events/addTag";
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", endpoint, body);
          } else if (operation === "remove") {
            const eventId = this.getNodeParameter("eventId", i);
            const tagId = this.getNodeParameter("tagId", i);
            const endpoint = `/events/removeTag/${eventId}/${tagId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", endpoint);
          }
        } else if (resource === "feed") {
          if (operation === "create") {
            const url = this.getNodeParameter("url", i);
            import_GenericFunctions.throwOnInvalidUrl.call(this, url);
            const body = {
              name: this.getNodeParameter("name", i),
              provider: this.getNodeParameter("provider", i),
              url
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields)) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", "/feeds/add", body);
            responseData = responseData.Feed;
          } else if (operation === "disable") {
            const feedId = this.getNodeParameter("feedId", i);
            const endpoint = `/feeds/disable/${feedId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", endpoint);
          } else if (operation === "enable") {
            const feedId = this.getNodeParameter("feedId", i);
            const endpoint = `/feeds/enable/${feedId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", endpoint);
          } else if (operation === "get") {
            const feedId = this.getNodeParameter("feedId", i);
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", `/feeds/view/${feedId}`);
            responseData = responseData.Feed;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequestAllItems.call(this, "/feeds");
            responseData = responseData.map((entry) => entry.Feed);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            if (updateFields.url) {
              import_GenericFunctions.throwOnInvalidUrl.call(this, updateFields.url);
            }
            Object.assign(body, updateFields);
            const feedId = this.getNodeParameter("feedId", i);
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "PUT", `/feeds/edit/${feedId}`, body);
            responseData = responseData.Feed;
          }
        } else if (resource === "galaxy") {
          if (operation === "delete") {
            const galaxyId = this.getNodeParameter("galaxyId", i);
            const endpoint = `/galaxies/delete/${galaxyId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const galaxyId = this.getNodeParameter("galaxyId", i);
            const endpoint = `/galaxies/view/${galaxyId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", endpoint);
            responseData = responseData.Galaxy;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequestAllItems.call(this, "/galaxies");
            responseData = responseData.map((entry) => entry.Galaxy);
          }
        } else if (resource === "noticelist") {
          if (operation === "get") {
            const noticelistId = this.getNodeParameter("noticelistId", i);
            const endpoint = `/noticelists/view/${noticelistId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", endpoint);
            responseData = responseData.Noticelist;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequestAllItems.call(this, "/noticelists");
            responseData = responseData.map((entry) => entry.Noticelist);
          }
        } else if (resource === "object") {
          if (operation === "search") {
            responseData = await import_GenericFunctions.mispApiRestSearch.call(this, "objects", i);
          }
        } else if (resource === "organisation") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields)) {
              Object.assign(body, additionalFields);
            }
            const endpoint = "/admin/organisations/add";
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", endpoint, body);
            responseData = responseData.Organisation;
          } else if (operation === "delete") {
            const organisationId = this.getNodeParameter("organisationId", i);
            const endpoint = `/admin/organisations/delete/${organisationId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const organisationId = this.getNodeParameter("organisationId", i);
            const endpoint = `/organisations/view/${organisationId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", endpoint);
            responseData = responseData.Organisation;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequestAllItems.call(this, "/organisations");
            responseData = responseData.map((entry) => entry.Organisation);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            Object.assign(body, updateFields);
            const organisationId = this.getNodeParameter("organisationId", i);
            const endpoint = `/admin/organisations/edit/${organisationId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.Organisation;
          }
        } else if (resource === "tag") {
          if (operation === "create") {
            const body = {
              name: this.getNodeParameter("name", i)
            };
            const { colour } = this.getNodeParameter("additionalFields", i);
            if (colour) {
              Object.assign(body, {
                colour: !colour.startsWith("#") ? `#${colour}` : colour
              });
            }
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", "/tags/add", body);
            responseData = responseData.Tag;
          } else if (operation === "delete") {
            const tagId = this.getNodeParameter("tagId", i);
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", `/tags/delete/${tagId}`);
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", "/tags");
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.Tag.slice(0, limit);
            }
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            Object.assign(body, updateFields);
            const { colour, name } = updateFields;
            Object.assign(body, {
              ...name && { name },
              ...colour && { colour: !colour.startsWith("#") ? `#${colour}` : colour }
            });
            const tagId = this.getNodeParameter("tagId", i);
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", `/tags/edit/${tagId}`, body);
            responseData = responseData.Tag;
          }
        } else if (resource === "user") {
          if (operation === "create") {
            const body = {
              email: this.getNodeParameter("email", i),
              role_id: this.getNodeParameter("role_id", i)
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (Object.keys(additionalFields)) {
              Object.assign(body, additionalFields);
            }
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "POST", "/admin/users/add", body);
            responseData = responseData.User;
          } else if (operation === "delete") {
            const userId = this.getNodeParameter("userId", i);
            const endpoint = `/admin/users/delete/${userId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "DELETE", endpoint);
          } else if (operation === "get") {
            const userId = this.getNodeParameter("userId", i);
            const endpoint = `/admin/users/view/${userId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", endpoint);
            responseData = responseData.User;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequestAllItems.call(this, "/admin/users");
            responseData = responseData.map((entry) => entry.User);
          } else if (operation === "update") {
            const body = {};
            const updateFields = this.getNodeParameter("updateFields", i);
            import_GenericFunctions.throwOnEmptyUpdate.call(this, resource, updateFields);
            Object.assign(body, updateFields);
            const userId = this.getNodeParameter("userId", i);
            const endpoint = `/admin/users/edit/${userId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "PUT", endpoint, body);
            responseData = responseData.User;
          }
        } else if (resource === "warninglist") {
          if (operation === "get") {
            const warninglistId = this.getNodeParameter("warninglistId", i);
            const endpoint = `/warninglists/view/${warninglistId}`;
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", endpoint);
            responseData = responseData.Warninglist;
          } else if (operation === "getAll") {
            responseData = await import_GenericFunctions.mispApiRequest.call(this, "GET", "/warninglists");
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.Warninglists.slice(0, limit).map(
                (entry) => entry.Warninglist
              );
            } else {
              responseData = responseData.Warninglists.map((entry) => entry.Warninglist);
            }
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
  Misp
});
//# sourceMappingURL=Misp.node.js.map