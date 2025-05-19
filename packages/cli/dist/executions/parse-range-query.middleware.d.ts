import type { NextFunction, Response } from 'express';
import type { ExecutionRequest } from './execution.types';
export declare const parseRangeQuery: (req: ExecutionRequest.GetMany, res: Response, next: NextFunction) => void;
