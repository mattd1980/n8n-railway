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
var Totp_node_exports = {};
__export(Totp_node_exports, {
  Totp: () => Totp
});
module.exports = __toCommonJS(Totp_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_otpauth = __toESM(require("otpauth"));
class Totp {
  constructor() {
    this.description = {
      displayName: "TOTP",
      name: "totp",
      icon: "fa:fingerprint",
      group: ["transform"],
      version: 1,
      subtitle: '={{ $parameter["operation"] }}',
      description: "Generate a time-based one-time password",
      defaults: {
        name: "TOTP"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "totpApi",
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
              name: "Generate Secret",
              value: "generateSecret",
              action: "Generate secret"
            }
          ],
          default: "generateSecret"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          displayOptions: {
            show: {
              operation: ["generateSecret"]
            }
          },
          default: {},
          placeholder: "Add option",
          options: [
            {
              displayName: "Algorithm",
              name: "algorithm",
              type: "options",
              default: "SHA1",
              description: "HMAC hashing algorithm. Defaults to SHA1.",
              options: [
                {
                  name: "SHA1",
                  value: "SHA1"
                },
                {
                  name: "SHA224",
                  value: "SHA224"
                },
                {
                  name: "SHA256",
                  value: "SHA256"
                },
                {
                  name: "SHA3-224",
                  value: "SHA3-224"
                },
                {
                  name: "SHA3-256",
                  value: "SHA3-256"
                },
                {
                  name: "SHA3-384",
                  value: "SHA3-384"
                },
                {
                  name: "SHA3-512",
                  value: "SHA3-512"
                },
                {
                  name: "SHA384",
                  value: "SHA384"
                },
                {
                  name: "SHA512",
                  value: "SHA512"
                }
              ]
            },
            {
              displayName: "Digits",
              name: "digits",
              type: "number",
              default: 6,
              description: "Number of digits in the generated TOTP code. Defaults to 6 digits."
            },
            {
              displayName: "Period",
              name: "period",
              type: "number",
              default: 30,
              description: "How many seconds the generated TOTP code is valid for. Defaults to 30 seconds."
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const operation = this.getNodeParameter("operation", 0);
    const credentials = await this.getCredentials("totpApi");
    if (!credentials.label.includes(":")) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Malformed label - expected `issuer:username`");
    }
    const options = this.getNodeParameter("options", 0);
    if (!options.algorithm) options.algorithm = "SHA1";
    if (!options.digits) options.digits = 6;
    if (!options.period) options.period = 30;
    const [issuer] = credentials.label.split(":");
    const totp = new import_otpauth.default.TOTP({
      issuer,
      label: credentials.label,
      secret: credentials.secret,
      algorithm: options.algorithm,
      digits: options.digits,
      period: options.period
    });
    const token = totp.generate();
    const secondsRemaining = options.period * (1 - Date.now() / 1e3 / options.period % 1) | 0;
    if (operation === "generateSecret") {
      for (let i = 0; i < items.length; i++) {
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray({ token, secondsRemaining }),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Totp
});
//# sourceMappingURL=Totp.node.js.map