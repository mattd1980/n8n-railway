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
  activityPresend: () => activityPresend,
  automationPresend: () => automationPresend,
  memberPresend: () => memberPresend,
  notePresend: () => notePresend,
  organizationPresend: () => organizationPresend,
  taskPresend: () => taskPresend
});
module.exports = __toCommonJS(GenericFunctions_exports);
const addOptName = "additionalOptions";
const getAllParams = (execFns) => {
  const params = execFns.getNode().parameters;
  const keys = Object.keys(params);
  const paramsWithValues = keys.filter((i) => i !== addOptName).map((name) => [name, execFns.getNodeParameter(name)]);
  const paramsWithValuesObj = Object.fromEntries(paramsWithValues);
  if (keys.includes(addOptName)) {
    const additionalOptions = execFns.getNodeParameter(addOptName);
    return Object.assign(paramsWithValuesObj, additionalOptions);
  }
  return paramsWithValuesObj;
};
const formatParams = (obj, filters, mappers) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([name, value]) => !filters || (name in filters ? filters[name](value) : false)).map(
      ([name, value]) => !mappers || !(name in mappers) ? [name, value] : [name, mappers[name](value)]
    )
  );
};
const objectFromProps = (src, props) => {
  const result = props.filter((p) => src.hasOwnProperty(p)).map((p) => [p, src[p]]);
  return Object.fromEntries(result);
};
const idFn = (i) => i;
const keyValueToObj = (arr) => {
  const obj = {};
  arr.forEach((item) => {
    obj[item.key] = item.value;
  });
  return obj;
};
const transformSingleProp = (prop) => (values) => (values.itemChoice || []).map((i) => i[prop]);
async function activityPresend(opts) {
  const params = getAllParams(this);
  const isCreateWithMember = params.operation === "createWithMember";
  const isCreateForMember = params.operation === "createForMember";
  if (isCreateWithMember) {
    const memberProps = ["displayName", "emails", "joinedAt", "username"];
    params.member = objectFromProps(params, memberProps);
    memberProps.forEach((p) => delete params[p]);
  }
  opts.body = formatParams(
    params,
    {
      member: (v) => (isCreateWithMember || isCreateForMember) && v,
      type: idFn,
      timestamp: idFn,
      platform: idFn,
      title: idFn,
      body: idFn,
      channel: idFn,
      sourceId: idFn,
      sourceParentId: idFn
    },
    {
      member: (v) => typeof v === "object" ? formatParams(
        v,
        {
          username: (un) => un.itemChoice,
          displayName: idFn,
          emails: idFn,
          joinedAt: idFn
        },
        {
          username: (un) => keyValueToObj(un.itemChoice),
          emails: transformSingleProp("email")
        }
      ) : v
    }
  );
  return opts;
}
async function automationPresend(opts) {
  const params = getAllParams(this);
  opts.body = {
    data: {
      settings: {
        url: params.url
      },
      type: "webhook",
      trigger: params.trigger
    }
  };
  return opts;
}
async function memberPresend(opts) {
  const params = getAllParams(this);
  opts.body = formatParams(
    params,
    {
      platform: idFn,
      username: idFn,
      displayName: idFn,
      emails: (i) => i.itemChoice,
      joinedAt: idFn,
      organizations: (i) => i.itemChoice,
      tags: (i) => i.itemChoice,
      tasks: (i) => i.itemChoice,
      notes: (i) => i.itemChoice,
      activities: (i) => i.itemChoice
    },
    {
      emails: transformSingleProp("email"),
      organizations: (i) => i.itemChoice.map(
        (org) => formatParams(
          org,
          {
            name: idFn,
            url: idFn,
            description: idFn,
            logo: idFn,
            employees: idFn,
            members: (j) => j.itemChoice
          },
          {
            members: transformSingleProp("member")
          }
        )
      ),
      tags: transformSingleProp("tag"),
      tasks: transformSingleProp("task"),
      notes: transformSingleProp("note"),
      activities: transformSingleProp("activity")
    }
  );
  return opts;
}
async function notePresend(opts) {
  const params = getAllParams(this);
  opts.body = {
    body: params.body
  };
  return opts;
}
async function organizationPresend(opts) {
  const params = getAllParams(this);
  opts.body = formatParams(
    params,
    {
      name: idFn,
      url: idFn,
      description: idFn,
      logo: idFn,
      employees: idFn,
      members: (j) => j.itemChoice
    },
    {
      members: transformSingleProp("member")
    }
  );
  return opts;
}
async function taskPresend(opts) {
  const params = getAllParams(this);
  opts.body = formatParams(
    params,
    {
      name: idFn,
      body: idFn,
      status: idFn,
      members: (i) => i.itemChoice,
      activities: (i) => i.itemChoice,
      assigneess: idFn
    },
    {
      members: transformSingleProp("member"),
      activities: transformSingleProp("activity")
    }
  );
  return opts;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activityPresend,
  automationPresend,
  memberPresend,
  notePresend,
  organizationPresend,
  taskPresend
});
//# sourceMappingURL=GenericFunctions.js.map