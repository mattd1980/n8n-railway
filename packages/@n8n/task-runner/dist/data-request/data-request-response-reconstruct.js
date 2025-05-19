"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRequestResponseReconstruct = void 0;
class DataRequestResponseReconstruct {
    reconstructConnectionInputItems(inputData, chunk) {
        const inputItems = inputData?.main?.[0] ?? [];
        if (!chunk) {
            return inputItems;
        }
        let sparseInputItems = [];
        sparseInputItems = sparseInputItems
            .concat(Array.from({ length: chunk.startIndex }))
            .concat(inputItems)
            .concat(Array.from({ length: inputItems.length - chunk.startIndex - chunk.count }));
        return sparseInputItems;
    }
    reconstructExecuteData(response, inputItems) {
        const inputData = {
            ...response.inputData,
            main: [inputItems],
        };
        return {
            data: inputData,
            node: response.node,
            source: response.connectionInputSource,
        };
    }
}
exports.DataRequestResponseReconstruct = DataRequestResponseReconstruct;
//# sourceMappingURL=data-request-response-reconstruct.js.map