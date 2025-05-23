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
var JinaAi_node_exports = {};
__export(JinaAi_node_exports, {
  JinaAi: () => JinaAi
});
module.exports = __toCommonJS(JinaAi_node_exports);
var import_n8n_workflow = require("n8n-workflow");
class JinaAi {
  constructor() {
    this.description = {
      displayName: "Jina AI",
      name: "jinaAi",
      icon: {
        light: "file:jinaAi.svg",
        dark: "file:jinaAi.dark.svg"
      },
      group: ["transform"],
      version: 1,
      subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
      description: "Interact with Jina AI API",
      defaults: {
        name: "Jina AI"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "jinaAiApi",
          required: true
        }
      ],
      requestDefaults: {
        headers: {
          Accept: "application/json"
        }
      },
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Reader",
              value: "reader"
            },
            {
              name: "Research",
              value: "research"
            }
          ],
          default: "reader"
        },
        // Operations
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["reader"]
            }
          },
          options: [
            {
              name: "Read",
              value: "read",
              action: "Read URL content",
              description: "Fetches content from a URL and converts it to clean, LLM-friendly formats",
              routing: {
                request: {
                  method: "GET",
                  url: '=https://r.jina.ai/{{ $parameter["url"] }}',
                  headers: {
                    "X-Return-Format": '={{ $parameter["options"]["outputFormat"] }}',
                    "X-Target-Selector": '={{ $parameter["options"]["targetSelector"] }}',
                    "X-Remove-Selector": '={{ $parameter["options"]["excludeSelector"] }}',
                    "X-With-Generated-Alt": '={{ $parameter["options"]["enableImageCaptioning"] }}',
                    "X-Wait-For-Selector": '={{ $parameter["options"]["waitForSelector"] }}'
                  }
                },
                output: {
                  postReceive: [
                    {
                      type: "rootProperty",
                      enabled: '={{ $parameter["simplify"] }}',
                      properties: {
                        property: "data"
                      }
                    }
                  ]
                }
              }
            },
            {
              name: "Search",
              value: "search",
              action: "Search web",
              description: "Performs a web search via Jina AI and returns top results as clean, LLM-friendly formats",
              routing: {
                request: {
                  method: "GET",
                  url: "https://s.jina.ai/",
                  headers: {
                    "X-Return-Format": '={{ $parameter["options"]["outputFormat"] }}',
                    "X-Site": '={{ $parameter["options"]["siteFilter"] }}'
                  },
                  qs: {
                    q: '={{ $parameter["searchQuery"] }}',
                    page: '={{ $parameter["options"]["pageNumber"] }}'
                  }
                },
                output: {
                  postReceive: [
                    {
                      type: "rootProperty",
                      enabled: '={{ $parameter["simplify"] }}',
                      properties: {
                        property: "data"
                      }
                    }
                  ]
                }
              }
            }
          ],
          default: "read"
        },
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          displayOptions: {
            show: {
              resource: ["research"]
            }
          },
          options: [
            {
              name: "Deep Research",
              value: "deepResearch",
              action: "Perform deep research",
              description: "Research a topic and generate a structured research report",
              routing: {
                request: {
                  method: "POST",
                  url: "https://deepsearch.jina.ai/v1/chat/completions",
                  body: {
                    messages: [
                      {
                        role: "user",
                        content: '={{ $parameter["researchQuery"] }}'
                      }
                    ],
                    max_returned_urls: '={{ $parameter["options"]["maxReturnedSources"] }}',
                    boost_hostnames: '={{ $parameter["options"]["prioritizeSources"].split(/,\\s*/) }}',
                    bad_hostnames: '={{ $parameter["options"]["excludeSources"].split(/,\\s*/) }}',
                    only_hostnames: '={{ $parameter["options"]["siteFilter"].split(/,\\s*/) }}'
                  }
                },
                output: {
                  postReceive: [
                    {
                      type: "setKeyValue",
                      enabled: '={{ $parameter["simplify"] }}',
                      properties: {
                        content: '={{ $responseItem["choices"][0]["message"]["content"] }}',
                        annotations: '={{ $responseItem["choices"][0]["message"]["annotations"] }}',
                        usage: '={{ $responseItem["usage"] }}'
                      }
                    }
                  ]
                }
              }
            }
          ],
          default: "deepResearch"
        },
        // Options for Reader
        {
          displayName: "URL",
          name: "url",
          type: "string",
          required: true,
          default: "",
          placeholder: "https://jina.ai/",
          description: "The URL to fetch content from",
          displayOptions: {
            show: {
              resource: ["reader"],
              operation: ["read"]
            }
          }
        },
        {
          displayName: "Simplify",
          name: "simplify",
          type: "boolean",
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data",
          displayOptions: {
            show: {
              resource: ["reader"],
              operation: ["read"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Option",
          default: {},
          displayOptions: {
            show: {
              resource: ["reader"],
              operation: ["read"]
            }
          },
          options: [
            {
              displayName: "Output Format",
              name: "outputFormat",
              description: "Specify desired output format",
              type: "options",
              options: [
                {
                  name: "HTML",
                  value: "html"
                },
                {
                  name: "JSON",
                  value: ""
                },
                {
                  name: "Markdown",
                  value: "markdown"
                },
                {
                  name: "Screenshot",
                  value: "screenshot"
                },
                {
                  name: "Text",
                  value: "text"
                }
              ],
              default: ""
            },
            {
              displayName: "Target CSS Selector",
              name: "targetSelector",
              type: "string",
              description: "CSS selector to focus on specific page elements",
              default: "",
              placeholder: "e.g. #main-content .article"
            },
            {
              displayName: "Exclude CSS Selector",
              name: "excludeSelector",
              type: "string",
              description: "CSS selector for elements to exclude",
              default: "",
              placeholder: "e.g. header, footer, .ads"
            },
            {
              displayName: "Enable Image Captioning",
              name: "enableImageCaptioning",
              type: "boolean",
              default: false,
              description: "Whether to generate captions for images within the content"
            },
            {
              displayName: "Wait for CSS Selector",
              name: "waitForSelector",
              type: "string",
              description: "Wait for a specific element to appear before extracting content (for dynamic pages)",
              default: "",
              placeholder: "e.g. #results-loaded"
            }
          ]
        },
        {
          displayName: "Search Query",
          name: "searchQuery",
          type: "string",
          required: true,
          default: "",
          placeholder: "e.g. Jina AI",
          displayOptions: {
            show: {
              resource: ["reader"],
              operation: ["search"]
            }
          }
        },
        {
          displayName: "Simplify",
          name: "simplify",
          type: "boolean",
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data",
          displayOptions: {
            show: {
              resource: ["reader"],
              operation: ["search"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Option",
          default: {},
          displayOptions: {
            show: {
              resource: ["reader"],
              operation: ["search"]
            }
          },
          options: [
            {
              displayName: "Output Format",
              name: "outputFormat",
              description: "Specify desired output format",
              type: "options",
              options: [
                {
                  name: "HTML",
                  value: "html"
                },
                {
                  name: "JSON",
                  value: ""
                },
                {
                  name: "Markdown",
                  value: "markdown"
                },
                {
                  name: "Screenshot",
                  value: "screenshot"
                },
                {
                  name: "Text",
                  value: "text"
                }
              ],
              default: "json"
            },
            {
              displayName: "Site Filter",
              name: "siteFilter",
              type: "string",
              description: "Restrict search to specific websites",
              default: "",
              placeholder: "e.g. jina.ai, github.com"
            },
            {
              displayName: "Page Number",
              name: "pageNumber",
              type: "number",
              typeOptions: {
                minValue: 1,
                numberPrecision: 0
              },
              description: "The page number of the search results to retrieve",
              default: "",
              placeholder: "1"
            }
          ]
        },
        // Options for Research
        {
          displayName: "Research Query",
          name: "researchQuery",
          type: "string",
          required: true,
          default: "",
          description: "The topic or question for the AI to research",
          placeholder: "e.g. Analyze the impact of renewable energy sources on climate change mitigation",
          typeOptions: {
            rows: 2
          },
          displayOptions: {
            show: {
              resource: ["research"],
              operation: ["deepResearch"]
            }
          }
        },
        {
          displayName: "Simplify",
          name: "simplify",
          type: "boolean",
          default: true,
          description: "Whether to return a simplified version of the response instead of the raw data",
          displayOptions: {
            show: {
              resource: ["research"],
              operation: ["deepResearch"]
            }
          }
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Option",
          default: {},
          displayOptions: {
            show: {
              resource: ["research"],
              operation: ["deepResearch"]
            }
          },
          options: [
            {
              displayName: "Max Returned Sources",
              name: "maxReturnedSources",
              description: "The maximum number of URLs to include in the final answer",
              type: "number",
              typeOptions: {
                minValue: 1,
                numberPrecision: 0
              },
              default: "",
              placeholder: "e.g. 5"
            },
            {
              displayName: "Prioritize Sources",
              name: "prioritizeSources",
              type: "string",
              description: "A list of domains that are given a higher priority for content retrieval",
              default: "",
              placeholder: "e.g. jina.ai, github.com"
            },
            {
              displayName: "Exclude Sources",
              name: "excludeSources",
              type: "string",
              description: "A list of domains to be strictly excluded from content retrieval",
              default: "",
              placeholder: "e.g. jina.ai, github.com"
            },
            {
              displayName: "Site Filter",
              name: "siteFilter",
              type: "string",
              description: "Restrict search to specific websites",
              default: "",
              placeholder: "e.g. jina.ai, github.com"
            }
          ]
        }
      ]
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JinaAi
});
//# sourceMappingURL=JinaAi.node.js.map