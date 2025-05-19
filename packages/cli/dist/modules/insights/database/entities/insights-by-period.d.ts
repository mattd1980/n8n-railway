import { BaseEntity } from '@n8n/typeorm';
import { InsightsMetadata } from './insights-metadata';
import type { PeriodUnit } from './insights-shared';
import { TypeToNumber } from './insights-shared';
export declare class InsightsByPeriod extends BaseEntity {
    id: number;
    metaId: number;
    metadata: InsightsMetadata;
    private type_;
    get type(): keyof typeof TypeToNumber;
    set type(value: keyof typeof TypeToNumber);
    value: number;
    private periodUnit_;
    get periodUnit(): PeriodUnit;
    set periodUnit(value: PeriodUnit);
    periodStart: Date;
}
