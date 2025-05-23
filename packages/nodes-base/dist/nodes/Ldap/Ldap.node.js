"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Ldap_node_exports = {};
__export(Ldap_node_exports, {
  Ldap: () => Ldap
});
module.exports = __toCommonJS(Ldap_node_exports);
var import_ldapts = require("ldapts");
var import_n8n_workflow = require("n8n-workflow");
var import_Helpers = require("./Helpers");
var import_LdapDescription = require("./LdapDescription");
class Ldap {
  constructor() {
    this.description = {
      displayName: "Ldap",
      name: "ldap",
      icon: { light: "file:ldap.svg", dark: "file:ldap.dark.svg" },
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Interact with LDAP servers",
      defaults: {
        name: "LDAP"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-class-description-credentials-name-unsuffixed
          name: "ldap",
          required: true,
          testedBy: "ldapConnectionTest"
        }
      ],
      properties: [
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Compare",
              value: "compare",
              description: "Compare an attribute",
              action: "Compare an attribute"
            },
            {
              name: "Create",
              value: "create",
              description: "Create a new entry",
              action: "Create a new entry"
            },
            {
              name: "Delete",
              value: "delete",
              description: "Delete an entry",
              action: "Delete an entry"
            },
            {
              name: "Rename",
              value: "rename",
              description: "Rename the DN of an existing entry",
              action: "Rename the DN of an existing entry"
            },
            {
              name: "Search",
              value: "search",
              description: "Search LDAP",
              action: "Search LDAP"
            },
            {
              name: "Update",
              value: "update",
              description: "Update attributes",
              action: "Update attributes"
            }
          ],
          default: "search"
        },
        {
          displayName: "Debug",
          name: "nodeDebug",
          type: "boolean",
          isNodeSetting: true,
          default: false,
          noDataExpression: true
        },
        ...import_LdapDescription.ldapFields
      ]
    };
    this.methods = {
      credentialTest: {
        async ldapConnectionTest(credential) {
          const credentials = credential.data;
          const client = await (0, import_Helpers.createLdapClient)(this, credentials);
          try {
            await client.bind(credentials.bindDN, credentials.bindPassword);
          } catch (error) {
            return {
              status: "Error",
              message: error.message
            };
          } finally {
            await client.unbind();
          }
          return {
            status: "OK",
            message: "Connection successful!"
          };
        }
      },
      loadOptions: {
        async getAttributes() {
          const credentials = await this.getCredentials("ldap");
          const client = await (0, import_Helpers.createLdapClient)(this, credentials);
          try {
            await client.bind(credentials.bindDN, credentials.bindPassword);
          } catch (error) {
            await client.unbind();
            this.logger.error(error);
            return [];
          }
          let results;
          const baseDN = this.getNodeParameter("baseDN", 0);
          try {
            results = await client.search(baseDN, { sizeLimit: 200, paged: false });
          } catch (error) {
            this.logger.error(error);
            return [];
          } finally {
            await client.unbind();
          }
          const unique = Object.keys(Object.assign({}, ...results.searchEntries));
          return unique.map((x) => ({
            name: x,
            value: x
          }));
        },
        async getObjectClasses() {
          const credentials = await this.getCredentials("ldap");
          const client = await (0, import_Helpers.createLdapClient)(this, credentials);
          try {
            await client.bind(credentials.bindDN, credentials.bindPassword);
          } catch (error) {
            await client.unbind();
            this.logger.error(error);
            return [];
          }
          const baseDN = this.getNodeParameter("baseDN", 0);
          let results;
          try {
            results = await client.search(baseDN, { sizeLimit: 10, paged: false });
          } catch (error) {
            this.logger.error(error);
            return [];
          } finally {
            await client.unbind();
          }
          const objects = [];
          for (const entry of results.searchEntries) {
            if (typeof entry.objectClass === "string") {
              objects.push(entry.objectClass);
            } else {
              objects.push(...entry.objectClass);
            }
          }
          const unique = [...new Set(objects)];
          unique.push("custom");
          const result = [];
          for (const value of unique) {
            if (value === "custom") {
              result.push({ name: "custom", value: "custom" });
            } else result.push({ name: value, value: `(objectclass=${value})` });
          }
          return result;
        },
        async getAttributesForDn() {
          const credentials = await this.getCredentials("ldap");
          const client = await (0, import_Helpers.createLdapClient)(this, credentials);
          try {
            await client.bind(credentials.bindDN, credentials.bindPassword);
          } catch (error) {
            await client.unbind();
            this.logger.error(error);
            return [];
          }
          let results;
          const baseDN = this.getNodeParameter("dn", 0);
          try {
            results = await client.search(baseDN, { sizeLimit: 1, paged: false });
          } catch (error) {
            this.logger.error(error);
            return [];
          } finally {
            await client.unbind();
          }
          const unique = Object.keys(Object.assign({}, ...results.searchEntries));
          return unique.map((x) => ({
            name: x,
            value: x
          }));
        }
      }
    };
  }
  async execute() {
    const nodeDebug = this.getNodeParameter("nodeDebug", 0);
    const items = this.getInputData();
    const returnItems = [];
    if (nodeDebug) {
      this.logger.info(
        `[${this.getNode().type} | ${this.getNode().name}] - Starting with ${items.length} input items`
      );
    }
    const credentials = await this.getCredentials("ldap");
    const client = await (0, import_Helpers.createLdapClient)(
      this,
      credentials,
      nodeDebug,
      this.getNode().type,
      this.getNode().name
    );
    try {
      await client.bind(credentials.bindDN, credentials.bindPassword);
    } catch (error) {
      delete error.cert;
      await client.unbind();
      if (this.continueOnFail()) {
        return [
          items.map((x) => {
            x.json.error = error.reason || "LDAP connection error occurred";
            return x;
          })
        ];
      } else {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {});
      }
    }
    const operation = this.getNodeParameter("operation", 0);
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        if (operation === "compare") {
          const dn = this.getNodeParameter("dn", itemIndex);
          const attributeId = this.getNodeParameter("id", itemIndex);
          const value = this.getNodeParameter("value", itemIndex, "");
          const res = await client.compare(dn, attributeId, value);
          returnItems.push({
            json: { dn, attribute: attributeId, result: res },
            pairedItem: { item: itemIndex }
          });
        } else if (operation === "create") {
          const dn = this.getNodeParameter("dn", itemIndex);
          const attributeFields = this.getNodeParameter("attributes", itemIndex);
          const attributes = {};
          if (Object.keys(attributeFields).length) {
            attributeFields.attribute.map((attr) => {
              attributes[attr.id] = attr.value;
            });
          }
          await client.add(dn, attributes);
          returnItems.push({
            json: { dn, result: "success" },
            pairedItem: { item: itemIndex }
          });
        } else if (operation === "delete") {
          const dn = this.getNodeParameter("dn", itemIndex);
          await client.del(dn);
          returnItems.push({
            json: { dn, result: "success" },
            pairedItem: { item: itemIndex }
          });
        } else if (operation === "rename") {
          const dn = this.getNodeParameter("dn", itemIndex);
          const targetDn = this.getNodeParameter("targetDn", itemIndex);
          await client.modifyDN(dn, targetDn);
          returnItems.push({
            json: { dn: targetDn, result: "success" },
            pairedItem: { item: itemIndex }
          });
        } else if (operation === "update") {
          const dn = this.getNodeParameter("dn", itemIndex);
          const attributes = this.getNodeParameter("attributes", itemIndex, {});
          const changes = [];
          for (const [action, attrs] of Object.entries(attributes)) {
            attrs.map(
              (attr) => changes.push(
                new import_ldapts.Change({
                  // @ts-ignore
                  operation: action,
                  modification: new import_ldapts.Attribute({
                    type: attr.id,
                    values: [attr.value]
                  })
                })
              )
            );
          }
          await client.modify(dn, changes);
          returnItems.push({
            json: { dn, result: "success", changes },
            pairedItem: { item: itemIndex }
          });
        } else if (operation === "search") {
          const baseDN = this.getNodeParameter("baseDN", itemIndex);
          let searchFor = this.getNodeParameter("searchFor", itemIndex);
          const returnAll = this.getNodeParameter("returnAll", itemIndex);
          const limit = this.getNodeParameter("limit", itemIndex, 0);
          const options = this.getNodeParameter("options", itemIndex);
          const pageSize = this.getNodeParameter(
            "options.pageSize",
            itemIndex,
            1e3
          );
          delete options.pageSize;
          options.sizeLimit = returnAll ? 0 : limit;
          if (pageSize) {
            options.paged = { pageSize };
          }
          if (typeof options.attributes === "string") {
            options.attributes = options.attributes.split(",").map((attribute) => attribute.trim());
          }
          options.explicitBufferAttributes = import_Helpers.BINARY_AD_ATTRIBUTES;
          if (searchFor === "custom") {
            searchFor = this.getNodeParameter("customFilter", itemIndex);
          } else {
            const searchText = this.getNodeParameter("searchText", itemIndex);
            const attribute = this.getNodeParameter("attribute", itemIndex);
            searchFor = `(&${searchFor}(${attribute}=${searchText}))`;
          }
          searchFor = searchFor.replace(/\\\\/g, "\\5c");
          searchFor = searchFor.replace(/\\\*/g, "\\2a");
          searchFor = searchFor.replace(/\\\(/g, "\\28");
          searchFor = searchFor.replace(/\\\)/g, "\\29");
          options.filter = searchFor;
          if (nodeDebug) {
            this.logger.info(
              `[${this.getNode().type} | ${this.getNode().name}] - Search Options ${JSON.stringify(
                options,
                null,
                2
              )}`
            );
          }
          const results = await client.search(baseDN, options);
          if (!returnAll) {
            results.searchEntries = results.searchEntries.slice(0, limit);
          }
          (0, import_Helpers.resolveBinaryAttributes)(results.searchEntries);
          returnItems.push.apply(
            returnItems,
            results.searchEntries.map((result) => ({
              json: result,
              pairedItem: { item: itemIndex }
            }))
          );
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnItems.push({ json: items[itemIndex].json, error, pairedItem: itemIndex });
        } else {
          await client.unbind();
          if (error.context) {
            error.context.itemIndex = itemIndex;
            throw error;
          }
          throw new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
            itemIndex
          });
        }
      }
    }
    if (nodeDebug) {
      this.logger.info(`[${this.getNode().type} | ${this.getNode().name}] - Finished`);
    }
    await client.unbind();
    return [returnItems];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Ldap
});
//# sourceMappingURL=Ldap.node.js.map