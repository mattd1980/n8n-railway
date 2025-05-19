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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  getTriggerName: () => getTriggerName,
  livePublicKey: () => livePublicKey,
  testPublicKey: () => testPublicKey,
  wiseApiRequest: () => wiseApiRequest
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
async function wiseApiRequest(method, endpoint, body = {}, qs = {}, option = {}) {
  const { apiToken, environment, privateKey } = await this.getCredentials("wiseApi");
  const rootUrl = environment === "live" ? "https://api.transferwise.com/" : "https://api.sandbox.transferwise.tech/";
  const options = {
    headers: {
      "user-agent": "n8n",
      Authorization: `Bearer ${apiToken}`
    },
    method,
    url: `${rootUrl}${endpoint}`,
    qs,
    body,
    json: true,
    returnFullResponse: true,
    ignoreHttpStatusErrors: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  if (option.encoding) {
    delete options.json;
  }
  if (Object.keys(option)) {
    Object.assign(options, option);
  }
  let response;
  try {
    response = await this.helpers.httpRequest(options);
  } catch (error) {
    delete error.config;
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response.body;
  }
  if (response.statusCode === 403 && response.headers["x-2fa-approval"]) {
    if (!privateKey) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: "This request requires Strong Customer Authentication (SCA). Please add a key pair to your account and n8n credentials. See https://api-docs.transferwise.com/#strong-customer-authentication-personal-token",
        headers: response.headers,
        body: response.body
      });
    }
    const oneTimeToken = response.headers["x-2fa-approval"];
    const signerObject = (0, import_crypto.createSign)("RSA-SHA256").update(oneTimeToken);
    try {
      const signature = signerObject.sign(privateKey, "base64");
      delete option.ignoreHttpStatusErrors;
      options.headers = {
        ...options.headers,
        "X-Signature": signature,
        "x-2fa-approval": oneTimeToken
      };
    } catch (error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: "Error signing SCA request, check your private key",
        ...error
      });
    }
    try {
      response = await this.helpers.httpRequest(options);
      return response.body;
    } catch (error) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: "SCA request failed, check your private key is valid"
      });
    }
  } else {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), {
      ...response,
      message: response.statusMessage
    });
  }
}
function getTriggerName(eventName) {
  const events = {
    tranferStateChange: "transfers#state-change",
    transferActiveCases: "transfers#active-cases",
    balanceCredit: "balances#credit",
    balanceUpdate: "balances#update"
  };
  return events[eventName];
}
const livePublicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvO8vXV+JksBzZAY6GhSO
XdoTCfhXaaiZ+qAbtaDBiu2AGkGVpmEygFmWP4Li9m5+Ni85BhVvZOodM9epgW3F
bA5Q1SexvAF1PPjX4JpMstak/QhAgl1qMSqEevL8cmUeTgcMuVWCJmlge9h7B1CS
D4rtlimGZozG39rUBDg6Qt2K+P4wBfLblL0k4C4YUdLnpGYEDIth+i8XsRpFlogx
CAFyH9+knYsDbR43UJ9shtc42Ybd40Afihj8KnYKXzchyQ42aC8aZ/h5hyZ28yVy
Oj3Vos0VdBIs/gAyJ/4yyQFCXYte64I7ssrlbGRaco4nKF3HmaNhxwyKyJafz19e
HwIDAQAB
-----END PUBLIC KEY-----`;
const testPublicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwpb91cEYuyJNQepZAVfP
ZIlPZfNUefH+n6w9SW3fykqKu938cR7WadQv87oF2VuT+fDt7kqeRziTmPSUhqPU
ys/V2Q1rlfJuXbE+Gga37t7zwd0egQ+KyOEHQOpcTwKmtZ81ieGHynAQzsn1We3j
wt760MsCPJ7GMT141ByQM+yW1Bx+4SG3IGjXWyqOWrcXsxAvIXkpUD/jK/L958Cg
nZEgz0BSEh0QxYLITnW1lLokSx/dTianWPFEhMC9BgijempgNXHNfcVirg1lPSyg
z7KqoKUN0oHqWLr2U1A+7kqrl6O2nx3CKs1bj1hToT1+p4kcMoHXA7kA+VBLUpEs
VwIDAQAB
-----END PUBLIC KEY-----`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getTriggerName,
  livePublicKey,
  testPublicKey,
  wiseApiRequest
});
//# sourceMappingURL=GenericFunctions.js.map