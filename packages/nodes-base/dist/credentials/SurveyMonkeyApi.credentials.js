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
var SurveyMonkeyApi_credentials_exports = {};
__export(SurveyMonkeyApi_credentials_exports, {
  SurveyMonkeyApi: () => SurveyMonkeyApi
});
module.exports = __toCommonJS(SurveyMonkeyApi_credentials_exports);
class SurveyMonkeyApi {
  constructor() {
    this.name = "surveyMonkeyApi";
    this.displayName = "SurveyMonkey API";
    this.documentationUrl = "surveyMonkey";
    this.properties = [
      {
        displayName: "Access Token",
        name: "accessToken",
        type: "string",
        typeOptions: { password: true },
        default: "",
        description: `The access token must have the following scopes:
			<ul>
				<li>Create/modify webhooks</li>
				<li>View webhooks</li>
				<li>View surveys</li>
				<li>View collectors</li>
				<li>View responses</li>
				<li>View response details</li>
			</ul>`
      },
      {
        displayName: "Client ID",
        name: "clientId",
        type: "string",
        default: ""
      },
      {
        displayName: "Client Secret",
        name: "clientSecret",
        type: "string",
        typeOptions: { password: true },
        default: ""
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SurveyMonkeyApi
});
//# sourceMappingURL=SurveyMonkeyApi.credentials.js.map