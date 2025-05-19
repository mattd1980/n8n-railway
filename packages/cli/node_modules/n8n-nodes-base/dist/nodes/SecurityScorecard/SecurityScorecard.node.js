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
var SecurityScorecard_node_exports = {};
__export(SecurityScorecard_node_exports, {
  SecurityScorecard: () => SecurityScorecard
});
module.exports = __toCommonJS(SecurityScorecard_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_CompanyDescription = require("./descriptions/CompanyDescription");
var import_IndustryDescription = require("./descriptions/IndustryDescription");
var import_InviteDescription = require("./descriptions/InviteDescription");
var import_PortfolioCompanyDescription = require("./descriptions/PortfolioCompanyDescription");
var import_PortfolioDescription = require("./descriptions/PortfolioDescription");
var import_ReportDescription = require("./descriptions/ReportDescription");
var import_GenericFunctions = require("./GenericFunctions");
class SecurityScorecard {
  constructor() {
    this.description = {
      displayName: "SecurityScorecard",
      name: "securityScorecard",
      icon: "file:securityScorecard.svg",
      group: ["transform"],
      subtitle: '={{$parameter["operation"]}} : {{$parameter["resource"]}}',
      version: 1,
      description: "Consume SecurityScorecard API",
      defaults: {
        name: "SecurityScorecard"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "securityScorecardApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          required: true,
          options: [
            {
              name: "Company",
              value: "company"
            },
            {
              name: "Industry",
              value: "industry"
            },
            {
              name: "Invite",
              value: "invite"
            },
            {
              name: "Portfolio",
              value: "portfolio"
            },
            {
              name: "Portfolio Company",
              value: "portfolioCompany"
            },
            {
              name: "Report",
              value: "report"
            }
          ],
          default: "company"
        },
        // Company
        ...import_CompanyDescription.companyOperations,
        ...import_CompanyDescription.companyFields,
        // Industry
        ...import_IndustryDescription.industryOperations,
        ...import_IndustryDescription.industryFields,
        // Invite
        ...import_InviteDescription.inviteOperations,
        ...import_InviteDescription.inviteFields,
        // Portfolio
        ...import_PortfolioDescription.portfolioOperations,
        ...import_PortfolioDescription.portfolioFields,
        // Portfolio Company
        ...import_PortfolioCompanyDescription.portfolioCompanyOperations,
        ...import_PortfolioCompanyDescription.portfolioCompanyFields,
        // Report
        ...import_ReportDescription.reportOperations,
        ...import_ReportDescription.reportFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const length = items.length;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      if (resource === "portfolio") {
        if (operation === "create") {
          const name = this.getNodeParameter("name", i);
          const description = this.getNodeParameter("description", i);
          const privacy = this.getNodeParameter("privacy", i);
          const body = {
            name,
            description,
            privacy
          };
          responseData = await import_GenericFunctions.scorecardApiRequest.call(this, "POST", "portfolios", body);
          returnData.push(responseData);
        }
        if (operation === "delete") {
          const portfolioId = this.getNodeParameter("portfolioId", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "DELETE",
            `portfolios/${portfolioId}`
          );
          returnData.push({ success: true });
        }
        if (operation === "update") {
          const portfolioId = this.getNodeParameter("portfolioId", i);
          const name = this.getNodeParameter("name", i);
          const description = this.getNodeParameter("description", i);
          const privacy = this.getNodeParameter("privacy", i);
          const body = {
            name,
            description,
            privacy
          };
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "PUT",
            `portfolios/${portfolioId}`,
            body
          );
          returnData.push(responseData);
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", 0);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(this, "GET", "portfolios");
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", 0);
            responseData = responseData.splice(0, limit);
          }
          returnData.push.apply(returnData, responseData);
        }
      }
      if (resource === "portfolioCompany") {
        if (operation === "add") {
          const portfolioId = this.getNodeParameter("portfolioId", i);
          const domain = this.getNodeParameter("domain", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "PUT",
            `portfolios/${portfolioId}/companies/${domain}`
          );
          returnData.push(responseData);
        }
        if (operation === "remove") {
          const portfolioId = this.getNodeParameter("portfolioId", i);
          const domain = this.getNodeParameter("domain", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "DELETE",
            `portfolios/${portfolioId}/companies/${domain}`
          );
          returnData.push({ success: true });
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", 0);
          const portfolioId = this.getNodeParameter("portfolioId", i);
          const filterParams = this.getNodeParameter("filters", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `portfolios/${portfolioId}/companies`,
            {},
            filterParams
          );
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", 0);
            responseData = responseData.splice(0, limit);
          }
          returnData.push.apply(returnData, responseData);
        }
      }
      if (resource === "report") {
        if (operation === "download") {
          const reportUrl = this.getNodeParameter("url", i);
          const response = await import_GenericFunctions.scorecardApiRequest.call(this, "GET", "", {}, {}, reportUrl, {
            encoding: null,
            resolveWithFullResponse: true
          });
          let mimeType;
          if (response.headers["content-type"]) {
            mimeType = response.headers["content-type"];
          }
          const newItem = {
            json: items[i].json,
            binary: {}
          };
          if (items[i].binary !== void 0 && newItem.binary) {
            Object.assign(newItem.binary, items[i].binary);
          }
          items[i] = newItem;
          const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", i);
          const fileName = reportUrl.split("/").pop();
          const data = Buffer.from(response.body, "utf8");
          items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
            data,
            fileName,
            mimeType
          );
        }
        if (operation === "generate") {
          const reportType = this.getNodeParameter("report", i);
          let body = {};
          if (reportType !== "portfolio") {
            body.scorecard_identifier = this.getNodeParameter("scorecardIdentifier", i);
          } else {
            body.portfolio_id = this.getNodeParameter("portfolioId", i);
          }
          if (reportType === "events-json") {
            body.date = this.getNodeParameter("date", i);
          }
          if (["issues", "portfolio"].indexOf(reportType) > -1) {
            body.format = this.getNodeParameter("options.format", i) || "pdf";
          }
          if (["detailed", "summary"].indexOf(reportType) > -1) {
            body.branding = this.getNodeParameter("branding", i);
          }
          if (["events-json", "full-scorecard-json"].indexOf(reportType) > -1) {
            body = { params: body };
          }
          if (reportType === "scorecard-footprint") {
            const options = this.getNodeParameter("options", i);
            Object.assign(body, options);
          }
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "POST",
            `reports/${reportType}`,
            body
          );
          returnData.push(responseData);
        }
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", 0);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(this, "GET", "reports/recent");
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
          returnData.push.apply(returnData, responseData);
        }
      }
      if (resource === "invite") {
        if (operation === "create") {
          const body = {
            email: this.getNodeParameter("email", i),
            first_name: this.getNodeParameter("firstName", i),
            last_name: this.getNodeParameter("lastName", i),
            message: this.getNodeParameter("message", i)
          };
          const additionalFields = this.getNodeParameter("additionalFields", i);
          Object.assign(body, additionalFields);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(this, "POST", "invitations", body);
          returnData.push(responseData);
        }
      }
      if (resource === "industry") {
        if (operation === "getScore") {
          const industry = this.getNodeParameter("industry", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `industries/${industry}/score`
          );
          returnData.push(responseData);
        }
        if (operation === "getFactor") {
          const simple = this.getNodeParameter("simple", 0);
          const returnAll = this.getNodeParameter("returnAll", 0);
          const industry = this.getNodeParameter("industry", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `industries/${industry}/history/factors`
          );
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
          if (simple) {
            responseData = (0, import_GenericFunctions.simplify)(responseData);
          }
          returnData.push.apply(returnData, responseData);
        }
        if (operation === "getFactorHistorical") {
          const simple = this.getNodeParameter("simple", 0);
          const returnAll = this.getNodeParameter("returnAll", i);
          const industry = this.getNodeParameter("industry", i);
          const options = this.getNodeParameter("options", i);
          if (options.from) {
            options.from = (0, import_moment_timezone.default)(options.from).format("YYYY-MM-DD");
          }
          if (options.to) {
            options.to = (0, import_moment_timezone.default)(options.to).format("YYYY-MM-DD");
          }
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `industries/${industry}/history/factors`,
            {},
            options
          );
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
          if (simple) {
            responseData = (0, import_GenericFunctions.simplify)(responseData);
          }
          returnData.push.apply(returnData, responseData);
        }
      }
      if (resource === "company") {
        if (operation === "getScorecard") {
          const scorecardIdentifier = this.getNodeParameter("scorecardIdentifier", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `companies/${scorecardIdentifier}`
          );
          returnData.push(responseData);
        }
        if (operation === "getFactor") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const scorecardIdentifier = this.getNodeParameter("scorecardIdentifier", i);
          const filterParams = this.getNodeParameter("filters", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `companies/${scorecardIdentifier}/factors`,
            {},
            filterParams
          );
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
          returnData.push.apply(returnData, responseData);
        }
        if (operation === "getFactorHistorical") {
          const simple = this.getNodeParameter("simple", 0);
          const returnAll = this.getNodeParameter("returnAll", i);
          const scorecardIdentifier = this.getNodeParameter("scorecardIdentifier", i);
          const options = this.getNodeParameter("options", i);
          if (options.date_from) {
            options.date_from = (0, import_moment_timezone.default)(options.date_from).format("YYYY-MM-DD");
          }
          if (options.date_to) {
            options.date_to = (0, import_moment_timezone.default)(options.date_to).format("YYYY-MM-DD");
          }
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `companies/${scorecardIdentifier}/history/factors/score`,
            {},
            options
          );
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
          if (simple) {
            responseData = (0, import_GenericFunctions.simplify)(responseData);
          }
          returnData.push.apply(returnData, responseData);
        }
        if (operation === "getHistoricalScore") {
          const simple = this.getNodeParameter("simple", 0);
          const returnAll = this.getNodeParameter("returnAll", i);
          const scorecardIdentifier = this.getNodeParameter("scorecardIdentifier", i);
          const options = this.getNodeParameter("options", i);
          if (options.date_from) {
            options.from = (0, import_moment_timezone.default)(options.date_from).format("YYYY-MM-DD");
            delete options.date_from;
          }
          if (options.date_to) {
            options.to = (0, import_moment_timezone.default)(options.date_to).format("YYYY-MM-DD");
            delete options.date_to;
          }
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `companies/${scorecardIdentifier}/history/factors/score`,
            {},
            options
          );
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
          if (simple) {
            responseData = (0, import_GenericFunctions.simplify)(responseData);
          }
          returnData.push.apply(returnData, responseData);
        }
        if (operation === "getScorePlan") {
          const returnAll = this.getNodeParameter("returnAll", i);
          const scorecardIdentifier = this.getNodeParameter("scorecardIdentifier", i);
          const targetScore = this.getNodeParameter("score", i);
          responseData = await import_GenericFunctions.scorecardApiRequest.call(
            this,
            "GET",
            `companies/${scorecardIdentifier}/score-plans/by-target/${targetScore}`
          );
          responseData = responseData.entries;
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", i);
            responseData = responseData.splice(0, limit);
          }
          returnData.push.apply(returnData, responseData);
        }
      }
    }
    if (resource === "report" && operation === "download") {
      return [items];
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SecurityScorecard
});
//# sourceMappingURL=SecurityScorecard.node.js.map