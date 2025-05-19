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
var QueryFunctions_exports = {};
__export(QueryFunctions_exports, {
  And: () => And,
  Between: () => Between,
  Child: () => Child,
  Contains: () => Contains,
  ContainsString: () => ContainsString,
  EndsWith: () => EndsWith,
  Eq: () => Eq,
  Gt: () => Gt,
  Gte: () => Gte,
  Id: () => Id,
  In: () => In,
  Like: () => Like,
  Lt: () => Lt,
  Lte: () => Lte,
  Not: () => Not,
  Or: () => Or,
  Parent: () => Parent,
  ParentId: () => ParentId,
  StartsWith: () => StartsWith,
  Type: () => Type,
  queryString: () => queryString
});
module.exports = __toCommonJS(QueryFunctions_exports);
function Eq(field, value) {
  return { _field: field, _value: value };
}
function Gt(_field, value) {
  return { _gt: { field: value } };
}
function Gte(_field, value) {
  return { _gte: { field: value } };
}
function Lt(_field, value) {
  return { _lt: { field: value } };
}
function Lte(_field, value) {
  return { _lte: { field: value } };
}
function And(...criteria) {
  return { _and: criteria };
}
function Or(...criteria) {
  return { _or: criteria };
}
function Not(criteria) {
  return { _not: criteria };
}
function In(field, values) {
  return { _in: { _field: field, _values: values } };
}
function Contains(field) {
  return { _contains: field };
}
function Id(id) {
  return { _id: id };
}
function Between(field, fromValue, toValue) {
  return { _between: { _field: field, _from: fromValue, _to: toValue } };
}
function ParentId(tpe, id) {
  return { _parent: { _type: tpe, _id: id } };
}
function Parent(tpe, criterion) {
  return { _parent: { _type: tpe, _query: criterion } };
}
function Child(tpe, criterion) {
  return { _child: { _type: tpe, _query: criterion } };
}
function Type(tpe) {
  return { _type: tpe };
}
function queryString(query) {
  return { _string: query };
}
function Like(field, value) {
  return { _like: { _field: field, _value: value } };
}
function StartsWith(field, value) {
  if (!value.startsWith("*")) {
    value = value + "*";
  }
  return { _wildcard: { _field: field, _value: value } };
}
function EndsWith(field, value) {
  if (!value.endsWith("*")) {
    value = "*" + value;
  }
  return { _wildcard: { _field: field, _value: value } };
}
function ContainsString(field, value) {
  if (!value.endsWith("*")) {
    value = value + "*";
  }
  if (!value.startsWith("*")) {
    value = "*" + value;
  }
  return { _wildcard: { _field: field, _value: value } };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  And,
  Between,
  Child,
  Contains,
  ContainsString,
  EndsWith,
  Eq,
  Gt,
  Gte,
  Id,
  In,
  Like,
  Lt,
  Lte,
  Not,
  Or,
  Parent,
  ParentId,
  StartsWith,
  Type,
  queryString
});
//# sourceMappingURL=QueryFunctions.js.map