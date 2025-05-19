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
var JsCodeValidator_exports = {};
__export(JsCodeValidator_exports, {
  mapItemNotDefinedErrorIfNeededForRunForEach: () => mapItemNotDefinedErrorIfNeededForRunForEach,
  mapItemsNotDefinedErrorIfNeededForRunForAll: () => mapItemsNotDefinedErrorIfNeededForRunForAll,
  validateNoDisallowedMethodsInRunForEach: () => validateNoDisallowedMethodsInRunForEach
});
module.exports = __toCommonJS(JsCodeValidator_exports);
var import_ValidationError = require("./ValidationError");
function validateNoDisallowedMethodsInRunForEach(code, itemIndex) {
  const match = code.match(/\$input\.(?<disallowedMethod>first|last|all|itemMatching)/);
  if (match?.groups?.disallowedMethod) {
    const { disallowedMethod } = match.groups;
    const lineNumber = code.split("\n").findIndex((line) => {
      line = line.trimStart();
      return line.includes(disallowedMethod) && !line.startsWith("//") && !line.startsWith("/*") && !line.startsWith("*");
    }) + 1;
    const disallowedMethodFound = lineNumber !== 0;
    if (disallowedMethodFound) {
      throw new import_ValidationError.ValidationError({
        message: `Can't use .${disallowedMethod}() here`,
        description: "This is only available in 'Run Once for All Items' mode",
        itemIndex,
        lineNumber
      });
    }
  }
}
function mapItemsNotDefinedErrorIfNeededForRunForAll(code, error) {
  if (error.message === "items is not defined" && !/(let|const|var) +items +=/.test(code)) {
    const quoted = error.message.replace("items", "`items`");
    error.message = quoted + ". Did you mean `$input.all()`?";
  }
}
function mapItemNotDefinedErrorIfNeededForRunForEach(code, error) {
  if (error.message === "item is not defined" && !/(let|const|var) +item +=/.test(code)) {
    const quoted = error.message.replace("item", "`item`");
    error.message = quoted + ". Did you mean `$input.item.json`?";
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mapItemNotDefinedErrorIfNeededForRunForEach,
  mapItemsNotDefinedErrorIfNeededForRunForAll,
  validateNoDisallowedMethodsInRunForEach
});
//# sourceMappingURL=JsCodeValidator.js.map