import { z } from 'zod';
export declare const projectNameSchema: z.ZodString;
export declare const projectTypeSchema: z.ZodEnum<["personal", "team"]>;
export type ProjectType = z.infer<typeof projectTypeSchema>;
export declare const projectIconSchema: z.ZodObject<{
    type: z.ZodEnum<["emoji", "icon"]>;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "emoji" | "icon";
}, {
    value: string;
    type: "emoji" | "icon";
}>;
export type ProjectIcon = z.infer<typeof projectIconSchema>;
export declare const projectRelationSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodEnum<["project:personalOwner", "project:admin", "project:editor", "project:viewer"]>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    role: "project:personalOwner" | "project:admin" | "project:editor" | "project:viewer";
}, {
    userId: string;
    role: "project:personalOwner" | "project:admin" | "project:editor" | "project:viewer";
}>;
export type ProjectRelation = z.infer<typeof projectRelationSchema>;
