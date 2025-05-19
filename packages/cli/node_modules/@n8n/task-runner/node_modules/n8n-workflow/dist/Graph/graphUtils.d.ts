type MultipleInputNodesError = {
    errorCode: 'Multiple Input Nodes';
    nodes: Set<string>;
};
type MultipleOutputNodesError = {
    errorCode: 'Multiple Output Nodes';
    nodes: Set<string>;
};
type InputEdgeToNonRootNode = {
    errorCode: 'Input Edge To Non-Root Node';
    node: string;
};
type OutputEdgeFromNonLeafNode = {
    errorCode: 'Output Edge From Non-Leaf Node';
    node: string;
};
type NoContinuousPathFromRootToLeaf = {
    errorCode: 'No Continuous Path From Root To Leaf In Selection';
    start: string;
    end: string;
};
export type ExtractableErrorResult = MultipleInputNodesError | MultipleOutputNodesError | InputEdgeToNonRootNode | OutputEdgeFromNonLeafNode | NoContinuousPathFromRootToLeaf;
type AdjacencyList = Map<string, Set<string>>;
export declare function getInputEdges(graphIds: Set<string>, adjacencyList: AdjacencyList): Array<[string, string]>;
export declare function getOutputEdges(graphIds: Set<string>, adjacencyList: AdjacencyList): Array<[string, string]>;
export declare function getRootNodes(graphIds: Set<string>, adjacencyList: AdjacencyList): Set<string>;
export declare function getLeafNodes(graphIds: Set<string>, adjacencyList: AdjacencyList): Set<string>;
export declare function hasPath(start: string, end: string, adjacencyList: AdjacencyList): boolean;
export type ExtractableSubgraphData = {
    start?: string;
    end?: string;
};
export declare function parseExtractableSubgraphSelection(graphIds: Set<string>, adjacencyList: AdjacencyList): ExtractableSubgraphData | ExtractableErrorResult[];
export {};
