import { z } from 'zod';
import { Z } from 'zod-class';
declare const RoleChangeRequestDto_base: Z.Class<{
    newRoleName: z.ZodEnum<["global:admin", "global:member"]>;
}>;
export declare class RoleChangeRequestDto extends RoleChangeRequestDto_base {
}
export {};
