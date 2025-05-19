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
var Matrix_node_exports = {};
__export(Matrix_node_exports, {
  Matrix: () => Matrix
});
module.exports = __toCommonJS(Matrix_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_AccountDescription = require("./AccountDescription");
var import_EventDescription = require("./EventDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_MediaDescription = require("./MediaDescription");
var import_MessageDescription = require("./MessageDescription");
var import_RoomDescription = require("./RoomDescription");
var import_RoomMemberDescription = require("./RoomMemberDescription");
class Matrix {
  constructor() {
    this.description = {
      displayName: "Matrix",
      name: "matrix",
      // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
      icon: "file:matrix.png",
      group: ["output"],
      version: 1,
      description: "Consume Matrix API",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "Matrix"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "matrixApi",
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
              name: "Account",
              value: "account"
            },
            {
              name: "Event",
              value: "event"
            },
            {
              name: "Media",
              value: "media"
            },
            {
              name: "Message",
              value: "message"
            },
            {
              name: "Room",
              value: "room"
            },
            {
              name: "Room Member",
              value: "roomMember"
            }
          ],
          default: "message"
        },
        ...import_AccountDescription.accountOperations,
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields,
        ...import_MediaDescription.mediaOperations,
        ...import_MediaDescription.mediaFields,
        ...import_MessageDescription.messageOperations,
        ...import_MessageDescription.messageFields,
        ...import_RoomDescription.roomOperations,
        ...import_RoomDescription.roomFields,
        ...import_RoomMemberDescription.roomMemberOperations,
        ...import_RoomMemberDescription.roomMemberFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getChannels() {
          const returnData = [];
          const joinedRoomsResponse = await import_GenericFunctions.matrixApiRequest.call(this, "GET", "/joined_rooms");
          await Promise.all(
            joinedRoomsResponse.joined_rooms.map(async (roomId) => {
              try {
                const roomNameResponse = await import_GenericFunctions.matrixApiRequest.call(
                  this,
                  "GET",
                  `/rooms/${roomId}/state/m.room.name`
                );
                returnData.push({
                  name: roomNameResponse.name,
                  value: roomId
                });
              } catch (error) {
                returnData.push({
                  name: `Unknown: ${roomId}`,
                  value: roomId
                });
              }
            })
          );
          returnData.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        const responseData = await import_GenericFunctions.handleMatrixCall.call(this, i, resource, operation);
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
  Matrix
});
//# sourceMappingURL=Matrix.node.js.map