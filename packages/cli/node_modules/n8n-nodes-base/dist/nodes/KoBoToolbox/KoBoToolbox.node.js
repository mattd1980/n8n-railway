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
var KoBoToolbox_node_exports = {};
__export(KoBoToolbox_node_exports, {
  KoBoToolbox: () => KoBoToolbox
});
module.exports = __toCommonJS(KoBoToolbox_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_FileDescription = require("./FileDescription");
var import_FormDescription = require("./FormDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_HookDescription = require("./HookDescription");
var import_SubmissionDescription = require("./SubmissionDescription");
class KoBoToolbox {
  constructor() {
    this.description = {
      displayName: "KoBoToolbox",
      name: "koBoToolbox",
      icon: "file:koBoToolbox.svg",
      group: ["transform"],
      version: 1,
      description: "Work with KoBoToolbox forms and submissions",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "KoBoToolbox"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "koBoToolboxApi",
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
              name: "File",
              value: "file"
            },
            {
              name: "Form",
              value: "form"
            },
            {
              name: "Hook",
              value: "hook"
            },
            {
              name: "Submission",
              value: "submission"
            }
          ],
          default: "submission",
          required: true
        },
        ...import_FormDescription.formOperations,
        ...import_FormDescription.formFields,
        ...import_HookDescription.hookOperations,
        ...import_HookDescription.hookFields,
        ...import_SubmissionDescription.submissionOperations,
        ...import_SubmissionDescription.submissionFields,
        ...import_FileDescription.fileOperations,
        ...import_FileDescription.fileFields
      ]
    };
    this.methods = {
      loadOptions: {
        loadForms: import_GenericFunctions.loadForms
      }
    };
  }
  async execute() {
    let responseData;
    let returnData = [];
    const binaryItems = [];
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      if (resource === "form") {
        if (operation === "get") {
          const formId = this.getNodeParameter("formId", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              url: `/api/v2/assets/${formId}`
            })
          ];
        }
        if (operation === "getAll") {
          const formQueryOptions = this.getNodeParameter("options", i);
          const formFilterOptions = this.getNodeParameter("filters", i);
          responseData = await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
            url: "/api/v2/assets/",
            qs: {
              limit: this.getNodeParameter("limit", i, 1e3),
              ...formFilterOptions.filter && { q: formFilterOptions.filter },
              ...formQueryOptions?.sort?.value?.ordering && {
                ordering: (formQueryOptions?.sort?.value?.descending ? "-" : "") + formQueryOptions?.sort?.value?.ordering
              }
            },
            scroll: this.getNodeParameter("returnAll", i)
          });
        }
        if (operation === "redeploy") {
          const formId = this.getNodeParameter("formId", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              method: "PATCH",
              url: `/api/v2/assets/${formId}/deployment/`
            })
          ];
        }
      }
      if (resource === "submission") {
        const formId = this.getNodeParameter("formId", i);
        if (operation === "getAll") {
          const submissionQueryOptions = this.getNodeParameter("options", i);
          const filterJson = this.getNodeParameter("filterJson", i, null);
          responseData = await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
            url: `/api/v2/assets/${formId}/data/`,
            qs: {
              limit: this.getNodeParameter("limit", i, 1e3),
              ...filterJson && { query: filterJson },
              ...submissionQueryOptions.sort && { sort: submissionQueryOptions.sort },
              ...submissionQueryOptions.fields && {
                fields: JSON.stringify((0, import_GenericFunctions.parseStringList)(submissionQueryOptions.fields))
              }
            },
            scroll: this.getNodeParameter("returnAll", i)
          });
          if (submissionQueryOptions.reformat) {
            responseData = responseData.map((submission) => {
              return (0, import_GenericFunctions.formatSubmission)(
                submission,
                (0, import_GenericFunctions.parseStringList)(submissionQueryOptions.selectMask),
                (0, import_GenericFunctions.parseStringList)(submissionQueryOptions.numberMask)
              );
            });
          }
          if (submissionQueryOptions.download) {
            for (const submission of responseData) {
              binaryItems.push(
                await import_GenericFunctions.downloadAttachments.call(
                  this,
                  submission,
                  submissionQueryOptions
                )
              );
            }
          }
        }
        if (operation === "get") {
          const submissionId = this.getNodeParameter("submissionId", i);
          const options = this.getNodeParameter("options", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              url: `/api/v2/assets/${formId}/data/${submissionId}`,
              qs: {
                ...options.fields && {
                  fields: JSON.stringify((0, import_GenericFunctions.parseStringList)(options.fields))
                }
              }
            })
          ];
          if (options.reformat) {
            responseData = responseData.map((submission) => {
              return (0, import_GenericFunctions.formatSubmission)(
                submission,
                (0, import_GenericFunctions.parseStringList)(options.selectMask),
                (0, import_GenericFunctions.parseStringList)(options.numberMask)
              );
            });
          }
          if (options.download) {
            for (const submission of responseData) {
              binaryItems.push(
                await import_GenericFunctions.downloadAttachments.call(this, submission, options)
              );
            }
          }
        }
        if (operation === "delete") {
          const id = this.getNodeParameter("submissionId", i);
          await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
            method: "DELETE",
            url: `/api/v2/assets/${formId}/data/${id}`
          });
          responseData = [
            {
              success: true
            }
          ];
        }
        if (operation === "getValidation") {
          const submissionId = this.getNodeParameter("submissionId", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              url: `/api/v2/assets/${formId}/data/${submissionId}/validation_status/`
            })
          ];
        }
        if (operation === "setValidation") {
          const submissionId = this.getNodeParameter("submissionId", i);
          const status = this.getNodeParameter("validationStatus", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              method: "PATCH",
              url: `/api/v2/assets/${formId}/data/${submissionId}/validation_status/`,
              body: {
                "validation_status.uid": status
              }
            })
          ];
        }
      }
      if (resource === "hook") {
        const formId = this.getNodeParameter("formId", i);
        if (operation === "getAll") {
          responseData = await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
            url: `/api/v2/assets/${formId}/hooks/`,
            qs: {
              limit: this.getNodeParameter("limit", i, 1e3)
            },
            scroll: this.getNodeParameter("returnAll", i)
          });
        }
        if (operation === "get") {
          const hookId = this.getNodeParameter("hookId", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              url: `/api/v2/assets/${formId}/hooks/${hookId}`
            })
          ];
        }
        if (operation === "retryAll") {
          const hookId = this.getNodeParameter("hookId", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              method: "PATCH",
              url: `/api/v2/assets/${formId}/hooks/${hookId}/retry/`
            })
          ];
        }
        if (operation === "getLogs") {
          const hookId = this.getNodeParameter("hookId", i);
          const startDate = this.getNodeParameter("startDate", i, null);
          const endDate = this.getNodeParameter("endDate", i, null);
          const status = this.getNodeParameter("status", i, null);
          responseData = await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
            url: `/api/v2/assets/${formId}/hooks/${hookId}/logs/`,
            qs: {
              ...startDate && { start: startDate },
              ...endDate && { end: endDate },
              ...status && { status }
            }
          });
        }
        if (operation === "retryOne") {
          const hookId = this.getNodeParameter("hookId", i);
          const logId = this.getNodeParameter("logId", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              method: "PATCH",
              url: `/api/v2/assets/${formId}/hooks/${hookId}/logs/${logId}/retry/`
            })
          ];
        }
      }
      if (resource === "file") {
        const formId = this.getNodeParameter("formId", i);
        if (operation === "getAll") {
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              url: `/api/v2/assets/${formId}/files`,
              qs: {
                file_type: "form_media"
              },
              scroll: true
            })
          ];
        }
        if (operation === "get") {
          const fileId = this.getNodeParameter("fileId", i);
          const download = this.getNodeParameter("download", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              url: `/api/v2/assets/${formId}/files/${fileId}`
            })
          ];
          if (responseData?.[0] && download) {
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const binaryItem = {
              json: responseData[0],
              binary: {}
            };
            const response = await import_GenericFunctions.koBoToolboxRawRequest.call(this, {
              url: `/api/v2/assets/${formId}/files/${fileId}/content`,
              encoding: "arraybuffer"
            });
            console.dir(response);
            binaryItem.binary[binaryPropertyName] = await this.helpers.prepareBinaryData(
              response,
              responseData[0].metadata.filename
            );
            binaryItems.push(binaryItem);
          }
        }
        if (operation === "delete") {
          const fileId = this.getNodeParameter("fileId", i);
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              method: "DELETE",
              url: `/api/v2/assets/${formId}/files/${fileId}`
            })
          ];
        }
        if (operation === "create") {
          const fileMode = this.getNodeParameter("fileMode", i);
          const body = {
            description: "Uploaded file",
            file_type: "form_media"
          };
          if ("binary" === fileMode) {
            const binaryPropertyName = this.getNodeParameter("binaryPropertyName", i);
            const item = items[i].binary;
            const binaryData = item[binaryPropertyName];
            body.base64Encoded = "data:" + binaryData.mimeType + ";base64," + binaryData.data;
            body.metadata = {
              filename: binaryData.fileName
            };
          } else {
            const fileUrl = this.getNodeParameter("fileUrl", i);
            body.metadata = {
              redirect_url: fileUrl
            };
          }
          responseData = [
            await import_GenericFunctions.koBoToolboxApiRequest.call(this, {
              method: "POST",
              url: `/api/v2/assets/${formId}/files/`,
              body
            })
          ];
        }
      }
      returnData = returnData.concat(responseData);
    }
    return binaryItems.length > 0 ? [binaryItems] : [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KoBoToolbox
});
//# sourceMappingURL=KoBoToolbox.node.js.map