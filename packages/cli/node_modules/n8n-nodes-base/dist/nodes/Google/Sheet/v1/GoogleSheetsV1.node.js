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
var GoogleSheetsV1_node_exports = {};
__export(GoogleSheetsV1_node_exports, {
  GoogleSheetsV1: () => GoogleSheetsV1
});
module.exports = __toCommonJS(GoogleSheetsV1_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_GoogleSheet = require("./GoogleSheet");
var import_versionDescription = require("./versionDescription");
var import_utilities = require("../../../../utils/utilities");
var import_GenericFunctions2 = require("../../GenericFunctions");
class GoogleSheetsV1 {
  constructor(baseDescription) {
    this.methods = {
      loadOptions: {
        // Get all the sheets in a Spreadsheet
        async getSheets() {
          const spreadsheetId = this.getCurrentNodeParameter("sheetId");
          const sheet = new import_GoogleSheet.GoogleSheet(spreadsheetId, this);
          const responseData = await sheet.spreadsheetGetSheets();
          if (responseData === void 0) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No data got returned");
          }
          const returnData = [];
          for (const entry of responseData.sheets) {
            if (entry.properties.sheetType !== "GRID") {
              continue;
            }
            returnData.push({
              name: entry.properties.title,
              value: entry.properties.sheetId
            });
          }
          return returnData;
        }
      },
      credentialTest: {
        async googleApiCredentialTest(credential) {
          try {
            const tokenRequest = await import_GenericFunctions2.getGoogleAccessToken.call(this, credential.data, "sheetV1");
            if (!tokenRequest.access_token) {
              return {
                status: "Error",
                message: "Could not generate a token from your private key."
              };
            }
          } catch (err) {
            return {
              status: "Error",
              message: `Private key validation failed: ${err.message}`
            };
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...import_versionDescription.versionDescription
    };
  }
  async execute() {
    const operation = this.getNodeParameter("operation", 0);
    const resource = this.getNodeParameter("resource", 0);
    if (resource === "sheet") {
      const spreadsheetId = this.getNodeParameter("sheetId", 0);
      const sheet = new import_GoogleSheet.GoogleSheet(spreadsheetId, this);
      let range = "";
      if (!["create", "delete", "remove"].includes(operation)) {
        range = this.getNodeParameter("range", 0);
      }
      const options = this.getNodeParameter("options", 0, {});
      const valueInputMode = options.valueInputMode || "RAW";
      const valueRenderMode = options.valueRenderMode || "UNFORMATTED_VALUE";
      if (operation === "append") {
        try {
          const keyRow = parseInt(this.getNodeParameter("keyRow", 0), 10);
          const items = this.getInputData();
          const setData = [];
          items.forEach((item) => {
            setData.push(item.json);
          });
          const usePathForKeyRow = options.usePathForKeyRow || false;
          await sheet.appendSheetData(
            setData,
            sheet.encodeRange(range),
            keyRow,
            valueInputMode,
            usePathForKeyRow
          );
          return [items];
        } catch (error) {
          if (this.continueOnFail()) {
            return [[{ json: { error: error.message } }]];
          }
          throw error;
        }
      } else if (operation === "clear") {
        try {
          await sheet.clearData(sheet.encodeRange(range));
          const items = this.getInputData();
          return [items];
        } catch (error) {
          if (this.continueOnFail()) {
            return [[{ json: { error: error.message } }]];
          }
          throw error;
        }
      } else if (operation === "create") {
        const returnData = [];
        let responseData;
        for (let i = 0; i < this.getInputData().length; i++) {
          try {
            const sheetId = this.getNodeParameter("sheetId", i);
            const iterationOptions = this.getNodeParameter("options", i, {});
            const simple = this.getNodeParameter("simple", 0);
            const properties = { ...iterationOptions };
            if (iterationOptions.tabColor) {
              const { red, green, blue } = (0, import_GenericFunctions.hexToRgb)(iterationOptions.tabColor);
              properties.tabColor = { red: red / 255, green: green / 255, blue: blue / 255 };
            }
            const requests = [
              {
                addSheet: {
                  properties
                }
              }
            ];
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              `/v4/spreadsheets/${sheetId}:batchUpdate`,
              { requests }
            );
            if (simple) {
              Object.assign(responseData, responseData.replies[0].addSheet.properties);
              delete responseData.replies;
            }
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
        return [this.helpers.returnJsonArray(returnData)];
      } else if (operation === "delete") {
        try {
          const requests = [];
          const toDelete = this.getNodeParameter("toDelete", 0);
          const deletePropertyToDimensions = {
            columns: "COLUMNS",
            rows: "ROWS"
          };
          for (const propertyName of Object.keys(deletePropertyToDimensions)) {
            if (toDelete[propertyName] !== void 0) {
              toDelete[propertyName].forEach((entry) => {
                requests.push({
                  deleteDimension: {
                    range: {
                      sheetId: entry.sheetId,
                      dimension: deletePropertyToDimensions[propertyName],
                      startIndex: entry.startIndex,
                      endIndex: parseInt(entry.startIndex.toString(), 10) + parseInt(entry.amount.toString(), 10)
                    }
                  }
                });
              });
            }
          }
          await sheet.spreadsheetBatchUpdate(requests);
          const items = this.getInputData();
          return [items];
        } catch (error) {
          if (this.continueOnFail()) {
            return [[{ json: { error: error.message } }]];
          }
          throw error;
        }
      } else if (operation === "lookup") {
        try {
          const sheetData = await sheet.getData(sheet.encodeRange(range), valueRenderMode);
          if (sheetData === void 0) {
            return [];
          }
          const dataStartRow = parseInt(this.getNodeParameter("dataStartRow", 0), 10);
          const keyRow = parseInt(this.getNodeParameter("keyRow", 0), 10);
          const items = this.getInputData();
          const lookupValues = [];
          for (let i = 0; i < items.length; i++) {
            lookupValues.push({
              lookupColumn: this.getNodeParameter("lookupColumn", i),
              lookupValue: this.getNodeParameter("lookupValue", i)
            });
          }
          let returnData = await sheet.lookupValues(
            sheetData,
            keyRow,
            dataStartRow,
            lookupValues,
            options.returnAllMatches
          );
          if (returnData.length === 0 && options.continue && options.returnAllMatches) {
            returnData = [{}];
          } else if (returnData.length === 1 && Object.keys(returnData[0]).length === 0 && !options.continue && !options.returnAllMatches) {
            returnData = [];
          }
          const pairedItem = (0, import_utilities.generatePairedItemData)(items.length);
          const lookupOutput = returnData.map((item) => {
            return {
              json: item,
              pairedItem
            };
          });
          return [lookupOutput];
        } catch (error) {
          if (this.continueOnFail()) {
            return [this.helpers.returnJsonArray({ error: error.message })];
          }
          throw error;
        }
      } else if (operation === "read") {
        try {
          const rawData = this.getNodeParameter("rawData", 0);
          const sheetData = await sheet.getData(sheet.encodeRange(range), valueRenderMode);
          let returnData;
          if (!sheetData) {
            returnData = [];
          } else if (rawData) {
            const dataProperty = this.getNodeParameter("dataProperty", 0);
            returnData = [
              {
                [dataProperty]: sheetData
              }
            ];
          } else {
            const dataStartRow = parseInt(this.getNodeParameter("dataStartRow", 0), 10);
            const keyRow = parseInt(this.getNodeParameter("keyRow", 0), 10);
            returnData = sheet.structureArrayDataByColumn(sheetData, keyRow, dataStartRow);
          }
          if (returnData.length === 0 && options.continue) {
            returnData = [{}];
          }
          return [this.helpers.returnJsonArray(returnData)];
        } catch (error) {
          if (this.continueOnFail()) {
            return [this.helpers.returnJsonArray({ error: error.message })];
          }
          throw error;
        }
      } else if (operation === "remove") {
        const returnData = [];
        let responseData;
        for (let i = 0; i < this.getInputData().length; i++) {
          try {
            const id = this.getNodeParameter("id", i);
            const sheetId = this.getNodeParameter("sheetId", i);
            const requests = [
              {
                deleteSheet: {
                  sheetId: id
                }
              }
            ];
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              `/v4/spreadsheets/${sheetId}:batchUpdate`,
              { requests }
            );
            delete responseData.replies;
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
        return [this.helpers.returnJsonArray(returnData)];
      } else if (operation === "update" || operation === "upsert") {
        const upsert = operation === "upsert" ? true : false;
        try {
          const rawData = this.getNodeParameter("rawData", 0);
          const items = this.getInputData();
          if (rawData) {
            const dataProperty = this.getNodeParameter("dataProperty", 0);
            const updateData = [];
            for (let i = 0; i < items.length; i++) {
              updateData.push({
                range,
                values: items[i].json[dataProperty]
              });
            }
            await sheet.batchUpdate(updateData, valueInputMode);
          } else {
            const keyName = this.getNodeParameter("key", 0);
            const keyRow = parseInt(this.getNodeParameter("keyRow", 0), 10);
            const dataStartRow = parseInt(this.getNodeParameter("dataStartRow", 0), 10);
            const setData = [];
            items.forEach((item) => {
              setData.push(item.json);
            });
            await sheet.updateSheetData(
              setData,
              keyName,
              range,
              keyRow,
              dataStartRow,
              valueInputMode,
              valueRenderMode,
              upsert
            );
          }
          return [items];
        } catch (error) {
          if (this.continueOnFail()) {
            return [[{ json: { error: error.message } }]];
          }
          throw error;
        }
      }
    }
    if (resource === "spreadsheet") {
      const returnData = [];
      let responseData;
      if (operation === "create") {
        for (let i = 0; i < this.getInputData().length; i++) {
          try {
            const title = this.getNodeParameter("title", i);
            const sheetsUi = this.getNodeParameter("sheetsUi", i, {});
            const body = {
              properties: {
                title,
                autoRecalc: void 0,
                locale: void 0
              },
              sheets: []
            };
            const options = this.getNodeParameter("options", i, {});
            if (Object.keys(sheetsUi).length) {
              const data = [];
              const sheets = sheetsUi.sheetValues;
              for (const sheet of sheets) {
                const properties = sheet.propertiesUi;
                if (properties) {
                  data.push({ properties });
                }
              }
              body.sheets = data;
            }
            body.properties.autoRecalc = options.autoRecalc ? options.autoRecalc : void 0;
            body.properties.locale = options.locale ? options.locale : void 0;
            responseData = await import_GenericFunctions.googleApiRequest.call(this, "POST", "/v4/spreadsheets", body);
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
      return [this.helpers.returnJsonArray(returnData)];
    }
    return [];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleSheetsV1
});
//# sourceMappingURL=GoogleSheetsV1.node.js.map