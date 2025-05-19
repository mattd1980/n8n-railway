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
var genericFunctions_exports = {};
__export(genericFunctions_exports, {
  generateReturning: () => generateReturning,
  getItemCopy: () => getItemCopy,
  getItemsCopy: () => getItemsCopy,
  pgInsert: () => pgInsert,
  pgInsertV2: () => pgInsertV2,
  pgQuery: () => pgQuery,
  pgQueryV2: () => pgQueryV2,
  pgUpdate: () => pgUpdate,
  pgUpdateV2: () => pgUpdateV2,
  wrapData: () => wrapData
});
module.exports = __toCommonJS(genericFunctions_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../utils/utilities");
function getItemsCopy(items, properties, guardedColumns) {
  let newItem;
  return items.map((item) => {
    newItem = {};
    if (guardedColumns) {
      Object.keys(guardedColumns).forEach((column) => {
        newItem[column] = item.json[guardedColumns[column]];
      });
    } else {
      for (const property of properties) {
        newItem[property] = item.json[property];
      }
    }
    return newItem;
  });
}
function getItemCopy(item, properties, guardedColumns) {
  const newItem = {};
  if (guardedColumns) {
    Object.keys(guardedColumns).forEach((column) => {
      newItem[column] = item.json[guardedColumns[column]];
    });
  } else {
    for (const property of properties) {
      newItem[property] = item.json[property];
    }
  }
  return newItem;
}
function generateReturning(pgp, returning) {
  return " RETURNING " + returning.split(",").map((returnedField) => pgp.as.name(returnedField.trim())).join(", ");
}
function wrapData(data) {
  if (!Array.isArray(data)) {
    return [{ json: data }];
  }
  return data.map((item) => ({
    json: item
  }));
}
async function pgQuery(getNodeParam, pgp, db, items, continueOnFail, overrideMode) {
  const additionalFields = getNodeParam("additionalFields", 0);
  let valuesArray = [];
  if (additionalFields.queryParams) {
    const propertiesString = additionalFields.queryParams;
    const properties = propertiesString.split(",").map((column) => column.trim());
    const paramsItems = getItemsCopy(items, properties);
    valuesArray = paramsItems.map((row) => properties.map((col) => row[col]));
  }
  const allQueries = [];
  for (let i = 0; i < items.length; i++) {
    const query = getNodeParam("query", i);
    const values = valuesArray[i];
    const queryFormat = { query, values };
    allQueries.push(queryFormat);
  }
  const mode = overrideMode ? overrideMode : additionalFields.mode ?? "multiple";
  if (mode === "multiple") {
    return (await db.multi(pgp.helpers.concat(allQueries))).flat(1);
  } else if (mode === "transaction") {
    return await db.tx(async (t) => {
      const result = [];
      for (let i = 0; i < allQueries.length; i++) {
        try {
          Array.prototype.push.apply(
            result,
            await t.any(allQueries[i].query, allQueries[i].values)
          );
        } catch (err) {
          if (!continueOnFail) throw err;
          result.push({
            ...items[i].json,
            code: err.code,
            message: err.message
          });
          return result;
        }
      }
      return result;
    });
  } else if (mode === "independently") {
    return await db.task(async (t) => {
      const result = [];
      for (let i = 0; i < allQueries.length; i++) {
        try {
          Array.prototype.push.apply(
            result,
            await t.any(allQueries[i].query, allQueries[i].values)
          );
        } catch (err) {
          if (!continueOnFail) throw err;
          result.push({
            ...items[i].json,
            code: err.code,
            message: err.message
          });
        }
      }
      return result;
    });
  }
  throw new import_n8n_workflow.ApplicationError("multiple, independently or transaction are valid options", {
    level: "warning"
  });
}
async function pgQueryV2(pgp, db, items, continueOnFail, options) {
  const additionalFields = this.getNodeParameter("additionalFields", 0);
  let valuesArray = [];
  if (additionalFields.queryParams) {
    const propertiesString = additionalFields.queryParams;
    const properties = propertiesString.split(",").map((column) => column.trim());
    const paramsItems = getItemsCopy(items, properties);
    valuesArray = paramsItems.map((row) => properties.map((col) => row[col]));
  }
  const allQueries = new Array();
  for (let i = 0; i < items.length; i++) {
    let query = this.getNodeParameter("query", i);
    if (options?.resolveExpression) {
      for (const resolvable of (0, import_utilities.getResolvables)(query)) {
        query = query.replace(resolvable, this.evaluateExpression(resolvable, i));
      }
    }
    const values = valuesArray[i];
    const queryFormat = { query, values };
    allQueries.push(queryFormat);
  }
  const mode = options?.overrideMode ? options.overrideMode : additionalFields.mode ?? "multiple";
  if (mode === "multiple") {
    return (await db.multi(pgp.helpers.concat(allQueries))).map((result, i) => {
      return this.helpers.constructExecutionMetaData(wrapData(result), {
        itemData: { item: i }
      });
    }).flat();
  } else if (mode === "transaction") {
    return await db.tx(async (t) => {
      const result = [];
      for (let i = 0; i < allQueries.length; i++) {
        try {
          const transactionResult = await t.any(allQueries[i].query, allQueries[i].values);
          const executionData = this.helpers.constructExecutionMetaData(
            wrapData(transactionResult),
            { itemData: { item: i } }
          );
          result.push(...executionData);
        } catch (err) {
          if (!continueOnFail) throw err;
          result.push({
            json: { ...items[i].json },
            code: err.code,
            message: err.message,
            pairedItem: { item: i }
          });
          return result;
        }
      }
      return result;
    });
  } else if (mode === "independently") {
    return await db.task(async (t) => {
      const result = [];
      for (let i = 0; i < allQueries.length; i++) {
        try {
          const transactionResult = await t.any(allQueries[i].query, allQueries[i].values);
          const executionData = this.helpers.constructExecutionMetaData(
            wrapData(transactionResult),
            { itemData: { item: i } }
          );
          result.push(...executionData);
        } catch (err) {
          if (!continueOnFail) throw err;
          result.push({
            json: { ...items[i].json },
            code: err.code,
            message: err.message,
            pairedItem: { item: i }
          });
        }
      }
      return result;
    });
  }
  throw new import_n8n_workflow.ApplicationError("multiple, independently or transaction are valid options", {
    level: "warning"
  });
}
async function pgInsert(getNodeParam, pgp, db, items, continueOnFail, overrideMode) {
  const table = getNodeParam("table", 0);
  const schema = getNodeParam("schema", 0);
  const columnString = getNodeParam("columns", 0);
  const guardedColumns = {};
  const columns = columnString.split(",").map((column) => column.trim().split(":")).map(([name, cast], i) => {
    guardedColumns[`column${i}`] = name;
    return { name, cast, prop: `column${i}` };
  });
  const columnNames = columns.map((column) => column.name);
  const cs = new pgp.helpers.ColumnSet(columns, { table: { table, schema } });
  const additionalFields = getNodeParam("additionalFields", 0);
  const mode = overrideMode ? overrideMode : additionalFields.mode ?? "multiple";
  const returning = generateReturning(pgp, getNodeParam("returnFields", 0));
  if (mode === "multiple") {
    const query = pgp.helpers.insert(getItemsCopy(items, columnNames, guardedColumns), cs) + returning;
    return await db.any(query);
  } else if (mode === "transaction") {
    return await db.tx(async (t) => {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        const itemCopy = getItemCopy(items[i], columnNames, guardedColumns);
        try {
          result.push(await t.one(pgp.helpers.insert(itemCopy, cs) + returning));
        } catch (err) {
          if (!continueOnFail) throw err;
          result.push({
            ...itemCopy,
            code: err.code,
            message: err.message
          });
          return result;
        }
      }
      return result;
    });
  } else if (mode === "independently") {
    return await db.task(async (t) => {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        const itemCopy = getItemCopy(items[i], columnNames, guardedColumns);
        try {
          const insertResult = await t.oneOrNone(pgp.helpers.insert(itemCopy, cs) + returning);
          if (insertResult !== null) {
            result.push(insertResult);
          }
        } catch (err) {
          if (!continueOnFail) {
            throw err;
          }
          result.push({
            ...itemCopy,
            code: err.code,
            message: err.message
          });
        }
      }
      return result;
    });
  }
  throw new import_n8n_workflow.ApplicationError("multiple, independently or transaction are valid options", {
    level: "warning"
  });
}
async function pgInsertV2(pgp, db, items, continueOnFail, overrideMode) {
  const table = this.getNodeParameter("table", 0);
  const schema = this.getNodeParameter("schema", 0);
  const columnString = this.getNodeParameter("columns", 0);
  const guardedColumns = {};
  const columns = columnString.split(",").map((column) => column.trim().split(":")).map(([name, cast], i) => {
    guardedColumns[`column${i}`] = name;
    return { name, cast, prop: `column${i}` };
  });
  const columnNames = columns.map((column) => column.name);
  const cs = new pgp.helpers.ColumnSet(columns, { table: { table, schema } });
  const additionalFields = this.getNodeParameter("additionalFields", 0);
  const mode = overrideMode ? overrideMode : additionalFields.mode ?? "multiple";
  const returning = generateReturning(pgp, this.getNodeParameter("returnFields", 0));
  if (mode === "multiple") {
    const query = pgp.helpers.insert(getItemsCopy(items, columnNames, guardedColumns), cs) + returning;
    const queryResult = await db.any(query);
    return queryResult.map((result, i) => {
      return this.helpers.constructExecutionMetaData(wrapData(result), {
        itemData: { item: i }
      });
    }).flat();
  } else if (mode === "transaction") {
    return await db.tx(async (t) => {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        const itemCopy = getItemCopy(items[i], columnNames, guardedColumns);
        try {
          const insertResult = await t.one(pgp.helpers.insert(itemCopy, cs) + returning);
          result.push(
            ...this.helpers.constructExecutionMetaData(wrapData(insertResult), {
              itemData: { item: i }
            })
          );
        } catch (err) {
          if (!continueOnFail) throw err;
          result.push({
            json: { ...itemCopy },
            code: err.code,
            message: err.message,
            pairedItem: { item: i }
          });
          return result;
        }
      }
      return result;
    });
  } else if (mode === "independently") {
    return await db.task(async (t) => {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        const itemCopy = getItemCopy(items[i], columnNames, guardedColumns);
        try {
          const insertResult = await t.oneOrNone(pgp.helpers.insert(itemCopy, cs) + returning);
          if (insertResult !== null) {
            const executionData = this.helpers.constructExecutionMetaData(
              wrapData(insertResult),
              {
                itemData: { item: i }
              }
            );
            result.push(...executionData);
          }
        } catch (err) {
          if (!continueOnFail) {
            throw err;
          }
          result.push({
            json: { ...itemCopy },
            code: err.code,
            message: err.message,
            pairedItem: { item: i }
          });
        }
      }
      return result;
    });
  }
  throw new import_n8n_workflow.ApplicationError("multiple, independently or transaction are valid options", {
    level: "warning"
  });
}
async function pgUpdate(getNodeParam, pgp, db, items, continueOnFail = false) {
  const table = getNodeParam("table", 0);
  const schema = getNodeParam("schema", 0);
  const updateKey = getNodeParam("updateKey", 0);
  const columnString = getNodeParam("columns", 0);
  const guardedColumns = {};
  const columns = columnString.split(",").map((column) => column.trim().split(":")).map(([name, cast], i) => {
    guardedColumns[`column${i}`] = name;
    return { name, cast, prop: `column${i}` };
  });
  const updateKeys = updateKey.split(",").map((key, i) => {
    const [name, cast] = key.trim().split(":");
    const targetCol = columns.find((column) => column.name === name);
    const updateColumn = { name, cast, prop: targetCol ? targetCol.prop : `updateColumn${i}` };
    if (!targetCol) {
      guardedColumns[updateColumn.prop] = name;
      columns.unshift(updateColumn);
    } else if (!targetCol.cast) {
      targetCol.cast = updateColumn.cast || targetCol.cast;
    }
    return updateColumn;
  });
  const additionalFields = getNodeParam("additionalFields", 0);
  const mode = additionalFields.mode ?? "multiple";
  const cs = new pgp.helpers.ColumnSet(columns, { table: { table, schema } });
  const columnNames = columns.map((column) => column.name);
  const updateItems = getItemsCopy(items, columnNames, guardedColumns);
  const returning = generateReturning(pgp, getNodeParam("returnFields", 0));
  if (mode === "multiple") {
    const query = pgp.helpers.update(updateItems, cs) + " WHERE " + updateKeys.map((entry) => {
      const key = pgp.as.name(entry.name);
      return "v." + key + " = t." + key;
    }).join(" AND ") + returning;
    return await db.any(query);
  } else {
    const where = " WHERE " + updateKeys.map((entry) => pgp.as.name(entry.name) + " = ${" + entry.prop + "}").join(" AND ");
    if (mode === "transaction") {
      return await db.tx(async (t) => {
        const result = [];
        for (let i = 0; i < items.length; i++) {
          const itemCopy = getItemCopy(items[i], columnNames, guardedColumns);
          try {
            Array.prototype.push.apply(
              result,
              await t.any(
                pgp.helpers.update(itemCopy, cs) + pgp.as.format(where, itemCopy) + returning
              )
            );
          } catch (err) {
            if (!continueOnFail) throw err;
            result.push({
              ...itemCopy,
              code: err.code,
              message: err.message
            });
            return result;
          }
        }
        return result;
      });
    } else if (mode === "independently") {
      return await db.task(async (t) => {
        const result = [];
        for (let i = 0; i < items.length; i++) {
          const itemCopy = getItemCopy(items[i], columnNames, guardedColumns);
          try {
            Array.prototype.push.apply(
              result,
              await t.any(
                pgp.helpers.update(itemCopy, cs) + pgp.as.format(where, itemCopy) + returning
              )
            );
          } catch (err) {
            if (!continueOnFail) throw err;
            result.push({
              ...itemCopy,
              code: err.code,
              message: err.message
            });
          }
        }
        return result;
      });
    }
  }
  throw new import_n8n_workflow.ApplicationError("multiple, independently or transaction are valid options", {
    level: "warning"
  });
}
async function pgUpdateV2(pgp, db, items, continueOnFail = false) {
  const table = this.getNodeParameter("table", 0);
  const schema = this.getNodeParameter("schema", 0);
  const updateKey = this.getNodeParameter("updateKey", 0);
  const columnString = this.getNodeParameter("columns", 0);
  const guardedColumns = {};
  const columns = columnString.split(",").map((column) => column.trim().split(":")).map(([name, cast], i) => {
    guardedColumns[`column${i}`] = name;
    return { name, cast, prop: `column${i}` };
  });
  const updateKeys = updateKey.split(",").map((key, i) => {
    const [name, cast] = key.trim().split(":");
    const targetCol = columns.find((column) => column.name === name);
    const updateColumn = { name, cast, prop: targetCol ? targetCol.prop : `updateColumn${i}` };
    if (!targetCol) {
      guardedColumns[updateColumn.prop] = name;
      columns.unshift(updateColumn);
    } else if (!targetCol.cast) {
      targetCol.cast = updateColumn.cast || targetCol.cast;
    }
    return updateColumn;
  });
  const additionalFields = this.getNodeParameter("additionalFields", 0);
  const mode = additionalFields.mode ?? "multiple";
  const cs = new pgp.helpers.ColumnSet(columns, { table: { table, schema } });
  const columnNames = columns.map((column) => column.name);
  const updateItems = getItemsCopy(items, columnNames, guardedColumns);
  const returning = generateReturning(pgp, this.getNodeParameter("returnFields", 0));
  if (mode === "multiple") {
    const query = pgp.helpers.update(updateItems, cs) + " WHERE " + updateKeys.map((entry) => {
      const key = pgp.as.name(entry.name);
      return "v." + key + " = t." + key;
    }).join(" AND ") + returning;
    const updateResult = await db.any(query);
    return updateResult;
  } else {
    const where = " WHERE " + updateKeys.map((entry) => pgp.as.name(entry.name) + " = ${" + entry.prop + "}").join(" AND ");
    if (mode === "transaction") {
      return await db.tx(async (t) => {
        const result = [];
        for (let i = 0; i < items.length; i++) {
          const itemCopy = getItemCopy(items[i], columnNames, guardedColumns);
          try {
            const transactionResult = await t.any(
              pgp.helpers.update(itemCopy, cs) + pgp.as.format(where, itemCopy) + returning
            );
            const executionData = this.helpers.constructExecutionMetaData(
              wrapData(transactionResult),
              { itemData: { item: i } }
            );
            result.push(...executionData);
          } catch (err) {
            if (!continueOnFail) throw err;
            result.push({
              ...itemCopy,
              code: err.code,
              message: err.message
            });
            return result;
          }
        }
        return result;
      });
    } else if (mode === "independently") {
      return await db.task(async (t) => {
        const result = [];
        for (let i = 0; i < items.length; i++) {
          const itemCopy = getItemCopy(items[i], columnNames, guardedColumns);
          try {
            const independentResult = await t.any(
              pgp.helpers.update(itemCopy, cs) + pgp.as.format(where, itemCopy) + returning
            );
            const executionData = this.helpers.constructExecutionMetaData(
              wrapData(independentResult),
              { itemData: { item: i } }
            );
            result.push(...executionData);
          } catch (err) {
            if (!continueOnFail) throw err;
            result.push({
              json: { ...items[i].json },
              code: err.code,
              message: err.message,
              pairedItem: { item: i }
            });
          }
        }
        return result;
      });
    }
  }
  throw new import_n8n_workflow.ApplicationError("multiple, independently or transaction are valid options", {
    level: "warning"
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateReturning,
  getItemCopy,
  getItemsCopy,
  pgInsert,
  pgInsertV2,
  pgQuery,
  pgQueryV2,
  pgUpdate,
  pgUpdateV2,
  wrapData
});
//# sourceMappingURL=genericFunctions.js.map