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
var QuickChart_node_exports = {};
__export(QuickChart_node_exports, {
  QuickChart: () => QuickChart
});
module.exports = __toCommonJS(QuickChart_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_constants = require("./constants");
class QuickChart {
  constructor() {
    this.description = {
      displayName: "QuickChart",
      name: "quickChart",
      icon: "file:quickChart.svg",
      group: ["output"],
      description: "Create a chart via QuickChart",
      version: 1,
      defaults: {
        name: "QuickChart"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Chart Type",
          name: "chartType",
          type: "options",
          default: "bar",
          options: import_constants.CHART_TYPE_OPTIONS,
          description: "The type of chart to create"
        },
        {
          displayName: "Add Labels",
          name: "labelsMode",
          type: "options",
          options: [
            {
              name: "Manually",
              value: "manually"
            },
            {
              name: "From Array",
              value: "array"
            }
          ],
          default: "manually"
        },
        {
          displayName: "Labels",
          name: "labelsUi",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true,
            sortable: true
          },
          default: {},
          required: true,
          description: "Labels to use in the chart",
          placeholder: "Add Label",
          options: [
            {
              name: "labelsValues",
              displayName: "Labels",
              values: [
                {
                  displayName: "Label",
                  name: "label",
                  type: "string",
                  default: ""
                }
              ]
            }
          ],
          displayOptions: {
            show: {
              labelsMode: ["manually"]
            }
          }
        },
        {
          displayName: "Labels Array",
          name: "labelsArray",
          type: "string",
          required: true,
          default: "",
          placeholder: 'e.g. ["Berlin", "Paris", "Rome", "New York"]',
          displayOptions: {
            show: {
              labelsMode: ["array"]
            }
          },
          description: "The array of labels to be used in the chart"
        },
        {
          displayName: "Data",
          name: "data",
          type: "json",
          default: "",
          description: 'Data to use for the dataset, documentation and examples <a href="https://quickchart.io/documentation/chart-types/" target="_blank">here</a>',
          placeholder: "e.g. [60, 10, 12, 20]",
          required: true
        },
        {
          displayName: "Put Output In Field",
          name: "output",
          type: "string",
          default: "data",
          required: true,
          description: "The binary data will be displayed in the Output panel on the right, under the Binary tab",
          hint: "The name of the output field to put the binary file data in"
        },
        {
          displayName: "Chart Options",
          name: "chartOptions",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Background Color",
              name: "backgroundColor",
              type: "color",
              typeOptions: {
                showAlpha: true
              },
              default: "",
              description: "Background color of the chart"
            },
            {
              displayName: "Device Pixel Ratio",
              name: "devicePixelRatio",
              type: "number",
              default: 2,
              typeOptions: {
                minValue: 1,
                maxValue: 2
              },
              description: "Pixel ratio of the chart"
            },
            {
              displayName: "Format",
              name: "format",
              type: "options",
              default: "png",
              description: "File format of the resulting chart",
              options: [
                {
                  name: "PNG",
                  value: "png"
                },
                {
                  name: "PDF",
                  value: "pdf"
                },
                {
                  name: "SVG",
                  value: "svg"
                },
                {
                  name: "WebP",
                  value: "webp"
                }
              ]
            },
            {
              displayName: "Height",
              name: "height",
              type: "number",
              default: 300,
              description: "Height of the chart"
            },
            {
              displayName: "Horizontal",
              name: "horizontal",
              type: "boolean",
              default: false,
              description: "Whether the chart should use its Y axis horizontal",
              displayOptions: {
                show: {
                  "/chartType": import_constants.HORIZONTAL_CHARTS
                }
              }
            },
            {
              displayName: "Width",
              name: "width",
              type: "number",
              default: 500,
              description: "Width of the chart"
            }
          ]
        },
        {
          displayName: "Dataset Options",
          name: "datasetOptions",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Background Color",
              name: "backgroundColor",
              type: "color",
              default: "",
              typeOptions: {
                showAlpha: true
              },
              description: "Color used for the background the dataset (area of a line graph, fill of a bar chart, etc.)"
            },
            {
              displayName: "Border Color",
              name: "borderColor",
              type: "color",
              typeOptions: {
                showAlpha: true
              },
              default: "",
              description: "Color used for lines of the dataset"
            },
            {
              displayName: "Fill",
              name: "fill",
              type: "boolean",
              default: true,
              description: "Whether to fill area of the dataset",
              displayOptions: {
                show: {
                  "/chartType": import_constants.Fill_CHARTS
                }
              }
            },
            {
              displayName: "Label",
              name: "label",
              type: "string",
              default: "",
              description: "The label of the dataset"
            },
            {
              displayName: "Point Style",
              name: "pointStyle",
              type: "options",
              default: "circle",
              description: "Style to use for points of the dataset",
              options: [
                {
                  name: "Circle",
                  value: "circle"
                },
                {
                  name: "Cross",
                  value: "cross"
                },
                {
                  name: "CrossRot",
                  value: "crossRot"
                },
                {
                  name: "Dash",
                  value: "dash"
                },
                {
                  name: "Line",
                  value: "line"
                },
                {
                  name: "Rect",
                  value: "rect"
                },
                {
                  name: "Rect Rot",
                  value: "rectRot"
                },
                {
                  name: "Rect Rounded",
                  value: "rectRounded"
                },
                {
                  name: "Star",
                  value: "star"
                },
                {
                  name: "Triangle",
                  value: "triangle"
                }
              ],
              displayOptions: {
                show: {
                  "/chartType": import_constants.POINT_STYLE_CHARTS
                }
              }
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const datasets = [];
    let chartType = "";
    const labels = [];
    const labelsMode = this.getNodeParameter("labelsMode", 0);
    if (labelsMode === "manually") {
      const labelsUi = this.getNodeParameter("labelsUi.labelsValues", 0, []);
      if (labelsUi.length) {
        for (const labelValue of labelsUi) {
          if (Array.isArray(labelValue.label)) {
            labels?.push(...labelValue.label);
          } else {
            labels?.push(labelValue.label);
          }
        }
      }
    } else {
      const labelsArray = this.getNodeParameter("labelsArray", 0, "");
      const errorMessage = "Labels Array is not a valid array, use valid JSON format, or specify it by expressions";
      if (Array.isArray(labelsArray)) {
        labels.push(...labelsArray);
      } else {
        const labelsArrayParsed = (0, import_n8n_workflow.jsonParse)(labelsArray, {
          errorMessage
        });
        if (!Array.isArray(labelsArrayParsed)) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), errorMessage);
        }
        labels.push(...labelsArrayParsed);
      }
    }
    for (let i = 0; i < items.length; i++) {
      const data = this.getNodeParameter("data", i);
      const datasetOptions = this.getNodeParameter("datasetOptions", i);
      const backgroundColor = datasetOptions.backgroundColor;
      const borderColor = datasetOptions.borderColor;
      const fill = datasetOptions.fill;
      const label = datasetOptions.label || "Chart";
      const pointStyle = datasetOptions.pointStyle;
      chartType = this.getNodeParameter("chartType", i);
      if (import_constants.HORIZONTAL_CHARTS.includes(chartType)) {
        const horizontal = this.getNodeParameter("chartOptions.horizontal", i, false);
        if (horizontal) {
          chartType = "horizontal" + chartType[0].toUpperCase() + chartType.substring(1, chartType.length);
        }
      }
      let pointStyleName = "pointStyle";
      if (import_constants.ITEM_STYLE_CHARTS.includes(chartType)) {
        pointStyleName = "itemStyle";
      }
      datasets.push({
        label,
        data,
        backgroundColor,
        borderColor,
        type: chartType,
        fill,
        [pointStyleName]: pointStyle
      });
    }
    const output = this.getNodeParameter("output", 0);
    const chartOptions = this.getNodeParameter("chartOptions", 0);
    const chart = {
      type: chartType,
      data: {
        labels,
        datasets
      }
    };
    const options = {
      method: "GET",
      url: "https://quickchart.io/chart",
      qs: {
        chart: JSON.stringify(chart),
        ...chartOptions
      },
      returnFullResponse: true,
      encoding: "arraybuffer",
      json: false
    };
    const response = await this.helpers.httpRequest(options);
    let mimeType = response.headers["content-type"];
    mimeType = mimeType ? mimeType.split(";").find((value) => value.includes("/")) : void 0;
    return [
      [
        {
          binary: {
            [output]: await this.helpers.prepareBinaryData(
              response.body,
              void 0,
              mimeType
            )
          },
          json: { chart }
        }
      ]
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QuickChart
});
//# sourceMappingURL=QuickChart.node.js.map