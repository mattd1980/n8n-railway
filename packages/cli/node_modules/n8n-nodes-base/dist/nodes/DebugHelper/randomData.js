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
var randomData_exports = {};
__export(randomData_exports, {
  generateCreditCard: () => generateCreditCard,
  generateIPv4: () => generateIPv4,
  generateIPv6: () => generateIPv6,
  generateLocation: () => generateLocation,
  generateMAC: () => generateMAC,
  generateNanoid: () => generateNanoid,
  generateRandomAddress: () => generateRandomAddress,
  generateRandomEmail: () => generateRandomEmail,
  generateRandomUser: () => generateRandomUser,
  generateURL: () => generateURL,
  generateUUID: () => generateUUID,
  generateVersion: () => generateVersion
});
module.exports = __toCommonJS(randomData_exports);
var import_minifaker = require("minifaker");
var import_en = require("minifaker/locales/en");
function generateRandomUser() {
  return {
    uid: import_minifaker.uuid.v4(),
    email: (0, import_minifaker.email)(),
    firstname: (0, import_minifaker.firstName)(),
    lastname: (0, import_minifaker.lastName)(),
    password: (0, import_minifaker.password)()
  };
}
function generateRandomAddress() {
  return {
    firstname: (0, import_minifaker.firstName)(),
    lastname: (0, import_minifaker.lastName)(),
    street: (0, import_minifaker.streetAddress)(),
    city: (0, import_minifaker.cityName)(),
    zip: (0, import_minifaker.zipCode)({ format: "#####" }),
    state: (0, import_minifaker.state)(),
    country: (0, import_minifaker.country)()
  };
}
function generateRandomEmail() {
  return {
    email: (0, import_minifaker.email)(),
    confirmed: (0, import_minifaker.boolean)()
  };
}
function generateUUID() {
  return { uuid: import_minifaker.uuid.v4() };
}
function generateNanoid(customAlphabet, length) {
  return { nanoId: import_minifaker.nanoId.customAlphabet(customAlphabet, parseInt(length, 10))().toString() };
}
function generateCreditCard() {
  return {
    type: (0, import_minifaker.boolean)() ? "MasterCard" : "Visa",
    number: (0, import_minifaker.creditCardNumber)(),
    ccv: (0, import_minifaker.creditCardCVV)(),
    exp: `${(0, import_minifaker.number)({ min: 1, max: 12, float: false }).toString().padStart(2, "0")}/${(0, import_minifaker.number)({
      min: 1,
      max: 40,
      float: false
    }).toString().padStart(2, "0")}`,
    holder_name: `${(0, import_minifaker.firstName)()} ${(0, import_minifaker.lastName)()}`
  };
}
function generateURL() {
  return { url: (0, import_minifaker.domainUrl)() };
}
function generateIPv4() {
  return { ip: (0, import_minifaker.ip)() };
}
function generateIPv6() {
  return { ipv6: (0, import_minifaker.ipv6)() };
}
function generateMAC() {
  return { mac: (0, import_minifaker.macAddress)() };
}
function generateLocation() {
  return { location: (0, import_minifaker.latLong)() };
}
function generateVersion() {
  return { version: (0, import_minifaker.semver)() };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateCreditCard,
  generateIPv4,
  generateIPv6,
  generateLocation,
  generateMAC,
  generateNanoid,
  generateRandomAddress,
  generateRandomEmail,
  generateRandomUser,
  generateURL,
  generateUUID,
  generateVersion
});
//# sourceMappingURL=randomData.js.map