export declare class PasswordUtility {
    hash(plaintext: string): Promise<string>;
    compare(plaintext: string, hashed: string): Promise<boolean>;
}
