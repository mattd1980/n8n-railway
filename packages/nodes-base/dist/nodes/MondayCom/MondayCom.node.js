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
var MondayCom_node_exports = {};
__export(MondayCom_node_exports, {
  MondayCom: () => MondayCom
});
module.exports = __toCommonJS(MondayCom_node_exports);
var import_change_case = require("change-case");
var import_n8n_workflow = require("n8n-workflow");
var import_BoardColumnDescription = require("./BoardColumnDescription");
var import_BoardDescription = require("./BoardDescription");
var import_BoardGroupDescription = require("./BoardGroupDescription");
var import_BoardItemDescription = require("./BoardItemDescription");
var import_GenericFunctions = require("./GenericFunctions");
class MondayCom {
  constructor() {
    this.description = {
      displayName: "Monday.com",
      name: "mondayCom",
      icon: "file:mondayCom.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Monday.com API",
      defaults: {
        name: "Monday.com"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "mondayComApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "mondayComOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
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
              name: "Board Column",
              value: "boardColumn"
            },
            {
              name: "Board Group",
              value: "boardGroup"
            },
            {
              name: "Board Item",
              value: "boardItem"
            }
          ],
          default: "board"
        },
        //BOARD
        ...import_BoardDescription.boardOperations,
        ...import_BoardDescription.boardFields,
        // BOARD COLUMN
        ...import_BoardColumnDescription.boardColumnOperations,
        ...import_BoardColumnDescription.boardColumnFields,
        // BOARD GROUP
        ...import_BoardGroupDescription.boardGroupOperations,
        ...import_BoardGroupDescription.boardGroupFields,
        // BOARD ITEM
        ...import_BoardItemDescription.boardItemOperations,
        ...import_BoardItemDescription.boardItemFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available boards to display them to user so that they can
        // select them easily
        async getBoards() {
          const returnData = [];
          const body = {
            query: `query ($page: Int, $limit: Int) {
							boards (page: $page, limit: $limit){
								id
								description
								name
							}
						}`,
            variables: {
              page: 1
            }
          };
          const boards = await import_GenericFunctions.mondayComApiRequestAllItems.call(this, "data.boards", body);
          if (boards === void 0) {
            return returnData;
          }
          for (const board of boards) {
            const boardName = board.name;
            const boardId = board.id;
            const boardDescription = board.description;
            returnData.push({
              name: boardName,
              value: boardId,
              description: boardDescription
            });
          }
          return returnData;
        },
        // Get all the available columns to display them to user so that they can
        // select them easily
        async getColumns() {
          const returnData = [];
          const boardId = this.getCurrentNodeParameter("boardId");
          const body = {
            query: `query ($boardId: [ID!]) {
							boards (ids: $boardId){
								columns {
									id
									title
								}
							}
						}`,
            variables: {
              boardId
            }
          };
          const { data } = await import_GenericFunctions.mondayComApiRequest.call(this, body);
          if (data === void 0) {
            return returnData;
          }
          const columns = data.boards[0].columns;
          for (const column of columns) {
            const columnName = column.title;
            const columnId = column.id;
            returnData.push({
              name: columnName,
              value: columnId
            });
          }
          return returnData;
        },
        // Get all the available groups to display them to user so that they can
        // select them easily
        async getGroups() {
          const returnData = [];
          const boardId = this.getCurrentNodeParameter("boardId");
          const body = {
            query: `query ($boardId: ID!) {
							boards ( ids: [$boardId]){
								groups {
									id
									title
								}
							}
						}`,
            variables: {
              boardId
            }
          };
          const { data } = await import_GenericFunctions.mondayComApiRequest.call(this, body);
          if (data === void 0) {
            return returnData;
          }
          const groups = data.boards[0].groups;
          for (const group of groups) {
            const groupName = group.title;
            const groupId = group.id;
            returnData.push({
              name: groupName,
              value: groupId
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
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "board") {
          if (operation === "archive") {
            const boardId = this.getNodeParameter("boardId", i);
            const body = {
              query: `mutation ($id: ID!) {
									archive_board (board_id: $id) {
										id
									}
								}`,
              variables: {
                id: boardId
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.archive_board;
          }
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const kind = this.getNodeParameter("kind", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              query: `mutation ($name: String!, $kind: BoardKind!, $templateId: ID) {
									create_board (board_name: $name, board_kind: $kind, template_id: $templateId) {
										id
									}
								}`,
              variables: {
                name,
                kind
              }
            };
            if (additionalFields.templateId) {
              body.variables.templateId = additionalFields.templateId;
            }
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.create_board;
          }
          if (operation === "get") {
            const boardId = this.getNodeParameter("boardId", i);
            const body = {
              query: `query ($id: [ID!]) {
									boards (ids: $id){
										id
										name
										description
										state
										board_folder_id
										board_kind
										owners {
											id
										}
									}
								}`,
              variables: {
                id: boardId
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.boards;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const body = {
              query: `query ($page: Int, $limit: Int) {
									boards (page: $page, limit: $limit){
										id
										name
										description
										state
										board_folder_id
										board_kind
										owners {
											id
										}
									}
								}`,
              variables: {
                page: 1
              }
            };
            if (returnAll) {
              responseData = await import_GenericFunctions.mondayComApiRequestAllItems.call(this, "data.boards", body);
            } else {
              body.variables.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
              responseData = responseData.data.boards;
            }
          }
        }
        if (resource === "boardColumn") {
          if (operation === "create") {
            const boardId = this.getNodeParameter("boardId", i);
            const title = this.getNodeParameter("title", i);
            const columnType = this.getNodeParameter("columnType", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              query: `mutation ($boardId: ID!, $title: String!, $columnType: ColumnType!, $defaults: JSON ) {
									create_column (board_id: $boardId, title: $title, column_type: $columnType, defaults: $defaults) {
										id
									}
								}`,
              variables: {
                boardId,
                title,
                columnType: (0, import_change_case.snakeCase)(columnType)
              }
            };
            if (additionalFields.defaults) {
              try {
                JSON.parse(additionalFields.defaults);
              } catch (error) {
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Defauls must be a valid JSON", {
                  itemIndex: i
                });
              }
              body.variables.defaults = JSON.stringify(
                JSON.parse(additionalFields.defaults)
              );
            }
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.create_column;
          }
          if (operation === "getAll") {
            const boardId = this.getNodeParameter("boardId", i);
            const body = {
              query: `query ($boardId: [ID!]) {
									boards (ids: $boardId){
										columns {
											id
											title
											type
											settings_str
											archived
										}
									}
								}`,
              variables: {
                page: 1,
                boardId
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.boards[0].columns;
          }
        }
        if (resource === "boardGroup") {
          if (operation === "create") {
            const boardId = this.getNodeParameter("boardId", i);
            const name = this.getNodeParameter("name", i);
            const body = {
              query: `mutation ($boardId: ID!, $groupName: String!) {
									create_group (board_id: $boardId, group_name: $groupName) {
										id
									}
								}`,
              variables: {
                boardId,
                groupName: name
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.create_group;
          }
          if (operation === "delete") {
            const boardId = this.getNodeParameter("boardId", i);
            const groupId = this.getNodeParameter("groupId", i);
            const body = {
              query: `mutation ($boardId: ID!, $groupId: String!) {
									delete_group (board_id: $boardId, group_id: $groupId) {
										id
									}
								}`,
              variables: {
                boardId,
                groupId
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.delete_group;
          }
          if (operation === "getAll") {
            const boardId = this.getNodeParameter("boardId", i);
            const body = {
              query: `query ($boardId: [ID!]) {
									boards (ids: $boardId, ){
										id
										groups {
											id
											title
											color
											position
											archived
										}
									}
								}`,
              variables: {
                boardId
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.boards[0].groups;
          }
        }
        if (resource === "boardItem") {
          if (operation === "addUpdate") {
            const itemId = this.getNodeParameter("itemId", i);
            const value = this.getNodeParameter("value", i);
            const body = {
              query: `mutation ($itemId: ID!, $value: String!) {
									create_update (item_id: $itemId, body: $value) {
										id
									}
								}`,
              variables: {
                itemId,
                value
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.create_update;
          }
          if (operation === "changeColumnValue") {
            const boardId = this.getNodeParameter("boardId", i);
            const itemId = this.getNodeParameter("itemId", i);
            const columnId = this.getNodeParameter("columnId", i);
            const value = this.getNodeParameter("value", i);
            const body = {
              query: `mutation ($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
									change_column_value (board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
										id
									}
								}`,
              variables: {
                boardId,
                itemId,
                columnId
              }
            };
            try {
              JSON.parse(value);
            } catch (error) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Custom Values must be a valid JSON", {
                itemIndex: i
              });
            }
            body.variables.value = JSON.stringify(JSON.parse(value));
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.change_column_value;
          }
          if (operation === "changeMultipleColumnValues") {
            const boardId = this.getNodeParameter("boardId", i);
            const itemId = this.getNodeParameter("itemId", i);
            const columnValues = this.getNodeParameter("columnValues", i);
            const body = {
              query: `mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
									change_multiple_column_values (board_id: $boardId, item_id: $itemId, column_values: $columnValues) {
										id
									}
								}`,
              variables: {
                boardId,
                itemId
              }
            };
            try {
              JSON.parse(columnValues);
            } catch (error) {
              throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Custom Values must be a valid JSON", {
                itemIndex: i
              });
            }
            body.variables.columnValues = JSON.stringify(JSON.parse(columnValues));
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.change_multiple_column_values;
          }
          if (operation === "create") {
            const boardId = this.getNodeParameter("boardId", i);
            const groupId = this.getNodeParameter("groupId", i);
            const itemName = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              query: `mutation ($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON) {
									create_item (board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
										id
									}
								}`,
              variables: {
                boardId,
                groupId,
                itemName
              }
            };
            if (additionalFields.columnValues) {
              try {
                JSON.parse(additionalFields.columnValues);
              } catch (error) {
                throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Custom Values must be a valid JSON", {
                  itemIndex: i
                });
              }
              body.variables.columnValues = JSON.stringify(
                JSON.parse(additionalFields.columnValues)
              );
            }
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.create_item;
          }
          if (operation === "delete") {
            const itemId = this.getNodeParameter("itemId", i);
            const body = {
              query: `mutation ($itemId: ID!) {
									delete_item (item_id: $itemId) {
										id
									}
								}`,
              variables: {
                itemId
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.delete_item;
          }
          if (operation === "get") {
            const itemIds = this.getNodeParameter("itemId", i).split(",");
            const body = {
              query: `query ($itemId: [ID!]){
									items (ids: $itemId) {
										id
										name
										created_at
										state
										column_values {
											id
											text
											type
											value
											column {

												title
												archived
												description
												settings_str
											}
										}
									}
								}`,
              variables: {
                itemId: itemIds
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.items;
          }
          if (operation === "getAll") {
            const boardId = this.getNodeParameter("boardId", i);
            const groupId = this.getNodeParameter("groupId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const fieldsToReturn = `
						{
							id
							name
							created_at
							state
							column_values {
								id
								text
								type
								value
								column {
									title
									archived
									description
									settings_str
								}
							}
						}
						`;
            const body = {
              query: `query ($boardId: [ID!], $groupId: [String], $limit: Int) {
								boards(ids: $boardId) {
									groups(ids: $groupId) {
										id
										items_page(limit: $limit) {
											cursor
											items ${fieldsToReturn}
										}
									}
								}
							}`,
              variables: {
                boardId,
                groupId,
                limit: 100
              }
            };
            if (returnAll) {
              responseData = await import_GenericFunctions.mondayComApiPaginatedRequest.call(
                this,
                "data.boards[0].groups[0].items_page",
                fieldsToReturn,
                body
              );
            } else {
              body.variables.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
              responseData = responseData.data.boards[0].groups[0].items_page.items;
            }
          }
          if (operation === "getByColumnValue") {
            const boardId = this.getNodeParameter("boardId", i);
            const columnId = this.getNodeParameter("columnId", i);
            const columnValue = this.getNodeParameter("columnValue", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            const fieldsToReturn = `{
							id
							name
							created_at
							state
							board {
								id
							}
							column_values {
								id
								text
								type
								value
								column {
									title
									archived
									description
									settings_str
								}
							}
						}`;
            const body = {
              query: `query ($boardId: ID!, $columnId: String!, $columnValue: String!, $limit: Int) {
								items_page_by_column_values(
									limit: $limit
									board_id: $boardId
									columns: [{column_id: $columnId, column_values: [$columnValue]}]
								) {
									cursor
									items ${fieldsToReturn}
								}
							}`,
              variables: {
                boardId,
                columnId,
                columnValue,
                limit: 100
              }
            };
            if (returnAll) {
              responseData = await import_GenericFunctions.mondayComApiPaginatedRequest.call(
                this,
                "data.items_page_by_column_values",
                fieldsToReturn,
                body
              );
            } else {
              body.variables.limit = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
              responseData = responseData.data.items_page_by_column_values.items;
            }
          }
          if (operation === "move") {
            const groupId = this.getNodeParameter("groupId", i);
            const itemId = this.getNodeParameter("itemId", i);
            const body = {
              query: `mutation ($groupId: String!, $itemId: ID!) {
									move_item_to_group (group_id: $groupId, item_id: $itemId) {
										id
									}
								}`,
              variables: {
                groupId,
                itemId
              }
            };
            responseData = await import_GenericFunctions.mondayComApiRequest.call(this, body);
            responseData = responseData.data.move_item_to_group;
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
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
  MondayCom
});
//# sourceMappingURL=MondayCom.node.js.map