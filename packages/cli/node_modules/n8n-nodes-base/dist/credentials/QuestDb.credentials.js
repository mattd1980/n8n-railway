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
var QuestDb_credentials_exports = {};
__export(QuestDb_credentials_exports, {
  QuestDb: () => QuestDb
});
module.exports = __toCommonJS(QuestDb_credentials_exports);
class QuestDb {
  constructor() {
    this.name = "questDb";
    this.displayName = "QuestDB";
    this.documentationUrl = "questDb";
    this.properties = [
      {
        displayName: "Host",
        name: "host",
        type: "string",
        default: "localhost"
      },
      {
        displayName: "Database",
        name: "database",
        type: "string",
        default: "qdb"
      },
      {
        displayName: "User",
        name: "user",
        type: "string",
        default: "admin"
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        typeOptions: {
          password: true
        },
        default: "quest"
      },
      {
        displayName: "SSL",
        name: "ssl",
        type: "options",
        options: [
          {
            name: "Allow",
            value: "allow"
          },
          {
            name: "Disable",
            value: "disable"
          },
          {
            name: "Require",
            value: "require"
          }
        ],
        default: "disable"
      },
      {
        displayName: "Port",
        name: "port",
        type: "number",
        default: 8812
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QuestDb
});
//# sourceMappingURL=QuestDb.credentials.js.map