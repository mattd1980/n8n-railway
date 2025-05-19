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
var functions_exports = {};
__export(functions_exports, {
  generateGarbageMemory: () => generateGarbageMemory,
  runGarbageCollector: () => runGarbageCollector
});
module.exports = __toCommonJS(functions_exports);
var import_v8 = require("v8");
var import_vm = require("vm");
const runGarbageCollector = () => {
  try {
    (0, import_v8.setFlagsFromString)("--expose_gc");
    const gc = (0, import_vm.runInNewContext)("gc");
    gc();
  } catch (error) {
    console.error(error);
  }
};
const generateGarbageMemory = (sizeInMB, onHeap = true) => {
  const divider = onHeap ? 8 : 1;
  const size = Math.max(1, Math.floor(sizeInMB * 1024 * 1024 / divider));
  if (onHeap) {
    const array = Array(size);
    array.fill(0);
  } else {
    const array = new Uint8Array(size);
    array.fill(0);
  }
  return { ...process.memoryUsage() };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateGarbageMemory,
  runGarbageCollector
});
//# sourceMappingURL=functions.js.map