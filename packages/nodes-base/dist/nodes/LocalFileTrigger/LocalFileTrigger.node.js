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
var LocalFileTrigger_node_exports = {};
__export(LocalFileTrigger_node_exports, {
  LocalFileTrigger: () => LocalFileTrigger
});
module.exports = __toCommonJS(LocalFileTrigger_node_exports);
var import_chokidar = require("chokidar");
var import_n8n_workflow = require("n8n-workflow");
class LocalFileTrigger {
  constructor() {
    this.description = {
      displayName: "Local File Trigger",
      name: "localFileTrigger",
      icon: "fa:folder-open",
      iconColor: "black",
      group: ["trigger"],
      version: 1,
      subtitle: '=Path: {{$parameter["path"]}}',
      description: "Triggers a workflow on file system changes",
      eventTriggerDescription: "",
      defaults: {
        name: "Local File Trigger",
        color: "#404040"
      },
      triggerPanel: {
        header: "",
        executionsHelp: {
          inactive: "<b>While building your workflow</b>, click the 'execute step' button, then make a change to your watched file or folder. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Once you're happy with your workflow</b>, <a data-key='activate'>activate</a> it. Then every time a change is detected, the workflow will execute. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor.",
          active: "<b>While building your workflow</b>, click the 'execute step' button, then make a change to your watched file or folder. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Your workflow will also execute automatically</b>, since it's activated. Every time a change is detected, this node will trigger an execution. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor."
        },
        activationHint: "Once you\u2019ve finished building your workflow, <a data-key='activate'>activate</a> it to have it also listen continuously (you just won\u2019t see those executions here)."
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      properties: [
        {
          displayName: "Trigger On",
          name: "triggerOn",
          type: "options",
          options: [
            {
              name: "Changes to a Specific File",
              value: "file"
            },
            {
              name: "Changes Involving a Specific Folder",
              value: "folder"
            }
          ],
          required: true,
          default: ""
        },
        {
          displayName: "File to Watch",
          name: "path",
          type: "string",
          displayOptions: {
            show: {
              triggerOn: ["file"]
            }
          },
          default: "",
          placeholder: "/data/invoices/1.pdf"
        },
        {
          displayName: "Folder to Watch",
          name: "path",
          type: "string",
          displayOptions: {
            show: {
              triggerOn: ["folder"]
            }
          },
          default: "",
          placeholder: "/data/invoices"
        },
        {
          displayName: "Watch for",
          name: "events",
          type: "multiOptions",
          displayOptions: {
            show: {
              triggerOn: ["folder"]
            }
          },
          options: [
            {
              name: "File Added",
              value: "add",
              description: "Triggers whenever a new file was added"
            },
            {
              name: "File Changed",
              value: "change",
              description: "Triggers whenever a file was changed"
            },
            {
              name: "File Deleted",
              value: "unlink",
              description: "Triggers whenever a file was deleted"
            },
            {
              name: "Folder Added",
              value: "addDir",
              description: "Triggers whenever a new folder was added"
            },
            {
              name: "Folder Deleted",
              value: "unlinkDir",
              description: "Triggers whenever a folder was deleted"
            }
          ],
          required: true,
          default: [],
          description: "The events to listen to"
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Await Write Finish",
              name: "awaitWriteFinish",
              type: "boolean",
              default: false,
              description: "Whether to wait until files finished writing to avoid partially read"
            },
            {
              displayName: "Include Linked Files/Folders",
              name: "followSymlinks",
              type: "boolean",
              default: true,
              description: "Whether linked files/folders will also be watched (this includes symlinks, aliases on MacOS and shortcuts on Windows). Otherwise only the links themselves will be monitored)."
            },
            {
              displayName: "Ignore",
              name: "ignored",
              type: "string",
              default: "",
              placeholder: "**/*.txt",
              description: 'Files or paths to ignore. The whole path is tested, not just the filename.\xA0Supports <a href="https://github.com/micromatch/anymatch">Anymatch</a>- syntax.'
            },
            {
              displayName: "Ignore Existing Files/Folders",
              name: "ignoreInitial",
              type: "boolean",
              default: true,
              description: "Whether to ignore existing files/folders to not trigger an event"
            },
            {
              displayName: "Max Folder Depth",
              name: "depth",
              type: "options",
              options: [
                {
                  name: "1 Levels Down",
                  value: 1
                },
                {
                  name: "2 Levels Down",
                  value: 2
                },
                {
                  name: "3 Levels Down",
                  value: 3
                },
                {
                  name: "4 Levels Down",
                  value: 4
                },
                {
                  name: "5 Levels Down",
                  value: 5
                },
                {
                  name: "Top Folder Only",
                  value: 0
                },
                {
                  name: "Unlimited",
                  value: -1
                }
              ],
              default: -1,
              description: "How deep into the folder structure to watch for changes"
            },
            {
              displayName: "Use Polling",
              name: "usePolling",
              type: "boolean",
              default: false,
              description: "Whether to use polling for watching. Typically necessary to successfully watch files over a network."
            }
          ]
        }
      ]
    };
  }
  async trigger() {
    const triggerOn = this.getNodeParameter("triggerOn");
    const path = this.getNodeParameter("path");
    const options = this.getNodeParameter("options", {});
    let events;
    if (triggerOn === "file") {
      events = ["change"];
    } else {
      events = this.getNodeParameter("events", []);
    }
    const watcher = (0, import_chokidar.watch)(path, {
      ignored: options.ignored === "" ? void 0 : options.ignored,
      persistent: true,
      ignoreInitial: options.ignoreInitial === void 0 ? true : options.ignoreInitial,
      followSymlinks: options.followSymlinks === void 0 ? true : options.followSymlinks,
      depth: [-1, void 0].includes(options.depth) ? void 0 : options.depth,
      usePolling: options.usePolling,
      awaitWriteFinish: options.awaitWriteFinish
    });
    const executeTrigger = (event, pathString) => {
      this.emit([this.helpers.returnJsonArray([{ event, path: pathString }])]);
    };
    for (const eventName of events) {
      watcher.on(eventName, (pathString) => executeTrigger(eventName, pathString));
    }
    async function closeFunction() {
      return await watcher.close();
    }
    return {
      closeFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LocalFileTrigger
});
//# sourceMappingURL=LocalFileTrigger.node.js.map