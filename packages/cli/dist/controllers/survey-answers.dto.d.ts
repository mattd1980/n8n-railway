import type { IPersonalizationSurveyAnswersV4 } from 'n8n-workflow';
export declare class PersonalizationSurveyAnswersV4 implements IPersonalizationSurveyAnswersV4 {
    version: 'v4';
    personalization_survey_submitted_at: string;
    personalization_survey_n8n_version: string;
    automationGoalDevops?: string[] | null;
    automationGoalDevopsOther?: string | null;
    companyIndustryExtended?: string[] | null;
    otherCompanyIndustryExtended?: string[] | null;
    companySize?: string | null;
    companyType?: string | null;
    automationGoalSm?: string[] | null;
    automationGoalSmOther?: string | null;
    usageModes?: string[] | null;
    email?: string | null;
    role?: string | null;
    roleOther?: string | null;
    reportedSource?: string | null;
    reportedSourceOther?: string | null;
}
