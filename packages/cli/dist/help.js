"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@n8n/di");
const core_1 = require("@oclif/core");
const n8n_core_1 = require("n8n-core");
class CustomHelp extends core_1.Help {
    async showRootHelp() {
        di_1.Container.get(n8n_core_1.Logger).info('You can find up to date information about the CLI here:\nhttps://docs.n8n.io/hosting/cli-commands/');
    }
}
exports.default = CustomHelp;
//# sourceMappingURL=help.js.map