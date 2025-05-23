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
var OpenWeatherMap_node_exports = {};
__export(OpenWeatherMap_node_exports, {
  OpenWeatherMap: () => OpenWeatherMap
});
module.exports = __toCommonJS(OpenWeatherMap_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class OpenWeatherMap {
  constructor() {
    this.description = {
      displayName: "OpenWeatherMap",
      name: "openWeatherMap",
      icon: "file:openWeatherMap.svg",
      group: ["input"],
      version: 1,
      description: "Gets current and future weather information",
      defaults: {
        name: "OpenWeatherMap"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "openWeatherMapApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Current Weather",
              value: "currentWeather",
              description: "Returns the current weather data",
              action: "Return current weather data"
            },
            {
              name: "5 Day Forecast",
              value: "5DayForecast",
              description: "Returns the weather data for the next 5 days",
              action: "Return weather data for the next 5 days"
            }
          ],
          default: "currentWeather"
        },
        {
          displayName: "Format",
          name: "format",
          type: "options",
          options: [
            {
              name: "Imperial",
              value: "imperial",
              description: "Fahrenheit | miles/hour"
            },
            {
              name: "Metric",
              value: "metric",
              description: "Celsius | meter/sec"
            },
            {
              name: "Scientific",
              value: "standard",
              description: "Kelvin | meter/sec"
            }
          ],
          default: "metric",
          description: "The format in which format the data should be returned"
        },
        // ----------------------------------
        //         Location Information
        // ----------------------------------
        {
          displayName: "Location Selection",
          name: "locationSelection",
          type: "options",
          options: [
            {
              name: "City Name",
              value: "cityName"
            },
            {
              name: "City ID",
              value: "cityId"
            },
            {
              name: "Coordinates",
              value: "coordinates"
            },
            {
              name: "Zip Code",
              value: "zipCode"
            }
          ],
          default: "cityName",
          description: "How to define the location for which to return the weather"
        },
        {
          displayName: "City",
          name: "cityName",
          type: "string",
          default: "",
          placeholder: "berlin,de",
          required: true,
          displayOptions: {
            show: {
              locationSelection: ["cityName"]
            }
          },
          description: "The name of the city to return the weather of"
        },
        {
          displayName: "City ID",
          name: "cityId",
          type: "number",
          default: 160001123,
          required: true,
          displayOptions: {
            show: {
              locationSelection: ["cityId"]
            }
          },
          description: "The ID of city to return the weather of. List can be downloaded here: http://bulk.openweathermap.org/sample/."
        },
        {
          displayName: "Latitude",
          name: "latitude",
          type: "string",
          default: "",
          placeholder: "13.39",
          required: true,
          displayOptions: {
            show: {
              locationSelection: ["coordinates"]
            }
          },
          description: "The latitude of the location to return the weather of"
        },
        {
          displayName: "Longitude",
          name: "longitude",
          type: "string",
          default: "",
          placeholder: "52.52",
          required: true,
          displayOptions: {
            show: {
              locationSelection: ["coordinates"]
            }
          },
          description: "The longitude of the location to return the weather of"
        },
        {
          displayName: "Zip Code",
          name: "zipCode",
          type: "string",
          default: "",
          placeholder: "10115,de",
          required: true,
          displayOptions: {
            show: {
              locationSelection: ["zipCode"]
            }
          },
          description: "The ID of city to return the weather of. List can be downloaded here: http://bulk.openweathermap.org/sample/."
        },
        {
          displayName: "Language",
          name: "language",
          type: "string",
          default: "",
          placeholder: "en",
          description: "The two letter language code to get your output in (eg. en, de, ...)."
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const credentials = await this.getCredentials("openWeatherMapApi");
    const operation = this.getNodeParameter("operation", 0);
    let endpoint = "";
    let locationSelection;
    let language;
    let qs;
    for (let i = 0; i < items.length; i++) {
      try {
        qs = {
          APPID: credentials.accessToken,
          units: this.getNodeParameter("format", i)
        };
        locationSelection = this.getNodeParameter("locationSelection", i);
        if (locationSelection === "cityName") {
          qs.q = this.getNodeParameter("cityName", i);
        } else if (locationSelection === "cityId") {
          qs.id = this.getNodeParameter("cityId", i);
        } else if (locationSelection === "coordinates") {
          qs.lat = this.getNodeParameter("latitude", i);
          qs.lon = this.getNodeParameter("longitude", i);
        } else if (locationSelection === "zipCode") {
          qs.zip = this.getNodeParameter("zipCode", i);
        } else {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The locationSelection "${locationSelection}" is not known!`,
            { itemIndex: i }
          );
        }
        language = this.getNodeParameter("language", i);
        if (language) {
          qs.lang = language;
        }
        if (operation === "currentWeather") {
          endpoint = "weather";
        } else if (operation === "5DayForecast") {
          endpoint = "forecast";
        } else {
          throw new import_n8n_workflow.NodeOperationError(
            this.getNode(),
            `The operation "${operation}" is not known!`,
            { itemIndex: i }
          );
        }
        const options = {
          method: "GET",
          qs,
          uri: `https://api.openweathermap.org/data/2.5/${endpoint}`,
          json: true
        };
        let responseData;
        try {
          responseData = await this.helpers.request(options);
        } catch (error) {
          throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
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
  OpenWeatherMap
});
//# sourceMappingURL=OpenWeatherMap.node.js.map