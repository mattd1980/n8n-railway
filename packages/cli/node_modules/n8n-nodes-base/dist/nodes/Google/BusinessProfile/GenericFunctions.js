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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  addUpdateMaskPresend: () => addUpdateMaskPresend,
  googleApiRequest: () => googleApiRequest,
  handleDatesPresend: () => handleDatesPresend,
  handleErrorsDeletePost: () => handleErrorsDeletePost,
  handleErrorsDeleteReply: () => handleErrorsDeleteReply,
  handleErrorsGetPost: () => handleErrorsGetPost,
  handleErrorsGetReview: () => handleErrorsGetReview,
  handleErrorsReplyToReview: () => handleErrorsReplyToReview,
  handleErrorsUpdatePost: () => handleErrorsUpdatePost,
  handlePagination: () => handlePagination,
  searchAccounts: () => searchAccounts,
  searchLocations: () => searchLocations,
  searchPosts: () => searchPosts,
  searchReviews: () => searchReviews
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
const addOptName = "additionalOptions";
const possibleRootProperties = ["localPosts", "reviews"];
const getAllParams = (execFns) => {
  const params = execFns.getNode().parameters;
  const additionalOptions = execFns.getNodeParameter(addOptName, {});
  return { ...params, ...additionalOptions };
};
async function handleDatesPresend(opts) {
  const params = getAllParams(this);
  const body = Object.assign({}, opts.body);
  const event = body.event ?? {};
  if (!params.startDateTime && !params.startDate && !params.endDateTime && !params.endDate) {
    return opts;
  }
  const createDateTimeObject = (dateString) => {
    const date = new Date(dateString);
    return {
      date: {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate()
      },
      time: dateString.includes("T") ? {
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        nanos: 0
      } : void 0
    };
  };
  const startDateTime = params.startDateTime || params.startDate ? createDateTimeObject(params.startDateTime || params.startDate) : null;
  const endDateTime = params.endDateTime || params.endDate ? createDateTimeObject(params.endDateTime || params.endDate) : null;
  const schedule = {
    startDate: startDateTime?.date,
    endDate: endDateTime?.date,
    startTime: startDateTime?.time,
    endTime: endDateTime?.time
  };
  event.schedule = schedule;
  Object.assign(body, { event });
  opts.body = body;
  return opts;
}
async function addUpdateMaskPresend(opts) {
  const additionalOptions = this.getNodeParameter("additionalOptions");
  const propertyMapping = {
    postType: "topicType",
    actionType: "actionType",
    callToActionType: "callToAction.actionType",
    url: "callToAction.url",
    startDateTime: "event.schedule.startDate,event.schedule.startTime",
    endDateTime: "event.schedule.endDate,event.schedule.endTime",
    title: "event.title",
    startDate: "event.schedule.startDate",
    endDate: "event.schedule.endDate",
    couponCode: "offer.couponCode",
    redeemOnlineUrl: "offer.redeemOnlineUrl",
    termsAndConditions: "offer.termsAndConditions"
  };
  if (Object.keys(additionalOptions).length) {
    const updateMask = Object.keys(additionalOptions).map((key) => propertyMapping[key] || key).join(",");
    opts.qs = {
      ...opts.qs,
      updateMask
    };
  }
  return opts;
}
async function handlePagination(resultOptions) {
  const aggregatedResult = [];
  let nextPageToken;
  const returnAll = this.getNodeParameter("returnAll");
  let limit = 100;
  if (!returnAll) {
    limit = this.getNodeParameter("limit");
    resultOptions.maxResults = limit;
  }
  resultOptions.paginate = true;
  do {
    if (nextPageToken) {
      resultOptions.options.qs = { ...resultOptions.options.qs, pageToken: nextPageToken };
    }
    const responseData = await this.makeRoutingRequest(resultOptions);
    for (const page of responseData) {
      for (const prop of possibleRootProperties) {
        if (page.json[prop]) {
          const currentData = page.json[prop];
          aggregatedResult.push(...currentData);
        }
      }
      if (!returnAll && aggregatedResult.length >= limit) {
        return aggregatedResult.slice(0, limit).map((item) => ({ json: item }));
      }
      nextPageToken = page.json.nextPageToken;
    }
  } while (nextPageToken);
  return aggregatedResult.map((item) => ({ json: item }));
}
async function handleErrorsDeletePost(data, response) {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    const post = this.getNodeParameter("post", void 0);
    if (post && response.statusCode === 404) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        'The post you are deleting could not be found. Adjust the "post" parameter setting to delete the post correctly.'
      );
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response.body, {
      message: response.statusMessage,
      httpCode: response.statusCode.toString()
    });
  }
  return data;
}
async function handleErrorsGetPost(data, response) {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    const post = this.getNodeParameter("post", void 0);
    if (post && response.statusCode === 404) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        'The post you are requesting could not be found. Adjust the "post" parameter setting to retrieve the post correctly.'
      );
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response.body, {
      message: response.statusMessage,
      httpCode: response.statusCode.toString()
    });
  }
  return data;
}
async function handleErrorsUpdatePost(data, response) {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    const post = this.getNodeParameter("post");
    const additionalOptions = this.getNodeParameter("additionalOptions");
    if (post && response.statusCode === 404) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        'The post you are updating could not be found. Adjust the "post" parameter setting to update the post correctly.'
      );
    }
    if (response.statusCode === 400 && Object.keys(additionalOptions).length === 0) {
      return [{ json: { success: true } }];
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response.body, {
      message: response.statusMessage,
      httpCode: response.statusCode.toString()
    });
  }
  return data;
}
async function handleErrorsDeleteReply(data, response) {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    const review = this.getNodeParameter("review", void 0);
    if (review && response.statusCode === 404) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        'The review you are deleting could not be found. Adjust the "review" parameter setting to update the review correctly.'
      );
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response.body, {
      message: response.statusMessage,
      httpCode: response.statusCode.toString()
    });
  }
  return data;
}
async function handleErrorsGetReview(data, response) {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    const review = this.getNodeParameter("review", void 0);
    if (review && response.statusCode === 404) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        'The review you are requesting could not be found. Adjust the "review" parameter setting to update the review correctly.'
      );
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response.body, {
      message: response.statusMessage,
      httpCode: response.statusCode.toString()
    });
  }
  return data;
}
async function handleErrorsReplyToReview(data, response) {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    const review = this.getNodeParameter("review", void 0);
    if (review && response.statusCode === 404) {
      throw new import_n8n_workflow.NodeOperationError(
        this.getNode(),
        'The review you are replying to could not be found. Adjust the "review" parameter setting to reply to the review correctly.'
      );
    }
    throw new import_n8n_workflow.NodeApiError(this.getNode(), response.body, {
      message: response.statusMessage,
      httpCode: response.statusCode.toString()
    });
  }
  return data;
}
async function googleApiRequest(method, resource, body = {}, qs = {}, url) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    url: url ?? `https://mybusiness.googleapis.com/v4${resource}`,
    json: true
  };
  try {
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.httpRequestWithAuthentication.call(
      this,
      "googleBusinessProfileOAuth2Api",
      options
    );
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function searchAccounts(filter, paginationToken) {
  const query = {};
  if (paginationToken) {
    query.pageToken = paginationToken;
  }
  const responseData = await googleApiRequest.call(
    this,
    "GET",
    "",
    {},
    {
      pageSize: 20,
      ...query
    },
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts"
  );
  const accounts = responseData.accounts;
  const results = accounts.map((a) => ({
    name: a.accountName,
    value: a.name
  })).filter(
    (a) => !filter || a.name.toLowerCase().includes(filter.toLowerCase()) || a.value.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  return { results, paginationToken: responseData.nextPageToken };
}
async function searchLocations(filter, paginationToken) {
  const query = {};
  if (paginationToken) {
    query.pageToken = paginationToken;
  }
  const account = this.getNodeParameter("account").value;
  const responseData = await googleApiRequest.call(
    this,
    "GET",
    "",
    {},
    {
      readMask: "name",
      pageSize: 100,
      ...query
    },
    `https://mybusinessbusinessinformation.googleapis.com/v1/${account}/locations`
  );
  const locations = responseData.locations;
  const results = locations.map((a) => ({
    name: a.name,
    value: a.name
  })).filter((a) => !filter || a.name.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  return { results, paginationToken: responseData.nextPageToken };
}
async function searchReviews(filter, paginationToken) {
  const query = {};
  if (paginationToken) {
    query.pageToken = paginationToken;
  }
  const account = this.getNodeParameter("account").value;
  const location = this.getNodeParameter("location").value;
  const responseData = await googleApiRequest.call(
    this,
    "GET",
    `/${account}/${location}/reviews`,
    {},
    {
      pageSize: 50,
      ...query
    }
  );
  const reviews = responseData.reviews;
  const results = reviews.map((a) => ({
    name: a.comment,
    value: a.name
  })).filter((a) => !filter || a.name.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  return { results, paginationToken: responseData.nextPageToken };
}
async function searchPosts(filter, paginationToken) {
  const query = {};
  if (paginationToken) {
    query.pageToken = paginationToken;
  }
  const account = this.getNodeParameter("account").value;
  const location = this.getNodeParameter("location").value;
  const responseData = await googleApiRequest.call(
    this,
    "GET",
    `/${account}/${location}/localPosts`,
    {},
    {
      pageSize: 100,
      ...query
    }
  );
  const localPosts = responseData.localPosts;
  const results = localPosts.map((a) => ({
    name: a.summary,
    value: a.name
  })).filter((a) => !filter || a.name.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  return { results, paginationToken: responseData.nextPageToken };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUpdateMaskPresend,
  googleApiRequest,
  handleDatesPresend,
  handleErrorsDeletePost,
  handleErrorsDeleteReply,
  handleErrorsGetPost,
  handleErrorsGetReview,
  handleErrorsReplyToReview,
  handleErrorsUpdatePost,
  handlePagination,
  searchAccounts,
  searchLocations,
  searchPosts,
  searchReviews
});
//# sourceMappingURL=GenericFunctions.js.map