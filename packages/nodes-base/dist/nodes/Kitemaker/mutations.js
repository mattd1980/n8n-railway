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
var mutations_exports = {};
__export(mutations_exports, {
  createWorkItem: () => createWorkItem,
  editWorkItem: () => editWorkItem
});
module.exports = __toCommonJS(mutations_exports);
const createWorkItem = `
	mutation($input: CreateWorkItemInput!) {
		createWorkItem(input: $input) {
			workItem {
				id
				number
				title
				description
				status {
					id
					name
				}
				members {
					id
					username
				}
				watchers {
					id
					username
				}
				labels {
					id
					name
				}
				effort
				impact
				updatedAt
				createdAt
			}
		}
	}
`;
const editWorkItem = `
	mutation ($input: EditWorkItemInput!) {
		editWorkItem(input: $input) {
			workItem {
				id
				number
				title
				description
				status {
					id
					name
				}
				members {
					id
					username
				}
				watchers {
					id
					username
				}
				labels {
					id
					name
				}
				effort
				impact
				updatedAt
				createdAt
			}
		}
	}
`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createWorkItem,
  editWorkItem
});
//# sourceMappingURL=mutations.js.map