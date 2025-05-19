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
var StickyNote_node_exports = {};
__export(StickyNote_node_exports, {
  StickyNote: () => StickyNote
});
module.exports = __toCommonJS(StickyNote_node_exports);
class StickyNote {
  constructor() {
    this.description = {
      displayName: "Sticky Note",
      name: "stickyNote",
      icon: "fa:sticky-note",
      group: ["input"],
      version: 1,
      description: "Make your workflow easier to understand",
      defaults: {
        name: "Sticky Note",
        color: "#FFD233"
      },
      inputs: [],
      outputs: [],
      properties: [
        {
          displayName: "Content",
          name: "content",
          type: "string",
          default: "## I'm a note \n**Double click** to edit me. [Guide](https://docs.n8n.io/workflows/sticky-notes/)"
        },
        {
          displayName: "Height",
          name: "height",
          type: "number",
          required: true,
          default: 160
        },
        {
          displayName: "Width",
          name: "width",
          type: "number",
          required: true,
          default: 240
        },
        {
          displayName: "Color",
          name: "color",
          type: "number",
          required: true,
          default: 1
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    return [items];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickyNote
});
//# sourceMappingURL=StickyNote.node.js.map