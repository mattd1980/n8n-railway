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
var Gitlab_node_exports = {};
__export(Gitlab_node_exports, {
  Gitlab: () => Gitlab
});
module.exports = __toCommonJS(Gitlab_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class Gitlab {
  constructor() {
    this.description = {
      displayName: "GitLab",
      name: "gitlab",
      icon: "file:gitlab.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Retrieve data from GitLab API",
      defaults: {
        name: "GitLab"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "gitlabApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          name: "gitlabOAuth2Api",
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
              name: "File",
              value: "file"
            },
            {
              name: "Issue",
              value: "issue"
            },
            {
              name: "Release",
              value: "release"
            },
            {
              name: "Repository",
              value: "repository"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "issue"
        },
        // ----------------------------------
        //         operations
        // ----------------------------------
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["issue"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              description: "Create a new issue",
              action: "Create an issue"
            },
            {
              name: "Create Comment",
              value: "createComment",
              description: "Create a new comment on an issue",
              action: "Create a comment on an issue"
            },
            {
              name: "Edit",
              value: "edit",
              description: "Edit an issue",
              action: "Edit an issue"
            },
            {
              name: "Get",
              value: "get",
              description: "Get the data of a single issue",
              action: "Get an issue"
            },
            {
              name: "Lock",
              value: "lock",
              description: "Lock an issue",
              action: "Lock an issue"
            }
          ],
          default: "create"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["repository"]
            }
          },
          options: [
            {
              name: "Get",
              value: "get",
              description: "Get the data of a single repository",
              action: "Get a repository"
            },
            {
              name: "Get Issues",
              value: "getIssues",
              description: "Returns issues of a repository",
              action: "Get issues of a repository"
            }
          ],
          default: "getIssues"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["user"]
            }
          },
          options: [
            {
              name: "Get Repositories",
              value: "getRepositories",
              description: "Returns the repositories of a user",
              action: "Get a user's repositories"
            }
          ],
          default: "getRepositories"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["release"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              description: "Create a new release",
              action: "Create a release"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a release",
              action: "Delete a release"
            },
            {
              name: "Get",
              value: "get",
              description: "Get a release",
              action: "Get a release"
            },
            {
              name: "Get Many",
              value: "getAll",
              description: "Get many releases",
              action: "Get many releases"
            },
            {
              name: "Update",
              value: "update",
              description: "Update a release",
              action: "Update a release"
            }
          ],
          default: "create"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["file"]
            }
          },
          options: [
            {
              name: "Create",
              value: "create",
              description: "Create a new file in repository",
              action: "Create a file"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete a file in repository",
              action: "Delete a file"
            },
            {
              name: "Edit",
              value: "edit",
              description: "Edit a file in repository",
              action: "Edit a file"
            },
            {
              name: "Get",
              value: "get",
              description: "Get the data of a single file",
              action: "Get a file"
            },
            {
              name: "List",
              value: "list",
              description: "List contents of a folder",
              action: "List files"
            }
          ],
          default: "create"
        },
        // ----------------------------------
        //         shared
        // ----------------------------------
        {
          displayName: "Project Owner",
          name: "owner",
          type: "string",
          default: "",
          required: true,
          placeholder: "n8n-io",
          description: "User, group or namespace of the project"
        },
        {
          displayName: "Project Name",
          name: "repository",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            hide: {
              resource: ["user"],
              operation: ["getRepositories"]
            }
          },
          placeholder: "n8n",
          description: "The name of the project"
        },
        // ----------------------------------
        //         issue
        // ----------------------------------
        // ----------------------------------
        //         issue:create
        // ----------------------------------
        {
          displayName: "Title",
          name: "title",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["issue"]
            }
          },
          description: "The title of the issue"
        },
        {
          displayName: "Body",
          name: "body",
          type: "string",
          typeOptions: {
            rows: 5
          },
          default: "",
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["issue"]
            }
          },
          description: "The body of the issue"
        },
        {
          displayName: "Due Date",
          name: "due_date",
          type: "dateTime",
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["issue"]
            }
          },
          default: "",
          description: "Due Date for issue"
        },
        {
          displayName: "Labels",
          name: "labels",
          type: "collection",
          typeOptions: {
            multipleValues: true,
            multipleValueButtonText: "Add Label"
          },
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["issue"]
            }
          },
          default: { label: "" },
          options: [
            {
              displayName: "Label",
              name: "label",
              type: "string",
              default: "",
              description: "Label to add to issue"
            }
          ]
        },
        {
          displayName: "Assignees",
          name: "assignee_ids",
          type: "collection",
          typeOptions: {
            multipleValues: true,
            multipleValueButtonText: "Add Assignee"
          },
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["issue"]
            }
          },
          default: { assignee: "" },
          options: [
            {
              displayName: "Assignee",
              name: "assignee",
              type: "number",
              default: 0,
              description: "User ID to assign issue to"
            }
          ]
        },
        // ----------------------------------
        //         issue:createComment
        // ----------------------------------
        {
          displayName: "Issue Number",
          name: "issueNumber",
          type: "number",
          default: 0,
          required: true,
          displayOptions: {
            show: {
              operation: ["createComment"],
              resource: ["issue"]
            }
          },
          description: "The number of the issue on which to create the comment on"
        },
        {
          displayName: "Body",
          name: "body",
          type: "string",
          typeOptions: {
            rows: 5
          },
          displayOptions: {
            show: {
              operation: ["createComment"],
              resource: ["issue"]
            }
          },
          default: "",
          description: "The body of the comment"
        },
        // ----------------------------------
        //         issue:edit
        // ----------------------------------
        {
          displayName: "Issue Number",
          name: "issueNumber",
          type: "number",
          default: 0,
          required: true,
          displayOptions: {
            show: {
              operation: ["edit"],
              resource: ["issue"]
            }
          },
          description: "The number of the issue edit"
        },
        {
          displayName: "Edit Fields",
          name: "editFields",
          type: "collection",
          typeOptions: {
            multipleValueButtonText: "Add Field"
          },
          displayOptions: {
            show: {
              operation: ["edit"],
              resource: ["issue"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Title",
              name: "title",
              type: "string",
              default: "",
              description: "The title of the issue"
            },
            {
              displayName: "Body",
              name: "description",
              type: "string",
              typeOptions: {
                rows: 5
              },
              default: "",
              description: "The body of the issue"
            },
            {
              displayName: "State",
              name: "state",
              type: "options",
              options: [
                {
                  name: "Closed",
                  value: "closed",
                  description: 'Set the state to "closed"'
                },
                {
                  name: "Open",
                  value: "open",
                  description: 'Set the state to "open"'
                }
              ],
              default: "open",
              description: "The state to set"
            },
            {
              displayName: "Labels",
              name: "labels",
              type: "collection",
              typeOptions: {
                multipleValues: true,
                multipleValueButtonText: "Add Label"
              },
              default: { label: "" },
              options: [
                {
                  displayName: "Label",
                  name: "label",
                  type: "string",
                  default: "",
                  description: "Label to add to issue"
                }
              ]
            },
            {
              displayName: "Assignees",
              name: "assignee_ids",
              type: "collection",
              typeOptions: {
                multipleValues: true,
                multipleValueButtonText: "Add Assignee"
              },
              default: { assignee: "" },
              options: [
                {
                  displayName: "Assignees",
                  name: "assignee",
                  type: "string",
                  default: "",
                  description: "User to assign issue too"
                }
              ]
            },
            {
              displayName: "Due Date",
              name: "due_date",
              type: "dateTime",
              default: "",
              description: "Due Date for issue"
            }
          ]
        },
        // ----------------------------------
        //         issue:get
        // ----------------------------------
        {
          displayName: "Issue Number",
          name: "issueNumber",
          type: "number",
          default: 0,
          required: true,
          displayOptions: {
            show: {
              operation: ["get"],
              resource: ["issue"]
            }
          },
          description: "The number of the issue get data of"
        },
        // ----------------------------------
        //         issue:lock
        // ----------------------------------
        {
          displayName: "Issue Number",
          name: "issueNumber",
          type: "number",
          default: 0,
          required: true,
          displayOptions: {
            show: {
              operation: ["lock"],
              resource: ["issue"]
            }
          },
          description: "The number of the issue to lock"
        },
        {
          displayName: "Lock Reason",
          name: "lockReason",
          type: "options",
          displayOptions: {
            show: {
              operation: ["lock"],
              resource: ["issue"]
            }
          },
          options: [
            {
              name: "Off-Topic",
              value: "off-topic",
              description: "The issue is Off-Topic"
            },
            {
              name: "Too Heated",
              value: "too heated",
              description: "The discussion is too heated"
            },
            {
              name: "Resolved",
              value: "resolved",
              description: "The issue got resolved"
            },
            {
              name: "Spam",
              value: "spam",
              description: "The issue is spam"
            }
          ],
          default: "resolved",
          description: "The reason to lock the issue"
        },
        // ----------------------------------
        //         release
        // ----------------------------------
        // ----------------------------------
        //         release:create
        // ----------------------------------
        {
          displayName: "Tag",
          name: "releaseTag",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["release"]
            }
          },
          description: "The tag of the release"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          typeOptions: {
            multipleValueButtonText: "Add Field"
          },
          displayOptions: {
            show: {
              operation: ["create"],
              resource: ["release"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Name",
              name: "name",
              type: "string",
              default: "",
              description: "The name of the release"
            },
            {
              displayName: "Description",
              name: "description",
              type: "string",
              typeOptions: {
                rows: 5
              },
              default: "",
              description: "The description of the release"
            },
            {
              displayName: "Ref",
              name: "ref",
              type: "string",
              default: "",
              description: "If Tag doesn\u2019t exist, the release will be created from Ref. It can be a commit SHA, another tag name, or a branch name."
            }
          ]
        },
        // ----------------------------------
        //         release:get/delete
        // ----------------------------------
        {
          displayName: "Project ID",
          name: "projectId",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["delete", "get"],
              resource: ["release"]
            }
          },
          description: "The ID or URL-encoded path of the project"
        },
        {
          displayName: "Tag Name",
          name: "tag_name",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["delete", "get"],
              resource: ["release"]
            }
          },
          description: "The Git tag the release is associated with"
        },
        // ----------------------------------
        //         release:getAll
        // ----------------------------------
        {
          displayName: "Project ID",
          name: "projectId",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["getAll"],
              resource: ["release"]
            }
          },
          description: "The ID or URL-encoded path of the project"
        },
        {
          displayName: "Return All",
          name: "returnAll",
          type: "boolean",
          displayOptions: {
            show: {
              resource: ["release", "file", "repository"],
              operation: ["getAll", "list", "getIssues"]
            }
          },
          default: false,
          description: "Whether to return all results or only up to a given limit"
        },
        {
          displayName: "Limit",
          name: "limit",
          type: "number",
          displayOptions: {
            show: {
              resource: ["release", "file", "repository"],
              operation: ["getAll", "list", "getIssues"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 100
          },
          default: 20,
          description: "Max number of results to return"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          typeOptions: {
            multipleValueButtonText: "Add Field"
          },
          displayOptions: {
            show: {
              operation: ["getAll"],
              resource: ["release"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Order By",
              name: "order_by",
              type: "options",
              options: [
                {
                  name: "Created At",
                  value: "created_at"
                },
                {
                  name: "Released At",
                  value: "released_at"
                }
              ],
              default: "released_at",
              description: "The field to use as order"
            },
            {
              displayName: "Sort",
              name: "sort",
              type: "options",
              options: [
                {
                  name: "ASC",
                  value: "asc"
                },
                {
                  name: "DESC",
                  value: "desc"
                }
              ],
              default: "desc",
              description: "The direction of the order. ."
            }
          ]
        },
        // ----------------------------------
        //         release:update
        // ----------------------------------
        {
          displayName: "Project ID",
          name: "projectId",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["update"],
              resource: ["release"]
            }
          },
          description: "The ID or URL-encoded path of the project"
        },
        {
          displayName: "Tag Name",
          name: "tag_name",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["update"],
              resource: ["release"]
            }
          },
          description: "The Git tag the release is associated with"
        },
        {
          displayName: "Additional Fields",
          name: "additionalFields",
          type: "collection",
          typeOptions: {
            multipleValueButtonText: "Add Field"
          },
          displayOptions: {
            show: {
              operation: ["update"],
              resource: ["release"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Name",
              name: "name",
              type: "string",
              default: "",
              description: "The release name"
            },
            {
              displayName: "Description",
              name: "description",
              type: "string",
              default: "",
              description: "The description of the release. You can use Markdown."
            },
            {
              displayName: "Milestones",
              name: "milestones",
              type: "string",
              default: "",
              description: "The title of each milestone to associate with the release (provide a titles list spearated with comma)"
            },
            {
              displayName: "Released At",
              name: "released_at",
              type: "dateTime",
              default: "",
              description: "The date when the release is/was ready"
            }
          ]
        },
        // ----------------------------------
        //         repository
        // ----------------------------------
        // ----------------------------------
        //         repository:getIssues
        // ----------------------------------
        {
          displayName: "Filters",
          name: "getRepositoryIssuesFilters",
          type: "collection",
          typeOptions: {
            multipleValueButtonText: "Add Filter"
          },
          displayOptions: {
            show: {
              operation: ["getIssues"],
              resource: ["repository"]
            }
          },
          default: {},
          options: [
            {
              displayName: "Assignee",
              name: "assignee_username",
              type: "string",
              default: "",
              description: "Return only issues which are assigned to a specific user"
            },
            {
              displayName: "Creator",
              name: "author_username",
              type: "string",
              default: "",
              description: "Return only issues which were created by a specific user"
            },
            {
              displayName: "Search",
              name: "search",
              type: "string",
              default: "",
              description: "Search issues against their title and description"
            },
            {
              displayName: "Labels",
              name: "labels",
              type: "string",
              default: "",
              description: "Return only issues with the given labels. Multiple lables can be separated by comma."
            },
            {
              displayName: "Updated After",
              name: "updated_after",
              type: "dateTime",
              default: "",
              description: "Return only issues updated at or after this time"
            },
            {
              displayName: "State",
              name: "state",
              type: "options",
              options: [
                {
                  name: "All",
                  value: "",
                  description: "Returns issues with any state"
                },
                {
                  name: "Closed",
                  value: "closed",
                  description: 'Return issues with "closed" state'
                },
                {
                  name: "Open",
                  value: "opened",
                  description: 'Return issues with "open" state'
                }
              ],
              default: "opened",
              description: "The state to filter by"
            },
            {
              displayName: "Sort",
              name: "order_by",
              type: "options",
              options: [
                {
                  name: "Created At",
                  value: "created_at",
                  description: "Sort by created date"
                },
                {
                  name: "Updated At",
                  value: "updated_at",
                  description: "Sort by updated date"
                },
                {
                  name: "Priority",
                  value: "priority",
                  description: "Sort by priority"
                }
              ],
              default: "created_at",
              description: "The order the issues should be returned in"
            },
            {
              displayName: "Direction",
              name: "sort",
              type: "options",
              options: [
                {
                  name: "Ascending",
                  value: "asc",
                  description: "Sort in ascending order"
                },
                {
                  name: "Descending",
                  value: "desc",
                  description: "Sort in descending order"
                }
              ],
              default: "desc",
              description: "The sort order"
            }
          ]
        },
        // ----------------------------------
        //         file
        // ----------------------------------
        // ----------------------------------
        //         file:create/delete/edit/get
        // ----------------------------------
        {
          displayName: "File Path",
          name: "filePath",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              resource: ["file"]
            },
            hide: {
              operation: ["list"]
            }
          },
          placeholder: "docs/README.md",
          description: "The file path of the file. Has to contain the full path or leave it empty for root folder."
        },
        // ----------------------------------
        //         file:list
        // ----------------------------------
        {
          displayName: "Path",
          name: "filePath",
          type: "string",
          default: "",
          displayOptions: {
            show: {
              resource: ["file"],
              operation: ["list"]
            }
          },
          placeholder: "docs/",
          description: "The path of the folder to list"
        },
        {
          displayName: "Page",
          name: "page",
          type: "number",
          displayOptions: {
            show: {
              resource: ["file"],
              operation: ["list"],
              returnAll: [false]
            }
          },
          typeOptions: {
            minValue: 1,
            maxValue: 1e3
          },
          default: 1,
          description: "Page of results to display"
        },
        {
          displayName: "Additional Parameters",
          name: "additionalParameters",
          placeholder: "Add Parameter",
          description: "Additional fields to add",
          type: "collection",
          default: {},
          displayOptions: {
            show: {
              resource: ["file"],
              operation: ["list"]
            }
          },
          options: [
            {
              displayName: "Reference",
              name: "ref",
              type: "string",
              default: "",
              placeholder: "main",
              description: "The name of the commit/branch/tag. Default: the repository\u2019s default branch (usually main)."
            },
            {
              displayName: "Recursive",
              name: "recursive",
              type: "boolean",
              default: false,
              description: "Whether or not to get a recursive file tree. Default is false."
            }
          ]
        },
        // ----------------------------------
        //         file:get
        // ----------------------------------
        {
          displayName: "As Binary Property",
          name: "asBinaryProperty",
          type: "boolean",
          default: true,
          displayOptions: {
            show: {
              operation: ["get"],
              resource: ["file"]
            }
          },
          description: "Whether to set the data of the file as binary property instead of returning the raw API response"
        },
        {
          displayName: "Put Output File in Field",
          name: "binaryPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              asBinaryProperty: [true],
              operation: ["get"],
              resource: ["file"]
            }
          },
          placeholder: "",
          hint: "The name of the output binary field to put the file in"
        },
        {
          displayName: "Additional Parameters",
          name: "additionalParameters",
          placeholder: "Add Parameter",
          description: "Additional fields to add",
          type: "collection",
          default: {},
          displayOptions: {
            show: {
              operation: ["get"],
              resource: ["file"]
            }
          },
          options: [
            {
              displayName: "Reference",
              name: "reference",
              type: "string",
              default: "",
              placeholder: "main",
              description: "The name of the commit/branch/tag. Default: the repository\u2019s default branch (usually main)."
            }
          ]
        },
        // ----------------------------------
        //         file:create/edit
        // ----------------------------------
        {
          displayName: "Binary File",
          name: "binaryData",
          type: "boolean",
          default: false,
          required: true,
          displayOptions: {
            show: {
              operation: ["create", "edit"],
              resource: ["file"]
            }
          },
          description: "Whether the data to upload should be taken from binary field"
        },
        {
          displayName: "File Content",
          name: "fileContent",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              binaryData: [false],
              operation: ["create", "edit"],
              resource: ["file"]
            }
          },
          placeholder: "",
          description: "The text content of the file"
        },
        {
          displayName: "Input Binary Field",
          name: "binaryPropertyName",
          type: "string",
          default: "data",
          required: true,
          displayOptions: {
            show: {
              binaryData: [true],
              operation: ["create", "edit"],
              resource: ["file"]
            }
          },
          placeholder: "",
          hint: "The name of the input binary field containing the file to be written"
        },
        {
          displayName: "Commit Message",
          name: "commitMessage",
          type: "string",
          default: "",
          required: true,
          displayOptions: {
            show: {
              operation: ["create", "delete", "edit"],
              resource: ["file"]
            }
          }
        },
        {
          displayName: "Branch",
          name: "branch",
          type: "string",
          default: "",
          description: "Name of the new branch to create. The commit is added to this branch.",
          required: true,
          displayOptions: {
            show: {
              operation: ["create", "delete", "edit"],
              resource: ["file"]
            }
          }
        },
        {
          displayName: "Additional Parameters",
          name: "additionalParameters",
          placeholder: "Add Parameter",
          description: "Additional fields to add",
          type: "fixedCollection",
          default: {},
          displayOptions: {
            show: {
              operation: ["create", "delete", "edit"],
              resource: ["file"]
            }
          },
          options: [
            {
              displayName: "Start Branch",
              name: "branchStart",
              values: [
                {
                  displayName: "Start Branch",
                  name: "branchStart",
                  type: "string",
                  default: "",
                  description: "Name of the base branch to create the new branch from"
                }
              ]
            },
            {
              name: "author",
              displayName: "Author",
              values: [
                {
                  displayName: "Name",
                  name: "name",
                  type: "string",
                  default: "",
                  description: "The name of the author of the commit"
                },
                {
                  displayName: "Email",
                  name: "email",
                  type: "string",
                  placeholder: "name@email.com",
                  default: "",
                  description: "The email of the author of the commit"
                }
              ]
            },
            {
              name: "encoding",
              displayName: "Encoding",
              values: [
                {
                  displayName: "Encoding",
                  name: "encoding",
                  type: "string",
                  default: "text",
                  description: "Change encoding to base64. Default is text."
                }
              ]
            }
          ]
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const overwriteDataOperations = [
      "file:get",
      "file:create",
      "file:edit",
      "file:delete",
      "issue:create",
      "issue:createComment",
      "issue:edit",
      "issue:get",
      "release:create",
      "release:delete",
      "release:get",
      "release:update",
      "repository:get"
    ];
    const overwriteDataOperationsArray = [
      "file:list",
      "release:getAll",
      "repository:getIssues",
      "user:getRepositories"
    ];
    let responseData;
    let body;
    let qs;
    let requestMethod;
    let endpoint;
    let returnAll = false;
    const operation = this.getNodeParameter("operation", 0);
    const resource = this.getNodeParameter("resource", 0);
    const fullOperation = `${resource}:${operation}`;
    for (let i = 0; i < items.length; i++) {
      try {
        requestMethod = "GET";
        endpoint = "";
        body = {};
        qs = {};
        let owner = this.getNodeParameter("owner", i);
        owner = owner.replace(new RegExp(/\//g), "%2F");
        let repository = "";
        if (fullOperation !== "user:getRepositories") {
          repository = this.getNodeParameter("repository", i);
        }
        const baseEndpoint = `/projects/${owner}%2F${repository}`;
        if (resource === "issue") {
          if (operation === "create") {
            requestMethod = "POST";
            body.title = this.getNodeParameter("title", i);
            body.description = this.getNodeParameter("body", i);
            body.due_date = this.getNodeParameter("due_date", i);
            const labels = this.getNodeParameter("labels", i);
            const assigneeIds = this.getNodeParameter("assignee_ids", i);
            body.labels = labels.map((data) => data.label).join(",");
            body.assignee_ids = assigneeIds.map((data) => data.assignee);
            endpoint = `${baseEndpoint}/issues`;
          } else if (operation === "createComment") {
            requestMethod = "POST";
            const issueNumber = this.getNodeParameter("issueNumber", i);
            body.body = this.getNodeParameter("body", i);
            endpoint = `${baseEndpoint}/issues/${issueNumber}/notes`;
          } else if (operation === "edit") {
            requestMethod = "PUT";
            const issueNumber = this.getNodeParameter("issueNumber", i);
            body = this.getNodeParameter("editFields", i, {});
            if (body.labels !== void 0) {
              body.labels = body.labels.map((data) => data.label).join(",");
            }
            if (body.assignee_ids !== void 0) {
              body.assignee_ids = body.assignee_ids.map((data) => data.assignee);
            }
            endpoint = `${baseEndpoint}/issues/${issueNumber}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const issueNumber = this.getNodeParameter("issueNumber", i);
            endpoint = `${baseEndpoint}/issues/${issueNumber}`;
          } else if (operation === "lock") {
            requestMethod = "PUT";
            const issueNumber = this.getNodeParameter("issueNumber", i);
            body.discussion_locked = true;
            endpoint = `${baseEndpoint}/issues/${issueNumber}`;
          }
        } else if (resource === "release") {
          if (operation === "create") {
            requestMethod = "POST";
            body = this.getNodeParameter("additionalFields", i, {});
            body.tag_name = this.getNodeParameter("releaseTag", i);
            endpoint = `${baseEndpoint}/releases`;
          }
          if (operation === "delete") {
            requestMethod = "DELETE";
            const id = this.getNodeParameter("projectId", i);
            const tagName = this.getNodeParameter("tag_name", i);
            endpoint = `/projects/${id}/releases/${tagName}`;
          }
          if (operation === "get") {
            requestMethod = "GET";
            const id = this.getNodeParameter("projectId", i);
            const tagName = this.getNodeParameter("tag_name", i);
            endpoint = `/projects/${id}/releases/${tagName}`;
          }
          if (operation === "getAll") {
            requestMethod = "GET";
            const id = this.getNodeParameter("projectId", i);
            qs = this.getNodeParameter("additionalFields", i, {});
            returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              qs.per_page = this.getNodeParameter("limit", 0);
            }
            endpoint = `/projects/${id}/releases`;
          }
          if (operation === "update") {
            requestMethod = "PUT";
            const id = this.getNodeParameter("projectId", i);
            const tagName = this.getNodeParameter("tag_name", i);
            body = this.getNodeParameter("additionalFields", i, {});
            if (body.milestones) {
              body.milestones = body.milestones.split(",");
            }
            endpoint = `/projects/${id}/releases/${tagName}`;
          }
        } else if (resource === "repository") {
          if (operation === "get") {
            requestMethod = "GET";
            endpoint = `${baseEndpoint}`;
          } else if (operation === "getIssues") {
            requestMethod = "GET";
            qs = this.getNodeParameter("getRepositoryIssuesFilters", i);
            returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              qs.per_page = this.getNodeParameter("limit", 0);
            }
            endpoint = `${baseEndpoint}/issues`;
          }
        } else if (resource === "user") {
          if (operation === "getRepositories") {
            requestMethod = "GET";
            endpoint = `/users/${owner}/projects`;
          }
        } else if (resource === "file") {
          if (["create", "edit"].includes(operation)) {
            requestMethod = operation === "create" ? "POST" : "PUT";
            const filePath = this.getNodeParameter("filePath", i);
            const additionalParameters = this.getNodeParameter(
              "additionalParameters",
              i
            );
            body.branch = this.getNodeParameter("branch", i);
            body.commit_message = this.getNodeParameter("commitMessage", i);
            if (additionalParameters.author) {
              const author = additionalParameters.author;
              if (author.name) {
                body.author_name = author.name;
              }
              if (author.email) {
                body.author_email = author.email;
              }
            }
            if (additionalParameters.branchStart && additionalParameters.branchStart.branchStart) {
              body.start_branch = additionalParameters.branchStart.branchStart;
            }
            if (this.getNodeParameter("binaryData", i)) {
              const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
              const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
              body.content = binaryData.data;
              body.encoding = "base64";
            } else {
              if (additionalParameters.encoding === "base64") {
                body.content = Buffer.from(
                  this.getNodeParameter("fileContent", i)
                ).toString("base64");
              } else {
                body.content = this.getNodeParameter("fileContent", i);
              }
            }
            endpoint = `${baseEndpoint}/repository/files/${encodeURIComponent(filePath)}`;
          } else if (operation === "delete") {
            requestMethod = "DELETE";
            const additionalParameters = this.getNodeParameter(
              "additionalParameters",
              i,
              {}
            );
            if (additionalParameters.author) {
              const author = additionalParameters.author;
              if (author.name) {
                body.author_name = author.name;
              }
              if (author.email) {
                body.author_email = author.email;
              }
            }
            body.branch = this.getNodeParameter("branch", i);
            body.commit_message = this.getNodeParameter("commitMessage", i);
            const filePath = this.getNodeParameter("filePath", i);
            endpoint = `${baseEndpoint}/repository/files/${encodeURIComponent(filePath)}`;
          } else if (operation === "get") {
            requestMethod = "GET";
            const filePath = this.getNodeParameter("filePath", i);
            const additionalParameters = this.getNodeParameter(
              "additionalParameters",
              i
            );
            if (additionalParameters.reference) {
              qs.ref = additionalParameters.reference;
            } else {
              qs.ref = "master";
            }
            endpoint = `${baseEndpoint}/repository/files/${encodeURIComponent(filePath)}`;
          } else if (operation === "list") {
            requestMethod = "GET";
            const filePath = this.getNodeParameter("filePath", i);
            qs = this.getNodeParameter("additionalParameters", i, {});
            returnAll = this.getNodeParameter("returnAll", i);
            if (!returnAll) {
              qs.per_page = this.getNodeParameter("limit", i);
              qs.page = this.getNodeParameter("page", i);
            }
            if (filePath) {
              qs.path = filePath;
            }
            endpoint = `${baseEndpoint}/repository/tree`;
          }
        } else {
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: i
          });
        }
        const asBinaryProperty = this.getNodeParameter("asBinaryProperty", i, false);
        if (returnAll) {
          responseData = await import_GenericFunctions.gitlabApiRequestAllItems.call(
            this,
            requestMethod,
            endpoint,
            body,
            qs
          );
        } else {
          responseData = await import_GenericFunctions.gitlabApiRequest.call(this, requestMethod, endpoint, body, qs);
        }
        if (fullOperation === "file:get" && asBinaryProperty) {
          if (Array.isArray(responseData) && responseData.length > 1) {
            throw new import_n8n_workflow.NodeOperationError(this.getNode(), "File Path is a folder, not a file.", {
              itemIndex: i
            });
          }
          const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
          const newItem = {
            json: items[i].json,
            binary: {}
          };
          if (items[i].binary !== void 0) {
            Object.assign(newItem.binary, items[i].binary);
          }
          const { content, path } = responseData;
          newItem.binary[binaryPropertyName] = await this.helpers.prepareBinaryData(
            Buffer.from(content, "base64"),
            path
          );
          items[i] = newItem;
          return [items];
        }
        if (overwriteDataOperations.includes(fullOperation) || overwriteDataOperationsArray.includes(fullOperation)) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray(responseData),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          if (overwriteDataOperations.includes(fullOperation) || overwriteDataOperationsArray.includes(fullOperation)) {
            const executionErrorData = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData: { item: i } }
            );
            returnData.push(...executionErrorData);
          } else {
            items[i].json = { error: error.message };
          }
          continue;
        }
        throw error;
      }
    }
    if (overwriteDataOperations.includes(fullOperation) || overwriteDataOperationsArray.includes(fullOperation)) {
      return [returnData];
    } else {
      return [items];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Gitlab
});
//# sourceMappingURL=Gitlab.node.js.map