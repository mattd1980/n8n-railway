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
var Phantombuster_node_exports = {};
__export(Phantombuster_node_exports, {
  Phantombuster: () => Phantombuster
});
module.exports = __toCommonJS(Phantombuster_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AgentDescription = require("./AgentDescription");
var import_GenericFunctions = require("./GenericFunctions");
class Phantombuster {
  constructor() {
    this.description = {
      displayName: "Phantombuster",
      name: "phantombuster",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:phantombuster.png",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Phantombuster API",
      defaults: {
        name: "Phantombuster"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "phantombusterApi",
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
              name: "Agent",
              value: "agent"
            }
          ],
          default: "agent"
        },
        ...import_AgentDescription.agentOperations,
        ...import_AgentDescription.agentFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getAgents() {
          const returnData = [];
          const responseData = await import_GenericFunctions.phantombusterApiRequest.call(this, "GET", "/agents/fetch-all");
          for (const item of responseData) {
            returnData.push({
              name: item.name,
              value: item.id
            });
          }
          return returnData;
        }
        // Get all the arguments to display them to user so that they can
        // select them easily
        // async getArguments(
        // 	this: ILoadOptionsFunctions,
        // ): Promise<INodePropertyOptions[]> {
        // 	const returnData: INodePropertyOptions[] = [];
        // 	const agentId = this.getCurrentNodeParameter('agentId') as string;
        // 	const { argument } = await phantombusterApiRequest.call(
        // 		this,
        // 		'GET',
        // 		'/agents/fetch',
        // 		{},
        // 		{ id: agentId },
        // 	);
        // 	for (const key of Object.keys(JSON.parse(argument))) {
        // 		returnData.push({
        // 			name: sentenceCase(key),
        // 			value: key,
        // 		});
        // 	}
        // 	return returnData;
        // },
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
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "agent") {
          if (operation === "delete") {
            const agentId = this.getNodeParameter("agentId", i);
            responseData = await import_GenericFunctions.phantombusterApiRequest.call(this, "POST", "/agents/delete", {
              id: agentId
            });
            responseData = { success: true };
          }
          if (operation === "get") {
            const agentId = this.getNodeParameter("agentId", i);
            responseData = await import_GenericFunctions.phantombusterApiRequest.call(
              this,
              "GET",
              "/agents/fetch",
              {},
              { id: agentId }
            );
          }
          if (operation === "getOutput") {
            const agentId = this.getNodeParameter("agentId", i);
            const resolveData = this.getNodeParameter("resolveData", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
            qs.id = agentId;
            responseData = await import_GenericFunctions.phantombusterApiRequest.call(
              this,
              "GET",
              "/agents/fetch-output",
              {},
              qs
            );
            if (resolveData) {
              const { resultObject } = await import_GenericFunctions.phantombusterApiRequest.call(
                this,
                "GET",
                "/containers/fetch-result-object",
                {},
                { id: responseData.containerId }
              );
              if (resultObject === null) {
                responseData = {};
              } else {
                responseData = JSON.parse(resultObject);
              }
            }
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.phantombusterApiRequest.call(this, "GET", "/agents/fetch-all");
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "launch") {
            const agentId = this.getNodeParameter("agentId", i);
            const jsonParameters = this.getNodeParameter("jsonParameters", i);
            const resolveData = this.getNodeParameter("resolveData", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              id: agentId
            };
            if (jsonParameters) {
              if (additionalFields.argumentsJson) {
                body.arguments = (0, import_GenericFunctions.validateJSON)(
                  this,
                  additionalFields.argumentsJson,
                  "Arguments"
                );
                delete additionalFields.argumentsJson;
              }
              if (additionalFields.bonusArgumentJson) {
                body.bonusArgument = (0, import_GenericFunctions.validateJSON)(
                  this,
                  additionalFields.bonusArgumentJson,
                  "Bonus Argument"
                );
                delete additionalFields.bonusArgumentJson;
              }
            } else {
              const argumentParameters = additionalFields.argumentsUi?.argumentValues || [];
              body.arguments = argumentParameters.reduce((object, currentValue) => {
                object[currentValue.key] = currentValue.value;
                return object;
              }, {});
              delete additionalFields.argumentsUi;
              const bonusParameters = additionalFields.bonusArgumentUi?.bonusArgumentValue || [];
              body.bonusArgument = bonusParameters.reduce((object, currentValue) => {
                object[currentValue.key] = currentValue.value;
                return object;
              }, {});
              delete additionalFields.bonusArgumentUi;
            }
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.phantombusterApiRequest.call(this, "POST", "/agents/launch", body);
            if (resolveData) {
              responseData = await import_GenericFunctions.phantombusterApiRequest.call(
                this,
                "GET",
                "/containers/fetch",
                {},
                { id: responseData.containerId }
              );
            }
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
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
  Phantombuster
});
//# sourceMappingURL=Phantombuster.node.js.map