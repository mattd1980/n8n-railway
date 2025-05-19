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
var apiResponses_exports = {};
__export(apiResponses_exports, {
  currentWeatherResponse: () => currentWeatherResponse
});
module.exports = __toCommonJS(apiResponses_exports);
const currentWeatherResponse = {
  coord: {
    lon: 13.4105,
    lat: 52.5244
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04n"
    }
  ],
  base: "stations",
  main: {
    temp: 4.85,
    feels_like: 3.42,
    temp_min: 3.9,
    temp_max: 5.5,
    pressure: 1034,
    humidity: 85,
    sea_level: 1034,
    grnd_level: 1028
  },
  visibility: 1e4,
  wind: {
    speed: 1.79,
    deg: 270
  },
  clouds: {
    all: 100
  },
  dt: 1732901176,
  sys: {
    type: 2,
    id: 2011538,
    country: "DE",
    sunrise: 1732863129,
    sunset: 1732892267
  },
  timezone: 3600,
  id: 2950159,
  name: "Berlin",
  cod: 200
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  currentWeatherResponse
});
//# sourceMappingURL=apiResponses.js.map