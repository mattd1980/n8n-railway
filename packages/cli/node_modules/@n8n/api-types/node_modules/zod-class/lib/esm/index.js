var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { ZodArray, ZodNullable, ZodOptional, ZodPromise, object, z, } from "zod";
import { toPascalCase } from "./to-pascal-case.js";
const IS_ZOD_CLASS = Symbol.for("zod-class");
export const Z = {
    class(shape) {
        var _a, _b;
        const clazz = (_a = class {
                static schema() {
                    return this;
                }
                constructor(value) {
                    const parsed = clazz._schema.parse(value);
                    return _newInstance(this.constructor, parsed);
                }
                static extend(augmentation) {
                    var _c;
                    const augmented = this._schema.extend(augmentation);
                    // @ts-ignore
                    const clazz = (_c = class extends this {
                            constructor(value) {
                                super(value);
                                Object.assign(this, augmented.parse(value));
                            }
                        },
                        __setFunctionName(_c, "clazz"),
                        _c.shape = augmented.shape,
                        _c._schema = augmented,
                        _c);
                    Object.assign(clazz, getStaticMembers(augmentation));
                    return clazz;
                }
                // can NOT create a sub-type
                static pick(mask, ...masks) {
                    if (typeof mask === "string") {
                        return Z.class(this._schema.pick({
                            [mask]: true,
                            ...Object.fromEntries(masks.map((m) => [m, true])),
                        }).shape);
                    }
                    else {
                        return Z.class(this._schema.pick(mask).shape);
                    }
                }
                static omit(mask, ...masks) {
                    if (typeof mask === "string") {
                        return Z.class(this._schema.omit({
                            [mask]: true,
                            ...Object.fromEntries(masks.map((m) => [m, true])),
                        }).shape);
                    }
                    else {
                        return Z.class(this._schema.omit(mask).shape);
                    }
                }
                // CAN create a sub-type
                static required() {
                    return this.extend(this._schema.required().shape);
                }
                static strict() {
                    return this.extend(this._schema.strict().shape);
                }
                static strip() {
                    return this.extend(this._schema.strip().shape);
                }
                static catchall(type) {
                    return this.extend(this._schema.catchall(type).shape);
                }
                // combinators
                static optional() {
                    return new ZodOptional(this);
                }
                static nullable() {
                    return new ZodNullable(this);
                }
                static nullish() {
                    return this.optional().nullable();
                }
                static array() {
                    return new ZodArray(this);
                }
                static promise() {
                    return new ZodPromise(this);
                }
                static or(other) {
                    return z.union([this, other]);
                }
                static and(other) {
                    return z.intersection(this, other);
                }
                // TODO:
                // static transform()
                // static default
                // static brand
                // static catch
                static describe(description) { }
                static parse(value, params) {
                    const parsed = this._schema.parse(value, params);
                    return _newInstance(this, parsed);
                }
                static parseAsync(value, params) {
                    return this._schema
                        .parseAsync(value, params)
                        .then((parsed) => _newInstance(this, parsed));
                }
                static _parse(input) {
                    const result = this._schema._parse(input);
                    if (isPromise(result)) {
                        return result.then((result) => _coerceParseResult(this, result));
                    }
                    else {
                        return _coerceParseResult(this, result);
                    }
                }
                static _parseSync(input) {
                    return _coerceParseResult(this, this._schema._parseSync(input));
                }
                static _parseAsync(input) {
                    return this._schema
                        ._parseAsync(input)
                        .then((result) => _coerceParseResult(this, result));
                }
                static safeParse(value, params) {
                    return coerceSafeParse(this, this._schema.safeParse(value, params));
                }
                static safeParseAsync(value, params) {
                    return this._schema
                        .safeParseAsync(value, params)
                        .then((result) => coerceSafeParse(this, result));
                }
            },
            _b = IS_ZOD_CLASS,
            __setFunctionName(_a, "clazz"),
            _a[_b] = true,
            _a.innerType = _a,
            _a.shape = shape,
            _a._schema = object(shape),
            _a.merge = _a.extend.bind(_a),
            _a.partial = (mask) => _a._schema.partial(mask),
            _a.deepPartial = () => _a._schema.deepPartial(),
            _a.passthrough = () => _a._schema.passthrough(),
            _a.keyof = () => _a._schema.keyof(),
            _a);
        Object.assign(clazz, getStaticMembers(shape));
        return clazz;
    },
};
function getStaticMembers(shape) {
    return Object.fromEntries(Object.entries(shape).map(([key, value]) => [toPascalCase(key), value]));
}
function coerceSafeParse(clazz, result) {
    if (result.success) {
        return {
            success: true,
            data: _newInstance(clazz, result.data),
        };
    }
    else {
        return result;
    }
}
function _newInstance(clazz, parsed) {
    const instance = Object.create(clazz.prototype);
    Object.assign(instance, parsed);
    return instance;
}
function _coerceParseResult(cls, result) {
    if (result.status === "valid" || result.status === "dirty") {
        return {
            status: result.status,
            value: new cls(result.value),
        };
    }
    else {
        return result;
    }
}
function isPromise(obj) {
    return (!!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function");
}
//# sourceMappingURL=index.js.map