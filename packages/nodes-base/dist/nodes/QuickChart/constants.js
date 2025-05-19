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
var constants_exports = {};
__export(constants_exports, {
  CHART_TYPE_OPTIONS: () => CHART_TYPE_OPTIONS,
  Fill_CHARTS: () => Fill_CHARTS,
  HORIZONTAL_CHARTS: () => HORIZONTAL_CHARTS,
  ITEM_STYLE_CHARTS: () => ITEM_STYLE_CHARTS,
  POINT_STYLE_CHARTS: () => POINT_STYLE_CHARTS
});
module.exports = __toCommonJS(constants_exports);
const CHART_TYPE_OPTIONS = [
  {
    name: "Bar Chart",
    value: "bar"
  },
  {
    name: "Doughnut Chart",
    value: "doughnut"
  },
  {
    name: "Line Chart",
    value: "line"
  },
  {
    name: "Pie Chart",
    value: "pie"
  },
  {
    name: "Polar Chart",
    value: "polarArea"
  }
];
const HORIZONTAL_CHARTS = ["bar", "boxplot", "violin"];
const ITEM_STYLE_CHARTS = ["boxplot", "horizontalBoxplot", "violin", "horizontalViolin"];
const Fill_CHARTS = ["line"];
const POINT_STYLE_CHARTS = ["line"];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CHART_TYPE_OPTIONS,
  Fill_CHARTS,
  HORIZONTAL_CHARTS,
  ITEM_STYLE_CHARTS,
  POINT_STYLE_CHARTS
});
//# sourceMappingURL=constants.js.map