import type { Scenario } from '../types/scenario';
export declare class ScenarioLoader {
    loadAll(pathToScenarios: string, filter?: string): Scenario[];
    private loadAndValidateScenarioManifest;
    private loadScenarioManifest;
    private formScenarioId;
}
