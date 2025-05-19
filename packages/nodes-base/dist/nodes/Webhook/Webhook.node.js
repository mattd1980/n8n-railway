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
var Webhook_node_exports = {};
__export(Webhook_node_exports, {
  Webhook: () => Webhook
});
module.exports = __toCommonJS(Webhook_node_exports);
var import_fs = require("fs");
var import_promises = require("fs/promises");
var import_isbot = __toESM(require("isbot"));
var import_n8n_workflow = require("n8n-workflow");
var import_promises2 = require("stream/promises");
var import_tmp_promise = require("tmp-promise");
var import_uuid = require("uuid");
var import_description = require("./description");
var import_error = require("./error");
var import_utils = require("./utils");
class Webhook extends import_n8n_workflow.Node {
  constructor() {
    super(...arguments);
    this.authPropertyName = "authentication";
    this.description = {
      displayName: "Webhook",
      icon: { light: "file:webhook.svg", dark: "file:webhook.dark.svg" },
      name: "webhook",
      group: ["trigger"],
      version: [1, 1.1, 2],
      description: "Starts the workflow when a webhook is called",
      eventTriggerDescription: "Waiting for you to call the Test URL",
      activationMessage: "You can now make calls to your production webhook URL.",
      defaults: {
        name: "Webhook"
      },
      supportsCORS: true,
      triggerPanel: {
        header: "",
        executionsHelp: {
          inactive: `Webhooks have two modes: test and production. <br /> <br /> <b>Use test mode while you build your workflow</b>. Click the 'listen' button, then make a request to the test URL. The executions will show up in the editor.<br /> <br /> <b>Use production mode to run your workflow automatically</b>. <a data-key="activate">Activate</a> the workflow, then make requests to the production URL. These executions will show up in the executions list, but not in the editor.`,
          active: `Webhooks have two modes: test and production. <br /> <br /> <b>Use test mode while you build your workflow</b>. Click the 'listen' button, then make a request to the test URL. The executions will show up in the editor.<br /> <br /> <b>Use production mode to run your workflow automatically</b>. Since the workflow is activated, you can make requests to the production URL. These executions will show up in the <a data-key="executions">executions list</a>, but not in the editor.`
        },
        activationHint: "Once you've finished building your workflow, run it without having to click this button by using the production webhook URL."
      },
      inputs: [],
      outputs: `={{(${import_utils.configuredOutputs})($parameter)}}`,
      credentials: (0, import_description.credentialsProperty)(this.authPropertyName),
      webhooks: [import_description.defaultWebhookDescription],
      properties: [
        {
          displayName: "Allow Multiple HTTP Methods",
          name: "multipleMethods",
          type: "boolean",
          default: false,
          isNodeSetting: true,
          description: "Whether to allow the webhook to listen for multiple HTTP methods"
        },
        {
          ...import_description.httpMethodsProperty,
          displayOptions: {
            show: {
              multipleMethods: [false]
            }
          }
        },
        {
          displayName: "HTTP Methods",
          name: "httpMethod",
          type: "multiOptions",
          options: [
            {
              name: "DELETE",
              value: "DELETE"
            },
            {
              name: "GET",
              value: "GET"
            },
            {
              name: "HEAD",
              value: "HEAD"
            },
            {
              name: "PATCH",
              value: "PATCH"
            },
            {
              name: "POST",
              value: "POST"
            },
            {
              name: "PUT",
              value: "PUT"
            }
          ],
          default: ["GET", "POST"],
          description: "The HTTP methods to listen to",
          displayOptions: {
            show: {
              multipleMethods: [true]
            }
          }
        },
        {
          displayName: "Path",
          name: "path",
          type: "string",
          default: "",
          placeholder: "webhook",
          required: true,
          description: "The path to listen to, dynamic values could be specified by using ':', e.g. 'your-path/:dynamic-value'. If dynamic values are set 'webhookId' would be prepended to path."
        },
        (0, import_description.authenticationProperty)(this.authPropertyName),
        import_description.responseModeProperty,
        {
          displayName: `Insert a 'Respond to Webhook' node to control when and how you respond. <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/" target="_blank">More details</a>`,
          name: "webhookNotice",
          type: "notice",
          displayOptions: {
            show: {
              responseMode: ["responseNode"]
            }
          },
          default: ""
        },
        {
          ...import_description.responseCodeProperty,
          displayOptions: {
            show: {
              "@version": [1, 1.1]
            },
            hide: {
              responseMode: ["responseNode"]
            }
          }
        },
        import_description.responseDataProperty,
        import_description.responseBinaryPropertyNameProperty,
        {
          ...import_description.optionsProperty,
          options: [...import_description.optionsProperty.options, import_description.responseCodeOption].sort(
            (a, b) => {
              const nameA = a.displayName.toUpperCase();
              const nameB = b.displayName.toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            }
          )
        }
      ]
    };
  }
  async webhook(context) {
    const { typeVersion: nodeVersion, type: nodeType } = context.getNode();
    if (nodeVersion >= 2 && nodeType === "n8n-nodes-base.webhook") {
      (0, import_utils.checkResponseModeConfiguration)(context);
    }
    const options = context.getNodeParameter("options", {});
    const req = context.getRequestObject();
    const resp = context.getResponseObject();
    const requestMethod = context.getRequestObject().method;
    if (!(0, import_utils.isIpWhitelisted)(options.ipWhitelist, req.ips, req.ip)) {
      resp.writeHead(403);
      resp.end("IP is not whitelisted to access the webhook!");
      return { noWebhookResponse: true };
    }
    let validationData;
    try {
      if (options.ignoreBots && (0, import_isbot.default)(req.headers["user-agent"]))
        throw new import_error.WebhookAuthorizationError(403);
      validationData = await this.validateAuth(context);
    } catch (error) {
      if (error instanceof import_error.WebhookAuthorizationError) {
        resp.writeHead(error.responseCode, { "WWW-Authenticate": 'Basic realm="Webhook"' });
        resp.end(error.message);
        return { noWebhookResponse: true };
      }
      throw error;
    }
    const prepareOutput = (0, import_utils.setupOutputConnection)(context, requestMethod, {
      jwtPayload: validationData
    });
    if (options.binaryData) {
      return await this.handleBinaryData(context, prepareOutput);
    }
    if (req.contentType === "multipart/form-data") {
      return await this.handleFormData(context, prepareOutput);
    }
    if (nodeVersion > 1 && !req.body && !options.rawBody) {
      try {
        return await this.handleBinaryData(context, prepareOutput);
      } catch (error) {
      }
    }
    if (options.rawBody && !req.rawBody) {
      await req.readRawBody();
    }
    const response = {
      json: {
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body
      },
      binary: options.rawBody ? {
        data: {
          data: (req.rawBody ?? "").toString(import_n8n_workflow.BINARY_ENCODING),
          mimeType: req.contentType ?? "application/json"
        }
      } : void 0
    };
    return {
      webhookResponse: options.responseData,
      workflowData: prepareOutput(response)
    };
  }
  async validateAuth(context) {
    return await (0, import_utils.validateWebhookAuthentication)(context, this.authPropertyName);
  }
  async handleFormData(context, prepareOutput) {
    const req = context.getRequestObject();
    const options = context.getNodeParameter("options", {});
    const { data, files } = req.body;
    const returnItem = {
      json: {
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: data
      }
    };
    if (files && Object.keys(files).length) {
      returnItem.binary = {};
    }
    let count = 0;
    for (const key of Object.keys(files)) {
      const processFiles = [];
      let multiFile = false;
      if (Array.isArray(files[key])) {
        processFiles.push(...files[key]);
        multiFile = true;
      } else {
        processFiles.push(files[key]);
      }
      let fileCount = 0;
      for (const file of processFiles) {
        let binaryPropertyName = key;
        if (binaryPropertyName.endsWith("[]")) {
          binaryPropertyName = binaryPropertyName.slice(0, -2);
        }
        if (multiFile) {
          binaryPropertyName += fileCount++;
        }
        if (options.binaryPropertyName) {
          binaryPropertyName = `${options.binaryPropertyName}${count}`;
        }
        returnItem.binary[binaryPropertyName] = await context.nodeHelpers.copyBinaryFile(
          file.filepath,
          file.originalFilename ?? file.newFilename,
          file.mimetype
        );
        count += 1;
      }
    }
    return { workflowData: prepareOutput(returnItem) };
  }
  async handleBinaryData(context, prepareOutput) {
    const req = context.getRequestObject();
    const options = context.getNodeParameter("options", {});
    const binaryFile = await (0, import_tmp_promise.file)({ prefix: "n8n-webhook-" });
    try {
      await (0, import_promises2.pipeline)(req, (0, import_fs.createWriteStream)(binaryFile.path));
      const returnItem = {
        json: {
          headers: req.headers,
          params: req.params,
          query: req.query,
          body: {}
        }
      };
      const stats = await (0, import_promises.stat)(binaryFile.path);
      if (stats.size) {
        const binaryPropertyName = options.binaryPropertyName ?? "data";
        const fileName = req.contentDisposition?.filename ?? (0, import_uuid.v4)();
        const binaryData = await context.nodeHelpers.copyBinaryFile(
          binaryFile.path,
          fileName,
          req.contentType ?? "application/octet-stream"
        );
        returnItem.binary = { [binaryPropertyName]: binaryData };
      }
      return { workflowData: prepareOutput(returnItem) };
    } catch (error) {
      throw new import_n8n_workflow.NodeOperationError(context.getNode(), error);
    } finally {
      await binaryFile.cleanup();
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Webhook
});
//# sourceMappingURL=Webhook.node.js.map