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
var NextCloud_node_exports = {};
__export(NextCloud_node_exports, {
  NextCloud: () => NextCloud
});
module.exports = __toCommonJS(NextCloud_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_url = require("url");
var import_xml2js = require("xml2js");
var import_GenericFunctions = require("./GenericFunctions");
var import_utilities = require("../../utils/utilities");
class NextCloud {
  constructor() {
    this.description = {
      displayName: "Nextcloud",
      name: "nextCloud",
      icon: "file:nextcloud.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Access data on Nextcloud",
      defaults: {
        name: "Nextcloud"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "nextCloudApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "nextCloudOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
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
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "File",
              value: "file"
            },
            {
              name: "Folder",
              value: "folder"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "file"
        },
        // ----------------------------------
        //         operations
        // ----------------------------------
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["file"]
            }
          },
          options: [
            {
              name: "Copy",
              value: "copy",
              description: "Copy a file",
              action: "Copy a file"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a file",
              action: "Delete a file"
            },
            {
              name: "Download",
              value: "download",
              description: "Download a file",
              action: "Download a file"
            },
            {
              name: "Move",
              value: "move",
              description: "Move a file",
              action: "Move a file"
            },
            {
              name: "Share",
              value: "share",
              description: "Share a file",
              action: "Share a file"
            },
            {
              name: "Upload",
              value: "upload",
              description: "Upload a file",
              action: "Upload a file"
            }
          ],
          default: "upload"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["folder"]
            }
          },
          options: [
            {
              name: "Copy",
              value: "copy",
              description: "Copy a folder",
              action: "Copy a folder"
            },
            {
              name: "Create",
              value: "create",
              description: "Create a folder",
              action: "Create a folder"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a folder",
              action: "Delete a folder"
            },
            {
              name: "List",
              value: "list",
              description: "Return the contents of a given folder",
              action: "List a folder"
            },
            {
              name: "Move",
              value: "move",
              description: "Move a folder",
              action: "Move a folder"
            },
            {
              name: "Share",
              value: "share",
              description: "Share a folder",
              action: "Share a folder"
            }
          ],
          default: "create"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["user"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              description: "Invite a user to a NextCloud organization",
              action: "Create a user"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a user",
              action: "Delete a user"
            },
            {
              name: "Get",
              value: "get",
              description: "Retrieve information about a single user",
              action: "Get a user"
            },
            {
              name: "Get Many",
              value: "getAll",
              description: "Retrieve a list of users",
              action: "Get many users"
            },
            {
              name: "Update",
              value: "update",
              description: "Edit attributes related to a user",
              action: "Update a user"
            }
          ],
          default: "create"
        },
        // ----------------------------------
        //         file
        // ----------------------------------
        // ----------------------------------
        //         file/folder:copy
        // ----------------------------------
        {
          displayName: "From Path",
          name: "path",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["copy"],
              resource: ["file", "folder"]
            }
          },
          placeholder: "/invoices/original.txt",
          description: 'The path of file or folder to copy. The path should start with "/".'
        },
        {
          displayName: "To Path",
          name: "toPath",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["copy"],
              resource: ["file", "folder"]
            }
          },
          placeholder: "/invoices/copy.txt",
          description: 'The destination path of file or folder. The path should start with "/".'
        },
        // ----------------------------------
        //         file/folder:delete
        // ----------------------------------
        {
          displayName: "Delete Path",
          name: "path",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["delete"],
              resource: ["file", "folder"]
            }
          },
          placeholder: "/invoices/2019/invoice_1.pdf",
          description: 'The path to delete. Can be a single file or a whole folder. The path should start with "/".'
        },
        // ----------------------------------
        //         file/folder:move
        // ----------------------------------
        {
          displayName: "From Path",
          name: "path",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["move"],
              resource: ["file", "folder"]
            }
          },
          placeholder: "/invoices/old_name.txt",
          description: 'The path of file or folder to move. The path should start with "/".'
        },
        {
          displayName: "To Path",
          name: "toPath",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["move"],
              resource: ["file", "folder"]
            }
          },
          placeholder: "/invoices/new_name.txt",
          description: 'The new path of file or folder. The path should start with "/".'
        },
        // ----------------------------------
        //         file:download
        // ----------------------------------
        {
          displayName: "File Path",
          name: "path",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["download"],
              resource: ["file"]
            }
          },
          placeholder: "/invoices/2019/invoice_1.pdf",
          description: 'The file path of the file to download. Has to contain the full path. The path should start with "/".'
        },
        {
          displayName: "Put Output File in Field",
          name: "binaryPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              operation: ["download"],
              resource: ["file"]
            }
          },
          hint: "The name of the output binary field to put the file in"
        },
        // ----------------------------------
        //         file:upload
        // ----------------------------------
        {
          displayName: "File Path",
          name: "path",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["upload"],
              resource: ["file"]
            }
          },
          placeholder: "/invoices/2019/invoice_1.pdf",
          description: "The absolute file path of the file to upload. Has to contain the full path. The parent folder has to exist. Existing files get overwritten."
        },
        {
          displayName: "Binary File",
          name: "binaryDataUpload",
          type: "boolean",
          default: false,
          required: true,
          displayOptions: {
            show: {
              operation: ["upload"],
              resource: ["file"]
            }
          }
        },
        {
          displayName: "File Content",
          name: "fileContent",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              binaryDataUpload: [false],
              operation: ["upload"],
              resource: ["file"]
            }
          },
          placeholder: "",
          description: "The text content of the file to upload"
        },
        {
          displayName: "Input Binary Field",
          name: "binaryPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              binaryDataUpload: [true],
              operation: ["upload"],
              resource: ["file"]
            }
          },
          placeholder: "",
          hint: "The name of the input binary field containing the file to be uploaded"
        },
        // ----------------------------------
        //         file:share
        // ----------------------------------
        {
          displayName: "File Path",
          name: "path",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["share"],
              resource: ["file", "folder"]
            }
          },
          placeholder: "/invoices/2019/invoice_1.pdf",
          description: 'The file path of the file to share. Has to contain the full path. The path should start with "/".'
        },
        {
          displayName: "Share Type",
          name: "shareType",
          type: "options",
          displayOptions: {
            show: {
              operation: ["share"],
              resource: ["file", "folder"]
            }
          },
          options: [
            {
              name: "Circle",
              value: 7
            },
            {
              name: "Email",
              value: 4
            },
            {
              name: "Group",
              value: 1
            },
            {
              name: "Public Link",
              value: 3
            },
            {
              name: "User",
              value: 0
            }
          ],
          default: 0,
          description: "The share permissions to set"
        },
        {
          displayName: "Circle ID",
          name: "circleId",
          type: "string",
          displayOptions: {
            show: {
              resource: ["file", "folder"],
              operation: ["share"],
              shareType: [7]
            }
          },
          default: "",
          description: "The ID of the circle to share with"
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          displayOptions: {
            show: {
              resource: ["file", "folder"],
              operation: ["share"],
              shareType: [4]
            }
          },
          default: "",
          description: "The Email address to share with"
        },
        {
          displayName: "Group ID",
          name: "groupId",
          type: "string",
          displayOptions: {
            show: {
              resource: ["file", "folder"],
              operation: ["share"],
              shareType: [1]
            }
          },
          default: "",
          description: "The ID of the group to share with"
        },
        {
          displayName: "User",
          name: "user",
          type: "string",
          displayOptions: {
            show: {
              resource: ["file", "folder"],
              operation: ["share"],
              shareType: [0]
            }
          },
          default: "",
          description: "The user to share with"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["file", "folder"],
              operation: ["share"]
            }
          },
          options: [
            {
              displayName: "Password",
              name: "password",
              type: "string",
              typeOptions: { password: true },
              displayOptions: {
                show: {
                  "/resource": ["file", "folder"],
                  "/operation": ["share"],
                  "/shareType": [3]
                }
              },
              default: "",
              description: "Optional search string"
            },
            {
              displayName: "Permissions",
              name: "permissions",
              type: "options",
              options: [
                {
                  name: "All",
                  value: 31
                },
                {
                  name: "Create",
                  value: 4
                },
                {
                  name: "Delete",
                  value: 8
                },
                {
                  name: "Read",
                  value: 1
                },
                {
                  name: "Update",
                  value: 2
                }
              ],
              default: 1,
              description: "The share permissions to set"
            }
          ]
        },
        // ----------------------------------
        //         folder
        // ----------------------------------
        // ----------------------------------
        //         folder:create
        // ----------------------------------
        {
          displayName: "Folder",
          name: "path",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["folder"]
            }
          },
          placeholder: "/invoices/2019",
          description: 'The folder to create. The parent folder has to exist. The path should start with "/".'
        },
        // ----------------------------------
        //         folder:list
        // ----------------------------------
        {
          displayName: "Folder Path",
          name: "path",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              operation: ["list"],
              resource: ["folder"]
            }
          },
          placeholder: "/invoices/2019/",
          description: 'The path of which to list the content. The path should start with "/".'
        },
        // ----------------------------------
        //         user
        // ----------------------------------
        // ----------------------------------
        //         user:create
        // ----------------------------------
        {
          displayName: "Username",
          name: "userId",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["create"]
            }
          },
          placeholder: "john",
          description: "Username the user will have"
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["create"]
            }
          },
          placeholder: "john@email.com",
          description: "The email of the user to invite"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          placeholder: "Add Field",
          default: {},
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["create"]
            }
          },
          options: [
            {
              displayName: "Display Name",
              name: "displayName",
              type: "string",
              default: "",
              description: "The display name of the user to invite"
            }
          ]
        },
        // ----------------------------------
        //         user:get/delete/update
        // ----------------------------------
        {
          displayName: "Username",
          name: "userId",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["delete", "get", "update"]
            }
          },
          placeholder: "john",
          description: "Username the user will have"
        },
        // ----------------------------------
        //         user:getAll
        // ----------------------------------
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["getAll"]
            }
          },
          default: false,
          description: "Whether to return all results or only up to a given limit"
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["getAll"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 100
          },
          default: 50,
          description: "Max number of results to return"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["getAll"]
            }
          },
          options: [
            {
              displayName: "Search",
              name: "search",
              type: "string",
              default: "",
              description: "Optional search string"
            },
            {
              displayName: "Offset",
              name: "offset",
              type: "number",
              default: "",
              description: "Optional offset value"
            }
          ]
        },
        // ----------------------------------
        //         user:update
        // ----------------------------------
        {
          displayName: "Update Fields",
          name: "updateFields",
          type: "fixedCollection",
          typeOptions: {
            multipleValues: false
          },
          placeholder: "Add option",
          default: {},
          displayOptions: {
            show: {
              resource: ["user"],
              operation: ["update"]
            }
          },
          options: [
            {
              displayName: "Fields",
              name: "field",
              values: [
                {
                  displayName: "Key",
                  name: "key",
                  type: "options",
                  default: "email",
                  options: [
                    {
                      name: "Address",
                      value: "address",
                      description: "The new address for the user"
                    },
                    {
                      name: "Display Name",
                      value: "displayname",
                      description: "The new display name for the user"
                    },
                    {
                      name: "Email",
                      value: "email",
                      description: "The new email for the user"
                    },
                    {
                      name: "Password",
                      value: "password",
                      description: "The new password for the user"
                    },
                    {
                      name: "Twitter",
                      value: "twitter",
                      description: "The new twitter handle for the user"
                    },
                    {
                      name: "Website",
                      value: "website",
                      description: "The new website for the user"
                    }
                  ],
                  description: "Key of the updated attribute"
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "string",
                  default: "",
                  description: "Value of the updated attribute"
                }
              ]
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData().slice();
    const returnData = [];
    const authenticationMethod = this.getNodeParameter("authentication", 0);
    let credentials;
    if (authenticationMethod === "accessToken") {
      credentials = await this.getCredentials("nextCloudApi");
    } else {
      credentials = await this.getCredentials("nextCloudOAuth2Api");
    }
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let endpoint = "";
    let requestMethod = "GET";
    let responseData;
    let body = "";
    const headers = {};
    let qs;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "file") {
          if (operation === "download") {
            requestMethod = "GET";
            endpoint = this.getNodeParameter("path", i);
          } else if (operation === "upload") {
            requestMethod = "PUT";
            endpoint = this.getNodeParameter("path", i);
            if (this.getNodeParameter("binaryDataUpload", i) === true) {
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
              this.helpers.assertBinaryData(i, binaryPropertyName);
              body = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
            } else {
              body = this.getNodeParameter("fileContent", i);
            }
          }
        } else if (resource === "folder") {
          if (operation === "create") {
            requestMethod = "MKCOL";
            endpoint = this.getNodeParameter("path", i);
          } else if (operation === "list") {
            requestMethod = "PROPFIND";
            endpoint = this.getNodeParameter("path", i);
          }
        }
        if (["file", "folder"].includes(resource)) {
          if (operation === "copy") {
            requestMethod = "COPY";
            endpoint = this.getNodeParameter("path", i);
            const toPath = this.getNodeParameter("toPath", i);
            headers.Destination = `${credentials.webDavUrl}/${encodeURI(toPath)}`;
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            endpoint = this.getNodeParameter("path", i);
          } else if (operation === "move") {
            requestMethod = "MOVE";
            endpoint = this.getNodeParameter("path", i);
            const toPath = this.getNodeParameter("toPath", i);
            headers.Destination = `${credentials.webDavUrl}/${encodeURI(toPath)}`;
          } else if (operation === "share") {
            requestMethod = "POST";
            endpoint = "ocs/v2.php/apps/files_sharing/api/v1/shares";
            headers["OCS-APIRequest"] = true;
            headers["Content-Type"] = "application/x-www-form-urlencoded";
            const bodyParameters = this.getNodeParameter("options", i);
            bodyParameters.path = this.getNodeParameter("path", i);
            bodyParameters.shareType = this.getNodeParameter("shareType", i);
            if (bodyParameters.shareType === 0) {
              bodyParameters.shareWith = this.getNodeParameter("user", i);
            } else if (bodyParameters.shareType === 7) {
              bodyParameters.shareWith = this.getNodeParameter("circleId", i);
            } else if (bodyParameters.shareType === 4) {
              bodyParameters.shareWith = this.getNodeParameter("email", i);
            } else if (bodyParameters.shareType === 1) {
              bodyParameters.shareWith = this.getNodeParameter("groupId", i);
            }
            body = new import_url.URLSearchParams(bodyParameters).toString();
          }
        } else if (resource === "user") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "ocs/v1.php/cloud/users";
            headers["OCS-APIRequest"] = true;
            headers["Content-Type"] = "application/x-www-form-urlencoded";
            const userid = this.getNodeParameter("userId", i);
            const email = this.getNodeParameter("email", i);
            body = `userid=${userid}&email=${email}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.displayName) {
              body += `&displayName=${additionalFields.displayName}`;
            }
          }
          if (operation === "delete") {
            requestMethod = "DELETE";
            const userid = this.getNodeParameter("userId", i);
            endpoint = `ocs/v1.php/cloud/users/${userid}`;
            headers["OCS-APIRequest"] = true;
            headers["Content-Type"] = "application/x-www-form-urlencoded";
          }
          if (operation === "get") {
            requestMethod = "GET";
            const userid = this.getNodeParameter("userId", i);
            endpoint = `ocs/v1.php/cloud/users/${userid}`;
            headers["OCS-APIRequest"] = true;
            headers["Content-Type"] = "application/x-www-form-urlencoded";
          }
          if (operation === "getAll") {
            requestMethod = "GET";
            const returnAll = this.getNodeParameter("returnAll", i);
            qs = this.getNodeParameter("options", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            endpoint = "ocs/v1.php/cloud/users";
            headers["OCS-APIRequest"] = true;
            headers["Content-Type"] = "application/x-www-form-urlencoded";
          }
          if (operation === "update") {
            requestMethod = "PUT";
            const userid = this.getNodeParameter("userId", i);
            endpoint = `ocs/v1.php/cloud/users/${userid}`;
            body = Object.entries(this.getNodeParameter("updateFields", i).field).map((entry) => {
              const [key, value] = entry;
              return `${key}=${value}`;
            }).join("&");
            headers["OCS-APIRequest"] = true;
            headers["Content-Type"] = "application/x-www-form-urlencoded";
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: i
          });
        }
        let webDavUrl = credentials.webDavUrl;
        if (webDavUrl.slice(-1) === "/") {
          webDavUrl = webDavUrl.slice(0, -1);
        }
        let encoding = void 0;
        if (resource === "file" && operation === "download") {
          encoding = null;
        }
        try {
          responseData = await import_GenericFunctions.nextCloudApiRequest.call(
            this,
            requestMethod,
            endpoint,
            body,
            headers,
            encoding,
            qs
          );
        } catch (error) {
          if (this.continueOnFail()) {
            if (resource === "file" && operation === "download") {
              items[i].json = { error: error.message };
            } else {
              returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
            }
            continue;
          }
          throw error;
        }
        if (resource === "file" && operation === "download") {
          const newItem = {
            json: items[i].json,
            pairedItem: { item: i },
            binary: {}
          };
          if (items[i].binary !== void 0) {
            Object.assign(newItem.binary, items[i].binary);
          }
          items[i] = newItem;
          const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
          items[i].binary[binaryPropertyName] = await this.helpers.prepareBinaryData(
            responseData,
            endpoint
          );
        } else if (["file", "folder"].includes(resource) && operation === "share") {
          const jsonResponseData = await new Promise((resolve, reject) => {
            (0, import_xml2js.parseString)(responseData, { explicitArray: false }, (err, data) => {
              if (err) {
                return reject(err);
              }
              if (data.ocs.meta.status !== "ok") {
                return reject(
                  new import_n8n_workflow.NodeApiError(
                    this.getNode(),
                    data.ocs.meta.message || data.ocs.meta.status
                  )
                );
              }
              resolve(data.ocs.data);
            });
          });
          const executionData = this.helpers.constructExecutionMetaData(
            (0, import_utilities.wrapData)(jsonResponseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (resource === "user") {
          if (operation !== "getAll") {
            const jsonResponseData = await new Promise((resolve, reject) => {
              (0, import_xml2js.parseString)(responseData, { explicitArray: false }, (err, data) => {
                if (err) {
                  return reject(err);
                }
                if (data.ocs.meta.status !== "ok") {
                  return reject(
                    new import_n8n_workflow.NodeApiError(
                      this.getNode(),
                      data.ocs.meta.message || data.ocs.meta.status
                    )
                  );
                }
                if (operation === "delete" || operation === "update") {
                  resolve(data.ocs.meta);
                } else {
                  resolve(data.ocs.data);
                }
              });
            });
            const executionData = this.helpers.constructExecutionMetaData(
              (0, import_utilities.wrapData)(jsonResponseData),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          } else {
            const jsonResponseData = await new Promise((resolve, reject) => {
              (0, import_xml2js.parseString)(responseData, { explicitArray: false }, (err, data) => {
                if (err) {
                  return reject(err);
                }
                if (data.ocs.meta.status !== "ok") {
                  return reject(
                    new import_n8n_workflow.NodeApiError(this.getNode(), data.ocs.meta.message)
                  );
                }
                if (typeof data.ocs.data.users.element === "string") {
                  resolve([data.ocs.data.users.element]);
                } else {
                  resolve(data.ocs.data.users.element);
                }
              });
            });
            jsonResponseData.forEach((value) => {
              returnData.push({ json: { id: value }, pairedItem: { item: i } });
            });
          }
        } else if (resource === "folder" && operation === "list") {
          const jsonResponseData = await new Promise((resolve, reject) => {
            (0, import_xml2js.parseString)(responseData, { explicitArray: false }, (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
          const propNames = {
            "d:getlastmodified": "lastModified",
            "d:getcontentlength": "contentLength",
            "d:getcontenttype": "contentType"
          };
          if (jsonResponseData["d:multistatus"] !== void 0 && jsonResponseData["d:multistatus"] !== null && jsonResponseData["d:multistatus"]["d:response"] !== void 0 && jsonResponseData["d:multistatus"]["d:response"] !== null) {
            let skippedFirst = false;
            if (Array.isArray(jsonResponseData["d:multistatus"]["d:response"])) {
              for (const item of jsonResponseData["d:multistatus"]["d:response"]) {
                if (!skippedFirst) {
                  skippedFirst = true;
                  continue;
                }
                const newItem = {};
                newItem.path = item["d:href"].slice(19);
                let props = {};
                if (Array.isArray(item["d:propstat"])) {
                  props = item["d:propstat"][0]["d:prop"];
                } else {
                  props = item["d:propstat"]["d:prop"];
                }
                for (const propName of Object.keys(propNames)) {
                  if (props[propName] !== void 0) {
                    newItem[propNames[propName]] = props[propName];
                  }
                }
                if (props["d:resourcetype"] === "") {
                  newItem.type = "file";
                } else {
                  newItem.type = "folder";
                }
                newItem.eTag = props["d:getetag"].slice(1, -1);
                returnData.push({ json: newItem, pairedItem: { item: i } });
              }
            }
          }
        } else {
          const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
            itemData: { item: i }
          });
          returnData.push(...executionData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          if (resource === "file" && operation === "download") {
            items[i].json = { error: error.message };
          } else {
            returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
          }
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
  NextCloud
});
//# sourceMappingURL=NextCloud.node.js.map