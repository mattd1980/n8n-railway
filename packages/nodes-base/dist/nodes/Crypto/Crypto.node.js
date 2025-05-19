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
var Crypto_node_exports = {};
__export(Crypto_node_exports, {
  Crypto: () => Crypto
});
module.exports = __toCommonJS(Crypto_node_exports);
var import_crypto = require("crypto");
var import_set = __toESM(require("lodash/set"));
var import_n8n_workflow = require("n8n-workflow");
var import_promises = require("stream/promises");
var import_uuid = require("uuid");
const unsupportedAlgorithms = [
  "RSA-MD4",
  "RSA-MDC2",
  "md4",
  "md4WithRSAEncryption",
  "mdc2",
  "mdc2WithRSA"
];
const supportedAlgorithms = (0, import_crypto.getHashes)().filter((algorithm) => !unsupportedAlgorithms.includes(algorithm)).map((algorithm) => ({ name: algorithm, value: algorithm }));
class Crypto {
  constructor() {
    this.description = {
      displayName: "Crypto",
      name: "crypto",
      icon: "fa:key",
      iconColor: "green",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["action"]}}',
      description: "Provide cryptographic utilities",
      defaults: {
        name: "Crypto",
        color: "#408000"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Action",
          name: "action",
          type: "options",
          options: [
            {
              name: "Generate",
              description: "Generate random string",
              value: "generate",
              action: "Generate random string"
            },
            {
              name: "Hash",
              description: "Hash a text or file in a specified format",
              value: "hash",
              action: "Hash a text or file in a specified format"
            },
            {
              name: "Hmac",
              description: "Hmac a text or file in a specified format",
              value: "hmac",
              action: "HMAC a text or file in a specified format"
            },
            {
              name: "Sign",
              description: "Sign a string using a private key",
              value: "sign",
              action: "Sign a string using a private key"
            }
          ],
          default: "hash"
        },
        {
          displayName: "Type",
          name: "type",
          displayOptions: {
            show: {
              action: ["hash"]
            }
          },
          type: "options",
          options: [
            {
              name: "MD5",
              value: "MD5"
            },
            {
              name: "SHA256",
              value: "SHA256"
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
          ],
          default: "MD5",
          description: "The hash type to use",
          required: true
        },
        {
          displayName: "Binary File",
          name: "binaryData",
          type: "boolean",
          default: false,
          required: true,
          displayOptions: {
            show: {
              action: ["hash", "hmac"]
            }
          },
          description: "Whether the data to hashed should be taken from binary field"
        },
        {
          displayName: "Binary Property Name",
          name: "binaryPropertyName",
          displayOptions: {
            show: {
              action: ["hash", "hmac"],
              binaryData: [true]
            }
          },
          type: "string",
          default: "data",
          description: "Name of the binary property which contains the input data",
          required: true
        },
        {
          displayName: "Value",
          name: "value",
          displayOptions: {
            show: {
              action: ["hash"],
              binaryData: [false]
            }
          },
          type: "string",
          default: "",
          description: "The value that should be hashed",
          required: true
        },
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              action: ["hash"]
            }
          },
          description: "Name of the property to which to write the hash"
        },
        {
          displayName: "Encoding",
          name: "encoding",
          displayOptions: {
            show: {
              action: ["hash"]
            }
          },
          type: "options",
          options: [
            {
              name: "BASE64",
              value: "base64"
            },
            {
              name: "HEX",
              value: "hex"
            }
          ],
          default: "hex",
          required: true
        },
        {
          displayName: "Type",
          name: "type",
          displayOptions: {
            show: {
              action: ["hmac"]
            }
          },
          type: "options",
          options: [
            {
              name: "MD5",
              value: "MD5"
            },
            {
              name: "SHA256",
              value: "SHA256"
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
          ],
          default: "MD5",
          description: "The hash type to use",
          required: true
        },
        {
          displayName: "Value",
          name: "value",
          displayOptions: {
            show: {
              action: ["hmac"],
              binaryData: [false]
            }
          },
          type: "string",
          default: "",
          description: "The value of which the hmac should be created",
          required: true
        },
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              action: ["hmac"]
            }
          },
          description: "Name of the property to which to write the hmac"
        },
        {
          displayName: "Secret",
          name: "secret",
          displayOptions: {
            show: {
              action: ["hmac"]
            }
          },
          type: "string",
          typeOptions: { password: true },
          default: "",
          required: true
        },
        {
          displayName: "Encoding",
          name: "encoding",
          displayOptions: {
            show: {
              action: ["hmac"]
            }
          },
          type: "options",
          options: [
            {
              name: "BASE64",
              value: "base64"
            },
            {
              name: "HEX",
              value: "hex"
            }
          ],
          default: "hex",
          required: true
        },
        {
          displayName: "Value",
          name: "value",
          displayOptions: {
            show: {
              action: ["sign"]
            }
          },
          type: "string",
          default: "",
          description: "The value that should be signed",
          required: true
        },
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              action: ["sign"]
            }
          },
          description: "Name of the property to which to write the signed value"
        },
        {
          displayName: "Algorithm Name or ID",
          name: "algorithm",
          displayOptions: {
            show: {
              action: ["sign"]
            }
          },
          type: "options",
          description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          options: supportedAlgorithms,
          default: "",
          required: true
        },
        {
          displayName: "Encoding",
          name: "encoding",
          displayOptions: {
            show: {
              action: ["sign"]
            }
          },
          type: "options",
          options: [
            {
              name: "BASE64",
              value: "base64"
            },
            {
              name: "HEX",
              value: "hex"
            }
          ],
          default: "hex",
          required: true
        },
        {
          displayName: "Private Key",
          name: "privateKey",
          displayOptions: {
            show: {
              action: ["sign"]
            }
          },
          type: "string",
          description: "Private key to use when signing the string",
          default: "",
          required: true
        },
        {
          displayName: "Property Name",
          name: "dataPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              action: ["generate"]
            }
          },
          description: "Name of the property to which to write the random string"
        },
        {
          displayName: "Type",
          name: "encodingType",
          displayOptions: {
            show: {
              action: ["generate"]
            }
          },
          type: "options",
          options: [
            {
              name: "ASCII",
              value: "ascii"
            },
            {
              name: "BASE64",
              value: "base64"
            },
            {
              name: "HEX",
              value: "hex"
            },
            {
              name: "UUID",
              value: "uuid"
            }
          ],
          default: "uuid",
          description: "Encoding that will be used to generate string",
          required: true
        },
        {
          displayName: "Length",
          name: "stringLength",
          type: "number",
          default: 32,
          description: "Length of the generated string",
          displayOptions: {
            show: {
              action: ["generate"],
              encodingType: ["ascii", "base64", "hex"]
            }
          }
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const action = this.getNodeParameter("action", 0);
    let item;
    for (let i = 0; i < length; i++) {
      try {
        item = items[i];
        const dataPropertyName = this.getNodeParameter("dataPropertyName", i);
        const value = this.getNodeParameter("value", i, "");
        let newValue;
        let binaryProcessed = false;
        if (action === "generate") {
          const encodingType = this.getNodeParameter("encodingType", i);
          if (encodingType === "uuid") {
            newValue = (0, import_uuid.v4)();
          } else {
            const stringLength = this.getNodeParameter("stringLength", i);
            if (encodingType === "base64") {
              newValue = (0, import_crypto.randomBytes)(stringLength).toString(encodingType).replace(/\W/g, "").slice(0, stringLength);
            } else {
              newValue = (0, import_crypto.randomBytes)(stringLength).toString(encodingType).slice(0, stringLength);
            }
          }
        }
        if (action === "hash" || action === "hmac") {
          const type = this.getNodeParameter("type", i);
          const encoding = this.getNodeParameter("encoding", i);
          const hashOrHmac = action === "hash" ? (0, import_crypto.createHash)(type) : (0, import_crypto.createHmac)(type, this.getNodeParameter("secret", i));
          if (this.getNodeParameter("binaryData", i)) {
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
            if (binaryData.id) {
              const binaryStream = await this.helpers.getBinaryStream(binaryData.id);
              hashOrHmac.setEncoding(encoding);
              await (0, import_promises.pipeline)(binaryStream, hashOrHmac);
              newValue = hashOrHmac.read();
            } else {
              newValue = hashOrHmac.update(Buffer.from(binaryData.data, import_n8n_workflow.BINARY_ENCODING)).digest(encoding);
            }
            binaryProcessed = true;
          } else {
            newValue = hashOrHmac.update(value).digest(encoding);
          }
        }
        if (action === "sign") {
          const algorithm = this.getNodeParameter("algorithm", i);
          const encoding = this.getNodeParameter("encoding", i);
          const privateKey = this.getNodeParameter("privateKey", i);
          const sign = (0, import_crypto.createSign)(algorithm);
          sign.write(value);
          sign.end();
          newValue = sign.sign(privateKey, encoding);
        }
        let newItem;
        if (dataPropertyName.includes(".")) {
          newItem = {
            json: (0, import_n8n_workflow.deepCopy)(item.json),
            pairedItem: {
              item: i
            }
          };
        } else {
          newItem = {
            json: { ...item.json },
            pairedItem: {
              item: i
            }
          };
        }
        if (item.binary !== void 0 && !binaryProcessed) {
          newItem.binary = item.binary;
        }
        (0, import_set.default)(newItem, ["json", dataPropertyName], newValue);
        returnData.push(newItem);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message
            },
            pairedItem: {
              item: i
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
  Crypto
});
//# sourceMappingURL=Crypto.node.js.map