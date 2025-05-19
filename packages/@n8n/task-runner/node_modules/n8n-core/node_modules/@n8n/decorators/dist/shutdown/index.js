"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnShutdown = exports.ShutdownRegistryMetadata = exports.LOWEST_SHUTDOWN_PRIORITY = exports.DEFAULT_SHUTDOWN_PRIORITY = exports.HIGHEST_SHUTDOWN_PRIORITY = void 0;
var constants_1 = require("./constants");
Object.defineProperty(exports, "HIGHEST_SHUTDOWN_PRIORITY", { enumerable: true, get: function () { return constants_1.HIGHEST_SHUTDOWN_PRIORITY; } });
Object.defineProperty(exports, "DEFAULT_SHUTDOWN_PRIORITY", { enumerable: true, get: function () { return constants_1.DEFAULT_SHUTDOWN_PRIORITY; } });
Object.defineProperty(exports, "LOWEST_SHUTDOWN_PRIORITY", { enumerable: true, get: function () { return constants_1.LOWEST_SHUTDOWN_PRIORITY; } });
var shutdown_registry_metadata_1 = require("./shutdown-registry-metadata");
Object.defineProperty(exports, "ShutdownRegistryMetadata", { enumerable: true, get: function () { return shutdown_registry_metadata_1.ShutdownRegistryMetadata; } });
var on_shutdown_1 = require("./on-shutdown");
Object.defineProperty(exports, "OnShutdown", { enumerable: true, get: function () { return on_shutdown_1.OnShutdown; } });
//# sourceMappingURL=index.js.map