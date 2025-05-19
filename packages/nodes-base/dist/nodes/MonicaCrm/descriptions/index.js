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
__reExport(descriptions_exports, require("./ActivityDescription"), module.exports);
__reExport(descriptions_exports, require("./CallDescription"), module.exports);
__reExport(descriptions_exports, require("./ContactDescription"), module.exports);
__reExport(descriptions_exports, require("./ContactFieldDescription"), module.exports);
__reExport(descriptions_exports, require("./ContactTagDescription"), module.exports);
__reExport(descriptions_exports, require("./ConversationDescription"), module.exports);
__reExport(descriptions_exports, require("./ConversationMessageDescription"), module.exports);
__reExport(descriptions_exports, require("./JournalEntryDescription"), module.exports);
__reExport(descriptions_exports, require("./NoteDescription"), module.exports);
__reExport(descriptions_exports, require("./ReminderDescription"), module.exports);
__reExport(descriptions_exports, require("./TagDescription"), module.exports);
__reExport(descriptions_exports, require("./TaskDescription"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./ActivityDescription"),
  ...require("./CallDescription"),
  ...require("./ContactDescription"),
  ...require("./ContactFieldDescription"),
  ...require("./ContactTagDescription"),
  ...require("./ConversationDescription"),
  ...require("./ConversationMessageDescription"),
  ...require("./JournalEntryDescription"),
  ...require("./NoteDescription"),
  ...require("./ReminderDescription"),
  ...require("./TagDescription"),
  ...require("./TaskDescription")
});
//# sourceMappingURL=index.js.map