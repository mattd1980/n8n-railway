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
var MediaDescription_exports = {};
__export(MediaDescription_exports, {
  mediaFields: () => mediaFields,
  mediaTypeFields: () => mediaTypeFields
});
module.exports = __toCommonJS(MediaDescription_exports);
var import_MediaFunctions = require("./MediaFunctions");
const mediaFields = [
  {
    displayName: "Operation",
    name: "operation",
    noDataExpression: true,
    type: "options",
    placeholder: "",
    options: [
      {
        name: "Upload",
        value: "mediaUpload",
        action: "Upload media"
      },
      {
        name: "Download",
        value: "mediaUrlGet",
        action: "Download media"
      },
      {
        name: "Delete",
        value: "mediaDelete",
        action: "Delete media"
      }
    ],
    default: "mediaUpload",
    displayOptions: {
      show: {
        resource: ["media"]
      }
    },
    // eslint-disable-next-line n8n-nodes-base/node-param-description-weak
    description: "The operation to perform on the media"
  }
];
const mediaTypeFields = [
  // ----------------------------------
  //         operation: mediaUpload
  // ----------------------------------
  {
    displayName: "Sender Phone Number (or ID)",
    name: "phoneNumberId",
    type: "options",
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            url: "={{$credentials.businessAccountId}}/phone_numbers",
            method: "GET"
          },
          output: {
            postReceive: [
              {
                type: "rootProperty",
                properties: {
                  property: "data"
                }
              },
              {
                type: "setKeyValue",
                properties: {
                  name: "={{$responseItem.display_phone_number}} - {{$responseItem.verified_name}}",
                  value: "={{$responseItem.id}}"
                }
              },
              {
                type: "sort",
                properties: {
                  key: "name"
                }
              }
            ]
          }
        }
      }
    },
    default: "",
    placeholder: "",
    routing: {
      request: {
        method: "POST",
        url: "={{$value}}/media"
      }
    },
    displayOptions: {
      show: {
        operation: ["mediaUpload"],
        resource: ["media"]
      }
    },
    required: true,
    description: "The ID of the business account's phone number to store the media"
  },
  {
    displayName: "Property Name",
    name: "mediaPropertyName",
    type: "string",
    default: "data",
    displayOptions: {
      show: {
        operation: ["mediaUpload"],
        resource: ["media"]
      }
    },
    required: true,
    description: "Name of the binary property which contains the data for the file to be uploaded",
    routing: {
      send: {
        preSend: [import_MediaFunctions.setupUpload]
      }
    }
  },
  // ----------------------------------
  //         type: mediaUrlGet
  // ----------------------------------
  {
    displayName: "Media ID",
    name: "mediaGetId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["mediaUrlGet"],
        resource: ["media"]
      }
    },
    routing: {
      request: {
        method: "GET",
        url: "=/{{$value}}"
      }
    },
    required: true,
    description: "The ID of the media"
  },
  // ----------------------------------
  //         type: mediaUrlGet
  // ----------------------------------
  {
    displayName: "Media ID",
    name: "mediaDeleteId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["mediaDelete"],
        resource: ["media"]
      }
    },
    routing: {
      request: {
        method: "DELETE",
        url: "=/{{$value}}"
      }
    },
    required: true,
    description: "The ID of the media"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["media"],
        operation: ["mediaUpload"]
      }
    },
    options: [
      {
        displayName: "Filename",
        name: "mediaFileName",
        type: "string",
        default: "",
        description: "The name to use for the file"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mediaFields,
  mediaTypeFields
});
//# sourceMappingURL=MediaDescription.js.map