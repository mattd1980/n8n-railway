import { z } from 'zod';
import { Z } from 'zod-class';
declare const AcceptInvitationRequestDto_base: Z.Class<{
    inviterId: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    password: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
}>;
export declare class AcceptInvitationRequestDto extends AcceptInvitationRequestDto_base {
}
export {};
