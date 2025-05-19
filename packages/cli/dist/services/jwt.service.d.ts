import jwt from 'jsonwebtoken';
import { InstanceSettings } from 'n8n-core';
export declare class JwtService {
    readonly jwtSecret: string;
    constructor({ encryptionKey }: InstanceSettings);
    sign(payload: object, options?: jwt.SignOptions): string;
    decode(token: string): JwtPayload;
    verify<T = JwtPayload>(token: string, options?: jwt.VerifyOptions): T;
}
export type JwtPayload = jwt.JwtPayload;
