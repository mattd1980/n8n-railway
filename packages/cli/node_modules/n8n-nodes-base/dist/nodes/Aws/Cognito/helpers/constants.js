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
var constants_exports = {};
__export(constants_exports, {
  ERROR_MESSAGES: () => ERROR_MESSAGES,
  HeaderConstants: () => HeaderConstants
});
module.exports = __toCommonJS(constants_exports);
const HeaderConstants = {
  AUTHORIZATION: "authorization",
  X_MS_CONTINUATION: "x-ms-continuation",
  X_MS_COSMOS_OFFER_AUTOPILOT_SETTING: "x-ms-cosmos-offer-autopilot-setting",
  X_MS_DOCUMENTDB_IS_UPSERT: "x-ms-documentdb-is-upsert",
  X_MS_DOCUMENTDB_PARTITIONKEY: "x-ms-documentdb-partitionkey",
  X_MS_MAX_ITEM_COUNT: "x-ms-max-item-count",
  X_MS_OFFER_THROUGHPUT: "x-ms-offer-throughput"
};
const ERROR_MESSAGES = {
  ResourceNotFound: {
    Group: {
      delete: {
        message: "The group you are trying to delete could not be found.",
        description: 'Adjust the "Group" parameter setting to delete the group correctly.'
      },
      get: {
        message: "The group you are trying to retrieve could not be found.",
        description: 'Adjust the "Group" parameter setting to retrieve the group correctly.'
      },
      update: {
        message: "The group you are trying to update could not be found.",
        description: 'Adjust the "Group" parameter setting to update the group correctly.'
      }
    },
    User: {
      delete: {
        message: "The user are trying to retrieve could not be found.",
        description: 'Adjust the "User" parameter setting to delete the user correctly.'
      },
      get: {
        message: "The user you are trying to retrieve could not be found.",
        description: 'Adjust the "User" parameter setting to retrieve the user correctly.'
      },
      update: {
        message: "The user you are trying to update could not be found.",
        description: 'Adjust the "User" parameter setting to update the user correctly.'
      }
    }
  },
  EntityAlreadyExists: {
    Group: {
      message: "The group you are trying to create already exists.",
      description: 'Adjust the "Group Name" parameter setting to create the group correctly.'
    },
    User: {
      message: "The user you are trying to create already exists.",
      description: 'Adjust the "User Name" parameter setting to create the user correctly.'
    }
  },
  UserGroup: {
    add: {
      message: "The user/group you are trying to add could not be found.",
      description: 'Adjust the "User" and "Group" parameters to add the user to the group correctly.'
    },
    remove: {
      message: "The user/group you are trying to remove could not be found.",
      description: 'Adjust the "User" and "Group" parameters to remove the user from the group correctly.'
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ERROR_MESSAGES,
  HeaderConstants
});
//# sourceMappingURL=constants.js.map