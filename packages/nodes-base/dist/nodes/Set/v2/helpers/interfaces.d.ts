import { IDataObject } from 'n8n-workflow';

type SetNodeOptions = {
    dotNotation?: boolean;
    ignoreConversionErrors?: boolean;
    include?: IncludeMods;
    includeBinary?: boolean;
    stripBinary?: boolean;
};
type SetField = {
    name: string;
    type: 'stringValue' | 'numberValue' | 'booleanValue' | 'arrayValue' | 'objectValue';
    stringValue?: string;
    numberValue?: number;
    booleanValue?: boolean;
    arrayValue?: string[] | string | IDataObject | IDataObject[];
    objectValue?: string | IDataObject;
};
type AssignmentSetField = {
    name: string;
    value: unknown;
    type: string;
};
declare const INCLUDE: {
    readonly ALL: "all";
    readonly NONE: "none";
    readonly SELECTED: "selected";
    readonly EXCEPT: "except";
};
type IncludeMods = (typeof INCLUDE)[keyof typeof INCLUDE];

export { type AssignmentSetField, INCLUDE, type IncludeMods, type SetField, type SetNodeOptions };
