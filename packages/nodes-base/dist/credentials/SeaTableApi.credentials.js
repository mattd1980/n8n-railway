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
var SeaTableApi_credentials_exports = {};
__export(SeaTableApi_credentials_exports, {
  SeaTableApi: () => SeaTableApi
});
module.exports = __toCommonJS(SeaTableApi_credentials_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
const timezones = import_moment_timezone.default.tz.countries().reduce((tz, country) => {
  const zonesForCountry = import_moment_timezone.default.tz.zonesForCountry(country).map((zone) => ({ value: zone, name: zone }));
  return tz.concat(zonesForCountry);
}, []);
class SeaTableApi {
  constructor() {
    this.name = "seaTableApi";
    this.displayName = "SeaTable API";
    this.documentationUrl = "seaTable";
    this.properties = [
      {
        displayName: "Environment",
        name: "environment",
        type: "options",
        default: "cloudHosted",
        options: [
          {
            name: "Cloud-Hosted",
            value: "cloudHosted"
          },
          {
            name: "Self-Hosted",
            value: "selfHosted"
          }
        ]
      },
      {
        displayName: "Self-Hosted Domain",
        name: "domain",
        type: "string",
        default: "",
        placeholder: "https://seatable.example.com",
        displayOptions: {
          show: {
            environment: ["selfHosted"]
          }
        }
      },
      {
        displayName: "API Token (of a Base)",
        name: "token",
        type: "string",
        description: "The API-Token of the SeaTable base you would like to use with n8n. n8n can only connect to one base at a time.",
        typeOptions: { password: true },
        default: ""
      },
      {
        displayName: "Timezone",
        name: "timezone",
        type: "options",
        default: "",
        description: "Seatable server's timezone",
        options: [...timezones]
      }
    ];
    this.test = {
      request: {
        baseURL: '={{$credentials?.domain || "https://cloud.seatable.io" }}',
        url: "/api/v2.1/dtable/app-access-token/",
        headers: {
          Authorization: '={{"Token " + $credentials.token}}'
        }
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeaTableApi
});
//# sourceMappingURL=SeaTableApi.credentials.js.map