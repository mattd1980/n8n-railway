import { DirectoryLoader } from './directory-loader';
export declare class CustomDirectoryLoader extends DirectoryLoader {
    packageName: string;
    loadAll(): Promise<void>;
}
