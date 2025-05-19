"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckServer = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const node_http_1 = require("node:http");
class HealthCheckServer {
    constructor() {
        this.server = (0, node_http_1.createServer)((_, res) => {
            res.writeHead(200);
            res.end('OK');
        });
    }
    async start(host, port) {
        return await new Promise((resolve, reject) => {
            const portInUseErrorHandler = (error) => {
                if (error.code === 'EADDRINUSE') {
                    reject(new n8n_workflow_1.ApplicationError(`Port ${port} is already in use`));
                }
                else {
                    reject(error);
                }
            };
            this.server.on('error', portInUseErrorHandler);
            this.server.listen(port, host, () => {
                this.server.removeListener('error', portInUseErrorHandler);
                console.log(`Health check server listening on ${host}, port ${port}`);
                resolve();
            });
        });
    }
    async stop() {
        return await new Promise((resolve, reject) => {
            this.server.close((error) => {
                if (error)
                    reject(error);
                else
                    resolve();
            });
        });
    }
}
exports.HealthCheckServer = HealthCheckServer;
//# sourceMappingURL=health-check-server.js.map