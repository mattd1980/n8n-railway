"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputEdges = getInputEdges;
exports.getOutputEdges = getOutputEdges;
exports.getRootNodes = getRootNodes;
exports.getLeafNodes = getLeafNodes;
exports.hasPath = hasPath;
exports.parseExtractableSubgraphSelection = parseExtractableSubgraphSelection;
function getInputEdges(graphIds, adjacencyList) {
    const result = [];
    for (const [from, tos] of adjacencyList.entries()) {
        if (graphIds.has(from))
            continue;
        for (const to of tos) {
            if (graphIds.has(to)) {
                result.push([from, to]);
            }
        }
    }
    return result;
}
function getOutputEdges(graphIds, adjacencyList) {
    const result = [];
    for (const [from, tos] of adjacencyList.entries()) {
        if (!graphIds.has(from))
            continue;
        for (const to of tos) {
            if (!graphIds.has(to)) {
                result.push([from, to]);
            }
        }
    }
    return result;
}
function intersection(a, b) {
    const result = new Set();
    for (const x of a) {
        if (b.has(x))
            result.add(x);
    }
    return result;
}
function union(a, b) {
    const result = new Set();
    for (const x of a)
        result.add(x);
    for (const x of b)
        result.add(x);
    return result;
}
function difference(minuend, subtrahend) {
    const result = new Set(minuend.values());
    for (const x of subtrahend) {
        result.delete(x);
    }
    return result;
}
function getRootNodes(graphIds, adjacencyList) {
    let innerNodes = new Set();
    for (const nodeId of graphIds) {
        innerNodes = union(innerNodes, adjacencyList.get(nodeId) ?? new Set());
    }
    return difference(graphIds, innerNodes);
}
function getLeafNodes(graphIds, adjacencyList) {
    const result = new Set();
    for (const nodeId of graphIds) {
        if (intersection(adjacencyList.get(nodeId) ?? new Set(), graphIds).size === 0) {
            result.add(nodeId);
        }
    }
    return result;
}
function hasPath(start, end, adjacencyList) {
    const seen = new Set();
    const paths = [start];
    while (true) {
        const next = paths.pop();
        if (next === end)
            return true;
        if (next === undefined)
            return false;
        seen.add(next);
        paths.push(...difference(adjacencyList.get(next) ?? new Set(), seen));
    }
}
function parseExtractableSubgraphSelection(graphIds, adjacencyList) {
    const errors = [];
    const inputEdges = getInputEdges(graphIds, adjacencyList);
    const inputNodes = new Set(inputEdges.map((x) => x[1]));
    const rootNodes = getRootNodes(graphIds, adjacencyList);
    for (const inputNode of difference(inputNodes, rootNodes).values()) {
        errors.push({
            errorCode: 'Input Edge To Non-Root Node',
            node: inputNode,
        });
    }
    const rootInputNodes = intersection(rootNodes, inputNodes);
    if (rootInputNodes.size > 1) {
        errors.push({
            errorCode: 'Multiple Input Nodes',
            nodes: rootInputNodes,
        });
    }
    const outputEdges = getOutputEdges(graphIds, adjacencyList);
    const outputNodes = new Set(outputEdges.map((x) => x[0]));
    const leafNodes = getLeafNodes(graphIds, adjacencyList);
    for (const outputNode of difference(outputNodes, leafNodes).values()) {
        errors.push({
            errorCode: 'Output Edge From Non-Leaf Node',
            node: outputNode,
        });
    }
    const leafOutputNodes = intersection(leafNodes, outputNodes);
    if (leafOutputNodes.size > 1) {
        errors.push({
            errorCode: 'Multiple Output Nodes',
            nodes: leafOutputNodes,
        });
    }
    const start = rootInputNodes.values().next().value;
    const end = leafOutputNodes.values().next().value;
    if (start && end && !hasPath(start, end, adjacencyList)) {
        errors.push({
            errorCode: 'No Continuous Path From Root To Leaf In Selection',
            start,
            end,
        });
    }
    return errors.length > 0 ? errors : { start, end };
}
//# sourceMappingURL=graphUtils.js.map