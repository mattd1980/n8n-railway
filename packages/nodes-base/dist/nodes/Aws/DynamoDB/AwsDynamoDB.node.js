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
var AwsDynamoDB_node_exports = {};
__export(AwsDynamoDB_node_exports, {
  AwsDynamoDB: () => AwsDynamoDB
});
module.exports = __toCommonJS(AwsDynamoDB_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_ItemDescription = require("./ItemDescription");
var import_utils = require("./utils");
class AwsDynamoDB {
  constructor() {
    this.description = {
      displayName: "AWS DynamoDB",
      name: "awsDynamoDb",
      icon: "file:dynamodb.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the AWS DynamoDB API",
      defaults: {
        name: "AWS DynamoDB"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
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
              name: "Item",
              value: "item"
            }
          ],
          default: "item"
        },
        ...import_ItemDescription.itemOperations,
        ...import_ItemDescription.itemFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getTables() {
          const headers = {
            "Content-Type": "application/x-amz-json-1.0",
            "X-Amz-Target": "DynamoDB_20120810.ListTables"
          };
          const responseData = await import_GenericFunctions.awsApiRequest.call(this, "dynamodb", "POST", "/", {}, headers);
          return responseData.TableNames.map((table) => ({ name: table, value: table }));
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "item") {
          if (operation === "upsert") {
            const eavUi = this.getNodeParameter(
              "additionalFields.eavUi.eavValues",
              i,
              []
            );
            const conditionExpession = this.getNodeParameter(
              "conditionExpression",
              i,
              ""
            );
            const eanUi = this.getNodeParameter(
              "additionalFields.eanUi.eanValues",
              i,
              []
            );
            const body = {
              TableName: this.getNodeParameter("tableName", i)
            };
            const expressionAttributeValues = (0, import_utils.adjustExpressionAttributeValues)(eavUi);
            if (Object.keys(expressionAttributeValues).length) {
              body.ExpressionAttributeValues = expressionAttributeValues;
            }
            const expressionAttributeName = (0, import_utils.adjustExpressionAttributeName)(eanUi);
            if (Object.keys(expressionAttributeName).length) {
              body.expressionAttributeNames = expressionAttributeName;
            }
            if (conditionExpession) {
              body.ConditionExpression = conditionExpession;
            }
            const dataToSend = this.getNodeParameter("dataToSend", 0);
            const item = {};
            if (dataToSend === "autoMapInputData") {
              const incomingKeys = Object.keys(items[i].json);
              const rawInputsToIgnore = this.getNodeParameter("inputsToIgnore", i);
              const inputsToIgnore = rawInputsToIgnore.split(",").map((c) => c.trim());
              for (const key of incomingKeys) {
                if (inputsToIgnore.includes(key)) continue;
                item[key] = items[i].json[key];
              }
              body.Item = (0, import_utils.adjustPutItem)(item);
            } else {
              const fields = this.getNodeParameter("fieldsUi.fieldValues", i, []);
              fields.forEach(({ fieldId, fieldValue }) => item[fieldId] = fieldValue);
              body.Item = (0, import_utils.adjustPutItem)(item);
            }
            const headers = {
              "Content-Type": "application/x-amz-json-1.0",
              "X-Amz-Target": "DynamoDB_20120810.PutItem"
            };
            responseData = await import_GenericFunctions.awsApiRequest.call(this, "dynamodb", "POST", "/", body, headers);
            responseData = item;
          } else if (operation === "delete") {
            const body = {
              TableName: this.getNodeParameter("tableName", i),
              Key: {},
              ReturnValues: this.getNodeParameter("returnValues", 0)
            };
            const eavUi = this.getNodeParameter(
              "additionalFields.eavUi.eavValues",
              i,
              []
            );
            const eanUi = this.getNodeParameter(
              "additionalFields.eanUi.eanValues",
              i,
              []
            );
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const simple = this.getNodeParameter("simple", 0, false);
            const keyValues = this.getNodeParameter("keysUi.keyValues", i, []);
            for (const item of keyValues) {
              let value = item.value;
              value = ![null, void 0].includes(value) ? value?.toString() : "";
              body.Key[item.key] = { [item.type]: value };
            }
            const expressionAttributeValues = (0, import_utils.adjustExpressionAttributeValues)(eavUi);
            if (Object.keys(expressionAttributeValues).length) {
              body.ExpressionAttributeValues = expressionAttributeValues;
            }
            const expressionAttributeName = (0, import_utils.adjustExpressionAttributeName)(eanUi);
            if (Object.keys(expressionAttributeName).length) {
              body.expressionAttributeNames = expressionAttributeName;
            }
            const headers = {
              "Content-Type": "application/x-amz-json-1.0",
              "X-Amz-Target": "DynamoDB_20120810.DeleteItem"
            };
            if (additionalFields.conditionExpression) {
              body.ConditionExpression = additionalFields.conditionExpression;
            }
            responseData = await import_GenericFunctions.awsApiRequest.call(this, "dynamodb", "POST", "/", body, headers);
            if (!Object.keys(responseData).length) {
              responseData = { success: true };
            } else if (simple) {
              responseData = (0, import_utils.decodeItem)(responseData.Attributes);
            }
          } else if (operation === "get") {
            const tableName = this.getNodeParameter("tableName", 0);
            const simple = this.getNodeParameter("simple", 0, false);
            const select = this.getNodeParameter("select", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const eanUi = this.getNodeParameter(
              "additionalFields.eanUi.eanValues",
              i,
              []
            );
            const body = {
              TableName: tableName,
              Key: {},
              Select: select
            };
            Object.assign(body, additionalFields);
            const expressionAttributeName = (0, import_utils.adjustExpressionAttributeName)(eanUi);
            if (Object.keys(expressionAttributeName).length) {
              body.expressionAttributeNames = expressionAttributeName;
            }
            if (additionalFields.readType) {
              body.ConsistentRead = additionalFields.readType === "stronglyConsistentRead";
            }
            if (additionalFields.projectionExpression) {
              body.ProjectionExpression = additionalFields.projectionExpression;
            }
            const keyValues = this.getNodeParameter("keysUi.keyValues", i, []);
            for (const item of keyValues) {
              let value = item.value;
              value = ![null, void 0].includes(value) ? value?.toString() : "";
              body.Key[item.key] = { [item.type]: value };
            }
            const headers = {
              "X-Amz-Target": "DynamoDB_20120810.GetItem",
              "Content-Type": "application/x-amz-json-1.0"
            };
            responseData = await import_GenericFunctions.awsApiRequest.call(this, "dynamodb", "POST", "/", body, headers);
            responseData = responseData.Item;
            if (simple && responseData) {
              responseData = (0, import_utils.decodeItem)(responseData);
            }
          } else if (operation === "getAll") {
            const eavUi = this.getNodeParameter("eavUi.eavValues", i, []);
            const simple = this.getNodeParameter("simple", 0, false);
            const select = this.getNodeParameter("select", 0);
            const returnAll = this.getNodeParameter("returnAll", 0);
            const scan = this.getNodeParameter("scan", 0);
            const eanUi = this.getNodeParameter(
              "options.eanUi.eanValues",
              i,
              []
            );
            const body = {
              TableName: this.getNodeParameter("tableName", i)
            };
            if (scan) {
              const filterExpression2 = this.getNodeParameter("filterExpression", i);
              if (filterExpression2) {
                body.FilterExpression = filterExpression2;
              }
            } else {
              body.KeyConditionExpression = this.getNodeParameter(
                "keyConditionExpression",
                i
              );
            }
            const { indexName, projectionExpression, filterExpression } = this.getNodeParameter(
              "options",
              i
            );
            const expressionAttributeName = (0, import_utils.adjustExpressionAttributeName)(eanUi);
            if (Object.keys(expressionAttributeName).length) {
              body.ExpressionAttributeNames = expressionAttributeName;
            }
            const expressionAttributeValues = (0, import_utils.adjustExpressionAttributeValues)(eavUi);
            if (Object.keys(expressionAttributeValues).length) {
              body.ExpressionAttributeValues = expressionAttributeValues;
            }
            if (indexName) {
              body.IndexName = indexName;
            }
            if (projectionExpression && select !== "COUNT") {
              body.ProjectionExpression = projectionExpression;
            }
            if (filterExpression) {
              body.FilterExpression = filterExpression;
            }
            if (select) {
              body.Select = select;
            }
            const headers = {
              "Content-Type": "application/json",
              "X-Amz-Target": scan ? "DynamoDB_20120810.Scan" : "DynamoDB_20120810.Query"
            };
            if (returnAll && select !== "COUNT") {
              responseData = await import_GenericFunctions.awsApiRequestAllItems.call(
                this,
                "dynamodb",
                "POST",
                "/",
                body,
                headers
              );
            } else {
              body.Limit = this.getNodeParameter("limit", 0, 1);
              responseData = await import_GenericFunctions.awsApiRequest.call(this, "dynamodb", "POST", "/", body, headers);
              if (select !== "COUNT") {
                responseData = responseData.Items;
              }
            }
            if (simple) {
              responseData = responseData.map(import_utils.simplify);
            }
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
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
  AwsDynamoDB
});
//# sourceMappingURL=AwsDynamoDB.node.js.map