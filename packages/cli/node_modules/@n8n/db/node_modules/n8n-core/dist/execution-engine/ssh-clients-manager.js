"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHClientsManager = void 0;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const node_crypto_1 = require("node:crypto");
const ssh2_1 = require("ssh2");
let SSHClientsConfig = class SSHClientsConfig {
    constructor() {
        this.idleTimeout = 5 * 60;
    }
};
__decorate([
    (0, config_1.Env)('N8N_SSH_TUNNEL_IDLE_TIMEOUT'),
    __metadata("design:type", Number)
], SSHClientsConfig.prototype, "idleTimeout", void 0);
SSHClientsConfig = __decorate([
    config_1.Config
], SSHClientsConfig);
let SSHClientsManager = class SSHClientsManager {
    constructor(config) {
        this.config = config;
        this.clients = new Map();
        process.on('exit', () => this.onShutdown());
        if (process.env.NODE_ENV === 'test')
            return;
        setInterval(() => this.cleanupStaleConnections(), 60 * 1000);
    }
    async getClient(credentials) {
        const { sshAuthenticateWith, sshHost, sshPort, sshUser } = credentials;
        const sshConfig = {
            host: sshHost,
            port: sshPort,
            username: sshUser,
            ...(sshAuthenticateWith === 'password'
                ? { password: credentials.sshPassword }
                : {
                    privateKey: credentials.privateKey,
                    passphrase: credentials.passphrase ?? undefined,
                }),
        };
        const clientHash = (0, node_crypto_1.createHash)('sha1').update(JSON.stringify(sshConfig)).digest('base64');
        const existing = this.clients.get(clientHash);
        if (existing) {
            existing.lastUsed = new Date();
            return existing.client;
        }
        return await new Promise((resolve, reject) => {
            const sshClient = new ssh2_1.Client();
            sshClient.once('error', reject);
            sshClient.once('ready', () => {
                sshClient.off('error', reject);
                sshClient.once('close', () => this.clients.delete(clientHash));
                this.clients.set(clientHash, {
                    client: sshClient,
                    lastUsed: new Date(),
                });
                resolve(sshClient);
            });
            sshClient.connect(sshConfig);
        });
    }
    onShutdown() {
        for (const { client } of this.clients.values()) {
            client.end();
        }
    }
    cleanupStaleConnections() {
        const { clients } = this;
        if (clients.size === 0)
            return;
        const now = Date.now();
        for (const [hash, { client, lastUsed }] of clients.entries()) {
            if (now - lastUsed.getTime() > this.config.idleTimeout * 1000) {
                client.end();
                clients.delete(hash);
            }
        }
    }
};
exports.SSHClientsManager = SSHClientsManager;
exports.SSHClientsManager = SSHClientsManager = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [SSHClientsConfig])
], SSHClientsManager);
//# sourceMappingURL=ssh-clients-manager.js.map