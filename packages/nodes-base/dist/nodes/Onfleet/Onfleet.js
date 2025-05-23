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
var Onfleet_exports = {};
__export(Onfleet_exports, {
  Onfleet: () => Onfleet
});
module.exports = __toCommonJS(Onfleet_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
const formatAddress = (unparsed, address, addressNumber, addressStreet, addressCity, addressCountry, additionalFields) => {
  let destination;
  if (unparsed) {
    destination = { address: { unparsed: address } };
  } else {
    destination = {
      address: {
        number: addressNumber,
        street: addressStreet,
        city: addressCity,
        country: addressCountry
      }
    };
  }
  if (additionalFields.addressName) {
    destination.address.name = additionalFields.addressName;
  }
  if (additionalFields.addressApartment) {
    destination.address.apartment = additionalFields.addressApartment;
  }
  if (additionalFields.addressState) {
    destination.address.state = additionalFields.addressState;
  }
  if (additionalFields.addressPostalCode) {
    destination.address.postalCode = additionalFields.addressPostalCode;
  }
  if (additionalFields.addressNotes) {
    destination.notes = additionalFields.addressNotes;
  }
  return destination;
};
class Onfleet {
  /**
   * Returns a valid formatted destination object
   * @param unparsed Whether the address is parsed or not
   * @param address Destination address
   * @param addressNumber Destination number
   * @param addressStreet Destination street
   * @param addressCity Destination city
   * @param addressCountry Destination country
   * @param additionalFields Destination additional fields
   */
  /**
   * Gets the properties of a destination according to the operation chose
   * @param item Current execution data
   * @param operation Current destination operation
   * @param shared Whether the collection is in other resource or not
   */
  static getDestinationFields(item, operation, shared = false) {
    if (["create", "update"].includes(operation)) {
      if (shared !== false) {
        let destination;
        if (typeof shared === "boolean" && shared) {
          const { destinationProperties = {} } = this.getNodeParameter(
            "destination",
            item
          );
          destination = destinationProperties;
        } else if (typeof shared !== "boolean") {
          const { destination: destinationCollection = {} } = this.getNodeParameter(
            shared.parent,
            item
          );
          destination = destinationCollection.destinationProperties;
        }
        if (!destination || Object.keys(destination).length === 0) {
          return [];
        }
        const {
          unparsed,
          address,
          addressNumber,
          addressStreet,
          addressCity,
          addressCountry,
          ...additionalFields
        } = destination;
        return formatAddress(
          unparsed,
          address,
          addressNumber,
          addressStreet,
          addressCity,
          addressCountry,
          additionalFields
        );
      } else {
        let address, addressNumber, addressStreet, addressCity, addressCountry;
        const unparsed = this.getNodeParameter("unparsed", item);
        if (unparsed) {
          address = this.getNodeParameter("address", item);
        } else {
          addressNumber = this.getNodeParameter("addressNumber", item);
          addressStreet = this.getNodeParameter("addressStreet", item);
          addressCity = this.getNodeParameter("addressCity", item);
          addressCountry = this.getNodeParameter("addressCountry", item);
        }
        const additionalFields = this.getNodeParameter("additionalFields", item);
        return formatAddress(
          unparsed,
          address,
          addressNumber,
          addressStreet,
          addressCity,
          addressCountry,
          additionalFields
        );
      }
    }
    return null;
  }
  /**
   * Gets the properties of an administrator according to the operation chose
   * @param item Current execution data
   * @param operation Current administrator operation
   */
  static getAdminFields(item, operation) {
    if (operation === "create") {
      const name = this.getNodeParameter("name", item);
      const email = this.getNodeParameter("email", item);
      const additionalFields = this.getNodeParameter("additionalFields", item);
      const adminData = { name, email };
      Object.assign(adminData, additionalFields);
      return adminData;
    } else if (operation === "update") {
      const updateFields = this.getNodeParameter("updateFields", item);
      const adminData = {};
      if (!Object.keys(updateFields).length) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Select at least one field to be updated");
      }
      Object.assign(adminData, updateFields);
      return adminData;
    }
    return null;
  }
  /**
   * Gets the properties of a hub according to the operation chose
   * @param item Current execution data
   * @param operation Current hub operation
   */
  static getHubFields(item, operation) {
    if (operation === "create") {
      const destination = Onfleet.getDestinationFields.call(
        this,
        item,
        operation,
        true
      );
      const name = this.getNodeParameter("name", item);
      const additionalFields = this.getNodeParameter("additionalFields", item);
      const hubData = { name, ...destination };
      Object.assign(hubData, additionalFields);
      return hubData;
    } else if (operation === "update") {
      const destination = Onfleet.getDestinationFields.call(this, item, operation, {
        parent: "updateFields"
      });
      const hubData = { ...destination };
      const updateFields = this.getNodeParameter("updateFields", item);
      if (!Object.keys(updateFields).length) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Select at least one field to be updated");
      }
      Object.assign(hubData, updateFields);
      return hubData;
    }
    return null;
  }
  /**
   * Gets the properties of a worker according to the operation chose
   * @param item Current execution data
   * @param operation Current worker operation
   */
  static getWorkerFields(item, operation) {
    if (operation === "create") {
      const name = this.getNodeParameter("name", item);
      const phone = this.getNodeParameter("phone", item);
      const teams = this.getNodeParameter("teams", item);
      const workerData = { name, phone, teams };
      const additionalFields = this.getNodeParameter("additionalFields", item);
      if (additionalFields.vehicle) {
        const { vehicleProperties } = additionalFields.vehicle;
        Object.assign(workerData, { vehicle: vehicleProperties });
        delete additionalFields.vehicle;
      }
      Object.assign(workerData, additionalFields);
      return workerData;
    } else if (operation === "update") {
      const workerData = {};
      const updateFields = this.getNodeParameter("updateFields", item);
      if (!Object.keys(updateFields).length) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Select at least one field to be updated");
      }
      Object.assign(workerData, updateFields);
      return workerData;
    } else if (operation === "get") {
      const options = this.getNodeParameter("options", item, {});
      const workerFilter = {};
      if (options.filter) {
        options.filter = options.filter.join(",");
      }
      if (typeof options.analytics === "boolean") {
        options.analytics = options.analytics ? "true" : "false";
      }
      Object.assign(workerFilter, options);
      return workerFilter;
    } else if (operation === "getAll") {
      const options = this.getNodeParameter("options", item, {});
      const filters = this.getNodeParameter("filters", item, {});
      const workerFilter = {};
      if (filters.states) {
        filters.states = filters.states.join(",");
      }
      if (filters.teams) {
        filters.teams = filters.teams.join(",");
      }
      if (filters.phones) {
        filters.phones = filters.phones.join(",");
      }
      if (options.filter) {
        options.filter = options.filter.join(",");
      }
      Object.assign(workerFilter, options);
      Object.assign(workerFilter, filters);
      return workerFilter;
    } else if (operation === "setSchedule") {
      const { scheduleProperties } = this.getNodeParameter("schedule", item);
      const entries = (scheduleProperties || []).map((entry) => {
        const { timezone, date, shifts } = entry;
        const { shiftsProperties } = shifts;
        return {
          timezone,
          date: (0, import_moment_timezone.default)(date).format("YYYY-MM-DD"),
          shifts: shiftsProperties.map(({ start, end }) => [
            new Date(start).getTime(),
            new Date(end).getTime()
          ])
        };
      });
      return { entries };
    }
    return null;
  }
  /**
   * Gets the properties of a webhooks according to the operation chose
   * @param item Current execution data
   * @param operation Current webhooks operation
   */
  static getWebhookFields(item, operation) {
    if (operation === "create") {
      const url = this.getNodeParameter("url", item);
      const name = this.getNodeParameter("name", item);
      const trigger = this.getNodeParameter("trigger", item);
      const additionalFields = this.getNodeParameter("additionalFields", item);
      const webhookData = { url, name, trigger };
      Object.assign(webhookData, additionalFields);
      return webhookData;
    }
    return null;
  }
  /**
   * Returns a valid formatted recipient object
   * @param name Recipient name
   * @param phone Recipient phone
   * @param additionalFields Recipient additional fields
   */
  static formatRecipient(name, phone, additionalFields, options = {}) {
    const recipient = { name, phone };
    if (additionalFields.recipientNotes) {
      recipient.notes = additionalFields.recipientNotes;
    }
    if (additionalFields.recipientSkipSMSNotifications) {
      recipient.skipSMSNotifications = additionalFields.recipientSkipSMSNotifications;
    }
    if ("recipientSkipPhoneNumberValidation" in options) {
      recipient.skipPhoneNumberValidation = options.recipientSkipPhoneNumberValidation || false;
    }
    return recipient;
  }
  /**
   * Gets the properties of a recipient according to the operation chose
   * @param item Current execution data
   * @param operation Current recipient operation
   * @param shared Whether the collection is in other resource or not
   */
  static getRecipientFields(item, operation, shared = false) {
    if (operation === "create") {
      if (shared) {
        const { recipient: recipientData = {} } = this.getNodeParameter(
          "additionalFields",
          item,
          {}
        );
        const options = this.getNodeParameter("options", item, {});
        const { recipientProperties: recipient = {} } = recipientData;
        if (!recipient || Object.keys(recipient).length === 0) {
          return null;
        }
        const {
          recipientName: name,
          recipientPhone: phone,
          ...additionalFields
        } = recipient;
        return Onfleet.formatRecipient(
          name,
          phone,
          additionalFields,
          options
        );
      } else {
        const name = this.getNodeParameter("recipientName", item);
        const phone = this.getNodeParameter("recipientPhone", item);
        const additionalFields = this.getNodeParameter("additionalFields", item);
        const options = this.getNodeParameter("options", item);
        return Onfleet.formatRecipient(name, phone, additionalFields, options);
      }
    } else if (operation === "update") {
      const {
        recipientName: name = "",
        recipientPhone: phone = "",
        ...additionalFields
      } = this.getNodeParameter("updateFields", item);
      const recipientData = {};
      if (name) {
        recipientData.name = name;
      }
      if (phone) {
        recipientData.phone = phone;
      }
      Object.assign(recipientData, additionalFields);
      return recipientData;
    }
    return null;
  }
  /**
   * Gets the properties of a task according to the operation chose
   * @param item Current execution data
   * @param operation Current task operation
   */
  static getTaskFields(item, operation) {
    if (operation === "create") {
      const additionalFields = this.getNodeParameter("additionalFields", item);
      const destination = Onfleet.getDestinationFields.call(
        this,
        item,
        operation,
        true
      );
      const recipient = Onfleet.getRecipientFields.call(
        this,
        item,
        operation,
        true
      );
      const taskData = { destination, recipients: [recipient] };
      const { completeAfter = null, completeBefore = null, ...extraFields } = additionalFields;
      if (completeAfter) taskData.completeAfter = new Date(completeAfter).getTime();
      if (completeBefore) taskData.completeBefore = new Date(completeBefore).getTime();
      Object.assign(taskData, extraFields);
      return taskData;
    } else if (operation === "update") {
      const updateFields = this.getNodeParameter("updateFields", item);
      const taskData = {};
      if (!Object.keys(updateFields).length) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Select at least one field to be updated");
      }
      const { completeAfter = null, completeBefore = null, ...extraFields } = updateFields;
      if (completeAfter) taskData.completeAfter = new Date(completeAfter).getTime();
      if (completeBefore) taskData.completeBefore = new Date(completeBefore).getTime();
      Object.assign(taskData, extraFields);
      return taskData;
    } else if (operation === "clone") {
      const overrideFields = this.getNodeParameter("overrideFields", item);
      const options = {};
      if (overrideFields.includeMetadata) {
        options.includeMetadata = overrideFields.includeMetadata;
      }
      if (overrideFields.includeBarcodes) {
        options.includeBarcodes = overrideFields.includeBarcodes;
      }
      if (overrideFields.includeDependencies) {
        options.includeDependencies = overrideFields.includeDependencies;
      }
      const { notes, pickupTask, serviceTime, completeAfter, completeBefore } = overrideFields;
      const overridesData = {};
      if (notes) overridesData.notes = notes;
      if (typeof pickupTask !== "undefined") overridesData.pickupTask = pickupTask;
      if (serviceTime) overridesData.serviceTime = serviceTime;
      if (completeAfter) overridesData.completeAfter = new Date(completeAfter).getTime();
      if (completeBefore) overridesData.completeBefore = new Date(completeBefore).getTime();
      if (overridesData && Object.keys(overridesData).length > 0) {
        options.overrides = overridesData;
      }
      return { options };
    } else if (operation === "getAll") {
      const filters = this.getNodeParameter("filters", item);
      const listTaskData = {};
      const allStates = "0,1,2,3";
      const twoWeeksInMilisecods = () => 604800 * 1e3;
      if (filters.from) {
        listTaskData.from = new Date(filters.from).getTime();
      } else {
        listTaskData.from = (/* @__PURE__ */ new Date()).getTime() - twoWeeksInMilisecods();
      }
      if (filters.to) {
        listTaskData.to = new Date(filters.to).getTime();
      }
      if (filters.state) {
        listTaskData.state = filters.state.join(",");
        if (listTaskData.state.includes("all")) {
          listTaskData.state = allStates;
        }
      }
      return listTaskData;
    } else if (operation === "complete") {
      const additionalFields = this.getNodeParameter("additionalFields", item);
      const success = this.getNodeParameter("success", item);
      const taskData = { completionDetails: { success } };
      if (additionalFields.notes) {
        taskData.completionDetails.notes = additionalFields.notes;
      }
      return taskData;
    }
    return null;
  }
  /**
   * Gets the properties of a team according to the operation chose
   * @param item Current execution data
   * @param operation Current team operation
   */
  static getTeamFields(item, operation) {
    if (operation === "create") {
      const name = this.getNodeParameter("name", item);
      const workers = this.getNodeParameter("workers", item);
      const managers = this.getNodeParameter("managers", item);
      const additionalFields = this.getNodeParameter("additionalFields", item);
      const teamData = { name, workers, managers };
      Object.assign(teamData, additionalFields);
      return teamData;
    } else if (operation === "update") {
      const teamData = {};
      const updateFields = this.getNodeParameter("updateFields", item);
      if (!Object.keys(updateFields).length) {
        throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Select at least one field to be updated");
      }
      Object.assign(teamData, updateFields);
      return teamData;
    } else if (operation === "getTimeEstimates") {
      const {
        dropOff = {},
        pickUp = {},
        ...additionalFields
      } = this.getNodeParameter("filters", item);
      const { dropOffProperties = {} } = dropOff;
      const { pickUpProperties = {} } = pickUp;
      const hasPickUp = pickUp && Object.keys(pickUpProperties).length > 0;
      const hasDropOff = dropOffProperties && Object.keys(dropOffProperties).length > 0;
      if (!hasPickUp && !hasDropOff) {
        throw new import_n8n_workflow.NodeOperationError(
          this.getNode(),
          "At least 1 of Drop-Off location or Pick-Up location must be selected"
        );
      }
      const workerTimeEstimates = {};
      if (hasPickUp) {
        const {
          pickupLongitude: longitude,
          pickupLatitude: latitude,
          pickupTime
        } = pickUpProperties;
        workerTimeEstimates.pickupLocation = `${longitude},${latitude}`;
        if (pickupTime) {
          workerTimeEstimates.pickupTime = (0, import_moment_timezone.default)(new Date(pickupTime)).local().unix();
        }
      }
      if (hasDropOff) {
        const { dropOffLongitude: longitude, dropOffLatitude: latitude } = dropOffProperties;
        workerTimeEstimates.dropoffLocation = `${longitude},${latitude}`;
      }
      Object.assign(workerTimeEstimates, additionalFields);
      return workerTimeEstimates;
    } else if (operation === "autoDispatch") {
      const teamAutoDispatch = {};
      const {
        scheduleTimeWindow = {},
        taskTimeWindow = {},
        endingRoute = {},
        ...additionalFields
      } = this.getNodeParameter("additionalFields", item);
      const { endingRouteProperties = {} } = endingRoute;
      const { scheduleTimeWindowProperties = {} } = scheduleTimeWindow;
      const { taskTimeWindowProperties = {} } = taskTimeWindow;
      if (scheduleTimeWindowProperties && Object.keys(scheduleTimeWindowProperties).length > 0) {
        const { startTime, endTime } = scheduleTimeWindowProperties;
        teamAutoDispatch.scheduleTimeWindow = [
          (0, import_moment_timezone.default)(new Date(startTime)).local().unix(),
          (0, import_moment_timezone.default)(new Date(endTime)).local().unix()
        ];
      }
      if (endingRouteProperties && Object.keys(endingRouteProperties).length > 0) {
        const { routeEnd, hub } = endingRouteProperties;
        teamAutoDispatch.routeEnd = {
          anywhere: null,
          hub: `hub://${hub}`,
          team_hub: "teams://DEFAULT",
          worker_routing_address: "workers://ROUTING_ADDRESS"
        }[routeEnd];
      }
      if (taskTimeWindowProperties && Object.keys(taskTimeWindowProperties).length > 0) {
        const { startTime, endTime } = taskTimeWindowProperties;
        teamAutoDispatch.taskTimeWindow = [
          (0, import_moment_timezone.default)(new Date(startTime)).local().unix(),
          (0, import_moment_timezone.default)(new Date(endTime)).local().unix()
        ];
      }
      Object.assign(teamAutoDispatch, additionalFields);
      return teamAutoDispatch;
    }
    return null;
  }
  /**
   * Execute the task operations
   * @param resource Resource to be executed (Task)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeTaskOperations(resource, operation, items) {
    if (operation === "create" && Object.keys(items).length > 1) {
      const path = `${resource}/batch`;
      const tasksData = {
        tasks: items.map((_item, index) => Onfleet.getTaskFields.call(this, index, operation))
      };
      const { tasks: tasksCreated } = await import_GenericFunctions.onfleetApiRequest.call(this, "POST", path, tasksData);
      return tasksCreated;
    }
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "create") {
          const taskData = Onfleet.getTaskFields.call(this, index, operation);
          if (!taskData) {
            continue;
          }
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", resource, taskData));
        } else if (operation === "get") {
          const id = this.getNodeParameter("id", index);
          const shortId = String(id).length <= 8;
          const path = `${resource}${shortId ? "/shortId" : ""}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path));
        } else if (operation === "clone") {
          const id = this.getNodeParameter("id", index);
          const taskData = Onfleet.getTaskFields.call(this, index, operation);
          if (!taskData) {
            continue;
          }
          const path = `${resource}/${id}/clone`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", path, taskData));
        } else if (operation === "delete") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          await import_GenericFunctions.onfleetApiRequest.call(this, "DELETE", path);
          responseData.push({ success: true });
        } else if (operation === "getAll") {
          const taskData = Onfleet.getTaskFields.call(this, 0, operation);
          if (!taskData) return [];
          const returnAll = this.getNodeParameter("returnAll", 0, false);
          const path = `${resource}/all`;
          let tasks;
          if (returnAll === true) {
            tasks = await import_GenericFunctions.onfleetApiRequestAllItems.call(this, "tasks", "GET", path, {}, taskData);
          } else {
            const limit = this.getNodeParameter("limit", 0);
            tasks = await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path, {}, taskData);
            tasks = tasks.tasks;
            tasks = tasks.splice(0, limit);
          }
          responseData.push(...tasks);
        } else if (operation === "complete") {
          const id = this.getNodeParameter("id", index);
          const taskData = Onfleet.getTaskFields.call(this, index, operation);
          if (!taskData) {
            continue;
          }
          const path = `${resource}/${id}/complete`;
          await import_GenericFunctions.onfleetApiRequest.call(this, "POST", path, taskData);
          responseData.push({ success: true });
        } else if (operation === "update") {
          const id = this.getNodeParameter("id", 0);
          const path = `${resource}/${id}`;
          const taskData = Onfleet.getTaskFields.call(this, index, operation);
          if (!taskData) {
            continue;
          }
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "PUT", path, taskData));
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the destination operations
   * @param resource Resource to be executed (Destination)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeDestinationOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "create") {
          const destinationData = Onfleet.getDestinationFields.call(this, index, operation);
          if (!destinationData) {
            continue;
          }
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", resource, destinationData));
        } else if (operation === "get") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path));
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the organization operations
   * @param resource Resource to be executed (Organization)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeOrganizationOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "get") {
          const path = "organization";
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path));
        } else if (operation === "getDelegatee") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path));
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the recipient operations
   * @param resource Resource to be executed (Recipient)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeRecipientOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "create") {
          const recipientData = Onfleet.getRecipientFields.call(this, index, operation);
          if (!recipientData) {
            continue;
          }
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", resource, recipientData));
        } else if (operation === "update") {
          const recipientData = Onfleet.getRecipientFields.call(this, index, operation);
          if (!recipientData) {
            continue;
          }
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "PUT", path, recipientData));
        } else if (operation === "get") {
          const lookupBy = this.getNodeParameter("getBy", index);
          const lookupByValue = this.getNodeParameter(lookupBy, index);
          const path = `${resource}${lookupBy === "id" ? "" : "/" + lookupBy}/${lookupByValue}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path));
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the administrator operations
   * @param resource Resource to be executed (Administrator)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeAdministratorOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", 0, false);
          let adminUsers = await import_GenericFunctions.onfleetApiRequest.call(this, "GET", resource);
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", 0);
            adminUsers = adminUsers.slice(0, limit);
          }
          responseData.push(...adminUsers);
        } else if (operation === "create") {
          const adminData = Onfleet.getAdminFields.call(this, index, operation);
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", resource, adminData));
        } else if (operation === "update") {
          const id = this.getNodeParameter("id", index);
          const adminData = Onfleet.getAdminFields.call(this, index, operation);
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "PUT", path, adminData));
        } else if (operation === "delete") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          await import_GenericFunctions.onfleetApiRequest.call(this, "DELETE", path);
          responseData.push({ success: true });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the hub operations
   * @param resource Resource to be executed (Hub)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeHubOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", 0, false);
          let hubs = await import_GenericFunctions.onfleetApiRequest.call(this, "GET", resource);
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", 0);
            hubs = hubs.slice(0, limit);
          }
          responseData.push(...hubs);
        } else if (operation === "create") {
          const hubData = Onfleet.getHubFields.call(this, index, operation);
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", resource, hubData));
        }
        if (operation === "update") {
          const id = this.getNodeParameter("id", index);
          const hubData = Onfleet.getHubFields.call(this, index, operation);
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "PUT", path, hubData));
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the worker operations
   * @param resource Resource to be executed (Worker)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeWorkerOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "getAll") {
          const byLocation = this.getNodeParameter("byLocation", index);
          const returnAll = this.getNodeParameter("returnAll", index, false);
          let workers;
          if (byLocation) {
            const longitude = this.getNodeParameter("longitude", index);
            const latitude = this.getNodeParameter("latitude", index);
            const filters = this.getNodeParameter("filters", index);
            const path = `${resource}/location`;
            workers = await import_GenericFunctions.onfleetApiRequest.call(
              this,
              "GET",
              path,
              {},
              { longitude, latitude, ...filters }
            );
            workers = workers.workers;
          } else {
            const workerFilters = Onfleet.getWorkerFields.call(
              this,
              0,
              operation
            );
            workers = await import_GenericFunctions.onfleetApiRequest.call(this, "GET", resource, {}, workerFilters);
          }
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", index);
            workers = workers.slice(0, limit);
          }
          responseData.push(...workers);
        } else if (operation === "get") {
          const id = this.getNodeParameter("id", index);
          const workerFilters = Onfleet.getWorkerFields.call(
            this,
            index,
            operation
          );
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path, {}, workerFilters));
        } else if (operation === "create") {
          const workerData = Onfleet.getWorkerFields.call(this, index, operation);
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", resource, workerData));
        } else if (operation === "update") {
          const id = this.getNodeParameter("id", index);
          const workerData = Onfleet.getWorkerFields.call(this, index, operation);
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "PUT", path, workerData));
        } else if (operation === "delete") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          await import_GenericFunctions.onfleetApiRequest.call(this, "DELETE", path);
          responseData.push({ success: true });
        } else if (operation === "getSchedule") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}/schedule`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path));
        } else if (operation === "setSchedule") {
          const id = this.getNodeParameter("id", index);
          const workerSchedule = Onfleet.getWorkerFields.call(
            this,
            index,
            operation
          );
          const path = `${resource}/${id}/schedule`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", path, workerSchedule));
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the webhook operations
   * @param resource Resource to be executed (Webhook)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeWebhookOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "getAll") {
          responseData.push(
            ...await import_GenericFunctions.onfleetApiRequest.call(this, "GET", resource)
          );
        } else if (operation === "create") {
          const webhookData = Onfleet.getWebhookFields.call(this, index, operation);
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", resource, webhookData));
        } else if (operation === "delete") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          await import_GenericFunctions.onfleetApiRequest.call(this, "DELETE", path);
          responseData.push({ success: true });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the containers operations
   * @param resource Resource to be executed (Container)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeContainerOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "get") {
          const containerId = this.getNodeParameter("containerId", index);
          const containerType = this.getNodeParameter("containerType", index);
          const path = `${resource}/${containerType}/${containerId}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path));
        } else if (["addTask", "updateTask"].includes(operation)) {
          const containerId = this.getNodeParameter("containerId", index);
          const containerType = this.getNodeParameter("containerType", index, "workers");
          const options = this.getNodeParameter("options", index);
          const tasks = this.getNodeParameter("tasks", index);
          if (operation === "addTask") {
            const type = this.getNodeParameter("type", index);
            if (type === 1) {
              const tasksIndex = this.getNodeParameter("index", index);
              tasks.unshift(tasksIndex);
            } else {
              tasks.unshift(type);
            }
          }
          const path = `${resource}/${containerType}/${containerId}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "PUT", path, { tasks, ...options }));
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
  /**
   * Execute the team operations
   * @param resource Resource to be executed (Team)
   * @param operation Operation to be executed
   * @param items Number of items to process by the node
   */
  static async executeTeamOperations(resource, operation, items) {
    const responseData = [];
    for (const key of Object.keys(items)) {
      const index = Number(key);
      try {
        if (operation === "getAll") {
          const returnAll = this.getNodeParameter("returnAll", 0, false);
          let teams = await import_GenericFunctions.onfleetApiRequest.call(this, "GET", resource);
          if (!returnAll) {
            const limit = this.getNodeParameter("limit", 0);
            teams = teams.slice(0, limit);
          }
          responseData.push(...teams);
        } else if (operation === "get") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path));
        } else if (operation === "create") {
          const teamData = Onfleet.getTeamFields.call(this, index, operation);
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", resource, teamData));
        } else if (operation === "update") {
          const id = this.getNodeParameter("id", index);
          const teamData = Onfleet.getTeamFields.call(this, index, operation);
          const path = `${resource}/${id}`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "PUT", path, teamData));
        } else if (operation === "delete") {
          const id = this.getNodeParameter("id", index);
          const path = `${resource}/${id}`;
          await import_GenericFunctions.onfleetApiRequest.call(this, "DELETE", path);
          responseData.push({ success: true });
        } else if (operation === "getTimeEstimates") {
          const id = this.getNodeParameter("id", index);
          const workerTimeEstimates = Onfleet.getTeamFields.call(
            this,
            index,
            operation
          );
          const path = `${resource}/${id}/estimate`;
          responseData.push(
            await import_GenericFunctions.onfleetApiRequest.call(this, "GET", path, {}, workerTimeEstimates)
          );
        } else if (operation === "autoDispatch") {
          const id = this.getNodeParameter("id", index);
          const teamAutoDispatch = Onfleet.getTeamFields.call(
            this,
            index,
            operation
          );
          const path = `${resource}/${id}/dispatch`;
          responseData.push(await import_GenericFunctions.onfleetApiRequest.call(this, "POST", path, teamAutoDispatch));
        }
      } catch (error) {
        if (this.continueOnFail()) {
          responseData.push({ error: error.toString() });
          continue;
        }
        throw error;
      }
    }
    return responseData;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Onfleet
});
//# sourceMappingURL=Onfleet.js.map