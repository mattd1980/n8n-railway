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
  downloadAttachments: () => downloadAttachments,
  formatSubmission: () => formatSubmission,
  koBoToolboxApiRequest: () => koBoToolboxApiRequest,
  koBoToolboxRawRequest: () => koBoToolboxRawRequest,
  loadForms: () => loadForms,
  parseStringList: () => parseStringList
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_clone = __toESM(require("lodash/clone"));
var import_compact = __toESM(require("lodash/compact"));
var import_concat = __toESM(require("lodash/concat"));
var import_escapeRegExp = __toESM(require("lodash/escapeRegExp"));
var import_every = __toESM(require("lodash/every"));
var import_first = __toESM(require("lodash/first"));
var import_isArray = __toESM(require("lodash/isArray"));
var import_isString = __toESM(require("lodash/isString"));
var import_last = __toESM(require("lodash/last"));
var import_set = __toESM(require("lodash/set"));
var import_some = __toESM(require("lodash/some"));
var import_split = __toESM(require("lodash/split"));
var import_toNumber = __toESM(require("lodash/toNumber"));
var import_toString = __toESM(require("lodash/toString"));
var import_trim = __toESM(require("lodash/trim"));
async function koBoToolboxApiRequest(option = {}) {
  const credentials = await this.getCredentials("koBoToolboxApi");
  const returnAll = !!option.returnAll;
  if (returnAll) {
    (0, import_set.default)(option, "qs.limit", 3e3);
    delete option.returnAll;
  }
  const options = {
    url: "",
    headers: {
      Accept: "application/json"
    },
    json: true
  };
  if (Object.keys(option)) {
    Object.assign(options, option);
  }
  if (options.url && !/^http(s)?:/.test(options.url)) {
    options.url = credentials.URL + options.url;
  }
  let results = null;
  let keepLooking = true;
  while (keepLooking) {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      "koBoToolboxApi",
      options
    );
    results = response.results ? (0, import_concat.default)(results || [], response.results) : response;
    if (returnAll && response.next) {
      options.url = response.next;
    } else {
      keepLooking = false;
    }
  }
  return results;
}
async function koBoToolboxRawRequest(option) {
  const credentials = await this.getCredentials("koBoToolboxApi");
  if (option.url && !/^http(s)?:/.test(option.url)) {
    option.url = credentials.URL + option.url;
  }
  return await this.helpers.httpRequestWithAuthentication.call(this, "koBoToolboxApi", option);
}
function parseGeoPoint(geoPoint) {
  const coordinates = (0, import_split.default)(geoPoint, " ");
  if (coordinates.length >= 2 && (0, import_every.default)(coordinates, (coord) => coord && /^-?\d+(?:\.\d+)?$/.test((0, import_toString.default)(coord)))) {
    return [(0, import_toNumber.default)(coordinates[1]), (0, import_toNumber.default)(coordinates[0])];
  }
  return null;
}
function parseStringList(value) {
  return (0, import_split.default)((0, import_toString.default)(value), /[\s,]+/);
}
const matchWildcard = (value, pattern) => {
  const regex = new RegExp(`^${(0, import_escapeRegExp.default)(pattern).replace("\\*", ".*")}$`);
  return regex.test(value);
};
const formatValue = (value, format) => {
  if ((0, import_isString.default)(value)) {
    value = (0, import_toString.default)(value);
    const geoPoint = parseGeoPoint(value);
    if (geoPoint) {
      return {
        type: "Point",
        coordinates: geoPoint
      };
    }
    const points = value.split(";");
    if (points.length >= 2 && /^[-\d\.\s;]+$/.test(value)) {
      const coordinates = (0, import_compact.default)(points.map(parseGeoPoint));
      if (coordinates.length === points.length) {
        if ((0, import_first.default)(points) === (0, import_last.default)(points)) {
          return {
            type: "Polygon",
            coordinates: [coordinates]
          };
        }
        return { type: "LineString", coordinates };
      }
    }
    if ("number" === format) {
      return (0, import_toNumber.default)(value);
    }
    if ("multiSelect" === format) {
      return (0, import_split.default)((0, import_toString.default)(value), " ");
    }
  }
  return value;
};
function formatSubmission(submission, selectMasks = [], numberMasks = []) {
  const response = {};
  for (const key of Object.keys(submission)) {
    let value = (0, import_clone.default)(submission[key]);
    const sanitizedKey = key.split("/").map((k) => (0, import_trim.default)(k, " _")).join(".");
    const leafKey = sanitizedKey.split(".").pop() || "";
    let format = "string";
    if ((0, import_some.default)(numberMasks, (mask) => matchWildcard(leafKey, mask))) {
      format = "number";
    }
    if ((0, import_some.default)(selectMasks, (mask) => matchWildcard(leafKey, mask))) {
      format = "multiSelect";
    }
    value = formatValue(value, format);
    (0, import_set.default)(response, sanitizedKey, value);
  }
  if ((0, import_isArray.default)(response.geolocation) && response.geolocation.length === 2 && response.geolocation[0] && response.geolocation[1]) {
    response.geolocation = {
      type: "Point",
      coordinates: [response.geolocation[1], response.geolocation[0]]
    };
  }
  return response;
}
async function downloadAttachments(submission, options) {
  const binaryItem = {
    json: {
      ...submission
    },
    binary: {}
  };
  const credentials = await this.getCredentials("koBoToolboxApi");
  const attachmentList = submission._attachments || submission.attachments;
  if (attachmentList?.length) {
    for (const [index, attachment] of attachmentList.entries()) {
      const fileName = attachment.filename;
      const sanitizedFileName = (0, import_toString.default)(fileName).replace(/_[^_]+(?=\.\w+)/, "");
      let relatedQuestion = null;
      if ("question" === options.binaryNamingScheme) {
        for (const question of Object.keys(submission)) {
          const sanitizedQuestionValue = (0, import_toString.default)(submission[question]).replace(/\s/g, "_");
          if (sanitizedFileName === sanitizedQuestionValue) {
            relatedQuestion = question;
            break;
          }
        }
      }
      let response = null;
      const attachmentUrl = attachment[options.version] || attachment.download_url;
      let final = false, redir = 0;
      const axiosOptions = {
        url: attachmentUrl,
        method: "GET",
        headers: {
          Authorization: `Token ${credentials.token}`
        },
        ignoreHttpStatusErrors: true,
        returnFullResponse: true,
        disableFollowRedirect: true,
        encoding: "arraybuffer"
      };
      while (!final && redir < 5) {
        response = await this.helpers.httpRequest(axiosOptions);
        if (response?.headers.location) {
          axiosOptions.url = response.headers.location;
          redir++;
        } else {
          final = true;
        }
      }
      if (response?.body) {
        let binaryName;
        if ("question" === options.binaryNamingScheme && relatedQuestion) {
          binaryName = relatedQuestion;
        } else {
          binaryName = `${options.dataPropertyAttachmentsPrefixName || "attachment_"}${index}`;
        }
        binaryItem.binary[binaryName] = await this.helpers.prepareBinaryData(
          response.body,
          fileName
        );
      }
    }
  } else {
    delete binaryItem.binary;
  }
  return binaryItem;
}
async function loadForms() {
  const responseData = await koBoToolboxApiRequest.call(this, {
    url: "/api/v2/assets/",
    qs: {
      q: "asset_type:survey",
      ordering: "name"
    },
    scroll: true
  });
  return responseData?.map((survey) => ({ name: survey.name, value: survey.uid })) || [];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadAttachments,
  formatSubmission,
  koBoToolboxApiRequest,
  koBoToolboxRawRequest,
  loadForms,
  parseStringList
});
//# sourceMappingURL=GenericFunctions.js.map