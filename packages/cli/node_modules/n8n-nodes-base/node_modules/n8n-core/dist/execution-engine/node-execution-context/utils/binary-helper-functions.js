"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBinaryHelperFunctions = void 0;
exports.binaryToString = binaryToString;
exports.assertBinaryData = assertBinaryData;
exports.getBinaryDataBuffer = getBinaryDataBuffer;
exports.detectBinaryEncoding = detectBinaryEncoding;
exports.setBinaryDataBuffer = setBinaryDataBuffer;
exports.copyBinaryFile = copyBinaryFile;
exports.prepareBinaryData = prepareBinaryData;
const di_1 = require("@n8n/di");
const chardet_1 = __importDefault(require("chardet"));
const file_type_1 = __importDefault(require("file-type"));
const http_1 = require("http");
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const mime_types_1 = require("mime-types");
const n8n_workflow_1 = require("n8n-workflow");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const binary_data_service_1 = require("../../../binary-data/binary-data.service");
const utils_1 = require("../../../binary-data/utils");
const parse_incoming_message_1 = require("./parse-incoming-message");
async function binaryToString(body, encoding) {
    if (!encoding && body instanceof http_1.IncomingMessage) {
        (0, parse_incoming_message_1.parseIncomingMessage)(body);
        encoding = body.encoding;
    }
    const buffer = await (0, utils_1.binaryToBuffer)(body);
    return iconv_lite_1.default.decode(buffer, encoding ?? 'utf-8');
}
function getBinaryPath(binaryDataId) {
    return di_1.Container.get(binary_data_service_1.BinaryDataService).getPath(binaryDataId);
}
async function getBinaryMetadata(binaryDataId) {
    return await di_1.Container.get(binary_data_service_1.BinaryDataService).getMetadata(binaryDataId);
}
async function getBinaryStream(binaryDataId, chunkSize) {
    return await di_1.Container.get(binary_data_service_1.BinaryDataService).getAsStream(binaryDataId, chunkSize);
}
function assertBinaryData(inputData, node, itemIndex, propertyName, inputIndex) {
    const binaryKeyData = inputData.main[inputIndex][itemIndex].binary;
    if (binaryKeyData === undefined) {
        throw new n8n_workflow_1.NodeOperationError(node, `This operation expects the node's input data to contain a binary file '${propertyName}', but none was found [item ${itemIndex}]`, {
            itemIndex,
            description: 'Make sure that the previous node outputs a binary file',
        });
    }
    const binaryPropertyData = binaryKeyData[propertyName];
    if (binaryPropertyData === undefined) {
        throw new n8n_workflow_1.NodeOperationError(node, `The item has no binary field '${propertyName}' [item ${itemIndex}]`, {
            itemIndex,
            description: 'Check that the parameter where you specified the input binary field name is correct, and that it matches a field in the binary input',
        });
    }
    return binaryPropertyData;
}
async function getBinaryDataBuffer(inputData, itemIndex, propertyName, inputIndex) {
    const binaryData = inputData.main[inputIndex][itemIndex].binary[propertyName];
    return await di_1.Container.get(binary_data_service_1.BinaryDataService).getAsBuffer(binaryData);
}
function detectBinaryEncoding(buffer) {
    return chardet_1.default.detect(buffer);
}
async function setBinaryDataBuffer(binaryData, bufferOrStream, workflowId, executionId) {
    return await di_1.Container.get(binary_data_service_1.BinaryDataService).store(workflowId, executionId, bufferOrStream, binaryData);
}
async function copyBinaryFile(workflowId, executionId, filePath, fileName, mimeType) {
    let fileExtension;
    if (!mimeType) {
        if (filePath) {
            const mimeTypeLookup = (0, mime_types_1.lookup)(filePath);
            if (mimeTypeLookup) {
                mimeType = mimeTypeLookup;
            }
        }
        if (!mimeType) {
            const fileTypeData = await file_type_1.default.fromFile(filePath);
            if (fileTypeData) {
                mimeType = fileTypeData.mime;
                fileExtension = fileTypeData.ext;
            }
        }
    }
    if (!fileExtension && mimeType) {
        fileExtension = (0, mime_types_1.extension)(mimeType) || undefined;
    }
    if (!mimeType) {
        mimeType = 'text/plain';
    }
    const returnData = {
        mimeType,
        fileType: (0, n8n_workflow_1.fileTypeFromMimeType)(mimeType),
        fileExtension,
        data: '',
    };
    if (fileName) {
        returnData.fileName = fileName;
    }
    else if (filePath) {
        returnData.fileName = path_1.default.parse(filePath).base;
    }
    return await di_1.Container.get(binary_data_service_1.BinaryDataService).copyBinaryFile(workflowId, executionId, returnData, filePath);
}
async function prepareBinaryData(binaryData, executionId, workflowId, filePath, mimeType) {
    let fileExtension;
    if (binaryData instanceof http_1.IncomingMessage) {
        if (!filePath) {
            try {
                const { responseUrl } = binaryData;
                filePath =
                    binaryData.contentDisposition?.filename ??
                        ((responseUrl && new url_1.URL(responseUrl).pathname) ?? binaryData.req?.path)?.slice(1);
            }
            catch { }
        }
        if (!mimeType) {
            mimeType = binaryData.contentType;
        }
    }
    if (!mimeType) {
        if (filePath) {
            const mimeTypeLookup = (0, mime_types_1.lookup)(filePath);
            if (mimeTypeLookup) {
                mimeType = mimeTypeLookup;
            }
        }
        if (!mimeType) {
            if (Buffer.isBuffer(binaryData)) {
                const fileTypeData = await file_type_1.default.fromBuffer(binaryData);
                if (fileTypeData) {
                    mimeType = fileTypeData.mime;
                    fileExtension = fileTypeData.ext;
                }
            }
            else if (binaryData instanceof http_1.IncomingMessage) {
                mimeType = binaryData.headers['content-type'];
            }
            else {
            }
        }
    }
    if (!fileExtension && mimeType) {
        fileExtension = (0, mime_types_1.extension)(mimeType) || undefined;
    }
    if (!mimeType) {
        mimeType = 'text/plain';
    }
    const returnData = {
        mimeType,
        fileType: (0, n8n_workflow_1.fileTypeFromMimeType)(mimeType),
        fileExtension,
        data: '',
    };
    if (filePath) {
        const filePathParts = path_1.default.parse(filePath);
        if (filePathParts.dir !== '') {
            returnData.directory = filePathParts.dir;
        }
        returnData.fileName = filePathParts.base;
        fileExtension = filePathParts.ext.slice(1);
        if (fileExtension) {
            returnData.fileExtension = fileExtension;
        }
    }
    return await setBinaryDataBuffer(returnData, binaryData, workflowId, executionId);
}
const getBinaryHelperFunctions = ({ executionId, restApiUrl }, workflowId) => ({
    getBinaryPath,
    getBinaryStream,
    getBinaryMetadata,
    binaryToBuffer: utils_1.binaryToBuffer,
    binaryToString,
    createBinarySignedUrl(binaryData, expiresIn) {
        const token = di_1.Container.get(binary_data_service_1.BinaryDataService).createSignedToken(binaryData, expiresIn);
        return `${restApiUrl}/binary-data/signed?token=${token}`;
    },
    prepareBinaryData: async (binaryData, filePath, mimeType) => await prepareBinaryData(binaryData, executionId, workflowId, filePath, mimeType),
    setBinaryDataBuffer: async (data, binaryData) => await setBinaryDataBuffer(data, binaryData, workflowId, executionId),
    copyBinaryFile: async () => {
        throw new n8n_workflow_1.ApplicationError('`copyBinaryFile` has been removed. Please upgrade this node.');
    },
});
exports.getBinaryHelperFunctions = getBinaryHelperFunctions;
//# sourceMappingURL=binary-helper-functions.js.map