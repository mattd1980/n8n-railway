import { User } from '@n8n/db';
import { BaseCommand } from '../base-command';
export declare class Reset extends BaseCommand {
    static description: string;
    static examples: string[];
    run(): Promise<void>;
    getInstanceOwner(): Promise<User>;
    catch(error: Error): Promise<void>;
}
