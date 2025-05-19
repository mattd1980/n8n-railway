"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioLoader = void 0;
const node_crypto_1 = require("node:crypto");
const fs = __importStar(require("node:fs"));
const path = __importStar(require("path"));
class ScenarioLoader {
    loadAll(pathToScenarios, filter) {
        pathToScenarios = path.resolve(pathToScenarios);
        const scenarioFolders = fs
            .readdirSync(pathToScenarios, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
        const scenarios = [];
        for (const folder of scenarioFolders) {
            if (filter && !folder.toLowerCase().includes(filter.toLowerCase())) {
                continue;
            }
            const scenarioPath = path.join(pathToScenarios, folder);
            const manifestFileName = `${folder}.manifest.json`;
            const scenarioManifestPath = path.join(pathToScenarios, folder, manifestFileName);
            if (!fs.existsSync(scenarioManifestPath)) {
                console.warn(`Scenario at ${scenarioPath} is missing the ${manifestFileName} file`);
                continue;
            }
            const [scenario, validationErrors] = this.loadAndValidateScenarioManifest(scenarioManifestPath);
            if (validationErrors) {
                console.warn(`Scenario at ${scenarioPath} has the following validation errors: ${validationErrors.join(', ')}`);
                continue;
            }
            scenarios.push({
                ...scenario,
                id: this.formScenarioId(scenarioPath),
                scenarioDirPath: scenarioPath,
            });
        }
        return scenarios;
    }
    loadAndValidateScenarioManifest(scenarioManifestPath) {
        const [scenario, error] = this.loadScenarioManifest(scenarioManifestPath);
        if (!scenario) {
            return [null, [error]];
        }
        const validationErrors = [];
        if (!scenario.name) {
            validationErrors.push(`Scenario at ${scenarioManifestPath} is missing a name`);
        }
        if (!scenario.description) {
            validationErrors.push(`Scenario at ${scenarioManifestPath} is missing a description`);
        }
        return validationErrors.length === 0 ? [scenario, null] : [null, validationErrors];
    }
    loadScenarioManifest(scenarioManifestPath) {
        try {
            const scenario = JSON.parse(fs.readFileSync(scenarioManifestPath, 'utf8'));
            return [scenario, null];
        }
        catch (error) {
            const message = error instanceof Error ? error.message : JSON.stringify(error);
            return [null, `Failed to parse manifest ${scenarioManifestPath}: ${message}`];
        }
    }
    formScenarioId(scenarioPath) {
        return (0, node_crypto_1.createHash)('sha256').update(scenarioPath).digest('hex');
    }
}
exports.ScenarioLoader = ScenarioLoader;
//# sourceMappingURL=scenario-loader.js.map