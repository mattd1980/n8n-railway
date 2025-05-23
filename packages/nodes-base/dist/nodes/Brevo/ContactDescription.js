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
var ContactDescription_exports = {};
__export(ContactDescription_exports, {
  contactFields: () => contactFields,
  contactOperations: () => contactOperations
});
module.exports = __toCommonJS(ContactDescription_exports);
const contactOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contact"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a contact",
        routing: {
          request: {
            method: "POST",
            url: "/v3/contacts"
          }
        }
      },
      {
        name: "Create or Update",
        value: "upsert",
        action: "Upsert a contact",
        routing: {
          request: {
            method: "POST",
            url: "=/v3/contacts"
          }
        }
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a contact"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a contact"
      },
      {
        name: "Get Many",
        value: "getAll",
        routing: {
          request: {
            method: "GET",
            url: "/v3/contacts"
          },
          output: {
            postReceive: [
              {
                type: "rootProperty",
                properties: {
                  property: "contacts"
                }
              }
            ]
          },
          operations: {
            pagination: {
              type: "offset",
              properties: {
                limitParameter: "limit",
                offsetParameter: "offset",
                pageSize: 1e3,
                type: "query"
              }
            }
          }
        },
        action: "Get many contacts"
      },
      {
        name: "Update",
        value: "update",
        routing: {
          output: {
            postReceive: [
              {
                type: "set",
                properties: {
                  value: '={{ { "success": true } }}'
                  // Also possible to use the original response data
                }
              }
            ]
          }
        },
        action: "Update a contact"
      }
    ],
    default: "create"
  }
];
const createOperations = [
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: "name@email.com",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"]
      }
    },
    default: "",
    routing: {
      send: {
        type: "body",
        property: "email"
      }
    }
  },
  {
    displayName: "Contact Attributes",
    name: "createContactAttributes",
    default: {},
    description: "Array of attributes to be added",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["create"]
      }
    },
    options: [
      {
        name: "attributesValues",
        displayName: "Attribute",
        values: [
          {
            displayName: "Field Name",
            name: "fieldName",
            type: "options",
            typeOptions: {
              loadOptions: {
                routing: {
                  request: {
                    method: "GET",
                    url: "/v3/contacts/attributes"
                  },
                  output: {
                    postReceive: [
                      {
                        type: "rootProperty",
                        properties: {
                          property: "attributes"
                        }
                      },
                      {
                        type: "setKeyValue",
                        properties: {
                          name: "={{$responseItem.name}} - ({{$responseItem.category}})",
                          value: "={{$responseItem.name}}"
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
            default: ""
          },
          {
            displayName: "Field Value",
            name: "fieldValue",
            type: "string",
            default: "",
            routing: {
              send: {
                value: "={{$value}}",
                property: "=attributes.{{$parent.fieldName}}",
                type: "body"
              }
            }
          }
        ]
      }
    ],
    placeholder: "Add Attribute",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    }
  }
];
const getAllOperations = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    routing: {
      send: {
        paginate: "={{$value}}"
      }
    },
    displayOptions: {
      show: {
        resource: ["contact"],
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
        resource: ["contact"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    routing: {
      send: {
        type: "query",
        property: "limit"
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    default: 50,
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["getAll"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Sort",
        name: "sort",
        type: "options",
        options: [
          { name: "DESC", value: "desc" },
          { name: "ASC", value: "asc" }
        ],
        routing: {
          send: {
            type: "query",
            property: "sort",
            value: "={{$value}}"
          }
        },
        default: "desc",
        description: "Sort the results in the ascending/descending order of record creation"
      }
    ]
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["getAll"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Modified Since",
        name: "modifiedSince",
        type: "dateTime",
        routing: {
          send: {
            type: "query",
            property: "modifiedSince"
          }
        },
        default: "",
        description: "Filter (urlencoded) the contacts modified after a given UTC date-time (YYYY-MM-DDTHH:mm:ss.SSSZ)"
      }
    ]
  }
];
const getOperations = [
  {
    displayName: "Contact Identifier",
    name: "identifier",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["get"]
      }
    },
    routing: {
      request: {
        method: "GET",
        url: "=/v3/contacts/{{encodeURIComponent($value)}}"
      }
    },
    required: true,
    default: "",
    description: "Email (urlencoded) OR ID of the contact OR its SMS attribute value"
  }
];
const deleteOperations = [
  {
    displayName: "Contact Identifier",
    name: "identifier",
    type: "string",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["delete"]
      }
    },
    routing: {
      request: {
        method: "DELETE",
        url: "=/v3/contacts/{{encodeURIComponent($parameter.identifier)}}"
      },
      output: {
        postReceive: [
          {
            type: "set",
            properties: {
              value: '={{ { "success": true } }}'
              // Also possible to use the original response data
            }
          }
        ]
      }
    },
    default: "",
    description: "Email (urlencoded) OR ID of the contact OR its SMS attribute value"
  }
];
const updateOperations = [
  {
    displayName: "Contact Identifier",
    name: "identifier",
    default: "",
    description: "Email (urlencoded) OR ID of the contact OR its SMS attribute value",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["update"]
      }
    },
    type: "string",
    required: true
  },
  {
    displayName: "Attributes",
    name: "updateAttributes",
    default: {},
    description: "Array of attributes to be updated",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Attribute",
        name: "updateAttributesValues",
        values: [
          {
            displayName: "Field Name",
            name: "fieldName",
            type: "options",
            typeOptions: {
              loadOptions: {
                routing: {
                  request: {
                    method: "GET",
                    url: "/v3/contacts/attributes"
                  },
                  output: {
                    postReceive: [
                      {
                        type: "rootProperty",
                        properties: {
                          property: "attributes"
                        }
                      },
                      {
                        type: "setKeyValue",
                        properties: {
                          name: "={{$responseItem.name}} - ({{$responseItem.category}})",
                          value: "={{$responseItem.name}}"
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
            default: ""
          },
          {
            displayName: "Field Value",
            name: "fieldValue",
            type: "string",
            default: "",
            routing: {
              send: {
                value: "={{$value}}",
                property: "=attributes.{{$parent.fieldName}}",
                type: "body"
              }
            }
          }
        ]
      }
    ],
    placeholder: "Add Attribute",
    routing: {
      request: {
        method: "PUT",
        url: "=/v3/contacts/{{encodeURIComponent($parameter.identifier)}}"
      }
    },
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    }
  }
];
const upsertOperations = [
  {
    displayName: "Email",
    name: "email",
    default: "",
    description: "Email of the contact",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["upsert"]
      }
    },
    type: "string",
    placeholder: "name@email.com",
    required: true,
    routing: {
      send: {
        value: "={{$value}}",
        property: "email",
        type: "body"
      }
    }
  },
  {
    displayName: "Contact Attributes",
    name: "upsertAttributes",
    default: {},
    description: "Array of attributes to be updated",
    displayOptions: {
      show: {
        resource: ["contact"],
        operation: ["upsert"]
      }
    },
    options: [
      {
        name: "upsertAttributesValues",
        displayName: "Attribute",
        values: [
          {
            displayName: "Field Name",
            name: "fieldName",
            type: "options",
            typeOptions: {
              loadOptions: {
                routing: {
                  request: {
                    method: "GET",
                    url: "/v3/contacts/attributes"
                  },
                  output: {
                    postReceive: [
                      {
                        type: "rootProperty",
                        properties: {
                          property: "attributes"
                        }
                      },
                      {
                        type: "setKeyValue",
                        properties: {
                          name: "={{$responseItem.name}} - ({{$responseItem.category}})",
                          value: "={{$responseItem.name}}"
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
            default: ""
          },
          {
            displayName: "Field Value",
            name: "fieldValue",
            type: "string",
            default: "",
            routing: {
              send: {
                value: "={{$value}}",
                property: "=attributes.{{$parent.fieldName}}",
                type: "body"
              }
            }
          }
        ]
      }
    ],
    placeholder: "Add Attribute",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    routing: {
      send: {
        preSend: [
          async function(requestOptions) {
            const { body } = requestOptions;
            Object.assign(body, { updateEnabled: true });
            return requestOptions;
          }
        ]
      },
      output: {
        postReceive: [
          {
            type: "set",
            properties: {
              value: '={{ { "success": true } }}'
              // Also possible to use the original response data
            }
          }
        ]
      }
    }
  }
];
const contactFields = [
  /* -------------------------------------------------------------------------- */
  /*                                contact:create                              */
  /* -------------------------------------------------------------------------- */
  ...createOperations,
  /* -------------------------------------------------------------------------- */
  /*                                contact:getAll                              */
  /* -------------------------------------------------------------------------- */
  ...getAllOperations,
  /* -------------------------------------------------------------------------- */
  /*                                contact:get                                 */
  /* -------------------------------------------------------------------------- */
  ...getOperations,
  /* -------------------------------------------------------------------------- */
  /*                                contact:delete                              */
  /* -------------------------------------------------------------------------- */
  ...deleteOperations,
  /* -------------------------------------------------------------------------- */
  /*                                contact:update                              */
  /* -------------------------------------------------------------------------- */
  ...updateOperations,
  /* -------------------------------------------------------------------------- */
  /*                                contact:update                              */
  /* -------------------------------------------------------------------------- */
  ...upsertOperations
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactFields,
  contactOperations
});
//# sourceMappingURL=ContactDescription.js.map