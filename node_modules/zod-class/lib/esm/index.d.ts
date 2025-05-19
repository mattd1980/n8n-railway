import type { PascalCase } from "type-fest";
import { ParseParams, SafeParseReturnType, ZodArray, ZodFunction, ZodIntersection, ZodLazy, ZodMap, ZodNullable, ZodObject, ZodOptional, ZodPromise, ZodRawShape, ZodRecord, ZodSet, ZodTuple, ZodType, ZodTypeAny, ZodUnion, z } from "zod";
type Ctor<T = any> = {
    [key: string]: any;
    new (input: any): T;
};
export interface ZodClass<Members = any, Instance = any, Shape extends ZodRawShape = ZodRawShape> extends ZodType<Instance> {
    shape: Shape;
    staticProps: StaticProperties<Shape>;
    pick<Mask extends keyof Shape>(...mask: Mask[]): Z.Class<Pick<Shape, Mask>>;
    pick<Mask extends {
        [property in keyof Shape]?: true | undefined;
    }>(mask: Mask): Z.Class<Pick<Shape, {
        [property in keyof Mask]: Mask[property] extends true ? Extract<property, keyof Shape> : never;
    }[keyof Mask]>>;
    omit<Mask extends keyof Shape>(...mask: Mask[]): Z.Class<Omit<Shape, Mask>>;
    omit<Mask extends {
        [property in keyof Shape]?: true | undefined;
    }>(mask: Mask): Z.Class<Omit<Shape, {
        [property in keyof Mask]: Mask[property] extends true ? Extract<property, keyof Shape> : never;
    }[keyof Mask]>>;
    schema<T>(this: Ctor<T>): z.ZodType<T>;
    extend<Super extends Ctor, ChildShape extends ZodRawShape>(this: Super, shape: ChildShape): StaticProperties<ChildShape> & {
        [k in Exclude<keyof Super, keyof z.ZodObject<any>>]: Super[k];
    } & ZodClass<Z.output<ZodObject<ChildShape>> & ConstructorParameters<Super>[0], Z.output<ZodObject<ChildShape>> & InstanceType<Super>, Omit<Shape, keyof ChildShape> & ChildShape>;
    optional<Self extends ZodTypeAny>(this: Self): ZodOptional<Self>;
    nullable<Self extends ZodTypeAny>(this: Self): ZodNullable<Self>;
    array<Self extends ZodType>(this: Self): ZodArray<Self>;
    promise<Self extends ZodType>(this: Self): ZodPromise<Self>;
    or<Self extends ZodType, Other extends ZodType>(this: Self, other: Other): ZodUnion<[Self, Other]>;
    and<Self extends ZodType, Other extends ZodType>(this: Self, other: Other): ZodIntersection<Self, Other>;
    parse<T>(this: Ctor<T>, value: unknown): T;
    parseAsync<T>(this: Ctor<T>, value: unknown): Promise<T>;
    safeParse<T>(this: Ctor<T>, data: unknown, params?: Partial<ParseParams>): SafeParseReturnType<Instance, T>;
    safeParseAsync<T, V>(this: Ctor<T>, data: unknown, params?: Partial<ParseParams>): Promise<SafeParseReturnType<Instance, T>>;
    new (data: Members): Instance;
}
type OptionalKeys<Shape> = {
    [k in keyof Shape]: undefined extends Z.output<Shape[k]> ? k : never;
}[keyof Shape];
export declare namespace Z {
    type output<T> = T extends new (...args: any[]) => infer R ? R : T extends ZodObject<infer Shape> ? {
        [k in keyof Pick<Shape, Exclude<keyof Shape, OptionalKeys<Shape>>>]: Z.output<Shape[k]>;
    } & {
        [k in OptionalKeys<Shape>]+?: Z.output<Shape[k]>;
    } : T extends ZodArray<infer I> ? Z.output<I>[] : T extends ZodOptional<infer T> ? Z.output<T> | undefined : T extends ZodNullable<infer T> ? Z.output<T> | null : T extends ZodTuple<infer T> ? {
        [i in keyof T]: Z.output<T[i]>;
    } : T extends ZodRecord<infer Key, infer Value> ? {
        [k in Extract<Z.output<Key>, string | number | symbol>]: Z.output<Value>;
    } : T extends ZodMap<infer Key, infer Value> ? Map<Z.output<Key>, Z.output<Value>> : T extends ZodSet<infer Item> ? Set<Z.output<Item>> : T extends ZodFunction<infer Args, infer Output> ? (...args: Z.output<Args>) => Z.output<Output> : T extends ZodLazy<infer T> ? Z.output<T> : T extends ZodPromise<infer T> ? Promise<Z.output<T>> : T extends ZodType<any, any, any> ? z.output<T> : never;
    type input<T> = T extends new (...args: any[]) => infer R ? R : T extends ZodObject<infer Shape> ? {
        [k in keyof Pick<Shape, Exclude<keyof Shape, OptionalKeys<Shape>>>]: Z.input<Shape[k]>;
    } & {
        [k in OptionalKeys<Shape>]+?: Z.input<Shape[k]>;
    } : T extends ZodArray<infer I> ? Z.input<I>[] : T extends ZodOptional<infer T> ? Z.input<T> | undefined : T extends ZodNullable<infer T> ? Z.input<T> | null : T extends ZodTuple<infer T> ? {
        [i in keyof T]: Z.input<T[i]>;
    } : T extends ZodRecord<infer Key, infer Value> ? {
        [k in Extract<Z.input<Key>, string | number | symbol>]: Z.input<Value>;
    } : T extends ZodMap<infer Key, infer Value> ? Map<Z.input<Key>, Z.input<Value>> : T extends ZodSet<infer Item> ? Set<Z.input<Item>> : T extends ZodFunction<infer Args, infer Output> ? (...args: Z.input<Args>) => Z.input<Output> : T extends ZodLazy<infer T> ? Z.input<T> : T extends ZodPromise<infer T> ? Promise<Z.input<T>> : T extends ZodType<any, any, any> ? z.input<T> : never;
}
type StaticProperties<Shape extends ZodRawShape> = {
    [property in keyof Shape as PascalCase<property>]: Shape[property];
};
export declare namespace Z {
    type Class<Shape extends ZodRawShape> = StaticProperties<Shape> & ZodClass<Z.input<ZodObject<Shape>>, Z.output<ZodObject<Shape>>, Shape>;
}
export declare const Z: {
    class<T extends ZodRawShape>(shape: T): Z.Class<T>;
};
export {};
//# sourceMappingURL=index.d.ts.map