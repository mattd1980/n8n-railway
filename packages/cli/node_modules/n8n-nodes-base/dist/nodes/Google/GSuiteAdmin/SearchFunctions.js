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
var SearchFunctions_exports = {};
__export(SearchFunctions_exports, {
  searchDevices: () => searchDevices,
  searchGroups: () => searchGroups,
  searchUsers: () => searchUsers
});
module.exports = __toCommonJS(SearchFunctions_exports);
var import_GenericFunctions = require("./GenericFunctions");
async function searchUsers() {
  const qs = {
    customer: "my_customer"
  };
  const responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
    this,
    "users",
    "GET",
    "/directory/v1/users",
    {},
    qs
  );
  if (!Array.isArray(responseData)) {
    return { results: [] };
  }
  const results = responseData.map(
    (user) => ({
      name: user.name?.fullName ?? user.id,
      value: user.id
    })
  );
  return { results };
}
async function searchGroups() {
  const qs = {
    customer: "my_customer"
  };
  const responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
    this,
    "groups",
    "GET",
    "/directory/v1/groups",
    {},
    qs
  );
  if (!Array.isArray(responseData)) {
    return { results: [] };
  }
  const results = responseData.map(
    (group) => ({
      name: group.name || group.email || "Unnamed Group",
      value: group.id
    })
  );
  return { results };
}
async function searchDevices() {
  const qs = {
    customerId: "my_customer"
  };
  const responseData = await import_GenericFunctions.googleApiRequest.call(
    this,
    "GET",
    "/directory/v1/customer/my_customer/devices/chromeos/",
    {},
    qs
  );
  if (!Array.isArray(responseData?.chromeosdevices)) {
    return { results: [] };
  }
  const results = responseData.chromeosdevices.map(
    (device) => ({
      name: device.serialNumber || device.deviceId || "Unknown Device",
      value: device.deviceId
    })
  );
  return { results };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  searchDevices,
  searchGroups,
  searchUsers
});
//# sourceMappingURL=SearchFunctions.js.map