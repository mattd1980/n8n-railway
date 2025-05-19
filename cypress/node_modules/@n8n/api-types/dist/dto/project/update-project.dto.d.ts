import { z } from 'zod';
import { Z } from 'zod-class';
declare const UpdateProjectDto_base: Z.Class<{
    name: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["emoji", "icon"]>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: "emoji" | "icon";
    }, {
        value: string;
        type: "emoji" | "icon";
    }>>;
    relations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        role: z.ZodEnum<["project:personalOwner", "project:admin", "project:editor", "project:viewer"]>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        role: "project:personalOwner" | "project:admin" | "project:editor" | "project:viewer";
    }, {
        userId: string;
        role: "project:personalOwner" | "project:admin" | "project:editor" | "project:viewer";
    }>, "many">>;
}>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
}
export {};
