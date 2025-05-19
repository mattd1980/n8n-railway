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
var PhilipsHue_node_exports = {};
__export(PhilipsHue_node_exports, {
  PhilipsHue: () => PhilipsHue
});
module.exports = __toCommonJS(PhilipsHue_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_LightDescription = require("./LightDescription");
class PhilipsHue {
  constructor() {
    this.description = {
      displayName: "Philips Hue",
      name: "philipsHue",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:philipshue.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Philips Hue API",
      defaults: {
        name: "Philips Hue"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "philipsHueOAuth2Api",
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
              name: "Light",
              value: "light"
            }
          ],
          default: "light"
        },
        ...import_LightDescription.lightOperations,
        ...import_LightDescription.lightFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the lights to display them to user so that they can
        // select them easily
        async getLights() {
          const returnData = [];
          const user = await import_GenericFunctions.getUser.call(this);
          const lights = await import_GenericFunctions.philipsHueApiRequest.call(this, "GET", `/api/${user}/lights`);
          const groups = await import_GenericFunctions.philipsHueApiRequest.call(this, "GET", `/api/${user}/groups`);
          for (const light of Object.keys(lights)) {
            let lightName = lights[light].name;
            const lightId = light;
            for (const groupId of Object.keys(groups)) {
              if (groups[groupId].type === "Room" && groups[groupId].lights.includes(lightId)) {
                lightName = `${groups[groupId].name}: ${lightName}`;
              }
            }
            returnData.push({
              name: lightName,
              value: lightId
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
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "light") {
        if (operation === "update") {
          const lightId = this.getNodeParameter("lightId", i);
          const on = this.getNodeParameter("on", i);
          const additionalFields = this.getNodeParameter("additionalFields", i);
          const body = {
            on
          };
          if (additionalFields.transitiontime) {
            additionalFields.transitiontime = additionalFields.transitiontime * 100;
          }
          if (additionalFields.xy) {
            additionalFields.xy = additionalFields.xy.split(",").map((e) => parseFloat(e));
          }
          if (additionalFields.xy_inc) {
            additionalFields.xy_inc = additionalFields.xy_inc.split(",").map((e) => parseFloat(e));
          }
          Object.assign(body, additionalFields);
          const user = await import_GenericFunctions.getUser.call(this);
          const data = await import_GenericFunctions.philipsHueApiRequest.call(
            this,
            "PUT",
            `/api/${user}/lights/${lightId}/state`,
            body
          );
          responseData = {};
          for (const response of data) {
            Object.assign(responseData, response.success);
          }
        }
        if (operation === "delete") {
          const lightId = this.getNodeParameter("lightId", i);
          const user = await import_GenericFunctions.getUser.call(this);
          responseData = await import_GenericFunctions.philipsHueApiRequest.call(
            this,
            "DELETE",
            `/api/${user}/lights/${lightId}`
          );
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const user = await import_GenericFunctions.getUser.call(this);
          const lights = await import_GenericFunctions.philipsHueApiRequest.call(this, "GET", `/api/${user}/lights`);
          responseData = Object.values(lights);
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
        }
        if (operation === "get") {
          const lightId = this.getNodeParameter("lightId", i);
          const user = await import_GenericFunctions.getUser.call(this);
          responseData = await import_GenericFunctions.philipsHueApiRequest.call(
            this,
            "GET",
            `/api/${user}/lights/${lightId}`
          );
        }
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
  PhilipsHue
});
//# sourceMappingURL=PhilipsHue.node.js.map