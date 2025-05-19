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
var Aws_credentials_exports = {};
__export(Aws_credentials_exports, {
  Aws: () => Aws,
  regions: () => regions
});
module.exports = __toCommonJS(Aws_credentials_exports);
var import_aws4 = require("aws4");
var import_n8n_workflow = require("n8n-workflow");
const regions = [
  {
    name: "af-south-1",
    displayName: "Africa",
    location: "Cape Town"
  },
  {
    name: "ap-east-1",
    displayName: "Asia Pacific",
    location: "Hong Kong"
  },
  {
    name: "ap-south-1",
    displayName: "Asia Pacific",
    location: "Mumbai"
  },
  {
    name: "ap-south-2",
    displayName: "Asia Pacific",
    location: "Hyderabad"
  },
  {
    name: "ap-southeast-1",
    displayName: "Asia Pacific",
    location: "Singapore"
  },
  {
    name: "ap-southeast-2",
    displayName: "Asia Pacific",
    location: "Sydney"
  },
  {
    name: "ap-southeast-3",
    displayName: "Asia Pacific",
    location: "Jakarta"
  },
  {
    name: "ap-southeast-4",
    displayName: "Asia Pacific",
    location: "Melbourne"
  },
  {
    name: "ap-southeast-5",
    displayName: "Asia Pacific",
    location: "Malaysia"
  },
  {
    name: "ap-southeast-7",
    displayName: "Asia Pacific",
    location: "Thailand"
  },
  {
    name: "ap-northeast-1",
    displayName: "Asia Pacific",
    location: "Tokyo"
  },
  {
    name: "ap-northeast-2",
    displayName: "Asia Pacific",
    location: "Seoul"
  },
  {
    name: "ap-northeast-3",
    displayName: "Asia Pacific",
    location: "Osaka"
  },
  {
    name: "ca-central-1",
    displayName: "Canada",
    location: "Central"
  },
  {
    name: "ca-west-1",
    displayName: "Canada West",
    location: "Calgary"
  },
  {
    name: "cn-north-1",
    displayName: "China",
    location: "Beijing"
  },
  {
    name: "cn-northwest-1",
    displayName: "China",
    location: "Ningxia"
  },
  {
    name: "eu-central-1",
    displayName: "Europe",
    location: "Frankfurt"
  },
  {
    name: "eu-central-2",
    displayName: "Europe",
    location: "Zurich"
  },
  {
    name: "eu-north-1",
    displayName: "Europe",
    location: "Stockholm"
  },
  {
    name: "eu-south-1",
    displayName: "Europe",
    location: "Milan"
  },
  {
    name: "eu-south-2",
    displayName: "Europe",
    location: "Spain"
  },
  {
    name: "eu-west-1",
    displayName: "Europe",
    location: "Ireland"
  },
  {
    name: "eu-west-2",
    displayName: "Europe",
    location: "London"
  },
  {
    name: "eu-west-3",
    displayName: "Europe",
    location: "Paris"
  },
  {
    name: "il-central-1",
    displayName: "Israel",
    location: "Tel Aviv"
  },
  {
    name: "me-central-1",
    displayName: "Middle East",
    location: "UAE"
  },
  {
    name: "me-south-1",
    displayName: "Middle East",
    location: "Bahrain"
  },
  {
    name: "mx-central-1",
    displayName: "Mexico",
    location: "Central"
  },
  {
    name: "sa-east-1",
    displayName: "South America",
    location: "S\xE3o Paulo"
  },
  {
    name: "us-east-1",
    displayName: "US East",
    location: "N. Virginia"
  },
  {
    name: "us-east-2",
    displayName: "US East",
    location: "Ohio"
  },
  {
    name: "us-gov-east-1",
    displayName: "US East",
    location: "GovCloud"
  },
  {
    name: "us-west-1",
    displayName: "US West",
    location: "N. California"
  },
  {
    name: "us-west-2",
    displayName: "US West",
    location: "Oregon"
  },
  {
    name: "us-gov-west-1",
    displayName: "US West",
    location: "GovCloud"
  }
];
function parseAwsUrl(url) {
  const [service, region] = url.hostname.replace("amazonaws.com", "").split(".");
  return { service, region };
}
class Aws {
  constructor() {
    this.name = "aws";
    this.displayName = "AWS";
    this.documentationUrl = "aws";
    this.icon = { light: "file:icons/AWS.svg", dark: "file:icons/AWS.dark.svg" };
    this.properties = [
      {
        displayName: "Region",
        name: "region",
        type: "options",
        options: regions.map((r) => ({
          name: `${r.displayName} (${r.location}) - ${r.name}`,
          value: r.name
        })),
        default: "us-east-1"
      },
      {
        displayName: "Access Key ID",
        name: "accessKeyId",
        type: "string",
        default: ""
      },
      {
        displayName: "Secret Access Key",
        name: "secretAccessKey",
        type: "string",
        default: "",
        typeOptions: {
          password: true
        }
      },
      {
        displayName: "Temporary Security Credentials",
        name: "temporaryCredentials",
        description: "Support for temporary credentials from AWS STS",
        type: "boolean",
        default: false
      },
      {
        displayName: "Session Token",
        name: "sessionToken",
        type: "string",
        displayOptions: {
          show: {
            temporaryCredentials: [true]
          }
        },
        default: "",
        typeOptions: {
          password: true
        }
      },
      {
        displayName: "Custom Endpoints",
        name: "customEndpoints",
        type: "boolean",
        default: false
      },
      {
        displayName: "Rekognition Endpoint",
        name: "rekognitionEndpoint",
        description: "If you use Amazon VPC to host n8n, you can establish a connection between your VPC and Rekognition using a VPC endpoint. Leave blank to use the default endpoint.",
        type: "string",
        displayOptions: {
          show: {
            customEndpoints: [true]
          }
        },
        default: "",
        placeholder: "https://rekognition.{region}.amazonaws.com"
      },
      {
        displayName: "Lambda Endpoint",
        name: "lambdaEndpoint",
        description: "If you use Amazon VPC to host n8n, you can establish a connection between your VPC and Lambda using a VPC endpoint. Leave blank to use the default endpoint.",
        type: "string",
        displayOptions: {
          show: {
            customEndpoints: [true]
          }
        },
        default: "",
        placeholder: "https://lambda.{region}.amazonaws.com"
      },
      {
        displayName: "SNS Endpoint",
        name: "snsEndpoint",
        description: "If you use Amazon VPC to host n8n, you can establish a connection between your VPC and SNS using a VPC endpoint. Leave blank to use the default endpoint.",
        type: "string",
        displayOptions: {
          show: {
            customEndpoints: [true]
          }
        },
        default: "",
        placeholder: "https://sns.{region}.amazonaws.com"
      },
      {
        displayName: "SES Endpoint",
        name: "sesEndpoint",
        description: "If you use Amazon VPC to host n8n, you can establish a connection between your VPC and SES using a VPC endpoint. Leave blank to use the default endpoint.",
        type: "string",
        displayOptions: {
          show: {
            customEndpoints: [true]
          }
        },
        default: "",
        placeholder: "https://email.{region}.amazonaws.com"
      },
      {
        displayName: "SQS Endpoint",
        name: "sqsEndpoint",
        description: "If you use Amazon VPC to host n8n, you can establish a connection between your VPC and SQS using a VPC endpoint. Leave blank to use the default endpoint.",
        type: "string",
        displayOptions: {
          show: {
            customEndpoints: [true]
          }
        },
        default: "",
        placeholder: "https://sqs.{region}.amazonaws.com"
      },
      {
        displayName: "S3 Endpoint",
        name: "s3Endpoint",
        description: "If you use Amazon VPC to host n8n, you can establish a connection between your VPC and S3 using a VPC endpoint. Leave blank to use the default endpoint.",
        type: "string",
        displayOptions: {
          show: {
            customEndpoints: [true]
          }
        },
        default: "",
        placeholder: "https://s3.{region}.amazonaws.com"
      },
      {
        displayName: "SSM Endpoint",
        name: "ssmEndpoint",
        description: "Endpoint for AWS Systems Manager (SSM)",
        type: "string",
        displayOptions: {
          show: {
            customEndpoints: [true]
          }
        },
        default: "",
        placeholder: "https://ssm.{region}.amazonaws.com"
      }
    ];
    this.test = {
      request: {
        baseURL: "=https://sts.{{$credentials.region}}.amazonaws.com",
        url: "?Action=GetCallerIdentity&Version=2011-06-15",
        method: "POST"
      }
    };
  }
  async authenticate(rawCredentials, requestOptions) {
    const credentials = rawCredentials;
    let endpoint;
    let service = requestOptions.qs?.service;
    let path = requestOptions.qs?.path ?? "";
    const method = requestOptions.method;
    let body = requestOptions.body;
    let region = credentials.region;
    if (requestOptions.qs?._region) {
      region = requestOptions.qs._region;
      delete requestOptions.qs._region;
    }
    let query = requestOptions.qs?.query;
    const requestWithUri = requestOptions;
    if (requestWithUri.uri) {
      requestOptions.url = requestWithUri.uri;
      endpoint = new URL(requestOptions.url);
      if (service === "sts") {
        try {
          if (requestWithUri.qs?.Action !== "GetCallerIdentity") {
            query = requestWithUri.qs;
          } else {
            endpoint.searchParams.set("Action", "GetCallerIdentity");
            endpoint.searchParams.set("Version", "2011-06-15");
          }
        } catch (err) {
          console.error(err);
        }
      }
      const parsed = parseAwsUrl(endpoint);
      service = parsed.service;
      if (parsed.region) {
        region = parsed.region;
      }
    } else {
      if (!requestOptions.baseURL && !requestOptions.url) {
        let endpointString;
        if (service === "lambda" && credentials.lambdaEndpoint) {
          endpointString = credentials.lambdaEndpoint;
        } else if (service === "sns" && credentials.snsEndpoint) {
          endpointString = credentials.snsEndpoint;
        } else if (service === "sqs" && credentials.sqsEndpoint) {
          endpointString = credentials.sqsEndpoint;
        } else if (service === "s3" && credentials.s3Endpoint) {
          endpointString = credentials.s3Endpoint;
        } else if (service === "ses" && credentials.sesEndpoint) {
          endpointString = credentials.sesEndpoint;
        } else if (service === "rekognition" && credentials.rekognitionEndpoint) {
          endpointString = credentials.rekognitionEndpoint;
        } else if (service) {
          endpointString = `https://${service}.${region}.amazonaws.com`;
        } else if (service === "ssm" && credentials.ssmEndpoint) {
          endpointString = credentials.ssmEndpoint;
        }
        endpoint = new URL(endpointString.replace("{region}", region) + path);
      } else {
        const customUrl = new URL(`${requestOptions.baseURL}${requestOptions.url}${path}`);
        const parsed = parseAwsUrl(customUrl);
        service = parsed.service;
        if (parsed.region) {
          region = parsed.region;
        }
        if (service === "sts") {
          try {
            customUrl.searchParams.set("Action", "GetCallerIdentity");
            customUrl.searchParams.set("Version", "2011-06-15");
          } catch (err) {
            console.error(err);
          }
        }
        endpoint = customUrl;
      }
    }
    if (query && Object.keys(query).length !== 0) {
      Object.keys(query).forEach((key) => {
        endpoint.searchParams.append(key, query[key]);
      });
    }
    if (body && typeof body === "object" && (0, import_n8n_workflow.isObjectEmpty)(body)) {
      body = "";
    }
    path = endpoint.pathname + endpoint.search;
    const requestWithForm = requestOptions;
    let bodyContent = body !== "" ? body : void 0;
    let contentTypeHeader = void 0;
    if (requestWithForm.form) {
      const params = new URLSearchParams();
      for (const key in requestWithForm.form) {
        params.append(key, requestWithForm.form[key]);
      }
      bodyContent = params.toString();
      contentTypeHeader = "application/x-www-form-urlencoded";
    }
    const signOpts = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers ?? {},
        ...contentTypeHeader && { "content-type": contentTypeHeader }
      },
      host: endpoint.host,
      method,
      path,
      body: bodyContent,
      region
    };
    const securityHeaders = {
      accessKeyId: `${credentials.accessKeyId}`.trim(),
      secretAccessKey: `${credentials.secretAccessKey}`.trim(),
      sessionToken: credentials.temporaryCredentials ? `${credentials.sessionToken}`.trim() : void 0
    };
    try {
      (0, import_aws4.sign)(signOpts, securityHeaders);
    } catch (err) {
      console.error(err);
    }
    const options = {
      ...requestOptions,
      headers: signOpts.headers,
      method,
      url: endpoint.origin + path,
      body: signOpts.body,
      qs: void 0
      // override since it's already in the url
    };
    return options;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Aws,
  regions
});
//# sourceMappingURL=Aws.credentials.js.map