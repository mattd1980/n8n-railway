import { Command } from '@oclif/core';
export default class ListCommand extends Command {
    static description: string;
    static flags: {
        testScenariosPath: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    run(): Promise<void>;
}
