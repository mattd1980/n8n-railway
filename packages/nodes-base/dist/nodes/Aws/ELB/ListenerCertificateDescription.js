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
var ListenerCertificateDescription_exports = {};
__export(ListenerCertificateDescription_exports, {
  listenerCertificateFields: () => listenerCertificateFields,
  listenerCertificateOperations: () => listenerCertificateOperations
});
module.exports = __toCommonJS(ListenerCertificateDescription_exports);
const listenerCertificateOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["listenerCertificate"]
      }
    },
    options: [
      {
        name: "Add",
        value: "add",
        description: "Add the specified SSL server certificate to the certificate list for the specified HTTPS or TLS listener",
        action: "Add a listener certificate"
      },
      {
        name: "Get Many",
        value: "getMany",
        description: "Get many listener certificates",
        action: "Get many listener certificates"
      },
      {
        name: "Remove",
        value: "remove",
        description: "Remove the specified certificate from the certificate list for the specified HTTPS or TLS listener",
        action: "Remove a listener certificate"
      }
    ],
    default: "add"
  }
];
const listenerCertificateFields = [
  /* -------------------------------------------------------------------------- */
  /*                                listenerCertificate:add                     */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Load Balancer ARN Name or ID",
    name: "loadBalancerId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLoadBalancers"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["add"]
      }
    },
    default: "",
    description: 'Unique identifier for a particular loadBalancer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Listener ARN Name or ID",
    name: "listenerId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getLoadBalancerListeners",
      loadOptionsDependsOn: ["loadBalancerId"]
    },
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["add"]
      }
    },
    default: "",
    description: 'Unique identifier for a particular loadBalancer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Certificate ARN",
    name: "certificateId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["add"]
      }
    },
    default: "",
    description: "Unique identifier for a particular loadBalancer"
  },
  /* -------------------------------------------------------------------------- */
  /*                              listenerCertificate:getMany                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Load Balancer ARN Name or ID",
    name: "loadBalancerId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLoadBalancers"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["getMany"]
      }
    },
    default: "",
    description: 'Unique identifier for a particular loadBalancer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Listener ARN Name or ID",
    name: "listenerId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getLoadBalancerListeners",
      loadOptionsDependsOn: ["loadBalancerId"]
    },
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["getMany"]
      }
    },
    default: "",
    description: 'Unique identifier for a particular loadBalancer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["getMany"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    description: "Max number of results to return",
    default: 100,
    typeOptions: {
      maxValue: 400,
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["getMany"],
        returnAll: [false]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                listenerCertificate:remove                  */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Load Balancer ARN Name or ID",
    name: "loadBalancerId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLoadBalancers"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["remove"]
      }
    },
    default: "",
    description: 'Unique identifier for a particular loadBalancer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Listener ARN Name or ID",
    name: "listenerId",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getLoadBalancerListeners",
      loadOptionsDependsOn: ["loadBalancerId"]
    },
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["remove"]
      }
    },
    default: "",
    description: 'Unique identifier for a particular loadBalancer. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Certificate ARN",
    name: "certificateId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["listenerCertificate"],
        operation: ["remove"]
      }
    },
    default: "",
    description: "Unique identifier for a particular loadBalancer"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listenerCertificateFields,
  listenerCertificateOperations
});
//# sourceMappingURL=ListenerCertificateDescription.js.map