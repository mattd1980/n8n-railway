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
var NoteDescription_exports = {};
__export(NoteDescription_exports, {
  noteDescription: () => noteDescription,
  noteOperations: () => noteOperations
});
module.exports = __toCommonJS(NoteDescription_exports);
const noteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    default: "create",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["note"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new note",
        action: "Create a note"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a note",
        action: "Delete a note"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a note",
        action: "Get a note"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many notes",
        action: "Get many notes"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a note",
        action: "Update a note"
      }
    ]
  }
];
const noteDescription = [
  /* -------------------------------------------------------------------------- */
  /*                                note:create                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Memo",
    name: "memo",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["note"]
      }
    }
  },
  // {
  // 	displayName: 'Additional Fields',
  // 	name: 'additionalFields',
  // 	type: 'collection',
  // 	default: {},
  // 	placeholder: 'Add Field',
  // 	displayOptions: {
  // 		show: {
  // 			operation: [
  // 				'create',
  // 			],
  // 			resource: [
  // 				'note',
  // 			],
  // 		},
  // 	},
  // 	options: [
  // 		{
  // 			displayName: 'Name',
  // 			name: 'name',
  // 			type: 'string',
  // 			default: '',
  // 		},
  // 	],
  // },
  /* -------------------------------------------------------------------------- */
  /*                                note:get                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Note ID",
    name: "noteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get", "delete"],
        resource: ["note"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                note:getAll                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["note"],
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
    default: 50,
    displayOptions: {
      show: {
        resource: ["note"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["getAll", "get"],
        resource: ["note"]
      }
    },
    options: [
      {
        displayName: "Fields to Include",
        name: "fieldsList",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getModelFields"
        }
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                note:update                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Note ID",
    name: "noteId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["note"]
      }
    }
  },
  {
    displayName: "Memo",
    name: "memo",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["note"]
      }
    }
  }
  // {
  // 	displayName: 'Update Fields',
  // 	name: 'updateFields',
  // 	type: 'collection',
  // 	default: {},
  // 	placeholder: 'Add Field',
  // 	displayOptions: {
  // 		show: {
  // 			operation: [
  // 				'update',
  // 			],
  // 			resource: [
  // 				'note',
  // 			],
  // 		},
  // 	},
  // 	options: [
  // 		{
  // 			displayName: 'Name',
  // 			name: 'name',
  // 			type: 'string',
  // 			default: '',
  // 		},
  // 		{
  // 			displayName: 'Memo',
  // 			name: 'memo',
  // 			type: 'string',
  // 			default: '',
  // 		},
  // 	],
  // },
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  noteDescription,
  noteOperations
});
//# sourceMappingURL=NoteDescription.js.map