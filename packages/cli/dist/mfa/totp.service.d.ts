export declare class TOTPService {
    generateSecret(): string;
    generateTOTPUri({ issuer, secret, label, }: {
        secret: string;
        label: string;
        issuer?: string;
    }): string;
    verifySecret({ secret, mfaCode, window, }: {
        secret: string;
        mfaCode: string;
        window?: number;
    }): boolean;
    generateTOTP(secret: string): string;
}
