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
var utils_exports = {};
__export(utils_exports, {
  addSortRules: () => addSortRules,
  addWhereClauses: () => addWhereClauses,
  configureQueryRunner: () => configureQueryRunner,
  escapeSqlIdentifier: () => escapeSqlIdentifier,
  parseMySqlError: () => parseMySqlError,
  prepareErrorItem: () => prepareErrorItem,
  prepareOutput: () => prepareOutput,
  prepareQueryAndReplacements: () => prepareQueryAndReplacements,
  replaceEmptyStringsByNulls: () => replaceEmptyStringsByNulls,
  splitQueryToStatements: () => splitQueryToStatements,
  wrapData: () => wrapData
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_interfaces = require("./interfaces");
var import_utilities = require("../../../../utils/utilities");
function escapeSqlIdentifier(identifier) {
  const parts = identifier.match(/(`[^`]*`|[^.`]+)/g) ?? [];
  return parts.map((part) => {
    const trimmedPart = part.trim();
    if (trimmedPart.startsWith("`") && trimmedPart.endsWith("`")) {
      return trimmedPart;
    }
    return `\`${trimmedPart}\``;
  }).join(".");
}
const prepareQueryAndReplacements = (rawQuery, replacements) => {
  if (replacements === void 0) {
    return { query: rawQuery, values: [] };
  }
  let query = rawQuery;
  const values = [];
  const regex = /\$(\d+)(?::name)?/g;
  const matches = rawQuery.match(regex) || [];
  for (const match of matches) {
    if (match.includes(":name")) {
      const matchIndex = Number(match.replace("$", "").replace(":name", "")) - 1;
      query = query.replace(match, escapeSqlIdentifier(replacements[matchIndex].toString()));
    } else {
      const matchIndex = Number(match.replace("$", "")) - 1;
      query = query.replace(match, "?");
      values.push(replacements[matchIndex]);
    }
  }
  return { query, values };
};
function prepareErrorItem(item, error, index) {
  return {
    json: { message: error.message, item: { ...item }, itemIndex: index, error: { ...error } },
    pairedItem: { item: index }
  };
}
function parseMySqlError(error, itemIndex = 0, queries) {
  let message = error.message;
  const description = `sql: ${error.sql}, code: ${error.code}`;
  if (queries?.length && (message || "").toLowerCase().includes("you have an error in your sql syntax")) {
    let queryIndex = itemIndex;
    const failedStatement = ((message.split("near '")[1] || "").split("' at")[0] || "").split(
      ";"
    )[0];
    if (failedStatement) {
      if (queryIndex === 0 && queries.length > 1) {
        const failedQueryIndex = queries.findIndex((query) => query.includes(failedStatement));
        if (failedQueryIndex !== -1) {
          queryIndex = failedQueryIndex;
        }
      }
      const lines = queries[queryIndex].split("\n");
      const failedLine = lines.findIndex((line) => line.includes(failedStatement));
      if (failedLine !== -1) {
        message = `You have an error in your SQL syntax on line ${failedLine + 1} near '${failedStatement}'`;
      }
    }
  }
  if ((error?.message).includes("ECONNREFUSED")) {
    message = "Connection refused";
  }
  return new import_n8n_workflow.NodeOperationError(this.getNode(), error, {
    message,
    description,
    itemIndex
  });
}
function wrapData(data) {
  if (!Array.isArray(data)) {
    return [{ json: data }];
  }
  return data.map((item) => ({
    json: item
  }));
}
function prepareOutput(response, options, statements, constructExecutionHelper, itemData) {
  let returnData = [];
  if (options.detailedOutput) {
    response.forEach((entry, index) => {
      const item = {
        sql: statements[index],
        data: entry
      };
      const executionData = constructExecutionHelper(wrapData(item), {
        itemData
      });
      returnData = returnData.concat(executionData);
    });
  } else {
    response.filter((entry) => Array.isArray(entry)).forEach((entry, index) => {
      const executionData = constructExecutionHelper(wrapData(entry), {
        itemData: Array.isArray(itemData) ? itemData[index] : itemData
      });
      returnData = returnData.concat(executionData);
    });
  }
  if (!returnData.length) {
    if (options?.nodeVersion < 2.2) {
      returnData.push({ json: { success: true }, pairedItem: itemData });
    } else {
      const isSelectQuery = statements.filter((statement) => !statement.startsWith("--")).every(
        (statement) => statement.replace(/\/\*.*?\*\//g, "").replace(/\n/g, "").toLowerCase().startsWith("select")
      );
      if (!isSelectQuery) {
        returnData.push({ json: { success: true }, pairedItem: itemData });
      }
    }
  }
  return returnData;
}
const END_OF_STATEMENT = /;(?=(?:[^'\\]|'[^']*?'|\\[\s\S])*?$)/g;
const splitQueryToStatements = (query, filterOutEmpty = true) => {
  const statements = query.replace(/\n/g, "").split(END_OF_STATEMENT).map((statement) => statement.trim());
  return filterOutEmpty ? statements.filter((statement) => statement !== "") : statements;
};
function configureQueryRunner(options, pool) {
  return async (queries) => {
    if (queries.length === 0) {
      return [];
    }
    let returnData = [];
    const mode = options.queryBatching || import_interfaces.BATCH_MODE.SINGLE;
    const connection = await pool.getConnection();
    if (mode === import_interfaces.BATCH_MODE.SINGLE) {
      const formattedQueries = queries.map(({ query, values }) => connection.format(query, values));
      try {
        connection.release();
        let singleQuery = "";
        if (formattedQueries.length > 1) {
          singleQuery = formattedQueries.map((query) => query.trim().replace(/;$/, "")).join(";");
        } else {
          singleQuery = formattedQueries[0];
        }
        let response = (await pool.query(singleQuery))[0];
        if (!response) return [];
        let statements;
        if (options?.nodeVersion <= 2.3) {
          statements = singleQuery.replace(/\n/g, "").split(";").filter((statement) => statement !== "");
        } else {
          statements = splitQueryToStatements(singleQuery);
        }
        if (Array.isArray(response)) {
          if (statements.length === 1) response = [response];
        } else {
          response = [response];
        }
        const pairedItem = (0, import_utilities.generatePairedItemData)(queries.length);
        returnData = returnData.concat(
          prepareOutput(
            response,
            options,
            statements,
            this.helpers.constructExecutionMetaData,
            pairedItem
          )
        );
      } catch (err) {
        const error = parseMySqlError.call(this, err, 0, formattedQueries);
        if (!this.continueOnFail()) throw error;
        returnData.push({ json: { message: error.message, error: { ...error } } });
      }
    } else {
      if (mode === import_interfaces.BATCH_MODE.INDEPENDENTLY) {
        let formattedQuery = "";
        for (const [index, queryWithValues] of queries.entries()) {
          try {
            const { query, values } = queryWithValues;
            formattedQuery = connection.format(query, values);
            let statements;
            if (options?.nodeVersion <= 2.3) {
              statements = formattedQuery.split(";").map((q) => q.trim());
            } else {
              statements = splitQueryToStatements(formattedQuery, false);
            }
            const responses = [];
            for (const statement of statements) {
              if (statement === "") continue;
              const response = (await connection.query(statement))[0];
              responses.push(response);
            }
            returnData = returnData.concat(
              prepareOutput(
                responses,
                options,
                statements,
                this.helpers.constructExecutionMetaData,
                { item: index }
              )
            );
          } catch (err) {
            const error = parseMySqlError.call(this, err, index, [formattedQuery]);
            if (!this.continueOnFail()) {
              connection.release();
              throw error;
            }
            returnData.push(prepareErrorItem(queries[index], error, index));
          }
        }
      }
      if (mode === import_interfaces.BATCH_MODE.TRANSACTION) {
        await connection.beginTransaction();
        let formattedQuery = "";
        for (const [index, queryWithValues] of queries.entries()) {
          try {
            const { query, values } = queryWithValues;
            formattedQuery = connection.format(query, values);
            let statements;
            if (options?.nodeVersion <= 2.3) {
              statements = formattedQuery.split(";").map((q) => q.trim());
            } else {
              statements = splitQueryToStatements(formattedQuery, false);
            }
            const responses = [];
            for (const statement of statements) {
              if (statement === "") continue;
              const response = (await connection.query(statement))[0];
              responses.push(response);
            }
            returnData = returnData.concat(
              prepareOutput(
                responses,
                options,
                statements,
                this.helpers.constructExecutionMetaData,
                { item: index }
              )
            );
          } catch (err) {
            const error = parseMySqlError.call(this, err, index, [formattedQuery]);
            if (connection) {
              await connection.rollback();
              connection.release();
            }
            if (!this.continueOnFail()) throw error;
            returnData.push(prepareErrorItem(queries[index], error, index));
            return returnData;
          }
        }
        await connection.commit();
      }
      connection.release();
    }
    return returnData;
  };
}
function addWhereClauses(node, itemIndex, query, clauses, replacements, combineConditions) {
  if (clauses.length === 0) return [query, replacements];
  let combineWith = "AND";
  if (combineConditions === "OR") {
    combineWith = "OR";
  }
  let whereQuery = " WHERE";
  const values = [];
  clauses.forEach((clause, index) => {
    if (clause.condition === "equal") {
      clause.condition = "=";
    }
    if ([">", "<", ">=", "<="].includes(clause.condition)) {
      const value = Number(clause.value);
      if (Number.isNaN(value)) {
        throw new import_n8n_workflow.NodeOperationError(
          node,
          `Operator in entry ${index + 1} of 'Select Rows' works with numbers, but value ${clause.value} is not a number`,
          {
            itemIndex
          }
        );
      }
      clause.value = value;
    }
    let valueReplacement = " ";
    if (clause.condition !== "IS NULL" && clause.condition !== "IS NOT NULL") {
      valueReplacement = " ?";
      values.push(clause.value);
    }
    const operator = index === clauses.length - 1 ? "" : ` ${combineWith}`;
    whereQuery += ` ${escapeSqlIdentifier(clause.column)} ${clause.condition}${valueReplacement}${operator}`;
  });
  return [`${query}${whereQuery}`, replacements.concat(...values)];
}
function addSortRules(query, rules, replacements) {
  if (rules.length === 0) return [query, replacements];
  let orderByQuery = " ORDER BY";
  const values = [];
  rules.forEach((rule, index) => {
    const endWith = index === rules.length - 1 ? "" : ",";
    orderByQuery += ` ${escapeSqlIdentifier(rule.column)} ${rule.direction}${endWith}`;
  });
  return [`${query}${orderByQuery}`, replacements.concat(...values)];
}
function replaceEmptyStringsByNulls(items, replace) {
  if (!replace) return [...items];
  const returnData = items.map((item) => {
    const newItem = { ...item };
    const keys = Object.keys(newItem.json);
    for (const key of keys) {
      if (newItem.json[key] === "") {
        newItem.json[key] = null;
      }
    }
    return newItem;
  });
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addSortRules,
  addWhereClauses,
  configureQueryRunner,
  escapeSqlIdentifier,
  parseMySqlError,
  prepareErrorItem,
  prepareOutput,
  prepareQueryAndReplacements,
  replaceEmptyStringsByNulls,
  splitQueryToStatements,
  wrapData
});
//# sourceMappingURL=utils.js.map