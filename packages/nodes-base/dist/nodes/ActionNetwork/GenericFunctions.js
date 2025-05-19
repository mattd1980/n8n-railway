"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  actionNetworkApiRequest: () => actionNetworkApiRequest,
  adjustEventPayload: () => adjustEventPayload,
  adjustPersonPayload: () => adjustPersonPayload,
  adjustPetitionPayload: () => adjustPetitionPayload,
  extractId: () => extractId,
  handleListing: () => handleListing,
  isPrimary: () => isPrimary,
  makeOsdiLink: () => makeOsdiLink,
  resourceLoaders: () => resourceLoaders,
  simplifyResponse: () => simplifyResponse
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_flow = __toESM(require("lodash/flow"));
var import_omit = __toESM(require("lodash/omit"));
async function actionNetworkApiRequest(method, endpoint, body = {}, qs = {}) {
  const options = {
    method,
    body,
    qs,
    uri: `https://actionnetwork.org/api/v2${endpoint}`,
    json: true
  };
  if (!Object.keys(body).length) {
    delete options.body;
  }
  if (!Object.keys(qs).length) {
    delete options.qs;
  }
  return await this.helpers.requestWithAuthentication.call(this, "actionNetworkApi", options);
}
const toItemsKey = (endpoint) => {
  if (endpoint.includes("/signatures") || endpoint.includes("/attendances") || endpoint.includes("/taggings")) {
    endpoint = endpoint.split("/").pop();
  }
  return `osdi:${endpoint.replace(/\//g, "")}`;
};
async function handleListing(method, endpoint, body = {}, qs = {}, options) {
  const returnData = [];
  let responseData;
  qs.perPage = 25;
  qs.page = 1;
  const returnAll = options?.returnAll ?? this.getNodeParameter("returnAll", 0, false);
  const limit = this.getNodeParameter("limit", 0, 0);
  const itemsKey = toItemsKey(endpoint);
  do {
    responseData = await actionNetworkApiRequest.call(
      this,
      method,
      endpoint,
      body,
      qs
    );
    const items = responseData._embedded[itemsKey];
    returnData.push(...items);
    if (!returnAll && returnData.length >= limit) {
      return returnData.slice(0, limit);
    }
    if (responseData._links?.next?.href) {
      const queryString = new URLSearchParams(
        responseData._links.next.href.split("?")[1]
      );
      qs.page = queryString.get("page");
    }
  } while (responseData._links?.next);
  return returnData;
}
const extractId = (response) => {
  return response._links.self.href.split("/").pop() ?? "No ID";
};
const makeOsdiLink = (personId) => {
  return {
    _links: {
      "osdi:person": {
        href: `https://actionnetwork.org/api/v2/people/${personId}`
      }
    }
  };
};
const isPrimary = (field) => field.primary;
function adjustLanguagesSpoken(allFields) {
  if (!allFields.languages_spoken) return allFields;
  return {
    ...(0, import_omit.default)(allFields, ["languages_spoken"]),
    languages_spoken: [allFields.languages_spoken]
  };
}
function adjustPhoneNumbers(allFields) {
  if (!allFields.phone_numbers) return allFields;
  return {
    ...(0, import_omit.default)(allFields, ["phone_numbers"]),
    phone_numbers: [allFields.phone_numbers.phone_numbers_fields]
  };
}
function adjustPostalAddresses(allFields) {
  if (!allFields.postal_addresses) return allFields;
  if (allFields.postal_addresses.postal_addresses_fields.length) {
    const adjusted = allFields.postal_addresses.postal_addresses_fields.map((field) => {
      const copy = {
        ...(0, import_omit.default)(field, ["address_lines", "location"])
      };
      if (field.address_lines) {
        copy.address_lines = [field.address_lines];
      }
      if (field.location) {
        copy.location = field.location.location_fields;
      }
      return copy;
    });
    return {
      ...(0, import_omit.default)(allFields, ["postal_addresses"]),
      postal_addresses: adjusted
    };
  }
}
function adjustLocation(allFields) {
  if (!allFields.location) return allFields;
  const locationFields = allFields.location.postal_addresses_fields;
  const adjusted = {
    ...(0, import_omit.default)(locationFields, ["address_lines", "location"])
  };
  if (locationFields.address_lines) {
    adjusted.address_lines = [locationFields.address_lines];
  }
  if (locationFields.location) {
    adjusted.location = locationFields.location.location_fields;
  }
  return {
    ...(0, import_omit.default)(allFields, ["location"]),
    location: adjusted
  };
}
function adjustTargets(allFields) {
  if (!allFields.target) return allFields;
  const adjusted = allFields.target.split(",").map((value) => ({ name: value }));
  return {
    ...(0, import_omit.default)(allFields, ["target"]),
    target: adjusted
  };
}
const adjustPersonPayload = (0, import_flow.default)(
  adjustLanguagesSpoken,
  adjustPhoneNumbers,
  adjustPostalAddresses
);
const adjustPetitionPayload = adjustTargets;
const adjustEventPayload = adjustLocation;
async function loadResource(resource) {
  return await handleListing.call(this, "GET", `/${resource}`, {}, {}, { returnAll: true });
}
const resourceLoaders = {
  async getTags() {
    const tags = await loadResource.call(this, "tags");
    return tags.map((tag) => ({ name: tag.name, value: extractId(tag) }));
  },
  async getTaggings() {
    const tagId = this.getNodeParameter("tagId", 0);
    const endpoint = `/tags/${tagId}/taggings`;
    const taggings = await handleListing.call(
      this,
      "GET",
      endpoint,
      {},
      {},
      { returnAll: true }
    );
    return taggings.map((tagging) => {
      const taggingId = extractId(tagging);
      return {
        name: taggingId,
        value: taggingId
      };
    });
  }
};
const simplifyPersonResponse = (response) => {
  const emailAddress = response.email_addresses.filter(isPrimary);
  const phoneNumber = response.phone_numbers.filter(isPrimary);
  const postalAddress = response.postal_addresses.filter(isPrimary);
  const fieldsToSimplify = [
    "identifiers",
    "email_addresses",
    "phone_numbers",
    "postal_addresses",
    "languages_spoken",
    "_links"
  ];
  return {
    id: extractId(response),
    ...(0, import_omit.default)(response, fieldsToSimplify),
    ...{ email_address: emailAddress[0].address || "" },
    ...{ phone_number: phoneNumber[0].number || "" },
    ...{
      postal_address: {
        ...postalAddress && (0, import_omit.default)(postalAddress[0], "address_lines"),
        address_lines: postalAddress[0].address_lines ?? ""
      }
    },
    language_spoken: response.languages_spoken[0]
  };
};
const simplifyPetitionResponse = (response) => {
  const fieldsToSimplify = ["identifiers", "_links", "action_network:hidden", "_embedded"];
  return {
    id: extractId(response),
    ...(0, import_omit.default)(response, fieldsToSimplify),
    creator: simplifyPersonResponse(response._embedded["osdi:creator"])
  };
};
const simplifyResponse = (response, resource) => {
  if (resource === "person") {
    return simplifyPersonResponse(response);
  } else if (resource === "petition") {
    return simplifyPetitionResponse(response);
  }
  const fieldsToSimplify = ["identifiers", "_links", "action_network:sponsor", "reminders"];
  return {
    id: extractId(response),
    ...(0, import_omit.default)(response, fieldsToSimplify)
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actionNetworkApiRequest,
  adjustEventPayload,
  adjustPersonPayload,
  adjustPetitionPayload,
  extractId,
  handleListing,
  isPrimary,
  makeOsdiLink,
  resourceLoaders,
  simplifyResponse
});
//# sourceMappingURL=GenericFunctions.js.map