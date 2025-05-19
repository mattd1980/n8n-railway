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
var Segment_node_exports = {};
__export(Segment_node_exports, {
  Segment: () => Segment
});
module.exports = __toCommonJS(Segment_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_uuid = require("uuid");
var import_GenericFunctions = require("./GenericFunctions");
var import_GroupDescription = require("./GroupDescription");
var import_IdentifyDescription = require("./IdentifyDescription");
var import_TrackDescription = require("./TrackDescription");
class Segment {
  constructor() {
    this.description = {
      displayName: "Segment",
      name: "segment",
      icon: "file:segment.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
      description: "Consume Segment API",
      defaults: {
        name: "Segment"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "segmentApi",
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
              name: "Group",
              value: "group",
              description: "Group lets you associate an identified user with a group"
            },
            {
              name: "Identify",
              value: "identify",
              description: "Identify lets you tie a user to their actions"
            },
            {
              name: "Track",
              value: "track",
              description: "Track lets you record events"
            }
          ],
          default: "identify"
        },
        ...import_GroupDescription.groupOperations,
        ...import_GroupDescription.groupFields,
        ...import_IdentifyDescription.identifyOperations,
        ...import_TrackDescription.trackOperations,
        ...import_IdentifyDescription.identifyFields,
        ...import_TrackDescription.trackFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "group") {
          if (operation === "add") {
            const userId = this.getNodeParameter("userId", i);
            const groupId = this.getNodeParameter("groupId", i);
            const traits = this.getNodeParameter("traits", i).traitsUi;
            const context = this.getNodeParameter("context", i).contextUi;
            const integrations = this.getNodeParameter("integrations", i).integrationsUi;
            const body = {
              groupId,
              traits: {
                company: {},
                address: {}
              },
              context: {
                app: {},
                campaign: {},
                device: {}
              },
              integrations: {}
            };
            if (userId) {
              body.userId = userId;
            } else {
              body.anonymousId = (0, import_uuid.v4)();
            }
            if (traits) {
              if (traits && traits.length !== 0) {
                for (const trait of traits) {
                  body.traits[trait.key] = trait.value;
                }
              }
            }
            if (context) {
              if (context.active) {
                body.context.active = context.active;
              }
              if (context.ip) {
                body.context.ip = context.ip;
              }
              if (context.locate) {
                body.context.locate = context.locate;
              }
              if (context.page) {
                body.context.page = context.page;
              }
              if (context.timezone) {
                body.context.timezone = context.timezone;
              }
              if (context.timezone) {
                body.context.timezone = context.timezone;
              }
              if (context.app) {
                const app = context.app.appUi;
                if (app) {
                  if (app.name) {
                    body.context.app.name = app.name;
                  }
                  if (app.version) {
                    body.context.app.version = app.version;
                  }
                  if (app.build) {
                    body.context.app.build = app.build;
                  }
                }
              }
              if (context.campaign) {
                const campaign = context.campaign.campaignUi;
                if (campaign) {
                  if (campaign.name) {
                    body.context.campaign.name = campaign.name;
                  }
                  if (campaign.source) {
                    body.context.campaign.source = campaign.source;
                  }
                  if (campaign.medium) {
                    body.context.campaign.medium = campaign.medium;
                  }
                  if (campaign.term) {
                    body.context.campaign.term = campaign.term;
                  }
                  if (campaign.content) {
                    body.context.campaign.content = campaign.content;
                  }
                }
              }
              if (context.device) {
                const device = context.device.deviceUi;
                if (device) {
                  if (device.id) {
                    body.context.device.id = device.id;
                  }
                  if (device.manufacturer) {
                    body.context.device.manufacturer = device.manufacturer;
                  }
                  if (device.model) {
                    body.context.device.model = device.model;
                  }
                  if (device.type) {
                    body.context.device.type = device.type;
                  }
                  if (device.version) {
                    body.context.device.version = device.version;
                  }
                }
              }
            }
            if (integrations) {
              if (integrations.all) {
                body.integrations.all = integrations.all;
              }
              if (integrations.salesforce) {
                body.integrations.salesforce = integrations.salesforce;
              }
            }
            responseData = await import_GenericFunctions.segmentApiRequest.call(this, "POST", "/group", body);
          }
        }
        if (resource === "identify") {
          if (operation === "create") {
            const userId = this.getNodeParameter("userId", i);
            const context = this.getNodeParameter("context", i).contextUi;
            const traits = this.getNodeParameter("traits", i).traitsUi;
            const integrations = this.getNodeParameter("integrations", i).integrationsUi;
            const body = {
              context: {
                app: {},
                campaign: {},
                device: {}
              },
              traits: {},
              integrations: {}
            };
            if (userId) {
              body.userId = userId;
            } else {
              body.anonymousId = (0, import_uuid.v4)();
            }
            if (context) {
              if (context.active) {
                body.context.active = context.active;
              }
              if (context.ip) {
                body.context.ip = context.ip;
              }
              if (context.locate) {
                body.context.locate = context.locate;
              }
              if (context.page) {
                body.context.page = context.page;
              }
              if (context.timezone) {
                body.context.timezone = context.timezone;
              }
              if (context.timezone) {
                body.context.timezone = context.timezone;
              }
              if (context.app) {
                const app = context.app.appUi;
                if (app) {
                  if (app.name) {
                    body.context.app.name = app.name;
                  }
                  if (app.version) {
                    body.context.app.version = app.version;
                  }
                  if (app.build) {
                    body.context.app.build = app.build;
                  }
                }
              }
              if (context.campaign) {
                const campaign = context.campaign.campaignUi;
                if (campaign) {
                  if (campaign.name) {
                    body.context.campaign.name = campaign.name;
                  }
                  if (campaign.source) {
                    body.context.campaign.source = campaign.source;
                  }
                  if (campaign.medium) {
                    body.context.campaign.medium = campaign.medium;
                  }
                  if (campaign.term) {
                    body.context.campaign.term = campaign.term;
                  }
                  if (campaign.content) {
                    body.context.campaign.content = campaign.content;
                  }
                }
              }
              if (context.device) {
                const device = context.device.deviceUi;
                if (device) {
                  if (device.id) {
                    body.context.device.id = device.id;
                  }
                  if (device.manufacturer) {
                    body.context.device.manufacturer = device.manufacturer;
                  }
                  if (device.model) {
                    body.context.device.model = device.model;
                  }
                  if (device.type) {
                    body.context.device.type = device.type;
                  }
                  if (device.version) {
                    body.context.device.version = device.version;
                  }
                }
              }
            }
            if (integrations) {
              if (integrations.all) {
                body.integrations.all = integrations.all;
              }
              if (integrations.salesforce) {
                body.integrations.salesforce = integrations.salesforce;
              }
            }
            if (traits) {
              if (traits && traits.length !== 0) {
                for (const trait of traits) {
                  body.traits[trait.key] = trait.value;
                }
              }
            }
            responseData = await import_GenericFunctions.segmentApiRequest.call(this, "POST", "/identify", body);
          }
        }
        if (resource === "track") {
          if (operation === "event") {
            const userId = this.getNodeParameter("userId", i);
            const event = this.getNodeParameter("event", i);
            const context = this.getNodeParameter("context", i).contextUi;
            const integrations = this.getNodeParameter("integrations", i).integrationsUi;
            const properties = this.getNodeParameter("properties", i).propertiesUi;
            const body = {
              event,
              traits: {},
              context: {
                app: {},
                campaign: {},
                device: {}
              },
              integrations: {},
              properties: {}
            };
            if (userId) {
              body.userId = userId;
            } else {
              body.anonymousId = (0, import_uuid.v4)();
            }
            if (context) {
              if (context.active) {
                body.context.active = context.active;
              }
              if (context.ip) {
                body.context.ip = context.ip;
              }
              if (context.locate) {
                body.context.locate = context.locate;
              }
              if (context.page) {
                body.context.page = context.page;
              }
              if (context.timezone) {
                body.context.timezone = context.timezone;
              }
              if (context.timezone) {
                body.context.timezone = context.timezone;
              }
              if (context.app) {
                const app = context.app.appUi;
                if (app) {
                  if (app.name) {
                    body.context.app.name = app.name;
                  }
                  if (app.version) {
                    body.context.app.version = app.version;
                  }
                  if (app.build) {
                    body.context.app.build = app.build;
                  }
                }
              }
              if (context.campaign) {
                const campaign = context.campaign.campaignUi;
                if (campaign) {
                  if (campaign.name) {
                    body.context.campaign.name = campaign.name;
                  }
                  if (campaign.source) {
                    body.context.campaign.source = campaign.source;
                  }
                  if (campaign.medium) {
                    body.context.campaign.medium = campaign.medium;
                  }
                  if (campaign.term) {
                    body.context.campaign.term = campaign.term;
                  }
                  if (campaign.content) {
                    body.context.campaign.content = campaign.content;
                  }
                }
              }
              if (context.device) {
                const device = context.device.deviceUi;
                if (device) {
                  if (device.id) {
                    body.context.device.id = device.id;
                  }
                  if (device.manufacturer) {
                    body.context.device.manufacturer = device.manufacturer;
                  }
                  if (device.model) {
                    body.context.device.model = device.model;
                  }
                  if (device.type) {
                    body.context.device.type = device.type;
                  }
                  if (device.version) {
                    body.context.device.version = device.version;
                  }
                }
              }
            }
            if (integrations) {
              if (integrations.all) {
                body.integrations.all = integrations.all;
              }
              if (integrations.salesforce) {
                body.integrations.salesforce = integrations.salesforce;
              }
            }
            if (properties) {
              if (properties && properties.length !== 0) {
                for (const property of properties) {
                  body.properties[property.key] = property.value;
                }
              }
            }
            responseData = await import_GenericFunctions.segmentApiRequest.call(this, "POST", "/track", body);
          }
          if (operation === "page") {
            const userId = this.getNodeParameter("userId", i);
            const name = this.getNodeParameter("name", i);
            const context = this.getNodeParameter("context", i).contextUi;
            const integrations = this.getNodeParameter("integrations", i).integrationsUi;
            const properties = this.getNodeParameter("properties", i).propertiesUi;
            const body = {
              name,
              traits: {},
              context: {
                app: {},
                campaign: {},
                device: {}
              },
              integrations: {},
              properties: {}
            };
            if (userId) {
              body.userId = userId;
            } else {
              body.anonymousId = (0, import_uuid.v4)();
            }
            if (context) {
              if (context.active) {
                body.context.active = context.active;
              }
              if (context.ip) {
                body.context.ip = context.ip;
              }
              if (context.locate) {
                body.context.locate = context.locate;
              }
              if (context.page) {
                body.context.page = context.page;
              }
              if (context.timezone) {
                body.context.timezone = context.timezone;
              }
              if (context.timezone) {
                body.context.timezone = context.timezone;
              }
              if (context.app) {
                const app = context.app.appUi;
                if (app) {
                  if (app.name) {
                    body.context.app.name = app.name;
                  }
                  if (app.version) {
                    body.context.app.version = app.version;
                  }
                  if (app.build) {
                    body.context.app.build = app.build;
                  }
                }
              }
              if (context.campaign) {
                const campaign = context.campaign.campaignUi;
                if (campaign) {
                  if (campaign.name) {
                    body.context.campaign.name = campaign.name;
                  }
                  if (campaign.source) {
                    body.context.campaign.source = campaign.source;
                  }
                  if (campaign.medium) {
                    body.context.campaign.medium = campaign.medium;
                  }
                  if (campaign.term) {
                    body.context.campaign.term = campaign.term;
                  }
                  if (campaign.content) {
                    body.context.campaign.content = campaign.content;
                  }
                }
              }
              if (context.device) {
                const device = context.device.deviceUi;
                if (device) {
                  if (device.id) {
                    body.context.device.id = device.id;
                  }
                  if (device.manufacturer) {
                    body.context.device.manufacturer = device.manufacturer;
                  }
                  if (device.model) {
                    body.context.device.model = device.model;
                  }
                  if (device.type) {
                    body.context.device.type = device.type;
                  }
                  if (device.version) {
                    body.context.device.version = device.version;
                  }
                }
              }
            }
            if (integrations) {
              if (integrations.all) {
                body.integrations.all = integrations.all;
              }
              if (integrations.salesforce) {
                body.integrations.salesforce = integrations.salesforce;
              }
            }
            if (properties) {
              if (properties && properties.length !== 0) {
                for (const property of properties) {
                  body.properties[property.key] = property.value;
                }
              }
            }
            responseData = await import_GenericFunctions.segmentApiRequest.call(this, "POST", "/page", body);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
      if (Array.isArray(responseData)) {
        returnData.push.apply(returnData, responseData);
      } else {
        returnData.push(responseData);
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Segment
});
//# sourceMappingURL=Segment.node.js.map