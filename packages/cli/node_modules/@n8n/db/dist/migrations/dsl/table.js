"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropNotNull = exports.AddNotNull = exports.DropForeignKey = exports.AddForeignKey = exports.DropColumns = exports.AddColumns = exports.DropTable = exports.CreateTable = void 0;
const typeorm_1 = require("@n8n/typeorm");
const n8n_workflow_1 = require("n8n-workflow");
const p_lazy_1 = __importDefault(require("p-lazy"));
const column_1 = require("./column");
class TableOperation extends p_lazy_1.default {
    constructor(tableName, prefix, queryRunner) {
        super((resolve, reject) => {
            void this.execute(queryRunner).then(resolve).catch(reject);
        });
        this.tableName = tableName;
        this.prefix = prefix;
    }
}
class CreateTable extends TableOperation {
    constructor() {
        super(...arguments);
        this.columns = [];
        this.indices = new Set();
        this.foreignKeys = new Set();
    }
    withColumns(...columns) {
        this.columns.push(...columns);
        return this;
    }
    get withTimestamps() {
        this.columns.push(new column_1.Column('createdAt').timestamp().notNull.default('NOW()'), new column_1.Column('updatedAt').timestamp().notNull.default('NOW()'));
        return this;
    }
    withIndexOn(columnName, isUnique = false) {
        const columnNames = Array.isArray(columnName) ? columnName : [columnName];
        this.indices.add({ columnNames, isUnique });
        return this;
    }
    withForeignKey(columnName, ref) {
        const foreignKey = {
            columnNames: [columnName],
            referencedTableName: `${this.prefix}${ref.tableName}`,
            referencedColumnNames: [ref.columnName],
        };
        if (ref.onDelete)
            foreignKey.onDelete = ref.onDelete;
        if (ref.onUpdate)
            foreignKey.onUpdate = ref.onUpdate;
        if (ref.name)
            foreignKey.name = ref.name;
        this.foreignKeys.add(foreignKey);
        return this;
    }
    async execute(queryRunner) {
        const { driver } = queryRunner.connection;
        const { columns, tableName: name, prefix, indices, foreignKeys } = this;
        return await queryRunner.createTable(new typeorm_1.Table({
            name: `${prefix}${name}`,
            columns: columns.map((c) => c.toOptions(driver)),
            ...(indices.size ? { indices: [...indices] } : {}),
            ...(foreignKeys.size ? { foreignKeys: [...foreignKeys] } : {}),
            ...('mysql' in driver ? { engine: 'InnoDB' } : {}),
        }), true);
    }
}
exports.CreateTable = CreateTable;
class DropTable extends TableOperation {
    async execute(queryRunner) {
        const { tableName: name, prefix } = this;
        return await queryRunner.dropTable(`${prefix}${name}`, true);
    }
}
exports.DropTable = DropTable;
class AddColumns extends TableOperation {
    constructor(tableName, columns, prefix, queryRunner) {
        super(tableName, prefix, queryRunner);
        this.columns = columns;
    }
    async execute(queryRunner) {
        const { driver } = queryRunner.connection;
        const { tableName, prefix, columns } = this;
        return await queryRunner.addColumns(`${prefix}${tableName}`, columns.map((c) => new typeorm_1.TableColumn(c.toOptions(driver))));
    }
}
exports.AddColumns = AddColumns;
class DropColumns extends TableOperation {
    constructor(tableName, columnNames, prefix, queryRunner) {
        super(tableName, prefix, queryRunner);
        this.columnNames = columnNames;
    }
    async execute(queryRunner) {
        const { tableName, prefix, columnNames } = this;
        return await queryRunner.dropColumns(`${prefix}${tableName}`, columnNames);
    }
}
exports.DropColumns = DropColumns;
class ForeignKeyOperation extends TableOperation {
    constructor(tableName, columnName, [referencedTableName, referencedColumnName], prefix, queryRunner, customConstraintName) {
        super(tableName, prefix, queryRunner);
        this.foreignKey = new typeorm_1.TableForeignKey({
            name: customConstraintName,
            columnNames: [columnName],
            referencedTableName: `${prefix}${referencedTableName}`,
            referencedColumnNames: [referencedColumnName],
        });
    }
}
class AddForeignKey extends ForeignKeyOperation {
    async execute(queryRunner) {
        const { tableName, prefix } = this;
        return await queryRunner.createForeignKey(`${prefix}${tableName}`, this.foreignKey);
    }
}
exports.AddForeignKey = AddForeignKey;
class DropForeignKey extends ForeignKeyOperation {
    async execute(queryRunner) {
        const { tableName, prefix } = this;
        return await queryRunner.dropForeignKey(`${prefix}${tableName}`, this.foreignKey);
    }
}
exports.DropForeignKey = DropForeignKey;
class ModifyNotNull extends TableOperation {
    constructor(tableName, columnName, isNullable, prefix, queryRunner) {
        super(tableName, prefix, queryRunner);
        this.columnName = columnName;
        this.isNullable = isNullable;
    }
    async execute(queryRunner) {
        const { tableName, prefix, columnName, isNullable } = this;
        const table = await queryRunner.getTable(`${prefix}${tableName}`);
        if (!table)
            throw new n8n_workflow_1.UnexpectedError('No table found', { extra: { tableName } });
        const oldColumn = table.findColumnByName(columnName);
        const newColumn = oldColumn.clone();
        newColumn.isNullable = isNullable;
        return await queryRunner.changeColumn(table, oldColumn, newColumn);
    }
}
class AddNotNull extends ModifyNotNull {
    constructor(tableName, columnName, prefix, queryRunner) {
        super(tableName, columnName, false, prefix, queryRunner);
        this.columnName = columnName;
    }
}
exports.AddNotNull = AddNotNull;
class DropNotNull extends ModifyNotNull {
    constructor(tableName, columnName, prefix, queryRunner) {
        super(tableName, columnName, true, prefix, queryRunner);
        this.columnName = columnName;
    }
}
exports.DropNotNull = DropNotNull;
//# sourceMappingURL=table.js.map