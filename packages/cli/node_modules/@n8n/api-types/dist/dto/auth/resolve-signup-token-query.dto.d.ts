import { z } from 'zod';
import { Z } from 'zod-class';
declare const ResolveSignupTokenQueryDto_base: Z.Class<{
    inviterId: z.ZodString;
    inviteeId: z.ZodString;
}>;
export declare class ResolveSignupTokenQueryDto extends ResolveSignupTokenQueryDto_base {
}
export {};
