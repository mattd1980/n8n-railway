import { Z } from 'zod-class';
declare const DismissBannerRequestDto_base: Z.Class<{
    banner: import("zod").ZodOptional<import("zod").ZodEnum<["V1", "TRIAL_OVER", "TRIAL", "NON_PRODUCTION_LICENSE", "EMAIL_CONFIRMATION"]>>;
}>;
export declare class DismissBannerRequestDto extends DismissBannerRequestDto_base {
}
export {};
