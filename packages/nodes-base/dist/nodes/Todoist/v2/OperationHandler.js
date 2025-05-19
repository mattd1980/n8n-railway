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
var OperationHandler_exports = {};
__export(OperationHandler_exports, {
  CloseHandler: () => CloseHandler,
  CommandTypes: () => CommandTypes,
  CreateHandler: () => CreateHandler,
  DeleteHandler: () => DeleteHandler,
  GetAllHandler: () => GetAllHandler,
  GetHandler: () => GetHandler,
  MoveHandler: () => MoveHandler,
  ReopenHandler: () => ReopenHandler,
  SyncHandler: () => SyncHandler,
  UpdateHandler: () => UpdateHandler
});
module.exports = __toCommonJS(OperationHandler_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_uuid = require("uuid");
var import_GenericFunctions = require("../GenericFunctions");
const CommandTypes = {
  ITEM_MOVE: "item_move",
  ITEM_ADD: "item_add",
  ITEM_UPDATE: "item_update",
  ITEM_REORDER: "item_reorder",
  ITEM_DELETE: "item_delete",
  ITEM_COMPLETE: "item_complete"
};
class CreateHandler {
  async handleOperation(ctx, itemIndex) {
    const content = ctx.getNodeParameter("content", itemIndex);
    const projectId = ctx.getNodeParameter("project", itemIndex, void 0, {
      extractValue: true
    });
    const labels = ctx.getNodeParameter("labels", itemIndex);
    const options = ctx.getNodeParameter("options", itemIndex);
    const body = {
      content,
      project_id: projectId,
      priority: options.priority ? parseInt(options.priority, 10) : 1
    };
    if (options.description) {
      body.description = options.description;
    }
    if (options.dueDateTime) {
      body.due_datetime = (0, import_GenericFunctions.FormatDueDatetime)(options.dueDateTime);
    }
    if (options.dueString) {
      body.due_string = options.dueString;
    }
    if (labels !== void 0 && labels.length !== 0) {
      body.labels = labels;
    }
    if (options.section) {
      body.section_id = options.section;
    }
    if (options.dueLang) {
      body.due_lang = options.dueLang;
    }
    if (options.parentId) {
      body.parent_id = options.parentId;
    }
    const data = await import_GenericFunctions.todoistApiRequest.call(ctx, "POST", "/tasks", body);
    return {
      data
    };
  }
}
class CloseHandler {
  async handleOperation(ctx, itemIndex) {
    const id = ctx.getNodeParameter("taskId", itemIndex);
    await import_GenericFunctions.todoistApiRequest.call(ctx, "POST", `/tasks/${id}/close`);
    return {
      success: true
    };
  }
}
class DeleteHandler {
  async handleOperation(ctx, itemIndex) {
    const id = ctx.getNodeParameter("taskId", itemIndex);
    await import_GenericFunctions.todoistApiRequest.call(ctx, "DELETE", `/tasks/${id}`);
    return {
      success: true
    };
  }
}
class GetHandler {
  async handleOperation(ctx, itemIndex) {
    const id = ctx.getNodeParameter("taskId", itemIndex);
    const responseData = await import_GenericFunctions.todoistApiRequest.call(ctx, "GET", `/tasks/${id}`);
    return {
      data: responseData
    };
  }
}
class GetAllHandler {
  async handleOperation(ctx, itemIndex) {
    const returnAll = ctx.getNodeParameter("returnAll", itemIndex);
    const filters = ctx.getNodeParameter("filters", itemIndex);
    const qs = {};
    if (filters.projectId) {
      qs.project_id = filters.projectId;
    }
    if (filters.sectionId) {
      qs.section_id = filters.sectionId;
    }
    if (filters.labelId) {
      qs.label = filters.labelId;
    }
    if (filters.filter) {
      qs.filter = filters.filter;
    }
    if (filters.lang) {
      qs.lang = filters.lang;
    }
    if (filters.ids) {
      qs.ids = filters.ids;
    }
    let responseData = await import_GenericFunctions.todoistApiRequest.call(ctx, "GET", "/tasks", {}, qs);
    if (!returnAll) {
      const limit = ctx.getNodeParameter("limit", itemIndex);
      responseData = responseData.splice(0, limit);
    }
    return {
      data: responseData
    };
  }
}
async function getSectionIds(ctx, projectId) {
  const sections = await import_GenericFunctions.todoistApiRequest.call(
    ctx,
    "GET",
    "/sections",
    {},
    { project_id: projectId }
  );
  return new Map(sections.map((s) => [s.name, s.id]));
}
class ReopenHandler {
  async handleOperation(ctx, itemIndex) {
    const id = ctx.getNodeParameter("taskId", itemIndex);
    await import_GenericFunctions.todoistApiRequest.call(ctx, "POST", `/tasks/${id}/reopen`);
    return {
      success: true
    };
  }
}
class UpdateHandler {
  async handleOperation(ctx, itemIndex) {
    const id = ctx.getNodeParameter("taskId", itemIndex);
    const updateFields = ctx.getNodeParameter("updateFields", itemIndex);
    const body = {};
    if (updateFields.content) {
      body.content = updateFields.content;
    }
    if (updateFields.priority) {
      body.priority = parseInt(updateFields.priority, 10);
    }
    if (updateFields.description) {
      body.description = updateFields.description;
    }
    if (updateFields.dueDateTime) {
      body.due_datetime = (0, import_GenericFunctions.FormatDueDatetime)(updateFields.dueDateTime);
    }
    if (updateFields.dueString) {
      body.due_string = updateFields.dueString;
    }
    if (updateFields.labels !== void 0 && Array.isArray(updateFields.labels) && updateFields.labels.length !== 0) {
      body.labels = updateFields.labels;
    }
    if (updateFields.dueLang) {
      body.due_lang = updateFields.dueLang;
    }
    await import_GenericFunctions.todoistApiRequest.call(ctx, "POST", `/tasks/${id}`, body);
    return { success: true };
  }
}
class MoveHandler {
  async handleOperation(ctx, itemIndex) {
    const taskId = ctx.getNodeParameter("taskId", itemIndex);
    const projectId = ctx.getNodeParameter("project", itemIndex, void 0, {
      extractValue: true
    });
    const nodeVersion = ctx.getNode().typeVersion;
    const body = {
      commands: [
        {
          type: CommandTypes.ITEM_MOVE,
          uuid: (0, import_uuid.v4)(),
          args: {
            id: taskId,
            // Set section_id only if node version is below 2.1
            ...nodeVersion < 2.1 ? { section_id: ctx.getNodeParameter("section", itemIndex) } : {}
          }
        }
      ]
    };
    if (nodeVersion >= 2.1) {
      const options = ctx.getNodeParameter("options", itemIndex, {});
      if (options.parent) {
        body.commands[0].args.parent_id = options.parent;
      } else if (options.section) {
        body.commands[0].args.section_id = options.section;
      } else {
        body.commands[0].args.project_id = projectId;
      }
    }
    await import_GenericFunctions.todoistSyncRequest.call(ctx, body);
    return { success: true };
  }
}
class SyncHandler {
  async handleOperation(ctx, itemIndex) {
    const commandsJson = ctx.getNodeParameter("commands", itemIndex);
    const projectId = ctx.getNodeParameter("project", itemIndex, void 0, {
      extractValue: true
    });
    const sections = await getSectionIds(ctx, projectId);
    const commands = (0, import_n8n_workflow.jsonParse)(commandsJson);
    const tempIdMapping = /* @__PURE__ */ new Map();
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      this.enrichUUID(command);
      this.enrichSection(command, sections);
      this.enrichProjectId(command, projectId);
      this.enrichTempId(command, tempIdMapping, projectId);
    }
    const body = {
      commands,
      temp_id_mapping: this.convertToObject(tempIdMapping)
    };
    await import_GenericFunctions.todoistSyncRequest.call(ctx, body);
    return { success: true };
  }
  convertToObject(map) {
    return Array.from(map.entries()).reduce((o, [key, value]) => {
      o[key] = value;
      return o;
    }, {});
  }
  enrichUUID(command) {
    command.uuid = (0, import_uuid.v4)();
  }
  enrichSection(command, sections) {
    if (command.args?.section !== void 0) {
      const sectionId = sections.get(command.args.section);
      if (sectionId) {
        command.args.section_id = sectionId;
      } else {
        throw new import_n8n_workflow.ApplicationError(
          "Section " + command.args.section + " doesn't exist on Todoist",
          { level: "warning" }
        );
      }
    }
  }
  enrichProjectId(command, projectId) {
    if (this.requiresProjectId(command)) {
      command.args.project_id = projectId;
    }
  }
  requiresProjectId(command) {
    return command.type === CommandTypes.ITEM_ADD;
  }
  enrichTempId(command, tempIdMapping, projectId) {
    if (this.requiresTempId(command)) {
      command.temp_id = (0, import_uuid.v4)();
      tempIdMapping.set(command.temp_id, projectId);
    }
  }
  requiresTempId(command) {
    return command.type === CommandTypes.ITEM_ADD;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CloseHandler,
  CommandTypes,
  CreateHandler,
  DeleteHandler,
  GetAllHandler,
  GetHandler,
  MoveHandler,
  ReopenHandler,
  SyncHandler,
  UpdateHandler
});
//# sourceMappingURL=OperationHandler.js.map