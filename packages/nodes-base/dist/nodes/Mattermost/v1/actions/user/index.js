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
var user_exports = {};
__export(user_exports, {
  create: () => create,
  deactive: () => deactive,
  descriptions: () => descriptions,
  getAll: () => getAll,
  getByEmail: () => getByEmail,
  getById: () => getById,
  invite: () => invite
});
module.exports = __toCommonJS(user_exports);
var create = __toESM(require("./create"));
var deactive = __toESM(require("./deactive"));
var getAll = __toESM(require("./getAll"));
var getByEmail = __toESM(require("./getByEmail"));
var getById = __toESM(require("./getById"));
var invite = __toESM(require("./invite"));
const descriptions = [
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
        description: "Create a new user",
        action: "Create a user"
      },
      {
        name: "Deactive",
        value: "deactive",
        description: "Deactivates the user and revokes all its sessions by archiving its user object",
        action: "Deactivate a user"
      },
      {
        name: "Get By Email",
        value: "getByEmail",
        description: "Get a user by email",
        action: "Get a user by email"
      },
      {
        name: "Get By ID",
        value: "getById",
        description: "Get a user by ID",
        action: "Get a user by ID"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many users",
        action: "Get many users"
      },
      {
        name: "Invite",
        value: "invite",
        description: "Invite user to team",
        action: "Invite a user"
      }
    ],
    default: ""
  },
  ...create.description,
  ...deactive.description,
  ...getAll.description,
  ...getByEmail.description,
  ...getById.description,
  ...invite.description
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deactive,
  descriptions,
  getAll,
  getByEmail,
  getById,
  invite
});
//# sourceMappingURL=index.js.map