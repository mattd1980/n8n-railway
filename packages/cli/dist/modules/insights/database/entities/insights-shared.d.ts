export declare const PeriodUnitToNumber: {
    readonly hour: 0;
    readonly day: 1;
    readonly week: 2;
};
export type PeriodUnit = keyof typeof PeriodUnitToNumber;
export type PeriodUnitNumber = (typeof PeriodUnitToNumber)[PeriodUnit];
export declare const NumberToPeriodUnit: Record<PeriodUnitNumber, "hour" | "day" | "week">;
export declare function isValidPeriodNumber(value: number): value is PeriodUnitNumber;
export declare const TypeToNumber: {
    readonly time_saved_min: 0;
    readonly runtime_ms: 1;
    readonly success: 2;
    readonly failure: 3;
};
export type TypeUnit = keyof typeof TypeToNumber;
export type TypeUnitNumber = (typeof TypeToNumber)[TypeUnit];
export declare const NumberToType: Record<TypeUnitNumber, "time_saved_min" | "runtime_ms" | "success" | "failure">;
export declare function isValidTypeNumber(value: number): value is TypeUnitNumber;
