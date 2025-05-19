import express from 'express';
import { AuthenticatedRequest } from '../requests';
import { CtaService } from '../services/cta.service';
export declare class CtaController {
    private readonly ctaService;
    constructor(ctaService: CtaService);
    getCta(req: AuthenticatedRequest, res: express.Response): Promise<void>;
}
