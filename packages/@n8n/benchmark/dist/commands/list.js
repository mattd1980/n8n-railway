"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const common_flags_1 = require("../config/common-flags");
const scenario_loader_1 = require("../scenario/scenario-loader");
class ListCommand extends core_1.Command {
    async run() {
        const { flags } = await this.parse(ListCommand);
        const scenarioLoader = new scenario_loader_1.ScenarioLoader();
        const allScenarios = scenarioLoader.loadAll(flags.testScenariosPath);
        console.log('Available test scenarios:');
        console.log('');
        for (const scenario of allScenarios) {
            console.log('\t', scenario.name, ':', scenario.description);
        }
    }
}
ListCommand.description = 'List all available scenarios';
ListCommand.flags = {
    testScenariosPath: common_flags_1.testScenariosPath,
};
exports.default = ListCommand;
//# sourceMappingURL=list.js.map