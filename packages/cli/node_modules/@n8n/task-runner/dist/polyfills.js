"use strict";
if (!globalThis.crypto?.getRandomValues) {
    globalThis.crypto = require('node:crypto').webcrypto;
}
//# sourceMappingURL=polyfills.js.map