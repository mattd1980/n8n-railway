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
var Wekan_node_exports = {};
__export(Wekan_node_exports, {
  Wekan: () => Wekan
});
module.exports = __toCommonJS(Wekan_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_BoardDescription = require("./BoardDescription");
var import_CardCommentDescription = require("./CardCommentDescription");
var import_CardDescription = require("./CardDescription");
var import_ChecklistDescription = require("./ChecklistDescription");
var import_ChecklistItemDescription = require("./ChecklistItemDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_ListDescription = require("./ListDescription");
var import_utilities = require("../../utils/utilities");
class Wekan {
  constructor() {
    this.description = {
      displayName: "Wekan",
      name: "wekan",
      icon: "file:wekan.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Wekan API",
      defaults: {
        name: "Wekan"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "wekanApi",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Board",
              value: "board"
            },
            {
              name: "Card",
              value: "card"
            },
            {
              name: "Card Comment",
              value: "cardComment"
            },
            {
              name: "Checklist",
              value: "checklist"
            },
            {
              name: "Checklist Item",
              value: "checklistItem"
            },
            {
              name: "List",
              value: "list"
            }
          ],
          default: "card"
        },
        // ----------------------------------
        //         operations
        // ----------------------------------
        ...import_BoardDescription.boardOperations,
        ...import_CardDescription.cardOperations,
        ...import_CardCommentDescription.cardCommentOperations,
        ...import_ChecklistDescription.checklistOperations,
        ...import_ChecklistItemDescription.checklistItemOperations,
        ...import_ListDescription.listOperations,
        // ----------------------------------
        //         fields
        // ----------------------------------
        ...import_BoardDescription.boardFields,
        ...import_CardDescription.cardFields,
        ...import_CardCommentDescription.cardCommentFields,
        ...import_ChecklistDescription.checklistFields,
        ...import_ChecklistItemDescription.checklistItemFields,
        ...import_ListDescription.listFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getUsers() {
          const returnData = [];
          const users = await import_GenericFunctions.apiRequest.call(this, "GET", "users", {}, {});
          for (const user of users) {
            returnData.push({
              name: user.username,
              value: user._id
            });
          }
          return returnData;
        },
        async getBoards() {
          const returnData = [];
          const user = await import_GenericFunctions.apiRequest.call(this, "GET", "user", {}, {});
          const boards = await import_GenericFunctions.apiRequest.call(this, "GET", `users/${user._id}/boards`, {}, {});
          for (const board of boards) {
            returnData.push({
              name: board.title,
              value: board._id
            });
          }
          return returnData;
        },
        async getLists() {
          const returnData = [];
          const boardId = this.getCurrentNodeParameter("boardId");
          const lists = await import_GenericFunctions.apiRequest.call(this, "GET", `boards/${boardId}/lists`, {}, {});
          for (const list of lists) {
            returnData.push({
              name: list.title,
              value: list._id
            });
          }
          return returnData;
        },
        async getSwimlanes() {
          const returnData = [];
          const boardId = this.getCurrentNodeParameter("boardId");
          const swimlanes = await import_GenericFunctions.apiRequest.call(this, "GET", `boards/${boardId}/swimlanes`, {}, {});
          for (const swimlane of swimlanes) {
            returnData.push({
              name: swimlane.title,
              value: swimlane._id
            });
          }
          return returnData;
        },
        async getCards() {
          const returnData = [];
          const boardId = this.getCurrentNodeParameter("boardId");
          const listId = this.getCurrentNodeParameter("listId");
          const cards = await import_GenericFunctions.apiRequest.call(
            this,
            "GET",
            `boards/${boardId}/lists/${listId}/cards`,
            {},
            {}
          );
          for (const card of cards) {
            returnData.push({
              name: card.title,
              value: card._id
            });
          }
          return returnData;
        },
        async getChecklists() {
          const returnData = [];
          const boardId = this.getCurrentNodeParameter("boardId");
          const cardId = this.getCurrentNodeParameter("cardId");
          const checklists = await import_GenericFunctions.apiRequest.call(
            this,
            "GET",
            `boards/${boardId}/cards/${cardId}/checklists`,
            {},
            {}
          );
          for (const checklist of checklists) {
            returnData.push({
              name: checklist.title,
              value: checklist._id
            });
          }
          return returnData;
        },
        async getChecklistItems() {
          const returnData = [];
          const boardId = this.getCurrentNodeParameter("boardId");
          const cardId = this.getCurrentNodeParameter("cardId");
          const checklistId = this.getCurrentNodeParameter("checklistId");
          const checklist = await import_GenericFunctions.apiRequest.call(
            this,
            "GET",
            `boards/${boardId}/cards/${cardId}/checklists/${checklistId}`,
            {},
            {}
          );
          for (const item of checklist.items) {
            returnData.push({
              name: item.title,
              value: item._id
            });
          }
          return returnData;
        },
        async getComments() {
          const returnData = [];
          const boardId = this.getCurrentNodeParameter("boardId");
          const cardId = this.getCurrentNodeParameter("cardId");
          const comments = await import_GenericFunctions.apiRequest.call(
            this,
            "GET",
            `boards/${boardId}/cards/${cardId}/comments`,
            {},
            {}
          );
          for (const comment of comments) {
            returnData.push({
              name: comment.comment,
              value: comment._id
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let returnAll;
    let limit;
    const operation = this.getNodeParameter("operation", 0);
    const resource = this.getNodeParameter("resource", 0);
    let body;
    let qs;
    let requestMethod;
    let endpoint;
    for (let i = 0; i < items.length; i++) {
      try {
        requestMethod = "GET";
        endpoint = "";
        body = {};
        qs = {};
        if (resource === "board") {
          if (operation === "create") {
            requestMethod = "POST";
            endpoint = "boards";
            body.title = this.getNodeParameter("title", i);
            body.owner = this.getNodeParameter("owner", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const boardId = this.getNodeParameter("boardId", i);
            endpoint = `boards/${boardId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            endpoint = `boards/${boardId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const userId = this.getNodeParameter("IdUser", i);
            returnAll = this.getNodeParameter("returnAll", i);
            endpoint = `users/${userId}/boards`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "card") {
          if (operation === "create") {
            requestMethod = "POST";
            const boardId = this.getNodeParameter("boardId", i);
            const listId = this.getNodeParameter("listId", i);
            endpoint = `boards/${boardId}/lists/${listId}/cards`;
            body.title = this.getNodeParameter("title", i);
            body.swimlaneId = this.getNodeParameter("swimlaneId", i);
            body.authorId = this.getNodeParameter("authorId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const boardId = this.getNodeParameter("boardId", i);
            const listId = this.getNodeParameter("listId", i);
            const cardId = this.getNodeParameter("cardId", i);
            endpoint = `boards/${boardId}/lists/${listId}/cards/${cardId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const listId = this.getNodeParameter("listId", i);
            const cardId = this.getNodeParameter("cardId", i);
            endpoint = `boards/${boardId}/lists/${listId}/cards/${cardId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const fromObject = this.getNodeParameter("fromObject", i);
            returnAll = this.getNodeParameter("returnAll", i);
            if (fromObject === "list") {
              const listId = this.getNodeParameter("listId", i);
              endpoint = `boards/${boardId}/lists/${listId}/cards`;
            }
            if (fromObject === "swimlane") {
              const swimlaneId = this.getNodeParameter("swimlaneId", i);
              endpoint = `boards/${boardId}/swimlanes/${swimlaneId}/cards`;
            }
          } else if (operation === "update") {
            requestMethod = "PUT";
            const boardId = this.getNodeParameter("boardId", i);
            const listId = this.getNodeParameter("listId", i);
            const cardId = this.getNodeParameter("cardId", i);
            endpoint = `boards/${boardId}/lists/${listId}/cards/${cardId}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(body, updateFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "cardComment") {
          if (operation === "create") {
            requestMethod = "POST";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/comments`;
            body.authorId = this.getNodeParameter("authorId", i);
            body.comment = this.getNodeParameter("comment", i);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const commentId = this.getNodeParameter("commentId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/comments/${commentId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const commentId = this.getNodeParameter("commentId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/comments/${commentId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/comments`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "list") {
          if (operation === "create") {
            requestMethod = "POST";
            const boardId = this.getNodeParameter("boardId", i);
            endpoint = `boards/${boardId}/lists`;
            body.title = this.getNodeParameter("title", i);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const boardId = this.getNodeParameter("boardId", i);
            const listId = this.getNodeParameter("listId", i);
            endpoint = `boards/${boardId}/lists/${listId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const listId = this.getNodeParameter("listId", i);
            endpoint = `boards/${boardId}/lists/${listId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            returnAll = this.getNodeParameter("returnAll", i);
            endpoint = `boards/${boardId}/lists`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "checklist") {
          if (operation === "create") {
            requestMethod = "POST";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists`;
            body.title = this.getNodeParameter("title", i);
            body.items = this.getNodeParameter("items", i);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const checklistId = this.getNodeParameter("checklistId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists/${checklistId}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const checklistId = this.getNodeParameter("checklistId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists/${checklistId}`;
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            returnAll = this.getNodeParameter("returnAll", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists`;
          } else if (operation === "getCheckItem") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const checklistId = this.getNodeParameter("checklistId", i);
            const itemId = this.getNodeParameter("itemId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists/${checklistId}/items/${itemId}`;
          } else if (operation === "deleteCheckItem") {
            requestMethod = "DELETE";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const checklistId = this.getNodeParameter("checklistId", i);
            const itemId = this.getNodeParameter("itemId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists/${checklistId}/items/${itemId}`;
          } else if (operation === "updateCheckItem") {
            requestMethod = "PUT";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const checklistId = this.getNodeParameter("checklistId", i);
            const itemId = this.getNodeParameter("itemId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists/${checklistId}/items/${itemId}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(body, updateFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "checklistItem") {
          if (operation === "get") {
            requestMethod = "GET";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const checklistId = this.getNodeParameter("checklistId", i);
            const itemId = this.getNodeParameter("checklistItemId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists/${checklistId}/items/${itemId}`;
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const checklistId = this.getNodeParameter("checklistId", i);
            const itemId = this.getNodeParameter("checklistItemId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists/${checklistId}/items/${itemId}`;
          } else if (operation === "update") {
            requestMethod = "PUT";
            const boardId = this.getNodeParameter("boardId", i);
            const cardId = this.getNodeParameter("cardId", i);
            const checklistId = this.getNodeParameter("checklistId", i);
            const itemId = this.getNodeParameter("checklistItemId", i);
            endpoint = `boards/${boardId}/cards/${cardId}/checklists/${checklistId}/items/${itemId}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(body, updateFields);
          }
        }
        let responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endpoint, body, qs);
        if (returnAll === false && Array.isArray(responseData)) {
          limit = this.getNodeParameter("limit", i);
          responseData = responseData.splice(0, limit);
        }
        const executionData = this.helpers.constructExecutionMetaData(
          (0, import_utilities.wrapData)(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Wekan
});
//# sourceMappingURL=Wekan.node.js.map