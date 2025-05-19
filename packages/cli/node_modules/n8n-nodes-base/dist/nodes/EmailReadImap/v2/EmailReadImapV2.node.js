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
var EmailReadImapV2_node_exports = {};
__export(EmailReadImapV2_node_exports, {
  EmailReadImapV2: () => EmailReadImapV2
});
module.exports = __toCommonJS(EmailReadImapV2_node_exports);
var import_imap = require("@n8n/imap");
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_n8n_workflow = require("n8n-workflow");
var import_rfc2047 = __toESM(require("rfc2047"));
var import_Imap = require("../../../credentials/Imap.credentials");
var import_utils = require("./utils");
const versionDescription = {
  displayName: "Email Trigger (IMAP)",
  name: "emailReadImap",
  icon: "fa:inbox",
  iconColor: "green",
  group: ["trigger"],
  version: 2,
  description: "Triggers the workflow when a new email is received",
  eventTriggerDescription: "Waiting for you to receive an email",
  defaults: {
    name: "Email Trigger (IMAP)",
    color: "#44AA22"
  },
  triggerPanel: {
    header: "",
    executionsHelp: {
      inactive: "<b>While building your workflow</b>, click the 'execute step' button, then send an email to make an event happen. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Once you're happy with your workflow</b>, <a data-key='activate'>activate</a> it. Then every time an email is received, the workflow will execute. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor.",
      active: "<b>While building your workflow</b>, click the 'execute step' button, then send an email to make an event happen. This will trigger an execution, which will show up in this editor.<br /> <br /><b>Your workflow will also execute automatically</b>, since it's activated. Every time an email is received, this node will trigger an execution. These executions will show up in the <a data-key='executions'>executions list</a>, but not in the editor."
    },
    activationHint: "Once you\u2019ve finished building your workflow, <a data-key='activate'>activate</a> it to have it also listen continuously (you just won\u2019t see those executions here)."
  },
  usableAsTool: true,
  inputs: [],
  outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
  credentials: [
    {
      name: "imap",
      required: true,
      testedBy: "imapConnectionTest"
    }
  ],
  properties: [
    {
      displayName: "Mailbox Name",
      name: "mailbox",
      type: "string",
      default: "INBOX"
    },
    {
      displayName: "Action",
      name: "postProcessAction",
      type: "options",
      options: [
        {
          name: "Mark as Read",
          value: "read"
        },
        {
          name: "Nothing",
          value: "nothing"
        }
      ],
      default: "read",
      description: 'What to do after the email has been received. If "nothing" gets selected it will be processed multiple times.'
    },
    {
      displayName: "Download Attachments",
      name: "downloadAttachments",
      type: "boolean",
      default: false,
      displayOptions: {
        show: {
          format: ["simple"]
        }
      },
      description: "Whether attachments of emails should be downloaded. Only set if needed as it increases processing."
    },
    {
      displayName: "Format",
      name: "format",
      type: "options",
      options: [
        {
          name: "RAW",
          value: "raw",
          description: "Returns the full email message data with body content in the raw field as a base64url encoded string; the payload field is not used"
        },
        {
          name: "Resolved",
          value: "resolved",
          description: "Returns the full email with all data resolved and attachments saved as binary data"
        },
        {
          name: "Simple",
          value: "simple",
          description: "Returns the full email; do not use if you wish to gather inline attachments"
        }
      ],
      default: "simple",
      description: "The format to return the message in"
    },
    {
      displayName: "Property Prefix Name",
      name: "dataPropertyAttachmentsPrefixName",
      type: "string",
      default: "attachment_",
      displayOptions: {
        show: {
          format: ["resolved"]
        }
      },
      description: 'Prefix for name of the binary property to which to write the attachments. An index starting with 0 will be added. So if name is "attachment_" the first attachment is saved to "attachment_0"'
    },
    {
      displayName: "Property Prefix Name",
      name: "dataPropertyAttachmentsPrefixName",
      type: "string",
      default: "attachment_",
      displayOptions: {
        show: {
          format: ["simple"],
          downloadAttachments: [true]
        }
      },
      description: 'Prefix for name of the binary property to which to write the attachments. An index starting with 0 will be added. So if name is "attachment_" the first attachment is saved to "attachment_0"'
    },
    {
      displayName: "Options",
      name: "options",
      type: "collection",
      placeholder: "Add option",
      default: {},
      options: [
        {
          displayName: "Custom Email Rules",
          name: "customEmailConfig",
          type: "string",
          default: '["UNSEEN"]',
          description: `Custom email fetching rules. See <a href="https://github.com/mscdex/node-imap">node-imap</a>'s search function for more details.`
        },
        {
          displayName: "Force Reconnect Every Minutes",
          name: "forceReconnect",
          type: "number",
          default: 60,
          description: "Sets an interval (in minutes) to force a reconnection"
        }
      ]
    }
  ]
};
class EmailReadImapV2 {
  constructor(baseDescription) {
    this.methods = {
      credentialTest: {
        async imapConnectionTest(credential) {
          if ((0, import_Imap.isCredentialsDataImap)(credential.data)) {
            const credentials = credential.data;
            try {
              const config = {
                imap: {
                  user: credentials.user,
                  password: credentials.password,
                  host: credentials.host.trim(),
                  port: credentials.port,
                  tls: credentials.secure,
                  authTimeout: 2e4
                }
              };
              const tlsOptions = {};
              if (credentials.allowUnauthorizedCerts) {
                tlsOptions.rejectUnauthorized = false;
              }
              if (credentials.secure) {
                tlsOptions.servername = credentials.host.trim();
              }
              if (!(0, import_isEmpty.default)(tlsOptions)) {
                config.imap.tlsOptions = tlsOptions;
              }
              const connection = await (0, import_imap.connect)(config);
              await connection.getBoxes();
              connection.end();
            } catch (error) {
              return {
                status: "Error",
                message: error.message
              };
            }
            return {
              status: "OK",
              message: "Connection successful!"
            };
          } else {
            return {
              status: "Error",
              message: "Credentials are no IMAP credentials."
            };
          }
        }
      }
    };
    this.description = {
      ...baseDescription,
      ...versionDescription
    };
  }
  async trigger() {
    const credentialsObject = await this.getCredentials("imap");
    const credentials = (0, import_Imap.isCredentialsDataImap)(credentialsObject) ? credentialsObject : void 0;
    if (!credentials) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Credentials are not valid for imap node.");
    }
    const mailbox = this.getNodeParameter("mailbox");
    const postProcessAction = this.getNodeParameter("postProcessAction");
    const options = this.getNodeParameter("options", {});
    const staticData = this.getWorkflowStaticData("node");
    this.logger.debug('Loaded static data for node "EmailReadImap"', { staticData });
    let connection;
    let closeFunctionWasCalled = false;
    let isCurrentlyReconnecting = false;
    const getText = async (parts, message, subtype) => {
      if (!message.attributes.struct) {
        return "";
      }
      const textParts = parts.filter((part2) => {
        return part2.type.toUpperCase() === "TEXT" && part2.subtype.toUpperCase() === subtype.toUpperCase();
      });
      const part = textParts[0];
      if (!part) {
        return "";
      }
      try {
        const partData = await connection.getPartData(message, part);
        return partData.toString();
      } catch {
        return "";
      }
    };
    const getAttachment = async (imapConnection, parts, message) => {
      if (!message.attributes.struct) {
        return [];
      }
      const attachmentParts = parts.filter(
        (part) => part.disposition?.type?.toUpperCase() === "ATTACHMENT"
      );
      const decodeFilename = (filename) => {
        const regex = /=\?([\w-]+)\?Q\?.*\?=/i;
        if (regex.test(filename)) {
          return import_rfc2047.default.decode(filename);
        }
        return filename;
      };
      const attachmentPromises = [];
      let attachmentPromise;
      for (const attachmentPart of attachmentParts) {
        attachmentPromise = imapConnection.getPartData(message, attachmentPart).then(async (partData) => {
          const fileName = decodeFilename(
            attachmentPart.disposition?.params?.filename
          );
          return await this.helpers.prepareBinaryData(partData.buffer, fileName);
        });
        attachmentPromises.push(attachmentPromise);
      }
      return await Promise.all(attachmentPromises);
    };
    const returnedPromise = this.helpers.createDeferredPromise();
    const establishConnection = async () => {
      let searchCriteria = ["UNSEEN"];
      if (options.customEmailConfig !== void 0) {
        try {
          searchCriteria = JSON.parse(options.customEmailConfig);
        } catch (error) {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Custom email config is not valid JSON.");
        }
      }
      const config = {
        imap: {
          user: credentials.user,
          password: credentials.password,
          host: credentials.host.trim(),
          port: credentials.port,
          tls: credentials.secure,
          authTimeout: 2e4
        },
        onMail: async () => {
          if (connection) {
            if (staticData.lastMessageUid !== void 0) {
              searchCriteria.push(["UID", `${staticData.lastMessageUid}:*`]);
              this.logger.debug('Querying for new messages on node "EmailReadImap"', {
                searchCriteria
              });
            }
            try {
              const returnData = await import_utils.getNewEmails.call(
                this,
                connection,
                searchCriteria,
                staticData,
                postProcessAction,
                getText,
                getAttachment
              );
              if (returnData.length) {
                this.emit([returnData]);
              }
            } catch (error) {
              this.logger.error("Email Read Imap node encountered an error fetching new emails", {
                error
              });
              await returnedPromise.promise.then(() => {
                this.emitError(error);
              });
            }
          }
        },
        onUpdate: async (seqNo, info) => {
          this.logger.debug(`Email Read Imap:update ${seqNo}`, info);
        }
      };
      const tlsOptions = {};
      if (credentials.allowUnauthorizedCerts) {
        tlsOptions.rejectUnauthorized = false;
      }
      if (credentials.secure) {
        tlsOptions.servername = credentials.host.trim();
      }
      if (!(0, import_isEmpty.default)(tlsOptions)) {
        config.imap.tlsOptions = tlsOptions;
      }
      return await (0, import_imap.connect)(config).then(async (conn) => {
        conn.on("close", async (_hadError) => {
          if (isCurrentlyReconnecting) {
            this.logger.debug("Email Read Imap: Connected closed for forced reconnecting");
          } else if (closeFunctionWasCalled) {
            this.logger.debug("Email Read Imap: Shutting down workflow - connected closed");
          } else {
            this.logger.error("Email Read Imap: Connected closed unexpectedly");
            this.emitError(new Error("Imap connection closed unexpectedly"));
          }
        });
        conn.on("error", async (error) => {
          const errorCode = error.code.toUpperCase();
          this.logger.debug(`IMAP connection experienced an error: (${errorCode})`, {
            error
          });
          this.emitError(error);
        });
        return conn;
      });
    };
    connection = await establishConnection();
    await connection.openBox(mailbox);
    let reconnectionInterval;
    const handleReconnect = async () => {
      this.logger.debug("Forcing reconnect to IMAP server");
      try {
        isCurrentlyReconnecting = true;
        if (connection.closeBox) await connection.closeBox(false);
        connection.end();
        connection = await establishConnection();
        await connection.openBox(mailbox);
      } catch (error) {
        this.logger.error(error);
      } finally {
        isCurrentlyReconnecting = false;
      }
    };
    if (options.forceReconnect !== void 0) {
      reconnectionInterval = setInterval(
        handleReconnect,
        options.forceReconnect * 1e3 * 60
      );
    }
    const closeFunction = async () => {
      closeFunctionWasCalled = true;
      if (reconnectionInterval) {
        clearInterval(reconnectionInterval);
      }
      try {
        if (connection.closeBox) await connection.closeBox(false);
        connection.end();
      } catch (error) {
        throw new import_n8n_workflow.TriggerCloseError(this.getNode(), { cause: error, level: "warning" });
      }
    };
    returnedPromise.resolve();
    return {
      closeFunction
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailReadImapV2
});
//# sourceMappingURL=EmailReadImapV2.node.js.map