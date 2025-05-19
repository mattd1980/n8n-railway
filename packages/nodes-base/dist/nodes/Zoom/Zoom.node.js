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
var Zoom_node_exports = {};
__export(Zoom_node_exports, {
  Zoom: () => Zoom
});
module.exports = __toCommonJS(Zoom_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_MeetingDescription = require("./MeetingDescription");
class Zoom {
  constructor() {
    this.description = {
      displayName: "Zoom",
      name: "zoom",
      group: ["input"],
      version: 1,
      description: "Consume Zoom API",
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      defaults: {
        name: "Zoom"
      },
      icon: "file:zoom.svg",
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          // create a JWT app on Zoom Marketplace
          //https://marketplace.zoom.us/develop/create
          //get the JWT token as access token
          name: "zoomApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["accessToken"]
            }
          }
        },
        {
          //create a account level OAuth app
          //https://marketplace.zoom.us/develop/create
          name: "zoomOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "Access Token",
              value: "accessToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "accessToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Meeting",
              value: "meeting"
            }
            // {
            // 	name: 'Meeting Registrant',
            // 	value: 'meetingRegistrant'
            // },
            // {
            // 	name: 'Webinar',
            // 	value: 'webinar'
            // }
          ],
          default: "meeting"
        },
        //MEETINGS
        ...import_MeetingDescription.meetingOperations,
        ...import_MeetingDescription.meetingFields
        // 	//MEETING REGISTRANTS
        // 	...meetingRegistrantOperations,
        // 	...meetingRegistrantFields,
        // 	//WEBINARS
        // 	...webinarOperations,
        // 	...webinarFields,
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the timezones to display them to user so that they can select them easily
        async getTimezones() {
          const returnData = [];
          for (const timezone of import_moment_timezone.default.tz.names()) {
            const timezoneName = timezone;
            const timezoneId = timezone;
            returnData.push({
              name: timezoneName,
              value: timezoneId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let qs = {};
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < items.length; i++) {
      try {
        qs = {};
        if (resource === "meeting") {
          if (operation === "get") {
            const meetingId = this.getNodeParameter("meetingId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.showPreviousOccurrences) {
              qs.show_previous_occurrences = additionalFields.showPreviousOccurrences;
            }
            if (additionalFields.occurrenceId) {
              qs.occurrence_id = additionalFields.occurrenceId;
            }
            responseData = await import_GenericFunctions.zoomApiRequest.call(this, "GET", `/meetings/${meetingId}`, {}, qs);
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const filters = this.getNodeParameter("filters", i);
            if (filters.type) {
              qs.type = filters.type;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.zoomApiRequestAllItems.call(
                this,
                "meetings",
                "GET",
                "/users/me/meetings",
                {},
                qs
              );
            } else {
              qs.page_size = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.zoomApiRequest.call(this, "GET", "/users/me/meetings", {}, qs);
              responseData = responseData.meetings;
            }
          }
          if (operation === "delete") {
            const meetingId = this.getNodeParameter("meetingId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.scheduleForReminder) {
              qs.schedule_for_reminder = additionalFields.scheduleForReminder;
            }
            if (additionalFields.occurrenceId) {
              qs.occurrence_id = additionalFields.occurrenceId;
            }
            responseData = await import_GenericFunctions.zoomApiRequest.call(
              this,
              "DELETE",
              `/meetings/${meetingId}`,
              {},
              qs
            );
            responseData = { success: true };
          }
          if (operation === "create") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {};
            if (additionalFields.settings) {
              const settingValues = {};
              const settings = additionalFields.settings;
              if (settings.cnMeeting) {
                settingValues.cn_meeting = settings.cnMeeting;
              }
              if (settings.inMeeting) {
                settingValues.in_meeting = settings.inMeeting;
              }
              if (settings.joinBeforeHost) {
                settingValues.join_before_host = settings.joinBeforeHost;
              }
              if (settings.muteUponEntry) {
                settingValues.mute_upon_entry = settings.muteUponEntry;
              }
              if (settings.watermark) {
                settingValues.watermark = settings.watermark;
              }
              if (settings.audio) {
                settingValues.audio = settings.audio;
              }
              if (settings.alternativeHosts) {
                settingValues.alternative_hosts = settings.alternativeHosts;
              }
              if (settings.participantVideo) {
                settingValues.participant_video = settings.participantVideo;
              }
              if (settings.hostVideo) {
                settingValues.host_video = settings.hostVideo;
              }
              if (settings.autoRecording) {
                settingValues.auto_recording = settings.autoRecording;
              }
              if (settings.registrationType) {
                settingValues.registration_type = settings.registrationType;
              }
              body.settings = settingValues;
            }
            body.topic = this.getNodeParameter("topic", i);
            if (additionalFields.type) {
              body.type = additionalFields.type;
            }
            if (additionalFields.startTime) {
              if (additionalFields.timeZone) {
                body.start_time = (0, import_moment_timezone.default)(additionalFields.startTime).format(
                  "YYYY-MM-DDTHH:mm:ss"
                );
              } else {
                body.start_time = import_moment_timezone.default.tz(additionalFields.startTime, this.getTimezone()).format();
              }
            }
            if (additionalFields.duration) {
              body.duration = additionalFields.duration;
            }
            if (additionalFields.scheduleFor) {
              body.schedule_for = additionalFields.scheduleFor;
            }
            if (additionalFields.timeZone) {
              body.timezone = additionalFields.timeZone;
            }
            if (additionalFields.password) {
              body.password = additionalFields.password;
            }
            if (additionalFields.agenda) {
              body.agenda = additionalFields.agenda;
            }
            responseData = await import_GenericFunctions.zoomApiRequest.call(this, "POST", "/users/me/meetings", body, qs);
          }
          if (operation === "update") {
            const meetingId = this.getNodeParameter("meetingId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            if (updateFields.settings) {
              const settingValues = {};
              const settings = updateFields.settings;
              if (settings.cnMeeting) {
                settingValues.cn_meeting = settings.cnMeeting;
              }
              if (settings.inMeeting) {
                settingValues.in_meeting = settings.inMeeting;
              }
              if (settings.joinBeforeHost) {
                settingValues.join_before_host = settings.joinBeforeHost;
              }
              if (settings.muteUponEntry) {
                settingValues.mute_upon_entry = settings.muteUponEntry;
              }
              if (settings.watermark) {
                settingValues.watermark = settings.watermark;
              }
              if (settings.audio) {
                settingValues.audio = settings.audio;
              }
              if (settings.alternativeHosts) {
                settingValues.alternative_hosts = settings.alternativeHosts;
              }
              if (settings.participantVideo) {
                settingValues.participant_video = settings.participantVideo;
              }
              if (settings.hostVideo) {
                settingValues.host_video = settings.hostVideo;
              }
              if (settings.autoRecording) {
                settingValues.auto_recording = settings.autoRecording;
              }
              if (settings.registrationType) {
                settingValues.registration_type = settings.registrationType;
              }
              body.settings = settingValues;
            }
            if (updateFields.topic) {
              body.topic = updateFields.topic;
            }
            if (updateFields.type) {
              body.type = updateFields.type;
            }
            if (updateFields.startTime) {
              body.start_time = updateFields.startTime;
            }
            if (updateFields.duration) {
              body.duration = updateFields.duration;
            }
            if (updateFields.scheduleFor) {
              body.schedule_for = updateFields.scheduleFor;
            }
            if (updateFields.timeZone) {
              body.timezone = updateFields.timeZone;
            }
            if (updateFields.password) {
              body.password = updateFields.password;
            }
            if (updateFields.agenda) {
              body.agenda = updateFields.agenda;
            }
            responseData = await import_GenericFunctions.zoomApiRequest.call(
              this,
              "PATCH",
              `/meetings/${meetingId}`,
              body,
              qs
            );
            responseData = { success: true };
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = {
            json: {},
            error: error.message,
            itemIndex: i
          };
          returnData.push(executionErrorData);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Zoom
});
//# sourceMappingURL=Zoom.node.js.map