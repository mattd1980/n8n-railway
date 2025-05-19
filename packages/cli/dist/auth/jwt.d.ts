import type { User } from '@n8n/db';
import type { Response } from 'express';
export declare function issueCookie(res: Response, user: User): void;
