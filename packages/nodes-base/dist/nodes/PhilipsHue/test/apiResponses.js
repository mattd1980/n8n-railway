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
var apiResponses_exports = {};
__export(apiResponses_exports, {
  deleteLightResponse: () => deleteLightResponse,
  getConfigResponse: () => getConfigResponse,
  getLightsResponse: () => getLightsResponse,
  updateLightResponse: () => updateLightResponse
});
module.exports = __toCommonJS(apiResponses_exports);
const getLightsResponse = {
  "1": {
    state: {
      on: false,
      bri: 1,
      hue: 33761,
      sat: 254,
      effect: "none",
      xy: [0.3171, 0.3366],
      ct: 159,
      alert: "none",
      colormode: "xy",
      mode: "homeautomation",
      reachable: true
    },
    swupdate: {
      state: "noupdates",
      lastinstall: "2018-01-02T19:24:20"
    },
    type: "Extended color light",
    name: "Hue color lamp 7",
    modelid: "LCT007",
    manufacturername: "Philips",
    productname: "Hue color lamp",
    capabilities: {
      certified: true,
      control: {
        mindimlevel: 5e3,
        maxlumen: 600,
        colorgamuttype: "B",
        colorgamut: [
          [0.675, 0.322],
          [0.409, 0.518],
          [0.167, 0.04]
        ],
        ct: {
          min: 153,
          max: 500
        }
      },
      streaming: {
        renderer: true,
        proxy: false
      }
    },
    config: {
      archetype: "sultanbulb",
      function: "mixed",
      direction: "omnidirectional"
    },
    uniqueid: "00:17:88:01:00:bd:c7:b9-0b",
    swversion: "5.105.0.21169"
  }
};
const getConfigResponse = {
  name: "Philips hue",
  zigbeechannel: 15,
  mac: "00:17:88:00:00:00",
  dhcp: true,
  ipaddress: "192.168.1.7",
  netmask: "255.255.255.0",
  gateway: "192.168.1.1",
  proxyaddress: "none",
  proxyport: 0,
  UTC: "2014-07-17T09:27:35",
  localtime: "2014-07-17T11:27:35",
  timezone: "Europe/Madrid",
  whitelist: {
    ffffffffe0341b1b376a2389376a2389: {
      "last use date": "2014-07-17T07:21:38",
      "create date": "2014-04-08T08:55:10",
      name: "PhilipsHueAndroidApp#TCT ALCATEL ONE TOU"
    },
    pAtwdCV8NZId25Gk: {
      "last use date": "2014-05-07T18:28:29",
      "create date": "2014-04-09T17:29:16",
      name: "n8n"
    }
  },
  swversion: "01012917",
  apiversion: "1.3.0",
  swupdate: {
    updatestate: 0,
    url: "",
    text: "",
    notify: false
  },
  linkbutton: false,
  portalservices: false,
  portalconnection: "connected",
  portalstate: {
    signedon: true,
    incoming: false,
    outgoing: true,
    communication: "disconnected"
  }
};
const updateLightResponse = [
  { success: { "/lights/1/state/bri": 200 } },
  { success: { "/lights/1/state/on": true } },
  { success: { "/lights/1/state/hue": 5e4 } }
];
const deleteLightResponse = {
  success: "/lights/1 deleted."
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteLightResponse,
  getConfigResponse,
  getLightsResponse,
  updateLightResponse
});
//# sourceMappingURL=apiResponses.js.map