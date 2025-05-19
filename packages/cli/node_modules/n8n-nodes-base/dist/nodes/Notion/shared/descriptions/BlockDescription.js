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
var BlockDescription_exports = {};
__export(BlockDescription_exports, {
  blockFields: () => blockFields,
  blockOperations: () => blockOperations
});
module.exports = __toCommonJS(BlockDescription_exports);
var import_Blocks = require("./Blocks");
var import_constants = require("../constants");
const blockIdRLC = {
  displayName: "Block",
  name: "blockId",
  type: "resourceLocator",
  default: { mode: "url", value: "" },
  required: true,
  modes: [
    {
      displayName: "Link",
      name: "url",
      type: "string",
      placeholder: "e.g. https://www.notion.so/Block-Test-88888ccc303e4f44847f27d24bd7ad8e?pvs=4#c44444444444bbbbb4d32fdfdd84e",
      validation: [
        {
          type: "regex",
          properties: {
            regex: import_constants.blockUrlValidationRegexp,
            errorMessage: "Not a valid Notion Block URL"
          }
        }
      ]
      // extractValue: {
      // 	type: 'regex',
      // 	regex: blockUrlExtractionRegexp,
      // },
    },
    {
      displayName: "ID",
      name: "id",
      type: "string",
      placeholder: "e.g. ab1545b247fb49fa92d6f4b49f4d8116",
      validation: [
        {
          type: "regex",
          properties: {
            regex: "[a-f0-9]{2,}",
            errorMessage: "Not a valid Notion Block ID"
          }
        }
      ]
    }
  ],
  description: "The Notion Block to get all children from, when using 'By URL' mode make sure to use the URL of the block itself, you can find it in block parameters in Notion under 'Copy link to block'"
};
const blockOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["block"]
      }
    },
    options: [
      {
        name: "Append After",
        value: "append",
        description: "Append a block",
        action: "Append a block"
      },
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-option-name-wrong-for-get-many
        name: "Get Child Blocks",
        value: "getAll",
        description: "Get many child blocks",
        action: "Get many child blocks"
      }
    ],
    default: "append"
  }
];
const blockFields = [
  /* -------------------------------------------------------------------------- */
  /*                                block:append                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Block",
    name: "blockId",
    type: "resourceLocator",
    default: { mode: "url", value: "" },
    required: true,
    modes: [
      {
        displayName: "Link",
        name: "url",
        type: "string",
        placeholder: "https://www.notion.so/My-Page-b4eeb113e118403ba450af65ac25f0b9",
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.blockUrlValidationRegexp,
              errorMessage: "Not a valid Notion Block URL"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: import_constants.blockUrlExtractionRegexp
        }
      },
      {
        displayName: "ID",
        name: "id",
        type: "string",
        placeholder: "ab1545b247fb49fa92d6f4b49f4d8116",
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.idValidationRegexp,
              errorMessage: "Not a valid Notion Block ID"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: import_constants.idExtractionRegexp
        },
        url: '=https://www.notion.so/{{$value.replace(/-/g, "")}}'
      }
    ],
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["append"]
      },
      hide: {
        "@version": [{ _cnd: { gte: 2.2 } }]
      }
    },
    description: "The Notion Block to append blocks to"
  },
  {
    ...blockIdRLC,
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["append"],
        "@version": [{ _cnd: { gte: 2.2 } }]
      }
    }
  },
  ...(0, import_Blocks.blocks)("block", "append"),
  /* -------------------------------------------------------------------------- */
  /*                                block:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Block",
    name: "blockId",
    type: "resourceLocator",
    default: { mode: "url", value: "" },
    required: true,
    modes: [
      {
        displayName: "Link",
        name: "url",
        type: "string",
        placeholder: "https://www.notion.so/My-Page-b4eeb113e118403ba450af65ac25f0b9",
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.blockUrlValidationRegexp,
              errorMessage: "Not a valid Notion Block URL"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: import_constants.blockUrlExtractionRegexp
        }
      },
      {
        displayName: "ID",
        name: "id",
        type: "string",
        placeholder: "ab1545b247fb49fa92d6f4b49f4d8116",
        validation: [
          {
            type: "regex",
            properties: {
              regex: import_constants.idValidationRegexp,
              errorMessage: "Not a valid Notion Block ID"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: import_constants.idExtractionRegexp
        },
        url: '=https://www.notion.so/{{$value.replace(/-/g, "")}}'
      }
    ],
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["getAll"]
      },
      hide: {
        "@version": [{ _cnd: { gte: 2.2 } }]
      }
    },
    description: "The Notion Block to get all children from"
  },
  {
    ...blockIdRLC,
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["getAll"],
        "@version": [{ _cnd: { gte: 2.2 } }]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["getAll"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  },
  {
    displayName: "Also Fetch Nested Blocks",
    name: "fetchNestedBlocks",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["getAll"]
      }
    },
    default: false
  },
  {
    displayName: "Simplify Output",
    name: "simplifyOutput",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["getAll"]
      },
      hide: {
        "@version": [1, 2]
      }
    },
    default: true
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blockFields,
  blockOperations
});
//# sourceMappingURL=BlockDescription.js.map