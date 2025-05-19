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
var LinkedIn_node_exports = {};
__export(LinkedIn_node_exports, {
  LinkedIn: () => LinkedIn
});
module.exports = __toCommonJS(LinkedIn_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_PostDescription = require("./PostDescription");
class LinkedIn {
  constructor() {
    this.description = {
      displayName: "LinkedIn",
      name: "linkedIn",
      icon: "file:linkedin.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume LinkedIn API",
      defaults: {
        name: "LinkedIn"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "linkedInOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["standard"]
            }
          }
        },
        {
          name: "linkedInCommunityManagementOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["communityManagement"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Standard",
              value: "standard"
            },
            {
              name: "Community Management",
              value: "communityManagement"
            }
          ],
          default: "standard"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Post",
              value: "post"
            }
          ],
          default: "post"
        },
        //POST
        ...import_PostDescription.postOperations,
        ...import_PostDescription.postFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get Person URN which has to be used with other LinkedIn API Requests
        // https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin
        async getPersonUrn() {
          const authentication = this.getNodeParameter("authentication", 0);
          let endpoint = "/v2/me";
          if (authentication === "standard") {
            const { legacy } = await this.getCredentials("linkedInOAuth2Api");
            if (!legacy) {
              endpoint = "/v2/userinfo";
            }
          }
          const person = await import_GenericFunctions.linkedInApiRequest.call(this, "GET", endpoint, {});
          const firstName = person.localizedFirstName ?? person.given_name;
          const lastName = person.localizedLastName ?? person.family_name;
          const name = `${firstName} ${lastName}`;
          const returnData = [
            {
              name,
              value: person.id ?? person.sub
            }
          ];
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let body = {};
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "post") {
          if (operation === "create") {
            let text = this.getNodeParameter("text", i);
            const shareMediaCategory = this.getNodeParameter("shareMediaCategory", i);
            const postAs = this.getNodeParameter("postAs", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            text = text.replace(/[\(*\)\[\]\{\}<>@|~_]/gm, (char) => "\\" + char);
            let authorUrn = "";
            let visibility = "PUBLIC";
            if (postAs === "person") {
              const personUrn = this.getNodeParameter("person", i);
              visibility = additionalFields.visibility || "PUBLIC";
              authorUrn = `urn:li:person:${personUrn}`;
            } else {
              const organizationUrn = this.getNodeParameter("organization", i);
              authorUrn = `urn:li:organization:${organizationUrn}`;
            }
            let description = "";
            let title = "";
            let originalUrl = "";
            body = {
              author: authorUrn,
              lifecycleState: "PUBLISHED",
              distribution: {
                feedDistribution: "MAIN_FEED",
                thirdPartyDistributionChannels: []
              },
              visibility
            };
            if (shareMediaCategory === "IMAGE") {
              if (additionalFields.title) {
                title = additionalFields.title;
              }
              const registerRequest = {
                initializeUploadRequest: {
                  owner: authorUrn
                }
              };
              const registerObject = await import_GenericFunctions.linkedInApiRequest.call(
                this,
                "POST",
                "/images?action=initializeUpload",
                registerRequest
              );
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
              const imageMetadata = this.helpers.assertBinaryData(i, binaryPropertyName);
              const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
              const { uploadUrl, image } = registerObject.value;
              const headers = {};
              Object.assign(headers, { "Content-Type": imageMetadata.mimeType });
              await import_GenericFunctions.linkedInApiRequest.call(
                this,
                "POST",
                uploadUrl,
                buffer,
                true,
                headers
              );
              const imageBody = {
                content: {
                  media: {
                    title,
                    id: image
                  }
                },
                commentary: text
              };
              Object.assign(body, imageBody);
            } else if (shareMediaCategory === "ARTICLE") {
              if (additionalFields.description) {
                description = additionalFields.description;
              }
              if (additionalFields.title) {
                title = additionalFields.title;
              }
              if (additionalFields.originalUrl) {
                originalUrl = additionalFields.originalUrl;
              }
              const articleBody = {
                content: {
                  article: {
                    title,
                    description,
                    source: originalUrl
                  }
                },
                commentary: text
              };
              if (additionalFields.thumbnailBinaryPropertyName) {
                const registerRequest = {
                  initializeUploadRequest: {
                    owner: authorUrn
                  }
                };
                const registerObject = await import_GenericFunctions.linkedInApiRequest.call(
                  this,
                  "POST",
                  "/images?action=initializeUpload",
                  registerRequest
                );
                const binaryPropertyName = additionalFields.thumbnailBinaryPropertyName;
                const imageMetadata = this.helpers.assertBinaryData(i, binaryPropertyName);
                const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
                const { uploadUrl, image } = registerObject.value;
                const headers = {};
                Object.assign(headers, { "Content-Type": imageMetadata.mimeType });
                await import_GenericFunctions.linkedInApiRequest.call(
                  this,
                  "POST",
                  uploadUrl,
                  buffer,
                  true,
                  headers
                );
                Object.assign(articleBody.content.article, { thumbnail: image });
              }
              Object.assign(body, articleBody);
              if (description === "") {
                delete body.description;
              }
              if (title === "") {
                delete body.title;
              }
            } else {
              Object.assign(body, {
                commentary: text
              });
            }
            const endpoint = "/posts";
            responseData = await import_GenericFunctions.linkedInApiRequest.call(this, "POST", endpoint, body);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
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
  LinkedIn
});
//# sourceMappingURL=LinkedIn.node.js.map