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
var Dropbox_node_exports = {};
__export(Dropbox_node_exports, {
  Dropbox: () => Dropbox
});
module.exports = __toCommonJS(Dropbox_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Dropbox {
  constructor() {
    this.description = {
      displayName: "Dropbox",
      name: "dropbox",
      icon: "file:dropbox.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Access data on Dropbox",
      defaults: {
        name: "Dropbox"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "dropboxApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "dropboxOAuth2Api",
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
          default: "accessToken",
          description: "Means of authenticating with the service"
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
              name: "Search",
              value: "search"
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
              description: "Return the files and folders in a given folder",
              action: "List a folder"
            },
            {
              name: "Move",
              value: "move",
              description: "Move a folder",
              action: "Move a folder"
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
              resource: ["search"]
            }
          },
          options: [
            {
              name: "Query",
              value: "query",
              action: "Query"
            }
          ],
          default: "query"
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
          description: "The path of file or folder to copy"
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
          description: "The destination path of file or folder"
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
          description: "The path to delete. Can be a single file or a whole folder."
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
          description: "The path of file or folder to move"
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
          description: "The new path of file or folder"
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
          description: "The file path of the file to download. Has to contain the full path."
        },
        {
          displayName: "Put Output File in Field",
          name: "binaryPropertyName",
          type: "string",
          required: true,
          default: "data",
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
          description: "The file path of the file to upload. Has to contain the full path. The parent folder has to exist. Existing files get overwritten."
        },
        {
          displayName: "Binary File",
          name: "binaryData",
          type: "boolean",
          default: false,
          displayOptions: {
            show: {
              operation: ["upload"],
              resource: ["file"]
            }
          },
          description: "Whether the data to upload should be taken from binary field"
        },
        {
          displayName: "File Content",
          name: "fileContent",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              operation: ["upload"],
              resource: ["file"],
              binaryData: [false]
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
              operation: ["upload"],
              resource: ["file"],
              binaryData: [true]
            }
          },
          placeholder: "",
          hint: "The name of the input binary field containing the file to be uploaded"
        },
        // ----------------------------------
        //         search:query
        // ----------------------------------
        {
          displayName: "Query",
          name: "query",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["query"],
              resource: ["search"]
            }
          },
          description: "The string to search for. May match across multiple fields based on the request arguments."
        },
        {
          displayName: "File Status",
          name: "fileStatus",
          type: "options",
          options: [
            {
              name: "Active",
              value: "active"
            },
            {
              name: "Deleted",
              value: "deleted"
            }
          ],
          default: "active",
          displayOptions: {
            show: {
              operation: ["query"],
              resource: ["search"]
            }
          },
          description: "The string to search for. May match across multiple fields based on the request arguments."
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["query"],
              resource: ["search"]
            }
          },
          default: false,
          description: "Whether to return all results or only up to a given limit"
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          displayOptions: {
            show: {
              resource: ["search"],
              operation: ["query"],
              returnAll: [false]
            }
          },
          default: 100,
          description: "Max number of results to return"
        },
        {
          displayName: "Simplify",
          name: "simple",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["query"],
              resource: ["search"]
            }
          },
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data"
        },
        {
          displayName: "Filters",
          name: "filters",
          type: "collection",
          placeholder: "Add Filter",
          default: {},
          displayOptions: {
            show: {
              resource: ["search"],
              operation: ["query"]
            }
          },
          options: [
            {
              displayName: "File Categories",
              name: "file_categories",
              type: "multiOptions",
              options: [
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Audio (mp3, qav, mid, etc.)",
                  value: "audio"
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Document (doc, docx, txt, etc.)",
                  value: "document"
                },
                {
                  name: "Dropbox Paper",
                  value: "paper"
                },
                {
                  name: "Folder",
                  value: "folder"
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Image (jpg, png, gif, etc.)",
                  value: "image"
                },
                {
                  name: "Other",
                  value: "other"
                },
                {
                  name: "PDF",
                  value: "pdf"
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Presentation (ppt, pptx, key, etc.)",
                  value: "presentation"
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Spreadsheet (xlsx, xls, csv, etc.)",
                  value: "spreadsheet"
                },
                {
                  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                  name: "Video (avi, wmv, mp4, etc.)",
                  value: "video"
                }
              ],
              default: []
            },
            {
              displayName: "File Extensions",
              name: "file_extensions",
              type: "string",
              default: "",
              description: "Multiple file extensions can be set separated by comma. Example: jpg,pdf."
            },
            {
              displayName: "Folder",
              name: "path",
              type: "string",
              default: "",
              description: "If this field is not specified, this module searches the entire Dropbox"
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
          description: "The folder to create. The parent folder has to exist."
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
          description: "The path of which to list the content"
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              operation: ["list"],
              resource: ["folder"]
            }
          },
          default: false,
          description: "Whether to return all results or only up to a given limit"
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          typeOptions: {
            minValue: 1
          },
          displayOptions: {
            show: {
              resource: ["folder"],
              operation: ["list"],
              returnAll: [false]
            }
          },
          default: 100,
          description: "Max number of results to return"
        },
        {
          displayName: "Filters",
          name: "filters",
          type: "collection",
          placeholder: "Add Filter",
          default: {},
          displayOptions: {
            show: {
              resource: ["folder"],
              operation: ["list"]
            }
          },
          options: [
            {
              displayName: "Include Deleted",
              name: "include_deleted",
              type: "boolean",
              default: false,
              description: "Whether the results will include entries for files and folders that used to exist but were deleted. The default for this field is False."
            },
            {
              displayName: "Include Shared Members",
              name: "include_has_explicit_shared_members",
              type: "boolean",
              default: false,
              description: "Whether the results will include a flag for each file indicating whether or not that file has any explicit members. The default for this field is False."
            },
            {
              displayName: "Include Mounted Folders",
              name: "include_mounted_folders",
              type: "boolean",
              default: true,
              description: "Whether the results will include entries under mounted folders which includes app folder, shared folder and team folder. The default for this field is True."
            },
            {
              displayName: "Include Non Downloadable Files",
              name: "include_non_downloadable_files",
              type: "boolean",
              default: true,
              description: "Whether to include files that are not downloadable, i.e. Google Docs. The default for this field is True."
            },
            {
              displayName: "Recursive",
              name: "recursive",
              type: "boolean",
              default: false,
              description: "Whether the list folder operation will be applied recursively to all subfolders and the response will contain contents of all subfolders. The default for this field is False."
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let endpoint = "";
    let requestMethod = "GET";
    let returnAll = false;
    let property = "";
    let body;
    let options;
    const query = {};
    let headers = {};
    let simple = false;
    const { accessType } = await import_GenericFunctions.getCredentials.call(this);
    if (accessType === "full") {
      const {
        root_info: { root_namespace_id }
      } = await import_GenericFunctions.getRootDirectory.call(this);
      headers = {
        "dropbox-api-path-root": JSON.stringify({
          ".tag": "root",
          root: root_namespace_id
        })
      };
    }
    for (let i = 0; i < items.length; i++) {
      try {
        body = {};
        if (resource === "file") {
          if (operation === "download") {
            requestMethod = "POST";
            query.arg = JSON.stringify({
              path: this.getNodeParameter("path", i)
            });
            endpoint = "https://content.dropboxapi.com/2/files/download";
          } else if (operation === "upload") {
            requestMethod = "POST";
            headers["Content-Type"] = "application/octet-stream";
            query.arg = JSON.stringify({
              mode: "overwrite",
              path: this.getNodeParameter("path", i)
            });
            endpoint = "https://content.dropboxapi.com/2/files/upload";
            options = { json: false };
            if (this.getNodeParameter("binaryData", i)) {
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
              this.helpers.assertBinaryData(i, binaryPropertyName);
              body = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
            } else {
              body = Buffer.from(this.getNodeParameter("fileContent", i), "utf8");
            }
          }
        } else if (resource === "folder") {
          if (operation === "create") {
            requestMethod = "POST";
            body = {
              path: this.getNodeParameter("path", i)
            };
            endpoint = "https://api.dropboxapi.com/2/files/create_folder_v2";
          } else if (operation === "list") {
            returnAll = this.getNodeParameter("returnAll", 0);
            const filters = this.getNodeParameter("filters", i);
            property = "entries";
            requestMethod = "POST";
            body = {
              path: this.getNodeParameter("path", i),
              limit: 1e3
            };
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", 0);
              body.limit = limit;
            }
            Object.assign(body, filters);
            endpoint = "https://api.dropboxapi.com/2/files/list_folder";
          }
        } else if (resource === "search") {
          if (operation === "query") {
            returnAll = this.getNodeParameter("returnAll", 0);
            simple = this.getNodeParameter("simple", 0);
            const filters = this.getNodeParameter("filters", i);
            property = "matches";
            requestMethod = "POST";
            body = {
              query: this.getNodeParameter("query", i),
              options: {
                filename_only: true
              }
            };
            if (filters.file_extensions) {
              filters.file_extensions = filters.file_extensions.split(",");
            }
            Object.assign(body.options, filters);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              Object.assign(body.options, { max_results: limit });
            }
            endpoint = "https://api.dropboxapi.com/2/files/search_v2";
          }
        }
        if (["file", "folder", "search"].includes(resource)) {
          if (operation === "copy") {
            requestMethod = "POST";
            body = {
              from_path: this.getNodeParameter("path", i),
              to_path: this.getNodeParameter("toPath", i)
            };
            endpoint = "https://api.dropboxapi.com/2/files/copy_v2";
          } else if (operation === "delete") {
            requestMethod = "POST";
            body = {
              path: this.getNodeParameter("path", i)
            };
            endpoint = "https://api.dropboxapi.com/2/files/delete_v2";
          } else if (operation === "move") {
            requestMethod = "POST";
            body = {
              from_path: this.getNodeParameter("path", i),
              to_path: this.getNodeParameter("toPath", i)
            };
            endpoint = "https://api.dropboxapi.com/2/files/move_v2";
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: i
          });
        }
        if (resource === "file" && operation === "download") {
          options = { encoding: null };
        }
        let responseData;
        if (returnAll) {
          responseData = await import_GenericFunctions.dropboxpiRequestAllItems.call(
            this,
            property,
            requestMethod,
            endpoint,
            body,
            query,
            headers
          );
        } else {
          responseData = await import_GenericFunctions.dropboxApiRequest.call(
            this,
            requestMethod,
            endpoint,
            body,
            query,
            headers,
            options
          );
        }
        if (resource === "file" && operation === "upload") {
          const data = JSON.parse(responseData);
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(data),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else if (resource === "file" && operation === "download") {
          const newItem = {
            json: items[i].json,
            binary: {},
            pairedItem: { item: i }
          };
          if (items[i].binary !== void 0) {
            Object.assign(newItem.binary, items[i].binary);
          }
          items[i] = newItem;
          const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", i);
          const filePathDownload = this.getNodeParameter("path", i);
          items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
            Buffer.from(responseData),
            filePathDownload
          );
        } else if (resource === "folder" && operation === "list") {
          const propNames = {
            id: "id",
            name: "name",
            client_modified: "lastModifiedClient",
            server_modified: "lastModifiedServer",
            rev: "rev",
            size: "contentSize",
            ".tag": "type",
            content_hash: "contentHash",
            path_lower: "pathLower",
            path_display: "pathDisplay",
            has_explicit_shared_members: "hasExplicitSharedMembers",
            is_downloadable: "isDownloadable"
          };
          if (!returnAll) {
            responseData = responseData.entries;
          }
          for (const item of responseData) {
            const newItem = {};
            for (const propName of Object.keys(propNames)) {
              if (item[propName] !== void 0) {
                newItem[propNames[propName]] = item[propName];
              }
            }
            const executionData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray(newItem),
              { itemData: { item: i } }
            );
            returnData.push(...executionData);
          }
        } else if (resource === "search" && operation === "query") {
          let data = responseData;
          if (returnAll) {
            data = simple ? (0, import_GenericFunctions.simplify)(responseData) : responseData;
          } else {
            data = simple ? (0, import_GenericFunctions.simplify)(responseData[property]) : responseData[property];
          }
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(data),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        } else {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          if (resource === "file" && operation === "download") {
            items[i].json = { error: error.message };
          } else {
            returnData.push({ json: { error: error.message } });
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
  Dropbox
});
//# sourceMappingURL=Dropbox.node.js.map