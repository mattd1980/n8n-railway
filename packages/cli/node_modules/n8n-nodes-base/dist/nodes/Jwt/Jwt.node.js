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
var Jwt_node_exports = {};
__export(Jwt_node_exports, {
  Jwt: () => Jwt
});
module.exports = __toCommonJS(Jwt_node_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
var import_utils = require("../Set/v2/helpers/utils");
const prettifyOperation = (operation) => {
  if (operation === "sign") {
    return "Sign a JWT";
  }
  if (operation === "decode") {
    return "Decode a JWT";
  }
  if (operation === "verify") {
    return "Verify a JWT";
  }
  return operation;
};
const getToken = (ctx, itemIndex = 0) => {
  const token = ctx.getNodeParameter("token", itemIndex);
  if (!token) {
    throw new import_n8n_workflow.NodeOperationError(ctx.getNode(), "The JWT token was not provided", {
      itemIndex,
      description: "Be sure to add a valid JWT token to the 'Token' parameter"
    });
  }
  return token;
};
class Jwt {
  constructor() {
    this.description = {
      displayName: "JWT",
      name: "jwt",
      icon: "file:jwt.svg",
      group: ["transform"],
      version: 1,
      description: "JWT",
      subtitle: `={{(${prettifyOperation})($parameter.operation)}}`,
      defaults: {
        name: "JWT"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-class-description-credentials-name-unsuffixed
          name: "jwtAuth",
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
              name: "Decode",
              value: "decode",
              action: "Decode a JWT"
            },
            {
              name: "Sign",
              value: "sign",
              action: "Sign a JWT"
            },
            {
              name: "Verify",
              value: "verify",
              action: "Verify a JWT"
            }
          ],
          default: "sign"
        },
        {
          displayName: "Use JSON to Build Payload",
          name: "useJson",
          type: "boolean",
          default: false,
          description: "Whether to use JSON to build the claims",
          displayOptions: {
            show: {
              operation: ["sign"]
            }
          }
        },
        {
          displayName: "Payload Claims",
          name: "claims",
          type: "collection",
          placeholder: "Add Claim",
          default: {},
          options: [
            {
              displayName: "Audience",
              name: "audience",
              type: "string",
              placeholder: "e.g. https://example.com",
              default: "",
              description: "Identifies the recipients that the JWT is intended for"
            },
            {
              displayName: "Expires In",
              name: "expiresIn",
              type: "number",
              placeholder: "e.g. 3600",
              default: 3600,
              description: "The lifetime of the token in seconds",
              typeOptions: {
                minValue: 0
              }
            },
            {
              displayName: "Issuer",
              name: "issuer",
              type: "string",
              placeholder: "e.g. https://example.com",
              default: "",
              description: "Identifies the principal that issued the JWT"
            },
            {
              displayName: "JWT ID",
              name: "jwtid",
              type: "string",
              placeholder: "e.g. 123456",
              default: "",
              description: "Unique identifier for the JWT"
            },
            {
              displayName: "Not Before",
              name: "notBefore",
              type: "number",
              default: 0,
              description: "The time before which the JWT must not be accepted for processing",
              typeOptions: {
                minValue: 0
              }
            },
            {
              displayName: "Subject",
              name: "subject",
              type: "string",
              default: "",
              description: "Identifies the principal that is the subject of the JWT"
            }
          ],
          displayOptions: {
            show: {
              operation: ["sign"],
              useJson: [false]
            }
          }
        },
        {
          displayName: "Payload Claims (JSON)",
          name: "claimsJson",
          type: "json",
          description: "Claims to add to the token in JSON format",
          default: '{\n  "my_field_1": "value 1",\n  "my_field_2": "value 2"\n}\n',
          validateType: "object",
          ignoreValidationDuringExecution: true,
          typeOptions: {
            rows: 5
          },
          displayOptions: {
            show: {
              operation: ["sign"],
              useJson: [true]
            }
          }
        },
        {
          displayName: "Token",
          name: "token",
          type: "string",
          typeOptions: { password: true },
          required: true,
          validateType: "jwt",
          default: "",
          description: "The token to verify or decode",
          displayOptions: {
            show: {
              operation: ["verify", "decode"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Return Additional Info",
              name: "complete",
              type: "boolean",
              default: false,
              description: "Whether to return the complete decoded token with information about the header and signature or just the payload",
              displayOptions: {
                show: {
                  "/operation": ["verify", "decode"]
                }
              }
            },
            {
              displayName: "Ignore Expiration",
              name: "ignoreExpiration",
              type: "boolean",
              default: false,
              description: "Whether to ignore the expiration of the token",
              displayOptions: {
                show: {
                  "/operation": ["verify"]
                }
              }
            },
            {
              displayName: "Ignore Not Before Claim",
              name: "ignoreNotBefore",
              type: "boolean",
              default: false,
              description: "Whether to ignore the not before claim of the token",
              displayOptions: {
                show: {
                  "/operation": ["verify"]
                }
              }
            },
            {
              displayName: "Clock Tolerance",
              name: "clockTolerance",
              type: "number",
              default: 0,
              description: "Number of seconds to tolerate when checking the nbf and exp claims, to deal with small clock differences among different servers",
              typeOptions: {
                minValue: 0
              },
              displayOptions: {
                show: {
                  "/operation": ["verify"]
                }
              }
            },
            {
              displayName: "Key ID",
              name: "kid",
              type: "string",
              placeholder: "e.g. 123456",
              default: "",
              description: "The kid (key ID) claim is an optional header claim, used to specify the key for validating the signature",
              displayOptions: {
                show: {
                  "/operation": ["sign"]
                }
              }
            },
            {
              displayName: "Override Algorithm",
              name: "algorithm",
              type: "options",
              options: [
                {
                  name: "ES256",
                  value: "ES256"
                },
                {
                  name: "ES384",
                  value: "ES384"
                },
                {
                  name: "ES512",
                  value: "ES512"
                },
                {
                  name: "HS256",
                  value: "HS256"
                },
                {
                  name: "HS384",
                  value: "HS384"
                },
                {
                  name: "HS512",
                  value: "HS512"
                },
                {
                  name: "PS256",
                  value: "PS256"
                },
                {
                  name: "PS384",
                  value: "PS384"
                },
                {
                  name: "PS512",
                  value: "PS512"
                },
                {
                  name: "RS256",
                  value: "RS256"
                },
                {
                  name: "RS384",
                  value: "RS384"
                },
                {
                  name: "RS512",
                  value: "RS512"
                }
              ],
              default: "HS256",
              description: "The algorithm to use for signing or verifying the token, overrides algorithm in credentials",
              displayOptions: {
                show: {
                  "/operation": ["sign", "verify"]
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
    const returnData = [];
    const operation = this.getNodeParameter("operation", 0);
    const credentials = await this.getCredentials("jwtAuth");
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const options = this.getNodeParameter("options", itemIndex, {});
      try {
        if (operation === "sign") {
          const useJson = this.getNodeParameter("useJson", itemIndex);
          let payload = {};
          if (useJson) {
            payload = (0, import_utils.parseJsonParameter)(
              this.getNodeParameter("claimsJson", itemIndex),
              this.getNode(),
              itemIndex
            );
          } else {
            payload = this.getNodeParameter("claims", itemIndex);
          }
          let secretOrPrivateKey;
          if (credentials.keyType === "passphrase") {
            secretOrPrivateKey = credentials.secret;
          } else {
            secretOrPrivateKey = (0, import_utilities.formatPrivateKey)(credentials.privateKey);
          }
          const signingOptions = {
            algorithm: options.algorithm ?? credentials.algorithm
          };
          if (options.kid) signingOptions.keyid = options.kid;
          const token = import_jsonwebtoken.default.sign(payload, secretOrPrivateKey, signingOptions);
          returnData.push({
            json: { token },
            pairedItem: itemIndex
          });
        }
        if (operation === "verify") {
          const token = getToken(this, itemIndex);
          let secretOrPublicKey;
          if (credentials.keyType === "passphrase") {
            secretOrPublicKey = credentials.secret;
          } else {
            secretOrPublicKey = (0, import_utilities.formatPrivateKey)(credentials.publicKey, true);
          }
          const { ignoreExpiration, ignoreNotBefore, clockTolerance, complete } = options;
          const data = import_jsonwebtoken.default.verify(token, secretOrPublicKey, {
            algorithms: [options.algorithm ?? credentials.algorithm],
            ignoreExpiration,
            ignoreNotBefore,
            clockTolerance,
            complete
          });
          const json = options.complete && data ? data : { payload: data };
          returnData.push({
            json,
            pairedItem: itemIndex
          });
        }
        if (operation === "decode") {
          const token = getToken(this, itemIndex);
          const data = import_jsonwebtoken.default.decode(token, { complete: options.complete });
          const json = options.complete && data ? data : { payload: data };
          returnData.push({
            json,
            pairedItem: itemIndex
          });
        }
      } catch (error) {
        if (error.message === "invalid signature") {
          error = new import_n8n_workflow.NodeOperationError(this.getNode(), "The JWT token can't be verified", {
            itemIndex,
            description: "Be sure that the provided JWT token is correctly encoded and matches the selected credentials"
          });
        }
        if (this.continueOnFail()) {
          returnData.push({
            json: this.getInputData(itemIndex)[0].json,
            error,
            pairedItem: itemIndex
          });
          continue;
        }
        if (error.context) {
          error.context.itemIndex = itemIndex;
          throw error;
        }
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
          itemIndex
        });
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Jwt
});
//# sourceMappingURL=Jwt.node.js.map