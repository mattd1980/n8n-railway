"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaBuilder = void 0;
const column_1 = require("./column");
const indices_1 = require("./indices");
const table_1 = require("./table");
const createSchemaBuilder = (tablePrefix, queryRunner) => ({
    column: (name) => new column_1.Column(name),
    createTable: (tableName) => new table_1.CreateTable(tableName, tablePrefix, queryRunner),
    dropTable: (tableName) => new table_1.DropTable(tableName, tablePrefix, queryRunner),
    addColumns: (tableName, columns) => new table_1.AddColumns(tableName, columns, tablePrefix, queryRunner),
    dropColumns: (tableName, columnNames) => new table_1.DropColumns(tableName, columnNames, tablePrefix, queryRunner),
    createIndex: (tableName, columnNames, isUnique = false, customIndexName) => new indices_1.CreateIndex(tableName, columnNames, isUnique, tablePrefix, queryRunner, customIndexName),
    dropIndex: (tableName, columnNames, { customIndexName, skipIfMissing } = {
        skipIfMissing: false,
    }) => new indices_1.DropIndex(tableName, columnNames, tablePrefix, queryRunner, customIndexName, skipIfMissing),
    addForeignKey: (tableName, columnName, reference, customConstraintName) => new table_1.AddForeignKey(tableName, columnName, reference, tablePrefix, queryRunner, customConstraintName),
    dropForeignKey: (tableName, columnName, reference, customConstraintName) => new table_1.DropForeignKey(tableName, columnName, reference, tablePrefix, queryRunner, customConstraintName),
    addNotNull: (tableName, columnName) => new table_1.AddNotNull(tableName, columnName, tablePrefix, queryRunner),
    dropNotNull: (tableName, columnName) => new table_1.DropNotNull(tableName, columnName, tablePrefix, queryRunner),
});
exports.createSchemaBuilder = createSchemaBuilder;
//# sourceMappingURL=index.js.map