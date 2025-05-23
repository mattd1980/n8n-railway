"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var EditImage_node_exports = {};
__export(EditImage_node_exports, {
  EditImage: () => EditImage
});
module.exports = __toCommonJS(EditImage_node_exports);
var import_promises = require("fs/promises");
var import_get_system_fonts = __toESM(require("get-system-fonts"));
var import_gm = __toESM(require("gm"));
var import_n8n_workflow = require("n8n-workflow");
var import_path = require("path");
var import_tmp_promise = require("tmp-promise");
const nodeOperations = [
  {
    name: "Blur",
    value: "blur",
    description: "Adds a blur to the image and so makes it less sharp",
    action: "Blur Image"
  },
  {
    name: "Border",
    value: "border",
    description: "Adds a border to the image",
    action: "Border Image"
  },
  {
    name: "Composite",
    value: "composite",
    description: "Composite image on top of another one",
    action: "Composite Image"
  },
  {
    name: "Create",
    value: "create",
    description: "Create a new image",
    action: "Create Image"
  },
  {
    name: "Crop",
    value: "crop",
    description: "Crops the image",
    action: "Crop Image"
  },
  {
    name: "Draw",
    value: "draw",
    description: "Draw on image",
    action: "Draw Image"
  },
  {
    name: "Rotate",
    value: "rotate",
    description: "Rotate image",
    action: "Rotate Image"
  },
  {
    name: "Resize",
    value: "resize",
    description: "Change the size of image",
    action: "Resize Image"
  },
  {
    name: "Shear",
    value: "shear",
    description: "Shear image along the X or Y axis",
    action: "Shear Image"
  },
  {
    name: "Text",
    value: "text",
    description: "Adds text to image",
    action: "Apply Text to Image"
  },
  {
    name: "Transparent",
    value: "transparent",
    description: "Make a color in image transparent",
    action: "Add Transparency to Image"
  }
];
const nodeOperationOptions = [
  // ----------------------------------
  //         create
  // ----------------------------------
  {
    displayName: "Background Color",
    name: "backgroundColor",
    type: "color",
    default: "#ffffff00",
    typeOptions: {
      showAlpha: true
    },
    displayOptions: {
      show: {
        operation: ["create"]
      }
    },
    description: "The background color of the image to create"
  },
  {
    displayName: "Image Width",
    name: "width",
    type: "number",
    default: 50,
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        operation: ["create"]
      }
    },
    description: "The width of the image to create"
  },
  {
    displayName: "Image Height",
    name: "height",
    type: "number",
    default: 50,
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        operation: ["create"]
      }
    },
    description: "The height of the image to create"
  },
  // ----------------------------------
  //         draw
  // ----------------------------------
  {
    displayName: "Primitive",
    name: "primitive",
    type: "options",
    displayOptions: {
      show: {
        operation: ["draw"]
      }
    },
    options: [
      {
        name: "Circle",
        value: "circle"
      },
      {
        name: "Line",
        value: "line"
      },
      {
        name: "Rectangle",
        value: "rectangle"
      }
    ],
    default: "rectangle",
    description: "The primitive to draw"
  },
  {
    displayName: "Color",
    name: "color",
    type: "color",
    default: "#ff000000",
    typeOptions: {
      showAlpha: true
    },
    displayOptions: {
      show: {
        operation: ["draw"]
      }
    },
    description: "The color of the primitive to draw"
  },
  {
    displayName: "Start Position X",
    name: "startPositionX",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        operation: ["draw"],
        primitive: ["circle", "line", "rectangle"]
      }
    },
    description: "X (horizontal) start position of the primitive"
  },
  {
    displayName: "Start Position Y",
    name: "startPositionY",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        operation: ["draw"],
        primitive: ["circle", "line", "rectangle"]
      }
    },
    description: "Y (horizontal) start position of the primitive"
  },
  {
    displayName: "End Position X",
    name: "endPositionX",
    type: "number",
    default: 250,
    displayOptions: {
      show: {
        operation: ["draw"],
        primitive: ["circle", "line", "rectangle"]
      }
    },
    description: "X (horizontal) end position of the primitive"
  },
  {
    displayName: "End Position Y",
    name: "endPositionY",
    type: "number",
    default: 250,
    displayOptions: {
      show: {
        operation: ["draw"],
        primitive: ["circle", "line", "rectangle"]
      }
    },
    description: "Y (horizontal) end position of the primitive"
  },
  {
    displayName: "Corner Radius",
    name: "cornerRadius",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["draw"],
        primitive: ["rectangle"]
      }
    },
    description: "The radius of the corner to create round corners"
  },
  // ----------------------------------
  //         text
  // ----------------------------------
  {
    displayName: "Text",
    name: "text",
    typeOptions: {
      rows: 5
    },
    type: "string",
    default: "",
    placeholder: "Text to render",
    displayOptions: {
      show: {
        operation: ["text"]
      }
    },
    description: "Text to write on the image"
  },
  {
    displayName: "Font Size",
    name: "fontSize",
    type: "number",
    default: 18,
    displayOptions: {
      show: {
        operation: ["text"]
      }
    },
    description: "Size of the text"
  },
  {
    displayName: "Font Color",
    name: "fontColor",
    type: "color",
    default: "#000000",
    displayOptions: {
      show: {
        operation: ["text"]
      }
    },
    description: "Color of the text"
  },
  {
    displayName: "Position X",
    name: "positionX",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        operation: ["text"]
      }
    },
    description: "X (horizontal) position of the text"
  },
  {
    displayName: "Position Y",
    name: "positionY",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        operation: ["text"]
      }
    },
    description: "Y (vertical) position of the text"
  },
  {
    displayName: "Max Line Length",
    name: "lineLength",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    default: 80,
    displayOptions: {
      show: {
        operation: ["text"]
      }
    },
    description: "Max amount of characters in a line before a line-break should get added"
  },
  // ----------------------------------
  //         blur
  // ----------------------------------
  {
    displayName: "Blur",
    name: "blur",
    type: "number",
    typeOptions: {
      minValue: 0,
      maxValue: 1e3
    },
    default: 5,
    displayOptions: {
      show: {
        operation: ["blur"]
      }
    },
    description: "How strong the blur should be"
  },
  {
    displayName: "Sigma",
    name: "sigma",
    type: "number",
    typeOptions: {
      minValue: 0,
      maxValue: 1e3
    },
    default: 2,
    displayOptions: {
      show: {
        operation: ["blur"]
      }
    },
    description: "The sigma of the blur"
  },
  // ----------------------------------
  //         border
  // ----------------------------------
  {
    displayName: "Border Width",
    name: "borderWidth",
    type: "number",
    default: 10,
    displayOptions: {
      show: {
        operation: ["border"]
      }
    },
    description: "The width of the border"
  },
  {
    displayName: "Border Height",
    name: "borderHeight",
    type: "number",
    default: 10,
    displayOptions: {
      show: {
        operation: ["border"]
      }
    },
    description: "The height of the border"
  },
  {
    displayName: "Border Color",
    name: "borderColor",
    type: "color",
    default: "#000000",
    displayOptions: {
      show: {
        operation: ["border"]
      }
    },
    description: "Color of the border"
  },
  // ----------------------------------
  //         composite
  // ----------------------------------
  {
    displayName: "Composite Image Property",
    name: "dataPropertyNameComposite",
    type: "string",
    default: "",
    placeholder: "data2",
    displayOptions: {
      show: {
        operation: ["composite"]
      }
    },
    description: "The name of the binary property which contains the data of the image to composite on top of image which is found in Property Name"
  },
  {
    displayName: "Operator",
    name: "operator",
    type: "options",
    displayOptions: {
      show: {
        operation: ["composite"]
      }
    },
    options: [
      {
        name: "Add",
        value: "Add"
      },
      {
        name: "Atop",
        value: "Atop"
      },
      {
        name: "Bumpmap",
        value: "Bumpmap"
      },
      {
        name: "Copy",
        value: "Copy"
      },
      {
        name: "Copy Black",
        value: "CopyBlack"
      },
      {
        name: "Copy Blue",
        value: "CopyBlue"
      },
      {
        name: "Copy Cyan",
        value: "CopyCyan"
      },
      {
        name: "Copy Green",
        value: "CopyGreen"
      },
      {
        name: "Copy Magenta",
        value: "CopyMagenta"
      },
      {
        name: "Copy Opacity",
        value: "CopyOpacity"
      },
      {
        name: "Copy Red",
        value: "CopyRed"
      },
      {
        name: "Copy Yellow",
        value: "CopyYellow"
      },
      {
        name: "Difference",
        value: "Difference"
      },
      {
        name: "Divide",
        value: "Divide"
      },
      {
        name: "In",
        value: "In"
      },
      {
        name: "Minus",
        value: "Minus"
      },
      {
        name: "Multiply",
        value: "Multiply"
      },
      {
        name: "Out",
        value: "Out"
      },
      {
        name: "Over",
        value: "Over"
      },
      {
        name: "Plus",
        value: "Plus"
      },
      {
        name: "Subtract",
        value: "Subtract"
      },
      {
        name: "Xor",
        value: "Xor"
      }
    ],
    default: "Over",
    description: "The operator to use to combine the images"
  },
  {
    displayName: "Position X",
    name: "positionX",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["composite"]
      }
    },
    description: "X (horizontal) position of composite image"
  },
  {
    displayName: "Position Y",
    name: "positionY",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["composite"]
      }
    },
    description: "Y (vertical) position of composite image"
  },
  // ----------------------------------
  //         crop
  // ----------------------------------
  {
    displayName: "Width",
    name: "width",
    type: "number",
    default: 500,
    displayOptions: {
      show: {
        operation: ["crop"]
      }
    },
    description: "Crop width"
  },
  {
    displayName: "Height",
    name: "height",
    type: "number",
    default: 500,
    displayOptions: {
      show: {
        operation: ["crop"]
      }
    },
    description: "Crop height"
  },
  {
    displayName: "Position X",
    name: "positionX",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["crop"]
      }
    },
    description: "X (horizontal) position to crop from"
  },
  {
    displayName: "Position Y",
    name: "positionY",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["crop"]
      }
    },
    description: "Y (vertical) position to crop from"
  },
  // ----------------------------------
  //         resize
  // ----------------------------------
  {
    displayName: "Width",
    name: "width",
    type: "number",
    default: 500,
    displayOptions: {
      show: {
        operation: ["resize"]
      }
    },
    description: "New width of the image"
  },
  {
    displayName: "Height",
    name: "height",
    type: "number",
    default: 500,
    displayOptions: {
      show: {
        operation: ["resize"]
      }
    },
    description: "New height of the image"
  },
  {
    displayName: "Option",
    name: "resizeOption",
    type: "options",
    options: [
      {
        name: "Ignore Aspect Ratio",
        value: "ignoreAspectRatio",
        description: "Ignore aspect ratio and resize exactly to specified values"
      },
      {
        name: "Maximum Area",
        value: "maximumArea",
        description: "Specified values are maximum area"
      },
      {
        name: "Minimum Area",
        value: "minimumArea",
        description: "Specified values are minimum area"
      },
      {
        name: "Only if Larger",
        value: "onlyIfLarger",
        description: "Resize only if image is larger than width or height"
      },
      {
        name: "Only if Smaller",
        value: "onlyIfSmaller",
        description: "Resize only if image is smaller than width or height"
      },
      {
        name: "Percent",
        value: "percent",
        description: "Width and height are specified in percents"
      }
    ],
    default: "maximumArea",
    displayOptions: {
      show: {
        operation: ["resize"]
      }
    },
    description: "How to resize the image"
  },
  // ----------------------------------
  //         rotate
  // ----------------------------------
  {
    displayName: "Rotate",
    name: "rotate",
    type: "number",
    typeOptions: {
      minValue: -360,
      maxValue: 360
    },
    default: 0,
    displayOptions: {
      show: {
        operation: ["rotate"]
      }
    },
    description: "How much the image should be rotated"
  },
  {
    displayName: "Background Color",
    name: "backgroundColor",
    type: "color",
    default: "#ffffffff",
    typeOptions: {
      showAlpha: true
    },
    displayOptions: {
      show: {
        operation: ["rotate"]
      }
    },
    description: "The color to use for the background when image gets rotated by anything which is not a multiple of 90"
  },
  // ----------------------------------
  //         shear
  // ----------------------------------
  {
    displayName: "Degrees X",
    name: "degreesX",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["shear"]
      }
    },
    description: "X (horizontal) shear degrees"
  },
  {
    displayName: "Degrees Y",
    name: "degreesY",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        operation: ["shear"]
      }
    },
    description: "Y (vertical) shear degrees"
  },
  // ----------------------------------
  //         transparent
  // ----------------------------------
  {
    displayName: "Color",
    name: "color",
    type: "color",
    default: "#ff0000",
    displayOptions: {
      show: {
        operation: ["transparent"]
      }
    },
    description: "The color to make transparent"
  }
];
class EditImage {
  constructor() {
    this.description = {
      displayName: "Edit Image",
      name: "editImage",
      icon: "fa:image",
      iconColor: "purple",
      group: ["transform"],
      version: 1,
      description: "Edits an image like blur, resize or adding border and text",
      defaults: {
        name: "Edit Image",
        color: "#553399"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Get Information",
              value: "information",
              description: "Returns image information like resolution"
            },
            {
              name: "Multi Step",
              value: "multiStep",
              description: "Perform multiple operations"
            },
            ...nodeOperations
          ].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          }),
          default: "border"
        },
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          description: "Name of the binary property in which the image data can be found"
        },
        // ----------------------------------
        //         multiStep
        // ----------------------------------
        {
          displayName: "Operations",
          name: "operations",
          placeholder: "Add Operation",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: true,
            sortable: true
          },
          displayOptions: {
            show: {
              operation: ["multiStep"]
            }
          },
          description: "The operations to perform",
          default: {},
          options: [
            {
              name: "operations",
              displayName: "Operations",
              values: [
                {
                  displayName: "Operation",
                  name: "operation",
                  type: "options",
                  noDataExpression: true,
                  options: nodeOperations,
                  default: ""
                },
                ...nodeOperationOptions,
                {
                  displayName: "Font Name or ID",
                  name: "font",
                  type: "options",
                  displayOptions: {
                    show: {
                      operation: ["text"]
                    }
                  },
                  typeOptions: {
                    loadOptionsMethod: "getFonts"
                  },
                  default: "",
                  description: 'The font to use. Defaults to Arial. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
                }
              ]
            }
          ]
        },
        ...nodeOperationOptions,
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            hide: {
              operation: ["information"]
            }
          },
          options: [
            {
              displayName: "File Name",
              name: "fileName",
              type: "string",
              default: "",
              description: "File name to set in binary data"
            },
            {
              displayName: "Font Name or ID",
              name: "font",
              type: "options",
              displayOptions: {
                show: {
                  "/operation": ["text"]
                }
              },
              typeOptions: {
                loadOptionsMethod: "getFonts"
              },
              default: "",
              description: 'The font to use. Defaults to Arial. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
            },
            {
              displayName: "Format",
              name: "format",
              type: "options",
              options: [
                {
                  name: "bmp",
                  value: "bmp"
                },
                {
                  name: "gif",
                  value: "gif"
                },
                {
                  name: "jpeg",
                  value: "jpeg"
                },
                {
                  name: "png",
                  value: "png"
                },
                {
                  name: "tiff",
                  value: "tiff"
                },
                {
                  name: "WebP",
                  value: "webp"
                }
              ],
              default: "jpeg",
              description: "Set the output image format"
            },
            {
              displayName: "Quality",
              name: "quality",
              type: "number",
              typeOptions: {
                minValue: 0,
                maxValue: 100
              },
              default: 100,
              displayOptions: {
                show: {
                  format: ["jpeg", "png", "tiff"]
                }
              },
              description: "Sets the jpeg|png|tiff compression level from 0 to 100 (best)"
            }
          ]
        }
      ]
    };
    this.methods = {
      loadOptions: {
        async getFonts() {
          const files = await (0, import_get_system_fonts.default)();
          const returnData = [];
          files.forEach((entry) => {
            const pathParts = (0, import_path.parse)(entry);
            if (!pathParts.ext) {
              return;
            }
            returnData.push({
              name: pathParts.name,
              value: entry
            });
          });
          returnData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let item;
    for (let itemIndex = 0; itemIndex < length; itemIndex++) {
      try {
        item = items[itemIndex];
        const operation = this.getNodeParameter("operation", itemIndex);
        const dataPropertyName = this.getNodeParameter("dataPropertyName", itemIndex);
        const options = this.getNodeParameter("options", itemIndex, {});
        const cleanupFunctions = [];
        let gmInstance;
        const requiredOperationParameters = {
          blur: ["blur", "sigma"],
          border: ["borderColor", "borderWidth", "borderHeight"],
          create: ["backgroundColor", "height", "width"],
          crop: ["height", "positionX", "positionY", "width"],
          composite: ["dataPropertyNameComposite", "operator", "positionX", "positionY"],
          draw: [
            "color",
            "cornerRadius",
            "endPositionX",
            "endPositionY",
            "primitive",
            "startPositionX",
            "startPositionY"
          ],
          information: [],
          resize: ["height", "resizeOption", "width"],
          rotate: ["backgroundColor", "rotate"],
          shear: ["degreesX", "degreesY"],
          text: ["font", "fontColor", "fontSize", "lineLength", "positionX", "positionY", "text"],
          transparent: ["color"]
        };
        let operations = [];
        if (operation === "multiStep") {
          const operationsData = this.getNodeParameter("operations", itemIndex, {
            operations: []
          });
          operations = operationsData.operations;
        } else {
          const operationParameters = {};
          requiredOperationParameters[operation].forEach((parameterName) => {
            try {
              operationParameters[parameterName] = this.getNodeParameter(parameterName, itemIndex);
            } catch (error) {
            }
          });
          operations = [
            {
              operation,
              ...operationParameters
            }
          ];
        }
        if (operations[0].operation !== "create") {
          this.helpers.assertBinaryData(itemIndex, dataPropertyName);
          const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
            itemIndex,
            dataPropertyName
          );
          gmInstance = (0, import_gm.default)(binaryDataBuffer);
          gmInstance = gmInstance.background("transparent");
        }
        const newItem = {
          json: item.json,
          binary: {},
          pairedItem: {
            item: itemIndex
          }
        };
        if (operation === "information") {
          const imageData = await new Promise((resolve, reject) => {
            gmInstance = gmInstance.identify((error, data) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(data);
            });
          });
          newItem.json = imageData;
        }
        for (let i = 0; i < operations.length; i++) {
          const operationData = operations[i];
          if (operationData.operation === "blur") {
            gmInstance = gmInstance.blur(
              operationData.blur,
              operationData.sigma
            );
          } else if (operationData.operation === "border") {
            gmInstance = gmInstance.borderColor(operationData.borderColor).border(operationData.borderWidth, operationData.borderHeight);
          } else if (operationData.operation === "composite") {
            const positionX = operationData.positionX;
            const positionY = operationData.positionY;
            const operator = operationData.operator;
            const geometryString = (positionX >= 0 ? "+" : "") + positionX + (positionY >= 0 ? "+" : "") + positionY;
            const binaryPropertyName = operationData.dataPropertyNameComposite;
            this.helpers.assertBinaryData(itemIndex, binaryPropertyName);
            const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
              itemIndex,
              binaryPropertyName
            );
            const { path, cleanup } = await (0, import_tmp_promise.file)();
            cleanupFunctions.push(cleanup);
            await (0, import_promises.writeFile)(path, binaryDataBuffer);
            if (operations[0].operation === "create") {
              gmInstance = (0, import_gm.default)(gmInstance.stream("png")).compose(operator).geometry(geometryString).composite(path);
            } else {
              gmInstance = gmInstance.compose(operator).geometry(geometryString).composite(path);
            }
            if (operations.length !== i + 1) {
              gmInstance = (0, import_gm.default)(gmInstance.stream());
            }
          } else if (operationData.operation === "create") {
            gmInstance = (0, import_gm.default)(
              operationData.width,
              operationData.height,
              operationData.backgroundColor
            );
            if (!options.format) {
              options.format = "png";
            }
          } else if (operationData.operation === "crop") {
            gmInstance = gmInstance.crop(
              operationData.width,
              operationData.height,
              operationData.positionX,
              operationData.positionY
            );
          } else if (operationData.operation === "draw") {
            gmInstance = gmInstance.fill(operationData.color);
            if (operationData.primitive === "line") {
              gmInstance = gmInstance.drawLine(
                operationData.startPositionX,
                operationData.startPositionY,
                operationData.endPositionX,
                operationData.endPositionY
              );
            } else if (operationData.primitive === "circle") {
              gmInstance = gmInstance.drawCircle(
                operationData.startPositionX,
                operationData.startPositionY,
                operationData.endPositionX,
                operationData.endPositionY
              );
            } else if (operationData.primitive === "rectangle") {
              gmInstance = gmInstance.drawRectangle(
                operationData.startPositionX,
                operationData.startPositionY,
                operationData.endPositionX,
                operationData.endPositionY,
                operationData.cornerRadius || void 0
              );
            }
          } else if (operationData.operation === "resize") {
            const resizeOption = operationData.resizeOption;
            let option = "@";
            if (resizeOption === "ignoreAspectRatio") {
              option = "!";
            } else if (resizeOption === "minimumArea") {
              option = "^";
            } else if (resizeOption === "onlyIfSmaller") {
              option = "<";
            } else if (resizeOption === "onlyIfLarger") {
              option = ">";
            } else if (resizeOption === "percent") {
              option = "%";
            }
            gmInstance = gmInstance.resize(
              operationData.width,
              operationData.height,
              option
            );
          } else if (operationData.operation === "rotate") {
            gmInstance = gmInstance.rotate(
              operationData.backgroundColor,
              operationData.rotate
            );
          } else if (operationData.operation === "shear") {
            gmInstance = gmInstance.shear(
              operationData.degreesX,
              operationData.degreesY
            );
          } else if (operationData.operation === "text") {
            const lines = [];
            let currentLine = "";
            operationData.text.split("\n").forEach((textLine) => {
              textLine.split(" ").forEach((textPart) => {
                if (currentLine.length + textPart.length + 1 > operationData.lineLength) {
                  lines.push(currentLine.trim());
                  currentLine = `${textPart} `;
                  return;
                }
                currentLine += `${textPart} `;
              });
              lines.push(currentLine.trim());
              currentLine = "";
            });
            const renderText = lines.join("\n");
            let font = options.font || operationData.font;
            if (!font) {
              const fonts = await (0, import_get_system_fonts.default)();
              font = fonts.find((_font) => _font.includes("Arial."));
            }
            if (!font) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Default font not found. Select a font from the options."
              );
            }
            gmInstance = gmInstance.fill(operationData.fontColor).fontSize(operationData.fontSize).font(font).drawText(
              operationData.positionX,
              operationData.positionY,
              renderText
            );
          } else if (operationData.operation === "transparent") {
            gmInstance = gmInstance.transparent(operationData.color);
          }
        }
        if (item.binary !== void 0 && newItem.binary) {
          Object.assign(newItem.binary, item.binary);
          if (newItem.binary[dataPropertyName]) {
            newItem.binary[dataPropertyName] = (0, import_n8n_workflow.deepCopy)(newItem.binary[dataPropertyName]);
          }
        }
        if (newItem.binary[dataPropertyName] === void 0) {
          newItem.binary[dataPropertyName] = {
            data: "",
            mimeType: ""
          };
        }
        if (options.quality !== void 0) {
          gmInstance = gmInstance.quality(options.quality);
        }
        if (options.format !== void 0) {
          gmInstance = gmInstance.setFormat(options.format);
          newItem.binary[dataPropertyName].fileExtension = options.format;
          newItem.binary[dataPropertyName].mimeType = `image/${options.format}`;
          const fileName = newItem.binary[dataPropertyName].fileName;
          if (fileName?.includes(".")) {
            newItem.binary[dataPropertyName].fileName = fileName.split(".").slice(0, -1).join(".") + "." + options.format;
          }
        }
        if (options.fileName !== void 0) {
          newItem.binary[dataPropertyName].fileName = options.fileName;
        }
        returnData.push(
          await new Promise((resolve, reject) => {
            gmInstance.toBuffer(async (error, buffer) => {
              cleanupFunctions.forEach(async (cleanup) => cleanup());
              if (error) {
                return reject(error);
              }
              const binaryData = await this.helpers.prepareBinaryData(Buffer.from(buffer));
              newItem.binary[dataPropertyName] = {
                ...newItem.binary[dataPropertyName],
                ...binaryData
              };
              return resolve(newItem);
            });
          })
        );
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message
            },
            pairedItem: {
              item: itemIndex
            }
          });
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
  EditImage
});
//# sourceMappingURL=EditImage.node.js.map