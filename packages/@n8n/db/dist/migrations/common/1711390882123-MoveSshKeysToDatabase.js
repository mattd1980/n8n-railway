"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveSshKeysToDatabase1711390882123 = void 0;
const di_1 = require("@n8n/di");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
class MoveSshKeysToDatabase1711390882123 {
    constructor() {
        this.settingsKey = 'features.sourceControl.sshKeys';
        this.privateKeyPath = node_path_1.default.join(di_1.Container.get(n8n_core_1.InstanceSettings).n8nFolder, 'ssh', 'key');
        this.publicKeyPath = this.privateKeyPath + '.pub';
        this.cipher = di_1.Container.get(n8n_core_1.Cipher);
    }
    async up({ escape, runQuery, logger, migrationName }) {
        let privateKey, publicKey;
        try {
            [privateKey, publicKey] = await Promise.all([
                (0, promises_1.readFile)(this.privateKeyPath, { encoding: 'utf8' }),
                (0, promises_1.readFile)(this.publicKeyPath, { encoding: 'utf8' }),
            ]);
        }
        catch {
            logger.info(`[${migrationName}] No SSH keys in filesystem, skipping`);
            return;
        }
        if (!privateKey && !publicKey) {
            logger.info(`[${migrationName}] No SSH keys in filesystem, skipping`);
            return;
        }
        const settings = escape.tableName('settings');
        const key = escape.columnName('key');
        const value = escape.columnName('value');
        const rows = await runQuery(`SELECT value FROM ${settings} WHERE ${key} = '${this.settingsKey}';`);
        if (rows.length === 1) {
            logger.info(`[${migrationName}] SSH keys already in database, skipping`);
            return;
        }
        if (!privateKey) {
            logger.error(`[${migrationName}] No private key found, skipping`);
            return;
        }
        const settingsValue = JSON.stringify({
            encryptedPrivateKey: this.cipher.encrypt(privateKey),
            publicKey,
        });
        await runQuery(`INSERT INTO ${settings} (${key}, ${value}) VALUES ('${this.settingsKey}', '${settingsValue}');`);
        try {
            await Promise.all([(0, promises_1.rm)(this.privateKeyPath), (0, promises_1.rm)(this.publicKeyPath)]);
        }
        catch (e) {
            const error = e instanceof Error ? e : new Error(`${e}`);
            logger.error(`[${migrationName}] Failed to remove SSH keys from filesystem: ${error.message}`);
        }
    }
    async down({ escape, runQuery, logger, migrationName }) {
        const settings = escape.tableName('settings');
        const key = escape.columnName('key');
        const rows = await runQuery(`SELECT value FROM ${settings} WHERE ${key} = '${this.settingsKey}';`);
        if (rows.length !== 1) {
            logger.info(`[${migrationName}] No SSH keys in database, skipping revert`);
            return;
        }
        const [row] = rows;
        const dbKeyPair = (0, n8n_workflow_1.jsonParse)(row.value, { fallbackValue: null });
        if (!dbKeyPair) {
            logger.info(`[${migrationName}] Malformed SSH keys in database, skipping revert`);
            return;
        }
        const privateKey = this.cipher.decrypt(dbKeyPair.encryptedPrivateKey);
        const { publicKey } = dbKeyPair;
        try {
            await Promise.all([
                (0, promises_1.writeFile)(this.privateKeyPath, privateKey, { encoding: 'utf8', mode: 0o600 }),
                (0, promises_1.writeFile)(this.publicKeyPath, publicKey, { encoding: 'utf8', mode: 0o600 }),
            ]);
        }
        catch {
            logger.error(`[${migrationName}] Failed to write SSH keys to filesystem, skipping revert`);
            return;
        }
        await runQuery(`DELETE FROM ${settings} WHERE ${key} = 'features.sourceControl.sshKeys';`);
    }
}
exports.MoveSshKeysToDatabase1711390882123 = MoveSshKeysToDatabase1711390882123;
//# sourceMappingURL=1711390882123-MoveSshKeysToDatabase.js.map