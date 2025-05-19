"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var descriptions_exports = {};
module.exports = __toCommonJS(descriptions_exports);
__reExport(descriptions_exports, require("./AgentDescription"), module.exports);
__reExport(descriptions_exports, require("./AgentGroupDescription"), module.exports);
__reExport(descriptions_exports, require("./AgentRoleDescription"), module.exports);
__reExport(descriptions_exports, require("./AnnouncementDescription"), module.exports);
__reExport(descriptions_exports, require("./AssetDescription"), module.exports);
__reExport(descriptions_exports, require("./AssetTypeDescription"), module.exports);
__reExport(descriptions_exports, require("./ChangeDescription"), module.exports);
__reExport(descriptions_exports, require("./DepartmentDescription"), module.exports);
__reExport(descriptions_exports, require("./LocationDescription"), module.exports);
__reExport(descriptions_exports, require("./ProblemDescription"), module.exports);
__reExport(descriptions_exports, require("./ProductDescription"), module.exports);
__reExport(descriptions_exports, require("./ReleaseDescription"), module.exports);
__reExport(descriptions_exports, require("./RequesterDescription"), module.exports);
__reExport(descriptions_exports, require("./RequesterGroupDescription"), module.exports);
__reExport(descriptions_exports, require("./SoftwareDescription"), module.exports);
__reExport(descriptions_exports, require("./TicketDescription"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./AgentDescription"),
  ...require("./AgentGroupDescription"),
  ...require("./AgentRoleDescription"),
  ...require("./AnnouncementDescription"),
  ...require("./AssetDescription"),
  ...require("./AssetTypeDescription"),
  ...require("./ChangeDescription"),
  ...require("./DepartmentDescription"),
  ...require("./LocationDescription"),
  ...require("./ProblemDescription"),
  ...require("./ProductDescription"),
  ...require("./ReleaseDescription"),
  ...require("./RequesterDescription"),
  ...require("./RequesterGroupDescription"),
  ...require("./SoftwareDescription"),
  ...require("./TicketDescription")
});
//# sourceMappingURL=index.js.map