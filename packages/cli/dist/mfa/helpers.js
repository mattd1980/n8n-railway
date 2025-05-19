"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMfaDisable = exports.isMfaFeatureEnabled = void 0;
const db_1 = require("@n8n/db");
const di_1 = require("@n8n/di");
const config_1 = __importDefault(require("../config"));
const constants_1 = require("./constants");
const isMfaFeatureEnabled = () => config_1.default.get(constants_1.MFA_FEATURE_ENABLED);
exports.isMfaFeatureEnabled = isMfaFeatureEnabled;
const isMfaFeatureDisabled = () => !(0, exports.isMfaFeatureEnabled)();
const getUsersWithMfaEnabled = async () => await di_1.Container.get(db_1.UserRepository).count({ where: { mfaEnabled: true } });
const handleMfaDisable = async () => {
    if (isMfaFeatureDisabled()) {
        const users = await getUsersWithMfaEnabled();
        if (users) {
            config_1.default.set(constants_1.MFA_FEATURE_ENABLED, true);
        }
    }
};
exports.handleMfaDisable = handleMfaDisable;
//# sourceMappingURL=helpers.js.map