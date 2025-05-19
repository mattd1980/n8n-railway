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
var Queries_exports = {};
__export(Queries_exports, {
  query: () => query
});
module.exports = __toCommonJS(Queries_exports);
const query = {
  getUsers() {
    return `query Users ($first: Int, $after: String){
			users (first: $first, after: $after){
				nodes {
					id
					name
				},
				pageInfo {
					hasNextPage
					endCursor
			}
		}}`;
  },
  getTeams() {
    return `query Teams ($first: Int, $after: String){
				teams (first: $first, after: $after){
					nodes {
						id
						name
					}
					pageInfo {
						hasNextPage
						endCursor
					}
			}}`;
  },
  getStates() {
    return `query States ($first: Int, $after: String, $filter: WorkflowStateFilter){
				workflowStates (first: $first, after: $after, filter: $filter){
					nodes {
						id
						name
					},
					pageInfo {
						hasNextPage
						endCursor
				}
			}}`;
  },
  createIssue() {
    return `mutation IssueCreate (
			$title: String!,
			$teamId: String!,
			$description: String,
			$assigneeId: String,
			$priorityId: Int,
			$stateId: String){
			issueCreate(
				input: {
					title: $title
					description: $description
					teamId: $teamId
					assigneeId: $assigneeId
					priority: $priorityId
					stateId: $stateId
				}
			) {
				success
					issue {
						id,
						identifier,
						title,
						priority
						archivedAt
						assignee {
							id
							displayName
						}
						state {
							id
							name
						}
						createdAt
						creator {
							id
							displayName
						}
						description
						dueDate
						cycle {
							id
							name
						}
					}
				}
			}`;
  },
  deleteIssue() {
    return `mutation IssueDelete ($issueId: String!) {
					issueDelete(id: $issueId) {
						success
					}
				}`;
  },
  getIssue() {
    return `query Issue($issueId: String!) {
			issue(id: $issueId) {
				id,
				identifier,
				title,
				priority,
				archivedAt,
				assignee {
					id,
					displayName
				}
				state {
					id
					name
				}
				createdAt
				creator {
					id
					displayName
				}
				description
				dueDate
				cycle {
					id
					name
				}
			}
		}`;
  },
  getIssueTeam() {
    return `query Issue($issueId: String!) {
			issue(id: $issueId) {
				team {
					id
				}
			}
		}`;
  },
  getIssues() {
    return `query Issue ($first: Int, $after: String){
					issues (first: $first, after: $after){
						nodes {
						id,
						identifier,
						title,
						priority
						archivedAt
						assignee {
							id
							displayName
						}
						state {
							id
							name
						}
						createdAt
						creator {
							id
							displayName
						}
						description
						dueDate
						cycle {
							id
							name
						}
					}
					pageInfo {
						hasNextPage
						endCursor
					}
				}
			}`;
  },
  updateIssue() {
    return `mutation IssueUpdate (
		$issueId: String!,
		$title: String,
		$teamId: String,
		$description: String,
		$assigneeId: String,
		$priorityId: Int,
		$stateId: String){
		issueUpdate(
			id: $issueId,
			input: {
				title: $title
				description: $description
				teamId: $teamId
				assigneeId: $assigneeId
				priority: $priorityId
				stateId: $stateId
			}
		) {
			success
				issue {
					id,
					identifier,
					title,
					priority
					archivedAt
					assignee {
						id
						displayName
					}
					state {
						id
						name
					}
					createdAt
					creator {
						id
						displayName
					}
					description
					dueDate
					cycle {
						id
						name
					}
				}
			}
		}`;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  query
});
//# sourceMappingURL=Queries.js.map