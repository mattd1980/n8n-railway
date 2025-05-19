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
var AwsS3V2_node_exports = {};
__export(AwsS3V2_node_exports, {
  AwsS3V2: () => AwsS3V2
});
module.exports = __toCommonJS(AwsS3V2_node_exports);
var import_change_case = require("change-case");
var import_crypto = require("crypto");
var import_n8n_workflow = require("n8n-workflow");
var import_xml2js = require("xml2js");
var import_BucketDescription = require("./BucketDescription");
var import_FileDescription = require("./FileDescription");
var import_FolderDescription = require("./FolderDescription");
var import_GenericFunctions = require("./GenericFunctions");
const UPLOAD_CHUNK_SIZE = 5120 * 1024;
class AwsS3V2 {
  constructor(baseDescription) {
    this.description = {
      ...baseDescription,
      displayName: "AWS S3",
      name: "awsS3",
      icon: "file:s3.svg",
      group: ["output"],
      version: 2,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Sends data to AWS S3",
      defaults: {
        name: "AWS S3"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "aws",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Bucket",
              value: "bucket"
            },
            {
              name: "File",
              value: "file"
            },
            {
              name: "Folder",
              value: "folder"
            }
          ],
          default: "file"
        },
        // BUCKET
        ...import_BucketDescription.bucketOperations,
        ...import_BucketDescription.bucketFields,
        // FOLDER
        ...import_FolderDescription.folderOperations,
        ...import_FolderDescription.folderFields,
        // UPLOAD
        ...import_FileDescription.fileOperations,
        ...import_FileDescription.fileFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      let headers = {};
      try {
        if (resource === "bucket") {
          if (operation === "create") {
            const credentials = await this.getCredentials("aws");
            const name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.acl) {
              headers["x-amz-acl"] = (0, import_change_case.paramCase)(additionalFields.acl);
            }
            if (additionalFields.bucketObjectLockEnabled) {
              headers["x-amz-bucket-object-lock-enabled"] = additionalFields.bucketObjectLockEnabled;
            }
            if (additionalFields.grantFullControl) {
              headers["x-amz-grant-full-control"] = "";
            }
            if (additionalFields.grantRead) {
              headers["x-amz-grant-read"] = "";
            }
            if (additionalFields.grantReadAcp) {
              headers["x-amz-grant-read-acp"] = "";
            }
            if (additionalFields.grantWrite) {
              headers["x-amz-grant-write"] = "";
            }
            if (additionalFields.grantWriteAcp) {
              headers["x-amz-grant-write-acp"] = "";
            }
            let region = credentials.region;
            if (additionalFields.region) {
              region = additionalFields.region;
            }
            const body = {
              CreateBucketConfiguration: {
                $: {
                  xmlns: "http://s3.amazonaws.com/doc/2006-03-01/"
                }
              }
            };
            let data = "";
            if (region !== "us-east-1") {
              body.CreateBucketConfiguration.LocationConstraint = [region];
              const builder = new import_xml2js.Builder();
              data = builder.buildObject(body);
            }
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              `${name}.s3`,
              "PUT",
              "",
              data,
              qs,
              headers
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ success: true }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "delete") {
            const name = this.getNodeParameter("name", i);
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              `${name}.s3`,
              "DELETE",
              "",
              "",
              {},
              headers
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ success: true }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (returnAll) {
              responseData = await import_GenericFunctions.awsApiRequestRESTAllItems.call(
                this,
                "ListAllMyBucketsResult.Buckets.Bucket",
                "s3",
                "GET",
                ""
              );
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.awsApiRequestRESTAllItems.call(
                this,
                "ListAllMyBucketsResult.Buckets.Bucket",
                "s3",
                "GET",
                "",
                "",
                qs
              );
              responseData = responseData.slice(0, qs.limit);
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "search") {
            const bucketName = this.getNodeParameter("bucketName", i);
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const returnAll = this.getNodeParameter("returnAll", 0);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.prefix) {
              qs.prefix = additionalFields.prefix;
            }
            if (additionalFields.encodingType) {
              qs["encoding-type"] = additionalFields.encodingType;
            }
            if (additionalFields.delimiter) {
              qs.delimiter = additionalFields.delimiter;
            }
            if (additionalFields.fetchOwner) {
              qs["fetch-owner"] = additionalFields.fetchOwner;
            }
            if (additionalFields.startAfter) {
              qs["start-after"] = additionalFields.startAfter;
            }
            if (additionalFields.requesterPays) {
              qs["x-amz-request-payer"] = "requester";
            }
            qs["list-type"] = 2;
            responseData = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            const region = responseData.LocationConstraint._;
            if (returnAll) {
              responseData = await import_GenericFunctions.awsApiRequestRESTAllItems.call(
                this,
                "ListBucketResult.Contents",
                servicePath,
                "GET",
                basePath,
                "",
                qs,
                {},
                {},
                region
              );
            } else {
              qs["max-keys"] = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.awsApiRequestREST.call(
                this,
                servicePath,
                "GET",
                basePath,
                "",
                qs,
                {},
                {},
                region
              );
              responseData = responseData.ListBucketResult.Contents;
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
        }
        if (resource === "folder") {
          if (operation === "create") {
            const bucketName = this.getNodeParameter("bucketName", i);
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const folderName = this.getNodeParameter("folderName", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            let path = `${basePath}/${folderName}/`;
            if (additionalFields.requesterPays) {
              headers["x-amz-request-payer"] = "requester";
            }
            if (additionalFields.parentFolderKey) {
              path = `${basePath}/${additionalFields.parentFolderKey}/${folderName}/`;
            }
            if (additionalFields.storageClass) {
              headers["x-amz-storage-class"] = (0, import_change_case.snakeCase)(
                additionalFields.storageClass
              ).toUpperCase();
            }
            responseData = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            const region = responseData.LocationConstraint._;
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              servicePath,
              "PUT",
              path,
              "",
              qs,
              headers,
              {},
              region
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ success: true }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "delete") {
            const bucketName = this.getNodeParameter("bucketName", i);
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const folderKey = this.getNodeParameter("folderKey", i);
            responseData = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            const region = responseData.LocationConstraint._;
            responseData = await import_GenericFunctions.awsApiRequestRESTAllItems.call(
              this,
              "ListBucketResult.Contents",
              servicePath,
              "GET",
              basePath,
              "",
              { "list-type": 2, prefix: folderKey },
              {},
              {},
              region
            );
            if (responseData.length === 0) {
              responseData = await import_GenericFunctions.awsApiRequestREST.call(
                this,
                servicePath,
                "DELETE",
                `${basePath}/${folderKey}`,
                "",
                qs,
                {},
                {},
                region
              );
              responseData = { deleted: [{ Key: folderKey }] };
            } else {
              const body = {
                Delete: {
                  $: {
                    xmlns: "http://s3.amazonaws.com/doc/2006-03-01/"
                  },
                  Object: []
                }
              };
              for (const childObject of responseData) {
                body.Delete.Object.push({
                  Key: childObject.Key
                });
              }
              const builder = new import_xml2js.Builder();
              const data = builder.buildObject(body);
              headers["Content-MD5"] = (0, import_crypto.createHash)("md5").update(data).digest("base64");
              headers["Content-Type"] = "application/xml";
              responseData = await import_GenericFunctions.awsApiRequestREST.call(
                this,
                servicePath,
                "POST",
                `${basePath}/`,
                data,
                { delete: "" },
                headers,
                {},
                region
              );
              responseData = { deleted: responseData.DeleteResult.Deleted };
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "getAll") {
            const bucketName = this.getNodeParameter("bucketName", i);
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const returnAll = this.getNodeParameter("returnAll", 0);
            const options = this.getNodeParameter("options", 0);
            if (options.folderKey) {
              qs.prefix = options.folderKey;
            }
            if (options.fetchOwner) {
              qs["fetch-owner"] = options.fetchOwner;
            }
            qs["list-type"] = 2;
            responseData = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            const region = responseData.LocationConstraint._;
            if (returnAll) {
              responseData = await import_GenericFunctions.awsApiRequestRESTAllItems.call(
                this,
                "ListBucketResult.Contents",
                servicePath,
                "GET",
                basePath,
                "",
                qs,
                {},
                {},
                region
              );
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.awsApiRequestRESTAllItems.call(
                this,
                "ListBucketResult.Contents",
                servicePath,
                "GET",
                basePath,
                "",
                qs,
                {},
                {},
                region
              );
            }
            if (Array.isArray(responseData)) {
              responseData = responseData.filter(
                (e) => e.Key.endsWith("/") && e.Size === "0" && e.Key !== options.folderKey
              );
              if (qs.limit) {
                responseData = responseData.splice(0, qs.limit);
              }
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray(responseData),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            }
          }
        }
        if (resource === "file") {
          if (operation === "copy") {
            const sourcePath = this.getNodeParameter("sourcePath", i);
            const destinationPath = this.getNodeParameter("destinationPath", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            headers["x-amz-copy-source"] = sourcePath;
            if (additionalFields.requesterPays) {
              headers["x-amz-request-payer"] = "requester";
            }
            if (additionalFields.storageClass) {
              headers["x-amz-storage-class"] = (0, import_change_case.snakeCase)(
                additionalFields.storageClass
              ).toUpperCase();
            }
            if (additionalFields.acl) {
              headers["x-amz-acl"] = (0, import_change_case.paramCase)(additionalFields.acl);
            }
            if (additionalFields.grantFullControl) {
              headers["x-amz-grant-full-control"] = "";
            }
            if (additionalFields.grantRead) {
              headers["x-amz-grant-read"] = "";
            }
            if (additionalFields.grantReadAcp) {
              headers["x-amz-grant-read-acp"] = "";
            }
            if (additionalFields.grantWriteAcp) {
              headers["x-amz-grant-write-acp"] = "";
            }
            if (additionalFields.lockLegalHold) {
              headers["x-amz-object-lock-legal-hold"] = additionalFields.lockLegalHold ? "ON" : "OFF";
            }
            if (additionalFields.lockMode) {
              headers["x-amz-object-lock-mode"] = additionalFields.lockMode.toUpperCase();
            }
            if (additionalFields.lockRetainUntilDate) {
              headers["x-amz-object-lock-retain-until-date"] = additionalFields.lockRetainUntilDate;
            }
            if (additionalFields.serverSideEncryption) {
              headers["x-amz-server-side-encryption"] = additionalFields.serverSideEncryption;
            }
            if (additionalFields.encryptionAwsKmsKeyId) {
              headers["x-amz-server-side-encryption-aws-kms-key-id"] = additionalFields.encryptionAwsKmsKeyId;
            }
            if (additionalFields.serverSideEncryptionContext) {
              headers["x-amz-server-side-encryption-context"] = additionalFields.serverSideEncryptionContext;
            }
            if (additionalFields.serversideEncryptionCustomerAlgorithm) {
              headers["x-amz-server-side-encryption-customer-algorithm"] = additionalFields.serversideEncryptionCustomerAlgorithm;
            }
            if (additionalFields.serversideEncryptionCustomerKey) {
              headers["x-amz-server-side-encryption-customer-key"] = additionalFields.serversideEncryptionCustomerKey;
            }
            if (additionalFields.serversideEncryptionCustomerKeyMD5) {
              headers["x-amz-server-side-encryption-customer-key-MD5"] = additionalFields.serversideEncryptionCustomerKeyMD5;
            }
            if (additionalFields.taggingDirective) {
              headers["x-amz-tagging-directive"] = additionalFields.taggingDirective.toUpperCase();
            }
            if (additionalFields.metadataDirective) {
              headers["x-amz-metadata-directive"] = additionalFields.metadataDirective.toUpperCase();
            }
            const destinationParts = destinationPath.split("/");
            const bucketName = destinationParts[1];
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const destination = `${basePath}/${destinationParts.slice(2, destinationParts.length).join("/")}`;
            responseData = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            const region = responseData.LocationConstraint._;
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              servicePath,
              "PUT",
              destination,
              "",
              qs,
              headers,
              {},
              region
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(responseData.CopyObjectResult),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "download") {
            const bucketName = this.getNodeParameter("bucketName", i);
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const fileKey = this.getNodeParameter("fileKey", i);
            const fileName = fileKey.split("/")[fileKey.split("/").length - 1];
            if (fileKey.substring(fileKey.length - 1) === "/") {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                "Downloading a whole directory is not yet supported, please provide a file key"
              );
            }
            let region = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            region = region.LocationConstraint._;
            const response = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              servicePath,
              "GET",
              `${basePath}/${fileKey}`,
              "",
              qs,
              {},
              { encoding: null, resolveWithFullResponse: true },
              region
            );
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
            const data = Buffer.from(response.body, "utf8");
            items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
              data,
              fileName,
              mimeType
            );
          }
          if (operation === "delete") {
            const bucketName = this.getNodeParameter("bucketName", i);
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const fileKey = this.getNodeParameter("fileKey", i);
            const options = this.getNodeParameter("options", i);
            if (options.versionId) {
              qs.versionId = options.versionId;
            }
            responseData = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            const region = responseData.LocationConstraint._;
            responseData = await import_GenericFunctions.awsApiRequestREST.call(
              this,
              servicePath,
              "DELETE",
              `${basePath}/${fileKey}`,
              "",
              qs,
              {},
              {},
              region
            );
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ success: true }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
          if (operation === "getAll") {
            const bucketName = this.getNodeParameter("bucketName", i);
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const returnAll = this.getNodeParameter("returnAll", 0);
            const options = this.getNodeParameter("options", 0);
            if (options.folderKey) {
              qs.prefix = options.folderKey;
            }
            if (options.fetchOwner) {
              qs["fetch-owner"] = options.fetchOwner;
            }
            qs.delimiter = "/";
            qs["list-type"] = 2;
            responseData = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            const region = responseData.LocationConstraint._;
            if (returnAll) {
              responseData = await import_GenericFunctions.awsApiRequestRESTAllItems.call(
                this,
                "ListBucketResult.Contents",
                servicePath,
                "GET",
                basePath,
                "",
                qs,
                {},
                {},
                region
              );
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.awsApiRequestRESTAllItems.call(
                this,
                "ListBucketResult.Contents",
                servicePath,
                "GET",
                basePath,
                "",
                qs,
                {},
                {},
                region
              );
              responseData = responseData.splice(0, qs.limit);
            }
            if (Array.isArray(responseData)) {
              responseData = responseData.filter(
                (e) => !e.Key.endsWith("/") && e.Size !== "0"
              );
              if (qs.limit) {
                responseData = responseData.splice(0, qs.limit);
              }
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray(responseData),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            }
          }
          if (operation === "upload") {
            const bucketName = this.getNodeParameter("bucketName", i);
            const servicePath = bucketName.includes(".") ? "s3" : `${bucketName}.s3`;
            const basePath = bucketName.includes(".") ? `/${bucketName}` : "";
            const fileName = this.getNodeParameter("fileName", i);
            const isBinaryData = this.getNodeParameter("binaryData", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const tagsValues = this.getNodeParameter("tagsUi", i).tagsValues;
            let path = `${basePath}/${fileName}`;
            let body;
            const multipartHeaders = {};
            const neededHeaders = {};
            if (additionalFields.requesterPays) {
              neededHeaders["x-amz-request-payer"] = "requester";
            }
            if (additionalFields.parentFolderKey) {
              path = `${basePath}/${additionalFields.parentFolderKey}/${fileName}`;
            }
            if (additionalFields.storageClass) {
              multipartHeaders["x-amz-storage-class"] = (0, import_change_case.snakeCase)(
                additionalFields.storageClass
              ).toUpperCase();
            }
            if (additionalFields.acl) {
              multipartHeaders["x-amz-acl"] = (0, import_change_case.paramCase)(additionalFields.acl);
            }
            if (additionalFields.grantFullControl) {
              multipartHeaders["x-amz-grant-full-control"] = "";
            }
            if (additionalFields.grantRead) {
              multipartHeaders["x-amz-grant-read"] = "";
            }
            if (additionalFields.grantReadAcp) {
              multipartHeaders["x-amz-grant-read-acp"] = "";
            }
            if (additionalFields.grantWriteAcp) {
              multipartHeaders["x-amz-grant-write-acp"] = "";
            }
            if (additionalFields.lockLegalHold) {
              multipartHeaders["x-amz-object-lock-legal-hold"] = additionalFields.lockLegalHold ? "ON" : "OFF";
            }
            if (additionalFields.lockMode) {
              multipartHeaders["x-amz-object-lock-mode"] = additionalFields.lockMode.toUpperCase();
            }
            if (additionalFields.lockRetainUntilDate) {
              multipartHeaders["x-amz-object-lock-retain-until-date"] = additionalFields.lockRetainUntilDate;
            }
            if (additionalFields.serverSideEncryption) {
              neededHeaders["x-amz-server-side-encryption"] = additionalFields.serverSideEncryption;
            }
            if (additionalFields.encryptionAwsKmsKeyId) {
              neededHeaders["x-amz-server-side-encryption-aws-kms-key-id"] = additionalFields.encryptionAwsKmsKeyId;
            }
            if (additionalFields.serverSideEncryptionContext) {
              neededHeaders["x-amz-server-side-encryption-context"] = additionalFields.serverSideEncryptionContext;
            }
            if (additionalFields.serversideEncryptionCustomerAlgorithm) {
              neededHeaders["x-amz-server-side-encryption-customer-algorithm"] = additionalFields.serversideEncryptionCustomerAlgorithm;
            }
            if (additionalFields.serversideEncryptionCustomerKey) {
              neededHeaders["x-amz-server-side-encryption-customer-key"] = additionalFields.serversideEncryptionCustomerKey;
            }
            if (additionalFields.serversideEncryptionCustomerKeyMD5) {
              neededHeaders["x-amz-server-side-encryption-customer-key-MD5"] = additionalFields.serversideEncryptionCustomerKeyMD5;
            }
            if (tagsValues) {
              const tags = [];
              tagsValues.forEach((o) => {
                tags.push(`${o.key}=${o.value}`);
              });
              multipartHeaders["x-amz-tagging"] = tags.join("&");
            }
            responseData = await import_GenericFunctions.awsApiRequestREST.call(this, servicePath, "GET", basePath, "", {
              location: ""
            });
            const region = responseData.LocationConstraint._;
            if (isBinaryData) {
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
              const binaryPropertyData = this.helpers.assertBinaryData(i, binaryPropertyName);
              let uploadData;
              multipartHeaders["Content-Type"] = binaryPropertyData.mimeType;
              if (binaryPropertyData.id) {
                uploadData = await this.helpers.getBinaryStream(
                  binaryPropertyData.id,
                  UPLOAD_CHUNK_SIZE
                );
                const createMultiPartUpload = await import_GenericFunctions.awsApiRequestREST.call(
                  this,
                  servicePath,
                  "POST",
                  `${path}?uploads`,
                  body,
                  qs,
                  { ...neededHeaders, ...multipartHeaders },
                  {},
                  region
                );
                const uploadId = createMultiPartUpload.InitiateMultipartUploadResult.UploadId;
                let part = 1;
                for await (const chunk of uploadData) {
                  const chunkBuffer = await this.helpers.binaryToBuffer(chunk);
                  const listHeaders = {
                    "Content-Length": chunk.length,
                    "Content-MD5": (0, import_crypto.createHash)("MD5").update(chunkBuffer).digest("base64"),
                    ...neededHeaders
                  };
                  try {
                    await import_GenericFunctions.awsApiRequestREST.call(
                      this,
                      servicePath,
                      "PUT",
                      `${path}?partNumber=${part}&uploadId=${uploadId}`,
                      chunk,
                      qs,
                      listHeaders,
                      {},
                      region
                    );
                    part++;
                  } catch (error) {
                    try {
                      await import_GenericFunctions.awsApiRequestREST.call(
                        this,
                        servicePath,
                        "DELETE",
                        `${path}?uploadId=${uploadId}`
                      );
                    } catch (err) {
                      throw new import_n8n_workflow.NodeOperationError(this.getNode(), err);
                    }
                    if (error.response?.status !== 308) throw error;
                  }
                }
                const listParts = await import_GenericFunctions.awsApiRequestREST.call(
                  this,
                  servicePath,
                  "GET",
                  `${path}?max-parts=${900}&part-number-marker=0&uploadId=${uploadId}`,
                  "",
                  qs,
                  { ...neededHeaders },
                  {},
                  region
                );
                if (!Array.isArray(listParts.ListPartsResult.Part)) {
                  body = {
                    CompleteMultipartUpload: {
                      $: {
                        xmlns: "http://s3.amazonaws.com/doc/2006-03-01/"
                      },
                      Part: {
                        ETag: listParts.ListPartsResult.Part.ETag,
                        PartNumber: listParts.ListPartsResult.Part.PartNumber
                      }
                    }
                  };
                } else {
                  body = {
                    CompleteMultipartUpload: {
                      $: {
                        xmlns: "http://s3.amazonaws.com/doc/2006-03-01/"
                      },
                      Part: listParts.ListPartsResult.Part.map((Part) => {
                        return {
                          ETag: Part.ETag,
                          PartNumber: Part.PartNumber
                        };
                      })
                    }
                  };
                }
                const builder = new import_xml2js.Builder();
                const data = builder.buildObject(body);
                const completeUpload = await import_GenericFunctions.awsApiRequestREST.call(
                  this,
                  servicePath,
                  "POST",
                  `${path}?uploadId=${uploadId}`,
                  data,
                  qs,
                  {
                    ...neededHeaders,
                    "Content-MD5": (0, import_crypto.createHash)("md5").update(data).digest("base64"),
                    "Content-Type": "application/xml"
                  },
                  {},
                  region
                );
                responseData = {
                  ...completeUpload.CompleteMultipartUploadResult
                };
              } else {
                const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(
                  i,
                  binaryPropertyName
                );
                body = binaryDataBuffer;
                headers = { ...neededHeaders, ...multipartHeaders };
                headers["Content-Type"] = binaryPropertyData.mimeType;
                headers["Content-MD5"] = (0, import_crypto.createHash)("md5").update(body).digest("base64");
                responseData = await import_GenericFunctions.awsApiRequestREST.call(
                  this,
                  servicePath,
                  "PUT",
                  path,
                  body,
                  qs,
                  headers,
                  {},
                  region
                );
              }
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray(responseData ?? { success: true }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            } else {
              const fileContent = this.getNodeParameter("fileContent", i);
              body = Buffer.from(fileContent, "utf8");
              headers = { ...neededHeaders, ...multipartHeaders };
              headers["Content-Type"] = "text/html";
              headers["Content-MD5"] = (0, import_crypto.createHash)("md5").update(fileContent).digest("base64");
              responseData = await import_GenericFunctions.awsApiRequestREST.call(
                this,
                servicePath,
                "PUT",
                path,
                body,
                qs,
                { ...headers },
                {},
                region
              );
              const executionData = this.helpers.constructExecutionMetaData(
                this.helpers.returnJsonArray({ success: true }),
                { itemData: { item: i } }
              );
              returnData.push(...executionData);
            }
          }
        }
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
    if (resource === "file" && operation === "download") {
      return [items];
    } else {
      return [returnData];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AwsS3V2
});
//# sourceMappingURL=AwsS3V2.node.js.map