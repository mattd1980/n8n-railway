"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSSHTunnelFunctions = void 0;
const di_1 = require("@n8n/di");
const ssh_clients_manager_1 = require("../../ssh-clients-manager");
const getSSHTunnelFunctions = () => {
    const sshClientsManager = di_1.Container.get(ssh_clients_manager_1.SSHClientsManager);
    return {
        getSSHClient: async (credentials) => await sshClientsManager.getClient(credentials),
    };
};
exports.getSSHTunnelFunctions = getSSHTunnelFunctions;
//# sourceMappingURL=ssh-tunnel-helper-functions.js.map