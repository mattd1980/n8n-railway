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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  MessageTracker: () => MessageTracker,
  parseMessage: () => parseMessage,
  parsePublishArguments: () => parsePublishArguments,
  rabbitmqConnect: () => rabbitmqConnect,
  rabbitmqConnectExchange: () => rabbitmqConnectExchange,
  rabbitmqConnectQueue: () => rabbitmqConnectQueue,
  rabbitmqCreateChannel: () => rabbitmqCreateChannel
});
module.exports = __toCommonJS(GenericFunctions_exports);
var amqplib = __toESM(require("amqplib"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../utils/utilities");
const credentialKeys = ["hostname", "port", "username", "password", "vhost"];
async function rabbitmqConnect(credentials) {
  const credentialData = credentialKeys.reduce((acc, key) => {
    acc[key] = credentials[key] === "" ? void 0 : credentials[key];
    return acc;
  }, {});
  const optsData = {};
  if (credentials.ssl) {
    credentialData.protocol = "amqps";
    optsData.ca = credentials.ca === "" ? void 0 : [Buffer.from((0, import_utilities.formatPrivateKey)(credentials.ca))];
    if (credentials.passwordless) {
      optsData.cert = credentials.cert === "" ? void 0 : Buffer.from((0, import_utilities.formatPrivateKey)(credentials.cert));
      optsData.key = credentials.key === "" ? void 0 : Buffer.from((0, import_utilities.formatPrivateKey)(credentials.key));
      optsData.passphrase = credentials.passphrase === "" ? void 0 : credentials.passphrase;
      optsData.credentials = amqplib.credentials.external();
    }
  }
  return await amqplib.connect(credentialData, optsData);
}
async function rabbitmqCreateChannel() {
  const credentials = await this.getCredentials("rabbitmq");
  return await new Promise(async (resolve, reject) => {
    try {
      const connection = await rabbitmqConnect(credentials);
      connection.on("error", reject);
      const channel = await connection.createChannel();
      resolve(channel);
    } catch (error) {
      reject(error);
    }
  });
}
async function rabbitmqConnectQueue(queue, options) {
  const channel = await rabbitmqCreateChannel.call(this);
  return await new Promise(async (resolve, reject) => {
    try {
      if (options.assertQueue) {
        await channel.assertQueue(queue, options);
      } else {
        await channel.checkQueue(queue);
      }
      if ("binding" in options && options.binding?.bindings.length) {
        options.binding.bindings.forEach(async (binding) => {
          await channel.bindQueue(queue, binding.exchange, binding.routingKey);
        });
      }
      resolve(channel);
    } catch (error) {
      reject(error);
    }
  });
}
async function rabbitmqConnectExchange(exchange, options) {
  const exchangeType = this.getNodeParameter("exchangeType", 0);
  const channel = await rabbitmqCreateChannel.call(this);
  return await new Promise(async (resolve, reject) => {
    try {
      if (options.assertExchange) {
        await channel.assertExchange(exchange, exchangeType, options);
      } else {
        await channel.checkExchange(exchange);
      }
      resolve(channel);
    } catch (error) {
      reject(error);
    }
  });
}
class MessageTracker {
  constructor() {
    this.messages = [];
    this.isClosing = false;
  }
  received(message) {
    this.messages.push(message.fields.deliveryTag);
  }
  answered(message) {
    if (this.messages.length === 0) {
      return;
    }
    const index = this.messages.findIndex((value) => value !== message.fields.deliveryTag);
    this.messages.splice(index);
  }
  unansweredMessages() {
    return this.messages.length;
  }
  async closeChannel(channel, consumerTag) {
    if (this.isClosing) {
      return;
    }
    this.isClosing = true;
    await channel.cancel(consumerTag);
    let count = 0;
    let unansweredMessages = this.unansweredMessages();
    while (unansweredMessages !== 0 && count++ <= 300) {
      await (0, import_n8n_workflow.sleep)(1e3);
      unansweredMessages = this.unansweredMessages();
    }
    await channel.close();
    await channel.connection.close();
  }
}
const parsePublishArguments = (options) => {
  const additionalArguments = {};
  if (options.arguments?.argument.length) {
    options.arguments.argument.forEach((argument) => {
      additionalArguments[argument.key] = argument.value;
    });
  }
  return additionalArguments;
};
const parseMessage = async (message, options, helpers) => {
  if (options.contentIsBinary) {
    const { content } = message;
    message.content = void 0;
    return {
      binary: {
        data: await helpers.prepareBinaryData(content)
      },
      json: message
    };
  } else {
    let content = message.content.toString();
    if (options.jsonParseBody) {
      content = (0, import_n8n_workflow.jsonParse)(content);
    }
    if (options.onlyContent) {
      return { json: content };
    } else {
      message.content = content;
      return { json: message };
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageTracker,
  parseMessage,
  parsePublishArguments,
  rabbitmqConnect,
  rabbitmqConnectExchange,
  rabbitmqConnectQueue,
  rabbitmqCreateChannel
});
//# sourceMappingURL=GenericFunctions.js.map