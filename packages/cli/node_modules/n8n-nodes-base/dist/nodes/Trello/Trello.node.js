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
var Trello_node_exports = {};
__export(Trello_node_exports, {
  Trello: () => Trello
});
module.exports = __toCommonJS(Trello_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AttachmentDescription = require("./AttachmentDescription");
var import_BoardDescription = require("./BoardDescription");
var import_BoardMemberDescription = require("./BoardMemberDescription");
var import_CardCommentDescription = require("./CardCommentDescription");
var import_CardDescription = require("./CardDescription");
var import_ChecklistDescription = require("./ChecklistDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_LabelDescription = require("./LabelDescription");
var import_ListDescription = require("./ListDescription");
class Trello {
  constructor() {
    this.description = {
      displayName: "Trello",
      name: "trello",
      icon: "file:trello.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Create, change and delete boards and cards",
      defaults: {
        name: "Trello"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "trelloApi",
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
              name: "Attachment",
              value: "attachment"
            },
            {
              name: "Board",
              value: "board"
            },
            {
              name: "Board Member",
              value: "boardMember"
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
              name: "Label",
              value: "label"
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
        ...import_AttachmentDescription.attachmentOperations,
        ...import_BoardDescription.boardOperations,
        ...import_BoardMemberDescription.boardMemberOperations,
        ...import_CardDescription.cardOperations,
        ...import_CardCommentDescription.cardCommentOperations,
        ...import_ChecklistDescription.checklistOperations,
        ...import_LabelDescription.labelOperations,
        ...import_ListDescription.listOperations,
        // ----------------------------------
        //         fields
        // ----------------------------------
        ...import_AttachmentDescription.attachmentFields,
        ...import_BoardDescription.boardFields,
        ...import_BoardMemberDescription.boardMemberFields,
        ...import_CardDescription.cardFields,
        ...import_CardCommentDescription.cardCommentFields,
        ...import_ChecklistDescription.checklistFields,
        ...import_LabelDescription.labelFields,
        ...import_ListDescription.listFields
      ]
    };
    this.methods = {
      listSearch: {
        async searchBoards(query) {
          if (!query) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Query required for Trello search");
          }
          const searchResults = await import_GenericFunctions.apiRequest.call(
            this,
            "GET",
            "search",
            {},
            {
              query,
              modelTypes: "boards",
              board_fields: "name,url,desc",
              // Enables partial word searching, only for the start of words though
              partial: true,
              // Seems like a good number since it isn't paginated. Default is 10.
              boards_limit: 50
            }
          );
          return {
            results: searchResults.boards.map((b) => ({
              name: b.name,
              value: b.id,
              url: b.url,
              description: b.desc
            }))
          };
        },
        async searchCards(query) {
          if (!query) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Query required for Trello search");
          }
          const searchResults = await import_GenericFunctions.apiRequest.call(
            this,
            "GET",
            "search",
            {},
            {
              query,
              modelTypes: "cards",
              board_fields: "name,url,desc",
              // Enables partial word searching, only for the start of words though
              partial: true,
              // Seems like a good number since it isn't paginated. Default is 10.
              cards_limit: 50
            }
          );
          return {
            results: searchResults.cards.map((b) => ({
              name: b.name,
              value: b.id,
              url: b.url,
              description: b.desc
            }))
          };
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const operation = this.getNodeParameter("operation", 0);
    const resource = this.getNodeParameter("resource", 0);
    let body;
    let qs;
    let requestMethod;
    let endpoint;
    let returnAll = false;
    let responseData;
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
            body.name = this.getNodeParameter("name", i);
            body.desc = this.getNodeParameter("description", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i, void 0, {
              extractValue: true
            });
            endpoint = `boards/${id}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i, void 0, { extractValue: true });
            endpoint = `boards/${id}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const id = this.getNodeParameter("id", i, void 0, { extractValue: true });
            endpoint = `boards/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "boardMember") {
          if (operation === "getAll") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            endpoint = `boards/${id}/members`;
          } else if (operation === "add") {
            requestMethod = "PUT";
            const id = this.getNodeParameter("id", i);
            const idMember = this.getNodeParameter("idMember", i);
            endpoint = `boards/${id}/members/${idMember}`;
            qs.type = this.getNodeParameter("type", i);
            qs.allowBillableGuest = this.getNodeParameter(
              "additionalFields.allowBillableGuest",
              i,
              false
            );
          } else if (operation === "invite") {
            requestMethod = "PUT";
            const id = this.getNodeParameter("id", i);
            endpoint = `boards/${id}/members`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            qs.email = this.getNodeParameter("email", i);
            qs.type = additionalFields.type;
            body.fullName = additionalFields.fullName;
          } else if (operation === "remove") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            const idMember = this.getNodeParameter("idMember", i);
            endpoint = `boards/${id}/members/${idMember}`;
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
            endpoint = "cards";
            body.idList = this.getNodeParameter("listId", i);
            body.name = this.getNodeParameter("name", i);
            body.desc = this.getNodeParameter("description", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i, void 0, { extractValue: true });
            endpoint = `cards/${id}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i, void 0, { extractValue: true });
            endpoint = `cards/${id}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const id = this.getNodeParameter("id", i, void 0, { extractValue: true });
            endpoint = `cards/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "cardComment") {
          if (operation === "create") {
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            body.text = this.getNodeParameter("text", i);
            requestMethod = "POST";
            endpoint = `cards/${cardId}/actions/comments`;
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const commentId = this.getNodeParameter("commentId", i);
            endpoint = `/cards/${cardId}/actions/${commentId}/comments`;
          } else if (operation === "update") {
            requestMethod = "PUT";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const commentId = this.getNodeParameter("commentId", i);
            qs.text = this.getNodeParameter("text", i);
            endpoint = `cards/${cardId}/actions/${commentId}/comments`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "list") {
          if (operation === "archive") {
            requestMethod = "PUT";
            const id = this.getNodeParameter("id", i);
            qs.value = this.getNodeParameter("archive", i);
            endpoint = `lists/${id}/closed`;
          } else if (operation === "create") {
            requestMethod = "POST";
            endpoint = "lists";
            body.idBoard = this.getNodeParameter("idBoard", i);
            body.name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
          } else if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `lists/${id}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "getAll") {
            requestMethod = "GET";
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            const id = this.getNodeParameter("id", i);
            endpoint = `boards/${id}/lists`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "getCards") {
            requestMethod = "GET";
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", i);
            }
            const id = this.getNodeParameter("id", i);
            endpoint = `lists/${id}/cards`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const id = this.getNodeParameter("id", i);
            endpoint = `lists/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "attachment") {
          if (operation === "create") {
            requestMethod = "POST";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const url = this.getNodeParameter("url", i);
            Object.assign(body, {
              url
            });
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            endpoint = `cards/${cardId}/attachments`;
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const id = this.getNodeParameter("id", i);
            endpoint = `cards/${cardId}/attachments/${id}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const id = this.getNodeParameter("id", i);
            endpoint = `cards/${cardId}/attachments/${id}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            endpoint = `cards/${cardId}/attachments`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
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
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const name = this.getNodeParameter("name", i);
            Object.assign(body, { name });
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            endpoint = `cards/${cardId}/checklists`;
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const id = this.getNodeParameter("id", i);
            endpoint = `cards/${cardId}/checklists/${id}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `checklists/${id}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            endpoint = `cards/${cardId}/checklists`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "getCheckItem") {
            requestMethod = "GET";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const checkItemId = this.getNodeParameter("checkItemId", i);
            endpoint = `cards/${cardId}/checkItem/${checkItemId}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "createCheckItem") {
            requestMethod = "POST";
            const checklistId = this.getNodeParameter("checklistId", i);
            endpoint = `checklists/${checklistId}/checkItems`;
            const name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, { name, ...additionalFields });
          } else if (operation === "deleteCheckItem") {
            requestMethod = "DELETE";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const checkItemId = this.getNodeParameter("checkItemId", i);
            endpoint = `cards/${cardId}/checkItem/${checkItemId}`;
          } else if (operation === "updateCheckItem") {
            requestMethod = "PUT";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const checkItemId = this.getNodeParameter("checkItemId", i);
            endpoint = `cards/${cardId}/checkItem/${checkItemId}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "completedCheckItems") {
            requestMethod = "GET";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            endpoint = `cards/${cardId}/checkItemStates`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else if (resource === "label") {
          if (operation === "create") {
            requestMethod = "POST";
            const idBoard = this.getNodeParameter("boardId", i, void 0, {
              extractValue: true
            });
            const name = this.getNodeParameter("name", i);
            const color = this.getNodeParameter("color", i);
            Object.assign(body, {
              idBoard,
              name,
              color
            });
            endpoint = "labels";
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("id", i);
            endpoint = `labels/${id}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("id", i);
            endpoint = `labels/${id}`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "getAll") {
            requestMethod = "GET";
            const idBoard = this.getNodeParameter("boardId", i, void 0, {
              extractValue: true
            });
            endpoint = `board/${idBoard}/labels`;
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(qs, additionalFields);
          } else if (operation === "update") {
            requestMethod = "PUT";
            const id = this.getNodeParameter("id", i);
            endpoint = `labels/${id}`;
            const updateFields = this.getNodeParameter("updateFields", i);
            Object.assign(qs, updateFields);
          } else if (operation === "addLabel") {
            requestMethod = "POST";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const id = this.getNodeParameter("id", i);
            body.value = id;
            endpoint = `/cards/${cardId}/idLabels`;
          } else if (operation === "removeLabel") {
            requestMethod = "DELETE";
            const cardId = this.getNodeParameter("cardId", i, void 0, {
              extractValue: true
            });
            const id = this.getNodeParameter("id", i);
            endpoint = `/cards/${cardId}/idLabels/${id}`;
          } else {
            throw new import_n8n_workflow.NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not known!`,
              { itemIndex: i }
            );
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: i
          });
        }
        const skipPagination = ["list:getAll"];
        if (returnAll && !skipPagination.includes(`${resource}:${operation}`)) {
          responseData = await import_GenericFunctions.apiRequestAllItems.call(this, requestMethod, endpoint, body, qs);
        } else {
          responseData = await import_GenericFunctions.apiRequest.call(this, requestMethod, endpoint, body, qs);
          if (!returnAll && qs.limit) {
            responseData = responseData.splice(0, qs.limit);
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Trello
});
//# sourceMappingURL=Trello.node.js.map