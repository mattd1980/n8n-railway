import type { INodeProperties, INodePropertyOptions, INodePropertyCollection, INodeParameterResourceLocator, ResourceMapperValue, FilterValue } from './Interfaces';
export declare function isResourceLocatorValue(value: unknown): value is INodeParameterResourceLocator;
export declare const isINodeProperties: (item: INodePropertyOptions | INodeProperties | INodePropertyCollection) => item is INodeProperties;
export declare const isINodePropertyOptions: (item: INodePropertyOptions | INodeProperties | INodePropertyCollection) => item is INodePropertyOptions;
export declare const isINodePropertyCollection: (item: INodePropertyOptions | INodeProperties | INodePropertyCollection) => item is INodePropertyCollection;
export declare const isINodePropertiesList: (items: INodeProperties["options"]) => items is INodeProperties[];
export declare const isINodePropertyOptionsList: (items: INodeProperties["options"]) => items is INodePropertyOptions[];
export declare const isINodePropertyCollectionList: (items: INodeProperties["options"]) => items is INodePropertyCollection[];
export declare const isValidResourceLocatorParameterValue: (value: INodeParameterResourceLocator) => boolean;
export declare const isResourceMapperValue: (value: unknown) => value is ResourceMapperValue;
export declare const isFilterValue: (value: unknown) => value is FilterValue;
