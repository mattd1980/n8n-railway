import formidable from 'formidable';
import type { IncomingMessage } from 'http';
export declare const createMultiFormDataParser: (maxFormDataSizeInMb: number) => (req: IncomingMessage) => Promise<{
    data: formidable.Fields;
    files: formidable.Files;
}>;
