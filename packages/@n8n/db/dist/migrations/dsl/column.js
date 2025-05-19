"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
class Column {
    constructor(name) {
        this.name = name;
        this.isGenerated = false;
        this.isGenerated2 = false;
        this.isNullable = true;
        this.isPrimary = false;
    }
    get bool() {
        this.type = 'boolean';
        return this;
    }
    get int() {
        this.type = 'int';
        return this;
    }
    varchar(length) {
        this.type = 'varchar';
        this.length = length ?? 'auto';
        return this;
    }
    get text() {
        this.type = 'text';
        return this;
    }
    get json() {
        this.type = 'json';
        return this;
    }
    timestamp(msPrecision = 3) {
        this.type = 'timestamptz';
        this.length = msPrecision ?? 'auto';
        return this;
    }
    timestampTimezone(msPrecision = 3) {
        this.type = 'timestamptz';
        this.length = msPrecision ?? 'auto';
        return this;
    }
    timestampNoTimezone(msPrecision = 3) {
        this.type = 'timestamp';
        this.length = msPrecision ?? 'auto';
        return this;
    }
    get uuid() {
        this.type = 'uuid';
        return this;
    }
    get primary() {
        this.isPrimary = true;
        return this;
    }
    primaryWithName(name) {
        this.isPrimary = true;
        this.primaryKeyConstraintName = name;
        return this;
    }
    get notNull() {
        this.isNullable = false;
        return this;
    }
    default(value) {
        this.defaultValue = value;
        return this;
    }
    get autoGenerate() {
        this.isGenerated = true;
        return this;
    }
    get autoGenerate2() {
        this.isGenerated2 = true;
        return this;
    }
    comment(comment) {
        this.commentValue = comment;
        return this;
    }
    toOptions(driver) {
        const { name, type, isNullable, isPrimary, isGenerated, isGenerated2, length, primaryKeyConstraintName, } = this;
        const isMysql = 'mysql' in driver;
        const isPostgres = 'postgres' in driver;
        const isSqlite = 'sqlite' in driver;
        const options = {
            primaryKeyConstraintName,
            name,
            isNullable,
            isPrimary,
            type,
        };
        if (options.type === 'int' && isSqlite) {
            options.type = 'integer';
        }
        else if (type === 'boolean' && isMysql) {
            options.type = 'tinyint(1)';
        }
        else if (type === 'timestamptz') {
            options.type = isPostgres ? 'timestamptz' : 'datetime';
        }
        else if (type === 'timestamp') {
            options.type = isPostgres ? 'timestamp' : 'datetime';
        }
        else if (type === 'json' && isSqlite) {
            options.type = 'text';
        }
        else if (type === 'uuid') {
            if (isMysql)
                options.type = 'varchar(36)';
            if (isSqlite)
                options.type = 'varchar';
        }
        if ((type === 'varchar' || type === 'timestamptz' || type === 'timestamp') &&
            length !== 'auto') {
            options.type = `${options.type}(${length})`;
        }
        if (isGenerated) {
            options.isGenerated = true;
            options.generationStrategy = type === 'uuid' ? 'uuid' : 'increment';
        }
        if (isGenerated2) {
            options.isGenerated = true;
            options.generationStrategy = type === 'uuid' ? 'uuid' : isMysql ? 'increment' : 'identity';
        }
        if (isPrimary || isGenerated || isGenerated2) {
            options.isNullable = false;
        }
        if (this.defaultValue !== undefined) {
            if ((type === 'timestamptz' || type === 'timestamp') && this.defaultValue === 'NOW()') {
                options.default = isSqlite
                    ? "STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')"
                    : 'CURRENT_TIMESTAMP(3)';
            }
            else {
                options.default = this.defaultValue;
            }
        }
        if (this.commentValue) {
            options.comment = this.commentValue;
        }
        return options;
    }
}
exports.Column = Column;
//# sourceMappingURL=column.js.map