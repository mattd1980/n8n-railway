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
  addExecutionHints: () => addExecutionHints,
  addReturning: () => addReturning,
  addSortRules: () => addSortRules,
  addWhereClauses: () => addWhereClauses,
  checkItemAgainstSchema: () => checkItemAgainstSchema,
  columnFeatureSupport: () => columnFeatureSupport,
  configureQueryRunner: () => configureQueryRunner,
  configureTableSchemaUpdater: () => configureTableSchemaUpdater,
  convertArraysToPostgresFormat: () => convertArraysToPostgresFormat,
  convertValuesToJsonWithPgp: () => convertValuesToJsonWithPgp,
  doesRowExist: () => doesRowExist,
  evaluateExpression: () => evaluateExpression,
  getEnumValues: () => getEnumValues,
  getEnums: () => getEnums,
  getTableSchema: () => getTableSchema,
  hasJsonDataTypeInSchema: () => hasJsonDataTypeInSchema,
  isJSON: () => isJSON,
  parsePostgresError: () => parsePostgresError,
  prepareErrorItem: () => prepareErrorItem,
  prepareItem: () => prepareItem,
  replaceEmptyStringsByNulls: () => replaceEmptyStringsByNulls,
  stringToArray: () => stringToArray,
  uniqueColumns: () => uniqueColumns,
  wrapData: () => wrapData
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../utils/utilities");
function isJSON(str) {
  try {
    JSON.parse(str.trim());
    return true;
  } catch {
    return false;
  }
}
function evaluateExpression(expression) {
  if (expression === void 0) {
    return "";
  } else if (expression === null) {
    return "null";
  } else {
    return typeof expression === "object" ? JSON.stringify(expression) : expression.toString();
  }
}
function stringToArray(str) {
  if (str === void 0) return [];
  return String(str).split(",").filter((entry) => entry).map((entry) => entry.trim());
}
function wrapData(data) {
  if (!Array.isArray(data)) {
    return [{ json: data }];
  }
  return data.map((item) => ({
    json: item
  }));
}
function prepareErrorItem(items, error, index) {
  return {
    json: { message: error.message, item: { ...items[index].json }, error: { ...error } },
    pairedItem: { item: index }
  };
}
function parsePostgresError(node, error, queries, itemIndex) {
  if (error.message.includes("syntax error at or near") && queries.length) {
    try {
      const snippet = error.message.match(/syntax error at or near "(.*)"/)[1];
      const failedQureryIndex = queries.findIndex((query) => query.query.includes(snippet));
      if (failedQureryIndex !== -1) {
        if (!itemIndex) {
          itemIndex = failedQureryIndex;
        }
        const failedQuery = queries[failedQureryIndex].query;
        const lines = failedQuery.split("\n");
        const lineIndex = lines.findIndex((line) => line.includes(snippet));
        const errorMessage = `Syntax error at line ${lineIndex + 1} near "${snippet}"`;
        error.message = errorMessage;
      }
    } catch {
    }
  }
  let message = error.message;
  const errorDescription = error.description ? error.description : error.detail || error.hint;
  let description = errorDescription;
  if (!description && queries[itemIndex || 0]?.query) {
    description = `Failed query: ${queries[itemIndex || 0].query}`;
  }
  if (error.message.includes("ECONNREFUSED")) {
    message = "Connection refused";
    try {
      description = error.message.split("ECONNREFUSED ")[1].trim();
    } catch (e) {
    }
  }
  if (error.message.includes("ENOTFOUND")) {
    message = "Host not found";
    try {
      description = error.message.split("ENOTFOUND ")[1].trim();
    } catch (e) {
    }
  }
  if (error.message.includes("ETIMEDOUT")) {
    message = "Connection timed out";
    try {
      description = error.message.split("ETIMEDOUT ")[1].trim();
    } catch (e) {
    }
  }
  return new import_n8n_workflow.NodeOperationError(node, error, {
    message,
    description,
    itemIndex
  });
}
function addWhereClauses(node, itemIndex, query, clauses, replacements, combineConditions) {
  if (clauses.length === 0) return [query, replacements];
  let combineWith = "AND";
  if (combineConditions === "OR") {
    combineWith = "OR";
  }
  let replacementIndex = replacements.length + 1;
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
    const columnReplacement = `$${replacementIndex}:name`;
    values.push(clause.column);
    replacementIndex = replacementIndex + 1;
    let valueReplacement = "";
    if (clause.condition !== "IS NULL" && clause.condition !== "IS NOT NULL") {
      valueReplacement = ` $${replacementIndex}`;
      values.push(clause.value);
      replacementIndex = replacementIndex + 1;
    }
    const operator = index === clauses.length - 1 ? "" : ` ${combineWith}`;
    whereQuery += ` ${columnReplacement} ${clause.condition}${valueReplacement}${operator}`;
  });
  return [`${query}${whereQuery}`, replacements.concat(...values)];
}
function addSortRules(query, rules, replacements) {
  if (rules.length === 0) return [query, replacements];
  let replacementIndex = replacements.length + 1;
  let orderByQuery = " ORDER BY";
  const values = [];
  rules.forEach((rule, index) => {
    const columnReplacement = `$${replacementIndex}:name`;
    values.push(rule.column);
    replacementIndex = replacementIndex + 1;
    const endWith = index === rules.length - 1 ? "" : ",";
    const sortDirection = rule.direction === "DESC" ? "DESC" : "ASC";
    orderByQuery += ` ${columnReplacement} ${sortDirection}${endWith}`;
  });
  return [`${query}${orderByQuery}`, replacements.concat(...values)];
}
function addReturning(query, outputColumns, replacements) {
  if (outputColumns.includes("*")) return [`${query} RETURNING *`, replacements];
  const replacementIndex = replacements.length + 1;
  return [`${query} RETURNING $${replacementIndex}:name`, [...replacements, outputColumns]];
}
const isSelectQuery = (query) => {
  return query.replace(/\/\*.*?\*\//g, "").replace(/\n/g, "").split(";").filter((statement) => statement && !statement.startsWith("--")).every((statement) => statement.trim().toLowerCase().startsWith("select"));
};
function configureQueryRunner(node, continueOnFail, pgp, db) {
  return async (queries, items, options) => {
    let returnData = [];
    const emptyReturnData = options.operation === "select" ? [] : [{ json: { success: true } }];
    const queryBatching = options.queryBatching || "single";
    if (queryBatching === "single") {
      try {
        returnData = (await db.multi(pgp.helpers.concat(queries))).map((result, i) => {
          return this.helpers.constructExecutionMetaData(wrapData(result), {
            itemData: { item: i }
          });
        }).flat();
        if (!returnData.length) {
          const pairedItem = (0, import_utilities.generatePairedItemData)(queries.length);
          if (options?.nodeVersion < 2.3) {
            if (emptyReturnData.length) {
              emptyReturnData[0].pairedItem = pairedItem;
            }
            returnData = emptyReturnData;
          } else {
            returnData = queries.every((query) => isSelectQuery(query.query)) ? [] : [{ json: { success: true }, pairedItem }];
          }
        }
      } catch (err) {
        const error = parsePostgresError(node, err, queries);
        if (!continueOnFail) throw error;
        return [
          {
            json: {
              message: error.message,
              error: { ...error }
            }
          }
        ];
      }
    }
    if (queryBatching === "transaction") {
      returnData = await db.tx(async (transaction) => {
        const result = [];
        for (let i = 0; i < queries.length; i++) {
          try {
            const query = queries[i].query;
            const values = queries[i].values;
            let transactionResults;
            if (options?.nodeVersion < 2.3) {
              transactionResults = await transaction.any(query, values);
            } else {
              transactionResults = (await transaction.multi(query, values)).flat();
            }
            if (!transactionResults.length) {
              if (options?.nodeVersion < 2.3) {
                transactionResults = emptyReturnData;
              } else {
                transactionResults = isSelectQuery(query) ? [] : [{ success: true }];
              }
            }
            const executionData = this.helpers.constructExecutionMetaData(
              wrapData(transactionResults),
              { itemData: { item: i } }
            );
            result.push(...executionData);
          } catch (err) {
            const error = parsePostgresError(node, err, queries, i);
            if (!continueOnFail) throw error;
            result.push(prepareErrorItem(items, error, i));
            return result;
          }
        }
        return result;
      });
    }
    if (queryBatching === "independently") {
      returnData = await db.task(async (task) => {
        const result = [];
        for (let i = 0; i < queries.length; i++) {
          try {
            const query = queries[i].query;
            const values = queries[i].values;
            let transactionResults;
            if (options?.nodeVersion < 2.3) {
              transactionResults = await task.any(query, values);
            } else {
              transactionResults = (await task.multi(query, values)).flat();
            }
            if (!transactionResults.length) {
              if (options?.nodeVersion < 2.3) {
                transactionResults = emptyReturnData;
              } else {
                transactionResults = isSelectQuery(query) ? [] : [{ success: true }];
              }
            }
            const executionData = this.helpers.constructExecutionMetaData(
              wrapData(transactionResults),
              { itemData: { item: i } }
            );
            result.push(...executionData);
          } catch (err) {
            const error = parsePostgresError(node, err, queries, i);
            if (!continueOnFail) throw error;
            result.push(prepareErrorItem(items, error, i));
          }
        }
        return result;
      });
    }
    return returnData;
  };
}
function replaceEmptyStringsByNulls(items, replace) {
  if (!replace) return items;
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
function prepareItem(values) {
  const item = values.reduce((acc, { column, value }) => {
    acc[column] = value;
    return acc;
  }, {});
  return item;
}
function hasJsonDataTypeInSchema(schema) {
  return schema.some(({ data_type }) => data_type === "json");
}
function convertValuesToJsonWithPgp(pgp, schema, values) {
  schema.filter(
    ({ data_type, column_name }) => data_type === "json" && values[column_name] !== null && values[column_name] !== void 0
  ).forEach(({ column_name }) => {
    values[column_name] = pgp.as.json(values[column_name], true);
  });
  return values;
}
async function columnFeatureSupport(db) {
  const result = await db.any(
    `SELECT EXISTS (
			SELECT 1 FROM information_schema.columns WHERE table_name = 'columns' AND table_schema = 'information_schema' AND column_name = 'is_generated'
		) as is_generated,
		EXISTS (
			SELECT 1 FROM information_schema.columns WHERE table_name = 'columns' AND table_schema = 'information_schema' AND column_name = 'identity_generation'
		) as identity_generation;`
  );
  return result[0];
}
async function getTableSchema(db, schema, table, options) {
  const select = ["column_name", "data_type", "is_nullable", "udt_name", "column_default"];
  if (options?.getColumnsForResourceMapper) {
    const supported = await columnFeatureSupport(db);
    if (supported.identity_generation) {
      select.push("identity_generation");
    }
    if (supported.is_generated) {
      select.push("is_generated");
    }
  }
  const selectString = select.join(", ");
  const columns = await db.any(
    `SELECT ${selectString} FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2`,
    [schema, table]
  );
  return columns;
}
async function uniqueColumns(db, table, schema = "public") {
  const unique = await db.any(
    `
		SELECT DISTINCT a.attname
			FROM pg_index i JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
		WHERE i.indrelid = (quote_ident($1) || '.' || quote_ident($2))::regclass
			AND (i.indisprimary OR i.indisunique);
		`,
    [schema, table]
  );
  return unique;
}
async function getEnums(db) {
  const enumsData = await db.any(
    "SELECT pg_type.typname, pg_enum.enumlabel FROM pg_type JOIN pg_enum ON pg_enum.enumtypid = pg_type.oid;"
  );
  return enumsData;
}
function getEnumValues(enumInfo, enumName) {
  return enumInfo.reduce((acc, current) => {
    if (current.typname === enumName) {
      acc.push({ name: current.enumlabel, value: current.enumlabel });
    }
    return acc;
  }, []);
}
async function doesRowExist(db, schema, table, values) {
  const where = [];
  for (let i = 3; i < 3 + values.length; i += 2) {
    where.push(`$${i}:name=$${i + 1}`);
  }
  const exists = await db.any(
    `SELECT EXISTS(SELECT 1 FROM $1:name.$2:name WHERE ${where.join(" AND ")})`,
    [schema, table, ...values]
  );
  return exists[0].exists;
}
function checkItemAgainstSchema(node, item, columnsInfo, index) {
  if (columnsInfo.length === 0) return item;
  const schema = columnsInfo.reduce((acc, { column_name, data_type, is_nullable }) => {
    acc[column_name] = { type: data_type.toUpperCase(), nullable: is_nullable === "YES" };
    return acc;
  }, {});
  for (const key of Object.keys(item)) {
    if (schema[key] === void 0) {
      throw new import_n8n_workflow.NodeOperationError(node, `Column '${key}' does not exist in selected table`, {
        itemIndex: index
      });
    }
    if (item[key] === null && !schema[key]?.nullable) {
      throw new import_n8n_workflow.NodeOperationError(node, `Column '${key}' is not nullable`, {
        itemIndex: index
      });
    }
  }
  return item;
}
const configureTableSchemaUpdater = (initialSchema, initialTable) => {
  let currentSchema = initialSchema;
  let currentTable = initialTable;
  return async (db, tableSchema, schema, table) => {
    if (currentSchema !== schema || currentTable !== table) {
      currentSchema = schema;
      currentTable = table;
      tableSchema = await getTableSchema(db, schema, table);
    }
    return tableSchema;
  };
};
const convertArraysToPostgresFormat = (data, schema, node, itemIndex = 0) => {
  for (const columnInfo of schema) {
    if (columnInfo.data_type.toUpperCase() === "ARRAY") {
      let columnValue = data[columnInfo.column_name];
      if (typeof columnValue === "string") {
        columnValue = (0, import_n8n_workflow.jsonParse)(columnValue);
      }
      if (Array.isArray(columnValue)) {
        const arrayEntries = columnValue.map((entry) => {
          if (typeof entry === "number") {
            return entry;
          }
          if (typeof entry === "boolean") {
            entry = String(entry);
          }
          if (typeof entry === "object") {
            entry = JSON.stringify(entry);
          }
          if (typeof entry === "string") {
            return `"${entry.replace(/"/g, '\\"')}"`;
          }
          return entry;
        });
        data[columnInfo.column_name] = `{${arrayEntries.join(",")}}`;
      } else {
        if (columnInfo.is_nullable === "NO") {
          throw new import_n8n_workflow.NodeOperationError(
            node,
            `Column '${columnInfo.column_name}' has to be an array`,
            {
              itemIndex
            }
          );
        }
      }
    }
  }
};
function addExecutionHints(context, items, operation, executeOnce) {
  if (operation === "select" && items.length > 1 && !executeOnce) {
    context.addExecutionHints({
      message: `This node ran ${items.length} times, once for each input item. To run for the first item only, enable 'execute once' in the node settings`,
      location: "outputPane"
    });
  }
  if (operation === "executeQuery" && items.length > 1 && context.getNodeParameter("options.queryBatching", 0, "single") === "single" && context.getNodeParameter("query", 0, "").toLowerCase().startsWith("insert")) {
    context.addExecutionHints({
      message: "Inserts were batched for performance. If you need to preserve item matching, consider changing 'Query batching' to 'Independent' in the options.",
      location: "outputPane"
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addExecutionHints,
  addReturning,
  addSortRules,
  addWhereClauses,
  checkItemAgainstSchema,
  columnFeatureSupport,
  configureQueryRunner,
  configureTableSchemaUpdater,
  convertArraysToPostgresFormat,
  convertValuesToJsonWithPgp,
  doesRowExist,
  evaluateExpression,
  getEnumValues,
  getEnums,
  getTableSchema,
  hasJsonDataTypeInSchema,
  isJSON,
  parsePostgresError,
  prepareErrorItem,
  prepareItem,
  replaceEmptyStringsByNulls,
  stringToArray,
  uniqueColumns,
  wrapData
});
//# sourceMappingURL=utils.js.map