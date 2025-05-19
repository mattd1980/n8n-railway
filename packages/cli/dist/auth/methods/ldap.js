"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLdapLogin = void 0;
const di_1 = require("@n8n/di");
const event_service_1 = require("../../events/event.service");
const helpers_ee_1 = require("../../ldap.ee/helpers.ee");
const ldap_service_ee_1 = require("../../ldap.ee/ldap.service.ee");
const handleLdapLogin = async (loginId, password) => {
    if (!(0, helpers_ee_1.isLdapEnabled)())
        return undefined;
    const ldapService = di_1.Container.get(ldap_service_ee_1.LdapService);
    if (!ldapService.config.loginEnabled)
        return undefined;
    const { loginIdAttribute, userFilter } = ldapService.config;
    const ldapUser = await ldapService.findAndAuthenticateLdapUser(loginId, password, loginIdAttribute, userFilter);
    if (!ldapUser)
        return undefined;
    const [ldapId, ldapAttributesValues] = (0, helpers_ee_1.mapLdapAttributesToUser)(ldapUser, ldapService.config);
    const { email: emailAttributeValue } = ldapAttributesValues;
    if (!ldapId || !emailAttributeValue)
        return undefined;
    const ldapAuthIdentity = await (0, helpers_ee_1.getAuthIdentityByLdapId)(ldapId);
    if (!ldapAuthIdentity) {
        const emailUser = await (0, helpers_ee_1.getUserByEmail)(emailAttributeValue);
        if (emailUser && emailUser.email === emailAttributeValue) {
            const identity = await (0, helpers_ee_1.createLdapAuthIdentity)(emailUser, ldapId);
            await (0, helpers_ee_1.updateLdapUserOnLocalDb)(identity, ldapAttributesValues);
        }
        else {
            const user = await (0, helpers_ee_1.createLdapUserOnLocalDb)(ldapAttributesValues, ldapId);
            di_1.Container.get(event_service_1.EventService).emit('user-signed-up', {
                user,
                userType: 'ldap',
                wasDisabledLdapUser: false,
            });
            return user;
        }
    }
    else {
        if (ldapAuthIdentity.user) {
            if (ldapAuthIdentity.user.disabled)
                return undefined;
            await (0, helpers_ee_1.updateLdapUserOnLocalDb)(ldapAuthIdentity, ldapAttributesValues);
        }
    }
    return (await (0, helpers_ee_1.getAuthIdentityByLdapId)(ldapId))?.user;
};
exports.handleLdapLogin = handleLdapLogin;
//# sourceMappingURL=ldap.js.map