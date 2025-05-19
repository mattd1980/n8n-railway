import { type NextFunction, type Response } from 'express';
import type { ListQuery } from '../../requests';
export type ListQueryMiddleware = (req: ListQuery.Request, res: Response, next: NextFunction) => void;
export declare const listQueryMiddleware: ListQueryMiddleware[];
