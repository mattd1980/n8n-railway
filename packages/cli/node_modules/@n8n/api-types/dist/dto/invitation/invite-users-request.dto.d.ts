import { z } from 'zod';
declare const invitedUserSchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["global:member", "global:admin"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "global:member" | "global:admin";
}, {
    email: string;
    role?: "global:member" | "global:admin" | undefined;
}>;
export declare class InviteUsersRequestDto extends Array<z.infer<typeof invitedUserSchema>> {
    static safeParse(data: unknown): z.SafeParseReturnType<{
        email: string;
        role?: "global:member" | "global:admin" | undefined;
    }[], {
        email: string;
        role: "global:member" | "global:admin";
    }[]>;
}
export {};
