import { Z } from 'zod-class';
declare const CreateProjectDto_base: Z.Class<{
    name: import("zod").ZodString;
    icon: import("zod").ZodOptional<import("zod").ZodObject<{
        type: import("zod").ZodEnum<["emoji", "icon"]>;
        value: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        value: string;
        type: "emoji" | "icon";
    }, {
        value: string;
        type: "emoji" | "icon";
    }>>;
}>;
export declare class CreateProjectDto extends CreateProjectDto_base {
}
export {};
