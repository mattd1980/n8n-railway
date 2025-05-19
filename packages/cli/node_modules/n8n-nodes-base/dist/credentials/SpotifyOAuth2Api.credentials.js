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
var SpotifyOAuth2Api_credentials_exports = {};
__export(SpotifyOAuth2Api_credentials_exports, {
  SpotifyOAuth2Api: () => SpotifyOAuth2Api
});
module.exports = __toCommonJS(SpotifyOAuth2Api_credentials_exports);
class SpotifyOAuth2Api {
  constructor() {
    this.name = "spotifyOAuth2Api";
    this.extends = ["oAuth2Api"];
    this.displayName = "Spotify OAuth2 API";
    this.documentationUrl = "spotify";
    this.properties = [
      {
        displayName: "Spotify Server",
        name: "server",
        type: "hidden",
        default: "https://api.spotify.com/"
      },
      {
        displayName: "Grant Type",
        name: "grantType",
        type: "hidden",
        default: "authorizationCode"
      },
      {
        displayName: "Authorization URL",
        name: "authUrl",
        type: "hidden",
        default: "https://accounts.spotify.com/authorize",
        required: true
      },
      {
        displayName: "Access Token URL",
        name: "accessTokenUrl",
        type: "hidden",
        default: "https://accounts.spotify.com/api/token",
        required: true
      },
      {
        displayName: "Scope",
        name: "scope",
        type: "hidden",
        default: "user-read-playback-state playlist-read-collaborative user-modify-playback-state playlist-modify-public user-read-currently-playing playlist-read-private user-read-recently-played playlist-modify-private user-library-read user-follow-read"
      },
      {
        displayName: "Auth URI Query Parameters",
        name: "authQueryParameters",
        type: "hidden",
        default: ""
      },
      {
        displayName: "Authentication",
        name: "authentication",
        type: "hidden",
        default: "header"
      }
    ];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpotifyOAuth2Api
});
//# sourceMappingURL=SpotifyOAuth2Api.credentials.js.map