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
var GoogleDriveTrigger_node_exports = {};
__export(GoogleDriveTrigger_node_exports, {
  GoogleDriveTrigger: () => GoogleDriveTrigger
});
module.exports = __toCommonJS(GoogleDriveTrigger_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./v1/GenericFunctions");
var import_listSearch = require("./v2/methods/listSearch");
var import_constants = require("../constants");
class GoogleDriveTrigger {
  constructor() {
    this.description = {
      displayName: "Google Drive Trigger",
      name: "googleDriveTrigger",
      icon: "file:googleDrive.svg",
      group: ["trigger"],
      version: 1,
      description: "Starts the workflow when Google Drive events occur",
      subtitle: '={{$parameter["event"]}}',
      defaults: {
        name: "Google Drive Trigger"
      },
      credentials: [
        {
          name: "googleApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["serviceAccount"]
            }
          }
        },
        {
          name: "googleDriveOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      polling: true,
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Credential Type",
          name: "authentication",
          type: "options",
          options: [
            {
              // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
              name: "OAuth2 (recommended)",
              value: "oAuth2"
            },
            {
              name: "Service Account",
              value: "serviceAccount"
            }
          ],
          default: "oAuth2"
        },
        {
          displayName: "Trigger On",
          name: "triggerOn",
          type: "options",
          required: true,
          default: "",
          options: [
            {
              name: "Changes to a Specific File",
              value: "specificFile"
            },
            {
              name: "Changes Involving a Specific Folder",
              value: "specificFolder"
            }
            // {
            // 	name: 'Changes To Any File/Folder',
            // 	value: 'anyFileFolder',
            // },
          ]
        },
        {
          displayName: "File",
          name: "fileToWatch",
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          required: true,
          modes: [
            {
              displayName: "File",
              name: "list",
              type: "list",
              placeholder: "Select a file...",
              typeOptions: {
                searchListMethod: "fileSearch",
                searchable: true
              }
            },
            {
              displayName: "Link",
              name: "url",
              type: "string",
              placeholder: "https://drive.google.com/file/d/1wroCSfK-hupQIYf_xzeoUEzOhvfTFH2P/edit",
              extractValue: {
                type: "regex",
                regex: import_constants.GOOGLE_DRIVE_FILE_URL_REGEX
              },
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: import_constants.GOOGLE_DRIVE_FILE_URL_REGEX,
                    errorMessage: "Not a valid Google Drive File URL"
                  }
                }
              ]
            },
            {
              displayName: "ID",
              name: "id",
              type: "string",
              placeholder: "1anGBg0b5re2VtF2bKu201_a-Vnz5BHq9Y4r-yBDAj5A",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "[a-zA-Z0-9\\-_]{2,}",
                    errorMessage: "Not a valid Google Drive File ID"
                  }
                }
              ],
              url: "=https://drive.google.com/file/d/{{$value}}/view"
            }
          ],
          displayOptions: {
            show: {
              triggerOn: ["specificFile"]
            }
          }
        },
        {
          displayName: "Watch For",
          name: "event",
          type: "options",
          displayOptions: {
            show: {
              triggerOn: ["specificFile"]
            }
          },
          required: true,
          default: "fileUpdated",
          options: [
            {
              name: "File Updated",
              value: "fileUpdated"
            }
          ],
          description: "When to trigger this node"
        },
        {
          displayName: "Folder",
          name: "folderToWatch",
          type: "resourceLocator",
          default: { mode: "list", value: "" },
          required: true,
          modes: [
            {
              displayName: "Folder",
              name: "list",
              type: "list",
              placeholder: "Select a folder...",
              typeOptions: {
                searchListMethod: "folderSearch",
                searchable: true
              }
            },
            {
              displayName: "Link",
              name: "url",
              type: "string",
              placeholder: "https://drive.google.com/drive/folders/1Tx9WHbA3wBpPB4C_HcoZDH9WZFWYxAMU",
              extractValue: {
                type: "regex",
                regex: import_constants.GOOGLE_DRIVE_FOLDER_URL_REGEX
              },
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: import_constants.GOOGLE_DRIVE_FOLDER_URL_REGEX,
                    errorMessage: "Not a valid Google Drive Folder URL"
                  }
                }
              ]
            },
            {
              displayName: "ID",
              name: "id",
              type: "string",
              placeholder: "1anGBg0b5re2VtF2bKu201_a-Vnz5BHq9Y4r-yBDAj5A",
              validation: [
                {
                  type: "regex",
                  properties: {
                    regex: "[a-zA-Z0-9\\-_]{2,}",
                    errorMessage: "Not a valid Google Drive Folder ID"
                  }
                }
              ],
              url: "=https://drive.google.com/drive/folders/{{$value}}"
            }
          ],
          displayOptions: {
            show: {
              triggerOn: ["specificFolder"]
            }
          }
        },
        {
          displayName: "Watch For",
          name: "event",
          type: "options",
          displayOptions: {
            show: {
              triggerOn: ["specificFolder"]
            }
          },
          required: true,
          default: "",
          options: [
            {
              name: "File Created",
              value: "fileCreated",
              description: "When a file is created in the watched folder"
            },
            {
              name: "File Updated",
              value: "fileUpdated",
              description: "When a file is updated in the watched folder"
            },
            {
              name: "Folder Created",
              value: "folderCreated",
              description: "When a folder is created in the watched folder"
            },
            {
              name: "Folder Updated",
              value: "folderUpdated",
              description: "When a folder is updated in the watched folder"
            },
            {
              name: "Watch Folder Updated",
              value: "watchFolderUpdated",
              description: "When the watched folder itself is modified"
            }
          ]
        },
        {
          displayName: "Changes within subfolders won't trigger this node",
          name: "asas",
          type: "notice",
          displayOptions: {
            show: {
              triggerOn: ["specificFolder"]
            },
            hide: {
              event: ["watchFolderUpdated"]
            }
          },
          default: ""
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
          displayName: "Drive To Watch",
          name: "driveToWatch",
          type: "options",
          displayOptions: {
            show: {
              triggerOn: ["anyFileFolder"]
            }
          },
          typeOptions: {
            loadOptionsMethod: "getDrives"
          },
          default: "root",
          required: true,
          description: 'The drive to monitor. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
        },
        {
          displayName: "Watch For",
          name: "event",
          type: "options",
          displayOptions: {
            show: {
              triggerOn: ["anyFileFolder"]
            }
          },
          required: true,
          default: "fileCreated",
          options: [
            {
              name: "File Created",
              value: "fileCreated",
              description: "When a file is created in the watched drive"
            },
            {
              name: "File Updated",
              value: "fileUpdated",
              description: "When a file is updated in the watched drive"
            },
            {
              name: "Folder Created",
              value: "folderCreated",
              description: "When a folder is created in the watched drive"
            },
            {
              name: "Folder Updated",
              value: "folderUpdated",
              description: "When a folder is updated in the watched drive"
            }
          ],
          description: "When to trigger this node"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          displayOptions: {
            show: {
              event: ["fileCreated", "fileUpdated"]
            },
            hide: {
              triggerOn: ["specificFile"]
            }
          },
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "File Type",
              name: "fileType",
              type: "options",
              options: [
                {
                  name: "[All]",
                  value: "all"
                },
                {
                  name: "Audio",
                  value: "application/vnd.google-apps.audio"
                },
                {
                  name: "Google Docs",
                  value: "application/vnd.google-apps.document"
                },
                {
                  name: "Google Drawings",
                  value: "application/vnd.google-apps.drawing"
                },
                {
                  name: "Google Slides",
                  value: "application/vnd.google-apps.presentation"
                },
                {
                  name: "Google Spreadsheets",
                  value: "application/vnd.google-apps.spreadsheet"
                },
                {
                  name: "Photos and Images",
                  value: "application/vnd.google-apps.photo"
                },
                {
                  name: "Videos",
                  value: "application/vnd.google-apps.video"
                }
              ],
              default: "all",
              description: "Triggers only when the file is this type"
            }
          ]
        }
      ]
    };
    this.methods = {
      listSearch: {
        fileSearch: import_listSearch.fileSearch,
        folderSearch: import_listSearch.folderSearch
      },
      loadOptions: {
        // Get all the calendars to display them to user so that they can
        // select them easily
        async getDrives() {
          const returnData = [];
          const drives = await import_GenericFunctions.googleApiRequestAllItems.call(
            this,
            "drives",
            "GET",
            "/drive/v3/drives"
          );
          returnData.push({
            name: "Root",
            value: "root"
          });
          for (const drive of drives) {
            returnData.push({
              name: drive.name,
              value: drive.id
            });
          }
          return returnData;
        }
      }
    };
  }
  async poll() {
    const triggerOn = this.getNodeParameter("triggerOn");
    const event = this.getNodeParameter("event");
    const webhookData = this.getWorkflowStaticData("node");
    const options = this.getNodeParameter("options", {});
    const qs = {
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      spaces: "appDataFolder, drive",
      corpora: "allDrives"
    };
    const now = (0, import_moment_timezone.default)().utc().format();
    const startDate = webhookData.lastTimeChecked || now;
    const endDate = now;
    const query = ["trashed = false"];
    if (triggerOn === "specificFolder" && event !== "watchFolderUpdated") {
      const folderToWatch = (0, import_GenericFunctions.extractId)(
        this.getNodeParameter("folderToWatch", "", { extractValue: true })
      );
      query.push(`'${folderToWatch}' in parents`);
    }
    if (event.startsWith("file")) {
      query.push("mimeType != 'application/vnd.google-apps.folder'");
    } else {
      query.push("mimeType = 'application/vnd.google-apps.folder'");
    }
    if (options.fileType && options.fileType !== "all") {
      query.push(`mimeType = '${options.fileType}'`);
    }
    if (this.getMode() !== "manual") {
      if (event.includes("Created")) {
        query.push(`createdTime > '${startDate}'`);
      } else {
        query.push(`modifiedTime > '${startDate}'`);
      }
    }
    qs.q = query.join(" AND ");
    qs.fields = "nextPageToken, files(*)";
    let files;
    if (this.getMode() === "manual") {
      qs.pageSize = 1;
      files = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/drive/v3/files", {}, qs);
      files = files.files;
    } else {
      files = await import_GenericFunctions.googleApiRequestAllItems.call(this, "files", "GET", "/drive/v3/files", {}, qs);
    }
    if (triggerOn === "specificFile" && this.getMode() !== "manual") {
      const fileToWatch = (0, import_GenericFunctions.extractId)(
        this.getNodeParameter("fileToWatch", "", { extractValue: true })
      );
      files = files.filter((file) => file.id === fileToWatch);
    }
    if (triggerOn === "specificFolder" && event === "watchFolderUpdated" && this.getMode() !== "manual") {
      const folderToWatch = (0, import_GenericFunctions.extractId)(
        this.getNodeParameter("folderToWatch", "", { extractValue: true })
      );
      files = files.filter((file) => file.id === folderToWatch);
    }
    webhookData.lastTimeChecked = endDate;
    if (Array.isArray(files) && files.length) {
      return [this.helpers.returnJsonArray(files)];
    }
    if (this.getMode() === "manual") {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: "No data with the current filter could be found"
      });
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleDriveTrigger
});
//# sourceMappingURL=GoogleDriveTrigger.node.js.map