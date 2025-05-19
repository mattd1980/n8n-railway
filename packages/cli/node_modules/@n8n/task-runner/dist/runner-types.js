"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVAILABLE_RPC_METHODS = exports.UNSUPPORTED_HELPER_FUNCTIONS = exports.EXPOSED_RPC_METHODS = void 0;
exports.EXPOSED_RPC_METHODS = [
    'helpers.assertBinaryData',
    'helpers.getBinaryDataBuffer',
    'helpers.prepareBinaryData',
    'helpers.setBinaryDataBuffer',
    'helpers.binaryToString',
    'helpers.httpRequest',
];
exports.UNSUPPORTED_HELPER_FUNCTIONS = [
    'helpers.httpRequestWithAuthentication',
    'helpers.requestWithAuthenticationPaginated',
    'helpers.copyBinaryFile',
    'helpers.createReadStream',
    'helpers.getBinaryStream',
    'helpers.binaryToBuffer',
    'helpers.getBinaryMetadata',
    'helpers.getStoragePath',
    'helpers.getBinaryPath',
    'helpers.writeContentToFile',
    'helpers.copyInputItems',
    'helpers.returnJsonArray',
    'helpers.normalizeItems',
    'helpers.getSSHClient',
    'helpers.createDeferredPromise',
    'helpers.constructExecutionMetaData',
];
exports.AVAILABLE_RPC_METHODS = [...exports.EXPOSED_RPC_METHODS, 'logNodeOutput'];
//# sourceMappingURL=runner-types.js.map