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
var Git_node_exports = {};
__export(Git_node_exports, {
  Git: () => Git
});
module.exports = __toCommonJS(Git_node_exports);
var import_promises = require("fs/promises");
var import_n8n_workflow = require("n8n-workflow");
var import_simple_git = __toESM(require("simple-git"));
var import_url = require("url");
var import_descriptions = require("./descriptions");
class Git {
  constructor() {
    this.description = {
      displayName: "Git",
      name: "git",
      icon: "file:git.svg",
      group: ["transform"],
      version: 1,
      description: "Control git.",
      defaults: {
        name: "Git"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "gitPassword",
          required: true,
          displayOptions: {
            show: {
              authentication: ["gitPassword"]
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
              name: "Authenticate",
              value: "gitPassword"
            },
            {
              name: "None",
              value: "none"
            }
          ],
          displayOptions: {
            show: {
              operation: ["clone", "push"]
            }
          },
          default: "none",
          description: "The way to authenticate"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          default: "log",
          options: [
            {
              name: "Add",
              value: "add",
              description: "Add a file or folder to commit",
              action: "Add a file or folder to commit"
            },
            {
              name: "Add Config",
              value: "addConfig",
              description: "Add configuration property",
              action: "Add configuration property"
            },
            {
              name: "Clone",
              value: "clone",
              description: "Clone a repository",
              action: "Clone a repository"
            },
            {
              name: "Commit",
              value: "commit",
              description: "Commit files or folders to git",
              action: "Commit files or folders to git"
            },
            {
              name: "Fetch",
              value: "fetch",
              description: "Fetch from remote repository",
              action: "Fetch from remote repository"
            },
            {
              name: "List Config",
              value: "listConfig",
              description: "Return current configuration",
              action: "Return current configuration"
            },
            {
              name: "Log",
              value: "log",
              description: "Return git commit history",
              action: "Return git commit history"
            },
            {
              name: "Pull",
              value: "pull",
              description: "Pull from remote repository",
              action: "Pull from remote repository"
            },
            {
              name: "Push",
              value: "push",
              description: "Push to remote repository",
              action: "Push to remote repository"
            },
            {
              name: "Push Tags",
              value: "pushTags",
              description: "Push Tags to remote repository",
              action: "Push tags to remote repository"
            },
            {
              name: "Status",
              value: "status",
              description: "Return status of current repository",
              action: "Return status of current repository"
            },
            {
              name: "Tag",
              value: "tag",
              description: "Create a new tag",
              action: "Create a new tag"
            },
            {
              name: "User Setup",
              value: "userSetup",
              description: "Set the user",
              action: "Set up a user"
            }
          ]
        },
        {
          displayName: "Repository Path",
          name: "repositoryPath",
          type: "string",
          displayOptions: {
            hide: {
              operation: ["clone"]
            }
          },
          default: "",
          placeholder: "/tmp/repository",
          required: true,
          description: "Local path of the git repository to operate on"
        },
        {
          displayName: "New Repository Path",
          name: "repositoryPath",
          type: "string",
          displayOptions: {
            show: {
              operation: ["clone"]
            }
          },
          default: "",
          placeholder: "/tmp/repository",
          required: true,
          description: "Local path to which the git repository should be cloned into"
        },
        ...import_descriptions.addFields,
        ...import_descriptions.addConfigFields,
        ...import_descriptions.cloneFields,
        ...import_descriptions.commitFields,
        ...import_descriptions.logFields,
        ...import_descriptions.pushFields,
        ...import_descriptions.tagFields
        // ...userSetupFields,
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const prepareRepository = async (repositoryPath) => {
      const authentication = this.getNodeParameter("authentication", 0);
      if (authentication === "gitPassword") {
        const gitCredentials = await this.getCredentials("gitPassword");
        const url = new import_url.URL(repositoryPath);
        url.username = gitCredentials.username;
        url.password = gitCredentials.password;
        return url.toString();
      }
      return repositoryPath;
    };
    const operation = this.getNodeParameter("operation", 0);
    const returnItems = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const repositoryPath = this.getNodeParameter("repositoryPath", itemIndex, "");
        const options = this.getNodeParameter("options", itemIndex, {});
        if (operation === "clone") {
          try {
            await (0, import_promises.access)(repositoryPath);
          } catch (error) {
            await (0, import_promises.mkdir)(repositoryPath);
          }
        }
        const gitOptions = {
          baseDir: repositoryPath
        };
        const git = (0, import_simple_git.default)(gitOptions).env("GIT_TERMINAL_PROMPT", "0");
        if (operation === "add") {
          const pathsToAdd = this.getNodeParameter("pathsToAdd", itemIndex, "");
          await git.add(pathsToAdd.split(","));
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else if (operation === "addConfig") {
          const key = this.getNodeParameter("key", itemIndex, "");
          const value = this.getNodeParameter("value", itemIndex, "");
          let append = false;
          if (options.mode === "append") {
            append = true;
          }
          await git.addConfig(key, value, append);
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else if (operation === "clone") {
          let sourceRepository = this.getNodeParameter("sourceRepository", itemIndex, "");
          sourceRepository = await prepareRepository(sourceRepository);
          await git.clone(sourceRepository, ".");
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else if (operation === "commit") {
          const message = this.getNodeParameter("message", itemIndex, "");
          let pathsToAdd = void 0;
          if (options.files !== void 0) {
            pathsToAdd = options.pathsToAdd.split(",");
          }
          await git.commit(message, pathsToAdd);
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else if (operation === "fetch") {
          await git.fetch();
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else if (operation === "log") {
          const logOptions = {};
          const returnAll = this.getNodeParameter("returnAll", itemIndex, false);
          if (!returnAll) {
            logOptions.maxCount = this.getNodeParameter("limit", itemIndex, 100);
          }
          if (options.file) {
            logOptions.file = options.file;
          }
          const log = await git.log(logOptions);
          returnItems.push(
            ...this.helpers.returnJsonArray(log.all).map((item) => {
              return {
                ...item,
                pairedItem: { item: itemIndex }
              };
            })
          );
        } else if (operation === "pull") {
          await git.pull();
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else if (operation === "push") {
          if (options.repository) {
            const targetRepository = await prepareRepository(options.targetRepository);
            await git.push(targetRepository);
          } else {
            const authentication = this.getNodeParameter("authentication", 0);
            if (authentication === "gitPassword") {
              const config = await git.listConfig();
              let targetRepository;
              for (const fileName of Object.keys(config.values)) {
                if (config.values[fileName]["remote.origin.url"]) {
                  targetRepository = config.values[fileName]["remote.origin.url"];
                  break;
                }
              }
              targetRepository = await prepareRepository(targetRepository);
              await git.push(targetRepository);
            } else {
              await git.push();
            }
          }
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else if (operation === "pushTags") {
          await git.pushTags();
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        } else if (operation === "listConfig") {
          const config = await git.listConfig();
          const data = [];
          for (const fileName of Object.keys(config.values)) {
            data.push({
              _file: fileName,
              ...config.values[fileName]
            });
          }
          returnItems.push(
            ...this.helpers.returnJsonArray(data).map((item) => {
              return {
                ...item,
                pairedItem: { item: itemIndex }
              };
            })
          );
        } else if (operation === "status") {
          const status = await git.status();
          returnItems.push(
            ...this.helpers.returnJsonArray([status]).map((item) => {
              return {
                ...item,
                pairedItem: { item: itemIndex }
              };
            })
          );
        } else if (operation === "tag") {
          const name = this.getNodeParameter("name", itemIndex, "");
          await git.addTag(name);
          returnItems.push({
            json: {
              success: true
            },
            pairedItem: {
              item: itemIndex
            }
          });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnItems.push({
            json: {
              error: error.toString()
            },
            pairedItem: {
              item: itemIndex
            }
          });
          continue;
        }
        throw error;
      }
    }
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Git
});
//# sourceMappingURL=Git.node.js.map