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
var Service_exports = {};
__export(Service_exports, {
  TodoistService: () => TodoistService
});
module.exports = __toCommonJS(Service_exports);
var import_OperationHandler = require("./OperationHandler");
class TodoistService {
  constructor() {
    this.handlers = {
      create: new import_OperationHandler.CreateHandler(),
      close: new import_OperationHandler.CloseHandler(),
      delete: new import_OperationHandler.DeleteHandler(),
      get: new import_OperationHandler.GetHandler(),
      getAll: new import_OperationHandler.GetAllHandler(),
      reopen: new import_OperationHandler.ReopenHandler(),
      update: new import_OperationHandler.UpdateHandler(),
      move: new import_OperationHandler.MoveHandler(),
      sync: new import_OperationHandler.SyncHandler()
    };
  }
  async execute(ctx, operation, itemIndex) {
    return await this.handlers[operation].handleOperation(ctx, itemIndex);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TodoistService
});
//# sourceMappingURL=Service.js.map