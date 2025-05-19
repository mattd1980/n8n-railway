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
var queries_exports = {};
__export(queries_exports, {
  getAllSpaces: () => getAllSpaces,
  getAllUsers: () => getAllUsers,
  getAllWorkItems: () => getAllWorkItems,
  getLabels: () => getLabels,
  getOrganization: () => getOrganization,
  getSpaces: () => getSpaces,
  getStatuses: () => getStatuses,
  getUsers: () => getUsers,
  getWorkItem: () => getWorkItem,
  getWorkItems: () => getWorkItems
});
module.exports = __toCommonJS(queries_exports);
const getAllSpaces = `
	query {
		organization {
			spaces {
				id
				name
				labels {
					id
					name
					color
				}
				statuses {
					id
					name
					type
					default
				}
			}
		}
	}
`;
const getAllUsers = `
	query {
		organization {
			users {
				id
				username
			}
		}
	}
`;
const getLabels = `
	query {
		organization {
			spaces {
				labels {
					id
					name
					color
				}
			}
		}
	}
`;
const getOrganization = `
	query {
		organization {
			id
			name
		}
	}
`;
const getSpaces = `
	query {
		organization {
			spaces {
				id
				name
				labels {
					id
					name
					color
				}
				statuses {
					id
					name
					type
					default
				}
			}
		}
	}
`;
const getStatuses = `
	query {
		organization {
			spaces {
				id
				statuses {
					id
					name
					type
					default
				}
			}
		}
	}
`;
const getUsers = `
	query {
		organization {
			users {
				id
				username
			}
		}
	}
`;
const getWorkItems = `
	query($spaceId: ID!) {
		workItems(spaceId: $spaceId) {
			workItems {
				id
				title
			}
		}
	}
`;
const getWorkItem = `
	query($workItemId: ID!) {
		workItem(id: $workItemId) {
			id
			number
			title
			description
			status {
				id
				name
			}
			sort
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
			comments {
				id
				actor {
					__typename
				}
				body
				threadId
				updatedAt
				createdAt
			}
			effort
			impact
			updatedAt
			createdAt
		}
	}
`;
const getAllWorkItems = `
	query($spaceId: ID!, $cursor: String) {
		workItems(spaceId: $spaceId, cursor: $cursor) {
			hasMore,
			cursor,
			workItems {
				id
				title
				description
				labels {
					id
				}
				comments {
					id
					body
					actor {
						... on User {
							id
							username
						}
						... on IntegrationUser {
							id
							externalName
						}
						... on Integration {
							id
							type
						}
						... on Application {
							id
							name
						}
					}
				}
			}
		}
	}
`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllSpaces,
  getAllUsers,
  getAllWorkItems,
  getLabels,
  getOrganization,
  getSpaces,
  getStatuses,
  getUsers,
  getWorkItem,
  getWorkItems
});
//# sourceMappingURL=queries.js.map